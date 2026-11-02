'use client';

import React, { useState } from 'react';
import { FAQ_DATA } from '@/lib/data';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#f7f7f7] text-neutral-900 py-20 sm:py-28 border-b border-neutral-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="gsap-fade-up text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
            Got Questions? We Have Answers
          </p>
          <h2 className="gsap-text-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion matching screenshot image_f1a9fe21.png */}
        <div className="gsap-stagger-children space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-[#E31E27E8] text-white' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
