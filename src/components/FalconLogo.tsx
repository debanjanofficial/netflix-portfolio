import React from 'react';
import './FalconLogo.css';

interface FalconLogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const FalconLogo: React.FC<FalconLogoProps> = ({ showText = true, size = 'medium' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'falcon-logo-small';
      case 'large':
        return 'falcon-logo-large';
      default:
        return '';
    }
  };

  return (
    <div className="falcon-logo-container">
      <div className={`falcon-logo ${getSizeClass()}`}>
        <img 
          src="/logo.png" 
          alt="Falcon Logo" 
          className="falcon-logo-image"
        />
      </div>
      {showText && (
        <div className="falcon-logo-text">
          Debanjan
        </div>
      )}
    </div>
  );
};

export default FalconLogo;
