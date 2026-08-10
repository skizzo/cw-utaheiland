import {index, route, type RouteConfig} from "@react-router/dev/routes"

import {AppConfig} from "./config"

const coursesRouteName = AppConfig.events.subEventsRouteName as string

export default [
  //
  index("routes/_home.tsx"),
  //
  route("artworks", "routes/artworks.tsx"),
  route("artworks/:slug", "routes/artworks.$slug.tsx"),
  route("artist", "routes/artist.tsx"),
  route("events", "routes/events.tsx"),
  // route("courses", "routes/courses.tsx"),
  route(coursesRouteName, "routes/courses.tsx"),
  route("events/:slug", "routes/events.$slug.tsx"),
  route("contact", "routes/contact.tsx"),
  route("legal-notice", "routes/legal-notice.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  //
  route("set-locale", "lib/actions/set-locale.ts"),
  route("set-currency", "lib/actions/set-currency.ts"),
  route("set-dimensions-unit", "lib/actions/set-dimensions-unit.ts"),
  route("set-user-settings", "lib/actions/set-user-settings.ts"),
  //
  route(".well-known/appspecific/com.chrome.devtools.json", "routes/devtools.tsx"),
  route("healthz", "routes/healthz.tsx"),

  route("robots.txt", "routes/robots.txt.ts"),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
] satisfies RouteConfig
