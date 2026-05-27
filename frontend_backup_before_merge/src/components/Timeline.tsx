import { useState } from 'react'
import { motion } from 'framer-motion'

type Entry = { id: string; time: string; content: string; kind?: string }

export default function Timeline() {
  const [entries] = useState<Entry[]>([
    { id: '1', time: '09:12', content: 'Customer: Hi, interested in pricing', kind: 'customer' },
    { id: '2', time: '09:12', content: 'AI: Classified intent=pricing', kind: 'ai' },
    { id: '3', time: '09:13', content: 'Automation: Follow-up scheduled', kind: 'automation' },
  ])

  return (
    <div className="w-full max-w-2xl p-4 bg-black/50 backdrop-blur rounded-2xl border border-black/20">
      <h3 className="text-white/90 font-medium mb-3">Omnichannel Timeline</h3>
      <div className="space-y-3">
        {entries.map((e) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 items-start"
          >
            <div className="w-2.5 mt-1 h-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400" />
            <div className="flex-1">
              <div className="text-white/70 text-xs">{e.time}</div>
              <div className="text-white/90">{e.content}</div>
            </div>
            <div className="text-white/40 text-xs">{e.kind}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
