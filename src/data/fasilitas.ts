export interface Fasilitas {
  id: string;
  kategori: string;
  ikon: string;
  namaFasilitas: string[];
}

export const fasilitasData: Fasilitas[] = [
  {
    id: "f-balai",
    kategori: "Balai Padukuhan",
    ikon: "building",
    namaFasilitas: ["Sekretariat Padukuhan"]
  },
  {
    id: "f-ibadah",
    kategori: "Tempat Ibadah",
    ikon: "landmark",
    namaFasilitas: ["Masjid Baiturrahman", "Masjid Nur Sholihin", "Mushala Al Ikhlas", "Gereja"]
  },
  {
    id: "f-kesehatan",
    kategori: "Kesehatan",
    ikon: "heart",
    namaFasilitas: ["Posyandu"]
  },
  {
    id: "f-olahraga",
    kategori: "Sarana Olahraga",
    ikon: "activity",
    namaFasilitas: ["Lapangan Voli", "Lapangan Badminton", "Area Ping-pong"]
  },
  {
    id: "f-lainnya",
    kategori: "Fasilitas Lainnya",
    ikon: "map-pin",
    namaFasilitas: ["Pos Kampling", "Makam (Ngobaran)"]
  }
];
