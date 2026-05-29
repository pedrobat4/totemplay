import { motion } from 'framer-motion'
import { tw } from '../twind'
import { DEMO_USER } from '../data'
import { PrimaryButton } from './PrimaryButton'

function Field({ label, value, badge }: { label: string; value: string; badge?: boolean }) {
  return (
    <div className={tw`text-left`}>
      <label className={tw`mb-1.5 block font-display text-xs tracking-[0.2em] text-violet-bright uppercase`}>
        {label}
      </label>
      <div
        className={tw`flex items-center justify-between rounded-2xl border border-violet/25 bg-white/[.03] px-5 py-4 text-lg font-medium text-ink`}
      >
        {value}
        {badge && (
          <span className={tw`rounded-full bg-violet/15 px-2.5 py-1 text-[10px] font-bold tracking-wider text-violet-bright uppercase`}>
            pré-preenchido
          </span>
        )}
      </div>
    </div>
  )
}

export function RegisterStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className={tw`mx-auto w-full max-w-md`}
    >
      <h2 className={tw`font-display text-3xl font-bold text-ink`}>Seus dados</h2>
      <p className={tw`mt-1 text-muted`}>Validação por SMS · LGPD · leva 20 segundos.</p>

      <div className={tw`mt-7 flex flex-col gap-4`}>
        <Field label="Nome" value={DEMO_USER.name} badge />
        <Field label="Telefone" value={DEMO_USER.phone} badge />
        <Field label="E-mail" value={DEMO_USER.email} badge />
      </div>

      <label className={tw`mt-5 flex items-start gap-3 text-left text-sm text-muted`}>
        <span className={tw`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-violet text-bg`}>
          ✓
        </span>
        Autorizo o uso dos meus dados conforme a Política de Privacidade (LGPD).
      </label>

      <div className={tw`mt-7`}>
        <PrimaryButton onClick={onNext}>Continuar</PrimaryButton>
      </div>
    </motion.div>
  )
}
