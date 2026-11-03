import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import ShowerCabinsContent from '@/components/ShowerCabinsContent';

export const metadata: Metadata = {
  title: 'Bathroom Glass Shower Cabins',
  description:
    'Premium frameless and sliding glass shower enclosures, walk-in wet room panels, and custom bathroom glass solutions — expertly installed across Lahore by Basit Ali.',
  openGraph: pageOG({
    title: 'Bathroom Glass Shower Cabins',
    description: 'Premium frameless and sliding glass shower enclosures, walk-in wet room panels, and custom bathroom glass solutions — expertly installed across Lahore by Basit Ali.',
    url: '/services/shower-cabins',
  }),
  alternates: { canonical: '/services/shower-cabins' },
};

export default function ShowerCabinsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <ShowerCabinsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Bathroom Glass Shower Cabins',
            description: 'Premium frameless and sliding glass shower enclosures, walk-in wet room panels, and custom bathroom glass solutions — expertly installed across Lahore by Basit Ali.',
            url: '/services/shower-cabins',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Bathroom Glass Shower Cabins', url: '/services/shower-cabins' },
          ])),
        }}
      />
    </main>
  );
}
