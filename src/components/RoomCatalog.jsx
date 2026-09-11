import React, { useState } from 'react';
import { Check, ShieldAlert, Sparkles, Crown, Home } from 'lucide-react';

const rooms = [
  {
    id: 'standard',
    name: 'Standard Room',
    price: 50000,
    dpRate: 0.3, // 30% DP
    icon: Home,
    badge: 'Populer',
    description: 'Kandang nyaman ukuran standar, ideal untuk 1 ekor kucing dewasa.',
    features: [
      'Kandang ukuran 60 x 60 cm',
      'Ruangan ber-AC (Full AC)',
      'Litter box & pasir gumpal',
      'Pemberian makan 2x sehari',
      'Pembersihan kandang rutin'
    ],
    imageUrl: 'src/assets/kandang 1.png'
  },
  {
    id: 'deluxe',
    name: 'Deluxe Suite',
    price: 85000,
    dpRate: 0.3,
    icon: Sparkles,
    badge: 'Best Value',
    description: 'Kandang bertingkat dengan area bermain mini, muat hingga 2 ekor kucing.',
    features: [
      'Kandang tingkat 90 x 70 cm',
      'Ruangan Full AC & Air Purifier',
      'Area Playtime harian (30 menit)',
      'Litter box & pasir wangi',
      'Update foto/video via WA 1x/hari'
    ],
    imageUrl: 'src/assets/kandang 2.png'
  },
  {
    id: 'vip',
    name: 'VIP Executive',
    price: 130000,
    dpRate: 0.3,
    icon: Crown,
    badge: 'Mewah',
    description: 'Kamar privat tanpa kandang kawat (Glass Room) dengan fasilitas lengkap.',
    features: [
      'Privat Glass Cabin (120 x 100 cm)',
      'Fasilitas Scratch Post & Cat Tree',
      'Playtime bebas sepuasnya',
      'Free Grooming (Min. inap 5 hari)',
      'Update foto & video harian kapan saja'
    ],
    imageUrl: 'src/assets/kandang 3.png'
  }
];

export default function RoomCatalog({ onSelectRoom }) {
  const [selectedDuration, setSelectedDuration] = useState(1);

  return (
    <section id="katalog" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Judul */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-xs sm:text-sm">
            Pilihan Akomodasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            Katalog Kamar <span className="text-orange-500">CatHotel</span>
          </h2>
          <p className="text-slate-600">
            Pilih jenis kamar yang paling sesuai dengan kebutuhan si anabul. Transaksi aman dengan sistem DP 30% untuk booking.
          </p>
        </div>

        {/* Simulator Durasi Menginap */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 mb-12 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <label htmlFor="duration-select" className="text-sm font-semibold text-slate-700">
            Simulasi Durasi Menginap:
          </label>
          <div className="flex items-center gap-2">
            {[1, 3, 5, 7].map((days) => (
              <button
                key={days}
                onClick={() => setSelectedDuration(days)}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
                  selectedDuration === days
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {days} Hari
              </button>
            ))}
          </div>
        </div>

        {/* Grid Kartu Kamar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => {
            const Icon = room.icon;
            const totalPrice = room.price * selectedDuration;
            const dpAmount = totalPrice * room.dpRate;

            return (
              <div 
                key={room.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col overflow-hidden group"
              >
                {/* Gambar Kamar */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={room.imageUrl} 
                    alt={room.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {room.badge}
                  </div>
                </div>

                {/* Isian Info Kamar */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-orange-500" />
                      <h3 className="text-xl font-bold text-slate-800">{room.name}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">{room.description}</p>

                    {/* Rincian Harga & Estimasi DP */}
                    <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 mb-6">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-xs text-slate-500">Harga / Malam:</span>
                        <span className="text-sm font-bold text-slate-800">
                          Rp {room.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between pt-2 border-t border-orange-100">
                        <span className="text-xs font-semibold text-orange-600">
                          Estimasi DP (30%):
                        </span>
                        <span className="text-lg font-extrabold text-orange-600">
                          Rp {dpAmount.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 text-right">
                        Sisa pelunasan di lokasi
                      </p>
                    </div>

                    {/* Checklist Fitur */}
                    <ul className="space-y-2.5 mb-6">
                      {room.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tombol Pilih Kamar */}
                  <button
                    onClick={() => onSelectRoom(room, selectedDuration)}
                    className="w-full py-3 bg-slate-900 hover:bg-orange-500 text-white font-bold text-sm rounded-xl transition-all shadow-md"
                  >
                    Pilih & Lanjut Booking
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}