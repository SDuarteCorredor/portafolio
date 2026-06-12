import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Toggle claro/oscuro. Modo claro es el principal; la preferencia se guarda
// en localStorage y se aplica antes del primer pintado (ver script en index.html).
export function ThemeToggle({ className = '', onDark = false }) {
  const [dark, setDark] = useState(false)

  // Sincroniza el estado con la clase ya aplicada por el script anti-parpadeo.
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    const root = document.documentElement
    root.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch (e) {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
      aria-pressed={dark}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
      className={`group relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border transition-colors duration-300 hover:border-santi hover:text-santi ${
        onDark ? 'border-white/20 text-paper' : 'border-line text-fg'
      } ${className}`}
    >
      {/* halo azul al hover */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-santi/0 transition-colors duration-300 group-hover:bg-santi/10" />

      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.svg
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            className="relative"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            className="relative"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}
