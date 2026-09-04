export interface Geografi {
  luasHektare: number | null;
  batasWilayah: { utara: string; selatan: string; timur: string; barat: string; };
  koordinatPusat: { lat: number; lng: number } | null;
}

export const geografiData: Geografi = {
  luasHektare: 110,
  batasWilayah: {
    utara: 'Banaran Kidul',
    selatan: 'Jangkang Kidul, Sentolo Lor',
    timur: 'Sentolo Lor, Sungai',
    barat: 'Bantarjo'
  },
  koordinatPusat: { lat: -7.83, lng: 110.25 },
};
