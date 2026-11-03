import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import OfficeGlassWorkContent from '@/components/OfficeGlassWorkContent';

export const metadata: Metadata = {
  title: 'Office Glass Work & Cabins | Basit Ali Aluminum & Glass Work',
  description:
    'Professional executive glass cabins, acoustic partitions, conference room glazing, and corporate glass solutions — custom designed and installed across Lahore by Basit Ali.',
};

export default function OfficeGlassWorkPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <OfficeGlassWorkContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
