import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Heart, Shield, Users, MapPin, Truck, Zap, Droplet } from 'lucide-react';

const featureData = {
  'real-time-monitoring': {
    title: 'Real-Time Monitoring',
    description: 'Our real-time monitoring infrastructure tracks blood inventories and donor availability instantly. Data is pushed over WebSockets directly to emergency response dashboards, ensuring zero latency during critical scenarios. Hospital staff can view live heatmaps of blood availability across districts, allowing for rapid decision-making before an emergency even escalates.',
    icon: Activity,
  },
  'donor-matching': {
    title: 'Intelligent Donor Matching',
    description: 'PulseGrid uses a proprietary matching algorithm that pairs emergency requests with willing donors based on exact blood type, proximity, and past donation history to guarantee the highest probability of response. The system accounts for donor eligibility periods and avoids contacting those who have recently donated.',
    icon: Heart,
  },
  'verified-security': {
    title: 'Verified Security Protocol',
    description: 'Security is paramount when handling medical data. All participating blood banks and hospitals go through a rigorous, multi-factor authentication and verification process. Patient records and donor contact information are encrypted at rest and in transit, ensuring complete privacy and HIPAA-level compliance.',
    icon: Shield,
  },
  'community-network': {
    title: 'Community Network',
    description: 'PulseGrid is more than software—it is a community of thousands of willing heroes. By building a network of dedicated donors, we transform passive willingness into a highly structured, scalable emergency response team. Donors are celebrated for their contributions and can track the tangible impact they make.',
    icon: Users,
  },
  'geolocation-routing': {
    title: 'Advanced Geolocation Routing',
    description: 'When seconds count, geography matters. Our platform utilizes advanced routing APIs to ping donors and facilities based on exact travel time rather than just linear distance. We factor in current traffic conditions to dispatch resources via the fastest possible route.',
    icon: MapPin,
  },
  'emergency-logistics': {
    title: 'Emergency Logistics',
    description: 'We orchestrate the complete supply chain, from the moment a unit of blood is requested to the moment it arrives at the hospital. Dedicated logistics tracking ensures that sensitive medical transports are monitored, temperature-controlled, and expedited through designated emergency corridors.',
    icon: Truck,
  },
  'instant-alerts': {
    title: 'Instant Push Alerts',
    description: 'Donors and facilities receive immediate push notifications and SMS alerts the moment a localized emergency occurs. The system bypasses email latency and ensures that critical alerts cut through the noise, reaching those who can help in milliseconds.',
    icon: Zap,
  },
  'inventory-tracking': {
    title: 'Automated Inventory Tracking',
    description: 'Blood banks can ditch manual spreadsheets. PulseGrid automatically tracks blood unit expiration dates, volume levels, and specific component availability (plasma, platelets, whole blood). The system automatically rebalances inventory data when a unit is dispatched.',
    icon: Droplet,
  }
};

export default async function FeaturePage({ params }) {
  const { slug } = await params;
  const feature = featureData[slug];

  if (!feature) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', color: 'var(--navy-primary)' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Feature Not Found: {slug}</h1>
          <Link href="/about" className="btn-primary">Return to About</Link>
        </div>
      </main>
    );
  }

  const IconComponent = feature.icon;

  return (
    <main style={{
      minHeight: '100vh',
      padding: '48px 24px 96px',
      backgroundColor: '#FFFFFF',
      color: 'var(--text-body)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Link
          href="/about"
          className="btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '36px'
          }}
        >
          <ArrowLeft size={18} /> Back to About
        </Link>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '48px 36px',
          borderRadius: 'var(--card-radius)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--soft-shadow)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'var(--primary-crimson-tint)',
              color: 'var(--primary-crimson)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <IconComponent size={32} />
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: 'var(--navy-primary)',
              lineHeight: 1.2
            }}>
              {feature.title}
            </h1>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontSize: '1.15rem',
              lineHeight: 1.8,
              color: 'var(--text-body)',
              textAlign: 'left',
              marginBottom: '40px'
            }}>
              {feature.description}
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/blood-banks" className="btn-primary">
              Find Blood Banks
            </Link>
            <Link href="/" className="btn-secondary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
