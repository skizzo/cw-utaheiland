declare global {
  const __DEV__: boolean
  const __APP_VERSION__: string

  interface Window {
    /** set in `root.tsx` */
    __locale: string
    YT: typeof YT
    onYouTubeIframeAPIReady: () => void
  }
}

export {}
