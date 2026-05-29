import { tw } from '../twind'

const LABELS = ['Início', 'Cadastro', 'Favorita', 'Roleta', 'Prêmio']

export function StepDots({ step }: { step: number }) {
  return (
    <div className={tw`flex items-center justify-center gap-2.5`}>
      {LABELS.map((label, i) => (
        <div key={label} className={tw`flex items-center gap-2.5`}>
          <div
            className={tw`h-2.5 rounded-full transition-all duration-500 ${
              i === step
                ? 'w-8 bg-violet-bright'
                : i < step
                  ? 'w-2.5 bg-violet/70'
                  : 'w-2.5 bg-white/15'
            }`}
            style={i === step ? { boxShadow: '0 0 12px rgba(124,92,255,.7)' } : undefined}
          />
        </div>
      ))}
    </div>
  )
}
