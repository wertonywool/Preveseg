import React from 'react';
import logoImg from '../../assets/logo.png';

interface PrevesegLogoProps {
  className?: string;
  showTagline?: boolean;
  tagline?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PrevesegLogo: React.FC<PrevesegLogoProps> = ({ 
  className = '', 
  showTagline = true,
  tagline = 'SOLUCIONES QUE PROTEGEN',
  size = 'md'
}) => {
  const iconSizes = {
    sm: 34,
    md: 44,
    lg: 54
  };

  const titleSizes = {
    sm: '1.15rem',
    md: '1.45rem',
    lg: '1.85rem'
  };

  const currentIconSize = iconSizes[size];

  return (
    <div className={`preveseg-brand-logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* OFFICIAL LOGO ICON */}
      <div 
        className="brand-shield-wrapper" 
        style={{
          width: `${currentIconSize}px`,
          height: `${currentIconSize}px`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <img 
          src={logoImg} 
          alt="Preveseg Logo" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain' 
          }} 
        />
      </div>

      {/* TYPOGRAPHY */}
      <div className="brand-text-block" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span 
          className="brand-name-title" 
          style={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: titleSizes[size], 
            fontWeight: 900, 
            letterSpacing: '-0.02em',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'baseline'
          }}
        >
          PREVE<span style={{ color: '#ee1b24', marginLeft: '1px' }}>SEG</span>
        </span>
        {showTagline && (
          <span 
            className="brand-tagline-text" 
            style={{ 
              fontSize: size === 'sm' ? '0.58rem' : '0.64rem', 
              fontWeight: 800, 
              color: '#94a3b8', 
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginTop: '4px'
            }}
          >
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};

export default PrevesegLogo;
