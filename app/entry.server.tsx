import * as Sentry from "@sentry/react-router";
import {CacheProvider} from "@emotion/react"
import {createReadableStreamFromReadable} from "@react-router/node"
import {renderToPipeableStream} from "react-dom/server"
import {I18nextProvider, initReactI18next} from "react-i18next"
import type {AppLoadContext, EntryContext} from "react-router"
import {ServerRouter} from "react-router"

import {fallbackLng, supportedLngs} from "./i18n"
import {initI18n, resources} from "./i18n.init"
import {detectLanguage} from "./i18n.server"
import {createInstance} from "i18next"

import {isbot} from "isbot"
import {PassThrough} from "node:stream"

import createEmotionCache from "./emotion/createEmotionCache"

export const handleError = Sentry.createSentryHandleError({
  logErrors: false
});

export const streamTimeout = 5_000

async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {status: responseStatusCode, headers: responseHeaders})
  }

  const cache = createEmotionCache()

  const userAgent = request.headers.get("user-agent")
  const isBot = (userAgent && isbot(userAgent)) || routerContext.isSpaMode

  const locale = await detectLanguage(request)
  await initI18n(locale)
  const i18nInstance = createInstance()
  await i18nInstance.use(initReactI18next).init({
    lng: locale,
    fallbackLng,
    supportedLngs,
    resources,
    interpolation: {escapeValue: false},
  })

  return new Promise((resolve, reject) => {
    let shellRendered = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined = setTimeout(() => abort(), streamTimeout + 1000)

    const {pipe, abort} = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance}>
        <CacheProvider value={cache}>
          <ServerRouter context={routerContext} url={request.url} />
        </CacheProvider>
      </I18nextProvider>,
      {
        [isBot ? "onAllReady" : "onShellReady"]() {
          shellRendered = true

          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set("Content-Type", "text/html")
          pipe(Sentry.getMetaTagTransformer(body))

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )
        },
        onShellError(error) {
          clearTimeout(timeoutId)
          timeoutId = undefined
          reject(error instanceof Error ? error : new Error(String(error)))
        },
        onError(error: unknown) {
          responseStatusCode = 500
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    const clearTimer = () => {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }

    // Clean up timeout when stream finishes or errors
    const body = new PassThrough()
    body.on("finish", clearTimer)
    body.on("error", clearTimer)
  });
}

export default Sentry.wrapSentryHandleRequest(handleRequest);