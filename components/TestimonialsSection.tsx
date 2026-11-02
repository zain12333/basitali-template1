'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Review {
  id: number;
  name: string;
  date: string;
  avatarType: 'image' | 'letter';
  avatarValue: string;
  avatarBg?: string;
  rating: number;
  verified: boolean;
  text: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Noman Malik',
    date: 'September 6, 2024',
    avatarType: 'letter',
    avatarValue: 'N',
    avatarBg: 'bg-[#0f766e]',
    rating: 5,
    verified: true,
    text: 'I highly recommend Basit Ali Aluminum & Glass. Their rates are very reasonable with out compromising quality. Staff is well mannered and clarity in their dealing.',
  },
  {
    id: 2,
    name: 'Asim Khan',
    date: 'June 8, 2024',
    avatarType: 'letter',
    avatarValue: 'A',
    avatarBg: 'bg-[#6B3FA0]',
    rating: 5,
    verified: true,
    text: 'Had very good experience with team. Responsible management.',
  },
  {
    id: 3,
    name: 'Engr. Hassan Tariq',
    date: 'August 19, 2024',
    avatarType: 'letter',
    avatarValue: 'H',
    avatarBg: 'bg-[#1e40af]',
    rating: 5,
    verified: true,
    text: 'Installed sleek aluminum sliding doors and tempered shower cabins in our new DHA Phase 6 home. Exceptional finish and completed 2 days ahead of schedule!',
  },
  {
    id: 4,
    name: 'Zubair Sheikh',
    date: 'July 14, 2024',
    avatarType: 'letter',
    avatarValue: 'Z',
    avatarBg: 'bg-[#b45309]',
    rating: 5,
    verified: true,
    text: 'Reliable shop front double-glazed curtain wall installation in Gulberg. Basit Ali and his team provided free laser measurement and very competitive quotation.',
  },
  {
    id: 5,
    name: 'Muhammad Rizwan',
    date: 'October 11, 2024',
    avatarType: 'letter',
    avatarValue: 'M',
    avatarBg: 'bg-[#047857]',
    rating: 5,
    verified: true,
    text: 'Prompt 24/7 emergency glass repair and custom slimline aluminum partitions. Very polite technicians and perfectly clean work. Highly recommended!',
  },
];

// Official Google 4-Color 'G' Icon
function GoogleGIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-label="Google">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.39 7.35 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.61 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

// Official Google Wordmark
function GoogleWordmark() {
  return (
    <div className="flex items-center text-2xl sm:text-3xl font-semibold tracking-tight select-none mt-1">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </div>
  );
}

// Google Verified Checkmark Badge
function VerifiedBadge() {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1a73e8] text-white ml-1.5 flex-shrink-0" title="Verified review">
      <svg className="w-2.5 h-2.5 stroke-white fill-none stroke-[3]" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </span>
  );
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalReviews = REVIEWS.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalReviews - 1 : prev - 1));
  }, [totalReviews]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalReviews - 1 ? 0 : prev + 1));
  }, [totalReviews]);

  useEffect(() => {
    const timer = setInterval(handleNext, 3000);
    return () => clearInterval(timer);
  }, [handleNext]);

  // On desktop we show 2 reviews side-by-side
  const reviewA = REVIEWS[currentIndex];
  const reviewB = REVIEWS[(currentIndex + 1) % totalReviews];

  return (
    <section id="testimonials" className="bg-[#FAFAFA] py-20 sm:py-24 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header with amber/yellow dot matching image_cc0712ab.png */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="gsap-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Testimonials<span className="text-[#f59e0b]">.</span>
          </h2>
          <p className="gsap-fade-up mt-2.5 text-neutral-500 text-sm sm:text-base font-normal">
            Here&apos;s what our clients say about us.
          </p>
        </div>

        {/* Main Content Layout matching screenshot */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 max-w-6xl mx-auto">
          {/* Left Block: EXCELLENT + 5 Stars + Based on 28 reviews + Google Logo */}
          <div className="gsap-fade-left flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0 min-w-[200px] lg:pr-4">
            <h3 className="text-xl sm:text-2xl font-bold tracking-wider text-neutral-900 uppercase">
              EXCELLENT
            </h3>
            
            {/* 5 Big Gold Stars */}
            <div className="flex items-center gap-1.5 my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-[#FBBC04] text-[#FBBC04]"
                />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 font-medium">
              Based on <span className="font-bold text-neutral-900">28 reviews</span>
            </p>

            <GoogleWordmark />
          </div>

          {/* Right Block: Carousel Cards with Chevron Navigation */}
          <div className="relative w-full flex-1">
            {/* Navigation Chevrons */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-700 hover:text-black hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-700 hover:text-black hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4 sm:px-6">
              {/* Card 1 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={reviewA.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    {/* Top Row: Avatar + Name/Date + Google G */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            className={`w-11 h-11 rounded-full ${reviewA.avatarBg || 'bg-neutral-800'} text-white flex items-center justify-center font-bold text-lg shadow-sm`}
                          >
                            {reviewA.avatarValue}
                          </div>
                          {/* Mini star badge on avatar */}
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-xs">
                            <Star className="w-2.5 h-2.5 fill-white text-white" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                            {reviewA.name}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {reviewA.date}
                          </p>
                        </div>
                      </div>

                      <GoogleGIcon className="w-5 h-5 flex-shrink-0" />
                    </div>

                    {/* Stars + Verified Badge */}
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(reviewA.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]"
                        />
                      ))}
                      {reviewA.verified && <VerifiedBadge />}
                    </div>

                    {/* Review Quote */}
                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                      {reviewA.text}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card 2 (Desktop view) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={reviewB.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="hidden md:flex bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-7 flex-col justify-between min-h-[220px]"
                >
                  <div>
                    {/* Top Row: Avatar + Name/Date + Google G */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            className={`w-11 h-11 rounded-full ${reviewB.avatarBg || 'bg-purple-700'} text-white flex items-center justify-center font-bold text-lg shadow-sm`}
                          >
                            {reviewB.avatarValue}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                            {reviewB.name}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {reviewB.date}
                          </p>
                        </div>
                      </div>

                      <GoogleGIcon className="w-5 h-5 flex-shrink-0" />
                    </div>

                    {/* Stars + Verified Badge */}
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(reviewB.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]"
                        />
                      ))}
                      {reviewB.verified && <VerifiedBadge />}
                    </div>

                    {/* Review Quote */}
                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                      {reviewB.text}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots below cards */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-3 h-3 bg-neutral-900'
                      : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
