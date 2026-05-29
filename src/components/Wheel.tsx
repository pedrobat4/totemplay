import { tw } from '../twind'
import { STORES } from '../data'

const VB = 320 // internal coordinate space (constant)
const R = 150
const CX = VB / 2
const CY = VB / 2
const SEG = 360 / STORES.length

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) }
}

type Props = {
  rotation: number
  favoriteId: number | null
  spinning: boolean
  idle?: boolean
  size?: number
}

export function Wheel({ rotation, favoriteId, spinning, idle = false, size = 320 }: Props) {
  return (
    <div className={tw`relative mx-auto w-full`} style={{ maxWidth: size, aspectRatio: '1 / 1' }}>
      {/* glow ring */}
      <div
        className={tw`absolute inset-0 rounded-full`}
        style={{ boxShadow: '0 0 80px rgba(124,92,255,.45)', filter: spinning ? 'brightness(1.15)' : 'none' }}
      />
      {/* pointer */}
      <div
        className={tw`absolute left-1/2 z-20 -translate-x-1/2`}
        style={{ top: -10 }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: '24px solid #e9b96e',
            filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.5))',
          }}
        />
      </div>

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className={tw`block h-full w-full ${idle ? 'animate-spinSlow' : ''}`}
        style={{
          transform: idle ? undefined : `rotate(${rotation}deg)`,
          transition: spinning ? 'transform 5.2s cubic-bezier(.15,.62,.12,1)' : 'none',
          transformOrigin: '50% 50%',
        }}
      >
        <circle cx={CX} cy={CY} r={R + 4} fill="#0a0813" stroke="rgba(124,92,255,.4)" strokeWidth={3} />
        {STORES.map((store, i) => {
          const start = i * SEG
          const end = (i + 1) * SEG
          const p0 = polar(start, R)
          const p1 = polar(end, R)
          const mid = polar(start + SEG / 2, R * 0.64)
          const isFav = favoriteId === store.id
          const labelAngle = start + SEG / 2
          return (
            <g key={store.id}>
              <path
                d={`M${CX} ${CY} L${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A${R} ${R} 0 0 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`}
                fill={store.color}
                stroke="#08060f"
                strokeWidth={2}
                opacity={isFav ? 1 : 0.82}
              />
              {isFav && (
                <path
                  d={`M${CX} ${CY} L${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A${R} ${R} 0 0 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`}
                  fill="none"
                  stroke="#e9b96e"
                  strokeWidth={3}
                />
              )}
              <text
                x={mid.x}
                y={mid.y}
                fontSize={15}
                fontFamily="Space Grotesk"
                fontWeight={700}
                fill={isFav ? '#08060f' : 'rgba(255,255,255,.92)'}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${labelAngle} ${mid.x} ${mid.y})`}
              >
                {store.name}
              </text>
            </g>
          )
        })}
        {/* hub */}
        <circle cx={CX} cy={CY} r={30} fill="#08060f" stroke="#e9b96e" strokeWidth={2.5} />
        <text
          x={CX}
          y={CY}
          fontSize={18}
          fontFamily="Space Grotesk"
          fontWeight={700}
          fill="#e9b96e"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          TP
        </text>
      </svg>
    </div>
  )
}

export { SEG }
