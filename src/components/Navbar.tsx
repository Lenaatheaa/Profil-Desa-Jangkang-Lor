import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { identitasData } from '../data/identitas';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Data', href: '#data' },
    { name: 'Fasilitas', href: '#fasilitas' },
    { name: 'Galeri', href: '#galeri' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#beranda" className="navbar-logo" onClick={closeMenu}>
          {identitasData.namaPadukuhan}
        </a>

        {/* Desktop Menu */}
        <nav className="navbar-desktop">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">{link.name}</a>
              </li>
            ))}
            <li>
              <a href="/admin/login" className="nav-link nav-link-admin">
                Admin
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${isOpen ? 'open' : ''}`}>
        <ul className="nav-list-mobile">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="nav-link-mobile" onClick={closeMenu}>
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a href="/admin/login" className="nav-link-mobile nav-link-admin-mobile" onClick={closeMenu}>
              Login Admin
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
