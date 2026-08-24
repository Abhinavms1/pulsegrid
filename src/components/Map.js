"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function Map({ center, banks = [], userLocation = null, onLocationDrag = null }) {
  const defaultCenter = userLocation || center || { lat: 9.9312, lng: 76.2673 };

  return (
    <MapContainer center={[defaultCenter.lat, defaultCenter.lng]} zoom={11} style={{ height: '100%', width: '100%', borderRadius: '24px' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      
      {/* User's Location (Draggable) */}
      {userLocation && (
        <Marker 
          position={[userLocation.lat, userLocation.lng]} 
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              if (onLocationDrag) onLocationDrag({ lat: position.lat, lng: position.lng });
            }
          }}
        >
          <Popup>You are here (Drag to adjust)</Popup>
        </Marker>
      )}

      {/* Nearby Blood Banks (Interactive & Draggable as requested) */}
      {banks.map(bank => (
        bank.latitude && bank.longitude ? (
          <Marker 
            key={bank.id} 
            position={[bank.latitude, bank.longitude]} 
            draggable={true}
          >
            <Popup>
              <strong>{bank.name}</strong><br/>
              {bank.address}<br/>
              Contact: {bank.contact}
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
}
