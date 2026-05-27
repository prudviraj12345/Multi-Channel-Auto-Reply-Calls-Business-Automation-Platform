import { motion } from 'motion/react'
import { platformContent, platformOrder, type PlatformId } from './platformData'

type NavRailProps = {
  activePlatform: PlatformId
  onSelectPlatform: (platform: PlatformId) => void
}

export function NavRail({ activePlatform, onSelectPlatform }: NavRailProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-6 rounded-2xl border border-white/5 bg-surface/40 px-3 py-6 ring-1 ring-white/5 backdrop-blur-md"
      aria-label="Primary"
    >
      <div className="flex size-10 cursor-pointer items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/30">
        <div className="size-3.5 rounded-full bg-canvas" />
      </div>

      <div className="flex flex-col gap-3">
        {platformOrder.map((platform) => {
          const item = platformContent[platform]
          const active = platform === activePlatform

          return (
            <button
              key={item.label}
              aria-label={item.label}
              onClick={() => onSelectPlatform(platform)}
              className={`group relative flex size-10 items-center justify-center rounded-xl transition-colors ${
                active ? 'text-white' : 'text-white/40 hover:text-white/80'
              }`}
            >
              {active && <motion.span layoutId="active-rail-indicator" className="absolute -left-3 h-5 w-[2px] rounded-full bg-accent" />}
              <span className="text-[18px] leading-none">{item.icon}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <button aria-label="Settings" className="flex size-10 items-center justify-center rounded-xl text-white/40 transition-colors hover:text-white/80">
          <span className="text-[18px] leading-none">⚙</span>
        </button>
        <div className="size-10 rounded-full border border-white/10 bg-surface-bright" />
      </div>
    </motion.nav>
  );
}
