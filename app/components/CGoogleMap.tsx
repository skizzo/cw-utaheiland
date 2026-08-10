import {Box} from "@mui/material"
import type {ResponsiveStyleValue} from "@mui/system"

interface Props {
  lat: number
  lng: number
  label?: string
  height?: number
  aspectRatio?: ResponsiveStyleValue<string>
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function CGoogleMap({lat, lng, label, aspectRatio = "1 / 1"}: Props) {
  const query = label ? encodeURIComponent(label) : `${lat},${lng}`
  const src = `https://maps.google.com/maps?q=${query}&ll=${lat},${lng}&z=11&output=embed`

  return (
    <Box sx={{position: "relative"}}>
      <Box
        component="iframe"
        src={src}
        sx={{
          width: "100%",
          // height,
          // aspectRatio: "16 / 9",
          aspectRatio,
          border: "none",
          borderRadius: 1,
          display: "block",
          filter: "grayscale(100%)",
        }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Clickable overlay */}
      <Box
        component="a"
        href={`https://www.google.com/maps?q=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "absolute",
          inset: 0,
          cursor: "pointer",
          borderRadius: 1,
        }}
      />
    </Box>
  )
}
