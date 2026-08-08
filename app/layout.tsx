import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { AuthProvider } from '@/lib/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ABTalks — 60-Day Developer Challenge',
  description: 'Build consistency, ship every day, and prove your progress with ABTalks. 60 Days. One Streak. A Better Developer.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'ABTalks — 60-Day Developer Challenge',
    description: 'Build consistency, ship every day, and prove your progress with ABTalks.',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 1200,
        alt: 'ABTalks 60-Day Coding Challenge Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-orange-500 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pb-20 md:pb-10">
            {children}
          </main>
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
