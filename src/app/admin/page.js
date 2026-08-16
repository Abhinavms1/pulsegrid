import { getDashboardStats } from '../actions';
import { logoutAdmin } from '../actions/auth';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark-bg)', color: 'var(--text-light)', paddingTop: '150px', paddingBottom: '100px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
          <div>
            <h1 className="text-massive" style={{ fontSize: '3rem' }}>Infrastructure <span style={{ color: 'var(--primary-red)' }}>Overview</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Secure administrator dashboard.</p>
          </div>
          <form action={logoutAdmin}>
            <button type="submit" className="liquid-glass" style={{ padding: '12px 24px', borderRadius: '50px', border: '1px solid var(--primary-red)', color: 'var(--primary-red)', fontWeight: 'bold', background: 'transparent', cursor: 'pointer' }}>
              Terminate Session
            </button>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div className="liquid-glass" style={{ padding: '30px', borderRadius: '20px' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Verified Facilities</h3>
            <p className="text-massive" style={{ fontSize: '3rem', color: 'var(--text-light)', margin: 0 }}>{stats.totalBanks}</p>
          </div>
          <div className="liquid-glass" style={{ padding: '30px', borderRadius: '20px' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Active Emergencies</h3>
            <p className="text-massive" style={{ fontSize: '3rem', color: 'var(--primary-red)', margin: 0 }}>{stats.activeRequests}</p>
          </div>
        </div>

        <h2 className="text-massive" style={{ fontSize: '2rem', marginBottom: '30px' }}>Recent Emergency Broadcasts</h2>
        
        <div className="liquid-glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          {stats.requests.length === 0 ? (
            <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No active emergency broadcasts at this time.</p>
          ) : (
            <div style={{ padding: '20px' }}>
              {stats.requests.map(req => (
                <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '5px', color: 'var(--text-light)' }}>{req.patientName}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Contact: {req.contactNumber}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', padding: '5px 12px', borderRadius: '50px', fontWeight: 'bold', marginBottom: '5px' }}>{req.unitsRequired} Units {req.bloodGroupRequired}</span>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status: {req.status}</p>
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
