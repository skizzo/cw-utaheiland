import {type ActionFunctionArgs, redirect} from "react-router"

import {localeCookie} from "~/lib/cookies"

// import {IntlModule} from "~/lib/modules"
// import type {TAppLang} from "~/lib/types"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const locale = formData.get("locale") as string

  // IntlModule.setLang(locale as TAppLang)

  return redirect(request.headers.get("Referer") ?? "/", {
    headers: {"Set-Cookie": await localeCookie.serialize(locale)},
  })
}
