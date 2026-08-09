import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  // Try connecting to Supabase via Prisma
  let banks = []
  let errorMsg = null

  try {
    banks = await prisma.bloodBank.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (err) {
    console.error("Prisma error:", err)
    errorMsg = "Warning: Could not connect to Supabase database. Please ensure your Vercel Environment Variables (DATABASE_URL) are correctly set up via the Supabase Integration."
  }

  const users = { length: 12450 };
  const bloodBanks = { length: banks.length };
  const requests = { length: 125 };

  return (
    <main style={{ minHeight: '80vh', padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '30px', color: 'var(--text-light)' }}>Admin <span style={{ color: 'var(--primary-red)' }}>Dashboard</span></h1>
      
      {errorMsg && (
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px', border: '1px solid var(--primary-red)', color: 'var(--primary-red)' }}>
          {errorMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '50px' }}>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Total Users/Donors</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{users.length.toLocaleString()}</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Registered Blood Banks</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{bloodBanks.length.toLocaleString()}</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Active Requests</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{requests.length.toLocaleString()}</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>System Overview</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
          Welcome to the PulseGrid secure admin panel. Currently displaying mocked demonstration data. 
          <br/><br/>
          <strong>Database Notice:</strong> To store and display real live data in a production environment like Vercel, the local SQLite database must be upgraded to a Cloud Database (e.g., Supabase or Vercel Postgres).
        </p>
      </div>
    </main>
  );
}
