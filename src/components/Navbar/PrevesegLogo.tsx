import React from 'react';

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
      {/* SHIELD WITH EXTINGUISHER ICON */}
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
        <svg 
          viewBox="0 0 100 115" 
          width={currentIconSize} 
          height={currentIconSize} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Shield Path */}
          <path 
            d="M50 4L10 20V58C10 82 27 103 50 111C73 103 90 82 90 58V20L50 4Z" 
            fill="#0c0d10" 
            stroke="#ee1b24" 
            strokeWidth="6" 
            strokeLinejoin="round"
          />
          {/* Inner Glow Border */}
          <path 
            d="M50 12L18 25V58C18 78 32 95 50 102C68 95 82 78 82 58V25L50 12Z" 
            stroke="#ee1b24" 
            strokeOpacity="0.35" 
            strokeWidth="2"
          />
          {/* Fire Extinguisher Body (White silhouette) */}
          <rect x="39" y="44" width="22" height="42" rx="6" fill="#ffffff" />
          {/* Base plate */}
          <rect x="37" y="83" width="26" height="4" rx="2" fill="#ee1b24" />
          {/* Cylinder Top Neck */}
          <path d="M44 44V38H56V44H44Z" fill="#ffffff" />
          {/* Valve & Lever Handle */}
          <path d="M47 38V32H53V38H47Z" fill="#ffffff" />
          <path d="M41 33H59L63 29H43L41 33Z" fill="#ffffff" />
          {/* Gauge & Nozzle */}
          <circle cx="50" cy="30" r="3" fill="#ee1b24" />
          {/* Hose curve */}
          <path d="M57 36C65 37 67 47 67 55V72" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {/* Fire Flame Icon inside Cylinder */}
          <path 
            d="M50 54C47 58 45 61 45 66C45 71 47.5 74 50 74C52.5 74 55 71 55 66C55 63 53.5 60 52 58C52 61 51 63 50 63C49 63 48.5 61 49 59C49.5 57 50.5 55 50 54Z" 
            fill="#ee1b24" 
          />
        </svg>
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
