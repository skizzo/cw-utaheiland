import {alpha, createTheme, darken, lighten, responsiveFontSizes} from "@mui/material/styles"

import {brd} from "./lib/utils/debug.utils"

const DEBUG = false && __DEV__

const htmlFontSize = 14 as const // default: 16

/** Default to 2. This value determines the strength of font size resizing.
 *  The higher the value, the less difference there is between font sizes on small screens.
 *  The lower the value, the bigger font sizes for small screens.
 *  The value must be greater than 1. */
const responsiveFontSizesFactor = 2 as const // default: 2

/** Media Query Breakpoints:
 *  - xs:    0 px
 *  - sm:  600 px
 *  - md:  900 px
 *  - lg: 1200 px
 *  - xl: 1536 px
 *   */

const colors = {
  menuBg: "#246c90",
  menuBgBright: "#f5f5f5",
  ciGray: "#272c33",
  ciGrayFooter: darken("#272c33", 0.3),
  bg: "#f5f5f5",
} as const

const font = {
  // family: "Google Sans Flex, sans-serif",
  // href: "https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap",
  family: "Lato, sans-serif",
  href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const themeProps = {
  /** maximum width of used viewport */
  contentMaxWidth: 1200,

  /** height of CNavHeader */
  headerHeight: 14, // was 9

  /** padding of content that is defined by either `100%` or {@link themeProps.contentMaxWidth `contentMaxWidth`}  */
  contentPx: 4,

  /** vertical spacing between sections */
  sectionSpacing: 8,

  /** vertical spacing on bottom of page, handled for each page individually */
  preFooterSpacing: 16,

  colors,
  font,
  menu: {
    // bg: colors.menuBg,
    bg: colors.menuBgBright,
    // fg: "#FFFFFF",
    fg: "#333",
    fgInactive: "#666",
  },

  /** if `true`, show full-page-width hero in Home and Artist */
  heroFullWidth: true,

  /** if `true`, align all the content (including headers) along the site center */
  alignContentCenter: true,

  /** if `true`, shows Artist's Youtube Video in the Hero */
  showArtistVideoInHero: false,
} as const

const textDefaultProps = {
  sx: {
    fontWeight: 600,
    letterSpacing: "0.04em",
  },
} as const

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// spacing & palette
let theme = createTheme({
  //
  spacing: 6, // default: 8, so px={2} resolves to 12
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  typography: palette => ({
    htmlFontSize,
    fontSize: 14, // default: 14
    fontFamily: font.family,

    // applies to all typography variants
    allVariants: {
      // letterSpacing: "0.03rem",
      // fontWeight: 400,
    },
    h1: {
      fontSize: "2.6rem", // default: 6rem
      fontWeight: 800,
      textTransform: "uppercase",
      ...brd(DEBUG, "red", 3),
    },
    h2: {
      fontSize: "2.1rem", // default: 3.75rem
      fontWeight: 700,
      textTransform: "uppercase",
      ...brd(DEBUG, "green", 3),
    },
    h3: {
      fontSize: "1.6rem", // default: 3rem
      fontWeight: 700,
      ...brd(DEBUG, "blue", 3),
    },
    h4: {
      fontSize: "1.25rem", // default: 2.125rem
      fontWeight: 400,
      ...brd(DEBUG, "pink", 3),
    },
    body1: {
      fontSize: "1.1rem", // default: 2.125rem
      fontWeight: 400,
      letterSpacing: textDefaultProps.sx.letterSpacing,
    },
    body2: {
      fontWeight: 500,
      letterSpacing: textDefaultProps.sx.letterSpacing,
    },
    subtitle1: {
      ...textDefaultProps.sx,
      fontWeight: 400,
      ...brd(DEBUG, "red"),
      lineHeight: 1.5,
    },
    imageSubtitle: {
      display: "block",
      fontSize: "1.0rem",
      fontWeight: 400,
      lineHeight: 1.4,
      ...brd(DEBUG, "red"),
      padding: "3px 0px",
      margin: 0,
    },
    artworkDetailsArtist: {
      display: "block",
      fontSize: "1.3rem",
      lineHeight: 1.3,
      fontWeight: 400,
      ...brd(DEBUG, "green"),
      paddingBottom: 5,
    },
    artworkDetailsTitle: {
      display: "block",
      fontSize: "1.8rem",
      lineHeight: 1.3,
      fontWeight: 700,
      ...brd(DEBUG, "green"),
    },
    artworkDetailsPropKey: {
      display: "block",
      fontSize: "0.9rem",
      lineHeight: 1.3,
      fontWeight: 400,
      ...brd(DEBUG, "green"),
      paddingBottom: 3,
      color: palette.ciGray.light,
    },
    artworkDetailsPropValue: {
      display: "block",
      fontSize: "1.1rem",
      lineHeight: 1.4,
      fontWeight: 400,
      ...brd(DEBUG, "green"),
    },
    lightboxArtistTitle: {
      fontSize: "1.2rem",
      lineHeight: 1.3,
      fontWeight: 400,
      ...brd(DEBUG, "blue"),
      color: "white",
      filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.4))",
      padding: 6,
      backgroundColor: darken(themeProps.colors.ciGray, 0.5),
      letterSpacing: textDefaultProps.sx.letterSpacing,
    },
    lightboxArtworkTitle: {
      fontSize: "1.7rem",
      lineHeight: 1.3,
      fontWeight: 700,
      ...brd(DEBUG, "blue"),
      letterSpacing: textDefaultProps.sx.letterSpacing,
      color: "white",
      filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.4))",
      padding: 6,
      backgroundColor: darken(themeProps.colors.ciGray, 0.5),
    },
    lightboxQrHeader: {
      color: "white",
      display: "block",
      fontSize: "0.8rem",
      lineHeight: 1.2,
      paddingTop: 5,
      paddingBottom: 4,
      fontWeight: 400,
      textTransform: "uppercase",
      backgroundColor: darken(themeProps.colors.ciGray, 0.5),
    },
    caption: {
      fontWeight: 600,
    },
  }),
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  palette: {
    mode: "light",
    background: {
      default: themeProps.colors.bg,
    },
    primary: {
      // main: "#246c90",
      main: "#444",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    text: {
      primary: themeProps.colors.ciGray, // default text color
      // secondary: Config.styles.themeProps.colors.ciGray.halfWhite, // for muted/subtext
      // disabled: Config.styles.themeProps.colors.ciGray.almostWhite, // for disabled inputs/buttons
    },
    /*
    ciGray: {
      main: Config.styles.themeProps.colors.ciGray.main,
    },
    */
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
    // dialogBg: {
    //   // main: "#555",
    //   main: "#000",
    //   contrastText: "#FFF",
    // },
    error: {
      main: "#B15441",
    },
    ciGray: {
      main: themeProps.colors.ciGray,
      light: lighten(themeProps.colors.ciGray, 0.4),
    },
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  components: {
    MuiCssBaseline: {
      styleOverrides: theme => ({
        a: {
          // color: "#246c90",
          color: colors.ciGray,
          fontWeight: 600,
          textDecoration: "underline",
          textDecorationColor: "rgba(36, 108, 144, 0.4)",
          textUnderlineOffset: "3px",
          transition: "text-decoration-color .15s ease",
          "&:hover": {
            textDecorationColor: "rgba(36, 108, 144, 0.8)",
          },
        },
        p: {
          fontSize: "inherit",
          paddingBottom: theme.spacing(2),
          margin: 0,
          lineHeight: 1.6,
          "&:last-child": {
            paddingBottom: 0,
          },
        },
      }),
    },
    MuiTypography: {
      defaultProps: {
        // ...textDefaultProps, // NEVER set this!
      },
      styleOverrides: {
        root: ({theme}) => ({
          // wordBreak: "break-word",
          // hyphens: "auto",
          letterSpacing: textDefaultProps.sx.letterSpacing,
          // "&.MuiTypography-imageSubtitle": {
          //   color: theme.palette.primary.main,
          // },
          // default link styles, e.g. when using `dangerouslySetInnerHTML` in e.g. <CLoadingIndicatorCard />
          "& a": {
            color: theme.palette.primary.main,
            // color: colors.ciGray,
            fontWeight: 600,
            textDecoration: "underline",
            textDecorationColor: alpha(theme.palette.primary.main, 0.4),
            textUnderlineOffset: "2px",
            transition: "text-decoration-color .15s ease",
          },
          // "&.MuiTypography-lightboxArtworkTitle": {
          //   padding: 0,
          //   transition: "opacity 0.2s ease",
          //   "&:hover": {
          //     opacity: 0.8,
          //   },
          // },
          // "&.MuiTypography-lightboxArtistTitle": {
          //   transition: "opacity 0.2s ease",
          //   "&:hover": {
          //     opacity: 0.8,
          //   },
          // },
        }),
        h1: ({theme}) => ({
          // color: theme.palette.reset.main, // ✅ palette-aware
          padding: 0,
          // paddingTop: theme.spacing(3),
          // paddingBottom: theme.spacing(4),
          textTransform: "uppercase",
          letterSpacing: "0.1rem",
        }),
        h2: ({theme}) => ({
          // color: theme.palette.reset.main, // ✅ palette-aware
          // paddingTop: theme.spacing(2),
          // textTransform: "uppercase",
          letterSpacing: "0.07rem",
        }),
        h3: ({theme}) => ({
          // color: theme.palette.reset.main, // ✅ palette-aware
          // paddingTop: theme.spacing(2),
          letterSpacing: "0.05rem",
        }),
        h4: ({theme}) => ({
          // color: theme.palette.reset.main, // ✅ palette-aware
          // paddingTop: theme.spacing(2),
          // ...brd(DEBUG, "red"),
        }),
        subtitle1: () => ({
          padding: 0,
          margin: 0,
        }),
        body1: ({theme}) => ({
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.8rem",
          },
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        sx: theme => ({
          letterSpacing: "0.07rem",
          pointerEvents: "auto",
          // color: theme.palette.reset.main,
          // opacity: 0.5,
        }),
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          outline: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          outline: "none",
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          "&:hover .MuiCardActionArea-focusHighlight": {
            opacity: 0.02,
          },
          // "& .MuiTouchRipple-ripple .MuiTouchRipple-child": {
          //   opacity: 0.1,
          // },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        TouchRippleProps: {
          style: {
            color: "rgba(0,0,0,0.3)",
            opacity: 1,
          },
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme, {
  factor: responsiveFontSizesFactor,
})

export {theme, themeProps}
