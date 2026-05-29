import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { tw } from './twind'
import { Pitch } from './components/Pitch'
import { TotemDemo } from './components/TotemDemo'

type Mode = 'pitch' | 'demo'

export function App() {
  const [mode, setMode] = useState<Mode>('pitch')

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className={tw`h-full`}
      >
        {mode === 'pitch' ? (
          <Pitch onSeeDemo={() => setMode('demo')} />
        ) : (
          <TotemDemo onExit={() => setMode('pitch')} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
