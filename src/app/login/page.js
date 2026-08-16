"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginDonor } from '../actions/auth';
import { motion } from 'framer-motion';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMsg('Registration successful! Please log in.');
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
        router.push('/donor-dashboard');
      } else {
        setError('An unexpected error occurred.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Connection failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: '450px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 className="text-massive" style={{ fontSize: '2.5rem', color: 'var(--text-light)', marginBottom: '10px' }}>Donor Portal</h2>
        <p style={{ color: 'var(--text-muted)' }}>Secure access to your grid dashboard.</p>
      </div>

      {successMsg && <div style={{ background: 'rgba(12, 240, 17, 0.1)', color: '#0cf011', padding: '15px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(12, 240, 17, 0.2)' }}>{successMsg}</div>}
      {error && <div style={{ background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', padding: '15px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(211,47,47,0.2)' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
          <input type="email" name="email" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-light)', outline: 'none' }} placeholder="john@example.com" />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Secure Password</label>
          <input type="password" name="password" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-light)', outline: 'none' }} placeholder="Enter password" />
        </div>

        <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '18px', fontSize: '1.1rem', marginTop: '10px', display: 'flex', justifyContent: 'center', background: '#0ea5e9', borderColor: '#0ea5e9' }}>
          {loading ? 'Authenticating...' : 'Secure Login'}
        </button>
      </form>

      <p style={{ marginTop: '30px', color: 'var(--text-muted)', textAlign: 'center' }}>
        Not registered yet? <a href="/register" style={{ color: '#0ea5e9', fontWeight: 'bold' }}>Enroll Now</a>
      </p>
    </motion.div>
  );
}

export default function Login() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', background: 'var(--dark-bg)' }}>
      {/* Left Side - Visual */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: "url('/vibrant_bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.9) contrast(1.1) hue-rotate(180deg)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(11,17,26,0.8) 0%, rgba(11,17,26,0.4) 100%)', zIndex: 1 }}></div>
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '500px' }}>
          <h1 className="text-massive" style={{ fontSize: '4rem', color: 'var(--text-light)', lineHeight: '1.1' }}>
            Welcome <span style={{ color: '#0ea5e9' }}>Back</span>
          </h1>
          <p style={{ color: 'var(--text-light)', opacity: 0.8, fontSize: '1.2rem', marginTop: '20px' }}>
            Access your secure donor portal to view active emergencies and manage your availability status.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'var(--dark-surface)' }}>
        <Suspense fallback={<div style={{ color: 'var(--text-light)' }}>Loading portal...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
