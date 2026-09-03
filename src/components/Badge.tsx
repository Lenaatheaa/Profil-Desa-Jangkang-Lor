import React from 'react';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
};
