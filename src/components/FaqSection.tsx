import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePreferences } from '../context/PreferencesContext';

export const FaqSection: React.FC = () => {
  const { t } = usePreferences();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = t.faq.items.length;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = (index + 1) % count;
      buttonRefs.current[next]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = (index - 1 + count) % count;
      buttonRefs.current[prev]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      buttonRefs.current[count - 1]?.focus();
    }
  };

  return (
    <section
      id="faq"
      className="relative w-full min-w-0 shrink-0 py-6 sm:py-10 lg:py-12"
    >
      {/* Gentle Ambient Light Reflection Behind FAQ Accordion */}
      <div
        aria-hidden="true"
        className="zikr-section-reflection zikr-ambient-orb-2 absolute top-1/2 left-1/2 -z-10 h-[22rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, var(--ambient-ice) 0%, var(--ambient-emerald-soft) 50%, transparent 75%)',
        }}
      />

      <div className="mx-auto w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-start shrink-0">
          <p
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
            className="text-xs font-semibold leading-[1.4] text-emerald-500"
          >
            {t.faq.sectionIndex}
          </p>
          <h2
            data-zikr-reveal="heading"
            style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
            className="zikr-heading-section mt-1.5 text-[var(--text-primary)]"
          >
            {t.faq.heading}
          </h2>
          <p
            data-zikr-reveal="editorial"
            style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
            className="zikr-body-lead mt-2 text-[var(--text-secondary)]"
          >
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="mt-5 sm:mt-6 space-y-3">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `zikr-faq-panel-${idx}`;
            const headerId = `zikr-faq-header-${idx}`;

            return (
              <div
                key={idx}
                data-zikr-reveal="card"
                style={{ '--reveal-delay': `${idx * 60}ms` } as React.CSSProperties}
                className={`overflow-hidden rounded-[1.75rem] sm:rounded-3xl transition-all duration-200 ${
                  isOpen
                    ? 'zikr-floating-bar border-[var(--border-active-pill)]'
                    : 'zikr-glass zikr-glass-interactive'
                }`}
              >
                <h3>
                  <button
                    ref={(el) => {
                      buttonRefs.current[idx] = el;
                    }}
                    id={headerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="flex w-full min-w-0 items-center justify-between gap-3 sm:gap-4 px-4 py-4 sm:px-6 sm:py-4.5 text-start text-sm sm:text-base font-semibold leading-[1.45] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded-[1.75rem] sm:rounded-3xl cursor-pointer"
                  >
                    <span className="min-w-0 flex-1 break-words">{item.question}</span>
                    <span
                      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                        isOpen ? 'zikr-nav-item-active' : 'zikr-pill-track'
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-emerald-500 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-0.5 sm:px-6 sm:pb-5">
                        <p className="zikr-body-card text-[var(--text-secondary)]">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
