export interface KategoriPotensi {
  id: string;
  judul: string;
  ikon: string;
  deskripsi: string;
  subKategori?: { nama: string; items: string[] }[];
}

export const potensiData: KategoriPotensi[] = [
  {
    id: "pertanian",
    judul: "Pertanian",
    ikon: "wheat", // or lucide icon name
    deskripsi: "Komoditas utama meliputi jagung dan kacang-kacangan (palawija), serta pohon jati dan kelapa."
  },
  {
    id: "kesenian",
    judul: "Kesenian & Budaya",
    ikon: "music",
    deskripsi: "Kesenian yang aktif antara lain Jathilan dan Hadroh. Berbagai tradisi luhur juga dilestarikan seperti Nyadran, Tirakatan, dan Kenduri."
  },
  {
    id: "umkm",
    judul: "UMKM & Ekonomi Masyarakat",
    ikon: "store",
    deskripsi: "Masyarakat Jangkang Lor aktif berwirausaha dalam berbagai bidang untuk menggerakkan roda ekonomi lokal.",
    subKategori: [
      {
        nama: "Kuliner & Makanan Olahan",
        items: ["Peyek", "Tempe", "Jajanan pasar", "Makanan basah", "Legen", "Gorengan"]
      },
      {
        nama: "Perdagangan & Kebutuhan Sehari-hari",
        items: ["Warung sembako", "Angkringan", "Perbumbuan", "Agen gas"]
      },
      {
        nama: "Pertanian & Peternakan",
        items: ["Pertanian organik/hidroponik", "Peternakan entog/bebek/ayam/kambing/sapi", "Pemancingan lele"]
      },
      {
        nama: "Kerajinan & Industri Rumah Tangga",
        items: ["Mebel/perabotan kayu", "Usaha jahit"]
      },
      {
        nama: "Layanan Jasa",
        items: ["Bengkel cat", "Beautycare", "Bucket bunga (d1.bucket)", "Jasa laundry", "Jasa pembuatan stempel & cap", "Dekor"]
      }
    ]
  }
];
