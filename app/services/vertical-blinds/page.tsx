import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import VerticalBlindsContent from '@/components/VerticalBlindsContent';

export const metadata: Metadata = {
  title: 'Vertical Blinds & Roller Shades',
  description:
    'Premium vertical blinds, roller shades, zebra blinds, and motorised window coverings — custom made and installed for homes and offices across Lahore by Basit Ali.',
  openGraph: pageOG({
    title: 'Vertical Blinds & Roller Shades',
    description: 'Premium vertical blinds, roller shades, zebra blinds, and motorised window coverings — custom made and installed for homes and offices across Lahore by Basit Ali.',
    url: '/services/vertical-blinds',
  }),
  alternates: { canonical: '/services/vertical-blinds' },
};

export default function VerticalBlindsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <VerticalBlindsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Vertical Blinds & Roller Shades',
            description: 'Premium vertical blinds, roller shades, zebra blinds, and motorised window coverings — custom made and installed for homes and offices across Lahore by Basit Ali.',
            url: '/services/vertical-blinds',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Vertical Blinds & Roller Shades', url: '/services/vertical-blinds' },
          ])),
        }}
      />
    </main>
  );
}
