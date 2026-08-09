"use client";

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Admin hardcoded logic for demonstration based on user requirements
    if (email === 'admin' && password === 'PulseGridAdmin2026') {
      window.location.href = '/admin';
      return;
    }

    try {
      // Future API call for regular users
      setError('Invalid credentials or user not found.');
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-light)' }}>Welcome Back</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Login to access your PulseGrid dashboard.</p>
        
        {error && <div style={{ backgroundColor: 'rgba(230,57,70,0.1)', color: 'var(--primary-red)', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
          <input 
            type="text" 
            placeholder="Email or Username" 
            className="input-glass"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-glass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }} disabled={loading}>
            {loading ? <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div> : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '30px', color: 'var(--text-muted)' }}>
          Don't have an account? <a href="/register" style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>Register Here</a>
        </p>
      </div>
    </main>
  );
}
