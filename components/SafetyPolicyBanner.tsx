'use client';

import React, { useState } from 'react';
import { ShieldAlert, Award, X, CheckCircle2 } from 'lucide-react';

export default function SafetyPolicyBanner() {
  const [modalType, setModalType] = useState<'hse' | 'quality' | null>(null);

  return (
    <section className="bg-[#E31E27E8] text-white py-14 sm:py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="gsap-fade-up text-white/95 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
          At Basit Ali, the well-being of our employees, clients, and the architectural safety of every building is our top priority. Our comprehensive Safety (HSE) &amp; Quality Policies reflect our commitment to certified safety-tempered glass, accident prevention, and durable engineering. Explore our standards to understand how we protect your space.
        </p>

        {/* Buttons matching screenshot image_3ebbe6e1.png */}
        <div className="gsap-scale-up pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setModalType('hse')}
            className="w-full sm:w-auto px-8 py-3 bg-white text-[#E31E27] hover:bg-neutral-100 text-xs sm:text-sm font-bold uppercase tracking-wider rounded shadow-md transition-all active:scale-95"
          >
            Read HSE Policy
          </button>
          <button
            onClick={() => setModalType('quality')}
            className="w-full sm:w-auto px-8 py-3 bg-white text-[#E31E27] hover:bg-neutral-100 text-xs sm:text-sm font-bold uppercase tracking-wider rounded shadow-md transition-all active:scale-95"
          >
            Read Quality Policy
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-white max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'hse' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-950/80 rounded-lg text-[#E31E27] border border-[#E31E27]/50">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Health, Safety &amp; Environment (HSE)</h3>
                    <p className="text-xs text-neutral-400">Zero Incident Worksite Protocol across Lahore</p>
                  </div>
                </div>

                <div className="text-sm text-neutral-300 space-y-3 leading-relaxed border-t border-neutral-800 pt-4">
                  <p>
                    Basit Ali Aluminum &amp; Glass enforces strict safety protocols for all residential, commercial, and high-rise installations:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0 mt-0.5" />
                      <span><strong>Certified Safety Glass:</strong> Exclusive use of heat-treated tempered glass that crumbles into safe, blunt granules if shattered.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0 mt-0.5" />
                      <span><strong>On-Site PPE:</strong> All technicians are equipped with suction lifters, cut-resistant Kevlar gloves, hard hats, and steel-toe footwear.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0 mt-0.5" />
                      <span><strong>Structural Load Testing:</strong> Wind-load and deflection calculations for all multi-panel sliding doors and storefronts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0 mt-0.5" />
                      <span><strong>Eco Disposal:</strong> 100% recycling of aluminum offcuts and cullet glass.</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-950/80 rounded-lg text-[#E31E27] border border-[#E31E27]/50">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Quality Guarantee &amp; Workmanship</h3>
                    <p className="text-xs text-neutral-400">Precision Standards &amp; 5-Year Guarantee</p>
                  </div>
                </div>

                <div className="text-sm text-neutral-300 space-y-3 leading-relaxed border-t border-neutral-800 pt-4">
                  <p>
                    Every millimeter counts in architectural glazing. Our quality assurance pledge includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0 mt-0.5" />
                      <span><strong>High-Gauge Aluminum:</strong> Verified 1.2mm to 2.0mm thickness with uniform baked powder coat or electrolytic anodization.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0 mt-0.5" />
                      <span><strong>Silent Heavy-Duty Rollers:</strong> German brass and nylon ball-bearing rollers guaranteed for 100,000 smooth cycles.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0 mt-0.5" />
                      <span><strong>Leak-Proof Weatherproofing:</strong> EPDM rubber gaskets and Dow Corning silicone sealant preventing dust and monsoon leaks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E31E27] shrink-0 mt-0.5" />
                      <span><strong>Direct Manufacturer Warranty:</strong> 5-year workmanship warranty with prompt local service support.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-medium text-xs transition-colors"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
