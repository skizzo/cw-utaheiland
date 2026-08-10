import useEmblaCarousel from "embla-carousel-react"
import {useCallback, useEffect, useState} from "react"

import {Box, Typography, useTheme} from "@mui/material"
import type {ResponsiveStyleValue, SxProps} from "@mui/system"

import {usePauseAllYoutube} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import type {TLightboxCarousel} from "~/lib/types"
import {brd} from "~/lib/utils"

import {NextButton, PrevButton} from "./buttons/CLightboxNavButton"
import CYoutubePlayer from "./CYoutubePlayer"

const DEBUG = false && __DEV__
const log = createLog("CHeroCarousel")

type Props = {
  titleFixed?: string
  slides: TLightboxCarousel.HeroSlide[]
  aspectRatio?: ResponsiveStyleValue<string>
  onImageClick: (index: number) => void
  sx?: SxProps
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function CHeroCarousel(props: Props) {
  const {slides, aspectRatio = "16 / 9", onImageClick, titleFixed, sx} = props

  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [
    //
    // Autoplay({delay: 5000}),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const {pauseAllYoutube} = usePauseAllYoutube()

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", () => {
      const index = emblaApi.selectedScrollSnap()
      setSelectedIndex(index)
      pauseAllYoutube()
    })
  }, [emblaApi, pauseAllYoutube])

  const theme = useTheme()
  // const spacing = theme.spacing(2) // "16px"

  log.log("render()", {selectedIndex})
  return (
    <Box
      sx={{
        //
        position: "relative",
        width: "100%",
        overflow: "hidden",
        aspectRatio,
        // maxHeight: "70vh",
        // minHeight: {xs: "50vh", sm: "50vh", md: "auto"},
        ...brd(DEBUG, "blue"),
        ...sx,
        maxHeight: "80vh",
      }}>
      {/* Embla viewport */}
      <Box ref={emblaRef} sx={{overflow: "hidden", height: "100%"}}>
        <Box sx={{display: "flex", height: "100%"}}>
          {slides.map((slide, i) => {
            if (slide.type === "youtubeVideo") {
              return (
                <Box
                  key={i}
                  sx={{
                    flex: "0 0 100%",
                    minWidth: 0,
                    position: "relative",
                    ...brd(DEBUG, "green"),
                  }}
                  // onClick={() => onImageClick(i)}
                >
                  <CYoutubePlayer
                    //
                    videoId={slide.videoId}
                    aspectRatio={aspectRatio}
                  />
                </Box>
              )
            }

            return (
              <Box
                key={i}
                sx={{
                  flex: "0 0 100%",
                  minWidth: 0,
                  position: "relative",
                }}
                onClick={() => onImageClick(i)}>
                {/* Image */}
                <Box
                  component={"img"}
                  loading={"lazy"}
                  src={slide.images.small.url}
                  srcSet={`
                  ${slide.images.small.url} 400w,
                  ${slide.images.medium.url} 800w,
                  ${slide.images.large.url} 1200w
                `}
                  alt={slide.title ?? ""} // TODO: Add "alt" for all Images
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />

                {/* Overlay gradient */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Draw elements above image here */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: {xs: 3, md: 6},
                    maxWidth: 1200,
                    mx: "auto",
                  }}>
                  {!!slide.title && (
                    <Typography variant="h1" sx={{color: "white", mb: 1}}>
                      {slide.title}
                    </Typography>
                  )}
                  {!!slide.subtitle && (
                    <Typography variant="body1" sx={{color: "rgba(255,255,255,0.85)"}}>
                      {slide.subtitle}
                    </Typography>
                  )}
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>

      {slides.length > 1 && (
        <>
          {/* Prev / Next buttons */}
          <Box sx={{position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)"}}>
            <PrevButton onClick={scrollPrev} />
          </Box>

          <Box sx={{position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)"}}>
            <NextButton onClick={scrollNext} />
          </Box>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            bottom: theme.spacing(3),
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
          }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              sx={{
                width: i === selectedIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === selectedIndex ? "white" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      )}

      {/* Fixed overlay — renders above everything */}
      {!!titleFixed && (
        <Box
          sx={{
            position: "absolute",
            bottom: theme.spacing(7),
            left: theme.spacing(4),
            right: theme.spacing(4),
            pointerEvents: "none", // allows clicks to pass through to buttons/dots
            textAlign: "center",
          }}>
          <Typography
            //
            variant={"h1"}
            sx={{filter: "drop-shadow(0px 0px 3px #000000)", color: "white"}}>
            {titleFixed}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
