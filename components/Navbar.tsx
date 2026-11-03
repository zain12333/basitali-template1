'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, MessageSquare, ShieldCheck, ChevronDown } from 'lucide-react';
import { CLIENT_INFO, SERVICES_DATA } from '@/lib/data';

const SERVICE_ROUTES: Record<string, string> = {
  'aluminum-windows-doors': '/services/aluminum-windows-doors',
  'glass-doors-partitions': '/services/glass-doors-partitions',
  'shower-cabins': '/services/shower-cabins',
  'tempered-glass-installation': '/services/tempered-glass-installation',
  'curtain-wall': '/services/curtain-wall',
  'shop-fronts': '/services/shop-fronts',
  'office-glass-work': '/services/office-glass-work',
  'vertical-blinds': '/services/vertical-blinds',
  'mirrors-glass-repair': '/services/mirrors-glass-repair',
  'custom-aluminum-fabrication': '/services/custom-aluminum-fabrication',
};

function getServiceHref(id: string) {
  return SERVICE_ROUTES[id] || '/services';
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
  };

  return (
    <>
    <header className="sticky top-0 z-50 bg-[#E31E27E8] backdrop-blur-md text-white shadow-md transition-colors border-b border-[#c5131c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18 sm:h-20">
          {/* Zone 1: Official Brand Logo & Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 hover:opacity-95 transition-opacity py-1 group"
            aria-label="Basit Ali Aluminum & Glass Work Home"
          >
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden bg-white shadow-md border-2 border-white/40 shrink-0 p-0.5">
              <Image
                src="/assets/aistudio/ChatGPT_Image_Sep_30__2026__03_47_25_PM_f9e8138f.png"
                alt="Basit Ali Aluminum & Glass Works Logo"
                fill
                priority
                sizes="(max-width: 640px) 48px, 56px"
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-base sm:text-lg lg:text-xl tracking-tight text-white leading-tight uppercase group-hover:text-amber-100 transition-colors drop-shadow-sm">
                Basit Ali
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-white/95 uppercase drop-shadow-sm">
                Aluminium &amp; Glass
              </span>
            </div>
          </Link>

          {/* Zone 2: Nav Links with Services Dropdown */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/95"
          >
            <Link
              href="/about-us"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className="flex items-center gap-1 hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Desktop Mega Menu Dropdown */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                  servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="w-[520px] bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
                  {/* Header */}
                  <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200">
                    <p className="text-xs font-bold text-[#E31E27] uppercase tracking-wider">Our Services</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Professional aluminum &amp; glass solutions</p>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-2 gap-0.5 p-2">
                    {SERVICES_DATA.map((service) => (
                      <Link
                        key={service.id}
                        href={getServiceHref(service.id)}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors group/item"
                      >
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                          <Image
                            src={service.thumbnail}
                            alt={service.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium text-neutral-700 group-hover/item:text-[#E31E27] transition-colors leading-tight">
                          {service.name}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-200">
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="text-xs font-semibold text-[#E31E27] hover:text-[#c5131c] transition-colors"
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/projects"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Recent Projects
            </Link>
            <Link
              href="/contact"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </Link>
          </nav>

          {/* Zone 3: 1 Primary Action (Quick Contact / Free Measurement) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${CLIENT_INFO.phoneTel}`}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-black/20 hover:bg-black/30 text-white rounded-lg transition-colors border border-white/20 whitespace-nowrap shrink-0"
              title="Call directly"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{CLIENT_INFO.phone}</span>
            </a>
            <a
              href={CLIENT_INFO.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-[#E31E27] bg-white rounded-lg shadow-sm hover:bg-neutral-100 transition-colors whitespace-nowrap shrink-0 active:scale-95"
            >
              Free Measurement
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${CLIENT_INFO.phoneTel}`}
              aria-label="Call Basit Ali"
              className="p-2 bg-black/20 rounded-md text-white hover:bg-black/30"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-md text-white hover:bg-black/20 transition-colors focus-visible:ring-2 focus-visible:ring-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

    </header>

      {/* Mobile Slide-in Sidebar Drawer */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-white shadow-sm border border-neutral-200 p-0.5 shrink-0">
              <Image
                src="/assets/aistudio/ChatGPT_Image_Sep_30__2026__03_47_25_PM_f9e8138f.png"
                alt="Basit Ali Logo"
                fill
                sizes="40px"
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-sm text-neutral-900 uppercase leading-tight">
                Basit Ali
              </span>
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                Aluminium &amp; Glass
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col px-5 py-6 space-y-1 overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 text-sm font-medium text-neutral-800 hover:text-[#E31E27] hover:bg-neutral-50 rounded-lg transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 text-sm font-medium text-neutral-800 hover:text-[#E31E27] hover:bg-neutral-50 rounded-lg transition-colors"
          >
            About Us
          </Link>

          {/* Mobile Services Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-neutral-800 hover:text-[#E31E27] hover:bg-neutral-50 rounded-lg transition-colors"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                mobileServicesOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-4 pr-2 pb-2 space-y-0.5">
                {SERVICES_DATA.map((service) => (
                  <Link
                    key={service.id}
                    href={getServiceHref(service.id)}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileServicesOpen(false);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-600 hover:text-[#E31E27] hover:bg-neutral-50 rounded-md transition-colors"
                  >
                    <div className="relative w-6 h-6 rounded overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                      <Image
                        src={service.thumbnail}
                        alt={service.name}
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </div>
                    <span className="leading-tight">{service.name}</span>
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileServicesOpen(false);
                  }}
                  className="block px-3 py-2 text-xs font-semibold text-[#E31E27] hover:bg-neutral-50 rounded-md transition-colors"
                >
                  View All Services →
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 text-sm font-medium text-neutral-800 hover:text-[#E31E27] hover:bg-neutral-50 rounded-lg transition-colors"
          >
            Recent Projects
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-3 text-sm font-medium text-neutral-800 hover:text-[#E31E27] hover:bg-neutral-50 rounded-lg transition-colors"
          >
            Contact
          </Link>

          {/* Contact Us button */}
          <div className="pt-4">
            <a
              href={CLIENT_INFO.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-5 py-3 bg-[#E31E27] hover:bg-[#c5131c] text-white font-bold text-sm rounded-full transition-colors shadow-md"
            >
              <span>Contact Us</span>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </span>
            </a>
          </div>
        </nav>

        {/* Bottom contact info */}
        <div className="px-5 py-5 border-t border-neutral-200 space-y-3">
          <a
            href={`tel:${CLIENT_INFO.phoneTel}`}
            className="flex items-center gap-2.5 text-sm text-neutral-600 hover:text-[#E31E27] transition-colors"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>{CLIENT_INFO.phone}</span>
          </a>
        </div>
      </div>
    </>
  );
}
