import { motion } from "motion/react";
import personaImg from "@/assets/persona-marcus.jpg";

export function LeadPersona() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center rounded-3xl border border-white/5 bg-surface/40 p-6 text-center"
    >
      <div className="relative mb-4 size-24 rounded-full border border-white/10 bg-canvas p-1">
        <img
          src={personaImg}
          alt="Marcus Thorne"
          width={512}
          height={512}
          loading="lazy"
          className="size-full rounded-full object-cover"
        />
        <span className="absolute bottom-0.5 right-0.5 size-4 rounded-full border-[3px] border-canvas bg-emerald-500 shadow-lg shadow-emerald-500/30" />
      </div>
      <h3 className="text-base font-semibold text-white/90">Marcus Thorne</h3>
      <p className="mb-4 text-xs text-white/40">CEO · Zenith Labs</p>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`size-1.5 rounded-full ${i < 3 ? "bg-accent" : "bg-white/10"}`}
          />
        ))}
      </div>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-white/30">
        Lead confidence · 62%
      </span>
    </motion.div>
  );
}
