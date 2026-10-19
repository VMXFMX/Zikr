/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
import { AmbientAtmosphere } from './components/GeometricMotif';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import {
  AuthenticHadithSection,
  DailyRemembranceRhythmSection,
  FeaturedQuranSection,
  HomeClosingSection,
  HomeMinimalPillarsSection,
  VirtueOfDhikrSection,
} from './components/HomeSacredSections';
import { HomeSocialSection } from './components/HomeSocialSection';
import { AboutAndPhilosophy } from './components/AboutAndPhilosophy';
import { FeaturesSection } from './components/FeaturesSection';
import { DownloadSection } from './components/DownloadSection';
import { FaqSection } from './components/FaqSection';
import { useViewportReveal } from './hooks/useViewportReveal';

const ZikrViewportContent: React.FC = () => {
  const { activeView, language } = usePreferences();
  const mainRef = useRef<HTMLElement>(null);

  useViewportReveal(mainRef, `${activeView}-${language}`);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activeView]);

  return (
    <div className="zikr-viewport-shell relative selection:bg-emerald-500/20 selection:text-emerald-500">
      <AmbientAtmosphere />
      <Navbar />
      <main
        ref={mainRef}
        id="main-content"
        className="zikr-main-viewport relative z-10 flex flex-col pt-20 sm:pt-24 pb-36 sm:pb-44"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.985 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              if (mainRef.current) {
                mainRef.current.scrollTo({ top: 0, behavior: 'auto' });
              }
            }}
            className="flex w-full min-w-0 shrink-0 flex-col overflow-x-clip"
          >
            {activeView === 'home' && (
              <>
                <HeroSection />
                <VirtueOfDhikrSection />
                <FeaturedQuranSection />
                <DailyRemembranceRhythmSection />
                <AuthenticHadithSection />
                <HomeMinimalPillarsSection />
                <HomeClosingSection />
                <HomeSocialSection />
              </>
            )}
            {activeView === 'about' && <AboutAndPhilosophy />}
            {activeView === 'features' && <FeaturesSection />}
            {activeView === 'download' && <DownloadSection />}
            {activeView === 'faq' && <FaqSection />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <PreferencesProvider>
      <ZikrViewportContent />
    </PreferencesProvider>
  );
}

