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
    title: 'Vertical Blinds',
    description:
      'Classic vertical blind systems with smooth-rotating PVC and fabric vanes — ideal for large aluminium windows, sliding patio doors, and office partitions where precise light control and privacy are essential.',
    bullets: [
      'Available in 89mm & 127mm vane widths',
      'PVC, fabric & blackout material options',
      'Smooth-operating aluminium head rail system',
    ],
    cta: 'Enquire about Vertical Blinds',
    images: [
      '/assets/service/vertical blinds/beige-signature-pvc-vertical-blinds-cozy.webp',
      '/assets/service/vertical blinds/images (2).jpg',
      '/assets/service/vertical blinds/images (4).jpg',
    ],
  },
  {
    title: 'Roller Shades',
    description:
      'Sleek single-panel roller shades that roll up neatly into a compact aluminium cassette — perfect for bedrooms, living rooms, and offices needing clean aesthetics with full light-blocking capability.',
    bullets: [
      'Blackout, sunscreen & translucent fabrics',
      'Spring-loaded & chain-operated mechanisms',
      'Custom-cut to exact window frame dimensions',
    ],
    cta: 'Enquire about Roller Shades',
    images: [
      '/assets/service/vertical blinds/images (3).jpg',
      '/assets/service/vertical blinds/images (5).jpg',
      '/assets/service/vertical blinds/images (1).jpg',
    ],
  },
  {
    title: 'Zebra Blinds',
    description:
      'Dual-layer alternating sheer and opaque fabric strips that slide over each other — giving you seamless control between full privacy and soft filtered daylight in one elegant system.',
    bullets: [
      'Alternating sheer & opaque fabric layers',
      'Adjustable light filtering without fully closing',
      'Modern slim cassette housing in any colour',
    ],
    cta: 'Enquire about Zebra Blinds',
    images: [
      '/assets/service/vertical blinds/download.jpg',
      '/assets/service/vertical blinds/images (2).jpg',
      '/assets/service/vertical blinds/beige-signature-pvc-vertical-blinds-cozy.webp',
    ],
  },
  {
    title: 'Motorised Blinds & Shades',
    description:
      'Remote-controlled and smart-home compatible motorised blind systems for hard-to-reach windows, skylights, and large glass facades — offering effortless operation at the touch of a button.',
    bullets: [
      'Remote control & smart-home integration',
      'Battery-powered & wired motor options',
      'Timer & sunlight sensor automation',
    ],
    cta: 'Enquire about Motorised Blinds',
    images: [
      '/assets/service/vertical blinds/images (1).jpg',
      '/assets/service/vertical blinds/images (4).jpg',
      '/assets/service/vertical blinds/images (3).jpg',
    ],
  },
  {
    title: 'Wooden & Faux-Wood Blinds',
    description:
      'Natural wood and moisture-resistant faux-wood venetian blinds with aluminium ladder tapes — combining warmth and elegance for living rooms, bedrooms, and kitchens where style meets durability.',
    bullets: [
      'Real basswood & PVC faux-wood slats',
      'Moisture-resistant for kitchens & bathrooms',
      'Available in 25mm & 50mm slat widths',
    ],
    cta: 'Enquire about Wooden Blinds',
    images: [
      '/assets/service/vertical blinds/images (2).jpg',
      '/assets/service/vertical blinds/beige-signature-pvc-vertical-blinds-cozy.webp',
      '/assets/service/vertical blinds/images (5).jpg',
    ],
  },
  {
    title: 'Office & Commercial Blinds',
    description:
      'Heavy-duty vertical and roller blind installations for corporate offices, hospitals, schools, and commercial buildings — fire-retardant fabrics with UV-resistant coatings for long-lasting performance.',
    bullets: [
      'Fire-retardant & UV-resistant commercial fabrics',
      'Bulk installation for multi-floor buildings',
      'Branded & custom-printed fabric options',
    ],
    cta: 'Enquire about Commercial Blinds',
    images: [
      '/assets/service/vertical blinds/images (5).jpg',
      '/assets/service/vertical blinds/images (3).jpg',
      '/assets/service/vertical blinds/download.jpg',
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

export default function VerticalBlindsContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/service/vertical blinds/beige-signature-pvc-vertical-blinds-cozy.webp"
            alt="Vertical blinds and roller shades by Basit Ali"
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
            <span className="text-white font-medium">Vertical Blinds &amp; Roller Shades</span>
          </nav>

          <p className="text-[#E31E27] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Window Covering Solutions
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Vertical Blinds &amp; Roller Shades
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Functional, elegant vertical blinds, zebra blinds, and sunscreen roller shades providing superior solar control and privacy — custom made for homes and offices across Lahore.
          </p>
        </div>
      </section>

      {/* ── All Alternating Product Sections ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Blinds &amp; Shades
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Window Covering Systems
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Smooth-operating track systems engineered for wide aluminium windows, sliding patio doors, and executive glass offices — UV fade-resistant with motorised remote control options.
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
            Need blinds, roller shades, or motorised window coverings?
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
