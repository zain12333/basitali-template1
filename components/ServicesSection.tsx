'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, MessageSquare, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { CLIENT_INFO, SERVICES_DATA } from '@/lib/data';

interface DisplayService {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  specs: string[];
}

const FEATURED_SERVICES: DisplayService[] = [
  // Left Column
  {
    id: 'sliding-hinges',
    title: 'Sliding Door and Window Hinges',
    description: 'We provide reliable and smooth sliding door and window hinges, ensuring effortless operation and secure functionality.',
    image: '/assets/images/hero_bedroom_glass_doors.webp',
    category: 'Hardware & Sliding Systems',
    specs: [
      'Heavy-duty stainless steel & brass roller bearings',
      'Smooth silent multi-track sliding mechanisms',
      'High weight capacity tested up to 250kg per panel',
      'Dust-resistant weather felt seals & locks'
    ]
  },
  {
    id: 'curtain-wall',
    title: 'Curtain Wall and Spider System',
    description: 'Our expertise includes the design and installation of curtain wall systems and spider systems, delivering striking facades with exceptional structural integrity.',
    image: '/assets/images/curtain_wall_office_glass_1793184891246.jpg',
    category: 'Commercial Facades',
    specs: [
      'Engineered structural silicone glazing & spider arms',
      'High-grade 316 stainless steel articulation points',
      'Double-glazed insulated Low-E glass panels',
      'Certified wind load resistance for Lahore commercial towers'
    ]
  },
  {
    id: 'glass-handrail',
    title: 'Glass Handrail',
    description: 'We offer stylish and durable glass handrails that provide safety and elegance, enhancing the aesthetics of staircases, balconies, and other areas.',
    image: '/assets/aistudio/image_68f2d2fe.png',
    category: 'Safety Balustrades',
    specs: [
      '12mm & 15mm toughened safety tempered glass',
      'Continuous aluminum base shoe channels or stainless spigots',
      'Slimline top capping rails in matte black or satin silver',
      'Engineered for residential villas, rooftops & commercial stairs'
    ]
  },
  {
    id: 'frameless-glass-doors',
    title: 'Frameless Glass Doors',
    description: 'Experience the beauty of frameless glass doors, creating a seamless and contemporary look for your interior spaces.',
    image: '/assets/aistudio/image_93949657.png',
    category: 'Architectural Glazing',
    specs: [
      '10mm & 12mm certified tempered safety glass',
      'Heavy-duty hydraulic floor springs with 90° hold-open',
      'Premium German & Taiwan grade patch fittings',
      'Custom frosted privacy bands & logo sandblasting'
    ]
  },
  // Right Column
  {
    id: 'bathroom-glass-shower',
    title: 'Bathroom Glass Shower',
    description: 'Transform your bathroom into a luxurious retreat with our expertly crafted glass shower enclosures, combining functionality and elegance.',
    image: '/assets/images/luxury_glass_shower_cabin_1793184890693.jpg',
    category: 'Luxury Enclosures',
    specs: [
      '8mm & 10mm anti-calc tempered safety glass',
      'Grade 304 solid stainless steel rustproof hardware',
      'Waterproof magnetic silicone threshold seals',
      'Corner L-shape, walk-in wet room & sliding cubicles'
    ]
  },
  {
    id: 'automatic-doors',
    title: 'Automatic Doors, Gates, Rolling Shutters, and Barriers',
    description: 'We provide automation solutions for doors, gates, rolling shutters, and barriers, offering convenience, security, and efficiency.',
    image: '/assets/images/hero_aluminum_glass_facade_1793184890767.jpg',
    category: 'Commercial Automation',
    specs: [
      'Heavy-duty electric sliding & swing door operators',
      'Infrared microwave radar motion & safety beam sensors',
      'Heavy-gauge perforated and insulated aluminum rolling shutters',
      'Battery backup systems with emergency manual override'
    ]
  },
  {
    id: 'steel-structure',
    title: 'Steel Structure and Wrought Iron Work',
    description: 'Our services encompass the fabrication and installation of steel structures and wrought iron works, adding strength and visual appeal to your projects.',
    image: '/assets/images/basit_ali_metalworking_sparks.png',
    category: 'Structural Fabrication',
    specs: [
      'Custom fabricated structural steel frames & mezzanine floors',
      'Hand-forged wrought iron main entry gates & security grills',
      'Anti-corrosion epoxy primer & baked polyurethane finish',
      'Full MIG & TIG certified welding standards'
    ]
  },
  {
    id: 'stainless-steel-handrails',
    title: 'Stainless Steel Handrails and Cladding:',
    description: 'Enhance safety and aesthetics with our stainless steel handrails and cladding services, providing durability and a sleek look to various applications.',
    image: '/assets/images/futuristic_basit_ali_lobby_sculpture.png',
    category: 'Architectural Stainless Steel',
    specs: [
      'High-grade 304 and marine-grade 316 stainless steel',
      'High-gloss mirror polish or contemporary brushed hairline finishes',
      'Laser-cut pillar cladding, wall panels & modern balusters',
      'Concealed mechanical fixings with zero visible screws'
    ]
  }
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<DisplayService | null>(null);
  const [showAllServicesModal, setShowAllServicesModal] = useState(false);

  return (
    <section id="services" className="bg-white text-neutral-900 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching Alba Rose reference screenshot image_70e4eec7.png */}
        <h2 className="gsap-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 text-center tracking-tight mb-12 sm:mb-16">
          Services
        </h2>

        {/* 2-Column Grid matching reference image_70e4eec7.png */}
        <div className="gsap-stagger-children grid grid-cols-1 lg:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-10 sm:gap-y-12">
          {FEATURED_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group flex items-start gap-4 sm:gap-5 cursor-pointer p-2 rounded-lg hover:bg-neutral-50 transition-colors"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedService(service);
                }
              }}
            >
              {/* Circular Photo with Red Border matching reference */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full shrink-0 border-2 border-[#E31E27] overflow-hidden bg-neutral-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title & Description matching reference */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg leading-snug group-hover:text-[#E31E27] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-1 text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centered SERVICES DETAIL Button matching reference image_70e4eec7.png */}
        <div className="gsap-scale-up mt-14 sm:mt-16 text-center">
          <button
            type="button"
            onClick={() => setShowAllServicesModal(true)}
            className="inline-block px-8 sm:px-10 py-3 border-2 border-[#E31E27] text-[#E31E27] hover:bg-[#E31E27] hover:text-white font-semibold text-xs sm:text-sm tracking-widest uppercase transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
          >
            SERVICES DETAIL
          </button>
        </div>

      </div>

      {/* Individual Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="single-service-modal-title"
        >
          <div className="relative w-full max-w-xl bg-white border border-neutral-200 rounded-xl shadow-2xl overflow-hidden p-6 sm:p-8">
            <button
              onClick={() => setSelectedService(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full border-2 border-[#E31E27] overflow-hidden shrink-0">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-[#E31E27] tracking-wider">
                  {selectedService.category}
                </p>
                <h3 id="single-service-modal-title" className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed mb-5">
              {selectedService.description}
            </p>

            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                Technical Specifications &amp; Standards:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-800">
                {selectedService.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/923202740066?text=${encodeURIComponent(
                  `Hello Basit Ali Aluminum, I am inquiring about "${selectedService.title}". Please schedule a free measurement in Lahore.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto py-3 px-6 bg-[#E31E27] hover:bg-[#c91820] text-white rounded font-bold text-xs sm:text-sm text-center uppercase tracking-wider transition-colors shadow-sm"
              >
                Book Free Survey
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive SERVICES DETAIL Modal */}
      {showAllServicesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="all-services-modal-title"
        >
          <div className="relative w-full max-w-4xl bg-white border border-neutral-200 rounded-xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAllServicesModal(false)}
              aria-label="Close all services details"
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase font-bold text-[#E31E27] tracking-wider">
                Basit Ali Aluminum &amp; Glass Work • Lahore
              </span>
              <h3 id="all-services-modal-title" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                Complete Services &amp; Technical Catalog
              </h3>
              <p className="text-neutral-600 text-sm mt-1">
                Serving all areas across Lahore with on-site laser measurement, 5-year structural warranty, and 24/7 emergency repair dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {SERVICES_DATA.map((item) => (
                <div key={item.id} className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/70 hover:border-[#E31E27]/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full border border-[#E31E27] overflow-hidden relative shrink-0">
                      <Image
                        src={item.thumbnail}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className="font-bold text-neutral-900 text-sm">{item.name}</h4>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.specs.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-white border border-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-neutral-900 text-sm">Need custom fabrication or emergency repair?</p>
                <p className="text-xs text-neutral-600">Available 24/7 across Lahore • Call or WhatsApp: 0320-2740066</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="tel:03202740066"
                  className="px-4 py-2 bg-neutral-900 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/923202740066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
