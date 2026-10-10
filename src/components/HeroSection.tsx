import React from 'react';
import { ArrowRight, Compass, Download } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { AUTHENTIC_APK_URL } from '../config/release';
import { IslamicGeometricOrnament } from './GeometricMotif';
import {
  ZIKR_LOGO_PFP_PATH,
  ZikrEmblem,
} from './ZikrLogo';

export const HeroSection: React.FC = () => {
  const { t, setActiveView, dir } = usePreferences();

  return (
    <section
      id="home"
      className="relative my-auto w-full min-w-0 shrink-0 py-3 sm:py-5"
    >
      {/* Subtle Hero Atmospheric Glow */}
      <div
        aria-hidden="true"
        className="zikr-anim-fade pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-75"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-emerald) 0%, var(--ambient-ice) 48%, transparent 72%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Primary Editorial Column */}
          <div className="lg:col-span-7 min-w-0 flex flex-col items-start text-start">
            {/* Unboxed Brand & Kicker Line */}
            <div className="zikr-anim-fade mb-3 flex flex-wrap items-center gap-2.5 text-xs font-medium text-[var(--text-muted)]">
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

            {/* Prominent Hero Headline (Fade-in) */}
            <h1 className="zikr-anim-fade zikr-heading-hero text-[var(--text-primary)]">
              {t.hero.headline}
            </h1>

            {/* Supporting Description (Fade-in) */}
            <p className="zikr-anim-fade zikr-body-lead mt-3 max-w-xl text-[var(--text-secondary)]">
              {t.hero.description}
            </p>

            {/* Action Buttons (Subtle upward movement) */}
            <div className="zikr-anim-up-delay-1 mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Primary Button: Explore ZIKR Features («اكتشف مميزات ZIKR») */}
              <button
                type="button"
                onClick={() => setActiveView('features')}
                className="zikr-btn-primary inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Compass className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t.hero.primaryCta}</span>
              </button>

              {/* Secondary Button: Download the App («تحميل التطبيق») */}
              {AUTHENTIC_APK_URL ? (
                <a
                  href={AUTHENTIC_APK_URL}
                  download
                  className="zikr-control-pill inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-medium text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 whitespace-nowrap shrink-0"
                >
                  <Download className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>{t.hero.secondaryCta}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveView('download')}
                  className="zikr-control-pill inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-medium text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>{t.hero.secondaryCta}</span>
                </button>
              )}
            </div>

            {/* Honest Android Availability Metadata Line */}
            {!AUTHENTIC_APK_URL && (
              <div className="zikr-anim-up-delay-2 mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                <span>{t.hero.availabilityNote}:</span>
                <button
                  type="button"
                  onClick={() => setActiveView('download')}
                  className="font-semibold text-emerald-500 underline decoration-emerald-500/40 underline-offset-4 transition-colors hover:text-emerald-400 cursor-pointer"
                >
                  {t.hero.comingSoonStatus}
                </button>
              </div>
            )}
          </div>

          {/* Architectural Glass & Official Emblem Centerpiece */}
          <div className="lg:col-span-5 min-w-0 relative flex items-center justify-center zikr-anim-up-delay-1">
            {/* Background Islamic Geometric Motif */}
            <IslamicGeometricOrnament className="absolute h-60 w-60 sm:h-68 sm:w-68 text-emerald-500/35" />

            {/* Layered Glass Composition */}
            <div className="relative w-full max-w-md min-w-0">
              <div className="zikr-glass relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] p-4 sm:p-5">
                {/* Official Emblem Header Showcase */}
                <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border border-emerald-500/30 bg-[#141618] shadow-xl flex items-center justify-center">
                      <img
                        src={ZIKR_LOGO_PFP_PATH}
                        alt="ZIKR Official Logo"
                        decoding="async"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span
                        dir="ltr"
                        className="block font-brand text-xs sm:text-sm font-bold tracking-[0.18em] text-[var(--text-primary)]"
                      >
                        ZIKR
                      </span>
                      <span className="block truncate text-xs text-[var(--text-muted)]">
                        {t.hero.visualCard.arabicSampleTitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Central Sacred Arabic Typography Display */}
                <div className="my-3.5 py-1 text-center" dir="rtl" lang="ar">
                  <p className="font-sacred-arabic text-xl sm:text-2xl text-[var(--text-primary)]">
                    {t.hero.visualCard.arabicSampleVerse}
                  </p>
                </div>

                {/* Unboxed Descriptive Metadata */}
                <p className="zikr-body-card text-center text-[var(--text-secondary)]">
                  {t.hero.visualCard.arabicSampleSubtext}
                </p>

                {/* Bottom Unboxed Pillars Line */}
                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 border-t border-[var(--border-subtle)] pt-3 text-xs text-[var(--text-secondary)]">
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

              {/* Quiet Caption Below Glass Panel */}
              <div className="mt-2 flex items-center justify-between px-2 text-xs text-[var(--text-muted)]">
                <span>{t.hero.visualCard.sectionLabel}</span>
                <button
                  type="button"
                  onClick={() => setActiveView('about')}
                  aria-label={t.hero.visualCard.sectionLabel}
                  className="inline-flex items-center gap-1 text-emerald-500 hover:underline cursor-pointer"
                >
                  <ArrowRight
                    className={`h-3.5 w-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`}
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

