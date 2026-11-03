import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import GlassDoorsPartitionsContent from '@/components/GlassDoorsPartitionsContent';

export const metadata: Metadata = {
  title: 'Glass Doors & Partitions | Basit Ali Aluminum & Glass Work',
  description:
    'Premium frameless glass doors, sliding glass partitions, office glass walls, and curtain wall systems — custom fabricated and installed across Lahore by Basit Ali.',
};

export default function GlassDoorsPartitionsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <GlassDoorsPartitionsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
