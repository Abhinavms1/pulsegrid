"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Search, Droplets, Bell, Activity, Shield, Zap } from 'lucide-react';

const ThreeScene = dynamic(() => import('../components/ThreeScene'), { ssr: false });

export default function Home() {
  const [preloaderActive, setPreloaderActive] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    import('webgl-fluid').then((webGLFluidSimulation) => {
      if (canvasRef.current) {
        webGLFluidSimulation.default({
          CANVAS: canvasRef.current,
          COLOR_PALETTE: ['#7f1d1d', '#991b1b', '#dc2626', '#1e1b4b', '#0c0a09'],
          HOVER: true,
          DENSITY_DISSIPATION: 0.97,
          VELOCITY_DISSIPATION: 0.98,
          PRESSURE: 0.8,
          SPLAT_RADIUS: 0.3,
          BACK_COLOR: '#030712',
          TRANSPARENT: true
        });
      }
    });

    const timer = setTimeout(() => setPreloaderActive(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } }
  };

  const features = [
    {
      icon: <Search size={24} />,
      title: 'Real-Time Tracking',
      description: 'Advanced geolocation algorithms instantly identify the nearest verified facilities with the exact blood type you need.'
    },
    {
      icon: <Droplets size={24} />,
      title: 'Intelligent Matching',
      description: 'Cross-reference hospital inventory levels with live donor coordinates to compress critical response times dramatically.'
    },
    {
      icon: <Bell size={24} />,
      title: 'Instant Push Alerts',
      description: 'When an emergency is triggered, nearby donors and facilities receive immediate notifications to mobilize resources.'
    }
  ];

  const marqueeText = "REAL-TIME LOGISTICS • VERIFIED NETWORK • INTELLIGENT MATCHING • KERALA'S BLOOD GRID • ZERO LATENCY • EMERGENCY RESPONSE • ";

  return (
    <>
      <main style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

        {/* ═══ LIVE WEBGL FLUID BACKGROUND ═══ */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'auto'
          }}
        />

        {/* ═══ THREE.JS SCENE ═══ */}
        <ThreeScene />

        {/* ══════════════════════════════════════════════════════
            SECTION 1: CINEMATIC HERO
            ══════════════════════════════════════════════════════ */}
        <section style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 20px 60px'
        }}>
          {/* Radial gradient overlay for depth */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 30%, rgba(220,38,38,0.08) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: preloaderActive ? 0 : 1, y: preloaderActive ? 30 : 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}
          >
            <p style={{
              fontFamily: 'monospace',
              color: 'var(--primary-red)',
              marginBottom: '24px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: '600',
              fontSize: '0.85rem'
            }}>
              Emergency Blood Network
            </p>

            <h1 className="text-massive" style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: '0.95',
              marginBottom: '20px',
              color: '#ffffff'
            }}>
              Saving Lives
            </h1>

            <h2 className="text-massive glow-red" style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: '0.95',
              marginBottom: '30px'
            }}>
              Through Technology
            </h2>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              lineHeight: '1.7',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Transform passive willingness into actionable, life-saving intervention
              with the most advanced blood supply chain grid in Kerala.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(220,38,38,0.4)' }}
                whileTap={{ scale: 0.95 }}
                href="/blood-banks"
                className="btn-primary"
                style={{ padding: '16px 36px', fontSize: '1rem', textDecoration: 'none' }}
              >
                Access The Grid
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#how-it-works"
                className="btn-glass"
              >
                Explore Features <ArrowRight size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* ── FLOATING STATS PILL ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: preloaderActive ? 0 : 1, y: preloaderActive ? 30 : 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{ position: 'absolute', bottom: '40px', zIndex: 10 }}
          >
            <div className="stats-pill">
              <div className="stat-item">
                <span className="stat-value">482+</span>
                <span className="stat-label">Banks</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-value">12K+</span>
                <span className="stat-label">Donors</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-value">1.5M+</span>
                <span className="stat-label">Lives</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 2: HOW IT WORKS — FEATURE GRID
            ══════════════════════════════════════════════════════ */}
        <section id="how-it-works" style={{
          position: 'relative',
          zIndex: 2,
          padding: '120px 5vw',
          background: 'linear-gradient(180deg, transparent 0%, rgba(13,17,23,0.4) 100%)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} style={{
                fontFamily: 'monospace',
                color: 'var(--primary-red)',
                marginBottom: '12px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: '600',
                fontSize: '0.8rem'
              }}>
                (02) Architecture
              </motion.p>

              <motion.h2 variants={fadeUp} className="text-massive" style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                marginBottom: '16px',
                color: 'var(--text-primary)'
              }}>
                The Core <br />Infrastructure
              </motion.h2>

              <motion.p variants={fadeUp} style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                maxWidth: '500px',
                marginBottom: '60px',
                lineHeight: '1.7'
              }}>
                Every second counts. PulseGrid&apos;s architecture is engineered
                to eliminate delays in the emergency blood supply chain.
              </motion.p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {features.map((feature, i) => (
                  <motion.div key={i} variants={fadeUp} className="feature-card">
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-inter)'
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontSize: '0.95rem',
                      color: 'var(--text-muted)',
                      lineHeight: '1.6'
                    }}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 3: PLATFORM IMPACT — IMAGE CARDS
            ══════════════════════════════════════════════════════ */}
        <section id="platform-impact" style={{
          position: 'relative',
          zIndex: 2,
          padding: '120px 5vw'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} style={{
                fontFamily: 'monospace',
                color: 'var(--primary-red)',
                marginBottom: '12px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: '600',
                fontSize: '0.8rem'
              }}>
                (03) Impact
              </motion.p>

              <motion.h2 variants={fadeUp} className="text-massive" style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '0.9',
                marginBottom: '16px',
                color: 'var(--text-primary)'
              }}>
                Platform <br />Impact
              </motion.h2>

              <motion.p variants={fadeUp} style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                maxWidth: '450px',
                marginBottom: '60px',
                lineHeight: '1.7'
              }}>
                Building the most advanced blood network in the world,
                one facility at a time across Kerala.
              </motion.p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '24px'
              }}>
                {/* Card 1: 482 Banks */}
                <motion.div variants={fadeUp} className="photo-card"
                  style={{ height: '420px', borderRadius: '24px', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop" alt="Verified Banks" />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, width: '100%',
                    padding: '40px',
                    background: 'linear-gradient(to top, rgba(3,7,18,0.95) 0%, transparent 100%)'
                  }}>
                    <h3 className="text-massive" style={{ fontSize: '2.5rem', marginBottom: '4px', color: '#ffffff' }}>482 Banks</h3>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>Verified medical facilities active across Kerala.</p>
                  </div>
                </motion.div>

                {/* Card 2: 12K Donors */}
                <motion.div variants={fadeUp} className="photo-card"
                  style={{ height: '420px', borderRadius: '24px', position: 'relative' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Blood_donation_in_Taiwan.jpg" alt="Willing Donors" />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, width: '100%',
                    padding: '40px',
                    background: 'linear-gradient(to top, rgba(3,7,18,0.95) 0%, transparent 100%)'
                  }}>
                    <h3 className="text-massive" style={{ fontSize: '2.5rem', marginBottom: '4px', color: '#ffffff' }}>12K Donors</h3>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>Willing donors ready to assist in any district.</p>
                  </div>
                </motion.div>

                {/* Card 3: 1.5M Lives */}
                <motion.div variants={fadeUp} className="photo-card"
                  style={{ height: '420px', borderRadius: '24px', position: 'relative' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Ambulance_in_London.jpg" alt="Emergency Transports" />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, width: '100%',
                    padding: '40px',
                    background: 'linear-gradient(to top, rgba(3,7,18,0.95) 0%, transparent 100%)'
                  }}>
                    <h3 className="text-massive" style={{ fontSize: '2.5rem', marginBottom: '4px', color: '#ffffff' }}>1.5M Lives</h3>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>Emergency transports completed.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 4: SCROLLING MARQUEE
            ══════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}>
          <div className="marquee-container">
            <div className="marquee-track">
              {[...Array(3)].map((_, i) => (
                <span key={i}>
                  REAL-TIME LOGISTICS <span className="dot">•</span> VERIFIED NETWORK <span className="dot">•</span> INTELLIGENT MATCHING <span className="dot">•</span> KERALA&apos;S BLOOD GRID <span className="dot">•</span> ZERO LATENCY <span className="dot">•</span> EMERGENCY RESPONSE <span className="dot">•</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 5: EXPERIENCE THE VISION — ABOUT BRIDGE
            ══════════════════════════════════════════════════════ */}
        <section style={{
          padding: '140px 5vw',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              maxWidth: '800px',
              width: '100%',
              padding: '70px 50px',
              borderRadius: '32px',
              textAlign: 'center',
              background: 'rgba(13, 17, 23, 0.5)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(220, 38, 38, 0.15)',
              boxShadow: '0 0 60px rgba(220, 38, 38, 0.08)'
            }}
          >
            <p style={{
              fontFamily: 'monospace',
              color: 'var(--primary-red)',
              marginBottom: '16px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: '600',
              fontSize: '0.8rem'
            }}>
              (05) Vision
            </p>
            <h2 className="text-massive" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '20px',
              color: 'var(--text-primary)'
            }}>
              Experience <span className="glow-red">The Vision</span>
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              marginBottom: '40px',
              maxWidth: '550px',
              margin: '0 auto 40px auto',
              lineHeight: '1.7'
            }}>
              Dive deep into the architecture and mission behind PulseGrid.
              Discover how we&apos;re redefining emergency response infrastructure
              through advanced technology.
            </p>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(220,38,38,0.4)' }}
              whileTap={{ scale: 0.95 }}
              href="/about"
              className="btn-primary"
              style={{ padding: '16px 40px', fontSize: '1.05rem', textDecoration: 'none' }}
            >
              Explore About Us
            </motion.a>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 6: PREMIUM DARK FOOTER
            ══════════════════════════════════════════════════════ */}
        <footer style={{
          padding: '80px 5vw 40px',
          position: 'relative',
          zIndex: 2,
          background: 'var(--bg-secondary)',
          borderTop: '1px solid rgba(255,255,255,0.04)'
        }}>
          {/* Gradient line accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            width: '80%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.4), transparent)'
          }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="mobile-footer-grid" style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '60px',
              marginBottom: '60px'
            }}>
              {/* Branding */}
              <div>
                <div className="mobile-footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <img src="/logo.jpg" alt="PulseGrid Logo" style={{ width: '36px', height: '36px', borderRadius: '10px' }} />
                  <h3 className="text-massive" style={{ fontSize: '1.6rem', color: '#ffffff' }}>PulseGrid</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '320px', lineHeight: '1.6' }}>
                  Redefining the standard for emergency blood network
                  infrastructure across Kerala. Every second matters.
                </p>
              </div>

              {/* Platform Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ color: '#ffffff', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Platform</h4>
                <a href="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}>Home</a>
                <a href="/register" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Donor Network</a>
                <a href="/blood-banks" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Blood Banks</a>
                <a href="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>About Us</a>
              </div>

              {/* Legal Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ color: '#ffffff', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Legal</h4>
                <a href="/privacy-policy" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Privacy Policy</a>
                <a href="/terms-of-service" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Terms of Service</a>
                <a href="/admin-login" style={{ color: 'var(--text-muted)', opacity: 0.4, fontSize: '0.8rem', marginTop: '8px' }}>System Access</a>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                © {new Date().getFullYear()} PulseGrid Technologies. Built for Kerala.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
                All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
