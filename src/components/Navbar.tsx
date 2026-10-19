import React, { useEffect, useRef, useState } from 'react';
import {
  Globe,
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
  Home,
  Sparkles,
  Compass,
  HelpCircle,
  Download,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePreferences, ViewId } from '../context/PreferencesContext';
import { LanguageCode, SUPPORTED_LANGUAGES } from '../i18n/translations';
import { ZikrEmblem } from './ZikrLogo';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, theme, toggleTheme, activeView, setActiveView } =
    usePreferences();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const navItems: { id: ViewId; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: t.nav.home,
      icon: <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
    },
    {
      id: 'about',
      label: t.nav.about,
      icon: <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
    },
    {
      id: 'features',
      label: t.nav.features,
      icon: <Compass className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
    },
    {
      id: 'faq',
      label: t.nav.faq,
      icon: <HelpCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
    },
    {
      id: 'download',
      label: t.nav.download,
      icon: <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
    },
  ];

  const currentLangMeta =
    SUPPORTED_LANGUAGES.find((item) => item.code === language) ?? SUPPORTED_LANGUAGES[0];

  // Close language dropdown on outside click or Escape
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLanguageSelect = (code: LanguageCode) => {
    setLanguage(code);
    setLangMenuOpen(false);
  };

  const handleNavSelect = (viewId: ViewId) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    const mainEl = document.getElementById('main-content');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isNavItemActive = (id: ViewId) => activeView === id;

  return (
    <header
      className="pointer-events-none fixed top-0 inset-x-0 z-50 w-full min-w-0 px-2.5 pt-2 pb-1 sm:px-6 sm:pt-3 sm:pb-1 lg:px-8 zikr-navbar-entrance"
    >
      <div
        className="zikr-floating-bar pointer-events-auto mx-auto flex min-h-14 sm:min-h-16 max-w-6xl min-w-0 items-center justify-between gap-1.5 sm:gap-4 px-3 py-1.5 sm:px-5"
      >
        {/* Zone 1: Brand Emblem & Wordmark */}
        <button
          type="button"
          onClick={() => handleNavSelect('home')}
          dir="ltr"
          className="group inline-flex items-center gap-2 sm:gap-2.5 rounded-full py-1 pe-1.5 sm:pe-2 font-brand text-xs sm:text-base font-bold tracking-[0.18em] text-[var(--text-primary)] transition-all hover:opacity-95 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <ZikrEmblem size="sm" />
          <span>ZIKR</span>
        </button>

        {/* Zone 2: Desktop Navigation Pill Bar (Icon + Page Name Directly Beneath Inside Top Bar Only) */}
        <nav
          aria-label={t.a11y.mainNav}
          className="zikr-pill-track hidden md:flex items-center gap-1 rounded-full p-1"
        >
          {navItems.map((item) => {
            const active = isNavItemActive(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavSelect(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`group relative inline-flex flex-col items-center justify-center rounded-full px-3.5 lg:px-4 py-1 text-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'font-semibold text-[var(--text-primary)]'
                    : 'font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="zikr-nav-item-active absolute inset-0 rounded-full"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex flex-col items-center justify-center gap-0.5">
                  <span
                    className={`transition-colors duration-200 ${
                      active
                        ? 'text-emerald-400 font-bold'
                        : 'text-[var(--text-muted)] group-hover:text-emerald-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[11px] lg:text-xs leading-[1.38]">{item.label}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Selector, Theme Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Dropdown */}
          <div className="language-selector-wrapper relative inline-block shrink-0" ref={langDropdownRef}>
            <button
              id="langToggleBtn"
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              aria-expanded={langMenuOpen}
              aria-haspopup="listbox"
              aria-label={t.a11y.languageSelector}
              className={`lang-trigger-btn zikr-control-pill inline-flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-3.5 text-xs font-medium leading-[1.4] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 whitespace-nowrap shrink-0 cursor-pointer ${
                langMenuOpen ? 'zikr-nav-item-active' : ''
              }`}
            >
              <Globe className="h-3.5 w-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
              <span id="currentLangText" lang={currentLangMeta.code} dir={currentLangMeta.dir}>
                {currentLangMeta.nativeLabel}
              </span>
              <ChevronDown
                className={`h-3 w-3 text-[var(--text-muted)] transition-transform duration-200 shrink-0 ${
                  langMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  id="langDropdownMenu"
                  role="listbox"
                  aria-label={t.a11y.languageSelector}
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="lang-dropdown-menu"
                >
                  {/* ONLY list alternative/selectable languages here, NOT the currently active one */}
                  {SUPPORTED_LANGUAGES.filter((item) => item.code !== language).map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      data-lang={lang.code}
                      lang={lang.code}
                      dir={lang.dir}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className="lang-option"
                    >
                      <span>{lang.nativeLabel}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.a11y.switchToLight : t.a11y.switchToDark}
            title={theme === 'dark' ? t.a11y.switchToLight : t.a11y.switchToDark}
            className="zikr-control-pill relative inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 shrink-0 cursor-pointer overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center justify-center"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="zikr-mobile-menu"
            aria-label={mobileMenuOpen ? t.a11y.closeMobileMenu : t.a11y.openMobileMenu}
            className={`zikr-control-pill relative inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[var(--text-primary)] md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 shrink-0 cursor-pointer overflow-hidden ${
              mobileMenuOpen ? 'zikr-nav-item-active' : ''
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? 'open' : 'closed'}
                initial={{ opacity: 0, rotate: -30, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.85 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                ) : (
                  <Menu className="h-4 w-4" aria-hidden="true" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="zikr-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.a11y.mainNav}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-40 bg-black/60 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mx-3 sm:mx-4 mt-2 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-[1.75rem] sm:rounded-[2rem] p-3.5 sm:p-4 shadow-2xl bg-[var(--bg-surface-strong)] backdrop-blur-xl border border-[var(--border-glass-highlight)]"
              onClick={(e) => e.stopPropagation()}
            >
              <nav aria-label={t.a11y.mainNav} className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const active = isNavItemActive(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavSelect(item.id)}
                      className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-emerald-500 cursor-pointer ${
                        active
                          ? 'zikr-nav-item-active font-semibold'
                          : 'text-[var(--text-secondary)] hover:bg-slate-500/10 hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5 text-start">
                        <span className={active ? 'text-emerald-400 shrink-0' : 'text-[var(--text-muted)] shrink-0'}>
                          {item.icon}
                        </span>
                        <span className="break-words">{item.label}</span>
                      </span>
                      {active && (
                        <span
                          className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="my-3.5 h-px bg-[var(--border-glass)]" />

              {/* Mobile Language Selection */}
              <div className="space-y-2">
                <p className="px-2 text-xs font-medium text-[var(--text-muted)]">
                  {t.nav.languageLabel}
                </p>
                <div className="zikr-pill-track grid grid-cols-3 gap-1 rounded-3xl sm:rounded-full p-1">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const active = lang.code === language;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        lang={lang.code}
                        dir={lang.dir}
                        onClick={() => {
                          setLanguage(lang.code);
                          setMobileMenuOpen(false);
                        }}
                        className={`rounded-full px-2 py-2 text-[11px] sm:text-xs font-medium leading-[1.4] transition-all text-center truncate cursor-pointer ${
                          active
                            ? 'zikr-nav-item-active font-semibold'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {lang.nativeLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

