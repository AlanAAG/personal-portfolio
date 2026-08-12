'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'es';

// Bilingual string: components pick with l(value, lang)
export type L = { en: string; es: string };

export function l(value: string | L, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}

const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored === 'en' || stored === 'es') {
      setLangState(stored);
    } else if (navigator.language.toLowerCase().startsWith('es')) {
      setLangState('es');
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem('lang', next);
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
