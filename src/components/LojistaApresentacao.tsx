import { tw } from '../twind'
import { Wheel } from './Wheel'
import { cardCls } from '../ui'
import { PRIZE_PERCENT } from '../data'
import { CtaButton, LojistaShell, Reveal, headingCls, kickerCls } from './LojistaShell'

const section = 'mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24'

function InfoCard({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className={tw`h-full ${cardCls} p-6 transition hover:-translate-y-1 hover:border-violet/40 hover:bg-violet/5`}>
      <div className={tw`font-bold text-violet-bright`}>{tag}</div>
      <div className={tw`mt-2 text-xl font-bold leading-tight text-ink`}>{title}</div>
      <p className={tw`mt-3 text-sm leading-relaxed text-muted`}>{desc}</p>
    </div>
  )
}

type Props = {
  onApresentacao: () => void
  onExemplo: () => void
  onDemo: () => void
}

export function LojistaApresentacao({ onApresentacao, onExemplo, onDemo }: Props) {
  return (
    <LojistaShell page={1} onApresentacao={onApresentacao} onExemplo={onExemplo}>
      {/* HERO */}
      <section className={tw`${section} pt-14 sm:pt-20`}>
        <div className={tw`grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]`}>
          <div>
            <Reveal>
              <span className={tw`inline-flex items-center gap-2 rounded-full border border-violet/35 bg-violet/[.07] px-5 py-2.5 text-sm font-semibold text-violet-bright`}>
                Montes Claros Shopping · Apresentação para lojistas
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className={tw`mt-7 font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-7xl`}>
                Sua loja na roleta.
                <br />
                <span
                  style={{
                    background: 'linear-gradient(120deg,#a98bff,#5b3fd6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Cliente na sua porta.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={tw`mt-6 max-w-lg text-xl leading-snug text-muted`}>
                O TotemPlay é um totem de 60 polegadas, 4K e touch, instalado em corredor estratégico
                do shopping. O visitante gira a roleta, ganha um prêmio da sua loja — e só retira o
                prêmio entrando nela.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`mt-7 flex flex-wrap gap-3`}>
                <span className={tw`rounded-full border border-gold/40 bg-gold/[.06] px-5 py-2.5 text-sm font-semibold text-gold`}>
                  Lead com nome e telefone
                </span>
                <span className={tw`rounded-full border border-violet/30 bg-violet/[.06] px-5 py-2.5 text-sm font-semibold text-violet-bright`}>
                  Prêmio retirado dentro da loja
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className={tw`mt-9 flex flex-wrap gap-3`}>
                <CtaButton onClick={onExemplo}>Ver exemplo na prática →</CtaButton>
                <CtaButton variant="ghost" onClick={onDemo}>
                  ▶ Testar a roleta
                </CtaButton>
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
                  <Wheel rotation={0} favoriteId={1} spinning={false} idle size={196} />
                </div>
                <div className={tw`mt-4 rounded-xl border border-violet/35 bg-violet/[.05] px-4 py-3`}>
                  <div className={tw`font-display text-[0.6rem] tracking-[0.22em] text-violet-bright`}>PRÊMIO</div>
                  <div className={tw`text-sm font-bold text-ink`}>{PRIZE_PERCENT}% OFF · Sua loja</div>
                </div>
                <div className={tw`mt-2 rounded-xl border border-gold/35 bg-gold/[.05] px-4 py-3`}>
                  <div className={tw`font-display text-[0.6rem] tracking-[0.22em] text-gold`}>QR CODE</div>
                  <div className={tw`text-sm font-bold text-ink`}>Retirada na sua loja</div>
                </div>
              </div>
              <div className={tw`h-4 w-[62%] rounded-b-lg bg-[#0d0b18]`} />
              <div className={tw`mt-2 h-6 w-[40%] rounded-lg bg-[#070610]`} style={{ boxShadow: '0 30px 40px rgba(0,0,0,.6)' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className={tw`${section}`}>
        <Reveal>
          <div className={tw`${kickerCls} mb-5`}>Como funciona</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={tw`${headingCls} max-w-3xl`}>Cinco passos. Um minuto. Um cliente caminhando até a sua loja.</h2>
        </Reveal>
        <div className={tw`mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5`}>
          {[
            ['01', 'Cliente toca a tela', 'Atraído pelo movimento da roleta em 4K, o visitante do shopping encosta no totem.'],
            ['02', 'Cadastro relâmpago', 'Só nome e telefone, com validação por SMS. Sem fricção, sem desistência.'],
            ['03', 'Marca a sua loja', 'Ele escolhe as lojas e categorias favoritas — e declara interesse na sua.'],
            ['04', 'Gira a roleta', 'Roleta inteligente: quem marcou sua loja como favorita tem mais chance de ganhar nela.'],
            ['05', 'QR + endereço', 'O prêmio chega com QR code e a rota até a sua porta. A retirada acontece dentro da loja.'],
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
      </section>

      {/* O QUE VOCÊ RECEBE */}
      <section className={tw`${section}`}>
        <Reveal>
          <div className={tw`${kickerCls} mb-5`}>O que você recebe</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={tw`${headingCls} max-w-3xl`}>Quatro ganhos diretos para a sua loja.</h2>
        </Reveal>
        <div className={tw`mt-10 grid gap-4 sm:grid-cols-2`}>
          {[
            ['01 — Lead', 'Lead qualificado, não impressão genérica', 'Cada lead chega com nome, contato e a confirmação de interesse declarado na sua loja antes do giro.'],
            ['02 — Presença', 'Presença física garantida', 'O prêmio só é retirado dentro da loja, com leitura do QR — a interação vira pisada na sua porta.'],
            ['03 — ROI', 'Mensuração real, ponta a ponta', 'Funil completo: interações → cadastros → leads da sua loja → retiradas → vendas atribuídas.'],
            ['04 — Perfil', 'Conexão direta com perfil de interesse', 'Acesso ao perfil de quem escolheu sua loja como favorita — base reutilizável nas suas campanhas.'],
          ].map(([tag, title, desc], i) => (
            <Reveal key={tag} delay={0.1 + i * 0.08}>
              <InfoCard tag={tag} title={title} desc={desc} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ROLETA INTELIGENTE */}
      <section className={tw`${section}`}>
        <div className={tw`grid items-center gap-12 lg:grid-cols-2`}>
          <div>
            <Reveal>
              <div className={tw`${kickerCls} mb-4`}>O diferencial</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className={tw`font-display text-5xl font-bold leading-tight tracking-tight text-ink`}>
                Roleta
                <br />
                Inteligente.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={tw`mt-6 max-w-md text-lg leading-relaxed text-muted`}>
                A roleta não é aleatória. Ela pondera a probabilidade de cada setor pelo interesse do
                cliente — as lojas favoritas dele — e pelas metas de tráfego pactuadas com cada lojista.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className={tw`mt-7 flex flex-col gap-4`}>
                {[
                  ['#8b6dff', 'Probabilidade dinâmica por loja e categoria'],
                  ['#8b6dff', 'Você define o prêmio, com limites e budget configuráveis'],
                  ['#e9b96e', 'Lead entregue a você já com o perfil de interesse'],
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
              <div className={tw`mt-4 flex flex-wrap justify-center gap-6 text-sm text-muted`}>
                <span className={tw`inline-flex items-center gap-2`}>
                  <i className={tw`h-3 w-3 rounded`} style={{ background: '#e9b96e' }} />
                  Sua loja em destaque (favorita)
                </span>
                <span className={tw`inline-flex items-center gap-2`}>
                  <i className={tw`h-3 w-3 rounded`} style={{ background: '#5b3fd6' }} />
                  Catálogo geral
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMO PARTICIPAR */}
      <section className={tw`${section}`}>
        <Reveal>
          <div className={tw`${kickerCls} mb-5`}>Como participar</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={tw`${headingCls} max-w-3xl`}>Simples de entrar. Sem investimento em equipamento.</h2>
        </Reveal>
        <div className={tw`mt-10 grid gap-4 sm:grid-cols-3`}>
          {[
            ['A', 'Zero equipamento', 'O totem, a operação e a manutenção são da TotemPlay. Você não investe em estrutura.'],
            ['B', 'Plano mensal simples', 'Assinatura fixa + bônus por lead qualificado entregue na sua loja. Sem surpresa.'],
            ['C', 'Prêmio sob seu controle', 'Você escolhe o que oferecer — desconto, brinde ou experiência — com limites e budget definidos por você.'],
          ].map(([l, t, d], i) => (
            <Reveal key={l} delay={0.1 + i * 0.1}>
              <div className={tw`h-full ${cardCls} p-6`}>
                <span
                  className={tw`flex h-9 w-9 items-center justify-center rounded-lg font-display font-bold text-bg`}
                  style={{ background: i === 2 ? '#e9b96e' : '#8b6dff' }}
                >
                  {l}
                </span>
                <h3 className={tw`mt-4 text-lg font-bold text-ink`}>{t}</h3>
                <p className={tw`mt-2 text-sm leading-relaxed text-muted`}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className={tw`mt-6 flex items-start gap-3 rounded-2xl border border-violet/30 bg-violet/[.05] px-6 py-4 text-sm leading-relaxed text-muted sm:items-center`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a98bff" strokeWidth="2" className={tw`mt-0.5 flex-none sm:mt-0`}>
              <circle cx="12" cy="12" r="10" />
              <path d="m8 12 3 3 5-6" />
            </svg>
            <span>
              <strong className={tw`text-ink`}>LGPD:</strong> o cadastro é feito com consentimento explícito, e você
              só recebe o lead de quem escolheu a sua loja como favorita.
            </span>
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section className={tw`${section} pb-20 text-center`}>
        <Reveal>
          <div className={tw`font-display text-xs uppercase tracking-[0.3em] text-gold`}>Próximo passo</div>
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
            Veja como isso chega para você, na prática.
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <div className={tw`mt-9 flex flex-wrap justify-center gap-3`}>
            <CtaButton onClick={onExemplo}>Ver exemplo na prática →</CtaButton>
            <CtaButton variant="ghost" onClick={onDemo}>
              ▶ Testar a roleta
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </LojistaShell>
  )
}
