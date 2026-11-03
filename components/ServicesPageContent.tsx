'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES_DATA, CLIENT_INFO } from '@/lib/data';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare,
} from 'lucide-react';

export default function ServicesPageContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/curtain_wall_office_glass_1793184891246.jpg"
            alt="Professional glass and aluminum services"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <p className="text-[#E31E27] text-sm sm:text-base font-semibold mb-2">
            Basit Ali Aluminum &amp; Glass
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Our Services
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            A complete range of professional aluminum &amp; glass solutions for residential, commercial, and emergency needs across Lahore.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Our Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="group flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all bg-white"
              >
                {/* Icon / Thumbnail */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                  <Image
                    src={service.thumbnail}
                    alt={service.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-1 leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Explore All link */}
          <div className="text-center mt-10">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#E31E27] hover:text-[#c5131c] transition-colors"
            >
              Explore all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Not sure where to start? CTA ── */}
      <section className="bg-[#E31E27] py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Not sure where to start?
              </h2>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Tell us about your project requirements and we&apos;ll point you to the right service. Our team provides free consultation, measurement, and quotation across Lahore.
              </p>
              <ul className="space-y-2 pt-2">
                <li className="flex items-center gap-2 text-white text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Review your project requirements</span>
                </li>
                <li className="flex items-center gap-2 text-white text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Get free on-site measurement</span>
                </li>
                <li className="flex items-center gap-2 text-white text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Receive a clear quotation</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href={CLIENT_INFO.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs sm:text-sm rounded transition-colors shadow-sm active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  Book a free call
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`tel:${CLIENT_INFO.phoneTel}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-xs sm:text-sm rounded transition-colors active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  Call {CLIENT_INFO.phone}
                </a>
              </div>
            </div>

            <div className="relative w-full max-w-[480px] mx-auto lg:mx-0">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-neutral-100">
                <Image
                  src="/assets/images/aluminum_installation_craftsmen_1793184890381.jpg"
                  alt="Basit Ali consultation and measurement team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
