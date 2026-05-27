import { motion } from "motion/react";
import { ExecutionChain } from "./ExecutionChain";

function IncomingMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex max-w-[80%] flex-col gap-3"
    >
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
        <span>WhatsApp</span>
        <span className="size-1 rounded-full bg-white/20" />
        <span>Marcus Thorne</span>
        <span className="size-1 rounded-full bg-white/20" />
        <span className="text-accent">Live thread</span>
      </div>
      <div className="rounded-2xl rounded-tl-none border border-white/5 bg-surface/80 p-5 leading-relaxed text-slate-200">
        The quarterly roadmap looks solid. Can we adjust the Q3 hiring targets to reflect the new
        AI core team expansion?
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
          Sentiment · positive 0.94
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          Intent · resource allocation
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          Urgency · medium
        </span>
      </div>
    </motion.div>
  );
}

function AIMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex max-w-[80%] flex-col items-end gap-4 self-end"
    >
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-glow">
        <span>Aether Intelligence</span>
        <span className="size-1.5 rounded-full bg-amber-glow animate-pulse-dot" />
        <span className="text-white/30">drafting</span>
      </div>
      <div className="relative rounded-3xl rounded-tr-none border border-accent/20 bg-accent/[0.06] p-6 shadow-[0_0_60px_rgba(20,184,166,0.06)]">
        <p className="shimmer-text text-xl font-medium leading-snug">
          I&rsquo;ve drafted a revised budget for Q3. Total headcount increased by 4, offset by
          automation efficiencies in support. Shall I commit to the workflow?
        </p>
      </div>
      <div className="flex gap-2">
        <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-canvas transition-transform hover:scale-[1.02]">
          Execute revision
        </button>
        <button className="rounded-xl border border-white/10 bg-surface px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/5">
          Modify parameters
        </button>
      </div>
    </motion.div>
  );
}

export function ConversationCanvas() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-1 flex-col gap-10 overflow-y-auto rounded-3xl border border-white/5 bg-surface/30 p-8"
    >
      <IncomingMessage />
      <AIMessage />
      <div className="mt-auto pt-8">
        <div className="border-t border-white/5 pt-6">
          <ExecutionChain />
        </div>
      </div>
    </motion.div>
  );
}
