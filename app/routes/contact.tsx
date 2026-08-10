import {useCallback, useState} from "react"
import {type LoaderFunctionArgs, type MetaFunction, useLoaderData} from "react-router"

import {getT} from "~/i18n.server"

import {Box, Grid, Typography} from "@mui/material"

import {Config} from "~/lib/config"
import {detectCookieSettings} from "~/lib/cookies"
import {useRootLoaderData} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import {brd, getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData} from "~/lib/utils"

import {CGalleryContactLinkButton, CLocationTabs, CPageContainer, CPageHeader} from "~/components"
import {CGoogleMap} from "~/components/CGoogleMap"

const DEBUG = false && __DEV__
const log = createLog("artworks")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const loader = async ({request}: LoaderFunctionArgs) => {
  const {locale} = await detectCookieSettings(request)
  const t = await getT(locale)
  const title = t("pages.contact")

  const ROOT_URL = process.env.ROOT_URL

  // const {events} = await ApolloServerModule.getEvents(Config.app.code, locale)
  return {title, ROOT_URL}
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
export default function ContactPage() {
  const {galleryData} = useRootLoaderData() || {}
  const {title, ROOT_URL} = useLoaderData<typeof loader>()

  const [locationTabIndex, setLocationTabIndex] = useState(0)
  const locationTabsItems = !galleryData?.locations ? [] : galleryData.locations.map(l => ({label: l.city || ""})).filter(e => !!e.label)
  const onLocationTabChange = useCallback((indexNew: number) => {
    //
    setLocationTabIndex(indexNew)
  }, [])

  const amountLocations = galleryData?.locations?.length || 0
  const selectedLocation = galleryData?.locations?.[locationTabIndex]

  log.log("render()")
  return (
    <>
      <CPageContainer
      //
      // sx={{background: "#FFF"}}
      >
        {/* */}

        <CPageHeader
          //
          sx={{mt: Config.theme.sectionSpacing}}
          title={title}
        />

        {amountLocations > 1 && (
          <Box sx={{mt: Config.theme.sectionSpacing / 3, ...brd(DEBUG, "green")}}>
            <CLocationTabs
              //
              items={locationTabsItems}
              selected={locationTabIndex}
              onChange={onLocationTabChange}
            />
          </Box>
        )}

        <Grid container spacing={4} direction={"row"} sx={{mt: Config.theme.sectionSpacing / 3}}>
          <Grid size={{xs: 12, md: 6}}>
            <Box sx={{mt: Config.theme.sectionSpacing / 3, ...brd(DEBUG, "green")}}>
              {!!selectedLocation && !!selectedLocation.lat && !!selectedLocation.lng && (
                <CGoogleMap
                  //
                  lat={selectedLocation.lat}
                  lng={selectedLocation.lng}
                  aspectRatio={{xs: "16 / 9", md: "1 / 1"}}
                  // aspectRatio={"16 / 16"}
                />
              )}
            </Box>
          </Grid>

          <Grid size={{xs: 12, md: 6}} sx={{display: "flex", flexDirection: "column", justifyContent: "center", ...brd(DEBUG, "red")}}>
            <Typography variant={"h2"}>{galleryData?.title}</Typography>

            <Box sx={{mt: Config.theme.sectionSpacing / 3, ...brd(DEBUG, "green")}}>
              <Typography variant={"body1"}>
                {selectedLocation?.addressReadable}
                <br />
                {selectedLocation?.country}
              </Typography>
              <Typography variant={"body1"}>
                {!!galleryData?.contact?.email && <a href={`mailto:${galleryData.contact.email}`}>{galleryData.contact.email}</a>}
                <br />
                {galleryData?.contact?.phone}
              </Typography>

              {!!galleryData?.contact?.links?.length && false && (
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                  {(galleryData?.contact?.links || []).map((link, i) => (
                    <CGalleryContactLinkButton
                      //
                      rootUrl={ROOT_URL}
                      key={`link$_${i}`}
                      data={link}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </CPageContainer>
    </>
  )
}
