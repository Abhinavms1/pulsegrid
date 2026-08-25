"use client";

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Activity, Heart, Shield, Users, MapPin, Truck, Zap, Droplet } from 'lucide-react';

const FEATURE_DATA = [
  { icon: Activity, slug: 'real-time-monitoring', title: 'Real-Time Monitoring', desc: 'Track blood inventories and donor availability instantly with zero latency.' },
  { icon: Heart, slug: 'donor-matching', title: 'Intelligent Matching', desc: 'Proprietary algorithm pairs emergency requests with willing donors.' },
  { icon: Shield, slug: 'verified-security', title: 'Verified Security', desc: 'Rigorous multi-factor authentication and HIPAA-level compliance.' },
  { icon: Users, slug: 'community-network', title: 'Community Network', desc: 'A scalable emergency response team of thousands of willing heroes.' },
  { icon: MapPin, slug: 'geolocation-routing', title: 'Geolocation Routing', desc: 'Ping donors and facilities based on exact travel time and traffic.' },
  { icon: Truck, slug: 'emergency-logistics', title: 'Emergency Logistics', desc: 'Orchestrating the complete supply chain from request to arrival.' },
  { icon: Zap, slug: 'instant-alerts', title: 'Instant Push Alerts', desc: 'Immediate push notifications bypassing traditional email latency.' },
  { icon: Droplet, slug: 'inventory-tracking', title: 'Inventory Tracking', desc: 'Automatically track expiration dates, volume levels, and components.' }
];

export default function AboutPage() {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
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
          <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span>← Drag to explore →</span>
          </div>
        </motion.div>
      </div>
      
      {/* Draggable Carousel */}
      <div style={{ position: 'relative', zIndex: 1, padding: '20px 50px', flex: 1, display: 'flex', alignItems: 'center' }}>
        <motion.div ref={carouselRef} style={{ cursor: 'grab', overflow: 'hidden', width: '100%' }} whileTap={{ cursor: 'grabbing' }}>
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            style={{ display: 'flex', gap: '30px', padding: '20px 0' }}
          >
            {FEATURE_DATA.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.slug}
                  whileHover={{ scale: 1.02, y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => router.push(`/features/${feature.slug}`)}
                  style={{
                    minWidth: '350px',
                    height: '350px',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '24px',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--glass-shadow)',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ background: 'var(--bg-secondary)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', border: '1px solid var(--glass-border)', color: 'var(--primary-red)' }}>
                    <Icon size={30} />
                  </div>
                  <h3 className="text-massive" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '15px', lineHeight: 1.2 }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, flex: 1 }}>
                    {feature.desc}
                  </p>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    View Details <span>→</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

    </main>
  );
}
