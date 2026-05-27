import { motion } from 'motion/react'
import type { ScenarioId } from '@/lib/scenarios'

type Props = {
  active: ScenarioId
  onSelect: (s: ScenarioId) => void
}

export function ScenarioSelector({ active, onSelect }: Props) {
  const list: { id: ScenarioId; label: string }[] = [
    { id: 'sales', label: 'Sales' },
    { id: 'support', label: 'Support' },
    { id: 'booking', label: 'Booking' },
    { id: 'enterprise', label: 'Enterprise' },
  ]

  return (
    <motion.div className="flex gap-2">
      {list.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`rounded-xl px-3 py-1 text-sm font-medium transition-shadow ${active === s.id ? 'bg-accent text-canvas shadow-lg' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
        >
          {s.label}
        </button>
      ))}
    </motion.div>
  )
}
