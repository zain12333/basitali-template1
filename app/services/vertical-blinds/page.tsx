import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import VerticalBlindsContent from '@/components/VerticalBlindsContent';

export const metadata: Metadata = {
  title: 'Vertical Blinds & Roller Shades | Basit Ali Aluminum & Glass Work',
  description:
    'Premium vertical blinds, roller shades, zebra blinds, and motorised window coverings — custom made and installed for homes and offices across Lahore by Basit Ali.',
};

export default function VerticalBlindsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <VerticalBlindsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
