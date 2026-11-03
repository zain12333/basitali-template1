import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { pageOG } from '@/lib/og-defaults';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you are looking for does not exist. Return to Basit Ali Aluminum & Glass Work homepage to explore our services in Lahore.',
  openGraph: pageOG({
    title: 'Page Not Found',
    description:
      'The page you are looking for does not exist. Return to Basit Ali Aluminum & Glass Work homepage.',
    url: '/404',
  }),
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <Navbar />
      <section className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <p className="text-[#E31E27] font-bold text-sm uppercase tracking-widest mb-4 font-heading">
            Error 404
          </p>
          <h1 className="text-4xl sm:text-5xl font-black font-heading mb-4">
            Page Not Found
          </h1>
          <p className="text-neutral-400 mb-8 leading-relaxed">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
            Let us help you find what you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#E31E27] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Back to Homepage
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
