import {useLocation, useNavigation} from "react-router"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useIsLoadingNavigation = () => {
  const navigation = useNavigation()
  const location = useLocation()

  if (navigation.state !== "loading") return false

  // Case 1: navigating away — return false
  // Case 2: navigating to this page — return true
  // Case 3: same page navigation (e.g. search params change) — return true
  const isSamePage = navigation.location?.pathname === location.pathname

  return isSamePage

  // const isLoading = navigation.state === "loading"
  // return isLoading
}
