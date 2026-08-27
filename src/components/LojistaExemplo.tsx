import type { ReactNode } from 'react'
import { tw } from '../twind'
import { Wheel } from './Wheel'
import { FakeQR } from './FakeQR'
import { cardCls } from '../ui'
import { DEMO_USER, PRIZE_PERCENT } from '../data'
import { CONTATO_URL, CtaButton, LojistaShell, Reveal, headingCls, kickerCls } from './LojistaShell'

const section = 'mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24'

// Nome fictício usado no walkthrough para representar a loja do lojista.
const LOJA = 'Sua Loja'
const LOJA_INFO = 'Moda & Estilo · Piso L1'

function PrizeTicket() {
  return (
    <div
      className={tw`relative w-full max-w-sm overflow-hidden rounded-3xl border border-violet/40 p-7 text-center`}
      style={{
        background: 'linear-gradient(150deg, rgba(124,92,255,.18), rgba(91,63,214,.06))',
        boxShadow: '0 30px 80px rgba(124,92,255,.4)',
      }}
    >
      <div
        className={tw`pointer-events-none absolute inset-0 animate-shimmer`}
        style={{
          background: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,.14) 50%, transparent 65%)',
          backgroundSize: '200% 100%',
        }}
      />
      <span className={tw`absolute left-[-12px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-bg2`} />
      <span className={tw`absolute right-[-12px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-bg2`} />
      <div className={tw`text-sm font-semibold tracking-wide text-violet-bright`}>VALE-DESCONTO</div>
      <div
        className={tw`my-2 font-display text-7xl font-bold leading-none`}
        style={{
          background: 'linear-gradient(120deg, #fff, #a98bff)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {PRIZE_PERCENT}% <span className={tw`text-4xl`}>OFF</span>
      </div>
      <div className={tw`mt-3 flex items-center justify-center gap-2 text-ink`}>
        <span
          className={tw`flex h-7 w-7 items-center justify-center rounded-lg font-display text-xs font-bold text-bg`}
          style={{ background: '#8b6dff' }}
        >
          ★
        </span>
        <span className={tw`font-bold`}>{LOJA}</span>
        <span className={tw`text-muted`}>· {LOJA_INFO.split(' · ')[1]}</span>
      </div>
    </div>
  )
}

function TimelineItem({
  n,
  time,
  title,
  desc,
  last = false,
  children,
}: {
  n: string
  time: string
  title: string
  desc: string
  last?: boolean
  children?: ReactNode
}) {
  return (
    <div className={tw`relative flex gap-5 sm:gap-8`}>
      {/* trilha */}
      <div className={tw`flex flex-col items-center`}>
        <span
          className={tw`z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-violet/40 bg-bg font-display text-sm font-bold text-violet-bright`}
          style={{ boxShadow: '0 0 18px rgba(124,92,255,.35)' }}
        >
          {n}
        </span>
        {!last && <span className={tw`w-px flex-1 bg-gradient-to-b from-violet/40 to-violet/5`} />}
      </div>
      <div className={tw`flex-1 pb-12 ${last ? 'pb-2' : ''}`}>
        <div className={tw`font-display text-[0.65rem] font-semibold tracking-[0.25em] text-gold`}>{time}</div>
        <h3 className={tw`mt-1.5 text-xl font-bold text-ink sm:text-2xl`}>{title}</h3>
        <p className={tw`mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base`}>{desc}</p>
        {children && <div className={tw`mt-5`}>{children}</div>}
      </div>
    </div>
  )
}

function LeadRow({ label, value, gold = false }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className={tw`flex flex-col gap-0.5 border-b border-white/[.06] py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between`}>
      <span className={tw`font-display text-[0.65rem] font-semibold tracking-[0.22em] text-faint uppercase`}>{label}</span>
      <span className={tw`font-bold ${gold ? 'text-gold' : 'text-ink'}`}>{value}</span>
    </div>
  )
}

type Props = {
  onApresentacao: () => void
  onExemplo: () => void
  onDemo: () => void
}

export function LojistaExemplo({ onApresentacao, onExemplo, onDemo }: Props) {
  return (
    <LojistaShell page={2} onApresentacao={onApresentacao} onExemplo={onExemplo}>
      {/* HERO */}
      <section className={tw`${section} pt-14 text-center sm:pt-20`}>
        <Reveal>
          <span className={tw`inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/[.06] px-5 py-2.5 text-sm font-semibold text-gold`}>
            Página 2 · Exemplo na prática — dados fictícios
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className={tw`mx-auto mt-7 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-7xl`}>
            Da tela do totem{' '}
            <span
              style={{
                background: 'linear-gradient(120deg,#a98bff,#5b3fd6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              até o seu caixa.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={tw`mx-auto mt-6 max-w-xl text-xl leading-snug text-muted`}>
            Acompanhe a jornada de um visitante do shopping — do primeiro toque no totem ao prêmio
            validado dentro da loja. Aqui, a loja do exemplo é a sua: <strong className={tw`text-ink`}>{LOJA}</strong>.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className={tw`mt-9 flex flex-wrap justify-center gap-3`}>
            <CtaButton variant="ghost" onClick={onDemo}>
              ▶ Prefere girar você mesmo? Abra a demonstração
            </CtaButton>
          </div>
        </Reveal>
      </section>

      {/* TIMELINE */}
      <section className={tw`${section}`}>
        <Reveal>
          <div className={tw`${kickerCls} mb-5`}>A jornada, minuto a minuto</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={tw`${headingCls} max-w-3xl`}>Uma tarde comum no corredor do shopping.</h2>
        </Reveal>

        <div className={tw`mt-12`}>
          <Reveal>
            <TimelineItem
              n="01"
              time="14H32 · CORREDOR CENTRAL"
              title="O visitante vê a roleta girando e toca a tela"
              desc="A tela 4K em movimento captura o olhar de quem passa. A curiosidade puxa o primeiro toque — sem promotor, sem abordagem."
            />
          </Reveal>
          <Reveal delay={0.05}>
            <TimelineItem
              n="02"
              time="14H33 · CADASTRO RELÂMPAGO"
              title="Nome e telefone, validados por SMS"
              desc="Cadastro em segundos, com consentimento explícito (LGPD). É aqui que a interação anônima vira um contato real."
            >
              <div className={tw`${cardCls} max-w-sm p-5`}>
                <div className={tw`font-display text-[0.6rem] tracking-[0.22em] text-violet-bright`}>CADASTRO CONFIRMADO ✓</div>
                <div className={tw`mt-2 text-lg font-bold text-ink`}>{DEMO_USER.name}</div>
                <div className={tw`text-sm text-muted`}>{DEMO_USER.phone}</div>
              </div>
            </TimelineItem>
          </Reveal>
          <Reveal delay={0.05}>
            <TimelineItem
              n="03"
              time="14H34 · INTERESSE DECLARADO"
              title={`Ele marca ${LOJA} como favorita`}
              desc="Antes de girar, o visitante escolhe as lojas que mais lhe interessam. Cada favorito é uma declaração de interesse — o dado mais valioso do funil."
            >
              <span className={tw`inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/[.07] px-5 py-2.5 text-sm font-bold text-gold`}>
                ★ {LOJA} · {LOJA_INFO}
              </span>
            </TimelineItem>
          </Reveal>
          <Reveal delay={0.05}>
            <TimelineItem
              n="04"
              time="14H35 · O GIRO"
              title="A roleta inteligente pondera as favoritas — e para na sua loja"
              desc="O setor da sua loja, marcado como favorito, recebe probabilidade maior no sorteio. O algoritmo equilibra o interesse do cliente com as metas de tráfego de cada lojista."
            >
              <div className={tw`grid items-center gap-6 sm:grid-cols-[auto_1fr]`}>
                <div style={{ width: 220 }}>
                  <Wheel rotation={0} favoriteId={1} spinning={false} size={220} />
                </div>
                <div className={tw`flex flex-col gap-3 text-sm text-muted`}>
                  <span className={tw`inline-flex items-center gap-2`}>
                    <i className={tw`h-3 w-3 flex-none rounded`} style={{ background: '#e9b96e' }} />
                    Setor da sua loja em destaque: favorita do cliente
                  </span>
                  <span className={tw`inline-flex items-center gap-2`}>
                    <i className={tw`h-3 w-3 flex-none rounded`} style={{ background: '#5b3fd6' }} />
                    Demais lojas do catálogo
                  </span>
                </div>
              </div>
            </TimelineItem>
          </Reveal>
          <Reveal delay={0.05}>
            <TimelineItem
              n="05"
              time="14H36 · O PRÊMIO"
              title={`Vale de ${PRIZE_PERCENT}% OFF com QR code e rota até a loja`}
              desc="O prêmio não termina na tela: ele leva o endereço da loja e só vale dentro dela. O visitante sai do totem caminhando na sua direção."
            >
              <div className={tw`flex flex-wrap items-center gap-6`}>
                <PrizeTicket />
                <div className={tw`flex items-center gap-4 rounded-2xl border border-violet/20 bg-white/[.03] p-4`}>
                  <FakeQR seed={36} size={110} />
                  <div className={tw`max-w-[170px] text-left text-sm text-muted`}>
                    <div className={tw`font-bold text-ink`}>Retire na loja</div>
                    QR apresentado no caixa da {LOJA} para validar o desconto.
                  </div>
                </div>
              </div>
            </TimelineItem>
          </Reveal>
          <Reveal delay={0.05}>
            <TimelineItem
              n="06"
              time="14H41 · DENTRO DA LOJA"
              title="QR validado no caixa. Interação virou cliente."
              desc="A leitura do QR fecha o ciclo: confirma a visita, valida o prêmio e marca o lead como convertido em presença física — pronto para virar venda."
              last
            />
          </Reveal>
        </div>
      </section>

      {/* O LEAD QUE CHEGA */}
      <section className={tw`${section}`}>
        <div className={tw`grid items-center gap-12 lg:grid-cols-2`}>
          <div>
            <Reveal>
              <div className={tw`${kickerCls} mb-4`}>O que chega para você</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className={tw`${headingCls}`}>O lead completo, entregue na sua mão.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={tw`mt-6 max-w-md text-lg leading-relaxed text-muted`}>
                Nada de impressão genérica: cada lead chega identificado, com o interesse declarado na
                sua loja e o status da retirada do prêmio. Você enxerga o funil ponta a ponta —
                interações, cadastros, leads da sua loja, retiradas e vendas atribuídas.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className={tw`mt-7 flex flex-col gap-4`}>
                {[
                  ['#8b6dff', 'Nome e contato reais, validados por SMS'],
                  ['#8b6dff', 'Interesse declarado: ele escolheu a sua loja'],
                  ['#e9b96e', 'Retirada do prêmio confirma a visita física'],
                ].map(([c, t]) => (
                  <li key={t} className={tw`flex items-center gap-3 font-medium text-ink`}>
                    <span className={tw`h-3 w-3 flex-none rounded`} style={{ background: c }} /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div
              className={tw`mx-auto w-full max-w-md rounded-3xl border border-violet/30 bg-white/[.03] p-7`}
              style={{ boxShadow: '0 30px 80px rgba(91,63,214,.25)' }}
            >
              <div className={tw`flex items-center justify-between`}>
                <span className={tw`font-display text-[0.65rem] font-semibold tracking-[0.25em] text-violet-bright`}>
                  LEAD QUALIFICADO · EXEMPLO
                </span>
                <span className={tw`rounded-full border border-gold/40 bg-gold/[.08] px-3 py-1 text-[0.65rem] font-bold text-gold`}>
                  ✓ PRÊMIO RESGATADO
                </span>
              </div>
              <div className={tw`mt-5`}>
                <LeadRow label="Nome" value={DEMO_USER.name} />
                <LeadRow label="Telefone" value={DEMO_USER.phone} />
                <LeadRow label="Loja favorita" value={`★ ${LOJA}`} gold />
                <LeadRow label="Prêmio" value={`${PRIZE_PERCENT}% OFF`} />
                <LeadRow label="Visita à loja" value="Confirmada via QR no caixa" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FUNIL */}
      <section className={tw`${section}`}>
        <Reveal>
          <div className={tw`${kickerCls} mb-5`}>Mensuração</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={tw`${headingCls} max-w-3xl`}>Um funil que você acompanha de ponta a ponta.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className={tw`mt-10 grid gap-3 sm:grid-cols-5`}>
            {[
              ['Interações', 'Toques no totem'],
              ['Cadastros', 'Validados por SMS'],
              ['Leads da sua loja', 'Interesse declarado'],
              ['Clientes na loja', 'QR lido no caixa'],
              ['Vendas atribuídas', 'Fechadas com o vale'],
            ].map(([t, d], i) => (
              <div key={t} className={tw`relative ${cardCls} p-5 text-center`}>
                <div className={tw`font-display text-2xl font-bold ${i >= 3 ? 'text-gold' : 'text-violet-bright'}`}>{`0${i + 1}`}</div>
                <h3 className={tw`mt-2 font-bold leading-tight text-ink`}>{t}</h3>
                <p className={tw`mt-1.5 text-xs text-muted`}>{d}</p>
                {i < 4 && (
                  <span className={tw`absolute right-[-14px] top-1/2 z-10 hidden -translate-y-1/2 text-lg text-violet sm:block`}>→</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section className={tw`${section} pb-20 text-center`}>
        <Reveal>
          <div className={tw`font-display text-xs uppercase tracking-[0.3em] text-gold`}>Vamos conversar?</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className={tw`mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl`}
            style={{
              background: 'linear-gradient(120deg,#fff 30%,#a98bff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Garanta o setor da sua loja na roleta.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={tw`mx-auto mt-6 max-w-md text-lg text-muted`}>
            As posições na roleta são limitadas por praça. Fale com a gente e veja o plano ideal para a
            sua loja.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className={tw`mt-9 flex flex-wrap justify-center gap-3`}>
            <CtaButton href={CONTATO_URL}>💬 Falar com a TotemPlay</CtaButton>
            <CtaButton variant="gold" onClick={onDemo}>
              ▶ Testar a demonstração interativa
            </CtaButton>
          </div>
          <button
            onClick={onApresentacao}
            className={tw`mt-6 font-display text-xs font-bold tracking-wide text-violet-bright transition hover:text-ink`}
          >
            ← Rever a apresentação
          </button>
        </Reveal>
      </section>
    </LojistaShell>
  )
}
