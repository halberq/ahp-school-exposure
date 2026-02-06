import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FlyToSchool = ({ focusedSchool }) => {
    const map = useMap();

    useEffect(() => {
        console.log("FlyToSchool received:", focusedSchool);

        if (focusedSchool) {
            const lat = focusedSchool.Latitude || focusedSchool.latitude || focusedSchool.lat;
            const lng = focusedSchool.Longitude || focusedSchool.longitude || focusedSchool.long;

            if (lat && lng) {
            console.log("Flying to:[", lat, ", ", lng, "]");
            map.flyTo(
                [lat, lng],
                16,
                { duration: 2 }
            );
            }

            else{
            console.warn("Data exists, but coordinates are missing!", focusedSchool);
            }
        }
    }, [focusedSchool, map]);

    return null;
};

const MapView = ({ schools, layers, focusedSchool }) => {
    console.log("MapView received prop:", focusedSchool);
    const position = [7.1907, 125.4553]; // Centered on Davao Region
    const [faultData, setFaultData] = useState(null);
    const [riverData, setRiverData] = useState(null);

    useEffect(() => {
        fetch('geographic_hazards_data/faults.geojson')
            .then(res => res.json())
            .then(data => setFaultData(data))
            .catch(err => console.error("Error loading fault data: ", err));

        fetch('geographic_hazards_data/rivers.geojson')
            .then(res => res.json())
            .then(data => setRiverData(data))
            .catch(err => console.error("Error loading river data: ", err));
    }, []);

    // Determine Legend for different Exposure Levels
    const getColor = (level) => {
        switch(level){
            case 'High': return '#e74c3c';      // Red
            case 'Moderate': return '#f39c12';  // Orange
            case 'Low': return '#27ae60';       // Green
            default: return '#7b5e5e';          // Grey for Unknown
        }
    };

    console.log("--- MAP RENDER ---");
    console.log("Faults Switch is:", layers.faults); 
    console.log("Fault Data is:", faultData ? "Loaded" : "Loading...");

    return (
        <MapContainer
            center={position} 
            zoom={10} 
            style={{ height: '100%', width: '100%', borderRadius: '8px', border: '2px solid #ddd' }}    
        >

            <FlyToSchool focusedSchool={focusedSchool} />

            <TileLayer
            attribution='&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'   
            url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {layers.faults && faultData && (
                <GeoJSON data = {faultData} style = {{color: 'red', weight: 2, dashArray: '5, 5'}} interactive={false}/>
            )}

            {layers.rivers && riverData && (
                <GeoJSON data = {riverData} style = {{color: 'blue', weight: 1, dashArray: 1}} interactive={false}/>
            )}

            {layers.schools && schools.map((school) => (
                <CircleMarker
                    key = {`${school['School Name']}-${school.Exposure_Level}`}
                    center = {[school.Latitude, school.Longitude]}
                    radius = {5}
                    pathOptions = {{
                        color: getColor(school.Exposure_Level),
                        fillColor: getColor(school.Exposure_Level),
                        fillOpacity: 0.8
                    }}
            >
                <Popup>
                    <strong>{school['School Name']}</strong><br />
                    Exposure Index: {school.Exposure_Index?.toFixed(4)}<br />
                    Risk Level: <strong>{school.Exposure_Level}</strong>
                </Popup>
            </CircleMarker>
            ))}
        </MapContainer>
    );
};

export default MapView;


