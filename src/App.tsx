import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Tentang } from './components/sections/Tentang';
import { DataPadukuhan } from './components/sections/DataPadukuhan';
import { Potensi } from './components/sections/Potensi';
import { Fasilitas } from './components/sections/Fasilitas';
import { Kegiatan } from './components/sections/Kegiatan';
import { Galeri } from './components/sections/Galeri';
import { Lokasi } from './components/sections/Lokasi';
import { Kontak } from './components/sections/Kontak';
import { Footer } from './components/sections/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Tentang />
      <DataPadukuhan />
      <Potensi />
      <Fasilitas />
      <Kegiatan />
      <Galeri />
      <Lokasi />
      <Kontak />
      <Footer />
    </main>
    </>
  );
}

export default App;
