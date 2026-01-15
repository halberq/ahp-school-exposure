import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h1 style = {{fontSize: '1.5rem', color: '#000000'}}>Control Panel</h1>  
            <p style = {{fontSize: '0.9rem', color: '#000000' }}>
                Analyzing School Exposure based on proximity to geographic hazards
            </p>
            <hr />

        <div className = "filter-group">
            <h4 style = {{color: '#000000'}}>Map Layers</h4>

            {/* Layer 1: Main Analysis Result */}
            <label style = {{display: 'block', marginBottom: '8px', color: '#000000'}}>
                <input type = "checkbox" defaultChecked/>
                School Exposure Risk
            </label>

            {/* Layer 2: Hazard Source: Fault Lines */}
            <label style = {{display: 'block', marginBottom: '8px', color: '#000000'}}>
                <input type = "checkbox" defaultChecked/>
                Active Fault Lines
            </label>

            {/* Layer 3: Hazard Source: Major Rivers */}
            <label style = {{display: 'block', marginBottom: '8px', color: '#000000'}}>
                <input type = "checkbox" defaultChecked/>
                Major Rivers
            </label>

            {/* TO BE ADDED */}
            {/* <label style = {{display: 'block', marginBottom: '8px', opacity: 0.6}}>
                <input type = "checkbox" disabled/>
                Building Integrity (or something idk)
            </label>
            */}
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
    </div>
    );
};

export default Sidebar;