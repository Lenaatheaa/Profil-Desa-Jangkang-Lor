import React from 'react';
import { identitasData } from '../../data/identitas';
import './Footer.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              <li><a href="#kegiatan">Kegiatan</a></li>
              <li><a href="#galeri">Galeri</a></li>
              <li><a href="#lokasi">Peta Lokasi</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Padukuhan {identitasData.namaPadukuhan}. Dikembangkan oleh KKN UAD 159.
          </p>
          <button className="btn-back-to-top" onClick={scrollToTop}>
            &uarr; Kembali ke Atas
          </button>
        </div>
      </div>
    </footer>
  );
};
