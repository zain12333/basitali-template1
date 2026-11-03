import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import CustomAluminumContent from '@/components/CustomAluminumContent';

export const metadata: Metadata = {
  title: 'Custom Aluminum Fabrication',
  description:
    'Custom aluminum louvers, pergolas, skylights, railings, ACP cladding & profile bending — fabricated to exact blueprints and installed across Lahore by Basit Ali.',
  openGraph: pageOG({
    title: 'Custom Aluminum Fabrication',
    description: 'Custom aluminum louvers, pergolas, skylights, railings, ACP cladding & profile bending — fabricated to exact blueprints and installed across Lahore by Basit Ali.',
    url: '/services/custom-aluminum-fabrication',
  }),
  alternates: { canonical: '/services/custom-aluminum-fabrication' },
};

export default function CustomAluminumFabricationPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <CustomAluminumContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Custom Aluminum Fabrication',
            description: 'Custom aluminum louvers, pergolas, skylights, railings, ACP cladding & profile bending — fabricated to exact blueprints and installed across Lahore by Basit Ali.',
            url: '/services/custom-aluminum-fabrication',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Custom Aluminum Fabrication', url: '/services/custom-aluminum-fabrication' },
          ])),
        }}
      />
    </main>
  );
}
