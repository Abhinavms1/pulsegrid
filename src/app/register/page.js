"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerDonorAction } from '../actions';
import { motion } from 'framer-motion';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const result = await registerDonorAction(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.success) {
      router.push('/login?registered=true');
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
      {/* Left Side - Visual */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: "url('/vibrant_bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.9) contrast(1.1)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(11,17,26,0.8) 0%, rgba(11,17,26,0.4) 100%)', zIndex: 1 }}></div>
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '500px' }}>
          <h1 className="text-massive" style={{ fontSize: '4rem', color: 'var(--text-primary)', lineHeight: '1.1' }}>
            Become a <span style={{ color: 'var(--primary-red)' }}>Lifeline</span>
          </h1>
          <p style={{ color: 'var(--text-primary)', opacity: 0.8, fontSize: '1.2rem', marginTop: '20px' }}>
            Join the most advanced emergency blood network. Your registration directly connects you to verified facilities and active emergencies in your sector.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'var(--bg-secondary)' }}>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: '450px' }}>
          
          <div style={{ marginBottom: '40px' }}>
            <h2 className="text-massive" style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '10px' }}>Register</h2>
            <p style={{ color: 'var(--text-muted)' }}>Secure donor enrollment.</p>
          </div>

          {error && <div style={{ background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', padding: '15px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(211,47,47,0.2)' }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Legal Name</label>
              <input type="text" name="name" required style={{ width: '100%', padding: '16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-primary)', outline: 'none' }} placeholder="John Doe" />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
              <input type="email" name="email" required style={{ width: '100%', padding: '16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-primary)', outline: 'none' }} placeholder="john@example.com" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Blood Group</label>
              <select name="bloodGroup" required style={{ width: '100%', padding: '16px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-primary)', outline: 'none', appearance: 'none' }}>
                <option value="" disabled selected>Select Group</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Secure Password</label>
              <input type="password" name="password" required style={{ width: '100%', padding: '16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-primary)', outline: 'none' }} placeholder="Create password" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '18px', fontSize: '1.1rem', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
              {loading ? 'Processing...' : 'Complete Enrollment'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '15px', fontSize: '0.9rem' }}>— or —</p>
            <button 
              onClick={async () => {
                const { supabase } = await import('../../lib/supabase');
                await supabase.auth.signInWithOAuth({ 
                  provider: 'google',
                  options: { redirectTo: `${window.location.origin}/donor-dashboard` }
                });
              }}
              style={{ width: '100%', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 'bold' }}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
              Continue with Google
            </button>
          </div>

          <p style={{ marginTop: '30px', color: 'var(--text-muted)', textAlign: 'center' }}>
            Already registered? <a href="/login" style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>Access Portal</a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
