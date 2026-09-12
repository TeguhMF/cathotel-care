import React, { useState, useEffect } from 'react';
import { ArrowUp, MapPin } from 'lucide-react';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 300) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-100 text-slate-600 relative">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* BARIS ATAS: Sosial Media (Kiri) & Kontak WhatsApp (Kanan) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-dashed border-slate-200">
          
          {/* Ikon Sosial Media (Instagram & Google Maps) */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              title="Instagram"
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Google Maps */}
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              title="Google Maps Location"
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
            >
              <MapPin className="w-4 h-4" />
            </a>
          </div>

          {/* Kontak WhatsApp Sisi Kanan */}
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
            <svg className="w-6 h-6 fill-emerald-500" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp:</span>
            <a href="https://wa.me/6285117244832" target="_blank" rel="noreferrer" className="text-sky-500 hover:underline">
              0851-1724-4832
            </a>
          </div>

        </div>

        {/* BARIS BAWAH: Copyright & Policy Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-500">
          <p>
            Copyright © 2026 <span className="text-sky-500 font-medium">CatHotel Care</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy & Cookie Policy</a>
            <span className="text-slate-300">|</span>
            <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>

      {/* TOMBOL SCROLL TO TOP */}
      <button
        onClick={scrollTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-orange-500 hover:scale-110 ${
          showScroll ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </footer>
  );
}