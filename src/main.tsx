import './twind'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { LojistaApp } from './LojistaApp'

// VITE_BUILD_TARGET=lojista gera o site standalone da proposta para lojistas
// (raiz = apresentação). Sem a env, é o site do pitch para o shopping.
const isLojista = import.meta.env.VITE_BUILD_TARGET === 'lojista'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>{isLojista ? <LojistaApp /> : <App />}</React.StrictMode>,
)
