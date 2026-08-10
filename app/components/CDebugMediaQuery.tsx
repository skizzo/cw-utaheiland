import {Box, Typography, useMediaQuery} from "@mui/material"
import {useTheme} from "@mui/material/styles"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function CDebugMediaQuery() {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))
  const isSm = useMediaQuery(theme.breakpoints.only("sm"))
  const isMd = useMediaQuery(theme.breakpoints.only("md"))
  const isLg = useMediaQuery(theme.breakpoints.only("lg"))
  const isXl = useMediaQuery(theme.breakpoints.only("xl"))

  const current = isXs ? "xs" : isSm ? "sm" : isMd ? "md" : isLg ? "lg" : isXl ? "xl" : "?"

  if (!__DEV__) return null

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 9999,
        bgcolor: "rgba(0,0,0,0.7)",
        color: "white",
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        pointerEvents: "none",
      }}>
      <Typography variant="caption" fontFamily="monospace">
        {current}
      </Typography>
    </Box>
  )
}
