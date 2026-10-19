import React from 'react';
import { Clock, Download, HelpCircle, Smartphone } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { AUTHENTIC_APK_URL } from '../config/release';
import { ZikrEmblem } from './ZikrLogo';

export const DownloadSection: React.FC = () => {
  const { t, setActiveView } = usePreferences();
  const isAvailable = Boolean(AUTHENTIC_APK_URL);

  return (
    <section
      id="download"
      className="relative w-full min-w-0 shrink-0 py-6 sm:py-10 lg:py-12"
    >
      {/* Soft Ambient Light Reflection Behind Download Section */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-1 absolute top-1/2 left-1/2 -z-10 h-[24rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, var(--ambient-emerald) 0%, var(--ambient-ice-soft) 52%, transparent 76%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="zikr-glass-strong relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] p-5 sm:p-8 lg:p-10">
          <div className="relative z-10 grid grid-cols-1 items-center gap-7 sm:gap-9 lg:grid-cols-12">
            <div className="lg:col-span-8 min-w-0">
              <p
                data-zikr-reveal="heading"
                style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
                className="text-xs font-semibold leading-[1.4] text-emerald-500"
              >
                {t.download.sectionIndex}
              </p>

              <h2
                data-zikr-reveal="heading"
                style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
                className="zikr-heading-section mt-2 text-[var(--text-primary)]"
              >
                {t.download.heading}
              </h2>

              <p
                data-zikr-reveal="editorial"
                style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
                className="zikr-body-lead mt-3 text-[var(--text-secondary)]"
              >
                {t.download.description}
              </p>

              {/* Unboxed Metadata Status Row */}
              <div
                data-zikr-reveal="editorial"
                style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
                className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[var(--text-secondary)]"
              >
                <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text-primary)]">
                  <Smartphone className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>{t.download.platformLabel}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="break-words">
                  {t.download.statusLabel}{' '}
                  <strong className="font-semibold text-emerald-500">
                    {t.download.comingSoon}
                  </strong>
                </span>
              </div>

              {/* Single Prominent Call to Action */}
              <div
                data-zikr-reveal="button"
                style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
                className="mt-6 flex flex-wrap items-center gap-4"
              >
                {isAvailable && AUTHENTIC_APK_URL ? (
                  <a
                    href={AUTHENTIC_APK_URL}
                    download
                    className="zikr-btn-primary inline-flex w-full sm:w-auto max-w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 sm:px-7 text-xs sm:text-sm font-semibold text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                  >
                    <Download className="h-4 w-4 shrink-0 zikr-icon-bounce" aria-hidden="true" />
                    <span className="break-words">{t.download.downloadButtonReady}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="zikr-floating-bar inline-flex w-full sm:w-auto max-w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 sm:px-7 text-xs sm:text-sm font-semibold text-center text-[var(--text-primary)] opacity-90 cursor-not-allowed"
                  >
                    <Clock className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span className="break-words">{t.download.downloadButtonUnavailable}</span>
                  </button>
                )}
              </div>

              {/* Honest Availability Explanation */}
              {!isAvailable && (
                <div
                  data-zikr-reveal="editorial"
                  style={{ '--reveal-delay': '230ms' } as React.CSSProperties}
                  className="mt-6 border-t border-[var(--border-subtle)] pt-4 space-y-3"
                >
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] break-words">
                    {t.download.honestNotice}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveView('faq')}
                    className="zikr-control-pill inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-start text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
                    <span className="break-words">{t.download.readFaqLink}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Official ZIKR Application Emblem / PFP Showcase */}
            <div
              data-zikr-reveal="mockup"
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
              className="lg:col-span-4 min-w-0 flex flex-col items-center justify-center text-center"
            >
              <div className="zikr-glass zikr-glass-interactive zikr-glass-shimmer rounded-full p-3.5 sm:p-4 shadow-2xl">
                <ZikrEmblem size="xl" glow />
              </div>
              <p
                dir="ltr"
                className="mt-3.5 font-brand text-xs font-semibold tracking-[0.22em] text-[var(--text-muted)]"
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
