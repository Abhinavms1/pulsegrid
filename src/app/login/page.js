"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginDonor } from '../actions/auth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMsg('Registration successful! Please sign in with your credentials.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.target);
      const result = await loginDonor(formData);

      if (result && result.error) {
        setError(result.error);
        setLoading(false);
      } else if (result && result.success) {
        document.cookie = `donor_auth=${result.name}; path=/; max-age=86400`;
        router.push('/donor-dashboard');
      } else {
        setError('An unexpected authentication error occurred.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Connection failed. Please verify your network and try again.');
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: '440px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Return to Home
        </Link>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--navy-primary)', marginBottom: '8px', lineHeight: 1.2 }}>
          Donor Portal
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Secure access to your personal donation status and local alerts.
        </p>
      </div>

      {successMsg && (
        <div style={{
          backgroundColor: 'var(--status-verified-bg)',
          color: 'var(--status-verified)',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} />
          {successMsg}
        </div>
      )}

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
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            style={{ width: '100%' }}
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', color: 'var(--navy-primary)', fontWeight: 700, fontSize: '0.875rem' }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            style={{ width: '100%' }}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
        >
          {loading ? 'Authenticating...' : 'Sign In to Portal'}
        </button>
      </form>

      <p style={{ marginTop: '28px', color: 'var(--text-body)', textAlign: 'center', fontSize: '0.9rem' }}>
        Not registered as a donor yet?{' '}
        <Link href="/register" style={{ color: 'var(--primary-crimson)', fontWeight: 700 }}>
          Enroll Now &rarr;
        </Link>
      </p>
    </motion.div>
  );
}

export default function Login() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#FFFFFF', paddingTop: '76px' }}>
      {/* Left Visual Sidebar */}
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '4px 12px',
            borderRadius: '50px',
            marginBottom: '20px'
          }}>
            Kerala Donor Grid
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '20px' }}>
            Welcome <span style={{ color: 'var(--primary-crimson)' }}>Back</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Access your secure portal to verify active blood drives, manage donation availability, and respond to hospital emergency requests in your area.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px', backgroundColor: '#FFFFFF' }}>
        <Suspense fallback={<div style={{ color: 'var(--text-muted)' }}>Loading donor portal...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
