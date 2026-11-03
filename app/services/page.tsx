import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import ServicesPageContent from '@/components/ServicesPageContent';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore all 10 professional aluminum & glass services by Basit Ali — windows, doors, shower cabins, shop fronts, curtain walls, and 24/7 emergency repair in Lahore.',
  openGraph: pageOG({
    title: 'Our Services',
    description:
      'Explore all 10 professional aluminum & glass services by Basit Ali — windows, doors, shower cabins, shop fronts, curtain walls, and 24/7 emergency repair in Lahore.',
    url: '/services',
  }),
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Our Services', url: '/services' },
            ])
          ),
        }}
      />
      <AccessibilityBar />
      <Navbar />
      <ServicesPageContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
