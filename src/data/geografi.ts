export interface Geografi {
  luasHektare: number | null;
  batas: { arah: 'utara' | 'selatan' | 'timur' | 'barat'; wilayah: string }[];
  koordinatPusat: { lat: number; lng: number } | null;
}

export const geografiData: Geografi = {
  luasHektare: null,
  batas: [
    { arah: 'barat', wilayah: 'Bantarjo' },
    { arah: 'selatan', wilayah: 'Jangkang Kidul, Sentolo Lor' },
    { arah: 'utara', wilayah: 'Banaran Kidul' },
    { arah: 'timur', wilayah: 'Sentolo Lor, Sungai' }
  ],
  koordinatPusat: { lat: -7.83, lng: 110.25 }, // Placeholder Sentolo
};
