import {getEnvRootUrl} from "~/lib/config/env.config.server"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function loader() {
  const rootUrl = getEnvRootUrl()
  const allowRobots = (rootUrl || "-staging").indexOf("-staging") === -1

  return new Response(
    `User-agent: *
${allowRobots ? "Allow" : "Disallow"}: /
Sitemap: ${rootUrl}/sitemap.xml`,
    {
      headers: {"Content-Type": "text/plain"},
    },
  )
}
