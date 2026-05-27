import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { PlatformContent } from './platformData'
import { subscribe, type FeedEvent } from '@/lib/activityBus'

type ActivityTickerProps = {
  content: PlatformContent
  orchestration?: {
    stage: string
    pulse: number
    activityLabel: string
    workflowLabel: string
  }
  className?: string
}


const liveScripts: Record<
  PlatformContent['id'],
  Array<{ title: string; detail: string; tone: FeedEvent['tone'] }>
> = {
  whatsapp: [
    { title: 'WhatsApp lead captured', detail: 'Marcus Thorne engaged with the pricing summary', tone: 'emerald' },
    { title: 'CRM updated', detail: 'Contact score increased after the latest reply', tone: 'sky' },
    { title: 'AI follow-up triggered', detail: 'Budget revision message queued for send', tone: 'accent' },
    { title: 'Booking scheduled', detail: 'Demo invite held for Tuesday 10:00 AM', tone: 'amber' },
  ],
  instagram: [
    { title: 'Instagram inquiry classified', detail: 'Ava Stone mapped to product education', tone: 'emerald' },
    { title: 'AI follow-up triggered', detail: 'Carousel response generated from reel engagement', tone: 'accent' },
    { title: 'CRM updated', detail: 'Profile tagged with high-intent creative lead', tone: 'sky' },
    { title: 'Booking scheduled', detail: 'Walkthrough slot confirmed for tomorrow', tone: 'amber' },
  ],
  linkedin: [
    { title: 'LinkedIn inquiry classified', detail: 'Noah Bennett scored for enterprise evaluation', tone: 'emerald' },
    { title: 'CRM updated', detail: 'Account linked to sales ops opportunity', tone: 'sky' },
    { title: 'AI follow-up triggered', detail: 'Proof-of-value note dispatched to InMail', tone: 'accent' },
    { title: 'Booking scheduled', detail: 'Executive discovery call reserved for Friday', tone: 'amber' },
  ],
  email: [
    { title: 'Email reply parsed', detail: 'Priya Kapoor requested onboarding milestones', tone: 'emerald' },
    { title: 'CRM updated', detail: 'Implementation plan tasks attached to account', tone: 'sky' },
    { title: 'AI follow-up triggered', detail: 'Sequence draft assembled for procurement', tone: 'accent' },
    { title: 'Booking scheduled', detail: 'Planning session blocked on the calendar', tone: 'amber' },
  ],
  voice: [
    { title: 'Voice call summarized', detail: 'Daniel Reed asked for after-hours routing rules', tone: 'emerald' },
    { title: 'CRM updated', detail: 'Transcript and action items synced to the record', tone: 'sky' },
    { title: 'AI follow-up triggered', detail: 'Support recap prepared for the customer success team', tone: 'accent' },
    { title: 'Booking scheduled', detail: 'Support review meeting reserved for next week', tone: 'amber' },
  ],
}

const formatTime = () =>
  new Intl.DateTimeFormat([], {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date())

function buildInitialFeed(content: PlatformContent): FeedEvent[] {
  return content.ticker.map((item, index) => ({
    id: `${content.id}-seed-${index}`,
    title: item.label,
    detail: content.executionNote,
    time: item.time,
    tone: item.color.includes('emerald')
      ? 'emerald'
      : item.color.includes('sky')
        ? 'sky'
        : item.color.includes('amber')
          ? 'amber'
          : 'accent',
  }))
}

export function ActivityTicker({ content, orchestration, className }: ActivityTickerProps) {
  const [events, setEvents] = useState<FeedEvent[]>(() => buildInitialFeed(content))

  useEffect(() => {
    setEvents(buildInitialFeed(content))

    const timer = window.setInterval(() => {
      const script = liveScripts[content.id][Math.floor(Math.random() * liveScripts[content.id].length)]

      setEvents((current) => [
        {
          id: `${content.id}-${Date.now()}`,
          title: script.title,
          detail: script.detail,
          time: formatTime(),
          tone: script.tone,
        },
        ...current,
      ].slice(0, 5))
    }, 3200)

    const unsub = subscribe((e) => {
      if (!e) return
      setEvents((s) => [e, ...s].slice(0, 5))
    })

    return () => {
      window.clearInterval(timer)
      unsub()
    }
  }, [content])

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className={`pointer-events-auto relative z-10 w-full ${className ?? ''}`}
    >
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-canvas/82 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
              <span className="size-2 rounded-full bg-accent animate-pulse-dot" />
              Live AI activity feed
            </div>
              <p className="mt-1 text-sm text-white/70">{orchestration?.workflowLabel ?? content.commandSubtitle}</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent/90">
              {content.label} · {orchestration?.stage ?? 'idle'} · {orchestration?.pulse ?? 42}%
          </div>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={content.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-2 p-4 md:grid-cols-2 xl:grid-cols-5"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: 0.35, delay: index * 0.02, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-[84px] flex-col justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1 size-2 rounded-full ${
                      event.tone === 'emerald'
                        ? 'bg-emerald-400'
                        : event.tone === 'sky'
                          ? 'bg-sky-400'
                          : event.tone === 'amber'
                            ? 'bg-amber-400'
                            : 'bg-accent'
                    } ${index === 0 ? 'animate-pulse-dot' : ''}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white/90">{event.title}</div>
                    <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/52">{event.detail}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
                  <span>{content.label}</span>
                  <span>{event.time}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
