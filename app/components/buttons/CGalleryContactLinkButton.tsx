import {SiBehance, SiBlogger, SiFlickr, SiTumblr, SiVimeo} from "react-icons/si"

import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import LanguageIcon from "@mui/icons-material/Language"
import LinkIcon from "@mui/icons-material/Link"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import PinterestIcon from "@mui/icons-material/Pinterest"
import XIcon from "@mui/icons-material/X"
import YouTubeIcon from "@mui/icons-material/YouTube"
import {Box, Button, IconButton} from "@mui/material"

import type {TGraphQl} from "~/lib/types"
import {assertNever} from "~/lib/utils"

import {LinkType} from "~/_inbox/service/GQL-frontend.types"

const DEBUG = true && __DEV__

type Props = {
  data: TGraphQl.Link
  rootUrl: string | undefined
  iconOnly?: boolean
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CGalleryContactLinkButton = (props: Props) => {
  const {data, rootUrl, iconOnly} = props

  const iconSize = 28
  const fontSize = 24

  const href = getUrlByTypeAndData(data.type, data.data || "")
  if (!href) return null

  // if (data.type === LinkType.Website) debugger
  if (!!rootUrl && href.indexOf(rootUrl) !== -1) return null

  if (iconOnly) {
    return (
      <IconButton
        //
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          bgcolor: "rgba(0,0,0,0.08)",
          "&:hover": {bgcolor: "rgba(0,0,0,0.15)"},
        }}>
        <CLinkIcon type={data.type} size={fontSize * 0.8} color={"#AAA"} />
      </IconButton>
    )
  }

  return (
    <Button
      //
      sx={{
        lineHeight: 1.3,
        "& .MuiButton-startIcon": {
          // marginBottom: "2px", // nudge icon down to align with text
        },
        pt: "8px",
        pb: "5px",
      }}
      variant="outlined"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      startIcon={
        <Box sx={{width: iconSize, height: iconSize, pb: "3px", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <CLinkIcon type={data.type} size={fontSize} />
        </Box>
      }>
      {data.data}
    </Button>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getUrlByTypeAndData = (type: TGraphQl.LinkType, data: string | undefined) => {
  if (!data) return undefined

  switch (type) {
    case LinkType.Website:
      return `https://${data}`

    case LinkType.Instagram:
      return `https://instagram.com/${data}`

    case LinkType.Twitter:
      return `https://x.com/${data}`

    case LinkType.FacebookPage:
    case LinkType.FacebookPrivate:
      return `https://facebook.com/${data}`

    case LinkType.Youtube:
      return `https://youtube.com/@${data}`

    case LinkType.Behance:
      return `https://behance.net/${data}`

    case LinkType.Tumblr:
      return data.indexOf("https://tumblr.com/") === -1 ? `https://${data}.tumblr.com` : data

    case LinkType.Blogspot:
      return `https://${data}.blogspot.com`

    case LinkType.Flickr:
      return `https://flickr.com/photos/${data}`

    case LinkType.LinkedinCompany:
      return `https://linkedin.com/company/${data}`

    case LinkType.LinkedinPerson:
      return `https://linkedin.com/in/${data}`

    case LinkType.Pinterest:
      return `https://pinterest.com/${data}`

    case LinkType.Vimeo:
      return `https://vimeo.com/${data}`

    case LinkType.Other:
      return data

    default:
      assertNever(type, "getUrlByTypeAndData", "type")
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CLinkIcon = (props: {type: TGraphQl.LinkType; size: number; color?: string}) => {
  const {type, size = 24, color} = props
  switch (type) {
    case LinkType.Website:
      return <LanguageIcon sx={{fontSize: size, color}} />

    case LinkType.Instagram:
      return <InstagramIcon sx={{fontSize: size, color}} />

    case LinkType.Twitter:
      return <XIcon sx={{fontSize: size * 0.9, color}} />

    case LinkType.FacebookPage:
    case LinkType.FacebookPrivate:
      return <FacebookIcon sx={{fontSize: size, color}} />

    case LinkType.Youtube:
      return <YouTubeIcon sx={{fontSize: size, color}} />

    case LinkType.LinkedinCompany:
    case LinkType.LinkedinPerson:
      return <LinkedInIcon sx={{fontSize: size, color}} />

    case LinkType.Pinterest:
      return <PinterestIcon sx={{fontSize: size, color}} />

    case LinkType.Behance:
      return <SiBehance size={size * 0.8} color={color} />

    case LinkType.Tumblr:
      return <SiTumblr size={size * 0.8} color={color} />

    case LinkType.Vimeo:
      return <SiVimeo size={size * 0.8} color={color} />

    case LinkType.Blogspot:
      return <SiBlogger size={size} />

    case LinkType.Flickr:
      return <SiFlickr size={size} />

    case LinkType.Other:
      return <LinkIcon sx={{fontSize: size, color}} />

    default:
      assertNever(type, "getLinkIcon", "type")
  }
}
