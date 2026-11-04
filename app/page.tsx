import React from 'react';
import type { Metadata } from 'next';
import { pageOG } from '@/lib/og-defaults';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import SafetyPolicyBanner from '@/components/SafetyPolicyBanner';
import VisionSection from '@/components/VisionSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Basit Ali Aluminum & Glass Work | Lahore Professional Services',
  description:
    'Premier aluminum windows, doors, glass partitions, shower cabins, shop fronts, tempered glass, and 24/7 emergency repair services across Lahore. Call 0320-2740066 for free measurement.',
  openGraph: {
    ...pageOG({
      title: 'Basit Ali Aluminum & Glass Work | Lahore',
      description:
        'Premium Aluminum Windows, Doors, Glass Partitions, Shower Cabins & Emergency Repair Services in Lahore. Call 0320-2740066.',
      url: '/',
    }),
    images: [
      {
        url: 'https://basitali-template1.vercel.app/og-image.png',
        width: 1024,
        height: 1024,
        alt: 'Basit Ali Aluminum & Glass Work Logo',
        type: 'image/png',
      },
    ],
  },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">

      {/* Accessibility & Emergency Bar */}
      <AccessibilityBar />

      {/* Main Top Navigation matching Alba Rose style */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Basit Ali Section */}
      <AboutSection />

      {/* Core Facilities & Services */}
      <FacilitiesSection />

      {/* 10 Core Services Grid */}
      <ServicesSection />

      {/* Recent Projects Portfolio Gallery */}
      <ProjectsSection />

      {/* Safety & HSE Standards Banner */}
      <SafetyPolicyBanner />

      {/* Vision & Craftsmanship Section */}
      <VisionSection />

      {/* Why Choose Basit Ali (Split Dark/Red) */}
      <WhyChooseUs />

      {/* Verified Client Testimonials */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Floating 24/7 WhatsApp Quick Connect */}
      <FloatingWhatsApp />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
}
