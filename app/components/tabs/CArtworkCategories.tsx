import {type SxProps, Tab, Tabs, type Theme} from "@mui/material"

import {Config} from "~/lib/config"
import type {TGraphQl} from "~/lib/types"
import {brd} from "~/lib/utils"

const DEBUG = false && __DEV__

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CArtworkCategories = (props: {categories: TGraphQl.ArtworkCategory[]; selected: string | undefined; onChange: (categorySlug: string, index: number) => void; sx?: SxProps}) => {
  const {categories, selected, onChange, sx} = props

  const value = !selected ? 0 : categories.findIndex(ac => ac.slug === selected)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    const categorySlug = categories?.[newValue]?.slug
    onChange(categorySlug, newValue)
  }

  return (
    <Tabs
      value={value}
      centered={!Config.theme.alignContentCenter ? undefined : true}
      sx={{
        ...sx,
        ...SxTabs,
        ...brd(DEBUG, "red"),
      }}
      onChange={handleChange}>
      {categories.map(c => (
        <Tab label={c.title} key={c.slug} sx={{...SxTab}} />
      ))}
    </Tabs>
  )
}

export const SxTabs = {
  minHeight: 0,
  "& .MuiTabs-flexContainer": {
    flexWrap: "wrap",
    gap: 1,
  },
  "& .MuiTabs-indicator": {
    display: "none", // indicator doesn't work well with wrapped tabs
  },
} as const

export const SxTab: SxProps = {
  px: 1,
  py: 1,
  minWidth: 0, // removes MUI's default minimum width
  minHeight: 0, // removes MUI's default minimum height
  fontSize: "1.0rem",
  lineHeight: 1,
  letterSpacing: 1.2,
  backgroundColor: "#F6F6F6",
  borderRadius: 1,
  "&.Mui-selected": {
    bgcolor: "primary.main",
    color: "white",
  },
} as const

export default CArtworkCategories
