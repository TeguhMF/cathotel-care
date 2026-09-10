import React, { useState } from 'react';
import { Mail, Key, X, LogIn, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

export default function LoginModal({ isOpen, onClose }) {
  const [role, setRole] = useState('user');
  const [isSignUp, setIsSignUp] = useState(false);
  
  const navigate = useNavigate(); // 2. Inisialisasi hook navigate

  if (!isOpen) return null;

  // 3. Fungsi penanganan submit login berdasarkan Role (RBAC)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (role === 'admin') {
      onClose(); // Tutup modal
      navigate('/admin'); // Redirect langsung ke halaman Dashboard Admin
    } else {
      alert("Login Customer Berhasil!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      
      {/* Container Utama */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex md:block animate-in fade-in zoom-in duration-300">
        
        {/* Tombol Close Silang */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 1. SISI FORM SIGN UP */}
        <div className={`absolute top-0 left-0 w-full md:w-1/2 h-full p-8 sm:p-12 flex flex-col justify-center transition-all duration-700 ease-in-out ${isSignUp ? 'md:translate-x-full opacity-100 z-20 visible' : 'opacity-0 z-0 invisible md:visible md:-translate-x-full'}`}>
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2 relative inline-block">
              Create Account
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-orange-500 rounded-full"></span>
            </h2>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Registrasi berhasil!'); setIsSignUp(false); }}>
            <div className="relative flex items-center border-2 border-slate-100 rounded-xl px-4 py-3 bg-slate-50/50 focus-within:border-orange-500 focus-within:bg-white transition-all">
              <User className="w-5 h-5 text-slate-400 mr-3" />
              <div className="w-px h-5 bg-slate-200 mr-3"></div>
              <input type="text" placeholder="Full Name" className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-700" required />
            </div>

            <div className="relative flex items-center border-2 border-slate-100 rounded-xl px-4 py-3 bg-slate-50/50 focus-within:border-orange-500 focus-within:bg-white transition-all">
              <Mail className="w-5 h-5 text-slate-400 mr-3" />
              <div className="w-px h-5 bg-slate-200 mr-3"></div>
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-700" required />
            </div>

            <div className="relative flex items-center border-2 border-slate-100 rounded-xl px-4 py-3 bg-slate-50/50 focus-within:border-orange-500 focus-within:bg-white transition-all">
              <Key className="w-5 h-5 text-slate-400 mr-3" />
              <div className="w-px h-5 bg-slate-200 mr-3"></div>
              <input type="password" placeholder="Password" className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-700" required />
            </div>

            <button type="submit" className="w-full mt-4 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              SIGN UP
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 md:hidden">
            Already have an account? <button onClick={() => setIsSignUp(false)} className="text-orange-500 font-bold">Sign In</button>
          </p>
        </div>

        {/* 2. SISI FORM LOGIN */}
        <div className={`absolute top-0 left-0 w-full md:w-1/2 h-full p-8 sm:p-12 flex flex-col justify-center transition-all duration-700 ease-in-out ${!isSignUp ? 'opacity-100 z-20 visible translate-x-0' : 'opacity-0 z-0 invisible md:visible md:translate-x-full'}`}>
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2 relative inline-block">
              Login please
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-700 rounded-full"></span>
            </h2>
          </div>

          {/* Toggle Role Customer vs Admin */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button type="button" onClick={() => setRole('user')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'user' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>Customer</button>
            <button type="button" onClick={() => setRole('admin')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'admin' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>Admin</button>
          </div>

          <form className="space-y-5" onSubmit={handleLoginSubmit}>
            <div className="relative flex items-center border-2 border-slate-100 rounded-xl px-4 py-3 bg-slate-50/50 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <Mail className="w-5 h-5 text-slate-400 mr-3" />
              <div className="w-px h-5 bg-slate-200 mr-3"></div>
              <input type="text" placeholder="Input your user ID or Email" className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-700" required />
            </div>

            <div className="relative flex items-center border-2 border-slate-100 rounded-xl px-4 py-3 bg-slate-50/50 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <Key className="w-5 h-5 text-slate-400 mr-3" />
              <div className="w-px h-5 bg-slate-200 mr-3"></div>
              <input type="password" placeholder="Input your password" className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-700" required />
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700 cursor-pointer" />
                <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-xs font-bold text-slate-500 hover:text-blue-700 transition-colors">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full mt-6 px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-700/30 transition-all flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              LOG IN
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 md:hidden">
            Don't have an account? <button onClick={() => setIsSignUp(true)} className="text-blue-700 font-bold">Sign Up</button>
          </p>
        </div>

        {/* 3. PANEL ORANYE ANIMASI SLIDING */}
        <div className={`hidden md:flex absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-br from-orange-400 to-orange-600 transition-transform duration-700 ease-in-out z-50 overflow-hidden ${isSignUp ? '-translate-x-full rounded-r-3xl' : 'translate-x-0 rounded-l-3xl'}`}>
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-orange-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-75"></div>
          
          <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-12">
            <div className={`absolute transition-all duration-500 ${isSignUp ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8 invisible'}`}>
              <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">WELCOME BACK!</h2>
              <p className="text-orange-50 mb-8 font-medium">To keep connected with us please login with your personal info.</p>
              <button onClick={() => setIsSignUp(false)} className="px-10 py-3 bg-transparent border-2 border-white/80 hover:bg-white hover:text-orange-600 text-white font-bold rounded-full transition-all uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">Sign In</button>
            </div>

            <div className={`absolute transition-all duration-500 ${!isSignUp ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 -translate-y-8 invisible'}`}>
              <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">HELLO, FRIEND!</h2>
              <p className="text-orange-50 mb-8 font-medium">Enter your personal details and start your journey with us.</p>
              <button onClick={() => setIsSignUp(true)} className="px-10 py-3 bg-transparent border-2 border-white/80 hover:bg-white hover:text-orange-600 text-white font-bold rounded-full transition-all uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">Sign Up</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}