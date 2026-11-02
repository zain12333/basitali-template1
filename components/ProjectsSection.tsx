'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS_DATA, ProjectItem } from '@/lib/data';
import { Search, X, MapPin, Layers, MessageSquare, Phone } from 'lucide-react';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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

  return (
    <section id="projects" className="bg-[#F5F5F5] text-neutral-900 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title matching screenshot image_8b82f120.png */}
        <h2 className="gsap-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 text-center tracking-tight mb-6 sm:mb-8">
          Basit Ali Recent Projects
        </h2>

        {/* Filter Buttons - single scrollable row */}
        <div className="gsap-fade-up flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
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

        {/* 3x3 Photo Grid matching screenshot image_8b82f120.png */}
        <div className="gsap-stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative aspect-[1.3/1] overflow-hidden bg-neutral-200 cursor-pointer shadow-2xs hover:shadow-md transition-shadow"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                priority
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Search className="w-5 h-5 text-[#E31E27]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close project modal"
              className="absolute top-3 right-3 z-20 p-2 text-neutral-600 hover:text-neutral-900 bg-white/90 hover:bg-white rounded-full transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-neutral-100">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E31E27]">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-neutral-500 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#E31E27]" />
                  {selectedProject.location}
                </span>
              </div>

              <h3 id="project-modal-title" className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                {selectedProject.description}
              </p>

              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs text-neutral-700 mb-5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#E31E27] shrink-0" />
                <span>
                  <strong>Specifications:</strong> {selectedProject.specs}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/923202740066?text=${encodeURIComponent(
                    `Hello Basit Ali Aluminum, I saw your project "${selectedProject.title}" in ${selectedProject.location}. I need similar work for my site in Lahore. Please share details and pricing.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry for Similar Work</span>
                </a>
                <a
                  href="tel:03202740066"
                  className="w-full sm:w-auto py-2.5 px-5 bg-neutral-900 hover:bg-neutral-800 text-white rounded font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 0320-2740066</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
