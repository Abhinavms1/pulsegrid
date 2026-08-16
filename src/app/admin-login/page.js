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
    
    try {
      const formData = new FormData(e.target);
      const result = await loginAdmin(formData);
      
      if (result && result.error) {
        setError(result.error);
        setLoading(false);
      } else if (result && result.success) {
        document.cookie = "admin_auth=true; path=/; max-age=86400";
        router.push('/admin');
      } else {
        setError('An unexpected error occurred during authentication.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Connection to server lost. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', position: 'relative' }}>
      
      {/* Background Graphic */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: "url('/vibrant_bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(1.1)' }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(11,17,26,0.3) 0%, rgba(11,17,26,0.9) 100%)' }}></div>
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
