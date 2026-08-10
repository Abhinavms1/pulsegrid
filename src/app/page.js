"use client";

import { useEffect } from "react";
import dynamic from 'next/dynamic';

// Dynamically import Map component (disables SSR to prevent Leaflet window errors)
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {

  // Scroll Reveal logic
  useEffect(() => {
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

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <main style={{ position: 'relative' }}>
      
      {/* Live Photographic Hero Background */}
      <div className="hero-bg-container">
        <div className="hero-bg-image"></div>
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Section */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 50px', paddingTop: '100px' }}>
        <h1 className="text-massive" style={{ color: 'white', textShadow: '0px 10px 30px rgba(0,0,0,0.8)', fontSize: '5rem', maxWidth: '800px' }}>
          Blood <span style={{ color: 'var(--primary-red)' }}>donation,</span><br/>
          reimagined.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', marginTop: '20px', textShadow: '0px 2px 10px rgba(0,0,0,0.5)' }}>
          An ultra-modern infrastructure connecting willing donors, verified blood banks, and emergency recipients instantly across the grid.
        </p>
        <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
          <a href="/register" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.2rem', borderRadius: '50px' }}>
            Join the Grid
          </a>
          <a href="/blood-banks" className="glass-panel" style={{ padding: '16px 40px', fontSize: '1.2rem', borderRadius: '50px', color: 'white', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.4)' }}>
            Find Banks
          </a>
        </div>
      </section>

      {/* Platform Impact Statistics (Light Mode) */}
      <section style={{ padding: '100px 50px', background: 'var(--bg-light)', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', color: 'var(--text-dark)' }}>Platform Impact</h2>
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

      {/* How It Works (Off-White) */}
      <section style={{ padding: '100px 50px', position: 'relative', zIndex: 1, background: 'var(--bg-offwhite)' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', color: 'var(--text-dark)' }}>How PulseGrid Works</h2>
        <div className="steps-grid">
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: 'white' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(211,47,47,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>1</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Register</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Sign up as a donor with your blood group and location securely.</p>
          </div>
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: 'white' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(211,47,47,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>2</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Get Notified</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Receive emergency alerts when a nearby hospital needs your blood type.</p>
          </div>
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: 'white' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(211,47,47,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>3</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Save Lives</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Donate at the verified blood bank and track your life-saving impact.</p>
          </div>
        </div>
      </section>

      {/* Massive Footer */}
      <footer style={{ background: 'white', padding: '100px 50px', borderTop: '1px solid rgba(0,0,0,0.05)', position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '20px' }}>PulseGrid</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>Redefining the standard for emergency blood network infrastructure. Built for scale, designed for life.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-dark)', marginBottom: '20px', fontWeight: 'bold' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="#" style={{ color: 'var(--text-muted)' }}>Donor Network</a>
              <a href="#" style={{ color: 'var(--text-muted)' }}>Blood Banks</a>
              <a href="#" style={{ color: 'var(--text-muted)' }}>Emergency APIs</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-dark)', marginBottom: '20px', fontWeight: 'bold' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
              <a href="#" style={{ color: 'var(--text-muted)' }}>HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
