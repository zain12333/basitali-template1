'use client';

import React from 'react';
import Image from 'next/image';
import { Wrench, Award, CreditCard, ShieldCheck, TrendingUp, Headphones } from 'lucide-react';
import { CLIENT_INFO } from '@/lib/data';

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: Wrench,
      title: 'Cutting-Edge Tools'
    },
    {
      icon: Award,
      title: 'Proven Expertise'
    },
    {
      icon: CreditCard,
      title: 'Competitive Pricing'
    },
    {
      icon: ShieldCheck,
      title: 'Long-Term Guarantee'
    },
    {
      icon: TrendingUp,
      title: 'Experience'
    },
    {
      icon: Headphones,
      title: 'Exceptional Support'
    }
  ];

  return (
    <section id="why-us" className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] lg:min-h-[580px]">
      {/* Left Column: Skyscraper Background + Dark Scrim matching image no 3 */}
      <div className="relative p-8 sm:p-14 lg:p-20 flex flex-col justify-center overflow-hidden">
        {/* Background Image: Skyscraper modern glass facade looking up (image-1-min.jpg) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/image-1-min.jpg"
            alt="Modern skyscraper architectural glass facade"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Dark scrim overlay matching reference screenshot */}
          <div className="absolute inset-0 bg-neutral-950/85 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/75 pointer-events-none" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-xl space-y-5">
          <p className="gsap-fade-up text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase">
            Why Choose BASIT ALI
          </p>

          <h2 className="gsap-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Redefining Excellence in Aluminum and Glass
          </h2>

          <p className="gsap-fade-up text-neutral-300 text-sm sm:text-base leading-relaxed">
            At Basit Ali, we stand out from the crowd by offering a unique combination of expertise, passion, and personalized service. Choose us as your partner and enjoy the following exclusive advantages that set us apart from the competition.
          </p>

          <div className="pt-3">
            <a
              href={CLIENT_INFO.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-9 py-3.5 bg-[#E31E27] hover:bg-[#c91820] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-lg active:scale-95"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Welder Sparks Background + Red Overlay matching image no 3 */}
      <div className="relative p-8 sm:p-14 lg:p-20 flex flex-col justify-center overflow-hidden">
        {/* Background Image: Welder with Sparks (Basit Ali Metalworking Sparks.png) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/basit_ali_metalworking_sparks.png"
            alt="Basit Ali Metalworking Sparks Background"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center brightness-95"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Exact Brand Red Overlay with multiply blend matching screenshot */}
          <div className="absolute inset-0 bg-[#E31E27] mix-blend-multiply opacity-95" />
          <div className="absolute inset-0 bg-[#E31E27E8]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/15 pointer-events-none" />
        </div>

        {/* Foreground Content: 6 Pillars matching image.png */}
        <div className="gsap-stagger-children relative z-10 max-w-md space-y-6 sm:space-y-7">
          {advantages.map((adv, index) => {
            const Icon = adv.icon;
            return (
              <div key={index} className="flex items-center gap-4 sm:gap-5 group">
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {adv.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
