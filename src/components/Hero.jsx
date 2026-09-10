import React from 'react';
import { ShieldCheck, PawPrint, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative bg-slate-900 min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      
      {/* Background Image Full dengan Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1920&q=80" 
          alt="CatHotel Care Background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/60" />
      </div>

      {/* Konten Utama Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-2xl">
          
          <p className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">
            Penitipan Kucing Nyaman & Terpercaya
          </p>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            CatHotel <span className="text-orange-500">Care.</span>
          </h1>

          <p className="text-lg text-slate-200 mb-10 leading-relaxed">
            Anda Sedang Sibuk ? Ingin Ke Luar Kota / Liburan Pekerjaan Kantor Ke Luar Kota / Acara Di Luar Rumah ? Kami Menyediakan Solusi Penitipan Hewan Kesayangan Anda Tanpa Rasa Khawatir , Kami Jaga Dengan Sepenuh Hati.
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            {/* Tombol Booking Sekarang */}
            <Link 
              to="/booking"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-sm rounded-xl shadow-xl shadow-orange-500/30 transition-all"
            >
              BOOKING SEKARANG
            </Link>

            {/* Tombol Chat Admin (Berubah Hijau saat Hover) */}
            <a 
              href="https://wa.me/6285117244832" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 bg-transparent hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm border-2 border-white/80 hover:border-emerald-600 rounded-xl transition-all shadow-md"
            >
              CHAT ADMIN
            </a>
          </div>

          {/* Keunggulan Utama (Teks Lebih Nyantai & Icon Pas) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
              <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
              <span>Pengawasan 24/7</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
              <PawPrint className="w-5 h-5 text-orange-500 shrink-0" />
              <span>Kenyamanan Ruangan</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
              <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
              <span>Pelayanan Terbaik</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}