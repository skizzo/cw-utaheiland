import i18n from "~/i18n.init"

import {createLog} from "~/lib/modules/Logger"
import type {TAppLang} from "~/lib/types"

const log = createLog("IntlModule")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class IntlModule {
  private static lang: TAppLang | undefined
  private static intl: Awaited<ReturnType<typeof getIntl>>
  private static onLanguageChangedCallback?: (langNew: TAppLang) => void

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static init() {
    log.log("init()..")
    // await i18nReady
    //
    const langInit = (i18n.resolvedLanguage || i18n.language || "en") as TAppLang

    IntlModule.lang = langInit
    IntlModule.intl = getIntl(langInit)

    log.log("init() done", {langInit})
    return {langInit}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static setLang(lang: TAppLang) {
    if (lang === IntlModule.lang) {
      return
    }
    log.log("setLang()", {lang})
    IntlModule.lang = lang
    IntlModule.intl = getIntl(lang)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static translate(lang: TAppLang, key: string, values?: Record<string, string | number>) {
    IntlModule.setLang(lang)
    return IntlModule.intl(key, values)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static getLanguageReadable(key: TAppLang, lang: TAppLang) {
    const label = IntlModule.translate(lang, `Lang${key.toUpperCase()}`)
    return label
  }
}

const getIntl = (lang: TAppLang) => {
  return i18n.getFixedT(lang, "translation") // same name as .json file
}

export {IntlModule}
