'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const HERO_IMAGES = [
  {
    src: '/assets/images/hero_bedroom_glass_doors.webp',
    alt: 'Luxury bedroom with sliding aluminum and glass doors overlooking the sea',
  },
  {
    src: '/assets/images/herosection1.jpg',
    alt: 'Basit Ali Aluminum professional glass installation work',
  },
  {
    src: '/assets/images/herosection2.jpg',
    alt: 'Premium aluminum window frames and glass fitting',
  },
  {
    src: '/assets/images/herosection3.jpg',
    alt: 'Commercial glass facade installation by Basit Ali team',
  },
  {
    src: '/assets/images/herosection4.jpg',
    alt: 'Modern aluminum and glass door installation in Lahore',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      <section className="relative min-h-[440px] sm:min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-neutral-900 text-white">
        {/* Carousel Images */}
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-neutral-950/45" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          <p className="gsap-fade-up text-[#E31E27] font-bold text-base sm:text-lg md:text-xl mb-4 tracking-normal drop-shadow-sm font-heading">
            Basit Ali Aluminum &amp; Glass Works
          </p>

          <h1
            className="gsap-text-reveal text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mb-5 leading-tight tracking-tight drop-shadow-md"
            style={{ textWrap: 'balance' }}
          >
            Aluminum &amp; Glass Solutions In Lahore
          </h1>

          <p className="gsap-fade-up text-white/95 text-sm sm:text-sm md:text-base max-w-2xl mx-auto mb-8 font-normal leading-relaxed drop-shadow-sm">
            Basit Ali is emerging as a top choice, offering superior aluminum windows, doors, and custom railings for homes and businesses throughout Lahore.
          </p>

          <Link
            href="/services"
            className="gsap-scale-up inline-block px-7 py-3 bg-[#E31E27] hover:bg-[#c5131c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs shadow-md transition-all duration-200 active:scale-95"
          >
            OUR SERVICES
          </Link>

          {/* Carousel Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 h-3 bg-[#E31E27]'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Strip */}
      <div className="bg-neutral-950 border-b border-neutral-800 text-neutral-300 py-3.5 overflow-hidden">
        <div className="flex items-center gap-6 sm:gap-4 text-xs sm:text-sm whitespace-nowrap animate-marquee sm:animate-none sm:justify-around sm:flex-wrap sm:whitespace-normal max-w-6xl sm:mx-auto px-4">
          <div className="flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0" />
            <span className="font-semibold text-white">Quality Work</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0" />
            <span className="font-semibold text-white">Affordable Prices</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0" />
            <span className="font-semibold text-white">On-Time Service</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0" />
            <span className="font-semibold text-white">Free Measurement &amp; Quotation</span>
          </div>
          {/* Duplicates for seamless mobile marquee */}
          <div className="flex items-center gap-2 shrink-0 sm:hidden">
            <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0" />
            <span className="font-semibold text-white">Quality Work</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 sm:hidden">
            <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0" />
            <span className="font-semibold text-white">Affordable Prices</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 sm:hidden">
            <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0" />
            <span className="font-semibold text-white">On-Time Service</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 sm:hidden">
            <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0" />
            <span className="font-semibold text-white">Free Measurement &amp; Quotation</span>
          </div>
        </div>
      </div>
    </>
  );
}
