import {type SxProps, Tab, Tabs} from "@mui/material"

import {Config} from "~/lib/config"
import {brd} from "~/lib/utils"

import {SxTab, SxTabs} from "./CArtworkCategories"

const DEBUG = false && __DEV__

type Item = {
  label: string
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CLocationTabs = (props: {items: Item[]; selected: number | undefined; onChange: (index: number) => void; sx?: SxProps}) => {
  const {items, selected, onChange, sx} = props

  const value = !selected ? 0 : selected

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue)
  }

  return (
    <Tabs
      value={value}
      centered={!Config.theme.alignContentCenter ? undefined : true}
      sx={{
        ...sx,
        ...brd(DEBUG, "red"),
        ...SxTabs, // <- this leads to TS error
      }}
      onChange={handleChange}>
      {items.map((c, i) => (
        <Tab label={c.label} key={`${i}`} sx={{...SxTab}} />
      ))}
    </Tabs>
  )
}

export default CLocationTabs
