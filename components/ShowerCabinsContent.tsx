'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CLIENT_INFO } from '@/lib/data';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

interface ServiceSection {
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  images: string[];
}

const SHOWER_CABIN_SECTIONS: ServiceSection[] = [
  {
    title: 'Frameless Glass Shower Enclosures',
    description:
      'Transform your bathroom into a luxury retreat with our expertly crafted frameless tempered glass shower enclosures — delivering a clean, open aesthetic with maximum light flow and easy maintenance.',
    bullets: [
      '8mm & 10mm certified toughened safety glass',
      'Anti-lime scale coating for effortless cleaning',
      '304-grade rustproof stainless steel hinges & clamps',
    ],
    cta: 'Enquire about Frameless Showers',
    images: [
      '/assets/service/bathroom-shower-cabins/images (1).jpg',
      '/assets/service/bathroom-shower-cabins/images (5).jpg',
      '/assets/service/bathroom-shower-cabins/images (4).jpg',
    ],
  },
  {
    title: 'Sliding Glass Shower Doors',
    description:
      'Space-saving sliding glass shower doors built for compact and standard bathrooms — featuring smooth roller mechanisms, watertight magnetic seals, and sleek modern hardware.',
    bullets: [
      'Smooth-gliding top & bottom roller systems',
      'Magnetic waterproof sealing strips',
      'Available in chrome, matt black & gold finishes',
    ],
    cta: 'Enquire about Sliding Shower Doors',
    images: [
      '/assets/service/bathroom-shower-cabins/images (4).jpg',
      '/assets/service/bathroom-shower-cabins/images (6).jpg',
      '/assets/service/bathroom-shower-cabins/images (2).jpg',
    ],
  },
  {
    title: 'Corner & L-Shaped Shower Cabins',
    description:
      'Custom-measured corner and L-shaped glass shower cabins designed to maximize space in any bathroom layout — from compact powder rooms to spacious master baths.',
    bullets: [
      'Custom measured to the millimeter for perfect fit',
      '90° and custom angle glass-to-glass joints',
      'Frameless or semi-frameless configurations',
    ],
    cta: 'Enquire about Corner Showers',
    images: [
      '/assets/service/bathroom-shower-cabins/images (3).jpg',
      '/assets/service/bathroom-shower-cabins/images (1).jpg',
      '/assets/service/bathroom-shower-cabins/images (5).jpg',
    ],
  },
];

const SHOWER_ACCESSORIES_SECTIONS: ServiceSection[] = [
  {
    title: 'Walk-In Wet Room Panels',
    description:
      'Minimalist fixed glass panels for open walk-in wet rooms — creating a spacious, doorless shower experience with premium tempered glass and stainless steel wall brackets.',
    bullets: [
      'Fixed panel with stabilizer bar for rigidity',
      '10mm tempered safety glass standard',
      'No door tracks or hinges to maintain',
    ],
    cta: 'Enquire about Walk-In Panels',
    images: [
      '/assets/service/bathroom-shower-cabins/images (2).jpg',
      '/assets/service/bathroom-shower-cabins/images (5).jpg',
      '/assets/service/bathroom-shower-cabins/images (6).jpg',
    ],
  },
  {
    title: 'Shower Hardware & Fittings',
    description:
      'Premium shower cabin hardware — hydraulic hinges, towel bars, glass-to-glass connectors, and wall-mount brackets in chrome, matt black, brushed nickel, and gold PVD finishes.',
    bullets: [
      'Hydraulic self-closing glass door hinges',
      '304-grade stainless steel towel bars & handles',
      'Anti-corrosion finishes for humid environments',
    ],
    cta: 'Enquire about Shower Hardware',
    images: [
      '/assets/service/bathroom-shower-cabins/images (6).jpg',
      '/assets/service/bathroom-shower-cabins/images (3).jpg',
      '/assets/service/bathroom-shower-cabins/images (1).jpg',
    ],
  },
  {
    title: 'Custom Glass Mirrors & Vanity Panels',
    description:
      'Bespoke beveled and LED-backlit bathroom mirrors, vanity glass panels, and decorative glass shelving — designed to complement your shower cabin and elevate the entire bathroom aesthetic.',
    bullets: [
      'Custom beveled edge & frameless mirror designs',
      'LED backlit mirrors with anti-fog heating pads',
      'Tempered glass shelving for shower niches',
    ],
    cta: 'Enquire about Mirrors & Vanity Glass',
    images: [
      '/assets/service/bathroom-shower-cabins/images (4).jpg',
      '/assets/service/bathroom-shower-cabins/images (2).jpg',
      '/assets/service/bathroom-shower-cabins/images (3).jpg',
    ],
  },
];

function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-lg group">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-500 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
          priority={i === 0}
        />
      ))}

      {images.length > 1 && (
        <>
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
            {current + 1} / {images.length}
          </div>

          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}

function ServiceBlock({
  section,
  reversed,
  index,
}: {
  section: ServiceSection;
  reversed: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const content = (
    <div className="flex flex-col justify-center space-y-4">
      <div className={`flex items-center gap-3 ${reversed ? '' : 'lg:justify-end'}`}>
        {!reversed && (
          <span className="hidden lg:block w-10 h-[3px] bg-[#E31E27] rounded-full" />
        )}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-heading tracking-tight">
          {section.title}
        </h3>
        {reversed && (
          <span className="hidden lg:block w-10 h-[3px] bg-[#E31E27] rounded-full" />
        )}
      </div>
      <span className="lg:hidden w-10 h-[3px] bg-[#E31E27] rounded-full" />

      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
        {section.description}
      </p>

      <ul className="space-y-2.5 pt-1">
        {section.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-sm text-neutral-700">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-[#E31E27] shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="pt-2">
        <a
          href={CLIENT_INFO.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#E31E27] text-[#E31E27] hover:bg-[#E31E27] hover:text-white font-semibold text-sm rounded-full transition-colors active:scale-95"
        >
          {section.cta}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );

  const image = (
    <div>
      <ImageSlider images={section.images} alt={section.title} />
    </div>
  );

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {reversed ? (
        <>
          <div className="order-1 lg:order-1">{content}</div>
          <div className="order-2 lg:order-2">{image}</div>
        </>
      ) : (
        <>
          <div className="order-2 lg:order-1">{image}</div>
          <div className="order-1 lg:order-2">{content}</div>
        </>
      )}
    </div>
  );
}

export default function ShowerCabinsContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/service/bathroom-shower-cabins/images (1).jpg"
            alt="Luxury glass shower cabins by Basit Ali"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/65" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/70 mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Bathroom Glass Shower Cabins</span>
          </nav>

          <p className="text-[#E31E27] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Our Product Range
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Bathroom Glass Shower Cabins
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Custom frameless and sliding glass shower enclosures — from corner cabins to walk-in wet rooms, expertly measured and installed across Lahore.
          </p>
        </div>
      </section>

      {/* ── Shower Cabin Sections ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Shower Enclosures
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Premium Glass Shower Systems
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Transform your bathroom into a luxury retreat with expertly crafted frameless and sliding glass shower enclosures featuring anti-lime scale safety glass and rustproof stainless steel hardware.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {SHOWER_CABIN_SECTIONS.map((section, i) => (
              <ServiceBlock
                key={section.title}
                section={section}
                reversed={i % 2 !== 0}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="bg-neutral-100 py-0.5" />

      {/* ── Accessories & Extras Sections ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Accessories &amp; Extras
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Complete Your Bathroom
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Walk-in wet room panels, premium shower hardware, and custom glass mirrors — everything you need to create the perfect bathroom experience.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {SHOWER_ACCESSORIES_SECTIONS.map((section, i) => (
              <ServiceBlock
                key={section.title}
                section={section}
                reversed={i % 2 !== 0}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#E31E27] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight text-center sm:text-left max-w-lg">
            Planning a glass shower cabin or bathroom upgrade?
          </h2>
          <a
            href={CLIENT_INFO.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-sm rounded-full transition-colors shadow-lg active:scale-95 whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            Request a Quote
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
