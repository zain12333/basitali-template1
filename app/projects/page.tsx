import React from 'react';
import type { Metadata } from 'next';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import ProjectsPageContent from '@/components/ProjectsPageContent';

export const metadata: Metadata = {
  title: 'Our Projects | Basit Ali Aluminum & Glass Work',
  description:
    'Browse our portfolio of aluminum fabrication, glass installations, stainless steel railings, and custom metal work projects completed across Lahore — by Basit Ali.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />
      <ProjectsPageContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
