import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FolderUp,
  Layers,
  Maximize2,
  Sparkles,
  X,
} from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';

type ScreenshotId =
  | 'home'
  | 'quran-mushaf'
  | 'quran-reading'
  | 'quran-cards'
  | 'azkar'
  | 'sebha';

/**
 * Exact original user-provided screenshot filenames mapped to each Overview slot.
 * These images are rendered directly via <img> without regeneration, cropping,
 * recoloring, or CSS filters.
 */
const ORIGINAL_SCREENSHOT_FILES: Record<ScreenshotId, string> = {
  home: 'photo_2026-10-10_14-08-14.jpg',
  'quran-mushaf': 'photo_2026-10-10_14-07-57.jpg',
  'quran-reading': 'photo_2026-10-10_14-08-02.jpg',
  'quran-cards': 'photo_2026-10-10_14-08-06.jpg',
  azkar: 'photo_2026-10-10_14-07-46.jpg',
  sebha: 'photo_2026-10-10_14-07-09.jpg',
};

const CANDIDATE_DIRECTORIES = [
  '',
  '/src/assets/images',
  '/src/assets',
  '/assets/images',
  '/assets',
  '/screenshots',
];

const IDB_NAME = 'zikr_original_screenshots_db';
const IDB_STORE = 'screenshots';

function openScreenshotsDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function loadStoredScreenshots(): Promise<Record<string, string>> {
  try {
    const db = await openScreenshotsDb();
    return await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const result: Record<string, string> = {};
      const cursorReq = store.openCursor();
      cursorReq.onsuccess = () => {
        const cursor = cursorReq.result;
        if (cursor) {
          if (typeof cursor.key === 'string' && typeof cursor.value === 'string') {
            result[cursor.key] = cursor.value;
          }
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      cursorReq.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

async function saveStoredScreenshot(fileName: string, dataUrl: string): Promise<void> {
  try {
    const db = await openScreenshotsDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(dataUrl, fileName);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Ignore storage quota/availability errors
  }
}

/**
 * Renders the exact original uploaded screenshot file inside the smartphone viewport
 * with zero filters, zero recoloring, and zero cropping.
 */
const OriginalScreenshotImage: React.FC<{
  id: ScreenshotId;
  alt: string;
  customSrc?: string;
  onSelectFilesClick?: () => void;
}> = ({ id, alt, customSrc, onSelectFilesClick }) => {
  const fileName = ORIGINAL_SCREENSHOT_FILES[id];
  const candidatePaths = CANDIDATE_DIRECTORIES.map((dir) => `${dir}/${fileName}`);
  const [pathIndex, setPathIndex] = useState(0);
  const [missingOnDisk, setMissingOnDisk] = useState(false);

  useEffect(() => {
    setPathIndex(0);
    setMissingOnDisk(false);
  }, [fileName, customSrc]);

  const activeSrc = customSrc || candidatePaths[pathIndex];

  if (missingOnDisk && !customSrc) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
        <p className="font-mono text-[11px] font-semibold text-emerald-400 break-all">
          {fileName}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          Original image file not found in project folder (<code>/public/{fileName}</code> or{' '}
          <code>/src/assets/images/{fileName}</code>).
        </p>
        {onSelectFilesClick && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectFilesClick();
            }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 cursor-pointer"
          >
            <FolderUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Load Original Photos</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      decoding="async"
      onError={() => {
        if (!customSrc && pathIndex + 1 < candidatePaths.length) {
          setPathIndex((prev) => prev + 1);
        } else if (!customSrc) {
          setMissingOnDisk(true);
        }
      }}
      className="block h-full w-full object-contain select-none"
    />
  );
};

/**
 * Elegant Smartphone Hardware Frame wrapping each original ZIKR Android screenshot
 */
const SmartphoneFrame: React.FC<{
  id: ScreenshotId;
  alt: string;
  customSrc?: string;
  onSelectFilesClick?: () => void;
  isSelected?: boolean;
  large?: boolean;
}> = ({
  id,
  alt,
  customSrc,
  onSelectFilesClick,
  isSelected = false,
  large = false,
}) => {
  return (
    <div
      className={`relative mx-auto select-none transition-transform duration-200 ${
        large ? 'w-[290px] sm:w-[330px]' : 'w-[258px] sm:w-[276px]'
      }`}
    >
      {/* Subtle Emerald & Ice-Blue Ambient Glow Behind Smartphone */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-3 -z-10 rounded-[3rem] blur-2xl transition-opacity duration-300 ${
          isSelected ? 'opacity-90' : 'opacity-55 group-hover:opacity-85'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(16, 185, 129, 0.24) 0%, rgba(56, 189, 248, 0.16) 48%, transparent 76%)',
        }}
      />

      {/* Outer Metallic Dark Navy Phone Chassis */}
      <div
        className={`relative overflow-hidden rounded-[2.4rem] border bg-[#050B14] p-2.5 shadow-[0_24px_54px_-12px_rgba(2,6,23,0.88),inset_0_1px_0_0_rgba(255,255,255,0.18)] transition-colors duration-200 ${
          isSelected
            ? 'border-emerald-400/50'
            : 'border-slate-700/60 group-hover:border-emerald-400/40'
        }`}
      >
        {/* Top Speaker & Front Camera Bezel */}
        <div className="relative z-20 mx-auto mb-1.5 flex h-3.5 w-24 items-center justify-center gap-2 rounded-full bg-[#03070E] px-3">
          <span className="h-1 w-8 rounded-full bg-slate-800" />
          <span className="h-1.5 w-1.5 rounded-full bg-sky-900/80 ring-1 ring-slate-700" />
        </div>

        {/* Inner Smartphone Viewport Screen displaying the exact unmodified photo */}
        <div
          className={`relative w-full overflow-hidden rounded-[1.85rem] border border-white/[0.08] bg-[#070E17] ${
            large ? 'h-[530px] sm:h-[580px]' : 'h-[476px] sm:h-[504px]'
          }`}
        >
          <OriginalScreenshotImage
            id={id}
            alt={alt}
            customSrc={customSrc}
            onSelectFilesClick={onSelectFilesClick}
          />
        </div>

        {/* Bottom Android Gesture Pill Indicator */}
        <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-slate-700/70" />
      </div>
    </div>
  );
};

export const AboutAndPhilosophy: React.FC = () => {
  const { t, setActiveView, dir } = usePreferences();
  const carouselRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeScreenIndex, setActiveScreenIndex] = useState<number>(0);
  const [zoomedScreenIndex, setZoomedScreenIndex] = useState<number | null>(null);
  const [storedFiles, setStoredFiles] = useState<Record<string, string>>({});

  const screenshots = t.intro.screenshots.items;

  useEffect(() => {
    loadStoredScreenshots().then((loaded) => {
      setStoredFiles(loaded);
    });
  }, []);

  const handleOriginalFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const orderedSlots: ScreenshotId[] = [
      'home',
      'quran-mushaf',
      'quran-reading',
      'quran-cards',
      'azkar',
      'sebha',
    ];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== 'string') return;
        const dataUrl = reader.result;

        // Match by exact filename first, or by selection order if filenames differ
        const matchedSlot = (Object.keys(ORIGINAL_SCREENSHOT_FILES) as ScreenshotId[]).find(
          (slotId) => ORIGINAL_SCREENSHOT_FILES[slotId] === file.name
        );
        const targetFileName = matchedSlot
          ? ORIGINAL_SCREENSHOT_FILES[matchedSlot]
          : ORIGINAL_SCREENSHOT_FILES[orderedSlots[index % orderedSlots.length]];

        saveStoredScreenshot(targetFileName, dataUrl);
        setStoredFiles((prev) => ({
          ...prev,
          [targetFileName]: dataUrl,
        }));
      };
      reader.readAsDataURL(file);
    });

    event.target.value = '';
  };

  const triggerSelectOriginalFiles = () => {
    fileInputRef.current?.click();
  };

  const getHighlightIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <BookOpen className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />;
      case 1:
        return <Sparkles className="h-4 w-4 text-sky-400 shrink-0" aria-hidden="true" />;
      default:
        return <Layers className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />;
    }
  };

  const scrollToScreenshot = (index: number) => {
    const boundedIndex = (index + screenshots.length) % screenshots.length;
    setActiveScreenIndex(boundedIndex);
    const container = carouselRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('[data-screenshot-card]');
    const targetCard = cards[boundedIndex];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  // Close zoomed modal on Escape or navigate with Arrow keys
  useEffect(() => {
    if (zoomedScreenIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomedScreenIndex(null);
      } else if (event.key === 'ArrowRight') {
        setZoomedScreenIndex((prev) =>
          prev === null
            ? null
            : dir === 'rtl'
              ? (prev - 1 + screenshots.length) % screenshots.length
              : (prev + 1) % screenshots.length
        );
      } else if (event.key === 'ArrowLeft') {
        setZoomedScreenIndex((prev) =>
          prev === null
            ? null
            : dir === 'rtl'
              ? (prev + 1) % screenshots.length
              : (prev - 1 + screenshots.length) % screenshots.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedScreenIndex, dir, screenshots.length]);

  return (
    <section
      id="about"
      className="relative w-full min-w-0 shrink-0 py-3 sm:py-5 space-y-6 sm:space-y-8"
    >
      {/* Hidden input to allow loading the exact original unmodified image files directly */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handleOriginalFilesSelected}
      />

      {/* 1. Existing Overview Introduction Content (Unchanged) */}
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="zikr-glass zikr-anim-up rounded-[2rem] p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 items-center">
            {/* Primary Introduction Column */}
            <div className="lg:col-span-6 min-w-0">
              <p className="text-xs font-semibold leading-[1.4] text-emerald-500">
                {t.intro.sectionIndex}
              </p>
              <h2 className="zikr-heading-section mt-2 text-[var(--text-primary)]">
                {t.intro.heading}
              </h2>
              <p className="zikr-body-lead mt-3.5 text-[var(--text-secondary)]">
                {t.intro.description}
              </p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setActiveView('features')}
                  className="zikr-control-pill inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold leading-[1.4] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{t.intro.exploreFeaturesCta}</span>
                  <ArrowRight
                    className={`h-4 w-4 text-emerald-500 shrink-0 ${
                      dir === 'rtl' ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* Structured Pillars Column */}
            <div className="lg:col-span-6 min-w-0 space-y-3">
              {t.intro.highlights.map((item, index) => (
                <div
                  key={index}
                  className="zikr-glass-subcard rounded-2xl p-4 space-y-1.5"
                >
                  <div className="flex items-center gap-2.5">
                    {getHighlightIcon(index)}
                    <h3 className="text-sm sm:text-base font-semibold leading-[1.42] text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="zikr-body-card text-[var(--text-secondary)]">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dedicated App Screenshots Section */}
      <div
        id="app-screenshots"
        className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8"
      >
        <div className="zikr-glass zikr-anim-up-delay-1 relative overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:p-10">
          {/* Ambient Emerald & Ice-Blue Backdrop Illumination */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 start-1/3 -z-10 h-72 w-72 rounded-full blur-3xl opacity-65"
            style={{
              background:
                'radial-gradient(circle, var(--ambient-emerald) 0%, var(--ambient-ice) 52%, transparent 74%)',
            }}
          />

          {/* Section Header + Carousel Navigation Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl min-w-0">
              <p className="text-xs font-semibold leading-[1.4] text-emerald-500">
                {t.intro.screenshots.sectionIndex}
              </p>
              <h2 className="zikr-heading-section mt-2 text-[var(--text-primary)]">
                {t.intro.screenshots.heading}
              </h2>
              <p className="zikr-body-lead mt-2.5 text-[var(--text-secondary)]">
                {t.intro.screenshots.subtitle}
              </p>
            </div>

            {/* Smooth Carousel Arrow Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-end shrink-0">
              <button
                type="button"
                onClick={() => scrollToScreenshot(activeScreenIndex - 1)}
                aria-label={t.intro.screenshots.prevAria}
                className="zikr-control-pill inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
              >
                {dir === 'rtl' ? (
                  <ChevronRight className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={() => scrollToScreenshot(activeScreenIndex + 1)}
                aria-label={t.intro.screenshots.nextAria}
                className="zikr-control-pill inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
              >
                {dir === 'rtl' ? (
                  <ChevronLeft className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Quick-Select Screen Filter Tabs */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {screenshots.map((item, idx) => {
              const isSelected = activeScreenIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToScreenshot(idx)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'zikr-nav-item-active font-semibold text-[var(--text-primary)]'
                      : 'zikr-control-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Horizontal Swipeable Smartphone Carousel */}
          <div
            ref={carouselRef}
            className="mt-6 flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-2"
          >
            {screenshots.map((item, idx) => {
              const isSelected = activeScreenIndex === idx;
              const fileName = ORIGINAL_SCREENSHOT_FILES[item.id];
              return (
                <article
                  key={item.id}
                  data-screenshot-card
                  onClick={() => setActiveScreenIndex(idx)}
                  className="group relative flex w-[280px] sm:w-[308px] shrink-0 snap-center flex-col items-center rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--bg-subcard)] p-4 sm:p-5 transition-all duration-200 hover:border-[var(--border-glass-highlight)] cursor-pointer"
                >
                  {/* Top Enlarge Action Button */}
                  <div className="mb-3 flex w-full items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-emerald-400 tabular-nums">
                      0{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveScreenIndex(idx);
                        setZoomedScreenIndex(idx);
                      }}
                      aria-label={`${t.intro.screenshots.zoomAria}: ${item.label}`}
                      className="zikr-control-pill inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-emerald-400 focus-visible:outline-2 focus-visible:outline-emerald-500 cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Smartphone Hardware Frame with Original Unmodified ZIKR Screenshot */}
                  <SmartphoneFrame
                    id={item.id}
                    alt={item.label}
                    customSrc={storedFiles[fileName]}
                    onSelectFilesClick={triggerSelectOriginalFiles}
                    isSelected={isSelected}
                  />

                  {/* Short Screenshot Label & Description */}
                  <div className="mt-4 w-full text-center space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                      {item.label}
                    </h3>
                    <p className="zikr-body-card text-[var(--text-secondary)]">
                      {item.caption}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enlarged Smartphone Preview Modal */}
      {zoomedScreenIndex !== null && screenshots[zoomedScreenIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={screenshots[zoomedScreenIndex].label}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md zikr-anim-fade"
          onClick={() => setZoomedScreenIndex(null)}
        >
          <div
            className="zikr-floating-bar relative flex max-h-[94dvh] w-full max-w-lg flex-col items-center overflow-y-auto rounded-[2.25rem] p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex w-full items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm sm:text-base font-bold text-[var(--text-primary)]">
                  {screenshots[zoomedScreenIndex].label}
                </h3>
                <p className="truncate text-xs text-[var(--text-secondary)]">
                  {screenshots[zoomedScreenIndex].caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setZoomedScreenIndex(null)}
                aria-label={t.intro.screenshots.closeZoomAria}
                className="zikr-control-pill inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] hover:text-emerald-400 cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <SmartphoneFrame
              id={screenshots[zoomedScreenIndex].id}
              alt={screenshots[zoomedScreenIndex].label}
              customSrc={
                storedFiles[ORIGINAL_SCREENSHOT_FILES[screenshots[zoomedScreenIndex].id]]
              }
              onSelectFilesClick={triggerSelectOriginalFiles}
              isSelected
              large
            />

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setZoomedScreenIndex(
                    (zoomedScreenIndex - 1 + screenshots.length) % screenshots.length
                  )
                }
                aria-label={t.intro.screenshots.prevAria}
                className="zikr-control-pill inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-primary)] cursor-pointer"
              >
                {dir === 'rtl' ? (
                  <ChevronRight className="h-4 w-4 text-emerald-400" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-emerald-400" />
                )}
              </button>
              <span className="text-xs font-semibold text-[var(--text-secondary)] tabular-nums">
                {zoomedScreenIndex + 1} / {screenshots.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setZoomedScreenIndex((zoomedScreenIndex + 1) % screenshots.length)
                }
                aria-label={t.intro.screenshots.nextAria}
                className="zikr-control-pill inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-primary)] cursor-pointer"
              >
                {dir === 'rtl' ? (
                  <ChevronLeft className="h-4 w-4 text-emerald-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-emerald-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


