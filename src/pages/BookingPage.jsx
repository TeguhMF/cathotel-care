import React, { useState } from 'react';
import RoomCatalog from '../components/RoomCatalog';
import Services from '../components/Services';
import BookingForm from '../components/BookingForm';

export default function BookingPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDuration, setBookingDuration] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectRoom = (room, duration) => {
    // Memastikan objek room yang disimpan memiliki field id
    const roomWithId = {
      ...room,
      id: room.id || room.room_id || 1,
    };
    setSelectedRoom(roomWithId);
    setBookingDuration(duration);
    document.getElementById('layanan')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleService = (service) => {
    setSelectedServices(prev => {
      const exists = prev.some(s => s.id === service.id);
      return exists ? prev.filter(s => s.id !== service.id) : [...prev, service];
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Spacer Hitam agar Navbar Putih bisa terbaca di halaman ini */}
      <div className="h-24 w-full bg-slate-900"></div> 
      
      <RoomCatalog onSelectRoom={handleSelectRoom} />
      <Services selectedServices={selectedServices} onToggleService={handleToggleService} />
      <BookingForm selectedRoom={selectedRoom} bookingDuration={bookingDuration} selectedServices={selectedServices} />
    </div>
  );
}