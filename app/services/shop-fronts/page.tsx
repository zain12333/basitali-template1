import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import ShopFrontsContent from '@/components/ShopFrontsContent';

export const metadata: Metadata = {
  title: 'Shop Fronts & Commercial Entrances',
  description:
    'Striking commercial glass facades, retail shop fronts, automatic doors, and security shutters — custom built and installed across Lahore by Basit Ali.',
  openGraph: pageOG({
    title: 'Shop Fronts & Commercial Entrances',
    description: 'Striking commercial glass facades, retail shop fronts, automatic doors, and security shutters — custom built and installed across Lahore by Basit Ali.',
    url: '/services/shop-fronts',
  }),
  alternates: { canonical: '/services/shop-fronts' },
};

export default function ShopFrontsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <ShopFrontsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Shop Fronts & Commercial Entrances',
            description: 'Striking commercial glass facades, retail shop fronts, automatic doors, and security shutters — custom built and installed across Lahore by Basit Ali.',
            url: '/services/shop-fronts',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Shop Fronts & Commercial Entrances', url: '/services/shop-fronts' },
          ])),
        }}
      />
    </main>
  );
}
