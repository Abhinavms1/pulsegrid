"use client";

import { useState } from 'react';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '50px', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(230,57,70,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem', color: 'var(--primary-red)' }}>✓</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-light)' }}>Registration Successful!</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Thank you for joining PulseGrid as a donor. You are now part of our life-saving network.</p>
          <a href="/" className="btn-primary" style={{ display: 'inline-block' }}>Return to Map</a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-light)', textAlign: 'center' }}>Register as Donor</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', textAlign: 'center' }}>Join the grid and save lives locally.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="text" placeholder="Full Name" className="input-glass" required />
          <input type="email" placeholder="Email Address" className="input-glass" required />
          
          <select className="input-glass" required style={{ appearance: 'none', backgroundColor: 'var(--dark-surface)' }}>
            <option value="" disabled selected>Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          
          <input type="password" placeholder="Password" className="input-glass" required />
          
          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }} disabled={loading}>
            {loading ? <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div> : 'Complete Registration'}
          </button>
        </form>

        <p style={{ marginTop: '30px', color: 'var(--text-muted)', textAlign: 'center' }}>
          Already registered? <a href="/login" style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>Login Here</a>
        </p>
      </div>
    </main>
  );
}
