import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import MirrorsGlassRepairContent from '@/components/MirrorsGlassRepairContent';

export const metadata: Metadata = {
  title: 'Mirrors & 24/7 Glass Repair',
  description:
    'Emergency 24/7 cracked glass replacement, roller repairs, and custom wall-to-wall LED beveled mirrors for gyms, salons, and homes — by Basit Ali across Lahore.',
  openGraph: pageOG({
    title: 'Mirrors & 24/7 Glass Repair',
    description: 'Emergency 24/7 cracked glass replacement, roller repairs, and custom wall-to-wall LED beveled mirrors for gyms, salons, and homes — by Basit Ali across Lahore.',
    url: '/services/mirrors-glass-repair',
  }),
  alternates: { canonical: '/services/mirrors-glass-repair' },
};

export default function MirrorsGlassRepairPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <MirrorsGlassRepairContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Mirrors & 24/7 Glass Repair',
            description: 'Emergency 24/7 cracked glass replacement, roller repairs, and custom wall-to-wall LED beveled mirrors for gyms, salons, and homes — by Basit Ali across Lahore.',
            url: '/services/mirrors-glass-repair',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Mirrors & 24/7 Glass Repair', url: '/services/mirrors-glass-repair' },
          ])),
        }}
      />
    </main>
  );
}
