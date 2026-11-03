import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import OfficeGlassWorkContent from '@/components/OfficeGlassWorkContent';

export const metadata: Metadata = {
  title: 'Office Glass Work & Cabins',
  description:
    'Professional executive glass cabins, acoustic partitions, conference room glazing, and corporate glass solutions — custom designed and installed across Lahore by Basit Ali.',
  openGraph: pageOG({
    title: 'Office Glass Work & Cabins',
    description: 'Professional executive glass cabins, acoustic partitions, conference room glazing, and corporate glass solutions — custom designed and installed across Lahore by Basit Ali.',
    url: '/services/office-glass-work',
  }),
  alternates: { canonical: '/services/office-glass-work' },
};

export default function OfficeGlassWorkPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <OfficeGlassWorkContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Office Glass Work & Cabins',
            description: 'Professional executive glass cabins, acoustic partitions, conference room glazing, and corporate glass solutions — custom designed and installed across Lahore by Basit Ali.',
            url: '/services/office-glass-work',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Office Glass Work & Cabins', url: '/services/office-glass-work' },
          ])),
        }}
      />
    </main>
  );
}
