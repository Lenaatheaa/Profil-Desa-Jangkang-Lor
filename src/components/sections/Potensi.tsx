import React, { useState } from 'react';
import { potensiData } from '../../data/potensi';
import { SectionHeading } from '../SectionHeading';
import { Card } from '../Card';
import { AccordionItem } from '../AccordionItem';
import { Wheat, Music, Store } from 'lucide-react';
import './Potensi.css';

// Helper to render icon based on id
const getIcon = (id: string) => {
  switch (id) {
    case 'pertanian': return <Wheat size={24} />;
    case 'kesenian': return <Music size={24} />;
    case 'umkm': return <Store size={24} />;
    default: return null;
  }
};

export const Potensi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(potensiData[0].id);

  return (
    <section id="potensi" className="potensi-section">
      <div className="container">
        <SectionHeading 
          title="Potensi Desa" 
          subtitle="Menggali potensi unggulan Padukuhan Jangkang Lor dari sektor pertanian, kesenian, hingga ekonomi." 
        />

        <div className="potensi-tabs">
          {potensiData.map((item) => (
            <button
              key={item.id}
              className={`potensi-tab-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {getIcon(item.id)}
              <span>{item.judul}</span>
            </button>
          ))}
        </div>

        <div className="potensi-content-wrapper">
          {potensiData.map((item) => (
            activeTab === item.id && (
              <div key={item.id} className="potensi-content animate-fade-in">
                <div className="potensi-content-header">
                  <div className={`potensi-content-icon bg-${item.id}`}>
                    {getIcon(item.id)}
                  </div>
                  <h3 className="potensi-content-title">{item.judul}</h3>
                </div>
                
                <p className="potensi-content-desc">{item.deskripsi}</p>

                {item.subKategori && item.subKategori.length > 0 && (
                  <div className="potensi-accordion-list mt-6">
                    {item.subKategori.map((sub, idx) => (
                      <AccordionItem key={idx} title={sub.nama}>
                        <ul className="potensi-sub-items">
                          {sub.items.map((subItem, sIdx) => (
                            <li key={sIdx}>{subItem}</li>
                          ))}
                        </ul>
                      </AccordionItem>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};
