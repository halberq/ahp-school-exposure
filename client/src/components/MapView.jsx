import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconshadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconshadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = () => {
    const position = [7.1907, 125.4553]; // Centered on Davao Region

    return (
        <MapContainer
        center={position} 
        zoom={10} 
        style={{ height: '500px', width: '100%', borderRadius: '8px', border: '2px solid #ddd' }}
        >

            <TileLayer
            attribution='&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'   
            url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
                <Popup>
                    Davao City <br /> Base of Operations.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapView;


