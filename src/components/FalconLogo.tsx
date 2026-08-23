import React from 'react';
import './FalconLogo.css';
import falconMark from '../logo.svg';

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
          src={falconMark}
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
