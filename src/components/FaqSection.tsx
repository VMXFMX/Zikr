import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
      className="relative my-auto w-full min-w-0 shrink-0 py-3 sm:py-5"
    >
      <div className="mx-auto w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="zikr-anim-fade text-start shrink-0">
          <p className="text-xs font-semibold leading-[1.4] text-emerald-500">
            {t.faq.sectionIndex}
          </p>
          <h2 className="zikr-heading-section mt-1 text-[var(--text-primary)]">
            {t.faq.heading}
          </h2>
          <p className="zikr-body-lead mt-1.5 text-[var(--text-secondary)]">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="zikr-anim-up mt-4 sm:mt-5 space-y-2.5">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `zikr-faq-panel-${idx}`;
            const headerId = `zikr-faq-header-${idx}`;

            return (
              <div
                key={idx}
                className={`rounded-3xl transition-all duration-200 ${
                  isOpen
                    ? 'zikr-floating-bar border-[var(--border-active-pill)]'
                    : 'zikr-glass hover:border-[var(--border-glass-highlight)]'
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
                    className="flex w-full items-center justify-between gap-4 px-5 py-3.5 sm:px-6 sm:py-4 text-start text-sm sm:text-base font-semibold leading-[1.45] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded-3xl cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
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

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  hidden={!isOpen}
                  className={isOpen ? 'px-5 pb-4 pt-0.5 sm:px-6 sm:pb-5' : 'hidden'}
                >
                  <p className="zikr-body-card text-[var(--text-secondary)]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
