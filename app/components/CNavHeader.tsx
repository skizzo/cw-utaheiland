import {useCallback, useEffect, useRef, useState} from "react"
import {Link, useLocation} from "react-router"

import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import SettingsIcon from "@mui/icons-material/Settings"
import {AppBar, Box, ButtonBase, IconButton, Toolbar, Typography, useTheme} from "@mui/material"

import {Config} from "~/lib/config"
import {useUserSettingsModal} from "~/lib/contexts"
import {useRootLoaderData} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import type {TAppLang} from "~/lib/types"
import {brd} from "~/lib/utils"

const NAV_LINKS = [
  //
  {labelId: "artworks", to: "/artworks"},
  {labelId: "artist", to: "/artist"},
  ...(Config.app.showEvents ? [{labelId: "events", to: "/events"} as const] : []),
  ...(Config.app.showEvents && Config.app.events.showSubEvents ? [{labelId: "courses", to: Config.app.events.subEventsRouteName} as const] : []),
  {labelId: "contact", to: "/contact"},
] as const

const DEBUG = false && __DEV__
const log = createLog("CNavHeader", DEBUG)

type Props = {
  locale: TAppLang
  title: string | undefined
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function CNavHeader(props: Props) {
  const {title} = props

  const {navLabels} = useRootLoaderData() || {}

  const theme = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  const location = useLocation()
  const {pathname} = location

  const {openUserSettingsModal} = useUserSettingsModal()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll hide/show logic
  useEffect(() => {
    function onScroll() {
      const current = window.scrollY
      if (current < 60) {
        setVisible(true)
      } else if (current < lastScrollY.current) {
        setVisible(true)
      } else {
        setVisible(false)
        setMenuOpen(false)
      }
      lastScrollY.current = current
    }
    window.addEventListener("scroll", onScroll, {passive: true})
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const onMobileSettingsClick = useCallback(() => {
    setMenuOpen(false)
    openUserSettingsModal()
  }, [openUserSettingsModal])

  log.log("render()", {pathname, NAV_LINKS})

  const logoUrl = Config.app.header.useLogo && !!Config.app.header.logoUrl ? Config.app.header.logoUrl : undefined

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        // height: theme.spacing(Config.theme.headerHeight),
        bgcolor: Config.theme.menu.bg,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        // ...brd(DEBUG, "yellow"),
        opacity: DEBUG ? 0.7 : 1,
        borderBottom: "1px solid #BBB",
      }}>
      {/* Desktop & Mobile top bar */}
      <Toolbar
        disableGutters
        sx={{
          maxWidth: Config.theme.contentMaxWidth,
          width: "100%",
          mx: "auto",
          pl: Config.theme.contentPx,
          pr: Config.theme.contentPx / 2,
          justifyContent: "space-between",
          height: theme.spacing(Config.theme.headerHeight),
        }}>
        {/* Logo / Title */}
        <Box
          //
          component={Link}
          to="/"
          prefetch="intent"
          viewTransition={Config.app.useViewTransition}
          sx={{px: 0, height: "100%", py: 1.5, boxSizing: "border-box", display: "flex", alignItems: "center", textDecoration: "none", ...brd(DEBUG, "red")}}
          onClick={() => setMenuOpen(false)}>
          {!logoUrl && (
            <Typography variant="h3" sx={{color: Config.theme.menu.fg, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase"}}>
              {title}
            </Typography>
          )}
          {logoUrl && <img src={logoUrl} alt={title || "Logo"} style={{height: "100%", width: "auto", paddingTop: Config.app.header.paddings.top, paddingBottom: Config.app.header.paddings.bottom, maxWidth: "100%", objectFit: "contain"}} />}
        </Box>

        {/* Desktop links — hidden on mobile via CSS */}
        <Box sx={{display: {xs: "none", md: "flex"}, gap: 1}}>
          {true &&
            NAV_LINKS.map(link => {
              const isActive = pathname === link.to || (link.to === "/artworks" && pathname.includes("/artworks")) || (link.to === "/events" && pathname.includes("/events"))
              return (
                <Box
                  key={link.to}
                  component={Link}
                  to={link.to}
                  viewTransition={Config.app.useViewTransition}
                  prefetch="intent"
                  sx={{
                    color: isActive ? Config.theme.menu.fg : Config.theme.menu.fgInactive,
                    textDecoration: "none",
                    px: Config.theme.contentPx / 2,
                    height: theme.spacing(6),
                    borderRadius: 1,
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 500,
                    lineHeight: 1.6,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    bgcolor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                    transition: "color 0.2s, background 0.2s",
                    "&:hover": {
                      color: Config.theme.menu.fg,
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                    ...brd(DEBUG, "red"),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  {navLabels[link.labelId]}
                </Box>
              )
            })}
          <ButtonBase
            centerRipple
            TouchRippleProps={{style: {color: "rgba(255,255,255,0.3)", opacity: 1}}}
            sx={{
              px: Config.theme.contentPx / 2,
              height: theme.spacing(6),
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...brd(DEBUG, "red"),
            }}
            onClick={openUserSettingsModal}>
            <SettingsIcon sx={{color: Config.theme.menu.fgInactive, fontSize: 16, ...brd(DEBUG, "blue")}} />
          </ButtonBase>
        </Box>

        {/* Mobile hamburger — hidden on desktop via CSS */}
        <IconButton onClick={() => setMenuOpen(prev => !prev)} sx={{color: Config.theme.menu.fg, display: {xs: "flex", md: "none"}}} aria-label={"Toggle menu"}>
          {!mounted || !menuOpen ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </Toolbar>

      {/* Mobile dropdown menu — hidden on desktop via CSS */}
      <Box
        sx={{
          bgcolor: Config.theme.menu.bg,
          display: {xs: "flex", md: "none"},
          flexDirection: "column",
          maxHeight: menuOpen ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.25s ease",
        }}>
        {NAV_LINKS.map(link => (
          <Box
            //
            key={link.to}
            component={Link}
            to={link.to}
            onClick={() => setMenuOpen(false)}
            sx={{height: theme.spacing(6), ...NavLinksMobileSx}}>
            {navLabels[link.labelId]}
          </Box>
        ))}
        <Box
          //
          onClick={onMobileSettingsClick}
          sx={{height: theme.spacing(6), ...NavLinksMobileSx, mb: 2}}>
          {navLabels.settings}
        </Box>
      </Box>
    </AppBar>
  )
}

const NavLinksMobileSx = {
  // color: "rgba(255,255,255,0.85)",
  color: Config.theme.menu.fg,
  textDecoration: "none",
  py: 1.25,
  px: Config.theme.contentPx,
  cursor: "pointer",
  textAlign: "left",
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: 0.5,
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  transition: "color 0.2s",
  "&:last-child": {borderBottom: "none"},
  "&:hover": {color: Config.theme.menu.fgInactive},
} as const
