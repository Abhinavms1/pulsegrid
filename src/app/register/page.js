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
    <main style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#FFFFFF', paddingTop: '76px' }}>
      {/* Left Side - Visual */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 48px',
        backgroundColor: 'var(--navy-primary)',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '480px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'var(--primary-crimson-tint)',
            color: 'var(--primary-crimson)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '4px 12px',
            borderRadius: '50px',
            marginBottom: '20px'
          }}>
            Community Lifeline
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '20px' }}>
            Become a <span style={{ color: 'var(--primary-crimson)' }}>Lifeline</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Join Kerala&apos;s verified voluntary blood network. Your registration directly connects
            you to nearby hospitals and emergency requests when critical blood units are needed.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px', backgroundColor: '#FFFFFF' }}>
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
