import React from 'react';
import { Button } from '../Button';
import './Kegiatan.css';
import { BookOpen, Lightbulb, HeartHandshake } from 'lucide-react';

export const Kegiatan: React.FC = () => {
  return (
    <section id="kegiatan" className="kegiatan-section">
      <div className="container">
        <div className="kegiatan-content">
          <div className="kegiatan-text">
            <h2 className="kegiatan-title">KKN DI JANGKANG LOR</h2>
            <p className="kegiatan-subtitle" style={{marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 600}}>Bersama Jangkang Lor</p>
            
            <p className="kegiatan-desc">
              Padukuhan Jangkang Lor menjadi bagian dari perjalanan pengabdian mahasiswa KKN UAD 159.
            </p>
            <p className="kegiatan-desc">
              Melalui berbagai program kerja, mahasiswa bersama masyarakat berkolaborasi dalam berbagai kegiatan yang mencakup bidang pendidikan, kesehatan, ekonomi, sosial, hukum, bahasa, kesenian, dan pemberdayaan masyarakat.
            </p>
            <p className="kegiatan-desc">
              Kegiatan KKN tidak hanya menjadi ruang bagi mahasiswa untuk mengabdi, tetapi juga menjadi kesempatan untuk belajar, berkolaborasi, dan tumbuh bersama masyarakat.
            </p>

            <p className="kegiatan-tagline mt-4 mb-6">"Hadir. Berproses. Memberi Manfaat."</p>

            <Button 
              variant="secondary" 
              size="lg"
              className="mt-2"
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
