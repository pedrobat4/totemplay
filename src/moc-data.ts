// ──────────────────────────────────────────────────────────────────────────
// APRESENTAÇÃO PARA O MONTES CLAROS SHOPPING  ·  rota /moc
//
// 2ª apresentação — voltada para o SHOPPING (decisor), não para sócios.
// Parceria fechada: 50% Metabuy · 50% Montes Claros Shopping.
// AQUI não entra custo do totem (CAPEX/OPEX) — é problema da Metabuy.
// O foco é: audiência, produto, planos do anunciante e QUANTO O SHOPPING GANHA.
//
// Todos os números vivem neste arquivo — o layout em /moc lê e recalcula.
// ──────────────────────────────────────────────────────────────────────────

export const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const NUM_TOTENS = 4

// ── Identidade visual do Montes Claros Shopping (cores da logo) ─────────────
export const MOC = {
  amarelo: '#F6C700',
  lima: '#8CC63F',
  verde: '#3DB39E',
  teal: '#0E9AA7',
  tealBright: '#16C3B5',
  tinta: '#2C2E33',
  // swoosh da marca (amarelo → verde → teal)
  gradient: 'linear-gradient(120deg,#F6C700 0%,#8CC63F 45%,#0E9AA7 100%)',
}

// ── Audiência — dados OFICIAIS do Book de Mídia 2026 do shopping ────────────
export const AUDIENCIA = {
  publicoMes: 184_511, // "+184.511 — público médio mensal em 2025"
  veiculosAno: 2_200_000, // "+2,2 milhões de veículos/ano"
  populacaoFlutuante: 1_000_000, // "1 milhão de população flutuante em Montes Claros"
  lojas: 143,
  ancoras: 11,
  classeAB: 0.72, // AB: 72%
  classeCD: 0.28, // CD: 28%
  frequenciaSemanal: 0.31, // 31% frequentam semanalmente
  feminino: 0.64,
  masculino: 0.36,
  faixa25a44: 0.66, // 25–34: 36% + 34–44: 30%
  raioKm: 400, // "Raio de 400km sem player concorrente"
  rankingMG: 7, // 7º maior shopping de Minas Gerais
}

// ── A mídia: como o totem funciona ─────────────────────────────────────────
export const LOOP_SLOTS = 16 // anúncios por totem no loop
export const SEGUNDOS_POR_ANUNCIO = 10
export const HORAS_DIA = 12 // 10h–22h
export const DIAS_MES = 30
export const ALCANCE_PCT_POR_TOTEM = 0.3 // % do fluxo que passa no campo de visão

export const MIDIA = (() => {
  const loopSeg = LOOP_SLOTS * SEGUNDOS_POR_ANUNCIO // 160s
  const loopsDia = Math.round((HORAS_DIA * 3600) / loopSeg) // ~270
  const otsTotemMes = Math.round(AUDIENCIA.publicoMes * ALCANCE_PCT_POR_TOTEM) // ~55k
  const otsRedeMes = otsTotemMes * NUM_TOTENS // ~221k
  const slotsRede = LOOP_SLOTS * NUM_TOTENS // 64 espaços
  return { loopSeg, loopsDia, otsTotemMes, otsRedeMes, slotsRede }
})()

// ── Planos do anunciante — preços que estudamos a partir do Book de Mídia ───
// Posicionamento: a mídia mais barata do Book com DADO + INTERAÇÃO embutidos.
// (O "totem estático" do shopping custa R$ 2 mil o par e é só adesivo, sem
//  tela, sem captação. O nosso é digital, interativo e gera leads.)
// Entrada a R$ 2.500/totem — ACIMA do totem estático (R$ 2 mil, só adesivo),
// porque o nosso é digital, interativo e capta leads. Desconto por volume:
// quanto mais totens, menor o preço por ponto (a Rede MOC fica abaixo do estático).
export const PACOTES: { telas: number; nome: string; preco: number; cheio: number; destaque?: boolean }[] = [
  { telas: 1, nome: 'Presença', preco: 2_500, cheio: 2_500 },
  { telas: 2, nome: 'Dupla', preco: 4_500, cheio: 5_000 },
  { telas: 3, nome: 'Trio', preco: 6_300, cheio: 7_500 },
  { telas: 4, nome: 'Rede MOC', preco: 7_800, cheio: 10_000, destaque: true },
]

// ── Referências do Book de Mídia 2026 (para situar o preço do totem) ────────
export const BOOK_REF: { item: string; preco: number; obs: string; digital?: boolean }[] = [
  { item: 'Totem estático (par)', preco: 2_000, obs: 'Adesivo, sem tela, sem dado' },
  { item: 'Panfletagem / sampling', preco: 1_000, obs: 'Entrada ou saída' },
  { item: 'Front light', preco: 5_000, obs: 'Lona, entrada Norte' },
  { item: 'EPA estacionamento (digital)', preco: 5_000, obs: 'Banner digital · 6 un' },
  { item: 'Elevador (adesivo)', preco: 10_000, obs: '12 unidades' },
  { item: 'Mega banner', preco: 12_000, obs: 'Lona, praças' },
  { item: 'Praça de eventos (½)', preco: 35_000, obs: 'Ativação, por período' },
]
export const NOSSO_TOTEM_PRECO = PACOTES[0].preco // 1.490 — entrada

// ── A divisão da parceria (FECHADA) ────────────────────────────────────────
export const SPLIT_SHOPPING = 0.5 // 50% Montes Claros Shopping · 50% Metabuy

// ── Quem entra com o quê ───────────────────────────────────────────────────
export const PARCERIA = {
  metabuy: [
    'Os 4 totens (hardware, tela e estrutura)',
    'O sistema, a operação e a manutenção',
    'A equipe comercial que vende a mídia',
    'Conteúdo, dados e relatórios',
  ],
  shopping: [
    'O espaço nos corredores de maior fluxo',
    'A audiência qualificada (público AB)',
    'A marca e a credibilidade do shopping',
    'Aprovação dos pontos de instalação',
  ],
}

// ── Cenários de receita (para mostrar o ganho do SHOPPING) ──────────────────
// Mix realista de anunciantes → bruto de mídia → 50% do shopping.
export const MIX_BASE: { telas: number; qtd: number }[] = [
  { telas: 1, qtd: 14 },
  { telas: 2, qtd: 5 },
  { telas: 3, qtd: 1 },
  { telas: 4, qtd: 2 },
]
export const MIX_CALC = MIX_BASE.map((m) => {
  const p = PACOTES.find((x) => x.telas === m.telas)!
  return { ...m, nome: p.nome, preco: p.preco, subtotal: p.preco * m.qtd }
})
export const ANUNCIANTES_BASE = MIX_BASE.reduce((s, m) => s + m.qtd, 0) // 22
export const BRUTO_BASE = MIX_CALC.reduce((s, m) => s + m.subtotal, 0) // 45.880
export const TICKET_MEDIO = Math.round(BRUTO_BASE / ANUNCIANTES_BASE) // ~2.085
export const SLOTS_USADOS = MIX_BASE.reduce((s, m) => s + m.telas * m.qtd, 0) // 35 de 64
export const OCUPACAO_BASE = SLOTS_USADOS / MIDIA.slotsRede // ~55%

// Cenário cheio: rede mais ocupada, mesmo preço.
export const ANUNCIANTES_CHEIO = 30
export const BRUTO_CHEIO = Math.round(TICKET_MEDIO * ANUNCIANTES_CHEIO)

export function ganhoShopping(bruto: number) {
  const shopping = bruto * SPLIT_SHOPPING
  return { bruto, mes: shopping, ano: shopping * 12 }
}
export const GANHO_BASE = ganhoShopping(BRUTO_BASE)
export const GANHO_CHEIO = ganhoShopping(BRUTO_CHEIO)

// Rampa de 12 meses (começa baixo e enche) — receita do shopping (50%).
export const RAMPA_ANUNCIANTES = [4, 7, 10, 13, 16, 18, 20, 22, 22, 22, 22, 22]
export const RAMPA = RAMPA_ANUNCIANTES.map((q, i) => {
  const bruto = q * TICKET_MEDIO
  return { mes: i + 1, anunciantes: q, bruto, shopping: bruto * SPLIT_SHOPPING }
})
export const RAMPA_ANO_SHOPPING = RAMPA.reduce((s, r) => s + r.shopping, 0) // 1º ano

// ── Contatos (do Book de Mídia do shopping) ────────────────────────────────
export const CONTATOS = [
  { nome: 'Endel Menezes', tel: '(38) 99827-6987' },
  { nome: 'Marllon de Paiva', tel: '(38) 98426-6061' },
]

export const APRESENTADO_PARA = 'Montes Claros Shopping'
export const PROPOSTO_POR = 'Metabuy · TotemPlay'
