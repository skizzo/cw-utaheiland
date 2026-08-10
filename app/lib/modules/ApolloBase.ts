import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client"

import {Config} from "../config"
import {getEnv} from "../utils"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class ApolloBase {
  //
  private static browserClient: ApolloClient | null = null

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static getGraphQlUrl() {
    const env = getEnv()
    const graphQlUrl = env === "production" || !Config.app.debug.useLocalGraphQl ? "https://service.iazzu.com/graphql" : `http://${Config.app.debug.localIp}:5001/graphql`
    // debugger
    return graphQlUrl
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static getClient() {
    const uri = this.getGraphQlUrl()

    // On the server, always create a fresh client per request
    if (typeof window === "undefined") {
      return new ApolloClient({
        ssrMode: true,
        link: new HttpLink({uri}),
        cache: new InMemoryCache(),
      })
    }

    // On the client, reuse a singleton
    if (!ApolloBase.browserClient) {
      ApolloBase.browserClient = new ApolloClient({
        link: new HttpLink({uri}),
        cache: new InMemoryCache(),
      })
    }

    return ApolloBase.browserClient
  }
}
