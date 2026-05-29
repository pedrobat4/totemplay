import { motion } from 'framer-motion'
import { tw } from '../twind'
import { STORES } from '../data'
import { PrimaryButton } from './PrimaryButton'

type Props = {
  selected: number | null
  onSelect: (id: number) => void
  onNext: () => void
}

export function FavoriteStep({ selected, onSelect, onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className={tw`mx-auto w-full max-w-lg`}
    >
      <h2 className={tw`font-display text-3xl font-bold text-ink`}>Escolha sua loja favorita</h2>
      <p className={tw`mt-1 text-muted`}>A roleta dá mais chance para a loja que você ama.</p>

      <div className={tw`mt-7 grid grid-cols-2 gap-3.5 sm:grid-cols-3`}>
        {STORES.map((store, i) => {
          const active = selected === store.id
          return (
            <motion.button
              key={store.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(store.id)}
              className={tw`relative overflow-hidden rounded-2xl border p-4 text-left transition ${
                active
                  ? 'border-gold bg-violet/10'
                  : 'border-violet/20 bg-white/[.03] hover:border-violet/40'
              }`}
              style={active ? { boxShadow: '0 12px 36px rgba(124,92,255,.35)' } : undefined}
            >
              <span
                className={tw`flex h-9 w-9 items-center justify-center rounded-xl font-display text-sm font-bold text-bg`}
                style={{ background: store.color }}
              >
                {store.id}
              </span>
              <div className={tw`mt-3 font-bold text-ink`}>{store.name}</div>
              <div className={tw`text-xs text-muted`}>{store.category}</div>
              {active && (
                <span className={tw`absolute right-3 top-3 text-gold`}>★</span>
              )}
            </motion.button>
          )
        })}
      </div>

      <div className={tw`mt-7`}>
        <PrimaryButton onClick={onNext} disabled={selected === null}>
          {selected === null ? 'Selecione uma loja' : 'Ir para a roleta'}
        </PrimaryButton>
      </div>
    </motion.div>
  )
}
