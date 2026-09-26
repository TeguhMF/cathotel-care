import React, { useState, useEffect } from 'react';
import { Cat, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onOpenLogin }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const userString = localStorage.getItem('user');
      if (userString) {
        setUser(JSON.parse(userString));
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener('userLoginStateChanged', checkUser);
    window.addEventListener('storage', checkUser);

    return () => {
      window.removeEventListener('userLoginStateChanged', checkUser);
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        
        {/* LOGO */}
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

        {/* Menu Navigasi Utama */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-200">
          <Link to="/" className="hover:text-orange-400 transition-colors">Beranda</Link>
          <a href="/#fasilitas" className="hover:text-orange-400 transition-colors">Fasilitas</a>
          <a href="/#tentang" className="hover:text-orange-400 transition-colors">Tentang Kami</a>
          <Link to="/booking" className="hover:text-orange-400 transition-colors">Katalog & Booking</Link>
        </nav>

        {/* AREA AKUN / LOGIN BUTTON */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
              <Link 
                to="/profile" 
                className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors"
                title="Lihat Profil & Riwayat"
              >
                <div className="p-1.5 bg-orange-500/20 rounded-xl border border-orange-500/30 text-orange-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">{user.name}</span>
              </Link>

              <div className="w-px h-4 bg-white/20"></div>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}