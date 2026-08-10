import React, {type FC, useCallback, useEffect, useState} from "react"
import {useTranslation} from "react-i18next"

import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent} from "@mui/material"

import {useDimensionsUnit} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import type {TGraphQl} from "~/lib/types"
import {getAppDimensionsUnits} from "~/lib/utils"

import isEqual from "lodash/isEqual"

const log = createLog("CSelectUnit")

type Props = {
  onChange: (dimensionsUnit: TGraphQl.DimensionsUnit) => void
  disabled?: boolean
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CSelectUnit: FC<Props> = ({onChange, disabled = false}) => {
  // const intlLocale = useIntlLocale()
  const dimensionsUnit = useDimensionsUnit()
  const {t} = useTranslation()

  const dimensionsUnits = getAppDimensionsUnits()
  const items = dimensionsUnits.map(value => ({label: t(`units.${value}`), value}))

  const setUnitHere = useCallback(
    (dimensionsUnit: TGraphQl.DimensionsUnit) => {
      log.log("setUnitHere()", {dimensionsUnit})
      setUnitSelected(dimensionsUnit)
      if (onChange) {
        onChange(dimensionsUnit)
      }
    },
    [onChange],
  )

  const [unitSelected, setUnitSelected] = useState(dimensionsUnit)

  const onChangeHere = useCallback(
    (event: SelectChangeEvent) => {
      const dimensionsUnit = event.target.value as TGraphQl.DimensionsUnit
      setUnitHere(dimensionsUnit)
      // void AnalyticsModule.trackEvent("dimensions-unit-changed", {unit})
    },
    [setUnitHere],
  )

  const labels = {
    input: t("components.selectUnit.input"),
  }

  return (
    <div>
      <FormControl sx={{m: 0 /*, minWidth*/}} fullWidth>
        <InputLabel id="select-unit-label">{labels.input}</InputLabel>
        <Select
          //
          label={labels.input}
          // sx={{minWidth}}
          value={unitSelected}
          onChange={onChangeHere}
          disabled={disabled}>
          {items.map((item, i) => (
            <MenuItem key={`item_${i}`} value={item.value}>
              {item.label} ({item.value})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default React.memo(CSelectUnit, isEqual)
