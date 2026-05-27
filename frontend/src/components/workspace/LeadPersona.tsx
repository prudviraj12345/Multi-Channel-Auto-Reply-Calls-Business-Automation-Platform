import { AnimatePresence, motion } from 'motion/react'
import personaImg from '@/assets/persona-marcus.jpg'
import type { PlatformContent } from './platformData'

type LeadPersonaProps = {
  content: PlatformContent
  orchestration?: {
    leadStatus: string
    pulse: number
    stage: string
  }
}

export function LeadPersona({ content, orchestration }: LeadPersonaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center rounded-3xl border border-white/5 bg-surface/40 p-6 text-center"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={content.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="contents"
        >
          <div className="relative mb-4 size-24 rounded-full border border-white/10 bg-canvas p-1">
            <img
              src={personaImg}
              alt={content.personaName}
              width={512}
              height={512}
              loading="lazy"
              className="size-full rounded-full object-cover"
            />
            <span className="absolute bottom-0.5 right-0.5 size-4 rounded-full border-[3px] border-canvas bg-emerald-500 shadow-lg shadow-emerald-500/30" />
          </div>
          <h3 className="text-base font-semibold text-white/90">{content.personaName}</h3>
          <p className="mb-4 text-xs text-white/40">{content.personaTitle}</p>
          <div className="mb-4 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            {orchestration?.leadStatus ?? 'Stable'} · {orchestration?.stage ?? 'idle'}
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`size-1.5 rounded-full transition-colors ${i < Math.max(2, Math.round((orchestration?.pulse ?? 42) / 24)) ? 'bg-accent' : 'bg-white/10'}`}
              />
            ))}
          </div>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-white/30">
            Lead confidence · {content.personaConfidence}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
