import type {Config} from "~/lib/config"

export type TAppLang = (typeof Config.globals.languages.available)[number]["key"]

export type SitemapRoute = {
  path: string
  priority: string
  changefreq: "weekly" | "daily" | "monthly"
}
