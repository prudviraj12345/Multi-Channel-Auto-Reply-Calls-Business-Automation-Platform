import { motion } from "motion/react";

export function CommandBar() {
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
        <p className="text-2xl font-medium tracking-tight text-white/90">
          What should we prioritize today?
        </p>
        <div className="ml-auto flex items-center gap-1.5">
          <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/40">
            ⌘
          </kbd>
          <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/40">
            K
          </kbd>
        </div>
      </div>
    </motion.div>
  );
}
