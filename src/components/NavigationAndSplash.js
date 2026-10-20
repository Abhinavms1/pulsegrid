"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Menu, X, PhoneCall, ShieldCheck, Heart, User } from 'lucide-react';
import IntroLoader from './IntroLoader';

export default function NavigationAndSplash() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle scroll progress and blur state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
      
      // Close mobile menu on substantial scroll
      if (scrollY > 50 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isMobileMenuOpen]);

  // Close when clicking outside mobile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
    }
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: Math.round(x), y: Math.round(y) });
  };

  // Hide the global navigation on portal/internal routes
  const hideNavigationRoutes = ['/admin', '/admin-login', '/donor-dashboard', '/features/'];
  if (hideNavigationRoutes.some(route => pathname.startsWith(route))) {
    return null;
  }

  return (
    <>
      {/* Intro Loader for first visit per session */}
      <IntroLoader />

      {/* Top 2px Crimson Reading/Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Pill Liquid Glass Navbar */}
      <header className="nav-bar-container" ref={menuRef}>
        <div
          className={`nav-bar-pill ${isScrolled ? 'scrolled' : ''}`}
          onMouseMove={handleMouseMove}
          style={{
            '--mouse-x': `${mousePos.x}%`,
            '--mouse-y': `${mousePos.y}%`
          }}
        >
          {/* Brand / Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, position: 'relative', zIndex: 2 }}>
            {pathname !== '/' && (
              <button
                onClick={() => router.back()}
                aria-label="Go Back"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--navy-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  marginRight: '2px',
                  touchAction: 'manipulation'
                }}
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <img
                src="/logo.jpg"
                alt="PulseGrid Logo"
                className="nav-bar-logo"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  objectFit: 'contain',
                  border: '1px solid rgba(226, 232, 240, 0.8)'
                }}
              />
              <span
                className="nav-bar-brand-text"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: 'var(--navy-primary)',
                  letterSpacing: '-0.02em'
                }}
              >
                PulseGrid
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links nav-desktop-links" style={{ position: 'relative', zIndex: 2 }}>
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/blood-banks" className="nav-link">
              Find Donors &amp; Banks
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/request-blood" className="nav-link-prominent" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-crimson)', display: 'inline-block' }}></span>
              Request Blood
            </Link>
            <Link href="/login" className="btn-primary btn-nav">
              Register / Login
            </Link>
          </nav>

          {/* Mobile Actions: Quick Request + Hamburger Menu Toggle */}
          <div className="nav-mobile-actions" style={{ display: 'none', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 2 }}>
            <Link
              href="/request-blood"
              style={{
                backgroundColor: 'var(--primary-crimson)',
                color: '#FFFFFF',
                padding: '7px 12px',
                borderRadius: '50px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(193, 18, 31, 0.25)',
                touchAction: 'manipulation'
              }}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
              Request
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: '10px',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--navy-primary)',
                cursor: 'pointer',
                touchAction: 'manipulation'
              }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Glass Menu */}
        {isMobileMenuOpen && (
          <div
            className="mobile-nav-drawer"
            style={{
              marginTop: '8px',
              width: '100%',
              maxWidth: 'min(1200px, calc(100vw - 32px))',
              boxBox: 'border-box',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: '0 16px 40px rgba(11, 27, 43, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              animation: 'drawerFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'auto'
            }}
          >
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '12px',
                color: 'var(--navy-primary)',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                minHeight: '48px',
                touchAction: 'manipulation'
              }}
            >
              <Heart size={18} color="var(--primary-crimson)" />
              Home
            </Link>

            <Link
              href="/blood-banks"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '12px',
                color: 'var(--navy-primary)',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                minHeight: '48px',
                touchAction: 'manipulation'
              }}
            >
              <ShieldCheck size={18} color="#0E9F6E" />
              Find Donors &amp; Blood Banks
            </Link>

            <Link
              href="/request-blood"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-crimson-tint)',
                color: 'var(--primary-crimson)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                minHeight: '48px',
                touchAction: 'manipulation',
                border: '1px solid rgba(193, 18, 31, 0.15)'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-crimson)' }} />
              Request Emergency Blood
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '12px',
                color: 'var(--navy-primary)',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                minHeight: '48px',
                touchAction: 'manipulation'
              }}
            >
              <Heart size={18} color="#64748B" />
              About PulseGrid
            </Link>

            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />

            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'var(--primary-crimson)',
                color: '#FFFFFF',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                minHeight: '48px',
                touchAction: 'manipulation',
                boxShadow: '0 4px 12px rgba(193, 18, 31, 0.25)'
              }}
            >
              <User size={18} />
              Donor Portal / Login
            </Link>

            {/* Emergency Hotline 108 shortcut */}
            <a
              href="tel:108"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#F0FDF4',
                color: '#0E9F6E',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                marginTop: '4px',
                border: '1px solid #BBF7D0'
              }}
            >
              <PhoneCall size={14} />
              24/7 Kerala Emergency Ambulance: Call 108
            </a>
          </div>
        )}
      </header>
    </>
  );
}
