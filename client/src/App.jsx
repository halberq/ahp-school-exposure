import React from 'react'
import './App.css'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'

function App() {
  return (
      <div className = "app-container">
        <header style = {{padding: '20px', backgroundColor: '#1f9b70', color: 'White'}}>
          <h1>Environmental Exposure Analysis</h1>
          <p>Davao Region Geographic Hazard Assessment</p>
        </header>

        <main style={{padding: '20px'}}>
          <h2>Map</h2>
          <Sidebar />

          <div className = "map-content">
          <MapView />
          </div>
        </main>
      </div>
  )
}

export default App
