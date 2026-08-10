import {useTranslation} from "react-i18next"
import {Link} from "react-router"

import {Box, type SxProps, Typography} from "@mui/material"

import ImgButtonAndroid from "~/lib/assets/ButtonAndroid.png"
import ImgButtonIos from "~/lib/assets/ButtonIos.png"
import {Config} from "~/lib/config"
import type {TGraphQl} from "~/lib/types"
import {brd, getFullYear} from "~/lib/utils"

import {CGalleryContactLinkButton} from "./buttons/CGalleryContactLinkButton"

const DEBUG = false && __DEV__

// const BG = "#1a1a1a"
const LINKS = [
  {labelId: "pages.legalNotice", to: "/legal-notice"},
  {labelId: "pages.privacyPolicy", to: "/privacy-policy"},
] as const

type Props = {
  links: TGraphQl.Link[]
  rootUrl: string | undefined
  copyright: string | undefined
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function CNavFooter(props: Props) {
  const {links, rootUrl, copyright} = props
  const {t} = useTranslation()

  return (
    <Box component="footer" sx={{bgcolor: Config.theme.colors.ciGrayFooter, mt: "auto"}}>
      <Box
        sx={{
          maxWidth: Config.theme.contentMaxWidth,
          width: "100%",
          mx: "auto",
          px: {xs: 2, md: 0},
          py: 4,
        }}>
        {/* */}

        {/* App Store Buttons, Nav Links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            px: Config.theme.contentPx,
            flexDirection: {xs: "column", md: !Config.theme.alignContentCenter ? "row" : "column"},
          }}>
          {/* App store buttons */}
          <Box sx={{display: "flex", gap: 2, justifyContent: "center", alignItems: "center", flexDirection: {xs: "column", sm: "row"}}}>
            <Box component="a" href={Config.app.appStoreLinks.ios} target="_blank" rel="noopener noreferrer" sx={{...sxAppStoreButton, ...brd(DEBUG, "blue")}}>
              <Box component={"img"} src={ImgButtonIos} sx={{height: {xs: 40, sm: 50}}} />
            </Box>

            <Box component="a" href={Config.app.appStoreLinks.android} target="_blank" rel="noopener noreferrer" sx={{...sxAppStoreButton, ...brd(DEBUG, "blue")}}>
              <Box component={"img"} src={ImgButtonAndroid} sx={{height: {xs: 40, sm: 50}}} />
            </Box>
          </Box>

          {/* Social Icons */}
          {!!links.length && (
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center"}}>
              {links.map((link, i) => (
                <CGalleryContactLinkButton
                  //
                  rootUrl={rootUrl}
                  key={`link$_${i}`}
                  data={link}
                  iconOnly
                />
              ))}
            </Box>
          )}

          {/* Nav links */}
          <Box sx={{display: "flex", gap: {xs: 1, sm: 3}, py: 1, flexDirection: {xs: "column", sm: !Config.theme.alignContentCenter ? "row" : "column"}, ...brd(DEBUG, "red")}}>
            {LINKS.map(link => (
              <Box
                key={link.to}
                component={Link}
                to={link.to}
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 400,
                  letterSpacing: 0.9,
                  breakAfter: "word",
                  transition: "color 0.2s",
                  textAlign: "center",
                  "&:hover": {color: "white"},
                }}>
                {t(link.labelId)}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Divider */}
        <Box sx={{height: "1px", bgcolor: "rgba(255,255,255,0.1)", my: 2}} />

        {/* Copyright */}
        <Typography
          variant="body2"
          // onClick={() => {
          //   // @ts-expect-error Sentry testing
          //   myUndefinedFunction5()
          // }}
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            // fontSize: 13,
            fontWeight: 400,
            letterSpacing: 0.5,
            textAlign: "center",
          }}>
          Copyright {getFullYear()} {copyright}
        </Typography>
      </Box>
    </Box>
  )
}

const sxAppStoreButton: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  // px: 2,
  // py: 1,
  // border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: 1,
  color: "white",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 500,
  transition: "border-color 0.2s, background 0.2s",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.7)",
    bgcolor: "rgba(255,255,255,0.05)",
  },
}
