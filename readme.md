# Crasco Shop 🛍️✨

## Deskripsi Project
**Crasco Shop** adalah platform *e-commerce* modern yang dibangun untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web 2. Proyek ini dibangun dengan antarmuka yang elegan, bersih, dan sepenuhnya responsif (*mobile-friendly*) menggunakan Tailwind CSS. Seluruh fungsionalitas utama berjalan menggunakan Vanilla JavaScript (ES6+) dengan bantuan `localStorage` sebagai media penyimpanan *state* (database lokal) dan *Fetch API* untuk mengambil data katalog produk dari JSON, sehingga aplikasi ini dapat berjalan murni di sisi klien (*client-side*).

## Fitur
Aplikasi ini dilengkapi dengan fungsionalitas *e-commerce* yang komprehensif sesuai dengan standar penilaian UTS, antara lain:
* 🛒 **Manajemen Keranjang (Cart):** Tambah, kurangi, dan hapus produk dari keranjang belanja secara dinamis dengan kalkulasi total harga otomatis.
* 🌓 **Tema Gelap/Terang (Dark Mode):** Dukungan penuh untuk mode gelap (*dark mode*) interaktif yang mengubah nuansa antarmuka secara instan.
* 🔍 **Pencarian Produk:** Fitur pencarian barang secara *real-time* berdasarkan nama produk dengan tampilan *Grid* yang responsif.
* 📦 **Checkout & Riwayat Pesanan (Orders):** Simulasi pembayaran dengan form detail pengiriman, *generate* ID Transaksi unik otomatis, serta halaman khusus untuk melihat riwayat pembelian (*Order History*).
* 🔐 **Sistem Otentikasi (Auth):** Fitur *Login*, *Register*, dan *Log Out* dengan validasi keamanan (Email unik dan *password* minimal 6 karakter) yang mengontrol akses ke halaman utama toko.

## Cara Menjalankan (Local Development)
Karena proyek ini mengambil data menggunakan *Fetch API* ke file `products.json`, Anda disarankan untuk menjalankannya melalui *local web server* untuk menghindari *CORS error*:
1. Pastikan Anda telah mengunduh (*clone*) atau mengekstrak seluruh file proyek ini ke dalam komputer Anda.
2. Buka folder proyek menggunakan teks editor seperti **Visual Studio Code**.
3. Sangat disarankan untuk menjalankan proyek ini menggunakan ekstensi **Live Server**. Klik kanan pada file `index.html` lalu pilih **"Open with Live Server"**.
4. Secara otomatis, browser akan terbuka (biasanya di `http://127.0.0.1:5500`) dan aplikasi Crasco Shop siap digunakan!

## Link Demo (GitHub Pages)
Aplikasi ini telah di-deploy dan dapat diakses secara online melalui tautan berikut:

👉 **[Demo Crasco Shop di GitHub Pages](https://midahhhh.github.io/hamidahUTSweb2/)**
