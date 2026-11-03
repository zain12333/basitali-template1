import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import { breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import ProjectsPageContent from '@/components/ProjectsPageContent';

export const metadata: Metadata = {
  title: 'Our Projects',
  description:
    'Browse our portfolio of aluminum fabrication, glass installations, stainless steel railings, and custom metal work projects completed across Lahore — by Basit Ali.',
  openGraph: pageOG({
    title: 'Our Projects',
    description:
      'Browse our portfolio of aluminum fabrication, glass installations, stainless steel railings, and custom metal work projects completed across Lahore — by Basit Ali.',
    url: '/projects',
  }),
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Our Projects', url: '/projects' },
            ])
          ),
        }}
      />
      <AccessibilityBar />
      <Navbar />
      <ProjectsPageContent />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}
