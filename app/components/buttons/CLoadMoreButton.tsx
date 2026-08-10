import {Box, Button, CircularProgress} from "@mui/material"

import {Config} from "~/lib/config"

type Props = {
  loading?: boolean
  onClick: () => void
  label: string
  labelLoading?: string
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CLoadMoreButton = (props: Props) => {
  const {loading, onClick, label, labelLoading} = props

  return (
    <Box sx={{textAlign: "center", mt: Config.theme.sectionSpacing}}>
      <Button
        //
        onClick={onClick}
        color={"primary"}
        variant={"contained"}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}>
        {!loading ? label : label || labelLoading}
      </Button>
    </Box>
  )
}
