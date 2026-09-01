import { useRef } from 'react'
import {
  motion, useScroll, useVelocity, useSpring, useTransform,
  useAnimationFrame, useMotionValue, useReducedMotion, wrap,
} from 'framer-motion'

// Marquee que reacciona a la velocidad del scroll: acelera cuando bajás e
// invierte el sentido cuando subís.
//
// Sustituye a la animación CSS de bucle infinito. La diferencia es que el
// movimiento deja de ser decorativo y pasa a responder al gesto del usuario —
// que es justo lo que separa una página "con animaciones" de una que se siente
// viva.
//
// El contenido se duplica y `wrap` recicla la posición en el rango -50%..0%,
// así el bucle es continuo sin saltos visibles.

export function VelocityMarquee({ children, baseVelocity = -3, className = '' }) {
  const baseX = useMotionValue(0)
  const reduce = useReducedMotion()

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })

  // clamp: false a propósito — un scroll muy rápido debe poder empujar el
  // marquee más allá del rango de referencia.
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], { clamp: false })

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return

    // Base constante: aunque la página esté quieta, el marquee no se detiene.
    let moveBy = direction.current * baseVelocity * (delta / 1000)

    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1

    moveBy += moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  // Sin movimiento: una fila estática, legible, sin recorte.
  if (reduce) {
    return <div className={`flex flex-wrap gap-x-10 gap-y-2 ${className}`}>{children}</div>
  }

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex shrink-0">
        {/* Las dos copias son idénticas a propósito: `wrap` desplaza exactamente
            el 50% del ancho total, así que cualquier diferencia entre ellas se
            vería como un salto en cada vuelta. */}
        <span className={`flex shrink-0 gap-10 pr-10 ${className}`}>{children}</span>
        <span className={`flex shrink-0 gap-10 pr-10 ${className}`} aria-hidden>{children}</span>
      </motion.div>
    </div>
  )
}
