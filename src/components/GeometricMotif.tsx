import React from 'react';

/**
 * Minimal, restrained Islamic geometric 8-point star (Khatam) and concentric lattice SVG.
 * Uses CSS variables and currentColor so it adapts seamlessly between Dark and Light themes.
 */
export const IslamicGeometricOrnament: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        {/* Outer subtle rings */}
        <circle cx="200" cy="200" r="184" strokeDasharray="3 6" opacity="0.45" />
        <circle cx="200" cy="200" r="152" opacity="0.6" />
        <circle cx="200" cy="200" r="112" opacity="0.45" />

        {/* Classic 8-fold Khatam interlocking squares */}
        <rect
          x="92"
          y="92"
          width="216"
          height="216"
          rx="14"
          transform="rotate(0 200 200)"
        />
        <rect
          x="92"
          y="92"
          width="216"
          height="216"
          rx="14"
          transform="rotate(45 200 200)"
        />

        {/* Inner 8-fold star */}
        <rect
          x="132"
          y="132"
          width="136"
          height="136"
          rx="10"
          transform="rotate(22.5 200 200)"
          opacity="0.7"
        />
        <rect
          x="132"
          y="132"
          width="136"
          height="136"
          rx="10"
          transform="rotate(67.5 200 200)"
          opacity="0.7"
        />

        {/* Subtle cardinal axes */}
        <line x1="200" y1="16" x2="200" y2="68" opacity="0.4" />
        <line x1="200" y1="332" x2="200" y2="384" opacity="0.4" />
        <line x1="16" y1="200" x2="68" y2="200" opacity="0.4" />
        <line x1="332" y1="200" x2="384" y2="200" opacity="0.4" />

        {/* Center tranquil ring */}
        <circle cx="200" cy="200" r="34" />
        <circle cx="200" cy="200" r="10" opacity="0.8" />
      </g>
    </svg>
  );
};

/**
 * Animated glowing atmospheric background with emerald-green ambient light,
 * soft ice-blue illumination, and faint cool-white highlights that fade naturally
 * into the canvas without extending page bounds or blocking interaction.
 */
export const AmbientAtmosphere: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none zikr-anim-fade"
    >
      {/* Top-Start Emerald & Ice-Blue Ambient Diffusion */}
      <div
        className="zikr-ambient-orb-1 absolute -top-[18%] -start-[12%] h-[62vw] max-h-[42rem] w-[62vw] max-w-[42rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 45% 45%, var(--ambient-emerald) 0%, var(--ambient-ice) 42%, transparent 74%)',
        }}
      />

      {/* Center-End Soft Ice-Blue & Cool-White Illumination */}
      <div
        className="zikr-ambient-orb-2 absolute top-[14%] -end-[14%] h-[58vw] max-h-[40rem] w-[58vw] max-w-[40rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, var(--ambient-ice) 0%, var(--ambient-white) 38%, transparent 72%)',
        }}
      />

      {/* Lower Atmospheric Horizon Glow */}
      <div
        className="zikr-ambient-orb-1 absolute -bottom-[22%] left-1/2 -translate-x-1/2 h-[48vw] max-h-[34rem] w-[78vw] max-w-[56rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, var(--ambient-emerald) 0%, var(--ambient-deep) 52%, transparent 76%)',
        }}
      />
    </div>
  );
};
