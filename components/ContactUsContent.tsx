'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CLIENT_INFO } from '@/lib/data';
import {
  ArrowRight,
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  ChevronDown,
} from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Request a Quote',
  'Free Measurement',
  'Product Inquiry',
  'Project Consultation',
  'After-Sales Support',
  'Other',
];

export default function ContactUsContent() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: 'Request a Quote',
    message: '',
  });
  const [subjectOpen, setSubjectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Contact Form Submission*%0A%0A*Name:* ${formData.fullName}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    window.open(
      `https://wa.me/923202740066?text=${text}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative text-white py-16 sm:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/service/about-us-min.jpg"
            alt="Contact Basit Ali Aluminum & Glass Work"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/65" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-heading text-white">
            Contact Us
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/70 mt-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Contact</span>
          </nav>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* ── Left: Contact Info ── */}
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-3">
                Get In Touch
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 font-heading tracking-tight leading-tight mb-10">
                Let&apos;s Build Something Together
              </h2>

              <div className="space-y-7">
                {/* Head Office */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#E31E27] flex items-center justify-center shrink-0 shadow-md">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#E31E27] mb-0.5">
                      Head Office &amp; Factory
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      196-A Main Multan Rd, Lahore,
                      <br />
                      54000, Pakistan
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#E31E27] flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#E31E27] mb-0.5">
                      Call Us
                    </h3>
                    <a
                      href={`tel:${CLIENT_INFO.phoneTel}`}
                      className="text-sm text-neutral-600 hover:text-[#E31E27] transition-colors"
                    >
                      {CLIENT_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#E31E27] flex items-center justify-center shrink-0 shadow-md">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#E31E27] mb-0.5">
                      WhatsApp &amp; Cell
                    </h3>
                    <a
                      href={CLIENT_INFO.whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-600 hover:text-[#E31E27] transition-colors"
                    >
                      {CLIENT_INFO.whatsApp}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#E31E27] flex items-center justify-center shrink-0 shadow-md">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#E31E27] mb-0.5">
                      Email
                    </h3>
                    <a
                      href={`mailto:${CLIENT_INFO.email}`}
                      className="text-sm text-neutral-600 hover:text-[#E31E27] transition-colors break-all"
                    >
                      {CLIENT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#E31E27] flex items-center justify-center shrink-0 shadow-md">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#E31E27] mb-0.5">
                      Business Hours
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {CLIENT_INFO.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Contact Form ── */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E27]/30 focus:border-[#E31E27] transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03xx xxxxxxx"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E27]/30 focus:border-[#E31E27] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Email + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E27]/30 focus:border-[#E31E27] transition-colors"
                    />
                  </div>
                  <div ref={dropdownRef} className="relative">
                    <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <button
                      type="button"
                      onClick={() => setSubjectOpen(!subjectOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#E31E27]/30 focus:border-[#E31E27] transition-colors"
                    >
                      <span>{formData.subject}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                          subjectOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {subjectOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-20 py-1">
                        {SUBJECT_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                subject: option,
                              }));
                              setSubjectOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors ${
                              formData.subject === option
                                ? 'text-[#E31E27] font-semibold bg-red-50/50'
                                : 'text-neutral-700'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirement..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E27]/30 focus:border-[#E31E27] transition-colors resize-vertical"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E31E27] hover:bg-[#C5131C] text-white font-bold text-sm rounded-lg transition-colors shadow-md active:scale-[0.98]"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Map ── */}
      <section className="w-full">
        <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px]">
          <iframe
            title="Basit Ali Aluminum & Glass Work Location"
            src="https://www.google.com/maps?q=196-A+Main+Multan+Rd,+Lahore,+54000,+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </section>
    </>
  );
}
