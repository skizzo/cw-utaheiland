import {useCallback, useState} from "react"
import {useTranslation} from "react-i18next"
import {type LoaderFunctionArgs, type MetaFunction, useLoaderData, useNavigate} from "react-router"

import {getT} from "~/i18n.server"

import {Box, Grid} from "@mui/material"

import {Config} from "~/lib/config"
import {detectCookieSettings} from "~/lib/cookies"
import {useBranchLink} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import {ApolloServerModule} from "~/lib/modules/server"
import {brd, getArrayUnique, getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData, notEmpty} from "~/lib/utils"

import {CArtworksMasonry, CHeroCarousel, CHtmlText, CLightbox, CLoadMoreButton, CPageContainer, CPageHeader, CQrCodeAwaited, CSectionHeader, CYoutubePlayer} from "~/components"

const DEBUG = false && __DEV__
const log = createLog("artist")

const SHOW_TITLE_IN_HERO = false
const SHOW_ADDITIONAL_IMAGES_IN_SLIDER = false

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const loader = async ({request}: LoaderFunctionArgs) => {
  const {locale, currency, dimensionsUnit} = await detectCookieSettings(request)
  const {galleryData} = await ApolloServerModule.getGalleryBasics(Config.app.code, locale)
  const artistSlug = galleryData?.singleArtistSlug || galleryData?.artists?.length ? galleryData.artists?.[0].slug : undefined

  const t = await getT(locale)
  const pageTitle = t(galleryData?.artists?.[0]?.gender === "f" ? "pages.artist_female" : "pages.artist_male")

  const {artistData, heroSlides, videoSlides, additionalImages, artworks, heroVideoYoutubeId} = await ApolloServerModule.getArtistDetails(Config.app.code, artistSlug, locale, currency, dimensionsUnit)
  return {pageTitle, artistSlug, locale, artistData, heroSlides, videoSlides, additionalImages, artworks, heroVideoYoutubeId}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const meta: MetaFunction<typeof loader> = ({loaderData, matches, location}) => {
  const rootLoaderData = getRootLoaderData(matches) // || {}
  const {galleryData} = rootLoaderData || {}
  const {artistData, pageTitle} = loaderData || {}

  // const artistTitle = loaderData?.artistData?.title
  const artistTitle = pageTitle
  const galleryTitle = galleryData?.title
  const title = getArrayUnique([artistTitle, galleryTitle].filter(notEmpty)).join(" | ")
  const description = artistData?.seoData?.ogDescription || ""
  return [
    //
    ...getMetaTitleDescription(title, description),
    ...getMetaBase(rootLoaderData, location?.pathname),
    ...getMetaImage(artistData?.seoData?.ogImage, artistData?.seoData?.ogImageWidth, artistData?.seoData?.ogImageHeight),
  ]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function ArtistPage() {
  const {artistSlug, locale, artistData, heroSlides, videoSlides, additionalImages, artworks, heroVideoYoutubeId} = useLoaderData<typeof loader>()

  const navigate = useNavigate()

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const headerSlidesRaw = [
    //
    ...heroSlides,
    ...(Config.theme.showArtistVideoInHero ? videoSlides : []),
  ]
  const headerSlides = SHOW_ADDITIONAL_IMAGES_IN_SLIDER || !headerSlidesRaw.length ? headerSlidesRaw : headerSlidesRaw.slice(0, 1)

  const gotoArtworks = useCallback(async () => {
    await navigate("/artworks")
  }, [navigate])

  const branchLink = useBranchLink("artist", artistSlug, locale)

  const {t} = useTranslation()
  const labels = {
    qrCodeHeader: t("components.qrCode.viewInApp"),
    sections: {
      infos: t("sections.infos"),
      additionalImages: t("sections.artistDetails.additionalImages"),
      artworks: t("pages.artworks"),
    },
    loadMoreButton: {
      showAllArtworks: t("components.loadMoreButton.showAllArtworks"),
    },
  }

  log.log("render()")
  return (
    <>
      {Config.theme.heroFullWidth && (
        <CHeroCarousel
          //
          titleFixed={SHOW_TITLE_IN_HERO ? artistData?.title : undefined}
          aspectRatio={{xs: "1 / 1", sm: "4 / 3", md: "16 / 9"}}
          slides={headerSlides}
          onImageClick={index => setLightboxIndex(index)}
          sx={{pt: Config.theme.headerHeight}}
        />
      )}

      <CPageContainer
        //
        // sx={{background: "#FFF"}}
        noPaddingTop={Config.theme.heroFullWidth}>
        {/* */}

        {!Config.theme.heroFullWidth && (
          <CHeroCarousel
            //
            titleFixed={SHOW_TITLE_IN_HERO ? artistData?.title : undefined}
            aspectRatio={{xs: "1 / 1", sm: "4 / 3", md: "16 / 9"}}
            slides={headerSlides}
            onImageClick={index => setLightboxIndex(index)}
          />
        )}

        {!SHOW_TITLE_IN_HERO && (
          <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
            <CPageHeader
              //
              sx={{mt: Config.theme.sectionSpacing}}
              title={artistData?.title}
            />
          </Box>
        )}

        {/* Content */}
        {!!artistData?.content && true && (
          <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
            <Box sx={{maxWidth: "none", textAlign: "center"}}>
              <CSectionHeader text={labels.sections.infos} />
              <CHtmlText html={artistData.content} origin={"artist.content"} />
            </Box>
          </Box>
        )}

        {/* Youtube Video */}
        {!Config.theme.showArtistVideoInHero && !!heroVideoYoutubeId && (
          <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
            <CYoutubePlayer
              //
              aspectRatio={"16 / 9"}
              videoId={heroVideoYoutubeId}
            />
          </Box>
        )}

        {/* Additional Infos */}
        {!!additionalImages?.length && (
          <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
            <CSectionHeader text={labels.sections.additionalImages} />
            <Grid container spacing={{xs: 2, sm: 3, md: 4}} justifyContent={!Config.theme.alignContentCenter ? "flex-start" : "center"}>
              {additionalImages.map((item, i) => (
                <Grid key={`image_${i}`} size={{xs: 6, sm: 4, md: 3, lg: 2}}>
                  <Box sx={{aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 2, border: "1px solid #CCC", ...brd(DEBUG, "green")}}>
                    <Box
                      component={"img"}
                      src={item.images.medium.url}
                      sx={{
                        //
                        display: "block",
                        cursor: "pointer",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        p: 0,
                        m: 0,
                        transition: "transform 0.3s ease",
                        "&:hover": {transform: "scale(1.05)"},
                      }}
                      onClick={() => setLightboxIndex(i + 1)}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Artworks Masonry */}
        {false && (
          <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
            <CSectionHeader text={labels.sections.artworks} />
            <CArtworksMasonry artworks={artworks} />

            <CLoadMoreButton
              //
              onClick={gotoArtworks}
              label={labels.loadMoreButton.showAllArtworks}
            />
          </Box>
        )}

        {/* QR Code */}
        {true && (
          <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: !Config.theme.alignContentCenter ? "flex-start" : "center"}}>
              <CSectionHeader text={labels.qrCodeHeader} />
              <Box sx={{width: 150, height: 150, display: "block"}}>
                <CQrCodeAwaited
                  //
                  branchLinkPromise={branchLink}
                  // imageSx={{transform: "translate(-13px,-6px)"}}
                />
              </Box>
            </Box>
          </Box>
        )}
      </CPageContainer>

      {!!heroSlides && (
        <CLightbox
          //
          images={heroSlides}
          initialIndex={lightboxIndex ?? 0}
          open={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          hideIndividualWallInfos
          locale={locale}
        />
      )}
    </>
  )
}
