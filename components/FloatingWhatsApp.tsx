'use client';

import React, { useState } from 'react';
import { X, Phone, Send } from 'lucide-react';
import { CLIENT_INFO } from '@/lib/data';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const handleSend = () => {
    const text = userQuery.trim()
      ? `Hello Basit Ali Aluminum: ${userQuery}`
      : 'Hello Basit Ali Aluminum, I would like to book a free measurement and quote in Lahore.';
    window.open(`https://wa.me/923202740066?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Interactive Popup Box */}
      {isOpen && (
        <div className="mb-3 w-80 bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn text-white">
          <div className="bg-[#075e54] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-sm border border-white/30">
                BA
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Basit Ali Aluminum</h4>
                <p className="text-[11px] text-emerald-200">Online · Lahore Team</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-neutral-950 space-y-3">
            <div className="bg-neutral-800/90 p-3 rounded-xl rounded-tl-none border border-neutral-700/60 text-xs text-neutral-200 leading-relaxed">
              👋 Assalam-o-Alaikum! Welcome to Basit Ali Aluminum &amp; Glass Works.
              <br />
              How can we assist you with windows, shower cabins, or 24/7 emergency glass repair in Lahore?
            </div>

            <textarea
              rows={2}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Type your message or project requirements..."
              className="w-full p-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />

            <button
              onClick={handleSend}
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button with WhatsApp Brand Color */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp with Basit Ali Aluminum (0320-2740066)"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group relative"
      >
        <span className="sr-only">WhatsApp Chat</span>
        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 text-[9px] font-black text-white items-center justify-center">
            1
          </span>
        </span>
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
    </div>
  );
}
