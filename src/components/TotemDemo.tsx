import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { tw } from '../twind'
import { Background } from './Background'
import { Logo } from './Logo'
import { StepDots } from './StepDots'
import { AttractScreen } from './AttractScreen'
import { RegisterStep } from './RegisterStep'
import { FavoriteStep } from './FavoriteStep'
import { SpinStep } from './SpinStep'
import { PrizeStep } from './PrizeStep'

type Step = 0 | 1 | 2 | 3 | 4

export function TotemDemo({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState<Step>(0)
  const [favorite, setFavorite] = useState<number | null>(null)

  function reset() {
    setFavorite(null)
    setStep(0)
  }

  return (
    <div className={tw`relative min-h-full font-sans text-ink`}>
      <Background />

      <main className={tw`relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-7`}>
        <header className={tw`flex items-center justify-between`}>
          <Logo size="sm" />
          <div className={tw`flex items-center gap-2`}>
            {step > 0 && (
              <button
                onClick={reset}
                className={tw`rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold text-muted transition hover:text-ink`}
              >
                Recomeçar
              </button>
            )}
            <button
              onClick={onExit}
              className={tw`rounded-full border border-violet/30 bg-violet/10 px-4 py-1.5 text-xs font-semibold text-violet-bright transition hover:bg-violet/20`}
            >
              ← Apresentação
            </button>
          </div>
        </header>

        <div className={tw`flex flex-1 items-center justify-center py-6`}>
          <div
            className={tw`w-full rounded-[34px] border border-white/10 bg-black/30 p-6 backdrop-blur-sm sm:p-9`}
            style={{ boxShadow: '0 40px 120px rgba(0,0,0,.5), inset 0 0 0 1px rgba(124,92,255,.08)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={step}>
                {step === 0 && <AttractScreen onStart={() => setStep(1)} />}
                {step === 1 && <RegisterStep onNext={() => setStep(2)} />}
                {step === 2 && (
                  <FavoriteStep selected={favorite} onSelect={setFavorite} onNext={() => setStep(3)} />
                )}
                {step === 3 && favorite !== null && (
                  <SpinStep favoriteId={favorite} onWin={() => setStep(4)} />
                )}
                {step === 4 && favorite !== null && (
                  <PrizeStep favoriteId={favorite} onRestart={reset} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className={tw`pb-2`}>
          <StepDots step={step} />
        </footer>
      </main>
    </div>
  )
}
