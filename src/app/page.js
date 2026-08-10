"use client";

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  // Splash Screen and Scroll Reveal
  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s ease';
      observer.observe(el);
    });

    return () => {
      clearTimeout(splashTimer);
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Centered Logo Splash Screen */}
      <div className={`splash-screen ${!showSplash ? 'hidden' : ''}`}>
        <div className="splash-logo-container">
          <img src="/logo.jpg" alt="PulseGrid Logo" style={{ width: '80px', height: '80px', borderRadius: '15px' }} />
          <h1 className="text-massive" style={{ fontSize: '3rem', margin: 0, letterSpacing: '-1px' }}>PulseGrid</h1>
        </div>
      </div>

      <main style={{ position: 'relative' }}>
        
        {/* Photographic Hero Background with Fade Overlay */}
        <div className="hero-bg-container">
          <div className="hero-bg-image"></div>
          <div className="hero-overlay"></div>
        </div>

        {/* Hero Section */}
        <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 50px', paddingTop: '100px' }}>
          <div style={{ maxWidth: '800px' }}>
            <h1 className="text-massive reveal" style={{ fontSize: '5.5rem', lineHeight: '1.1' }}>
              Blood <span style={{ color: 'var(--primary-red)' }}>donation,</span><br/>
              reimagined.
            </h1>
            <hr className="elegant-line reveal" style={{ width: '60px', borderTop: '2px solid var(--primary-red)' }} />
            <p className="reveal" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginTop: '30px' }}>
              An ultra-modern infrastructure connecting willing donors, verified blood banks, and emergency recipients instantly across the grid.
            </p>
            <div className="reveal" style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
              <a href="/register" className="btn-primary">
                Join the Grid
              </a>
              <a href="/blood-banks" className="liquid-glass" style={{ padding: '12px 28px', fontSize: '1rem', borderRadius: '50px', color: 'var(--text-dark)', fontWeight: '600' }}>
                Find Banks
              </a>
            </div>
          </div>
        </section>

        {/* East Luwu Photo Grid Section */}
        <section className="reveal" style={{ padding: '100px 50px', position: 'relative', zIndex: 1, background: 'var(--bg-cream)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
              <h2 className="text-massive" style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>Platform<br/>Impact</h2>
              <p style={{ textAlign: 'right', color: 'var(--text-muted)', maxWidth: '300px' }}>Building the most advanced blood network in the world, one facility at a time.</p>
            </div>
            <hr className="elegant-line" />
            
            <div className="photo-grid">
              <div className="photo-card">
                <img src="/card-hospital.jpg" alt="Verified Banks" />
                <div className="photo-card-content">
                  <span style={{ fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold', color: 'var(--primary-red)' }}>01</span>
                  <h3 className="text-massive" style={{ fontSize: '2rem', color: 'white' }}>482 Banks</h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Verified medical facilities active.</p>
                </div>
              </div>
              <div className="photo-card">
                <img src="/card-humanity.jpg" alt="Active Donors" />
                <div className="photo-card-content">
                  <span style={{ fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold', color: 'var(--primary-red)' }}>02</span>
                  <h3 className="text-massive" style={{ fontSize: '2rem', color: 'white' }}>12K Donors</h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Willing donors ready to assist.</p>
                </div>
              </div>
              <div className="photo-card">
                <img src="/card-logistics.jpg" alt="Logistics" />
                <div className="photo-card-content">
                  <span style={{ fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold', color: 'var(--primary-red)' }}>03</span>
                  <h3 className="text-massive" style={{ fontSize: '2rem', color: 'white' }}>1.5M Lives</h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Emergency transports completed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: 'var(--bg-cream)', padding: '100px 50px 50px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <hr className="elegant-line" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginTop: '50px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <img src="/logo.jpg" alt="PulseGrid Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                  <h1 className="text-massive" style={{ fontSize: '2rem' }}>PulseGrid</h1>
                </div>
                <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>Redefining the standard for emergency blood network infrastructure.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '20px', fontWeight: '600' }}>Platform</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="#" style={{ color: 'var(--text-muted)' }}>Donor Network</a>
                  <a href="#" style={{ color: 'var(--text-muted)' }}>Blood Banks</a>
                </div>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '20px', fontWeight: '600' }}>Legal</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
                  <a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
