import * as Sentry from "@sentry/react-router"
import {CacheProvider} from "@emotion/react"
import {reactRouterTracingIntegration} from "@sentry/react-router"
import {startTransition, StrictMode} from "react"
import {hydrateRoot} from "react-dom/client"
import {HydratedRouter} from "react-router/dom"

import {initI18n} from "./i18n.init"

import createEmotionCache from "./emotion/createEmotionCache"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // release: __APP_VERSION__,
  dist: "client",
  environment: __DEV__ ? "development" : "production",
  sendDefaultPii: true,
  integrations: [reactRouterTracingIntegration()],
  enableLogs: true,
  tracesSampleRate: 0,
  debug: __DEV__ && false,
})

// console.log("Sentry DSN: " + import.meta.env.VITE_SENTRY_DSN)
// console.log("Sentry Release: " + __APP_VERSION__)
// console.log("Sentry Environment: " + (__DEV__ ? "development" : "production"))

const cache = createEmotionCache()

const locale = window.__locale
await initI18n(locale)

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <CacheProvider value={cache}>
        <HydratedRouter />
      </CacheProvider>
    </StrictMode>,
  )
})
