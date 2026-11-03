'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Phone, MessageSquare, Wrench, Shield, ArrowRight } from 'lucide-react';
import { CLIENT_INFO } from '@/lib/data';

export default function AboutSection() {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <section id="about" className="relative text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background with welder & sparks image + red overlay matching reference pic no 1 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/basit_ali_metalworking_sparks.png"
          alt="Basit Ali Aluminum Metalworking Sparks"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          referrerPolicy="no-referrer"
        />
        {/* Red tint/blend overlay to match image_3e5645a7.png exactly */}
        <div className="absolute inset-0 bg-[#E31E27] mix-blend-multiply opacity-95" />
        <div className="absolute inset-0 bg-[#E31E27E8]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/15 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Left Column: Image */}
          <div className="gsap-fade-left lg:col-span-5 flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] aspect-[4/5] rounded-md overflow-hidden shadow-2xl border-4 border-white bg-neutral-900 group">
              <Image
                src="/assets/images/futuristic_basit_ali_lobby_sculpture.png"
                alt="Basit Ali Aluminium & Glass Architectural Sculpture"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Copy - shows AFTER image on mobile */}
          <div className="gsap-fade-right lg:col-span-7 space-y-4 lg:space-y-5 order-2 lg:order-2">
            <div>
              {/* Spaced "A B O U T" header in white */}
              <p className="gsap-fade-up text-white font-bold tracking-[0.3em] text-sm sm:text-base uppercase mb-1">
                A B O U T
              </p>

              {/* Bold black/dark title "Basit Ali" matching reference */}
              <h2 className="gsap-text-reveal text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-950 tracking-tight leading-tight">
                Basit Ali
              </h2>

              {/* White tagline */}
              <p className="gsap-fade-up text-white text-base sm:text-lg font-normal mt-1">
                We are the best &amp; we will prove it
              </p>

              {/* Thin white divider line */}
              <div className="gsap-line-grow w-full max-w-xl h-[1px] bg-white/45 my-4" />
            </div>

            {/* Main body paragraph matching reference text */}
            <p className="text-white text-sm sm:text-base leading-relaxed">
              We are a leading manufacturer, supplier, and installer of architectural aluminum, glazing, stainless steel, and automation works. With a commitment to quality, innovation, and customer satisfaction, we deliver exceptional craftsmanship and reliable solutions for both commercial and residential projects across Lahore.{' '}
              {/* <button
                type="button"
                onClick={() => setShowFullStory(!showFullStory)}
                className="italic underline text-white hover:text-white/80 font-medium inline transition-opacity cursor-pointer focus:outline-none"
              >
                read more about BASIT ALI
              </button> */}
            </p>

            {/* Expandable story details with complete Lahore service features */}
            {showFullStory && (
              <div className="bg-black/35 backdrop-blur-sm p-5 rounded-md border border-white/30 text-sm text-neutral-100 space-y-3 transition-all animate-fadeIn">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Shield className="w-4 h-4 text-white" />
                  <span>The Basit Ali Guarantee</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Lahore-Wide Coverage:</strong> Free measurement and quote delivery across DHA, Bahria Town, Gulberg, Model Town, Johar Town, and all areas of Lahore.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Premium Materials:</strong> Heavy-gauge certified aluminum sections and 8mm–12mm tempered safety glass with imported hinges and hardware.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>24/7 Emergency Repairs:</strong> Broken glass replacement, jammed sliding doors, and shopfront repair available around the clock.</span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="tel:03202740066"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#E31E27] font-bold text-xs rounded hover:bg-neutral-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 0320-2740066</span>
                  </a>
                  <a
                    href="https://wa.me/923202740066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded hover:bg-emerald-700 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            )}

            {/* Action buttons - always single row */}
            <div className="pt-2 flex items-center gap-3 sm:gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 bg-white text-[#E31E27] hover:bg-neutral-100 rounded font-bold text-[11px] sm:text-sm tracking-wide uppercase transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 bg-black/40 hover:bg-black/60 border border-white/60 text-white rounded font-bold text-[11px] sm:text-sm tracking-wide uppercase transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <span>Free Quote &amp; Survey</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
