const express = require('express')
const axios = require('axios')
const cors = require('cors') // Import cors middleware
const app = express()
const port = 3000

// Enable CORS
app.use(cors())

// logger middleware
function logger() {
    return (req, res, next) => {
        console.log(`${req.method} ${req.url} on localhost:${port}`)
        next()
    }
}
app.use(logger())

// Route to fetch earthquake data from USGS API
app.get('/earthquakes', async (req, res) => {
    const { starttime, endtime, minmagnitude, country } = req.query

    if (!starttime || !endtime || !minmagnitude) {
        return res.status(400).json({ error: 'starttime, endtime, and minmagnitude are required query parameters.' })
    }

    try {
        const usgsUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
        const params = { format: 'geojson', starttime, endtime, minmagnitude }
        const response = await axios.get(usgsUrl, { params })

        let earthquakes = response.data.features
        if (country) {
            earthquakes = earthquakes.filter(eq =>
                eq.properties.place && eq.properties.place.toLowerCase().includes(country.toLowerCase())
            )
        }

        res.json(earthquakes)
    } catch (error) {
        console.error('Error fetching earthquake data:', error.message)
        res.status(500).json({ error: 'Failed to fetch earthquake data.' })
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})