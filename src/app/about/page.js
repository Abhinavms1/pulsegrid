"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let fluid;
    if (typeof window !== 'undefined') {
      import('webgl-fluid').then(module => {
        fluid = module.default;
        if (canvasRef.current) {
          fluid(canvasRef.current, {
            IMMEDIATE: true,
            TRIGGER: 'hover',
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 1024,
            CAPTURE_RESOLUTION: 512,
            DENSITY_DISSIPATION: 1,
            VELOCITY_DISSIPATION: 0.2,
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: 20,
            CURL: 30,
            SPLAT_RADIUS: 0.25,
            SPLAT_FORCE: 6000,
            SHADING: true,
            COLORFUL: true,
            COLOR_UPDATE_SPEED: 10,
            PAUSED: false,
            BACK_COLOR: { r: 11, g: 17, b: 26 }, // var(--dark-bg)
            TRANSPARENT: false,
            BLOOM: true,
            BLOOM_ITERATIONS: 8,
            BLOOM_RESOLUTION: 256,
            BLOOM_INTENSITY: 0.8,
            BLOOM_THRESHOLD: 0.6,
            BLOOM_SOFT_KNEE: 0.7,
            SUNRAYS: true,
            SUNRAYS_RESOLUTION: 196,
            SUNRAYS_WEIGHT: 1.0,
          });
        }
      });
    }
    
    // Fallback cleanup if canvas is destroyed
    return () => {
      // webgl-fluid doesn't have a built-in destroy method, 
      // but it clears itself when the canvas is unmounted.
    };
  }, []);

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--dark-bg)' }}>
      {/* WebGL Shader Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
      
      {/* Interactive Content Overlay */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', pointerEvents: 'none' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          style={{ textAlign: 'center', maxWidth: '800px', padding: '0 20px', pointerEvents: 'auto' }}
        >
          <h1 className="text-massive" style={{ fontSize: '4.5rem', marginBottom: '20px', mixBlendMode: 'difference', color: '#ffffff' }}>
            The Pulse Behind <span style={{ color: 'var(--primary-red)' }}>The Grid</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', mixBlendMode: 'difference' }}>
            PulseGrid was architected with a singular vision: to eliminate latency between life-threatening emergencies and willing donors. We leverage edge networks and real-time mapping to ensure that when seconds matter, the grid delivers.
          </p>
          <div style={{ marginTop: '40px' }}>
            <motion.a 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              href="/" 
              className="liquid-glass" 
              style={{ display: 'inline-block', padding: '12px 30px', borderRadius: '50px', textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}
            >
              Return to Grid
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* Instruction text for interactions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '30px', width: '100%', textAlign: 'center', zIndex: 1, color: '#fff', fontSize: '0.9rem', pointerEvents: 'none', mixBlendMode: 'difference' }}
      >
        [ Move your cursor to interact with the fluid mesh ]
      </motion.div>
    </main>
  );
}
