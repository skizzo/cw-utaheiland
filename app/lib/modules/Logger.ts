import {getIsServer} from "../utils"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function createLog(prefix: string, showLogs = true) {
  const origin = getIsServer() ? "server" : "client"
  const tag = `[${origin}] ${prefix}`

  return {
    log: (...args: unknown[]) => {
      if (!showLogs) return

      // if last arg is an object
      if (__DEV__) console.log(tag, ...args)
    },
    warn: (...args: unknown[]) => {
      if (__DEV__) console.warn(tag, ...args)
    },
    error: (...args: unknown[]) => {
      console.error(tag, ...args) // always log errors
    },
  }
}
