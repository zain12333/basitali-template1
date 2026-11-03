import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import CustomAluminumContent from '@/components/CustomAluminumContent';

export const metadata: Metadata = {
  title: 'Custom Aluminum Fabrication | Basit Ali Aluminum & Glass Work',
  description:
    'Custom aluminum louvers, pergolas, skylights, railings, ACP cladding & profile bending — fabricated to exact blueprints and installed across Lahore by Basit Ali.',
};

export default function CustomAluminumFabricationPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <CustomAluminumContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
