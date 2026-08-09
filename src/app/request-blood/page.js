"use client";

import { useState } from 'react';

export default function RequestBlood() {
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
        <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '50px', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(230,57,70,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem', color: 'var(--primary-red)' }}>✓</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-light)' }}>Emergency Broadcast Sent</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Your request has been pinged to all verified donors and blood banks within a 50km radius. You will be contacted shortly.</p>
          <a href="/" className="btn-primary" style={{ display: 'inline-block' }}>Return to Map</a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--primary-red)', textAlign: 'center' }}>Emergency Blood Request</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', textAlign: 'center' }}>Fill this out to immediately broadcast a request to nearby donors.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="text" placeholder="Patient Name" className="input-glass" required />
          <input type="text" placeholder="Hospital / Location" className="input-glass" required />
          
          <select className="input-glass" required style={{ appearance: 'none', backgroundColor: 'var(--dark-surface)' }}>
            <option value="" disabled selected>Required Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <input type="number" placeholder="Units Required" className="input-glass" required min="1" max="10" />
          <input type="tel" placeholder="Contact Phone Number" className="input-glass" required />
          
          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }} disabled={loading}>
            {loading ? <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div> : 'Broadcast Emergency'}
          </button>
        </form>
      </div>
    </main>
  );
}
