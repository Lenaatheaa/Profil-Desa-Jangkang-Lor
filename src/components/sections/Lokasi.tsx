import React, { useState } from 'react';
import { SectionHeading } from '../SectionHeading';
import { MapComponent } from '../Map';
import './Lokasi.css';

const CATEGORIES = [
  { id: 'pemerintahan', label: 'Pemerintahan', color: '#e63946' }, // red
  { id: 'ibadah', label: 'Tempat Ibadah', color: '#2a9d8f' }, // green
  { id: 'kesehatan', label: 'Kesehatan', color: '#0077b6' }, // blue
  { id: 'olahraga', label: 'Olahraga', color: '#f4a261' }, // orange
  { id: 'sejarah-budaya', label: 'Sejarah & Budaya', color: '#9d4edd' }, // violet
  { id: 'lainnya', label: 'Lainnya', color: '#6c757d' }, // grey
];

export const Lokasi: React.FC = () => {
  const [activeCategories, setActiveCategories] = useState<string[]>(
    CATEGORIES.map(c => c.id) // All active by default
  );

  const toggleCategory = (id: string) => {
    setActiveCategories(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="lokasi" className="lokasi-section">
      <div className="container">
        <SectionHeading 
          title="Peta Lokasi" 
          subtitle="Pemetaan fasilitas publik, sarana ibadah, dan titik penting lainnya di Jangkang Lor." 
        />

        <div className="map-container-layout">
          <div className="map-sidebar">
            <h3 className="filter-title">Kategori Lokasi</h3>
            <p className="filter-desc">Gunakan filter di bawah ini untuk menampilkan titik spesifik pada peta.</p>
            
            <div className="filter-list">
              {CATEGORIES.map((cat) => (
                <label key={cat.id} className="filter-item">
                  <input 
                    type="checkbox" 
                    checked={activeCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="filter-checkbox"
                  />
                  <span 
                    className="filter-color-indicator" 
                    style={{ backgroundColor: cat.color }}
                  ></span>
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
            
            <div className="map-disclaimer mt-6">
              <strong>Catatan:</strong> Titik koordinat yang ditampilkan saat ini bersifat perkiraan (placeholder) dan akan diperbarui dengan data riil survei lapangan.
            </div>
          </div>
          
          <div className="map-main">
            <MapComponent activeCategories={activeCategories} />
          </div>
        </div>
      </div>
    </section>
  );
};
