'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { CLIENT_INFO } from '@/lib/data';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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

          {/* Zone 2: 4–5 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/95"
          >
            <a
              href="#about"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              About Us
            </a>
            <a
              href="#services"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#projects"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Recent Projects
            </a>
            <a
              href="#why-us"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Why Choose Us
            </a>
            <a
              href="#testimonials"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#c5131c] bg-[#E31E27] px-4 pt-4 pb-6 space-y-3">
          <div className="flex items-center gap-3 mb-2 p-1 border-b border-black/20 pb-3">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white shadow-md p-0.5 shrink-0 border border-white/40">
              <Image
                src="/assets/aistudio/ChatGPT_Image_Sep_30__2026__03_47_25_PM_f9e8138f.png"
                alt="Basit Ali Aluminum & Glass Works Logo"
                fill
                sizes="48px"
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-white">
              <span className="font-heading font-black text-base uppercase leading-tight">
                Basit Ali
              </span>
              <span className="text-[11px] font-semibold text-white/95 uppercase">
                Aluminium &amp; Glass
              </span>
            </div>
          </div>
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-white">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-black/20 transition-colors"
            >
              About Basit Ali
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-black/20 transition-colors"
            >
              All Services (10 Categories)
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-black/20 transition-colors"
            >
              Recent Projects Gallery
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-black/20 transition-colors"
            >
              Why Choose Basit Ali
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-black/20 transition-colors"
            >
              Client Testimonials
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-black/20 transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-3 border-t border-black/20 flex flex-col gap-2">
            <a
              href={`tel:${CLIENT_INFO.phoneTel}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-black/30 text-white rounded-lg text-sm font-bold"
            >
              <Phone className="w-4 h-4 text-red-200" />
              Call Now: {CLIENT_INFO.phone}
            </a>
            <a
              href={CLIENT_INFO.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp (0320-2740066)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
