import {type FC} from "react"

import {Box, type SxProps, Typography} from "@mui/material"

import {Config} from "~/lib/config"
import {useIntlLocale} from "~/lib/hooks"
import {brd} from "~/lib/utils"

const DEBUG = false && __DEV__

type Props = {
  title?: string
  sx?: SxProps
  textAlign?: "left" | "center"
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** basically a `h1`  */
const CPageHeader: FC<Props> = props => {
  const {title, sx, textAlign} = props

  const intlLocale = useIntlLocale()

  return (
    <Box sx={{display: "flex", flexDirection: "row", alignContent: "space-between", ...sx}}>
      <Box sx={{flex: 1, ...brd(DEBUG, "green")}}>
        <Typography variant="h1" lang={intlLocale} sx={{hyphens: "auto", textAlign: textAlign ? textAlign : !Config.theme.alignContentCenter ? "left" : "center"}}>
          {title}
        </Typography>
      </Box>
    </Box>
  )
}

export {CPageHeader}
