import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import AboutUsContent from '@/components/AboutUsContent';

export const metadata: Metadata = {
  title: 'About Us | Basit Ali Aluminum & Glass Work',
  description:
    'Learn about Basit Ali Aluminum & Glass Work — Lahore\'s trusted manufacturer, supplier, and installer of architectural aluminum, glazing, and stainless steel solutions.',
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <AboutUsContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
