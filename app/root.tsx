import * as Sentry from "@sentry/react-router"
import {useEffect} from "react"
import {isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData} from "react-router"
import type {LinksFunction, LoaderFunctionArgs} from "react-router"

import {getT} from "./i18n.server"

import {Box, CssBaseline, ThemeProvider} from "@mui/material"

import {UserSettingsModalProvider} from "./lib/contexts"
import {createLog} from "./lib/modules"
import {UmamiModule} from "./lib/modules/client"
import {ApolloServerModule} from "./lib/modules/server"
import {createTimer} from "./lib/utils"
import {Config} from "~/lib/config"
import {detectCookieSettings} from "~/lib/cookies"

import {CDebugMediaQuery, CNavFooter, CNavHeader} from "~/components"
import "~/styles/masonry.css"

import type {Route} from "./+types/root"
import {theme} from "./config.theme"

const log = createLog("root")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function loader({request}: LoaderFunctionArgs) {
  const timer = createTimer("root.loader")
  const {locale, currency, dimensionsUnit} = await detectCookieSettings(request)
  timer.log("detectCookieSettings")
  const {galleryData, heroSlides, artworkCategories} = await ApolloServerModule.getGalleryBasics(Config.app.code, locale)
  timer.log("getGalleryBasics")
  log.log("root.loader", {locale, currency, dimensionsUnit})

  const t = await getT(locale)

  const ROOT_URL = process.env.ROOT_URL
  const UMAMI_ID = process.env.UMAMI_ID

  log.log("root.loader done", {__APP_VERSION__})

  return {
    //
    locale,
    currency,
    dimensionsUnit,
    galleryData,
    heroSlides,
    artworkCategories,
    ROOT_URL,
    UMAMI_ID,
    navLabels: {
      artworks: t("pages.artworks"),
      artist: t(galleryData?.artists?.[0]?.gender === "f" ? "pages.artist_female" : "pages.artist_male"),
      events: t("pages.events"),
      courses: Config.app.events.subEventsTitle?.[locale],
      contact: t("pages.contact"),
      settings: t("pages.settings"),
    },
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: Config.theme.font.href,
  },
  // Favicons
  {rel: "icon", type: "image/x-icon", href: "/favicons/favicon.ico"},
  {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"},
  {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"},
  {rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png"},
  {rel: "manifest", href: "/favicons/site.webmanifest"},
]

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details
  } else if (error && error instanceof Error) {
    // Only capture non-404 errors (all errors here are already non-RouteErrorResponse)
    Sentry.captureException(error)
    details = error.message
    stack = error.stack
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function App() {
  const {locale, currency, dimensionsUnit, galleryData, UMAMI_ID, ROOT_URL} = useLoaderData<typeof loader>()

  useEffect(() => {
    UmamiModule.identifyUser({locale, currency, dimensionsUnit})
  }, [locale, currency, dimensionsUnit])

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="emotion-insertion-point" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Inline locale before any JS runs */}
        <script dangerouslySetInnerHTML={{__html: `window.__locale="${locale}"`}} />
        <Meta />
        <Links />
        <script defer src="https://analytics.iazzu.com/script.js" data-website-id={UMAMI_ID} />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserSettingsModalProvider>
            {true && (
              <CNavHeader
                //
                locale={locale}
                title={galleryData?.title}
              />
            )}
            <Box sx={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
              {/* offset for fixed NavHeader height */}
              <Outlet />
              <CNavFooter
                //
                links={galleryData?.contact?.links || []}
                rootUrl={ROOT_URL}
                copyright={galleryData?.title}
              />
            </Box>
          </UserSettingsModalProvider>
          {__DEV__ && <CDebugMediaQuery />}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
