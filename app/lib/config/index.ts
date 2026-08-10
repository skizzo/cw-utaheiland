import {themeProps} from "~/config.theme"

import {AppConfig} from "~/config"

import {GlobalsConfig} from "./globals.config"
import {StylesConfig} from "./styles.config"

const Config = {
  //
  app: AppConfig,
  globals: GlobalsConfig,
  styles: StylesConfig,
  theme: themeProps,
} as const

export {Config}
