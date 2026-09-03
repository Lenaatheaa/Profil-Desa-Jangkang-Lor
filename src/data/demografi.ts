export interface Demografi {
  jumlahPenduduk: number;
  kepalaKeluarga: number;
  lakiLaki: number;
  perempuan: number;
  jumlahRW: number;
  jumlahRT: number;
  kelompokMasyarakat: string | null;
}

export const demografiData: Demografi = {
  jumlahPenduduk: 785,
  kepalaKeluarga: 255,
  lakiLaki: 396,
  perempuan: 389,
  jumlahRW: 3,
  jumlahRT: 6,
  kelompokMasyarakat: null,
};
