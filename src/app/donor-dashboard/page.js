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
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Donor control center and live emergency routing across Kerala.</p>
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

        <h2 style={{ fontSize: '1.6rem', color: 'var(--navy-primary)', marginBottom: '24px', fontWeight: 700 }}>
          Active Emergency Requests
        </h2>
        
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '16px', boxShadow: 'var(--soft-shadow)', overflow: 'hidden' }}>
          {activeRequests.length === 0 ? (
            <p style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '1rem' }}>
              No active emergency broadcasts at this time. All sectors are currently clear.
            </p>
          ) : (
            <div>
              {activeRequests.map(req => (
                <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '4px', color: 'var(--navy-primary)', fontWeight: 700 }}>{req.patientName}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Contact: {req.contactNumber}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px', margin: 0 }}>Broadcast ID: {req.id}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', backgroundColor: 'var(--primary-crimson-tint)', color: 'var(--primary-crimson)', padding: '6px 14px', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem' }}>
                      Requires {req.unitsRequired} Units {req.bloodGroupRequired}
                    </span>
                    <br/>
                    <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem', marginTop: '10px' }}>
                      Accept Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
