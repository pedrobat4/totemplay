import { tw } from '../twind'

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'text-xl' : 'text-3xl'
  return (
    <div className={tw`flex items-center gap-2 font-display font-bold tracking-tight ${cls}`}>
      <span
        className={tw`inline-block h-3 w-3 rotate-45 bg-violet`}
        style={{ boxShadow: '0 0 16px rgba(124,92,255,.6)' }}
      />
      <span className={tw`text-ink`}>
        Totem<span className={tw`text-violet-bright`}>Play</span>
      </span>
    </div>
  )
}
