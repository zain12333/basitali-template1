import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Basit Ali Aluminum & Glass Work | Lahore Professional Services',
  description:
    'Premier aluminum windows, doors, glass partitions, shower cabins, shop fronts, tempered glass, and 24/7 emergency repair services across Lahore. Call 0320-2740066 for free measurement.',
  keywords: [
    'Aluminum Windows Lahore',
    'Glass Doors Lahore',
    'Shower Cabins Lahore',
    'Shop Front Glass Lahore',
    'Curtain Wall Lahore',
    'Emergency Glass Repair Lahore',
    'Basit Ali Aluminum',
    'Tempered Glass Installation Lahore'
  ],
  metadataBase: new URL('https://basitali-template1.vercel.app'),
  openGraph: {
    title: 'Basit Ali Aluminum & Glass Work | Lahore',
    description:
      'Premium Aluminum Windows, Doors, Glass Partitions, Shower Cabins & Emergency Repair Services in Lahore. Call 0320-2740066.',
    type: 'website',
    siteName: 'Basit Ali Aluminum & Glass Work',
    images: [
      {
        url: '/og-image.png',
        width: 1024,
        height: 1024,
        alt: 'Basit Ali Aluminum & Glass Work Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basit Ali Aluminum & Glass Work | Lahore',
    description:
      'Professional Aluminum & Glass Services in Lahore. 24/7 Emergency Repairs. Free Measurement & Quotation.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-neutral-900 text-neutral-900 antialiased selection:bg-red-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
