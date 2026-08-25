"use client";

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Shield, Users, MapPin, Truck, Zap, Droplet } from 'lucide-react';
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
  const radius = 250;
  
  // Distribute 8 points roughly on a sphere
  const points = useMemo(() => {
    const N = FEATURE_DATA.length;
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      
      pts.push({
        feature: FEATURE_DATA[i],
        tx: x * radius,
        ty: y * radius,
        tz: z * radius
      });
    }
    return pts;
  }, []);

  return (
    <main style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Decorative Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3, background: 'radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-primary) 70%)', zIndex: 0 }} />

      {/* Header Section */}
      <div style={{ position: 'relative', zIndex: 1, padding: '120px 50px 40px', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <h1 className="text-massive" style={{ fontSize: '4.5rem', marginBottom: '20px', color: 'var(--text-primary)', lineHeight: 1.1 }}>
            The Pulse Behind <span style={{ color: 'var(--primary-red)' }}>The Grid</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
            PulseGrid was architected with a singular vision: to eliminate latency between life-threatening emergencies and willing donors. Explore our core advantages below.
          </p>
        </motion.div>
      </div>
      
      {/* CSS 3D Elliptical Rotation Section */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '600px' }}>
        <div className="sphere-container">
          <div className="sphere">
            {points.map((p, index) => {
              const Icon = p.feature.icon;
              return (
                <Link 
                  key={index}
                  href={`/features/${p.feature.slug}`} 
                  className="sphere-item"
                  style={{
                    transform: `translate3d(${p.tx}px, ${p.ty}px, ${p.tz}px)`
                  }}
                >
                  <Icon size={32} style={{ marginBottom: '10px' }} />
                  <span style={{ fontWeight: 'bold' }}>{p.feature.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .sphere-container {
          perspective: 1200px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .sphere {
          width: 0px;
          height: 0px;
          position: relative;
          transform-style: preserve-3d;
          animation: sphere-rotate 25s infinite linear;
        }

        @keyframes sphere-rotate {
          from {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          to {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg);
          }
        }

        .sphere-item {
          position: absolute;
          width: 150px;
          height: 150px;
          left: -75px;
          top: -75px;
          background: var(--glass-bg);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
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
          transition: background 0.3s, color 0.3s, box-shadow 0.3s;
        }

        .sphere-item:hover {
          background: var(--bg-secondary);
          color: var(--primary-red);
          border-color: var(--primary-red);
          box-shadow: 0 10px 30px rgba(211,47,47,0.3);
          z-index: 10;
        }
      `}} />

    </main>
  );
}
