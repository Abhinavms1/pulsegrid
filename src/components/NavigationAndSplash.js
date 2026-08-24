"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

export default function NavigationAndSplash() {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Only run splash on homepage
    if (pathname === '/') {
      setShowSplash(true);
      const timer = setTimeout(() => setShowSplash(false), 2500);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [pathname]);

  // Hide the global navigation and splash on portal routes
  const hideNavigationRoutes = ['/admin', '/admin-login', '/login', '/register', '/donor-dashboard'];
  if (hideNavigationRoutes.includes(pathname)) {
    return null;
  }

  // Magnetic hover effect wrapper
  const MagneticButton = ({ children, href, className, style }) => {
    return (
      <motion.a 
        href={href}
        className={className}
        style={style}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.a>
    )
  };

  return (
    <LayoutGroup>
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="splash-screen"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'var(--bg-cream)', display: 'flex', justifyContent: 'center', alignItems: 'center',
              zIndex: 9999
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <motion.img 
                layoutId="pulsegrid-logo"
                src="/logo.jpg" 
                alt="PulseGrid Logo" 
                style={{ width: '120px', height: '120px', borderRadius: '25px', objectFit: 'contain', boxShadow: '0 10px 30px rgba(211,47,47,0.2)' }} 
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              />
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="text-massive" 
                style={{ fontSize: '3rem', margin: 0, letterSpacing: '-1px' }}
              >
                PulseGrid
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav 
        className="liquid-glass nav-bar"
        initial={{ opacity: pathname === '/' ? 0 : 1, y: pathname === '/' ? -20 : 0 }}
        animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? -20 : 0 }}
        transition={{ duration: 0.8, delay: showSplash ? 0 : 0.4 }}
      >
        <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {!showSplash ? (
            <>
              <motion.a href="/" style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none' }}>
                <motion.img 
                  layoutId={pathname === '/' ? "pulsegrid-logo" : undefined}
                  src="/logo.jpg" 
                  alt="PulseGrid Logo" 
                  style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'contain' }} 
                  transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                />
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#0b111a', letterSpacing: '-0.5px' }}>PulseGrid</motion.span>
              </motion.a>
            </>
          ) : (
            // Placeholder space while logo is animating from center
            <div style={{ width: '150px', height: '45px' }}></div>
          )}
        </div>
        
        <div className="nav-links">
          <MagneticButton href="/" className="nav-link" style={{ color: 'var(--text-dark)' }}>Home</MagneticButton>
          <MagneticButton href="/blood-banks" className="nav-link" style={{ color: 'var(--text-dark)' }}>Find Donors</MagneticButton>
          <MagneticButton href="/request-blood" className="nav-link" style={{ color: 'var(--primary-red)' }}>Request Blood</MagneticButton>
          <MagneticButton href="/login" className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Register / Login</MagneticButton>
        </div>
      </motion.nav>
    </LayoutGroup>
  );
}
