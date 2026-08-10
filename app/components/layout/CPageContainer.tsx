import React, {type FC, type PropsWithChildren} from "react"

import {Box, type SxProps} from "@mui/material"

import {Config} from "~/lib/config"
import {brd} from "~/lib/utils"

const DEBUG = false && __DEV__

type Props = PropsWithChildren & {
  noPaddingTop?: boolean
  sx?: SxProps
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CPageContainer: FC<Props> = props => {
  const {children, sx, noPaddingTop = false} = props

  return (
    <Box
      sx={{
        //
        maxWidth: Config.theme.contentMaxWidth,
        width: "100%",
        mx: "auto",
        px: Config.theme.contentPx,
        pb: Config.theme.preFooterSpacing,
        pt: noPaddingTop ? 0 : Config.theme.headerHeight,
        ...sx,
        ...brd(DEBUG, "red", 3),
      }}>
      {children}
    </Box>
  )
}

export {CPageContainer}
