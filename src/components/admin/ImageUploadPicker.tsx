import React, { useState } from 'react';
import { Button } from '../Button';
import { Camera, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploadPickerProps {
  onImageSelected: (file: File | null, previewUrl: string) => void;
  currentImageUrl?: string;
}

export const ImageUploadPicker: React.FC<ImageUploadPickerProps> = ({ onImageSelected, currentImageUrl }) => {
  const [preview, setPreview] = useState<string>(currentImageUrl || '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelected(file, url);
    }
  };

  const handleClear = () => {
    setPreview('');
    onImageSelected(null, '');
  };

  return (
    <div className="image-upload-picker">
      {preview ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
          <button 
            type="button"
            onClick={handleClear}
            style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
          <label style={{ cursor: 'pointer' }}>
            <Button type="button" variant="outline" size="sm" style={{ pointerEvents: 'none' }}>
              <ImageIcon size={16} className="mr-2" /> Pilih dari Galeri
            </Button>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
          </label>
          
          <label style={{ cursor: 'pointer' }}>
            <Button type="button" variant="outline" size="sm" style={{ pointerEvents: 'none' }}>
              <Camera size={16} className="mr-2" /> Jepret Langsung
            </Button>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment"
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
          </label>
        </div>
      )}
    </div>
  );
};
