'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Clock, Eye, Type, AlertCircle } from 'lucide-react';
import { CLIENT_INFO } from '@/lib/data';

export default function AccessibilityBar() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-size-large', 'font-size-xlarge');
    if (fontSizeLevel === 'large') {
      root.classList.add('font-size-large');
    } else if (fontSizeLevel === 'xlarge') {
      root.classList.add('font-size-xlarge');
    }
  }, [fontSizeLevel]);

  return (
    <div
      role="region"
      aria-label="Accessibility & Emergency Contact Bar"
      className="bg-neutral-950 text-neutral-300 text-xs border-b border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Emergency Notice & Service Area */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 text-[#E31E27] font-semibold">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31E27] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31E27]"></span>
            </span>
            <span className="text-white">24/7 Emergency Repairs:</span>
            <a
              href={`tel:${CLIENT_INFO.phoneTel}`}
              className="text-[#E31E27] hover:underline font-mono tracking-tight"
            >
              {CLIENT_INFO.phone}
            </a>
          </div>
          <span className="hidden sm:inline text-neutral-600" aria-hidden="true">·</span>
          <span className="hidden md:inline text-neutral-400">
            📍 Service Area: <strong className="text-neutral-200 font-medium">All Over Lahore</strong>
          </span>
          <span className="hidden lg:inline text-neutral-600" aria-hidden="true">·</span>
          <span className="hidden lg:inline text-neutral-400">
            Free On-Site Measurement & Quotation
          </span>
        </div>

        {/* Right: Accessibility Controls */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Font Size Adjuster */}
          {/* <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono hidden sm:inline mr-1">
              Text:
            </span>
            <button
              onClick={() => setFontSizeLevel('normal')}
              aria-label="Reset font size to normal"
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                fontSizeLevel === 'normal'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel('large')}
              aria-label="Increase font size"
              className={`px-1.5 py-0.5 rounded text-[13px] font-bold transition-colors ${
                fontSizeLevel === 'large'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSizeLevel('xlarge')}
              aria-label="Increase font size to extra large"
              className={`px-1.5 py-0.5 rounded text-[15px] font-extrabold transition-colors ${
                fontSizeLevel === 'xlarge'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              A++
            </button>
          </div> */}

          {/* High Contrast Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            aria-pressed={highContrast}
            aria-label="Toggle High Contrast Mode"
            className={`flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-medium transition-colors ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-300'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white hover:border-neutral-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">
              {highContrast ? 'Normal Contrast' : 'High Contrast'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
