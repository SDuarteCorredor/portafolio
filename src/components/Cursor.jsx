import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Glow azul que sigue el mouse — el detalle "firma".
// Usa motion values (no React state) para mover el punto: así NO re-renderiza
// en cada pixel del cursor, eliminando jank.
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 600, damping: 38, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 600, damping: 38, mass: 0.3 })
  const [hot, setHot] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return // sin cursor en touch

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      // setState solo cambia cuando cruza un elemento interactivo (React descarta
      // el render si el valor no cambió), así que no genera renders por movimiento.
      setHot(!!e.target.closest('a, button, [data-hot]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: hot ? 64 : 22,
          height: hot ? 64 : 22,
          transition: 'width .25s, height .25s',
          background: hot
            ? 'radial-gradient(circle, rgba(27,60,255,.25), transparent 70%)'
            : 'rgba(27,60,255,.9)',
          boxShadow: '0 0 24px rgba(27,60,255,.8)',
          mixBlendMode: 'var(--cursor-blend)',
        }}
      />
    </motion.div>
  )
}
