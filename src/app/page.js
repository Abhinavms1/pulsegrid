"use client";

import { useEffect } from "react";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import ParticleNetwork from '../components/ParticleNetwork';

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
      <main style={{ position: 'relative', overflow: 'hidden', background: '#050505' }}>
        
        {/* Vibrant Futuristic Background */}
        <div className="hero-bg-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <div className="hero-overlay" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(211,47,47,0.15) 0%, #050505 80%)' }}></div>
          <ParticleNetwork />
        </div>

        {/* Hero Section */}
        <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 50px', paddingTop: '100px' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
            style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}
          >
            <h1 className="text-massive" style={{ fontSize: '6rem', lineHeight: '1.1', background: 'linear-gradient(to right, #ffffff, #aaaaaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              The future of <br/><span style={{ color: 'var(--primary-red)', WebkitTextFillColor: 'var(--primary-red)' }}>emergency routing.</span>
            </h1>
            <hr className="elegant-line" style={{ width: '60px', borderTop: '2px solid var(--primary-red)', margin: '40px auto' }} />
            
            {/* 500-Word Overview replacing the Registration Layout */}
            <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', textAlign: 'justify', columnCount: 2, columnGap: '40px', marginTop: '50px' }}>
              <p style={{ marginBottom: '20px' }}>
                PulseGrid represents a paradigm shift in how we handle emergency medical logistics. At its core, the platform operates as a highly specialized, location-based network engineered specifically to bridge the critical gap between voluntary blood donors, verified blood banks, and patients in immediate, life-threatening need. In emergency medical scenarios, latency is the enemy. Traditional methods of sourcing blood rely on fragmented databases, localized phone trees, and physical inquiries that consume precious hours. PulseGrid eliminates this latency entirely by mapping the complete blood supply chain onto a real-time, interactive grid.
              </p>
              <p style={{ marginBottom: '20px' }}>
                When an emergency request is triggered, our infrastructure does not blindly broadcast messages. Instead, it utilizes advanced geolocation algorithms and precise routing logic to immediately identify the nearest verified facilities possessing the exact blood type required. By pinging the exact coordinates of active donors and cross-referencing them with hospital inventory levels, we drastically compress the time it takes to transport life-saving resources.
              </p>
              <p style={{ marginBottom: '20px' }}>
                The architecture of PulseGrid is designed with absolute reliability and security in mind. Our backend, powered by highly resilient databases, ensures that all donor data, medical histories, and facility inventories are persistently stored, encrypted, and accessible only to authorized medical personnel. We have integrated seamless mapping technologies to provide a visual, interactive layer to our network—allowing dispatchers to physically see the flow of resources across regions like Kerala and orchestrate complex logistics effortlessly.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Beyond logistics, PulseGrid fosters a community of willing heroes. By providing a secure portal for donors to register their availability, track their impact, and receive instant alerts when their specific blood type is needed nearby, we transform passive willingness into actionable, life-saving intervention. Whether you are a large-scale government hospital in Ernakulam or an individual donor in a remote district, PulseGrid ensures you are part of an unbreakable, synchronized heartbeat that refuses to let a single life slip away due to systemic delays. Welcome to the grid.
              </p>
            </div>
            
            <div style={{ marginTop: '50px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/blood-banks" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
                Access The Grid
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Platform Impact Section (Fixed Image Placeholders) */}
        <section style={{ padding: '100px 50px', position: 'relative', zIndex: 1, background: '#080808' }}>
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
            
            <div className="photo-grid" style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
              <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -15, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} style={{ height: '400px', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(211,47,47,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-massive" style={{ fontSize: '2.5rem', color: 'var(--text-light)', marginBottom: '5px' }}>482 Banks</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Verified medical facilities active.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -15, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} style={{ height: '400px', background: 'linear-gradient(135deg, #2b1010 0%, #1a0505 100%)', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(211,47,47,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-massive" style={{ fontSize: '2.5rem', color: 'var(--text-light)', marginBottom: '5px' }}>12K Donors</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Willing donors ready to assist.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariant} className="photo-card" whileHover={{ y: -15, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} style={{ height: '400px', background: 'linear-gradient(135deg, #111 0%, #000 100%)', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(211,47,47,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-massive" style={{ fontSize: '2.5rem', color: 'var(--text-light)', marginBottom: '5px' }}>1.5M Lives</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Emergency transports completed.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="liquid-glass" style={{ padding: '100px 50px 50px', position: 'relative', zIndex: 1, borderLeft: 'none', borderRight: 'none', borderBottom: 'none', borderRadius: '0', background: '#030303' }}>
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
                  <a href="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
                  <a href="/terms-of-service" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
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
