"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerDonorAction } from '../actions';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const result = await registerDonorAction(formData);

    if (result && result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result && result.success) {
      router.push('/login?registered=true');
    } else {
      setError('An error occurred during registration.');
      setLoading(false);
    }
  };

  return (
    <main className="auth-page-container">
      {/* Left Visual Sidebar with Medical Background, Navy Overlay & Heartbeat Line */}
      <div className="auth-visual-panel">
        <div style={{ maxWidth: '480px', position: 'relative', zIndex: 2 }}>
          <span className="auth-visual-badge" style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '4px 12px',
            borderRadius: '50px',
            marginBottom: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            Community Lifeline
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '20px' }}>
            Become a <span style={{ color: 'var(--primary-crimson)' }}>Lifeline</span>
          </h1>
          <p className="auth-visual-desc" style={{ color: '#E2E8F0', fontSize: '1.05rem', lineHeight: 1.6, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
            Join Kerala&apos;s verified voluntary blood network. Your registration directly connects
            you to nearby hospitals and emergency requests when critical blood units are needed.
          </p>
        </div>

        {/* Slow Heartbeat Line (ECG Wave) Animation */}
        <div className="auth-ecg-container">
          <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="auth-ecg-svg">
            <path
              d="M0,40 L140,40 L155,40 L165,15 L175,65 L185,30 L195,48 L205,40 L330,40 L345,40 L355,15 L365,65 L375,30 L385,48 L395,40 L500,40"
              fill="none"
              stroke="#C1121F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ecg-pulse-line"
            />
          </svg>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-panel">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: '440px' }}>

          <div style={{ marginBottom: '32px' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px', textDecoration: 'none' }}>
              <ArrowLeft size={16} /> Return to Home
            </Link>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--navy-primary)', marginBottom: '8px', lineHeight: 1.2 }}>
              Donor Enrollment
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Create your verified donor profile in seconds.
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'var(--primary-crimson-tint)',
              color: 'var(--primary-crimson)',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--navy-primary)', fontWeight: 700, fontSize: '0.875rem' }}>
                Full Legal Name
              </label>
              <input
                type="text"
                name="name"
                required
                style={{ width: '100%' }}
                placeholder="e.g. Rahul Menon"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--navy-primary)', fontWeight: 700, fontSize: '0.875rem' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                style={{ width: '100%' }}
                placeholder="rahul@example.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--navy-primary)', fontWeight: 700, fontSize: '0.875rem' }}>
                Blood Group
              </label>
              <select name="bloodGroup" required style={{ width: '100%' }} defaultValue="">
                <option value="" disabled>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--navy-primary)', fontWeight: 700, fontSize: '0.875rem' }}>
                Create Password
              </label>
              <input
                type="password"
                name="password"
                required
                style={{ width: '100%' }}
                placeholder="Minimum 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
            >
              {loading ? 'Processing Enrollment...' : 'Complete Enrollment'}
            </button>
          </form>

          <p style={{ marginTop: '28px', color: 'var(--text-body)', textAlign: 'center', fontSize: '0.9rem' }}>
            Already registered?{' '}
            <Link href="/login" style={{ color: 'var(--primary-crimson)', fontWeight: 700 }}>
              Access Portal &rarr;
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
