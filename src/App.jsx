import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

// Import Pages
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';

function AppLayout() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  
  // Mengecek apakah URL saat ini adalah halaman admin
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="font-sans text-slate-800 antialiased selection:bg-orange-500 selection:text-white relative min-h-screen flex flex-col justify-between">
      
      {/* Tampilkan Navbar jika bukan di halaman admin */}
      {!isAdminPath && <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />}

      {/* Konten Utama (Routes) */}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingPage />} />

          {/* Protected Routes Khusus Admin */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </div>

      {/* Tampilkan Footer jika bukan di halaman admin */}
      {!isAdminPath && <Footer />}

      {/* Modal Login Global */}
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