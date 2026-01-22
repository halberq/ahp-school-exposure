import React, { useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'

function App() {

  const[mapData, setMapData] = useState([]);
  const[analysis, setAnalysis] = useState(null);
  const[loading, setLoading] = useState(false);
  const[stats, setStats] = useState({high:0, moderate:0, low:0});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/map-data')
    .then(res => setMapData(res.data))
    .catch(err => console.error("Error loading map: ", err));
  }, []);

  const runAnalysis = () => {
    
    // Safety Check in the event every checkbox is turned off
    if (!layers.faults && !layers.rivers){
      console.log("No layers selected. Clearing Analysis");
      setAnalysis(null);
      setStats({high: 0, moderate: 0, low: 0});
      return;
    }

    setLoading(true)

    // Checks if the analysis will apply the granular mode or the default matrix
    let payloadWeights = {};

    if (!layers.faults || !layers.rivers){
      console.log("Granular Mode Detected: Sending custom weights");
      payloadWeights = {
        "Fault Proximity": layers.faults ? 1.0 : 0.0,
        "River Proximity": layers.rivers ? 1.0 : 0.0
      };
    } else {
      console.log("Default Mode will be used: Using Backend AHP Matrix")
    }

    axios.post('http://127.0.0.1:8000/analyze', {
      weights: payloadWeights
    })
    .then(res => {
      console.log("Full Data:", res.data);
      const schoolsList = res.data.top_10_riskiest_schools;

      setAnalysis(schoolsList);

      if(res.data.statistics){
        setStats({
          high: res.data.statistics["High"] || 0,
          moderate: res.data.statistics["Moderate"] || 0,
          low: res.data.statistics["Low"] || 0
        });
      }
      
      else {
        console.error("Could not find a list of schools in response!");
      }

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
              stats={stats} 
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
