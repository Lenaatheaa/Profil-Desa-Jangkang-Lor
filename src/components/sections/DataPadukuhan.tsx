import React from 'react';
import { demografiData } from '../../data/demografi';
import { geografiData } from '../../data/geografi';
import { pemerintahanData } from '../../data/pemerintahan';
import { SectionHeading } from '../SectionHeading';
import { StatCard } from '../StatCard';
import { Card } from '../Card';
import { Users, User, UserCheck, Map, Grid, Info, ChevronRight } from 'lucide-react';
import './DataPadukuhan.css';

export const DataPadukuhan: React.FC = () => {
  return (
    <section id="data" className="data-section">
      <div className="container">
        <SectionHeading 
          title="Data Padukuhan" 
          subtitle="Informasi demografi masyarakat, letak geografis, serta struktur kepengurusan." 
        />

        {/* Demografi */}
        <div className="data-group">
          <h3 className="data-group-title">
            <Users className="text-primary" /> Demografi Masyarakat
          </h3>
          
          <div className="demografi-grid">
            <StatCard 
              title="Total Penduduk" 
              value={demografiData.jumlahPenduduk} 
              icon={<Users />} 
            />
            <StatCard 
              title="Kepala Keluarga" 
              value={demografiData.kepalaKeluarga} 
              icon={<UserCheck />} 
            />
            <StatCard 
              title="Laki-laki" 
              value={demografiData.lakiLaki} 
              icon={<User />} 
            />
            <StatCard 
              title="Perempuan" 
              value={demografiData.perempuan} 
              icon={<User />} 
            />
            <StatCard 
              title="Jumlah RW" 
              value={demografiData.jumlahRW} 
              icon={<Grid />} 
            />
            <StatCard 
              title="Jumlah RT" 
              value={demografiData.jumlahRT} 
              icon={<Grid />} 
            />
          </div>

          <Card className="demografi-kelompok mt-4">
            <strong>Kelompok/Kegiatan Masyarakat: </strong>
            {demografiData.kelompokMasyarakat ? (
              <span>{demografiData.kelompokMasyarakat}</span>
            ) : (
              <span className="placeholder-text"><Info size={16} /> Data sedang diperbarui</span>
            )}
          </Card>
        </div>

        {/* Geografi */}
        <div className="data-group mt-6">
          <h3 className="data-group-title">
            <Map className="text-primary" /> Geografi Wilayah
          </h3>
          
          <div className="geografi-grid">
            <Card className="geografi-card">
              <h4 className="geografi-subtitle">Luas Wilayah</h4>
              {geografiData.luasHektare ? (
                <p className="geografi-luas">{geografiData.luasHektare} Hektare</p>
              ) : (
                <div className="placeholder-box">
                  <Info size={20} /> Data luas sedang diperbarui
                </div>
              )}
            </Card>

            <Card className="geografi-card">
              <h4 className="geografi-subtitle">Batas Wilayah</h4>
              <ul className="batas-list">
                {geografiData.batas.map((b, i) => (
                  <li key={i} className="batas-item">
                    <span className="batas-arah">{b.arah}</span>
                    <ChevronRight size={16} className="text-muted" />
                    <span className="batas-wilayah">{b.wilayah}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Pemerintahan & Organisasi */}
        <div className="data-group mt-6">
          <h3 className="data-group-title">
            <UserCheck className="text-primary" /> Pemerintahan & Organisasi
          </h3>
          
          <Card className="pemerintahan-card">
            <div className="table-responsive">
              <table className="pemerintahan-table">
                <thead>
                  <tr>
                    <th>Jabatan</th>
                    <th>Nama</th>
                  </tr>
                </thead>
                <tbody>
                  {pemerintahanData.map((p, i) => (
                    <tr key={i}>
                      <td className="font-semibold text-primary-dark">{p.jabatan}</td>
                      <td>
                        {p.nama ? (
                          p.nama
                        ) : (
                          <span className="placeholder-text">Data sedang diperbarui</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};
