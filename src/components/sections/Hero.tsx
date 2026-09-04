import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { ArrowRight, Map } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './Hero.css';

export const Hero: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: res } = await supabase.from('profil_umum').select('*').eq('id', 1).single();
      if (res) setData(res);
    };
    fetchData();
  }, []);

  const bgStyle = data?.hero_image_url 
    ? { backgroundImage: `url('${data.hero_image_url}')` } 
    : {};

  return (
    <section id="beranda" className="hero-section" style={bgStyle}>
      <div className="hero-overlay"></div>
      
      <div className="container hero-container animate-fade-in">
        <div className="hero-badge">
          <span>Kabupaten Kulon Progo</span>
        </div>
        
        <h1 className="hero-title">
          {data?.hero_title || 'Selamat Datang di Padukuhan Jangkang Lor'}
        </h1>
        
        <p className="hero-subtitle">
          {data?.hero_subtitle || 'Menyimpan pesona alam pedesaan yang asri, kekayaan budaya yang kental, dan masyarakat yang guyub rukun membangun wilayah.'}
        </p>
        
        <div className="hero-cta-group">
          <a href="#tentang">
            <Button variant="primary" size="lg">
              Jelajahi Profil <ArrowRight size={20} className="ml-2" />
            </Button>
          </a>
          <a href="#potensi">
            <Button variant="outline" size="lg" className="btn-outline-hero">
              <Map size={20} className="mr-2" /> Lihat Potensi
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
