import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mengambil data user yang sedang login dari localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/bookings/user/${user.id}`);
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = (snapToken) => {
    if (window.snap && snapToken) {
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          alert('Pembayaran Berhasil!');
          fetchBookings(); // Refresh data otomatis setelah bayar
        },
        onPending: function (result) {
          alert('Menunggu Pembayaran diselesaikan.');
        },
        onError: function (result) {
          alert('Pembayaran Gagal!');
        },
        onClose: function () {
          alert('Kamu menutup popup sebelum menyelesaikan pembayaran.');
        }
      });
    } else {
      alert('Snap token tidak valid atau Midtrans belum termuat.');
    }
  };

  if (!user) return <div className="text-center mt-20 text-gray-500">Silakan login terlebih dahulu untuk melihat riwayat.</div>;
  if (loading) return <div className="text-center mt-20">Memuat data riwayat...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Riwayat Booking Saya</h2>
      
      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center py-10 bg-gray-50 rounded-lg">Kamu belum memiliki riwayat booking.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-xl p-5 shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="font-bold text-lg text-gray-800">{booking.booking_code}</p>
                <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Kamar:</span> {booking.room?.name || 'Kamar Tidak Tersedia'}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Nama Anabul:</span> {booking.cat_name}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Jadwal:</span> {booking.check_in} s/d {booking.check_out} ({booking.total_nights} Malam)
                </p>
                
                <div className="mt-3 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    Pesanan: {booking.status.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                    booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 
                    booking.payment_status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-red-100 text-red-700'
                  }`}>
                    Bayar: {booking.payment_status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-right w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                <p className="text-sm text-gray-500 mb-1">Total DP (30%)</p>
                <p className="font-bold text-xl text-orange-600 mb-3">
                  Rp {Math.round(booking.total_price * 0.3).toLocaleString('id-ID')}
                </p>
                
                {/* Tombol Bayar HANYA muncul jika status pembayaran unpaid */}
                {booking.payment_status === 'unpaid' && booking.status !== 'cancelled' && (
                  <button 
                    onClick={() => handlePay(booking.snap_token)}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-colors"
                  >
                    Bayar DP Sekarang
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;