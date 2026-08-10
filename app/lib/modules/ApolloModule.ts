import {Config} from "~/lib/config"
import {GraphQlQueries} from "~/lib/graphql"
import type {BranchLinkType, TAppLang, TGraphQl} from "~/lib/types"
import {sleep} from "~/lib/utils"

import {gql} from "@apollo/client"

import {ApolloBase} from "./ApolloBase"
import {createLog} from "./Logger"

const DEBUG = false && __DEV__
const log = createLog("ApolloModule")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class ApolloModule {
  //

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getAnyQr(type: BranchLinkType, identifier: string | undefined, lang: TAppLang) {
    if (!identifier) {
      return undefined
    }

    log.log("getAnyQr()", {type, identifier, lang})

    const {data} = await ApolloBase.getClient().query<{branchLink: TGraphQl.BranchLink}>({
      query: gql(GraphQlQueries.qr),
      variables: {
        type,
        identifier,
        useNewDomain: Config.app.useNewDomainBranch,
        lang,
      },
    })

    if (DEBUG) {
      await sleep(3000)
    }

    return data?.branchLink
  }
}
