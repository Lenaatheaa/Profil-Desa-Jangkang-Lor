import React from 'react';
import { fasilitasData } from '../../data/fasilitas';
import { SectionHeading } from '../SectionHeading';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Building, Landmark, Heart, Activity, MapPin } from 'lucide-react';
import './Fasilitas.css';

// Helper to render icon based on ikon string from data
const getIcon = (ikonName: string) => {
  switch (ikonName) {
    case 'building': return <Building size={32} />;
    case 'landmark': return <Landmark size={32} />;
    case 'heart': return <Heart size={32} />;
    case 'activity': return <Activity size={32} />;
    case 'map-pin': return <MapPin size={32} />;
    default: return <MapPin size={32} />;
  }
};

export const Fasilitas: React.FC = () => {
  return (
    <section id="fasilitas" className="fasilitas-section">
      <div className="container">
        <SectionHeading 
          title="Fasilitas Publik" 
          subtitle="Sarana dan prasarana yang tersedia untuk menunjang kehidupan sosial masyarakat." 
        />

        <div className="fasilitas-grid">
          {fasilitasData.map((fasilitas) => (
            <Card key={fasilitas.id} className="fasilitas-card hover:scale">
              <div className="fasilitas-icon-wrapper">
                {getIcon(fasilitas.ikon)}
              </div>
              
              <h3 className="fasilitas-kategori">{fasilitas.kategori}</h3>
              
              <div className="fasilitas-badges">
                {fasilitas.namaFasilitas.map((nama, idx) => (
                  <Badge key={idx} variant="primary">{nama}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
