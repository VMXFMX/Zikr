import React from 'react';
import { ArrowRight, Compass, Download } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { AUTHENTIC_APK_URL } from '../config/release';
import { IslamicGeometricOrnament } from './GeometricMotif';
import { QuranTextWithAyahMarkers } from './HomeSacredSections';
import { ZikrEmblem } from './ZikrLogo';

export const HeroSection: React.FC = () => {
  const { t, setActiveView, dir, language } = usePreferences();

  const heroVerseReference =
    language === 'ar'
      ? 'سورة الرعد · الآية ٢٨'
      : language === 'am'
        ? 'ሱረቱ አር-ረዕድ · 13:28'
        : "Surah Ar-Ra'd · 13:28";

  return (
    <section
      id="home"
      className="relative w-full min-w-0 shrink-0 py-6 sm:py-10 lg:py-12"
    >
      {/* Subtle Hero Atmospheric Glow & Gentle Section Reflection */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-1 absolute top-1/4 start-1/5 -z-10 h-[26rem] w-[32rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-emerald) 0%, var(--ambient-ice-soft) 48%, transparent 74%)',
        }}
      />
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-2 absolute top-1/3 end-1/6 -z-10 h-[24rem] w-[26rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-ice) 0%, var(--ambient-emerald-soft) 46%, transparent 72%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Primary Editorial Column */}
          <div className="lg:col-span-7 min-w-0 flex flex-col items-start text-start">
            {/* Unboxed Brand & Kicker Line */}
            <div
              data-zikr-reveal="heading"
              style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
              className="mb-3.5 sm:mb-4 flex flex-wrap items-center gap-2.5 text-xs font-medium text-[var(--text-muted)]"
            >
              <ZikrEmblem size="sm" />
              <span
                dir="ltr"
                className="font-brand font-bold tracking-[0.2em] text-emerald-500"
              >
                ZIKR
              </span>
              <span aria-hidden="true">·</span>
              <span>{t.hero.kicker}</span>
            </div>

            {/* Prominent Hero Headline */}
            <h1
              data-zikr-reveal="heading"
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
              className="zikr-heading-hero text-[var(--text-primary)]"
            >
              {t.hero.headline}
            </h1>

            {/* Supporting Description */}
            <p
              data-zikr-reveal="editorial"
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
              className="zikr-body-lead mt-4 max-w-xl text-[var(--text-secondary)]"
            >
              {t.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex w-full sm:w-auto flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Primary Button: Explore ZIKR Features («اكتشف مميزات ZIKR») */}
              <button
                type="button"
                data-zikr-reveal="button"
                style={{ '--reveal-delay': '210ms' } as React.CSSProperties}
                onClick={() => setActiveView('features')}
                className="zikr-btn-primary inline-flex max-w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
              >
                <Compass className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="break-words">{t.hero.primaryCta}</span>
              </button>

              {/* Secondary Button: Download the App («تحميل التطبيق») */}
              {AUTHENTIC_APK_URL ? (
                <a
                  href={AUTHENTIC_APK_URL}
                  download
                  data-zikr-reveal="button"
                  style={{ '--reveal-delay': '280ms' } as React.CSSProperties}
                  className="zikr-control-pill inline-flex max-w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-medium text-center text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  <Download className="h-4 w-4 text-emerald-500 shrink-0 zikr-icon-bounce" aria-hidden="true" />
                  <span className="break-words">{t.hero.secondaryCta}</span>
                </a>
              ) : (
                <button
                  type="button"
                  data-zikr-reveal="button"
                  style={{ '--reveal-delay': '280ms' } as React.CSSProperties}
                  onClick={() => setActiveView('download')}
                  className="zikr-control-pill inline-flex max-w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-medium text-center text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
                >
                  <Download className="h-4 w-4 text-emerald-500 shrink-0 zikr-icon-bounce" aria-hidden="true" />
                  <span className="break-words">{t.hero.secondaryCta}</span>
                </button>
              )}
            </div>

            {/* Honest Android Availability Metadata Line */}
            {!AUTHENTIC_APK_URL && (
              <div
                data-zikr-reveal="editorial"
                style={{ '--reveal-delay': '340ms' } as React.CSSProperties}
                className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]"
              >
                <span>{t.hero.availabilityNote}:</span>
                <button
                  type="button"
                  onClick={() => setActiveView('download')}
                  className="font-semibold text-emerald-500 underline decoration-emerald-500/40 underline-offset-4 hover:text-emerald-400 cursor-pointer"
                >
                  {t.hero.comingSoonStatus}
                </button>
              </div>
            )}
          </div>

          {/* Architectural Glass & Integrated App Showcase Centerpiece */}
          <div
            data-zikr-reveal="mockup"
            style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
            className="lg:col-span-5 min-w-0 relative flex items-center justify-center"
          >
            {/* Ambient Backlight Behind Hero Showcase */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] blur-2xl opacity-75"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 45%, var(--ambient-emerald) 0%, var(--ambient-ice) 48%, transparent 76%)',
              }}
            />

            {/* Background Islamic Geometric Motif with Slow Celestial Spin */}
            <IslamicGeometricOrnament className="absolute h-64 w-64 sm:h-72 sm:w-72 text-emerald-500/35 opacity-35" />

            {/* Layered Glass Composition with Moving Reflective Sheen */}
            <div className="relative w-full max-w-md min-w-0">
              <div className="zikr-glass zikr-glass-interactive zikr-glass-shimmer relative overflow-hidden rounded-[2rem] p-5 sm:p-6 lg:p-7">
                {/* Official Emblem Header Showcase */}
                <div className="flex items-center justify-between gap-3.5 border-b border-[var(--border-subtle)] pb-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <ZikrEmblem size="lg" glow className="shadow-xl shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span
                        dir="ltr"
                        className="block font-brand text-xs sm:text-sm font-bold tracking-[0.18em] text-[var(--text-primary)]"
                      >
                        ZIKR
                      </span>
                      <span className="mt-0.5 block break-words text-xs leading-snug text-[var(--text-muted)]">
                        {t.hero.visualCard.arabicSampleTitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Central Sacred Arabic Typography Sanctuary Frame */}
                <div
                  className="zikr-quran-verse-frame my-4 rounded-2xl px-3.5 py-5 sm:px-4 sm:py-6 text-center"
                  dir="rtl"
                  lang="ar"
                >
                  <p className="font-sacred-arabic text-xl sm:text-2xl leading-[2.1] text-[var(--text-primary)]">
                    <QuranTextWithAyahMarkers
                      text={`﴿${t.hero.visualCard.arabicSampleVerse}﴾`}
                      ayahNumber="28"
                    />
                  </p>
                  <p className="mt-2 font-mono text-[11px] font-medium text-emerald-500/90">
                    {heroVerseReference}
                  </p>
                </div>

                {/* Unboxed Descriptive Metadata */}
                <p className="zikr-body-card text-center text-[var(--text-secondary)]">
                  {t.hero.visualCard.arabicSampleSubtext}
                </p>

                {/* Bottom Unboxed Pillars Line */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 border-t border-[var(--border-subtle)] pt-3.5 text-xs text-[var(--text-secondary)]">
                  {t.hero.visualCard.pillars.map((pillar, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && (
                        <span aria-hidden="true" className="text-emerald-500/60">
                          ·
                        </span>
                      )}
                      <span className="font-medium">{pillar}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Quiet Interactive Caption Below Glass Panel */}
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-2.5 text-xs text-[var(--text-muted)]">
                <span className="min-w-0 break-words">{t.hero.visualCard.sectionLabel}</span>
                <button
                  type="button"
                  onClick={() => setActiveView('about')}
                  aria-label={t.hero.visualCard.sectionLabel}
                  className="inline-flex items-center gap-1 font-medium text-emerald-500 hover:underline shrink-0 cursor-pointer"
                >
                  <span>{t.intro.screenshots.sectionIndex}</span>
                  <ArrowRight
                    className={`h-3.5 w-3.5 shrink-0 ${dir === 'rtl' ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

