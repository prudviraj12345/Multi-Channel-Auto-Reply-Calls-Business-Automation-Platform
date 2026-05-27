import { motion } from 'framer-motion'

function ProfileCard() {
  return (
    <div className="p-4 bg-black/50 rounded-2xl border border-black/20">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-sm font-semibold">MT</div>
        <div>
          <div className="text-sm font-semibold">Marcus Thorne</div>
          <div className="text-xs text-white/60">CEO · Zenith Labs</div>
        </div>
      </div>
      <div className="mt-4 text-xs text-white/60">Lead confidence · <span className="text-white">62%</span></div>
    </div>
  )
}

export default function RightPanel() {
  return (
    <aside className="fixed right-6 top-8 w-80 flex flex-col gap-4 z-30">
      <ProfileCard />

      <div className="p-4 bg-black/40 rounded-2xl border border-black/20">
        <div className="text-xs text-white/70 font-medium mb-3">Recent Signals</div>
        <div className="space-y-2">
          <div className="p-2 rounded-md bg-black/30">LinkedIn engagement — Liked "The Future of AI Core" post 2m ago</div>
          <div className="p-2 rounded-md bg-black/30">Calendar match — Free tomorrow at 14:00 EST</div>
          <div className="p-2 rounded-md bg-black/30">Voice intent detected — Discussed Q3 budget on call 4h ago</div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-black/30 rounded-2xl border border-black/20">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-4 bg-black/20 rounded-lg">42<br/><span className="text-xs text-white/60">DMS</span></div>
          <div className="p-4 bg-black/20 rounded-lg">12<br/><span className="text-xs text-white/60">CALLS</span></div>
          <div className="p-4 bg-black/20 rounded-lg">8<br/><span className="text-xs text-white/60">THREADS</span></div>
          <div className="p-4 bg-black/20 rounded-lg">3<br/><span className="text-xs text-white/60">WORKFLOWS</span></div>
        </div>
      </motion.div>
    </aside>
  )
}
