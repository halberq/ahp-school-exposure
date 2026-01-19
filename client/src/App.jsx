import React, { useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'

function App() {

  const[mapData, setMapData] = useState([]);
  const[analysis, setAnalysis] = useState(null);
  const[loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/map-data')
    .then(res => setMapData(res.data))
    .catch(err => console.error("Error loading map: ", err));
  }, []);

  const runAnalysis = () => {
    setLoading(true)

    axios.get('http://127.0.0.1:8000/analyze')
    .then(res => {
      setAnalysis(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Analysis failed: ", err)
      setLoading(false);
      alert("Analysis failed. Is the backend server running?");
    });
  };
 

  const[layers, setLayers] = useState({
    schools:true,
    faults: true,
    rivers: true
  });

  const toggleLayer = (layerName) => {
    setLayers(prevLayers => ({ 
        ...prevLayers,
        [layerName]: !prevLayers[layerName]
      }));
  };

  return (

      <div className='main-layout'>

        <header className='app-header' style = {{padding: '20px', backgroundColor: '#1f9b70', color: 'White'}}>
          <h1>Environmental Exposure Analysis</h1>
          <p>Davao Region Geographic Hazard Assessment</p>
        </header>

      <div className = "content-container">
        <Sidebar 
              layers={layers}
              toggleLayer={toggleLayer}
              onAnalyze={runAnalysis}
              data={analysis}         
              loading={loading}    
        />

        <main className="map-area" style={{padding: '20px'}}>
          <MapView 
            schools={mapData} 
            layers={layers}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
