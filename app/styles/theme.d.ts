import "@mui/material/styles"

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    lightboxArtworkTitle: true
    lightboxArtistTitle: true
    imageSubtitle: true
    artworkDetailsArtist: true
    artworkDetailsTitle: true
    artworkDetailsPropKey: true
    artworkDetailsPropValue: true
    lightboxQrHeader: true
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      dialogBg: string
    }
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      dialogBg?: string
    }
  }

  // Palette / Colors
  interface Palette {
    ciGray: Palette["primary"]
  }

  interface PaletteOptions {
    ciGray?: PaletteOptions["primary"]
  }

  // Typography
  interface TypographyVariants {
    imageSubtitle: React.CSSProperties
    lightboxArtworkTitle: React.CSSProperties
    lightboxArtistTitle: React.CSSProperties
    artworkDetailsArtist: React.CSSProperties
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    imageSubtitle: React.CSSProperties
    lightboxArtworkTitle: React.CSSProperties
    lightboxArtistTitle: React.CSSProperties
    artworkDetailsArtist: React.CSSProperties
    artworkDetailsTitle: React.CSSProperties
    artworkDetailsPropKey: React.CSSProperties
    artworkDetailsPropValue: React.CSSProperties
    lightboxQrHeader: React.CSSProperties
  }
}

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    add: true
    // reset: true
    // dialogBg: true
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    add: true
    // reset: true
    // dialogBg: true
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    add: true
    // reset: true
    // dialogBg: true
  }
}
declare module "@mui/icons-material/RemoveCircle" {
  interface ButtonPropsColorOverrides {
    add: true
    // reset: true
    // dialogBg: true
  }
}
