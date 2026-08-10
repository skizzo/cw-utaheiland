// import {fallbackLng, supportedLngs} from "./i18n"
import {fallbackLng, supportedLngs} from "./i18n"
import {resources} from "./i18n.init"
import {createInstance} from "i18next"
import type {TFunction} from "i18next"

import {localeCookie} from "~/lib/cookies"
import type {TAppLang} from "~/lib/types"
import {getAppLang} from "~/lib/utils"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const detectLanguage = async (request: Request): Promise<TAppLang> => {
  // 1. Check cookie (user's saved preference)
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await localeCookie.parse(cookieHeader)) as TAppLang | null
  if (cookie && supportedLngs.includes(cookie)) return cookie

  // 2. Fall back to Accept-Language header
  const acceptLang = request.headers.get("Accept-Language") ?? ""
  const preferred = acceptLang.split(",")[0].split("-")[0].trim()
  if (supportedLngs.includes(preferred)) return getAppLang(preferred)

  return fallbackLng
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const cache = new Map<string, TFunction>()

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function getT(locale: string): Promise<TFunction> {
  if (cache.has(locale)) return cache.get(locale)!

  const instance = createInstance()
  await instance.init({
    lng: locale,
    fallbackLng,
    supportedLngs,
    // defaultNS: "translation",
    resources,
    interpolation: {escapeValue: false},
  })

  const t = instance.t.bind(instance)
  cache.set(locale, t)
  return t
}
