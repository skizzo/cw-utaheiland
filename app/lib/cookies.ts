import {createCookie} from "react-router"

import {detectLanguage} from "~/i18n.server"

import type {TGraphQl} from "~/lib/types"

import {getAppCurrencies, getAppDimensionsUnits} from "./utils"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const localeCookie = createCookie("locale", {
  path: "/",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 365,
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const currencyCookie = createCookie("currency", {
  path: "/",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 365,
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const dimensionsUnitCookie = createCookie("dimensionsUnit", {
  path: "/",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 365,
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const detectCurrency = async (request: Request): Promise<TGraphQl.Currency> => {
  //
  // 1. check cookie (user's saved preference)
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await currencyCookie.parse(cookieHeader)) as string | null
  const appCurrencies = getAppCurrencies()
  if (cookie && (appCurrencies as string[]).includes(cookie)) return cookie as TGraphQl.Currency

  // 2. use Fallback
  return "EUR" as TGraphQl.Currency
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const detectDimensionsUnit = async (request: Request): Promise<TGraphQl.DimensionsUnit> => {
  //
  // 1. check cookie (user's saved preference)
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await dimensionsUnitCookie.parse(cookieHeader)) as string | null
  const appDimensionsUnits = getAppDimensionsUnits()
  if (cookie && (appDimensionsUnits as string[]).includes(cookie)) return cookie as TGraphQl.DimensionsUnit

  // 2. use Fallback
  return "cm" as TGraphQl.DimensionsUnit
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const detectCookieSettings = async (request: Request) => {
  const [locale, currency, dimensionsUnit] = await Promise.all([
    //
    detectLanguage(request),
    detectCurrency(request),
    detectDimensionsUnit(request),
  ])
  return {locale, currency, dimensionsUnit}
}
