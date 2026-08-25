import { getActiveRequests } from '../actions';
import { logoutDonor } from '../actions/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DonorDashboard() {
  const cookieStore = await cookies();
  const donorName = cookieStore.get('donor_auth')?.value;

  if (!donorName) {
    redirect('/login');
  }

  const activeRequests = await getActiveRequests();

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', paddingTop: '150px', paddingBottom: '100px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
          <div>
            <h1 className="text-massive" style={{ fontSize: '3rem' }}>Welcome, <span style={{ color: '#0ea5e9' }}>{donorName}</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Donor control center and emergency routing.</p>
          </div>
          <form action={logoutDonor}>
            <button type="submit" className="liquid-glass" style={{ padding: '12px 24px', borderRadius: '50px', border: '1px solid #0ea5e9', color: '#0ea5e9', fontWeight: 'bold', background: 'transparent', cursor: 'pointer' }}>
              Secure Logout
            </button>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div className="liquid-glass" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid #0ea5e9' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Status</h3>
            <p className="text-massive" style={{ fontSize: '2.5rem', color: '#0cf011', margin: 0 }}>Active</p>
          </div>
          <div className="liquid-glass" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid var(--primary-red)' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Local Emergencies</h3>
            <p className="text-massive" style={{ fontSize: '2.5rem', color: 'var(--primary-red)', margin: 0 }}>{activeRequests.length}</p>
          </div>
        </div>

        <h2 className="text-massive" style={{ fontSize: '2rem', marginBottom: '30px' }}>Active Broadcasts</h2>
        
        <div className="liquid-glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          {activeRequests.length === 0 ? (
            <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No active emergency broadcasts at this time. Sector is clear.</p>
          ) : (
            <div style={{ padding: '20px' }}>
              {activeRequests.map(req => (
                <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '5px', color: 'var(--text-primary)' }}>{req.patientName}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Contact: {req.contactNumber}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '5px' }}>Broadcast ID: {req.id}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', padding: '5px 12px', borderRadius: '50px', fontWeight: 'bold', marginBottom: '5px' }}>Requires {req.unitsRequired} Units {req.bloodGroupRequired}</span>
                    <br/>
                    <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem', marginTop: '10px' }}>Accept Request</button>
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
