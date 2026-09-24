# Setup Supabase untuk JangkangLor

## 1. Cek konfigurasi project
File [.env](.env) sudah ada dan berisi `VITE_SUPABASE_URL` serta `VITE_SUPABASE_ANON_KEY`.

Pastikan keduanya mengarah ke project Supabase yang sama dengan bucket yang akan dibuat.

## 2. Buat bucket di Supabase
Masuk ke dashboard Supabase > Storage > Create bucket.

Buat 2 bucket berikut:
- `foto-lokasi`
- `foto-web`

Setiap bucket harus dibuat sebagai Public supaya URL publik bisa dipakai untuk menampilkan gambar.

## 3. Cek project yang sama
Buka project Supabase yang aktif, lalu periksa:
- Project URL
- Project anon key

Bandingkan dengan nilai di file [.env](.env). Jika berbeda, update `.env` dan redeploy project di Vercel.

## 4. Redeploy Vercel
Setelah env dan bucket sudah benar:
1. Buka Vercel project
2. Masuk ke Settings > Environment Variables
3. Pastikan nilai sama dengan project Supabase aktif
4. Deploy ulang / Redeploy

## 5. Uji coba simpan data
Buka admin panel dan coba tambahkan:
- lokasi baru
- profil hero
- galeri foto

Jika berhasil, berarti setup sudah benar.

## 6. Jika masih error
Cek 3 hal ini:
- bucket `foto-lokasi` dan `foto-web` sudah dibuat
- bucket dibuat sebagai public
- env di Vercel dan lokal sama dengan project Supabase yang dipakai

## File penting
- [src/lib/supabase.ts](src/lib/supabase.ts)
- [src/pages/admin/Dashboard.tsx](src/pages/admin/Dashboard.tsx)
- [.env](.env)
- [.env.example](.env.example)
