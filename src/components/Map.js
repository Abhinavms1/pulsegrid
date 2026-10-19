"use client";

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Component to dynamically fit bounds to markers
function MapController({ points, center }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (points && points.length > 1) {
      try {
        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
      } catch (err) {
        console.error("Leaflet fitBounds error:", err);
      }
    } else if (points && points.length === 1) {
      map.setView(points[0], 12);
    } else if (center) {
      map.setView(center, 8);
    }
  }, [points, center, map]);

  return null;
}

export default function Map({ banks = [], userLocation = null, onLocationDrag = null }) {
  // Default Kerala center coordinates
  const keralaCenter = [10.0, 76.5];

  // Crimson Pin Marker using L.divIcon
  const crimsonIcon = useMemo(() => {
    return L.divIcon({
      className: 'pulsegrid-crimson-marker',
      html: `
        <div style="
          width: 32px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          filter: drop-shadow(0 3px 6px rgba(193, 18, 31, 0.35));
        ">
          <svg viewBox="0 0 24 32" width="32" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37258 0 0 5.37258 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.37258 18.6274 0 12 0Z" fill="#C1121F"/>
            <circle cx="12" cy="11" r="5" fill="#FFFFFF"/>
            <path d="M12 8.5C10.6 10 9.5 11.2 9.5 12.2C9.5 13.6 10.6 14.7 12 14.7C13.4 14.7 14.5 13.6 14.5 12.2C14.5 11.2 13.4 10 12 8.5Z" fill="#C1121F"/>
          </svg>
        </div>
      `,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -38]
    });
  }, []);

  // User location Pin Marker
  const userIcon = useMemo(() => {
    return L.divIcon({
      className: 'pulsegrid-user-marker',
      html: `
        <div style="
          width: 28px;
          height: 28px;
          position: relative;
          cursor: grab;
        ">
          <div style="
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: rgba(14, 159, 110, 0.25);
            animation: pulseRing 2s infinite ease-out;
          "></div>
          <div style="
            position: absolute;
            inset: 2px;
            border-radius: 50%;
            background: #0E9F6E;
            border: 3px solid #FFFFFF;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          "></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -18]
    });
  }, []);

  // Extract all points for fitBounds
  const allPoints = useMemo(() => {
    const pts = [];
    if (userLocation?.lat && userLocation?.lng) {
      pts.push([userLocation.lat, userLocation.lng]);
    }
    banks.forEach(b => {
      if (b.latitude && b.longitude) {
        pts.push([b.latitude, b.longitude]);
      }
    });
    return pts;
  }, [banks, userLocation]);

  return (
    <div className="map-container-box">
      <MapContainer
        center={keralaCenter}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', background: '#F8FAFC' }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        />

        <MapController points={allPoints} center={keralaCenter} />

        {/* User's Location Marker */}
        {userLocation && userLocation.lat && userLocation.lng && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                if (onLocationDrag) {
                  onLocationDrag({ lat: position.lat, lng: position.lng });
                }
              }
            }}
          >
            <Popup className="custom-facility-popup">
              <div style={{ padding: '6px 4px' }}>
                <span style={{
                  display: 'inline-block',
                  background: '#DEF7EC',
                  color: '#0E9F6E',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  marginBottom: '4px'
                }}>
                  YOUR LOCATION
                </span>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#475569' }}>
                  Drag marker to recalculate nearest blood banks.
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Blood Bank Markers */}
        {banks.map(bank => {
          if (!bank.latitude || !bank.longitude) return null;
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${bank.latitude},${bank.longitude}`;

          return (
            <Marker
              key={bank.id}
              position={[bank.latitude, bank.longitude]}
              icon={crimsonIcon}
            >
              <Popup className="custom-facility-popup">
                <div style={{ padding: '4px 2px', minWidth: '220px' }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#0B1B2B',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {bank.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '6px', lineHeight: 1.4 }}>
                    📍 {bank.address}
                  </div>
                  {bank.contact && (
                    <div style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
                      📞 <a href={`tel:${bank.contact}`} style={{ color: '#C1121F', fontWeight: 600, textDecoration: 'none' }}>
                        {bank.contact}
                      </a>
                    </div>
                  )}
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#C1121F',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    Get directions &rarr;
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
