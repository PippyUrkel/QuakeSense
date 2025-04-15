import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Dashboard from './dashboard.jsx'

function LocationPicker({ setLatitude, setLongitude }) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng
      setLatitude(lat)
      setLongitude(lng)
    },
  })
  return null
}

function App() {
  const [starttime, setStarttime] = useState('')
  const [endtime, setEndtime] = useState('')
  const [minmagnitude, setMinmagnitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [maxradiuskm, setMaxradiuskm] = useState(1000) // Default radius is 1000 km
  const [orderby, setOrderby] = useState('time') // Default to 'time'
  const [earthquakes, setEarthquakes] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchEarthquakes = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/earthquakes', {
        params: { starttime, endtime, minmagnitude, latitude, longitude, maxradiuskm, orderby },
      })
      setEarthquakes(response.data)
    } catch (error) {
      console.error('Error fetching earthquake data:', error.message)
      setEarthquakes([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Container maxWidth="md" sx={{ padding: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Earthquake Data Fetcher
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }}>
                <TextField
                  label="Start Time"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={starttime}
                  onChange={(e) => setStarttime(e.target.value)}
                />
                <TextField
                  label="End Time"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={endtime}
                  onChange={(e) => setEndtime(e.target.value)}
                />
                <TextField
                  label="Min Magnitude"
                  type="number"
                  value={minmagnitude}
                  onChange={(e) => setMinmagnitude(e.target.value)}
                />
                <TextField
                  label="Max Radius (km)"
                  type="number"
                  value={maxradiuskm}
                  onChange={(e) => setMaxradiuskm(e.target.value)}
                />
                <TextField
                  label="Order By"
                  type="text"
                  value={orderby}
                  onChange={(e) => setOrderby(e.target.value)}
                  helperText="Options: time, magnitude"
                />
                <Typography variant="body1" gutterBottom>
                  Selected Latitude: {latitude || 'Not selected'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Selected Longitude: {longitude || 'Not selected'}
                </Typography>
                <MapContainer
                  center={[28.3949, 84.1240]} // Default center (Nepal)
                  zoom={6}
                  style={{ height: '300px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <LocationPicker setLatitude={setLatitude} setLongitude={setLongitude} />
                  {latitude && longitude && (
                    <>
                      <Marker position={[latitude, longitude]} />
                      <Circle
                        center={[latitude, longitude]}
                        radius={maxradiuskm * 1000} // Convert km to meters
                        pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
                      />
                    </>
                  )}
                </MapContainer>
                <Button variant="contained" color="primary" onClick={fetchEarthquakes} disabled={loading}>
                  {loading ? 'Fetching...' : 'Fetch Earthquakes'}
                </Button>
              </Box>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                  <CircularProgress />
                </Box>
              ) : earthquakes.length > 0 ? (
                <>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Magnitude</strong></TableCell>
                          <TableCell><strong>Place</strong></TableCell>
                          <TableCell><strong>Time</strong></TableCell>
                          <TableCell><strong>Details</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {earthquakes.map((eq, index) => (
                          <TableRow key={index}>
                            <TableCell>{eq.properties.mag}</TableCell>
                            <TableCell>{eq.properties.place}</TableCell>
                            <TableCell>{new Date(eq.properties.time).toLocaleString()}</TableCell>
                            <TableCell>
                              <a href={eq.properties.url} target="_blank" rel="noopener noreferrer">
                                More Info
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box mt={4} display="flex" justifyContent="center">
                    <Button variant="contained" color="secondary" component={Link} to="/dashboard" state={{ earthquakes }}>
                      Go to Dashboard
                    </Button>
                  </Box>
                </>
              ) : (
                <Typography variant="body1" align="center">
                  No earthquake data available.
                </Typography>
              )}
            </Container>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App