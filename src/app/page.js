"use client";

import Link from 'next/link';
import { ArrowRight, Search, Droplets, Bell, PhoneCall } from 'lucide-react';

export default function Home() {
  const architectureFeatures = [
    {
      icon: <Search size={24} />,
      title: 'Real-Time Inventory Tracking',
      description: 'Advanced geolocation algorithms identify verified blood banks and hospitals with current units of the required blood group across all 14 districts in Kerala.'
    },
    {
      icon: <Droplets size={24} />,
      title: 'Intelligent Donor Matching',
      description: 'Cross-references active hospital emergency requests against willing community donors by travel time, blood group compatibility, and donation eligibility cycles.'
    },
    {
      icon: <Bell size={24} />,
      title: 'Instant Emergency Alerts',
      description: 'Bypasses slow communication channels with immediate SMS and push notifications to verified nearby donors, drastically reducing critical response latency.'
    }
  ];

  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', position: 'relative' }}>

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION (Clean Light Theme, Normal Flow, No Overlap)
          ══════════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop: '116px', // Navbar height (68px) + 48px buffer
        paddingBottom: '80px',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}>
        <div className="content-container" style={{ textAlign: 'center' }}>

          {/* Hero Category Badge */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--primary-crimson-tint)',
              color: 'var(--primary-crimson)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '6px 18px',
              borderRadius: '50px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-crimson)' }}></span>
              Emergency Blood Logistics Network
            </span>
          </div>

          {/* Hero Headline (Navy & Crimson, Line-height 1.15 to prevent descender clipping) */}
          <div style={{ paddingBottom: '8px' }}>
            <h1 className="hero-title-main">
              Saving Lives
            </h1>
            <h2 className="hero-title-sub">
              Through Technology
            </h2>
          </div>

          {/* Hero Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-body)',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto 36px',
            opacity: 1
          }}>
            Transform passive willingness into actionable, life-saving intervention.
            PulseGrid coordinates verified blood banks, hospitals, and voluntary donors
            across Kerala with zero latency.
          </p>

          {/* Action CTAs in Normal Flow (CTAs FIRST) */}
          <div className="hero-cta-group">
            <Link href="/blood-banks" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              Find Blood Banks
            </Link>
            <Link href="/request-blood" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              Request Blood
            </Link>
          </div>

          {/* Hero Stats Card (In Normal Flow, Below CTAs with >=48px gap, White card with border & soft shadow) */}
          <div>
            <div className="hero-stats-card">
              <div className="hero-stat-col">
                <span className="hero-stat-num">482+</span>
                <span className="hero-stat-label">Verified Banks</span>
              </div>
              <div className="hero-stat-col">
                <span className="hero-stat-num">12,000+</span>
                <span className="hero-stat-label">Active Donors</span>
              </div>
              <div className="hero-stat-col">
                <span className="hero-stat-num">1.5M+</span>
                <span className="hero-stat-label">Lives Impacted</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CORE INFRASTRUCTURE SECTION (Background #F8FAFC)
          ══════════════════════════════════════════════════════════ */}
      <section
        id="core-infrastructure"
        className="section-spacing"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="content-container">
          {/* Section Header */}
          <div style={{ maxWidth: '640px', marginBottom: '56px' }}>
            <p style={{
              color: 'var(--primary-crimson)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              (02) Architecture
            </p>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: 'var(--navy-primary)',
              lineHeight: 1.2,
              marginBottom: '16px',
              fontWeight: 700
            }}>
              The Core Infrastructure
            </h2>
            <p style={{
              color: 'var(--text-body)',
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}>
              PulseGrid is engineered to eliminate systemic bottlenecks in medical logistics.
              Every component works together to accelerate emergency blood transport.
            </p>
          </div>

          {/* Feature Cards Grid (3 white cards with #FEF2F2 rounded square icons) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px'
          }}>
            {architectureFeatures.map((feat, idx) => (
              <div key={idx} className="core-feature-card">
                <div className="core-icon-box">
                  {feat.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: 'var(--navy-primary)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}>
                  {feat.title}
                </h3>
                <p style={{
                  color: 'var(--text-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  margin: 0
                }}>
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PLATFORM IMPACT SECTION (Local Royalty-Free Images)
          ══════════════════════════════════════════════════════════ */}
      <section
        id="platform-impact"
        className="section-spacing"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="content-container">
          {/* Section Header */}
          <div style={{ maxWidth: '640px', marginBottom: '56px' }}>
            <p style={{
              color: 'var(--primary-crimson)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              (03) Impact
            </p>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: 'var(--navy-primary)',
              lineHeight: 1.2,
              marginBottom: '16px',
              fontWeight: 700
            }}>
              Platform Impact
            </h2>
            <p style={{
              color: 'var(--text-body)',
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}>
              Building the most dependable blood supply coordination network across Kerala,
              connecting clinical institutions, donors, and emergency response teams.
            </p>
          </div>

          {/* 3 Impact Cards with Local Images, Same Aspect Ratio & Dark Navy Bottom Gradient */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px'
          }}>

            {/* Card 1: 482 Banks */}
            <div className="impact-card">
              <img
                src="/images/blood-bank.jpg"
                alt="Verified Blood Bank Storage and Laboratory Facilities in Kerala"
                className="impact-card-img"
                loading="lazy"
                width={600}
                height={450}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="impact-card-overlay">
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: '6px',
                  color: '#FFFFFF'
                }}>
                  482 Banks
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.4,
                  margin: 0
                }}>
                  Verified medical facilities and licensed storage centers active across Kerala.
                </p>
              </div>
            </div>

            {/* Card 2: 12K Donors */}
            <div className="impact-card">
              <img
                src="/images/donor.jpg"
                alt="Active Community Volunteers and Donors Donating Blood"
                className="impact-card-img"
                loading="lazy"
                width={600}
                height={450}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="impact-card-overlay">
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: '6px',
                  color: '#FFFFFF'
                }}>
                  12K Donors
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.4,
                  margin: 0
                }}>
                  Willing, eligible donors ready to assist on short notice in all 14 districts.
                </p>
              </div>
            </div>

            {/* Card 3: 1.5M Lives */}
            <div className="impact-card">
              <img
                src="/images/ambulance.jpg"
                alt="Emergency Ambulance Logistics and Medical Transports"
                className="impact-card-img"
                loading="lazy"
                width={600}
                height={450}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="impact-card-overlay">
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: '6px',
                  color: '#FFFFFF'
                }}>
                  1.5M Lives
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.4,
                  margin: 0
                }}>
                  Emergency transports and rapid transfusions facilitated statewide.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          EXPERIENCE THE VISION / ABOUT BRIDGE SECTION
          ══════════════════════════════════════════════════════════ */}
      <section
        className="section-spacing"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-color)'
        }}
      >
        <div className="content-container">
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--card-radius)',
            boxShadow: 'var(--soft-shadow)',
            padding: '64px 36px',
            textAlign: 'center',
            maxWidth: '860px',
            margin: '0 auto'
          }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: 'var(--primary-crimson-tint)',
              color: 'var(--primary-crimson)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '6px 16px',
              borderRadius: '50px',
              marginBottom: '16px'
            }}>
              Mission & Technology
            </span>

            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: 'var(--navy-primary)',
              lineHeight: 1.2,
              marginBottom: '16px',
              fontWeight: 700
            }}>
              Experience <span style={{ color: 'var(--primary-crimson)' }}>The Vision</span>
            </h2>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-body)',
              lineHeight: 1.7,
              maxWidth: '620px',
              margin: '0 auto 36px'
            }}>
              Discover how PulseGrid brings together real-time geolocation, automated inventory
              audits, and emergency alert routing to safeguard patients across Kerala.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/about" className="btn-primary" style={{ padding: '14px 32px' }}>
                Explore Platform Architecture <ArrowRight size={18} />
              </Link>
              <Link href="/register" className="btn-secondary" style={{ padding: '14px 32px' }}>
                Join as a Donor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER (Navy Background, Links, Helpline, Emergency Note)
          ══════════════════════════════════════════════════════════ */}
      <footer style={{
        backgroundColor: 'var(--navy-footer)',
        color: '#FFFFFF',
        padding: '72px 0 36px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="content-container">

          {/* Emergency Helpline Banner */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            padding: '18px 24px',
            marginBottom: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-crimson)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <PhoneCall size={20} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Emergency Assistance
                </div>
                <div style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  Kerala State Emergency Helpline: Dial 108 (Ambulance) • 104 (Health & Blood Information)
                </div>
              </div>
            </div>
            <a
              href="tel:108"
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            >
              Call 108 Now
            </a>
          </div>

          {/* Links Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}>
            {/* Branding Column */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img
                  src="/logo.jpg"
                  alt="PulseGrid Logo"
                  style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'contain' }}
                />
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#FFFFFF'
                }}>
                  PulseGrid
                </span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '300px' }}>
                Connecting verified blood facilities and voluntary donors to build
                a resilient emergency medical network across Kerala.
              </p>
            </div>

            {/* Platform Links */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>
                Platform
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link href="/" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Home</Link></li>
                <li><Link href="/blood-banks" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Find Donors & Banks</Link></li>
                <li><Link href="/request-blood" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Request Urgent Blood</Link></li>
                <li><Link href="/about" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>About Platform</Link></li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>
                Legal & Security
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link href="/privacy-policy" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Terms of Service</Link></li>
                <li><Link href="/admin-login" style={{ color: '#64748B', fontSize: '0.85rem' }}>Hospital Portal Login</Link></li>
              </ul>
            </div>
          </div>

          {/* Medical Disclaimer & Copyright */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '28px',
            fontSize: '0.8rem',
            color: '#64748B',
            lineHeight: 1.6
          }}>
            <p style={{ marginBottom: '12px' }}>
              <strong>Medical Disclaimer:</strong> PulseGrid connects willing donors and verified medical facilities to minimize response latency during emergencies. PulseGrid is a coordination and logistics technology platform and is not a substitute for direct medical diagnosis, emergency healthcare services, or professional medical advice. In life-threatening emergencies, always dial 108 or contact your local hospital immediately.
            </p>
            <p style={{ margin: 0 }}>
              &copy; {new Date().getFullYear()} PulseGrid Technologies. Built for Kerala. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </main>
  );
}
