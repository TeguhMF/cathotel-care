import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, CalendarDays, Wallet, 
  Settings, LogOut, Search, Bell, Cat, Inbox, Plus, Filter, Download,
  RefreshCw, CheckCircle2, LogIn, XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  // State Data Real dari Backend
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Load Data saat komponen dipasang
  useEffect(() => {
    fetchAdminBookings();
  }, []);

  const fetchAdminBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/bookings');
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Gagal mengambil data booking admin:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Aksi Update Status
  const handleUpdateStatus = async (bookingId, newStatus) => {
    const confirmMessage = `Apakah Anda yakin ingin mengubah status booking ini menjadi "${newStatus.replace('_', ' ').toUpperCase()}"?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      await axios.patch(`http://127.0.0.1:8000/api/admin/bookings/${bookingId}/status`, {
        status: newStatus,
      });
      alert('Status pesanan berhasil diperbarui!');
      fetchAdminBookings();
    } catch (error) {
      console.error('Gagal memperbarui status:', error);
      alert('Gagal mengubah status booking.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert("Berhasil Logout dari Admin!");
    navigate('/');
  };

  const handleExport = (format, type) => {
    alert(`Memproses Export Data ${type} ke format ${format.toUpperCase()}...\nFile simulasi siap diunduh!`);
  };

  // Kalkulasi Statistik Riil
  const totalReservasi = bookings.length;
  const kucingMenginap = bookings.filter(b => b.status === 'checked_in').length;
  const totalPendapatan = bookings
    .filter(b => b.payment_status === 'paid')
    .reduce((sum, item) => sum + Math.round(item.total_price * 0.3), 0);
  
  // Dapatkan daftar unik pelanggan
  const uniqueCustomers = Array.from(new Set(bookings.map(b => b.user_id)))
    .map(id => bookings.find(b => b.user_id === id)?.user)
    .filter(Boolean);

  // Filter Data untuk Tabel
  const filteredBookings = bookings.filter((item) => {
    const matchesSearch =
      item.booking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.user?.name && item.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.cat_name && item.cat_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex overflow-hidden font-sans">
      
      {/* SIDEBAR */}
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

      {/* MAIN KONTEN */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center bg-slate-100 px-4 py-2.5 rounded-xl w-96 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder="Cari kode, customer, atau anabul..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700" 
            />
          </div>

          <div className="flex items-center gap-6">
            <button onClick={fetchAdminBookings} className="p-2 text-slate-400 hover:text-orange-500 transition-colors" title="Refresh Data">
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
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

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* MENU 1: DASHBOARD */}
          {activeMenu === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Ringkasan Hari Ini</h1>
                <p className="text-sm text-slate-500 mt-1">Pantau performa penitipan dan reservasi CatHotel Care.</p>
              </div>

              {/* STATISTIK RIIL */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-blue-50 text-blue-500">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Total Reservasi</p>
                    <p className="text-2xl font-extrabold text-slate-800 mt-1">{totalReservasi}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-orange-50 text-orange-500">
                    <Cat className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Kucing Menginap</p>
                    <p className="text-2xl font-extrabold text-slate-800 mt-1">{kucingMenginap}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-500">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Total DP Masuk</p>
                    <p className="text-xl font-extrabold text-slate-800 mt-1">
                      Rp {totalPendapatan.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-purple-50 text-purple-500">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Total Pelanggan</p>
                    <p className="text-2xl font-extrabold text-slate-800 mt-1">{uniqueCustomers.length}</p>
                  </div>
                </div>
              </div>

              {/* TABEL PREVIEW TERBARU */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Pesanan Terbaru</h3>
                {bookings.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <Inbox className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    Belum ada data reservasi masuk.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b text-slate-400 text-xs uppercase">
                          <th className="py-3 px-2">Kode</th>
                          <th className="py-3 px-2">Customer</th>
                          <th className="py-3 px-2">Anabul</th>
                          <th className="py-3 px-2">Bayar</th>
                          <th className="py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {bookings.slice(0, 5).map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50">
                            <td className="py-3 px-2 font-bold text-orange-600">{b.booking_code}</td>
                            <td className="py-3 px-2">{b.user?.name || '-'}</td>
                            <td className="py-3 px-2">{b.cat_name} ({b.room?.name})</td>
                            <td className="py-3 px-2 font-semibold text-emerald-600">{b.payment_status.toUpperCase()}</td>
                            <td className="py-3 px-2">
                              <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
                                {b.status.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MENU 2: KELOLA RESERVASI */}
          {activeMenu === 'booking' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Kelola Reservasi</h1>
                  <p className="text-sm text-slate-500 mt-1">Daftar seluruh transaksi pemesanan dan pelunasan DP.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleExport('excel', 'Reservasi')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Excel</span>
                  </button>
                </div>
              </div>

              {/* FILTER STATUS */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
                {['all', 'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      statusFilter === st
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {st === 'all' ? 'SEMUA STATUS' : st.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
              </div>

              {/* TABEL LENGKAP RESERVASI */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                  <div className="py-20 text-center text-slate-400">Memuat data reservasi...</div>
                ) : filteredBookings.length === 0 ? (
                  <div className="py-20 text-center text-slate-400">Tidak ada data reservasi.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
                          <th className="p-4">Kode & Customer</th>
                          <th className="p-4">Anabul & Kamar</th>
                          <th className="p-4">Jadwal</th>
                          <th className="p-4">Pembayaran</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Aksi Admin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredBookings.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-4">
                              <p className="font-extrabold text-orange-600">{item.booking_code}</p>
                              <p className="font-semibold text-slate-800">{item.user?.name || '-'}</p>
                              <p className="text-xs text-slate-400">{item.user?.email}</p>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-slate-800">{item.cat_name}</p>
                              <p className="text-xs text-slate-500">{item.cat_breed || 'Domestic'} • {item.room?.name}</p>
                            </td>
                            <td className="p-4 text-xs text-slate-600">
                              <p className="font-medium">{item.check_in} s/d {item.check_out}</p>
                              <span className="text-slate-400">({item.total_nights} Malam)</span>
                            </td>
                            <td className="p-4">
                              <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg ${
                                item.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                              }`}>
                                {item.payment_status.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg ${
                                item.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                item.status === 'checked_in' ? 'bg-purple-100 text-purple-700' :
                                item.status === 'checked_out' ? 'bg-emerald-100 text-emerald-700' :
                                item.status === 'cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {item.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-1.5">
                                {item.status === 'pending' && (
                                  <button
                                    onClick={() => handleUpdateStatus(item.id, 'confirmed')}
                                    className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg border border-blue-200"
                                    title="Konfirmasi Pesanan"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                )}

                                {item.status === 'confirmed' && (
                                  <button
                                    onClick={() => handleUpdateStatus(item.id, 'checked_in')}
                                    className="p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg border border-purple-200"
                                    title="Check-In (Kucing Datang)"
                                  >
                                    <LogIn className="w-4 h-4" />
                                  </button>
                                )}

                                {item.status === 'checked_in' && (
                                  <button
                                    onClick={() => handleUpdateStatus(item.id, 'checked_out')}
                                    className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg border border-emerald-200"
                                    title="Check-Out (Kucing Pulang)"
                                  >
                                    <LogOut className="w-4 h-4" />
                                  </button>
                                )}

                                {item.status !== 'cancelled' && item.status !== 'checked_out' && (
                                  <button
                                    onClick={() => handleUpdateStatus(item.id, 'cancelled')}
                                    className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg border border-rose-200"
                                    title="Batalkan Booking"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MENU 3: PELANGGAN */}
          {activeMenu === 'customers' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Data Pelanggan</h1>
                  <p className="text-sm text-slate-500 mt-1">Daftar pemilik kucing yang pernah melakukan reservasi.</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                {uniqueCustomers.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">Belum ada pelanggan terdaftar.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {uniqueCustomers.map((cust, idx) => (
                      <div key={idx} className="p-4 border border-slate-200 rounded-2xl flex items-center gap-3 bg-slate-50">
                        <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                          {cust?.name ? cust.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{cust?.name}</p>
                          <p className="text-xs text-slate-500">{cust?.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}