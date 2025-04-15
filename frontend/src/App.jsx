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
  Switch,
  FormControlLabel,
  CssBaseline,
  CircularProgress,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Dashboard from './dashboard.jsx'

function App() {
  const [starttime, setStarttime] = useState('')
  const [endtime, setEndtime] = useState('')
  const [minmagnitude, setMinmagnitude] = useState('')
  const [country, setCountry] = useState('')
  const [earthquakes, setEarthquakes] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchEarthquakes = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/earthquakes', {
        params: { starttime, endtime, minmagnitude, country },
      })
      setEarthquakes(response.data)
    } catch (error) {
      console.error('Error fetching earthquake data:', error.message)
      setEarthquakes([])
    } finally {
      setLoading(false)
    }
  }

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#d32f2f',
      },
    },
  })

  const handleModeChange = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Main App Route */}
          <Route
            path="/"
            element={
              <Container
                maxWidth="md"
                sx={{
                  padding: 4,
                  minHeight: '100vh',
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h4" component="h1">
                    Earthquake Data Fetcher
                  </Typography>
                  <FormControlLabel
                    control={<Switch checked={darkMode} onChange={handleModeChange} />}
                    label={darkMode ? 'Dark Mode' : 'Light Mode'}
                  />
                </Box>
                <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    marginBottom: 4,
                  }}
                >
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
                    label="Country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchEarthquakes}
                    disabled={loading}
                  >
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
                          {earthquakes.map((eq) => (
                            <TableRow key={eq.id}>
                              <TableCell>{eq.properties.mag}</TableCell>
                              <TableCell>{eq.properties.place}</TableCell>
                              <TableCell>{new Date(eq.properties.time).toLocaleString()}</TableCell>
                              <TableCell>
                                <a
                                  href={eq.properties.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  More Info
                                </a>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box mt={4} display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/dashboard"
                      >
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
          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App