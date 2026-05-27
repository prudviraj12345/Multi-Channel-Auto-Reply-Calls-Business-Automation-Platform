// Component is intentionally small and uses the automatic JSX runtime

export default function IntelligenceBadge({
  sentiment = 'Neutral',
  urgency = 'Low',
  intent = 'Inquiry',
  confidence = 0.78,
  conversion = 0.12,
}: {
  sentiment?: string
  urgency?: string
  intent?: string
  confidence?: number
  conversion?: number
}) {
  return (
    <div className="w-48 p-3 bg-black/55 rounded-xl border border-black/20">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white/90 font-medium">AI Intelligence</div>
          <div className="text-white/40 text-xs">Contextual indicators</div>
        </div>
        <div className="text-white/80 font-semibold text-lg">{Math.round(confidence * 100)}%</div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/60">
        <div>Sentiment: <span className="text-white/90">{sentiment}</span></div>
        <div>Urgency: <span className="text-white/90">{urgency}</span></div>
        <div>Intent: <span className="text-white/90">{intent}</span></div>
        <div>Conversion: <span className="text-white/90">{Math.round(conversion * 100)}%</span></div>
      </div>
    </div>
  )
}
