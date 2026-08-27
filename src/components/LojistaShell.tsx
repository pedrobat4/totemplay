import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { tw } from '../twind'

// TROCAR: link real de contato comercial (ex.: https://wa.me/55XXXXXXXXXXX) antes de enviar aos lojistas.
export const CONTATO_URL = 'TROCAR-link-whatsapp'

/*
 * Identidade Metabuy (manual de marca v1):
 * fundo branco gelo, P&B de base, azul #1B5CFF como ÚNICO destaque.
 * Anton nos títulos, Archivo no texto, mono nos labels.
 */
export const kickerCls = 'font-mono text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-mb-blue'
export const headingCls = 'font-anton text-4xl uppercase leading-[1.05] text-mb-black sm:text-5xl'
export const cardCls = 'rounded-2xl border border-black/[.08] bg-white'

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
  variant?: 'solid' | 'ghost' | 'ghost-dark'
}) {
  const base = tw`inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-center font-archivo text-sm font-extrabold uppercase tracking-wide transition`
  const style = variant === 'solid' ? { boxShadow: '0 14px 34px rgba(27,92,255,.32)' } : undefined
  const cls =
    variant === 'solid'
      ? tw`${base} bg-mb-blue text-white hover:brightness-110`
      : variant === 'ghost-dark'
        ? tw`${base} border border-white/25 text-white hover:border-white/60`
        : tw`${base} border border-black/20 bg-white text-mb-black hover:border-mb-blue hover:text-mb-blue`
  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
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
    tw`whitespace-nowrap rounded-full px-3.5 py-1.5 font-archivo text-[0.7rem] font-bold uppercase tracking-wide transition sm:px-5 sm:py-2 sm:text-xs ${
      active
        ? 'bg-mb-blue text-white'
        : 'border border-black/15 bg-white text-mb-black hover:border-mb-blue hover:text-mb-blue'
    }`

  return (
    <div className={tw`min-h-screen bg-mb-ice font-archivo text-mb-black antialiased`}>
      <header
        className={tw`sticky top-0 z-40 border-b border-black/[.08] backdrop-blur-md`}
        style={{ background: 'rgba(244,244,241,.88)' }}
      >
        <div className={tw`mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4`}>
          <div className={tw`flex items-center gap-3`}>
            {/* Versão preta do logo sobre fundo claro (manual de marca). */}
            <img src="/brands/metabuy.png" alt="Metabuy" className={tw`h-3 w-auto sm:h-3.5`} style={{ filter: 'brightness(0)' }} />
            <span className={tw`hidden border-l border-black/15 pl-3 font-mono text-[0.6rem] font-semibold tracking-[0.24em] text-mb-gray sm:inline`}>
              TOTEMPLAY · PARA LOJISTAS
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

      <main>{children}</main>

      <footer className={tw`bg-mb-black text-white`}>
        <div className={tw`mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 border-t border-white/10 px-5 py-9 text-center sm:flex-row sm:text-left`}>
          <div className={tw`flex flex-col items-center gap-2.5 sm:items-start`}>
            {/* Preferencial: logo branco sobre fundo escuro. */}
            <img src="/brands/metabuy.png" alt="Metabuy" className={tw`h-3.5 w-auto`} />
            <span className={tw`font-mono text-[0.6rem] tracking-[0.22em] text-mb-gray`}>
              METABUY · MONTES CLAROS · MINAS GERAIS · @BUY.META
            </span>
          </div>
          <div className={tw`flex flex-col items-center gap-2 sm:items-end`}>
            <span className={tw`font-mono text-[0.6rem] tracking-[0.24em] text-mb-gray`}>PÁGINA {page} / 2</span>
            {page === 1 ? (
              <button
                onClick={onExemplo}
                className={tw`font-archivo text-xs font-bold uppercase tracking-wide text-mb-sky transition hover:text-white`}
              >
                Próxima: exemplo na prática →
              </button>
            ) : (
              <button
                onClick={onApresentacao}
                className={tw`font-archivo text-xs font-bold uppercase tracking-wide text-mb-sky transition hover:text-white`}
              >
                ← Voltar à apresentação
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
