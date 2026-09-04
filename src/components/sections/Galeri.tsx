import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../SectionHeading';
import { Button } from '../Button';
import { Image as ImageIcon, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './Galeri.css';

const KATEGORI_FILTER = [
  { id: 'semua', label: 'Semua' },
  { id: 'wilayah', label: 'Wilayah' },
  { id: 'kegiatan', label: 'Kegiatan Warga' },
  { id: 'umkm', label: 'Produk UMKM' },
  { id: 'kkn', label: 'Kegiatan KKN' }
];

export const Galeri: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('semua');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galeriData, setGaleriData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaleri = async () => {
      const { data } = await supabase.from('galeri').select('*').order('created_at', { ascending: false });
      if (data) setGaleriData(data);
      setLoading(false);
    };
    fetchGaleri();
  }, []);

  const filteredData = activeFilter === 'semua' 
    ? galeriData 
    : galeriData.filter(foto => foto.kategori === activeFilter);

  return (
    <section id="galeri" className="galeri-section">
      <div className="container">
        <SectionHeading 
          title="Galeri & Dokumentasi" 
          subtitle="Kumpulan momen kebersamaan, keindahan alam, dan dinamika kegiatan masyarakat." 
        />

        <div className="galeri-filter">
          {KATEGORI_FILTER.map(filter => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Memuat foto...</div>
        ) : filteredData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Belum ada foto untuk kategori ini.</div>
        ) : (
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
                    <ImageIcon size={32} />
                  </div>
                )}
                <div className="galeri-overlay">
                  <span>{foto.caption}</span>
                </div>
              </div>
            ))}
          </div>
        )}

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
                  <ImageIcon size={64} />
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
