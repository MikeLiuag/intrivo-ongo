import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en';
import es from './locales/es';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => cb(Localization.locale.split('-')[0]),
  // detect: cb => cb('es'),
  init: () => {},
  cacheUserLanguage: () => {},
};

const exec = async () => {
  await i18next.use(languageDetector).use(initReactI18next).init({
    fallbackLng: 'en',
    resources: {
      en,
      es,
    },
  });
};

export default exec;
export { i18next };
