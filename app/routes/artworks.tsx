import {useCallback, useEffect, useRef, useState} from "react"
import {useTranslation} from "react-i18next"
import {type LoaderFunctionArgs, type MetaFunction, useLoaderData, useSearchParams} from "react-router"

import {getT} from "~/i18n.server"

import {Box} from "@mui/material"

import {Config} from "~/lib/config"
import {useUserSettingsModal} from "~/lib/contexts"
import {detectCookieSettings} from "~/lib/cookies"
import {useIsLoadingNavigation, useRootLoaderData, useScrollToAnchor} from "~/lib/hooks"
import {createLog} from "~/lib/modules"
import {ApolloServerModule} from "~/lib/modules/server"
import {brd, createTimer, getMetaBase, getMetaImage, getMetaTitleDescription, getRootLoaderData, sleep} from "~/lib/utils"

import {CArtworkCategories, CArtworksMasonry, CClientOnly, CLightbox, CLoadMoreButton, CPageContainer, CPageHeader, type CYoutubePlayerRef} from "~/components"

const DEBUG = false && __DEV__
const log = createLog("artworks")

const LIMIT = DEBUG ? 4 : 12
const STEP = 24

const SCROLL_TO_CATEGORIES_AFTER_CHANGE = false

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const loader = async ({request}: LoaderFunctionArgs) => {
  const timer = createTimer("artworks.loader")

  const {locale, currency, dimensionsUnit} = await detectCookieSettings(request)
  timer.log("detectCookieSettings")

  const {artworkCategories} = await ApolloServerModule.getGalleryBasics(Config.app.code, locale)
  timer.log(`getGalleryBasics(${Config.app.code}, ${locale})`)

  const url = new URL(request.url)

  // debugger
  // console.log(i18n.hasResourceBundle(locale, "translation"))
  // console.log(i18n.getResourceBundle(locale, "translation"))
  // debugger

  // debugger
  // if (!i18n.isInitialized) debugger

  // // Make sure i18n is using the correct locale before translating
  // if (i18n.language !== locale) {
  //   await i18n.changeLanguage(locale)
  // }

  // // const title = i18n.t("hello")
  // const title = i18n.t("pages.artworks", {ns: "translation"})

  const t = await getT(locale)
  const title = t("pages.artworks")

  const skip = 0
  const limit = Number(url.searchParams.get("limit") ?? LIMIT)

  const firstCat = !artworkCategories?.length ? undefined : artworkCategories?.[0]?.slug
  const artworkCategorySlug = url.searchParams.get("cat") || firstCat
  const artworkCategory = !artworkCategories ? undefined : artworkCategories.find(ac => ac.slug === artworkCategorySlug)?.slug

  const artworks = await ApolloServerModule.getArtworks(Config.app.code, locale, currency, dimensionsUnit, artworkCategory, skip, limit)

  timer.log("artworks query")

  return {title, locale, currency, dimensionsUnit, skip, limit, artworks}
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
export default function ArtworksPage() {
  const {heroSlides, artworkCategories} = useRootLoaderData() || {}
  const {locale, artworks, limit, title} = useLoaderData<typeof loader>()
  const scrollToAnchor = useScrollToAnchor()

  const [searchParams, setSearchParams] = useSearchParams()
  const hasMore = artworks.length === limit

  const {openUserSettingsModal} = useUserSettingsModal()

  const isLoading = useIsLoadingNavigation()

  const artworkCategorySlug = !artworkCategories ? undefined : artworkCategories.find(c => c.slug === searchParams.get("cat"))?.slug
  const firstCategorySlug = !artworkCategories?.length ? undefined : artworkCategories[0].slug

  const loadMore = useCallback(() => {
    setSearchParams(
      {
        //
        ...(artworkCategorySlug ? {cat: artworkCategorySlug} : {}),
        limit: String(limit + STEP),
      },
      {replace: true, preventScrollReset: true},
    )
  }, [setSearchParams, artworkCategorySlug, limit])

  const onArtworkCategoryChange = useCallback(
    async (categorySlug: string, index: number) => {
      log.log("onArtworkCategoryChange()", {categorySlug, index})
      setSearchParams({...(categorySlug !== firstCategorySlug ? {cat: categorySlug} : null)}, {preventScrollReset: true})

      if (SCROLL_TO_CATEGORIES_AFTER_CHANGE) {
        await sleep(500)
        scrollToAnchor("categories-top")
      }
    },
    [setSearchParams, scrollToAnchor, firstCategorySlug],
  )

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  useEffect(() => {
    playerRef.current?.pauseIfPlaying()
  }, [lightboxIndex])

  const playerRef = useRef<CYoutubePlayerRef>(null)

  const {t} = useTranslation()
  const labels = {
    loadMoreButton: {
      loadMore: t("components.loadMoreButton.loadMore"),
      loading: t("components.loadingButton.loadMore"),
    },
  }

  log.log("render()")
  return (
    <>
      <CPageContainer
      //
      // sx={{background: "#FFF"}}
      >
        {/* */}

        <CPageHeader
          //
          sx={{mt: Config.theme.sectionSpacing}}
          title={title}
        />

        {/* Categories */}
        {!!artworkCategories && (
          <Box sx={{mt: Config.theme.sectionSpacing / 3, ...brd(DEBUG, "green")}}>
            <Box id={"categories-top"} />
            <CArtworkCategories
              //
              selected={artworkCategorySlug}
              onChange={onArtworkCategoryChange}
              categories={artworkCategories}
              // sx={{mt: 3}}
            />
          </Box>
        )}

        {/* Artworks Masonry */}
        <Box sx={{mt: Config.theme.sectionSpacing, ...brd(DEBUG, "green")}}>
          <CArtworksMasonry artworks={artworks} />
        </Box>

        {hasMore && (
          <CLoadMoreButton
            //
            onClick={loadMore}
            loading={isLoading}
            label={labels.loadMoreButton.loadMore}
            labelLoading={labels.loadMoreButton.loading}
          />
        )}
      </CPageContainer>

      <CClientOnly>
        <CLightbox
          //
          images={heroSlides}
          initialIndex={lightboxIndex ?? 0}
          open={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          locale={locale}
        />
      </CClientOnly>
    </>
  )
}
