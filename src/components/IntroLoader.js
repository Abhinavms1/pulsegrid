"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function IntroLoader() {
  const [showLoader, setShowLoader] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only play on home page on first visit per session
    if (pathname !== '/') return;

    try {
      const seen = sessionStorage.getItem('pulsegrid_intro_seen');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (seen || prefersReducedMotion) {
        return;
      }

      setShowLoader(true);
      document.body.style.overflow = 'hidden';

      const fadeTimer = setTimeout(() => {
        setFadingOut(true);
      }, 1850);

      const hideTimer = setTimeout(() => {
        setShowLoader(false);
        document.body.style.overflow = '';
        sessionStorage.setItem('pulsegrid_intro_seen', 'true');
      }, 2300);

      const safetyTimer = setTimeout(() => {
        setShowLoader(false);
        document.body.style.overflow = '';
        sessionStorage.setItem('pulsegrid_intro_seen', 'true');
      }, 2800);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
        clearTimeout(safetyTimer);
        document.body.style.overflow = '';
      };
    } catch {
      // safe fallback
    }
  }, [pathname]);

  if (!showLoader || pathname !== '/') return null;

  return (
    <div
      aria-label="PulseGrid Loading Screen"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: fadingOut ? 0 : 1,
        transform: fadingOut ? 'translateY(-16px)' : 'translateY(0)',
        pointerEvents: fadingOut ? 'none' : 'auto'
      }}
    >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Expanding Crimson Pulse Ring */}
        <div className="loader-pulse-ring" />

        {/* Liquid Glass Badge with Logo Pop */}
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 12px 36px rgba(11, 27, 43, 0.08), 0 0 0 1px rgba(193, 18, 31, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
            animation: 'logoPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
          }}
        >
          <img
            src="/logo.jpg"
            alt="PulseGrid Logo"
            style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'contain' }}
          />
        </div>

        {/* Brand Name */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.8rem',
            color: 'var(--navy-primary)',
            letterSpacing: '0.03em',
            marginTop: '22px',
            marginBottom: '6px',
            animation: 'textFadeIn 0.8s ease 0.3s forwards',
            opacity: 0
          }}
        >
          Pulse<span style={{ color: 'var(--primary-crimson)' }}>Grid</span>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            animation: 'textFadeIn 0.8s ease 0.45s forwards',
            opacity: 0
          }}
        >
          Kerala Emergency Blood Network
        </p>

        {/* Drawing Heartbeat (ECG Wave) */}
        <div style={{ width: '220px', height: '36px', marginTop: '16px' }}>
          <svg viewBox="0 0 220 36" style={{ width: '100%', height: '100%' }}>
            <path
              d="M0,18 L68,18 L76,18 L82,4 L88,32 L94,10 L100,24 L106,18 L220,18"
              fill="none"
              stroke="var(--primary-crimson)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="loader-ecg-path"
            />
          </svg>
        </div>

      </div>
    </div>
  );
}
