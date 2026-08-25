"use client";

import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '150px', paddingBottom: '100px', position: 'relative' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 50px', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ marginBottom: '60px' }}>
          <h1 className="text-massive" style={{ fontSize: '4rem', color: 'var(--text-primary)', marginBottom: '20px' }}>Terms of <span style={{ color: 'var(--primary-red)' }}>Service</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Effective Date: August 2026</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: '20px' }}>
            By accessing or using the PulseGrid platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access the service. PulseGrid acts strictly as a networking facilitator between donors and verified banks.
          </p>
          
          <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>2. Medical Disclaimer</h2>
          <p style={{ marginBottom: '20px' }}>
            PulseGrid does not provide medical advice, diagnosis, or direct medical treatment. The platform is a logistical routing tool. All blood donations, transfusions, and medical procedures must be conducted by certified professionals at verified medical facilities. PulseGrid holds no liability for the medical outcomes of blood donations.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>3. User Responsibilities</h2>
          <p style={{ marginBottom: '20px' }}>
            Users agree to provide accurate, current, and complete information regarding their health status and blood type. Providing false medical information on this platform is strictly prohibited and will result in immediate termination of access.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
