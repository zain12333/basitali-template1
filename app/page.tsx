import React from 'react';
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
