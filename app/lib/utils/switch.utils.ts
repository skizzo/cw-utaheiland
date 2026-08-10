///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Helper Function for exhaustive `switch` statements. 
 *
 * **If this function throws an error**, not all cases for a **union type** are handled in the switch statement above.
 * 
 * @example
 *  ```ts
    type Env = "client" | "server"
    // ✅ okay - both values for union type handled in switch statement

    type Env = "client" | "server" | "other"
    // ❌ Typescript error - value "other" not handled in switch statement

    const getUrl = (env: Env) => {
      switch (env) {
        case "client":
          return "localhost" // handled
        case "server":
          return "server.com" // handled
        default:
          assertNever(env, `Environment`)
      }
      return "fallback.com"
    }

    getUrl("client")
 *  ```
 */
export const assertNever = (x: never, source: string, type: string) => {
  if (process.env.NODE_ENV !== "test") {
    console.warn(`assertNever() @ ${source}: Unhandled ${type} '${x}'`)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Env = "client" | "server"
// ✅ okay - both values for union type handled in switch statement

// type Env = "client" | "server" | "other"
// ❌ Typescript error - value "other" not handled in switch statement

const getUrl = (env: Env) => {
  switch (env) {
    case "client":
      return "localhost" // handled
    case "server":
      return "server.com" // handled
    default:
      assertNever(env, `getUrl()`, "env")
  }
  return "fallback.com"
}

getUrl("client")
