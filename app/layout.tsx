import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import { getSiteConfig } from '@/lib/site-config';
import { localBusinessJsonLd, faqJsonLd } from '@/lib/seo';
import { FAQ_DATA } from '@/lib/data';
import { GoogleAnalytics } from '@next/third-parties/google';
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

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();

  return {
    title: {
      default: config.siteTitle,
      template: `%s — ${config.businessName}`,
    },
    description: config.metaDescription,
    applicationName: config.businessName,
    metadataBase: new URL(config.siteUrl),
    keywords: [
      'Aluminum Windows Lahore',
      'Glass Doors Lahore',
      'Shower Cabins Lahore',
      'Shop Front Glass Lahore',
      'Curtain Wall Lahore',
      'Emergency Glass Repair Lahore',
      'Basit Ali Aluminum',
      'Tempered Glass Installation Lahore',
    ],
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: '/apple-icon.png',
    },
    openGraph: {
      type: 'website',
      siteName: config.businessName,
      title: config.siteTitle,
      description: config.metaDescription,
      url: config.siteUrl,
      locale: 'en_US',
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
    },
    verification: {
      google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${plusJakartaSans.variable} ${outfit.variable}`}
    >
      <body
        className="min-h-screen bg-neutral-900 text-neutral-900 antialiased selection:bg-red-600 selection:text-white"
        suppressHydrationWarning
      >
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(FAQ_DATA)),
          }}
        />
      </body>
    </html>
  );
}
