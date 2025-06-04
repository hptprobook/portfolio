'use client';

import React from 'react';
import { motion } from 'framer-motion';

type ContentSection = 'about' | 'projects' | 'skills' | 'contact';

interface VerticalNavbarProps {
  activeSection: ContentSection;
  onSectionChange: (section: ContentSection) => void;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({
  activeSection,
  onSectionChange
}) => {
  const navItems = [
    { id: 'about', label: 'About', icon: '👨‍💻' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ] as const;

  return (
    <motion.nav
      className="fixed left-0 top-0 h-full w-20 bg-gray-800/90 backdrop-blur-sm border-r border-gray-700 z-40"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id as ContentSection)}
              className={`relative group p-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25' 
                  : 'hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon */}
              <div className="text-2xl mb-2">{item.icon}</div>
              
              {/* Label */}
              <div className={`text-xs font-medium ${
                isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
              }`}>
                {item.label}
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-l-full"
                  layoutId="activeIndicator"
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Hover tooltip */}
              <motion.div
                className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                {item.label}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </motion.div>
            </motion.button>
          );
        })}

        {/* Decorative line */}
        <motion.div
          className="w-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </div>
    </motion.nav>
  );
};

export default VerticalNavbar; 