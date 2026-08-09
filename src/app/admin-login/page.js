"use client";

import { useState } from 'react';
import { loginAdmin } from '../actions/auth';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData(e.target);
      const res = await loginAdmin(formData);
      
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else if (res?.success) {
        window.location.href = '/admin'; // Force full client navigation to clear cache
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' }}>
        <div style={{ background: 'white', borderRadius: '50%', padding: '10px', display: 'inline-flex', marginBottom: '20px' }}>
          <img src="/logo.jpg" alt="PulseGrid" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--text-light)' }}>Admin <span style={{ color: 'var(--primary-red)' }}>Access</span></h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Restricted area. Please sign in.</p>
        
        {error && (
          <div style={{ background: 'rgba(230, 57, 70, 0.1)', border: '1px solid var(--primary-red)', color: 'var(--primary-red)', padding: '10px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" name="username" placeholder="Username" className="input-glass" required />
          <input type="password" name="password" placeholder="Password" className="input-glass" required />
          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
