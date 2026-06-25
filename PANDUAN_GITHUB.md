# Panduan Upload Konten Organizer PWA ke GitHub Pages

Panduan ini dibuat untuk menjalankan aplikasi **Konten Organizer PWA** lewat GitHub.

## Target tahap ini

Setelah tahap ini selesai, aplikasi punya link online seperti:

```text
https://USERNAME.github.io/konten-organizer/
```

Data aplikasi pada tahap ini masih tersimpan di browser masing-masing perangkat. Sinkronisasi tim akan dibuat pada tahap Firebase.

---

## A. Buat repository baru di GitHub

1. Buka GitHub.
2. Klik tombol **New repository**.
3. Isi nama repository:

```text
konten-organizer
```

4. Pilih **Public**.
5. Jangan centang **Add a README file**.
6. Klik **Create repository**.

---

## B. Upload file project

1. Ekstrak file ZIP project ini.
2. Masuk ke folder hasil ekstrak.
3. Buka repository GitHub yang baru dibuat.
4. Klik **uploading an existing file**.
5. Upload semua isi folder project, bukan folder luarnya.

Yang diupload harus terlihat seperti ini di GitHub:

```text
.github/
public/
src/
index.html
package.json
package-lock.json
vite.config.js
README.md
PANDUAN_GITHUB.md
```

6. Klik **Commit changes**.

---

## C. Aktifkan GitHub Pages

1. Masuk repository GitHub.
2. Klik **Settings**.
3. Klik **Pages**.
4. Pada bagian **Source**, pilih:

```text
GitHub Actions
```

5. Simpan jika ada tombol save.

---

## D. Tunggu proses deploy

1. Masuk tab **Actions**.
2. Tunggu workflow bernama:

```text
Deploy Konten Organizer PWA to GitHub Pages
```

3. Jika sudah hijau/checklist, buka tab **Settings > Pages**.
4. Di sana akan muncul link aplikasi.

Biasanya format linknya:

```text
https://USERNAME.github.io/konten-organizer/
```

---

## E. Cara update aplikasi nanti

Kalau nanti ada file versi baru:

1. Buka repository GitHub.
2. Upload file baru atau edit file yang perlu diubah.
3. Klik **Commit changes**.
4. GitHub Actions akan otomatis build ulang.
5. Link aplikasi tetap sama.

---

## F. Catatan penting

Versi ini belum memakai Firebase, jadi:

- belum ada login;
- belum sinkron antar HP/laptop;
- data tersimpan di browser masing-masing;
- bisa backup lewat menu Export JSON;
- bisa pindah data lewat Import JSON.

Setelah alur aplikasi cocok, lanjutkan ke tahap Firebase:

1. Login email/password.
2. Database Firestore.
3. Role Admin, Tim, Viewer.
4. Data sinkron antar Android, iPhone, laptop.
