import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { tw } from './twind'
import { TotemDemo } from './components/TotemDemo'
import { LojistaApresentacao } from './components/LojistaApresentacao'
import { LojistaExemplo } from './components/LojistaExemplo'

/*
 * App standalone da proposta para lojistas (site próprio, ex.: proposta-lojista.netlify.app).
 * A raiz é a apresentação — não existe outro conteúdo neste site.
 */
type Mode = 'apresentacao' | 'exemplo' | 'demo'

const PATHS: Record<Mode, string> = {
  apresentacao: '/',
  exemplo: '/exemplo',
  demo: '/demo',
}

function modeFromPath(): Mode {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '/exemplo') return 'exemplo'
  if (path === '/demo') return 'demo'
  return 'apresentacao'
}

export function LojistaApp() {
  const [mode, setMode] = useState<Mode>(modeFromPath)
  // De onde a demo foi aberta, para o "voltar" retornar ao lugar certo.
  const beforeDemo = useRef<Mode>('apresentacao')

  useEffect(() => {
    document.title = 'TotemPlay · Proposta para Lojistas'
  }, [])

  // Keep mode in sync with browser back/forward.
  useEffect(() => {
    const onPop = () => setMode(modeFromPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (next: Mode) => {
    if (next === 'demo' && mode !== 'demo') beforeDemo.current = mode
    const path = PATHS[next]
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
          <TotemDemo onExit={() => navigate(beforeDemo.current)} />
        ) : mode === 'exemplo' ? (
          <LojistaExemplo
            onApresentacao={() => navigate('apresentacao')}
            onExemplo={() => navigate('exemplo')}
            onDemo={() => navigate('demo')}
          />
        ) : (
          <LojistaApresentacao
            onApresentacao={() => navigate('apresentacao')}
            onExemplo={() => navigate('exemplo')}
            onDemo={() => navigate('demo')}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
