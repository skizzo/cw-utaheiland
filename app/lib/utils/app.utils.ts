export const getIsServer = () => typeof window === "undefined"
export const getIsClient = () => !getIsServer()
