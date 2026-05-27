import { platformOrder, platformContent, type PlatformId } from '@/components/workspace/platformData'
import type { FeedEvent } from '@/lib/activityBus'
import { pushEvent } from '@/lib/activityBus'
import type { ScenarioId } from '@/lib/scenarios'

type IncomingCallback = (ev: {
  platform: PlatformId
  message: string
  sentiment: string
  intent: string
}) => void

let tId: number | null = null

const createEventId = (scope: string) => `${scope}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const samples: Record<PlatformId, string[]> = {
  whatsapp: [
    'Can you share the updated headcount and budget breakdown?',
    'We need that revised budget by EOD — can you confirm?',
    'Is there flexibility on the support headcount for Q3?'
  ],
  instagram: [
    'Loved the demo reel — can you send a quick feature list?',
    'Do you offer a trial for product recommendations?',
    'Is there a case study for creative teams?'
  ],
  linkedin: [
    'Interested in enterprise onboarding — who can we contact?',
    'Can you share ROI proof points for sales ops?',
    'Looking for a pilot for our RevOps team.'
  ],
  email: [
    'Could you provide an implementation timeline and owners?',
    'Requesting security summary and SLAs before procurement.',
    'Please attach onboarding checklist and milestones.'
  ],
  voice: [
    'Call: What happens after-hours if the AI needs escalation?',
    'Call: We need a short summary of routing rules.',
    'Call: Can you recap the demo and next steps?'
  ],
}

const sentiments = ['positive', 'neutral', 'negative']
const intents = ['product education', 'resource allocation', 'support routing', 'implementation planning', 'enterprise evaluation']

export function startIncomingEvents(cb: IncomingCallback, scenario: ScenarioId = 'sales') {
  if (tId) return

  tId = window.setInterval(() => {
    // pick a random platform (biased to active platforms)
    const platform = platformOrder[Math.floor(Math.random() * platformOrder.length)]
    const messages = samples[platform]
    // slight scenario tweak: alter message templates based on scenario
    const baseMessage = messages[Math.floor(Math.random() * messages.length)]
    const message = `${baseMessage} [mode:${scenario}]`
    const sentiment = `${sentiments[Math.floor(Math.random() * sentiments.length)]} ${(
      Math.random() * 0.2 + 0.8
    ).toFixed(2)}`
    // select intent with small scenario bias
    const intentPool = scenario === 'support' ? ['support routing', 'implementation planning', 'product education'] : intents
    const intent = intentPool[Math.floor(Math.random() * intentPool.length)]

    // notify UI
    cb({ platform, message, sentiment, intent })

    // push to activity feed
    const feed: FeedEvent = {
      id: createEventId(`${platform}-incoming`),
      title: `${platformContent[platform].label} incoming`,
      detail: message,
      time: new Date().toLocaleTimeString(),
      tone: 'accent',
    }
    pushEvent(feed)

    // push an AI analysis event shortly after
    setTimeout(() => {
      pushEvent({
        id: createEventId(`${platform}-analysis`),
        title: 'AI analysis',
        detail: `Sentiment: ${sentiment} · Intent: ${intent}`,
        time: new Date().toLocaleTimeString(),
        tone: 'sky',
      })
    }, 700)
  }, 4200)
}

export function stopIncomingEvents() {
  if (!tId) return
  window.clearInterval(tId)
  tId = null
}
