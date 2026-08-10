"use client";
import { useState } from 'react';

export default function RequestBlood() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'transparent', paddingTop: '150px', paddingBottom: '100px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 className="text-massive" style={{ fontSize: '3.5rem', color: 'var(--primary-red)' }}>Request Blood</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '15px' }}>Initiate an emergency network broadcast to nearby facilities.</p>
        </div>

        <div className="liquid-glass" style={{ padding: '50px', borderRadius: '30px' }}>
          {success ? (
             <div style={{ textAlign: 'center', padding: '40px 0' }}>
               <div style={{ width: '80px', height: '80px', background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', fontSize: '2rem' }}>✓</div>
               <h2 className="text-massive" style={{ fontSize: '2rem', marginBottom: '15px' }}>Emergency Broadcast Initiated</h2>
               <p style={{ color: 'var(--text-muted)' }}>We have pinged all verified blood banks in a 50km radius. They will contact you shortly.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-dark)', fontWeight: '600' }}>Patient / Hospital Name</label>
                <input type="text" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', fontSize: '1rem', outline: 'none' }} placeholder="Enter facility or patient name..." />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-dark)', fontWeight: '600' }}>Blood Group Required</label>
                <select required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', fontSize: '1rem', outline: 'none' }}>
                  <option value="">Select Type</option>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="O+">O+</option><option value="O-">O-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-dark)', fontWeight: '600' }}>Units Required</label>
                <input type="number" min="1" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', fontSize: '1rem', outline: 'none' }} placeholder="e.g. 2" />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-dark)', fontWeight: '600' }}>Emergency Contact Number</label>
                <input type="tel" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', fontSize: '1rem', outline: 'none' }} placeholder="+1 (555) 000-0000" />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '20px' }}>
                <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '20px', fontSize: '1.2rem', borderRadius: '15px' }}>
                  {loading ? 'Broadcasting...' : 'Broadcast Emergency Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
