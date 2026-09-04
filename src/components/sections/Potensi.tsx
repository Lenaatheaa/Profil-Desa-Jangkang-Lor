import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { potensiData as staticPotensiData } from '../../data/potensi';
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
  const [potensiList, setPotensiList] = useState<any[]>(staticPotensiData);
  const [activeTab, setActiveTab] = useState<string>(staticPotensiData[0].id);

  useEffect(() => {
    const fetchPotensi = async () => {
      const { data, error } = await supabase.from('potensi_desa').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        // Map data from DB to match component structure
        const mappedData = data.map(item => ({
          id: item.kategori,
          judul: item.judul,
          deskripsi: item.deskripsi,
          penutup: item.penutup,
          subKategori: item.sub_kategori
        }));
        setPotensiList(mappedData);
        setActiveTab(mappedData[0].id);
      }
    };
    fetchPotensi();
  }, []);

  return (
    <section id="potensi" className="potensi-section">
      <div className="container">
        <SectionHeading 
          title="Potensi Desa" 
          subtitle="Menggali potensi unggulan Padukuhan Jangkang Lor dari sektor pertanian, kesenian, hingga ekonomi." 
        />

        <div className="potensi-tabs">
          {potensiList.map((item) => (
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
          {potensiList.map((item) => (
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
                    {item.subKategori.map((sub: any, idx: number) => (
                      <AccordionItem key={idx} title={sub.nama}>
                        <ul className="potensi-sub-items">
                          {sub.items.map((subItem: string, sIdx: number) => (
                            <li key={sIdx}>{subItem}</li>
                          ))}
                        </ul>
                      </AccordionItem>
                    ))}
                    {item.penutup && (
                      <p className="potensi-content-desc mt-4" style={{ fontStyle: 'italic', marginTop: '1rem' }}>
                        {item.penutup}
                      </p>
                    )}
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
