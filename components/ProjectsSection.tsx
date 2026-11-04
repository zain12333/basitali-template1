'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS_DATA } from '@/lib/data';
import { Search, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Share2, Download } from 'lucide-react';

const INITIAL_COUNT = 9;

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [animating, setAnimating] = useState(false);

  const categories = [
    'All',
    'Glass Solutions',
    'Metal Work',
    'Aluminum Work',
    'Custom Fabrication'
  ];

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    if (activeCategory === 'All') return true;
    return proj.category === activeCategory;
  });

  const projectsToShow = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleSeeMore = () => {
    setAnimating(true);
    setVisibleCount((prev) => Math.min(prev + 6, filteredProjects.length));
    setTimeout(() => setAnimating(false), 600);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_COUNT);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredProjects.length - 1 : lightboxIndex - 1);
  }, [lightboxIndex, filteredProjects.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredProjects.length - 1 ? 0 : lightboxIndex + 1);
  }, [lightboxIndex, filteredProjects.length]);

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

  const currentProject = lightboxIndex !== null ? filteredProjects[lightboxIndex] : null;

  return (
    <section id="projects" className="bg-[#F5F5F5] text-neutral-900 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="gsap-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 text-center tracking-tight mb-6 sm:mb-8">
          Basit Ali Recent Projects
        </h2>

        {/* Filter Buttons */}
        <div className="gsap-fade-up flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 sm:px-5 py-2 text-xs sm:text-sm transition-all duration-150 cursor-pointer rounded-xs border shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#E31E27] font-semibold border-neutral-300 shadow-xs'
                    : 'bg-white text-neutral-700 hover:text-neutral-950 font-normal border-neutral-200/90 shadow-2xs hover:border-neutral-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div className="gsap-stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
          {projectsToShow.map((project, idx) => {
            const globalIndex = filteredProjects.indexOf(project);
            const isNew = idx >= INITIAL_COUNT && animating;
            return (
              <div
                key={project.id}
                onClick={() => openLightbox(globalIndex)}
                className={`group relative aspect-[1.3/1] overflow-hidden bg-neutral-200 cursor-pointer shadow-2xs hover:shadow-md transition-all ${
                  isNew ? 'animate-slideInRight' : ''
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(globalIndex);
                  }
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Search className="w-5 h-5 text-[#E31E27]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More / See All Buttons */}
        {hasMore && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <button
              onClick={handleSeeMore}
              className="px-8 py-3 bg-white border-2 border-neutral-300 hover:border-neutral-400 text-neutral-800 hover:text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider rounded transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              See More Projects
            </button>
            <Link
              href="/projects"
              className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded transition-all shadow-md active:scale-95"
            >
              See All Projects
            </Link>
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox */}
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
              {lightboxIndex + 1} / {filteredProjects.length}
            </span>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="p-2 sm:p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
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
    </section>
  );
}
