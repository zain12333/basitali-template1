'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function VisionSection() {
  return (
    <section className="bg-white text-neutral-900 py-20 sm:py-28 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision Statement matching screenshot image_3c54df77.png */}
          <div className="gsap-fade-left lg:col-span-6 space-y-6">
            <div>
              <p className="gsap-fade-up text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
                Forward-Thinking Glazing
              </p>
              <h2 className="gsap-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight">
                Basit Ali Vision
              </h2>
            </div>

            <p className="gsap-fade-up text-neutral-600 text-sm sm:text-base leading-relaxed">
              Our vision is to be Lahore&apos;s most trusted provider of exceptional aluminum and glass solutions. We are dedicated to delivering unmatched craftsmanship, clean modern designs, and attentive customer service on every single installation.
            </p>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              By consistently exceeding homeowner and architect expectations, incorporating acoustic insulation technologies, and offering reliable 24/7 emergency support, we set higher standards for architectural excellence across Pakistan. Our vision is fueled by passion and a commitment to creating living and commercial spaces that inspire, enhance, and endure.
            </p>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E31E27E8] hover:bg-[#E31E27] text-white font-bold uppercase text-xs sm:text-sm tracking-wider rounded transition-all shadow-md active:scale-95"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Framed photo matching screenshot image_3c54df77.png */}
          <div className="gsap-fade-right lg:col-span-6 flex justify-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-[#E31E27] bg-neutral-100 group">
              <Image
                src="/assets/images/aluminum_installation_craftsmen_1793184890381.jpg"
                alt="Basit Ali aluminum technicians precision installing window frame"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
