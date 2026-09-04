import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../SectionHeading';
import { MapComponent } from '../Map';
import { supabase, type LokasiSupabase } from '../../lib/supabase';
import './Lokasi.css';

// Default static categories for fallback/color mapping
const CATEGORY_COLORS: Record<string, string> = {
  'pemerintahan': '#e63946', // red
  'ibadah': '#2a9d8f', // green
  'kesehatan': '#0077b6', // blue
  'olahraga': '#f4a261', // orange
  'sejarah & budaya': '#9d4edd', // violet
  'sejarah-budaya': '#9d4edd', // violet
  'lainnya': '#6c757d', // grey
};

const getDefaultColor = (kategori: string) => {
  return CATEGORY_COLORS[kategori.toLowerCase()] || '#6c757d'; // fallback to grey
};

export const Lokasi: React.FC = () => {
  const [lokasiData, setLokasiData] = useState<LokasiSupabase[]>([]);
  const [categories, setCategories] = useState<{ id: string, label: string, color: string }[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLokasi = async () => {
      const { data, error } = await supabase.from('lokasi').select('*');
      
      if (!error && data) {
        setLokasiData(data);
        
        // Extract distinct categories
        const distinctCategories = Array.from(new Set(data.map(loc => loc.kategori.toLowerCase())));
        const formattedCategories = distinctCategories.map(cat => ({
          id: cat,
          label: cat, // Will capitalize in UI
          color: getDefaultColor(cat)
        }));
        
        setCategories(formattedCategories);
        setActiveCategories(formattedCategories.map(c => c.id));
      }
      setLoading(false);
    };

    fetchLokasi();
  }, []);

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
            
            {loading ? (
              <p>Memuat kategori...</p>
            ) : categories.length === 0 ? (
              <p>Belum ada titik lokasi.</p>
            ) : (
              <div className="filter-list">
                {categories.map((cat) => (
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
                    <span style={{textTransform: 'capitalize'}}>{cat.label}</span>
                  </label>
                ))}
              </div>
            )}
            
            <div className="map-disclaimer mt-6">
              <strong>Catatan:</strong> Titik koordinat akan diperbarui secara berkala. Hubungi admin desa jika ada ketidaksesuaian.
            </div>
          </div>
          
          <div className="map-main">
            {loading ? (
              <div style={{height: 500, display: 'flex', alignItems:'center', justifyContent:'center'}}>
                Memuat peta...
              </div>
            ) : (
              <MapComponent activeCategories={activeCategories} lokasiData={lokasiData} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
