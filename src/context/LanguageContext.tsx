import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type LanguageCode = 'en' | 'de';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
}

const STORAGE_KEY = 'netflixPortfolioLanguage';

const defaultTranslations: Record<LanguageCode, Record<string, string>> = {
  en: {},
  de: {},
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  translations: Record<LanguageCode, Record<string, string>>;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, translations }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }
    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    return stored === 'de' ? 'de' : 'en';
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const allTranslations = useMemo(() => {
    return {
      en: { ...defaultTranslations.en, ...translations.en },
      de: { ...defaultTranslations.de, ...translations.de },
    };
  }, [translations]);

  const value = useMemo<LanguageContextValue>(() => {
    const dictionary = allTranslations[language] || {};
    const fallbackDictionary = allTranslations.en || {};

    const t = (key: string) => {
      if (dictionary[key] !== undefined) {
        return dictionary[key];
      }
      if (fallbackDictionary[key] !== undefined) {
        return fallbackDictionary[key];
      }
      return key;
    };

    const setLanguage = (code: LanguageCode) => {
      setLanguageState(code);
    };

    return {
      language,
      setLanguage,
      t,
    };
  }, [language, allTranslations]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
