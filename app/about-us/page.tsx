import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import AboutUsContent from '@/components/AboutUsContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Basit Ali Aluminum & Glass Work — Lahore\'s trusted manufacturer, supplier, and installer of architectural aluminum, glazing, and stainless steel solutions.',
  openGraph: pageOG({
    title: 'About Us',
    description:
      'Learn about Basit Ali Aluminum & Glass Work — Lahore\'s trusted manufacturer, supplier, and installer of architectural aluminum, glazing, and stainless steel solutions.',
    url: '/about-us',
  }),
  alternates: { canonical: '/about-us' },
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'About Us', url: '/about-us' },
            ])
          ),
        }}
      />
      <AccessibilityBar />
      <Navbar />
      <AboutUsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
