"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowLeft } from 'lucide-react';

export default function NavigationAndSplash() {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
  const hideNavigationRoutes = ['/admin', '/admin-login', '/donor-dashboard', '/login', '/register', '/about'];
  if (hideNavigationRoutes.includes(pathname) || pathname.startsWith('/features/')) {
    return null;
  }

  // Magnetic hover effect wrapper
  const MagneticButton = ({ children, href, className, style, onClick }) => {
    const Wrapper = href ? motion.a : motion.button;
    return (
      <Wrapper 
        href={href}
        onClick={onClick}
        className={className}
        style={{ 
          ...style, 
          cursor: 'pointer',
          background: className && className.includes('btn') ? undefined : 'transparent',
          border: className && className.includes('btn') ? undefined : 'none'
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {children}
      </Wrapper>
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
              background: 'var(--bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center',
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
                style={{ fontSize: '3rem', margin: 0, letterSpacing: '-1px', color: 'var(--text-primary)' }}
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
        <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {!showSplash ? (
            <>
              {pathname !== '/' && (
                <MagneticButton onClick={() => router.back()} style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                  <ArrowLeft size={24} />
                </MagneticButton>
              )}
              <motion.a href="/" style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none' }}>
                <motion.img 
                  layoutId={pathname === '/' ? "pulsegrid-logo" : undefined}
                  src="/logo.jpg" 
                  alt="PulseGrid Logo" 
                  style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'contain' }} 
                  transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                />
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>PulseGrid</motion.span>
              </motion.a>
            </>
          ) : (
            // Placeholder space while logo is animating from center
            <div style={{ width: '150px', height: '45px' }}></div>
          )}
        </div>
        
        <div className="nav-links">
          <MagneticButton href="/" className="nav-link" style={{ color: 'var(--text-primary)' }}>Home</MagneticButton>
          <MagneticButton href="/blood-banks" className="nav-link" style={{ color: 'var(--text-primary)' }}>Find Donors</MagneticButton>
          <MagneticButton href="/request-blood" className="nav-link" style={{ color: 'var(--primary-red)' }}>Request Blood</MagneticButton>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <MagneticButton href="/login" className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Register / Login</MagneticButton>
          </div>
        </div>
      </motion.nav>
    </LayoutGroup>
  );
}
