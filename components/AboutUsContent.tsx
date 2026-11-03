'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Wrench,
  Award,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Headphones,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { CLIENT_INFO } from '@/lib/data';

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (!erasing && displayedCount < text.length) {
      const timer = setTimeout(() => setDisplayedCount((c) => c + 1), 45);
      return () => clearTimeout(timer);
    }
    if (!erasing && displayedCount >= text.length) {
      const pause = setTimeout(() => setErasing(true), 1500);
      return () => clearTimeout(pause);
    }
    if (erasing && displayedCount > 0) {
      const timer = setTimeout(() => setDisplayedCount((c) => c - 1), 25);
      return () => clearTimeout(timer);
    }
    if (erasing && displayedCount === 0) {
      const pause = setTimeout(() => setErasing(false), 500);
      return () => clearTimeout(pause);
    }
  }, [started, displayedCount, text.length, erasing]);

  return (
    <h2 ref={ref} className={className}>
      {text.slice(0, displayedCount)}
      <span className="inline-block w-[3px] h-[1em] bg-white ml-0.5 animate-pulse align-baseline" />
    </h2>
  );
}

export default function AboutUsContent() {
  const advantages = [
    { icon: Wrench, title: 'Cutting-Edge Tools' },
    { icon: Award, title: 'Proven Expertise' },
    { icon: CreditCard, title: 'Competitive Pricing' },
    { icon: ShieldCheck, title: 'Long-Term Guarantee' },
    { icon: TrendingUp, title: 'Experience' },
    { icon: Headphones, title: 'Exceptional Support' },
  ];

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-20 sm:py-28 text-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/aboutus/about-us-min.jpg"
            alt="Construction site background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <p className="text-[#E31E27] text-sm sm:text-base font-semibold mb-2">
            Basit Ali Aluminum &amp; Glass
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white">
            About
          </h1>
        </div>
      </section>

      {/* ── About Section: Our Journey ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Logo + text */}
            <div className="space-y-6">
              <div>
                <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
                  About BASIT ALI
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                  Crafting Excellence in Aluminum and Glass Solutions
                </h2>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                Our Journey to Success
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                From our humble beginnings, Basit Ali Aluminum &amp; Glass has emerged as a leading architectural aluminum, glazing, stainless steel, and automation company in Lahore. With a commitment to delivering exceptional workmanship at competitive prices, our team of highly experienced engineers and technicians ensures that every project, regardless of size, receives the utmost care and attention.
              </p>

              {/* Logo badge */}
              <div className="flex items-center gap-4 pt-2">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md border border-neutral-200 p-1 shrink-0">
                  <Image
                    src="/assets/aistudio/ChatGPT_Image_Sep_30__2026__03_47_25_PM_f9e8138f.png"
                    alt="Basit Ali Logo"
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-heading font-black text-lg text-neutral-900 uppercase leading-tight">
                    Basit Ali
                  </p>
                  <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                    Aluminium &amp; Glass Works
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">
              <div className="absolute top-[-14px] right-[-14px] w-[65%] h-[65%] border-2 border-[#d4a843] rounded-lg z-0" />
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl bg-neutral-100 group z-10">
                <Image
                  src="/assets/aboutus/Professional Workshop Branding.png"
                  alt="Basit Ali professional team at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Expertise & Innovation + Customer Satisfaction ── */}
      <section className="bg-[#FAFAFA] py-16 sm:py-24 border-y border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  Expertise and Innovation
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  With a team of highly competent individuals, we uphold our position as a specialist in aluminum and glass works across Pakistan. Our commitment to achieving the highest standards of quality and service is supported by the utilization of state-of-the-art technologies.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  Customer Satisfaction at the Core
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  We take pride in our systematic focus on customer satisfaction, consistently surpassing expectations through our unwavering commitment to high-quality service. By attracting and retaining the best talent, we continue to strive towards our goal of being the foremost manufacturer, supplier, and installer of aluminum, glass, and automation works in the industry.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">
              <div className="absolute top-[-14px] right-[-14px] w-[65%] h-[65%] border-2 border-[#d4a843] rounded-lg z-0" />
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl bg-neutral-100 group z-10">
                <Image
                  src="/assets/aboutus/twoperosn.png"
                  alt="Basit Ali workshop professional branding"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* International Standards */}
          <div className="mt-16 sm:mt-20 space-y-4 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              International Standards and Certifications
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              As part of our dedication to providing clients with the highest quality products, we have taken a significant step by entering into agreements with renowned companies. This partnership allows us to provide our clients with aluminum systems of international standard quality, ensuring that their projects meet and exceed expectations.
            </p>
          </div>

          {/* Conclusion */}
          <div className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Conclusion
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              At Basit Ali Aluminum &amp; Glass, we are committed to crafting excellence in aluminum and glass solutions. With our dedication to quality, customer satisfaction, and innovation, we strive to exceed expectations and deliver exceptional results. Partner with us for your next project, and experience the difference that our expertise and passion, combined with international standard quality, can make.
            </p>
            <div className="pt-4">
              <a
                href={CLIENT_INFO.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-3.5 bg-[#E31E27] hover:bg-[#c5131c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HSE Policy Banner ── */}
      <section className="bg-[#E31E27] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Prioritizing Health, Safety &amp; Environment (HSE)
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            At Basit Ali, the well-being of our employees, clients, and the environment is our top priority. Our comprehensive HSE Policy reflects our commitment to maintaining high standards, preventing incidents, and fostering a culture of safety. Explore our HSE Policy to understand how we ensure a safe and sustainable working environment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#"
              className="px-7 py-3 bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-sm active:scale-95"
            >
              Read HSE Policy
            </a>
            <a
              href="#"
              className="px-7 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors active:scale-95"
            >
              Read Quality Policy
            </a>
          </div>
        </div>
      </section>

      {/* ── Vision Section ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Text */}
            <div className="space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                Basit Ali Vision
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Our vision is to be the leading provider of exceptional aluminum and glass solutions. We are dedicated to delivering unmatched quality, innovative designs, and superior customer service. By consistently exceeding client expectations and staying at the forefront of industry advancements, we aim to set new standards and inspire the future of architectural excellence. Our vision is fueled by passion and our commitment to creating spaces that inspire, enhance, and endure.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-block px-8 py-3.5 bg-[#E31E27] hover:bg-[#c5131c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">
              <div className="absolute top-[-14px] right-[-14px] w-[65%] h-[65%] border-2 border-[#d4a843] rounded-lg z-0" />
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl bg-neutral-100 group z-10">
                <Image
                  src="/assets/images/aluminum_installation_craftsmen_1793184890381.jpg"
                  alt="Basit Ali aluminum technicians at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 right-4 bg-[#E31E27] text-white px-4 py-2.5 rounded-lg shadow-lg z-20">
                  <p className="text-2xl sm:text-3xl font-black leading-none">10<sup className="text-base">+</sup></p>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Basit Ali ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] lg:min-h-[580px]">
        {/* Left: Dark side */}
        <div className="relative p-8 sm:p-14 lg:p-20 flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/image-1-min.jpg"
              alt="Modern skyscraper glass facade"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-neutral-950/85 backdrop-brightness-75" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/75 pointer-events-none" />
          </div>
          <div className="relative z-10 max-w-xl space-y-5">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase">
              Why Choose BASIT ALI
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Redefining Excellence in Aluminum and Glass
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
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

        {/* Right: Red side */}
        <div className="relative p-8 sm:p-14 lg:p-20 flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/basit_ali_metalworking_sparks.png"
              alt="Basit Ali Metalworking"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center brightness-95"
            />
            <div className="absolute inset-0 bg-[#E31E27] mix-blend-multiply opacity-95" />
            <div className="absolute inset-0 bg-[#E31E27E8]/85" />
          </div>
          <div className="relative z-10 max-w-md space-y-6 sm:space-y-7">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              return (
                <div key={index} className="flex items-center gap-4 sm:gap-5 group">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {adv.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Blog / Tips Section ── */}
      <section className="bg-white py-16 sm:py-24 border-t border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
            Basit Ali Blog
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-10">
            Read our Tips and Tricks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <article className="border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                Why Aluminum is the Future of Building
              </h3>
              <p className="text-xs text-neutral-500 mb-3">
                Basit Ali Team &middot; 2024
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Imagine a material abundant in nature, effortlessly shaping our world from towering skyscrapers to sleek cars. It&apos;s not magic; it&apos;s aluminum, the versatile metal transforming modern construction with its lightweight strength and corrosion resistance.
              </p>
            </article>

            <article className="border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                The Ultimate Guide to Custom Aluminum Fabrication in Lahore
              </h3>
              <p className="text-xs text-neutral-500 mb-3">
                Basit Ali Team &middot; 2024
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Welcome to the ultimate guide on custom aluminum fabrication. Aluminum&apos;s durability, versatility, and sleek appearance make it a popular choice for both residential and commercial projects across Lahore and Pakistan.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── CTA Banner with curved top edge ── */}
      <section className="relative overflow-hidden">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full block" preserveAspectRatio="none">
            <path d="M0,0 L1440,0 L1440,30 Q720,80 0,30 Z" fill="white" />
          </svg>
        </div>

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/aboutus/image-1-min.jpg"
            alt="Premium aluminum and glass staircase"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/70" />
        </div>

        <div className="relative z-10 text-center py-24 sm:py-32 px-4">
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E31E27] uppercase mb-3">
            Upgrade to Premium Aluminum &amp; Glass
          </p>
          <TypewriterText
            text="Experience Unmatched Quality with Basit Ali"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-4"
          />
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
            and Enjoy Exceptional Craftsmanship and a Wide Range of Customizable Options.
          </p>
        </div>
      </section>
    </>
  );
}
