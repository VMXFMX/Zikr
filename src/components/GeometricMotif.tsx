import React from 'react';
import { usePreferences, ViewId } from '../context/PreferencesContext';

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

        {/* Classic 8-fold Khatam interlocking squares with slow celestial rotation */}
        <g className="zikr-spin-slow origin-[200px_200px]">
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
        </g>

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

interface StarParticle {
  top: string;
  left: string;
  size: '2px' | '2.5px' | '3px' | '3.5px';
  tone: 'emerald' | 'ice' | 'white';
  mode:
    | 'zikr-star-calm'
    | 'zikr-star-rare'
    | 'zikr-flicker-glimmer'
    | 'zikr-particle-drift';
  duration: string;
  delay: string;
}

interface FlickerPulseZone {
  top: string;
  left: string;
  width: string;
  height: string;
  tone: 'emerald' | 'ice' | 'mixed';
  duration: string;
  delay: string;
}

/**
 * Irregular, non-synchronized ambient brightness pulse zones distributed across
 * the viewport so subtle atmospheric flickering and illumination changes continue
 * indefinitely across every section.
 */
const AMBIENT_FLICKER_PULSES: FlickerPulseZone[] = [
  {
    top: '6%',
    left: '12%',
    width: '34rem',
    height: '26rem',
    tone: 'emerald',
    duration: '6.7s',
    delay: '-1.4s',
  },
  {
    top: '14%',
    left: '58%',
    width: '32rem',
    height: '24rem',
    tone: 'ice',
    duration: '8.3s',
    delay: '-3.8s',
  },
  {
    top: '38%',
    left: '4%',
    width: '30rem',
    height: '24rem',
    tone: 'mixed',
    duration: '9.7s',
    delay: '-5.2s',
  },
  {
    top: '46%',
    left: '64%',
    width: '34rem',
    height: '26rem',
    tone: 'emerald',
    duration: '7.4s',
    delay: '-2.6s',
  },
  {
    top: '68%',
    left: '22%',
    width: '36rem',
    height: '24rem',
    tone: 'ice',
    duration: '10.9s',
    delay: '-6.9s',
  },
];

/**
 * Curated celestial glimmer particles placed across the viewport with varied
 * prime-like durations (4.3s - 9.8s) and negative delays so delicate glimmers
 * appear, shimmer, drift, and fade continuously without ever stopping or syncing.
 */
const AMBIENT_STAR_PARTICLES: StarParticle[] = [
  { top: '7%', left: '9%', size: '2.5px', tone: 'white', mode: 'zikr-flicker-glimmer', duration: '4.7s', delay: '-1.2s' },
  { top: '12%', left: '22%', size: '2px', tone: 'emerald', mode: 'zikr-star-rare', duration: '6.3s', delay: '-3.4s' },
  { top: '6%', left: '38%', size: '3px', tone: 'ice', mode: 'zikr-star-calm', duration: '5.4s', delay: '-2.1s' },
  { top: '10%', left: '54%', size: '2.5px', tone: 'emerald', mode: 'zikr-flicker-glimmer', duration: '7.1s', delay: '-4.8s' },
  { top: '8%', left: '71%', size: '3px', tone: 'white', mode: 'zikr-particle-drift', duration: '8.2s', delay: '-6.1s' },
  { top: '11%', left: '86%', size: '2.5px', tone: 'ice', mode: 'zikr-star-calm', duration: '5.9s', delay: '-1.7s' },
  { top: '19%', left: '6%', size: '2.5px', tone: 'ice', mode: 'zikr-particle-drift', duration: '7.6s', delay: '-5.0s' },
  { top: '22%', left: '31%', size: '2px', tone: 'white', mode: 'zikr-flicker-glimmer', duration: '4.9s', delay: '-2.9s' },
  { top: '20%', left: '78%', size: '3px', tone: 'emerald', mode: 'zikr-star-rare', duration: '6.8s', delay: '-4.1s' },
  { top: '25%', left: '93%', size: '2.5px', tone: 'white', mode: 'zikr-flicker-glimmer', duration: '5.2s', delay: '-3.5s' },
  { top: '33%', left: '4%', size: '3px', tone: 'emerald', mode: 'zikr-star-calm', duration: '6.5s', delay: '-1.9s' },
  { top: '36%', left: '18%', size: '2px', tone: 'ice', mode: 'zikr-flicker-glimmer', duration: '5.7s', delay: '-4.4s' },
  { top: '34%', left: '84%', size: '2.5px', tone: 'ice', mode: 'zikr-particle-drift', duration: '8.7s', delay: '-7.2s' },
  { top: '39%', left: '95%', size: '2px', tone: 'white', mode: 'zikr-star-rare', duration: '6.1s', delay: '-2.3s' },
  { top: '48%', left: '7%', size: '2.5px', tone: 'white', mode: 'zikr-flicker-glimmer', duration: '4.5s', delay: '-3.8s' },
  { top: '52%', left: '25%', size: '2px', tone: 'emerald', mode: 'zikr-star-calm', duration: '7.3s', delay: '-5.6s' },
  { top: '49%', left: '74%', size: '2.5px', tone: 'ice', mode: 'zikr-flicker-glimmer', duration: '5.1s', delay: '-1.5s' },
  { top: '54%', left: '92%', size: '3px', tone: 'emerald', mode: 'zikr-particle-drift', duration: '7.9s', delay: '-6.4s' },
  { top: '63%', left: '5%', size: '2.5px', tone: 'ice', mode: 'zikr-star-rare', duration: '6.4s', delay: '-4.7s' },
  { top: '66%', left: '16%', size: '2px', tone: 'white', mode: 'zikr-flicker-glimmer', duration: '4.8s', delay: '-2.2s' },
  { top: '64%', left: '82%', size: '2.5px', tone: 'white', mode: 'zikr-star-calm', duration: '6.9s', delay: '-5.3s' },
  { top: '69%', left: '94%', size: '2px', tone: 'emerald', mode: 'zikr-flicker-glimmer', duration: '5.5s', delay: '-3.1s' },
  { top: '76%', left: '10%', size: '3px', tone: 'ice', mode: 'zikr-particle-drift', duration: '8.4s', delay: '-2.7s' },
  { top: '80%', left: '29%', size: '2.5px', tone: 'emerald', mode: 'zikr-flicker-glimmer', duration: '5.3s', delay: '-4.9s' },
  { top: '78%', left: '68%', size: '2px', tone: 'white', mode: 'zikr-star-rare', duration: '6.6s', delay: '-1.8s' },
  { top: '83%', left: '88%', size: '3px', tone: 'ice', mode: 'zikr-flicker-glimmer', duration: '4.6s', delay: '-3.6s' },
  { top: '90%', left: '19%', size: '2.5px', tone: 'white', mode: 'zikr-star-calm', duration: '7.4s', delay: '-5.9s' },
  { top: '91%', left: '56%', size: '2.5px', tone: 'emerald', mode: 'zikr-particle-drift', duration: '8.9s', delay: '-4.2s' },
];

const VIEW_GLOW_TRANSFORMS: Record<
  ViewId,
  { primaryTransform: string; secondaryTransform: string }
> = {
  home: {
    primaryTransform: 'translate3d(0%, 0%, 0) scale(1)',
    secondaryTransform: 'translate3d(0%, 0%, 0) scale(1)',
  },
  about: {
    primaryTransform: 'translate3d(8%, 5%, 0) scale(1.05)',
    secondaryTransform: 'translate3d(-8%, -3%, 0) scale(1.04)',
  },
  features: {
    primaryTransform: 'translate3d(-10%, 8%, 0) scale(1.04)',
    secondaryTransform: 'translate3d(7%, -6%, 0) scale(1.05)',
  },
  download: {
    primaryTransform: 'translate3d(4%, 10%, 0) scale(1.06)',
    secondaryTransform: 'translate3d(-5%, 5%, 0) scale(1.02)',
  },
  faq: {
    primaryTransform: 'translate3d(0%, -5%, 0) scale(1.03)',
    secondaryTransform: 'translate3d(0%, 8%, 0) scale(1.04)',
  },
};

/**
 * Continuously animated atmospheric background with:
 * 1. Deep navy / near-black foundation (or serene ice-ivory in Light mode)
 * 2. Smooth, slowly moving gradient light waves
 * 3. Slowly moving emerald and ice-blue ambient light orbs at multi-speed depth
 * 4. Irregular, non-synchronized brightness flicker pulses that continue indefinitely
 * 5. Delicate glowing particle glimmers appearing, drifting, and fading continuously
 */
export const AmbientAtmosphere: React.FC = () => {
  const { activeView } = usePreferences();
  const viewShift = VIEW_GLOW_TRANSFORMS[activeView] || VIEW_GLOW_TRANSFORMS.home;

  const getToneStyle = (tone: StarParticle['tone']): React.CSSProperties => {
    if (tone === 'emerald') {
      return {
        backgroundColor: 'var(--particle-emerald-bg)',
        boxShadow: 'var(--particle-emerald-shadow)',
      };
    }
    if (tone === 'ice') {
      return {
        backgroundColor: 'var(--particle-ice-bg)',
        boxShadow: 'var(--particle-ice-shadow)',
      };
    }
    return {
      backgroundColor: 'var(--particle-lumen-bg)',
      boxShadow: 'var(--particle-lumen-shadow)',
    };
  };

  const getFlickerGradient = (tone: FlickerPulseZone['tone']): string => {
    if (tone === 'emerald') {
      return 'radial-gradient(circle at 50% 50%, var(--ambient-shimmer) 0%, var(--ambient-emerald-soft) 42%, transparent 74%)';
    }
    if (tone === 'ice') {
      return 'radial-gradient(circle at 50% 50%, var(--ambient-shimmer-ice) 0%, var(--ambient-ice-soft) 42%, transparent 74%)';
    }
    return 'radial-gradient(circle at 50% 50%, var(--ambient-shimmer) 0%, var(--ambient-shimmer-ice) 45%, transparent 75%)';
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none zikr-atmosphere-entrance"
      style={{ background: 'var(--ambient-foundation)' }}
    >
      {/* 1. Smooth, Slowly Moving Gradient Light Waves */}
      <div
        className="zikr-flowing-gradient absolute -inset-[18%]"
        style={{
          opacity: 'var(--flow-opacity, 0.88)',
          background: 'var(--ambient-flow-gradient)',
        }}
      />
      {/* 2. Multi-Depth Slowly Moving Emerald & Ice-Blue Ambient Light Orbs (Positioned safely away from header & footer) */}
      <div
        className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: viewShift.primaryTransform,
          opacity: 'var(--ambient-orb-opacity, 0.95)',
        }}
      >
        {/* Orb 1: Upper-Mid Emerald & Ice-Blue Diffusion Orb (Kept clear of header) */}
        <div
          className="zikr-ambient-orb-1 absolute top-[14%] -start-[4%] h-[52vw] max-h-[36rem] w-[52vw] max-w-[36rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 46% 46%, var(--ambient-emerald) 0%, var(--ambient-ice) 38%, var(--ambient-emerald-soft) 58%, transparent 76%)',
          }}
        />

        {/* Orb 4: Mid-Canvas Deep Counter-Drifting Emerald Orb for Continuous Parallax Depth */}
        <div
          className="zikr-ambient-orb-4 absolute top-[36%] start-[22%] h-[48vw] max-h-[34rem] w-[48vw] max-w-[34rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, var(--ambient-emerald-soft) 0%, var(--ambient-ice-soft) 44%, transparent 74%)',
          }}
        />
      </div>

      <div
        className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: viewShift.secondaryTransform,
          opacity: 'var(--ambient-orb-opacity, 0.95)',
        }}
      >
        {/* Orb 2: Center-End Ice-Blue & Cool-Lumen Illumination Orb */}
        <div
          className="zikr-ambient-orb-2 absolute top-[20%] -end-[8%] h-[54vw] max-h-[38rem] w-[54vw] max-w-[38rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, var(--ambient-ice) 0%, var(--ambient-white) 38%, var(--ambient-ice-soft) 58%, transparent 76%)',
          }}
        />
      </div>

      {/* Orb 3: Mid-Lower Horizon Emerald & Deep Navy Glow Orb (Kept clear of footer) */}
      <div
        className="zikr-ambient-orb-3 absolute top-[52%] left-[12%] right-[12%] mx-auto h-[44vw] max-h-[30rem] w-[70vw] max-w-[48rem] rounded-full"
        style={{
          opacity: 'var(--ambient-orb-opacity, 0.95)',
          background:
            'radial-gradient(ellipse at 50% 50%, var(--ambient-emerald) 0%, var(--ambient-ice-soft) 42%, var(--ambient-deep) 62%, transparent 78%)',
        }}
      />

      {/* 3. Continuous, Irregular Brightness Flicker Pulses */}
      <div className="absolute inset-0">
        {AMBIENT_FLICKER_PULSES.map((pulse, idx) => (
          <div
            key={idx}
            className="zikr-area-shimmer absolute rounded-full"
            style={
              {
                top: pulse.top,
                left: pulse.left,
                width: pulse.width,
                height: pulse.height,
                '--shimmer-duration': pulse.duration,
                '--shimmer-delay': pulse.delay,
                background: getFlickerGradient(pulse.tone),
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* 4. Continuously Looping Subtle Glowing Particles & Organic Glimmers */}
      <div
        className="absolute inset-0"
        style={{ opacity: 'var(--star-opacity-scale, 1)' }}
      >
        {AMBIENT_STAR_PARTICLES.map((star, idx) => (
          <span
            key={idx}
            className={`absolute rounded-full ${star.mode}`}
            style={
              {
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                '--star-duration': star.duration,
                '--star-delay': star.delay,
                ...getToneStyle(star.tone),
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};
