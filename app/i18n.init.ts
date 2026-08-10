import {initReactI18next} from "react-i18next"

import {fallbackLng, supportedLngs} from "./i18n"
import i18n from "i18next"

import de from "./locales/de.json"
import en from "./locales/en.json"
import es from "./locales/es.json"
import fr from "./locales/fr.json"

export const resources = {
  en: {translation: en},
  de: {translation: de},
  es: {translation: es},
  fr: {translation: fr},
}

export async function initI18n(locale: string) {
  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      lng: locale,
      fallbackLng,
      supportedLngs,
      resources,
      interpolation: {escapeValue: false},
    })
  } else {
    await i18n.changeLanguage(locale) // ← await this
  }
}

export default i18n
