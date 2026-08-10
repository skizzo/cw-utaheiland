import {Config} from "~/lib/config"
import {ApolloServerModule} from "~/lib/modules/server"
import type {SitemapRoute} from "~/lib/types"

import {Currency, DimensionsUnit} from "~/_inbox/service/GQL-frontend.types"

// const BASE_URL = Config.app.rootUrl

const coursesRouteName = Config.app.events.subEventsRouteName as string

const STATIC_ROUTES: SitemapRoute[] = [
  //
  {path: "", priority: "1.0", changefreq: "weekly"},
  {path: "/artworks", priority: "0.9", changefreq: "daily"},
  ...(Config.app.showEvents ? [{path: "/events", priority: "0.8", changefreq: "daily"} as const] : []),
  ...(Config.app.events.showSubEvents ? [{path: coursesRouteName, priority: "0.8", changefreq: "daily"} as const] : []),
  // ...(Config.app.events.showSubEvents ? [{labelId: "courses", to: Config.app.events.subEventsRouteName} as const] : []),
  {path: "/artist", priority: "0.8", changefreq: "weekly"},
  {path: "/contact", priority: "0.6", changefreq: "monthly"},
  {path: "/legal-notice", priority: "0.4", changefreq: "monthly"},
  {path: "/privacy-policy", priority: "0.4", changefreq: "monthly"},
]

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function loader() {
  const urls: string[] = []

  const ROOT_URL = process.env.ROOT_URL

  const artworks = await ApolloServerModule.getArtworks(Config.app.code, "en", Currency.Eur, DimensionsUnit.Cm, undefined, 0, 1000)
  const {eventsPresent, eventsFuture, eventsPast} = await ApolloServerModule.getEvents(Config.app.code, "en", undefined, 100)

  const routesArtworks: SitemapRoute[] = artworks.map(artwork => ({
    path: `/artworks/${artwork.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }))

  const events = [...eventsPresent, ...eventsFuture, ...eventsPast]
  const routesEvents: SitemapRoute[] = Config.app.showEvents
    ? events.map(event => ({
        path: `/events/${event.slug}`,
        priority: "0.7",
        changefreq: "monthly",
      }))
    : []

  const routesAll = [
    //
    ...STATIC_ROUTES,
    ...routesArtworks,
    ...routesEvents,
  ]

  for (const route of routesAll) {
    urls.push(`
  <url>
    <loc>${ROOT_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
