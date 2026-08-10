import {ImageSizeSize} from "~/_inbox/service/GQL-frontend.types"

import type {TGraphQl, TLightboxCarousel} from "../types"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getHeroSlideImages = (sizes: TGraphQl.ImageSize[]): TLightboxCarousel.HeroSlideImages | undefined => {
  const small = sizes.find(s => s.size === ImageSizeSize.U500)
  const medium = sizes.find(s => s.size === ImageSizeSize.U1000)
  const large = sizes.find(s => s.size === ImageSizeSize.U1500)
  return !small || !medium || !large ? undefined : {small, medium, large}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getHeroSlidesFeaturedAdditional = (featuredImage: TGraphQl.Maybe<TGraphQl.Image> | undefined, additionalImages: TGraphQl.Maybe<TGraphQl.Image[]> | undefined) => {
  const heroSlides = [
    // Featured Image
    ...(!featuredImage?.sizes?.length
      ? []
      : [
          {
            imageType: "featured",
            images: getHeroSlideImages(featuredImage.sizes), // this can return undefined too
          },
        ]),
    // Additional Images
    ...(!additionalImages?.length
      ? []
      : additionalImages.map(ai => {
          const images = !ai.sizes ? undefined : getHeroSlideImages(ai.sizes)
          return {
            imageType: "additional",
            images,
          }
        })),
    // ].filter((e): e is HeroSlide => !!e.images)
  ].filter((e): e is TLightboxCarousel.HeroSlide => !!e.images)

  return heroSlides
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getIntlIdForArtworkButton = (availabilityStatusWp: string | undefined, hasPurchaseLink: boolean) => {
  switch (availabilityStatusWp) {
    case "tempunavailable":
    case "unavailable":
    case "sold":
    case "gifted":
    case "privateownership":
      return "moreInfos" // Mehr Infos
  }

  if (hasPurchaseLink) {
    return "purchase" // Kaufen -> open purchaseLink
  }

  return "salesInquiry" // Kaufanfrage
}
