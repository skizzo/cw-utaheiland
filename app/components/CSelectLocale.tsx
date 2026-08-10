import React, {type FC, useCallback, useEffect, useState} from "react"
import {useTranslation} from "react-i18next"

import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent} from "@mui/material"

import {useIntlLocale} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import type {TAppLang} from "~/lib/types"
import {getAppLangs} from "~/lib/utils"

import isEqual from "lodash/isEqual"

const log = createLog("CSelectLocale")

type Props = {
  onChange: (currencyKey: TAppLang) => void
  disabled?: boolean
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CSelectLocale: FC<Props> = ({onChange, disabled = false}) => {
  const intlLocale = useIntlLocale()
  const {t} = useTranslation()

  const appLangs = getAppLangs()
  const items = appLangs.map(value => ({label: t(`langs.${value}`), value}))

  const [localeSelected, setLocaleSelected] = useState(intlLocale) // inital

  const setLocaleHere = useCallback(
    (key: TAppLang) => {
      log.log("setLocaleHere()", {key})
      setLocaleSelected(key)
      if (onChange) {
        onChange(key)
      }
    },
    [onChange],
  )

  const onChangeHere = useCallback(
    (event: SelectChangeEvent) => {
      const locale = event.target.value as TAppLang
      // log.log("onChangeHere()", locale)
      setLocaleHere(locale)
    },
    [setLocaleHere],
  )

  const labels = {
    input: t("components.selectLocale.input"),
  }

  return (
    <FormControl sx={{m: 0, width: "100%"}} fullWidth>
      <InputLabel id={"select-language-label"}>{labels.input}</InputLabel>
      <Select
        //
        label={labels.input}
        labelId={"select-language-label"}
        id={"select-language-label-autowidth"}
        value={localeSelected}
        onChange={onChangeHere}
        disabled={disabled}>
        {items.map((item, i) => (
          <MenuItem key={`item_${i}`} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default React.memo(CSelectLocale, isEqual)
