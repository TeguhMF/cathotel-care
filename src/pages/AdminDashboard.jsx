import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, CalendarDays, Wallet, 
  Settings, LogOut, Search, Bell, Cat, Inbox, Plus, Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard'); // 'dashboard' | 'booking' | 'customers'

  const handleLogout = () => {
    alert("Berhasil Logout dari Admin!");
    navigate('/');
  };

  // Data State Dikosongkan
  const bookings = [];
  const customers = [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex overflow-hidden font-sans">
      
      {/* ================= SISI KIRI: SIDEBAR ================= */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="p-2.5 bg-orange-500 rounded-2xl text-white shadow-md shadow-orange-500/20">
            <Cat className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight">CatHotel <span className="text-orange-500">Admin</span></span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu Utama</p>
          
          <button 
            onClick={() => setActiveMenu('dashboard')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'dashboard' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveMenu('booking')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'booking' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <CalendarDays className="w-5 h-5" />
            <span className="font-medium text-sm">Reservasi</span>
          </button>
          
          <button 
            onClick={() => setActiveMenu('customers')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'customers' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Pelanggan</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all text-sm">
            <Settings className="w-5 h-5" />
            <span>Pengaturan</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-medium">
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* ================= SISI KANAN: KONTEN UTAMA ================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center bg-slate-100 px-4 py-2.5 rounded-xl w-96 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input type="text" placeholder="Cari data..." className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                AD
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Admin</p>
                <p className="text-xs text-slate-500">Kelompok 10</p>
              </div>
            </div>
          </div>
        </header>

        {/* Area Scrollable Konten */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* 1. TAMPILAN DASHBOARD */}
          {activeMenu === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Ringkasan Hari Ini</h1>
                <p className="text-sm text-slate-500 mt-1">Pantau performa penitipan dan reservasi CatHotel Care.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Reservasi', value: '0', icon: CalendarDays, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { label: 'Kucing Menginap', value: '0', icon: Cat, color: 'text-orange-500', bg: 'bg-orange-50' },
                  { label: 'Pendapatan (Bulan ini)', value: 'Rp 0', icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { label: 'Pelanggan Baru', value: '0', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">{stat.label}</p>
                      <p className="text-2xl font-extrabold text-slate-800 mt-1">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                  <Inbox className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-700 mb-1">Belum ada reservasi masuk</h3>
                <p className="text-xs text-slate-400 max-w-sm">Data pemesanan dari pelanggan akan muncul di sini.</p>
              </div>
            </div>
          )}

          {/* 2. TAMPILAN MANAJEMEN RESERVASI */}
          {activeMenu === 'booking' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Kelola Reservasi</h1>
                  <p className="text-sm text-slate-500 mt-1">Daftar seluruh transaksi pemesanan dan pelunasan DP.</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all">
                    <Filter className="w-4 h-4" />
                    <span>Filter Status</span>
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Tambah Booking</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
                  <CalendarDays className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Data Reservasi Kosong</h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Saat pelanggan mengisi form booking di website, riwayat reservasi beserta verifikasi DP Midtrans akan tercatat otomatis di sini.
                </p>
              </div>
            </div>
          )}

          {/* 3. TAMPILAN MANAJEMEN PELANGGAN */}
          {activeMenu === 'customers' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Data Pelanggan</h1>
                  <p className="text-sm text-slate-500 mt-1">Daftar pemilik kucing yang terdaftar di CatHotel Care.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pelanggan</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Belum Ada Pelanggan Terdaftar</h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Pelanggan yang membuat akun melalui form Sign Up atau melakukan booking akan otomatis tersimpan dalam direktori ini.
                </p>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}