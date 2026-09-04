import React from 'react';
import { identitasData } from '../../data/identitas';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-title">Padukuhan {identitasData.namaPadukuhan}</h2>
            <p className="footer-desc">
              Website Profil resmi Padukuhan {identitasData.namaPadukuhan}, Kalurahan {identitasData.kalurahan},
              Kapanewon {identitasData.kapanewon}, Kabupaten {identitasData.kabupaten}.
            </p>
          </div>

          <div className="footer-nav">
            <h3 className="footer-subtitle">Navigasi</h3>
            <ul className="footer-links">
              <li><a href="#beranda">Beranda</a></li>
              <li><a href="#tentang">Tentang</a></li>
              <li><a href="#data">Data Padukuhan</a></li>
              <li><a href="#potensi">Potensi</a></li>
            </ul>
          </div>

          <div className="footer-nav">
            <h3 className="footer-subtitle">Informasi</h3>
            <ul className="footer-links">
              <li><a href="#fasilitas">Fasilitas</a></li>
              <li><a href="#galeri">Galeri</a></li>
              <li><a href="#lokasi">Peta Lokasi</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-watermark" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <img src="/logo-uad.png" alt="Logo UAD" style={{height: '45px', objectFit: 'contain'}} />
            <img src="/logo-kkn.png" alt="Logo KKN Jangkang Lor" style={{height: '45px', objectFit: 'contain'}} />
          </div>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Padukuhan {identitasData.namaPadukuhan}. Dikembangkan oleh KKN UAD 159.
          </p>
        </div>
      </div>
    </footer>
  );
};
