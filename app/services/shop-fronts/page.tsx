import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import ShopFrontsContent from '@/components/ShopFrontsContent';

export const metadata: Metadata = {
  title: 'Shop Fronts & Commercial Entrances | Basit Ali Aluminum & Glass Work',
  description:
    'Striking commercial glass facades, retail shop fronts, automatic doors, and security shutters — custom built and installed across Lahore by Basit Ali.',
};

export default function ShopFrontsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <ShopFrontsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
