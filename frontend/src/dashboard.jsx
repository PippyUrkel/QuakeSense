import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'
import './dashboard.css' // Custom CSS for styling

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Example data for Chart.js
const exampleChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
        label: 'Example Magnitude Over Time',
        data: [2.5, 3.1, 4.2, 3.8, 5.0, 4.5],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        },
    ],
    }

    // Example data for ARIMA Predictions
    const arimaPredictionData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
        label: 'Predicted Magnitude (ARIMA)',
        data: [4.6, 4.8, 4.9, 5.1, 5.2, 5.3],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        },
    ],
    }

    // Example options for Chart.js
    const exampleChartOptions = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
    },
    }

    // Example map center and marker
    const exampleMapCenter = [37.7749, -122.4194] // San Francisco, CA

    // Example heatmap data (latitude, longitude, intensity)
    const heatmapData = [
    [37.7749, -122.4194, 0.8],
    [37.8044, -122.2711, 0.6],
    [37.6879, -122.4702, 0.7],
    [37.3382, -121.8863, 0.9],
    [37.4419, -122.1430, 0.5],
    ]

    // Heatmap Component
    function Heatmap() {
    const map = useMap()
    React.useEffect(() => {
        const heatLayer = window.L.heatLayer(heatmapData, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        })
        heatLayer.addTo(map)
        return () => {
        map.removeLayer(heatLayer)
        }
    }, [map])
    return null
    }

    function Dashboard() {
    console.log('Dashboard is rendering')
    return (
        <div className="dashboard-container">
        <h1 className="dashboard-title">Earthquake Dashboard</h1>
        <div className="dashboard-grid">
            {/* Time Series Visualization */}
            <div className="dashboard-item">
            <h2 className="dashboard-item-title">Time Series Visualization</h2>
            <div className="dashboard-item-content">
                <Line data={exampleChartData} options={exampleChartOptions} />
            </div>
            </div>

            {/* Map Visualization */}
            <div className="dashboard-item">
            <h2 className="dashboard-item-title">Earthquake Map</h2>
            <div className="dashboard-item-content">
                <MapContainer
                center={exampleMapCenter}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={exampleMapCenter}>
                    <Popup>Example Earthquake Location</Popup>
                </Marker>
                </MapContainer>
            </div>
            </div>

            {/* ARIMA Predictions */}
            <div className="dashboard-item">
            <h2 className="dashboard-item-title">ARIMA Predictions</h2>
            <div className="dashboard-item-content">
                <Line data={arimaPredictionData} options={exampleChartOptions} />
            </div>
            </div>

            {/* Heatmap Visualization */}
            <div className="dashboard-item">
            <h2 className="dashboard-item-title">Earthquake Heatmap</h2>
            <div className="dashboard-item-content">
                <MapContainer
                center={exampleMapCenter}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <Heatmap />
                </MapContainer>
            </div>
            </div>

            {/* Additional Grid Box 1 */}
            <div className="dashboard-item">
            <h2 className="dashboard-item-title">Additional Visualization 1</h2>
            <div className="dashboard-item-content placeholder">
                Placeholder for Additional Visualization 1
            </div>
            </div>

            {/* Additional Grid Box 2 */}
            <div className="dashboard-item">
            <h2 className="dashboard-item-title">Additional Visualization 2</h2>
            <div className="dashboard-item-content placeholder">
                Placeholder for Additional Visualization 2
            </div>
            </div>
        </div>
        </div>
    )
}

export default Dashboard