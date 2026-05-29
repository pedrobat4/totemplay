import { tw } from '../twind'

// Deterministic decorative QR-style pattern (visual only, for demo).
export function FakeQR({ seed = 7, size = 132 }: { seed?: number; size?: number }) {
  const n = 13
  const cell = size / n
  const cells: { x: number; y: number }[] = []
  let s = seed
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (rand() > 0.52) cells.push({ x, y })
    }
  }
  const finder = (ox: number, oy: number) => (
    <g key={`f${ox}-${oy}`}>
      <rect x={ox * cell} y={oy * cell} width={cell * 3} height={cell * 3} fill="#08060f" />
      <rect x={(ox + 0.6) * cell} y={(oy + 0.6) * cell} width={cell * 1.8} height={cell * 1.8} fill="#fff" />
    </g>
  )
  return (
    <div className={tw`rounded-xl bg-white p-2.5`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect width={size} height={size} fill="#fff" />
        {cells.map((c, i) => (
          <rect key={i} x={c.x * cell} y={c.y * cell} width={cell} height={cell} fill="#08060f" rx={1} />
        ))}
        {finder(0, 0)}
        {finder(n - 3, 0)}
        {finder(0, n - 3)}
      </svg>
    </div>
  )
}
