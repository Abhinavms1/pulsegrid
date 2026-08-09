"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [locationStatus, setLocationStatus] = useState("Detecting your location...");
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      setLocationStatus("Requesting permission...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus("Location found! Loading nearby blood banks...");
        },
        (error) => {
          setLocationStatus("Location access denied. Please enable location services.");
        }
      );
    } else {
      setLocationStatus("Geolocation is not supported by your browser.");
    }
  };

  const addDrip = (e) => {
    const btn = e.currentTarget;
    const drip = document.createElement("div");
    drip.classList.add("drip");
    btn.appendChild(drip);
    setTimeout(() => drip.remove(), 500);
    
    // Redirect to request page after drip animation
    setTimeout(() => {
      window.location.href = '/request-blood';
    }, 600);
  };

  return (
    <>
      {/* Splash Screen */}
      <div className={`splash-screen ${!showSplash ? 'hidden' : ''}`}>
        <img src="/logo.jpg" alt="PulseGrid Logo" className="logo-animated" />
      </div>

      <main style={{ minHeight: '100vh', padding: '0 50px' }}>
        {/* Hero Section */}
        <section style={{ display: 'flex', gap: '40px', padding: '80px 0', alignItems: 'center' }}>
          <div className="glass-panel" style={{ flex: 1, padding: '40px' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Every Drop <span style={{ color: 'var(--primary-red)' }}>Counts.</span></h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#555' }}>Connect with nearby blood donors and blood banks instantly during medical emergencies. Your pulse, our grid.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <button 
                className="blood-drip-btn" 
                onClick={addDrip}
                style={{ backgroundColor: 'var(--primary-red)', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Request Blood Now
              </button>
              <a href="/register" style={{ backgroundColor: 'transparent', color: 'var(--primary-red)', padding: '15px 30px', border: '2px solid var(--primary-red)', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Register as Donor
              </a>
            </div>
          </div>

          {/* Map/Location Section */}
          <div className="glass-panel" style={{ flex: 1, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', textAlign: 'center' }}>
            {coords ? (
              <div style={{ padding: '20px' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '10px' }}>Location Secured</h2>
                <p>Latitude: {coords.lat.toFixed(4)}</p>
                <p>Longitude: {coords.lng.toFixed(4)}</p>
                <a href="/blood-banks" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#2C3E50', color: 'white', borderRadius: '8px' }}>View Live Map</a>
              </div>
            ) : (
              <div style={{ padding: '20px' }}>
                <h2 style={{ marginBottom: '15px' }}>Live Donor Grid</h2>
                <p style={{ marginBottom: '20px', color: '#666' }}>{locationStatus}</p>
                <div className="spinner" style={{ marginBottom: '20px' }}></div>
                <br/>
                <button onClick={requestLocation} style={{ padding: '10px 20px', backgroundColor: '#2C3E50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Enable Location
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section style={{ padding: '60px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--primary-red)' }}>Strict Privacy</h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>Your contact details remain completely private until you choose to share them with a matched donor or receiver.</p>
          </div>
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--primary-red)' }}>Real-Time Tracking</h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>Locate the nearest blood banks and check real-time inventory instantly using our advanced geolocation grid.</p>
          </div>
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--primary-red)' }}>The Gift of Life</h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>A single donation can save up to three lives. Join our community of donors and be a hero during medical emergencies.</p>
          </div>
        </section>
      </main>
    </>
  );
}
