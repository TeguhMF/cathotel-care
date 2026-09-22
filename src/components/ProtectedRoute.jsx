import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    alert('Akses ditolak! Halaman ini khusus untuk Admin.');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;