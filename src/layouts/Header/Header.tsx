'use client';

import { useState, useEffect } from 'react';
import { Home, User, Briefcase, BookOpen, MoreHorizontal, Phone } from 'lucide-react';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home', icon: Home, id: 'home' },
    { name: 'About', href: '#about', icon: User, id: 'about' },
    { name: 'Work', href: '#work', icon: Briefcase, id: 'work' },
    { name: 'Blog', href: '#blog', icon: BookOpen, id: 'blog' },
    { name: 'More', href: '#more', icon: MoreHorizontal, id: 'more' },
  ];

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center">
                <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center font-bold text-lg">
                  AB
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex items-center">
              <a
                href="#contact"
                className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Book a Call
              </a>
            </div>

            {/* Mobile Logo Only */}
            <div className="md:hidden"></div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-gray-700 safe-area-inset-bottom">
        <div className="grid grid-cols-5 px-2 py-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-white bg-gray-800/50' 
                    : 'text-gray-500 hover:text-gray-300 active:bg-gray-800/30'
                }`}
              >
                <IconComponent className={`h-6 w-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
                <span className="text-xs font-medium leading-none">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile CTA Button (Floating) */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <a
          href="#contact"
          className="bg-white text-black p-4 rounded-full shadow-2xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
          aria-label="Book a Call"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>
    </>
  );
};

export default Header; 