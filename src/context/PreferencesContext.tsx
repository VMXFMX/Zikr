import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  LanguageCode,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
  TranslationContent,
} from '../i18n/translations';

export type ThemeMode = 'dark' | 'light';
export type ViewId = 'home' | 'about' | 'features' | 'download' | 'faq';

interface PreferencesContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  dir: 'rtl' | 'ltr';
  t: TranslationContent;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  activeView: ViewId;
  setActiveView: (view: ViewId) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

const STORAGE_LANG_KEY = 'zikr-lang';
const STORAGE_THEME_KEY = 'zikr-theme';

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'ar';
  try {
    const saved = localStorage.getItem(STORAGE_LANG_KEY);
    if (saved === 'ar' || saved === 'en' || saved === 'am') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'ar';
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(STORAGE_THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // Ignore storage access errors
  }
  return 'dark';
}

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [activeView, setActiveView] = useState<ViewId>('home');

  const langMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language) ?? SUPPORTED_LANGUAGES[0];
  const dir = langMeta.dir;
  const t = TRANSLATIONS[language];

  const setLanguage = (nextLang: LanguageCode) => {
    setLanguageState(nextLang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, nextLang);
    } catch {
      // Ignore storage errors
    }
  };

  const setTheme = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, nextTheme);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Sync language, direction, and document metadata
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = dir;

    document.title = t.meta.title;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMeta('meta[name="description"]', t.meta.description);
    updateMeta('meta[property="og:title"]', t.meta.title);
    updateMeta('meta[property="og:description"]', t.meta.description);
    updateMeta('meta[name="twitter:title"]', t.meta.title);
    updateMeta('meta[name="twitter:description"]', t.meta.description);
  }, [language, dir, t]);

  // Sync theme classes on root element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen to OS theme preference changes if user hasn't stored a manual preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e: MediaQueryListEvent) => {
      try {
        const hasManualChoice = localStorage.getItem(STORAGE_THEME_KEY);
        if (!hasManualChoice) {
          setThemeState(e.matches ? 'light' : 'dark');
        }
      } catch {
        // Ignore
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        language,
        setLanguage,
        dir,
        t,
        theme,
        setTheme,
        toggleTheme,
        activeView,
        setActiveView,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return ctx;
}
