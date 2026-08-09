"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [locationStatus, setLocationStatus] = useState("Ready to secure location.");
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
    
    setTimeout(() => {
      window.location.href = '/request-blood';
    }, 600);
  };

  return (
    <>
      {/* Splash Screen */}
      <div className={`splash-screen ${!showSplash ? 'hidden' : ''}`}>
        <div className="logo-wrapper">
          <img src="/logo.jpg" alt="PulseGrid Logo" className="logo-animated" />
        </div>
      </div>

      <main style={{ minHeight: '100vh' }}>
        {/* Hero Section */}
        <section style={{ 
          position: 'relative',
          display: 'flex', 
          gap: '40px', 
          padding: '120px 50px 80px', 
          alignItems: 'center',
          minHeight: '80vh',
          background: 'url(/bg.jpg) center/cover no-repeat',
        }}>
          {/* Dark Overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(11, 14, 20, 0.7)', zIndex: 1 }}></div>

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', width: '100%', gap: '40px', maxWidth: '1400px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ flex: 1.2, padding: '50px' }}>
              <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', lineHeight: '1.2' }}>Every Drop <span style={{ color: 'var(--primary-red)' }}>Counts.</span></h1>
              <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--text-light)', opacity: 0.9, lineHeight: '1.6' }}>Connect with nearby blood donors and blood banks instantly during medical emergencies. Your pulse, our grid.</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <button 
                  className="btn-primary" 
                  onClick={addDrip}
                >
                  Request Blood Now
                </button>
                <a href="/register" className="btn-outline">
                  Register as Donor
                </a>
              </div>
            </div>

            {/* Map/Location Section */}
            <div className="glass-panel" style={{ flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px' }}>
              {coords ? (
                <div>
                  <h2 style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '15px' }}>Location Secured</h2>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Lat: <span style={{ color: 'white', fontWeight: 'bold' }}>{coords.lat.toFixed(4)}</span></p>
                    <p style={{ fontSize: '1.1rem' }}>Lng: <span style={{ color: 'white', fontWeight: 'bold' }}>{coords.lng.toFixed(4)}</span></p>
                  </div>
                  <a href="/blood-banks" className="btn-primary" style={{ display: 'inline-block' }}>View Live Map</a>
                </div>
              ) : (
                <div>
                  <h2 style={{ marginBottom: '15px', fontSize: '2rem' }}>Live Donor Grid</h2>
                  <p style={{ marginBottom: '30px', color: 'var(--text-muted)' }}>{locationStatus}</p>
                  <div className="spinner" style={{ marginBottom: '30px' }}></div>
                  <br/>
                  <button onClick={requestLocation} className="btn-outline">
                    Enable Location
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section style={{ padding: '80px 50px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', maxWidth: '1400px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--primary-red)' }}>Strict Privacy</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.1rem' }}>Your contact details remain completely private until you choose to share them with a matched donor or receiver.</p>
          </div>
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--primary-red)' }}>Real-Time Tracking</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.1rem' }}>Locate the nearest blood banks and check real-time inventory instantly using our advanced geolocation grid.</p>
          </div>
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--primary-red)' }}>The Gift of Life</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.1rem' }}>A single donation can save up to three lives. Join our community of donors and be a hero during medical emergencies.</p>
          </div>
        </section>
      </main>
    </>
  );
}
