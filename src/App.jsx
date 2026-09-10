import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import LoginModal from './components/LoginModal';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <Router>
      <div className="font-sans text-slate-800 antialiased selection:bg-orange-500 selection:text-white relative">
        
        {/* Navbar utama yang tampil di Beranda dan Halaman Booking */}
        <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />

        {/* Pengaturan Routing Halaman */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        {/* Footer situs */}
        <footer className="bg-slate-950 border-t border-slate-800/80 py-8 text-center text-slate-500 text-sm">
          <p>© 2026 CatHotel Care. All rights reserved.</p>
        </footer>

        {/* Modal Login & Register dengan Animasi Sliding Panel */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
        
      </div>
    </Router>
  );
}