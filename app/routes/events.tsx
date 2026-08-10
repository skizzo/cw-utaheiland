import {useTranslation} from "react-i18next"
import {Link, type LoaderFunctionArgs, type MetaFunction, redirect, useLoaderData} from "react-router"

import {getT} from "~/i18n.server"

import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import {Box, Button, ButtonBase, Card, CardContent, CardMedia, IconButton, Stack, Typography} from "@mui/material"

import {Config} from "~/lib/config"
import {detectCookieSettings} from "~/lib/cookies"
import {createLog} from "~/lib/modules"
import {ApolloServerModule} from "~/lib/modules/server"
import type {TAppLang, TGraphQl} from "~/lib/types"
import {brd, getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData} from "~/lib/utils"

import {CPageContainer, CPageHeader, CSectionHeader} from "~/components"

const DEBUG = false && __DEV__
const log = createLog("events")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const loader = async ({request}: LoaderFunctionArgs) => {
  if (!Config.app.showEvents) {
    return redirect("/")
  }
  const {locale} = await detectCookieSettings(request)

  const t = await getT(locale)
  const title = t("pages.events")

  const {eventsPresent, eventsFuture, eventsPast} = await ApolloServerModule.getEvents(Config.app.code, locale, false)

  return {title, eventsPresent, eventsFuture, eventsPast, locale}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const meta: MetaFunction<typeof loader> = ({loaderData, matches, location}) => {
  const rootLoaderData = getRootLoaderData(matches) // || {}
  const {galleryData} = rootLoaderData || {}
  const title = (loaderData?.title || "") + " | " + galleryData?.title
  const description = galleryData?.seoData.ogDescription || ""
  return [
    //
    ...getMetaTitleDescription(title, description),
    ...getMetaBase(rootLoaderData, location?.pathname),
    ...getMetaImage(galleryData?.featuredImage?.size?.url, galleryData?.featuredImage?.size?.width, galleryData?.featuredImage?.size?.height),
  ]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function EventsPage() {
  const {title, eventsPresent, eventsFuture, eventsPast, locale} = useLoaderData<typeof loader>()

  const {t} = useTranslation()
  const labels = {
    era: {
      present: t("sections.eventDetails.eras.present"),
      future: t("sections.eventDetails.eras.future"),
      past: t("sections.eventDetails.eras.past"),
    },
  }

  log.log("render()")
  return (
    <>
      <CPageContainer>
        {/* */}

        <CPageHeader
          //
          sx={{mt: Config.theme.sectionSpacing}}
          title={title}
        />

        <CEventsByEra locale={locale} showCallToAction={false} header={labels.era.present} events={eventsPresent} />
        <CEventsByEra locale={locale} showCallToAction={false} header={labels.era.future} events={eventsFuture} />
        <CEventsByEra locale={locale} showCallToAction={false} header={labels.era.past} events={eventsPast} />
      </CPageContainer>
    </>
  )
}

export const CEventsByEra = (props: {header: string; events: TGraphQl.Event[]; showCallToAction: boolean; locale: TAppLang}) => {
  //
  const {header, events, showCallToAction, locale} = props

  if (!events.length) {
    return null
  }

  const USE_ICON_BUTTON = false

  const labels = {
    buttonLink: Config.app.events.callToActionButtonLabel[locale],
  }

  return (
    <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
      <CSectionHeader text={header} />

      <Stack spacing={4}>
        {events.map((event, i) => (
          <Box key={`event_${i}`} sx={{...brd(DEBUG, "blue")}}>
            <Card sx={{display: "flex", flexDirection: {xs: "column", sm: "row"}}}>
              <ButtonBase
                //
                component={Link}
                to={`/events/${event.slug}`}
                prefetch={"intent"}
                viewTransition={Config.app.useViewTransition}
                sx={{display: "flex", flex: 1, flexDirection: {xs: "column", sm: "row"}}}>
                <CardMedia
                  //
                  component={"img"}
                  sx={{width: {xs: "100%", sm: 160}, height: "100%", minHeight: 160, maxHeight: 200, objectFit: "cover"}}
                  image={event.featuredImageThumbUrl!}
                  alt={`Event Image: ${event.title}`}
                />
                <Box sx={{flex: 1, alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center", ...brd(DEBUG, "red")}}>
                  <CardContent>
                    <Typography component="div" variant={"h3"}>
                      {event.title}
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{color: "text.secondary", mt: 2}}>
                      {event.timeRangeReadable}
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{color: "text.secondary", mb: 0, mt: 1, ...brd(DEBUG, "green")}}>
                      {event.locationReadable}
                    </Typography>
                  </CardContent>
                </Box>
              </ButtonBase>

              {!!event.link && showCallToAction && Config.app.events.showSubEvents && (
                <Box sx={{display: "flex", alignItems: "center", px: 2, pb: {xs: 2, md: 0}}}>
                  {USE_ICON_BUTTON && (
                    <IconButton component="a" href={event.link} target="_blank" rel="noopener noreferrer" aria-label="Open event link">
                      <OpenInNewIcon />
                    </IconButton>
                  )}

                  {!USE_ICON_BUTTON && (
                    <Button
                      //
                      variant={"contained"}
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer">
                      {labels.buttonLink}
                    </Button>
                  )}
                </Box>
              )}
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
