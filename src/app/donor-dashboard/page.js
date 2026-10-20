import { getActiveRequests } from '../actions';
import { logoutDonor } from '../actions/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DonorDashboard() {
  const cookieStore = await cookies();
  const rawCookie = cookieStore.get('donor_auth')?.value;

  if (!rawCookie) {
    redirect('/login');
  }

  const donorName = decodeURIComponent(rawCookie);
  const activeRequests = await getActiveRequests();

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: 'var(--navy-primary)', paddingTop: '120px', paddingBottom: '80px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Welcome Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{
              display: 'inline-block',
              backgroundColor: 'var(--primary-crimson-tint)',
              color: 'var(--primary-crimson)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '4px 12px',
              borderRadius: '50px',
              marginBottom: '10px'
            }}>
              Verified Donor Portal
            </span>
            <h1 className="text-massive" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--navy-primary)' }}>
              Welcome, <span style={{ color: 'var(--primary-crimson)' }}>{donorName}</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
              Live emergency donor network. You have direct access to patient &amp; receiver contact numbers below.
            </p>
          </div>
          <form action={logoutDonor}>
            <button
              type="submit"
              className="btn-secondary"
              style={{ padding: '10px 24px', borderRadius: '50px', fontSize: '0.9rem' }}
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--soft-shadow)', borderLeft: '4px solid var(--status-verified)' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Donation Status</h3>
            <p className="text-massive" style={{ fontSize: '2.2rem', color: 'var(--status-verified)', margin: 0, fontWeight: 800 }}>Active</p>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--soft-shadow)', borderLeft: '4px solid var(--primary-crimson)' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Active Statewide Broadcasts</h3>
            <p className="text-massive" style={{ fontSize: '2.2rem', color: 'var(--primary-crimson)', margin: 0, fontWeight: 800 }}>{activeRequests.length}</p>
          </div>
        </div>

        {/* Active Emergency Requests */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--navy-primary)', margin: 0, fontWeight: 700 }}>
              Active Emergency Requests ({activeRequests.length})
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
              Direct receiver mobile numbers are displayed for rapid emergency coordination. Tap to call or message immediately.
            </p>
          </div>
        </div>
        
        {activeRequests.length === 0 ? (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '48px', textAlign: 'center', boxShadow: 'var(--soft-shadow)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
              No active emergency broadcasts at this time. All sectors are currently clear.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {activeRequests.map(req => {
              const cleanPhone = (req.contactNumber || '').replace(/[^0-9+]/g, '');
              const cleanDigits = (req.contactNumber || '').replace(/[^0-9]/g, '');
              const waMessage = encodeURIComponent(`Hello, I am ${donorName}, a verified blood donor on PulseGrid responding to your emergency request for ${req.patientName} (${req.unitsRequired} Units ${req.bloodGroupRequired}). How can I help?`);

              return (
                <div 
                  key={req.id} 
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '16px', 
                    boxShadow: '0 4px 20px rgba(11, 27, 43, 0.05)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  {/* Top Row: Patient Info and Blood Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-crimson)',
                          boxShadow: '0 0 8px rgba(193, 18, 31, 0.6)'
                        }} />
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-primary)', fontWeight: 700, margin: 0 }}>
                          {req.patientName}
                        </h3>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                        Emergency Broadcast ID: <code style={{ fontFamily: 'monospace', color: '#475569' }}>{req.id}</code>
                      </p>
                    </div>

                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      backgroundColor: 'var(--primary-crimson-tint)', 
                      color: 'var(--primary-crimson)', 
                      padding: '6px 16px', 
                      borderRadius: '50px', 
                      fontWeight: 800, 
                      fontSize: '0.92rem',
                      border: '1px solid rgba(193, 18, 31, 0.15)'
                    }}>
                      Requires {req.unitsRequired} Units {req.bloodGroupRequired}
                    </span>
                  </div>

                  {/* Middle Row: Prominent Receiver Mobile Number & Call Actions */}
                  <div className="receiver-contact-box" style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}>
                    <div>
                      <span style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#64748B',
                        marginBottom: '4px'
                      }}>
                        Receiver Mobile Number (Direct Line)
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: '#F0FDF4',
                          border: '1px solid #BBF7D0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0E9F6E'
                        }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <span style={{
                          fontSize: '1.3rem',
                          fontWeight: 800,
                          color: '#0B1B2B',
                          letterSpacing: '0.04em',
                          fontFamily: 'var(--font-heading)'
                        }}>
                          {req.contactNumber}
                        </span>
                      </div>
                    </div>

                    {/* Direct Contact Action Buttons */}
                    <div className="receiver-actions-group" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <a
                        href={`tel:${cleanPhone}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#0E9F6E',
                          color: '#FFFFFF',
                          padding: '10px 18px',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: '0 2px 8px rgba(14, 159, 110, 0.25)',
                          transition: 'transform 0.15s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Call Receiver
                      </a>

                      <a
                        href={`https://wa.me/${cleanDigits}?text=${waMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          padding: '10px 18px',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
                          transition: 'transform 0.15s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
