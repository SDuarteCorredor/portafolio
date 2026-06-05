/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Santiago Blue — la firma
        santi: {
          DEFAULT: '#1B3CFF',
          glow: '#3D5BFF',
          soft: '#6B82FF',
          deep: '#0A1A8A',
        },
        ink: '#06070D',     // negro azulado de fondo
        ink2: '#0B0D17',    // paneles
        paper: '#F4F3EE',   // crema claro
        mist: '#A7AAB8',    // texto secundario
      },
      fontFamily: {
        // Display editorial con carácter (reemplaza Space Grotesk)
        grotesk: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
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
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(6%,-8%) scale(1.12)' },
          '66%': { transform: 'translate(-7%,5%) scale(0.94)' },
        },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-fast': 'marquee 16s linear infinite',
        blob: 'blob 18s ease-in-out infinite',
        'spin-slow': 'spin 16s linear infinite',
      },
    },
  },
  plugins: [],
}
