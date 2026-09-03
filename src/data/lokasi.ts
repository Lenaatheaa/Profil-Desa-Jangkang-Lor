export interface Lokasi {
  id: string;
  nama: string;
  kategori: 'ibadah' | 'kesehatan' | 'olahraga' | 'pemerintahan' | 'sejarah-budaya' | 'lainnya';
  lat: number;
  lng: number;
  deskripsi?: string;
}

export const lokasiData: Lokasi[] = [
  { id: "loc-1", nama: "Balai Padukuhan", kategori: "pemerintahan", lat: -7.8305, lng: 110.2505, deskripsi: "Pusat kegiatan pemerintahan dan warga" },
  { id: "loc-2", nama: "Masjid Baiturrahman", kategori: "ibadah", lat: -7.8322, lng: 110.2515 },
  { id: "loc-3", nama: "Masjid Nur Sholihin", kategori: "ibadah", lat: -7.8285, lng: 110.2480 },
  { id: "loc-4", nama: "Mushala Al Ikhlas", kategori: "ibadah", lat: -7.8270, lng: 110.2522 },
  { id: "loc-5", nama: "Gereja", kategori: "ibadah", lat: -7.8295, lng: 110.2465 },
  { id: "loc-6", nama: "Posyandu", kategori: "kesehatan", lat: -7.8335, lng: 110.2540 },
  { id: "loc-7", nama: "Lapangan Voli", kategori: "olahraga", lat: -7.8260, lng: 110.2485 },
  { id: "loc-8", nama: "Lapangan Badminton", kategori: "olahraga", lat: -7.8262, lng: 110.2486 },
  { id: "loc-9", nama: "Area Ping-pong", kategori: "olahraga", lat: -7.8265, lng: 110.2488 },
  { id: "loc-10", nama: "Makam Ngobaran", kategori: "sejarah-budaya", lat: -7.8355, lng: 110.2445 },
  { id: "loc-11", nama: "Gunung Ampo", kategori: "sejarah-budaya", lat: -7.8240, lng: 110.2560 },
];
