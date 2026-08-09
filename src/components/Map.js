"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function Map({ center }) {
  // Real Kerala Blood Banks (from Justdial)
  const mockBanks = [
    { id: 1, name: "IMA Blood Bank (Thodupuzha)", lat: center.lat + 0.005, lng: center.lng + 0.005, blood: "A+, O-" },
    { id: 2, name: "Holy Ghost Mission Hospital", lat: center.lat - 0.015, lng: center.lng - 0.005, blood: "B+, AB+" },
    { id: 3, name: "Bank Of Blood (Ettumanur)", lat: center.lat + 0.015, lng: center.lng - 0.012, blood: "O+, O-" },
    { id: 4, name: "All Kerala Blood Donors Association", lat: center.lat - 0.008, lng: center.lng + 0.018, blood: "A-, AB-" },
    { id: 5, name: "Bharath Charitable Hospital Society Bloodbank", lat: center.lat + 0.02, lng: center.lng + 0.01, blood: "O+, B-" },
  ];

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '24px' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      
      {/* User's Location */}
      <Marker position={[center.lat, center.lng]}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Nearby Blood Banks */}
      {mockBanks.map(bank => (
        <Marker key={bank.id} position={[bank.lat, bank.lng]}>
          <Popup>
            <strong>{bank.name}</strong><br/>
            Available Blood: {bank.blood}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
