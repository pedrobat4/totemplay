import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { tw } from '../twind'
import { VIOLET_GRADIENT, cardCls } from '../ui'
import {
  brl,
  NUM_TOTENS,
  MERCADO,
  CAPEX_ITENS,
  CAPEX_POR_TOTEM,
  CAPEX_SISTEMA,
  CAPEX_HARDWARE_4,
  CAPEX_TOTAL,
  OPEX_FIXO_ITENS,
  OPEX_FIXO_MES,
  SPLIT_SHOPPING,
  CLIENTES,
  TICKET_MEDIO,
  BRUTO_MES,
  ANUNCIOS_NO_LOOP,
  PACOTES,
  MIX_CALC,
  MIX_CLIENTES,
  MIX_BRUTO,
  MIX_TICKET,
  MIX_TELAS_USADAS,
  TELAS_TOTAIS,
  calcSplit,
  calcRampa,
  AUDIENCIA,
  APRESENTADO_PARA,
  CONTRATO_VIA,
} from '../socios-data'

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

type SlideProps = { topL: ReactNode; topR: string; children: ReactNode }
function Slide({ topL, topR, children }: SlideProps) {
  return (
    <section
      data-slide
      className={tw`relative flex min-h-screen snap-start flex-col justify-center px-5 py-24 sm:px-16 sm:py-20`}
      style={{
        background:
          'radial-gradient(120% 120% at 100% 0%, rgba(124,92,255,.13), transparent 55%),' +
          'radial-gradient(100% 100% at 0% 100%, rgba(91,63,214,.10), transparent 55%),' +
          'linear-gradient(180deg,#08060f 0%,#0e0a1c 100%)',
      }}
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
        className={tw`absolute left-5 right-5 top-5 flex items-center justify-between gap-3 font-display text-[0.55rem] tracking-[0.2em] text-faint sm:left-16 sm:right-16 sm:top-7 sm:text-[0.7rem] sm:tracking-[0.32em]`}
      >
        <span className={tw`min-w-0 truncate`}>{topL}</span>
        <span className={tw`hidden flex-none text-white/15 sm:inline`}>{topR}</span>
      </div>
      <div className={tw`relative z-[2] mx-auto w-full max-w-6xl`}>{children}</div>
      <div
        className={tw`absolute bottom-5 left-5 right-5 hidden items-center justify-between gap-3 font-display text-[0.55rem] tracking-[0.2em] sm:bottom-7 sm:left-16 sm:right-16 sm:flex sm:text-[0.7rem] sm:tracking-[0.32em]`}
      >
        <span className={tw`flex flex-none items-center gap-2 font-semibold text-ink`}>
          <i className={tw`inline-block h-2 w-2 rotate-45 bg-violet`} /> TOTEMPLAY · CONFIDENCIAL
        </span>
        <span className={tw`hidden text-white/15 sm:inline`}>{topR}</span>
      </div>
    </section>
  )
}

const kicker = 'font-display text-xs font-medium uppercase tracking-[0.3em] text-violet-bright'
const heading = 'font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl'

function Stat({ value, label, accent = 'violet' }: { value: ReactNode; label: string; accent?: 'violet' | 'gold' }) {
  return (
    <div className={tw`${cardCls} p-5`}>
      <div className={tw`font-display text-3xl font-bold leading-none sm:text-4xl ${accent === 'gold' ? 'text-gold' : 'text-violet-bright'}`}>
        {value}
      </div>
      <div className={tw`mt-2 text-sm leading-snug text-muted`}>{label}</div>
    </div>
  )
}

function Row({ k, v, faint, strong, accent }: { k: string; v: string; faint?: boolean; strong?: boolean; accent?: 'violet' | 'gold' }) {
  return (
    <div className={tw`flex items-baseline justify-between gap-3`}>
      <span className={tw`${faint ? 'text-faint' : 'text-muted'}`}>{k}</span>
      <span
        className={tw`flex-none font-display ${strong ? 'text-lg font-bold' : 'font-semibold'} ${
          accent === 'gold' ? 'text-gold' : accent === 'violet' ? 'text-violet-bright' : 'text-ink'
        }`}
      >
        {v}
      </span>
    </div>
  )
}

/* ---------- main ---------- */

export function Socios({ onHome }: { onHome: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(12)

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

  const split40 = calcSplit(SPLIT_SHOPPING.min)
  const split50 = calcSplit(SPLIT_SHOPPING.max)
  const rampa = calcRampa() // pior caso (shopping 50%)
  const breakEven = rampa.find((r) => r.acumulado >= 0)?.mes
  const fim = rampa[rampa.length - 1]
  const MIX_COLORS: Record<number, string> = { 1: '#8b6dff', 2: '#a98bff', 3: '#7c5cff', 4: '#e9b96e' }

  return (
    <div className={tw`relative h-full font-sans`}>
      {/* progress */}
      <div
        className={tw`fixed left-0 top-0 z-[60] h-[3px]`}
        style={{
          width: `${((current + 1) / total) * 100}%`,
          background: 'linear-gradient(90deg,#8b6dff,#e9b96e)',
          transition: 'width .3s',
        }}
      />

      <div ref={scrollRef} className={tw`h-screen snap-y snap-mandatory overflow-y-scroll`} style={{ scrollbarWidth: 'none' }}>
        {/* 01 · CAPA */}
        <Slide topL={<><span className={tw`text-violet`}>• PLANO DE NEGÓCIO</span> · USO INTERNO</>} topR="SÓCIOS · 01">
          <div className={tw`max-w-4xl`}>
            <Reveal>
              <div className={tw`mb-5 flex items-center gap-3`}>
                <span className={tw`font-display text-xl font-bold tracking-tight text-ink`}>
                  meta<span className={tw`text-violet-bright`}>buy</span>
                </span>
                <span className={tw`font-display text-[0.6rem] tracking-[0.3em] text-faint uppercase`}>· TotemPlay</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <span className={tw`inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/[.07] px-5 py-2.5 text-sm font-semibold text-gold`}>
                Documento confidencial · apresentação para sócios
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className={tw`mt-7 font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-7xl`}>
                Custos & projeção
                <br />
                <span style={{ background: VIOLET_GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  4 totens · Montes Claros Shopping
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={tw`mt-6 max-w-2xl text-xl leading-snug text-muted`}>
                O pitch institucional foi aprovado. Agora os números do contrato de{' '}
                <span className={tw`font-semibold text-ink`}>{NUM_TOTENS} totens</span> — investimento, custo de operação,
                receita de mídia e retorno.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className={tw`mt-9 grid gap-3 sm:grid-cols-3`}>
                <Stat value={brl(CAPEX_TOTAL)} label="Investimento total (CAPEX, 4 totens)" />
                <Stat value={`${brl(split50.liquido)}–${brl(split40.liquido)}`} accent="gold" label="Lucro líquido/mês na operação cheia (divisão 50%→40%)" />
                <Stat value={`Mês ${breakEven}`} label="Investimento recuperado (caixa positivo)" />
              </div>
            </Reveal>
          </div>
        </Slide>

        {/* 02 · OPORTUNIDADE */}
        <Slide topL={<><span className={tw`text-violet`}>• A OPORTUNIDADE</span> · 02</>} topR="SÓCIOS · 02">
          <Reveal><div className={tw`${kicker} mb-5`}>Por que esse ponto</div></Reveal>
          <Reveal delay={0.1}>
            <h2 className={tw`${heading} max-w-3xl`}>O maior shopping do Norte de Minas — e a vitrine certa.</h2>
          </Reveal>
          <div className={tw`mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
            <Reveal delay={0.15}><Stat value={`${(MERCADO.visitantesMes / 1000).toLocaleString('pt-BR')} mil`} label="Visitantes por mês no shopping" /></Reveal>
            <Reveal delay={0.22}><Stat value={MERCADO.lojas} label="Lojas no mix — base de anunciantes" /></Reveal>
            <Reveal delay={0.29}><Stat value={`${(MERCADO.habitantesCidade / 1000).toFixed(0)} mil`} accent="gold" label="Habitantes em Montes Claros" /></Reveal>
            <Reveal delay={0.36}><Stat value={`1,7 mi`} accent="gold" label="Pessoas na região de influência (86 municípios)" /></Reveal>
          </div>
          <Reveal delay={0.45}>
            <p className={tw`mt-8 max-w-3xl text-lg leading-relaxed text-muted`}>
              4 totens em corredores estratégicos colocam a marca do anunciante diante de meio milhão de pessoas por mês —
              num público que já está com a intenção de compra, dentro do shopping. É mídia + dado + ativação na mesma tela.
            </p>
          </Reveal>
        </Slide>

        {/* 03 · AUDIÊNCIA & IMPRESSÕES */}
        <Slide topL={<><span className={tw`text-violet`}>• AUDIÊNCIA & IMPRESSÕES</span> · 03</>} topR="SÓCIOS · 03">
          <Reveal><div className={tw`${kicker} mb-5`}>Potencial de exposição</div></Reveal>
          <Reveal delay={0.1}>
            <h2 className={tw`${heading} max-w-3xl`}>20 publicidades rodando, das 10h às 22h.</h2>
          </Reveal>
          <div className={tw`mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
            <Reveal delay={0.15}><Stat value={`~${(AUDIENCIA.otsTotemMes / 1000).toFixed(0)} mil`} label="Pessoas alcançadas/mês por totem (≈30% do fluxo)" /></Reveal>
            <Reveal delay={0.22}><Stat value={`~${(AUDIENCIA.otsRedeMes / 1000).toFixed(0)} mil`} accent="gold" label="Exposições/mês na rede de 4 totens" /></Reveal>
            <Reveal delay={0.29}><Stat value={`${AUDIENCIA.loopsDia}×`} label="Vezes que cada anúncio passa por dia, por totem" /></Reveal>
            <Reveal delay={0.36}><Stat value={`~${brl(Math.round(AUDIENCIA.cpmImplicito))}`} accent="gold" label="CPM implícito — dentro da faixa DOOH (R$10–40)" /></Reveal>
          </div>
          <Reveal delay={0.45}>
            <div className={tw`mt-8 max-w-3xl rounded-2xl border border-violet/25 bg-violet/[.05] px-6 py-5 text-sm leading-relaxed text-muted`}>
              <span className={tw`font-semibold text-ink`}>Como chegamos lá:</span>{' '}
              {(MERCADO.visitantesMes / 1000).toFixed(0)} mil visitantes/mês × {Math.round(0.3 * 100)}% que passam no campo de visão de cada totem ≈{' '}
              {(AUDIENCIA.otsTotemMes / 1000).toFixed(0)} mil pessoas/totem. Loop de {ANUNCIOS_NO_LOOP} anúncios × 10s = 200s →
              cada marca aparece {AUDIENCIA.loopsDia}× ao dia, o dia inteiro. Um anunciante de 1 tela paga {brl(PACOTES[0].preco)} por
              ~{(AUDIENCIA.otsTotemMes / 1000).toFixed(0)} mil impactos — CPM coerente com o mercado, com o bônus do dado e da ativação.
            </div>
          </Reveal>
        </Slide>

        {/* 04 · CAPEX POR TOTEM */}
        <Slide topL={<><span className={tw`text-violet`}>• INVESTIMENTO · POR TOTEM</span> · 04</>} topR="SÓCIOS · 04">
          <Reveal><div className={tw`${kicker} mb-5`}>Custo de montagem — 1 unidade</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading}`}>Quanto custa um totem.</h2></Reveal>
          <div className={tw`mt-9 grid items-start gap-8 lg:grid-cols-[1.3fr_0.7fr]`}>
            <Reveal delay={0.2}>
              <div className={tw`${cardCls} overflow-hidden`}>
                {CAPEX_ITENS.map((it, i) => (
                  <div
                    key={it.item}
                    className={tw`flex items-center justify-between gap-4 px-5 py-3.5 ${i > 0 ? 'border-t border-white/[.06]' : ''}`}
                  >
                    <div>
                      <div className={tw`font-semibold text-ink`}>{it.item}</div>
                      {it.nota && <div className={tw`text-xs text-faint`}>{it.nota}</div>}
                    </div>
                    <div className={tw`flex-none font-display font-bold text-ink`}>{brl(it.valor)}</div>
                  </div>
                ))}
                <div className={tw`flex items-center justify-between gap-4 border-t border-violet/30 bg-violet/[.08] px-5 py-4`}>
                  <div className={tw`font-display font-bold uppercase tracking-wide text-violet-bright`}>Total por totem</div>
                  <div className={tw`flex-none font-display text-2xl font-bold text-ink`}>{brl(CAPEX_POR_TOTEM)}</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`flex flex-col gap-3`}>
                <Stat value={brl(CAPEX_POR_TOTEM)} label="Hardware completo de 1 totem, pronto para operar" />
                <div className={tw`rounded-xl border border-gold/25 bg-gold/[.05] p-4 text-sm leading-relaxed text-muted`}>
                  <span className={tw`font-bold text-gold`}>{CAPEX_SISTEMA.item}</span> ({CAPEX_SISTEMA.nota.toLowerCase()}) é
                  um custo <span className={tw`font-semibold text-ink`}>único</span> de {brl(CAPEX_SISTEMA.valor)} — vale para os 4 totens,
                  não entra por unidade. Aparece no total da frota (próximo slide).
                </div>
              </div>
            </Reveal>
          </div>
        </Slide>

        {/* 05 · CAPEX TOTAL */}
        <Slide topL={<><span className={tw`text-violet`}>• INVESTIMENTO · FROTA DE 4</span> · 05</>} topR="SÓCIOS · 05">
          <Reveal><div className={tw`${kicker} mb-5`}>O cheque inicial</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading} max-w-3xl`}>Investimento total para os 4 totens.</h2></Reveal>
          <div className={tw`mt-10 grid items-stretch gap-4 lg:grid-cols-[1.2fr_0.8fr]`}>
            <Reveal delay={0.2}>
              <div className={tw`h-full ${cardCls} overflow-hidden`}>
                <div className={tw`flex items-center justify-between gap-4 px-6 py-4`}>
                  <div>
                    <div className={tw`font-semibold text-ink`}>Hardware dos totens</div>
                    <div className={tw`text-xs text-faint`}>4 × {brl(CAPEX_POR_TOTEM)}</div>
                  </div>
                  <div className={tw`flex-none font-display text-xl font-bold text-ink`}>{brl(CAPEX_HARDWARE_4)}</div>
                </div>
                <div className={tw`flex items-center justify-between gap-4 border-t border-white/[.06] bg-gold/[.04] px-6 py-4`}>
                  <div>
                    <div className={tw`font-semibold text-ink`}>{CAPEX_SISTEMA.item}</div>
                    <div className={tw`text-xs text-faint`}>{CAPEX_SISTEMA.nota} · custo único dos 4 totens</div>
                  </div>
                  <div className={tw`flex-none font-display text-xl font-bold text-gold`}>{brl(CAPEX_SISTEMA.valor)}</div>
                </div>
                <div className={tw`flex items-center justify-between gap-4 border-t border-violet/30 bg-violet/[.08] px-6 py-5`}>
                  <div className={tw`font-display font-bold uppercase tracking-wide text-violet-bright`}>Investimento total</div>
                  <div className={tw`flex-none font-display text-3xl font-bold text-ink`}>{brl(CAPEX_TOTAL)}</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`flex h-full flex-col justify-center gap-3`}>
                <Stat value={brl(CAPEX_HARDWARE_4)} label="4 totens montados (só hardware)" />
                <Stat value={brl(CAPEX_SISTEMA.valor)} accent="gold" label={`${CAPEX_SISTEMA.item} — pago uma vez`} />
                <div className={tw`rounded-xl border border-violet/25 bg-violet/[.05] p-4 text-xs leading-relaxed text-muted`}>
                  É o cheque inicial da operação. Toda a projeção de retorno parte deste número: <span className={tw`font-bold text-ink`}>{brl(CAPEX_TOTAL)}</span>.
                </div>
              </div>
            </Reveal>
          </div>
        </Slide>

        {/* 06 · OPEX */}
        <Slide topL={<><span className={tw`text-violet`}>• CUSTO OPERACIONAL</span> · 06</>} topR="SÓCIOS · 06">
          <Reveal><div className={tw`${kicker} mb-5`}>O que sai todo mês</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading}`}>Custo de operação mensal.</h2></Reveal>
          <div className={tw`mt-9 grid items-start gap-8 lg:grid-cols-2`}>
            <Reveal delay={0.2}>
              <div className={tw`${cardCls} overflow-hidden`}>
                <div className={tw`bg-white/[.03] px-5 py-2.5 font-display text-xs tracking-[0.2em] text-violet-bright`}>CUSTO FIXO (4 TOTENS)</div>
                {OPEX_FIXO_ITENS.map((it, i) => (
                  <div key={it.item} className={tw`flex items-center justify-between gap-4 px-5 py-3 ${i > 0 ? 'border-t border-white/[.06]' : ''}`}>
                    <div>
                      <div className={tw`font-semibold text-ink`}>{it.item}</div>
                      <div className={tw`text-xs text-faint`}>{it.nota}</div>
                    </div>
                    <div className={tw`flex-none font-display font-bold text-ink`}>{brl(it.valor)}</div>
                  </div>
                ))}
                <div className={tw`flex items-center justify-between gap-4 border-t border-violet/30 bg-violet/[.08] px-5 py-3.5`}>
                  <div className={tw`font-display font-bold uppercase tracking-wide text-violet-bright`}>Fixo / mês</div>
                  <div className={tw`flex-none font-display text-xl font-bold text-ink`}>{brl(OPEX_FIXO_MES)}</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`flex flex-col gap-3`}>
                <div className={tw`px-1 font-display text-xs tracking-[0.2em] text-gold`}>A DIVISÃO COM O SHOPPING</div>
                <div className={tw`${cardCls} p-6`}>
                  <div className={tw`font-display text-4xl font-bold text-gold`}>{Math.round(SPLIT_SHOPPING.min * 100)}%–{Math.round(SPLIT_SHOPPING.max * 100)}%</div>
                  <div className={tw`mt-2 text-sm text-muted`}>fica com o shopping, sobre a receita de mídia. É a divisão do contrato.</div>
                </div>
                <div className={tw`rounded-xl border border-violet/25 bg-violet/[.05] p-4 text-xs leading-relaxed text-muted`}>
                  O repasse só existe quando há receita — acompanha a venda. Sobra para a operação entre{' '}
                  <span className={tw`font-bold text-ink`}>{Math.round((1 - SPLIT_SHOPPING.max) * 100)}% e {Math.round((1 - SPLIT_SHOPPING.min) * 100)}%</span> da receita, antes do custo fixo.
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.4}>
            <p className={tw`mt-6 text-xs text-faint`}>* Valores de custo fixo são estimativas operacionais — ajustáveis conforme contratos reais de energia, internet e cloud.</p>
          </Reveal>
        </Slide>

        {/* 07 · RECEITA — CENÁRIO MÉDIO */}
        <Slide topL={<><span className={tw`text-violet`}>• RECEITA · CENÁRIO MÉDIO</span> · 07</>} topR="SÓCIOS · 07">
          <Reveal><div className={tw`${kicker} mb-5`}>De onde vem o dinheiro</div></Reveal>
          <Reveal delay={0.1}>
            <h2 className={tw`${heading} max-w-3xl`}>
              <span className={tw`text-violet-bright`}>{CLIENTES} clientes</span>, ticket médio de{' '}
              <span className={tw`text-gold`}>{brl(TICKET_MEDIO)}</span>.
            </h2>
          </Reveal>
          <div className={tw`mt-9 grid items-start gap-8 lg:grid-cols-[1fr_1fr]`}>
            <Reveal delay={0.2}>
              <div className={tw`${cardCls} p-7`}>
                <div className={tw`text-sm text-muted`}>Receita bruta de mídia — operação cheia</div>
                <div className={tw`mt-1 font-display text-6xl font-bold text-gold`}>{brl(BRUTO_MES)}</div>
                <div className={tw`mt-1 text-sm text-faint`}>por mês · {CLIENTES} clientes × {brl(TICKET_MEDIO)}</div>
                <div className={tw`mt-6 h-px bg-white/10`} />
                <p className={tw`mt-5 text-sm leading-relaxed text-muted`}>
                  Cada totem comporta {ANUNCIOS_NO_LOOP} anúncios no loop. O ticket médio sai da mistura de planos:
                  cliente que pega <span className={tw`font-semibold text-ink`}>1 tela</span>, quem pega{' '}
                  <span className={tw`font-semibold text-ink`}>2</span> e quem fecha a <span className={tw`font-semibold text-ink`}>rede toda</span>.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`flex flex-col gap-3`}>
                <div className={tw`px-1 font-display text-xs tracking-[0.2em] text-violet-bright`}>A MISTURA DE CLIENTES</div>
                {[
                  ['Maioria — 1 tela', 'Loja que quer presença em um corredor específico', PACOTES[0].preco],
                  ['Parte — 2 telas', 'Marca que quer cobrir dois pontos de fluxo', PACOTES[1].preco],
                  ['Alguns — rede toda (4)', 'Âncoras e marcas fortes em toda a rede', PACOTES[3].preco],
                ].map(([t, d, v]) => (
                  <div key={t as string} className={tw`flex items-center justify-between gap-4 ${cardCls} px-5 py-3.5`}>
                    <div>
                      <div className={tw`font-semibold text-ink`}>{t as string}</div>
                      <div className={tw`text-xs text-faint`}>{d as string}</div>
                    </div>
                    <div className={tw`flex-none font-display font-bold text-violet-bright`}>{brl(v as number)}</div>
                  </div>
                ))}
                <div className={tw`rounded-xl border border-gold/25 bg-gold/[.05] p-4 text-xs leading-relaxed text-muted`}>
                  Misturando os três perfis em {CLIENTES} contratos, o ticket médio fica em <span className={tw`font-bold text-ink`}>{brl(TICKET_MEDIO)}</span> —
                  daí os {brl(BRUTO_MES)}/mês de receita bruta.
                </div>
              </div>
            </Reveal>
          </div>
        </Slide>

        {/* 08 · PACOTES */}
        <Slide topL={<><span className={tw`text-violet`}>• PACOTES · ANUNCIANTE</span> · 08</>} topR="SÓCIOS · 08">
          <Reveal><div className={tw`${kicker} mb-5`}>O produto que vendemos</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading} max-w-3xl`}>Planos por número de telas.</h2></Reveal>
          <div className={tw`mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
            {PACOTES.map((p, i) => {
              const desc = Math.round((1 - p.preco / p.cheio) * 100)
              return (
                <Reveal key={p.telas} delay={0.12 + i * 0.08}>
                  <div className={tw`relative h-full rounded-2xl border p-6 ${p.destaque ? 'border-gold/50 bg-gold/[.06]' : 'border-white/[.07] bg-white/[.025]'}`}>
                    {p.destaque && (
                      <span className={tw`absolute -top-2.5 right-4 rounded-full bg-gold px-3 py-0.5 font-display text-[0.6rem] font-bold tracking-wide text-bg`}>
                        MAIOR ALCANCE
                      </span>
                    )}
                    <div className={tw`font-display text-xs uppercase tracking-[0.2em] ${p.destaque ? 'text-gold' : 'text-violet-bright'}`}>{p.nome}</div>
                    <div className={tw`mt-1 text-sm text-muted`}>{p.telas} {p.telas === 1 ? 'tela' : 'telas'}</div>
                    <div className={tw`mt-4 font-display text-3xl font-bold text-ink`}>{brl(p.preco)}</div>
                    <div className={tw`text-xs text-faint`}>/ mês</div>
                    {desc > 0 ? (
                      <div className={tw`mt-3 inline-flex items-center gap-1 rounded-full border border-violet/30 bg-violet/[.06] px-3 py-1 text-xs font-semibold text-violet-bright`}>
                        {desc}% de desconto no volume
                      </div>
                    ) : (
                      <div className={tw`mt-3 text-xs text-faint`}>preço base de referência</div>
                    )}
                    <div className={tw`mt-3 text-xs text-muted`}>{brl(Math.round(p.preco / p.telas))} por tela</div>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.45}>
            <p className={tw`mt-7 max-w-3xl text-sm leading-relaxed text-muted`}>
              O desconto por volume aumenta o ticket médio e acelera a ocupação: é mais fácil vender “a marca em toda a rede”
              do que negociar tela a tela. O pacote <span className={tw`font-semibold text-gold`}>Rede Total</span> entrega 4× o alcance e
              é o mais simples de operar.
            </p>
          </Reveal>
        </Slide>

        {/* 09 · POR QUE R$ 3.800 — A MISTURA */}
        <Slide topL={<><span className={tw`text-violet`}>• TICKET MÉDIO · A CONTA</span> · 09</>} topR="SÓCIOS · 09">
          <Reveal><div className={tw`${kicker} mb-5`}>De onde sai o R$ {(TICKET_MEDIO / 1000).toLocaleString('pt-BR')} mil</div></Reveal>
          <Reveal delay={0.1}>
            <h2 className={tw`${heading} max-w-3xl`}>Por que {brl(TICKET_MEDIO)} de ticket médio — não é chute.</h2>
          </Reveal>
          <div className={tw`mt-9 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]`}>
            <Reveal delay={0.2}>
              <div className={tw`${cardCls} overflow-hidden`}>
                <div className={tw`grid grid-cols-[1.7fr_auto_auto_auto] gap-3 bg-white/[.03] px-5 py-2.5 font-display text-[0.6rem] uppercase tracking-[0.15em] text-faint sm:text-xs`}>
                  <span>Plano</span>
                  <span className={tw`text-right`}>Clientes</span>
                  <span className={tw`text-right`}>Preço/mês</span>
                  <span className={tw`text-right`}>Receita</span>
                </div>
                {MIX_CALC.map((m) => {
                  const pct = Math.round((m.subtotal / MIX_BRUTO) * 100)
                  const color = MIX_COLORS[m.telas]
                  return (
                    <div key={m.telas} className={tw`relative border-t border-white/[.06]`}>
                      {/* barra de participação na receita */}
                      <div className={tw`absolute inset-y-0 left-0`} style={{ width: `${pct}%`, background: `${color}22` }} />
                      <div className={tw`relative grid grid-cols-[1.7fr_auto_auto_auto] items-center gap-3 px-5 py-3.5 text-sm`}>
                        <div className={tw`flex items-center gap-3`}>
                          <span className={tw`h-2.5 w-2.5 flex-none rounded-full`} style={{ background: color, boxShadow: `0 0 10px ${color}88` }} />
                          <div className={tw`min-w-0`}>
                            <div className={tw`font-semibold text-ink`}>{m.nome}</div>
                            <div className={tw`text-xs text-faint`}>
                              {m.telas} {m.telas === 1 ? 'tela' : 'telas'} · <span style={{ color }}>{pct}% da receita</span>
                            </div>
                          </div>
                        </div>
                        <span className={tw`text-right font-display text-base font-bold text-ink`}>{m.qtd}</span>
                        <span className={tw`text-right text-muted`}>{brl(m.preco)}</span>
                        <span className={tw`text-right font-display font-bold text-ink`}>{brl(m.subtotal)}</span>
                      </div>
                    </div>
                  )
                })}
                <div className={tw`grid grid-cols-[1.7fr_auto_auto_auto] items-center gap-3 border-t-2 border-violet/40 bg-violet/[.1] px-5 py-4`}>
                  <span className={tw`font-display text-sm font-bold uppercase tracking-wide text-violet-bright`}>Total</span>
                  <span className={tw`text-right font-display text-base font-bold text-ink`}>{MIX_CLIENTES}</span>
                  <span className={tw`text-right text-xs text-faint`}>por mês</span>
                  <span className={tw`text-right font-display text-xl font-bold text-ink`}>{brl(MIX_BRUTO)}</span>
                </div>
              </div>
              <div className={tw`mt-3 flex items-center gap-2 px-1 text-xs text-faint`}>
                <span className={tw`h-2 w-2 rounded-full`} style={{ background: '#8b6dff' }} />
                A barra de fundo de cada linha mostra a fatia daquele plano na receita total.
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`flex flex-col gap-3`}>
                <div className={tw`${cardCls} p-6`}>
                  <div className={tw`text-sm text-muted`}>{brl(MIX_BRUTO)} ÷ {MIX_CLIENTES} clientes</div>
                  <div className={tw`mt-1 font-display text-5xl font-bold text-gold`}>{brl(MIX_TICKET)}</div>
                  <div className={tw`mt-1 text-sm text-faint`}>ticket médio real → adotamos {brl(TICKET_MEDIO)}</div>
                </div>
                <div className={tw`flex flex-col gap-2.5 text-sm`}>
                  {[
                    ['Conservador', `A maioria (${MIX_CALC[0].qtd} de ${MIX_CLIENTES}) entra no plano mais barato. Não dependemos de vender a rede toda.`],
                    ['Rede Total atrai', `A R$ 1.750/tela, marcas fortes fecham os 4 pontos — cada uma vale 2,4× um ponto único.`],
                    ['Sobra espaço', `Essa mistura usa só ${MIX_TELAS_USADAS} de ${TELAS_TOTAIS} espaços (~${Math.round((MIX_TELAS_USADAS / TELAS_TOTAIS) * 100)}%). Cresce sem novo investimento.`],
                  ].map(([t, d]) => (
                    <div key={t} className={tw`flex gap-2.5 rounded-xl border border-white/[.06] bg-white/[.02] px-4 py-3`}>
                      <span className={tw`flex-none font-display text-xs font-bold uppercase tracking-wide text-violet-bright`}>{t}</span>
                      <span className={tw`text-muted`}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Slide>

        {/* 10 · CENÁRIOS = A DIVISÃO */}
        <Slide topL={<><span className={tw`text-violet`}>• PROJEÇÃO · A DIVISÃO</span> · 10</>} topR="SÓCIOS · 10">
          <Reveal><div className={tw`${kicker} mb-5`}>Resultado mensal · operação cheia</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading} max-w-3xl`}>O mesmo bruto, duas divisões com o shopping.</h2></Reveal>
          <div className={tw`mt-9 grid gap-4 lg:grid-cols-2`}>
            {[split40, split50].map((s, i) => (
              <Reveal key={s.shoppingPct} delay={0.15 + i * 0.1}>
                <div className={tw`h-full rounded-2xl border p-7 ${i === 0 ? 'border-gold/45 bg-gold/[.05]' : 'border-white/[.07] bg-white/[.025]'}`}>
                  <div className={tw`flex items-baseline justify-between`}>
                    <div className={tw`font-display text-lg font-bold text-ink`}>Shopping fica com {Math.round(s.shoppingPct * 100)}%</div>
                    <div className={tw`font-display text-sm font-bold ${i === 0 ? 'text-gold' : 'text-violet-bright'}`}>operação fica com {Math.round((1 - s.shoppingPct) * 100)}%</div>
                  </div>
                  <div className={tw`mt-1 text-xs text-faint`}>{CLIENTES} clientes · ticket médio {brl(TICKET_MEDIO)}</div>
                  <div className={tw`mt-5 flex flex-col gap-2.5 text-sm`}>
                    <Row k="Receita bruta/mês" v={brl(s.bruto)} />
                    <Row k={`(–) Repasse ao shopping (${Math.round(s.shoppingPct * 100)}%)`} v={`– ${brl(s.repasse)}`} faint />
                    <Row k="(–) Custo fixo" v={`– ${brl(s.opex)}`} faint />
                    <div className={tw`my-1 h-px bg-white/10`} />
                    <Row k="Lucro líquido/mês" v={brl(s.liquido)} strong accent={i === 0 ? 'gold' : 'violet'} />
                  </div>
                  <div className={tw`mt-5 grid grid-cols-2 gap-3`}>
                    <div className={tw`rounded-xl border px-4 py-3 ${i === 0 ? 'border-gold/30 bg-gold/[.06]' : 'border-violet/25 bg-violet/[.05]'}`}>
                      <div className={tw`text-xs text-muted`}>Payback (operação cheia)</div>
                      <div className={tw`font-display text-xl font-bold ${i === 0 ? 'text-gold' : 'text-violet-bright'}`}>~{Math.ceil(s.payback)} {Math.ceil(s.payback) === 1 ? 'mês' : 'meses'}</div>
                    </div>
                    <div className={tw`rounded-xl border border-white/10 px-4 py-3`}>
                      <div className={tw`text-xs text-muted`}>Lucro/ano</div>
                      <div className={tw`font-display text-xl font-bold text-ink`}>{brl(s.liquido * 12)}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.5}>
            <p className={tw`mt-6 text-xs leading-relaxed text-faint`}>
              Números de operação cheia ({CLIENTES} clientes). A diferença entre as colunas é só o percentual negociado com o shopping — o resto é idêntico.
            </p>
          </Reveal>
        </Slide>

        {/* 11 · RESUMO / DECISÃO */}
        <Slide topL={<><span className={tw`text-violet`}>• RESUMO · DECISÃO</span> · 11</>} topR="SÓCIOS · 11">
          <div className={tw`text-center`}>
            <Reveal><div className={tw`font-display text-xs tracking-[0.3em] text-gold uppercase`}>Os números, em uma tela</div></Reveal>
            <Reveal delay={0.1}>
              <h1
                className={tw`mt-5 font-display text-5xl font-bold leading-tight tracking-tight sm:text-7xl`}
                style={{ background: 'linear-gradient(120deg,#fff 30%,#a98bff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
              >
                Vale a pena.
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <div className={tw`mx-auto mt-9 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
                <Stat value={brl(CAPEX_TOTAL)} label="Entra (CAPEX, 4 totens)" />
                <Stat value={`Mês ${breakEven}`} accent="gold" label="Investimento recuperado" />
                <Stat value={`${brl(split50.liquido)}–${brl(split40.liquido)}`} accent="gold" label="Lucro líquido/mês (divisão 50%→40%)" />
                <Stat value={brl(fim.acumulado)} label="Caixa acumulado em 12 meses" />
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className={tw`mx-auto mt-9 w-full max-w-sm rounded-2xl border border-violet/25 bg-white/[.025] px-6 py-5`}>
                <div className={tw`font-display text-[0.6rem] tracking-[0.3em] text-violet-bright uppercase`}>Apresentado para</div>
                <div className={tw`mt-1.5 font-display text-2xl font-bold text-ink`}>{APRESENTADO_PARA}</div>
                <div className={tw`mt-3 border-t border-white/10 pt-3 font-display text-[0.6rem] tracking-[0.3em] text-gold uppercase`}>Contrato via</div>
                <div className={tw`mt-1 text-sm font-semibold text-muted`}>{CONTRATO_VIA}</div>
              </div>
            </Reveal>
            <Reveal delay={0.55}>
              <button
                onClick={onHome}
                className={tw`mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-display text-sm font-bold text-ink transition hover:border-violet/50 hover:bg-violet/[.06]`}
              >
                ← Voltar ao pitch institucional
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
            className={tw`h-2.5 w-2.5 rounded-full border transition ${current === i ? 'scale-125 border-violet bg-violet' : 'border-white/25 bg-transparent'}`}
            style={current === i ? { boxShadow: '0 0 12px rgba(124,92,255,.6)' } : undefined}
          />
        ))}
      </div>

      {/* home button */}
      <button
        onClick={onHome}
        className={tw`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/15 bg-bg/70 px-6 py-3 font-display text-sm font-bold text-ink backdrop-blur transition hover:border-violet/50 lg:left-5 lg:translate-x-0`}
      >
        ← Pitch
      </button>
    </div>
  )
}
