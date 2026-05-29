import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { tw } from '../twind'
import { STORES, PRIZE_PERCENT } from '../data'
import { FakeQR } from './FakeQR'
import { PrimaryButton } from './PrimaryButton'

function fireCelebration() {
  const end = Date.now() + 1400
  const colors = ['#a98bff', '#8b6dff', '#e9b96e', '#ffffff']
  // burst from center
  confetti({ particleCount: 130, spread: 90, origin: { y: 0.4 }, colors, scalar: 1.1 })
  // side cannons loop
  ;(function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors })
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

function useCountUp(target: number, duration = 1100) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

export function PrizeStep({ favoriteId, onRestart }: { favoriteId: number; onRestart: () => void }) {
  const store = STORES.find((s) => s.id === favoriteId)!
  const pct = useCountUp(PRIZE_PERCENT)

  useEffect(() => {
    fireCelebration()
    const t = setTimeout(fireCelebration, 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={tw`flex flex-col items-center text-center`}>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={tw`font-display tracking-[0.3em] text-xs text-gold uppercase`}
      >
        Parabéns, você ganhou
      </motion.p>

      {/* Prize ticket — 3D flip in */}
      <motion.div
        initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 0.15 }}
        style={{ perspective: 1000 }}
        className={tw`relative mt-5 w-full max-w-sm`}
      >
        <div
          className={tw`relative overflow-hidden rounded-3xl border border-violet/40 p-7`}
          style={{
            background: 'linear-gradient(150deg, rgba(124,92,255,.18), rgba(91,63,214,.06))',
            boxShadow: '0 30px 80px rgba(124,92,255,.4)',
          }}
        >
          {/* shimmer sweep */}
          <div
            className={tw`pointer-events-none absolute inset-0 animate-shimmer`}
            style={{
              background:
                'linear-gradient(110deg, transparent 35%, rgba(255,255,255,.14) 50%, transparent 65%)',
              backgroundSize: '200% 100%',
            }}
          />
          {/* perforation notches */}
          <span className={tw`absolute left-[-12px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-bg2`} />
          <span className={tw`absolute right-[-12px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-bg2`} />

          <div className={tw`text-sm font-semibold tracking-wide text-violet-bright`}>VALE-DESCONTO</div>
          <div
            className={tw`my-2 font-display text-7xl font-bold leading-none`}
            style={{
              background: 'linear-gradient(120deg, #fff, #a98bff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {pct}% <span className={tw`text-4xl`}>OFF</span>
          </div>
          <div className={tw`mt-3 flex items-center justify-center gap-2 text-ink`}>
            <span
              className={tw`flex h-7 w-7 items-center justify-center rounded-lg font-display text-xs font-bold text-bg`}
              style={{ background: store.color }}
            >
              {store.id}
            </span>
            <span className={tw`font-bold`}>{store.name}</span>
            <span className={tw`text-muted`}>· {store.floor}</span>
          </div>
        </div>
      </motion.div>

      {/* QR + instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={tw`mt-6 flex items-center gap-4 rounded-2xl border border-violet/20 bg-white/[.03] p-4`}
      >
        <FakeQR seed={favoriteId * 31 + 5} />
        <div className={tw`max-w-[180px] text-left`}>
          <div className={tw`font-bold text-ink`}>Retire na loja</div>
          <p className={tw`mt-1 text-sm text-muted`}>
            Mostre este QR Code no caixa da {store.name} para validar seus {PRIZE_PERCENT}% de desconto.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className={tw`mt-7 w-full max-w-sm`}
      >
        <PrimaryButton variant="ghost" onClick={onRestart}>
          Nova jogada
        </PrimaryButton>
      </motion.div>
    </div>
  )
}
