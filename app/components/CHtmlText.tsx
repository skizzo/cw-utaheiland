import React, {type FC, useCallback} from "react"

import {Box, type SxProps, Typography} from "@mui/material"

import {createLog} from "~/lib/modules"
import {UmamiModule} from "~/lib/modules/client"
import {brd} from "~/lib/utils"

const DEBUG = false && __DEV__
const log = createLog("CHtmlText")

type Props = {
  html: string | undefined
  origin: string | undefined
  sx?: SxProps
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CHtmlText: FC<Props> = React.memo(({html, origin, sx}) => {
  //
  const onLinkClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target?.href) return
      e.preventDefault()

      if (origin) UmamiModule.trackEvent(`html-link-clicked`, {origin, href: target.href})
      window.open(target.href, "_blank", "noopener,noreferrer")
    },
    [origin],
  )

  log.log("render()", origin)

  if (!html) return null

  const USE_BODY_1 = true

  if (USE_BODY_1) {
    return (
      <Typography
        //
        variant={"body1"}
        component={"div"}
        sx={{...sx, ...brd(DEBUG, "green")}}
        dangerouslySetInnerHTML={{__html: html}}
        onClick={onLinkClick}
      />
    )
  }

  return (
    <Box
      //
      sx={{...brd(DEBUG, "green")}}
      dangerouslySetInnerHTML={{__html: html}}
      onClick={onLinkClick}
    />
  )
})

export default CHtmlText
