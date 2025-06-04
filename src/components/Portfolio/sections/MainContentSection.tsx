'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VerticalNavbar from '../components/VerticalNavbar';
import AboutSection from '../content/AboutSection';
import ProjectsSection from '../content/ProjectsSection';
import SkillsSection from '../content/SkillsSection';
import ContactSection from '../content/ContactSection';

type ContentSection = 'about' | 'projects' | 'skills' | 'contact';

const MainContentSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ContentSection>('about');
  const sections: ContentSection[] = ['about', 'projects', 'skills', 'contact'];

  // Handle scroll navigation between content sections only
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      // Prevent default scroll behavior
      e.preventDefault();

      const currentIndex = sections.indexOf(activeSection);
      
      if (e.deltaY > 0) {
        // Scrolling down
        if (currentIndex < sections.length - 1) {
          isScrolling = true;
          setActiveSection(sections[currentIndex + 1]);
          setTimeout(() => { isScrolling = false; }, 800);
        }
        // If at last section, do nothing (stay on contact)
      } else if (e.deltaY < 0) {
        // Scrolling up
        if (currentIndex > 0) {
          isScrolling = true;
          setActiveSection(sections[currentIndex - 1]);
          setTimeout(() => { isScrolling = false; }, 800);
        }
        // If at first section (about), do nothing (stay on about)
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      const currentIndex = sections.indexOf(activeSection);

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentIndex < sections.length - 1) {
            isScrolling = true;
            setActiveSection(sections[currentIndex + 1]);
            setTimeout(() => { isScrolling = false; }, 800);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentIndex > 0) {
            isScrolling = true;
            setActiveSection(sections[currentIndex - 1]);
            setTimeout(() => { isScrolling = false; }, 800);
          }
          break;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection, sections]);

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <motion.div
      className="min-h-screen flex text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Fixed Vertical Navbar */}
      <VerticalNavbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-20 p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation instructions */}
      <motion.div
        className="fixed bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-400 border border-gray-700"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="space-y-1">
          <div>↑↓ Scroll through: About → Projects → Skills → Contact</div>
          <div>⌨ Arrow keys for keyboard navigation</div>
          <div>🖱 Click sidebar icons for direct access</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MainContentSection; 