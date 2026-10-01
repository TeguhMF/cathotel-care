# CatHotel Care FronEnd

Repositori ini berisi kode antarmuka pengguna (frontend) untuk aplikasi web CatHotel Care. Dibangun menggunakan React, Tailwind CSS, dan Vite, aplikasi ini menyediakan antarmuka pemesanan untuk pelanggan serta panel kontrol manajemen untuk administrator.

## Teknologi dan Pustaka

- **Framework Utama:** React (Vite)
- **Desain Antarmuka:** Tailwind CSS
- **Ikonografi:** Lucide Icons
- **HTTP Client:** Axios
- **Routing:** React Router DOM (v6+)
- **Utilitas Ekspor Data:** SheetJS (`xlsx`), jsPDF, jsPDF-AutoTable
- **Integrasi Pembayaran:** Midtrans Snap JS Integration

## Modul dan Fitur Aplikasi

1. **Modul Katalog dan Pemesanan:**
   - Pengambilan data kamar secara aktual dari API backend.
   - Formulir pemesanan interaktif dengan kalkulasi otomatis total biaya dan DP 30%.
   - Integrasi pop-up pembayaran Midtrans Snap.

2. **Portal Pelanggan (`/profile`):**
   - Halaman terintegrasi untuk informasi akun dan riwayat pemesanan.
   - Indikator status riil untuk pembayaran (`PAID`, `UNPAID`) dan progres reservasi (`PENDING`, `CONFIRMED`, `CHECKED_IN`, `CHECKED_OUT`, `CANCELLED`).
   - Fitur pembayaran ulang untuk transaksi DP yang belum diselesaikan.

3. **Dashboard Manajemen Admin (`/admin/bookings`):**
   - Ringkasan statistik operasional: Total Reservasi, Kucing Menginap, Total Pendapatan DP, dan Total Pelanggan.
   - Tabel data reservasi dengan filter berdasarkan status dan pencarian kata kunci (Kode Booking, Nama Pelanggan, Nama Anabul).
   - Kontrol perubahan status reservasi secara aktual (`Confirm`, `Check-In`, `Check-Out`, `Cancel`).
   - Ekspor data laporan ke format `.xlsx` (Excel) untuk reservasi dan `.pdf` untuk data pelanggan.

## Panduan Instalasi Lokal

```bash
# 1. Kloning repositori
git clone [https://github.com/TeguhMF/cathotel-care-frontend.git](https://github.com/username-anda/cathotel-care-frontend.git)
cd cathotel-care-frontend

# 2. Install dependensi Node.js
npm install

# 3. Jalankan Server Pengembang (berjalan pada http://localhost:5173)
npm run dev

```
```HTML
<script 
  src="[https://app.sandbox.midtrans.com/snap/snap.js](https://app.sandbox.midtrans.com/snap/snap.js)" 
  data-client-key="KUNCI_CLIENT_MIDTRANS_ANDA">
</script>
```
```bash
npm run build




