import React, { useEffect, useState } from 'react';

/**
 * Single source of truth for the official ZIKR logo / PFP asset.
 * Uses the official asset in /zikr-logo.svg (and supports /zikr.jpg if present in public
 * or loaded by the user) across header navigation, hero, overview, download, footer,
 * browser favicon, Apple touch icon, and social sharing preview cards.
 */
export const ZIKR_OFFICIAL_LOGO_PATH = '/zikr-logo.svg';
export const ZIKR_OFFICIAL_LOGO_DATA_URI = ZIKR_OFFICIAL_LOGO_PATH;

export const ZIKR_LOGO_CANDIDATE_PATHS = [
  '/zikr.jpg',
  ZIKR_OFFICIAL_LOGO_PATH,
] as const;

export const ZIKR_LOGO_PFP_PATH = ZIKR_OFFICIAL_LOGO_PATH;
export const ZIKR_WEB_HEADER_PATH = ZIKR_OFFICIAL_LOGO_PATH;

const LEGACY_LOGO_STORAGE_KEY = 'zikr_official_logo_pfp_data_url';
const LOGO_STORAGE_KEY = 'zikr_official_logo_v2_data_url';

// Purge any legacy cached logo from earlier sessions so outdated assets never persist
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem(LEGACY_LOGO_STORAGE_KEY);
  } catch {
    // Ignore storage access restrictions
  }
}

let cachedResolvedLogoSrc: string | null = null;
const logoListeners = new Set<(src: string) => void>();

function syncDocumentBrandingIcons(resolvedHref: string) {
  if (typeof document === 'undefined' || !resolvedHref) return;

  const iconLinks = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
  );
  iconLinks.forEach((link) => {
    if (link.getAttribute('href') !== resolvedHref) {
      link.setAttribute('href', resolvedHref);
    }
  });

  const metaSelectors = ['meta[property="og:image"]', 'meta[name="twitter:image"]'];
  metaSelectors.forEach((selector) => {
    const meta = document.querySelector<HTMLMetaElement>(selector);
    if (meta && meta.getAttribute('content') !== resolvedHref) {
      meta.setAttribute('content', resolvedHref);
    }
  });
}

export function setCustomZikrLogoDataUrl(dataUrl: string) {
  if (!dataUrl || !dataUrl.startsWith('data:image/')) return;
  cachedResolvedLogoSrc = dataUrl;
  try {
    localStorage.setItem(LOGO_STORAGE_KEY, dataUrl);
  } catch {
    // Ignore storage quota errors
  }
  syncDocumentBrandingIcons(dataUrl);
  logoListeners.forEach((listener) => listener(dataUrl));
}

function getInitialLogoSrc(): string | null {
  if (cachedResolvedLogoSrc) return cachedResolvedLogoSrc;
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LOGO_STORAGE_KEY);
      if (saved && saved.startsWith('data:image/')) {
        cachedResolvedLogoSrc = saved;
        return saved;
      }
    } catch {
      // Ignore storage access errors
    }
  }
  return null;
}

interface ZikrEmblemProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

export const ZikrEmblem: React.FC<ZikrEmblemProps> = ({ size = 'md', className = '', glow }) => {
  const [customSrc, setCustomSrc] = useState<string | null>(getInitialLogoSrc);
  const [fallbackToBuiltIn, setFallbackToBuiltIn] = useState<boolean>(false);

  useEffect(() => {
    const handleUpdate = (newSrc: string) => {
      setFallbackToBuiltIn(false);
      setCustomSrc(newSrc);
    };
    logoListeners.add(handleUpdate);
    return () => {
      logoListeners.delete(handleUpdate);
    };
  }, []);

  const sizeClasses = {
    xs: 'h-6 w-6',
    sm: 'h-9 w-9 sm:h-10 sm:w-10',
    md: 'h-11 w-11 sm:h-12 sm:w-12',
    lg: 'h-14 w-14 sm:h-16 sm:w-16',
    xl: 'h-32 w-32 sm:h-40 sm:w-40',
  }[size];

  const activeSrc =
    !fallbackToBuiltIn && customSrc ? customSrc : ZIKR_OFFICIAL_LOGO_PATH;

  useEffect(() => {
    syncDocumentBrandingIcons(activeSrc);
  }, [activeSrc]);

  const hasGlow = glow ?? (size === 'lg' || size === 'xl');

  return (
    <div
      className={`relative inline-flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#111314] select-none ${hasGlow ? 'zikr-breathing-glow' : ''} ${sizeClasses} ${className}`}
    >
      <img
        src={activeSrc}
        alt="ZIKR Official Logo"
        decoding="async"
        draggable={false}
        onLoad={() => {
          cachedResolvedLogoSrc = activeSrc;
          syncDocumentBrandingIcons(activeSrc);
        }}
        onError={() => {
          if (customSrc && !fallbackToBuiltIn) {
            try {
              localStorage.removeItem(LOGO_STORAGE_KEY);
            } catch {
              // Ignore storage errors
            }
            cachedResolvedLogoSrc = null;
            setFallbackToBuiltIn(true);
          }
        }}
        className="block h-full w-full object-contain object-center"
      />
    </div>
  );
};
