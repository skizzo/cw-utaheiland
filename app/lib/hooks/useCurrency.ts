import type {TGraphQl} from "../types"

import {useRootLoaderData} from "./useRootLoaderData"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useCurrency = (): TGraphQl.Currency => {
  const rootData = useRootLoaderData()
  // return (rootData?.currency ?? "EUR") as TGraphQl.Currency
  return rootData?.currency ?? "EUR"
}
