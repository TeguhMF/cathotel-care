import React from 'react';
import { Star, Quote, User } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Teguh Maulana Firmansyah',
      catName: 'Milo (Persia)',
      rating: 5,
      comment: 'CatHotel Care beneran bikin tenang pas ditinggal mudik! Setiap hari dikirimin foto dan video Milo lagi main. Tempatnya bersih banget!',
    },
    {
      name: 'Selva Nur Anggraeni',
      catName: 'Oyen & Ciko',
      rating: 5,
      comment: 'Kamar VIP-nya luas dan ber-AC. Stafnya telaten banget sama kucing galak kayak Oyen. Pas dijemput malah makin gembul!',
    },
    {
      name: 'Syafiq Maulana',
      catName: 'Luna (British Shorthair)',
      rating: 5,
      comment: 'Add-on grooming-nya juara! Luna pulang-pulang bulunya wangi dan halus banget. Worth it banget untuk perawatan bintang lima.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-semibold text-xs uppercase tracking-wider">
            Testimoni Pemilik
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-4">
            Apa Kata Mereka Tentang CatHotel Care?
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Kepercayaan dan kenyamanan anabul kesayangan adalah prioritas utama kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-all"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-orange-100" />
              
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                {/* Ikon Profil diganti menggunakan komponen User */}
                <div className="w-11 h-11 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{rev.name}</h4>
                  <p className="text-xs text-orange-500 font-medium">Pemilik {rev.catName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}