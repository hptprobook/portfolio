import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  portfolioContent,
  type Language,
  type PortfolioContent,
  type ThemeMode,
} from '@/data/portfolio';

interface PortfolioContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  content: PortfolioContent;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

const languageStorageKey = 'portfolio-language';
const themeStorageKey = 'portfolio-theme';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'vi';

  const stored = window.localStorage.getItem(languageStorageKey);
  if (stored === 'vi' || stored === 'en') return stored;

  return 'vi';
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem(themeStorageKey);
  if (stored === 'light' || stored === 'dark') return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      toggleTheme: () =>
        setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
      content: portfolioContent[language],
    }),
    [language, theme],
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error('usePortfolio must be used inside PortfolioProvider');
  }

  return context;
}
