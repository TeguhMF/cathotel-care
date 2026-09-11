import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import LoginModal from './components/LoginModal';
import AdminDashboard from './pages/AdminDashboard';

// Komponen pembungkus layout agar Navbar & Footer otomatis tersembunyi di Halaman Admin
function AppLayout() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

  // Cek apakah user sedang berada di halaman admin
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="font-sans text-slate-800 antialiased selection:bg-orange-500 selection:text-white relative min-h-screen flex flex-col justify-between">
      
      {/* Sembunyikan Navbar jika di Admin */}
      {!isAdminPath && <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>

      {/* Sembunyikan Footer jika di Admin */}
      {!isAdminPath && <Footer />}

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}