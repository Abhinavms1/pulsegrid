"use client";

import { motion } from 'framer-motion';
import { Activity, Heart, Shield, Users, MapPin, Truck, Zap, Droplet, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const FEATURE_DATA = [
  { icon: Activity, slug: 'real-time-monitoring', title: 'Real-Time Monitoring' },
  { icon: Heart, slug: 'donor-matching', title: 'Intelligent Matching' },
  { icon: Shield, slug: 'verified-security', title: 'Verified Security' },
  { icon: Users, slug: 'community-network', title: 'Community Network' },
  { icon: MapPin, slug: 'geolocation-routing', title: 'Geolocation Routing' },
  { icon: Truck, slug: 'emergency-logistics', title: 'Emergency Logistics' },
  { icon: Zap, slug: 'instant-alerts', title: 'Instant Push Alerts' },
  { icon: Droplet, slug: 'inventory-tracking', title: 'Inventory Tracking' }
];

export default function AboutPage() {
  const radius = 320;
  const N = FEATURE_DATA.length;

  return (
    <main style={{
      position: 'relative',
      width: '100vw',
      minHeight: '100vh',
      overflow: 'hidden',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '100px'
    }}>

      {/* Back to Home Button */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 100 }}>
        <Link
          href="/"
          className="btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            fontSize: '0.9rem'
          }}
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>

      {/* Header Section */}
      <div style={{ position: 'relative', zIndex: 1, padding: '32px 24px 20px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <span style={{
            display: 'inline-block',
            backgroundColor: 'var(--primary-crimson-tint)',
            color: 'var(--primary-crimson)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '6px 16px',
            borderRadius: '50px',
            marginBottom: '16px'
          }}>
            Platform Architecture
          </span>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            marginBottom: '16px',
            color: 'var(--navy-primary)',
            lineHeight: 1.15
          }}>
            The Pulse Behind <span style={{ color: 'var(--primary-crimson)' }}>The Grid</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-body)', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            PulseGrid was architected with a singular mission: to eliminate latency between
            life-threatening emergencies and willing blood donors. Hover over any node to inspect key capabilities.
          </p>
        </motion.div>
      </div>

      {/* CSS 3D Orbital Rotation Section */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '520px'
      }}>
        <div className="orbit-container">
          <div className="orbit-system">
            {FEATURE_DATA.map((feature, index) => {
              const Icon = feature.icon;
              const angle = (360 / N) * index;

              return (
                <div
                  key={index}
                  className="orbit-arm"
                  style={{ transform: `rotateY(${angle}deg)` }}
                >
                  <div className="orbit-distance" style={{ transform: `translateZ(${radius}px)` }}>
                    <div className="orbit-item-wrapper" style={{ transform: `rotateY(${-angle}deg)` }}>
                      <Link
                        href={`/features/${feature.slug}`}
                        className="orbit-item counter-rotate"
                      >
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--primary-crimson-tint)',
                          color: 'var(--primary-crimson)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '10px'
                        }}>
                          <Icon size={24} />
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          color: 'var(--navy-primary)',
                          fontSize: '0.85rem',
                          lineHeight: 1.2
                        }}>
                          {feature.title}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .orbit-container {
          perspective: 1600px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .orbit-system {
          width: 0px;
          height: 0px;
          position: relative;
          transform-style: preserve-3d;
          animation: orbit-rotate 28s infinite linear;
          animation-play-state: paused;
        }

        .orbit-container:hover .orbit-system,
        .orbit-container:hover .counter-rotate {
          animation-play-state: running;
        }

        .orbit-arm, .orbit-distance, .orbit-item-wrapper {
          position: absolute;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
        }

        .counter-rotate {
          animation: counter-rotate 28s infinite linear;
          animation-play-state: paused;
          transform-style: preserve-3d;
        }

        @keyframes orbit-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        @keyframes counter-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-360deg); }
        }

        .orbit-item {
          position: absolute;
          width: 150px;
          height: 150px;
          left: -75px;
          top: -75px;
          background-color: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          text-align: center;
          padding: 14px;
          box-shadow: var(--soft-shadow);
          user-select: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .orbit-item:hover {
          background-color: #FFFFFF;
          border-color: var(--primary-crimson);
          box-shadow: var(--soft-shadow-hover);
          transform: scale(1.08) !important;
          z-index: 10;
        }
      `}</style>

    </main>
  );
}
