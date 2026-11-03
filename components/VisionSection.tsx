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

          {/* Right Column: Image with decorative offset frame */}
          <div className="gsap-fade-right lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[480px]">
              {/* Decorative offset golden border frame */}
              <div className="absolute top-[-12px] right-[-12px] sm:top-[-16px] sm:right-[-16px] w-[70%] h-[70%] border-2 border-[#d4a843] rounded-lg z-0" />

              {/* Main image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl bg-neutral-100 group z-10">
                <Image
                  src="/assets/images/aluminum_installation_craftsmen_1793184890381.jpg"
                  alt="Basit Ali aluminum technicians precision installing window frame"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Badge overlay */}
                <div className="absolute bottom-4 right-4 bg-[#E31E27] text-white px-4 py-2.5 rounded-lg shadow-lg z-20">
                  <p className="text-2xl sm:text-3xl font-black leading-none">10<sup className="text-base">+</sup></p>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
