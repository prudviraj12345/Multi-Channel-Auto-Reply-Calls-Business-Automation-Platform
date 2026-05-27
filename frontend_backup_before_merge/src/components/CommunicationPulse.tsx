import { motion } from 'framer-motion'

const channels = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'email', label: 'Email' },
  { id: 'voice', label: 'Voice' },
]

export default function CommunicationPulse() {
  return (
    <div className="w-64 p-4 bg-black/60 backdrop-blur rounded-2xl border border-black/20 text-sm">
      <h3 className="text-white/90 font-medium mb-3">Communication Pulse</h3>
      <div className="space-y-3">
        {channels.map((c, i) => (
          <div key={c.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-700 to-cyan-500 flex items-center justify-center text-[10px] font-semibold text-white/95">{c.label[0]}</div>
              <div className="text-white/80">{c.label}</div>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: [0.9, 1.1, 0.95], opacity: [0.6, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.3 }}
              className="w-24 h-3 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
