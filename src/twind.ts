import { install } from '@twind/core'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwind from '@twind/preset-tailwind'

install({
  presets: [presetAutoprefix(), presetTailwind()],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        ink: '#f4f2fb',
        muted: '#a39ec0',
        faint: '#6f6a8d',
        violet: {
          DEFAULT: '#8b6dff',
          bright: '#a98bff',
          deep: '#5b3fd6',
        },
        gold: '#e9b96e',
        bg: '#08060f',
        bg2: '#0e0a1c',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-22px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(.85)', opacity: '.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        spin360: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
        spinSlow: 'spin360 30s linear infinite',
      },
    },
  },
})

import { tw as twFn } from '@twind/core'

// Wrapper so components can use tagged-template syntax: tw`flex ...`
export function tw(strings: TemplateStringsArray | string, ...values: unknown[]): string {
  if (typeof strings === 'string') return twFn(strings)
  const str = strings.reduce(
    (acc, s, i) => acc + s + (i < values.length ? String(values[i]) : ''),
    '',
  )
  return twFn(str)
}
