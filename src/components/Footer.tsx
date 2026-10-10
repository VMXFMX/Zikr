import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { usePreferences } from '../context/PreferencesContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { ZikrEmblem } from './ZikrLogo';

export const Footer: React.FC = () => {
  const { language, setLanguage, t, theme, setTheme, setActiveView } = usePreferences();

  return (
    <footer className="relative z-30 w-full shrink-0 px-3 pt-1 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
      <div className="zikr-floating-bar mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2">
        {/* Brand & Closing Message */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => setActiveView('home')}
            dir="ltr"
            className="inline-flex items-center gap-2 rounded-full py-0.5 pe-1.5 font-brand text-xs sm:text-sm font-bold tracking-[0.18em] text-[var(--text-primary)] transition-opacity hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 shrink-0 cursor-pointer"
          >
            <ZikrEmblem size="sm" className="h-6 w-6" />
            <span>ZIKR</span>
          </button>
          <span aria-hidden="true" className="hidden md:inline text-[var(--text-muted)]">
            ·
          </span>
          <p className="hidden md:block truncate text-xs text-[var(--text-muted)]">
            {t.footer.closingMessage}
          </p>
        </div>

        {/* Compact Language & Appearance Controls (No Page Links in Bottom Bar) */}
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
                  className={`relative rounded-full px-2.5 py-1 text-[11px] font-medium leading-[1.4] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer ${
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
    </footer>
  );
};

