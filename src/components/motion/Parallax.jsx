import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

// Desplaza su contenido a distinta velocidad que la página según el scroll.
//
// El rango se mide contra la ventana ('start end' → 'end start'), o sea desde
// que el elemento asoma por abajo hasta que sale por arriba. Así el efecto es
// simétrico y no depende de dónde esté la sección en la página.

export function Parallax({
  children,
  className = '',
  speed = 0.15,   // fracción de la altura de la ventana; negativo = va al revés
  smooth = true,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const distance = typeof window !== 'undefined' ? window.innerHeight * speed : 100
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  // El muelle quita el "escalón" que dejan los eventos de scroll discretos del
  // trackpad; sin él el paralaje se ve entrecortado.
  const smoothed = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.35 })
  const y = smooth ? smoothed : raw

  if (reduce) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
