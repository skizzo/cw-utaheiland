import {useState} from "react"
import {useTranslation} from "react-i18next"
import {Link, type LoaderFunctionArgs, type MetaFunction, redirect, useLoaderData} from "react-router"

import {Box, Button, Grid, Stack, Typography} from "@mui/material"

import {Config} from "~/lib/config"
import {detectCookieSettings} from "~/lib/cookies"
import {useBranchLink} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import {ApolloServerModule} from "~/lib/modules/server"
import type {TGraphQl} from "~/lib/types"
import {brd, getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData} from "~/lib/utils"

import {CClientOnly, CHeroCarousel, CHtmlText, CLightbox, CPageContainer, CPageHeader, CQrCodeAwaited, CSectionHeader} from "~/components"

const DEBUG = false && __DEV__
const log = createLog("events.slug")

const SHOW_TITLE_IN_HERO = false

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function loader({request, params}: LoaderFunctionArgs) {
  if (!Config.app.showEvents) {
    return redirect("/")
  }
  const {slug} = params
  const {locale} = await detectCookieSettings(request)
  const {eventData, heroSlides, additionalImages} = await ApolloServerModule.getEventDetails(Config.app.code, slug, locale)
  return {locale, slug, eventData, heroSlides, additionalImages}
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export async function clientLoader({serverLoader}: Route.ClientLoaderArgs) {
//   const serverData = await serverLoader()
//   const {slug} = serverData

//   // BLOCKING
//   // const branchLink = await ApolloModule.getArtworkQr(Config.app.code, slug)
//   // return {branchLink, ...serverData}

//   // Suspended -> Awaited
//   const branchLink = ApolloModule.getEventQr(slug) // returns a promise
//   return {branchLink, ...serverData}
// }
// clientLoader.hydrate = true // without this, the clientLoader only runs on client-side navigations. With hydrate = true it also runs on the initial page load during hydration, so useLoaderData always returns data from the clientLoader regardless of how the page was loaded.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const meta: MetaFunction<typeof loader> = ({loaderData, matches, location}) => {
  const rootLoaderData = getRootLoaderData(matches)
  const {galleryData} = rootLoaderData || {}
  const {eventData} = loaderData || {}
  const title = eventData?.title + " | " + galleryData?.title
  const description = eventData?.seoData?.ogDescription || ""
  return [
    //
    ...getMetaTitleDescription(title, description),
    ...getMetaBase(rootLoaderData, location?.pathname),
    ...getMetaImage(eventData?.seoData?.ogImage, eventData?.seoData?.ogImageWidth, eventData?.seoData?.ogImageHeight),
  ]
}

// export function HydrateFallback() {
//   // Render the page shell without QR code while clientLoader runs
//   // But clientLoader is nearly instant since it doesn't await the promise
//   return null // or a minimal skeleton
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function EventDetailsPage() {
  const {locale, eventData, heroSlides, additionalImages, slug} = useLoaderData<typeof loader>()

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // const {branchLink} = useLoaderData<typeof clientLoader>()
  const branchLink = useBranchLink("event", slug, locale)

  const {t} = useTranslation()
  const labels = {
    qrCodeHeader: t("components.qrCode.viewInApp"),
    sections: {
      infos: t("sections.infos"),
      organizedBy: t("sections.eventDetails.organizedBy"),
      openingHours: t("sections.eventDetails.openingHours"),
      additionalImages: t("sections.artworkDetails.additionalImages"),
    },
    yes: t("global.yes"),
    buttonLink: Config.app.events.callToActionButtonLabel[locale],
  }

  log.log("render()")
  return (
    <>
      {Config.theme.heroFullWidth && (
        <CHeroCarousel
          //
          titleFixed={SHOW_TITLE_IN_HERO ? eventData?.title : undefined}
          aspectRatio={"16 / 9"}
          slides={heroSlides}
          onImageClick={index => setLightboxIndex(index)}
          sx={{pt: Config.theme.headerHeight}}
        />
      )}

      <CPageContainer sx={{background: "#FFF"}}>
        {/* */}

        {!Config.theme.heroFullWidth && (
          <CHeroCarousel
            //
            titleFixed={SHOW_TITLE_IN_HERO ? eventData?.title : undefined}
            aspectRatio={"16 / 9"}
            slides={heroSlides}
            onImageClick={index => setLightboxIndex(index)}
          />
        )}

        {!SHOW_TITLE_IN_HERO && false && (
          <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
            <Typography variant={"h1"}>{eventData?.title}</Typography>
          </Box>
        )}

        {!SHOW_TITLE_IN_HERO && true && <CPageHeader title={eventData?.title} sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}} />}

        {/* Time Range & Location */}
        {true && (
          <Box sx={{mt: Config.theme.sectionSpacing / 2, textAlign: !Config.theme.alignContentCenter ? "left" : "center", ...brd(DEBUG, "green")}}>
            <Box>
              <Typography variant="body1" sx={{fontWeight: 600, ...brd(DEBUG, "blue")}}>
                {eventData?.timeRangeReadable}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{fontWeight: 600, ...brd(DEBUG, "blue"), pt: 1}}>
                {eventData?.locationReadable}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Time Range & Location */}
        {!!eventData?.link && (
          <Box sx={{mt: Config.theme.sectionSpacing / 2, textAlign: !Config.theme.alignContentCenter ? "left" : "center", ...brd(DEBUG, "green")}}>
            <Box>
              <Button
                //
                variant={"contained"}
                href={eventData.link}
                target="_blank"
                rel="noopener noreferrer">
                {labels.buttonLink}
              </Button>
            </Box>
          </Box>
        )}

        {/* Content */}
        {true && !!eventData?.content && (
          <Box sx={{mt: Config.theme.sectionSpacing, textAlign: !Config.theme.alignContentCenter ? "left" : "center", ...brd(DEBUG, "green")}}>
            <CSectionHeader text={labels.sections.infos} />
            <CHtmlText html={eventData.content} origin={"event.slug.content"} />
          </Box>
        )}

        {/* Opening Hours */}
        {true && !!eventData?.openingHoursLines?.length && (
          <Box sx={{mt: Config.theme.sectionSpacing, textAlign: !Config.theme.alignContentCenter ? "left" : "center", ...brd(DEBUG, "green")}}>
            <CSectionHeader text={labels.sections.openingHours} />
            {eventData.openingHoursLines.map((line, i) => (
              <CHtmlText key={`line_${i}`} html={line} origin={`event.slug.openingHoursLines.${i}`} />
            ))}
          </Box>
        )}

        {/* External Organizer */}
        {true && !!eventData?.externalOrganizer && (
          <Box sx={{mt: Config.theme.sectionSpacing, display: "flex", flexDirection: "column", alignItems: !Config.theme.alignContentCenter ? "flex-start" : "center", ...brd(DEBUG, "green")}}>
            <CSectionHeader text={labels.sections.organizedBy} />
            <ExternalOrganizer data={eventData?.externalOrganizer} />
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
        <CClientOnly>
          <CLightbox
            //
            images={heroSlides}
            initialIndex={lightboxIndex ?? 0}
            open={lightboxIndex !== null}
            onClose={() => setLightboxIndex(null)}
            hideIndividualWallInfos
            locale={locale}
          />
        </CClientOnly>
      )}
    </>
  )
}

const ExternalOrganizer = (props: {data: TGraphQl.ExternalOrganizer}) => {
  const externalOrganizer = props.data

  const Content = () => (
    <Stack direction={"row"} spacing={2}>
      {externalOrganizer.imageThumbUrl && (
        <Box
          //
          component={"img"}
          src={externalOrganizer.imageThumbUrl}
          sx={{width: 60, height: 60, borderRadius: 40, ...brd(DEBUG, "blue")}}
        />
      )}

      <Box sx={{flex: 1, alignSelf: "center", justifyContent: "center", ...brd(DEBUG, "red")}}>
        <Typography variant="body1" sx={{fontWeight: 600}}>
          {externalOrganizer.title}
        </Typography>
      </Box>
    </Stack>
  )

  return !externalOrganizer.website ? (
    <Content />
  ) : (
    <Box component={Link} to={externalOrganizer.website} target="_blank" rel="noopener noreferrer">
      <Content />
    </Box>
  )
}
