import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { tw } from './twind'
import { Pitch } from './components/Pitch'
import { TotemDemo } from './components/TotemDemo'
import { Socios } from './components/Socios'

type Mode = 'pitch' | 'demo' | 'socios'

function modeFromPath(): Mode {
  return window.location.pathname.replace(/\/+$/, '') === '/socios' ? 'socios' : 'pitch'
}

export function App() {
  const [mode, setMode] = useState<Mode>(modeFromPath)

  // Keep mode in sync with browser back/forward.
  useEffect(() => {
    const onPop = () => setMode(modeFromPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (next: Mode) => {
    const path = next === 'socios' ? '/socios' : '/'
    if (window.location.pathname.replace(/\/+$/, '') !== path.replace(/\/+$/, '')) {
      window.history.pushState({}, '', path)
    }
    setMode(next)
  }

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
          <Pitch onSeeDemo={() => navigate('demo')} />
        ) : mode === 'demo' ? (
          <TotemDemo onExit={() => navigate('pitch')} />
        ) : (
          <Socios onHome={() => navigate('pitch')} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
