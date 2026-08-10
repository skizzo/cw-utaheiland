import * as Sentry from "@sentry/react-router"

import {createRequire} from "module"

const require = createRequire(import.meta.url)
const {version} = require("./package.json")

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  debug: false,

  // Enable logs to be sent to Sentry
  enableLogs: true,
  tracesSampleRate: 0,

  // release: version,
  dist: "server",
  environment: "production",

  beforeSend(event) {
    // Ignore router errors for unknown/bot URL probes
    if (event.exception?.values?.[0]?.type === "Error") {
      const msg = event.exception.values[0].value ?? ""
      if (msg.includes("No route matches URL")) return null
    }
    return event
  },

  ignoreErrors: [
    //
    "No route matches URL",
    "did not provide an `action`",
  ],
})
