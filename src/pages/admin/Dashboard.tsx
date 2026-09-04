import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type LokasiSupabase } from '../../lib/supabase';
import { Button } from '../../components/Button';
import { LogOut, Plus, Edit2, Trash2, MapPin, X, Save, Image as ImageIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ImageUploadPicker } from '../../components/admin/ImageUploadPicker';
import { TabPemerintahan } from '../../components/admin/TabPemerintahan';
import { TabPotensi } from '../../components/admin/TabPotensi';
import './Admin.css';

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// MapPicker component for form
const MapPicker: React.FC<{ lat: number; lng: number; onChange: (lat: number, lng: number) => void }> = ({ lat, lng, onChange }) => {
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        onChange(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng]);
    }, [lat, lng, map]);
    return null;
  };

  return (
    <div className="map-picker-container">
      <MapContainer center={[lat, lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker 
          position={[lat, lng]} 
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              onChange(position.lat, position.lng);
            },
          }}
        />
        <MapEvents />
        <MapUpdater />
      </MapContainer>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profil' | 'peta' | 'galeri' | 'pemerintahan' | 'potensi'>('profil');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-layout">
      <header className="admin-header">
        <h1>Dashboard Admin Jangkang Lor</h1>
        <Button variant="outline" size="sm" onClick={handleLogout} className="btn-outline-hero" style={{color:'white'}}>
          <LogOut size={16} className="mr-2" /> Logout
        </Button>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside className="admin-sidebar" style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #ddd', padding: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <button 
                onClick={() => setActiveTab('profil')}
                style={{ width: '100%', textAlign: 'left', padding: '10px', backgroundColor: activeTab === 'profil' ? '#e9ecef' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: activeTab === 'profil' ? 'bold' : 'normal' }}
              >
                Profil Umum
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('galeri')}
                style={{ width: '100%', textAlign: 'left', padding: '10px', backgroundColor: activeTab === 'galeri' ? '#e9ecef' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: activeTab === 'galeri' ? 'bold' : 'normal' }}
              >
                Galeri Foto
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('peta')}
                style={{ width: '100%', textAlign: 'left', padding: '10px', backgroundColor: activeTab === 'peta' ? '#e9ecef' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: activeTab === 'peta' ? 'bold' : 'normal' }}
              >
                Titik Peta (Lokasi)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('pemerintahan')}
                style={{ width: '100%', textAlign: 'left', padding: '10px', backgroundColor: activeTab === 'pemerintahan' ? '#e9ecef' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: activeTab === 'pemerintahan' ? 'bold' : 'normal' }}
              >
                Struktur Pemerintahan
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('potensi')}
                style={{ width: '100%', textAlign: 'left', padding: '10px', backgroundColor: activeTab === 'potensi' ? '#e9ecef' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: activeTab === 'potensi' ? 'bold' : 'normal' }}
              >
                Potensi Desa
              </button>
            </li>
          </ul>
        </aside>
        
        <main className="admin-main">
          {activeTab === 'peta' && <TabPeta />}
          {activeTab === 'profil' && <TabProfil />}
          {activeTab === 'galeri' && <TabGaleri />}
          {activeTab === 'pemerintahan' && <TabPemerintahan />}
          {activeTab === 'potensi' && <TabPotensi />}
        </main>
      </div>
    </div>
  );
};

// --- KOMPONEN TAB PETA ---
const TabPeta: React.FC = () => {
  const [lokasi, setLokasi] = useState<LokasiSupabase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [lat, setLat] = useState(-7.8305);
  const [lng, setLng] = useState(110.2505);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoUrl, setFotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLokasi = async () => {
    const { data, error } = await supabase.from('lokasi').select('*').order('created_at', { ascending: false });
    if (!error && data) setLokasi(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLokasi();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setNama(''); setKategori(''); setDeskripsi('');
    setLat(-7.8305); setLng(110.2505);
    setFotoFile(null); setFotoUrl('');
    setIsModalOpen(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { setLat(position.coords.latitude); setLng(position.coords.longitude); },
        (err) => console.log("Akses GPS ditolak atau gagal.")
      );
    }
  };

  const openEditModal = (loc: LokasiSupabase) => {
    setEditingId(loc.id);
    setNama(loc.nama); setKategori(loc.kategori); setDeskripsi(loc.deskripsi || '');
    setLat(loc.lat); setLng(loc.lng);
    setFotoUrl(loc.foto_url || ''); setFotoFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Yakin hapus lokasi ${name}?`)) {
      await supabase.from('lokasi').delete().eq('id', id);
      fetchLokasi();
    }
  };

  const getLocationFromDevice = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { setLat(position.coords.latitude); setLng(position.coords.longitude); }, 
        (err) => alert("Gagal mendapatkan lokasi GPS.")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalFotoUrl = fotoUrl;
      if (fotoFile) {
        const fileExt = fotoFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `public/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('foto-lokasi').upload(filePath, fotoFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('foto-lokasi').getPublicUrl(filePath);
        finalFotoUrl = data.publicUrl;
      }

      const payload = { nama, kategori: kategori.toLowerCase().trim(), deskripsi, lat, lng, foto_url: finalFotoUrl };
      if (editingId) {
        await supabase.from('lokasi').update(payload).eq('id', editingId);
      } else {
        await supabase.from('lokasi').insert([payload]);
      }
      setIsModalOpen(false);
      fetchLokasi();
    } catch (err) {
      alert("Gagal menyimpan data.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="admin-controls">
        <h2>Daftar Lokasi Peta</h2>
        <Button onClick={openAddModal} variant="primary"><Plus size={16} /> Tambah Lokasi</Button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Foto</th><th>Nama</th><th>Kategori</th><th>Koordinat</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={5} className="text-center">Loading...</td></tr> : 
             lokasi.length === 0 ? <tr><td colSpan={5} className="text-center">Belum ada titik lokasi.</td></tr> :
             lokasi.map(loc => (
                <tr key={loc.id}>
                  <td>
                    {loc.foto_url ? <img src={loc.foto_url} alt={loc.nama} className="admin-table-img" /> : <div style={{width: 50, height: 50, backgroundColor: '#eee', borderRadius: 4}} />}
                  </td>
                  <td>{loc.nama}</td><td style={{textTransform: 'capitalize'}}>{loc.kategori}</td>
                  <td>{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</td>
                  <td>
                    <div className="admin-actions">
                      <Button size="sm" variant="outline" onClick={() => openEditModal(loc)}><Edit2 size={14} /></Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(loc.id, loc.nama)}><Trash2 size={14} color="red" /></Button>
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
              <h2>{editingId ? 'Edit Lokasi' : 'Tambah Lokasi Baru'}</h2>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Nama Lokasi</label>
                <input type="text" value={nama} onChange={e => setNama(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Kategori (Ketik bebas)</label>
                <input type="text" value={kategori} onChange={e => setKategori(e.target.value)} required placeholder="Misal: Ibadah, Kesehatan..." />
              </div>
              <div className="form-group">
                <label>Foto Lokasi (Bisa lewat File atau Kamera)</label>
                <ImageUploadPicker 
                  currentImageUrl={fotoUrl} 
                  onImageSelected={(file, url) => { setFotoFile(file); setFotoUrl(url); }} 
                />
              </div>
              <div className="form-group">
                <label>Lokasi (GPS / Peta)</label>
                <Button type="button" variant="outline" size="sm" onClick={getLocationFromDevice} style={{marginBottom: 8}}>
                  <MapPin size={16} /> Gunakan Lokasi Saat Ini (GPS)
                </Button>
                
                <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                  <div style={{flex: 1}}>
                    <span style={{fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px'}}>Latitude (Garis Lintang)</span>
                    <input 
                      type="number" 
                      step="any"
                      value={lat} 
                      onChange={e => setLat(parseFloat(e.target.value) || 0)} 
                    />
                  </div>
                  <div style={{flex: 1}}>
                    <span style={{fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px'}}>Longitude (Garis Bujur)</span>
                    <input 
                      type="number" 
                      step="any"
                      value={lng} 
                      onChange={e => setLng(parseFloat(e.target.value) || 0)} 
                    />
                  </div>
                </div>

                <MapPicker lat={lat} lng={lng} onChange={(newLat, newLng) => { setLat(newLat); setLng(newLng); }} />
                <p style={{fontSize: '0.8rem', color: '#64748b', marginTop: '6px', fontStyle: 'italic'}}>* Catatan: Jika Anda menggunakan Laptop/PC, GPS sering tidak akurat (terdeteksi di pusat Jogja). Silakan geser pin di peta atau salin (paste) koordinat dari Google Maps langsung ke kolom di atas.</p>
              </div>
              <div className="form-group">
                <label>Deskripsi (Opsional)</label>
                <textarea value={deskripsi} onChange={e => setDeskripsi(e.target.value)} rows={3} />
              </div>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan Lokasi'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// --- KOMPONEN TAB PROFIL UMUM ---
const TabProfil: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoUrl, setFotoUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: res } = await supabase.from('profil_umum').select('*').eq('id', 1).single();
      if (res) {
        setData(res);
        setFotoUrl(res.hero_image_url || '');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalFotoUrl = fotoUrl;
      if (fotoFile) {
        const fileExt = fotoFile.name.split('.').pop();
        const fileName = `hero_${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('foto-web').upload(`public/${fileName}`, fotoFile);
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from('foto-web').getPublicUrl(`public/${fileName}`);
          finalFotoUrl = urlData.publicUrl;
        }
      }

      await supabase.from('profil_umum').update({
        ...data,
        hero_image_url: finalFotoUrl
      }).eq('id', 1);
      
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      alert("Gagal memperbarui profil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Memuat profil...</div>;

  return (
    <form onSubmit={handleSave} className="admin-form" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
      <h2>Profil Umum Padukuhan</h2>
      <p style={{marginBottom: 20}}>Ubah informasi utama yang tampil di beranda website.</p>
      
      <div className="form-group">
        <label>Nama Padukuhan</label>
        <input type="text" name="nama_padukuhan" value={data.nama_padukuhan || ''} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label>Foto Latar Beranda (Hero Image)</label>
        <ImageUploadPicker 
          currentImageUrl={fotoUrl} 
          onImageSelected={(file, url) => { setFotoFile(file); setFotoUrl(url); }} 
        />
      </div>

      <div className="form-group">
        <label>Teks Sambutan Utama (Hero Title)</label>
        <input type="text" name="hero_title" value={data.hero_title || ''} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Deskripsi Singkat (Hero Subtitle)</label>
        <textarea name="hero_subtitle" value={data.hero_subtitle || ''} onChange={handleChange} rows={3} />
      </div>
      
      <h3 style={{marginTop: 20}}>Data Demografi</h3>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
        <div className="form-group">
          <label>Jumlah Penduduk</label>
          <input type="number" name="demo_penduduk" value={data.demo_penduduk || 0} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Kepala Keluarga (KK)</label>
          <input type="number" name="demo_kk" value={data.demo_kk || 0} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Laki-Laki</label>
          <input type="number" name="demo_laki" value={data.demo_laki || 0} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Perempuan</label>
          <input type="number" name="demo_perempuan" value={data.demo_perempuan || 0} onChange={handleChange} />
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={saving} style={{marginTop: 20}}>
        <Save size={16} className="mr-2" /> {saving ? 'Menyimpan...' : 'Simpan Profil'}
      </Button>
    </form>
  );
};

// --- KOMPONEN TAB GALERI ---
const TabGaleri: React.FC = () => {
  const [galeri, setGaleri] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [kategori, setKategori] = useState('wilayah');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoUrl, setFotoUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchGaleri = async () => {
    const { data } = await supabase.from('galeri').select('*').order('created_at', { ascending: false });
    if (data) setGaleri(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fotoFile && !fotoUrl) return alert("Pilih foto terlebih dahulu!");
    
    setSaving(true);
    try {
      let finalFotoUrl = fotoUrl;
      if (fotoFile) {
        const fileExt = fotoFile.name.split('.').pop();
        const fileName = `galeri_${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('foto-web').upload(`public/${fileName}`, fotoFile);
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from('foto-web').getPublicUrl(`public/${fileName}`);
          finalFotoUrl = urlData.publicUrl;
        }
      }

      await supabase.from('galeri').insert([{ url: finalFotoUrl, caption, kategori }]);
      setIsModalOpen(false);
      fetchGaleri();
    } catch (err) {
      alert("Gagal menyimpan foto.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Yakin hapus foto ini?")) {
      await supabase.from('galeri').delete().eq('id', id);
      fetchGaleri();
    }
  };

  return (
    <>
      <div className="admin-controls">
        <h2>Galeri Foto</h2>
        <Button onClick={() => { setCaption(''); setFotoFile(null); setFotoUrl(''); setIsModalOpen(true); }} variant="primary">
          <Plus size={16} /> Tambah Foto
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {loading ? <p>Memuat galeri...</p> : galeri.length === 0 ? <p>Belum ada foto galeri.</p> :
         galeri.map(foto => (
           <div key={foto.id} style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
             <img src={foto.url} alt={foto.caption} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
             <div style={{ padding: '10px' }}>
               <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{foto.caption || 'Tanpa Caption'}</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ fontSize: '12px', padding: '2px 6px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>{foto.kategori}</span>
                 <button onClick={() => handleDelete(foto.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
               </div>
             </div>
           </div>
         ))
        }
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>Tambah Foto Galeri</h2>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Upload / Ambil Foto</label>
                <ImageUploadPicker 
                  currentImageUrl={fotoUrl} 
                  onImageSelected={(file, url) => { setFotoFile(file); setFotoUrl(url); }} 
                />
              </div>
              <div className="form-group">
                <label>Caption / Keterangan</label>
                <input type="text" value={caption} onChange={e => setCaption(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select value={kategori} onChange={e => setKategori(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <option value="wilayah">Wilayah</option>
                  <option value="kegiatan">Kegiatan Warga</option>
                  <option value="umkm">UMKM</option>
                  <option value="kkn">Kegiatan KKN</option>
                </select>
              </div>
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? 'Menyimpan...' : 'Simpan Foto'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
