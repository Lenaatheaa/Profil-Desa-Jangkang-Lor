import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { geografiData } from '../../data/geografi';
import { pemerintahanData } from '../../data/pemerintahan';
import { SectionHeading } from '../SectionHeading';
import { StatCard } from '../StatCard';
import { Card } from '../Card';
import { Users, Map, UserCheck, ChevronRight, Home, Info } from 'lucide-react';
import './DataPadukuhan.css';

export const DataPadukuhan: React.FC = () => {
  const [demografiData, setDemografiData] = useState<any>(null);
  const [pemerintahan, setPemerintahan] = useState<typeof pemerintahanData>(pemerintahanData);

  useEffect(() => {
    const fetchProfil = async () => {
      const { data } = await supabase.from('profil_umum').select('*').eq('id', 1).single();
      if (data) setDemografiData(data);
    };
    
    const fetchPemerintahan = async () => {
      const { data, error } = await supabase.from('struktur_pemerintahan').select('*').order('urutan', { ascending: true });
      if (!error && data && data.length > 0) {
        const kepala = data.length > 0 ? data[0].nama : pemerintahanData.kepalaPadukuhan;
        const struktur = data.slice(1).map(item => ({ jabatan: item.jabatan, nama: item.nama }));
        setPemerintahan({ kepalaPadukuhan: `${data[0].jabatan} - ${kepala}`, struktur });
      }
    };

    fetchProfil();
    fetchPemerintahan();
  }, []);

  return (
    <section id="data" className="data-section">
      <div className="container">
        <SectionHeading 
          title="Data Padukuhan" 
          subtitle="Gambaran umum kependudukan, wilayah, dan struktur organisasi masyarakat Jangkang Lor." 
        />

        <div className="data-grid">
          {/* Demografi */}
          <div className="data-card animate-slide-up">
            <h3 className="data-card-title">
              <Users size={24} className="data-icon" /> 
              Demografi Penduduk
            </h3>
            
            <p className="mb-4 text-muted" style={{fontSize: '0.95rem'}}>
              Gambaran singkat jumlah penduduk dan struktur kependudukan di Padukuhan Jangkang Lor
            </p>

            <div className="stat-grid">
              <StatCard 
                title="Total Penduduk" 
                value={demografiData?.demo_penduduk || 0} 
                icon={<Users size={24} />} 
              />
              <StatCard 
                title="Kepala Keluarga" 
                value={demografiData?.demo_kk || 0} 
                icon={<Home size={24} />} 
              />
              <StatCard 
                title="Jumlah RW" 
                value="3" 
                icon={<Users size={24} />} 
              />
              <StatCard 
                title="Jumlah RT" 
                value="6" 
                icon={<Users size={24} />} 
              />
            </div>
            
            <div className="gender-chart">
              <div className="gender-stat">
                <span className="gender-label">Laki-laki</span>
                <span className="gender-value">{demografiData?.demo_laki || 0} Jiwa</span>
              </div>
              <div className="gender-bar">
                <div 
                  className="gender-bar-fill male" 
                  style={{ width: demografiData && demografiData.demo_penduduk > 0 ? `${(demografiData.demo_laki / demografiData.demo_penduduk) * 100}%` : '50%' }}
                ></div>
                <div 
                  className="gender-bar-fill female" 
                  style={{ width: demografiData && demografiData.demo_penduduk > 0 ? `${(demografiData.demo_perempuan / demografiData.demo_penduduk) * 100}%` : '50%' }}
                ></div>
              </div>
              <div className="gender-stat">
                <span className="gender-label">Perempuan</span>
                <span className="gender-value">{demografiData?.demo_perempuan || 0} Jiwa</span>
              </div>
            </div>
            
            <div className="info-box">
              <div className="info-box-label">Kelompok/Kegiatan Masyarakat</div>
              <div className="info-box-value">
                <span className="placeholder-text"><Info size={16} /> Data belum tersedia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Geografi */}
        <div className="data-group mt-6">
          <h3 className="data-group-title">
            <Map className="text-primary" /> Geografi Masyarakat
          </h3>
          
          <div className="geografi-grid">
            <Card className="geografi-card">
              <h4 className="geografi-subtitle">Luas Wilayah</h4>
              <p className="font-semibold text-xl text-primary" style={{marginBottom: '0.5rem'}}>{geografiData.luasHektare} Hektare</p>
              <p className="text-muted" style={{fontSize: '0.9rem', lineHeight: 1.6}}>
                Kondisi alamnya berupa dataran yang relatif tinggi, dengan tanah kapur dan tanah liat. Wilayah ini juga terdapat gunung atau bukit yang dikenal dengan sebutan “Gunung Ampo”.
              </p>
            </Card>

            <Card className="geografi-card">
              <h4 className="geografi-subtitle">Batas Wilayah</h4>
              <ul className="batas-list">
                <li className="batas-item">
                  <span className="batas-arah">Barat</span>
                  <ChevronRight size={16} className="text-muted" />
                  <span className="batas-wilayah">{geografiData.batasWilayah.barat}</span>
                </li>
                <li className="batas-item">
                  <span className="batas-arah">Selatan</span>
                  <ChevronRight size={16} className="text-muted" />
                  <span className="batas-wilayah">{geografiData.batasWilayah.selatan}</span>
                </li>
                <li className="batas-item">
                  <span className="batas-arah">Utara</span>
                  <ChevronRight size={16} className="text-muted" />
                  <span className="batas-wilayah">{geografiData.batasWilayah.utara}</span>
                </li>
                <li className="batas-item">
                  <span className="batas-arah">Timur</span>
                  <ChevronRight size={16} className="text-muted" />
                  <span className="batas-wilayah">{geografiData.batasWilayah.timur}</span>
                </li>
              </ul>
            </Card>
            
            <Card className="geografi-card">
              <h4 className="geografi-subtitle">Koordinat</h4>
              <ul className="batas-list">
                <li className="batas-item">
                  <span className="batas-arah">Bujur</span>
                  <ChevronRight size={16} className="text-muted" />
                  <span className="placeholder-text">Data belum tersedia</span>
                </li>
                <li className="batas-item">
                  <span className="batas-arah">Lintang</span>
                  <ChevronRight size={16} className="text-muted" />
                  <span className="placeholder-text">Data belum tersedia</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Pemerintahan & Organisasi */}
        <div className="data-group mt-6">
          <h3 className="data-group-title">
            <UserCheck className="text-primary" /> Struktur Pemerintahan Padukuhan
          </h3>
          <p className="mb-4 text-muted">
            Padukuhan Jangkang Lor memiliki struktur kepemimpinan dan organisasi masyarakat yang berperan dalam mendukung pelayanan serta kehidupan bermasyarakat.
          </p>
          
          <div className="mb-4" style={{ backgroundColor: 'var(--color-primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 'bold' }}>
            {pemerintahan.kepalaPadukuhan} <span style={{fontWeight:'normal', fontStyle:'italic', color:'#666'}}>— Kepala Padukuhan</span>
          </div>
          
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
                  {pemerintahan.struktur.map((p, i) => (
                    <tr key={i}>
                      <td className="font-semibold text-primary-dark">{p.jabatan}</td>
                      <td>{p.nama}</td>
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
