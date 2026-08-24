"use client";

import { useEffect } from "react";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import ParticleNetwork from '../components/ParticleNetwork';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
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
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Vibrant Futuristic Background */}
        <div className="hero-bg-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <div className="hero-bg-image" style={{ backgroundImage: "url('/vibrant_network_bg_1786904925655.jpg')", filter: 'brightness(1.2)' }}></div>
          <div className="hero-overlay" style={{ background: 'linear-gradient(to right, var(--dark-bg) 0%, rgba(11,17,26,0.6) 100%)' }}></div>
          <ParticleNetwork />
        </div>

        {/* Hero Section */}
        <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 50px', paddingTop: '100px' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
            style={{ maxWidth: '800px' }}
          >
            <h1 className="text-massive" style={{ fontSize: '5.5rem', lineHeight: '1.1' }}>
              Blood <span style={{ color: 'var(--primary-red)' }}>donation,</span><br/>
              reimagined.
            </h1>
            <hr className="elegant-line" style={{ width: '60px', borderTop: '2px solid var(--primary-red)', marginTop: '20px' }} />
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginTop: '30px' }}>
              An ultra-modern infrastructure connecting willing donors, verified blood banks, and emergency recipients instantly across the grid.
            </p>
            <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/register" className="btn-primary">
                Join the Grid
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/blood-banks" className="liquid-glass" style={{ padding: '12px 28px', fontSize: '1rem', borderRadius: '50px', color: 'var(--text-light)', fontWeight: '600', textDecoration: 'none' }}>
                Find Banks
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Platform Impact Section */}
        <section style={{ padding: '100px 50px', position: 'relative', zIndex: 1, background: 'var(--dark-bg)' }}>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            style={{ maxWidth: '1400px', margin: '0 auto' }}
          >
            <motion.div variants={itemVariant} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
              <h2 className="text-massive" style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>Platform<br/>Impact</h2>
              <p style={{ textAlign: 'right', color: 'var(--text-muted)', maxWidth: '300px' }}>Building the most advanced blood network in the world, one facility at a time.</p>
            </motion.div>
            <motion.hr variants={itemVariant} className="elegant-line" />
            
            <div className="photo-grid" style={{ marginTop: '40px' }}>
              <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -15, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <img src="/pulsegrid_hospital_1786390246425.jpg" alt="Verified Banks" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="photo-card-content liquid-glass" style={{ border: 'none', borderRadius: '0', background: 'linear-gradient(to top, rgba(11,17,26,0.9), transparent)' }}>
                  <h3 className="text-massive" style={{ fontSize: '2.5rem', color: 'var(--text-light)', marginBottom: '5px' }}>482 Banks</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Verified medical facilities active.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -15, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <img src="/pulsegrid_humanity_1786390260230.jpg" alt="Active Donors" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="photo-card-content liquid-glass" style={{ border: 'none', borderRadius: '0', background: 'linear-gradient(to top, rgba(11,17,26,0.9), transparent)' }}>
                  <h3 className="text-massive" style={{ fontSize: '2.5rem', color: 'var(--text-light)', marginBottom: '5px' }}>12K Donors</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Willing donors ready to assist.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -15, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <img src="/pulsegrid_logistics_1786390274441.jpg" alt="Logistics" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="photo-card-content liquid-glass" style={{ border: 'none', borderRadius: '0', background: 'linear-gradient(to top, rgba(11,17,26,0.9), transparent)' }}>
                  <h3 className="text-massive" style={{ fontSize: '2.5rem', color: 'var(--text-light)', marginBottom: '5px' }}>1.5M Lives</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Emergency transports completed.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* About Bridge Section */}
        <section style={{ padding: '120px 50px', position: 'relative', zIndex: 1, background: 'var(--dark-bg)', display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="liquid-glass"
            style={{ maxWidth: '900px', width: '100%', padding: '60px', borderRadius: '30px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <h2 className="text-massive" style={{ fontSize: '3rem', marginBottom: '20px' }}>Experience <span style={{ color: 'var(--primary-red)' }}>The Vision</span></h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
              Dive deep into the architecture and mission behind PulseGrid. Discover how we're redefining global emergency response infrastructure.
            </p>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/about" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
              Explore About Us
            </motion.a>
          </motion.div>
        </section>

        {/* Live Network Map Section */}
        <section style={{ padding: '100px 50px', position: 'relative', zIndex: 1, background: 'var(--dark-surface)' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '1400px', margin: '0 auto' }}
          >
            <div style={{ marginBottom: '40px' }}>
              <h2 className="text-massive" style={{ fontSize: '3.5rem' }}>Live <span style={{ color: 'var(--primary-red)' }}>Grid</span></h2>
              <p style={{ color: 'var(--text-muted)' }}>Real-time visualization of active facilities and emergency routing.</p>
            </div>
            
            <div style={{ height: '500px', borderRadius: '30px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
              <Map center={{ lat: 9.9312, lng: 76.2673 }} />
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="liquid-glass" style={{ padding: '100px 50px 50px', position: 'relative', zIndex: 1, borderLeft: 'none', borderRight: 'none', borderBottom: 'none', borderRadius: '0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <hr className="elegant-line" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginTop: '50px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <img src="/logo.jpg" alt="PulseGrid Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                  <h1 className="text-massive" style={{ fontSize: '2rem' }}>PulseGrid</h1>
                </div>
                <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>Redefining the standard for emergency blood network infrastructure.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-light)', marginBottom: '20px', fontWeight: '600' }}>Platform</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="/register" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Donor Network</a>
                  <a href="/blood-banks" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blood Banks</a>
                  <a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About Us</a>
                </div>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-light)', marginBottom: '20px', fontWeight: '600' }}>Legal & System</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
                  <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
                  <a href="/admin-login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem', opacity: 0.5, marginTop: '10px' }}>System Access</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
