import React from 'react';
import { Button } from '../Button';
import './Kegiatan.css';
import { Users, BookOpen, Lightbulb, HeartHandshake } from 'lucide-react';

export const Kegiatan: React.FC = () => {
  return (
    <section id="kegiatan" className="kegiatan-section">
      <div className="container">
        <div className="kegiatan-content">
          <div className="kegiatan-text">
            <h2 className="kegiatan-title">Bersama Jangkang Lor</h2>
            <p className="kegiatan-subtitle">KKN UAD 159</p>
            <p className="kegiatan-tagline">"Hadir. Berproses. Memberi Manfaat."</p>
            
            <p className="kegiatan-desc">
              Mahasiswa Kuliah Kerja Nyata (KKN) Universitas Ahmad Dahlan angkatan 159 
              hadir di Padukuhan Jangkang Lor untuk belajar bersama masyarakat, 
              berproses dalam program-program pengabdian, dan berupaya memberikan manfaat 
              yang berkelanjutan bagi perkembangan potensi desa.
            </p>
            
            <div className="kegiatan-features">
              <div className="feature-item">
                <BookOpen className="feature-icon" />
                <span>Edukasi</span>
              </div>
              <div className="feature-item">
                <Lightbulb className="feature-icon" />
                <span>Pemberdayaan</span>
              </div>
              <div className="feature-item">
                <HeartHandshake className="feature-icon" />
                <span>Sosial</span>
              </div>
            </div>

            <Button 
              variant="secondary" 
              size="lg"
              className="mt-6"
              onClick={() => {
                document.getElementById('galeri')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Lihat Dokumentasi KKN &rarr;
            </Button>
          </div>
          
          <div className="kegiatan-image-wrapper animate-fade-in">
            <img src="/galeri_kegiatan.png" alt="Kegiatan KKN UAD 159" className="kegiatan-img-real" />
          </div>
        </div>
      </div>
    </section>
  );
};
