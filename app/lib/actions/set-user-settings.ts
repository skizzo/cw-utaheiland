import {type ActionFunctionArgs, redirect} from "react-router"

import {currencyCookie, dimensionsUnitCookie, localeCookie} from "~/lib/cookies"

// import {IntlModule} from "~/lib/modules"
// import type {TAppLang} from "~/lib/types"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const currency = formData.get("currency") as string | null
  const dimensionsUnit = formData.get("dimensionsUnit") as string | null
  const locale = formData.get("locale") as string | null

  const headers = new Headers()
  headers.append("Referer", request.headers.get("Referer") ?? "/")

  if (currency) {
    headers.append("Set-Cookie", await currencyCookie.serialize(currency))
  }
  if (dimensionsUnit) {
    headers.append("Set-Cookie", await dimensionsUnitCookie.serialize(dimensionsUnit))
  }
  if (locale) {
    headers.append("Set-Cookie", await localeCookie.serialize(locale))
    // IntlModule.setLang(locale as TAppLang)
  }

  return redirect(request.headers.get("Referer") ?? "/", {headers})
}
