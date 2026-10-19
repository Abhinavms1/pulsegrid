"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import IntroLoader from './IntroLoader';

export default function NavigationAndSplash() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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
      <header className="nav-bar-container">
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
                  padding: '4px',
                  borderRadius: '6px',
                  marginRight: '2px'
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

          {/* Navigation Links */}
          <nav className="nav-links" style={{ position: 'relative', zIndex: 2 }}>
            <Link href="/" className="nav-link nav-link-desktop">
              Home
            </Link>
            <Link href="/blood-banks" className="nav-link">
              <span className="nav-text-desktop">Find Donors & Banks</span>
              <span className="nav-text-mobile">Banks</span>
            </Link>
            <Link href="/about" className="nav-link nav-link-desktop">
              About
            </Link>
            <Link href="/request-blood" className="nav-link-prominent" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-crimson)', display: 'inline-block' }}></span>
              <span className="nav-text-desktop">Request Blood</span>
              <span className="nav-text-mobile">Request</span>
            </Link>
            <Link href="/login" className="btn-primary btn-nav">
              <span className="btn-nav-text-desktop">Register / Login</span>
              <span className="btn-nav-text-mobile">Login</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
