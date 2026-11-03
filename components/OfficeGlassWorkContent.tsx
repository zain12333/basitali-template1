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
    title: 'Executive Glass Cabins',
    description:
      'Fully enclosed glass cabins for CEOs, directors, and senior management — delivering privacy and prestige while keeping interiors bathed in natural light. Built with acoustic-rated tempered glass and slimline aluminium profiles.',
    bullets: [
      'Acoustic STC rating 38–42 dB for private conversations',
      'Floor-to-ceiling 10mm & 12mm toughened glass',
      'Integrated blinds & smart-film privacy options',
    ],
    cta: 'Enquire about Executive Cabins',
    images: [
      '/assets/images/curtain_wall_office_glass_1793184891246.jpg',
      '/assets/service/page1/project_12.jpg',
      '/assets/service/page1/archg-20261010-163114-517d63.jpg',
    ],
  },
  {
    title: 'Glass Partition Walls',
    description:
      'Open-plan office glass dividers that separate workspaces without blocking light or sightlines — ideal for creating meeting zones, focus pods, and team areas within a modern office layout.',
    bullets: [
      'Frameless & aluminium-framed partition systems',
      'Single & double-glazed acoustic options',
      'Modular design for easy reconfiguration',
    ],
    cta: 'Enquire about Glass Partitions',
    images: [
      '/assets/service/page1/archg-20261010-163055-e7f084.webp',
      '/assets/service/page1/archg-20261010-193015-7462db.jpg',
      '/assets/service/page1/archg-20261010-163055-e7f084 (1).webp',
    ],
  },
  {
    title: 'Conference Room Glazing',
    description:
      'Sound-insulated glass enclosures for boardrooms and conference halls — engineered for complete acoustic privacy during presentations and client meetings while maintaining visual transparency.',
    bullets: [
      'Double-glazed laminated glass for sound dampening',
      'Frosted bands & logo branding on glass',
      'Integrated cable pass-throughs & AV compatibility',
    ],
    cta: 'Enquire about Conference Glazing',
    images: [
      '/assets/service/page1/archg-20261010-170457-0d784f.webp',
      '/assets/service/page1/archg-20261010-170816-baa272.jpg',
      '/assets/service/page1/archg-20261010-170759-7ff538.jpg',
    ],
  },
  {
    title: 'Glass Doors for Offices',
    description:
      'Swing, sliding, and frameless glass doors for office entrances, cabin entries, and corridor access — combining elegant aesthetics with smooth operation and durable hardware for daily commercial use.',
    bullets: [
      'Hydraulic floor springs & soft-close mechanisms',
      'Stainless steel pull handles & patch fittings',
      'Frosted, clear, and tinted glass options',
    ],
    cta: 'Enquire about Office Glass Doors',
    images: [
      '/assets/service/page1/archg-20261010-193253-1779ec.jpg',
      '/assets/service/page1/archg-20261010-193156-66aa8b.jpg',
      '/assets/service/page1/archg-20261010-165444-5de1e7.webp',
    ],
  },
  {
    title: 'Reception & Lobby Glass Work',
    description:
      'Custom glass reception counters, lobby partitions, and entrance feature walls that create a striking first impression — designed with premium finishes and branded frosted graphics for corporate identity.',
    bullets: [
      'Custom-cut reception counter glass panels',
      'Backlit & LED-integrated glass features',
      'Company logo etching & vinyl branding',
    ],
    cta: 'Enquire about Reception Glass',
    images: [
      '/assets/service/page1/archg-20261010-170457-0d784f (1).webp',
      '/assets/service/page1/archg-20261010-170039-b19946.png',
      '/assets/images/hero_aluminum_glass_facade_1793184890767.jpg',
    ],
  },
  {
    title: 'Aluminium Window & Facade Systems',
    description:
      'High-performance aluminium window systems for office buildings — casement, fixed, and curtain wall configurations that optimise daylight, ventilation, and energy efficiency for modern commercial interiors.',
    bullets: [
      'Thermal break profiles for energy savings',
      'Powder-coated slimline black & silver frames',
      'High wind-load rated for multi-storey buildings',
    ],
    cta: 'Enquire about Office Windows',
    images: [
      '/assets/service/page1/archg-20261010-163114-517d63 (1).jpg',
      '/assets/service/page1/archg-20261010-165450-8af689.jpg',
      '/assets/service/page1/archg-20261010-165450-8af689 (1).jpg',
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

export default function OfficeGlassWorkContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/curtain_wall_office_glass_1793184891246.jpg"
            alt="Office glass work and cabins by Basit Ali"
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
            <span className="text-white font-medium">Office Glass Work &amp; Cabins</span>
          </nav>

          <p className="text-[#E31E27] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Corporate Solutions
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Office Glass Work &amp; Cabins
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Professional acoustic meeting pods, executive cabin partitions, and frosted glass branding — tailored for corporate environments across Lahore.
          </p>
        </div>
      </section>

      {/* ── All Alternating Product Sections ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Office Glass Solutions
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Corporate Glass &amp; Cabin Systems
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Sleek acoustic glass walls that optimise natural ambient light while keeping corporate meetings private and sound-insulated — designed for offices, banks, and co-working spaces.
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
            Planning office cabins, partitions, or corporate glass work?
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
