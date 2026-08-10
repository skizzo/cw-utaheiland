import {type SxProps, Typography} from "@mui/material"

import {Config} from "~/lib/config"
import {brd} from "~/lib/utils"

type Props = {
  text: string
}

const DEBUG = false && __DEV__

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Renders a `h2` element */
const CSectionHeader = (props: Props) => {
  const {text} = props
  return (
    <Typography variant={"h2"} sx={{textAlign: !Config.theme.alignContentCenter ? "left" : "center", ...SectionHeaderSx, ...brd(DEBUG, "red")}}>
      {text}
    </Typography>
  )
}

const SectionHeaderSx: SxProps = {
  color: "#888",
  letterSpacing: "0.2rem",
  pb: 3,
} as const

export {CSectionHeader}
