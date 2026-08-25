import './globals.css'
import SmoothScroll from '../components/SmoothScroll';
import NavigationAndSplash from '../components/NavigationAndSplash';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'PulseGrid - Advanced Blood Network',
  description: 'Emergency blood network infrastructure.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <SmoothScroll>
            <NavigationAndSplash />
            
            <div>
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
