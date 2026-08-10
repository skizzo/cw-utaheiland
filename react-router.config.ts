import type {Config} from "@react-router/dev/config"
import {sentryOnBuildEnd} from "@sentry/react-router"

export default {
  ssr: true,
  buildEnd: async args => {
    // console.log("sentryOnBuildEnd: starting...")
    await sentryOnBuildEnd(args)
    // console.log("sentryOnBuildEnd: done.")
  },
} satisfies Config
