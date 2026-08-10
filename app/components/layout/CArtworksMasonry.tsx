import React, {type FC, useEffect, useRef} from "react"
import Masonry from "react-masonry-css"
import {Link} from "react-router"

import {Box, Divider, type SxProps, Typography} from "@mui/material"

import {Config} from "~/lib/config"
import type {TGraphQl} from "~/lib/types"
import {brd} from "~/lib/utils"

const breakpointColumns = {
  default: 4,
  1200: 3,
  900: 2,
  600: 1,
}

const DEBUG = false && __DEV__

type Props = {
  artworks: TGraphQl.Artwork[]
  sx?: SxProps
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CArtworksMasonry: FC<Props> = props => {
  const {artworks, sx} = props
  return (
    <Box sx={{...sx, ...brd(DEBUG, "green")}}>
      <Masonry
        //
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column">
        {artworks.map(artwork => (
          <ArtworkCard key={artwork.slug} artwork={artwork} />
        ))}
      </Masonry>
    </Box>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ArtworkCard = ({artwork}: {artwork: TGraphQl.Artwork}) => {
  return (
    <Box
      //
      component={Link}
      to={`/artworks/${artwork.slug}`}
      prefetch={"intent"}
      viewTransition={Config.app.useViewTransition}
      // prefetch={"render"}
      sx={{textDecoration: "none", color: "inherit"}}>
      <Box sx={{breakInside: "avoid", mb: 2}}>
        {false && <Box component={"div"} sx={{height: "1px", width: "100%", backgroundColor: "red"}} />}

        <Divider sx={{backgroundColor: "#CCC", mb: 2}} />

        {true && (
          <Typography
            //
            // lang={"de"} // TODO: this should be defined by <html> lang property
            // variant="h2"
            variant="h3"
            sx={{mb: 2}}>
            {artwork.title}
          </Typography>
        )}
        {false && <Typography variant="overline">{artwork.slug}</Typography>}

        <ArtworkImage artwork={artwork} />

        <Box sx={{pt: 1}}>
          {!!artwork.dimensionsReadable && (
            <Typography variant="imageSubtitle">
              {""}
              {artwork.dimensionsReadable}
            </Typography>
          )}
          {!!artwork.materialsReadable && (
            <Typography variant="imageSubtitle">
              {""}
              {artwork.materialsReadable}
            </Typography>
          )}
          {!!artwork.techniquesReadable && (
            <Typography variant="imageSubtitle">
              {""}
              {artwork.techniquesReadable}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ArtworkImage = ({artwork}: {artwork: TGraphQl.Artwork}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  function reveal() {
    if (imgRef.current) imgRef.current.style.opacity = "1"
    if (wrapperRef.current) wrapperRef.current.style.backgroundColor = "transparent"
  }

  useEffect(() => {
    // If image is already cached, onLoad won't fire
    if (imgRef.current?.complete) {
      reveal()
    }
  }, [])

  return (
    <Box
      ref={wrapperRef}
      sx={{
        bgcolor: "grey.100",
        // alignSelf: "center",
        aspectRatio: artwork.featuredImage?.size?.width && artwork.featuredImage.size.height ? `${artwork.featuredImage.size.width} / ${artwork.featuredImage.size.height}` : "4 / 3",
        maxHeight: {xs: 400, sm: 500, md: 500},
        overflow: "hidden",
        transition: "background-color 0.4s ease",
      }}>
      <Box
        ref={imgRef}
        loading={"lazy"}
        component={"img"}
        src={artwork.featuredImage?.size?.url}
        alt={artwork.title}
        onLoad={reveal}
        onError={reveal}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center center",
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
      />
    </Box>
  )
}

export {CArtworksMasonry}
