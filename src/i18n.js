import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './locales/en.json'
import translationKO from './locales/ko.json'
import translationCN from './locales/zh-CN.json'
import translationJP from './locales/ja.json'
import translationVN from './locales/vi.json'

const resources = {
  vi: {
    translation: translationVN,
  },
  ko: {
    translation: translationKO,
  },
  'zh-CN': {
    translation: translationCN,
  },
  ja: {
    translation: translationJP,
  },
  en: {
    translation: translationEN,
  },
}

const languageGlobal = JSON.parse(localStorage.getItem('language')) || 'ko'

i18n.use(initReactI18next).init({
  resources: resources,
  lng: languageGlobal,
  fallbackLng: 'en',
  interpolation: {
    esbuildVersion: false,
  },
})

export default i18n
