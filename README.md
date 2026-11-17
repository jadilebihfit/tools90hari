# LEBIHFIT

Tracker diet & gym berbasis web (PWA). Bisa dipakai di browser atau di-install jadi aplikasi.
Tidak ada server dan tidak ada akun: semua data user disimpan di localStorage device masing-masing.

## Fitur
- Landing page dengan preview dashboard, lalu pilihan akses via Web atau Install sebagai Aplikasi
- Onboarding: nama, data tubuh, kalkulator TDEE (Mifflin-St Jeor), goal bulking/cutting/maintain + kecepatan. Bisa diedit di Profil.
- Program latihan: PPL, Upper/Lower, Full Body, Bro Split, atau custom per hari. Bisa diganti di Profil, dan tiap gerakan bisa ditambah, dihapus, diganti, atau digeser.
- Log latihan per set (kg, reps, centang), auto isi dari sesi sebelumnya
- Tutorial 5.632 gerakan (deskripsi, otot target, langkah-langkah) + link video YouTube
- Database makanan: warteg, 20+ resto mall, dan makanan umum, lengkap dengan kalori, makro, dan 8 mikronutrisi
- Checklist diet harian, tracker air putih, progress harian/mingguan/bulanan, grafik berat badan
- Backup/restore data (.json) untuk pindah device

## Deploy ke GitHub Pages
1. Buat repo baru di GitHub, lalu upload semua isi folder ini (index.html, app.js, sw.js, manifest.webmanifest, folder data/ dan icons/).
2. Buka Settings > Pages, pilih Source: "Deploy from a branch", branch `main`, folder `/ (root)`, lalu Save.
3. Tunggu 1-2 menit. App jalan di `https://<username>.github.io/<nama-repo>/` dan bisa di-install ke HP.

`preview.html` cuma untuk preview di claude.ai, boleh dihapus dari repo.

Tes lokal:
```
npx serve .
```

## Animasi gerakan (opsional)
App otomatis menampilkan animasi kalau ada file di:
- `media/still/<id>.webp` (gambar)
- `media/clip/<id>.mp4` (animasi)

`<id>` sama dengan id di katalog openGym. Kalau folder `media/` tidak ada, app tetap jalan dengan teks + link YouTube.
Media openGym dilisensikan oleh Gym visual (gymvisual.com) khusus untuk aplikasi openGym, jadi pastikan lisensinya mencakup app ini sebelum menaruh file di sini.

## Sumber data & lisensi
- Teks gerakan: katalog latihan openGym (https://github.com/DuarteSantos8/openGym), AGPL-3.0. App ini ikut wajib open source di bawah AGPL-3.0 kalau dipublikasikan.
- Angka gizi adalah estimasi dari TKPI, USDA, dan info gizi publik brand. Porsi tiap outlet bisa beda.
