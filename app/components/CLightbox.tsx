import {useEffect, useMemo, useRef, useState} from "react"
import {useTranslation} from "react-i18next"
import {Link} from "react-router"
import Lightbox, {type SlideImage} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/plugins/captions.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import CloseIcon from "@mui/icons-material/Close"
import {Box, Typography} from "@mui/material"

import {ApolloModule, createLog} from "~/lib/modules"
import type {TAppLang, TGraphQl, TLightboxCarousel} from "~/lib/types"
import {bgd, brd, getArrayUnique} from "~/lib/utils"

const DEBUG = false && __DEV__
const log = createLog("CLightbox", DEBUG)

interface Props {
  images: TLightboxCarousel.HeroSlide[]
  initialIndex: number
  open: boolean
  onClose: () => void
  locale: TAppLang
  /** used in Artwork Details, where public walls don't have a "sliding" info */
  hideIndividualWallInfos?: boolean
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function CLightbox({images, locale, initialIndex, open, onClose, hideIndividualWallInfos = false}: Props) {
  //

  const slides = useMemo<SlideImage[]>(
    () =>
      images.map(image => ({
        imageType: image.imageType,
        src: image.images.large.url,
        width: image.images.large.width,
        height: image.images.large.height,
        wallData:
          image.type !== "wall"
            ? undefined
            : {
                idFirebase: image.idFirebase,
                artistTitle: image.artistTitle,
                artworkTitle: image.artworkTitle,
                artworkSlug: image.artworkSlug,
              },
        artworkData:
          image.type !== "artwork"
            ? undefined
            : {
                artistTitle: image.artistTitle,
                artworkTitle: image.artworkTitle,
              },
      })),
    [images],
  )

  const artworkTitleFixed = getArrayUnique(slides.filter(s => !!s.artworkData).map(s => s.artworkData?.artworkTitle))?.[0]
  const artistTitleFixed = getArrayUnique(slides.filter(s => !!s.artworkData).map(s => s.artworkData?.artistTitle))?.[0]

  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Branch Wall Links
  const slideWallDataMapRef = useRef<Map<number, TGraphQl.BranchLink>>(new Map()) // without this, it would cause infinite loop
  const [slideWallDataMap, setSlideWallDataMap] = useState<Map<number, TGraphQl.BranchLink>>(new Map())

  useEffect(() => {
    const slide = slides[currentIndex]
    if (!slide) return
    if (!slide.wallData) return
    if (slideWallDataMapRef.current.has(currentIndex)) return // check ref, not state

    async function fetchSlideWallBranchQrCode() {
      if (!slide.wallData) return
      const branchLink = await ApolloModule.getAnyQr("wall", slide.wallData.idFirebase, locale)
      if (branchLink) {
        setSlideWallDataMap(prev => new Map(prev).set(currentIndex, branchLink))
      }
    }

    void fetchSlideWallBranchQrCode()
  }, [currentIndex, slides, locale])

  const currentSlideWallData = slideWallDataMap.get(currentIndex)
  log.log("render()", {currentIndex, currentSlideWallData})
  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={slides}
      carousel={{finite: true}}
      on={{view: ({index}) => setCurrentIndex(index)}}
      index={initialIndex}
      controller={{closeOnBackdropClick: true}}
      // closeOnBackdropClick
      // plugins={[Zoom, Captions]}
      plugins={[Zoom]}
      zoom={{maxZoomPixelRatio: 2, zoomInMultiplier: 1, doubleTapDelay: 300, scrollToZoom: true}}
      toolbar={{buttons: ["close"]}}
      styles={{
        container: {backgroundColor: "rgba(0,0,0,0.92)"},
        slide: {padding: 20},
        button: {backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "50%", padding: "8px", margin: "0 10px", filter: "none"},
      }}
      render={{
        controls: () => {
          if (!artworkTitleFixed || !artistTitleFixed) return
          return <ArtworkFooter artworkTitle={artworkTitleFixed} artistTitle={artistTitleFixed} />
        },
        slideFooter: ({slide}) => {
          if (slide.wallData) {
            const {artistTitle, artworkTitle, artworkSlug} = slide.wallData
            return <ArtworkFooter artworkTitle={artworkTitle} artistTitle={artistTitle} artworkSlug={artworkSlug} branchLink={currentSlideWallData} hideTitles={hideIndividualWallInfos} />
          }
          return null
        },

        iconPrev: () => <ChevronLeftIcon sx={{color: "white", fontSize: 32}} />,
        iconNext: () => <ChevronRightIcon sx={{color: "white", fontSize: 32}} />,

        // Custom icon for the close button
        iconClose: () => <CloseIcon sx={{color: "white", zIndex: 10000, ...bgd(DEBUG, "red")}} />,
        iconZoomIn: () => null,
        iconZoomOut: () => null,

        buttonZoom: () => null,

        buttonPrev: currentIndex === 0 ? () => null : undefined,
        buttonNext: currentIndex === slides.length - 1 ? () => null : undefined,
      }}
    />
  )
}

interface FooterProps {
  artworkTitle: string
  artistTitle: string
  artworkSlug?: string // optional — no slug = no link
  branchLink?: Pick<TGraphQl.BranchLink, "appLinkUrl" | "qrImageUrl">
  hideTitles?: boolean
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ArtworkFooter({artworkTitle, artistTitle, artworkSlug, branchLink, hideTitles = false}: FooterProps) {
  //
  const USE_GRADIENT = false

  const {t} = useTranslation()
  const labels = {
    // qrCodeHeader: t("components.qrCode.viewInApp"),
    // sections: {
    //   infos: t("sections.infos"),
    //   artworks: t("pages.artworks"),
    // },
    qrCodeHeader: t("components.qrCode.viewAtHome"),
  }

  const content = (
    <Box sx={{p: 3, display: "inline-block", ...brd(DEBUG, "yellow")}}>
      <Box>
        {true && <Typography variant={"lightboxArtistTitle"}>{artistTitle}</Typography>}
        {false && (
          <Typography variant={"artworkDetailsArtist"} sx={{color: "white"}}>
            {artistTitle}
          </Typography>
        )}
      </Box>
      <Box>
        {true && <Typography variant={"lightboxArtworkTitle"}>{artworkTitle}</Typography>}
        {false && (
          <Typography variant={"artworkDetailsTitle"} sx={{color: "white"}}>
            {artworkTitle}
          </Typography>
        )}
      </Box>
    </Box>
  )

  return (
    <>
      {!hideTitles && (
        <Box sx={{position: "absolute", top: 0, left: 0, right: 50, zIndex: 5}}>
          <Box sx={{p: 3, background: USE_GRADIENT ? "rgba(0,0,0,0.7)" : "none"}}>
            {artworkSlug ? (
              <Link to={`/artworks/${artworkSlug}`} style={{textDecoration: "none"}}>
                {content}
              </Link>
            ) : (
              content
            )}
          </Box>
        </Box>
      )}

      {!!branchLink && !!branchLink.appLinkUrl && !!branchLink.qrImageUrl && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 2,
            bottom: 0,
            right: 0,
            animation: "fadeIn 1.4s ease",
            "@keyframes fadeIn": {
              from: {opacity: 0},
              to: {opacity: 1},
            },
          }}>
          <Box sx={{p: 4, background: USE_GRADIENT ? "rgba(0,0,0,0.7)" : "none", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{width: {xs: 100, sm: 130}, alignItems: "center", textAlign: "center"}}>
              <Link to={branchLink.appLinkUrl} style={{textDecoration: "none"}}>
                <Typography variant={"lightboxQrHeader"}>{labels.qrCodeHeader}</Typography>
                <Box component={"img"} src={branchLink.qrImageUrl} sx={{width: "100%", aspectRatio: "1 / 1"}} />
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}
