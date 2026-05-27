import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const states = [
  'Analyzing customer intent',
  'Predicting lead conversion',
  'Optimizing response timing',
  'Updating CRM',
  'Generating workflow',
]

export default function AIThinking() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % states.length), 4200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="w-64 p-3 bg-black/50 backdrop-blur rounded-xl border border-black/20 flex items-center gap-3">
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white font-semibold"
        animate={{ rotate: [0, 12, -8, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        AI
      </motion.div>
      <div>
        <div className="text-white/90 font-medium">System Intelligence</div>
        <div className="text-white/50 text-sm mt-1">{states[idx]}</div>
      </div>
    </div>
  )
}
