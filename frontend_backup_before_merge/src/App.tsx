import CommunicationPulse from './components/CommunicationPulse'
import ActivityStream from './components/ActivityStream'
import AIThinking from './components/AIThinking'
import Timeline from './components/Timeline'
import IntelligenceBadge from './components/IntelligenceBadge'
// Inline Sidebar and RightPanel to avoid module resolution issues in some editors
function Sidebar() {
  return (
    <aside className="fixed left-6 top-8 w-14 flex flex-col items-center gap-4 z-40">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900/80 to-black/60 border border-black/20 flex items-center justify-center shadow-lg">
        <div className="w-10 h-10 rounded-lg bg-teal-500/95 flex items-center justify-center text-xs font-semibold text-black">A</div>
      </div>

      <div className="w-12 h-12 rounded-xl bg-black/50 border border-black/20 flex items-center justify-center text-white/80">▦</div>
      <div className="w-12 h-12 rounded-xl bg-black/50 border border-black/20 flex items-center justify-center text-white/80">✱</div>
      <div className="w-12 h-12 rounded-xl bg-black/50 border border-black/20 flex items-center justify-center text-white/80">☎</div>
      <div className="w-12 h-12 rounded-xl bg-black/50 border border-black/20 flex items-center justify-center text-white/80">⋯</div>

      <div className="mt-6 w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-black/60 border border-black/20" />
    </aside>
  )
}

function RightPanel() {
  return (
    <aside className="fixed right-6 top-8 w-80 flex flex-col gap-4 z-30">
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

      <div className="p-4 bg-black/40 rounded-2xl border border-black/20">
        <div className="text-xs text-white/70 font-medium mb-3">Recent Signals</div>
        <div className="space-y-2">
          <div className="p-2 rounded-md bg-black/30">LinkedIn engagement — Liked "The Future of AI Core" post 2m ago</div>
          <div className="p-2 rounded-md bg-black/30">Calendar match — Free tomorrow at 14:00 EST</div>
          <div className="p-2 rounded-md bg-black/30">Voice intent detected — Discussed Q3 budget on call 4h ago</div>
        </div>
      </div>

      <div className="p-4 bg-black/30 rounded-2xl border border-black/20">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-4 bg-black/20 rounded-lg">42<br/><span className="text-xs text-white/60">DMS</span></div>
          <div className="p-4 bg-black/20 rounded-lg">12<br/><span className="text-xs text-white/60">CALLS</span></div>
          <div className="p-4 bg-black/20 rounded-lg">8<br/><span className="text-xs text-white/60">THREADS</span></div>
          <div className="p-4 bg-black/20 rounded-lg">3<br/><span className="text-xs text-white/60">WORKFLOWS</span></div>
        </div>
      </div>
    </aside>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#071021] to-[#000000] text-white p-6">
      <Sidebar />
      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6 pl-24">
        <div className="col-span-3 flex flex-col gap-4">
          <AIThinking />
          <CommunicationPulse />
          <div className="mt-auto">
            <IntelligenceBadge sentiment="Positive" urgency="Medium" intent="Purchase" confidence={0.87} conversion={0.34} />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <div className="p-6 bg-black/40 rounded-3xl border border-black/20 min-h-[420px]">
            <div className="text-xs text-white/50 mb-3">WHATSAPP · MARCUS THORNE · LIVE THREAD</div>

            <div className="p-4 bg-black/30 rounded-lg text-white/80 mb-6">The quarterly roadmap looks solid. Can we adjust the Q3 hiring targets to reflect the new AI core team expansion?</div>

            <div className="p-6 bg-gradient-to-br from-transparent to-slate-900/30 rounded-2xl border border-teal-600/20 text-white/90 mb-4">
              I&apos;ve drafted a revised budget for Q3. Total headcount increased by 4, offset by automation efficiencies in support. Shall I commit to the workflow?
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-emerald-400 text-black rounded-full">Execute revision</button>
              <button className="px-4 py-2 bg-transparent border border-black/10 rounded-full">Modify parameters</button>
            </div>
          </div>

          <Timeline />
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <ActivityStream />
          <div className="h-4" />
          <div className="p-2" />
        </div>
      </div>
      <RightPanel />
    </div>
  )
}

export default App