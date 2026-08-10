import {useTranslation} from "react-i18next"

import type {TAppLang} from "../types"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useIntlLocale = () => {
  const {i18n} = useTranslation()
  const locale = i18n.language as TAppLang // "en" | "de" | "es" | "fr"
  return locale
}
