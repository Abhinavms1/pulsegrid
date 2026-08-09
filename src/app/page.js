"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically load the Leaflet Map component only on the client side
const DynamicMap = dynamic(() => import('@/components/Map'), { ssr: false, loading: () => <div className="spinner"></div> });

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [locationStatus, setLocationStatus] = useState("Ready to secure location.");
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5s for blink & slide
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
          setLocationStatus("Location found! Loading live grid...");
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
      <div className={`splash-screen ${!showSplash ? 'hidden' : ''}`}>
        <div className="logo-wrapper">
          <img src="/logo.jpg" alt="PulseGrid Logo" className="logo-animated" />
        </div>
      </div>

      <main>
        {/* Hero Section with Live Background */}
        <section style={{ 
          position: 'relative',
          display: 'flex', 
          gap: '40px', 
          padding: '120px 50px 80px', 
          alignItems: 'center',
          minHeight: '80vh',
        }}>
          {/* Live Animated Particles Background */}
          <div className="live-bg">
            <div className="particle" style={{ width: '100px', height: '100px', left: '10%', top: '20%', animationDelay: '0s' }}></div>
            <div className="particle" style={{ width: '150px', height: '150px', left: '70%', top: '60%', animationDelay: '2s' }}></div>
            <div className="particle" style={{ width: '80px', height: '80px', left: '40%', top: '80%', animationDelay: '4s' }}></div>
            <div className="particle" style={{ width: '200px', height: '200px', left: '80%', top: '10%', animationDelay: '6s' }}></div>
          </div>

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', width: '100%', gap: '40px', maxWidth: '1400px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ flex: 1.2, padding: '50px' }}>
              <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', lineHeight: '1.2' }}>Every Drop <span style={{ color: 'var(--primary-red)' }}>Counts.</span></h1>
              <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--text-light)', opacity: 0.9, lineHeight: '1.6' }}>Connect with nearby blood donors and blood banks instantly during medical emergencies. Your pulse, our grid.</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <button className="btn-primary" onClick={addDrip}>
                  Request Blood Now
                </button>
                <a href="/register" className="btn-outline">
                  Register as Donor
                </a>
              </div>
            </div>

            {/* Live Map Section */}
            <div className="glass-panel" style={{ flex: 0.8, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: coords ? '0' : '40px' }}>
              {coords ? (
                <DynamicMap center={coords} />
              ) : (
                <div>
                  <h2 style={{ marginBottom: '15px', fontSize: '2rem' }}>Live Donor Grid</h2>
                  <p style={{ marginBottom: '30px', color: 'var(--text-muted)' }}>{locationStatus}</p>
                  <div className="spinner" style={{ marginBottom: '30px' }}></div>
                  <br/>
                  <button onClick={requestLocation} className="btn-outline">
                    Enable Live Map
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Live Statistics Section */}
        <section style={{ padding: '80px 50px', background: 'var(--dark-surface)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '50px' }}>Platform <span style={{ color: 'var(--primary-red)' }}>Impact</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>450+</div>
                <div style={{ color: 'var(--text-muted)' }}>Registered Blood Banks</div>
              </div>
              <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>12,000+</div>
                <div style={{ color: 'var(--text-muted)' }}>Active Donors</div>
              </div>
              <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>5,000+</div>
                <div style={{ color: 'var(--text-muted)' }}>Lives Saved</div>
              </div>
              <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>&lt; 5 min</div>
                <div style={{ color: 'var(--text-muted)' }}>Average Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section style={{ padding: '100px 50px', maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center' }}>How It <span style={{ color: 'var(--primary-red)' }}>Works</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(230,57,70,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>1</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Register or Request</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Sign up as a donor to save lives, or instantly submit an emergency request without an account.</p>
            </div>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(230,57,70,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>2</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Live Geolocation</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Our system maps your exact location to ping nearby donors and blood banks instantly.</p>
            </div>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(230,57,70,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>3</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Connect & Save</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Get connected directly with verified blood banks or local volunteers. Your privacy is protected.</p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
