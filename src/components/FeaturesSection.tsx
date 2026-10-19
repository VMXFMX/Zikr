import React from 'react';
import { BookMarked, BookOpen, Compass, Layers, SunMoon } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { FeatureCardItem } from '../i18n/translations';

export const FeaturesSection: React.FC = () => {
  const { t } = usePreferences();
  const items = t.features.items;

  const getIcon = (id: FeatureCardItem['id']) => {
    switch (id) {
      case 'quran':
        return <BookOpen className="h-5 w-5 text-emerald-500 shrink-0" aria-hidden="true" />;
      case 'reading-modes':
        return <Compass className="h-5 w-5 text-sky-400 shrink-0" aria-hidden="true" />;
      case 'azkar':
        return <SunMoon className="h-5 w-5 text-emerald-500 shrink-0" aria-hidden="true" />;
      case 'books':
        return <BookMarked className="h-5 w-5 text-sky-400 shrink-0" aria-hidden="true" />;
      case 'organized':
      default:
        return <Layers className="h-5 w-5 text-emerald-500 shrink-0" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="features"
      className="relative w-full min-w-0 shrink-0 py-6 sm:py-10 lg:py-12"
    >
      {/* Gentle Ambient Light Reflections Behind Feature Cards */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-2 absolute top-1/3 end-1/5 -z-10 h-[22rem] w-[26rem] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-ice) 0%, var(--ambient-emerald-soft) 50%, transparent 74%)',
        }}
      />
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-3 absolute bottom-6 start-1/6 -z-10 h-[18rem] w-[22rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-emerald) 0%, var(--ambient-ice-soft) 52%, transparent 76%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-4 sm:mb-6">
          <p
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
            className="text-xs font-semibold leading-[1.4] text-emerald-500"
          >
            {t.features.sectionIndex}
          </p>
          <h2
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
            className="zikr-heading-section mt-1.5 text-[var(--text-primary)]"
          >
            {t.features.heading}
          </h2>
          <p
            data-zikr-reveal="editorial"
            style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
            className="zikr-body-lead mt-2 text-[var(--text-secondary)]"
          >
            {t.features.subtitle}
          </p>
        </div>

        {/* Five Main Feature Cards in a Gap-Free Responsive Grid (Order: 01, 02, 03, 04, 05) */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
          {/* FEATURE 01: القرآن الكريم (Row 1, Col 1-5 on lg; Col 1 on md) */}
          {items[0] && (
            <article
              data-zikr-reveal="card"
              style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
              className="zikr-glass zikr-glass-interactive zikr-glass-shimmer flex flex-col justify-between md:col-span-1 lg:col-span-5 min-w-0 rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                >
                  {items[0].number}.
                </span>
                <span className="zikr-icon-orb">{getIcon(items[0].id)}</span>
              </div>
              <div className="mt-3">
                <h3 className="zikr-heading-card text-[var(--text-primary)]">
                  {items[0].title}
                </h3>
                <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                  {items[0].description}
                </p>
              </div>
            </article>
          )}

          {/* FEATURE 02: أذكار (Spans Rows 1-2, Col 6-12 on lg; Rows 1-2, Col 2 on md so Card 03 slots directly beneath Card 01 with zero gap) */}
          {items[1] && (
            <article
              data-zikr-reveal="card"
              style={{ '--reveal-delay': '65ms' } as React.CSSProperties}
              className="zikr-glass zikr-glass-interactive zikr-glass-shimmer flex flex-col justify-between md:col-span-1 md:row-span-2 lg:col-span-7 lg:row-span-2 min-w-0 rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span
                    dir="ltr"
                    className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                  >
                    {items[1].number}.
                  </span>
                  <span className="zikr-icon-orb">{getIcon(items[1].id)}</span>
                </div>
                <h3 className="zikr-heading-card mt-3 text-[var(--text-primary)]">
                  {items[1].title}
                </h3>
                <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                  {items[1].description}
                </p>
              </div>

              {/* Two Clearly Distinguished Reading Modes Inside This Single Main Card */}
              {items[1].readingModes && (
                <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {items[1].readingModes.map((mode) => (
                    <div
                      key={mode.id}
                      data-zikr-reveal="card"
                      className="zikr-glass-subcard flex min-w-0 flex-col justify-between rounded-2xl p-4"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                        <h4 className="min-w-0 break-words text-sm font-semibold leading-[1.42] text-[var(--text-primary)]">
                          {mode.title}
                        </h4>
                        <span className="break-words text-[11px] font-medium leading-[1.4] text-emerald-500">
                          {mode.badge}
                        </span>
                      </div>
                      <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                        {mode.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          )}

          {/* FEATURE 03: اليوم والليلة (Row 2, Col 1-5 on lg; Row 2, Col 1 on md — directly beneath Card 01) */}
          {items[2] && (
            <article
              data-zikr-reveal="card"
              style={{ '--reveal-delay': '130ms' } as React.CSSProperties}
              className="zikr-glass zikr-glass-interactive flex flex-col justify-between md:col-span-1 lg:col-span-5 min-w-0 rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                >
                  {items[2].number}.
                </span>
                <span className="zikr-icon-orb">{getIcon(items[2].id)}</span>
              </div>
              <div className="mt-3">
                <h3 className="zikr-heading-card text-[var(--text-primary)]">
                  {items[2].title}
                </h3>
                <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                  {items[2].description}
                </p>
              </div>
            </article>
          )}

          {/* FEATURE 04: كتب (Row 3, Col 1-6 on lg; Row 3, Col 1 on md) */}
          {items[3] && (
            <article
              data-zikr-reveal="card"
              style={{ '--reveal-delay': '195ms' } as React.CSSProperties}
              className="zikr-glass zikr-glass-interactive flex flex-col justify-between md:col-span-1 lg:col-span-6 min-w-0 rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                >
                  {items[3].number}.
                </span>
                <span className="zikr-icon-orb">{getIcon(items[3].id)}</span>
              </div>
              <div className="mt-3">
                <h3 className="zikr-heading-card text-[var(--text-primary)]">
                  {items[3].title}
                </h3>
                <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                  {items[3].description}
                </p>
              </div>
            </article>
          )}

          {/* FEATURE 05: محتوى إسلامي منظّم (Row 3, Col 7-12 on lg; Row 3, Col 2 on md) */}
          {items[4] && (
            <article
              data-zikr-reveal="card"
              style={{ '--reveal-delay': '260ms' } as React.CSSProperties}
              className="zikr-glass zikr-glass-interactive flex flex-col justify-between md:col-span-1 lg:col-span-6 min-w-0 rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                >
                  {items[4].number}.
                </span>
                <span className="zikr-icon-orb">{getIcon(items[4].id)}</span>
              </div>
              <div className="mt-3">
                <h3 className="zikr-heading-card text-[var(--text-primary)]">
                  {items[4].title}
                </h3>
                <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                  {items[4].description}
                </p>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};
