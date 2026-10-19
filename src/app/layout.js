import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import NavigationAndSplash from '../components/NavigationAndSplash';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata = {
  title: 'PulseGrid - Emergency Blood Network & Blood Bank Locator | Kerala',
  description: 'Real-time emergency blood supply chain and verified blood bank locator across Kerala. Rapid donor coordination and hospital logistics.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className={inter.className} style={{ backgroundColor: '#FFFFFF', color: '#475569' }}>
        <SmoothScroll>
          <NavigationAndSplash />
          <div style={{ position: 'relative' }}>
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
