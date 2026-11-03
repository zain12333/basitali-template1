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

const CURTAIN_WALL_SECTIONS: ServiceSection[] = [
  {
    title: 'Stick-Built Curtain Wall Systems',
    description:
      'Precision-assembled stick-built aluminum curtain wall facades where mullions and transoms are installed piece by piece on-site — offering maximum design flexibility for towers, plazas, and commercial buildings across Lahore.',
    bullets: [
      'Custom mullion & transom profile configurations',
      'Structural silicone glazing for seamless aesthetics',
      'Engineered for wind load & seismic compliance',
    ],
    cta: 'Enquire about Stick-Built Systems',
    images: [
      '/assets/service/Curtain-wall/archg-20261010-163055-e7f084.webp',
      '/assets/service/Curtain-wall/archg-20261010-165034-ba92b6.jpg',
      '/assets/service/Curtain-wall/archg-20261010-193156-66aa8b.jpg',
    ],
  },
  {
    title: 'Unitized Curtain Wall Systems',
    description:
      'Factory-assembled unitized curtain wall panels delivered ready to install — dramatically reducing on-site labour time and ensuring consistent quality for high-rise commercial towers and corporate headquarters.',
    bullets: [
      'Pre-fabricated panels for rapid installation',
      'Factory-controlled quality & weather sealing',
      'Ideal for high-rise buildings above 10 storeys',
    ],
    cta: 'Enquire about Unitized Systems',
    images: [
      '/assets/service/Curtain-wall/archg-20261010-202431-54967d.jpg',
      '/assets/service/Curtain-wall/archg-20261010-193015-7462db.jpg',
      '/assets/service/Curtain-wall/archg-20261010-163654-5a70c6.webp',
    ],
  },
  {
    title: 'Semi-Structural Glazing Facades',
    description:
      'Semi-structural silicone-bonded glass facades that eliminate visible aluminum caps on the exterior — creating a smooth, flush glass surface for modern architectural projects demanding clean sightlines.',
    bullets: [
      'Flush exterior glass with hidden aluminum framing',
      'Structural silicone bonding for weather-tight seal',
      'Compatible with tinted, reflective & Low-E glass',
    ],
    cta: 'Enquire about Structural Glazing',
    images: [
      '/assets/service/Curtain-wall/archg-20261010-165450-8af689.jpg',
      '/assets/service/Curtain-wall/arch-louvers-2.jpg',
      '/assets/service/Curtain-wall/arch-louvers-3.jpg',
    ],
  },
];

const SPIDER_GLASS_SECTIONS: ServiceSection[] = [
  {
    title: 'Point-Fixed Spider Glass Systems',
    description:
      'Minimalist point-fixed spider glass systems using precision-machined stainless steel spider arms and routel fittings — creating transparent, floating glass facades for showrooms, atriums, and building lobbies.',
    bullets: [
      'Grade 316 stainless steel spider arms & routels',
      'Countersunk bolt fittings for flush glass surface',
      '12mm tempered or laminated safety glass panels',
    ],
    cta: 'Enquire about Spider Glass',
    images: [
      '/assets/service/Curtain-wall/archg-20261010-165034-ba92b6.jpg',
      '/assets/service/Curtain-wall/archg-20261010-163055-e7f084.webp',
      '/assets/service/Curtain-wall/archg-20261010-202431-54967d.jpg',
    ],
  },
  {
    title: 'Cable-Supported Glass Walls',
    description:
      'Ultra-transparent cable-supported glass wall systems where stainless steel tension cables replace traditional frames — delivering maximum transparency for grand atriums, hotel lobbies, and landmark entrances.',
    bullets: [
      'High-tensile stainless steel cable rigging',
      'Maximum transparency with minimal structure',
      'Engineered for large-span glass installations',
    ],
    cta: 'Enquire about Cable Glass Walls',
    images: [
      '/assets/service/Curtain-wall/archg-20261010-193015-7462db.jpg',
      '/assets/service/Curtain-wall/arch-louvers-3.jpg',
      '/assets/service/Curtain-wall/archg-20261010-193156-66aa8b.jpg',
    ],
  },
  {
    title: 'Double-Glazed Insulated Curtain Walls',
    description:
      'Energy-efficient double-glazed insulated curtain wall units combining Low-E coated glass with argon-filled cavities — providing superior thermal insulation, UV protection, and acoustic performance for commercial buildings.',
    bullets: [
      'Low-E coated glass for solar heat rejection',
      'Argon-filled cavity for thermal insulation',
      'Acoustic dampening up to STC 38–45 dB',
    ],
    cta: 'Enquire about Insulated Curtain Walls',
    images: [
      '/assets/service/Curtain-wall/arch-louvers-2.jpg',
      '/assets/service/Curtain-wall/archg-20261010-165450-8af689.jpg',
      '/assets/service/Curtain-wall/archg-20261010-163654-5a70c6.webp',
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

export default function CurtainWallContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/service/Curtain-wall/archg-20261010-163055-e7f084.webp"
            alt="Curtain wall and spider glass systems by Basit Ali"
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
            <span className="text-white font-medium">Curtain Wall &amp; Spider Glass</span>
          </nav>

          <p className="text-[#E31E27] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Our Product Range
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Curtain Wall &amp; Spider Glass Systems
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Striking building facades and spider glass installations engineered with exceptional structural integrity, weather tightness, and architectural impact — for commercial landmarks across Lahore.
          </p>
        </div>
      </section>

      {/* ── Curtain Wall Systems ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Curtain Wall Systems
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Architectural Glass Facade Solutions
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Full exterior glass envelope systems for commercial plazas, auto dealerships, and corporate headquarters — stick-built, unitized, and semi-structural glazing options.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {CURTAIN_WALL_SECTIONS.map((section, i) => (
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

      {/* ── Spider Glass Systems ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Spider Glass Systems
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Point-Fixed &amp; Cable-Supported Glass
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Minimalist point-fixed spider fittings and cable-supported glass walls for maximum transparency — engineered for atriums, showrooms, hotel lobbies, and landmark entrances.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {SPIDER_GLASS_SECTIONS.map((section, i) => (
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
            Planning a curtain wall facade or spider glass installation?
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
