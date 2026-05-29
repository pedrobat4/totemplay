import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { tw } from '../twind'
import { Wheel } from './Wheel'
import { VIOLET_GRADIENT, CTA_SHADOW, cardCls } from '../ui'

/* ---------- helpers ---------- */

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function MiniWheel({ size = 180, spin = true }: { size?: number; spin?: boolean }) {
  return <Wheel rotation={0} favoriteId={1} spinning={false} idle={spin} size={size} />
}

type SlideProps = { topL: ReactNode; topR: string; botR: string; children: ReactNode }
function Slide({ topL, topR, botR, children }: SlideProps) {
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
          <i className={tw`inline-block h-2 w-2 rotate-45 bg-violet`} /> TOTEMPLAY
        </span>
        <span className={tw`hidden text-white/15 sm:inline`}>{botR}</span>
      </div>
    </section>
  )
}

const kicker = 'font-display text-xs font-medium uppercase tracking-[0.3em] text-violet-bright'
const heading = 'font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl'

function InfoCard({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div
      className={tw`${cardCls} p-6 transition hover:-translate-y-1 hover:border-violet/40 hover:bg-violet/5`}
    >
      <div className={tw`font-bold text-violet-bright`}>{tag}</div>
      <div className={tw`mt-2 text-xl font-bold leading-tight text-ink`}>{title}</div>
      <p className={tw`mt-3 text-sm leading-relaxed text-muted`}>{desc}</p>
    </div>
  )
}

function BenefitBox({
  title,
  color,
  items,
}: {
  title: string
  color: string
  items: [string, string][]
}) {
  return (
    <div className={tw`${cardCls} p-5`}>
      <div className={tw`mb-3 flex items-center gap-2.5`}>
        <span className={tw`h-3 w-3 rounded`} style={{ background: color }} />
        <h3 className={tw`font-display text-lg font-bold text-ink`}>{title}</h3>
      </div>
      <ul className={tw`flex flex-col gap-2.5`}>
        {items.map(([tag, desc]) => (
          <li key={tag} className={tw`flex gap-2.5 text-sm leading-snug`}>
            <span className={tw`mt-0.5 flex-none font-semibold`} style={{ color }}>
              {tag}
            </span>
            <span className={tw`text-muted`}>{desc}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DemoButton({ onClick, label = 'Ver demonstração' }: { onClick: () => void; label?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={tw`inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 font-display text-base font-bold tracking-wide text-bg`}
      style={{ background: VIOLET_GRADIENT, boxShadow: CTA_SHADOW }}
    >
      ▶ {label}
    </motion.button>
  )
}

/* ---------- main ---------- */

export function Pitch({ onSeeDemo }: { onSeeDemo: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(13)

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const slides = Array.from(root.querySelectorAll('[data-slide]'))
    setTotal(slides.length)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.55) {
            setCurrent(slides.indexOf(e.target))
          }
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
        {/* 01 COVER */}
        <Slide topL={<><span className={tw`text-violet`}>• PITCH INSTITUCIONAL</span> · MONTES CLAROS SHOPPING</>} topR="PITCH · V1.0" botR="">
          <div className={tw`grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]`}>
            <div>
              <Reveal>
                <span className={tw`inline-flex items-center gap-2 rounded-full border border-violet/35 bg-violet/[.07] px-5 py-2.5 text-sm font-semibold text-violet-bright`}>
                  Apresentação confidencial · 2026
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className={tw`mt-7 font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-8xl`}>
                  Totem
                  <span
                    style={{
                      background: 'linear-gradient(120deg,#a98bff,#5b3fd6)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Play
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className={tw`mt-6 max-w-md text-2xl leading-snug text-muted`}>
                  Transformamos curiosidade em cliente na loja.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className={tw`mt-7 flex flex-wrap gap-3`}>
                  <span className={tw`rounded-full border border-gold/40 bg-gold/[.06] px-5 py-2.5 text-sm font-semibold text-gold`}>
                    Totem 4K · 60"
                  </span>
                  <span className={tw`rounded-full border border-violet/30 bg-violet/[.06] px-5 py-2.5 text-sm font-semibold text-violet-bright`}>
                    Gamificação · Lead qualificado · Mídia indoor
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.45}>
                <div className={tw`mt-9`}>
                  <DemoButton onClick={onSeeDemo} label="Ver demonstração da roleta" />
                </div>
              </Reveal>
            </div>

            {/* totem mockup */}
            <Reveal delay={0.2}>
              <div className={tw`flex flex-col items-center`} style={{ filter: 'drop-shadow(0 40px 80px rgba(91,63,214,.35))' }}>
                <div className={tw`w-[300px] max-w-full rounded-[30px] border-[3px] border-[#1b1730] bg-[#07060f] px-6 pb-6 pt-6`}>
                  <div className={tw`text-center font-display text-lg font-bold tracking-wide text-ink`}>GIRE E GANHE</div>
                  <div className={tw`mb-3 text-center text-xs text-faint`}>Toque para começar</div>
                  <div className={tw`flex justify-center`}>
                    <MiniWheel size={196} />
                  </div>
                  <div className={tw`mt-4 rounded-xl border border-violet/35 bg-violet/[.05] px-4 py-3`}>
                    <div className={tw`font-display text-[0.6rem] tracking-[0.22em] text-violet-bright`}>PRÊMIO</div>
                    <div className={tw`text-sm font-bold text-ink`}>20% OFF · Loja Parceira</div>
                  </div>
                  <div className={tw`mt-2 rounded-xl border border-gold/35 bg-gold/[.05] px-4 py-3`}>
                    <div className={tw`font-display text-[0.6rem] tracking-[0.22em] text-gold`}>QR CODE</div>
                    <div className={tw`text-sm font-bold text-ink`}>Endereço da loja</div>
                  </div>
                </div>
                <div className={tw`h-4 w-[62%] rounded-b-lg bg-[#0d0b18]`} />
                <div className={tw`mt-2 h-6 w-[40%] rounded-lg bg-[#070610]`} style={{ boxShadow: '0 30px 40px rgba(0,0,0,.6)' }} />
              </div>
            </Reveal>
          </div>

        </Slide>

        {/* BENEFÍCIOS (resumo) — slide próprio para não cortar */}
        <Slide topL={<><span className={tw`text-violet`}>• VISÃO GERAL</span> · BENEFÍCIOS</>} topR="RESUMO" botR="BENEFÍCIOS">
          <Reveal><div className={tw`${kicker} mb-5`}>Por que instalar</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading} max-w-3xl`}>Ganhos diretos para o shopping e para o lojista.</h2></Reveal>
          <div className={tw`mt-10 grid gap-4 sm:grid-cols-2`}>
            <Reveal delay={0.2}>
              <BenefitBox
                title="Para o shopping"
                color="#8b6dff"
                items={[
                  ['Tráfego', 'Fluxo direcionado aos corredores estratégicos'],
                  ['Permanência', 'Tempo de visita ampliado pela descoberta gamificada'],
                  ['Dados', 'Base própria de clientes qualificados (LGPD)'],
                  ['Receita', 'Nova linha de mídia por impressão qualificada'],
                ]}
              />
            </Reveal>
            <Reveal delay={0.3}>
              <BenefitBox
                title="Para o lojista"
                color="#e9b96e"
                items={[
                  ['Lead', 'Lead qualificado com nome, contato e interesse'],
                  ['Presença', 'Prêmio retirado dentro da loja (QR) = pisada na porta'],
                  ['ROI', 'Funil mensurável ponta a ponta'],
                  ['Perfil', 'Acesso ao perfil de quem marcou a loja como favorita'],
                ]}
              />
            </Reveal>
          </div>
        </Slide>

        {/* 02 PROBLEMA */}
        <Slide topL={<><span className={tw`text-violet`}>• O PROBLEMA</span> · 02</>} topR="02 · O PROBLEMA" botR="02 · O PROBLEMA">
          <Reveal><div className={tw`${kicker} mb-5`}>Contexto de mercado</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading} max-w-3xl`}>O shopping disputa atenção. A mídia indoor não consegue medi-la.</h2></Reveal>
          <div className={tw`mt-10 grid gap-10 sm:grid-cols-2`}>
            <Reveal delay={0.2}>
              <div className={tw`mb-4 flex items-center gap-3 font-display text-violet-bright`}>
                <span className={tw`flex h-9 w-9 items-center justify-center rounded-xl border border-violet/30 bg-violet/[.08]`}>☀</span>
                — Atenção fragmentada
              </div>
              <p className={tw`text-xl font-bold leading-relaxed text-ink`}>
                Shopping centers competem hoje com e-commerce, delivery e entretenimento em casa — capturar a atenção de quem entra deixou de ser garantido.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`mb-4 flex items-center gap-3 font-display text-violet-bright`}>
                <span className={tw`flex h-9 w-9 items-center justify-center rounded-xl border border-violet/30 bg-violet/[.08]`}>◎</span>
                — Dado anônimo
              </div>
              <p className={tw`text-xl font-bold leading-relaxed text-ink`}>
                Mídia indoor tradicional é vendida por minutagem — sem qualquer dado sobre quem viu, quem se interessou ou quem foi até a loja.
              </p>
            </Reveal>
          </div>
        </Slide>

        {/* 03 SOLUÇÃO */}
        <Slide topL={<><span className={tw`text-violet`}>• A SOLUÇÃO</span> · 03</>} topR="03 · SOLUÇÃO" botR="03 · SOLUÇÃO">
          <Reveal><div className={tw`${kicker} mb-5`}>Em uma frase</div></Reveal>
          <Reveal delay={0.1}>
            <h1 className={tw`max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl`}>
              Um totem que transforma <span className={tw`text-violet-bright`}>curiosidade</span> em{' '}
              <span className={tw`text-violet-bright`}>lead qualificado</span> — e em{' '}
              <span className={tw`text-gold`}>cliente na porta da loja</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className={tw`mt-10 max-w-2xl text-xl leading-relaxed text-muted`}>
              60 polegadas, 4K, touch — instalado em corredores estratégicos do shopping. Gamificação real, recompensa real, dado real.
            </p>
          </Reveal>
        </Slide>

        {/* 04 JORNADA */}
        <Slide topL={<><span className={tw`text-violet`}>• COMO FUNCIONA</span> · 04</>} topR="04 · JORNADA" botR="04 · JORNADA">
          <Reveal><div className={tw`${kicker} mb-5`}>Jornada do visitante</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading} max-w-3xl`}>Cinco passos. Um minuto. Um cliente caminhando até a loja.</h2></Reveal>
          <div className={tw`mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5`}>
            {[
              ['01', 'Toca a tela', 'Atraído pelo movimento e pela roleta, o visitante encosta no totem.'],
              ['02', 'Cadastro relâmpago', 'Só nome e telefone. Validação por SMS. Sem fricção, sem desistência.'],
              ['03', 'Escolhe favoritas', 'Seleciona as lojas e categorias que mais lhe interessam.'],
              ['04', 'Gira a roleta', 'Roleta inteligente: probabilidade ponderada para as lojas favoritas.'],
              ['05', 'Recebe QR + endereço', 'QR code do prêmio e rota até a loja parceira no celular.'],
            ].map(([n, t, d], i) => (
              <Reveal key={n} delay={0.1 + i * 0.08}>
                <div className={tw`h-full ${cardCls} p-5`}>
                  <div className={tw`font-display text-4xl font-bold text-violet-bright`}>{n}</div>
                  <h3 className={tw`mt-3 font-bold text-ink`}>{t}</h3>
                  <p className={tw`mt-2 text-sm leading-relaxed text-muted`}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Slide>

        {/* 05 DIFERENCIAL */}
        <Slide topL={<><span className={tw`text-violet`}>• DIFERENCIAL</span> · 05</>} topR="05 · DIFERENCIAL" botR="05 · DIFERENCIAL">
          <div className={tw`grid items-center gap-12 lg:grid-cols-2`}>
            <div>
              <Reveal><div className={tw`${kicker} mb-4`}>O algoritmo</div></Reveal>
              <Reveal delay={0.1}><h1 className={tw`font-display text-5xl font-bold leading-tight tracking-tight text-ink`}>Roleta<br />Inteligente.</h1></Reveal>
              <Reveal delay={0.2}>
                <p className={tw`mt-6 max-w-md text-lg leading-relaxed text-muted`}>
                  A roleta não é aleatória. Ela ajusta a probabilidade de cada setor de forma ponderada pelo interesse do cliente — pelas lojas que ele marcou como favoritas e pelas metas de tráfego pactuadas com cada lojista.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <ul className={tw`mt-7 flex flex-col gap-4`}>
                  {[
                    ['#8b6dff', 'Probabilidade dinâmica por loja e categoria'],
                    ['#8b6dff', 'Limites de prêmios e budget configuráveis'],
                    ['#e9b96e', 'Lead já entregue ao lojista com perfil de interesse'],
                  ].map(([c, t]) => (
                    <li key={t} className={tw`flex items-center gap-3 font-medium text-ink`}>
                      <span className={tw`h-3 w-3 flex-none rounded`} style={{ background: c }} /> {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className={tw`text-center`}>
                <div className={tw`mx-auto`} style={{ maxWidth: 340 }}>
                  <Wheel rotation={0} favoriteId={1} spinning={false} />
                </div>
                <div className={tw`mt-4 flex justify-center gap-6 text-sm text-muted`}>
                  <span className={tw`inline-flex items-center gap-2`}><i className={tw`h-3 w-3 rounded`} style={{ background: '#e9b96e' }} />Favorita (prioridade)</span>
                  <span className={tw`inline-flex items-center gap-2`}><i className={tw`h-3 w-3 rounded`} style={{ background: '#5b3fd6' }} />Catálogo geral</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Slide>

        {/* 06 MOCKUP */}
        <Slide topL={<><span className={tw`text-violet`}>• MOCKUP EM USO</span> · 06</>} topR="06 · MOCKUP" botR="06 · MOCKUP">
          <div className={tw`grid items-center gap-12 lg:grid-cols-2`}>
            <Reveal>
              <div className={tw`flex justify-center`}>
                <div className={tw`flex flex-col items-center`} style={{ filter: 'drop-shadow(0 30px 60px rgba(91,63,214,.4))' }}>
                  <div className={tw`w-[260px] rounded-[28px] border-[3px] border-[#1b1730] bg-[#07060f] px-5 pb-5 pt-5`}>
                    <div className={tw`text-center font-display font-bold text-ink`}>GIRE E GANHE</div>
                    <div className={tw`mb-2 text-center text-xs text-faint`}>Toque para começar</div>
                    <div className={tw`flex justify-center`}><MiniWheel size={150} /></div>
                    <div className={tw`mt-3 rounded-full border border-gold/40 py-2 text-center font-display text-xs font-bold tracking-wide text-gold`}>TOCAR PARA GIRAR</div>
                  </div>
                  <div className={tw`h-4 w-[60%] rounded-b-lg bg-[#0d0b18]`} />
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal><div className={tw`${kicker} mb-4`}>Cenário real</div></Reveal>
              <Reveal delay={0.1}><h1 className={tw`font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl`}>Atrai. Engaja. Direciona até a porta.</h1></Reveal>
              <Reveal delay={0.2}>
                <p className={tw`mt-6 max-w-md text-lg leading-relaxed text-muted`}>
                  Em corredores de fluxo médio-alto, a tela 4K em movimento captura o olhar; o gesto da roleta puxa a interação; o QR code converte a brincadeira em deslocamento real até a loja parceira.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <ul className={tw`mt-7 flex flex-col gap-4`}>
                  {[
                    ['A', '#8b6dff', 'Atração visual à distância (movimento em loop)'],
                    ['B', '#8b6dff', 'Engajamento por toque — sessão curta e completa'],
                    ['C', '#e9b96e', 'Conversão para loja (QR + rota guiada)'],
                  ].map(([l, c, t]) => (
                    <li key={l} className={tw`flex items-center gap-3 text-ink`}>
                      <span className={tw`flex h-8 w-8 flex-none items-center justify-center rounded-full font-display text-sm font-bold text-bg`} style={{ background: c }}>{l}</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Slide>

        {/* 07 SHOPPING */}
        <Slide topL={<><span className={tw`text-violet`}>• PARA O SHOPPING</span> · 07</>} topR="07 · SHOPPING" botR="07 · SHOPPING">
          <Reveal><div className={tw`${kicker} mb-5`}>Quatro ganhos diretos</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading}`}>Para o Montes Claros Shopping.</h2></Reveal>
          <div className={tw`mt-10 grid gap-4 sm:grid-cols-2`}>
            {[
              ['01 — Tráfego', 'Mais fluxo nos corredores estratégicos', 'Cada interação dispara um deslocamento intencional até uma loja específica. Tráfego direcionável por hora, dia e região do shopping. Estimativa: [___] deslocamentos direcionados/mês.'],
              ['02 — Permanência', 'Tempo de visita ampliado', 'Tempo de visita ampliado pela descoberta gamificada de lojas — métrica acompanhada no piloto. Meta de +[___] min de permanência média.'],
              ['03 — Dados', 'Base própria de clientes qualificados', 'Cadastro consentido (LGPD), com perfil de interesse por loja, frequência de visita e horários — ativo permanente do shopping. Projeção de [___] cadastros consentidos/mês.'],
              ['04 — Receita', 'Nova linha de receita de mídia', 'Espaço publicitário inteligente vendido por impressão qualificada, não por minutagem — margem superior à mídia tradicional. CPM qualificado vs. minutagem tradicional: até [___]x mais eficiente.'],
            ].map(([tag, title, desc], i) => (
              <Reveal key={tag} delay={0.1 + i * 0.08}><InfoCard tag={tag} title={title} desc={desc} /></Reveal>
            ))}
          </div>
        </Slide>

        {/* 08 LOJISTAS */}
        <Slide topL={<><span className={tw`text-violet`}>• PARA OS LOJISTAS</span> · 08</>} topR="08 · LOJISTAS" botR="08 · LOJISTAS">
          <Reveal><div className={tw`${kicker} mb-5`}>Quatro ganhos diretos</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading}`}>Para o lojista parceiro.</h2></Reveal>
          <div className={tw`mt-10 grid gap-4 sm:grid-cols-2`}>
            {[
              ['01 — Lead', 'Lead qualificado, não impressão genérica', 'Cada lead chega com nome, contato e a confirmação de interesse declarado na loja antes do giro.'],
              ['02 — Presença', 'Presença física garantida', 'O prêmio só é retirado dentro da loja, com leitura do QR — converte interação em pisada na porta.'],
              ['03 — ROI', 'Mensuração real, ponta a ponta', 'Funil completo: impressões → cadastros → leads qualificados → retiradas → vendas atribuídas.'],
              ['04 — Perfil', 'Conexão direta com perfil de interesse', 'Acesso ao perfil consolidado dos visitantes que escolheram a loja como favorita — base reutilizável em campanhas próprias.'],
            ].map(([tag, title, desc], i) => (
              <Reveal key={tag} delay={0.1 + i * 0.08}><InfoCard tag={tag} title={title} desc={desc} /></Reveal>
            ))}
          </div>
        </Slide>

        {/* 09 CLIENTE */}
        <Slide topL={<><span className={tw`text-violet`}>• PARA O CLIENTE</span> · 09</>} topR="09 · CLIENTE" botR="09 · CLIENTE">
          <Reveal><div className={tw`${kicker} mb-5`}>A razão pela qual o cliente toca</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading}`}>Para quem está no corredor.</h2></Reveal>
          <div className={tw`mt-10 grid gap-4 sm:grid-cols-3`}>
            {[
              ['01 — Diversão', 'Gamificação real', 'Brincadeira rápida, gesto familiar e expectativa de prêmio — o totem é um momento de pausa no passeio, não um anúncio.'],
              ['02 — Prêmio', 'Recompensa concreta', 'Descontos, brindes e experiências reais nas lojas do shopping — nada de cupom vazio que ninguém usa.'],
              ['03 — Descoberta', 'Lojas novas, sem garimpo', 'A roleta apresenta lojas afins ao perfil — o cliente sai conhecendo marcas que combinam com ele.'],
            ].map(([tag, title, desc], i) => (
              <Reveal key={tag} delay={0.1 + i * 0.1}><InfoCard tag={tag} title={title} desc={desc} /></Reveal>
            ))}
          </div>
        </Slide>

        {/* 10 ROADMAP */}
        <Slide topL={<><span className={tw`text-violet`}>• ROADMAP · MAIS FUNCIONALIDADES</span> · 10</>} topR="10 · ROADMAP" botR="10 · ROADMAP">
          <Reveal><div className={tw`${kicker} mb-5`}>Próximas evoluções</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading} max-w-4xl`}>Mais funcionalidades — de canal de captura a plataforma de relacionamento.</h2></Reveal>
          <div className={tw`mt-10 grid gap-4 sm:grid-cols-3`}>
            {[
              ['A — Gatilhos', 'Aniversários e datas comemorativas', 'Campanhas automáticas via SMS e WhatsApp para a base — convites com giro extra na data certa.'],
              ['B — Social', 'Selfie + compartilhamento social', 'Selfie no totem desbloqueia giro bônus ao compartilhar no Instagram — marketing orgânico pago em prêmios.'],
              ['C — Mídia', 'Publicidade segmentada dinâmica', 'Mídia vendida por impressão qualificada — não por minutagem. Margens superiores e métrica clara para o anunciante.'],
            ].map(([tag, title, desc], i) => (
              <Reveal key={tag} delay={0.1 + i * 0.1}>
                <div className={tw`h-full ${cardCls} p-6`}>
                  <div className={tw`text-sm font-semibold text-muted`}>{tag}</div>
                  <h3 className={tw`mt-3 text-lg font-bold text-ink`}>{title}</h3>
                  <p className={tw`mt-3 text-sm leading-relaxed text-muted`}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Slide>

        {/* 11 MODELO COMERCIAL */}
        <Slide topL={<><span className={tw`text-violet`}>• MODELO COMERCIAL</span> · 11</>} topR="11 · MODELO COMERCIAL" botR="11 · MODELO COMERCIAL">
          <Reveal><div className={tw`${kicker} mb-5`}>Operador · Lojistas · Shopping</div></Reveal>
          <Reveal delay={0.1}><h2 className={tw`${heading}`}>Como o dinheiro circula.</h2></Reveal>
          <Reveal delay={0.2}>
            <div className={tw`mt-9 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]`}>
              <div className={tw`rounded-2xl border border-violet/50 bg-violet/[.06] p-6`}>
                <div className={tw`mb-2 font-display text-xs tracking-[0.18em] text-violet-bright`}>01 · OPERADOR</div>
                <h3 className={tw`text-2xl font-bold text-ink`}>TotemPlay</h3>
                <p className={tw`mt-2 text-sm text-muted`}>
                  Opera e mantém o totem.{' '}
                  <span className={tw`font-bold text-gold`}>CAPEX, OPEX e time são nossos.</span>
                </p>
              </div>
              <div className={tw`flex flex-col items-center justify-center gap-1 text-xs font-semibold text-violet-bright`}>
                <span>Mensalidade</span><span className={tw`text-violet`}>→</span><span>Lead</span>
              </div>
              <div className={tw`${cardCls} p-6`}>
                <div className={tw`mb-2 font-display text-xs tracking-[0.18em] text-violet-bright`}>02 · PAGAM</div>
                <h3 className={tw`text-2xl font-bold text-ink`}>Lojistas</h3>
                <p className={tw`mt-2 text-sm text-muted`}>Pagam plano fixo + bônus por lead qualificado entregue na loja.</p>
              </div>
              <div className={tw`flex flex-col items-center justify-center gap-1 text-xs font-semibold text-gold`}>
                <span>% da mídia</span><span>→</span><span>Base de dados</span>
              </div>
              <div className={tw`${cardCls} p-6`}>
                <div className={tw`mb-2 font-display text-xs tracking-[0.18em] text-gold`}>03 · RECEBE</div>
                <h3 className={tw`text-2xl font-bold text-ink`}>Shopping</h3>
                <p className={tw`mt-2 text-sm text-muted`}>Recebe percentual da receita de mídia + a base de dados.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <div className={tw`mt-6 grid gap-3 sm:grid-cols-3`}>
              {[
                ['A', '#8b6dff', 'Assinatura do lojista', 'Plano mensal + bônus por lead qualificado.'],
                ['B', '#8b6dff', 'Mídia dinâmica', 'Inventário entre giros, por impressão qualificada.'],
                ['C', '#e9b96e', 'Dado anonimizado', 'Insights agregados de fluxo e perfil.'],
              ].map(([l, c, t, d]) => (
                <div key={l} className={tw`flex items-start gap-3 ${cardCls} rounded-xl px-4 py-4`}>
                  <span className={tw`flex h-8 w-8 flex-none items-center justify-center rounded-lg font-display font-bold text-bg`} style={{ background: c }}>{l}</span>
                  <div><h4 className={tw`font-bold text-ink`}>{t}</h4><p className={tw`mt-0.5 text-xs leading-relaxed text-muted`}>{d}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </Slide>

        {/* 12 LGPD */}
        <Slide topL={<><span className={tw`text-violet`}>• LGPD · PRIVACIDADE</span> · 12</>} topR="12 · LGPD" botR="12 · LGPD">
          <div className={tw`grid items-center gap-10 lg:grid-cols-[0.9fr_1.4fr]`}>
            <div>
              <Reveal><div className={tw`${kicker} mb-4`}>Conformidade</div></Reveal>
              <Reveal delay={0.1}><h1 className={tw`max-w-xs font-display text-4xl font-bold leading-tight tracking-tight text-ink`}>Dado coletado com consentimento explícito.</h1></Reveal>
              <Reveal delay={0.2}>
                <div className={tw`mt-7 flex h-28 w-28 items-center justify-center rounded-3xl border border-violet/30 bg-violet/[.07] text-violet-bright`}>
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15" r="1.4" fill="currentColor" /></svg>
                </div>
              </Reveal>
            </div>
            <div className={tw`grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
              {[
                ['01', 'Opt-in claro', 'No cadastro, com finalidade descrita em linguagem simples antes de qualquer coleta.'],
                ['02', 'Infraestrutura brasileira', 'Dados em data center no Brasil, com criptografia em repouso e em trânsito.'],
                ['03', 'Direito ao esquecimento', 'Cliente solicita exclusão pelo QR code recebido — processo automatizado.'],
                ['04', 'Compartilhamento mínimo', 'Lojista recebe lead apenas de quem escolheu aquela loja como favorita.'],
              ].map(([n, t, d], i) => (
                <Reveal key={n} delay={0.1 + i * 0.08}>
                  <div className={tw`h-full ${cardCls} p-5`}>
                    <div className={tw`font-display text-sm font-semibold text-faint`}>{n}</div>
                    <h3 className={tw`mt-2 font-bold text-ink`}>{t}</h3>
                    <p className={tw`mt-2 text-xs leading-relaxed text-muted`}>{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.3}>
            <div className={tw`mt-8 flex items-center gap-3 rounded-2xl border border-violet/30 bg-violet/[.05] px-6 py-4 text-ink`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a98bff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m8 12 3 3 5-6" /></svg>
              Em conformidade com a LGPD. Política de privacidade revisada juridicamente.
            </div>
          </Reveal>
        </Slide>

        {/* 13 OBRIGADO */}
        <Slide topL={<><span className={tw`text-violet`}>• ENCERRAMENTO</span> · 13</>} topR="13 · OBRIGADO" botR="13 · OBRIGADO">
          <div className={tw`text-center`}>
            <Reveal><div className={tw`font-display text-xs tracking-[0.3em] text-gold uppercase`}>TOTEMPLAY · PITCH ENCERRADO</div></Reveal>
            <Reveal delay={0.1}>
              <h1
                className={tw`mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl`}
                style={{ background: 'linear-gradient(120deg,#fff 30%,#a98bff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
              >
                A solução está pronta. Hoje.
              </h1>
            </Reveal>
            <Reveal delay={0.25}><div className={tw`mx-auto my-7 h-2.5 w-2.5 rounded-full bg-gold`} style={{ boxShadow: '0 0 20px rgba(233,185,110,.7)' }} /></Reveal>
            <Reveal delay={0.35}>
              <div className={tw`mx-auto max-w-xl space-y-4 text-lg leading-relaxed text-muted`}>
                <p>Não é protótipo nem promessa de roadmap — é um totem operando, do toque na tela ao QR na loja. Instalação em 1 dia: escolhem o corredor, ligamos, está rodando.</p>
                <p>Quer ver no piloto antes de escalar? Também montamos. Mas a tecnologia já existe e já funciona.</p>
              </div>
            </Reveal>
            <Reveal delay={0.45}>
              <p className={tw`mt-8 font-display text-2xl font-bold text-gold sm:text-3xl`}>Vamos ligar o primeiro?</p>
            </Reveal>
            <Reveal delay={0.55}>
              <div className={tw`mx-auto mt-9 w-full max-w-xs rounded-2xl border border-violet/25 bg-white/[.025] px-6 py-5`}>
                <div className={tw`font-display text-[0.6rem] tracking-[0.3em] text-violet-bright uppercase`}>Apresentado para</div>
                <div className={tw`mt-1.5 font-display text-2xl font-bold text-ink`}>Marllon Paiva</div>
              </div>
            </Reveal>
            <Reveal delay={0.65}>
              <div className={tw`mt-8`}>
                <DemoButton onClick={onSeeDemo} label="Ver demonstração da roleta" />
              </div>
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

      {/* persistent demo CTA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSeeDemo}
        className={tw`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 py-3 font-display text-sm font-bold text-bg lg:left-auto lg:right-5 lg:translate-x-0`}
        style={{ background: VIOLET_GRADIENT, boxShadow: CTA_SHADOW }}
      >
        ▶ Ver demonstração
      </motion.button>
    </div>
  )
}
