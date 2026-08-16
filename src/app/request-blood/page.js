"use client";
import { useState } from 'react';
import { submitEmergencyRequest } from '../actions';
import { motion } from 'framer-motion';

export default function RequestBlood() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const formData = new FormData(e.target);
    const result = await submitEmergencyRequest(formData);
    
    setLoading(false);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'transparent', paddingTop: '150px', paddingBottom: '100px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 className="text-massive" style={{ fontSize: '3.5rem', color: 'var(--primary-red)' }}>Request Blood</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '15px' }}>Initiate an emergency network broadcast to nearby facilities.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="liquid-glass" style={{ padding: '50px', borderRadius: '30px' }}>
          {success ? (
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
               <div style={{ width: '80px', height: '80px', background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', fontSize: '2rem' }}>✓</div>
               <h2 className="text-massive" style={{ fontSize: '2rem', marginBottom: '15px', color: 'var(--text-light)' }}>Emergency Broadcast Initiated</h2>
               <p style={{ color: 'var(--text-muted)' }}>We have pinged all verified blood banks in a 50km radius. They will contact you shortly.</p>
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              {errorMsg && <div style={{ gridColumn: 'span 2', background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', padding: '15px', borderRadius: '12px' }}>{errorMsg}</div>}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-light)', fontWeight: '600' }}>Patient / Hospital Name</label>
                <input type="text" name="patientName" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', fontSize: '1rem', color: 'var(--text-light)', outline: 'none' }} placeholder="Enter facility or patient name..." />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-light)', fontWeight: '600' }}>Blood Group Required</label>
                <select name="bloodGroupRequired" required style={{ width: '100%', padding: '16px', background: 'var(--dark-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', fontSize: '1rem', color: 'var(--text-light)', outline: 'none' }}>
                  <option value="">Select Type</option>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="O+">O+</option><option value="O-">O-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-light)', fontWeight: '600' }}>Units Required</label>
                <input type="number" name="unitsRequired" min="1" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', fontSize: '1rem', color: 'var(--text-light)', outline: 'none' }} placeholder="e.g. 2" />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-light)', fontWeight: '600' }}>Emergency Contact Number</label>
                <input type="tel" name="contactNumber" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', fontSize: '1rem', color: 'var(--text-light)', outline: 'none' }} placeholder="+1 (555) 000-0000" />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '20px' }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '20px', fontSize: '1.2rem', borderRadius: '15px' }}>
                  {loading ? 'Broadcasting...' : 'Broadcast Emergency Request'}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
