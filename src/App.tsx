import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { tw } from './twind'
import { Pitch } from './components/Pitch'
import { TotemDemo } from './components/TotemDemo'
import { Moc } from './components/Moc'
import { LojistaApresentacao } from './components/LojistaApresentacao'
import { LojistaExemplo } from './components/LojistaExemplo'

// /socios foi ocultado (deck interno/confidencial) — fora das rotas e do bundle.
type Mode = 'pitch' | 'demo' | 'moc' | 'lojista' | 'lojista-exemplo' | 'lojista-demo'

const PATHS: Partial<Record<Mode, string>> = {
  moc: '/moc',
  lojista: '/lojista',
  'lojista-exemplo': '/lojista/exemplo',
  'lojista-demo': '/lojista/demo',
}

function modeFromPath(): Mode {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '/moc') return 'moc'
  if (path === '/lojista') return 'lojista'
  if (path === '/lojista/exemplo') return 'lojista-exemplo'
  if (path === '/lojista/demo') return 'lojista-demo'
  return 'pitch'
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
    const path = PATHS[next] ?? '/'
    if (window.location.pathname.replace(/\/+$/, '') !== path.replace(/\/+$/, '')) {
      window.history.pushState({}, '', path)
    }
    window.scrollTo(0, 0)
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
        {mode === 'demo' ? (
          <TotemDemo onExit={() => navigate('pitch')} />
        ) : mode === 'moc' ? (
          <Moc onHome={() => navigate('pitch')} />
        ) : mode === 'lojista' ? (
          <LojistaApresentacao
            onApresentacao={() => navigate('lojista')}
            onExemplo={() => navigate('lojista-exemplo')}
            onDemo={() => navigate('lojista-demo')}
          />
        ) : mode === 'lojista-exemplo' ? (
          <LojistaExemplo
            onApresentacao={() => navigate('lojista')}
            onExemplo={() => navigate('lojista-exemplo')}
            onDemo={() => navigate('lojista-demo')}
          />
        ) : mode === 'lojista-demo' ? (
          <TotemDemo onExit={() => navigate('lojista-exemplo')} />
        ) : (
          <Pitch onSeeDemo={() => navigate('demo')} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
