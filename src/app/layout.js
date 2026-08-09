import './globals.css'

export const metadata = {
  title: 'PulseGrid - Location-Based Blood Bank',
  description: 'Connect with nearby blood donors and blood banks instantly.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '20px 50px',
          background: 'rgba(11, 14, 20, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: 'white', borderRadius: '50%', padding: '5px', display: 'flex' }}>
              <img src="/logo.jpg" alt="PulseGrid Logo" style={{ height: '40px', width: '40px', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>PulseGrid</span>
          </div>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="/" className="nav-link">Home</a>
            <a href="/blood-banks" className="nav-link">Find Donors</a>
            <a href="/request-blood" className="nav-link" style={{ color: 'var(--primary-red)' }}>Request Blood</a>
            <a href="/admin" className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Admin Login</a>
          </div>
        </nav>
        
        <div style={{ paddingTop: '85px' }}>
          {children}
        </div>

        <footer style={{ 
          background: 'var(--dark-surface)', 
          borderTop: '1px solid var(--glass-border)',
          padding: '60px 50px 30px', 
          marginTop: '80px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.8rem', fontWeight: '800', marginBottom: '15px' }}>
                <div style={{ background: 'white', padding: '4px', borderRadius: '50%', display: 'flex' }}>
                  <img src="/logo.jpg" alt="Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                </div>
                PulseGrid
              </div>
              <p style={{ maxWidth: '300px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Saving lives through seamless location-based blood donation networking. Fast, secure, and always active.</p>
            </div>
            <div>
              <h3 style={{ marginBottom: '20px', color: 'white' }}>Contact Support</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Email: emergency@pulsegrid.com</p>
              <p style={{ color: 'var(--text-muted)' }}>Hotline: +1 (800) 123-4567</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} PulseGrid Technologies. All Rights Reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
