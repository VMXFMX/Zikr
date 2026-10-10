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
      className="relative my-auto w-full min-w-0 shrink-0 py-3 sm:py-5"
    >
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="zikr-anim-fade max-w-2xl mb-3.5 sm:mb-5">
          <p className="text-xs font-semibold leading-[1.4] text-emerald-500">
            {t.features.sectionIndex}
          </p>
          <h2 className="zikr-heading-section mt-1 text-[var(--text-primary)]">
            {t.features.heading}
          </h2>
          <p className="zikr-body-lead mt-1.5 text-[var(--text-secondary)]">
            {t.features.subtitle}
          </p>
        </div>

        {/* Five Main Feature Cards in a Gap-Free Responsive Grid (Order: 01, 02, 03, 04, 05) */}
        <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-12">
          {/* FEATURE 01: القرآن الكريم (Row 1, Col 1-5 on lg; Col 1 on md) */}
          {items[0] && (
            <article className="zikr-glass zikr-glass-interactive zikr-anim-up flex flex-col justify-between md:col-span-1 lg:col-span-5 min-w-0 rounded-2xl sm:rounded-3xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                >
                  {items[0].number}.
                </span>
                <span className="zikr-icon-orb">{getIcon(items[0].id)}</span>
              </div>
              <div className="mt-2.5">
                <h3 className="zikr-heading-card text-[var(--text-primary)]">
                  {items[0].title}
                </h3>
                <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                  {items[0].description}
                </p>
              </div>
            </article>
          )}

          {/* FEATURE 02: أنماط القراءة (Spans Rows 1-2, Col 6-12 on lg; Rows 1-2, Col 2 on md so Card 03 slots directly beneath Card 01 with zero gap) */}
          {items[1] && (
            <article className="zikr-glass zikr-glass-interactive zikr-anim-up flex flex-col justify-between md:col-span-1 md:row-span-2 lg:col-span-7 lg:row-span-2 min-w-0 rounded-2xl sm:rounded-3xl p-4 sm:p-5">
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
                <h3 className="zikr-heading-card mt-2.5 text-[var(--text-primary)]">
                  {items[1].title}
                </h3>
                <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                  {items[1].description}
                </p>
              </div>

              {/* Two Clearly Distinguished Reading Modes Inside This Single Main Card */}
              {items[1].readingModes && (
                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {items[1].readingModes.map((mode) => (
                    <div
                      key={mode.id}
                      className="zikr-glass-subcard flex flex-col justify-between rounded-2xl p-3.5"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                        <h4 className="text-sm font-semibold leading-[1.42] text-[var(--text-primary)]">
                          {mode.title}
                        </h4>
                        <span className="text-[11px] font-medium leading-[1.4] text-emerald-500">
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
            <article className="zikr-glass zikr-glass-interactive zikr-anim-up-delay-1 flex flex-col justify-between md:col-span-1 lg:col-span-5 min-w-0 rounded-2xl sm:rounded-3xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                >
                  {items[2].number}.
                </span>
                <span className="zikr-icon-orb">{getIcon(items[2].id)}</span>
              </div>
              <div className="mt-2.5">
                <h3 className="zikr-heading-card text-[var(--text-primary)]">
                  {items[2].title}
                </h3>
                <p className="zikr-body-card mt-1.5 text-[var(--text-secondary)]">
                  {items[2].description}
                </p>
              </div>
            </article>
          )}

          {/* FEATURE 04: الكتب الإسلامية (Row 3, Col 1-6 on lg; Row 3, Col 1 on md) */}
          {items[3] && (
            <article className="zikr-glass zikr-glass-interactive zikr-anim-up-delay-1 flex flex-col justify-between md:col-span-1 lg:col-span-6 min-w-0 rounded-2xl sm:rounded-3xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                >
                  {items[3].number}.
                </span>
                <span className="zikr-icon-orb">{getIcon(items[3].id)}</span>
              </div>
              <div className="mt-2.5">
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
            <article className="zikr-glass zikr-glass-interactive zikr-anim-up-delay-2 flex flex-col justify-between md:col-span-1 lg:col-span-6 min-w-0 rounded-2xl sm:rounded-3xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-emerald-500 tabular-nums"
                >
                  {items[4].number}.
                </span>
                <span className="zikr-icon-orb">{getIcon(items[4].id)}</span>
              </div>
              <div className="mt-2.5">
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
