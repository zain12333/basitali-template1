import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { pageOG } from '@/lib/og-defaults';
import { breadcrumbJsonLd } from '@/lib/seo';
import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Sitemap',
  description:
    'Navigate all pages on the Basit Ali Aluminum & Glass Work website — services, projects, company pages, and contact information for Lahore.',
  openGraph: pageOG({
    title: 'Sitemap',
    description:
      'Navigate all pages on the Basit Ali Aluminum & Glass Work website — services, projects, and contact information.',
    url: '/sitemap',
  }),
  alternates: { canonical: '/sitemap' },
};

const sections = [
  {
    title: 'Main Pages',
    pages: [
      { name: 'Home', href: '/', description: 'Welcome to Basit Ali Aluminum & Glass Work' },
      { name: 'About Us', href: '/about-us', description: 'Our story, mission, and team' },
      { name: 'Our Services', href: '/services', description: 'All professional aluminum & glass services' },
      { name: 'Recent Projects', href: '/projects', description: 'Portfolio of completed work across Lahore' },
      { name: 'Contact Us', href: '/contact', description: 'Get in touch for a free quotation' },
    ],
  },
  {
    title: 'Services',
    pages: [
      { name: 'Aluminum Windows & Doors', href: '/services/aluminum-windows-doors', description: 'Sliding, casement, and tilt-and-turn aluminum systems' },
      { name: 'Glass Doors & Partitions', href: '/services/glass-doors-partitions', description: 'Frameless and slimline glass partitions' },
      { name: 'Bathroom Glass Shower Cabins', href: '/services/shower-cabins', description: 'Luxury frameless shower enclosures' },
      { name: 'Shop Fronts & Commercial Entrances', href: '/services/shop-fronts', description: 'Commercial glass facades and shopfronts' },
      { name: 'Office Glass Work & Cabins', href: '/services/office-glass-work', description: 'Corporate acoustic glass partitions' },
      { name: 'Tempered Glass Installation', href: '/services/tempered-glass-installation', description: 'Certified heat-treated safety glass' },
      { name: 'Vertical Blinds & Roller Shades', href: '/services/vertical-blinds', description: 'Solar control blinds and shades' },
      { name: 'Curtain Wall & Spider Glass', href: '/services/curtain-wall', description: 'Building facade glazing systems' },
      { name: 'Mirrors & 24/7 Glass Repair', href: '/services/mirrors-glass-repair', description: 'Emergency repairs and custom mirrors' },
      { name: 'Custom Aluminum Fabrication', href: '/services/custom-aluminum-fabrication', description: 'Louvers, pergolas, skylights, and cladding' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <AccessibilityBar />
      <Navbar />

      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#E31E27] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 font-heading">
            Sitemap
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white leading-tight">
            Every page, <span className="text-[#E31E27]">in one place.</span>
          </h1>
          <p className="text-neutral-400 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
            Find any page on the Basit Ali Aluminum & Glass Work website: our services, project
            portfolio, company pages, and contact information.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#E31E27]" />
                {section.title}
                <span className="text-xs font-normal text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">
                  {section.pages.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group block bg-neutral-800/50 border border-neutral-800 hover:border-neutral-600 rounded-xl p-5 transition-all"
                  >
                    <p className="font-semibold text-white group-hover:text-[#E31E27] transition-colors text-sm">
                      {page.name}
                    </p>
                    <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                      {page.description}
                    </p>
                    <p className="text-neutral-600 text-[11px] mt-2 font-mono">
                      {page.href}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Sitemap', url: '/sitemap' },
            ]),
          ),
        }}
      />
    </main>
  );
}
