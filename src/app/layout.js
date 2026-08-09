import './globals.css'
import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';

export const metadata = {
  title: 'PulseGrid - Advanced Blood Network',
  description: 'Emergency blood network infrastructure.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <CustomCursor />
          
          <nav className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', margin: '20px 50px', borderRadius: '50px', position: 'sticky', top: '20px', zIndex: 1000, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'white', padding: '5px', borderRadius: '50%' }}>
                <img src="/logo.jpg" alt="PulseGrid Logo" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-light)', letterSpacing: '-0.5px' }}>PulseGrid</span>
            </div>
            
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <a href="/" className="nav-link">Home</a>
              <a href="/blood-banks" className="nav-link">Find Donors</a>
              <a href="/request-blood" className="nav-link" style={{ color: 'var(--primary-red)' }}>Request Blood</a>
              <a href="/admin-login" className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Admin Login</a>
            </div>
          </nav>
          
          <div style={{ paddingTop: '20px' }}>
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
