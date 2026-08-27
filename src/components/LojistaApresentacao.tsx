import { tw } from '../twind'
import { WheelClean } from './WheelClean'
import { PRIZE_PERCENT } from '../data'
import { CtaButton, LojistaShell, Reveal, cardCls, headingCls, kickerCls } from './LojistaShell'

const section = 'mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24'

type Props = {
  onApresentacao: () => void
  onExemplo: () => void
  onDemo: () => void
}

export function LojistaApresentacao({ onApresentacao, onExemplo, onDemo }: Props) {
  return (
    <LojistaShell page={1} onApresentacao={onApresentacao} onExemplo={onExemplo}>
      {/* 01 · HERO */}
      <section className={tw`mx-auto w-full max-w-6xl px-5 pb-8 pt-16 text-center sm:px-8 sm:pt-24`}>
        <Reveal>
          <div className={tw`${kickerCls}`}>Montes Claros Shopping · Para lojistas</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className={tw`mx-auto mt-6 max-w-5xl font-anton text-5xl uppercase leading-[0.98] text-mb-black sm:text-6xl lg:text-7xl xl:text-8xl`}>
            Sua marca no caminho
            <br className={tw`hidden lg:block`} />{' '}
            de quem <span className={tw`text-mb-blue`}>já veio comprar.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={tw`mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mb-surface sm:text-xl`}>
            O TotemPlay é um totem interativo no corredor do shopping: o visitante gira a roleta,
            ganha um prêmio da sua loja — e só retira entrando nela.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className={tw`mt-9 flex flex-wrap justify-center gap-3`}>
            <CtaButton onClick={onExemplo}>Ver exemplo na prática →</CtaButton>
            <CtaButton variant="ghost" onClick={onDemo}>
              ▶ Testar a roleta
            </CtaButton>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className={tw`mx-auto mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-mb-gray`}>
            <span>TOTEM 60" · 4K · TOUCH</span>
            <span className={tw`text-mb-blue`}>•</span>
            <span>LEAD COM NOME E TELEFONE</span>
            <span className={tw`text-mb-blue`}>•</span>
            <span>PRÊMIO RETIRADO NA LOJA</span>
          </div>
        </Reveal>

        {/* totem */}
        <Reveal delay={0.5}>
          <div className={tw`mt-14 flex flex-col items-center`}>
            <div
              className={tw`w-[300px] max-w-full rounded-[30px] bg-mb-black px-6 pb-6 pt-7`}
              style={{ boxShadow: '0 40px 80px rgba(11,12,15,.28)' }}
            >
              <div className={tw`text-center font-anton text-2xl uppercase tracking-wide text-white`}>Gire e ganhe</div>
              <div className={tw`mb-4 text-center font-mono text-[0.6rem] tracking-[0.24em] text-mb-gray`}>
                TOQUE PARA COMEÇAR
              </div>
              <WheelClean size={200} idle />
              <div className={tw`mt-5 rounded-xl border border-white/15 px-4 py-3 text-left`}>
                <div className={tw`font-mono text-[0.6rem] tracking-[0.22em] text-mb-sky`}>PRÊMIO</div>
                <div className={tw`text-sm font-bold text-white`}>{PRIZE_PERCENT}% OFF · Sua loja</div>
              </div>
              <div className={tw`mt-2 rounded-xl border border-white/15 px-4 py-3 text-left`}>
                <div className={tw`font-mono text-[0.6rem] tracking-[0.22em] text-mb-sky`}>QR CODE</div>
                <div className={tw`text-sm font-bold text-white`}>Retirada na sua loja</div>
              </div>
            </div>
            <div className={tw`h-4 w-[186px] rounded-b-lg bg-mb-surface`} />
            <div className={tw`mt-2 h-6 w-[120px] rounded-lg bg-mb-black`} style={{ boxShadow: '0 26px 34px rgba(11,12,15,.3)' }} />
          </div>
        </Reveal>
      </section>

      {/* 02 · COMO FUNCIONA */}
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

      {/* 03 · O QUE VOCÊ RECEBE */}
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
              <div className={tw`h-full ${cardCls} p-6 transition hover:-translate-y-1 hover:border-mb-blue/50`}>
                <div className={tw`font-mono text-[0.65rem] font-semibold tracking-[0.22em] text-mb-blue`}>{tag}</div>
                <div className={tw`mt-3 text-xl font-extrabold leading-tight text-mb-black`}>{title}</div>
                <p className={tw`mt-3 text-sm leading-relaxed text-mb-gray`}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* participação, resumida */}
        <Reveal delay={0.3}>
          <div className={tw`mt-6 grid gap-5 ${cardCls} p-6 sm:grid-cols-3`}>
            {[
              ['Zero equipamento', 'Totem, operação e manutenção por nossa conta.'],
              ['Plano mensal simples', 'Assinatura fixa + bônus por lead qualificado.'],
              ['Prêmio sob seu controle', 'Você define o prêmio, os limites e o budget.'],
            ].map(([t, d]) => (
              <div key={t} className={tw`flex items-start gap-3`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B5CFF" strokeWidth="2.5" className={tw`mt-0.5 flex-none`}>
                  <path d="m5 12 5 5 9-11" />
                </svg>
                <div>
                  <div className={tw`font-extrabold text-mb-black`}>{t}</div>
                  <p className={tw`mt-1 text-sm leading-snug text-mb-gray`}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className={tw`mt-5 text-center font-mono text-[0.62rem] tracking-[0.18em] text-mb-gray`}>
            LGPD: CADASTRO COM CONSENTIMENTO EXPLÍCITO · VOCÊ SÓ RECEBE O LEAD DE QUEM FAVORITOU A SUA LOJA
          </p>
        </Reveal>
      </section>

      {/* FECHAMENTO */}
      <section className={tw`bg-mb-black`}>
        <div className={tw`mx-auto w-full max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-24`}>
          <Reveal>
            <h2 className={tw`mx-auto max-w-3xl font-anton text-4xl uppercase leading-[1.02] text-white sm:text-6xl`}>
              Sua loja na roleta. <span className={tw`text-mb-blue`}>Cliente na porta.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className={tw`mt-9 flex flex-wrap justify-center gap-3`}>
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
