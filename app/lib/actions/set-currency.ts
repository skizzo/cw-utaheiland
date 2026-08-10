import {type ActionFunctionArgs, redirect} from "react-router"

import {currencyCookie} from "~/lib/cookies"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const currency = formData.get("currency") as string

  return redirect(request.headers.get("Referer") ?? "/", {
    headers: {"Set-Cookie": await currencyCookie.serialize(currency)},
  })
}
