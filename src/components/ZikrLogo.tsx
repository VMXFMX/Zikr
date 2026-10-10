import React from 'react';
import zikrOfficialLogo from '../assets/images/zikr_logo_pfp_1791617547914.jpg';

export const ZIKR_LOGO_PFP_PATH = zikrOfficialLogo;
export const ZIKR_WEB_HEADER_PATH = zikrOfficialLogo;

interface ZikrEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ZikrEmblem: React.FC<ZikrEmblemProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-20 w-20',
    xl: 'h-32 w-32 sm:h-40 sm:w-40',
  }[size];

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-emerald-500/30 bg-[#0B121C] shadow-md ${sizeClasses} ${className}`}
    >
      <img
        src={ZIKR_LOGO_PFP_PATH}
        alt="ZIKR Official Logo"
        decoding="async"
        className="h-full w-full rounded-full object-cover"
      />
    </div>
  );
};
