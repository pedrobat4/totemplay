// ──────────────────────────────────────────────────────────────────────────
// PLANO DE NEGÓCIO · APRESENTAÇÃO PARA SÓCIOS
// 4 totens TotemPlay no Montes Claros Shopping (contrato via Marllon Paiva).
//
// Todos os números do modelo financeiro vivem AQUI. Ajuste à vontade —
// o layout em /socios lê tudo deste arquivo e recalcula sozinho.
// ──────────────────────────────────────────────────────────────────────────

export const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const NUM_TOTENS = 4

// ── Dados de mercado (pesquisa pública, jun/2026) ──────────────────────────
export const MERCADO = {
  visitantesMes: 510_000, // fluxo oficial Montes Claros Shopping (fonte conservadora)
  visitantesMesAlto: 600_000, // estimativa mais recente citada
  lojas: 145,
  habitantesCidade: 414_240, // IBGE Censo 2022
  habitantesRegiao: 1_698_881, // Região Intermediária de MOC — 86 municípios
  horasDia: 12, // Seg–Sáb 10h–22h
  diasMes: 30,
}

// ── CAPEX — custo de HARDWARE por totem (valores informados) ───────────────
export const CAPEX_ITENS: { item: string; valor: number; nota?: string }[] = [
  { item: 'Estrutura em MDF', valor: 2_700, nota: 'Gabinete / corpo do totem' },
  { item: 'TV 4K', valor: 2_990, nota: 'Painel da tela' },
  { item: 'Moldura Qualipix 60"', valor: 3_000, nota: 'Acabamento + proteção' },
  { item: 'Cabos e conexões', valor: 400 },
  { item: 'Computador', valor: 4_300, nota: 'Roda o sistema do totem' },
  { item: 'Nobreak 3000VA', valor: 1_700, nota: 'Proteção contra queda de energia' },
]

export const CAPEX_POR_TOTEM = CAPEX_ITENS.reduce((s, i) => s + i.valor, 0) // 15.090

// Sistema — custo ÚNICO da operação (vale para os 4 totens, não por totem).
export const CAPEX_SISTEMA = {
  item: 'Sistema de verificação de QR code',
  nota: 'Parte do cliente',
  valor: 5_500,
}

export const CAPEX_HARDWARE_4 = CAPEX_POR_TOTEM * NUM_TOTENS // 60.360
export const CAPEX_TOTAL = CAPEX_HARDWARE_4 + CAPEX_SISTEMA.valor // 65.860

// ── OPEX — custo operacional mensal (estimativas, 4 totens) ────────────────
export const OPEX_FIXO_ITENS: { item: string; valor: number; nota: string }[] = [
  { item: 'Servidores + IA (cloud/APIs)', valor: 800, nota: 'Infra compartilhada da frota' },
  { item: 'Conectividade (internet/4G)', valor: 600, nota: 'R$ 150 × 4 totens' },
]
export const OPEX_FIXO_MES = OPEX_FIXO_ITENS.reduce((s, i) => s + i.valor, 0) // 1.400

// ── Divisão com o shopping (a "divisão" do contrato) ───────────────────────
// O shopping fica com 40% a 50% da receita de mídia. Esse é o intervalo do
// negócio — os cenários da apresentação saem dessa faixa.
export const SPLIT_SHOPPING = { min: 0.4, max: 0.5 }

// ── Receita — cenário médio de operação ────────────────────────────────────
// 20 locações (clientes). Algumas pegam 1 tela, outras 2, outras a rede toda.
// Ticket médio adotado: R$ 3.800/mês  →  bruto de R$ 76.000/mês.
// (A mistura real de exemplo soma R$ 75.800 / R$ 3.790 — ver MIX_EXEMPLO.)
export const CLIENTES = 20
export const TICKET_MEDIO = 3_800
export const BRUTO_MES = CLIENTES * TICKET_MEDIO // 76.000

export const ANUNCIOS_NO_LOOP = 20 // capacidade do loop de cada totem

// ── Pacotes comerciais para o anunciante (multi-totem, desconto por volume) ─
export const PACOTES: {
  telas: number
  nome: string
  preco: number
  cheio: number
  destaque?: boolean
}[] = [
  { telas: 1, nome: 'Ponto Único', preco: 2_900, cheio: 2_900 },
  { telas: 2, nome: 'Dupla', preco: 5_000, cheio: 5_800 },
  { telas: 3, nome: 'Trio', preco: 6_200, cheio: 8_700 },
  { telas: 4, nome: 'Rede Total', preco: 7_000, cheio: 11_600, destaque: true },
]

// ── Por que R$ 3.800 de ticket médio — a mistura real de 20 clientes ───────
// Quantos clientes pegam cada plano. A média ponderada disso é o ticket médio.
export const MIX_EXEMPLO: { telas: number; qtd: number }[] = [
  { telas: 1, qtd: 14 },
  { telas: 2, qtd: 3 },
  { telas: 3, qtd: 1 },
  { telas: 4, qtd: 2 },
]
export const MIX_CALC = MIX_EXEMPLO.map((m) => {
  const pacote = PACOTES.find((p) => p.telas === m.telas)!
  return { ...m, nome: pacote.nome, preco: pacote.preco, subtotal: pacote.preco * m.qtd }
})
export const MIX_CLIENTES = MIX_EXEMPLO.reduce((s, m) => s + m.qtd, 0) // 20
export const MIX_BRUTO = MIX_CALC.reduce((s, m) => s + m.subtotal, 0) // 75.800
export const MIX_TICKET = Math.round(MIX_BRUTO / MIX_CLIENTES) // ~3.790 → adotado 3.800
export const MIX_TELAS_USADAS = MIX_EXEMPLO.reduce((s, m) => s + m.telas * m.qtd, 0) // 31
export const TELAS_TOTAIS = ANUNCIOS_NO_LOOP * NUM_TOTENS // 80

// ── Cenários = a divisão com o shopping (40% e 50%) sobre o mesmo bruto ─────
export function calcSplit(shoppingPct: number) {
  const bruto = BRUTO_MES
  const repasse = bruto * shoppingPct
  const liquido = bruto - repasse - OPEX_FIXO_MES
  const payback = CAPEX_TOTAL / liquido
  return { shoppingPct, bruto, repasse, opex: OPEX_FIXO_MES, liquido, payback, margemPct: liquido / bruto }
}
export const SPLIT_CENARIOS = [SPLIT_SHOPPING.min, SPLIT_SHOPPING.max].map(calcSplit)

// ── Curva de clientes — 12 meses (rampa comercial real: começa baixa) ──────
export const RAMPA_CLIENTES = [4, 7, 10, 13, 16, 18, 20, 20, 20, 20, 20, 20]

// Rampa calculada no pior caso da divisão (shopping com 50%), para ser seguro.
export function calcRampa(shoppingPct = SPLIT_SHOPPING.max) {
  let acumulado = -CAPEX_TOTAL
  return RAMPA_CLIENTES.map((clientes, i) => {
    const bruto = clientes * TICKET_MEDIO
    const liquido = bruto - bruto * shoppingPct - OPEX_FIXO_MES
    acumulado += liquido
    return { mes: i + 1, clientes, bruto, liquido, acumulado }
  })
}

// ── Audiência / impressões ─────────────────────────────────────────────────
export const ALCANCE_PCT_POR_TOTEM = 0.3 // % dos visitantes que passam no campo de visão
export const SEGUNDOS_POR_ANUNCIO = 10

export const AUDIENCIA = (() => {
  const visMes = MERCADO.visitantesMes
  const otsTotemMes = Math.round(visMes * ALCANCE_PCT_POR_TOTEM) // ~153.000
  const otsRedeMes = otsTotemMes * NUM_TOTENS // ~612.000 (exposições somadas)
  const loopSeg = ANUNCIOS_NO_LOOP * SEGUNDOS_POR_ANUNCIO // 200s
  const loopsDia = Math.round((MERCADO.horasDia * 3600) / loopSeg) // ~216
  const exibAnuncioMesTotem = loopsDia * MERCADO.diasMes // ~6.480 por totem
  const cpmImplicito = PACOTES[0].preco / (otsTotemMes / 1000) // R$2.900 / ~153k OTS ≈ R$19
  return { visMes, otsTotemMes, otsRedeMes, loopsDia, exibAnuncioMesTotem, cpmImplicito }
})()

export const APRESENTADO_PARA = 'Sócios TotemPlay'
export const CONTRATO_VIA = 'Marllon Paiva · Montes Claros Shopping'
