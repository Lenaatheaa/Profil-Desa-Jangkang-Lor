export interface FotoGaleri {
  id: string;
  url: string;
  caption: string;
  kategori: 'kegiatan' | 'wilayah' | 'umkm' | 'kkn';
}

export const galeriData: FotoGaleri[] = [
  {
    id: "g1",
    url: "/hero.png",
    caption: "Suasana Pagi di Jangkang Lor",
    kategori: "wilayah"
  },
  {
    id: "g2",
    url: "/galeri_kegiatan.png",
    caption: "Kegiatan Kerja Bakti Warga",
    kategori: "kegiatan"
  },
  {
    id: "g3",
    url: "/galeri_umkm.png",
    caption: "Produk UMKM Unggulan",
    kategori: "umkm"
  },
  {
    id: "g4",
    url: "/galeri_kegiatan.png",
    caption: "Pelatihan oleh KKN UAD 159",
    kategori: "kkn"
  },
  {
    id: "g5",
    url: "/galeri_kegiatan.png",
    caption: "Kegiatan Posyandu Rutin",
    kategori: "kegiatan"
  },
  {
    id: "g6",
    url: "/hero.png",
    caption: "Pemandangan Gunung Ampo",
    kategori: "wilayah"
  }
];
