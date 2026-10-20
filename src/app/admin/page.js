import { getDashboardStats, getAllUsers } from '../actions';
import { logoutAdmin } from '../actions/auth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const users = await getAllUsers();

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', paddingTop: '150px', paddingBottom: '100px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 className="text-massive" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
              Infrastructure <span style={{ color: 'var(--primary-red)' }}>Overview</span>
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>Secure administrator dashboard and live database control.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a 
              href="/api/export-users" 
              download="pulsegrid_users_export.csv"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '50px',
                background: '#0E9F6E',
                color: '#FFFFFF',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(14, 159, 110, 0.25)',
                fontSize: '0.95rem'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV / Sheets
            </a>
            <form action={logoutAdmin}>
              <button type="submit" className="liquid-glass" style={{ padding: '12px 20px', borderRadius: '50px', border: '1px solid var(--primary-red)', color: 'var(--primary-red)', fontWeight: 'bold', background: 'transparent', cursor: 'pointer', fontSize: '0.95rem' }}>
                Terminate Session
              </button>
            </form>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div className="liquid-glass" style={{ padding: '28px', borderRadius: '20px' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 600 }}>Verified Facilities</h3>
            <p className="text-massive" style={{ fontSize: '2.8rem', color: 'var(--text-primary)', margin: 0 }}>{stats.totalBanks}</p>
          </div>
          <div className="liquid-glass" style={{ padding: '28px', borderRadius: '20px' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 600 }}>Registered Donors</h3>
            <p className="text-massive" style={{ fontSize: '2.8rem', color: '#0ea5e9', margin: 0 }}>{users.length > 0 ? users.length : stats.totalDonors}</p>
          </div>
          <div className="liquid-glass" style={{ padding: '28px', borderRadius: '20px' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 600 }}>Active Emergencies</h3>
            <p className="text-massive" style={{ fontSize: '2.8rem', color: 'var(--primary-red)', margin: 0 }}>{stats.activeRequests}</p>
          </div>
        </div>

        {/* Google Sheets Sync Guide Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #FEF2F2 0%, #F0FDF4 100%)',
          border: '1px solid #BBF7D0',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          boxShadow: '0 4px 20px rgba(11, 27, 43, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#0E9F6E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#0B1B2B', margin: '0 0 6px 0', fontWeight: 700 }}>
                Live Google Sheets Synchronization
              </h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                You can view and sync all user/donor data directly inside any <strong>Google Spreadsheet</strong>. In any cell of a Google Sheet, enter this formula to stream live data:
              </p>
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '10px 14px',
                fontFamily: 'monospace',
                fontSize: '0.88rem',
                color: '#0F172A',
                overflowX: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <code>=IMPORTDATA(&quot;https://pulsegrid-ten.vercel.app/api/export-users&quot;)</code>
                <a 
                  href="/api/export-users" 
                  download="pulsegrid_users_export.csv"
                  style={{ color: '#C1121F', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'underline', whiteSpace: 'nowrap' }}
                >
                  Direct Download CSV
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Donors & Users Table */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 className="text-massive" style={{ fontSize: '1.8rem', margin: '0 0 4px 0' }}>Registered Donors & Users</h2>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.92rem' }}>Total {users.length} active registered member(s) in system.</p>
            </div>
            <a 
              href="/api/export-users" 
              download="pulsegrid_users_export.csv"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#0B1B2B',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              ↓ Download Spreadsheet (.CSV)
            </a>
          </div>

          <div className="liquid-glass" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
            {users.length === 0 ? (
              <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No registered users found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '1px solid var(--glass-border)' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Name</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Email</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Blood Group</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Role</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Status</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u.id} style={{ borderBottom: i < users.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                        <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--text-primary)' }}>{u.name || 'Anonymous'}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>{u.email}</td>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{ 
                            background: '#FEF2F2', 
                            color: 'var(--primary-red)', 
                            fontWeight: 700, 
                            padding: '3px 8px', 
                            borderRadius: '6px',
                            border: '1px solid rgba(193, 18, 31, 0.2)' 
                          }}>
                            {u.bloodGroup}
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>{u.role || 'DONOR'}</td>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{ 
                            background: u.isAvailable ? '#F0FDF4' : '#F1F5F9', 
                            color: u.isAvailable ? '#15803D' : '#64748B', 
                            fontWeight: 600, 
                            fontSize: '0.82rem',
                            padding: '3px 8px', 
                            borderRadius: '12px' 
                          }}>
                            {u.isAvailable ? '● Available' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Recent Emergency Broadcasts */}
        <h2 className="text-massive" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Recent Emergency Broadcasts</h2>
        
        <div className="liquid-glass" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
          {stats.requests.length === 0 ? (
            <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No active emergency broadcasts at this time.</p>
          ) : (
            <div style={{ padding: '10px' }}>
              {stats.requests.map(req => {
                const cleanPhone = (req.contactNumber || '').replace(/[^0-9+]/g, '');
                return (
                  <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-primary)', fontWeight: 700 }}>{req.patientName}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 6px 0' }}>
                        Broadcast ID: <code style={{ fontFamily: 'monospace' }}>{req.id}</code>
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Receiver Contact:</span>
                        <a 
                          href={`tel:${cleanPhone}`} 
                          style={{ 
                            color: '#0E9F6E', 
                            fontWeight: 700, 
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#F0FDF4',
                            padding: '3px 10px',
                            borderRadius: '6px',
                            border: '1px solid #BBF7D0',
                            fontSize: '0.9rem'
                          }}
                        >
                          📞 {req.contactNumber}
                        </a>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'inline-block', background: 'rgba(211,47,47,0.1)', color: 'var(--primary-red)', padding: '5px 12px', borderRadius: '50px', fontWeight: 'bold', marginBottom: '4px' }}>
                        {req.unitsRequired} Units {req.bloodGroupRequired}
                      </span>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Status: {req.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
