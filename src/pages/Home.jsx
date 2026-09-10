import React from 'react';
import Hero from '../components/Hero';
import { Snowflake, Video, Gamepad2, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Hero />

      {/* SECTION FASILITAS */}
      <section id="fasilitas" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Fasilitas Kami</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Kenyamanan Ekstra Untuk <span className="text-orange-500">Anabul</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Kamar Full AC", desc: "Suhu ruangan selalu dijaga pada 24°C untuk kenyamanan maksimal.", icon: Snowflake },
            { title: "Area Bermain Luas", desc: "Sesi playtime harian dengan cat tree dan mainan interaktif.", icon: Gamepad2 },
            { title: "CCTV Pengawasan", desc: "Terpantau ketat dengan kamera keamanan aktif 24 jam penuh.", icon: Video },
            { title: "Klinik & Sterilisasi", desc: "Disinfeksi ruangan rutin dan akses dokter hewan *on-call*.", icon: ShieldCheck },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all text-center group">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION TENTANG KAMI */}
      <section id="tentang" className="py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80" 
              alt="Tentang CatHotel Care" 
              className="rounded-3xl shadow-xl border-4 border-white object-cover h-96 w-full"
            />
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Tentang Kami</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-6">Merawat Sepenuh Hati, <br/>Layaknya Keluarga Sendiri.</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Didirikan oleh pecinta kucing, **CatHotel Care** berdedikasi memberikan pengalaman menginap yang bebas stres dan menyenangkan bagi anabul Anda. Kami memahami kekhawatiran Anda saat harus meninggalkan mereka.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Dengan staf profesional, fasilitas modern, dan pembaruan informasi rutin, kami pastikan setiap detik anabul Anda di sini dipenuhi dengan kasih sayang dan rasa aman.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}