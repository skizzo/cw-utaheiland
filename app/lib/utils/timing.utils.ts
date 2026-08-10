///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createTimer = (label: string) => {
  const start = performance.now()
  return {
    log: (step?: string) => {
      const ms = (performance.now() - start).toFixed(2)
      console.log(`[${label}] ${step ?? "done"}: ${ms}ms`)
    },
  }
}
