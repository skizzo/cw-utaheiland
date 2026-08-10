import {type LoaderFunctionArgs, type MetaFunction, useLoaderData} from "react-router"
import {Fragment} from "react/jsx-runtime"

import {getT} from "~/i18n.server"

import {Box, Typography} from "@mui/material"

import {Config} from "~/lib/config"
import {detectCookieSettings} from "~/lib/cookies"
import {createLog} from "~/lib/modules"
import {getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData} from "~/lib/utils"

import {CHtmlText, CPageContainer, CPageHeader} from "~/components"

const DEBUG = false && __DEV__
const log = createLog("legal-notice")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const loader = async ({request}: LoaderFunctionArgs) => {
  const {locale} = await detectCookieSettings(request)
  const t = await getT(locale)
  const title = t("pages.legalNotice")
  return {title}
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
  const {title} = useLoaderData<typeof loader>()

  log.log("render()")
  return (
    <>
      <CPageContainer sx={{background: "#FFF"}}>
        {/* */}

        <CPageHeader
          //
          sx={{mt: Config.theme.sectionSpacing}}
          title={title}
          textAlign={"left"}
        />

        <CHtmlText
          //
          html={getHtmlFirstPart(Config.app.legalNotice.firstPart)}
          origin={"legal-notice-1"}
          sx={{mt: Config.theme.sectionSpacing / 1.5}}
        />

        <CHtmlText
          //
          html={getHtmlSecondPart(Config.app.legalNotice.secondPart)}
          origin={"legal-notice-2"}
          sx={{mt: Config.theme.sectionSpacing / 1.5}}
        />

        <Box sx={{mt: Config.theme.sectionSpacing}}>
          <Typography variant="h2">Haftungsausschluss</Typography>

          <>
            <Typography variant="h3" sx={{pt: Config.theme.sectionSpacing}}>
              Haftung für Inhalte
            </Typography>
            <CHtmlText
              //
              html={`Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Für die Inhalte (insbesondere Texte, Abbildungen und Werkangaben) ist ausschliesslich der jeweilige Aussteller bzw. die Künstlerin / der Künstler verantwortlich. Als Betreiberin dieser Website stellen wir die technische Plattform zur Verfügung, übernehmen jedoch keine Verantwortung für die durch Dritte bereitgestellten Inhalte. Wir behalten uns vor, Inhalte jederzeit ohne Ankündigung zu ändern oder zu entfernen.`}
              origin={"legal-notice-1"}
              sx={{pt: 3, overflowWrap: "break-word", hyphens: "auto"}}
            />

            <Typography variant="h3" sx={{pt: Config.theme.sectionSpacing}}>
              Haftung für Links
            </Typography>
            <CHtmlText
              //
              html={`Diese Website enthält Links zu externen Webseiten Dritter. Auf deren Inhalte haben wir keinen Einfluss und übernehmen dafür keine Verantwortung. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden entsprechende Links umgehend entfernt.`}
              origin={"legal-notice-2"}
              sx={{pt: 3, overflowWrap: "break-word", hyphens: "auto"}}
            />

            <Typography variant="h3" sx={{pt: Config.theme.sectionSpacing}}>
              Urheberrecht
            </Typography>
            <CHtmlText
              //
              html={`Die Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht. Die Rechte an den dargestellten Kunstwerken liegen bei den jeweiligen Künstlerinnen und Künstlern bzw. Rechteinhabern. Jegliche Verwendung ausserhalb der gesetzlichen Schranken bedarf der vorherigen schriftlichen Zustimmung der jeweiligen Rechteinhaber. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.`}
              origin={"legal-notice-3"}
              sx={{pt: 3, overflowWrap: "break-word", hyphens: "auto"}}
            />

            <Typography variant="h3" sx={{pt: Config.theme.sectionSpacing}}>
              Preise & Angebote
            </Typography>
            <CHtmlText
              //
              html={`Alle Preisangaben erfolgen – sofern nicht anders angegeben – in CHF, EUR oder weiteren Währungen. Zur besseren Benutzerfreundlichkeit kann auf dieser Website ein Währungsrechner eingesetzt werden, der Preise tageskursabhängig in die vom Besucher gewählte oder erkannte Währung umrechnet und anzeigt. Die angezeigten umgerechneten Preise dienen ausschliesslich der Orientierung und sind unverbindlich. Massgeblich ist stets der zwischen Käufer und Aussteller bzw. Künstler:in individuell vereinbarte Preis in der ursprünglich festgelegten Währung. Die dargestellten Preise verstehen sich als Richtwerte und können je nach Werk, Ausstellung oder individueller Vereinbarung variieren. Der Verkauf erfolgt direkt zwischen Käufer und Aussteller bzw. Künstler:in. Massgeblich sind die jeweils individuell vereinbarten Konditionen zwischen den Parteien.`}
              origin={"legal-notice-4"}
              sx={{pt: 3, overflowWrap: "break-word", hyphens: "auto"}}
            />

            <Typography variant="h3" sx={{pt: Config.theme.sectionSpacing}}>
              Unverbindlichkeit der Inhalte
            </Typography>
            <CHtmlText
              //
              html={`Die Präsentation der Kunstwerke auf dieser Website stellt kein rechtlich bindendes Angebot dar, sondern dient ausschliesslich der Information und der Kontaktaufnahme. Die Betreiberin dieser Website ist nicht Vertragspartei von Kaufverträgen zwischen Käufer und Künstler:in bzw. Aussteller. Verfügbarkeit und Preise einzelner Werke können sich jederzeit ändern.`}
              origin={"legal-notice-5"}
              sx={{pt: 3, overflowWrap: "break-word", hyphens: "auto"}}
            />

            <Typography variant="h3" sx={{pt: Config.theme.sectionSpacing}}>
              Datenschutz
            </Typography>
            <CHtmlText
              //
              html={`Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung: <a href="https://iazzu.com/anderes/datenschutzbestimmungen">https://iazzu.com/anderes/datenschutzbestimmungen</a>`}
              origin={"legal-notice-6"}
              sx={{pt: 3, overflowWrap: "break-word", hyphens: "auto"}}
            />
          </>

          {!!Config.app.legalNotice.additions.length &&
            Config.app.legalNotice.additions.map((entry, i) => (
              <Fragment key={`override_${i}`}>
                <Typography variant="h3" sx={{pt: Config.theme.sectionSpacing}}>
                  {entry.header}
                </Typography>
                <CHtmlText
                  //
                  html={entry.paragraph}
                  origin={`legal-notice-${i}`}
                  sx={{pt: 3, overflowWrap: "break-word", hyphens: "auto"}}
                />
              </Fragment>
            ))}
        </Box>
      </CPageContainer>
    </>
  )
}

const getHtmlFirstPart = (props: {
  //
  header: string
  artistName: string
  address1: string
  address2?: string
  areaCode: string
  city: string
  country: string
  email: string
  phone: string
}) => {
  const {header, artistName, address1, address2, areaCode, city, country, email, phone} = props
  return [
    //
    `<p><b>${header}</b></p>`,
    `<p>`,
    `${artistName}<br/>`,
    `${address1}<br/>`,
    ...(address2 ? [`${address2}<br/>`] : []),
    `${areaCode} ${city}<br/>`,
    `${country}<br/>`,
    `E-Mail: <a href="mailto:${email}">${email}</a><br/>`,
    `${phone}<br/>`,
  ].join("")
}

const getHtmlSecondPart = (props: {
  //
  header: string
  name: string
  address1: string
  address2?: string
  areaCode: string
  city: string
  country: string
  // email: string
  // phone: string
}) => {
  const {header, name, address1, address2, areaCode, city, country /*, email, phone*/} = props
  return [
    //
    `<p><b>${header}</b></p>`,
    `<p>`,
    `${name}<br/>`,
    `${address1}<br/>`,
    ...(address2 ? [`${address2}<br/>`] : []),
    `${areaCode} ${city}<br/>`,
    `${country}<br/>`,
    `<a href="mailto:hello@iazzu.com">hello@iazzu.com</a>`,
    // `E-Mail: <a href="mailto:${email}">${email}</a><br/>`,
    // `Telefon: ${phone}`,
  ].join("")
}
