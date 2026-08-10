import {useRouteLoaderData} from "react-router"

import type {loader as rootLoader} from "~/root"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useRootLoaderData = () => {
  const rootData = useRouteLoaderData<typeof rootLoader>("root")
  return rootData!
}
