import React from 'react';
import { Clock, Download, HelpCircle, Smartphone } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { AUTHENTIC_APK_URL } from '../config/release';
import { IslamicGeometricOrnament } from './GeometricMotif';
import { ZikrEmblem } from './ZikrLogo';

export const DownloadSection: React.FC = () => {
  const { t, setActiveView } = usePreferences();
  const isAvailable = Boolean(AUTHENTIC_APK_URL);

  return (
    <section
      id="download"
      className="relative my-auto w-full min-w-0 shrink-0 py-3 sm:py-5"
    >
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="zikr-glass-strong zikr-anim-up relative overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] p-5 sm:p-8 lg:p-10">
          {/* Decorative Geometric Background Accent */}
          <IslamicGeometricOrnament className="absolute -end-24 -bottom-24 h-72 w-72 text-emerald-500/25" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 min-w-0">
              <p className="text-xs font-semibold leading-[1.4] text-emerald-500">
                {t.download.sectionIndex}
              </p>

              <h2 className="zikr-heading-section mt-1.5 text-[var(--text-primary)]">
                {t.download.heading}
              </h2>

              <p className="zikr-body-lead mt-2.5 text-[var(--text-secondary)]">
                {t.download.description}
              </p>

              {/* Unboxed Metadata Status Row */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text-primary)]">
                  <Smartphone className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>{t.download.platformLabel}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {t.download.statusLabel}{' '}
                  <strong className="font-semibold text-emerald-500">
                    {t.download.comingSoon}
                  </strong>
                </span>
              </div>

              {/* Single Prominent Call to Action */}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                {isAvailable && AUTHENTIC_APK_URL ? (
                  <a
                    href={AUTHENTIC_APK_URL}
                    download
                    className="zikr-btn-primary inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 whitespace-nowrap shrink-0"
                  >
                    <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{t.download.downloadButtonReady}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="zikr-floating-bar inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-[var(--text-primary)] opacity-90 cursor-not-allowed whitespace-nowrap shrink-0"
                  >
                    <Clock className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>{t.download.downloadButtonUnavailable}</span>
                  </button>
                )}
              </div>

              {/* Honest Availability Explanation */}
              {!isAvailable && (
                <div className="mt-5 border-t border-[var(--border-subtle)] pt-4 space-y-3">
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                    {t.download.honestNotice}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveView('faq')}
                    className="zikr-control-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
                    <span>{t.download.readFaqLink}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Official ZIKR Application Emblem / PFP Showcase */}
            <div className="lg:col-span-4 min-w-0 flex flex-col items-center justify-center text-center">
              <div className="zikr-glass rounded-full p-3 sm:p-4 shadow-2xl">
                <ZikrEmblem size="xl" />
              </div>
              <p
                dir="ltr"
                className="mt-3 font-brand text-xs font-semibold tracking-[0.22em] text-[var(--text-muted)]"
              >
                ZIKR · ANDROID
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
