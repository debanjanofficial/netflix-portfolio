import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type LanguageCode = 'en' | 'de' | 'no' | 'fi' | 'sv' | 'da' | 'it' | 'nl' | 'fr' | 'es' | 'pl' | 'cs' | 'pt';

export const languageOptions: Array<{ code: LanguageCode; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'no', label: 'Norsk' },
  { code: 'fi', label: 'Suomi' },
  { code: 'sv', label: 'Svenska' },
  { code: 'da', label: 'Dansk' },
  { code: 'it', label: 'Italiano' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'pl', label: 'Polski' },
  { code: 'cs', label: 'Čeština' },
  { code: 'pt', label: 'Português' },
];

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
}

const STORAGE_KEY = 'portfolioLanguage';

const supportedLanguageCodes = languageOptions.map(({ code }) => code);
const isLanguageCode = (value: string | null): value is LanguageCode =>
  value !== null && supportedLanguageCodes.includes(value as LanguageCode);

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
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLanguageCode(stored) ? stored : 'en';
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const allTranslations = useMemo(() => {
    return Object.fromEntries(
      supportedLanguageCodes.map((code) => [code, translations[code] ?? {}]),
    ) as Record<LanguageCode, Record<string, string>>;
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
