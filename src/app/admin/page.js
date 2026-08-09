import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  // SECURITY: Check Cookie
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('admin_auth');

  if (!isAuthenticated) {
    redirect('/admin-login');
  }

  // Fetch real data
  let banks = []
  let errorMsg = null

  try {
    banks = await prisma.bloodBank.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (err) {
    console.error("Prisma error:", err)
    errorMsg = "Database Connection Error: " + String(err.message || err)
  }

  const users = { length: 12450 };
  const requests = { length: 125 };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--text-light)' }}>Admin <span style={{ color: 'var(--primary-red)' }}>Dashboard</span></h1>
        <form action={async () => {
          "use server";
          cookies().delete('admin_auth');
          redirect('/admin-login');
        }}>
          <button type="submit" className="glass-panel" style={{ padding: '10px 20px', color: 'var(--text-light)', cursor: 'pointer' }}>Sign Out</button>
        </form>
      </div>
      
      {errorMsg && (
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px', border: '1px solid var(--primary-red)', color: 'var(--primary-red)' }}>
          {errorMsg}
        </div>
      )}

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Total Users/Donors</h2>
          <p style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--text-light)', margin: '10px 0' }}>{users.length.toLocaleString()}</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Registered Blood Banks</h2>
          <p style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--primary-red)', margin: '10px 0' }}>{banks.length}</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Active Emergency Requests</h2>
          <p style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--text-light)', margin: '10px 0' }}>{requests.length}</p>
        </div>
      </div>

      {/* Massive Data Tables */}
      <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--text-light)' }}>Network Blood Banks</h2>
      <div className="glass-panel" style={{ padding: '30px', overflowX: 'auto', marginBottom: '50px' }}>
        {banks.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No blood banks registered in the database yet.</p>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '15px' }}>ID</th>
                <th style={{ padding: '15px' }}>Name</th>
                <th style={{ padding: '15px' }}>Location</th>
                <th style={{ padding: '15px' }}>Status</th>
                <th style={{ padding: '15px' }}>Registered Date</th>
              </tr>
            </thead>
            <tbody>
              {banks.map(bank => (
                <tr key={bank.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '15px', color: 'var(--text-muted)' }}>{bank.id.substring(0,8)}...</td>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{bank.name}</td>
                  <td style={{ padding: '15px' }}>{bank.address}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ background: 'rgba(5, 138, 7, 0.2)', color: '#0cf011', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                      {bank.verificationStatus}
                    </span>
                  </td>
                  <td style={{ padding: '15px', color: 'var(--text-muted)' }}>{new Date(bank.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}
