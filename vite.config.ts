import {reactRouter} from "@react-router/dev/vite"
import {sentryReactRouter} from "@sentry/react-router"

import {defineConfig} from "vite"
import {run} from "vite-plugin-run"
import tsconfigPaths from "vite-tsconfig-paths"

import pkg from "./package.json"

const runPlugin = run([
  {
    name: "my-script",
    run: ["npm", "run", "badges"],
    pattern: ["app/**/*.ts", "app/**/*.tsx"],
  },
])

const sentryConfig = {
  org: "iazzu-gmbh",
  project: "tprintzi",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // debug: true,
  // release: {
  //   name: pkg.version,
  // },
  sourcemaps: {
    filesToDeleteAfterUpload: ["./build/**/*.map"],
  },
}

export default defineConfig(config => ({
  plugins: [
    //
    reactRouter(),
    tsconfigPaths(),
    {...runPlugin, apply: "serve"},
    sentryReactRouter(sentryConfig, config),
  ],
  sentryConfig, // ← required for source map upload to work
  build: {
    sourcemap: "hidden",
    // sourcemap: true,
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  optimizeDeps: {
    exclude: ["@sentry/react-router"],
  },
}))
