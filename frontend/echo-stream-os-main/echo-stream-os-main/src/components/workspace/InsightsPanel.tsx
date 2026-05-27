import { motion } from "motion/react";

const signals = [
  {
    title: "LinkedIn engagement",
    detail: "Liked &lsquo;The Future of AI Core&rsquo; post 2m ago",
  },
  { title: "Calendar match", detail: "Free tomorrow at 14:00 EST" },
  { title: "Voice intent detected", detail: "Discussed Q3 budget on call 4h ago" },
];

export function InsightsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col gap-6 rounded-3xl border border-white/5 bg-surface/40 p-6"
    >
      <div className="space-y-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          Recent signals
        </div>
        <div className="space-y-2">
          {signals.map((s, i) => (
            <div
              key={s.title}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-3"
              style={{ opacity: 1 - i * 0.15 }}
            >
              <div className="text-xs font-medium text-white/80">{s.title}</div>
              <div
                className="mt-0.5 text-[10px] text-white/40"
                dangerouslySetInnerHTML={{ __html: s.detail }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
          Communication mix · 24h
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { v: "42", l: "DMs" },
            { v: "12", l: "Calls" },
            { v: "8", l: "Threads" },
            { v: "3", l: "Workflows" },
          ].map((t) => (
            <div
              key={t.l}
              className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-white/5 bg-canvas/60"
            >
              <div className="text-2xl font-light text-white/90">{t.v}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-white/30">
                {t.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
          <span className="text-white/30">Probability to close</span>
          <span className="text-amber-glow">84%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "84%" }}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-amber-glow"
          />
        </div>
      </div>
    </motion.div>
  );
}
