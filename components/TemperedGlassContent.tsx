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

const TEMPERED_GLASS_SECTIONS: ServiceSection[] = [
  {
    title: 'Clear Tempered Safety Glass',
    description:
      'Certified heat-treated clear tempered glass panels — 5x stronger than standard annealed glass — ideal for doors, windows, partitions, balustrades, and shopfronts across residential and commercial projects in Lahore.',
    bullets: [
      'Available in 8mm, 10mm & 12mm thickness',
      'Shatter-safe: fractures into blunt pebble fragments',
      'Polished beveled edges with CNC precision cut-outs',
    ],
    cta: 'Enquire about Clear Tempered Glass',
    images: [
      '/assets/service/page1/archg-20261010-163055-e7f084.webp',
      '/assets/service/page1/archg-20261010-193253-1779ec.jpg',
      '/assets/service/page1/archg-20261010-163114-517d63.jpg',
    ],
  },
  {
    title: 'Tinted & Reflective Tempered Glass',
    description:
      'Heat-strengthened tinted and reflective tempered glass offering superior solar control, glare reduction, and privacy — perfect for building facades, office partitions, and exterior cladding applications.',
    bullets: [
      'Available in bronze, grey, green & blue tints',
      'Reflective coatings for solar heat rejection',
      'UV fade-resistant for long-term colour stability',
    ],
    cta: 'Enquire about Tinted Glass',
    images: [
      '/assets/service/page1/archg-20261010-170759-7ff538.jpg',
      '/assets/service/page1/archg-20261010-170816-baa272.jpg',
      '/assets/service/page1/archg-20261010-170457-0d784f.webp',
    ],
  },
  {
    title: 'Frosted & Patterned Tempered Glass',
    description:
      'Acid-etched frosted and textured tempered glass providing elegant privacy without sacrificing natural light — widely used for bathroom doors, office cabins, conference room partitions, and decorative installations.',
    bullets: [
      'Acid-etched satin finish for uniform diffusion',
      'Custom frosted logos & privacy patterns available',
      'Finger-print resistant coating options',
    ],
    cta: 'Enquire about Frosted Glass',
    images: [
      '/assets/service/page1/archg-20261010-165050-2ad4d6.jpg',
      '/assets/service/page1/archg-20261010-165026-e6683a.jpg',
      '/assets/service/page1/archg-20261010-165151-dd4a36.jpg',
    ],
  },
];

const TEMPERED_APPLICATIONS_SECTIONS: ServiceSection[] = [
  {
    title: 'Laminated & Double-Glazed Units',
    description:
      'Multi-layer laminated tempered glass and insulated double-glazed units (IGU) engineered for maximum safety, sound insulation, and thermal efficiency — meeting international construction and safety standards.',
    bullets: [
      'PVB interlayer lamination for impact resistance',
      'Double-glazed Low-E units for thermal insulation',
      'Acoustic dampening up to STC 38–42 dB',
    ],
    cta: 'Enquire about Laminated Glass',
    images: [
      '/assets/service/page1/archg-20261010-170039-b19946.png',
      '/assets/service/page1/archg-20261010-170457-0d784f (1).webp',
      '/assets/service/page1/archg-20261010-163055-e7f084 (1).webp',
    ],
  },
  {
    title: 'Tempered Glass for Balustrades & Railings',
    description:
      'High-strength tempered and laminated glass panels specifically engineered for staircase balustrades, balcony railings, pool barriers, and terrace enclosures — combining safety with unobstructed views.',
    bullets: [
      '12mm toughened glass standard for balustrades',
      'Compliant with structural load & impact testing',
      'Compatible with spigot, channel & standoff systems',
    ],
    cta: 'Enquire about Glass Balustrades',
    images: [
      '/assets/service/page1/archg-20261010-165444-5de1e7.webp',
      '/assets/service/page1/project_12.jpg',
      '/assets/service/page1/archg-20261010-165450-8af689.jpg',
    ],
  },
  {
    title: 'Custom Cut & CNC Processed Glass',
    description:
      'Precision CNC-processed tempered glass with custom shapes, drilled holes, notches, and countersunk cut-outs for handles, hinges, and hardware — fabricated in-house to exact architectural specifications.',
    bullets: [
      'CNC drilling, notching & countersinking',
      'Custom shapes: arched, circular & trapezoid panels',
      'Certified compliance test certificates provided',
    ],
    cta: 'Enquire about Custom Glass Processing',
    images: [
      '/assets/service/page1/archg-20261010-203458-b5ce20.jpg',
      '/assets/service/page1/archg-20261010-193156-66aa8b.jpg',
      '/assets/service/page1/archg-20261010-163114-517d63 (1).jpg',
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

export default function TemperedGlassContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/service/page1/archg-20261010-170457-0d784f.webp"
            alt="Tempered glass installation by Basit Ali"
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
            <span className="text-white font-medium">Tempered Glass Installation</span>
          </nav>

          <p className="text-[#E31E27] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Our Product Range
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Tempered Glass Installation
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Certified heat-treated safety glass — 5x stronger than standard glass — available in clear, tinted, frosted, and laminated options for every construction need across Lahore.
          </p>
        </div>
      </section>

      {/* ── Tempered Glass Types ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Glass Types
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Certified Tempered Safety Glass
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Heat-treated safety glass meeting all local Lahore construction standards — available in multiple thicknesses, tints, and finishes with polished edges and precision processing.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {TEMPERED_GLASS_SECTIONS.map((section, i) => (
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

      {/* ── Applications & Processing ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Applications &amp; Processing
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Advanced Glass Solutions
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Laminated units, balustrade-grade panels, and CNC-processed custom shapes — engineered to exact specifications with certified compliance test certificates.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {TEMPERED_APPLICATIONS_SECTIONS.map((section, i) => (
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
            Need tempered glass for your project?
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
