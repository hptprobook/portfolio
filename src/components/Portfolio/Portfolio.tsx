'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomepageSection from './sections/HomepageSection';
import MainContentSection from './sections/MainContentSection';
import RocketTransition from './animations/RocketTransition';
import BackgroundAnimation from './animations/BackgroundAnimation';

const Portfolio: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<'homepage' | 'main'>('homepage');
  const [showRocket, setShowRocket] = useState(false);

  const handleLaunchClick = () => {
    setShowRocket(true);
  };

  const handleScrollToMain = () => {
    setShowRocket(true);
  };

  const handleRocketComplete = () => {
    setShowRocket(false);
    setCurrentSection('main');
  };

  // Handle scroll from homepage to main content
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      // Only handle scroll when on homepage and not showing rocket
      if (currentSection === 'homepage' && !showRocket) {
        // Check if scrolling down
        if (e.deltaY > 50) {
          handleScrollToMain();
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentSection, showRocket]);

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Background Animation - Always Present */}
      <BackgroundAnimation />
      
      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentSection === 'homepage' && !showRocket && (
            <HomepageSection key="homepage" onLaunchClick={handleLaunchClick} />
          )}
          
          {currentSection === 'main' && !showRocket && (
            <MainContentSection key="main" />
          )}
        </AnimatePresence>

        {/* Rocket Transition */}
        <AnimatePresence>
          {showRocket && (
            <RocketTransition key="rocket" onComplete={handleRocketComplete} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Portfolio; 