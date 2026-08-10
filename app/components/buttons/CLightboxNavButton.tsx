import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import {IconButton} from "@mui/material"

const navButtonSx = {
  bgcolor: "rgba(0,0,0,0.4)",
  color: "white",
  "&:hover": {bgcolor: "rgba(0,0,0,0.6)"},
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function PrevButton({onClick}: {onClick?: React.MouseEventHandler}) {
  return (
    <IconButton onClick={onClick} aria-label="Previous slide" sx={navButtonSx}>
      <ChevronLeftIcon />
    </IconButton>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function NextButton({onClick}: {onClick?: React.MouseEventHandler}) {
  return (
    <IconButton onClick={onClick} aria-label="Next slide" sx={navButtonSx}>
      <ChevronRightIcon />
    </IconButton>
  )
}
