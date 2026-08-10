import {createContext, useCallback, useContext} from "react"
import {useState} from "react"
import {useFetcher} from "react-router"

import {Box, Modal} from "@mui/material"

import {CUserSettings, type UserSettingsValues} from "~/components"

import {usePauseAllYoutube} from "../hooks"
import {createLog} from "../modules"

const log = createLog("UserSettingsModalContext")

interface UserSettingsModalActions {
  openUserSettingsModal: () => void
  closeUserSettingsModal: () => void
}

const UserSettingsModalActionsContext = createContext<UserSettingsModalActions | null>(null)
const UserSettingsModalStateContext = createContext<boolean>(false)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function UserSettingsModalProvider({children}: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false)

  const {pauseAllYoutube} = usePauseAllYoutube()

  const openUserSettingsModal = useCallback(() => {
    pauseAllYoutube()
    setOpen(true)
  }, [pauseAllYoutube])

  const closeUserSettingsModal = useCallback(() => setOpen(false), [])

  return (
    <UserSettingsModalActionsContext.Provider value={{openUserSettingsModal, closeUserSettingsModal}}>
      <UserSettingsModalStateContext.Provider value={open}>
        {children}
        <UserSettingsModalConsumer />
      </UserSettingsModalStateContext.Provider>
    </UserSettingsModalActionsContext.Provider>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UserSettingsModalConsumer() {
  const open = useContext(UserSettingsModalStateContext)
  const {closeUserSettingsModal} = useUserSettingsModal()
  const fetcher = useFetcher()

  const onUserSettingsSaveAndCloseClick = useCallback(
    async (values: UserSettingsValues) => {
      log.log("onUserSettingsSaveAndCloseClick()", {values})
      const {locale, currency, dimensionsUnit} = values
      await fetcher.submit({locale: locale || null, currency: currency || null, dimensionsUnit: dimensionsUnit || null}, {method: "post", action: "/set-user-settings"})
      closeUserSettingsModal()
    },
    [fetcher, closeUserSettingsModal],
  )

  return (
    <Modal open={open} onClose={closeUserSettingsModal} sx={{display: "flex", alignItems: "center", justifyContent: "center", outline: "none"}}>
      <Box
        sx={{
          position: "absolute",
          outline: "none",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 400,
          width: "100%",
          bgcolor: "background.paper",
          border: "2px solid #666",
          borderRadius: 5,
          boxShadow: 24,
          p: 4,
          m: 0,
        }}>
        <CUserSettings onSaveAndCloseClick={onUserSettingsSaveAndCloseClick} />
      </Box>
    </Modal>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function useUserSettingsModal() {
  const ctx = useContext(UserSettingsModalActionsContext)

  if (!ctx) {
    if (__DEV__) {
      // Return no-op functions during HMR remount
      return {
        openUserSettingsModal: () => {},
        closeUserSettingsModal: () => {},
      }
    }
    throw new Error("useUserSettingsModal must be used within a UserSettingsModalProvider")
  }

  return ctx
}
