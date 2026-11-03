import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import ContactUsContent from '@/components/ContactUsContent';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Basit Ali Aluminum & Glass Work for free measurement, quotation, and consultation — located at 196-A Main Multan Rd, Lahore. Call 0320-2740066.',
  openGraph: pageOG({
    title: 'Contact Us',
    description:
      'Get in touch with Basit Ali Aluminum & Glass Work for free measurement, quotation, and consultation — located at 196-A Main Multan Rd, Lahore. Call 0320-2740066.',
    url: '/contact',
  }),
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Contact Us', url: '/contact' },
            ])
          ),
        }}
      />
      <AccessibilityBar />
      <Navbar />
      <ContactUsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
