export interface StrukturPemerintahan {
  kepalaPadukuhan: string;
  struktur: { jabatan: string; nama: string; }[];
}

export const pemerintahanData: StrukturPemerintahan = {
  kepalaPadukuhan: 'Dukuh Jangkang Lor [Masa Periode]',
  struktur: [
    { jabatan: 'Rw 15', nama: 'Eko Suratman' },
    { jabatan: 'Rw 16', nama: 'Kamsiyo' },
    { jabatan: 'Rw 17', nama: 'Eko Widodo' },
    { jabatan: 'Rt 29', nama: 'Budiono' },
    { jabatan: 'Rt 30', nama: 'Yuni Sulistyono' },
    { jabatan: 'Rt 31', nama: 'Didik Wahyu Saputra' },
    { jabatan: 'Rt 32', nama: 'Purwanto' },
    { jabatan: 'Rt 33', nama: 'Sumpeno' },
    { jabatan: 'Rt 34', nama: 'Hartadi' },
    { jabatan: 'KKP (Kelompok Kerja Padukuhan)', nama: 'Suhardi' },
    { jabatan: 'Jaga Warga', nama: 'Hariyantana' },
    { jabatan: 'Karang Taruna AKRAP', nama: 'Usmita' }
  ]
};
