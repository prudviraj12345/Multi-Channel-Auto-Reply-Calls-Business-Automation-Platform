import { AnimatePresence, motion } from 'motion/react'
import type { PlatformContent } from './platformData'

type InsightsPanelProps = {
  content: PlatformContent
  orchestration?: {
    sentiment: string
    intent: string
    pulse: number
    activityLabel: string
    workflowLabel: string
    communicationMix: { value: string; label: string }[]
    workflowTone: 'accent' | 'emerald' | 'sky' | 'amber'
  }
}

export function InsightsPanel({ content, orchestration }: InsightsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col gap-6 rounded-3xl border border-white/5 bg-surface/40 p-6"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={content.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              {content.recentSignalsTitle}
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">Live intelligence</div>
              <div className="mt-2 flex items-center justify-between text-sm text-white/80">
                <span>{orchestration?.activityLabel ?? content.commandSubtitle}</span>
                <span className={`font-mono text-[10px] uppercase tracking-wider ${orchestration?.workflowTone === 'emerald' ? 'text-emerald-300' : orchestration?.workflowTone === 'sky' ? 'text-sky-300' : orchestration?.workflowTone === 'amber' ? 'text-amber-300' : 'text-accent'}`}>
                  {orchestration?.pulse ?? 42}%
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] uppercase tracking-wider text-white/45">
                <span>Sentiment · {orchestration?.sentiment ?? content.conversation.sentiment}</span>
                <span>Intent · {orchestration?.intent ?? content.conversation.intent}</span>
              </div>
            </div>
            <div className="space-y-2">
              {content.signals.map((signal, index) => (
                <div
                  key={signal.title}
                  className="rounded-xl border border-white/5 bg-white/[0.03] p-3"
                  style={{ opacity: 1 - index * 0.15 }}
                >
                  <div className="text-xs font-medium text-white/80">{signal.title}</div>
                  <div className="mt-0.5 text-[10px] text-white/40">{signal.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
              Communication mix · 24h
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(orchestration?.communicationMix ?? content.metrics).map((metric) => (
                <div
                  key={metric.label}
                  className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-white/5 bg-canvas/60"
                >
                  <div className="text-2xl font-light text-white/90">{metric.value}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-white/30">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
              <span className="text-white/30">Probability to close</span>
              <span className="text-amber-glow">{content.closeProbability}</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: content.closeProbability }}
                transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-amber-glow"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
