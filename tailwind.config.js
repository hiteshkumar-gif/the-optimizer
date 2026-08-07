/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          bg: '#080A0C',
          surface: '#101418',
          elevated: '#151A1F',
          border: '#242A30',
        },
        ivory: {
          DEFAULT: '#F5F3EE',
          muted: '#9BA3AA',
          dim: '#677078',
        },
        mint: {
          DEFAULT: '#B8F2D0',
          glow: 'rgba(184, 242, 208, 0.15)',
          border: 'rgba(184, 242, 208, 0.25)',
        },
        champagne: {
          DEFAULT: '#D8C7A1',
          pearl: '#F1E9D2',
          border: 'rgba(216, 199, 161, 0.25)',
        },
        brand: {
          dark: '#080A0C',
          surface: '#101418',
          card: '#151A1F',
          border: '#242A30',
          mint: '#B8F2D0',
          champagne: '#D8C7A1',
          subtext: '#9BA3AA',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(184, 242, 208, 0.18)',
        'glow-mint': '0 0 25px -5px rgba(184, 242, 208, 0.22)',
        'glow-champagne': '0 0 25px -5px rgba(216, 199, 161, 0.18)',
        hardware: '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      keyframes: {
        pulseMint: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'pulse-mint': 'pulseMint 2s ease-in-out infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
