import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../Button';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export const TabPemerintahan: React.FC = () => {
  const [struktur, setStruktur] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [jabatan, setJabatan] = useState('');
  const [nama, setNama] = useState('');
  const [urutan, setUrutan] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchStruktur = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('struktur_pemerintahan').select('*').order('urutan', { ascending: true });
    if (!error && data) {
      setStruktur(data);
    } else {
      console.warn("Tabel struktur_pemerintahan mungkin belum dibuat di Supabase.", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStruktur();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setJabatan(''); setNama(''); setUrutan(struktur.length > 0 ? struktur[struktur.length - 1].urutan + 1 : 1);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setJabatan(item.jabatan); setNama(item.nama); setUrutan(item.urutan);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Yakin hapus ${name}?`)) {
      await supabase.from('struktur_pemerintahan').delete().eq('id', id);
      fetchStruktur();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { jabatan, nama, urutan };
      if (editingId) {
        await supabase.from('struktur_pemerintahan').update(payload).eq('id', editingId);
      } else {
        await supabase.from('struktur_pemerintahan').insert([payload]);
      }
      setIsModalOpen(false);
      fetchStruktur();
    } catch (err) {
      alert("Gagal menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="admin-controls">
        <h2>Struktur Pemerintahan Padukuhan</h2>
        <Button onClick={openAddModal} variant="primary"><Plus size={16} /> Tambah Data</Button>
      </div>
      
      <div style={{marginBottom: '15px', color: '#666', fontSize: '0.9rem'}}>
        Catatan: Jabatan "Kepala Padukuhan" (atau urutan paling atas) akan ditampilkan khusus di beranda.
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Urutan</th><th>Jabatan</th><th>Nama Penjabat</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={4} className="text-center">Loading...</td></tr> : 
             struktur.length === 0 ? <tr><td colSpan={4} className="text-center">Belum ada data struktur. (Pastikan Anda sudah menjalankan Setup SQL di Supabase)</td></tr> :
             struktur.map(item => (
                <tr key={item.id}>
                  <td>{item.urutan}</td>
                  <td className="font-semibold">{item.jabatan}</td>
                  <td>{item.nama}</td>
                  <td>
                    <div className="admin-actions">
                      <Button size="sm" variant="outline" onClick={() => openEditModal(item)}><Edit2 size={14} /></Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(item.id, item.nama)}><Trash2 size={14} color="red" /></Button>
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
              <h2>{editingId ? 'Edit Struktur' : 'Tambah Struktur'}</h2>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Jabatan (cth: Dukuh, RW 15, RT 29)</label>
                <input type="text" value={jabatan} onChange={e => setJabatan(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nama Penjabat</label>
                <input type="text" value={nama} onChange={e => setNama(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Urutan Tampil (Angka)</label>
                <input type="number" value={urutan} onChange={e => setUrutan(parseInt(e.target.value))} required />
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
