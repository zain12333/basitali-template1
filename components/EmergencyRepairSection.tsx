'use client';

import React from 'react';
import { Phone, Clock, AlertTriangle, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { CLIENT_INFO } from '@/lib/data';

export default function EmergencyRepairSection() {
  const emergencyScenarios = [
    'Shattered or Cracked Commercial Storefront Glass',
    'Stuck or De-railed Patio Sliding Doors',
    'Broken Bathroom Shower Glass Door',
    'High-Rise Window Storm Damage & Water Ingress',
    'Damaged Hydraulic Floor Spring / Hinge Emergency',
    'Urgent Temporary Boarding & Site Safety Containment'
  ];

  return (
    <section id="emergency" className="bg-neutral-950 text-white py-16 sm:py-20 border-b border-[#E31E27]/40 relative overflow-hidden">
      {/* Background warning tone glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E31E27]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-black via-neutral-900 to-neutral-950 border-2 border-[#E31E27] rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E31E27] text-white rounded-md text-xs font-black uppercase tracking-wider shadow-sm">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span>24/7 Emergency Dispatch</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Emergency Aluminum &amp; Glass Repair Across Lahore
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Glass emergencies never wait for business hours. Whether a storefront window shattered on MM Alam Road, a sliding patio door jammed off its track in DHA, or a shower cabin hinge broke in Bahria Town, our mobile emergency team responds 24 hours a day, 7 days a week across Lahore.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {emergencyScenarios.map((scenario, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E31E27] shrink-0" />
                    <span>{scenario}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Direct Hotline Action Card */}
            <div className="lg:col-span-5 bg-black/60 border border-[#E31E27]/60 p-6 sm:p-8 rounded-2xl text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-[#E31E27]/20 text-[#E31E27] border border-[#E31E27]/50 flex items-center justify-center mx-auto">
                <Phone className="w-7 h-7 animate-pulse" />
              </div>

              <div>
                <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
                  Direct Emergency Hotline (Call Anytime)
                </p>
                <a
                  href={`tel:${CLIENT_INFO.phoneTel}`}
                  className="block text-2xl sm:text-3xl font-black font-mono text-white hover:text-[#E31E27] transition-colors mt-1"
                >
                  {CLIENT_INFO.phone}
                </a>
                <p className="text-xs text-[#E31E27] font-semibold mt-1">
                  Active 24/7 · Rapid Dispatch in Lahore
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${CLIENT_INFO.phoneTel}`}
                  className="w-full py-3.5 px-4 bg-[#E31E27E8] hover:bg-[#E31E27] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Emergency Team Now</span>
                </a>

                <a
                  href={`https://wa.me/923202740066?text=${encodeURIComponent(
                    'URGENT: I have an emergency glass / aluminum repair need in Lahore. Please dispatch a technician immediately.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Emergency Photos</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
