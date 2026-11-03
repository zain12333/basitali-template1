import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import CurtainWallContent from '@/components/CurtainWallContent';

export const metadata: Metadata = {
  title: 'Curtain Wall & Spider Glass Systems | Basit Ali Aluminum & Glass Work',
  description:
    'Stick-built & unitized curtain wall facades, point-fixed spider glass systems, and cable-supported glass walls — engineered and installed across Lahore by Basit Ali.',
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
    </main>
  );
}
