'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { CLIENT_INFO } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-400 text-xs sm:text-sm border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="gsap-stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-900">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden bg-white shadow-lg border border-neutral-800 p-1 shrink-0">
                <Image
                  src="/assets/aistudio/ChatGPT_Image_Sep_30__2026__03_47_25_PM_f9e8138f.png"
                  alt="Basit Ali Aluminum & Glass Works Logo"
                  fill
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading uppercase leading-tight">
                  Basit Ali
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#E31E27] uppercase tracking-wider">
                  Aluminium &amp; Glass
                </span>
                <span className="text-[11px] text-neutral-400 mt-0.5">
                  Professional Architectural Services Lahore
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Professional architectural aluminum and glass solutions across Lahore. Specializing in sliding windows, frameless glass partitions, shower cabins, shop fronts, and 24/7 emergency repairs throughout the week.
            </p>

            <div className="pt-2 text-xs text-neutral-300 space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Free On-Site Measurement &amp; Quotation
              </p>
              <p className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> 100% Certified Tempered Safety Glass
              </p>
              <p className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> 5-Year Workmanship Guarantee
              </p>
            </div>
          </div>

          {/* Col 3: Services Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Core Services
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Aluminum Windows &amp; Doors
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Glass Doors &amp; Partitions
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Shower Cabins
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Commercial Shop Fronts
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Office Glass Work
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Curtain Wall &amp; Spider Glass
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Vertical Blinds
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Basit Ali
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Recent Projects Gallery
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Client Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href={CLIENT_INFO.whatsAppUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-emerald-400 font-semibold">
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Hours */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Contact &amp; Emergency
            </p>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-neutral-500 block">Phone / WhatsApp:</span>
                <a
                  href={`tel:${CLIENT_INFO.phoneTel}`}
                  className="font-bold text-white hover:text-[#E31E27] font-mono"
                >
                  {CLIENT_INFO.phone}
                </a>
              </div>

              <div>
                <span className="text-neutral-500 block">Email Inquiries:</span>
                <a
                  href={`mailto:${CLIENT_INFO.email}`}
                  className="text-neutral-300 hover:text-white truncate block text-[11px]"
                >
                  {CLIENT_INFO.email}
                </a>
              </div>

              <div>
                <span className="text-neutral-500 block">Service Coverage:</span>
                <span className="text-neutral-300">All Over Lahore, Punjab</span>
              </div>

              <div>
                <span className="text-neutral-500 block">Emergency Repairs:</span>
                <span className="text-[#E31E27] font-semibold">Available 24/7 All Week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            Copyright &copy; 2026 {CLIENT_INFO.businessName}. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-neutral-300 transition-colors">
              HSE &amp; Safety
            </a>
            <span>·</span>
            <a href="#about" className="hover:text-neutral-300 transition-colors">
              Quality Guarantee
            </a>
            <span>·</span>
            <a href="#contact" className="hover:text-neutral-300 transition-colors">
              Lahore Service Area
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
