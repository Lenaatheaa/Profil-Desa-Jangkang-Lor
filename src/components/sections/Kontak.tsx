import React from 'react';
import { kontakData } from '../../data/kontak';
import { identitasData } from '../../data/identitas';
import { SectionHeading } from '../SectionHeading';
import { Button } from '../Button';
import { MapPin, Mail, AtSign, Send } from 'lucide-react';
import './Kontak.css';

export const Kontak: React.FC = () => {
  return (
    <section id="kontak" className="kontak-section">
      <div className="container">
        <SectionHeading
          title="Hubungi Kami"
          subtitle={`Informasi dan narahubung resmi Padukuhan ${identitasData.namaPadukuhan}.`}
        />

        <div className="kontak-layout">
          <div className="kontak-info">
            <h3 className="kontak-info-title">Informasi Kontak</h3>

            <div className="info-item">
              <div className="info-icon"><MapPin /></div>
              <div>
                <strong>Alamat</strong>
                <p>{kontakData.alamat}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Mail /></div>
              <div>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${kontakData.email}`}>{kontakData.email}</a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><AtSign /></div>
              <div>
                <strong>Instagram</strong>
                <p>{kontakData.instagram}</p>
              </div>
            </div>

            <div className="info-item">
              {/* Using a general icon for Tiktok since lucide doesn't have it natively sometimes */}
              <div className="info-icon"><span style={{ fontWeight: 'bold' }}>T</span></div>
              <div>
                <strong>TikTok</strong>
                <p>{kontakData.tiktok}</p>
              </div>
            </div>
          </div>

          <div className="kontak-form-wrapper">
            <h3 className="kontak-form-title">Kirim Pesan (Email)</h3>
            <form
              className="kontak-form"
              action={`mailto:${kontakData.email}`}
              method="POST"
              encType="text/plain"
            >
              <div className="form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <input type="text" id="name" name="name" placeholder="Masukkan nama Anda" required />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subjek</label>
                <input type="text" id="subject" name="subject" placeholder="Perihal pesan" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Pesan</label>
                <textarea id="message" name="message" rows={5} placeholder="Tuliskan pesan Anda..." required></textarea>
              </div>

              <Button type="submit" variant="primary" className="btn-full">
                <Send size={18} /> Kirim via Aplikasi Email
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
