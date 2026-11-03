'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, X } from 'lucide-react';

interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
  details: string;
}

const FACILITIES: Facility[] = [
  {
    id: 'billets',
    title: 'Billets Plant',
    description: 'Superior alloy 6063 billets produced in-house, homogenized and 100% ultrasonically inspected.',
    image: '/assets/images/billets.jpg',
    badge: 'In-House',
    badgeColor: 'bg-[#E31E27]', // all badges render red per user request
    details: 'Our state-of-the-art billets plant produces premium 6063 alloy billets with precise chemical composition control. Each billet undergoes homogenization treatment and 100% ultrasonic inspection to ensure flawless quality before extrusion.',
  },
  {
    id: 'extrusion',
    title: 'Extrusion Plant',
    description: 'A comprehensive range of aluminium sections for commercial, residential & industrial use.',
    image: '/assets/images/extrusion-plant.jpg',
    badge: 'Since 2023',
    badgeColor: 'bg-[#E31E27]',
    details: 'Our modern extrusion plant delivers a wide variety of aluminum profiles for windows, doors, curtain walls, and custom architectural applications. Equipped with advanced presses for consistent dimensional accuracy.',
  },
  {
    id: 'dies',
    title: 'Dies Facility',
    description: 'Dies designed with the latest CAD software and manufactured using modern CNC technology.',
    image: '/assets/images/dies.jpg',
    badge: 'CNC',
    badgeColor: 'bg-[#E31E27]',
    details: 'Our in-house die facility uses cutting-edge CAD/CAM software and CNC machining centers to design and manufacture precision extrusion dies, enabling rapid prototyping and custom profile development.',
  },
  {
    id: 'anodizing',
    title: 'Anodizing Plant',
    description: 'High-performance anodized profiles in Natural, Brown, Bronze, Champagne & Black.',
    image: '/assets/images/anodizing-panel.jpg',
    badge: 'Finishing',
    badgeColor: 'bg-[#E31E27]',
    details: 'Our anodizing plant provides durable, corrosion-resistant finishes in multiple colors. The electrochemical process creates a hard oxide layer that protects aluminum profiles while delivering an elegant appearance.',
  },
  {
    id: 'powder-coating',
    title: 'Powder Coating',
    description: 'A certified applicator offering the widest range of colours with a warranty-grade finish.',
    image: '/assets/images/powdercoat-spray.jpg',
    badge: 'Approved Applicator',
    badgeColor: 'bg-[#E31E27]',
    details: 'As a certified powder coating applicator, we provide premium polyester and PVDF coatings in hundreds of RAL colors. Our automated coating line ensures uniform thickness and superior adhesion for long-lasting results.',
  },
  {
    id: 'fabrication',
    title: 'Fabrication Facility',
    description: 'Specially designed OEM facility fulfilling any fabrication requirement for aluminium.',
    image: '/assets/images/fabrication.jpg',
    badge: 'OEM',
    badgeColor: 'bg-[#E31E27]',
    details: 'Our fully equipped fabrication facility handles cutting, drilling, punching, bending, and assembly of aluminum profiles. We deliver ready-to-install components for windows, doors, curtain walls, and custom architectural projects.',
  },
];

export default function FacilitiesSection() {
  const [selected, setSelected] = useState<Facility | null>(null);

  return (
    <section id="facilities" className="bg-white pt-16 pb-8 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <p className="gsap-fade-up text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#E31E27] mb-3">
            What We Do
          </p>
          <h2 className="gsap-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Our Core Facilities &amp; Specialties
          </h2>
          <p className="gsap-fade-up text-neutral-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A complete, integrated aluminium processing operation — from molten metal to finished, coated profiles.
          </p>
        </div>

        {/* 3x2 Cards Grid */}
        <div className="gsap-stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="group bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Badge - bottom left like screenshot */}
                <span className={`absolute bottom-3 left-3 ${facility.badgeColor} text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-md shadow-md`}>
                  {facility.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2 leading-tight">
                  {facility.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  {facility.description}
                </p>
                <button
                  onClick={() => setSelected(facility)}
                  className="inline-flex items-center gap-1.5 text-[#E31E27] hover:text-[#c5131c] text-xs sm:text-sm font-semibold transition-colors group/link cursor-pointer"
                >
                  Read more
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 p-2 text-neutral-600 hover:text-neutral-900 bg-white/90 hover:bg-white rounded-full transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-neutral-100">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <span className={`absolute top-3 left-3 ${selected.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-md shadow-md`}>
                {selected.badge}
              </span>
            </div>

            <div className="p-6 sm:p-7">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3">
                {selected.title}
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {selected.details}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
