import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import TemperedGlassContent from '@/components/TemperedGlassContent';

export const metadata: Metadata = {
  title: 'Tempered Glass Installation',
  description:
    'Certified tempered safety glass — clear, tinted, frosted, laminated — in 8mm, 10mm & 12mm thickness with CNC processing and compliance certificates. Installed across Lahore by Basit Ali.',
  openGraph: pageOG({
    title: 'Tempered Glass Installation',
    description: 'Certified tempered safety glass — clear, tinted, frosted, laminated — in 8mm, 10mm & 12mm thickness with CNC processing and compliance certificates. Installed across Lahore by Basit Ali.',
    url: '/services/tempered-glass-installation',
  }),
  alternates: { canonical: '/services/tempered-glass-installation' },
};

export default function TemperedGlassPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <TemperedGlassContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Tempered Glass Installation',
            description: 'Certified tempered safety glass — clear, tinted, frosted, laminated — in 8mm, 10mm & 12mm thickness with CNC processing and compliance certificates. Installed across Lahore by Basit Ali.',
            url: '/services/tempered-glass-installation',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Tempered Glass Installation', url: '/services/tempered-glass-installation' },
          ])),
        }}
      />
    </main>
  );
}
