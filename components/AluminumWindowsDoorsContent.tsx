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

const ALL_SECTIONS: ServiceSection[] = [
  {
    title: 'Aluminium Windows',
    description:
      'Thermally efficient aluminium windows engineered for slim sightlines, smooth operation, and weather-tight performance — ideal for homes, offices, and high-rise projects across Lahore.',
    bullets: [
      'Sliding, casement, top-hung & fixed styles',
      'Double-glazing ready for heat & sound insulation',
      'Powder-coated or anodized finishes in any colour',
    ],
    cta: 'Enquire about Aluminium Windows',
    images: [
      '/assets/service/page1/archg-20261010-163055-e7f084.webp',
      '/assets/service/page1/archg-20261010-193015-7462db.jpg',
      '/assets/service/page1/archg-20261010-163114-517d63.jpg',
      '/assets/service/page1/archg-20261010-163055-e7f084 (1).webp',
      '/assets/service/page1/archg-20261010-163114-517d63 (1).jpg',
    ],
  },
  {
    title: 'Aluminium Doors',
    description:
      'Strong, secure, and elegant aluminium doors — hinged, sliding, and folding — built for high-traffic commercial entrances and modern residences.',
    bullets: [
      'Swing, sliding & bi-fold configurations',
      'Heavy-duty hardware for commercial use',
      'Slim frames with a premium architectural finish',
    ],
    cta: 'Enquire about Aluminium Doors',
    images: [
      '/assets/service/page1/archg-20261010-193253-1779ec.jpg',
      '/assets/service/page1/archg-20261010-193156-66aa8b.jpg',
      '/assets/service/page1/archg-20261010-165444-5de1e7.webp',
      '/assets/service/page1/archg-20261010-165450-8af689.jpg',
      '/assets/service/page1/archg-20261010-193156-66aa8b (1).jpg',
      '/assets/service/page1/archg-20261010-165450-8af689 (1).jpg',
    ],
  },
  {
    title: 'Curtain Walls',
    description:
      'Stick-built and semi-unitized aluminium curtain wall systems that clad facades in glass and metal — delivering striking aesthetics, daylight, and all-weather performance for towers and commercial buildings.',
    bullets: [
      'Stick-built & unitized systems',
      'Structural & semi-structural glazing',
      'Engineered for wind load & water-tightness',
    ],
    cta: 'Enquire about Curtain Walls',
    images: [
      '/assets/service/page1/archg-20261010-170457-0d784f.webp',
      '/assets/service/page1/archg-20261010-170759-7ff538.jpg',
      '/assets/service/page1/archg-20261010-170816-baa272.jpg',
      '/assets/service/page1/archg-20261010-170039-b19946.png',
      '/assets/service/page1/archg-20261010-170457-0d784f (1).webp',
    ],
  },
  {
    title: 'Kitchen Sections',
    description:
      'Durable aluminium profiles for modern modular kitchens — moisture-proof and termite-proof cabinet frames, shutter profiles, and handles that outlast timber and laminate.',
    bullets: [
      '100% moisture & termite proof',
      'Shutter, carcass & handle profiles',
      'Scratch-resistant, easy-to-clean finishes',
    ],
    cta: 'Enquire about Kitchen Sections',
    images: [
      '/assets/service/page1/archg-20261010-165050-2ad4d6.jpg',
      '/assets/service/page1/archg-20261010-165026-e6683a.jpg',
      '/assets/service/page1/archg-20261010-165151-dd4a36.jpg',
      '/assets/service/page1/archg-20261010-165034-ba92b6.jpg',
    ],
  },
  {
    title: 'Sliding Glass Interiors',
    description:
      'Premium aluminium-framed sliding glass systems for interior partitions, living room dividers, and patio enclosures — maximizing natural light while offering smooth, space-saving operation.',
    bullets: [
      'Floor-to-ceiling glass panel options',
      'Soft-close & heavy-duty roller systems',
      'Ideal for living rooms, patios & terraces',
    ],
    cta: 'Enquire about Sliding Glass',
    images: [
      '/assets/service/page1/project_12.jpg',
      '/assets/images/hero_bedroom_glass_doors.webp',
      '/assets/service/page1/archg-20261010-163654-5a70c6.webp',
    ],
  },
  {
    title: 'Pipe & Angle Sections',
    description:
      'Aluminium pipe and angle sections for structural, framing, and fabrication work — round, square, and L-angle profiles offering consistent strength, straightness, and finish for railings, grills, frames, and support structures.',
    bullets: [
      'Round, square & L-angle profiles',
      'For railings, grills, frames & structural use',
      'Powder-coated or anodized finishes available',
    ],
    cta: 'Enquire about Pipe & Angle Sections',
    images: [
      '/assets/service/page1/archg-20261010-203458-b5ce20.jpg',
      '/assets/images/extrusion-plant.jpg',
      '/assets/images/fabrication.jpg',
    ],
  },
];

function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, images.length]);

  const prev = () => { setPaused(true); setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)); };
  const next = () => { setPaused(true); setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)); };

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

export default function AluminumWindowsDoorsContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/service/page1/archg-20261010-170457-0d784f.webp"
            alt="Aluminum windows and doors by Basit Ali"
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
            <span className="text-white font-medium">Aluminum Windows &amp; Doors</span>
          </nav>

          <p className="text-[#E31E27] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Our Product Range
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Aluminum Windows &amp; Doors
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Complete aluminium solutions for the building envelope — from windows and doors to curtain walls, kitchens, and custom fabrication, engineered and finished in-house.
          </p>
        </div>
      </section>

      {/* ── All Alternating Product Sections ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Our Product Range
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Architectural Aluminium Systems
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Complete aluminium solutions for the building envelope — from windows and doors to curtain walls, kitchens, and custom sections, engineered and finished in-house.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {ALL_SECTIONS.map((section, i) => (
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
            Planning a facade, windows or a custom aluminium system?
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
