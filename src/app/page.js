"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Dynamically import ThreeScene with SSR disabled because it relies on window
const ThreeScene = dynamic(() => import('../components/ThreeScene'), { ssr: false });

export default function Home() {
  const [preloaderActive, setPreloaderActive] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize WebGL Fluid Physics Simulation
    import('webgl-fluid').then((webGLFluidSimulation) => {
      if (canvasRef.current) {
        webGLFluidSimulation.default({
          CANVAS: canvasRef.current,
          COLOR_PALETTE: ['#721c24', '#5c161d', '#9b2c37', '#1a0608'],
          HOVER: true,
          DENSITY_DISSIPATION: 0.98,
          VELOCITY_DISSIPATION: 0.99,
          PRESSURE: 0.8,
          SPLAT_RADIUS: 0.25,
          BACK_COLOR: '#F8F9FA',
          TRANSPARENT: false
        });
      }
    });

    // Premium Homepage Preloader timeout
    const timer = setTimeout(() => {
      setPreloaderActive(false);
    }, 2500); // 2.5s matching NavigationAndSplash
    return () => clearTimeout(timer);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <main style={{ position: 'relative', overflow: 'hidden', background: 'transparent', color: 'var(--text-primary)' }}>
        
        {/* Live WebGL Fluid Background */}
        <canvas 
          ref={canvasRef} 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            zIndex: -1, 
            pointerEvents: 'auto' 
          }} 
        />
        
        {/* Illoca-Inspired 3D Scrolling Background */}
        <ThreeScene />

        {/* Illoca-Style Hero Section */}
        <section className="mobile-hero-section" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 5vw', maxWidth: '1400px', margin: '0 auto' }}>
          


          <motion.div 
            className="mobile-hero-text"
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: preloaderActive ? 0 : 1, x: preloaderActive ? -50 : 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
            style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column' }}
          >
            <p style={{ fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              (1) EMERGENCY LOGISTICS!
            </p>
            <h1 className="text-massive" style={{ fontSize: '5rem', lineHeight: '1', color: 'var(--text-primary)', marginBottom: '30px' }}>
              Routing <br/>Redefined
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '40px' }}>
              Transform passive willingness into actionable, life-saving intervention with the most advanced blood supply chain grid in Kerala.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/blood-banks" style={{ padding: '15px 30px', fontSize: '1rem', borderRadius: '8px', border: 'none', background: '#0a0a0a', color: '#ffffff', fontWeight: 'bold', textDecoration: 'none' }}>
                Access The Grid
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#platform-impact" style={{ padding: '15px 30px', fontSize: '1rem', color: 'var(--text-primary)', border: '1px solid var(--text-primary)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
                Explore Features
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Impact Section */}
        <section style={{ padding: '100px 5vw', background: 'transparent', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '50px' }}>
            


            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} style={{ flex: 1 }}>
              <div style={{ marginBottom: '60px', position: 'relative' }}>
                <h2 className="text-massive" style={{ fontSize: '7rem', lineHeight: '0.8', marginBottom: '20px', color: 'var(--text-primary)', marginLeft: '-10px' }}>Platform <br/>Impact</h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '400px', marginTop: '20px' }}>
                  Building the most advanced blood network in the world, one facility at a time across Kerala.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                
                {/* Feature 1: Verified Banks */}
                <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -15, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} style={{ aspectRatio: '1 / 1', height: 'auto', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop" alt="Verified Banks" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '40px', background: 'linear-gradient(to top, rgba(11,17,26,0.95), transparent)' }}>
                    <h3 className="text-massive" style={{ fontSize: '2.5rem', marginBottom: '5px', color: '#ffffff' }}>482 Banks</h3>
                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>Verified medical facilities active across Kerala.</p>
                  </div>
                </motion.div>

                {/* Feature 2: Willing Donors */}
                <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -15, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} style={{ aspectRatio: '1 / 1', height: 'auto', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Blood_donation_in_Taiwan.jpg" alt="Willing Donors" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '40px', background: 'linear-gradient(to top, rgba(11,17,26,0.95), transparent)' }}>
                    <h3 className="text-massive" style={{ fontSize: '2.5rem', marginBottom: '5px', color: '#ffffff' }}>12K Donors</h3>
                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>Willing donors ready to assist in any district.</p>
                  </div>
                </motion.div>

                {/* Feature 3: Completed Transports (Ambulance Image) */}
                <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -15, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} style={{ aspectRatio: '1 / 1', height: 'auto', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Ambulance_in_London.jpg" alt="Emergency Transports" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '40px', background: 'linear-gradient(to top, rgba(11,17,26,0.95), transparent)' }}>
                    <h3 className="text-massive" style={{ fontSize: '2.5rem', marginBottom: '5px', color: '#ffffff' }}>1.5M Lives</h3>
                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>Emergency transports completed.</p>
                  </div>
                </motion.div>
                
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Bridge Section */}
        <section style={{ padding: '120px 50px', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ maxWidth: '900px', width: '100%', padding: '60px', borderRadius: '30px', textAlign: 'center', background: 'var(--bg-secondary)', boxShadow: 'var(--glass-shadow)' }}
          >
            <h2 className="text-massive" style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--text-primary)' }}>Experience <span style={{ color: 'var(--primary-red)' }}>The Vision</span></h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
              Dive deep into the architecture and mission behind PulseGrid. Discover how we're redefining global emergency response infrastructure through advanced WebGL technology.
            </p>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/about" style={{ padding: '15px 40px', fontSize: '1.1rem', border: 'none', background: '#0a0a0a', color: '#ffffff', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>
              Explore About Us
            </motion.a>
          </motion.div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '100px 50px 50px', position: 'relative', zIndex: 1, background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <hr className="elegant-line" style={{ borderTop: '1px solid var(--glass-border)' }} />
            <div className="mobile-footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginTop: '50px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <div className="mobile-footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <img src="/logo.jpg" alt="PulseGrid Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                  <h1 className="text-massive" style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>PulseGrid</h1>
                </div>
                <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>Redefining the standard for emergency blood network infrastructure all across Kerala.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontWeight: '600' }}>Platform</h4>
                <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</a>
                <a href="/register" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Donor Network</a>
                <a href="/blood-banks" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blood Banks</a>
                <a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About Us</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontWeight: '600' }}>Legal & System</h4>
                <a href="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="/terms-of-service" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
                <a href="/admin-login" style={{ color: 'var(--text-muted)', opacity: 0.5, textDecoration: 'none', fontSize: '0.8rem', marginTop: '10px' }}>System Access</a>
              </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '80px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              © {new Date().getFullYear()} PulseGrid Technologies. Built for Kerala. All rights reserved.
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}
