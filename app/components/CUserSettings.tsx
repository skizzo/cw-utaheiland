import React, {type FC, useCallback, useMemo, useState} from "react"
import {useTranslation} from "react-i18next"

import i18n from "~/i18n.init"

import SaveIcon from "@mui/icons-material/Save"
import {Button, Grid, Typography} from "@mui/material"

import {useCurrency, useDimensionsUnit, useIntlLocale} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import type {TAppLang, TGraphQl} from "~/lib/types"

import CSelectCurrency from "./CSelectCurrency"
import CSelectLocale from "./CSelectLocale"
import CSelectUnit from "./CSelectUnit"

const INPUT_MIN_WIDTH = 350

const DEBUG = false && __DEV__
const log = createLog("CUserSettings", DEBUG)

type Props = {
  onSaveAndCloseClick: (values: UserSettingsValues) => Promise<void>
}

export type UserSettingsValues = {
  currency?: TGraphQl.Currency
  dimensionsUnit?: TGraphQl.DimensionsUnit
  locale?: TAppLang
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Renders the content of the **User's Settings** vertically:
 *
 *  1. Locale Selector
 *  2. Currenty Selector
 *  3. Unit Selector
 *
 *  4. Save Button
 *    */
const CUserSettings: FC<Props> = React.memo(({onSaveAndCloseClick}) => {
  const {t} = useTranslation()

  const localeInit = useIntlLocale()
  const currencyInit = useCurrency()
  const dimensionsUnitInit = useDimensionsUnit()

  const [locale, setLocale] = useState<TAppLang | undefined>(localeInit)
  const [currency, setCurrency] = useState<TGraphQl.Currency | undefined>(currencyInit)
  const [dimensionsUnit, setDimensionsUnit] = useState<TGraphQl.DimensionsUnit | undefined>(dimensionsUnitInit)
  const [saving, setSaving] = useState(false)

  //
  const onChangeLocale = useCallback((localeNew: TAppLang) => {
    log.log("onChangeLocale()", {localeNew})
    setLocale(localeNew)
  }, [])

  const onChangeCurrency = useCallback((currencyNew: TGraphQl.Currency) => {
    log.log("onChangeCurrency()", {currencyNew})
    setCurrency(currencyNew)
  }, [])

  const onChangeUnit = useCallback((dimensionsUnitNew: TGraphQl.DimensionsUnit) => {
    log.log("onChangeUnit()", {dimensionsUnitNew})
    setDimensionsUnit(dimensionsUnitNew)
  }, [])

  const onSaveAndCloseClickHere = useCallback(async () => {
    log.log("onSaveAndCloseClickHere()..")
    // void AnalyticsModule.trackEvent("appbar-settings-save-clicked", {lang: locale, currency, unit})
    setSaving(true)
    try {
      await onSaveAndCloseClick({locale, currency, dimensionsUnit})
      await i18n.changeLanguage(locale)
    } finally {
      setSaving(false)
    }
    log.log("onSaveAndCloseClickHere() done.")
  }, [onSaveAndCloseClick, locale, currency, dimensionsUnit])

  const labels = useMemo(
    () => ({
      header: t("components.userSettings.header"),
      buttons: {
        saveAndClose: t("components.userSettings.buttons.saveAndClose"),
      },
    }),
    [t],
  )

  log.log("render()", {locale, currency, dimensionsUnit})
  return (
    <Grid container direction={"column"} spacing={3} m={0} sx={{maxWidth: INPUT_MIN_WIDTH}}>
      <Typography variant={"h3"} pt={1} pb={1}>
        {labels.header}
      </Typography>

      <CSelectLocale onChange={onChangeLocale} />
      <CSelectCurrency onChange={onChangeCurrency} />
      <CSelectUnit onChange={onChangeUnit} />

      <Button
        //
        variant={"contained"}
        size={"large"}
        onClick={onSaveAndCloseClickHere}
        endIcon={<SaveIcon />}
        loading={saving}
        // loadingPosition={"end"}
      >
        {labels.buttons.saveAndClose}
      </Button>
    </Grid>
  )
})

export default CUserSettings
