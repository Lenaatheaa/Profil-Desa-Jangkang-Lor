import React, { useState } from 'react';
import { galeriData } from '../../data/galeri';
import { SectionHeading } from '../SectionHeading';
import { Image, X } from 'lucide-react';
import './Galeri.css';

type FilterType = 'semua' | 'wilayah' | 'kegiatan' | 'umkm' | 'kkn';

export const Galeri: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('semua');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredData = filter === 'semua' 
    ? galeriData 
    : galeriData.filter(item => item.kategori === filter);

  return (
    <section id="galeri" className="galeri-section">
      <div className="container">
        <SectionHeading 
          title="Galeri" 
          subtitle="Potret kehidupan masyarakat, wilayah, dan berbagai kegiatan di Jangkang Lor." 
        />

        <div className="galeri-filters">
          {(['semua', 'wilayah', 'kegiatan', 'umkm', 'kkn'] as FilterType[]).map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="galeri-grid">
          {filteredData.map((foto) => (
            <div 
              key={foto.id} 
              className="galeri-item animate-fade-in"
              onClick={() => setSelectedImage(foto.id)}
            >
              {foto.url ? (
                <img src={foto.url} alt={foto.caption} className="galeri-img-real" />
              ) : (
                <div className="galeri-img-placeholder">
                  <Image size={32} />
                </div>
              )}
              <div className="galeri-overlay">
                <span>{foto.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="lightbox" onClick={() => setSelectedImage(null)}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              <X size={32} />
            </button>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              {galeriData.find(f => f.id === selectedImage)?.url ? (
                <img 
                  src={galeriData.find(f => f.id === selectedImage)?.url} 
                  alt="Gallery" 
                  className="lightbox-img-real" 
                />
              ) : (
                <div className="lightbox-img-placeholder">
                  <Image size={64} />
                </div>
              )}
              <p className="lightbox-caption">
                {galeriData.find(f => f.id === selectedImage)?.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
