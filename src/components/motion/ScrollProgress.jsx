import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

// Hilo azul de progreso pegado al borde superior.
//
// Cumple una función real además de la estética: en un sitio con scroll suave
// (Lenis) se pierde la referencia de cuánto falta, porque la barra nativa del
// navegador queda escondida en escritorio.

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()

  // El muelle evita que la barra tiemble con cada evento de rueda.
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[75] h-[2px] origin-left bg-gradient-to-r from-santi via-santi-glow to-santi-soft"
    />
  )
}
