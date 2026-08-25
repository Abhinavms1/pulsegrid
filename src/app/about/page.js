"use client";

import { useMemo } from 'react';
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
  const radius = 350;
  const N = FEATURE_DATA.length;

  return (
    <main style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Back to Home Button */}
      <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 100 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--primary-red)', background: 'var(--bg-secondary)', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', boxShadow: 'var(--glass-shadow)', border: '1px solid var(--primary-red)' }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>

      {/* Decorative Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3, background: 'radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-primary) 70%)', zIndex: 0 }} />

      {/* Header Section */}
      <div style={{ position: 'relative', zIndex: 1, padding: '80px 50px 20px', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <h1 className="text-massive" style={{ fontSize: '3.5rem', marginBottom: '15px', color: 'var(--text-primary)', lineHeight: 1.1 }}>
            The Pulse Behind <span style={{ color: 'var(--primary-red)' }}>The Grid</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            PulseGrid was architected with a singular vision: to eliminate latency between life-threatening emergencies and willing donors. Explore our core advantages below.
          </p>
        </motion.div>
      </div>
      
      {/* CSS 3D Orbital Rotation Section */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px' }}>
        <div className="orbit-container">
          <div className="orbit-system">
            {FEATURE_DATA.map((feature, index) => {
              const Icon = feature.icon;
              const angle = (360 / N) * index;
              // Generate a vibrant color for each feature
              const colors = ['#FF4B4B', '#4B7BFF', '#4BFF7B', '#FFB74B', '#B74BFF', '#4BFFF0', '#FF4BB7', '#E5FF4B'];
              const color = colors[index % colors.length];

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
                        style={{ borderBottom: `4px solid ${color}` }}
                      >
                        <Icon size={32} style={{ marginBottom: '10px', color: color }} />
                        <span style={{ fontWeight: 'bold' }}>{feature.title}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
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
          animation: orbit-rotate 25s infinite linear;
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
          animation: counter-rotate 25s infinite linear;
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
          width: 160px;
          height: 160px;
          left: -80px;
          top: -80px;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: var(--text-primary);
          text-decoration: none;
          font-size: 14px;
          text-align: center;
          padding: 15px;
          box-shadow: var(--glass-shadow);
          user-select: none;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s, transform 0.3s, border-color 0.3s;
        }

        .orbit-item:hover {
          background: var(--bg-secondary);
          color: var(--primary-red);
          box-shadow: 0 10px 40px rgba(211,47,47,0.4);
          transform: scale(1.1) !important;
          z-index: 10;
        }
      `}} />

    </main>
  );
}
