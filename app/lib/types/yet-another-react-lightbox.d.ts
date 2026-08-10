declare module "yet-another-react-lightbox" {
  interface SlideImage {
    imageType: "featured" | "additional" | "wall" | "youtubeVideo"
    // description?: string
    wallData?: {
      idFirebase: string
      artistTitle: string
      artworkTitle: string
      artworkSlug: string
    }
    artworkData?: {
      artistTitle: string
      artworkTitle: string
      // artworkSlug: string
    }
  }
}

export {}
