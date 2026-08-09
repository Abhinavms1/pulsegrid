import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch data directly on the server
  const users = await prisma.user.findMany();
  const bloodBanks = await prisma.bloodBank.findMany();
  const requests = await prisma.emergencyRequest.findMany();

  return (
    <main style={{ minHeight: '80vh', padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '30px', color: 'var(--text-light)' }}>Admin <span style={{ color: 'var(--primary-red)' }}>Dashboard</span></h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '50px' }}>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Total Users/Donors</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{users.length}</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Registered Blood Banks</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{bloodBanks.length}</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Active Requests</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{requests.length}</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>System Overview</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          The database is successfully connected and tracking live data. Currently, the system is empty. 
          Once users begin registering through the frontend forms, their data will appear in this secure admin panel.
        </p>
      </div>
    </main>
  );
}
