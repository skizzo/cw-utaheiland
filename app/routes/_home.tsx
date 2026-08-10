import {useState} from "react"
import {useTranslation} from "react-i18next"
import {type LoaderFunctionArgs, type MetaFunction, useLoaderData} from "react-router"

import {Box, Grid} from "@mui/material"

import {Config} from "~/lib/config"
import {detectCookieSettings} from "~/lib/cookies"
import {useBranchLink, useRootLoaderData} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
// import {UmamiModule} from "~/lib/modules/client"
import {ApolloServerModule} from "~/lib/modules/server"
import {brd, createTimer, getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData} from "~/lib/utils"

import {CClientOnly, CHeroCarousel, CHtmlText, CLightbox, CPageContainer, CPageHeader, CQrCodeAwaited, CSectionHeader} from "~/components"

const DEBUG = false && __DEV__
const log = createLog("home")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const loader = async ({request, params}: LoaderFunctionArgs) => {
  const timer = createTimer("home.loader")
  const [{locale, currency, dimensionsUnit}] = await Promise.all([
    //
    detectCookieSettings(request),
  ])
  timer.log("detectCookieSettings(), getGalleryQr()")

  const [{galleryData}, {galleryWalls, wallSlides}, qrData] = await Promise.all([
    //
    ApolloServerModule.getGalleryBasics(Config.app.code, locale),
    ApolloServerModule.getGalleryWalls(Config.app.code, locale),
    ApolloServerModule.getGalleryQr(Config.app.code),
  ])

  const title = galleryData?.title
  return {title, locale, currency, dimensionsUnit, qrData, galleryWalls, wallSlides}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const meta: MetaFunction<typeof loader> = ({loaderData, matches, location}) => {
  const rootLoaderData = getRootLoaderData(matches)
  const {galleryData} = rootLoaderData || {}
  const title = `${galleryData?.title}`
  const description = `${galleryData?.seoData.ogDescription}`
  return [
    //
    ...getMetaTitleDescription(title, description),
    ...getMetaBase(rootLoaderData, location?.pathname),
    ...getMetaImage(galleryData?.seoData?.ogImage, galleryData?.seoData?.ogImageWidth, galleryData?.seoData?.ogImageHeight),
  ]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Home() {
  const {galleryData, locale, heroSlides} = useRootLoaderData() || {}
  const {title, qrData, galleryWalls, wallSlides} = useLoaderData<typeof loader>()

  // const appLinkUrl = qrData?.appLinkUrl
  // const onQrClick = useCallback(() => {
  //   log.log("onQrClick", {appLinkUrl})
  //   UmamiModule.trackEvent("gallery-qr-clicked")
  // }, [appLinkUrl])

  const [heroLightboxIndex, setHeroLightboxIndex] = useState<number | null>(null)
  const [wallLightboxIndex, setWallLightboxIndex] = useState<number | null>(null)

  const branchLink = useBranchLink("gallery", Config.app.code, locale)

  const {t} = useTranslation()
  const labels = {
    qrCodeHeader: t("components.qrCode.viewInApp"),
    sections: {
      infos: t("sections.infos"),
      publicWalls: t("sections.publicWalls"),
    },
  }

  log.log("render()")
  return (
    <>
      {Config.theme.heroFullWidth && (
        <CHeroCarousel
          //
          titleFixed={galleryData?.title}
          aspectRatio={{xs: "1 / 1", sm: "4 / 3", md: "16 / 9"}}
          slides={heroSlides}
          onImageClick={index => setHeroLightboxIndex(index)}
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
            titleFixed={galleryData?.title}
            aspectRatio={{xs: "1 / 1", sm: "4 / 3", md: "16 / 9"}}
            slides={heroSlides}
            onImageClick={index => setHeroLightboxIndex(index)}
          />
        )}

        <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
          <CSectionHeader text={labels.sections.infos} />

          {!!galleryData?.content && true && (
            <Box sx={{mt: 2, textAlign: !Config.theme.alignContentCenter ? "left" : "center"}}>
              <CHtmlText html={galleryData.content} origin={"home.content"} />
            </Box>
          )}
        </Box>

        {!!galleryWalls.length && (
          <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
            <CSectionHeader text={labels.sections.publicWalls} />

            <Grid container spacing={{xs: 2, sm: 3, md: 4}} justifyContent={"center"} sx={{mt: 2, mb: 4}}>
              {galleryWalls.map((item, i) => (
                <Grid key={`image_${i}`} size={{xs: 6, sm: 4, md: 3, lg: 2}}>
                  <Box sx={{aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 2, border: "1px solid #CCC", ...brd(DEBUG, "green")}}>
                    <Box
                      component={"img"}
                      src={item.imageThumbUrl!}
                      sx={{
                        //
                        display: "block",
                        cursor: "pointer",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        p: 0,
                        m: 0,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={() => setWallLightboxIndex(i)}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
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
                />
              </Box>
            </Box>
          </Box>
        )}
      </CPageContainer>

      <CClientOnly>
        <CLightbox
          //
          images={heroSlides}
          initialIndex={heroLightboxIndex ?? 0}
          open={heroLightboxIndex !== null}
          onClose={() => setHeroLightboxIndex(null)}
          locale={locale}
        />

        <CLightbox
          //
          images={wallSlides}
          initialIndex={wallLightboxIndex ?? 0}
          open={wallLightboxIndex !== null}
          onClose={() => setWallLightboxIndex(null)}
          locale={locale}
        />
      </CClientOnly>
    </>
  )
}
