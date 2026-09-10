import React, { useState } from 'react';
import { Scissors, Truck, ShieldCheck, HeartPulse, CheckCircle2, Plus } from 'lucide-react';

const additionalServices = [
  {
    id: 'grooming-basic',
    name: 'Grooming Basic',
    category: 'Perawatan',
    price: 45000,
    icon: Scissors,
    description: 'Mandi mandi jamur/kutu, potong kuku, pembersihan telinga, dan sisir bulu.',
  },
  {
    id: 'grooming-sehat',
    name: 'Grooming Complete + Anti Kutu',
    category: 'Perawatan',
    price: 75000,
    icon: HeartPulse,
    description: 'Mandi lengkap dengan sampo khusus anti-kutu/jamur, blow dry, dan vitamin bulu.',
  },
  {
    id: 'antar-jemput',
    name: 'Layanan Antar-Jemput Anabul',
    category: 'Transportasi',
    price: 35000,
    icon: Truck,
    description: 'Penjemputan dan pengantaran kucing langsung dari rumah (Area Dalam Kota).',
  },
  {
    id: 'health-check',
    name: 'Pemeriksaan Kesehatan Rutin',
    category: 'Kesehatan',
    price: 25000,
    icon: ShieldCheck,
    description: 'Cek suhu harian, kondisi mata, hidung, dan pemberian vitamin harian.',
  }
];

export default function Services({ selectedServices = [], onToggleService }) {
  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Judul */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-xs sm:text-sm">
            Layanan Ekstra
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            Layanan & Add-ons <span className="text-orange-500">Kucing</span>
          </h2>
          <p className="text-slate-600">
            Lengkapi kenyamanan anabul selama menginap dengan layanan ekstra sesuai kebutuhan.
          </p>
        </div>

        {/* Grid Card Layanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalServices.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedServices.some(s => s.id === service.id);

            return (
              <div
                key={service.id}
                onClick={() => onToggleService(service)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/40 shadow-lg shadow-orange-500/10 ring-2 ring-orange-500/20'
                    : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2">{service.name}</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">{service.description}</p>
                </div>

                <div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-slate-400">Biaya Tambahan</span>
                      <span className="text-base font-extrabold text-slate-800">
                        Rp {service.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`p-2 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-orange-600'
                      }`}
                    >
                      {isSelected ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}