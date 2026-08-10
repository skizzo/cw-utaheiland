import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef} from "react"

import {Box} from "@mui/material"
import type {ResponsiveStyleValue} from "@mui/system"

import {useYoutubeRegistry} from "~/lib/hooks"
import {createLog} from "~/lib/modules"

import CClientOnly from "~/components/CClientOnly"

const DEBUG = false && __DEV__
const log = createLog("CYoutubePlayer", DEBUG)

interface Props {
  videoId: string
  aspectRatio?: ResponsiveStyleValue<string>
  onPlay?: () => void
  onPause?: () => void
  onEnd?: () => void
}

export interface CYoutubePlayerRef {
  pauseIfPlaying: () => void
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default forwardRef<CYoutubePlayerRef, Props>(function CYoutubePlayer(props, ref) {
  return (
    <CClientOnly
      fallback={
        <Box
          sx={{
            //
            width: "100%",
            aspectRatio: props.aspectRatio ?? "16 / 9",
            bgcolor: "grey.100",
          }}
        />
      }>
      <YoutubePlayerInner {...props} ref={ref} />
    </CClientOnly>
  )
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const YoutubePlayerInner = forwardRef<CYoutubePlayerRef, Props>(({videoId, aspectRatio = "16 / 9", onPlay, onPause, onEnd}: Props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YT.Player>(null)

  const onPlayHere = useCallback(() => {
    log.log("onPlayHere()")
    if (onPlay) onPlay()
  }, [onPlay])

  const onPauseHere = useCallback(() => {
    log.log("onPauseHere()")
    if (onPause) onPause()
  }, [onPause])

  const onEndHere = useCallback(() => {
    log.log("onEndHere()")
    if (onEnd) onEnd()
  }, [onEnd])

  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current) return
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {rel: 0, controls: 1, modestbranding: 1},
        events: {
          onStateChange: event => {
            if (event.data === window.YT.PlayerState.PLAYING) onPlayHere()
            if (event.data === window.YT.PlayerState.PAUSED) onPauseHere()
            if (event.data === window.YT.PlayerState.ENDED) onEndHere()
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      // Load the IFrame API script if not already loaded
      if (!document.getElementById("yt-api")) {
        const script = document.createElement("script")
        script.id = "yt-api"
        script.src = "https://www.youtube.com/iframe_api"
        document.head.appendChild(script)
      }
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      playerRef.current?.destroy()
    }
  }, [videoId, onEndHere, onPauseHere, onPlayHere])

  // Ref methods
  const pauseIfPlaying = useCallback(() => {
    if (playerRef.current?.getPlayerState() === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo()
    }
  }, [])

  useImperativeHandle(ref, () => ({
    pauseIfPlaying,
  }))

  const selfRef = useRef<CYoutubePlayerRef>({
    pauseIfPlaying,
  })
  useYoutubeRegistry(selfRef)

  return (
    <Box sx={{width: "100%", aspectRatio}}>
      <Box ref={containerRef} sx={{width: "100%", height: "100%"}} />
    </Box>
  )
})
