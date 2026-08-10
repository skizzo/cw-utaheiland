import {useTranslation} from "react-i18next"
import {type LoaderFunctionArgs, type MetaFunction, redirect, useLoaderData} from "react-router"

// import {getT} from "~/i18n.server"
import {Config} from "~/lib/config"
import {detectCookieSettings} from "~/lib/cookies"
import {createLog} from "~/lib/modules"
import {ApolloServerModule} from "~/lib/modules/server"
import {getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData} from "~/lib/utils"

import {CPageContainer, CPageHeader} from "~/components"

import {CEventsByEra} from "./events"

const DEBUG = false && __DEV__
const log = createLog("courses")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const loader = async ({request}: LoaderFunctionArgs) => {
  if (!Config.app.events.showSubEvents) {
    return redirect("/events")
  }
  const {locale} = await detectCookieSettings(request)

  // const t = await getT(locale)
  // const title = t("pages.events")

  const title = Config.app.events.subEventsTitle?.[locale]

  const {eventsPresent, eventsFuture, eventsPast} = await ApolloServerModule.getEvents(Config.app.code, locale, true)

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

        <CEventsByEra locale={locale} showCallToAction={true} header={labels.era.present} events={eventsPresent} />
        <CEventsByEra locale={locale} showCallToAction={true} header={labels.era.future} events={eventsFuture} />
        <CEventsByEra locale={locale} showCallToAction={true} header={labels.era.past} events={eventsPast} />
      </CPageContainer>
    </>
  )
}
