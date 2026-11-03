import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import TemperedGlassContent from '@/components/TemperedGlassContent';

export const metadata: Metadata = {
  title: 'Tempered Glass Installation | Basit Ali Aluminum & Glass Work',
  description:
    'Certified tempered safety glass — clear, tinted, frosted, laminated — in 8mm, 10mm & 12mm thickness with CNC processing and compliance certificates. Installed across Lahore by Basit Ali.',
};

export default function TemperedGlassPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <TemperedGlassContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
