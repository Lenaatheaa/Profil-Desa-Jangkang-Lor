import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { lokasiData, Lokasi } from '../../data/lokasi';
import { geografiData } from '../../data/geografi';
import './Map.css';

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icons for categories (using standard marker but different colors or just simple standard icons for now)
const createIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  pemerintahan: createIcon('red'),
  ibadah: createIcon('green'),
  kesehatan: createIcon('blue'),
  olahraga: createIcon('orange'),
  'sejarah-budaya': createIcon('violet'),
  lainnya: createIcon('grey')
};

interface MapProps {
  activeCategories: string[];
}

export const MapComponent: React.FC<MapProps> = ({ activeCategories }) => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  
  const center = geografiData.koordinatPusat || { lat: -7.83, lng: 110.25 };
  
  // Filter markers based on active categories
  const filteredLokasi = lokasiData.filter(loc => activeCategories.includes(loc.kategori));

  useEffect(() => {
    // In future (v2), load boundaries.geojson here
    fetch('/boundaries.geojson')
      .then(res => res.json())
      .then(data => setGeoJsonData(data))
      .catch(err => console.log('Batas wilayah belum tersedia.', err));
  }, []);

  return (
    <div className="map-wrapper">
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={15} 
        scrollWheelZoom={false}
        className="leaflet-map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {geoJsonData && (
          <GeoJSON 
            data={geoJsonData} 
            style={{ color: '#2d6a4f', weight: 2, fillOpacity: 0.1 }}
          />
        )}

        {filteredLokasi.map((lokasi) => (
          <Marker 
            key={lokasi.id} 
            position={[lokasi.lat, lokasi.lng]}
            icon={icons[lokasi.kategori]}
          >
            <Popup>
              <div className="map-popup">
                <strong>{lokasi.nama}</strong>
                <span className="popup-category">{lokasi.kategori}</span>
                {lokasi.deskripsi && <p className="popup-desc">{lokasi.deskripsi}</p>}
                <small className="popup-placeholder-note">* Koordinat perkiraan</small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {!geoJsonData && (
        <div className="map-note">
          <small>Batas wilayah (polygon) akan ditambahkan setelah data tersedia.</small>
        </div>
      )}
    </div>
  );
};
