import React from 'react';
import { Cat, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onOpenLogin }) {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="p-2.5 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/30">
            <Cat className="w-7 h-7" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              CatHotel <span className="text-orange-500">Care</span>
            </span>
            <span className="block text-[10px] font-semibold tracking-widest text-slate-300 uppercase">
              Pet Boarding
            </span>
          </div>
        </Link>

        {/* Menu Navigasi - Warna diseragamkan semua */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-200">
          <Link to="/" className="hover:text-orange-400 transition-colors">Beranda</Link>
          <a href="/#fasilitas" className="hover:text-orange-400 transition-colors">Fasilitas</a>
          <a href="/#tentang" className="hover:text-orange-400 transition-colors">Tentang Kami</a>
          <Link to="/booking" className="hover:text-orange-400 transition-colors">Katalog & Booking</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenLogin}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>
        </div>

      </div>
    </header>
  );
}