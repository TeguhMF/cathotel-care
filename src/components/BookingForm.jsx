import React, { useState } from 'react';
import { Calendar, User, Phone, Cat, CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';

export default function BookingForm({ selectedRoom, bookingDuration, selectedServices }) {
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    catName: '',
    catBreed: '',
    checkInDate: '',
    notes: '',
  });

  // Kalkulasi Total Biaya
  const roomPriceTotal = selectedRoom ? selectedRoom.price * bookingDuration : 0;
  const servicesPriceTotal = selectedServices.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = roomPriceTotal + servicesPriceTotal;
  
  // Down Payment (30%) & Pelunasan On-site (70%)
  const dpAmount = Math.round(grandTotal * 0.3);
  const remainingAmount = grandTotal - dpAmount;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!selectedRoom) {
      alert("Silakan pilih kamar terlebih dahulu dari Katalog Kamar!");
      return;
    }

    // Simulasi pemanggilan Midtrans Snap
    alert(
      `[SIMULASI MIDTRANS SNAP]\n\n` +
      `Pemesan: ${formData.ownerName}\n` +
      `Kucing: ${formData.catName}\n` +
      `Kamar: ${selectedRoom.name} (${bookingDuration} Hari)\n` +
      `Total Biaya: Rp ${grandTotal.toLocaleString('id-ID')}\n\n` +
      `-> Wajib DP (30%): Rp ${dpAmount.toLocaleString('id-ID')}\n` +
      `-> Sisa di Lokasi: Rp ${remainingAmount.toLocaleString('id-ID')}`
    );
  };

  return (
    <section id="booking-form" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Judul */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-xs sm:text-sm">
            Langkah Terakhir
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            Formulir Booking & <span className="text-orange-500">Bayar DP</span>
          </h2>
          <p className="text-slate-600">
            Isi data diri dan anabul Anda untuk booking slot kamar dengan pembayaran DP 30%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sisi Kiri: Form Input Data (8 Kolom) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              <span>Data Pemilik & Anabul</span>
            </h3>

            <form onSubmit={handleSubmitBooking} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Nama Pemilik *</label>
                  <input
                    type="text"
                    name="ownerName"
                    required
                    placeholder="Contoh: Teguh"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="081234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Nama Kucing *</label>
                  <input
                    type="text"
                    name="catName"
                    required
                    placeholder="Contoh: Milo"
                    value={formData.catName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Ras / Jenis Kucing</label>
                  <input
                    type="text"
                    name="catBreed"
                    placeholder="Contoh: Persian / Domestic"
                    value={formData.catBreed}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Tanggal Check-in *</label>
                <input
                  type="date"
                  name="checkInDate"
                  required
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Catatan Khusus / Riwayat Medis</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Contoh: Kucing tidak suka dipegang ekornya, pakan khusus dikirim bersama anabul."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 text-base mt-4"
              >
                <CreditCard className="w-5 h-5" />
                <span>Bayar DP Sekarang (Rp {dpAmount.toLocaleString('id-ID')})</span>
              </button>
            </form>
          </div>

          {/* Sisi Kanan: Ringkasan Rincian Biaya (5 Kolom) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm sticky top-28">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Cat className="w-5 h-5 text-orange-500" />
              <span>Rincian Estimasi DP</span>
            </h3>

            {/* Status Pilihan Kamar */}
            {selectedRoom ? (
              <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{selectedRoom.name}</h4>
                    <p className="text-xs text-slate-500">Durasi: {bookingDuration} Hari</p>
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    Rp {roomPriceTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs mb-6">
                Belum ada kamar yang dipilih. Silakan pilih kamar pada Katalog Kamar di atas.
              </div>
            )}

            {/* List Add-ons */}
            {selectedServices.length > 0 && (
              <div className="mb-6 space-y-2.5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Layanan Tambahan:</p>
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex justify-between text-xs text-slate-600">
                    <span>+ {service.name}</span>
                    <span className="font-semibold text-slate-800">
                      Rp {service.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Kalkulasi Pembayaran */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Total Biaya Keseluruhan:</span>
                <span className="font-bold text-slate-800">Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-orange-600 pt-2 border-t border-slate-100">
                <span>Wajib DP (30%):</span>
                <span>Rp {dpAmount.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between text-xs text-slate-500">
                <span>Sisa Pelunasan (Di Lokasi):</span>
                <span className="font-semibold text-slate-700">Rp {remainingAmount.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Informasi Keamanan */}
            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
              <span>Pembayaran DP dijamin aman & terverifikasi.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}