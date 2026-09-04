-- 1. Buat tabel struktur_pemerintahan
CREATE TABLE IF NOT EXISTS struktur_pemerintahan (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  jabatan TEXT NOT NULL,
  nama TEXT NOT NULL,
  urutan INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Hapus data lama jika ada, lalu masukkan data awal
TRUNCATE TABLE struktur_pemerintahan;
INSERT INTO struktur_pemerintahan (jabatan, nama, urutan) VALUES
('Kepala Padukuhan', 'Dukuh Jangkang Lor [Masa Periode]', 1),
('Rw 15', 'Eko Suratman', 2),
('Rw 16', 'Kamsiyo', 3),
('Rw 17', 'Eko Widodo', 4),
('Rt 29', 'Budiono', 5),
('Rt 30', 'Yuni Sulistyono', 6),
('Rt 31', 'Didik Wahyu Saputra', 7),
('Rt 32', 'Purwanto', 8),
('Rt 33', 'Sumpeno', 9),
('Rt 34', 'Hartadi', 10),
('KKP (Kelompok Kerja Padukuhan)', 'Suhardi', 11),
('Jaga Warga', 'Hariyantana', 12),
('Karang Taruna AKRAP', 'Usmita', 13);


-- 2. Buat tabel potensi_desa
CREATE TABLE IF NOT EXISTS potensi_desa (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kategori TEXT NOT NULL,
  judul TEXT NOT NULL,
  deskripsi TEXT,
  penutup TEXT,
  sub_kategori JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Hapus data lama jika ada, lalu masukkan data awal
TRUNCATE TABLE potensi_desa;
INSERT INTO potensi_desa (kategori, judul, deskripsi, sub_kategori) VALUES
('pertanian', 'Pertanian', 'Sektor pertanian merupakan salah satu potensi yang berperan penting dalam kehidupan dan perekonomian masyarakat Jangkang Lor. Kondisi lingkungan yang mendukung menjadikan kegiatan pertanian dan perkebunan sebagai salah satu aktivitas yang terus dikembangkan oleh masyarakat. Komoditas yang dihasilkan meliputi jagung dan kacang-kacangan sebagai tanaman palawija, serta tanaman jati dan kelapa yang turut menjadi bagian dari potensi sumber daya alam di wilayah Jangkang Lor.', '[]'::jsonb),
('kesenian', 'Kesenian & Budaya', 'Kesenian dan budaya menjadi bagian penting dari identitas masyarakat Jangkang Lor yang mencerminkan nilai kebersamaan, tradisi, dan kehidupan sosial masyarakat. Berbagai kesenian dan tradisi masih dilestarikan serta menjadi bagian dari kegiatan masyarakat. Kesenian dan budaya yang berkembang di Jangkang Lor meliputi Jathilan dan Hadroh, serta tradisi Nyadran, Tirakatan, dan Kenduri yang terus dijaga keberlangsungannya.', '[]'::jsonb);

INSERT INTO potensi_desa (kategori, judul, deskripsi, penutup, sub_kategori) VALUES
('umkm', 'UMKM & Ekonomi Masyarakat', 'Masyarakat Jangkang Lor memiliki berbagai aktivitas ekonomi dan usaha yang berkembang di lingkungan padukuhan.', 'Usaha masyarakat menjadi salah satu potensi yang dapat terus dikembangkan melalui inovasi, pemasaran, dan pemanfaatan teknologi.', 
'[
  {"nama": "Kuliner dan Makanan Olahan", "items": ["Peyek", "Tempe", "Jajanan pasar", "Makanan basah", "Legen", "Gorengan, dll."]},
  {"nama": "Perdagangan dan Kebutuhan Sehari-hari", "items": ["Warung sembako", "Angkringan", "Perbumbuan", "Agen gas, dll."]},
  {"nama": "Pertanian dan Peternakan", "items": ["Pertanian organik atau sayuran hidroponik", "Peternakan entog, bebek, ayam, kambing, sapi", "Pemancingan lele, dll."]},
  {"nama": "Kerajinan dan Industri Rumah Tangga", "items": ["Mebel atau perabotan kayu", "Usaha jahit, dll."]},
  {"nama": "Layanan Jasa", "items": ["Bengkel cat", "Beautycare", "Bucket bunga (d1.bucket)", "Jasa laundry", "Jasa pembuatan stempel dan cap", "Dekor, dll."]}
]'::jsonb);


-- 3. Mengizinkan publik untuk MEMBACA data
ALTER TABLE struktur_pemerintahan ENABLE ROW LEVEL SECURITY;
ALTER TABLE potensi_desa ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'struktur_pemerintahan' AND policyname = 'Izinkan semua orang melihat struktur') THEN
        CREATE POLICY "Izinkan semua orang melihat struktur" ON struktur_pemerintahan FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'potensi_desa' AND policyname = 'Izinkan semua orang melihat potensi') THEN
        CREATE POLICY "Izinkan semua orang melihat potensi" ON potensi_desa FOR SELECT USING (true);
    END IF;
END
$$;

-- 4. Mengizinkan admin untuk MEMODIFIKASI data
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'struktur_pemerintahan' AND policyname = 'Izinkan admin memodifikasi struktur') THEN
        CREATE POLICY "Izinkan admin memodifikasi struktur" ON struktur_pemerintahan FOR ALL USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'potensi_desa' AND policyname = 'Izinkan admin memodifikasi potensi') THEN
        CREATE POLICY "Izinkan admin memodifikasi potensi" ON potensi_desa FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END
$$;
