import React from 'react';
import { identitasData } from '../../data/identitas';
import { SectionHeading } from '../SectionHeading';
import { Card } from '../Card';
import './Tentang.css';
import { Map, Flag, MapPin, CheckCircle, Info } from 'lucide-react';

export const Tentang: React.FC = () => {
  return (
    <section id="tentang" className="tentang-section">
      <div className="container">
        <SectionHeading 
          title="Tentang Jangkang Lor" 
          subtitle="Identitas wilayah dan nilai historis peninggalan leluhur yang terus dijaga." 
        />
        
        <p className="text-center text-muted" style={{maxWidth: '800px', margin: '0 auto 3rem auto', lineHeight: 1.8}}>
          Padukuhan Jangkang Lor merupakan salah satu padukuhan yang berada di Kelurahan Sentolo, Kapanewon Sentolo, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta. Jangkang Lor merupakan salah satu dari 12 padukuhan di Kalurahan Sentolo. Jangkang Lor berdampingan dengan Jangkang Kidul, dan dalam struktur pemerintahan Kalurahan Sentolo keduanya tetap tercatat sebagai dua padukuhan yang berbeda.
        </p>
        
        <div className="identitas-grid">
          <Card className="identitas-card">
            <div className="identitas-icon"><MapPin size={24} /></div>
            <div className="identitas-content">
              <span className="identitas-label">Padukuhan</span>
              <strong className="identitas-value">{identitasData.namaPadukuhan}</strong>
            </div>
          </Card>
          
          <Card className="identitas-card">
            <div className="identitas-icon"><Map size={24} /></div>
            <div className="identitas-content">
              <span className="identitas-label">Kalurahan</span>
              <strong className="identitas-value">{identitasData.kalurahan}</strong>
            </div>
          </Card>

          <Card className="identitas-card">
            <div className="identitas-icon"><Map size={24} /></div>
            <div className="identitas-content">
              <span className="identitas-label">Kapanewon</span>
              <strong className="identitas-value">{identitasData.kapanewon}</strong>
            </div>
          </Card>

          <Card className="identitas-card">
            <div className="identitas-icon"><Flag size={24} /></div>
            <div className="identitas-content">
              <span className="identitas-label">Kabupaten</span>
              <strong className="identitas-value">{identitasData.kabupaten}</strong>
            </div>
          </Card>

          <Card className="identitas-card">
            <div className="identitas-icon"><CheckCircle size={24} /></div>
            <div className="identitas-content">
              <span className="identitas-label">Provinsi</span>
              <strong className="identitas-value">{identitasData.provinsi}</strong>
            </div>
          </Card>
          
          <Card className="identitas-card">
            <div className="identitas-icon"><MapPin size={24} /></div>
            <div className="identitas-content">
              <span className="identitas-label">Kode Pos</span>
              <strong className="identitas-value">{identitasData.kodePos}</strong>
            </div>
          </Card>
        </div>

        <div className="sejarah-content animate-slide-up" style={{ animationDelay: '0.2s', marginTop: '3rem' }}>
          <h3 className="section-subtitle text-center" style={{fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 700}}>SEJARAH</h3>
          <h4 className="text-center" style={{marginBottom: '2rem', color: 'var(--color-text-muted)'}}>Mengenal Sejarah Jangkang Lor</h4>
          
          <div className="sejarah-text" style={{ lineHeight: 1.8 }}>
            <p>{identitasData.sejarah.pembuka}</p>
            
            <div className="sejarah-card mt-4 mb-4" style={{ backgroundColor: 'var(--color-bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-primary)' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{identitasData.sejarah.cerita1.judul}</h4>
              <p>{identitasData.sejarah.cerita1.teks}</p>
            </div>

            <div className="sejarah-card mt-4 mb-4" style={{ backgroundColor: 'var(--color-bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-secondary)' }}>
              <h4 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>{identitasData.sejarah.cerita2.judul}</h4>
              <p>{identitasData.sejarah.cerita2.teks}</p>
              <small style={{ display: 'block', marginTop: '1rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                {identitasData.sejarah.cerita2.disclaimer}
              </small>
            </div>

            <p>{identitasData.sejarah.penutup}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
