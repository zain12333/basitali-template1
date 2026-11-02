'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CLIENT_INFO, LAHORE_AREAS, SERVICES_DATA } from '@/lib/data';

export default function RequestQuoteAndMap() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: LAHORE_AREAS[0],
    service: SERVICES_DATA[0].name,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `Hello Basit Ali Aluminum, I would like to book a free measurement / quotation:
- Name: ${formData.name || 'Customer'}
- Phone: ${formData.phone || 'Provided via WhatsApp'}
- Location in Lahore: ${formData.area}
- Service Needed: ${formData.service}
- Additional Notes: ${formData.message || 'Looking for expert consultation and measurement.'}`;

    window.open(`https://wa.me/923202740066?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div id="contact" className="bg-neutral-950 text-white">
      {/* Upgrade Banner matching Alba Rose screenshot */}
      <div className="relative py-16 sm:py-20 px-4 text-center overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero_aluminum_glass_facade_1793184890767.jpg"
            alt="Aluminum and glass facade"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#E31E27]/30 to-black/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-3">
          <p className="text-xs sm:text-sm font-black tracking-widest text-[#E31E27] uppercase">
            Upgrade to Premium Aluminum &amp; Glass
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Enjoy Exceptional Craftsmanship and a Wide Range of Customizable Options
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto pt-2">
            Free site measurements, structural consultation, and certified safety tempered glass for every room and commercial entrance.
          </p>
        </div>
      </div>

      {/* Main Quote & Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Request Form */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 p-6 sm:p-10 rounded-2xl shadow-2xl">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E31E27]">
                Get In Touch
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Request a Quote
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Ready to work together? Book your free measurement and project estimate with us!
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/70 border border-emerald-500/50 p-6 rounded-xl text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">
                  Measurement Request Received!
                </h4>
                <p className="text-sm text-neutral-300">
                  Thank you, <strong>{formData.name}</strong>. Basit Ali&apos;s team has received your request for <strong>{formData.service}</strong> in <strong>{formData.area}</strong>.
                </p>
                <p className="text-xs text-neutral-400">
                  We will call you at <strong className="text-white">{formData.phone}</strong> shortly to confirm the measurement appointment.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Open WhatsApp Chat Now
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium transition-colors"
                  >
                    Send Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-950/80 border border-[#E31E27] text-red-200 text-xs rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Zain"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-[#E31E27] focus:outline-none focus:ring-1 focus:ring-[#E31E27]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0320-xxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-[#E31E27] focus:outline-none focus:ring-1 focus:ring-[#E31E27] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Lahore Location / Area *
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white focus:border-[#E31E27] focus:outline-none focus:ring-1 focus:ring-[#E31E27]"
                    >
                      {LAHORE_AREAS.map((area, i) => (
                        <option key={i} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white focus:border-[#E31E27] focus:outline-none focus:ring-1 focus:ring-[#E31E27]"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Project Details / Estimated Dimensions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need 4 sliding windows for 1st floor and 1 master bathroom shower cabin in DHA Phase 6."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-[#E31E27] focus:outline-none focus:ring-1 focus:ring-[#E31E27]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3.5 px-6 bg-[#E31E27E8] hover:bg-[#E31E27] text-white rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Book Free Measurement</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="w-full sm:w-auto py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Cards & Lahore Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Direct Contact Details Box */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
              <h3 className="text-xl font-bold text-white">
                Contact &amp; Service Information
              </h3>

              <div className="space-y-4 text-sm text-neutral-300">
                <a
                  href={`tel:${CLIENT_INFO.phoneTel}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-[#E31E27] transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-red-950/80 text-[#E31E27] border border-[#E31E27]/50 shrink-0">
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                      Direct Phone Call
                    </span>
                    <span className="text-base font-bold text-white font-mono">
                      {CLIENT_INFO.phone}
                    </span>
                    <span className="text-xs text-neutral-400 block">
                      Click to call anytime
                    </span>
                  </div>
                </a>

                <a
                  href={CLIENT_INFO.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-emerald-600 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-500 border border-emerald-800 shrink-0">
                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                      WhatsApp Quick Chat
                    </span>
                    <span className="text-base font-bold text-white font-mono">
                      {CLIENT_INFO.whatsApp}
                    </span>
                    <span className="text-xs text-emerald-400 block font-semibold">
                      Send photos &amp; dimensions for instant review
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${CLIENT_INFO.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-[#E31E27] transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-red-950/80 text-[#E31E27] border border-[#E31E27]/50 shrink-0">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                      Official Inquiries &amp; Drawings
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                      {CLIENT_INFO.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="p-2.5 rounded-lg bg-red-950/80 text-[#E31E27] border border-[#E31E27]/50 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                      Service Radius
                    </span>
                    <span className="text-sm font-bold text-white">
                      All Over Lahore, Punjab, Pakistan
                    </span>
                    <span className="text-xs text-neutral-400 block">
                      DHA, Gulberg, Bahria, Model Town, Johar Town, Cantt &amp; all sectors
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Styled Lahore Service Coverage Map Widget */}
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#E31E27]" />
                  Lahore Operational Coverage Map
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  100% City Coverage
                </span>
              </div>

              {/* Graphic map representation of Lahore hubs */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="font-mono">NORTH LAHORE / CANTT</span>
                  <span className="font-mono">EAST / DHA PHASES 1-9</span>
                </div>

                <div className="relative flex items-center justify-center py-6">
                  {/* Central Hub Marker */}
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-[#E31E27] opacity-30" />
                    <div className="relative z-10 px-4 py-2 bg-[#E31E27E8] text-white rounded-lg shadow-lg border border-white/20 text-xs font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      <span>Basit Ali Lahore Central Workshop</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="font-mono">WEST / IQBAL TOWN / JOHAR</span>
                  <span className="font-mono">SOUTH / BAHRIA / LAKE CITY</span>
                </div>

                {/* Grid network overlay lines */}
                <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {['DHA (1-9)', 'Gulberg', 'Bahria Town', 'Model Town', 'Johar Town', 'Cantt', 'Lake City'].map((area, idx) => (
                  <span key={idx} className="text-[11px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
