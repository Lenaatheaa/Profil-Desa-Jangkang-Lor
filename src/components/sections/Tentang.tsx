import React from 'react';
import { identitasData } from '../../data/identitas';
import { sejarahData } from '../../data/sejarah';
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

        <div className="sejarah-container mt-6">
          <h3 className="sejarah-title">Mengenal Sejarah</h3>
          <div className="sejarah-grid">
            {sejarahData.map((cerita) => (
              <Card key={cerita.id} className="sejarah-card">
                <h4 className="cerita-judul">{cerita.judul}</h4>
                <p className="cerita-isi">{cerita.isi}</p>
                {cerita.isCeritaRakyat && (
                  <div className="cerita-disclaimer">
                    <Info size={16} />
                    <span>Cerita masyarakat, sumber belum pasti.</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
