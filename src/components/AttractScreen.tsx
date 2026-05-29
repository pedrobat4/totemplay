import { motion } from 'framer-motion'
import { tw } from '../twind'

export function AttractScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className={tw`flex flex-col items-center text-center`}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={tw`font-display tracking-[0.3em] text-xs text-violet-bright uppercase`}
      >
        Montes Claros Shopping
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
        className={tw`mt-3 font-display text-4xl font-bold text-ink sm:text-5xl`}
      >
        Gire & Ganhe
      </motion.h1>

      {/* vertical video card — tap to start */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className={tw`group relative my-7 block w-full max-w-[300px] overflow-hidden rounded-[28px] border border-violet/30`}
        style={{ aspectRatio: '9 / 16', boxShadow: '0 30px 80px rgba(124,92,255,.4)' }}
      >
        <video
          className={tw`absolute inset-0 h-full w-full object-cover`}
          src="/intro.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* glow pulse rings around the CTA */}
        <span className={tw`pointer-events-none absolute bottom-24 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border border-white/50 animate-pulseRing`} />
        <span
          className={tw`pointer-events-none absolute bottom-24 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border border-white/50 animate-pulseRing`}
          style={{ animationDelay: '1.2s' }}
        />

        {/* bottom gradient + CTA */}
        <div
          className={tw`absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-5 pb-7 pt-20`}
          style={{ background: 'linear-gradient(to top, rgba(8,6,15,.92), rgba(8,6,15,.5) 55%, transparent)' }}
        >
          <motion.span
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className={tw`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-display text-base font-bold tracking-wide text-bg`}
            style={{ background: 'linear-gradient(120deg,#a98bff,#5b3fd6)' }}
          >
            👆 Clique para interagir
          </motion.span>
          <span className={tw`text-xs text-white/70`}>Cadastre-se · escolha a loja · gire a roleta</span>
        </div>
      </motion.button>
    </div>
  )
}
