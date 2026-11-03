import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import AluminumWindowsDoorsContent from '@/components/AluminumWindowsDoorsContent';

export const metadata: Metadata = {
  title: 'Aluminum Windows & Doors | Basit Ali Aluminum & Glass Work',
  description:
    'Premium aluminum sliding, casement, and fixed windows plus hinged, sliding, and bi-fold doors — custom fabricated and installed across Lahore by Basit Ali.',
};

export default function AluminumWindowsDoorsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <AluminumWindowsDoorsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
