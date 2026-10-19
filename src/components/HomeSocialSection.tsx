import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { OFFICIAL_SOCIAL_LINKS, OfficialSocialLink } from '../config/socialsConfig';
import {
  TikTokIcon,
  TelegramIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from './SocialIcons';

interface PlatformBadgeStyle {
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  hoverCardBorder: string;
  hoverCardShadow: string;
}

const PLATFORM_STYLES: Record<string, PlatformBadgeStyle> = {
  tiktok: {
    badgeBg: 'bg-rose-500/10',
    badgeBorder: 'border-rose-500/20',
    badgeText: 'text-rose-400',
    hoverCardBorder: 'hover:border-rose-500/40',
    hoverCardShadow: 'hover:shadow-[0_12px_28px_-6px_rgba(244,63,94,0.25)]',
  },
  telegram: {
    badgeBg: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/20',
    badgeText: 'text-sky-400',
    hoverCardBorder: 'hover:border-sky-500/40',
    hoverCardShadow: 'hover:shadow-[0_12px_28px_-6px_rgba(56,189,248,0.25)]',
  },
  facebook: {
    badgeBg: 'bg-blue-500/10',
    badgeBorder: 'border-blue-500/20',
    badgeText: 'text-blue-400',
    hoverCardBorder: 'hover:border-blue-500/40',
    hoverCardShadow: 'hover:shadow-[0_12px_28px_-6px_rgba(59,130,246,0.25)]',
  },
  instagram: {
    badgeBg: 'bg-pink-500/10',
    badgeBorder: 'border-pink-500/20',
    badgeText: 'text-pink-400',
    hoverCardBorder: 'hover:border-pink-500/40',
    hoverCardShadow: 'hover:shadow-[0_12px_28px_-6px_rgba(236,72,153,0.25)]',
  },
  x: {
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/20',
    badgeText: 'text-emerald-400',
    hoverCardBorder: 'hover:border-emerald-500/40',
    hoverCardShadow: 'hover:shadow-[0_12px_28px_-6px_rgba(16,185,129,0.25)]',
  },
};

export const HomeSocialSection: React.FC = () => {
  const { t, language } = usePreferences();

  const renderIcon = (platform: string, className = 'h-5 w-5 sm:h-5.5 sm:w-5.5') => {
    switch (platform) {
      case 'tiktok':
        return <TikTokIcon className={className} />;
      case 'telegram':
        return <TelegramIcon className={className} />;
      case 'facebook':
        return <FacebookIcon className={className} />;
      case 'instagram':
        return <InstagramIcon className={className} />;
      case 'x':
      default:
        return <XIcon className={className} />;
    }
  };

  return (
    <section
      id="social-media"
      aria-labelledby="home-socials-heading"
      className="relative w-full min-w-0 py-12 sm:py-16 lg:py-20 zikr-section-divider overflow-hidden"
    >
      {/* Subtle Ambient Illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-emerald) 0%, var(--ambient-ice) 55%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-ice) 0%, var(--ambient-emerald-soft) 50%, transparent 75%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Entrance */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Subtle Tag Pill */}
          <div
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-400"
          >
            <span
              className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
              aria-hidden="true"
            />
            <span>{t.socials.sectionIndex}</span>
          </div>

          {/* Section Main Heading */}
          <h2
            id="home-socials-heading"
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '70ms' } as React.CSSProperties}
            className="zikr-heading-section mt-3.5 text-[var(--text-primary)]"
          >
            {t.socials.heading}
          </h2>

          {/* Section Subtitle */}
          <p
            data-zikr-reveal="editorial"
            style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
            className="zikr-body-lead mt-2.5 text-[var(--text-secondary)]"
          >
            {t.socials.subtitle}
          </p>
        </div>

        {/* All Five Social Channels in One Balanced Row on Desktop */}
        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-4.5">
          {OFFICIAL_SOCIAL_LINKS.map((item: OfficialSocialLink, idx: number) => {
            const style = PLATFORM_STYLES[item.platform] || PLATFORM_STYLES.x;
            const label = item.label[language] || item.label.en;
            const aria = item.ariaLabel[language] || `${label}: ${item.handle}`;

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aria}
                data-zikr-reveal="card"
                style={{ '--reveal-delay': `${200 + idx * 60}ms` } as React.CSSProperties}
                className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-4 sm:p-5 zikr-glass zikr-glass-subcard border border-[var(--border-subtle)] ${style.hoverCardBorder} ${style.hoverCardShadow} transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`}
              >
                {/* Subtle Moving Glass Shimmer on Hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <div className="zikr-glass-shimmer absolute inset-0" />
                </div>

                {/* Top: Platform Icon & Arrow Indicator */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span
                    className={`inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl ${style.badgeBg} ${style.badgeBorder} border ${style.badgeText} shadow-sm group-hover:scale-110 group-active:scale-95 transition-transform duration-200`}
                  >
                    {renderIcon(item.platform)}
                  </span>

                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-[var(--bg-primary)]/40 text-[var(--text-muted)] group-hover:text-emerald-400 group-hover:bg-emerald-500/10 border border-[var(--border-subtle)] group-hover:border-emerald-500/30 transition-all duration-200"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                {/* Bottom: Platform Name & Handle */}
                <div className="relative z-10 mt-4 pt-2 border-t border-[var(--border-subtle)]/70 w-full min-w-0">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors truncate">
                    {label}
                  </h3>
                  <p
                    dir="ltr"
                    className="mt-0.5 text-xs font-mono font-medium text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors truncate text-start"
                  >
                    {item.handle}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
