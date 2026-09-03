export interface CeritaSejarah {
  id: string;
  judul: string;
  isi: string;
  isCeritaRakyat: boolean;
}

export const sejarahData: CeritaSejarah[] = [
  {
    id: "asal-nama-jangkang",
    judul: "Asal Nama Jangkang",
    isi: "Nama \"Jangkang\" diyakini berasal dari keberadaan sebuah Pohon Jangkang besar yang pada zaman dahulu tumbuh subur di perbatasan wilayah utara dan selatan. Keberadaan pohon ini menjadi penanda batas alami, sehingga memunculkan pembagian wilayah menjadi Jangkang Lor (bagian utara) dan Jangkang Kidul (bagian selatan).",
    isCeritaRakyat: true
  },
  {
    id: "asal-nama-ngobaran",
    judul: "Kisah Ngobaran",
    isi: "Wilayah di sekitar Makam Ngobaran memiliki kisah yang lekat dengan masa penjajahan. Diceritakan tentang kobaran api dari kesaktian Kyai Ngobar dan Nyai Ngobarsari yang membuat pasukan penjajah Belanda tidak berani memasuki kawasan tersebut.",
    isCeritaRakyat: true
  }
];
