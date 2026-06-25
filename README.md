# Konten Organizer PWA

Aplikasi PWA untuk membantu pengelola konten organisasi/lembaga mengatur agenda, kalender konten, produksi konten, template caption, checklist, dan arsip posting.

## Status

Versi ini adalah **MVP Tahap 1A - GitHub Ready**.

- Bisa dijalankan lokal dengan Vite.
- Bisa dideploy ke GitHub Pages memakai GitHub Actions.
- Data masih lokal di browser menggunakan localStorage.
- Belum ada login dan belum sinkron antar perangkat.
- Tahap berikutnya: Firebase Authentication + Firestore.

## Jalankan di laptop

```bash
npm install
npm run dev
```

## Build manual

```bash
npm run build
```

## Deploy ke GitHub Pages

Ikuti file:

```text
PANDUAN_GITHUB.md
```

## Fitur MVP

- Dashboard
- Agenda kegiatan
- Paket konten otomatis dari agenda
- Kalender konten bulanan
- Produksi konten berdasarkan status
- Detail konten
- Caption/naskah
- Checklist produksi
- Template caption organisasi
- Arsip konten tayang
- Pengaturan profil organisasi
- Export/import backup JSON
