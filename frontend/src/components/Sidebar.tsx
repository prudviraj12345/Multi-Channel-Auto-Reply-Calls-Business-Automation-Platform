export default function Sidebar() {
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
