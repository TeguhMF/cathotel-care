import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, RefreshCw, CheckCircle2, LogIn, LogOut, XCircle, ShieldAlert } from 'lucide-react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Ambil data user dari localStorage untuk cek role admin
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    fetchAdminBookings();
  }, []);

  const fetchAdminBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/bookings');
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Gagal memuat data booking admin:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Filter pencarian dan status
  const filteredBookings = bookings.filter((item) => {
    const matchesSearch =
      item.booking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.user?.name && item.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.cat_name && item.cat_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-32 pb-16 min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider">
                Panel Pengelola
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Dashboard Kelola Reservasi</h1>
            <p className="text-slate-400 text-sm mt-1">Pantau dan kelola seluruh pesanan penitipan kucing masuk.</p>
          </div>

          <button
            onClick={fetchAdminBookings}
            className="self-start md:self-auto flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-orange-400 border border-slate-700/80 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Kode, Customer, atau Anabul..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['all', 'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  statusFilter === status
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                {status === 'all' ? 'Semua Status' : status.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Tabel Reservasi */}
        <div className="bg-slate-800 border border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="text-center py-16 text-slate-400">Memuat data pesanan...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-16 text-slate-400">Tidak ada reservasi yang sesuai.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4">Kode & Customer</th>
                    <th className="p-4">Anabul & Kamar</th>
                    <th className="p-4">Jadwal Menginap</th>
                    <th className="p-4">Status Bayar</th>
                    <th className="p-4">Status Pesanan</th>
                    <th className="p-4 text-center">Aksi Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 text-sm">
                  {filteredBookings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="p-4">
                        <p className="font-extrabold text-orange-400 tracking-wide">{item.booking_code}</p>
                        <p className="font-semibold text-slate-200 mt-0.5">{item.user?.name || 'Customer'}</p>
                        <p className="text-xs text-slate-400">{item.user?.email || '-'}</p>
                      </td>

                      <td className="p-4">
                        <p className="font-bold text-slate-100">{item.cat_name}</p>
                        <p className="text-xs text-slate-400">
                          {item.cat_breed || 'Domestic'} • <span className="text-slate-300 font-medium">{item.room?.name || 'Kamar'}</span>
                        </p>
                      </td>

                      <td className="p-4 text-xs text-slate-300">
                        <p className="font-medium">{item.check_in} s/d {item.check_out}</p>
                        <span className="text-slate-400">({item.total_nights} Malam)</span>
                      </td>

                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-1 text-[11px] font-extrabold rounded-lg ${
                          item.payment_status === 'paid'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}>
                          {item.payment_status.toUpperCase()}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-1 text-[11px] font-extrabold rounded-lg ${
                          item.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                          item.status === 'checked_in' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                          item.status === 'checked_out' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          item.status === 'cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {item.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Confirm */}
                          {item.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'confirmed')}
                              className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 transition-all"
                              title="Konfirmasi Pesanan"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Check-In */}
                          {item.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'checked_in')}
                              className="p-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg border border-purple-500/30 transition-all"
                              title="Check-In Kucing Datang"
                            >
                              <LogIn className="w-4 h-4" />
                            </button>
                          )}

                          {/* Check-Out */}
                          {item.status === 'checked_in' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'checked_out')}
                              className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 transition-all"
                              title="Check-Out / Kucing Pulang"
                            >
                              <LogOut className="w-4 h-4" />
                            </button>
                          )}

                          {/* Cancel */}
                          {item.status !== 'cancelled' && item.status !== 'checked_out' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'cancelled')}
                              className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30 transition-all"
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
    </div>
  );
};

export default AdminBookings;