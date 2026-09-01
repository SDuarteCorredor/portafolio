import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

// Tarjeta con inclinación 3D real y foco de luz que sigue al cursor.
//
// Es el truco más barato para que una grilla de tarjetas planas deje de verse
// plana: no hay geometría ni WebGL, solo una transformación con perspectiva.
// Se apaga solo en táctil (donde no hay cursor que seguir) y con "reducir
// movimiento".

export function Tilt({
  children,
  className = '',
  max = 7,              // grados de inclinación en el borde
  scale = 1.012,
  glare = true,
  lift = 6,             // px que "sube" la tarjeta hacia el lector
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)

  // -0.5..0.5 respecto al centro de la tarjeta.
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 260, damping: 24, mass: 0.5 }
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)

  // Eje invertido: mover el mouse hacia arriba debe inclinar el borde superior
  // hacia atrás, no hacia adelante.
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])

  // El foco de luz vive en coordenadas de porcentaje del propio elemento.
  // Se declara acá arriba, con el resto de los hooks: dentro del JSX quedaría
  // detrás de un condicional y rompería el orden de llamada entre renders.
  const glareX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(340px circle at ${x} ${y}, rgba(27,60,255,0.16), transparent 70%)`,
  )

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onEnter = (e) => {
    // Solo cursores finos: en táctil el "hover" se queda pegado tras el tap.
    if (e.pointerType !== 'mouse') return
    setActive(true)
  }

  const onLeave = () => {
    setActive(false)
    px.set(0)
    py.set(0)
  }

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={{
        rotateX: active ? rotateX : 0,
        rotateY: active ? rotateY : 0,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      animate={{ scale: active ? scale : 1, y: active ? -lift : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.5 }}
      className={`relative ${className}`}
    >
      {children}

      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{ opacity: active ? 1 : 0, background: glareBg }}
        />
      )}
    </motion.div>
  )
}
