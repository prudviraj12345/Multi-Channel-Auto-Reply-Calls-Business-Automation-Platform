import { motion } from "motion/react";

const events = [
  { color: "bg-sky-400", label: "LinkedIn message received", t: "2m" },
  { color: "bg-emerald-500", label: "WhatsApp quote approved", t: "10m" },
  { color: "bg-accent", label: "Drafting automation chain", t: "now", live: true },
];

export function ActivityTicker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="pointer-events-auto fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-6 rounded-full border border-white/10 bg-canvas/80 px-6 py-3 shadow-2xl backdrop-blur-xl"
    >
      {events.map((e, i) => (
        <div key={e.label} className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span
              className={`size-1.5 rounded-full ${e.color} ${e.live ? "animate-pulse-dot" : ""}`}
            />
            <span
              className={`font-mono text-[10px] tracking-tight uppercase ${
                e.live ? "text-accent" : "text-white/40"
              }`}
            >
              {e.label} · {e.t}
            </span>
          </div>
          {i < events.length - 1 && <span className="h-3 w-px bg-white/10" />}
        </div>
      ))}
    </motion.div>
  );
}
