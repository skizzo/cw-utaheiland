///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GraphQlQueries = {
  //

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  galleryBasics: `
    query GalleryByCode($code: String!, $lang: String) {
      galleryByCode(code: $code, lang: $lang) {
        code
        slug
        title
        featuredImageThumbUrl
        defaultCurrency
        singleArtistSlug
        artists (sortBy: newest, limit: 1) { slug, gender } # fallback for non-single artist galleries
        content
        seoData {
          ogDescription
          ogImage
          ogImageWidth
          ogImageHeight
        }
        gender        
        artworkCategories {
          slug
          title
        }
        showEventsTab

        featuredImage {
          size(size: FBSHARE) {
            url
            width
            height
          }
          sizes(sizes: [u500, u1000, u1500]) {
            size, url, width, height
          }
        }
        additionalImages {
          sizes(sizes: [u500, u1000, u1500]) {
            size, url, width, height
          }
        }

        contact {
          email
          phone
          links {
            type
            data
            active
          }
        }
        hideExactAddress
        locations {
          addressReadable
          city
          country
          lat, lng
        }
        brandingInfos {
          colorPrimary
          colorTextOnPrimary
        }

      }
    }
  `,

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  qr: `
    query BranchLink($type: String!, $identifier: String!, $useNewDomain: Boolean, $lang: String) {
      branchLink(type: $type, identifier: $identifier, useNewDomain: $useNewDomain, lang: $lang) {
        appLinkUrl
        qrImageUrl
      }
    }
  `,

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  artworks: `
    query Artworks($galleryCode: String, $lang: String, $limit: Int, $skip: Int, $currency: Currency, $unit: DimensionsUnit, $category: String) {
      artworks(galleryCode: $galleryCode, lang: $lang, limit: $limit, skip: $skip, currency: $currency, unit: $unit, category: $category) {
        slug
        title
        featuredImageThumbUrl
        materialsReadable
        techniquesReadable
        year
        purchaseLink
        availabilityStatusReadable
        dimensionsReadable
        priceReadableByStatus
        featuredImage {
          size(size: u500) {
            url, width, height
          }
        }
      }
    }
  `,

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  galleryWalls: `
    query Walls($galleryCode: String, $filter: WallFilter, $limit: Int, $lang: String) {
      walls(galleryCode: $galleryCode, filter: $filter, limit: $limit, lang: $lang) {
        id
        idFirebase
        artistTitle
        artworkTitle
        artworkSlug
        artworkVariantIndex
        imageThumbUrl
        imageUrl
      }
    }
  `,

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  artworkDetails: `
    query ArtworkBySlug($slug: String!, $lang: String, $unit: DimensionsUnit, $currency: Currency) {
      artworkBySlug(slug: $slug, lang: $lang, unit: $unit, currency: $currency) {
        galleriesCodes
        featuredImageUrl
        featuredImageThumbUrl
        youtubeVideoId
        content
        title
        featuredImage {
          size(size: FBSHARE) {
            url
            width
            height
          }
          sizes(sizes: [u500, u1000, u1500]) {
            size, url, width, height
          }
        }
        additionalImages {
          sizes(sizes: [u500, u1000, u1500]) {
            size, url, width, height
          }
        }
        artistsTitles
        slug
        dimensionsReadable
        techniquesReadable
        materials { slug }
        techniques { slug }
        materialsReadable
        year
        #
        availabilityStatusWp
        availabilityStatusReadable
        purchaseLink
        #
        priceReadableByStatus
        authCertificate
        variantsFull {
          dimensionsReadable
          priceReadableByStatus
        }
        seoData {
          ogTitle
          ogDescription
          ogImage
          ogImageWidth
          ogImageHeight
        }
        publicWalls {
          idFirebase
          artworkSlug
          imageThumbUrl
          imageUrl
        }
      }
    }
  `,

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  artistDetails: `
    query ArtistBySlug($code: String, $slug: String!, $limit: Int, $unit: DimensionsUnit, $currency: Currency, $lang: String) {
      artistBySlug(slug: $slug, lang: $lang) {
        title
        content
        #heroVideoUrl
        heroVideoYoutubeId
        seoData {
          ogDescription
          ogImage
          ogImageWidth
          ogImageHeight
        }
        featuredImage {
          size(size: FBSHARE) {
            url
            width
            height
          }
          sizes(sizes: [u500, u1000, u1500]) {
            size, url, width, height
          }
        }
        additionalImages {
          sizes(sizes: [u500, u1000, u1500]) {
            size, url, width, height
          }
        }
        artworks(code: $code, unit: $unit, currency: $currency, limit: $limit) {
          slug
          title
          featuredImageThumbUrl
          materialsReadable
          techniquesReadable
          year
          purchaseLink
          availabilityStatusReadable
          dimensionsReadable
          priceReadableByStatus
          featuredImage {
            size(size: u500) {
              url, width, height
            }
          }
        }
      }
    }
  `,

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  events: `
    query Events($galleryCode: String, $lang: String, $limit: Int, $filter: EventFilter) {
      events(galleryCode: $galleryCode, lang: $lang, limit: $limit, filter: $filter) {
        slug
        title
        featuredImageUrl
        featuredImageThumbUrl
        timeRangeReadable
        locationReadable
        categories
        categoriesReadable
        link
      }
    }    
  `,

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  eventDetails: `
    query EventBySlug($slug: String!, $lang: String) {
      eventBySlug(slug: $slug, lang: $lang) {
        slug
        title
        content
        galleriesCodes
        openingHoursLines
        timeRangeReadable
        locationReadable
        link
        seoData {
          ogDescription
          ogImage
          ogImageWidth
          ogImageHeight
        }
        featuredImage {
          size(size: FBSHARE) {
            url
            width
            height
          }
          sizes(sizes: [u500, u1000, u1500]) {
            size, url, width, height
          }
        }
        additionalImages {
          sizes(sizes: [u500, u1000, u1500]) {
            size, url, width, height
          }
        }
        externalOrganizer {
          title
          website
          imageThumbUrl
          imageUrl
        }
      }
    }
  `,
} as const
