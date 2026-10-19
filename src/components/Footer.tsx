import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { usePreferences } from '../context/PreferencesContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { ZikrEmblem } from './ZikrLogo';
import { OFFICIAL_SOCIAL_LINKS } from '../config/socialsConfig';
import {
  TikTokIcon,
  TelegramIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from './SocialIcons';

export const Footer: React.FC = () => {
  const { language, setLanguage, t, theme, setTheme, setActiveView } = usePreferences();

  const renderFooterIcon = (platform: string, className = 'h-3.5 w-3.5 sm:h-4 sm:w-4') => {
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
    <footer
      className="pointer-events-none fixed bottom-0 inset-x-0 z-40 w-full min-w-0 px-2.5 pt-1 pb-2.5 sm:px-6 sm:pt-2 sm:pb-3.5 lg:px-8 zikr-footer-entrance"
    >
      {/* Primary Content Row */}
      <div
        className="zikr-floating-bar pointer-events-auto mx-auto flex flex-wrap max-w-6xl min-w-0 items-center justify-between gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2"
      >
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => {
              setActiveView('home');
              const mainEl = document.getElementById('main-content');
              if (mainEl) {
                mainEl.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            dir="ltr"
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full py-0.5 pe-1 sm:pe-1.5 font-brand text-xs sm:text-sm font-bold tracking-[0.18em] text-[var(--text-primary)] transition-opacity hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 shrink-0 cursor-pointer"
          >
            <ZikrEmblem size="xs" />
            <span>ZIKR</span>
          </button>
          <span aria-hidden="true" className="hidden md:inline text-[var(--text-muted)]">
            ·
          </span>
          <p className="hidden md:block truncate text-xs text-[var(--text-muted)]">
            {t.footer.closingMessage}
          </p>
        </div>

        {/* Compact Language & Appearance Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="zikr-pill-track inline-flex items-center gap-0.5 rounded-full p-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const active = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  lang={lang.code}
                  dir={lang.dir}
                  onClick={() => setLanguage(lang.code)}
                  className={`relative rounded-full px-2 sm:px-2.5 py-1 text-[10.5px] sm:text-[11px] font-medium leading-[1.4] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer ${
                    active
                      ? 'font-semibold text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="footer-lang-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="zikr-nav-item-active absolute inset-0 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{lang.nativeLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="zikr-pill-track hidden sm:inline-flex items-center gap-0.5 rounded-full p-0.5">
            <button
              type="button"
              onClick={() => setTheme('dark')}
              aria-label={t.a11y.switchToDark}
              className={`relative inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium leading-[1.4] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer ${
                theme === 'dark'
                  ? 'font-semibold text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {theme === 'dark' && (
                <motion.span
                  layoutId="footer-theme-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="zikr-nav-item-active absolute inset-0 rounded-full"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-1">
                <Moon className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                <span>{t.nav.themeDark}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              aria-label={t.a11y.switchToLight}
              className={`relative inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium leading-[1.4] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer ${
                theme === 'light'
                  ? 'font-semibold text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {theme === 'light' && (
                <motion.span
                  layoutId="footer-theme-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="zikr-nav-item-active absolute inset-0 rounded-full"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-1">
                <Sun className="h-3 w-3 text-emerald-500" aria-hidden="true" />
                <span>{t.nav.themeLight}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Compact Row of Official Social Icons */}
      <div className="pointer-events-auto mx-auto mt-2 flex items-center justify-center gap-2 sm:gap-2.5">
        {OFFICIAL_SOCIAL_LINKS.map((item) => {
          const label = item.label[language] || item.label.en;
          const aria = item.ariaLabel[language] || `${label}: ${item.handle}`;
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={aria}
              className="group relative inline-flex items-center justify-center h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-full bg-transparent border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/15 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
            >
              {renderFooterIcon(item.platform, 'h-3.5 w-3.5 sm:h-4 sm:w-4')}
            </a>
          );
        })}
      </div>

      {/* Footer Closing / Copyright Text */}
      <p className="pointer-events-auto mt-1.5 text-center text-[10.5px] sm:text-[11px] text-[var(--text-muted)] tracking-wide">
        {t.footer.closingMessage}
      </p>
    </footer>
  );
};
