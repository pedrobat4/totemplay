import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { tw } from '../twind'
import {
  brl,
  NUM_TOTENS,
  MOC,
  AUDIENCIA,
  LOOP_SLOTS,
  SEGUNDOS_POR_ANUNCIO,
  MIDIA,
  PACOTES,
  BOOK_REF,
  NOSSO_TOTEM_PRECO,
  SPLIT_SHOPPING,
  PARCERIA,
  ANUNCIANTES_BASE,
  BRUTO_BASE,
  TICKET_MEDIO,
  SLOTS_USADOS,
  OCUPACAO_BASE,
  GANHO_BASE,
  GANHO_CHEIO,
  ANUNCIANTES_CHEIO,
  RAMPA_ANO_SHOPPING,
  CONTATOS,
  APRESENTADO_PARA,
  PROPOSTO_POR,
} from '../moc-data'

/* ---------- tema (identidade Montes Claros Shopping) ---------- */
const INK = '#EAF5F1'
const MUTED = '#9DB3AC'
const FAINT = '#6B817B'
const SLIDE_BG =
  'radial-gradient(120% 120% at 100% 0%, rgba(22,195,181,.14), transparent 55%),' +
  'radial-gradient(100% 100% at 0% 100%, rgba(140,198,63,.10), transparent 55%),' +
  'linear-gradient(180deg,#06100e 0%,#0a1714 100%)'

/* ---------- logos ---------- */
function Logos({ small }: { small?: boolean }) {
  const h = small ? 'h-5' : 'h-7'
  return (
    <div className={tw`flex items-center gap-3`}>
      <span className={tw`flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-lg`}>
        <img src="/brands/montes-claros-shopping.webp" alt="Montes Claros Shopping" className={tw`${h} w-auto`} />
      </span>
      <span className={tw`text-white/20`}>×</span>
      <img src="/brands/metabuy.png" alt="Metabuy" className={tw`${small ? 'h-3.5' : 'h-4'} w-auto opacity-90`} />
    </div>
  )
}

/* ---------- helpers ---------- */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Slide({ topL, topR, children }: { topL: ReactNode; topR: string; children: ReactNode }) {
  return (
    <section
      data-slide
      className={tw`relative flex min-h-screen snap-start flex-col justify-center px-5 py-24 sm:px-16 sm:py-20`}
      style={{ background: SLIDE_BG }}
    >
      <div
        className={tw`pointer-events-none absolute inset-0 opacity-40`}
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(120% 80% at 50% 30%,#000,transparent)',
          WebkitMaskImage: 'radial-gradient(120% 80% at 50% 30%,#000,transparent)',
        }}
      />
      <div
        className={tw`absolute left-5 right-5 top-5 flex items-center justify-between gap-3 font-display text-[0.55rem] tracking-[0.2em] sm:left-16 sm:right-16 sm:top-7 sm:text-[0.7rem] sm:tracking-[0.32em]`}
        style={{ color: FAINT }}
      >
        <span className={tw`min-w-0 truncate`}>{topL}</span>
        <span className={tw`hidden flex-none text-white/15 sm:inline`}>{topR}</span>
      </div>
      <div className={tw`relative z-[2] mx-auto w-full max-w-6xl`}>{children}</div>
      <div
        className={tw`absolute bottom-5 left-5 right-5 hidden items-center justify-between gap-3 font-display text-[0.55rem] tracking-[0.2em] sm:bottom-7 sm:left-16 sm:right-16 sm:flex sm:text-[0.7rem] sm:tracking-[0.32em]`}
      >
        <span className={tw`flex flex-none items-center gap-2 font-semibold`} style={{ color: MUTED }}>
          <i className={tw`inline-block h-2 w-2 rotate-45`} style={{ background: MOC.tealBright }} /> METABUY × MONTES CLAROS SHOPPING
        </span>
        <span className={tw`hidden text-white/15 sm:inline`}>{topR}</span>
      </div>
    </section>
  )
}

const kicker = 'font-display text-xs font-medium uppercase tracking-[0.3em]'
const cardCls = 'rounded-2xl border border-white/[.07] bg-white/[.025]'

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className={tw`font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl`} style={{ color: INK }}>
      {children}
    </h2>
  )
}

function Stat({ value, label, gold }: { value: ReactNode; label: string; gold?: boolean }) {
  return (
    <div className={tw`${cardCls} p-5`}>
      <div className={tw`font-display text-3xl font-bold leading-none sm:text-4xl`} style={{ color: gold ? MOC.amarelo : MOC.tealBright }}>
        {value}
      </div>
      <div className={tw`mt-2 text-sm leading-snug`} style={{ color: MUTED }}>
        {label}
      </div>
    </div>
  )
}

function Row({ k, v, faint, strong, gold }: { k: string; v: string; faint?: boolean; strong?: boolean; gold?: boolean }) {
  return (
    <div className={tw`flex items-baseline justify-between gap-3`}>
      <span style={{ color: faint ? FAINT : MUTED }}>{k}</span>
      <span
        className={tw`flex-none font-display ${strong ? 'text-lg font-bold' : 'font-semibold'}`}
        style={{ color: gold ? MOC.amarelo : INK }}
      >
        {v}
      </span>
    </div>
  )
}

/* ---------- main ---------- */
export function Moc({ onHome }: { onHome: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(11)

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const slides = Array.from(root.querySelectorAll('[data-slide]'))
    setTotal(slides.length)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.55) setCurrent(slides.indexOf(e.target))
        })
      },
      { threshold: [0, 0.55, 1], root },
    )
    slides.forEach((s) => io.observe(s))
    const onKey = (ev: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(ev.key)) {
        ev.preventDefault()
        slides[Math.min(current + 1, slides.length - 1)]?.scrollIntoView({ behavior: 'smooth' })
      }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(ev.key)) {
        ev.preventDefault()
        slides[Math.max(current - 1, 0)]?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      io.disconnect()
      window.removeEventListener('keydown', onKey)
    }
  }, [current])

  const go = (i: number) => {
    const slides = scrollRef.current?.querySelectorAll('[data-slide]')
    ;(slides?.[i] as HTMLElement | undefined)?.scrollIntoView({ behavior: 'smooth' })
  }

  const pct = (n: number) => `${Math.round(n * 100)}%`

  return (
    <div className={tw`relative h-full font-sans`}>
      <div
        className={tw`fixed left-0 top-0 z-[60] h-[3px]`}
        style={{ width: `${((current + 1) / total) * 100}%`, background: MOC.gradient, transition: 'width .3s' }}
      />

      <div ref={scrollRef} className={tw`h-screen snap-y snap-mandatory overflow-y-scroll`} style={{ scrollbarWidth: 'none' }}>
        {/* 01 · CAPA */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• PROPOSTA DE MÍDIA</span> · 2026</>} topR="MOC · 01">
          <div className={tw`max-w-4xl`}>
            <Reveal><div className={tw`mb-6`}><Logos /></div></Reveal>
            <Reveal delay={0.05}>
              <span
                className={tw`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold`}
                style={{ border: `1px solid ${MOC.tealBright}55`, background: `${MOC.tealBright}12`, color: MOC.tealBright }}
              >
                Mídia digital interativa · {NUM_TOTENS} totens no shopping
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className={tw`mt-7 font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl`} style={{ color: INK }}>
                Uma nova mídia
                <br />
                <span style={{ background: MOC.gradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  no Montes Claros Shopping
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={tw`mt-6 max-w-2xl text-xl leading-snug`} style={{ color: MUTED }}>
                Totens digitais que <span style={{ color: INK }} className={tw`font-semibold`}>vendem mídia, captam leads e dão prêmios</span> —
                gerando uma nova receita para o shopping, <span style={{ color: INK }} className={tw`font-semibold`}>sem nenhum investimento</span>.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className={tw`mt-9 grid gap-3 sm:grid-cols-3`}>
                <Stat value={`${Math.round(AUDIENCIA.publicoMes / 1000)} mil`} label="Público médio/mês no shopping (Book 2026)" />
                <Stat value={brl(GANHO_BASE.ano)} gold label="Receita estimada/ano para o shopping (50%)" />
                <Stat value="R$ 0" label="Investimento do shopping — risco zero" />
              </div>
            </Reveal>
          </div>
        </Slide>

        {/* 02 · OPORTUNIDADE */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• A OPORTUNIDADE</span> · 02</>} topR="MOC · 02">
          <Reveal><div className={tw`${kicker} mb-5`} style={{ color: MOC.tealBright }}>O ponto certo, o público certo</div></Reveal>
          <Reveal delay={0.1}><H2>O maior shopping do Norte de Minas merece a mídia mais moderna.</H2></Reveal>
          <div className={tw`mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
            <Reveal delay={0.15}><Stat value={`${Math.round(AUDIENCIA.publicoMes / 1000)} mil`} label="Público médio mensal (2025)" /></Reveal>
            <Reveal delay={0.22}><Stat value={pct(AUDIENCIA.classeAB)} gold label="Público das classes A e B" /></Reveal>
            <Reveal delay={0.29}><Stat value={`${AUDIENCIA.raioKm} km`} label="Raio sem shopping concorrente" /></Reveal>
            <Reveal delay={0.36}><Stat value={`${AUDIENCIA.rankingMG}º`} gold label="Maior shopping de Minas Gerais" /></Reveal>
          </div>
          <Reveal delay={0.45}>
            <p className={tw`mt-8 max-w-3xl text-lg leading-relaxed`} style={{ color: MUTED }}>
              {NUM_TOTENS} totens digitais em corredores estratégicos colocam a marca do anunciante diante de um público
              qualificado, com intenção de compra, dentro do shopping. É mídia, dado e ativação na mesma tela —
              algo que nenhum formato estático do Book entrega.
            </p>
          </Reveal>
        </Slide>

        {/* 03 · AUDIÊNCIA (BOOK) */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• AUDIÊNCIA · BOOK 2026</span> · 03</>} topR="MOC · 03">
          <Reveal><div className={tw`${kicker} mb-5`} style={{ color: MOC.tealBright }}>Quem passa na frente do totem</div></Reveal>
          <Reveal delay={0.1}><H2>Um público que compra — e volta toda semana.</H2></Reveal>
          <div className={tw`mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3`}>
            <Reveal delay={0.15}><Stat value={pct(AUDIENCIA.frequenciaSemanal)} label="Declaram frequentar o shopping toda semana" /></Reveal>
            <Reveal delay={0.2}><Stat value={pct(AUDIENCIA.feminino)} gold label="Público feminino (decisor de compra)" /></Reveal>
            <Reveal delay={0.25}><Stat value={pct(AUDIENCIA.faixa25a44)} label="Entre 25 e 44 anos — pico de consumo" /></Reveal>
            <Reveal delay={0.3}><Stat value={`${(AUDIENCIA.veiculosAno / 1_000_000).toFixed(1).replace('.', ',')} mi`} label="Veículos por ano no estacionamento" /></Reveal>
            <Reveal delay={0.35}><Stat value="1 milhão" gold label="População flutuante em Montes Claros" /></Reveal>
            <Reveal delay={0.4}><Stat value={`${AUDIENCIA.lojas}`} label={`Lojas no mix (${AUDIENCIA.ancoras} âncoras) — base de anunciantes`} /></Reveal>
          </div>
          <Reveal delay={0.48}>
            <p className={tw`mt-7 text-xs`} style={{ color: FAINT }}>
              Fonte: Book de Mídia Montes Claros Shopping · 2026. Perfil socioeconômico AB {pct(AUDIENCIA.classeAB)} / CD {pct(AUDIENCIA.classeCD)}.
            </p>
          </Reveal>
        </Slide>

        {/* 04 · O PRODUTO */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• O PRODUTO</span> · 04</>} topR="MOC · 04">
          <Reveal><div className={tw`${kicker} mb-5`} style={{ color: MOC.tealBright }}>Não é um banner — é uma experiência</div></Reveal>
          <Reveal delay={0.1}><H2>O que o totem faz.</H2></Reveal>
          <div className={tw`mt-9 grid gap-3 sm:grid-cols-2`}>
            {[
              ['📺', 'Mídia em movimento', 'Tela 4K com vídeo dos anunciantes em loop — muito acima de adesivo e lona.'],
              ['👆', 'Interação e prêmios', 'O cliente toca, gira a roleta e ganha prêmios das lojas — atrai e engaja.'],
              ['🎟️', 'Captação de leads', 'Nome e WhatsApp do cliente capturados na hora — dado que o shopping e as lojas usam.'],
              ['📊', 'Relatórios', 'Quantas pessoas, quantos leads, quais prêmios — tudo medido e enviado.'],
            ].map(([emoji, t, d], i) => (
              <Reveal key={t as string} delay={0.15 + i * 0.07}>
                <div className={tw`${cardCls} flex h-full gap-4 p-6`}>
                  <span className={tw`text-3xl`}>{emoji as string}</span>
                  <div>
                    <div className={tw`font-display text-lg font-bold`} style={{ color: INK }}>{t as string}</div>
                    <div className={tw`mt-1 text-sm leading-relaxed`} style={{ color: MUTED }}>{d as string}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Slide>

        {/* 05 · OS 4 TOTENS */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• A PROPOSTA · {NUM_TOTENS} TOTENS</span> · 05</>} topR="MOC · 05">
          <Reveal><div className={tw`${kicker} mb-5`} style={{ color: MOC.tealBright }}>Onde entram os totens</div></Reveal>
          <Reveal delay={0.1}><H2>{NUM_TOTENS} totens nos corredores de maior fluxo.</H2></Reveal>
          <div className={tw`mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
            {['Entrada / Praça principal', 'Corredor das âncoras', 'Praça de alimentação', 'Acesso ao cinema'].map((p, i) => (
              <Reveal key={p} delay={0.15 + i * 0.08}>
                <div className={tw`${cardCls} h-full p-6`}>
                  <div className={tw`font-display text-4xl font-bold`} style={{ color: MOC.tealBright }}>{i + 1}</div>
                  <div className={tw`mt-3 font-semibold`} style={{ color: INK }}>{p}</div>
                  <div className={tw`mt-1 text-xs`} style={{ color: FAINT }}>Ponto sugerido — a definir com o shopping</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.5}>
            <p className={tw`mt-8 max-w-3xl text-lg leading-relaxed`} style={{ color: MUTED }}>
              Os pontos finais são definidos junto com a equipe do shopping. Cada totem cobre uma região de fluxo
              diferente — juntos, os {NUM_TOTENS} cercam o caminho natural do cliente dentro do MOC.
            </p>
          </Reveal>
        </Slide>

        {/* 06 · A MÍDIA / IMPRESSÕES */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• A MÍDIA · IMPRESSÕES</span> · 06</>} topR="MOC · 06">
          <Reveal><div className={tw`${kicker} mb-5`} style={{ color: MOC.tealBright }}>Como o anunciante aparece</div></Reveal>
          <Reveal delay={0.1}><H2>{LOOP_SLOTS} anúncios em loop, das 10h às 22h.</H2></Reveal>
          <div className={tw`mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
            <Reveal delay={0.15}><Stat value={`~${Math.round(MIDIA.otsTotemMes / 1000)} mil`} label="Pessoas alcançadas/mês por totem (~30% do fluxo)" /></Reveal>
            <Reveal delay={0.22}><Stat value={`~${Math.round(MIDIA.otsRedeMes / 1000)} mil`} gold label={`Exposições/mês na rede de ${NUM_TOTENS} totens`} /></Reveal>
            <Reveal delay={0.29}><Stat value={`${MIDIA.loopsDia}×`} label="Vezes que cada anúncio passa por dia, por totem" /></Reveal>
            <Reveal delay={0.36}><Stat value={`${MIDIA.slotsRede}`} gold label={`Espaços de mídia na rede (${LOOP_SLOTS} × ${NUM_TOTENS})`} /></Reveal>
          </div>
          <Reveal delay={0.45}>
            <div className={tw`mt-8 max-w-3xl rounded-2xl px-6 py-5 text-sm leading-relaxed`} style={{ border: `1px solid ${MOC.tealBright}33`, background: `${MOC.tealBright}0d`, color: MUTED }}>
              <span style={{ color: INK }} className={tw`font-semibold`}>Como funciona:</span>{' '}
              cada totem roda um loop de {LOOP_SLOTS} anúncios × {SEGUNDOS_POR_ANUNCIO}s = {MIDIA.loopSeg}s. O dia inteiro,
              cada marca aparece {MIDIA.loopsDia}× — sempre em vídeo, sempre na altura do olhar, no caminho de quem está comprando.
            </div>
          </Reveal>
        </Slide>

        {/* 07 · PLANOS DO ANUNCIANTE */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• PLANOS · ANUNCIANTE</span> · 07</>} topR="MOC · 07">
          <Reveal><div className={tw`${kicker} mb-5`} style={{ color: MOC.tealBright }}>O que vendemos para as marcas</div></Reveal>
          <Reveal delay={0.1}><H2>Planos por número de totens.</H2></Reveal>
          <div className={tw`mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
            {PACOTES.map((p, i) => {
              const desc = Math.round((1 - p.preco / p.cheio) * 100)
              return (
                <Reveal key={p.telas} delay={0.12 + i * 0.08}>
                  <div
                    className={tw`relative h-full rounded-2xl p-6`}
                    style={p.destaque ? { border: `1px solid ${MOC.amarelo}80`, background: `${MOC.amarelo}10` } : { border: '1px solid rgba(255,255,255,.07)', background: 'rgba(255,255,255,.025)' }}
                  >
                    {p.destaque && (
                      <span className={tw`absolute -top-2.5 right-4 rounded-full px-3 py-0.5 font-display text-[0.6rem] font-bold tracking-wide`} style={{ background: MOC.amarelo, color: '#06100e' }}>
                        MAIOR ALCANCE
                      </span>
                    )}
                    <div className={tw`font-display text-xs uppercase tracking-[0.2em]`} style={{ color: p.destaque ? MOC.amarelo : MOC.tealBright }}>{p.nome}</div>
                    <div className={tw`mt-1 text-sm`} style={{ color: MUTED }}>{p.telas} {p.telas === 1 ? 'totem' : 'totens'}</div>
                    <div className={tw`mt-4 font-display text-3xl font-bold`} style={{ color: INK }}>{brl(p.preco)}</div>
                    <div className={tw`text-xs`} style={{ color: FAINT }}>/ mês</div>
                    {desc > 0 ? (
                      <div className={tw`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold`} style={{ border: `1px solid ${MOC.tealBright}4d`, background: `${MOC.tealBright}10`, color: MOC.tealBright }}>
                        {desc}% de desconto no volume
                      </div>
                    ) : (
                      <div className={tw`mt-3 text-xs`} style={{ color: FAINT }}>preço de entrada</div>
                    )}
                    <div className={tw`mt-3 text-xs`} style={{ color: MUTED }}>{brl(Math.round(p.preco / p.telas))} por totem</div>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.45}>
            <p className={tw`mt-7 max-w-3xl text-sm leading-relaxed`} style={{ color: MUTED }}>
              Entrada a <span style={{ color: INK }} className={tw`font-semibold`}>{brl(NOSSO_TOTEM_PRECO)}/mês</span> — e quem fecha a{' '}
              <span style={{ color: MOC.amarelo }} className={tw`font-semibold`}>Rede MOC</span> aparece nos {NUM_TOTENS} totens pelo melhor custo por ponto.
            </p>
          </Reveal>
        </Slide>

        {/* 08 · COMPARATIVO COM O BOOK (o estudo) */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• PREÇO · VS. O BOOK</span> · 08</>} topR="MOC · 08">
          <Reveal><div className={tw`${kicker} mb-5`} style={{ color: MOC.tealBright }}>Coerente com a tabela do shopping</div></Reveal>
          <Reveal delay={0.1}><H2>O preço cabe no Book — com dado e interação a mais.</H2></Reveal>
          <div className={tw`mt-9 grid items-start gap-8 lg:grid-cols-[1.3fr_0.7fr]`}>
            <Reveal delay={0.2}>
              <div className={tw`${cardCls} overflow-hidden`}>
                <div className={tw`bg-white/[.03] px-5 py-2.5 font-display text-xs tracking-[0.2em]`} style={{ color: MOC.tealBright }}>FORMATOS DO BOOK DE MÍDIA 2026</div>
                {BOOK_REF.map((b, i) => (
                  <div key={b.item} className={tw`flex items-center justify-between gap-4 px-5 py-3 ${i > 0 ? 'border-t border-white/[.06]' : ''}`}>
                    <div>
                      <div className={tw`font-semibold`} style={{ color: INK }}>{b.item}</div>
                      <div className={tw`text-xs`} style={{ color: FAINT }}>{b.obs}</div>
                    </div>
                    <div className={tw`flex-none font-display font-bold`} style={{ color: INK }}>{brl(b.preco)}</div>
                  </div>
                ))}
                <div className={tw`flex items-center justify-between gap-4 px-5 py-4`} style={{ borderTop: `1px solid ${MOC.amarelo}4d`, background: `${MOC.amarelo}12` }}>
                  <div>
                    <div className={tw`font-display font-bold uppercase tracking-wide`} style={{ color: MOC.amarelo }}>Totem digital (nosso) — entrada</div>
                    <div className={tw`text-xs`} style={{ color: MUTED }}>Vídeo + toque + captação de leads + roleta</div>
                  </div>
                  <div className={tw`flex-none font-display text-2xl font-bold`} style={{ color: INK }}>{brl(NOSSO_TOTEM_PRECO)}</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`flex flex-col gap-3`}>
                <div className={tw`rounded-xl p-4 text-sm leading-relaxed`} style={{ border: `1px solid ${MOC.tealBright}40`, background: `${MOC.tealBright}0d`, color: MUTED }}>
                  O <span style={{ color: INK }} className={tw`font-semibold`}>totem estático</span> do Book custa {brl(2000)} o par —
                  só adesivo, sem tela e sem dado. O nosso, digital e interativo, entra a {brl(NOSSO_TOTEM_PRECO)} e ainda{' '}
                  <span style={{ color: INK }} className={tw`font-semibold`}>captura o lead do cliente</span>.
                </div>
                <div className={tw`rounded-xl p-4 text-sm leading-relaxed`} style={{ border: `1px solid ${MOC.amarelo}40`, background: `${MOC.amarelo}0d`, color: MUTED }}>
                  Resultado: um preço fácil de vender (abaixo de mega banner, front light e elevador), mas com um produto
                  muito mais valioso — e <span style={{ color: MOC.amarelo }} className={tw`font-semibold`}>recorrente todo mês</span>.
                </div>
              </div>
            </Reveal>
          </div>
        </Slide>

        {/* 09 · QUANTO O SHOPPING GANHA */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• O GANHO DO SHOPPING</span> · 09</>} topR="MOC · 09">
          <Reveal><div className={tw`${kicker} mb-5`} style={{ color: MOC.tealBright }}>50% da receita · zero investimento</div></Reveal>
          <Reveal delay={0.1}><H2>O que entra no caixa do shopping.</H2></Reveal>
          <div className={tw`mt-9 grid gap-4 lg:grid-cols-2`}>
            {[
              { nome: 'Cenário base', sub: `${ANUNCIANTES_BASE} anunciantes · ~${Math.round(OCUPACAO_BASE * 100)}% da rede`, g: GANHO_BASE, gold: false },
              { nome: 'Cenário cheio', sub: `${ANUNCIANTES_CHEIO} anunciantes · rede madura`, g: GANHO_CHEIO, gold: true },
            ].map((c, i) => (
              <Reveal key={c.nome} delay={0.15 + i * 0.1}>
                <div className={tw`h-full rounded-2xl p-7`} style={c.gold ? { border: `1px solid ${MOC.amarelo}55`, background: `${MOC.amarelo}0a` } : { border: '1px solid rgba(255,255,255,.07)', background: 'rgba(255,255,255,.025)' }}>
                  <div className={tw`font-display text-lg font-bold`} style={{ color: INK }}>{c.nome}</div>
                  <div className={tw`mt-1 text-xs`} style={{ color: FAINT }}>{c.sub}</div>
                  <div className={tw`mt-5 flex flex-col gap-2.5 text-sm`}>
                    <Row k="Receita de mídia/mês (bruto)" v={brl(c.g.bruto)} />
                    <Row k={`Shopping (${Math.round(SPLIT_SHOPPING * 100)}%)`} v={brl(c.g.mes)} strong gold={c.gold} />
                    <div className={tw`my-1 h-px bg-white/10`} />
                    <Row k="Para o shopping / ano" v={brl(c.g.ano)} strong gold={c.gold} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.45}>
            <div className={tw`mt-6 grid gap-3 sm:grid-cols-3`}>
              <Stat value="R$ 0" label="Investimento do shopping (CAPEX é da Metabuy)" />
              <Stat value={pct(SPLIT_SHOPPING)} gold label="Da receita de mídia fica com o shopping" />
              <Stat value={`${brl(RAMPA_ANO_SHOPPING)}`} label="Receita do shopping no 1º ano (com rampa)" />
            </div>
          </Reveal>
        </Slide>

        {/* 10 · A PARCERIA */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• A PARCERIA · 50/50</span> · 10</>} topR="MOC · 10">
          <Reveal><div className={tw`${kicker} mb-5`} style={{ color: MOC.tealBright }}>Cada um no que é melhor</div></Reveal>
          <Reveal delay={0.1}><H2>50% Metabuy · 50% Montes Claros Shopping.</H2></Reveal>
          <div className={tw`mt-9 grid gap-4 lg:grid-cols-2`}>
            <Reveal delay={0.2}>
              <div className={tw`${cardCls} h-full p-7`}>
                <div className={tw`font-display text-sm uppercase tracking-[0.2em]`} style={{ color: MOC.tealBright }}>Metabuy entra com</div>
                <ul className={tw`mt-4 flex flex-col gap-3`}>
                  {PARCERIA.metabuy.map((t) => (
                    <li key={t} className={tw`flex items-start gap-3 text-sm`} style={{ color: MUTED }}>
                      <span className={tw`mt-1 inline-block h-1.5 w-1.5 flex-none rotate-45`} style={{ background: MOC.tealBright }} />
                      <span style={{ color: INK }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`h-full rounded-2xl p-7`} style={{ border: `1px solid ${MOC.amarelo}40`, background: `${MOC.amarelo}08` }}>
                <div className={tw`font-display text-sm uppercase tracking-[0.2em]`} style={{ color: MOC.amarelo }}>Shopping entra com</div>
                <ul className={tw`mt-4 flex flex-col gap-3`}>
                  {PARCERIA.shopping.map((t) => (
                    <li key={t} className={tw`flex items-start gap-3 text-sm`} style={{ color: MUTED }}>
                      <span className={tw`mt-1 inline-block h-1.5 w-1.5 flex-none rotate-45`} style={{ background: MOC.amarelo }} />
                      <span style={{ color: INK }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.45}>
            <p className={tw`mt-7 max-w-3xl text-sm leading-relaxed`} style={{ color: MUTED }}>
              A Metabuy assume todo o custo e a operação. O shopping entra com o que já tem de melhor — espaço e
              audiência — e divide meio a meio a receita gerada. <span style={{ color: INK }} className={tw`font-semibold`}>Sem risco e sem investimento.</span>
            </p>
          </Reveal>
        </Slide>

        {/* 11 · RESUMO / DECISÃO */}
        <Slide topL={<><span style={{ color: MOC.tealBright }}>• RESUMO · DECISÃO</span> · 11</>} topR="MOC · 11">
          <div className={tw`text-center`}>
            <Reveal><div className={tw`font-display text-xs tracking-[0.3em] uppercase`} style={{ color: MOC.amarelo }}>A proposta, em uma tela</div></Reveal>
            <Reveal delay={0.1}>
              <h1
                className={tw`mt-5 font-display text-5xl font-bold leading-tight tracking-tight sm:text-7xl`}
                style={{ background: 'linear-gradient(120deg,#fff 30%,#8CC63F)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
              >
                Nova receita. Risco zero.
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <div className={tw`mx-auto mt-9 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
                <Stat value={`${NUM_TOTENS} totens`} label="Mídia digital interativa no MOC" />
                <Stat value="R$ 0" gold label="Investimento do shopping" />
                <Stat value={pct(SPLIT_SHOPPING)} label="Da receita de mídia fica com o shopping" />
                <Stat value={brl(GANHO_BASE.ano)} gold label="Estimativa para o shopping/ano (base)" />
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className={tw`mx-auto mt-9 w-full max-w-md rounded-2xl px-6 py-5`} style={{ border: `1px solid ${MOC.tealBright}33`, background: 'rgba(255,255,255,.025)' }}>
                <div className={tw`mb-4 flex justify-center`}><Logos small /></div>
                <div className={tw`font-display text-[0.6rem] tracking-[0.3em] uppercase`} style={{ color: MOC.tealBright }}>Apresentado para</div>
                <div className={tw`mt-1 font-display text-xl font-bold`} style={{ color: INK }}>{APRESENTADO_PARA}</div>
                <div className={tw`mt-3 border-t border-white/10 pt-3 font-display text-[0.6rem] tracking-[0.3em] uppercase`} style={{ color: MOC.amarelo }}>Proposto por</div>
                <div className={tw`mt-1 text-sm font-semibold`} style={{ color: MUTED }}>{PROPOSTO_POR}</div>
                <div className={tw`mt-3 border-t border-white/10 pt-3 text-xs`} style={{ color: FAINT }}>
                  {CONTATOS.map((c) => `${c.nome} · ${c.tel}`).join('   ·   ')}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.55}>
              <button
                onClick={onHome}
                className={tw`mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-display text-sm font-bold transition hover:bg-white/[.06]`}
                style={{ color: INK }}
              >
                ← Voltar ao pitch
              </button>
            </Reveal>
          </div>
        </Slide>
      </div>

      {/* nav dots */}
      <div className={tw`fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex`}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className={tw`h-2.5 w-2.5 rounded-full border transition`}
            style={current === i ? { borderColor: MOC.tealBright, background: MOC.tealBright, transform: 'scale(1.25)', boxShadow: `0 0 12px ${MOC.tealBright}99` } : { borderColor: 'rgba(255,255,255,.25)', background: 'transparent' }}
          />
        ))}
      </div>

      {/* home button */}
      <button
        onClick={onHome}
        className={tw`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/15 bg-black/40 px-6 py-3 font-display text-sm font-bold backdrop-blur transition lg:left-5 lg:translate-x-0`}
        style={{ color: INK }}
      >
        ← Pitch
      </button>
    </div>
  )
}
