interface Window {
  umami?: {
    track: (eventName: string, eventData?: Record<string, unknown>) => void
    identify: (properties: Record<string, unknown>) => void
  }
}
