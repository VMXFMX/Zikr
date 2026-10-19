import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Download,
  Layers,
  Sparkles,
  SunMoon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePreferences } from '../context/PreferencesContext';
import {
  AUTHENTIC_HADITH_ENTRIES,
  CLOSING_REFLECTION_CONFIG,
  DAILY_LIFE_QURAN_VERSE,
  DAILY_RHYTHM_STAGES,
  DEFAULT_FEATURED_VERSE_ID,
  FEATURED_QURAN_VERSES,
  formatQuranAyahMarkers,
  HOME_SACRED_SECTIONS_COPY,
  MINIMAL_ZIKR_PILLARS,
  VIRTUE_EDITORIAL_PILLARS,
  VIRTUE_FOUNDATION_VERSE,
} from '../config/sacredContent';
import { IslamicGeometricOrnament } from './GeometricMotif';

/**
 * Renders verified Uthmani Quranic text while keeping each ayah marker and its
 * Eastern Arabic-Indic verse number together (e.g. ۝١ ۝٢ ۝٣) with no space
 * between them and preventing line-breaks inside the marker on desktop and mobile.
 */
export const QuranTextWithAyahMarkers: React.FC<{
  text: string;
  ayahNumber?: string | number;
}> = ({ text, ayahNumber }) => {
  const formatted = formatQuranAyahMarkers(text, ayahNumber);
  const parts = formatted.split(/(۝[٠-٩]+﴾?)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (/^۝[٠-٩]+﴾?$/.test(part)) {
          return (
            <span key={index} className="zikr-ayah-marker">
              {part}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

const SESSION_VERSE_STORAGE_KEY = 'zikr_session_featured_verse_id';

function getSessionStableVerseId(): string {
  if (typeof window !== 'undefined') {
    try {
      const saved = sessionStorage.getItem(SESSION_VERSE_STORAGE_KEY);
      if (saved && FEATURED_QURAN_VERSES.some((v) => v.id === saved)) {
        return saved;
      }
    } catch {
      // Ignore storage access restrictions
    }
  }
  const hasDefault = FEATURED_QURAN_VERSES.some(
    (v) => v.id === DEFAULT_FEATURED_VERSE_ID
  );
  return hasDefault
    ? DEFAULT_FEATURED_VERSE_ID
    : FEATURED_QURAN_VERSES[0]?.id || '';
}

/**
 * Subtle Quran-inspired horizontal divider with central diamond ornament
 */
const QuranOrnamentalDivider: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div
    aria-hidden="true"
    className={`flex items-center justify-center gap-3 ${className}`}
  >
    <div className="zikr-quran-divider flex-1" />
    <span className="inline-block h-2 w-2 rotate-45 border border-emerald-400/60 bg-emerald-500/20" />
    <div className="zikr-quran-divider flex-1" />
  </div>
);

/**
 * Polished architectural section transition divider between Home page sections
 */
const SectionHorizonDivider: React.FC = () => (
  <div
    aria-hidden="true"
    data-zikr-reveal="heading"
    className="mx-auto flex w-full max-w-4xl items-center justify-center gap-4 px-6 pb-8 sm:pb-12"
  >
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/25 to-sky-400/25" />
    <span className="inline-flex h-2 w-2 rotate-45 border border-emerald-500/45 bg-emerald-500/15" />
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-emerald-500/25 to-sky-400/25" />
  </div>
);

/**
 * 1. THE VIRTUE OF DHIKR SECTION — Two-Column Editorial Split
 * Pairs a single foundational Quranic verse (Surah Al-Baqarah 2:152) on one column
 * with three structured editorial foundations on the opposite column.
 */
export const VirtueOfDhikrSection: React.FC = () => {
  const { language } = usePreferences();
  const copy = HOME_SACRED_SECTIONS_COPY[language].virtueSection;
  const verse = VIRTUE_FOUNDATION_VERSE;

  const verifiedTranslation =
    language === 'en'
      ? verse.translation.en
      : language === 'am'
        ? verse.translation.am
        : undefined;

  return (
    <section
      aria-labelledby="virtue-of-dhikr-heading"
      className="relative w-full min-w-0 shrink-0 py-10 sm:py-14 lg:py-16"
    >
      <SectionHorizonDivider />

      {/* Subtle Ambient Light Reflection Behind Section */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-1 absolute top-1/4 start-1/5 -z-10 h-[26rem] w-[32rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-emerald) 0%, var(--ambient-ice-soft) 48%, transparent 74%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left / Start Column: Editorial Introduction & Foundational Quranic Anchor */}
          <div className="lg:col-span-6 min-w-0">
            <div>
              <p
                data-zikr-reveal="heading"
                style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
                className="text-xs font-semibold leading-[1.4] text-emerald-500"
              >
                {copy.index}
              </p>
              <h2
                id="virtue-of-dhikr-heading"
                data-zikr-reveal="heading"
                style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
                className="zikr-heading-section mt-2 text-[var(--text-primary)]"
              >
                {copy.heading}
              </h2>
              <p
                data-zikr-reveal="editorial"
                style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
                className="zikr-body-lead mt-3 text-[var(--text-secondary)]"
              >
                {copy.subtitle}
              </p>
            </div>

            {/* Foundational Quranic Verse Sanctuary Frame (Stable Shared Background Container) */}
            <article className="zikr-quran-sanctuary mt-6 sm:mt-7 rounded-[1.65rem] sm:rounded-[1.85rem] p-4 sm:p-7">
              <div
                data-zikr-reveal="editorial"
                className="flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <span className="inline-flex min-w-0 items-center gap-1.5 font-semibold text-emerald-500">
                  <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="break-words">{copy.verseBadge}</span>
                </span>
                <span className="font-mono font-medium text-[var(--text-muted)] break-words">
                  {verse.surahName[language]} ({verse.surahNumber}:
                  {verse.ayahNumber})
                </span>
              </div>

              <QuranOrnamentalDivider className="my-4" />

              <div
                data-zikr-reveal="verse"
                dir="rtl"
                lang="ar"
                className="zikr-quran-verse-frame rounded-2xl px-3.5 py-5 sm:px-6 sm:py-7 text-center"
              >
                <p className="font-sacred-arabic text-xl sm:text-[1.75rem] leading-[2.15] text-[var(--text-primary)]">
                  <QuranTextWithAyahMarkers
                    text={verse.arabicText}
                    ayahNumber={verse.ayahNumber}
                  />
                </p>
              </div>

              {verifiedTranslation && (
                <p
                  data-zikr-reveal="editorial"
                  className="zikr-body-card mt-4 text-center italic text-[var(--text-primary)]"
                >
                  “{verifiedTranslation}”
                </p>
              )}

              {verse.explanation && (
                <div
                  data-zikr-reveal="editorial"
                  className="mt-4 border-t border-[var(--border-subtle)] pt-3.5"
                >
                  <p className="text-[11px] font-semibold text-emerald-500">
                    {copy.explanationLabel}
                  </p>
                  <p className="zikr-body-card mt-1 text-[var(--text-secondary)]">
                    {verse.explanation[language]}
                  </p>
                </div>
              )}
            </article>
          </div>

          {/* Right / End Column: Three Structured Editorial Pillars */}
          <div className="lg:col-span-6 min-w-0 lg:pt-4">
            <div
              data-zikr-reveal="heading"
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
              className="mb-4 flex items-center gap-3"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                {copy.pillarsHeading}
              </span>
              <div className="h-px flex-1 bg-[var(--border-subtle)]" />
            </div>

            <div className="space-y-4">
              {VIRTUE_EDITORIAL_PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.id}
                  data-zikr-reveal="editorial"
                  style={
                    { '--reveal-delay': `${110 + idx * 75}ms` } as React.CSSProperties
                  }
                  className="zikr-glass zikr-glass-interactive rounded-[1.6rem] p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span
                      dir="ltr"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                    >
                      {pillar.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="zikr-heading-card text-[var(--text-primary)]">
                        {pillar.title[language]}
                      </h3>
                      <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                        {pillar.description[language]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * 2. LARGE IMMERSIVE QURANIC VERSE COMPOSITION
 * Full-width Quran-inspired sanctuary with large Arabic typography, ornate Ayah
 * markers, Quranic dividers, and smooth transitions between verified verses.
 */
export const FeaturedQuranSection: React.FC = () => {
  const { language, dir } = usePreferences();
  const copy = HOME_SACRED_SECTIONS_COPY[language].featuredVerseSection;
  const [selectedVerseId, setSelectedVerseId] = useState<string>(
    getSessionStableVerseId
  );

  const activeIndex = Math.max(
    0,
    FEATURED_QURAN_VERSES.findIndex((v) => v.id === selectedVerseId)
  );
  const activeVerse =
    FEATURED_QURAN_VERSES[activeIndex] || FEATURED_QURAN_VERSES[0];

  useEffect(() => {
    if (!activeVerse) return;
    try {
      sessionStorage.setItem(SESSION_VERSE_STORAGE_KEY, activeVerse.id);
    } catch {
      // Ignore storage access errors
    }
  }, [activeVerse]);

  if (!activeVerse) return null;

  const selectByOffset = (offset: number) => {
    const nextIndex =
      (activeIndex + offset + FEATURED_QURAN_VERSES.length) %
      FEATURED_QURAN_VERSES.length;
    const nextVerse = FEATURED_QURAN_VERSES[nextIndex];
    if (nextVerse) {
      setSelectedVerseId(nextVerse.id);
    }
  };

  const verifiedTranslation =
    language === 'en'
      ? activeVerse.translation.en
      : language === 'am'
        ? activeVerse.translation.am
        : undefined;

  return (
    <section
      aria-labelledby="featured-quran-heading"
      className="relative w-full min-w-0 shrink-0 py-10 sm:py-14 lg:py-16"
    >
      <SectionHorizonDivider />

      {/* Centered Ambient Emerald Sanctuary Halo */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-2 absolute top-1/4 left-1/4 -z-10 h-[30rem] w-[42rem] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, var(--ambient-emerald) 0%, var(--ambient-ice-soft) 48%, transparent 74%)',
        }}
      />

      <div className="mx-auto w-full max-w-5xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
            className="text-xs font-semibold leading-[1.4] text-emerald-500"
          >
            {copy.index}
          </p>
          <h2
            id="featured-quran-heading"
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
            className="zikr-heading-section mt-2 text-[var(--text-primary)]"
          >
            {copy.heading}
          </h2>
          <p
            data-zikr-reveal="editorial"
            style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
            className="zikr-body-lead mt-2.5 text-[var(--text-secondary)]"
          >
            {copy.subtitle}
          </p>
        </div>

        {/* Full-Width Quranic Sanctuary Composition (Stable Shared Background Container with Moving Reflection) */}
        <div className="zikr-quran-sanctuary zikr-glass-shimmer relative mt-7 sm:mt-9 overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] p-4 sm:p-9 lg:p-12">
          {/* Subtle Geometric Ornament Watermarks with Slow Celestial Spin */}
          <IslamicGeometricOrnament className="absolute -top-24 -end-24 h-80 w-80 text-emerald-500/20 opacity-25" />
          <IslamicGeometricOrnament className="absolute -bottom-28 -start-28 h-72 w-72 text-emerald-500/15 opacity-20" />

          {/* Top Bar: Surah & Ayah Reference Medallion + Verse Switcher */}
          <div
            data-zikr-reveal="heading"
            className="relative z-10 flex flex-wrap items-center justify-between gap-3"
          >
            <div className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl sm:rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs sm:text-sm">
              <Sparkles
                className="h-3.5 w-3.5 text-emerald-400 shrink-0"
                aria-hidden="true"
              />
              <span className="font-semibold text-[var(--text-primary)] break-words">
                {activeVerse.surahName[language]}
              </span>
              <span aria-hidden="true" className="text-emerald-500/60">
                ·
              </span>
              <span className="font-mono text-xs font-medium text-emerald-400 tabular-nums break-words">
                {copy.surahLabel} {activeVerse.surahNumber} : {copy.ayahLabel}{' '}
                {activeVerse.ayahNumber}
              </span>
            </div>

            {/* Verse Selection Tabs & Prev/Next Controls */}
            {FEATURED_QURAN_VERSES.length > 1 && (
              <div className="flex w-full sm:w-auto flex-wrap items-center justify-between sm:justify-end gap-2">
                <div
                  role="tablist"
                  aria-label={copy.verseSelectorAria}
                  className="zikr-pill-track inline-flex max-w-full flex-wrap items-center gap-1 rounded-2xl sm:rounded-full p-1"
                >
                  {FEATURED_QURAN_VERSES.map((verse, idx) => {
                    const isSelected = verse.id === activeVerse.id;
                    return (
                      <button
                        key={verse.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedVerseId(verse.id)}
                        className={`relative max-w-full rounded-xl sm:rounded-full px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-start sm:text-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                          isSelected
                            ? 'font-semibold text-[var(--text-primary)]'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="featured-verse-active-tab"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                            className="zikr-nav-item-active absolute inset-0 rounded-xl sm:rounded-full"
                            aria-hidden="true"
                          />
                        )}
                        <span className="relative z-10 break-words">
                          {idx + 1}. {verse.surahName[language]} (
                          {verse.surahNumber}:{verse.ayahNumber})
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="inline-flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => selectByOffset(-1)}
                    aria-label={copy.prevVerseLabel}
                    className="zikr-control-pill inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-primary)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                  >
                    {dir === 'rtl' ? (
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => selectByOffset(1)}
                    aria-label={copy.nextVerseLabel}
                    className="zikr-control-pill inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-primary)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                  >
                    {dir === 'rtl' ? (
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <QuranOrnamentalDivider className="my-5 sm:my-6" />

          {/* Smooth Enter & Exit Transition when Switching Verses */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVerse.id}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 min-w-0"
            >
              {/* Spacious Quranic Recitation Frame (Always Arabic & RTL) */}
              <div
                data-zikr-reveal="verse"
                dir="rtl"
                lang="ar"
                className="zikr-quran-verse-frame rounded-2xl sm:rounded-3xl px-4 py-6 sm:px-10 sm:py-11 text-center"
              >
                <p className="font-sacred-arabic text-xl sm:text-3xl lg:text-[2.2rem] leading-[2.2] sm:leading-[2.25] text-[var(--text-primary)]">
                  <QuranTextWithAyahMarkers
                    text={activeVerse.arabicText}
                    ayahNumber={activeVerse.ayahNumber}
                  />
                </p>
              </div>

              <QuranOrnamentalDivider className="my-5 sm:my-6" />

              {/* Verified Translation & Classical Explanation */}
              <div
                className={`grid grid-cols-1 gap-4 sm:gap-5 ${
                  verifiedTranslation && activeVerse.explanation
                    ? 'md:grid-cols-2'
                    : ''
                }`}
              >
                {verifiedTranslation && (
                  <div
                    data-zikr-reveal="card"
                    className="zikr-glass-subcard rounded-2xl p-4 sm:p-5"
                  >
                    <p className="text-xs font-semibold text-emerald-500">
                      {copy.translationLabel}
                    </p>
                    <p className="zikr-body-card mt-1.5 text-[var(--text-primary)]">
                      “{verifiedTranslation}”
                    </p>
                  </div>
                )}

                {activeVerse.explanation && (
                  <div
                    data-zikr-reveal="card"
                    className="zikr-glass-subcard rounded-2xl p-4 sm:p-5"
                  >
                    <p className="text-xs font-semibold text-emerald-500">
                      {copy.explanationLabel}
                    </p>
                    <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                      {activeVerse.explanation[language]}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/**
 * 3. REMEMBRANCE ACROSS DAILY LIFE SECTION
 * Wide Quranic banner (Surah Ali 'Imran 3:191) paired with a 3-column horizontal
 * progression across Morning, Daytime Pursuits, and Night.
 */
export const DailyRemembranceRhythmSection: React.FC = () => {
  const { language } = usePreferences();
  const copy = HOME_SACRED_SECTIONS_COPY[language].dailyRhythmSection;
  const verse = DAILY_LIFE_QURAN_VERSE;

  const verifiedTranslation =
    language === 'en'
      ? verse.translation.en
      : language === 'am'
        ? verse.translation.am
        : undefined;

  return (
    <section
      aria-labelledby="daily-rhythm-heading"
      className="relative w-full min-w-0 shrink-0 py-10 sm:py-14 lg:py-16"
    >
      <SectionHorizonDivider />

      {/* Continuous Ambient Light Reflection Behind Daily Rhythm Section */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-4 absolute top-1/4 start-1/4 -z-10 h-[26rem] w-[36rem] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, var(--ambient-emerald) 0%, var(--ambient-ice-soft) 48%, transparent 74%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p
              data-zikr-reveal="heading"
              style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
              className="text-xs font-semibold leading-[1.4] text-emerald-500"
            >
              {copy.index}
            </p>
            <h2
              id="daily-rhythm-heading"
              data-zikr-reveal="heading"
              style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
              className="zikr-heading-section mt-2 text-[var(--text-primary)]"
            >
              {copy.heading}
            </h2>
          </div>
          <p
            data-zikr-reveal="editorial"
            style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
            className="zikr-body-card max-w-md text-[var(--text-secondary)]"
          >
            {copy.subtitle}
          </p>
        </div>

        {/* Wide Quranic Banner: Surah Ali 'Imran (3:191) (Stable Shared Background Container) */}
        <div className="zikr-quran-sanctuary mt-6 sm:mt-8 rounded-[2rem] p-5 sm:p-7 lg:p-8">
          <div
            data-zikr-reveal="editorial"
            className="flex flex-wrap items-center justify-between gap-2 text-xs"
          >
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-500">
              <SunMoon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{copy.verseContextLabel}</span>
            </span>
            <span className="font-mono font-medium text-[var(--text-muted)]">
              {verse.surahName[language]} ({verse.surahNumber}:
              {verse.ayahNumber})
            </span>
          </div>

          <div
            data-zikr-reveal="verse"
            dir="rtl"
            lang="ar"
            className="zikr-quran-verse-frame my-4 rounded-2xl px-4 py-5 sm:px-7 sm:py-6 text-center"
          >
            <p className="font-sacred-arabic text-xl sm:text-2xl leading-[2.15] text-[var(--text-primary)]">
              <QuranTextWithAyahMarkers
                text={verse.arabicText}
                ayahNumber={verse.ayahNumber}
              />
            </p>
          </div>

          <div
            data-zikr-reveal="editorial"
            className="space-y-2.5"
          >
            {verifiedTranslation && (
              <p className="zikr-body-card text-center italic text-[var(--text-primary)]">
                “{verifiedTranslation}”
              </p>
            )}
            {verse.explanation && (
              <p
                className={`zikr-body-card text-center text-[var(--text-secondary)] ${
                  verifiedTranslation
                    ? 'border-t border-[var(--border-subtle)] pt-2.5'
                    : ''
                }`}
              >
                {verse.explanation[language]}
              </p>
            )}
          </div>
        </div>

        {/* 3-Column Daily Rhythm Strip */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {DAILY_RHYTHM_STAGES.map((stage, idx) => (
            <article
              key={stage.id}
              data-zikr-reveal="card"
              style={
                { '--reveal-delay': `${110 + idx * 70}ms` } as React.CSSProperties
              }
              className="zikr-glass zikr-glass-interactive flex min-w-0 flex-col justify-between rounded-[1.75rem] p-5 sm:p-6"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    dir="ltr"
                    className="font-mono text-xs font-semibold text-emerald-500 tabular-nums shrink-0"
                  >
                    {stage.number}
                  </span>
                  <span className="min-w-0 break-words text-xs font-medium text-sky-400">
                    {stage.timeLabel[language]}
                  </span>
                </div>
                <h3 className="zikr-heading-card mt-3 text-[var(--text-primary)]">
                  {stage.title[language]}
                </h3>
                <p className="zikr-body-card mt-2 text-[var(--text-secondary)]">
                  {stage.description[language]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * 4. AUTHENTIC HADITHS ABOUT DHIKR SECTION — Structured Editorial Ledger
 * Visually distinct from the Quran sections: uses a compact, structured scholarly
 * ledger with horizontal dividers, a dedicated source/grading column, and a
 * Prophetic narration column.
 */
export const AuthenticHadithSection: React.FC = () => {
  const { language } = usePreferences();
  const copy = HOME_SACRED_SECTIONS_COPY[language].hadithSection;

  return (
    <section
      aria-labelledby="authentic-hadith-heading"
      className="relative w-full min-w-0 shrink-0 py-10 sm:py-14 lg:py-16"
    >
      <SectionHorizonDivider />

      {/* Subtle Ice-Blue Ambient Light Reflection */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-3 absolute top-1/4 end-1/5 -z-10 h-[28rem] w-[36rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-ice) 0%, var(--ambient-emerald-soft) 48%, transparent 74%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
            className="text-xs font-semibold leading-[1.4] text-sky-400"
          >
            {copy.index}
          </p>
          <h2
            id="authentic-hadith-heading"
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
            className="zikr-heading-section mt-2 text-[var(--text-primary)]"
          >
            {copy.heading}
          </h2>
          <p
            data-zikr-reveal="editorial"
            style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
            className="zikr-body-lead mt-2.5 text-[var(--text-secondary)]"
          >
            {copy.subtitle}
          </p>
        </div>

        {/* Structured Scholarly Hadith Ledger Container (Visually Distinct from Quran Sanctuary) */}
        <div className="zikr-hadith-ledger mt-6 sm:mt-8 overflow-hidden rounded-[1.75rem]">
          {/* Desktop Column Headers */}
          <div
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            className="hidden border-b border-[var(--border-subtle)] bg-sky-500/[0.04] px-6 py-3.5 text-xs font-semibold text-sky-400 lg:grid lg:grid-cols-12 lg:gap-8"
          >
            <div className="lg:col-span-4">{copy.collectionHeader}</div>
            <div className="lg:col-span-8">{copy.narrationHeader}</div>
          </div>

          {/* Divided Prophetic Narration Rows */}
          <div className="divide-y divide-[var(--border-subtle)]">
            {AUTHENTIC_HADITH_ENTRIES.map((hadith, idx) => {
              const verifiedTranslation =
                language === 'en'
                  ? hadith.translation.en
                  : language === 'am'
                    ? hadith.translation.am
                    : undefined;

              return (
                <article
                  key={hadith.id}
                  data-zikr-reveal="card"
                  style={
                    { '--reveal-delay': `${idx * 65}ms` } as React.CSSProperties
                  }
                  className="zikr-hadith-row grid grid-cols-1 gap-4 p-5 sm:p-6 lg:grid-cols-12 lg:items-start lg:gap-8 lg:px-7 lg:py-6"
                >
                  {/* Column 1 (4 cols on lg): Number, Topic, Source Reference, and Authenticity Status */}
                  <div className="lg:col-span-4 min-w-0 flex flex-col justify-between space-y-2.5">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span
                        dir="ltr"
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-sky-400/30 bg-sky-500/10 font-mono text-[11px] font-semibold text-sky-400 tabular-nums"
                      >
                        {hadith.numberLabel}
                      </span>
                      <h3 className="min-w-0 flex-1 break-words text-sm sm:text-base font-bold text-[var(--text-primary)]">
                        {hadith.topic[language]}
                      </h3>
                    </div>

                    <div className="space-y-1.5 pt-1 text-xs">
                      <div className="flex flex-wrap items-center gap-1.5 text-[var(--text-secondary)]">
                        <BookMarked
                          className="h-3.5 w-3.5 text-sky-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-[var(--text-muted)]">
                          {copy.sourceLabel}:
                        </span>
                        <span className="font-medium text-[var(--text-primary)] break-words">
                          {hadith.source[language]}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <CheckCircle2
                          className="h-3.5 w-3.5 text-emerald-500 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-[var(--text-muted)]">
                          {copy.gradingLabel}:
                        </span>
                        <span className="font-semibold text-emerald-500 break-words">
                          {hadith.authenticity[language]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2 (8 cols on lg): Arabic Hadith Matn, Verified Translation, & Concise Meaning */}
                  <div className="lg:col-span-8 min-w-0 space-y-3">
                    <div
                      dir="rtl"
                      lang="ar"
                      className="zikr-hadith-matn-frame rounded-xl px-4 py-3.5 sm:px-5 sm:py-4 text-start"
                    >
                      <p className="font-sacred-arabic text-base sm:text-lg leading-[2.05] text-[var(--text-primary)]">
                        {hadith.arabicText}
                      </p>
                    </div>

                    {verifiedTranslation && (
                      <p className="zikr-body-card text-[var(--text-primary)]">
                        {verifiedTranslation}
                      </p>
                    )}

                    <div className="flex flex-col gap-1 border-t border-[var(--border-subtle)] pt-2.5 sm:flex-row sm:items-baseline sm:gap-2">
                      <span className="shrink-0 text-[11px] font-semibold text-sky-400">
                        {copy.meaningLabel}:
                      </span>
                      <p className="zikr-body-card text-[var(--text-secondary)]">
                        {hadith.explanation[language]}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * 5. MINIMAL ZIKR FEATURE PILLARS SECTION
 * Compact 4-card architectural row connecting the spiritual foundation to ZIKR's
 * core sections without duplicating the full Features or Overview pages.
 */
export const HomeMinimalPillarsSection: React.FC = () => {
  const { language, setActiveView, dir } = usePreferences();
  const copy = HOME_SACRED_SECTIONS_COPY[language].minimalPillarsSection;

  return (
    <section
      aria-labelledby="minimal-pillars-heading"
      className="relative w-full min-w-0 shrink-0 py-8 sm:py-12"
    >
      <SectionHorizonDivider />

      {/* Continuous Ambient Light Reflection Behind Minimal Pillars Section */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-2 absolute top-1/4 end-1/4 -z-10 h-[24rem] w-[34rem] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, var(--ambient-ice) 0%, var(--ambient-emerald-soft) 48%, transparent 74%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p
              data-zikr-reveal="heading"
              style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
              className="text-xs font-semibold leading-[1.4] text-emerald-500"
            >
              {copy.index}
            </p>
            <h2
              id="minimal-pillars-heading"
              data-zikr-reveal="heading"
              style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
              className="zikr-heading-section mt-1.5 text-[var(--text-primary)]"
            >
              {copy.heading}
            </h2>
            <p
              data-zikr-reveal="editorial"
              style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
              className="zikr-body-card mt-2 text-[var(--text-secondary)]"
            >
              {copy.subtitle}
            </p>
          </div>

          <div
            data-zikr-reveal="editorial"
            style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            <button
              type="button"
              onClick={() => setActiveView('about')}
              className="zikr-control-pill inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-start text-[var(--text-primary)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              <Layers className="h-3.5 w-3.5 text-sky-400 shrink-0" aria-hidden="true" />
              <span className="break-words">{copy.previewAppCta}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('features')}
              className="zikr-control-pill inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-start text-emerald-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              <span className="break-words">{copy.exploreAllCta}</span>
              <ArrowRight
                className={`h-3.5 w-3.5 shrink-0 ${dir === 'rtl' ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Minimal 4-Card Row */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {MINIMAL_ZIKR_PILLARS.map((pillar, idx) => (
            <button
              key={pillar.id}
              type="button"
              data-zikr-reveal="card"
              style={
                { '--reveal-delay': `${idx * 60}ms` } as React.CSSProperties
              }
              onClick={() => setActiveView('features')}
              className="zikr-glass zikr-glass-interactive group flex flex-col justify-between rounded-2xl p-4 sm:p-5 text-start cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                >
                  {pillar.number}.
                </span>
                <ArrowRight
                  className={`h-3.5 w-3.5 text-[var(--text-muted)] transition-transform group-hover:text-emerald-500 ${
                    dir === 'rtl'
                      ? 'rotate-180 group-hover:-translate-x-0.5'
                      : 'group-hover:translate-x-0.5'
                  }`}
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                  {pillar.title[language]}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {pillar.summary[language]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * 6. SPACIOUS CLOSING SECTION
 * Combines a verified Quranic verse on Allah's nearness (Surah Al-Baqarah 2:186)
 * using the Quranic Sanctuary treatment and an authentic Hadith on consistent deeds
 * (Sahih al-Bukhari 6464 / Sahih Muslim 782) using the Hadith editorial treatment.
 */
export const HomeClosingSection: React.FC = () => {
  const { language, setActiveView } = usePreferences();
  const copy = HOME_SACRED_SECTIONS_COPY[language].closingSection;
  const config = CLOSING_REFLECTION_CONFIG;

  const verseTranslation =
    language === 'en'
      ? config.verse.translation.en
      : language === 'am'
        ? config.verse.translation.am
        : undefined;

  const hadithTranslation =
    language === 'en'
      ? config.hadith.translation.en
      : language === 'am'
        ? config.hadith.translation.am
        : undefined;

  return (
    <section
      aria-labelledby="home-closing-heading"
      className="relative w-full min-w-0 shrink-0 pt-8 pb-12 sm:pt-12 sm:pb-16"
    >
      <SectionHorizonDivider />

      {/* Soft Ambient Horizon Glow */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-1 absolute top-1/4 left-1/4 -z-10 h-[28rem] w-[40rem] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, var(--ambient-emerald) 0%, var(--ambient-ice) 48%, transparent 75%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="zikr-glass-strong relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] p-4 sm:p-9 lg:p-12">
          {/* Header & Closing Message */}
          <div className="mx-auto max-w-2xl text-center">
            <p
              data-zikr-reveal="heading"
              style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
              className="text-xs font-semibold leading-[1.4] text-emerald-500"
            >
              {copy.index}
            </p>
            <h2
              id="home-closing-heading"
              data-zikr-reveal="heading"
              style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
              className="zikr-heading-section mt-2 text-[var(--text-primary)]"
            >
              {config.closingHeading[language]}
            </h2>
            <p
              data-zikr-reveal="editorial"
              style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
              className="zikr-body-lead mt-3 text-[var(--text-secondary)]"
            >
              {config.closingMessage[language]}
            </p>
          </div>

          {/* 1. Spacious Quranic Sanctuary Block (Surah Al-Baqarah 2:186) (Stable Shared Container) */}
          <div className="zikr-quran-sanctuary mt-7 sm:mt-9 rounded-[1.65rem] sm:rounded-[1.85rem] p-4 sm:p-7">
            <div
              data-zikr-reveal="editorial"
              className="flex flex-wrap items-center justify-between gap-2 text-xs"
            >
              <span className="inline-flex min-w-0 items-center gap-1.5 font-semibold text-emerald-500">
                <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="break-words">{copy.quranPillarLabel}</span>
              </span>
              <span className="font-mono font-medium text-[var(--text-muted)] break-words">
                {config.verse.surahName[language]} ({config.verse.surahNumber}:
                {config.verse.ayahNumber})
              </span>
            </div>

            <div
              data-zikr-reveal="verse"
              dir="rtl"
              lang="ar"
              className="zikr-quran-verse-frame my-4 rounded-2xl px-3.5 py-5 sm:px-8 sm:py-7 text-center"
            >
              <p className="font-sacred-arabic text-xl sm:text-2xl lg:text-[1.7rem] leading-[2.2] text-[var(--text-primary)]">
                <QuranTextWithAyahMarkers
                  text={config.verse.arabicText}
                  ayahNumber={config.verse.ayahNumber}
                />
              </p>
            </div>

            {verseTranslation && (
              <p
                data-zikr-reveal="editorial"
                className="zikr-body-card text-center italic text-[var(--text-primary)]"
              >
                “{verseTranslation}”
              </p>
            )}

            {config.verse.explanation && (
              <p
                data-zikr-reveal="editorial"
                className="zikr-body-card mt-3 border-t border-[var(--border-subtle)] pt-3 text-center text-[var(--text-secondary)]"
              >
                {config.verse.explanation[language]}
              </p>
            )}
          </div>

          {/* 2. Compact Editorial Hadith Bar (Sahih al-Bukhari 6464 & Sahih Muslim 782) */}
          <div className="zikr-hadith-manuscript mt-5 rounded-2xl p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
              <div
                data-zikr-reveal="editorial"
                className="lg:col-span-4 min-w-0 space-y-1.5"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400">
                  <BookMarked
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="break-words">{copy.sunnahPillarLabel}</span>
                </span>
                <p className="text-xs font-medium text-[var(--text-primary)] break-words">
                  {config.hadith.source[language]}
                </p>
                <p className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="break-words">{config.hadith.authenticity[language]}</span>
                </p>
              </div>

              <div
                data-zikr-reveal="verse"
                className="lg:col-span-8 min-w-0 space-y-2.5"
              >
                <div
                  dir="rtl"
                  lang="ar"
                  className="zikr-hadith-matn-frame rounded-xl px-4 py-3.5 text-start"
                >
                  <p className="font-sacred-arabic text-base sm:text-lg text-[var(--text-primary)]">
                    {config.hadith.arabicText}
                  </p>
                </div>
                {hadithTranslation && (
                  <p className="zikr-body-card text-[var(--text-primary)]">
                    {hadithTranslation}
                  </p>
                )}
                <p className="zikr-body-card text-[var(--text-secondary)]">
                  {config.hadith.explanation[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Closing Action Buttons Leading to Existing ZIKR Views */}
          <div
            data-zikr-reveal="editorial"
            style={{ '--reveal-delay': '190ms' } as React.CSSProperties}
            className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 border-t border-[var(--border-subtle)] pt-6"
          >
            <button
              type="button"
              onClick={() => setActiveView('features')}
              className="zikr-btn-primary inline-flex max-w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
            >
              <Compass className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="break-words">{config.primaryCtaLabel[language]}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('download')}
              className="zikr-control-pill inline-flex max-w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-medium text-center text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
            >
              <Download
                className="h-4 w-4 text-emerald-500 shrink-0"
                aria-hidden="true"
              />
              <span className="break-words">{config.secondaryCtaLabel[language]}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
