"use client";

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NavigationAndSplash() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide the global navigation on portal/internal routes
  const hideNavigationRoutes = ['/admin', '/admin-login', '/donor-dashboard', '/features/'];
  if (hideNavigationRoutes.some(route => pathname.startsWith(route))) {
    return null;
  }

  return (
    <header className="nav-bar-container">
      <div className="nav-bar-inner">
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
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
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                objectFit: 'contain',
                border: '1px solid var(--border-color)'
              }}
            />
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.15rem',
              color: 'var(--navy-primary)',
              letterSpacing: '-0.02em'
            }}>
              PulseGrid
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link href="/" className="nav-link nav-link-desktop">
            Home
          </Link>
          <Link href="/blood-banks" className="nav-link">
            <span className="nav-text-desktop">Find Donors & Banks</span>
            <span className="nav-text-mobile">Find Banks</span>
          </Link>
          <Link href="/about" className="nav-link nav-link-desktop">
            About
          </Link>
          <Link href="/request-blood" className="nav-link-prominent" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-crimson)', display: 'inline-block' }}></span>
            Request Blood
          </Link>
          <Link href="/login" className="btn-primary btn-nav">
            <span className="btn-nav-text-desktop">Register / Login</span>
            <span className="btn-nav-text-mobile">Login</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
