import {useState} from "react"
import {useTranslation} from "react-i18next"
import {Link, type LoaderFunctionArgs, type MetaFunction, useLoaderData, useLocation} from "react-router"

import {Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material"

import {Config} from "~/lib/config"
import {useUserSettingsModal} from "~/lib/contexts"
import {detectCookieSettings} from "~/lib/cookies"
import {useBranchLink, useRootLoaderData} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import {ApolloServerModule} from "~/lib/modules/server"
import {brd, getFirstLetterCapitalized, getIntlIdForArtworkButton, getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData, notEmpty} from "~/lib/utils"

import {CHtmlText, CLightbox, CPageContainer, CQrCodeAwaited, CSectionHeader, CYoutubePlayer} from "~/components"

const DEBUG = false && __DEV__
const log = createLog("artwork.slug")

const SIZE_QR = 150

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function loader({request, params}: LoaderFunctionArgs) {
  const {slug} = params
  const {locale, currency, dimensionsUnit} = await detectCookieSettings(request)
  const {artworkData, allSlides, variantsFullPricesReadableByStatus, heroVideoYoutubeId} = await ApolloServerModule.getArtworkDetails(Config.app.code, slug, locale, currency, dimensionsUnit)
  return {locale, slug, artworkData, allSlides, variantsFullPricesReadableByStatus, heroVideoYoutubeId}
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export async function clientLoader({serverLoader}: Route.ClientLoaderArgs) {
//   const serverData = await serverLoader()
//   const {slug} = serverData

//   // BLOCKING
//   // const branchLink = await ApolloModule.getArtworkQr(Config.app.code, slug)
//   // return {branchLink, ...serverData}

//   // Suspended -> Awaited
//   const branchLink = ApolloModule.getArtworkQr(slug)
//   return {branchLink, ...serverData}
// }
// clientLoader.hydrate = true // without this, the clientLoader only runs on client-side navigations. With hydrate = true it also runs on the initial page load during hydration, so useLoaderData always returns data from the clientLoader regardless of how the page was loaded.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const meta: MetaFunction<typeof loader> = ({loaderData, matches, location}) => {
  const rootLoaderData = getRootLoaderData(matches)
  const {galleryData} = rootLoaderData || {}
  const {artworkData} = loaderData || {}
  const title = artworkData?.title + " | " + galleryData?.title
  const description = artworkData?.seoData?.ogDescription || ""
  return [
    //
    ...getMetaTitleDescription(title, description),
    ...getMetaBase(rootLoaderData, location?.pathname),
    ...getMetaImage(artworkData?.seoData?.ogImage, artworkData?.seoData?.ogImageWidth, artworkData?.seoData?.ogImageHeight),
  ]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function ArtworkDetailPage() {
  const rootData = useRootLoaderData()
  const {slug, locale, artworkData, allSlides, variantsFullPricesReadableByStatus, heroVideoYoutubeId} = useLoaderData<typeof loader>()

  const {openUserSettingsModal} = useUserSettingsModal()

  const location = useLocation()
  const url = `${rootData.ROOT_URL}${location.pathname}`

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const additionalImages = !allSlides ? undefined : allSlides.filter(s => s.imageType === "additional")
  const amountAdditionalImages = additionalImages?.length || 0 // for lightbox index when wall image clicked

  const wallImages = !allSlides ? undefined : allSlides.filter(s => s.imageType === "wall")

  const branchLink = useBranchLink("artwork", slug, locale)

  // Action Button
  const galleryContactEmail = rootData.galleryData?.contact?.email || undefined
  const purchaseLink = artworkData?.purchaseLink || undefined
  const statusWp = artworkData?.availabilityStatusWp || undefined

  const actionButtonIntlId = getIntlIdForArtworkButton(statusWp, !!purchaseLink)

  const {t} = useTranslation()
  const labels = {
    qrCodeHeader: t("components.qrCode.viewInApp"),
    sections: {
      dimensions: t("sections.artworkDetails.dimensions"),
      techniques: t("sections.artworkDetails.techniques", {count: artworkData?.techniques?.length || 0}),
      materials: t("sections.artworkDetails.materials", {count: artworkData?.materials?.length || 0}),
      year: t("sections.artworkDetails.year"),
      price: t("sections.artworkDetails.price"),
      availabilityStatus: t("sections.artworkDetails.availabilityStatus"),
      authCert: t("sections.artworkDetails.authCert"),
      infos: t("sections.infos"),
      additionalImages: t("sections.artworkDetails.additionalImages"),
      publicWalls: t("sections.publicWalls"),
    },
    yes: t("global.yes"),
    actionButton: t(`sections.artworkDetails.actionButton.${actionButtonIntlId}`),
    actionMoreInfos: {
      subject: t(`sections.artworkDetails.actionButtonHref.moreInfos.subject`, {artworkTitle: artworkData?.title, artistTitle: artworkData?.artistsTitles}),
      body: t(`sections.artworkDetails.actionButtonHref.moreInfos.body`, {artworkTitle: artworkData?.title, artistTitle: artworkData?.artistsTitles, url}),
    },
    actionSalesInquiry: {
      subject: t(`sections.artworkDetails.actionButtonHref.salesInquiry.subject`, {artworkTitle: artworkData?.title, artistTitle: artworkData?.artistsTitles}),
      body: t(`sections.artworkDetails.actionButtonHref.salesInquiry.body`, {artworkTitle: artworkData?.title, artistTitle: artworkData?.artistsTitles, url}),
    },
  }

  log.log("render()", {additionalImages: additionalImages?.length, wallImages: wallImages?.length, amountTechniques: artworkData?.techniques?.length || 0, statusWp, galleryContactEmail, purchaseLink})
  return (
    <>
      <CPageContainer
      //
      // sx={{background: "#FFF"}}
      >
        {/* */}

        {/* Image | Basic Infos */}
        <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
          <Grid container direction={{xs: "column", md: "row"}} spacing={{xs: 4, md: 6}}>
            {/* */}

            {/* Left: Image */}
            <Grid size={{xs: 12, md: 6, lg: 6}}>
              <Box
                sx={{
                  //
                  aspectRatio: {md: "1 / 1"},
                  p: {xs: 2, sm: 4},
                  // background: "#EEE",
                  background: "linear-gradient(to top, #CCC, transparent)",
                  ...brd(DEBUG, "red"),
                }}>
                {!!artworkData?.featuredImageUrl && (
                  <Box
                    //
                    component={"img"}
                    src={artworkData.featuredImageUrl}
                    sx={{
                      //
                      display: "block",
                      cursor: "pointer",
                      width: "100%",
                      height: {xs: "auto", md: "100%"},
                      maxHeight: {xs: "60vh", md: "none"},
                      objectFit: "contain",
                      transition: "transform 0.2s ease",
                      "&:hover": {transform: "scale(1.02)"},
                    }}
                    onClick={() => setLightboxIndex(0)}
                  />
                )}
              </Box>
            </Grid>

            {/* Right: Infos */}
            <Grid size={{xs: 12, md: 6}} sx={{position: "relative"}}>
              <Box sx={{...brd(DEBUG, "red")}}>
                <Box sx={{...brd(DEBUG, "blue"), mr: {xs: 0, sm: SIZE_QR / 6 + 3}}}>
                  <Typography variant={"artworkDetailsArtist"}>{artworkData?.artistsTitles}</Typography>
                  <Typography variant={"artworkDetailsTitle"}>{artworkData?.title}</Typography>
                </Box>

                <Stack spacing={2} sx={{pt: 3}}>
                  {!!artworkData?.variantsFull?.length && !!artworkData?.variantsFull?.[0].dimensionsReadable && (
                    <ArtworkKeyValue
                      //
                      header={labels.sections.dimensions}
                      lines={artworkData.variantsFull.map(v => v.dimensionsReadable).filter(notEmpty)}
                      onClick={openUserSettingsModal}
                    />
                  )}

                  {!!artworkData?.techniquesReadable && (
                    <ArtworkKeyValue
                      //
                      header={labels.sections.techniques}
                      lines={[artworkData.techniquesReadable]}
                    />
                  )}

                  {!!artworkData?.materialsReadable && (
                    <ArtworkKeyValue
                      //
                      header={labels.sections.materials}
                      lines={[artworkData.materialsReadable]}
                    />
                  )}

                  {!!artworkData?.year && (
                    <ArtworkKeyValue
                      //
                      header={labels.sections.year}
                      lines={[artworkData.year.toString()]}
                    />
                  )}

                  {!!variantsFullPricesReadableByStatus && (
                    <ArtworkKeyValue
                      //
                      header={labels.sections.price}
                      lines={variantsFullPricesReadableByStatus}
                      onClick={openUserSettingsModal}
                    />
                  )}

                  {!!artworkData?.availabilityStatusReadable && (
                    <ArtworkKeyValue
                      //
                      header={labels.sections.availabilityStatus}
                      lines={[getFirstLetterCapitalized(artworkData.availabilityStatusReadable)]}
                    />
                  )}

                  {!!artworkData?.authCertificate && (
                    <ArtworkKeyValue
                      //
                      header={labels.sections.authCert}
                      lines={[labels.yes]}
                    />
                  )}

                  <Box sx={{display: "inline-block", pt: 2}}>
                    {actionButtonIntlId === "moreInfos" ? (
                      <Button
                        //
                        variant={"contained"}
                        href={`mailto:${galleryContactEmail}?subject=${labels.actionMoreInfos.subject}&body=${labels.actionMoreInfos.body}`}>
                        {labels.actionButton}
                      </Button>
                    ) : actionButtonIntlId === "purchase" && !!purchaseLink ? (
                      <Button
                        //
                        variant={"contained"}
                        href={purchaseLink}
                        target="_blank"
                        rel="noopener noreferrer">
                        {labels.actionButton}
                      </Button>
                    ) : (
                      <Button
                        //
                        variant={"contained"}
                        href={`mailto:${galleryContactEmail}?subject=${labels.actionSalesInquiry.subject}&body=${labels.actionSalesInquiry.body}`}>
                        {labels.actionButton}
                      </Button>
                    )}
                  </Box>
                </Stack>
              </Box>

              {!isXs && (
                <Box sx={{position: "absolute", right: 0, top: 0, width: SIZE_QR, height: SIZE_QR, ...brd(DEBUG, "blue")}}>
                  <CQrCodeAwaited branchLinkPromise={branchLink} imageSx={{p: 1}} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Bottom: Content */}
        {!!artworkData?.content && true && (
          <Box sx={{mt: Config.theme.sectionSpacing, textAlign: !Config.theme.alignContentCenter ? "left" : "center", ...brd(DEBUG, "green")}}>
            <CSectionHeader text={labels.sections.infos} />
            <CHtmlText html={artworkData.content} origin={"artwork.slug.content"} />
          </Box>
        )}

        {/* Youtube Video */}
        {!!heroVideoYoutubeId && (
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

        {/* Public Walls */}
        {!!wallImages?.length && (
          <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
            <CSectionHeader text={labels.sections.publicWalls} />
            <Grid container spacing={{xs: 2, sm: 3, md: 4}} justifyContent={!Config.theme.alignContentCenter ? "flex-start" : "center"}>
              {wallImages.map((item, i) => (
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
                      onClick={() => setLightboxIndex(1 + amountAdditionalImages + i)}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* QR Code */}
        {isXs && (
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

      {!!allSlides && (
        <CLightbox
          //
          images={allSlides}
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type PropsArtworkKeyValue = {
  header: string
  lines: string[]
  onClick?: () => void
}
const ArtworkKeyValue = (props: PropsArtworkKeyValue) => {
  const {header, lines, onClick} = props
  return (
    <Box onClick={onClick} sx={{alignSelf: "flex-start", display: "inline-block", ...brd(DEBUG, "green")}}>
      <Box>
        <Typography variant={"artworkDetailsPropKey"}>{header}</Typography>
      </Box>
      {lines.map((line, i) => (
        <Box key={`v_${i}`}>
          <Typography variant={"artworkDetailsPropValue"}>{line}</Typography>
        </Box>
      ))}
    </Box>
  )
}
