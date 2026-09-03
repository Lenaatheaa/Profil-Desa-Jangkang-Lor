import React from 'react';
import './SectionHeading.css';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="section-heading-container">
      <h2 className="section-title">{title}</h2>
      <div className="section-divider"></div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};
