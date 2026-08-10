import {useEffect} from "react"

import type {CYoutubePlayerRef} from "~/components"

// Global registry — lives outside React
const registry = new Set<CYoutubePlayerRef>()

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function useYoutubeRegistry(ref: React.RefObject<CYoutubePlayerRef | null>) {
  useEffect(() => {
    const player = ref.current
    if (!player) return
    registry.add(player)
    return () => {
      registry.delete(player)
    }
  }, [ref])
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function usePauseAllYoutube() {
  //
  return {
    /** Pauses all instances of {@link CYoutubePlayerRef `CYoutubePlayerRef`} */
    pauseAllYoutube: () => {
      registry.forEach(player => player.pauseIfPlaying())
    },
  }
}
