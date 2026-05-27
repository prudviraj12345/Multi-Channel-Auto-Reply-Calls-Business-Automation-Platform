type FeedEvent = {
  id: string
  title: string
  detail: string
  time: string
  tone: 'accent' | 'emerald' | 'sky' | 'amber'
}

const listeners: Array<(e: FeedEvent) => void> = []

export function subscribe(fn: (e: FeedEvent) => void) {
  listeners.push(fn)
  return () => {
    const idx = listeners.indexOf(fn)
    if (idx >= 0) listeners.splice(idx, 1)
  }
}

export function pushEvent(e: FeedEvent) {
  listeners.slice().forEach((fn) => fn(e))
}

export type { FeedEvent }
