import { tw } from '../twind'
import { WheelClean } from './WheelClean'
import { PRIZE_PERCENT } from '../data'
import { CtaButton, LojistaShell, Reveal, cardCls, headingCls, kickerCls } from './LojistaShell'

const section = 'mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24'

function InfoCard({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className={tw`h-full ${cardCls} p-6 transition hover:-translate-y-1 hover:border-mb-blue/50`}>
      <div className={tw`font-mono text-[0.65rem] font-semibold tracking-[0.22em] text-mb-blue`}>{tag}</div>
      <div className={tw`mt-3 text-xl font-extrabold leading-tight text-mb-black`}>{title}</div>
      <p className={tw`mt-3 text-sm leading-relaxed text-mb-gray`}>{desc}</p>
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
              <div className={tw`${kickerCls}`}>Montes Claros Shopping · Para lojistas</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className={tw`mt-6 font-anton text-6xl uppercase leading-[0.96] text-mb-black sm:text-8xl`}>
                Sua loja na roleta.
                <br />
                <span className={tw`text-mb-blue`}>Cliente na porta.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={tw`mt-6 max-w-lg text-lg leading-relaxed text-mb-surface sm:text-xl`}>
                O TotemPlay é um totem de 60 polegadas, 4K e touch, em corredor estratégico do
                shopping. O visitante gira a roleta e ganha um prêmio da sua loja. Para retirar, só
                entrando nela.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={tw`mt-7 flex flex-wrap gap-3`}>
                <span className={tw`rounded-full border border-mb-blue/30 bg-mb-blue/[.06] px-5 py-2.5 text-sm font-bold text-mb-blue`}>
                  Lead com nome e telefone
                </span>
                <span className={tw`rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-bold text-mb-black`}>
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
            <div className={tw`flex flex-col items-center`}>
              <div
                className={tw`w-[300px] max-w-full rounded-[30px] bg-mb-black px-6 pb-6 pt-7`}
                style={{ boxShadow: '0 40px 80px rgba(11,12,15,.28)' }}
              >
                <div className={tw`text-center font-anton text-2xl uppercase tracking-wide text-white`}>Gire e ganhe</div>
                <div className={tw`mb-4 text-center font-mono text-[0.6rem] tracking-[0.24em] text-mb-gray`}>
                  TOQUE PARA COMEÇAR
                </div>
                <WheelClean size={200} idle />
                <div className={tw`mt-5 rounded-xl border border-white/15 px-4 py-3`}>
                  <div className={tw`font-mono text-[0.6rem] tracking-[0.22em] text-mb-sky`}>PRÊMIO</div>
                  <div className={tw`text-sm font-bold text-white`}>{PRIZE_PERCENT}% OFF · Sua loja</div>
                </div>
                <div className={tw`mt-2 rounded-xl border border-white/15 px-4 py-3`}>
                  <div className={tw`font-mono text-[0.6rem] tracking-[0.22em] text-mb-sky`}>QR CODE</div>
                  <div className={tw`text-sm font-bold text-white`}>Retirada na sua loja</div>
                </div>
              </div>
              <div className={tw`h-4 w-[62%] rounded-b-lg bg-mb-surface`} />
              <div className={tw`mt-2 h-6 w-[40%] rounded-lg bg-mb-black`} style={{ boxShadow: '0 26px 34px rgba(11,12,15,.3)' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SLOGAN */}
      <section className={tw`border-y border-black/[.08] bg-white`}>
        <div className={tw`mx-auto w-full max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-24`}>
          <Reveal>
            <div className={tw`${kickerCls} mb-6`}>Por que funciona</div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={tw`mx-auto font-anton text-4xl uppercase leading-[1.05] text-mb-black sm:text-6xl`}>
              Sua marca no caminho
              <br />
              de quem <span className={tw`text-mb-blue`}>já veio comprar.</span>
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className={tw`mx-auto mt-6 max-w-xl text-lg leading-relaxed text-mb-surface`}>
              Ninguém encosta no totem por acaso: quem gira a roleta já está no shopping, a poucos
              metros da sua porta.
            </p>
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
            ['01', 'Cliente toca a tela', 'A roleta em movimento na tela 4K puxa o toque. Sem promotor, sem abordagem.'],
            ['02', 'Cadastro relâmpago', 'Só nome e telefone, com validação por SMS. Sem fricção, sem desistência.'],
            ['03', 'Marca a sua loja', 'Ele escolhe as lojas favoritas — e declara interesse na sua.'],
            ['04', 'Gira a roleta', 'Quem marcou sua loja como favorita tem mais chance de ganhar nela.'],
            ['05', 'QR + endereço', 'O prêmio sai com QR code e a rota até a sua porta. A retirada é dentro da loja.'],
          ].map(([n, t, d], i) => (
            <Reveal key={n} delay={0.1 + i * 0.08}>
              <div className={tw`h-full ${cardCls} p-5`}>
                <div className={tw`font-anton text-4xl text-mb-blue`}>{n}</div>
                <h3 className={tw`mt-3 font-extrabold text-mb-black`}>{t}</h3>
                <p className={tw`mt-2 text-sm leading-relaxed text-mb-gray`}>{d}</p>
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
            ['01 — LEAD', 'Lead qualificado, não impressão genérica', 'Cada lead chega com nome, contato e a confirmação de interesse declarado na sua loja antes do giro.'],
            ['02 — PRESENÇA', 'Presença física garantida', 'O prêmio só é retirado dentro da loja, com leitura do QR — a interação vira pisada na sua porta.'],
            ['03 — ROI', 'Mensuração real, ponta a ponta', 'Funil completo: interações → cadastros → leads da sua loja → retiradas → vendas atribuídas.'],
            ['04 — PERFIL', 'Conexão direta com perfil de interesse', 'Acesso ao perfil de quem escolheu sua loja como favorita — base reutilizável nas suas campanhas.'],
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
              <h2 className={tw`font-anton text-5xl uppercase leading-[1.0] text-mb-black sm:text-6xl`}>
                Roleta
                <br />
                <span className={tw`text-mb-blue`}>inteligente.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={tw`mt-6 max-w-md text-lg leading-relaxed text-mb-surface`}>
                A roleta não é aleatória. Ela pondera a probabilidade de cada setor pelo interesse do
                cliente — as lojas favoritas dele — e pelas metas de tráfego pactuadas com cada
                lojista.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className={tw`mt-7 flex flex-col gap-4`}>
                {[
                  'Probabilidade dinâmica por loja e categoria',
                  'Você define o prêmio, com limites e budget configuráveis',
                  'Lead entregue a você já com o perfil de interesse',
                ].map((t) => (
                  <li key={t} className={tw`flex items-center gap-3 font-semibold text-mb-black`}>
                    <span className={tw`h-2.5 w-2.5 flex-none rounded-sm bg-mb-blue`} /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className={tw`text-center`}>
              <WheelClean size={340} />
              <div className={tw`mt-6 flex flex-wrap justify-center gap-6 text-sm font-semibold text-mb-surface`}>
                <span className={tw`inline-flex items-center gap-2`}>
                  <i className={tw`h-3 w-3 rounded-sm bg-mb-blue`} />
                  Sua loja em destaque (favorita)
                </span>
                <span className={tw`inline-flex items-center gap-2`}>
                  <i className={tw`h-3 w-3 rounded-sm`} style={{ background: '#DBDFE7' }} />
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
                  className={tw`flex h-9 w-9 items-center justify-center rounded-lg font-anton text-lg text-white ${
                    i === 2 ? 'bg-mb-blue' : 'bg-mb-black'
                  }`}
                >
                  {l}
                </span>
                <h3 className={tw`mt-4 text-lg font-extrabold text-mb-black`}>{t}</h3>
                <p className={tw`mt-2 text-sm leading-relaxed text-mb-gray`}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className={tw`mt-6 flex items-start gap-3 rounded-2xl border border-mb-blue/25 bg-mb-blue/[.05] px-6 py-4 text-sm leading-relaxed text-mb-surface sm:items-center`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B5CFF" strokeWidth="2" className={tw`mt-0.5 flex-none sm:mt-0`}>
              <circle cx="12" cy="12" r="10" />
              <path d="m8 12 3 3 5-6" />
            </svg>
            <span>
              <strong className={tw`text-mb-black`}>LGPD:</strong> o cadastro é feito com consentimento explícito, e
              você só recebe o lead de quem escolheu a sua loja como favorita.
            </span>
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL — faixa preta */}
      <section className={tw`bg-mb-black`}>
        <div className={tw`mx-auto w-full max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28`}>
          <Reveal>
            <div className={tw`font-mono text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-mb-sky`}>
              Próximo passo
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={tw`mx-auto mt-6 max-w-3xl font-anton text-4xl uppercase leading-[1.02] text-white sm:text-6xl`}>
              Veja como isso chega <span className={tw`text-mb-blue`}>para você</span>, na prática.
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <div className={tw`mt-10 flex flex-wrap justify-center gap-3`}>
              <CtaButton onClick={onExemplo}>Ver exemplo na prática →</CtaButton>
              <CtaButton variant="ghost-dark" onClick={onDemo}>
                ▶ Testar a roleta
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </LojistaShell>
  )
}
