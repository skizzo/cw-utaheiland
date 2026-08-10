import {useCallback} from "react"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const useScrollToAnchor = () => {
  const scrollToAnchor = useCallback((id: string, offset = 0) => {
    const el = document.getElementById(id)
    if (!el) return

    if (offset) {
      // Manual offset (e.g., fixed header)
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({top: y, behavior: "smooth"})
    } else {
      el.scrollIntoView({behavior: "smooth", block: "start"})
    }
  }, [])

  return scrollToAnchor
}

export {useScrollToAnchor}
