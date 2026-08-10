import {type LoaderFunctionArgs, type MetaFunction, useLoaderData} from "react-router"

import {getT} from "~/i18n.server"

import {Box} from "@mui/material"

import {Config} from "~/lib/config"
import {detectCookieSettings} from "~/lib/cookies"
import {createLog} from "~/lib/modules"
import {getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData} from "~/lib/utils"

import {CPageContainer, CPrivacyPolicy, getPrivacyPolicy, type PrivacyPolicyController} from "~/components"

const DEBUG = false && __DEV__
const log = createLog("imprint")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const loader = async ({request}: LoaderFunctionArgs) => {
  const {locale} = await detectCookieSettings(request)
  const localeUsed = Config.app.privacyPolicy.exclusiveLang ? Config.app.privacyPolicy.exclusiveLang : locale

  const t = await getT(localeUsed)
  const title = t("pages.privacyPolicy")

  return {title, locale: localeUsed}
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
export default function LegalNoticePage() {
  const {title, locale} = useLoaderData<typeof loader>()

  const content = getPrivacyPolicy(Config.app.privacyPolicy.countryCode, Config.app.privacyPolicy as PrivacyPolicyController, locale)

  log.log("render()")
  return (
    <>
      <CPageContainer>
        {/* */}

        <Box sx={{mt: Config.theme.sectionSpacing}}>
          <CPrivacyPolicy content={content} />
        </Box>
      </CPageContainer>
    </>
  )
}
