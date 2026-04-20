# Crasco Shop - UTS Pemrograman Web 2

## Deskripsi Project
Crasco Shop adalah sebuah aplikasi *online shop* berbasis web sederhana (Single Page Application) yang dibangun untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web 2. Proyek ini disimulasikan sebagai e-commerce untuk toko pakaian yang menerapkan konsep Fullstack JavaScript di sisi *client* (Frontend + Logic). 

Aplikasi ini tidak menggunakan database sungguhan, melainkan memanfaatkan **JSON** sebagai sumber data katalog produk (Dummy Data) dan **LocalStorage** pada browser sebagai sistem manajemen *state* (State Management) untuk menyimpan sesi pengguna (Login/Register), data keranjang belanja (Cart), dan riwayat transaksi (Order History).

**Teknologi yang Digunakan:**
- HTML5
- JavaScript (ES6+) Vanilla
- Tailwind CSS (via CDN) untuk UI/UX & Responsive Design
- LocalStorage API
- Fetch API (untuk membaca data JSON)

---

## Fitur

1. **Authentication (Simulasi)**
   - Sistem Login dan Register.
   - Validasi email unik (tidak bisa mendaftar dengan email yang sama).
   - Validasi password minimal 6 karakter.
   - Sesi login disimpan untuk menjaga akses pengguna.

2. **Product Management & Catalog**
   - Menampilkan daftar produk pakaian secara dinamis dari file `products.json`.
   - Menampilkan detail informasi produk (Gambar, Nama, Harga, Deskripsi).

3. **Search & Filter**
   - Fitur pencarian produk secara *real-time* berdasarkan nama produk.

4. **Cart (Keranjang Belanja)**
   - Menambahkan produk ke dalam keranjang.
   - Menghapus produk dari keranjang (jika kuantitas mencapai angka 0).
   - Menambah atau mengurangi jumlah (*qty*) item di dalam keranjang.
   - Perhitungan total harga belanja secara otomatis.

5. **Checkout & Transaksi**
   - Form detail pengiriman (Nama, Alamat Lengkap, Nomor HP).
   - Menghasilkan ID Transaksi (Generate ID) secara otomatis dan unik.
   - Menyimpan data transaksi ke dalam sistem (LocalStorage).

6. **Order History**
   - Menampilkan riwayat pembelian pengguna.
   - Menampilkan detail ringkas pesanan (ID, Tanggal, Total Harga, Jumlah Barang).

7. **Fitur Bonus (UI/UX)**
   - **Responsive Design**: Tampilan disesuaikan untuk layar HP, Tablet, dan Desktop.
   - **Dark Mode**: Tombol peralihan mode gelap/terang.
   - **Notifikasi Toast**: Pop-up interaktif saat produk berhasil ditambahkan ke keranjang atau saat transaksi berhasil.

---

## Cara Menjalankan (Local Development)

Karena aplikasi ini menggunakan `Fetch API` untuk mengambil data dari file eksternal (`products.json`), aplikasi tidak bisa dijalankan hanya dengan mengklik ganda file `index.html` langsung dari *File Explorer* (akan terkena *CORS error*).

Ikuti langkah-langkah berikut untuk menjalankannya secara lokal:

1. Pastikan kamu sudah menginstal *code editor* seperti **Visual Studio Code (VS Code)**.
2. Unduh atau lakukan *clone* pada repository ini ke komputer kamu.
3. Buka folder proyek ini menggunakan VS Code.
4. Pastikan kamu sudah menginstal ekstensi **Live Server** di VS Code.
5. Buka file `index.html`, lalu klik kanan dan pilih **"Open with Live Server"**.
6. Aplikasi akan otomatis terbuka di browser bawaan kamu pada alamat `http://127.0.0.1:5500`.

---

## Link Demo (GitHub Pages)

Aplikasi ini telah di-deploy dan dapat diakses secara online melalui tautan berikut:

🔗 **[ISI DENGAN LINK GITHUB PAGES KAMU]**

*(Contoh: https://username-github.github.io/Hamidah_UTS_Web2)*