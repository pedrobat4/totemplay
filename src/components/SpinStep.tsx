import { useState } from 'react'
import { motion } from 'framer-motion'
import { tw } from '../twind'
import { STORES } from '../data'
import { Wheel, SEG } from './Wheel'
import { PrimaryButton } from './PrimaryButton'

type Props = {
  favoriteId: number
  onWin: () => void
}

export function SpinStep({ favoriteId, onWin }: Props) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [done, setDone] = useState(false)
  const store = STORES.find((s) => s.id === favoriteId)!

  function spin() {
    if (spinning || done) return
    const idx = STORES.findIndex((s) => s.id === favoriteId)
    const centerAngle = idx * SEG + SEG / 2
    // 6 full turns, then align the favorite segment center under the top pointer
    const target = 360 * 6 - centerAngle
    setSpinning(true)
    setRotation(target)
    setTimeout(() => {
      setDone(true)
      setTimeout(onWin, 900)
    }, 5300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className={tw`flex flex-col items-center text-center`}
    >
      <h2 className={tw`font-display text-3xl font-bold text-ink`}>
        {done ? 'Boa!' : spinning ? 'Girando…' : 'Gire a roleta'}
      </h2>
      <p className={tw`mt-1 text-muted`}>
        Sua favorita:{' '}
        <span className={tw`font-bold text-gold`}>{store.name}</span> · {store.category}
      </p>

      <div className={tw`my-8`}>
        <Wheel rotation={rotation} favoriteId={favoriteId} spinning={spinning} />
      </div>

      <div className={tw`w-full max-w-sm`}>
        <PrimaryButton onClick={spin} disabled={spinning || done}>
          {done ? 'Você ganhou!' : spinning ? 'Boa sorte…' : 'GIRAR'}
        </PrimaryButton>
      </div>
    </motion.div>
  )
}
