import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Item = { id: string; text: string }

const samples: string[] = [
  'WhatsApp lead captured: +1•••234',
  'Instagram inquiry classified: product A',
  'Voice call summarized: 2 min, intent=pricing',
  'CRM updated: contact enriched',
  'Follow-up triggered: email sequence started',
  'Booking scheduled: demo on Tue 10:00'
]

export default function ActivityStream() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const t = setInterval(() => {
      const text = samples[Math.floor(Math.random() * samples.length)]
      setItems((s) => [{ id: String(Date.now()), text }, ...s].slice(0, 6))
    }, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="w-80 p-3 bg-black/60 backdrop-blur rounded-2xl border border-black/20">
      <h4 className="text-white/90 font-medium mb-2">AI Activity Stream</h4>
      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {items.map((it, idx) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, delay: idx * 0.03 }}
              className="flex items-start gap-3 bg-gradient-to-r from-white/3 to-transparent p-2 rounded-lg"
            >
              <div className="w-2 h-8 bg-emerald-400 rounded-full mt-1 animate-pulse" />
              <div className="flex-1">
                <div className="text-white/90 text-sm">{it.text}</div>
                <div className="text-white/40 text-xs mt-1">AI • {new Date(Number(it.id)).toLocaleTimeString()}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
