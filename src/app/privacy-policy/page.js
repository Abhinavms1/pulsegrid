"use client";

import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '150px', paddingBottom: '100px', position: 'relative' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 50px', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ marginBottom: '60px' }}>
          <h1 className="text-massive" style={{ fontSize: '4rem', color: 'var(--text-primary)', marginBottom: '20px' }}>Privacy <span style={{ color: 'var(--primary-red)' }}>Policy</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Last updated: August 2026</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>1. Data Collection</h2>
          <p style={{ marginBottom: '20px' }}>
            PulseGrid prioritizes the extreme security of medical and location data. When you register as a donor, we collect necessary identifiers including your blood type, contact information, and exact geographical coordinates (when permitted) to facilitate emergency logistics.
          </p>
          
          <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>2. Data Usage</h2>
          <p style={{ marginBottom: '20px' }}>
            Your data is strictly utilized for the purpose of fulfilling emergency blood requests. We utilize your location data via browser Geolocation APIs to calculate Haversine distances to nearby medical facilities, ensuring rapid response times. Your contact information is never exposed publicly and is only routed through secure backend channels during a confirmed match.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>3. Data Protection</h2>
          <p style={{ marginBottom: '20px' }}>
            All persistent data is stored securely in our PostgreSQL infrastructure powered by Supabase. We enforce strict Row Level Security (RLS) policies and encrypt sensitive medical markers. 
          </p>
        </motion.div>
      </div>
    </main>
  );
}
