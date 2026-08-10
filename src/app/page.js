"use client";

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import MagneticButton from '../components/MagneticButton';

// Dynamically import Map component (disables SSR to prevent Leaflet window errors)
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  // Splash screen timing, Scroll Reveal, & Mouse Tracking logic
  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 3500);
    
    // Intersection Observer for scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Interactive Mouse Tracking for Background Glow
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(splashTimer);
      revealElements.forEach(el => observer.unobserve(el));
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate 15 particles for the live background
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    width: `${Math.random() * 40 + 10}px`
  }));

  return (
    <>
      {/* Intro Splash Screen */}
      <div className={`splash-screen ${!showSplash ? 'hidden' : ''}`}>
        <div className="splash-content">
          <div className="splash-logo-circle">
            <img src="/logo.jpg" alt="PulseGrid Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
          </div>
          <h1 className="splash-text">PulseGrid</h1>
        </div>
      </div>

      <main style={{ position: 'relative' }}>
        
        {/* Live Hero Background & Interactive Glow */}
        <div className="live-bg">
          <div className="mouse-glow"></div>
          {particles.map(p => (
            <div 
              key={p.id} 
              className="particle" 
              style={{
                left: p.left,
                top: p.top,
                width: p.width,
                height: p.width,
                animationDelay: p.animationDelay
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="section-padding reveal" style={{ position: 'relative', zIndex: 1, minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 className="text-massive">
            Blood <span style={{ color: 'var(--primary-red)' }}>donation,</span><br/>
            reimagined.
          </h1>
          <p className="text-subtitle">
            An ultra-modern infrastructure connecting willing donors, verified blood banks, and emergency recipients instantly across the grid.
          </p>
          <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
            <MagneticButton className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.2rem', borderRadius: '50px' }} onClick={() => window.location.href = '/register'}>
              Join the Grid
            </MagneticButton>
            <MagneticButton className="glass-panel" style={{ padding: '16px 40px', fontSize: '1.2rem', borderRadius: '50px', color: 'var(--text-light)', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => window.location.href = '/blood-banks'}>
              Find Banks
            </MagneticButton>
          </div>
        </section>

        {/* Massive Bento Box Grid */}
        <section className="section-padding reveal" style={{ position: 'relative', zIndex: 1, background: '#080a0f' }}>
          <h2 className="text-massive" style={{ fontSize: '4rem', marginBottom: '60px' }}>The Platform</h2>
          
          <div className="bento-grid">
            {/* Box 1: Large Span */}
            <div className="bento-item" style={{ gridColumn: 'span 8', gridRow: 'span 2' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--text-light)', marginBottom: '15px' }}>Instant Connectivity</h3>
              <p className="text-subtitle" style={{ fontSize: '1.1rem' }}>Our algorithm bridges the gap between critical shortages and available donors in milliseconds. The moment an emergency request is fired, the grid activates.</p>
            </div>
            
            {/* Box 2: Square */}
            <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 1' }}>
              <h3 style={{ fontSize: '4rem', color: 'var(--primary-red)', margin: 0 }}>24/7</h3>
              <p style={{ color: 'var(--text-muted)' }}>Emergency Dispatch</p>
            </div>

            {/* Box 3: Square */}
            <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 1' }}>
              <h3 style={{ fontSize: '4rem', color: '#0cf011', margin: 0 }}>482</h3>
              <p style={{ color: 'var(--text-muted)' }}>Verified Blood Banks</p>
            </div>

            {/* Box 4: Map Teaser Span */}
            <div className="bento-item" style={{ gridColumn: 'span 12', gridRow: 'span 1', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '2rem', color: 'var(--text-light)' }}>Live Geographic Grid</h3>
                <p style={{ color: 'var(--text-muted)' }}>Track real-time inventory and nearby donors dynamically.</p>
              </div>
              <button onClick={() => setLocationEnabled(true)} className="btn-primary" style={{ padding: '12px 30px', borderRadius: '30px' }}>
                Activate Map
              </button>
            </div>
          </div>
        </section>

        {/* Live Geographic Map Section */}
        {locationEnabled && (
          <section className="section-padding" style={{ position: 'relative', zIndex: 1, background: '#0a0d14', animation: 'fadeIn 1s ease-out' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '30px' }}>Grid <span style={{ color: 'var(--primary-red)' }}>Active</span></h2>
            <div className="glass-panel" style={{ height: '600px', width: '100%', borderRadius: '30px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Map center={{ lat: 9.8956, lng: 76.7184 }} />
            </div>
          </section>
        )}

        {/* Platform Impact Statistics */}
        <section className="section-padding" style={{ background: 'var(--dark-surface)', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', color: 'var(--text-light)' }}>Platform Impact</h2>
          <div className="impact-grid">
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-red)' }}>12K+</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Registered Donors</p>
            </div>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-red)' }}>482</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Verified Banks</p>
            </div>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--primary-red)' }}>1.5M</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Lives Saved</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding" style={{ position: 'relative', zIndex: 1, background: 'var(--dark-bg)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', color: 'var(--text-light)' }}>How PulseGrid Works</h2>
          <div className="steps-grid">
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(230,57,70,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>1</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Register</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Sign up as a donor with your blood group and location securely.</p>
            </div>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(230,57,70,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>2</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Get Notified</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Receive emergency alerts when a nearby hospital needs your blood type.</p>
            </div>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(230,57,70,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>3</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Save Lives</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Donate at the verified blood bank and track your life-saving impact.</p>
            </div>
          </div>
        </section>

      </main>
      
      {/* Massive Footer */}
      <footer style={{ background: '#05070a', padding: '100px 50px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>PulseGrid</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>Redefining the standard for emergency blood network infrastructure. Built for scale, designed for life.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px' }}>Network</h4>
            <ul style={{ listStyle: 'none', padding: 0, gap: '15px', display: 'flex', flexDirection: 'column' }}>
              <li><a href="/register" style={{ color: 'var(--text-muted)' }}>Register as Donor</a></li>
              <li><a href="/blood-banks" style={{ color: 'var(--text-muted)' }}>Find Blood Banks</a></li>
              <li><a href="/request-blood" style={{ color: 'var(--text-muted)' }}>Emergency Request</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px' }}>System</h4>
            <ul style={{ listStyle: 'none', padding: 0, gap: '15px', display: 'flex', flexDirection: 'column' }}>
              <li><a href="/admin-login" style={{ color: 'var(--text-muted)' }}>Admin Gateway</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>API Documentation</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
