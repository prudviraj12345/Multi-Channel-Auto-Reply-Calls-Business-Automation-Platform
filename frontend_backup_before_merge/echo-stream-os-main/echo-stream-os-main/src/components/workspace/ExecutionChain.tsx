import { motion } from "motion/react";

const steps = [
  { n: 1, label: "Parse", status: "active" as const },
  { n: 2, label: "Draft", status: "pending" as const },
  { n: 3, label: "Sync CRM", status: "pending" as const },
  { n: 4, label: "Notify", status: "pending" as const },
];

export function ExecutionChain() {
  return (
    <div>
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
        Execution chain · live
      </div>
      <div className="flex items-center gap-3">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className={`flex size-9 items-center justify-center rounded-lg border bg-surface-bright font-mono text-xs ${
                s.status === "active"
                  ? "border-accent/40 text-accent ring-1 ring-accent/30"
                  : "border-white/10 text-white/25"
              }`}
            >
              {s.n}
            </motion.div>
            {i < steps.length - 1 && (
              <div
                className={`h-px w-10 ${
                  s.status === "active" ? "bg-accent/40" : "bg-white/5"
                }`}
              />
            )}
          </div>
        ))}
        <div className="ml-4 font-mono text-xs text-white/40">
          Parsing contract clauses
          <span className="ml-1 inline-block animate-pulse">·</span>
        </div>
      </div>
    </div>
  );
}
