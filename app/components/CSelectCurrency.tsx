import React, {type FC, useCallback, useState} from "react"
import {useTranslation} from "react-i18next"

import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent} from "@mui/material"

import {useCurrency} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
// import {log} from "~/lib/modules"
import type {TGraphQl} from "~/lib/types"
import {getAppCurrencies} from "~/lib/utils"

import isEqual from "lodash/isEqual"

const log = createLog("CSelectCurrency")

type Props = {
  onChange: (currencyKey: TGraphQl.Currency) => void
  disabled?: boolean
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CSelectCurrency: FC<Props> = ({onChange, disabled = false}) => {
  const currencyGraphQl = useCurrency()
  const {t} = useTranslation()

  const currencies = getAppCurrencies()
  const items = currencies.map(value => ({label: t(`currencies.${value}`), value}))

  const setCurrencyHere = useCallback(
    (key: TGraphQl.Currency) => {
      log.log("setCurrencyHere()", {key})
      setCurrencySelected(key)
      if (onChange) {
        onChange(key)
      }
    },
    [onChange],
  )

  const [currencySelected, setCurrencySelected] = useState(currencyGraphQl)

  const onChangeHere = useCallback(
    (event: SelectChangeEvent) => {
      const currency = event.target.value as TGraphQl.Currency
      // log.log("onChangeHere()", currency)
      setCurrencyHere(currency)
      // void AnalyticsModule.trackEvent("currency-changed", {currency})
    },
    [setCurrencyHere],
  )

  const labels = {
    input: t("components.selectCurrency.input"),
  }

  return (
    <div>
      <FormControl sx={{m: 0}} fullWidth>
        <InputLabel id="select-currency-label">{labels.input}</InputLabel>
        <Select
          //
          label={labels.input}
          value={currencySelected}
          onChange={onChangeHere}
          disabled={disabled}>
          {items.map((item, i) => (
            <MenuItem key={`item_${i}`} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default React.memo(CSelectCurrency, isEqual)
