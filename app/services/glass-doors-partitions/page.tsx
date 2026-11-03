import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import GlassDoorsPartitionsContent from '@/components/GlassDoorsPartitionsContent';

export const metadata: Metadata = {
  title: 'Glass Doors & Partitions',
  description:
    'Premium frameless glass doors, sliding glass partitions, office glass walls, and curtain wall systems — custom fabricated and installed across Lahore by Basit Ali.',
  openGraph: pageOG({
    title: 'Glass Doors & Partitions',
    description: 'Premium frameless glass doors, sliding glass partitions, office glass walls, and curtain wall systems — custom fabricated and installed across Lahore by Basit Ali.',
    url: '/services/glass-doors-partitions',
  }),
  alternates: { canonical: '/services/glass-doors-partitions' },
};

export default function GlassDoorsPartitionsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <GlassDoorsPartitionsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Glass Doors & Partitions',
            description: 'Premium frameless glass doors, sliding glass partitions, office glass walls, and curtain wall systems — custom fabricated and installed across Lahore by Basit Ali.',
            url: '/services/glass-doors-partitions',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Glass Doors & Partitions', url: '/services/glass-doors-partitions' },
          ])),
        }}
      />
    </main>
  );
}
