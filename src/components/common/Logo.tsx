import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  theme?: 'light' | 'dark';
  vertical?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  theme = 'dark',
  vertical = false,
}) => {
  // Dimensions for the icon
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  };

  const isDark = theme === 'dark'; // dark foreground on light background
  const primaryColor = isDark ? '#111827' : '#F9FAFB';
  const secondaryColor = isDark ? '#374151' : '#E5E7EB';
  const accentShade = isDark ? '#1F2937' : '#FFFFFF';

  return (
    <div
      className={`inline-flex ${vertical ? 'flex-col items-center text-center' : 'items-center gap-3.5'} ${className}`}
    >
      {/* Precision Geometric Isometric Cube Logo Mark (CW Lockup) */}
      <div className={`relative ${iconSizes[size]} shrink-0 transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 100 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Top Isometric Diamond Face */}
          <polygon
            points="50,4 92,28 50,52 8,28"
            fill={primaryColor}
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Left Face - Isometric "C" Glyph with Pivot/Handle Dot */}
          <g>
            {/* Outer isometric boundary of left face */}
            <polygon
              points="8,33 46,55 46,108 8,86"
              fill={primaryColor}
            />
            {/* Inner cutout creating the "C" character */}
            <polygon
              points="16,42 38,55 38,98 16,84"
              fill={isDark ? '#FFFFFF' : '#111827'}
            />
            {/* Central block inside C */}
            <polygon
              points="20,49 38,59 38,89 20,78"
              fill={primaryColor}
            />
            {/* Center negative aperture of C */}
            <polygon
              points="24,56 46,68 46,80 24,68"
              fill={isDark ? '#FFFFFF' : '#111827'}
            />
            {/* Precision origin point / dot on C */}
            <circle
              cx="41"
              cy="76"
              r="3.2"
              fill={primaryColor}
            />
          </g>

          {/* Right Face - Isometric "W" Glyphs */}
          <g>
            {/* Outer right face boundary */}
            <polygon
              points="54,55 92,33 92,86 54,108"
              fill={accentShade}
            />
            {/* W stroke cutouts */}
            <polygon
              points="60,62 67,58 67,100 60,104"
              fill={isDark ? '#FFFFFF' : '#111827'}
            />
            <polygon
              points="75,53 82,49 82,91 75,95"
              fill={isDark ? '#FFFFFF' : '#111827'}
            />
            {/* W connecting bridges */}
            <polygon
              points="67,90 75,85 75,95 67,100"
              fill={accentShade}
            />
          </g>

          {/* Isometric edge wireframe accent highlight */}
          <line
            x1="50"
            y1="52"
            x2="50"
            y2="112"
            stroke={isDark ? '#FFFFFF' : '#111827'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      {showText && (
        <div className={`flex flex-col ${vertical ? 'mt-2.5 items-center' : 'justify-center'}`}>
          <div
            className={`font-serif tracking-[0.32em] font-semibold select-none ${
              isDark ? 'text-neutral-900' : 'text-neutral-50'
            } ${
              size === 'sm'
                ? 'text-sm'
                : size === 'md'
                ? 'text-base sm:text-lg'
                : size === 'lg'
                ? 'text-xl'
                : 'text-2xl'
            }`}
            style={{ fontFamily: "'Cinzel', 'Noto Serif TC', serif" }}
          >
            立方工坊
          </div>
          <span
            className={`tracking-[0.16em] uppercase font-sans font-medium text-[10px] leading-tight select-none ${
              isDark ? 'text-neutral-500' : 'text-neutral-400'
            }`}
          >
            cubeworkshop
          </span>
        </div>
      )}
    </div>
  );
};
