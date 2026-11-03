import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import ShowerCabinsContent from '@/components/ShowerCabinsContent';

export const metadata: Metadata = {
  title: 'Bathroom Glass Shower Cabins | Basit Ali Aluminum & Glass Work',
  description:
    'Premium frameless and sliding glass shower enclosures, walk-in wet room panels, and custom bathroom glass solutions — expertly installed across Lahore by Basit Ali.',
};

export default function ShowerCabinsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <ShowerCabinsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
