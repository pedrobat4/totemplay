export type Store = {
  id: number
  name: string
  category: string
  floor: string
  color: string
}

export const STORES: Store[] = [
  { id: 1, name: 'Loja 1', category: 'Moda & Estilo', floor: 'Piso L1', color: '#8b6dff' },
  { id: 2, name: 'Loja 2', category: 'Calçados', floor: 'Piso L1', color: '#a98bff' },
  { id: 3, name: 'Loja 3', category: 'Eletrônicos', floor: 'Piso L2', color: '#7c5cff' },
  { id: 4, name: 'Loja 4', category: 'Beleza & Perfumaria', floor: 'Piso L2', color: '#b59bff' },
  { id: 5, name: 'Loja 5', category: 'Casa & Decoração', floor: 'Piso G', color: '#6d4fe0' },
  { id: 6, name: 'Loja 6', category: 'Gastronomia', floor: 'Praça', color: '#9d7dff' },
]

export const DEMO_USER = {
  name: 'Pedro Henrique',
  phone: '(38) 99876-5432',
  email: 'pedro@email.com',
}

export const PRIZE_PERCENT = 20
