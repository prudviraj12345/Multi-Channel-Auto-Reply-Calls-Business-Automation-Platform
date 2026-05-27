import { AnimatePresence, motion } from 'motion/react'

type CommandBarProps = {
  title: string
  subtitle: string
}

export function CommandBar({ title, subtitle }: CommandBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-3xl bg-accent/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center gap-4 rounded-3xl border border-white/5 bg-surface/60 p-6 shadow-2xl backdrop-blur-sm">
        <span className="size-3 rounded-full bg-accent animate-pulse-dot" aria-hidden />
        <div className="flex flex-col gap-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl font-medium tracking-tight text-white/90"
            >
              {title}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={subtitle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30"
            >
              {subtitle}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/40">⌘</kbd>
          <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/40">K</kbd>
        </div>
      </div>
    </motion.div>
  )
}
