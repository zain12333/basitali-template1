import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import AluminumWindowsDoorsContent from '@/components/AluminumWindowsDoorsContent';

export const metadata: Metadata = {
  title: 'Aluminum Windows & Doors',
  description:
    'Premium aluminum sliding, casement, and fixed windows plus hinged, sliding, and bi-fold doors — custom fabricated and installed across Lahore by Basit Ali.',
  openGraph: pageOG({
    title: 'Aluminum Windows & Doors',
    description: 'Premium aluminum sliding, casement, and fixed windows plus hinged, sliding, and bi-fold doors — custom fabricated and installed across Lahore by Basit Ali.',
    url: '/services/aluminum-windows-doors',
  }),
  alternates: { canonical: '/services/aluminum-windows-doors' },
};

export default function AluminumWindowsDoorsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <AluminumWindowsDoorsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Aluminum Windows & Doors',
            description: 'Premium aluminum sliding, casement, and fixed windows plus hinged, sliding, and bi-fold doors — custom fabricated and installed across Lahore by Basit Ali.',
            url: '/services/aluminum-windows-doors',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Aluminum Windows & Doors', url: '/services/aluminum-windows-doors' },
          ])),
        }}
      />
    </main>
  );
}
