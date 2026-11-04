'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  PROJECTS_DATA,
  FAQ_DATA,
  ProjectItem,
  CLIENT_INFO,
} from '@/lib/data';
import {
  Search,
  X,
  MapPin,
  Layers,
  MessageSquare,
  Phone,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

/* ── Hero collage images (6 decorative thumbnails) ── */
const HERO_IMAGES = [
  '/assets/projects/recent-project/alba-rose-uae-aluminum-and-glass-works-home-.jpg',
  '/assets/projects/recent-project/Aluminum-doors-and-glass.jpg',
  '/assets/projects/recent-project/Custom-aluminum-fabrication-in-Abu-Dhabi-768x480.jpg',
  '/assets/projects/recent-project/minum-glass-and-iron-work-duani-uae.webp',
  '/assets/projects/recent-project/modern-glass-enclosed-patio-extension_Alba-Rose-768x576.jpg',
  '/assets/projects/recent-project/window-scene.jpg',
];

const CATEGORIES = [
  'All',
  'Glass Solutions',
  'Metal Work',
  'Aluminum Work',
  'Custom Fabrication',
];

/* ── Masonry height classes for visual variety ── */
const SPAN_PATTERN = [
  'row-span-2',
  'row-span-1',
  'row-span-1',
  'row-span-1',
  'row-span-2',
  'row-span-1',
  'row-span-1',
  'row-span-2',
  'row-span-1',
  'row-span-1',
  'row-span-1',
  'row-span-2',
  'row-span-1',
  'row-span-1',
];

/* ── FAQ Accordion Item ── */
function FaqAccordion({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group cursor-pointer"
      >
        <span className="text-sm sm:text-base font-semibold text-neutral-800 group-hover:text-[#E31E27] transition-colors">
          {question}
        </span>
        <span
          className={`w-7 h-7 rounded-full border-2 border-[#E31E27] flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? 'bg-[#E31E27] rotate-180' : 'bg-transparent'
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-colors ${
              isOpen ? 'text-white' : 'text-[#E31E27]'
            }`}
          />
        </span>
      </button>
      <div
        ref={bodyRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? bodyRef.current?.scrollHeight ?? 500 : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="text-sm text-neutral-600 leading-relaxed pb-5 pr-10">
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ── Fade-in wrapper ── */
function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ProjectsPageContent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = PROJECTS_DATA.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1);
  }, [lightboxIndex, filtered.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filtered.length - 1 ? 0 : lightboxIndex + 1);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, goToPrev, goToNext]);

  const currentProject = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO — Dark bg + Alba Rose style image collage
         ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Full-bleed dark background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/projects/recent-project/modern-glass-enclosed-patio-extension_Alba-Rose-768x576.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-900/70" />
        </div>

        {/* Red accent strip at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E31E27] z-20" />

        {/* ── DESKTOP LAYOUT (lg+) — 5 images in 2 rows with centered text ── */}
        <div className="relative z-10 hidden lg:block max-w-5xl mx-auto px-8 py-16">
          {/* TOP ROW: oval-left | text-center | oval-right */}
          <div className="grid grid-cols-5 gap-6 items-center mb-6">
            {/* Top-left oval image */}
            <div className="col-span-1 relative aspect-[3/4] rounded-[50%] overflow-hidden border-[5px] border-white/30 shadow-2xl">
              <Image
                src={HERO_IMAGES[0]}
                alt="Aluminum & glass project"
                fill
                sizes="200px"
                className="object-cover"
                priority
              />
            </div>

            {/* Center text */}
            <div className="col-span-3 flex flex-col items-center justify-center text-center py-4">
              <p className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-3">
                Basit Ali Aluminum &amp; Glass
              </p>
              <h1 className="text-5xl xl:text-6xl font-black tracking-tight font-heading text-white drop-shadow-lg">
                Projects
              </h1>
            </div>

            {/* Top-right oval image */}
            <div className="col-span-1 relative aspect-[3/4] rounded-[50%] overflow-hidden border-[5px] border-white/30 shadow-2xl">
              <Image
                src={HERO_IMAGES[1]}
                alt="Aluminum & glass project"
                fill
                sizes="200px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* BOTTOM ROW: 3 images — oval | rectangle | oval */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* Bottom-left — rounded oval */}
            <div className="relative aspect-[4/3] rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden border-[5px] border-white/30 shadow-2xl">
              <Image
                src={HERO_IMAGES[2]}
                alt="Aluminum & glass project"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>

            {/* Bottom-center — rectangle with slight rounding */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-[5px] border-white/30 shadow-2xl">
              <Image
                src={HERO_IMAGES[3]}
                alt="Aluminum & glass project"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>

            {/* Bottom-right — rounded oval */}
            <div className="relative aspect-[4/3] rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden border-[5px] border-white/30 shadow-2xl">
              <Image
                src={HERO_IMAGES[4]}
                alt="Aluminum & glass project"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET LAYOUT (< lg) — compact oval image + text ── */}
        <div className="relative z-10 lg:hidden max-w-sm mx-auto px-4 py-10 sm:py-14 flex flex-col items-center">
          {/* Compact oval hero image */}
          <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-[50%] overflow-hidden border-4 border-white/30 shadow-2xl mb-6">
            <Image
              src={HERO_IMAGES[5]}
              alt="Aluminum & glass project"
              fill
              sizes="210px"
              className="object-cover"
              priority
            />
          </div>

          {/* Text below image */}
          <p className="text-white/70 text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-1.5 text-center">
            Basit Ali Aluminum &amp; Glass
          </p>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-heading text-white drop-shadow-lg text-center">
            Projects
          </h1>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ALL PROJECTS — Filter tabs + Masonry grid
         ══════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 text-center tracking-tight mb-2 font-heading">
              Basit Ali All Projects
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base text-center max-w-2xl mx-auto mb-10">
              Explore our portfolio of aluminum fabrication, glass installations,
              and custom metal work delivered across Lahore.
            </p>
          </FadeIn>

          {/* Category Filter Tabs */}
          <FadeIn delay={100}>
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 sm:px-5 py-2 text-xs sm:text-sm transition-all duration-200 cursor-pointer rounded-sm border shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'text-[#E31E27] font-bold border-[#E31E27] bg-red-50'
                        : 'text-neutral-600 hover:text-neutral-900 font-medium border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Masonry-style Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {filtered.map((project, idx) => {
              const isTall = SPAN_PATTERN[idx % SPAN_PATTERN.length] === 'row-span-2';
              return (
                <FadeIn key={project.id} delay={idx * 60}>
                  <div
                    onClick={() => openLightbox(idx)}
                    className="group relative overflow-hidden bg-neutral-200 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg break-inside-avoid"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(idx);
                      }
                    }}
                  >
                    <div
                      className={`relative w-full ${
                        isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                      }`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E31E27] bg-white/90 self-start px-2 py-0.5 rounded mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-xs text-white/70 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </p>
                      </div>

                      {/* Center search icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Search className="w-5 h-5 text-[#E31E27]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <p className="text-center text-neutral-500 py-16 text-sm">
              No projects found in this category.
            </p>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ SECTION
         ══════════════════════════════════════════════ */}
      <section className="bg-[#F9FAFB] py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 text-center tracking-tight mb-10 sm:mb-14 font-heading">
              Frequently Asked Questions
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="divide-y divide-neutral-200 border-t border-neutral-200">
              {FAQ_DATA.map((faq, i) => (
                <FaqAccordion
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BOTTOM CTA
         ══════════════════════════════════════════════ */}
      <section className="bg-[#E31E27] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight text-center sm:text-left max-w-lg font-heading">
            Have a project in mind? Let&apos;s build it together!
          </h2>
          <a
            href={CLIENT_INFO.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-sm rounded-full transition-colors shadow-lg active:scale-95 whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            Get Free Quote
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FULLSCREEN LIGHTBOX
         ══════════════════════════════════════════════ */}
      {currentProject && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shrink-0">
            <span className="text-white/80 text-sm sm:text-base font-medium tabular-nums">
              {lightboxIndex + 1} / {filtered.length}
            </span>
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="p-2 sm:p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Image Area */}
          <div
            className="flex-1 flex items-center justify-center relative min-h-0 px-2 sm:px-16 pb-4"
            onClick={closeLightbox}
          >
            {/* Prev Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              aria-label="Previous project"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/60 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Image */}
            <div
              className="relative w-full h-full max-w-5xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={currentProject.id}
                src={currentProject.image}
                alt={currentProject.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Next Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              aria-label="Next project"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/60 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="shrink-0 px-4 sm:px-6 pb-4 sm:pb-6 text-center">
            <p className="text-white text-sm sm:text-base font-medium leading-snug max-w-2xl mx-auto">
              {currentProject.title}
            </p>
            <p className="text-white/50 text-xs sm:text-sm mt-1">
              {currentProject.category} &bull; {currentProject.location}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
