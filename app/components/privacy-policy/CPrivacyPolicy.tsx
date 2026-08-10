import {Box, Divider, Typography} from "@mui/material"

import {Config} from "~/lib/config"
import type {TAppLang} from "~/lib/types"
import {assertNever} from "~/lib/utils"

import {CPageHeader} from "../layout/CPageHeader"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface PrivacyPolicyController {
  name: string
  street: string
  zip: string
  city: string
  country: {
    en: string
    de: string
    es: string
    fr: string
  }
  email: string
  phone?: string
  // supervisoryAuthority: string
}

export interface PrivacyPolicyContent {
  title: string
  lastUpdated: string
  sections: PrivacyPolicySection[]
}

interface PrivacyPolicySection {
  heading: string
  body?: string[]
  list?: string[]
  bodyAfterList?: string[]
  infoBox?: string
  subsections?: PrivacyPolicySubsection[]
  cookieTable?: PrivacyCookieRow[]
}

interface PrivacyPolicySubsection {
  subheading: string
  body?: string[]
  list?: string[]
  bodyAfterList?: string[]
}

interface PrivacyCookieRow {
  name: string
  purpose: string
  duration?: string
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Props {
  content: PrivacyPolicyContent
}

export default function CPrivacyPolicy({content}: Props) {
  return (
    <Box
    // sx={{textAlign: !Config.theme.alignContentCenter ? "left" : "center"}}
    >
      {false && <CPageHeader title={content.title} sx={{mb: 1}} />}

      {true && (
        <Typography variant="h1" sx={{mb: 1, overflowWrap: "break-word", hyphens: "auto"}}>
          {content.title}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary" sx={{mb: 4}}>
        {content.lastUpdated}
      </Typography>

      {content.sections.map((section, i) => (
        <Box key={i} sx={{mb: 5}}>
          <Typography variant="h2" sx={{mb: 2}}>
            {section.heading}
          </Typography>

          {section.body?.map((p, j) => (
            <Typography key={j} variant="body1" sx={{mb: 0.25}}>
              <span dangerouslySetInnerHTML={{__html: p}} />
            </Typography>
          ))}

          {section.infoBox && (
            <Box sx={{my: 2, p: 2, bgcolor: "grey.100", borderLeft: "3px solid", borderColor: "primary.main"}}>
              <Typography variant="body2">{section.infoBox}</Typography>
            </Box>
          )}

          {section.cookieTable &&
            (() => {
              const hasDuration = section.cookieTable.some(r => r.duration)
              const headers = ["Cookie", "Zweck", ...(hasDuration ? ["Speicherdauer"] : [])]
              return (
                <Box component="table" sx={{width: "100%", borderCollapse: "collapse", my: 2}}>
                  <Box component="thead">
                    <Box component="tr">
                      {headers.map(h => (
                        <Box key={h} component="th" sx={{textAlign: "left", p: 1.5, bgcolor: "text.primary", color: "background.paper"}}>
                          <Typography variant="body2" sx={{fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase"}}>
                            {h}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {section.cookieTable.map((row, j) => (
                      <Box component="tr" key={j} sx={{"&:nth-of-type(even) td": {bgcolor: "grey.50"}}}>
                        <Box component="td" sx={{p: 1.5, borderBottom: "1px solid", borderColor: "divider"}}>
                          <Typography variant="body2" sx={{fontStyle: "italic", fontWeight: 600}}>
                            {row.name}
                          </Typography>
                        </Box>
                        <Box component="td" sx={{p: 1.5, borderBottom: "1px solid", borderColor: "divider"}}>
                          <Typography variant="body2">{row.purpose}</Typography>
                        </Box>
                        {hasDuration && (
                          <Box component="td" sx={{p: 1.5, borderBottom: "1px solid", borderColor: "divider"}}>
                            <Typography variant="body2">{row.duration}</Typography>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )
            })()}

          {section.list && (
            <Box component="ul" sx={{pl: 3, mb: 2}}>
              {section.list.map((item, j) => (
                <Box component="li" key={j} sx={{mb: 0.5}}>
                  <Typography variant="body1">{item}</Typography>
                </Box>
              ))}
            </Box>
          )}

          {section.bodyAfterList?.map((p, j) => (
            <Typography key={j} variant="body1" sx={{mb: 2}}>
              {p}
            </Typography>
          ))}

          {section.subsections?.map((sub, j) => (
            <Box key={j} sx={{mb: 3}}>
              <Typography variant="h3" sx={{mb: 1.5}}>
                {sub.subheading}
              </Typography>
              {sub.body?.map((p, k) => (
                <Typography key={k} variant="body1" sx={{mb: 2}}>
                  {p}
                </Typography>
              ))}
              {sub.list && (
                <Box component="ul" sx={{pl: 3, mb: 2}}>
                  {sub.list.map((item, k) => (
                    <Box component="li" key={k} sx={{mb: 0.5}}>
                      <Typography variant="body1">{item}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
              {sub.bodyAfterList?.map((p, k) => (
                <Typography key={k} variant="body1" sx={{mb: 2}}>
                  {p}
                </Typography>
              ))}
            </Box>
          ))}

          {i < content.sections.length - 1 && <Divider sx={{mt: 3}} />}
        </Box>
      ))}
    </Box>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getPrivacyPolicy = (country: "ch" | "de", controller: PrivacyPolicyController, lang: TAppLang): PrivacyPolicyContent => {
  if (country === "ch") {
    switch (lang) {
      case "de":
        return getPrivacyPolicy_CH_DE(controller)
      case "es":
        return getPrivacyPolicy_CH_ES(controller)
      case "en":
        return getPrivacyPolicy_CH_EN(controller)
      case "fr":
        return getPrivacyPolicy_CH_FR(controller)
      default:
        assertNever(lang, "getPrivacyPolicy()", "lang")
    }
    return getPrivacyPolicy_CH_DE(controller)
  }

  // de
  switch (lang) {
    case "de":
      return getPrivacyPolicy_DE_DE(controller)
    case "es":
      return getPrivacyPolicy_DE_ES(controller)
    case "en":
      return getPrivacyPolicy_DE_EN(controller)
    case "fr":
      return getPrivacyPolicy_DE_FR(controller)
    default:
      assertNever(lang, "getPrivacyPolicy()", "lang")
  }
  return getPrivacyPolicy_DE_DE(controller)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPrivacyPolicy_CH_DE = (controller: PrivacyPolicyController): PrivacyPolicyContent => ({
  title: "Datenschutzerklärung",
  lastUpdated: "Stand: April 2026",
  sections: [
    {
      heading: "Verantwortliche Stelle",
      body: [
        //
        // "Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:",
        `${controller.name}<br/>${controller.street}<br/>${controller.zip} ${controller.city}<br/>${controller.country.de}<br/><a href="${controller.email}">${controller.email}</a>${controller.phone ? `<br/>${controller.phone}` : ""}`,
        "Diese Datenschutzerklärung richtet sich nach dem schweizerischen Datenschutzgesetz (revDSG) sowie – soweit anwendbar – der DSGVO.",
      ],
    },
    {
      heading: "Datenverarbeitung",
      body: [
        //
        `Wir verwenden ausschliesslich technisch notwendige Cookies bzw. lokale Speichermechanismen (z. B. für Sprache oder Darstellung).`,
        `Es werden keine Tracking- oder Marketing-Cookies eingesetzt.`,
      ],
    },
    {
      heading: "Cookies und lokale Speicherung",
      body: [
        //
        `Wir erheben und verarbeiten nur diejenigen Daten, die technisch erforderlich sind, um diese Website bereitzustellen und nutzerfreundlich darzustellen.`,
        `Beim Besuch der Website werden automatisch technische Daten (z. B. IP-Adresse, Datum/Uhrzeit, Browserinformationen) in sogenannten Server-Logfiles erfasst. Diese dienen ausschliesslich der Sicherheit und Stabilität der Website und werden nach kurzer Zeit gelöscht.`,
      ],
    },
    {
      heading: "Webanalyse",
      body: [
        //
        `Diese Website nutzt ein datenschutzfreundliches, selbst gehostetes Analyse-Tool (Umami).`,
        `Es werden keine personenbezogenen Daten ausgewertet, keine Nutzerprofile erstellt und kein Tracking über Websites hinweg durchgeführt.`,
      ],
    },
    {
      heading: "Google Fonts",
      body: [
        //
        `Zur einheitlichen Darstellung von Schriftarten werden Google Fonts verwendet. Dabei kann es technisch bedingt zur Übertragung Ihrer IP-Adresse an Google kommen.`,
      ],
    },
    {
      heading: "Weitergabe von Daten",
      body: [
        //
        `Eine Weitergabe Ihrer Daten erfolgt nur, wenn dies technisch notwendig ist, gesetzlich vorgeschrieben ist oder zur Durchsetzung von Rechtsansprüchen erforderlich wird.`,
      ],
    },
    {
      heading: "Ihre Rechte",
      body: [
        //
        `Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie ein Widerspruchsrecht.`,
        `Sie können sich zudem bei der zuständigen Aufsichtsbehörde beschweren:`,
        `Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB), Bern.`,
      ],
    },
    {
      heading: "Datensicherheit",
      body: [
        //
        `Diese Website verwendet eine verschlüsselte Verbindung (HTTPS), um Ihre Daten zu schützen.`,
      ],
    },
    {
      heading: "Änderungen",
      body: [
        //
        `Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen.`,
      ],
    },

    /*
    //
    {
      heading: "§ 2 Erhobene Daten & Zwecke der Verarbeitung",
      body: ["Wir erheben und verarbeiten auf dieser Website bewusst so wenige personenbezogene Daten wie möglich. Im Einzelnen gilt:"],
      subsections: [
        {
          subheading: "Präferenz-Daten (funktional)",
          body: ["Wenn Sie Einstellungen wie Sprache, Währung oder Maßeinheit vornehmen, werden diese Präferenzen lokal in Ihrem Browser gespeichert (als Cookies). Diese Daten werden ausschließlich dazu verwendet, Ihnen bei einem erneuten Besuch dieselben Einstellungen zu präsentieren. Sie werden nicht an unsere Server übertragen und nicht mit anderen Daten verknüpft."],
        },
        {
          subheading: "Anonymisierte Nutzungsstatistiken",
          body: ["Wir verwenden das selbst-gehostete Analysetool Umami, das keinerlei personenbezogene Daten erhebt und kein Tracking über Websites hinweg durchführt. Details hierzu finden Sie in § 4."],
        },
        {
          subheading: "Technische Verbindungsdaten",
          body: ["Beim Abrufen unserer Website übermittelt Ihr Browser technisch bedingt bestimmte Daten an unseren Server (sog. Server-Logs). Details hierzu finden Sie in § 6."],
        },
      ],
    },
    {
      heading: "§ 3 Cookies & lokale Speicherung",
      body: ["Wir verwenden ausschließlich funktionale Cookies, die für den Betrieb der Website notwendig sind. Es werden keinerlei Marketing-, Tracking- oder Werbe-Cookies eingesetzt."],
      infoBox: "Kein Cookie-Banner notwendig: Da wir ausschließlich technisch notwendige Cookies verwenden und kein Tracking oder keine Werbung betreiben, ist eine Einwilligungsabfrage (Cookie-Popup) nach Art. 6 Abs. 1 lit. f DSGVO i.V.m. § 25 Abs. 2 TTDSG nicht erforderlich.",
      cookieTable: [
        {name: "Sprache", purpose: "Speichert die bevorzugte Anzeigesprache (de, en, es, fr)"},
        {name: "Währung", purpose: "Speichert die bevorzugte Währungsanzeige (EUR, CHF, etc.)"},
        {name: "Maßeinheit", purpose: "Speichert die bevorzugte Maßeinheit (cm oder Inch)"},
      ],
      bodyAfterList: ["Sie können das Setzen von Cookies in Ihrem Browser jederzeit deaktivieren oder bereits gesetzte Cookies löschen. Bitte beachten Sie, dass in diesem Fall Ihre Präferenzen bei jedem Besuch erneut eingestellt werden müssen. Die Kernfunktionalität der Website bleibt davon unberührt.", "Rechtsgrundlage: Die Speicherung dieser Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der benutzerfreundlichen Darstellung der Website) sowie § 25 Abs. 2 Nr. 2 TTDSG."],
    },
    {
      heading: "§ 4 Webanalyse mit Umami",
      body: ["Diese Website nutzt Umami, ein datenschutzfreundliches Open-Source-Webanalysetool. Umami ist auf unseren eigenen Servern selbst gehostet und gibt keine Daten an Dritte weiter."],
      subsections: [
        {
          subheading: "Was Umami erhebt",
          body: ["Umami erfasst ausschließlich anonymisierte Statistiken wie aufgerufene Seiten, Herkunftsland (auf Basis der IP-Adresse, die jedoch nicht gespeichert wird), Browsertyp und Betriebssystem. Es werden keine Cookies für Analysezwecke gesetzt, keine IP-Adressen gespeichert, und es findet kein geräte- oder sitzungsübergreifendes Tracking statt."],
        },
        {
          subheading: "Was Umami nicht erhebt",
          list: ["Keine IP-Adressen (weder vollständig noch anonymisiert gespeichert)", "Keine Cookies für Trackingzwecke", "Keine geräteübergreifenden Nutzerprofile", "Keine persönlich identifizierbaren Informationen"],
        },
        {
          subheading: "Rechtsgrundlage",
          body: ["Da Umami keine personenbezogenen Daten verarbeitet, ist eine gesonderte Rechtsgrundlage nach DSGVO nicht erforderlich. Weitere Informationen finden Sie unter umami.is/privacy."],
        },
      ],
    },
    {
      heading: "§ 5 Google Fonts",
      body: ["Diese Website verwendet Google Fonts, einen Dienst der Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, bzw. Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland."],
      infoBox: "Wir nutzen ausschließlich Google Fonts für die Darstellung von Schriftarten. Sonstige Google-Dienste (wie Google Analytics, Google Ads, Google Maps, reCAPTCHA o.ä.) werden auf dieser Website nicht eingesetzt.",
      subsections: [
        {
          subheading: "Was dabei passiert",
          body: ["Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriftarten direkt von den Servern von Google. Dabei überträgt Ihr Browser automatisch technische Daten an Google, insbesondere Ihre IP-Adresse, den aufgerufenen Seitenaufruf (Referrer) sowie Browsertyp und -version."],
        },
        {
          subheading: "Datenübertragung in Drittländer",
          body: ["Da Google seinen Hauptsitz in den USA hat, kann eine Übertragung Ihrer Daten in die USA erfolgen. Google ist nach dem EU-US Data Privacy Framework zertifiziert, sodass ein angemessenes Datenschutzniveau gewährleistet ist (Art. 45 DSGVO)."],
        },
        {
          subheading: "Rechtsgrundlage",
          body: ["Die Einbindung von Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen und ansprechenden Darstellung unserer Website). Die Datenschutzerklärung von Google finden Sie unter: policies.google.com/privacy"],
        },
      ],
    },
    {
      heading: "§ 6 Hosting & Server-Logs",
      body: ["Unsere Website wird bei einem externen Hosting-Anbieter betrieben. Bei jedem Seitenaufruf werden automatisch technische Verbindungsdaten in sogenannten Server-Logfiles erfasst. Diese umfassen:"],
      list: ["IP-Adresse des anfragenden Geräts", "Datum und Uhrzeit des Zugriffs", "Aufgerufene URL", "HTTP-Statuscode und übertragene Datenmenge", "Referrer-URL (zuvor besuchte Seite)", "Browser-Typ und -Version, Betriebssystem"],
      bodyAfterList: ["Diese Daten sind technisch notwendig, um die Website korrekt auszuliefern, die Systemsicherheit zu gewährleisten und Fehler zu diagnostizieren. Sie werden nicht mit anderen Datenquellen zusammengeführt und nach spätestens 7 Tagen automatisch gelöscht.", "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und fehlerfreien Bereitstellung der Website). Mit unserem Hosting-Anbieter besteht ein Vertrag zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO."],
    },
    {
      heading: "§ 7 Weitergabe an Dritte",
      body: ["Eine Übermittlung Ihrer personenbezogenen Daten an Dritte findet grundsätzlich nicht statt, außer:"],
      list: ["Technisch bedingt: an Google im Rahmen von Google Fonts (siehe § 5)", "Rechtlich verpflichtend: wenn wir gesetzlich zur Herausgabe verpflichtet sind (z.B. auf behördliche Anordnung)", "Zur Rechtsverfolgung: wenn dies zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist"],
      bodyAfterList: ["Wir verkaufen Ihre Daten nicht und geben sie nicht zu Werbezwecken weiter."],
    },
    {
      heading: "§ 8 Ihre Rechte",
      body: ["Als betroffene Person haben Sie nach der DSGVO folgende Rechte gegenüber uns:"],
      subsections: [
        {
          subheading: "Auskunft (Art. 15 DSGVO)",
          body: ["Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob und welche personenbezogenen Daten wir über Sie verarbeiten, sowie eine Kopie dieser Daten zu erhalten."],
        },
        {
          subheading: "Berichtigung (Art. 16 DSGVO)",
          body: ["Sie haben das Recht, die unverzügliche Berichtigung unrichtiger oder die Vervollständigung unvollständiger personenbezogener Daten zu verlangen."],
        },
        {
          subheading: "Löschung (Art. 17 DSGVO)",
          body: ["Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen, sofern die gesetzlichen Voraussetzungen hierfür vorliegen."],
        },
        {
          subheading: "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
          body: ["Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen."],
        },
        {
          subheading: "Datenübertragbarkeit (Art. 20 DSGVO)",
          body: ["Sie haben das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten."],
        },
        {
          subheading: "Widerspruch (Art. 21 DSGVO)",
          body: ["Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen."],
        },
        {
          subheading: "Beschwerde bei der Aufsichtsbehörde (Art. 77 DSGVO)",
          body: [`Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die für uns zuständige Aufsichtsbehörde ist: ${controller.supervisoryAuthority}.`, "Zur Wahrnehmung Ihrer Rechte wenden Sie sich bitte an die oben genannte verantwortliche Stelle."],
        },
      ],
    },
    {
      heading: "§ 9 Datensicherheit",
      body: ["Wir treffen nach Art. 32 DSGVO unter Berücksichtigung des Stands der Technik geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.", "Die Übertragung von Daten zwischen Ihrem Browser und unserer Website erfolgt verschlüsselt über das HTTPS-Protokoll (TLS). Dadurch wird verhindert, dass Ihre Daten während der Übertragung von Dritten eingesehen oder manipuliert werden können."],
    },
    {
      heading: "§ 10 Änderungen dieser Erklärung",
      body: ["Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie stets den aktuellen rechtlichen Anforderungen oder Änderungen unserer Website und unserer Datenverarbeitung anzupassen. Beim nächsten Besuch gilt dann die jeweils neue Datenschutzerklärung. Das Datum der letzten Aktualisierung ist im Seitenkopf angegeben."],
    },
    */
  ],
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPrivacyPolicy_CH_EN = (controller: PrivacyPolicyController): PrivacyPolicyContent => ({
  title: "Privacy Policy",
  lastUpdated: "Last updated: March 2026",
  sections: [
    {
      heading: "Controller",
      body: [
        //
        `${controller.name}<br/>${controller.street}<br/>${controller.zip} ${controller.city}<br/>${controller.country.en}<br/><a href="${controller.email}">${controller.email}</a>${controller.phone ? `<br/>${controller.phone}` : ""}`,
        "This Privacy Policy is governed by the Swiss Federal Act on Data Protection (revDSG) and, where applicable, the EU General Data Protection Regulation (GDPR).",
      ],
    },
    {
      heading: "Data Processing",
      body: [
        //
        `We only process personal data that is technically necessary to provide and ensure the proper functioning of this website.`,
        `When you access the website, certain technical data (e.g. IP address, date and time of access, browser information) is automatically collected in server log files. This data is used solely to ensure the security and stability of the website and is deleted after a short period."`,
      ],
    },
    {
      heading: "Cookies and Local Storage",
      body: [
        //
        `We only use technically necessary cookies or similar storage mechanisms (e.g. for language or display settings).`,
        `No tracking or marketing cookies are used.`,
      ],
    },
    {
      heading: "Web Analytics",
      body: [
        //
        `This website uses a privacy-friendly, self-hosted analytics tool (Umami).`,
        `No personal data is analyzed, no user profiles are created, and no cross-site tracking is performed.`,
      ],
    },
    {
      heading: "Google Fonts",
      body: [
        //
        `This website uses Google Fonts to ensure a consistent display of fonts.`,
        `When accessing the site, your IP address may be transmitted to Google for technical reasons.`,
      ],
    },
    {
      heading: "Data Sharing",
      body: [
        //
        `Your data is only disclosed if this is technically necessary, legally required, or necessary for the establishment, exercise, or defense of legal claims.`,
      ],
    },
    {
      heading: "Your Rights",
      body: [
        //
        `You have the right to access, rectify, erase, and restrict the processing of your personal data, as well as the right to object. You also have the right to lodge a complaint with a supervisory authority:`,
        `Federal Data Protection and Information Commissioner (FDPIC), Switzerland.`,
      ],
    },
    {
      heading: "Data Security",
      body: [
        //
        `This website uses encrypted transmission (HTTPS) to protect your data.`,
      ],
    },
    {
      heading: "Changes",
      body: [
        //
        `We reserve the right to update this Privacy Policy at any time.`,
      ],
    },
  ],
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPrivacyPolicy_CH_ES = (controller: PrivacyPolicyController): PrivacyPolicyContent => ({
  title: "Política de Privacidad",
  lastUpdated: "Última actualización: marzo de 2026",
  sections: [
    {
      heading: "Responsable del tratamiento",
      body: [
        //
        `${controller.name}<br/>${controller.street}<br/>${controller.zip} ${controller.city}<br/>${controller.country.es}<br/><a href="${controller.email}">${controller.email}</a>${controller.phone ? `<br/>${controller.phone}` : ""}`,
        "La presente política de privacidad se rige por la Ley Federal de Protección de Datos de Suiza (revDSG) y, en su caso, por el Reglamento General de Protección de Datos (RGPD) de la Unión Europea.",
      ],
    },
    {
      heading: "Tratamiento de datos",
      body: [
        //
        `Tratamos únicamente los datos personales que son técnicamente necesarios para el funcionamiento correcto de este sitio web. Al acceder al sitio, se recogen automáticamente determinados datos técnicos (por ejemplo, dirección IP, fecha y hora de acceso, información del navegador) en archivos de registro del servidor. Estos datos se utilizan exclusivamente para garantizar la seguridad y estabilidad del sitio web y se eliminan tras un breve periodo.`,
      ],
    },
    {
      heading: "Cookies y almacenamiento local",
      body: [
        //
        `Utilizamos exclusivamente cookies técnicas o mecanismos de almacenamiento necesarios (por ejemplo, para idioma o visualización).`,
        `No se utilizan cookies de seguimiento ni de marketing.`,
      ],
    },
    {
      heading: "Análisis web",
      body: [
        //
        `Este sitio web utiliza una herramienta de análisis autoalojada y respetuosa con la privacidad (Umami).`,
        `No se analizan datos personales, no se crean perfiles de usuario y no se realiza seguimiento entre sitios.`,
      ],
    },
    {
      heading: "Google Fonts",
      body: [
        //
        `Este sitio web utiliza Google Fonts para garantizar una presentación uniforme de las tipografías.`,
        `Al acceder al sitio, su dirección IP puede ser transmitida a Google por razones técnicas.`,
      ],
    },
    {
      heading: "Comunicación de datos",
      body: [
        //
        `Sus datos solo se comunicarán si es necesario por razones técnicas, por obligación legal o para la formulación, el ejercicio o la defensa de reclamaciones legales.`,
      ],
    },
    {
      heading: "Sus derechos",
      body: [
        //
        `Tiene derecho a acceder, rectificar, suprimir y limitar el tratamiento de sus datos personales, así como a oponerse al mismo. Asimismo, puede presentar una reclamación ante la autoridad competente: Delegado Federal de Protección de Datos e Información (FDPIC), Suiza.`,
      ],
    },
    {
      heading: "Seguridad de los datos",
      body: [
        //
        `Este sitio web utiliza una conexión cifrada (HTTPS) para proteger sus datos.`,
      ],
    },
    {
      heading: "Modificaciones",
      body: [
        //
        `Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento.`,
      ],
    },
  ],
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPrivacyPolicy_CH_FR = (controller: PrivacyPolicyController): PrivacyPolicyContent => ({
  title: "Politique de Confidentialité",
  lastUpdated: "Dernière mise à jour : mars 2026",
  sections: [
    {
      heading: "Responsable du traitement",
      body: [
        //
        `${controller.name}<br/>${controller.street}<br/>${controller.zip} ${controller.city}<br/>${controller.country.fr}<br/><a href="${controller.email}">${controller.email}</a>${controller.phone ? `<br/>${controller.phone}` : ""}`,
        "La présente politique de confidentialité est régie par la loi fédérale suisse sur la protection des données (revDSG) ainsi que, le cas échéant, par le Règlement général sur la protection des données (RGPD) de l’Union européenne.",
      ],
    },
    {
      heading: "Traitement des données",
      body: [
        //
        `Nous ne traitons que les données personnelles strictement nécessaires au bon fonctionnement de ce site web. Lors de l’accès au site, certaines données techniques (par ex. adresse IP, date et heure d’accès, informations sur le navigateur) sont automatiquement collectées dans des fichiers journaux du serveur. Ces données sont utilisées exclusivement pour garantir la sécurité et la stabilité du site et sont supprimées après une courte durée.`,
      ],
    },
    {
      heading: "Cookies et stockage local",
      body: [
        //
        `Nous utilisons uniquement des cookies techniques ou des mécanismes de stockage nécessaires (par ex. pour la langue ou l’affichage). Aucun cookie de suivi ou de marketing n’est utilisé.`,
      ],
    },
    {
      heading: "Analyse web",
      body: [
        //
        `Ce site utilise un outil d’analyse auto-hébergé et respectueux de la vie privée (Umami).`,
        `Aucune donnée personnelle n’est analysée, aucun profil utilisateur n’est créé et aucun suivi inter-sites n’est effectué.`,
      ],
    },
    {
      heading: "Google Fonts",
      body: [
        //
        `Ce site utilise Google Fonts afin d’assurer une présentation homogène des polices.`,
        `Lors de l’accès au site, votre adresse IP peut être transmise à Google pour des raisons techniques.`,
      ],
    },
    {
      heading: "Transmission des données",
      body: [
        //
        `Vos données ne sont transmises que si cela est techniquement nécessaire, requis par la loi ou nécessaire à la constatation, à l’exercice ou à la défense de droits en justice.`,
      ],
    },
    {
      heading: "Vos droits",
      body: [
        //
        `Vous disposez d’un droit d’accès, de rectification, d’effacement et de limitation du traitement de vos données, ainsi que d’un droit d’opposition. Vous pouvez également déposer une plainte auprès de l’autorité compétente :`,
        `Préposé fédéral à la protection des données et à la transparence (PFPDT), Suisse.`,
      ],
    },
    {
      heading: "Sécurité des données",
      body: [
        //
        `Ce site utilise une connexion sécurisée (HTTPS) afin de protéger vos données.`,
      ],
    },
    {
      heading: "Modifications",
      body: [
        //
        `Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment.`,
      ],
    },
  ],
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPrivacyPolicy_DE_DE = (controller: PrivacyPolicyController): PrivacyPolicyContent => ({
  title: "Datenschutzerklärung",
  lastUpdated: "Stand: April 2026",
  sections: [
    {
      heading: "Verantwortliche Stelle",
      body: [
        //
        `${controller.name}<br/>${controller.street}<br/>${controller.zip} ${controller.city}<br/>${controller.country.de}<br/><a href="${controller.email}">${controller.email}</a>${controller.phone ? `<br/>${controller.phone}` : ""}`,
        "Diese Datenschutzerklärung richtet sich nach der Datenschutz-Grundverordnung (DSGVO) sowie dem Bundesdatenschutzgesetz (BDSG). Der technische Betrieb dieser Website erfolgt über iazzu (Schweiz) im Rahmen einer Auftragsverarbeitung gemäss Art. 28 DSGVO.",
      ],
    },
    {
      heading: "Datenverarbeitung",
      body: [
        //
        `Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website erforderlich ist.`,
        `Es werden ausschliesslich technisch notwendige Cookies bzw. lokale Speichermechanismen verwendet (z. B. für Sprache oder Darstellung).`,
        `Es kommen keine Tracking- oder Marketing-Cookies zum Einsatz.`,
      ],
    },
    {
      heading: "Server-Logfiles",
      body: [
        //
        `Beim Besuch der Website werden automatisch technische Daten (z. B. IP-Adresse, Datum/Uhrzeit, Browserinformationen) erfasst.`,
        `Diese dienen ausschliesslich der Sicherheit und Stabilität der Website und werden nach kurzer Zeit gelöscht.`,
      ],
    },
    {
      heading: "Webanalyse",
      body: [
        //
        `Diese Website nutzt ein datenschutzfreundliches, selbst gehostetes Analyse-Tool (Umami).`,
        `- keine personenbezogenen Daten`,
        `- keine Nutzerprofile`,
        `- kein Tracking über Websites hinweg`,
        `Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).`,
      ],
    },
    {
      heading: "Google Fonts",
      body: [
        //
        `Zur einheitlichen Darstellung von Schriftarten werden Google Fonts verwendet. Dabei kann es technisch zur Übertragung Ihrer IP-Adresse an Google kommen (Art. 6 Abs. 1 lit. f DSGVO).`,
      ],
    },
    {
      heading: "Weitergabe von Daten",
      body: [
        //
        `Eine Weitergabe erfolgt nur, wenn dies technisch notwendig ist, gesetzlich vorgeschrieben ist oder zur Durchsetzung von Rechtsansprüchen erforderlich ist.`,
        `Ein Datentransfer in die Schweiz erfolgt auf Basis des Angemessenheitsbeschlusses der EU.`,
      ],
    },
    {
      heading: "Ihre Rechte",
      body: [
        //
        `Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Widerspruch und Datenübertragbarkeit gemäss DSGVO.`,
      ],
    },
    {
      heading: "Beschwerderecht",
      body: [
        //
        `Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere beim:`,
        `Bayerischen Landesamt für Datenschutzaufsicht (BayLDA), Ansbach, Deutschland`,
      ],
    },
    {
      heading: "Datensicherheit",
      body: [
        //
        `Diese Website verwendet eine verschlüsselte Verbindung (HTTPS).`,
      ],
    },
    {
      heading: "Änderungen",
      body: [
        //
        `Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen.`,
      ],
    },
  ],
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPrivacyPolicy_DE_EN = (controller: PrivacyPolicyController): PrivacyPolicyContent => ({
  title: "Privacy Policy",
  lastUpdated: "Last updated: April 2026",
  sections: [
    {
      heading: "Controller",
      body: [
        //
        `${controller.name}<br/>${controller.street}<br/>${controller.zip} ${controller.city}<br/>${controller.country.en}<br/><a href="${controller.email}">${controller.email}</a>${controller.phone ? `<br/>${controller.phone}` : ""}`,
        `This privacy policy is based on the General Data Protection Regulation (GDPR) and the German Federal Data Protection Act (BDSG). The technical operation of this website is carried out via iazzu (Switzerland) within the framework of data processing pursuant to Art. 28 GDPR.`,
      ],
    },
    {
      heading: "Data Processing",
      body: [
        //
        `We process personal data only to the extent necessary to provide a functional website. Only technically necessary cookies or local storage mechanisms are used (e.g. for language or display settings). No tracking or marketing cookies are used.`,
      ],
    },
    {
      heading: "Server Log Files",
      body: [
        //
        `When visiting this website, technical data (e.g. IP address, date/time, browser information) is automatically collected. This data is used exclusively for security and stability purposes and is deleted after a short period.`,
      ],
    },
    {
      heading: "Web Analytics",
      body: [
        //
        `This website uses a privacy-friendly, self-hosted analytics tool (Umami):`,
        `- no personal data is processed`,
        `- no user profiles are created`,
        `- no cross-site tracking`,
        `Processing is based on Art. 6(1)(f) GDPR (legitimate interest).`,
      ],
    },
    {
      heading: "Google Fonts",
      body: [
        //
        `Google Fonts are used for consistent font display. This may result in the transmission of your IP address to Google (Art. 6(1)(f) GDPR).`,
      ],
    },
    {
      heading: "Data Sharing",
      body: [
        //
        `Data is only shared if technically necessary, legally required, or necessary to enforce legal claims. Data transfers to Switzerland are based on the EU adequacy decision.`,
      ],
    },
    {
      heading: "Your Rights",
      body: [
        //
        `You have the right to access, rectification, erasure, restriction of processing, objection, and data portability under GDPR.`,
      ],
    },
    {
      heading: "Right to Lodge a Complaint",
      body: [
        //
        `You may lodge a complaint with a supervisory authority, in particular:`,
        `Bavarian Data Protection Authority (BayLDA), Ansbach, Germany`,
      ],
    },
    {
      heading: "Data Security",
      body: [
        //
        `This website uses an encrypted connection (HTTPS).`,
      ],
    },
    {
      heading: "Änderungen",
      body: [
        //
        `We reserve the right to update this privacy policy at any time.`,
      ],
    },
  ],
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPrivacyPolicy_DE_ES = (controller: PrivacyPolicyController): PrivacyPolicyContent => ({
  title: "Política de Privacidad",
  lastUpdated: "Última actualización: abril de 2026",
  sections: [
    {
      heading: "Responsable del tratamiento",
      body: [
        //
        `${controller.name}<br/>${controller.street}<br/>${controller.zip} ${controller.city}<br/>${controller.country.es}<br/><a href="${controller.email}">${controller.email}</a>${controller.phone ? `<br/>${controller.phone}` : ""}`,
        `Esta política de privacidad se basa en el Reglamento General de Protección de Datos (RGPD) y la legislación alemana aplicable (BDSG). El funcionamiento técnico de este sitio web se realiza a través de iazzu (Suiza) en el marco de un tratamiento por encargo conforme al art. 28 RGPD.`,
      ],
    },
    {
      heading: "Tratamiento de datos",
      body: [
        //
        `Solo tratamos datos personales en la medida necesaria para el funcionamiento del sitio web. Se utilizan exclusivamente cookies técnicas necesarias o mecanismos de almacenamiento local (por ejemplo, idioma o visualización). No se utilizan cookies de seguimiento ni de marketing.`,
      ],
    },
    {
      heading: "Archivos de registro del servidor",
      body: [
        //
        `Al acceder al sitio web se recopilan automáticamente datos técnicos (p. ej. dirección IP, fecha/hora, información del navegador). Estos datos se utilizan únicamente para garantizar la seguridad y estabilidad del sitio web y se eliminan tras un breve período.`,
      ],
    },
    {
      heading: "Análisis web",
      body: [
        //
        `Este sitio utiliza una herramienta de análisis respetuosa con la privacidad y autoalojada (Umami):`,
        `- no se procesan datos personales`,
        `- no se crean perfiles de usuario`,
        `- no hay seguimiento entre sitios web`,
        `El tratamiento se basa en el art. 6.1.f RGPD (interés legítimo).`,
      ],
    },
    {
      heading: "Google Fonts",
      body: [
        //
        `Para una presentación uniforme se utilizan Google Fonts, lo que puede implicar la transmisión de la dirección IP a Google (art. 6.1.f RGPD).`,
      ],
    },
    {
      heading: "Comunicación de datos",
      body: [
        //
        `Los datos solo se comparten si es técnicamente necesario, legalmente obligatorio o necesario para la defensa de derechos. Las transferencias a Suiza se basan en la decisión de adecuación de la UE.`,
      ],
    },
    {
      heading: "Sus derechos",
      body: [
        //
        `Tiene derecho a acceso, rectificación, supresión, limitación del tratamiento, oposición y portabilidad de los datos conforme al RGPD.`,
      ],
    },
    {
      heading: "Derecho a reclamación",
      body: [
        //
        `Puede presentar una reclamación ante una autoridad de control, en particular:`,
        `Autoridad de Protección de Datos de Baviera (BayLDA), Ansbach, Alemania`,
      ],
    },
    {
      heading: "Seguridad de los datos",
      body: [
        //
        `Este sitio utiliza una conexión cifrada (HTTPS).`,
      ],
    },
    {
      heading: "Modificaciones",
      body: [
        //
        `Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento.`,
      ],
    },
  ],
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPrivacyPolicy_DE_FR = (controller: PrivacyPolicyController): PrivacyPolicyContent => ({
  title: "Politique de Confidentialité",
  lastUpdated: "Dernière mise à jour : avril 2026",
  sections: [
    {
      heading: "Responsable du traitement",
      body: [
        //
        `${controller.name}<br/>${controller.street}<br/>${controller.zip} ${controller.city}<br/>${controller.country.fr}<br/><a href="${controller.email}">${controller.email}</a>${controller.phone ? `<br/>${controller.phone}` : ""}`,
        `Cette politique de confidentialité est basée sur le Règlement Général sur la Protection des Données (RGPD) ainsi que la législation allemande applicable (BDSG). Le fonctionnement technique de ce site est assuré via iazzu (Suisse) dans le cadre d’un traitement des données conformément à l’art. 28 RGPD.`,
      ],
    },
    {
      heading: "Traitement des données",
      body: [
        //
        `Nous traitons les données personnelles uniquement dans la mesure nécessaire au fonctionnement du site. Seuls des cookies techniques nécessaires ou des mécanismes de stockage local sont utilisés (par exemple pour la langue ou l’affichage). Aucun cookie de suivi ou de marketing n’est utilisé.`,
      ],
    },
    {
      heading: "Fichiers journaux du serveur",
      body: [
        //
        `Lors de la visite du site, des données techniques (adresse IP, date/heure, informations du navigateur) sont automatiquement collectées. Ces données servent uniquement à garantir la sécurité et la stabilité du site et sont supprimées après une courte durée.`,
      ],
    },
    {
      heading: "Analyse web",
      body: [
        //
        `Ce site utilise un outil d’analyse respectueux de la vie privée et auto-hébergé (Umami) :`,
        `- aucune donnée personnelle n’est traitée`,
        `- aucun profil utilisateur n’est créé`,
        `- aucun suivi entre sites web`,
        `Le traitement est basé sur l’art. 6(1)(f) RGPD (intérêt légitime).`,
      ],
    },
    {
      heading: "Google Fonts",
      body: [
        //
        `Google Fonts est utilisé pour une présentation uniforme, ce qui peut entraîner la transmission de votre adresse IP à Google (art. 6(1)(f) RGPD).`,
      ],
    },
    {
      heading: "Transmission des données",
      body: [
        //
        `Les données ne sont transmises que si cela est techniquement nécessaire, légalement requis ou nécessaire à la défense de droits. Les transferts vers la Suisse reposent sur une décision d’adéquation de l’UE.`,
      ],
    },
    {
      heading: "Vos droits",
      body: [
        //
        `Vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité des données conformément au RGPD.`,
      ],
    },
    {
      heading: "Droit de réclamation",
      body: [
        //
        `Vous pouvez déposer une plainte auprès d’une autorité de contrôle, notamment :`,
        `Autorité bavaroise de protection des données (BayLDA) Ansbach, Allemagne`,
      ],
    },
    {
      heading: "Sécurité des données",
      body: [
        //
        `Ce site utilise une connexion sécurisée (HTTPS).`,
      ],
    },
    {
      heading: "Modifications",
      body: [
        //
        `Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.`,
      ],
    },
  ],
})
