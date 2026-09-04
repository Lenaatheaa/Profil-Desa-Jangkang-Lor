import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../Button';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export const TabPotensi: React.FC = () => {
  const [potensi, setPotensi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [kategori, setKategori] = useState('');
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [penutup, setPenutup] = useState('');
  const [subKategoriList, setSubKategoriList] = useState<{nama: string, itemsStr: string}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPotensi = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('potensi_desa').select('*').order('created_at', { ascending: true });
    if (!error && data) {
      setPotensi(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPotensi();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setKategori(''); setJudul(''); setDeskripsi(''); setPenutup('');
    setSubKategoriList([]);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setKategori(item.kategori); setJudul(item.judul); setDeskripsi(item.deskripsi || '');
    setPenutup(item.penutup || '');
    
    const loadedSubKategori = item.sub_kategori || [];
    setSubKategoriList(loadedSubKategori.map((sub: any) => ({
      nama: sub.nama || '',
      itemsStr: (sub.items || []).join(', ')
    })));
    
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, judul: string) => {
    if (window.confirm(`Yakin hapus potensi ${judul}?`)) {
      await supabase.from('potensi_desa').delete().eq('id', id);
      fetchPotensi();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const parsedSubKategori = subKategoriList.map(sub => ({
        nama: sub.nama,
        items: sub.itemsStr.split(',').map(s => s.trim()).filter(s => s)
      }));

      const payload = { 
        kategori: kategori.toLowerCase().replace(/\s+/g, '-'), 
        judul, 
        deskripsi, 
        penutup, 
        sub_kategori: parsedSubKategori 
      };

      if (editingId) {
        await supabase.from('potensi_desa').update(payload).eq('id', editingId);
      } else {
        await supabase.from('potensi_desa').insert([payload]);
      }
      setIsModalOpen(false);
      fetchPotensi();
    } catch (err) {
      alert("Gagal menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="admin-controls">
        <h2>Potensi Desa (UMKM, Pertanian, dll)</h2>
        <Button onClick={openAddModal} variant="primary"><Plus size={16} /> Tambah Kategori Potensi</Button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Kategori ID</th><th>Judul</th><th>Deskripsi Singkat</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={4} className="text-center">Loading...</td></tr> : 
             potensi.length === 0 ? <tr><td colSpan={4} className="text-center">Belum ada data potensi. (Pastikan Anda sudah menjalankan Setup SQL di Supabase)</td></tr> :
             potensi.map(item => (
                <tr key={item.id}>
                  <td>{item.kategori}</td>
                  <td className="font-semibold">{item.judul}</td>
                  <td>{item.deskripsi ? item.deskripsi.substring(0, 50) + '...' : ''}</td>
                  <td>
                    <div className="admin-actions">
                      <Button size="sm" variant="outline" onClick={() => openEditModal(item)}><Edit2 size={14} /></Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(item.id, item.judul)}><Trash2 size={14} color="red" /></Button>
                    </div>
                  </td>
                </tr>
             ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingId ? 'Edit Potensi' : 'Tambah Potensi'}</h2>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Kategori ID (unik, tanpa spasi, cth: umkm, pertanian)</label>
                <input type="text" value={kategori} onChange={e => setKategori(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Judul Tampilan (cth: UMKM & Ekonomi Masyarakat)</label>
                <input type="text" value={judul} onChange={e => setJudul(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Deskripsi Utama</label>
                <textarea value={deskripsi} onChange={e => setDeskripsi(e.target.value)} rows={3} required />
              </div>
              <div className="form-group">
                <label>Teks Penutup (Opsional, untuk bagian bawah accordion)</label>
                <textarea value={penutup} onChange={e => setPenutup(e.target.value)} rows={2} />
              </div>
              <div className="form-group">
                <label style={{fontWeight: 700, fontSize: '1.05rem', color: '#1e293b'}}>Daftar Sub Kategori (UMKM / Isi Konten)</label>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px', background: '#f1f5f9', padding: '15px', borderRadius: '1rem', border: '1px solid #e2e8f0'}}>
                  {subKategoriList.length === 0 && (
                    <p style={{textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', margin: '10px 0'}}>Belum ada sub kategori. Klik tombol di bawah untuk menambahkan.</p>
                  )}
                  {subKategoriList.map((sub, idx) => (
                    <div key={idx} style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0', 
                      padding: '1.25rem', 
                      borderRadius: '0.75rem', 
                      position: 'relative',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease'
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                        <span style={{fontWeight: 600, fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Sub Kategori #{idx + 1}</span>
                        <button 
                          type="button" 
                          onClick={() => setSubKategoriList(prev => prev.filter((_, i) => i !== idx))}
                          style={{
                            background: '#fee2e2', 
                            border: '1px solid #fecaca', 
                            color: '#ef4444', 
                            cursor: 'pointer', 
                            padding: '6px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={e => e.currentTarget.style.background = '#fca5a5'}
                          onMouseOut={e => e.currentTarget.style.background = '#fee2e2'}
                          title="Hapus Kategori Ini"
                        >
                          <X size={14} strokeWidth={3} />
                        </button>
                      </div>
                      
                      <div style={{marginBottom: '0.75rem'}}>
                        <input 
                          type="text" 
                          placeholder="Nama (misal: Kuliner)" 
                          value={sub.nama} 
                          onChange={e => {
                            const newList = [...subKategoriList];
                            newList[idx].nama = e.target.value;
                            setSubKategoriList(newList);
                          }} 
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.5rem',
                            fontSize: '0.95rem',
                            backgroundColor: '#f8fafc',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                          onFocus={e => e.target.style.borderColor = '#3b82f6'}
                          onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                        />
                      </div>
                      
                      <div>
                        <textarea 
                          placeholder="Daftar item dipisah koma (misal: Peyek, Tempe, Jajanan)" 
                          value={sub.itemsStr} 
                          onChange={e => {
                            const newList = [...subKategoriList];
                            newList[idx].itemsStr = e.target.value;
                            setSubKategoriList(newList);
                          }} 
                          rows={2}
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.5rem',
                            fontSize: '0.95rem',
                            backgroundColor: '#f8fafc',
                            resize: 'vertical',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                          onFocus={e => e.target.style.borderColor = '#3b82f6'}
                          onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                        />
                        <p style={{fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px'}}>* Pisahkan setiap isian dengan tanda koma (,)</p>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    onClick={() => setSubKategoriList(prev => [...prev, {nama: '', itemsStr: ''}])}
                    style={{
                      alignSelf: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#eff6ff', 
                      color: '#2563eb',
                      border: '1px dashed #93c5fd',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = '#dbeafe';
                      e.currentTarget.style.borderColor = '#60a5fa';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = '#eff6ff';
                      e.currentTarget.style.borderColor = '#93c5fd';
                    }}
                  >
                    <Plus size={18} strokeWidth={2.5} /> Tambah Kategori Baru
                  </button>
                </div>
              </div>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
