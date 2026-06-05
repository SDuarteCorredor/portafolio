import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

// Cuenta hacia arriba cuando entra en viewport. Acepta "+278%", "24+", "+6", etc.
export function Counter({ value, className = '' }) {
  const match = String(value).match(/^([^\d-]*)(-?[\d.]+)(.*)$/)
  const prefix = match ? match[1] : ''
  const target = match ? parseFloat(match[2]) : 0
  const suffix = match ? match[3] : ''

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
