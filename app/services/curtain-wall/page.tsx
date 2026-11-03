import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import CurtainWallContent from '@/components/CurtainWallContent';

export const metadata: Metadata = {
  title: 'Curtain Wall & Spider Glass Systems',
  description:
    'Stick-built & unitized curtain wall facades, point-fixed spider glass systems, and cable-supported glass walls — engineered and installed across Lahore by Basit Ali.',
  openGraph: pageOG({
    title: 'Curtain Wall & Spider Glass Systems',
    description: 'Stick-built & unitized curtain wall facades, point-fixed spider glass systems, and cable-supported glass walls — engineered and installed across Lahore by Basit Ali.',
    url: '/services/curtain-wall',
  }),
  alternates: { canonical: '/services/curtain-wall' },
};

export default function CurtainWallPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <CurtainWallContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            name: 'Curtain Wall & Spider Glass Systems',
            description: 'Stick-built & unitized curtain wall facades, point-fixed spider glass systems, and cable-supported glass walls — engineered and installed across Lahore by Basit Ali.',
            url: '/services/curtain-wall',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Curtain Wall & Spider Glass Systems', url: '/services/curtain-wall' },
          ])),
        }}
      />
    </main>
  );
}
