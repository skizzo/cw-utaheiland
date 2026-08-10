import type {TGraphQl} from "../types"

import {useRootLoaderData} from "./useRootLoaderData"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useDimensionsUnit = (): TGraphQl.DimensionsUnit => {
  const rootData = useRootLoaderData()
  return (rootData?.dimensionsUnit ?? "cm") as TGraphQl.DimensionsUnit
}
