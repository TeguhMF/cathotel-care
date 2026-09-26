import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/bookings/user/${user.id}`);
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Gagal mengambil riwayat booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = (snapToken) => {
    if (window.snap && snapToken) {
      window.snap.pay(snapToken, {
        onSuccess: function () {
          alert('Pembayaran Berhasil!');
          fetchUserBookings();
        },
        onPending: function () {
          alert('Menunggu pembayaran diselesaikan.');
        },
        onError: function () {
          alert('Pembayaran gagal!');
        },
        onClose: function () {
          alert('Kamu menutup popup pembayaran sebelum selesai.');
        }
      });
    } else {
      alert('Snap Token tidak tersedia.');
    }
  };

  if (!user) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-slate-900 flex justify-center items-start">
        <div className="max-w-md w-full mx-4 p-6 text-center bg-white rounded-2xl shadow-xl">
          <p className="text-gray-600 mb-4 font-medium">Silakan login terlebih dahulu untuk mengakses profil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 min-h-screen bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Profil */}
        <div className="bg-slate-800 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-tr from-orange-600 to-orange-400 text-white rounded-2xl flex items-center justify-center text-4xl font-extrabold shadow-lg shadow-orange-500/20">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-extrabold text-white">{user.name}</h1>
            <p className="text-slate-400 mt-1">{user.email}</p>
            <span className="inline-block mt-3 px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full">
              Customer CatHotel
            </span>
          </div>
        </div>

        {/* Navigation Tab */}
        <div className="flex border-b border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-6 font-semibold text-sm transition-all border-b-2 ${
              activeTab === 'history'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Riwayat Booking
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-3 px-6 font-semibold text-sm transition-all border-b-2 ${
              activeTab === 'info'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Informasi Akun
          </button>
        </div>

        {/* Tab content: Riwayat Booking */}
        {activeTab === 'history' && (
          <div>
            {loading ? (
              <div className="text-center py-12 text-slate-400">Memuat data riwayat booking...</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-800">
                <p className="text-slate-300 font-medium">Belum ada riwayat booking.</p>
                <p className="text-xs text-slate-500 mt-1">Pesanan kamar anabul kamu akan muncul di sini.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-white text-lg tracking-wide">{booking.booking_code}</span>
                        <span className={`px-2.5 py-0.5 text-[11px] font-extrabold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' :
                          booking.status === 'cancelled' ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400' : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                        }`}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-sm text-slate-300">
                        <strong className="text-slate-100">Kamar:</strong> {booking.room?.name || 'Standard Room'}
                      </p>
                      <p className="text-sm text-slate-300">
                        <strong className="text-slate-100">Anabul:</strong> {booking.cat_name} ({booking.cat_breed || 'Domestic'})
                      </p>
                      <p className="text-sm text-slate-300">
                        <strong className="text-slate-100">Jadwal:</strong> {booking.check_in} s/d {booking.check_out} ({booking.total_nights} Malam)
                      </p>
                    </div>

                    <div className="text-left md:text-right w-full md:w-auto border-t border-slate-700 md:border-t-0 pt-4 md:pt-0">
                      <p className="text-xs text-slate-400">Total DP (30%)</p>
                      <p className="text-2xl font-black text-orange-400 mb-3">
                        Rp {Math.round(booking.total_price * 0.3).toLocaleString('id-ID')}
                      </p>

                      {booking.payment_status === 'unpaid' && booking.status !== 'cancelled' && (
                        <button
                          onClick={() => handlePay(booking.snap_token)}
                          className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-2.5 px-6 rounded-xl shadow-lg shadow-orange-500/20 transition-all"
                        >
                          Bayar DP Sekarang
                        </button>
                      )}
                      {booking.payment_status === 'paid' && (
                        <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-extrabold rounded-xl">
                          LUNAS (DP)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab content: Informasi Akun */}
        {activeTab === 'info' && (
          <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-md max-w-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Informasi Akun</h3>
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-slate-400 block text-xs mb-1">Nama Lengkap</label>
                <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-xl font-medium text-slate-200">{user.name}</div>
              </div>
              <div>
                <label className="text-slate-400 block text-xs mb-1">Email</label>
                <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-xl font-medium text-slate-200">{user.email}</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;