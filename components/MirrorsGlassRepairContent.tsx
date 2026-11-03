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
    title: '24/7 Emergency Glass Repair',
    description:
      'When a window breaks, a shopfront cracks, or a glass door jams off its track — our emergency crew arrives promptly across Lahore. We provide same-day cracked glass replacement, temporary boarding, and full restoration to get your property secure again.',
    bullets: [
      '24/7 emergency dispatch hotline',
      'Same-day broken glass removal & replacement',
      'Temporary boarding for immediate security',
    ],
    cta: 'Call for Emergency Repair',
    images: [
      '/assets/service/Curtain-wall/archg-20261010-202431-54967d.jpg',
      '/assets/service/Curtain-wall/archg-20261010-193156-66aa8b.jpg',
      '/assets/images/fabrication.jpg',
      '/assets/service/page1/archg-20261010-193253-1779ec.jpg',
    ],
  },
  {
    title: 'Window Glass Replacement',
    description:
      'Complete single and double-pane window glass replacement for homes, offices, and commercial buildings — using certified tempered or laminated safety glass cut to exact frame dimensions on-site.',
    bullets: [
      'Single & double-pane glass replacement',
      'Tempered, laminated & tinted glass options',
      'On-site cutting & precision fitting',
    ],
    cta: 'Enquire about Glass Replacement',
    images: [
      '/assets/service/Curtain-wall/archg-20261010-163055-e7f084.webp',
      '/assets/service/Curtain-wall/archg-20261010-193015-7462db.jpg',
      '/assets/service/page1/archg-20261010-163114-517d63.jpg',
    ],
  },
  {
    title: 'Door & Roller Track Repairs',
    description:
      'Sliding door track realignment, roller hinge replacement, floor spring repair, and patch fitting adjustments — restoring smooth operation to jammed, sagging, or misaligned glass and aluminium doors.',
    bullets: [
      'Track & roller hinge realignment',
      'Floor spring & patch fitting replacement',
      'Heavy-duty German brass roller upgrades',
    ],
    cta: 'Enquire about Door Repairs',
    images: [
      '/assets/service/Curtain-wall/arch-louvers-2.jpg',
      '/assets/service/Curtain-wall/archg-20261010-165450-8af689.jpg',
      '/assets/service/page1/archg-20261010-165444-5de1e7.webp',
    ],
  },
  {
    title: 'Custom Wall Mirrors',
    description:
      'Made-to-measure wall-to-wall mirrors for living rooms, bedrooms, and hallways — available in beveled, frameless, and decorative framed styles that add depth and elegance to any interior space.',
    bullets: [
      'Custom-cut to exact wall dimensions',
      'Beveled, frameless & framed mirror styles',
      'Safety-backed mirrors with anti-shatter film',
    ],
    cta: 'Enquire about Wall Mirrors',
    images: [
      '/assets/service/Curtain-wall/arch-louvers-3.jpg',
      '/assets/service/Curtain-wall/arch-louvers-3 (1).jpg',
      '/assets/service/Curtain-wall/archg-20261010-165034-ba92b6.jpg',
    ],
  },
  {
    title: 'Gym & Salon Mirrors',
    description:
      'Full-height shatter-proof mirrors for gyms, fitness studios, dance academies, and beauty salons — wall-mounted with concealed bracket systems for a clean, seamless finish across large areas.',
    bullets: [
      'Full-height floor-to-ceiling installations',
      'Shatter-proof safety glass with backing film',
      'Concealed bracket & adhesive mounting systems',
    ],
    cta: 'Enquire about Gym Mirrors',
    images: [
      '/assets/service/Curtain-wall/archg-20261010-163654-5a70c6.webp',
      '/assets/service/Curtain-wall/archg-20261010-193015-7462db.jpg',
      '/assets/service/page1/archg-20261010-170816-baa272.jpg',
      '/assets/service/page1/archg-20261010-170759-7ff538.jpg',
    ],
  },
  {
    title: 'LED & Vanity Mirrors',
    description:
      'Backlit LED vanity mirrors and illuminated bathroom mirrors with integrated lighting, anti-fog coating, and touch-sensor controls — designed for modern bathrooms, dressing rooms, and salon stations.',
    bullets: [
      'Warm & cool LED backlight options',
      'Anti-fog coating for bathroom use',
      'Touch-sensor on/off & dimmer controls',
    ],
    cta: 'Enquire about LED Mirrors',
    images: [
      '/assets/service/Curtain-wall/archg-20261010-202431-54967d.jpg',
      '/assets/service/Curtain-wall/arch-louvers-2.jpg',
      '/assets/service/page1/archg-20261010-165050-2ad4d6.jpg',
      '/assets/service/page1/archg-20261010-165026-e6683a.jpg',
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

export default function MirrorsGlassRepairContent() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/aluminum_installation_craftsmen_1793184890381.jpg"
            alt="Mirrors and 24/7 glass repair services by Basit Ali"
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
            <span className="text-white font-medium">Mirrors &amp; 24/7 Glass Repair</span>
          </nav>

          <p className="text-[#E31E27] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Emergency &amp; Custom Solutions
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            Mirrors &amp; 24/7 Glass Repair
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Emergency cracked glass replacement, roller repairs, and custom wall-to-wall LED beveled mirrors for gyms, salons, and homes — available 24/7 across Lahore.
          </p>
        </div>
      </section>

      {/* ── All Alternating Product Sections ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
              Repair &amp; Mirror Solutions
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Glass Repair &amp; Custom Mirror Systems
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              When a window breaks or a glass door jams, our emergency crew arrives promptly. We also craft custom beveled, LED, and gym mirrors to exact specifications.
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
            Broken glass? Need a custom mirror? Call us 24/7!
          </h2>
          <a
            href={`tel:${CLIENT_INFO.phoneTel}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-sm rounded-full transition-colors shadow-lg active:scale-95 whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            Call {CLIENT_INFO.phone}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
