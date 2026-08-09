import './globals.css'

export const metadata = {
  title: 'PulseGrid - Location-Based Blood Bank',
  description: 'Connect with nearby blood donors and blood banks instantly.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 50px', backgroundColor: 'var(--glass-bg)', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold' }}>
            <img src="/logo.jpg" alt="PulseGrid Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            PulseGrid
          </div>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', alignItems: 'center' }}>
            <li><a href="/">Home</a></li>
            <li><a href="/register">Find Donors</a></li>
            <li><a href="/blood-banks">Blood Banks</a></li>
            <li><a href="/login" style={{ backgroundColor: 'var(--primary-red)', color: '#fff', padding: '10px 20px', borderRadius: '8px' }}>Admin Login</a></li>
          </ul>
        </nav>
        
        {children}

        {/* Footer */}
        <footer style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '40px 50px', marginTop: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ marginBottom: '10px' }}>PulseGrid</h2>
              <p style={{ maxWidth: '300px', color: '#aaa' }}>Saving lives through seamless location-based blood donation networking.</p>
            </div>
            <div>
              <h3 style={{ marginBottom: '10px' }}>Contact Us</h3>
              <p>Email: emergency@pulsegrid.com</p>
              <p>Phone: +1 (800) 123-4567</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px', color: '#777' }}>
            © 2026 PulseGrid. All Rights Reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
