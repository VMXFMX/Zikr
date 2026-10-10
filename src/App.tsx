/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
import { AmbientAtmosphere } from './components/GeometricMotif';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutAndPhilosophy } from './components/AboutAndPhilosophy';
import { FeaturesSection } from './components/FeaturesSection';
import { DownloadSection } from './components/DownloadSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

const ZikrViewportContent: React.FC = () => {
  const { activeView } = usePreferences();
  const mainRef = useRef<HTMLElement>(null);

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
        className="zikr-main-viewport relative flex flex-col"
      >
        {activeView === 'home' && <HeroSection />}
        {activeView === 'about' && <AboutAndPhilosophy />}
        {activeView === 'features' && <FeaturesSection />}
        {activeView === 'download' && <DownloadSection />}
        {activeView === 'faq' && <FaqSection />}
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

