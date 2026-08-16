"use client";

import { useEffect } from "react";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

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
      <main style={{ position: 'relative' }}>
        
        {/* Vibrant Futuristic Background */}
        <div className="hero-bg-container">
          <div className="hero-bg-image" style={{ backgroundImage: "url('/vibrant_bg.jpg')", filter: 'brightness(1.2)' }}></div>
          <div className="hero-overlay" style={{ background: 'linear-gradient(to right, var(--dark-bg) 0%, rgba(11,17,26,0.5) 100%)' }}></div>
        </div>

        {/* Hero Section */}
        <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 50px', paddingTop: '100px' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, delay: 2.2 }}
            style={{ maxWidth: '800px' }}
          >
            <h1 className="text-massive" style={{ fontSize: '5.5rem', lineHeight: '1.1' }}>
              Blood <span style={{ color: 'var(--primary-red)' }}>donation,</span><br/>
              reimagined.
            </h1>
            <hr className="elegant-line" style={{ width: '60px', borderTop: '2px solid var(--primary-red)' }} />
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginTop: '30px' }}>
              An ultra-modern infrastructure connecting willing donors, verified blood banks, and emergency recipients instantly across the grid.
            </p>
            <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/register" className="btn-primary">
                Join the Grid
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/blood-banks" className="liquid-glass" style={{ padding: '12px 28px', fontSize: '1rem', borderRadius: '50px', color: 'var(--text-light)', fontWeight: '600' }}>
                Find Banks
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* East Luwu Photo Grid Section */}
        <section style={{ padding: '100px 50px', position: 'relative', zIndex: 1, background: 'transparent' }}>
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
            
            <div className="photo-grid">
              <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -10 }}>
                <img src="/card-hospital.jpg" alt="Verified Banks" />
                <div className="photo-card-content liquid-glass" style={{ border: 'none', borderRadius: '0' }}>
                  <span style={{ fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold', color: 'var(--primary-red)' }}>01</span>
                  <h3 className="text-massive" style={{ fontSize: '2rem', color: 'var(--text-light)' }}>482 Banks</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Verified medical facilities active.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -10 }}>
                <img src="/card-humanity.jpg" alt="Active Donors" />
                <div className="photo-card-content liquid-glass" style={{ border: 'none', borderRadius: '0' }}>
                  <span style={{ fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold', color: 'var(--primary-red)' }}>02</span>
                  <h3 className="text-massive" style={{ fontSize: '2rem', color: 'var(--text-light)' }}>12K Donors</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Willing donors ready to assist.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -10 }}>
                <img src="/card-logistics.jpg" alt="Logistics" />
                <div className="photo-card-content liquid-glass" style={{ border: 'none', borderRadius: '0' }}>
                  <span style={{ fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold', color: 'var(--primary-red)' }}>03</span>
                  <h3 className="text-massive" style={{ fontSize: '2rem', color: 'var(--text-light)' }}>1.5M Lives</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Emergency transports completed.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Live Network Map Section */}
        <section style={{ padding: '50px', position: 'relative', zIndex: 1, background: 'var(--dark-surface)' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '1400px', margin: '0 auto' }}
          >
            <div style={{ marginBottom: '40px' }}>
              <h2 className="text-massive" style={{ fontSize: '3rem' }}>Live <span style={{ color: 'var(--primary-red)' }}>Grid</span></h2>
              <p style={{ color: 'var(--text-muted)' }}>Real-time visualization of active facilities and emergency routing.</p>
            </div>
            
            <div style={{ height: '500px', borderRadius: '30px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
              <Map />
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="liquid-glass" style={{ padding: '100px 50px 50px', position: 'relative', zIndex: 1, borderLeft: 'none', borderRight: 'none', borderBottom: 'none', borderRadius: '0' }}>
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
                <h4 style={{ color: 'var(--text-light)', marginBottom: '20px', fontWeight: '600' }}>Platform</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="#" style={{ color: 'var(--text-muted)' }}>Donor Network</a>
                  <a href="#" style={{ color: 'var(--text-muted)' }}>Blood Banks</a>
                </div>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-light)', marginBottom: '20px', fontWeight: '600' }}>Legal</h4>
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
