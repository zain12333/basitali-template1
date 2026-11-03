import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import MirrorsGlassRepairContent from '@/components/MirrorsGlassRepairContent';

export const metadata: Metadata = {
  title: 'Mirrors & 24/7 Glass Repair | Basit Ali Aluminum & Glass Work',
  description:
    'Emergency 24/7 cracked glass replacement, roller repairs, and custom wall-to-wall LED beveled mirrors for gyms, salons, and homes — by Basit Ali across Lahore.',
};

export default function MirrorsGlassRepairPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <MirrorsGlassRepairContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
