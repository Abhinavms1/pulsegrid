import './globals.css'
import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'PulseGrid - Advanced Blood Network',
  description: 'Emergency blood network infrastructure.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          
          <nav className="glass-panel nav-bar">
            <div className="nav-brand">
              <div style={{ background: 'white', padding: '5px', borderRadius: '50%' }}>
                <img src="/logo.jpg" alt="PulseGrid Logo" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-light)', letterSpacing: '-0.5px' }}>PulseGrid</span>
            </div>
            
            <div className="nav-links">
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
