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
        
        {/* BARIS ATAS: Sosial Media (Instagram & Google Maps) */}
        <div className="flex items-center justify-between gap-6 pb-8 border-b border-dashed border-slate-200">
          
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              title="Instagram"
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-orange-500 hover:text-white transition-all shadow-sm group"
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