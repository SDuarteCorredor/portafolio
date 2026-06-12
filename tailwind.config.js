/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Santiago Blue — la firma (idéntico en ambos modos)
        santi: {
          DEFAULT: '#1B3CFF',
          glow: '#3D5BFF',
          soft: '#6B82FF',
          deep: '#0A1A8A',
        },

        // Naranja de Lumi — solo para el card de Lumi. Theme-aware:
        // #FF6B35 (oscuro, oficial) / #E85525 (claro).
        lumi: {
          DEFAULT: 'rgb(var(--c-lumi) / <alpha-value>)',
          soft: '#FF8C42',
        },

        // Tokens semánticos — se voltean entre modo claro/oscuro vía variables CSS.
        // Soportan opacidad (bg-fg/80, border-fg/10, etc.).
        bg: 'rgb(var(--c-bg) / <alpha-value>)',        // fondo de página
        surface: 'rgb(var(--c-surface) / <alpha-value>)', // paneles / cards
        fg: 'rgb(var(--c-fg) / <alpha-value>)',        // texto principal
        muted: 'rgb(var(--c-muted) / <alpha-value>)',  // texto secundario
        line: 'var(--c-line)',                         // bordes
        faint: 'var(--c-faint)',                       // relleno sutil

        // Hexes crudos de marca (por si se necesitan fijos, sin voltear)
        ink: '#06070D',
        ink2: '#0B0D17',
        paper: '#F4F3EE',
        mist: '#A7AAB8',
      },
      fontFamily: {
        // Geist como principal (limpia, tipo SF/Apple). Fallback a -apple-system
        // = San Francisco real en Mac/iOS si Geist no cargó.
        grotesk: ['Geist', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['Geist', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        // La "especial" — acento itálico, uso raro
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'mega': 'clamp(3.2rem, 13vw, 13rem)',
        'huge': 'clamp(2.4rem, 8vw, 7rem)',
        'big': 'clamp(1.8rem, 5vw, 4rem)',
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(6%,-8%) scale(1.12)' },
          '66%': { transform: 'translate(-7%,5%) scale(0.94)' },
        },
        spin: { to: { transform: 'rotate(360deg)' } },
        aurora: {
          '0%,100%': { transform: 'translate(-10%,-6%) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate(8%,6%) rotate(8deg) scale(1.15)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-fast': 'marquee 16s linear infinite',
        'marquee-rev': 'marquee-rev 34s linear infinite',
        blob: 'blob 18s ease-in-out infinite',
        'spin-slow': 'spin 16s linear infinite',
        'spin-slower': 'spin 32s linear infinite',
        aurora: 'aurora 24s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
