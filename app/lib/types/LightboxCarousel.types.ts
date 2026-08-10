import {z} from "zod/v4"

export namespace TLightboxCarousel {
  //

  const HeroSlideImageSchema = z.object({
    url: z.string(),
    width: z.number().optional(),
    height: z.number().optional(),
  })

  const SlidePropsNoneSchema = z.object({
    type: z.undefined().optional(),
  })

  const SlidePropsWallSchema = z.object({
    type: z.literal("wall"),
    idFirebase: z.string(),
    artistTitle: z.string(),
    artworkTitle: z.string(),
    artworkSlug: z.string(),
  })

  const SlidePropsArtworkSchema = z.object({
    type: z.literal("artwork"),
    artistTitle: z.string(),
    artworkTitle: z.string(),
    // artworkSlug: z.string(),
  })

  const SlidePropsYoutubeVideoSchema = z.object({
    type: z.literal("youtubeVideo"),
    videoId: z.string(),
  })

  /** these need to be updated in `yet-another-react-lightbox.d.ts` too */
  const SlidePropsByTypeSchema = z.discriminatedUnion("type", [
    //
    SlidePropsWallSchema,
    SlidePropsNoneSchema,
    SlidePropsArtworkSchema,
    SlidePropsYoutubeVideoSchema,
  ])

  const HeroSlideImagesSchema = z.object({
    small: HeroSlideImageSchema,
    medium: HeroSlideImageSchema,
    large: HeroSlideImageSchema,
  })

  const HeroSlideSchema = SlidePropsByTypeSchema.and(
    z.object({
      imageType: z.enum(["featured", "additional", "wall", "youtubeVideo"]),
      images: HeroSlideImagesSchema,
    }),
  )

  export type HeroSlideImage = z.infer<typeof HeroSlideImageSchema>
  export type HeroSlideImages = z.infer<typeof HeroSlideImagesSchema>
  export type HeroSlide = z.infer<typeof HeroSlideSchema>
  export type SlidePropsWall = z.infer<typeof SlidePropsWallSchema>
}
