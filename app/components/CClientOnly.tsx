import {useEffect, useState} from "react"

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function CClientOnly({children, fallback = null}: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <>{children}</> : <>{fallback}</>
}
