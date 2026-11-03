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

const GLASS_DOORS_SECTIONS: ServiceSection[] = [
  {
    title: 'Frameless Glass Doors',
    description:
      'Elegant frameless tempered glass doors with hydraulic patch fittings and concealed floor springs — delivering a sleek, contemporary entrance for offices, showrooms, and luxury residences across Lahore.',
    bullets: [
      '10mm & 12mm certified toughened safety glass',
      'Dorma/Ozone-grade hydraulic floor springs',
      'Premium stainless steel pull handles & patch fittings',
    ],
    cta: 'Enquire about Frameless Glass Doors',
    images: [
      '/assets/service/page1/archg-20261010-193253-1779ec.jpg',
      '/assets/service/page1/archg-20261010-165450-8af689.jpg',
      '/assets/service/page1/archg-20261010-165450-8af689 (1).jpg',
    ],
  },
  {
    title: 'Sliding Glass Doors',
    description:
      'Space-efficient sliding glass door systems engineered for smooth, silent operation — ideal for living rooms, patios, balconies, and commercial storefronts where maximum natural light and unobstructed views are essential.',
    bullets: [
      'Heavy-duty track systems with German brass rollers',
      'Single, double & multi-panel sliding configurations',
      'Slim aluminum frames for panoramic glass views',
    ],
    cta: 'Enquire about Sliding Glass Doors',
    images: [
      '/assets/service/page1/archg-20261010-193156-66aa8b.jpg',
      '/assets/service/page1/project_12.jpg',
      '/assets/service/page1/archg-20261010-193156-66aa8b (1).jpg',
    ],
  },
  {
    title: 'Bi-Fold & Folding Glass Doors',
    description:
      'Panoramic bi-fold glass door systems that fold open completely — merging indoor and outdoor spaces seamlessly for terraces, garden rooms, restaurants, and modern open-plan living areas.',
    bullets: [
      'Full-width opening for seamless indoor-outdoor flow',
      'Top-hung & bottom-rolling track options',
      'Powder-coated matte black, champagne & bronze finishes',
    ],
    cta: 'Enquire about Bi-Fold Glass Doors',
    images: [
      '/assets/service/page1/archg-20261010-165444-5de1e7.webp',
      '/assets/service/page1/archg-20261010-163654-5a70c6.webp',
      '/assets/service/page1/archg-20261010-193253-1779ec.jpg',
    ],
  },
];

const GLASS_PARTITIONS_SECTIONS: ServiceSection[] = [
  {
    title: 'Office Glass Partitions',
    description:
      'Professional acoustic glass partition walls for corporate offices, executive cabins, and meeting rooms — maximizing natural light flow while maintaining privacy and sound insulation for productive workspaces.',
    bullets: [
      'Acoustic STC rating 38–42 dB for sound privacy',
      'Slimline black or silver aluminum framing profiles',
      'Frosted vinyl graphics for branding & privacy',
    ],
    cta: 'Enquire about Office Partitions',
    images: [
      '/assets/service/page1/archg-20261010-170457-0d784f.webp',
      '/assets/service/page1/archg-20261010-170759-7ff538.jpg',
      '/assets/service/page1/archg-20261010-170457-0d784f (1).webp',
    ],
  },
  {
    title: 'Frameless Glass Walls',
    description:
      'Floor-to-ceiling frameless glass walls that create open, airy interiors with uninterrupted sightlines — perfect for showrooms, reception areas, conference halls, and high-end residential spaces.',
    bullets: [
      '10mm & 12mm tempered safety glass panels',
      'Point-fixed or channel-mounted installations',
      'Available in clear, tinted, frosted & patterned glass',
    ],
    cta: 'Enquire about Glass Walls',
    images: [
      '/assets/service/page1/archg-20261010-163055-e7f084.webp',
      '/assets/service/page1/archg-20261010-163114-517d63.jpg',
      '/assets/service/page1/archg-20261010-163055-e7f084 (1).webp',
    ],
  },
  {
    title: 'Curtain Wall & Structural Glazing',
    description:
      'Full exterior glass envelope systems for commercial plazas, corporate headquarters, and high-rise buildings — engineered for exceptional structural integrity, weather tightness, and stunning architectural impact.',
    bullets: [
      'Heavy architectural structural glazing systems',
      'Double-glazed Low-E insulated glass units',
      'Seismic and wind pressure certified to international standards',
    ],
    cta: 'Enquire about Curtain Walls',
    images: [
      '/assets/service/page1/archg-20261010-170816-baa272.jpg',
      '/assets/service/page1/archg-20261010-170039-b19946.png',
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

export default function GlassDoorsPartitionsContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/service/page1/archg-20261010-170759-7ff538.jpg"
            alt="Glass doors and partitions by Basit Ali"
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
            <span className="text-white font-medium">Glass Doors &amp; Partitions</span>
          </nav>

          <p className="text-[#E31E27] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Our Product Range
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Glass Doors &amp; Partitions
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Premium tempered glass doors and partition systems — from frameless patch-fitting entrances to acoustic office dividers, engineered and installed across Lahore.
          </p>
        </div>
      </section>

      {/* ── Glass Doors Sections ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Glass Doors
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Elegant &amp; Secure Glass Door Systems
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Experience the elegance of frameless and slimline glass doors — creating seamless, contemporary entrances for modern offices, showrooms, and residences.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {GLASS_DOORS_SECTIONS.map((section, i) => (
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

      {/* ── Glass Partitions Sections ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Glass Partitions
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Modern Glass Partition &amp; Wall Systems
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Professional glass partition walls and structural glazing systems that optimize natural light while maintaining acoustic privacy — ideal for offices, showrooms, and commercial buildings.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {GLASS_PARTITIONS_SECTIONS.map((section, i) => (
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
            Planning glass doors, partitions, or a custom glazing system?
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
