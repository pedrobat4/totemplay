import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { tw } from '../twind'
import { Background } from './Background'
import { Logo } from './Logo'
import { VIOLET_GRADIENT, CTA_SHADOW } from '../ui'

// TROCAR: link real de contato comercial (ex.: https://wa.me/55XXXXXXXXXXX) antes de enviar aos lojistas.
export const CONTATO_URL = 'TROCAR-link-whatsapp'

export const kickerCls = 'font-display text-xs font-medium uppercase tracking-[0.3em] text-violet-bright'
export const headingCls = 'font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl'

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function CtaButton({
  onClick,
  href,
  children,
  variant = 'solid',
}: {
  onClick?: () => void
  href?: string
  children: ReactNode
  variant?: 'solid' | 'ghost' | 'gold'
}) {
  const base = tw`inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-4 text-center font-display text-base font-bold tracking-wide transition`
  const style =
    variant === 'solid'
      ? { background: VIOLET_GRADIENT, boxShadow: CTA_SHADOW }
      : undefined
  const cls =
    variant === 'solid'
      ? tw`${base} text-bg`
      : variant === 'gold'
        ? tw`${base} border border-gold/40 bg-gold/[.07] text-gold hover:bg-gold/[.14]`
        : tw`${base} border border-violet/35 bg-violet/[.07] text-violet-bright hover:bg-violet/[.14]`
  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        style={style}
      >
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cls}
      style={style}
    >
      {children}
    </motion.button>
  )
}

type ShellProps = {
  page: 1 | 2
  onApresentacao: () => void
  onExemplo: () => void
  children: ReactNode
}

export function LojistaShell({ page, onApresentacao, onExemplo, children }: ShellProps) {
  const tabCls = (active: boolean) =>
    tw`whitespace-nowrap rounded-full px-3 py-1.5 font-display text-[0.7rem] font-bold tracking-wide transition sm:px-4 sm:py-2 sm:text-sm ${
      active
        ? 'bg-violet text-bg'
        : 'border border-white/10 text-muted hover:border-violet/40 hover:text-ink'
    }`

  return (
    <div className={tw`relative min-h-full font-sans text-ink`}>
      <Background />

      <header
        className={tw`sticky top-0 z-40 border-b border-white/[.06] backdrop-blur-md`}
        style={{ background: 'rgba(8,6,15,.72)' }}
      >
        <div className={tw`mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4`}>
          <div className={tw`flex items-center gap-3`}>
            <Logo size="sm" />
            <span
              className={tw`hidden rounded-full border border-gold/35 bg-gold/[.06] px-3 py-1 font-display text-[0.6rem] font-bold tracking-[0.22em] text-gold sm:inline`}
            >
              PARA LOJISTAS
            </span>
          </div>
          <nav className={tw`flex items-center gap-2`}>
            <button onClick={onApresentacao} className={tabCls(page === 1)}>
              1 · Apresentação
            </button>
            <button onClick={onExemplo} className={tabCls(page === 2)}>
              2 · Exemplo
            </button>
          </nav>
        </div>
      </header>

      <main className={tw`relative z-10`}>{children}</main>

      <footer className={tw`relative z-10 border-t border-white/[.06]`}>
        <div
          className={tw`mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row sm:text-left`}
        >
          <span className={tw`flex items-center gap-2 font-display text-[0.65rem] font-semibold tracking-[0.28em] text-faint`}>
            <i className={tw`inline-block h-2 w-2 rotate-45 bg-violet`} /> SOLUÇÃO METABUY · TOTEMPLAY
          </span>
          <span className={tw`font-display text-[0.65rem] tracking-[0.28em] text-white/20`}>
            PÁGINA {page} / 2 · APRESENTAÇÃO PARA LOJISTAS
          </span>
          {page === 1 ? (
            <button
              onClick={onExemplo}
              className={tw`font-display text-xs font-bold tracking-wide text-violet-bright transition hover:text-ink`}
            >
              Próxima: exemplo na prática →
            </button>
          ) : (
            <button
              onClick={onApresentacao}
              className={tw`font-display text-xs font-bold tracking-wide text-violet-bright transition hover:text-ink`}
            >
              ← Voltar à apresentação
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
