import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import { usePortfolio } from '@/lib/portfolio-context';
import type { Language } from '@/data/portfolio';

export default function Navbar() {
  const { content, language, setLanguage, theme, toggleTheme } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 40);
      setProgress(
        docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0,
      );
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageChange = (next: Language) => {
    setLanguage(next);
    setMobileOpen(false);
  };

  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  const controls = (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-1 rounded-full border border-border/70 bg-background/70 p-1"
        aria-label={content.nav.languageLabel}
      >
        <Languages size={14} className="ml-1 text-muted-foreground" />
        {(['vi', 'en'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleLanguageChange(item)}
            className={`h-7 min-w-8 rounded-full px-2 text-xs font-mono transition-colors ${
              language === item
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={language === item}
            data-testid={`nav-language-${item}`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="h-9 w-9 rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40"
        aria-label={content.nav.themeLabel}
        data-testid="nav-theme-toggle"
      >
        <ThemeIcon size={16} className="mx-auto" />
      </button>
    </div>
  );

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        }`}
        data-testid="navbar"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-primary text-xs sm:text-sm font-medium tracking-widest uppercase whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            data-testid="nav-logo"
          >
            {content.profile.logo}
          </motion.a>

          <ul className="hidden lg:flex items-center gap-6 uppercase">
            {content.nav.links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="relative text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  data-testid={`nav-link-${link.testId}`}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {controls}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-testid="nav-cta"
            >
              {content.nav.cta}
            </motion.a>
          </div>

          <button
            type="button"
            className="md:hidden h-9 w-9 rounded-full border border-border/70 text-foreground flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="nav-mobile-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/30">
          <motion.div
            className="h-full origin-left"
            style={{
              background:
                'linear-gradient(to right, hsl(var(--primary)), hsl(200 100% 60%), hsl(var(--primary)))',
              backgroundSize: '200% 100%',
              boxShadow: '0 0 8px hsl(var(--primary) / 0.7)',
              width: `${progress}%`,
            }}
            animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-16 px-6"
            data-testid="nav-mobile-menu"
          >
            <div className="pt-6">{controls}</div>
            <ul className="flex flex-col gap-6 pt-8">
              {content.nav.links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-2xl font-serif font-medium text-foreground hover:text-primary transition-colors"
                    data-testid={`nav-mobile-link-${link.testId}`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
