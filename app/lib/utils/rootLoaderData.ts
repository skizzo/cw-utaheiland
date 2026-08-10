import type {MetaArgs, MetaDescriptor} from "react-router"

import {Config} from "~/lib/config"

import type {loader as rootLoader} from "~/root"

type RootLoaderData = Awaited<ReturnType<typeof rootLoader>>
type Matches = MetaArgs["matches"]

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function getRootLoaderData(matches: Matches): RootLoaderData | undefined {
  return matches.find(m => m.id === "root")?.loaderData as RootLoaderData | undefined
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Returns:
 *
 *  - property `og:site_name`
 *  - property `og:url`
 *  - property `og:type`
 *  - property `og:locale`
 *  */
export const getMetaBase = (rootLoaderData: RootLoaderData | undefined, pathname: string | undefined): MetaDescriptor[] => {
  const {locale, galleryData, ROOT_URL} = rootLoaderData || {}
  const rootUrl = ROOT_URL
  // debugger
  return [
    {property: "og:site_name", content: galleryData?.title},
    {property: "og:url", content: `${rootUrl}${pathname || ""}`},
    {property: "og:type", content: "website"},
    {property: "og:locale", content: locale},
  ]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Returns:
 *
 *  - `title`
 *  - `description`
 *  - property `og:title`
 *  - property `og:description`
 *  */
export const getMetaTitleDescription = (title: string, description: string): MetaDescriptor[] => {
  return [
    //
    {title: title},
    {name: "description", content: description},
    //
    {property: "og:title", content: title},
    {property: "og:description", content: description},
  ]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Returns:
 *
 *  - property `og:image`
 *  - property `og:image:alt`
 *  - property `og:image:width`
 *  - property `og:image:height`
 *  */

export const getMetaImage = (url: string | undefined, width: number | undefined, height: number | undefined): MetaDescriptor[] => {
  if (!url || !width || !height) {
    console.warn("getMetaImage(): missing url, width and/or height!")
  }
  return [
    //
    {property: "og:image", content: `${url}`},
    {property: "og:image:alt", content: `${url}`},
    {property: "og:image:width", content: `${width}`},
    {property: "og:image:height", content: `${height}`},
  ]
}
