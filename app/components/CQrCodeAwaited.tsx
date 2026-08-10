import {Suspense} from "react"
import {Await, Link} from "react-router"

import {Box, CircularProgress, Skeleton, type SxProps, Typography} from "@mui/material"

import {Config} from "~/lib/config"
import {createLog} from "~/lib/modules"
import type {TGraphQl} from "~/lib/types"
import {brd} from "~/lib/utils"

type Props = {
  branchLinkPromise: Promise<TGraphQl.BranchLink | undefined>
  imageSx?: SxProps
}

const DEBUG = false && __DEV__
const log = createLog("CQrCodeAwaited")

// const TEST = false && __DEV__

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CQrCodeAwaited = (props: Props) => {
  const {branchLinkPromise, imageSx} = props

  // if (TEST) {
  //   const slowPromise = branchLinkPromise.then(data => new Promise<typeof data>(resolve => setTimeout(() => resolve(data), 3000)))
  //   return (
  //     <Suspense fallback={<div>Loading (test)</div>}>
  //       <Await resolve={slowPromise}>{data => <div>Loaded</div>}</Await>
  //     </Suspense>
  //   )
  // }

  return (
    <>
      <Box sx={{textAlign: "center", ...brd(DEBUG, "blue")}}>
        <Suspense
        //
        // fallback={<Skeleton variant="rounded" width={"100%"} height={"100%"} />}
        >
          <Await resolve={branchLinkPromise}>
            {data =>
              !data?.qrImageUrl || !data.appLinkUrl ? undefined : (
                <>
                  <Link to={data.appLinkUrl} target="_blank" rel="noopener noreferrer">
                    <Box
                      //
                      component={"img"}
                      src={data.qrImageUrl}
                      sx={{
                        //
                        ...imageSx,
                        width: "100%",
                        aspectRatio: "1 / 1",
                        // transform: "translate3d(-11px,0px,0px)",
                        display: "block",
                        ...Config.styles.Sx.Animation.FadeIn,
                      }}
                    />
                  </Link>
                  {DEBUG && (
                    <Typography variant={"subtitle2"} sx={{fontSize: "0.6rem"}}>
                      {data.appLinkUrl}
                    </Typography>
                  )}
                </>
              )
            }
          </Await>
          {DEBUG && <Box sx={{...brd(DEBUG, "green")}}>below</Box>}
        </Suspense>
      </Box>
    </>
  )
}

export {CQrCodeAwaited}
