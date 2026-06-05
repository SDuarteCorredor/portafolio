import { useEffect } from 'react'
import Lenis from 'lenis'

// Scroll suave tipo "premium" (el que ves en los portfolios de referencia)
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Reduce motion: respetar preferencia del sistema
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) lenis.destroy()

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
