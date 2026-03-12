import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationHI from './locales/hi.json';
import translationKN from './locales/kn.json';
import translationTA from './locales/ta.json';
import translationTE from './locales/te.json';
import translationES from './locales/es.json';
import translationFR from './locales/fr.json';

const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
  kn: { translation: translationKN },
  ta: { translation: translationTA },
  te: { translation: translationTE },
  es: { translation: translationES },
  fr: { translation: translationFR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
