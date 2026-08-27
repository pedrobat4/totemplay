import type { ReactNode } from 'react'
import { tw } from '../twind'
import { WheelClean } from './WheelClean'
import { FakeQR } from './FakeQR'
import { DEMO_USER, PRIZE_PERCENT } from '../data'
import { CONTATO_URL, CtaButton, LojistaShell, Reveal, cardCls, headingCls, kickerCls } from './LojistaShell'

const section = 'mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24'

// Nome fictício usado no walkthrough para representar a loja do lojista.
const LOJA = 'Sua Loja'
const LOJA_INFO = 'Moda & Estilo · Piso L1'

function PrizeTicket() {
  return (
    <div
      className={tw`relative w-full max-w-sm overflow-hidden rounded-3xl border border-black/[.08] bg-white p-7 text-center`}
      style={{ boxShadow: '0 24px 60px rgba(11,12,15,.12)' }}
    >
      <span className={tw`absolute left-[-12px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-black/[.08] bg-mb-ice`} />
      <span className={tw`absolute right-[-12px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-black/[.08] bg-mb-ice`} />
      <div className={tw`font-mono text-[0.65rem] font-semibold tracking-[0.28em] text-mb-gray`}>VALE-DESCONTO</div>
      <div className={tw`my-2 font-anton text-7xl leading-none text-mb-blue`}>
        {PRIZE_PERCENT}% <span className={tw`text-4xl`}>OFF</span>
      </div>
      <div className={tw`mt-3 flex items-center justify-center gap-2 text-mb-black`}>
        <span className={tw`flex h-7 w-7 items-center justify-center rounded-lg bg-mb-black font-anton text-xs text-white`}>★</span>
        <span className={tw`font-extrabold`}>{LOJA}</span>
        <span className={tw`text-mb-gray`}>· {LOJA_INFO.split(' · ')[1]}</span>
      </div>
    </div>
  )
}

function TimelineItem({
  n,
  time,
  title,
  desc,
  highlight = false,
  last = false,
  children,
}: {
  n: string
  time: string
  title: string
  desc: string
  highlight?: boolean
  last?: boolean
  children?: ReactNode
}) {
  return (
    <div className={tw`relative flex gap-5 sm:gap-8`}>
      {/* trilha */}
      <div className={tw`flex flex-col items-center`}>
        <span
          className={tw`z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full font-anton text-sm ${
            highlight ? 'bg-mb-blue text-white' : 'bg-mb-black text-white'
          }`}
        >
          {n}
        </span>
        {!last && <span className={tw`w-px flex-1 bg-black/10`} />}
      </div>
      <div className={tw`flex-1 pb-12 ${last ? 'pb-2' : ''}`}>
        <div className={tw`font-mono text-[0.65rem] font-semibold tracking-[0.25em] text-mb-blue`}>{time}</div>
        <h3 className={tw`mt-1.5 text-xl font-extrabold text-mb-black sm:text-2xl`}>{title}</h3>
        <p className={tw`mt-2 max-w-xl text-sm leading-relaxed text-mb-gray sm:text-base`}>{desc}</p>
        {children && <div className={tw`mt-5`}>{children}</div>}
      </div>
    </div>
  )
}

function LeadRow({ label, value, blue = false }: { label: string; value: string; blue?: boolean }) {
  return (
    <div className={tw`flex flex-col gap-0.5 border-b border-white/10 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between`}>
      <span className={tw`font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-mb-gray`}>{label}</span>
      <span className={tw`font-bold ${blue ? 'text-mb-sky' : 'text-white'}`}>{value}</span>
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
          <span className={tw`inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 font-mono text-[0.65rem] font-semibold tracking-[0.22em] text-mb-surface`}>
            PÁGINA 2 · EXEMPLO NA PRÁTICA — DADOS FICTÍCIOS
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className={tw`mx-auto mt-7 max-w-4xl font-anton text-5xl uppercase leading-[0.98] text-mb-black sm:text-8xl`}>
            Da tela do totem <span className={tw`text-mb-blue`}>até o seu caixa.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={tw`mx-auto mt-6 max-w-xl text-lg leading-relaxed text-mb-surface sm:text-xl`}>
            Acompanhe a jornada de um visitante do shopping — do primeiro toque ao prêmio validado
            dentro da loja. Aqui, a loja do exemplo é a sua: <strong className={tw`text-mb-black`}>{LOJA}</strong>.
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
                <div className={tw`font-mono text-[0.62rem] font-semibold tracking-[0.22em] text-mb-blue`}>
                  CADASTRO CONFIRMADO ✓
                </div>
                <div className={tw`mt-2 text-lg font-extrabold text-mb-black`}>{DEMO_USER.name}</div>
                <div className={tw`text-sm text-mb-gray`}>{DEMO_USER.phone}</div>
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
              <span className={tw`inline-flex items-center gap-2.5 rounded-full bg-mb-blue px-5 py-2.5 text-sm font-bold text-white`}>
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
                  <WheelClean size={220} />
                </div>
                <div className={tw`flex flex-col gap-3 text-sm font-semibold text-mb-surface`}>
                  <span className={tw`inline-flex items-center gap-2`}>
                    <i className={tw`h-3 w-3 flex-none rounded-sm bg-mb-blue`} />
                    Setor da sua loja em destaque: favorita do cliente
                  </span>
                  <span className={tw`inline-flex items-center gap-2`}>
                    <i className={tw`h-3 w-3 flex-none rounded-sm`} style={{ background: '#DBDFE7' }} />
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
              highlight
            >
              <div className={tw`flex flex-wrap items-center gap-6`}>
                <PrizeTicket />
                <div className={tw`flex items-center gap-4 ${cardCls} p-4`}>
                  <div className={tw`rounded-xl border border-black/[.08]`}>
                    <FakeQR seed={36} size={104} />
                  </div>
                  <div className={tw`max-w-[170px] text-left text-sm text-mb-gray`}>
                    <div className={tw`font-extrabold text-mb-black`}>Retire na loja</div>
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
              highlight
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
              <p className={tw`mt-6 max-w-md text-lg leading-relaxed text-mb-surface`}>
                Nada de impressão genérica: cada lead chega identificado, com o interesse declarado na
                sua loja e o status da retirada do prêmio. Você enxerga o funil ponta a ponta.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className={tw`mt-7 flex flex-col gap-4`}>
                {[
                  'Nome e contato reais, validados por SMS',
                  'Interesse declarado: ele escolheu a sua loja',
                  'Retirada do prêmio confirma a visita física',
                ].map((t) => (
                  <li key={t} className={tw`flex items-center gap-3 font-semibold text-mb-black`}>
                    <span className={tw`h-2.5 w-2.5 flex-none rounded-sm bg-mb-blue`} /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div
              className={tw`mx-auto w-full max-w-md rounded-3xl bg-mb-black p-7`}
              style={{ boxShadow: '0 30px 70px rgba(11,12,15,.25)' }}
            >
              <div className={tw`flex flex-wrap items-center justify-between gap-2`}>
                <span className={tw`font-mono text-[0.62rem] font-semibold tracking-[0.25em] text-mb-gray`}>
                  LEAD QUALIFICADO · EXEMPLO
                </span>
                <span className={tw`rounded-full bg-mb-blue px-3 py-1 text-[0.65rem] font-bold text-white`}>
                  ✓ PRÊMIO RESGATADO
                </span>
              </div>
              <div className={tw`mt-5`}>
                <LeadRow label="Nome" value={DEMO_USER.name} />
                <LeadRow label="Telefone" value={DEMO_USER.phone} />
                <LeadRow label="Loja favorita" value={`★ ${LOJA}`} blue />
                <LeadRow label="Prêmio" value={`${PRIZE_PERCENT}% OFF`} />
                <LeadRow label="Visita à loja" value="Confirmada via QR no caixa" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL — faixa preta */}
      <section className={tw`bg-mb-black`}>
        <div className={tw`mx-auto w-full max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28`}>
          <Reveal>
            <div className={tw`font-mono text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-mb-sky`}>
              Vamos conversar?
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={tw`mx-auto mt-6 max-w-3xl font-anton text-4xl uppercase leading-[1.02] text-white sm:text-6xl`}>
              Garanta o setor da <span className={tw`text-mb-blue`}>sua loja</span> na roleta.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={tw`mx-auto mt-6 max-w-md text-lg text-mb-gray`}>
              As posições na roleta são limitadas por praça. Fale com a gente e veja o plano ideal
              para a sua loja.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className={tw`mt-10 flex flex-wrap justify-center gap-3`}>
              <CtaButton href={CONTATO_URL}>💬 Falar com a TotemPlay</CtaButton>
              <CtaButton variant="ghost-dark" onClick={onDemo}>
                ▶ Testar a demonstração interativa
              </CtaButton>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <button
              onClick={onApresentacao}
              className={tw`mt-8 font-archivo text-xs font-bold uppercase tracking-wide text-mb-sky transition hover:text-white`}
            >
              ← Rever a apresentação
            </button>
          </Reveal>
        </div>
      </section>
    </LojistaShell>
  )
}
