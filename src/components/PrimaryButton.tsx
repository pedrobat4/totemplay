import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { tw } from '../twind'
import { VIOLET_GRADIENT, CTA_SHADOW } from '../ui'

type Props = {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'solid' | 'ghost'
}

export function PrimaryButton({ children, onClick, disabled, variant = 'solid' }: Props) {
  const base =
    'relative w-full rounded-2xl px-8 py-5 text-lg font-bold font-display tracking-wide transition disabled:opacity-40 disabled:cursor-not-allowed'
  const styles =
    variant === 'solid'
      ? 'text-bg'
      : 'text-violet-bright border border-violet/40 bg-violet/5'

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={tw`${base} ${styles}`}
      style={
        variant === 'solid'
          ? { background: VIOLET_GRADIENT, boxShadow: CTA_SHADOW }
          : undefined
      }
    >
      {children}
    </motion.button>
  )
}
