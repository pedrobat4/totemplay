import { tw } from '../twind'

/*
 * Roleta na identidade Metabuy: P&B + azul como único destaque.
 * O setor favorito (a loja do lojista) é o azul; o resto vive em cinza.
 */

const VB = 320
const R = 150
const CX = VB / 2
const CY = VB / 2

const SEGMENTS = [
  { label: 'SUA LOJA', favorite: true },
  { label: 'LOJA 2', favorite: false },
  { label: 'LOJA 3', favorite: false },
  { label: 'LOJA 4', favorite: false },
  { label: 'LOJA 5', favorite: false },
  { label: 'LOJA 6', favorite: false },
]
const SEG = 360 / SEGMENTS.length
const GRAYS = ['#E9EBF0', '#DBDFE7']

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) }
}

export function WheelClean({ size = 320, idle = false }: { size?: number; idle?: boolean }) {
  return (
    <div className={tw`relative mx-auto w-full`} style={{ maxWidth: size, aspectRatio: '1 / 1' }}>
      {/* pointer */}
      <div className={tw`absolute left-1/2 z-20 -translate-x-1/2`} style={{ top: -8 }}>
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '13px solid transparent',
            borderRight: '13px solid transparent',
            borderTop: '22px solid #0B0C0F',
          }}
        />
      </div>

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className={tw`block h-full w-full ${idle ? 'animate-spinSlow' : ''}`}
        style={{ transformOrigin: '50% 50%', filter: 'drop-shadow(0 18px 34px rgba(11,12,15,.14))' }}
      >
        <circle cx={CX} cy={CY} r={R + 6} fill="#fff" stroke="rgba(11,12,15,.12)" strokeWidth={2} />
        {SEGMENTS.map((seg, i) => {
          const start = i * SEG
          const end = (i + 1) * SEG
          const p0 = polar(start, R)
          const p1 = polar(end, R)
          const mid = polar(start + SEG / 2, R * 0.64)
          const labelAngle = start + SEG / 2
          return (
            <g key={seg.label}>
              <path
                d={`M${CX} ${CY} L${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A${R} ${R} 0 0 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`}
                fill={seg.favorite ? '#1B5CFF' : GRAYS[i % 2]}
                stroke="#fff"
                strokeWidth={2.5}
              />
              <text
                x={mid.x}
                y={mid.y}
                fontSize={14}
                fontFamily="Archivo"
                fontWeight={800}
                fill={seg.favorite ? '#fff' : '#0B0C0F'}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${labelAngle} ${mid.x} ${mid.y})`}
              >
                {seg.label}
              </text>
            </g>
          )
        })}
        <circle cx={CX} cy={CY} r={30} fill="#0B0C0F" />
        <text
          x={CX}
          y={CY + 1}
          fontSize={16}
          fontFamily="Anton"
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          TP
        </text>
      </svg>
    </div>
  )
}
