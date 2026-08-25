"use client";

import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Activity, Heart, Shield, Users, MapPin, Truck, Zap, Droplet } from 'lucide-react';

const FEATURE_DATA = [
  { icon: Activity, slug: 'real-time-monitoring' },
  { icon: Heart, slug: 'donor-matching' },
  { icon: Shield, slug: 'verified-security' },
  { icon: Users, slug: 'community-network' },
  { icon: MapPin, slug: 'geolocation-routing' },
  { icon: Truck, slug: 'emergency-logistics' },
  { icon: Zap, slug: 'instant-alerts' },
  { icon: Droplet, slug: 'inventory-tracking' }
];

function IconSphere() {
  const group = useRef();
  
  // Create points on a sphere using Fibonacci lattice
  const points = useMemo(() => {
    const N = 24; // Less points for a cleaner look
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      pts.push({
        position: [x * 4, y * 4, z * 4],
        feature: FEATURE_DATA[i % FEATURE_DATA.length]
      });
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
      group.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={group}>
      {points.map((p, i) => {
        const IconComponent = p.feature.icon;
        return (
          <Html 
            key={i} 
            position={p.position} 
            center 
            zIndexRange={[100, 0]}
          >
            <a 
              href={`/features/${p.feature.slug}`}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              style={{ 
                display: 'flex',
                color: 'var(--primary-red)', 
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                padding: '16px', 
                borderRadius: '50%', 
                border: '1px solid var(--glass-border)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s',
                textDecoration: 'none',
                userSelect: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
                e.currentTarget.style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'var(--glass-bg)';
              }}
            >
              <IconComponent size={32} />
            </a>
          </Html>
        );
      })}
    </group>
  );
}

export default function AboutPage() {
  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      {/* 3D Interactive Sphere Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <IconSphere />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      
      {/* Interactive Content Overlay */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', pointerEvents: 'none' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          style={{ textAlign: 'center', maxWidth: '800px', padding: '0 20px', pointerEvents: 'auto' }}
        >
          <div className="liquid-glass" style={{ padding: '40px', borderRadius: '30px' }}>
            <h1 className="text-massive" style={{ fontSize: '4.5rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
              The Pulse Behind <span style={{ color: 'var(--primary-red)' }}>The Grid</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              PulseGrid was architected with a singular vision: to eliminate latency between life-threatening emergencies and willing donors. We leverage edge networks and real-time mapping to ensure that when seconds matter, the grid delivers.
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Instruction text for interactions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '30px', width: '100%', textAlign: 'center', zIndex: 1, color: 'var(--text-muted)', fontSize: '0.9rem', pointerEvents: 'none' }}
      >
        [ Drag to spin the grid ]
      </motion.div>
    </main>
  );
}
