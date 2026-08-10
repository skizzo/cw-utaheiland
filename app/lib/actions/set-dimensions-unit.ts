import {type ActionFunctionArgs, redirect} from "react-router"

import {dimensionsUnitCookie} from "~/lib/cookies"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const dimensionsUnit = formData.get("dimensionsUnit") as string

  return redirect(request.headers.get("Referer") ?? "/", {
    headers: {"Set-Cookie": await dimensionsUnitCookie.serialize(dimensionsUnit)},
  })
}
