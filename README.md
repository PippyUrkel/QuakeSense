# 🌍 QuakeSense - Real-Time Earthquake Data Visualizer

QuakeSense is a web-based application that fetches real-time seismic activity data from the USGS API and visualizes it using modern JavaScript tools like **React**, **Chart.js**, and **Leaflet**. It helps users understand earthquake patterns through interactive maps, graphs, and lightweight data analytics — **all on the frontend**.

---

## 👨‍💻 Team Members

| Roll Number | Name              |
|-------------|-------------------|
| 10325       | AbuHamza AbuZafar |
| 10338       | Andre Dsouza      |
| 10353       | Alroy Lopes       |

---

## 🧠 Problem Statement

Raw seismic data provided by official sources like the USGS is complex and non-visual. Our goal is to present this earthquake data in a visually understandable and interactive way for the general public, students, and researchers — **without requiring backend processing**.

---

## 🚀 Features

- 🔄 **Live Earthquake Feed** via USGS API
- 🌐 **Map Visualization** with markers for recent quakes
- 📊 **Dynamic Charts** including:
  - Line Chart (Time vs Magnitude)
  - Scatter Plot (Lat vs Long)
  - Box Plot (Magnitude spread)
  - Bar Chart (Region-wise breakdown)
  - Heatmap (Density estimate)
  - Trend Line (Basic prediction)
- 📱 Fully responsive design
- ⚡ Fast and serverless (No backend required)

---

## 🏗️ Tech Stack

| Tech        | Use                          |
|-------------|-------------------------------|
| **React.js**        | SPA & UI rendering               |
| **Chart.js** + `react-chartjs-2` | Graphing and charting        |
| **Leaflet.js**      | Interactive maps                |
| **Fetch API**       | Real-time data from USGS        |
| **Vercel**          | Deployment platform              |

---

## 📡 Data Source

**USGS Earthquake API**  
Endpoint: [https://earthquake.usgs.gov/fdsnws/event/1/](https://earthquake.usgs.gov/fdsnws/event/1/)  
The API provides real-time JSON data for global earthquakes.

---

## 📈 Visualizations

Each chart is rendered dynamically based on the latest data:
- **Line Chart**: Magnitude over time
- **Scatter Plot**: Coordinates of epicenters
- **Bar Chart**: Count of quakes by region
- **Box Plot**: Statistical spread of magnitudes
- **Heatmap**: Approximated intensity zones
- **Trend Graph**: Future quake estimation using linear extrapolation

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/aiibooouuu/QuakeSense.git
cd QuakeSense2

# Install dependencies
npm install

# Run locally
npm run dev
