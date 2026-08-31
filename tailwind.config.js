/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          void: '#040507',
          base: '#06070a',
          surface: '#0d1017',
          elevated: '#141822',
          border: 'rgba(255, 255, 255, 0.07)',
          borderHover: 'rgba(255, 59, 0, 0.35)',
        },
        brand: {
          accent: '#FF3B00',
          orange: '#FF5E0E',
          gold: '#E5A93C',
          cyan: '#00F0FF',
          lime: '#D4FF00',
          volt: '#CCFF00',
          crimson: '#FF2A4D',
          purple: '#9945FF',
          dark: '#050608',
          surface: '#0A0D14',
          surfaceLight: '#121620',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        pinarello: {
          red: '#FF3B00',
          blaze: '#FF5414',
          gold: '#E6A122',
          carbon: '#0c0e14',
          slate: '#161a24',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        cinzel: ['Cinzel', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.15em',
        technical: '0.05em',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.03)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(0, 240, 255, 0.3)',
        'glow-lime': '0 0 30px -5px rgba(212, 255, 0, 0.3)',
        'glow-crimson': '0 0 30px -5px rgba(255, 51, 102, 0.3)',
        'glass-subtle': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        'xs': '3px',
        '2xl': '40px',
      }
    },
  },
  plugins: [],
}

