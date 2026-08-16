"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../actions/auth';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.target);
    const result = await loginAdmin(formData);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.success) {
      router.push('/admin');
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', position: 'relative' }}>
      
      {/* Background Graphic */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(211,47,47,0.05) 0%, rgba(250,249,246,0) 70%)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, rgba(250,249,246,0) 70%)', borderRadius: '50%' }}></div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="liquid-glass" style={{ padding: '60px', borderRadius: '30px', width: '100%', maxWidth: '500px', position: 'relative', zIndex: 1 }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <img src="/logo.jpg" alt="PulseGrid" style={{ width: '60px', height: '60px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 10px 20px rgba(211,47,47,0.2)' }} />
          <h1 className="text-massive" style={{ fontSize: '2.5rem', textAlign: 'center', color: 'var(--text-light)' }}>Admin Portal</h1>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '10px' }}>Secure infrastructure access</p>
        </div>

        {error && <div style={{ background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', padding: '15px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(211,47,47,0.2)' }}>{error}</div>}
        
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-light)', fontWeight: '600', fontSize: '0.95rem' }}>Administrator ID</label>
            <input type="text" name="username" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-light)', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }} placeholder="Enter ID..." />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-light)', fontWeight: '600', fontSize: '0.95rem' }}>Secure Passphrase</label>
            <input type="password" name="password" required style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-light)', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }} placeholder="Enter passphrase..." />
          </div>
          
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem', marginTop: '10px' }}>
            {loading ? 'Authenticating...' : 'Establish Secure Connection'}
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
