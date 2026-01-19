import React from 'react';

const Sidebar = ({ data, layers, toggleLayer, onAnalyze, loading }) => { 

    const handleCheckboxChange = (layerName) => {
        if (toggleLayer) {
            toggleLayer(layerName);
        }
    };

    return (
        <div className="sidebar" style={{padding: '20px', background: 'white', maxWidth: '300px'}}>
            <h1 style = {{fontSize: '1.5rem', color: '#000000'}}>Control Panel</h1>  
            <p style = {{fontSize: '0.9rem', color: '#000000' }}>
                Analyzing School Exposure based on proximity to geographic hazards
            </p>
            <hr />

        <div className='analyis-section'>
           
        <button
            onClick={onAnalyze}
            disabled={loading}
            style = {{padding: '10px', width: '100%', cursor: 'pointer'}}
        >
            {loading ? "Calculating..." : "Running AHP Analysis"}
        </button>
        
        {data && (
            <div className='results' style={{marginTop: '20px'}}>
            <h4 style = {{color: '#000000'}}>Top 10 Most Exposed Schools</h4>
            <ul>
                {data.top_10_riskiest_schools.slice(0, 10).map((school, index) => (
                    <li key = {index} style = {{marginBottom: '10px', color: '#000000'}}>
                        <strong>{index + 1}. {school['School Name']}</strong>
                    <br />
                    <small>Score: {school.Exposure_Index.toFixed(4)}</small>
                    </li>
                        ))}
                    </ul>
                </div>
                )}
                </div>

        <div className="stats-box" style ={{marginTop: 'auto', padding: '15px', background: '#f0f4f8', borderRadius: '8px', border: '1px solid #dceefb'}}>
            <h4 style = {{margin: '0 0 10px 0', color: '#000000'}}>Exposure Summary</h4>
            <div style = {{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#000000'}}>
                <span>High Risk</span>
                <strong>0</strong>
            </div>

            <div style = {{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#000000'}}>
                <span>Medium Risk</span>
                <strong>0</strong>
            </div>

            <div style = {{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#000000'}}>
                <span>Low Risk</span>
                <strong>0</strong>
            </div>
        </div>

        <div className = "filter-group">
                <h4 style = {{color: '#000000'}}>Map Layers</h4>

                {/* Layer 1: Main Analysis Result */}
                <label style = {{display: 'block', marginBottom: '8px', color: '#000000'}}>
                    <input 
                        type = "checkbox" 
                        checked={layers.schools}
                        onChange={() => handleCheckboxChange('schools')}
                        style = {{marginRight: '8px'}}
                    />
                    School Exposure Risk
                </label>

                {/* Layer 2: Hazard Source: Fault Lines */}
                <label style = {{display: 'block', marginBottom: '8px', color: '#000000'}}>
                    <input 
                        type = "checkbox" 
                        checked={layers.faults}
                        onChange={() => handleCheckboxChange('faults')}
                        style = {{marginRight: '8px'}}
                        />
                    Active Fault Lines
                </label>

                {/* Layer 3: Hazard Source: Major Rivers */}
                <label style = {{display: 'block', marginBottom: '8px', color: '#000000'}}>
                    <input 
                        type = "checkbox" 
                        checked={layers.rivers}
                        onChange={() => handleCheckboxChange('rivers')}
                        style = {{marginRight: '8px'}}
                        />
                    Major Rivers
                </label>

                {/* TO BE ADDED */}
                {/* <label style = {{display: 'block', marginBottom: '8px', opacity: 0.6}}>
                    <input type = "checkbox" disabled/>
                    Building Integrity (or something idk)
                </label>
                */}
            </div>
    </div>
    );
};

export default Sidebar;