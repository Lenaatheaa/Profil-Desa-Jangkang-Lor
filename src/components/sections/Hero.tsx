import React from 'react';
import { identitasData } from '../../data/identitas';
import { Button } from '../Button';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section id="beranda" className="hero-section">
      <div className="hero-overlay"></div>
      
      <div className="container hero-container">
        <div className="hero-badge animate-fade-in">
          <span className="hero-badge-icon">📍</span>
          <span>{identitasData.kalurahan}, {identitasData.kabupaten}, {identitasData.provinsi}</span>
        </div>
        
        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Selamat Datang di <br />
          <span className="hero-title-highlight">Padukuhan {identitasData.namaPadukuhan}</span>
        </h1>
        
        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Mengenal lebih dekat Jangkang Lor, potensi, masyarakat, dan kehidupan di dalamnya. 
          Wilayah yang asri dengan pesona bukit Gunung Ampo di Kalurahan Sentolo.
        </p>
        
        <div className="hero-cta-group animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button 
            size="lg" 
            variant="primary" 
            onClick={() => {
              document.getElementById('tentang')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Jelajahi Profil
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="btn-outline-hero"
            onClick={() => {
              document.getElementById('potensi')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Lihat Potensi
          </Button>
        </div>
      </div>
    </section>
  );
};
