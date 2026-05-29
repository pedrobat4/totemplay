import { tw } from '../twind'

export function Background() {
  return (
    <div className={tw`pointer-events-none fixed inset-0 overflow-hidden`}>
      <div
        className={tw`absolute inset-0`}
        style={{
          background:
            'radial-gradient(120% 120% at 100% 0%, rgba(124,92,255,.18), transparent 55%),' +
            'radial-gradient(100% 100% at 0% 100%, rgba(91,63,214,.14), transparent 55%),' +
            'linear-gradient(180deg, #08060f 0%, #0e0a1c 100%)',
        }}
      />
      {/* floating orbs */}
      <div className={tw`absolute top-[-120px] left-[10%] h-[340px] w-[340px] rounded-full bg-violet/20 blur-[120px] animate-float`} />
      <div
        className={tw`absolute bottom-[-100px] right-[8%] h-[300px] w-[300px] rounded-full bg-violet-deep/25 blur-[120px] animate-float`}
        style={{ animationDelay: '2s' }}
      />
      {/* dotted grid */}
      <div
        className={tw`absolute inset-0 opacity-40`}
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(120% 80% at 50% 30%, #000, transparent)',
          WebkitMaskImage: 'radial-gradient(120% 80% at 50% 30%, #000, transparent)',
        }}
      />
    </div>
  )
}
