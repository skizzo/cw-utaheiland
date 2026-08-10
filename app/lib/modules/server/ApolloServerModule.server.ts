import {Config} from "~/lib/config"
import {GraphQlQueries} from "~/lib/graphql"
import {type TAppLang, type TGraphQl, TLightboxCarousel} from "~/lib/types"
import {getArrayUnique, getHeroSlideImages, getHeroSlidesFeaturedAdditional, notEmpty} from "~/lib/utils"

import {gql} from "@apollo/client"
import {EventFilter} from "~/_inbox/service/GQL-frontend.types"

import {ApolloBase} from "../ApolloBase"
import {createLog} from "../Logger"
import {RedisModule} from "./RedisModule.server"

// import {RedisModule} from "./RedisModule"

const log = createLog("ApolloServerModule")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class ApolloServerModule {
  //

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getGalleryBasics(code: string, lang: string) {
    log.log("getGalleryBasics()", {code, lang})

    const {data} = await RedisModule.cached(`ApolloServerModule.getGalleryBasics:${code}:${lang}`, () =>
      ApolloBase.getClient().query<{galleryByCode: TGraphQl.Gallery}>({
        query: gql(GraphQlQueries.galleryBasics),
        variables: {
          code,
          lang,
        },
      }),
    )

    const galleryData = data?.galleryByCode

    const heroSlides = getHeroSlidesFeaturedAdditional(galleryData?.featuredImage, galleryData?.additionalImages)

    const artworkCategories = !galleryData?.artworkCategories?.length ? undefined : galleryData.artworkCategories

    return {galleryData, heroSlides, artworkCategories}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getGalleryQr(code: string) {
    log.log("getGalleryQr()", {code})

    const {data} = await RedisModule.cached(`ApolloServerModule.getGalleryQr:${code}`, () =>
      ApolloBase.getClient().query<{branchLink: TGraphQl.BranchLink}>({
        query: gql(GraphQlQueries.qr),
        variables: {
          type: "gallery",
          identifier: code,
          useNewDomain: Config.app.useNewDomainBranch,
        },
      }),
    )

    return data?.branchLink
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getArtworks(code: string, lang: TAppLang, currency: TGraphQl.Currency, unit: TGraphQl.DimensionsUnit, category: string | undefined, skip: number, limit: number) {
    log.log("getArtworks()", {code, lang, currency, unit, category, skip, limit})

    const {data} = await RedisModule.cached(`ApolloServerModule.getArtworks:${code}:${lang}:${currency}:${unit}:${category || "-"}:${skip}:${limit}`, () =>
      ApolloBase.getClient().query<{artworks: TGraphQl.Artwork[]}>({
        query: gql(GraphQlQueries.artworks),
        variables: {
          galleryCode: code,
          lang,
          currency,
          unit,
          category,
          skip,
          limit,
        },
      }),
    )

    return data?.artworks || []
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getGalleryWalls(code: string, lang: TAppLang, limit = 50) {
    log.log("getGalleryWalls()", {code, lang, limit})

    const {data} = await RedisModule.cached(`ApolloServerModule.getGalleryWalls:${code}:${lang}:${limit}`, () =>
      ApolloBase.getClient().query<{walls: TGraphQl.Wall[]}>({
        query: gql(GraphQlQueries.galleryWalls),
        variables: {
          galleryCode: code,
          lang,
          filter: "public",
          limit,
        },
      }),
    )
    const galleryWalls = data?.walls || []

    const wallSlides: TLightboxCarousel.HeroSlide[] = galleryWalls.map(wall => {
      return {
        imageType: "wall",
        images: {
          small: {url: wall.imageThumbUrl || ""},
          medium: {url: wall.imageThumbUrl || ""},
          large: {url: wall.imageUrl || ""},
        },
        type: "wall",
        idFirebase: wall.idFirebase,
        artistTitle: wall.artistTitle || "",
        artworkTitle: wall.artworkTitle || "",
        artworkSlug: wall.artworkSlug || "",
      }
    })

    return {galleryWalls, wallSlides}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getArtworkDetails(code: string, slug: string | undefined, lang: TAppLang, currency: TGraphQl.Currency, unit: TGraphQl.DimensionsUnit) {
    log.log("getArtworkDetails()", {code, slug, lang, currency, unit})

    if (!slug) {
      return {artworkData: undefined}
    }

    const {data} = await RedisModule.cached(`ApolloServerModule.getArtworkDetails:${slug}:${lang}:${currency}:${unit}`, () =>
      ApolloBase.getClient().query<{artworkBySlug: TGraphQl.Artwork}>({
        query: gql(GraphQlQueries.artworkDetails),
        variables: {
          slug,
          lang,
          currency,
          unit,
        },
      }),
    )

    const artworkData = !data?.artworkBySlug ? undefined : !data.artworkBySlug.galleriesCodes?.includes(code) ? undefined : data.artworkBySlug

    const heroVideoYoutubeId = artworkData?.youtubeVideoId || undefined

    const heroSlides = getHeroSlidesFeaturedAdditional(artworkData?.featuredImage, artworkData?.additionalImages)

    const artworkSlides: TLightboxCarousel.HeroSlide[] = heroSlides.map(slide => {
      return {
        //
        ...slide,
        type: "artwork",
        artworkTitle: artworkData?.title || "",
        artistTitle: artworkData?.artistsTitles || "",
      }
    })

    // now, add walls too
    const wallSlides: TLightboxCarousel.HeroSlide[] = !artworkData?.publicWalls
      ? []
      : artworkData.publicWalls.map(wall => {
          return {
            imageType: "wall",
            images: {
              small: {url: wall.imageThumbUrl || ""},
              medium: {url: wall.imageThumbUrl || ""},
              large: {url: wall.imageUrl || ""},
            },
            type: "wall",
            idFirebase: wall.idFirebase,
            artworkTitle: artworkData?.title || "",
            artistTitle: artworkData?.artistsTitles || "",
            artworkSlug: slug,
          }
        })

    const allSlides = [...artworkSlides, ...wallSlides]

    const allVariantsSamePrice = !artworkData?.variantsFull?.length ? true : getArrayUnique(artworkData.variantsFull.map(v => v.priceReadableByStatus || "")).length === 1

    const variantsFullPricesReadableByStatus = !artworkData?.variantsFull?.length ? undefined : allVariantsSamePrice ? [artworkData.variantsFull?.[0].priceReadableByStatus || undefined].filter(notEmpty) : artworkData.variantsFull.map(v => v.priceReadableByStatus || undefined).filter(notEmpty)

    return {artworkData, allSlides, allVariantsSamePrice, variantsFullPricesReadableByStatus, heroVideoYoutubeId}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getArtworkQr(code: string, slug: string | undefined) {
    log.log("getArtworkQr()", {code})

    const {data} = await RedisModule.cached(`ApolloServerModule.getArtworkQr:${code}:${slug}`, () =>
      ApolloBase.getClient().query<{branchLink: TGraphQl.BranchLink}>({
        query: gql(GraphQlQueries.qr),
        variables: {
          type: "artwork",
          identifier: slug,
          useNewDomain: Config.app.useNewDomainBranch,
        },
      }),
    )

    return data?.branchLink
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getArtistDetails(code: string, slug: string | undefined, lang: TAppLang, currency: TGraphQl.Currency, unit: TGraphQl.DimensionsUnit, limitArtworks = 12) {
    log.log("getArtistDetails()", {slug, lang, currency, unit, limitArtworks})

    const {data} = await RedisModule.cached(`ApolloServerModule.getArtistDetails:${slug}:${lang}:${currency}:${unit}:${limitArtworks}`, () =>
      ApolloBase.getClient().query<{artistBySlug: TGraphQl.Artist}>({
        query: gql(GraphQlQueries.artistDetails),
        variables: {
          code,
          slug,
          lang,
          currency,
          unit,
          limit: limitArtworks,
        },
      }),
    )

    const artistData = data?.artistBySlug

    const artworks = artistData?.artworks || []

    const heroSlides = getHeroSlidesFeaturedAdditional(artistData?.featuredImage, artistData?.additionalImages)
    const additionalImages = heroSlides.length > 1 ? heroSlides.slice(1) : []

    const heroVideoYoutubeId = artistData?.heroVideoYoutubeId || undefined

    const videoSlides: TLightboxCarousel.HeroSlide[] = !heroVideoYoutubeId
      ? []
      : [
          {
            imageType: "youtubeVideo",
            videoId: heroVideoYoutubeId,
            images: {
              small: {url: ""},
              medium: {url: ""},
              large: {url: ""},
            },
            type: "youtubeVideo",
          },
        ]

    return {artistData, heroSlides, videoSlides, additionalImages, artworks, heroVideoYoutubeId}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getEvents(code: string, lang: TAppLang, viaSubEvents: boolean | undefined, limit = 100) {
    log.log("getEvents()", {code, lang, limit})

    const fetchEvents = async (filter: TGraphQl.EventFilter) => {
      const {data} = await RedisModule.cached(`ApolloServerModule.getEvents:${code}:${lang}:${limit}:${filter}`, () =>
        ApolloBase.getClient().query<{events: TGraphQl.Event[]}>({
          query: gql(GraphQlQueries.events),
          variables: {
            galleryCode: code,
            lang,
            limit,
            filter,
          },
        }),
      )
      const eventsRaw = data?.events || []
      // return eventsRaw

      const events = eventsRaw.filter(e => {
        if (!Config.app.events.showSubEvents) {
          return true // no "sub-events" -> return all
        }
        if (viaSubEvents === undefined) {
          return true
        }
        const isSubEvent = !!e.categories.filter(c => (Config.app.events.subEventsCategories as unknown as string[]).includes(c)).length
        log.log("getEvents()", {viaSubEvents, categories: e.categories, isSubEvent})
        return viaSubEvents ? isSubEvent : !isSubEvent
      })

      return events
    }

    const [eventsPresent, eventsFuture, eventsPast] = await Promise.all([
      //
      fetchEvents(EventFilter.Present),
      fetchEvents(EventFilter.Future),
      fetchEvents(EventFilter.Past),
    ])

    return {eventsPresent, eventsFuture, eventsPast}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getEventDetails(code: string, slug: string | undefined, lang: TAppLang) {
    // return {eventData: undefined}

    const {data} = await RedisModule.cached(`ApolloServerModule.getEventDetails:${code}:${slug}:${lang}`, () =>
      ApolloBase.getClient().query<{eventBySlug: TGraphQl.Event}>({
        query: gql(GraphQlQueries.eventDetails),
        variables: {
          slug,
          lang,
        },
      }),
    )
    const eventData = data?.eventBySlug || undefined

    const heroSlides = getHeroSlidesFeaturedAdditional(eventData?.featuredImage, eventData?.additionalImages)
    const additionalImages = heroSlides.length > 1 ? heroSlides.slice(1) : []

    return {eventData, heroSlides, additionalImages}
  }
}
