import {useRef} from "react"

import type {BranchLinkType, TAppLang, TGraphQl} from "../types"

import {ApolloModule} from "../modules"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useBranchLink = (type: BranchLinkType, identifier: string | undefined, lang: TAppLang) => {
  const branchLinkRef = useRef<{key: string; promise: Promise<TGraphQl.BranchLink | undefined>} | null>(null)
  const branchLinkKey = `${type}-${identifier}-${lang}`
  if (!branchLinkRef.current || branchLinkRef.current.key !== branchLinkKey) {
    branchLinkRef.current = {
      key: branchLinkKey,
      promise: ApolloModule.getAnyQr(type, identifier, lang),
    }
  }
  const branchLink = branchLinkRef.current.promise

  return branchLink
}
