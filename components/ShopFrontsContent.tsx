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
    title: 'Retail Shop Fronts',
    description:
      'High-visibility aluminium and glass shop fronts designed to maximise product display and attract foot traffic — engineered for boutiques, retail stores, and showrooms across Lahore\'s busiest commercial areas.',
    bullets: [
      '12mm clear tempered safety glass panels',
      'Slim-profile aluminium frames for maximum visibility',
      'Custom powder-coated finishes to match brand colours',
    ],
    cta: 'Enquire about Retail Shop Fronts',
    images: [
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg',
    ],
  },
  {
    title: 'Commercial Glass Facades',
    description:
      'Full-height glass facade systems for offices, banks, and corporate buildings — delivering striking modern aesthetics with structural integrity and superior weather performance.',
    bullets: [
      'Structural glazing for seamless glass walls',
      'High wind-load engineered aluminium frames',
      'UV-resistant & energy-efficient glass options',
    ],
    cta: 'Enquire about Glass Facades',
    images: [
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg',
    ],
  },
  {
    title: 'Automatic Sensor Doors',
    description:
      'Touchless automatic sliding and swing doors with motion sensor technology — ideal for high-traffic commercial entrances, malls, hospitals, and office lobbies requiring hands-free access.',
    bullets: [
      'Motion sensor & remote-controlled operation',
      'Heavy-duty aluminium track systems',
      'Panic exit hardware for safety compliance',
    ],
    cta: 'Enquire about Automatic Doors',
    images: [
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg',
    ],
  },
  {
    title: 'Restaurant & Cafe Fronts',
    description:
      'Elegant folding, sliding, and fixed glass fronts for restaurants, cafes, and food courts — designed to create an inviting open-air atmosphere while maintaining climate control and security.',
    bullets: [
      'Bi-fold & sliding glass wall configurations',
      'Weather-sealed for outdoor dining areas',
      'Frosted & tinted glass privacy options',
    ],
    cta: 'Enquire about Restaurant Fronts',
    images: [
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg',
    ],
  },
  {
    title: 'Security Shutters & Rolling Gates',
    description:
      'Heavy-duty aluminium rolling shutters and security gates for shop fronts, warehouses, and parking entrances — offering robust after-hours protection with smooth motorised or manual operation.',
    bullets: [
      'Motorised & manual rolling shutter systems',
      'Perforated, solid, or grille shutter styles',
      'Powder-coated finishes with anti-corrosion treatment',
    ],
    cta: 'Enquire about Security Shutters',
    images: [
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg',
    ],
  },
  {
    title: 'Office Glass Partitions & Entrances',
    description:
      'Frameless and aluminium-framed glass entrance systems for corporate offices, co-working spaces, and reception areas — combining transparency, sound insulation, and professional aesthetics.',
    bullets: [
      '10mm & 12mm toughened safety glass',
      'Frosted logos & branded privacy bands',
      'Acoustic-rated for meeting rooms & cabins',
    ],
    cta: 'Enquire about Office Entrances',
    images: [
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg',
      '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg',
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

export default function ShopFrontsContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg"
            alt="Shop fronts and commercial entrances by Basit Ali"
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
            <span className="text-white font-medium">Shop Fronts &amp; Commercial Entrances</span>
          </nav>

          <p className="text-[#E31E27] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Our Product Range
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Shop Fronts &amp; Commercial Entrances
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Striking commercial glass facades and high-visibility shopfronts that captivate retail customers while providing maximum security — built for Lahore&apos;s retail plazas, offices, and restaurants.
          </p>
        </div>
      </section>

      {/* ── All Alternating Product Sections ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Commercial Solutions
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Shop Front &amp; Entrance Systems
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Engineered for retail plazas, boutiques, restaurants, and corporate buildings across Lahore — built with heavy-duty aluminium frames and shatter-resistant safety glass.
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
            Planning a shop front, facade, or commercial entrance?
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
