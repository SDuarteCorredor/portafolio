import { useEffect, useRef, useState } from 'react'

// Puente entre React y la escena de three.js.
//
// El componente no importa three.js: lo trae con import() dinámico solo cuando
// ya decidió que vale la pena dibujar. Consecuencias buscadas:
//   · el bundle inicial no crece (three sale en su propio chunk),
//   · el render de servidor / prerender no toca WebGL,
//   · un móvil de gama baja o alguien con "reducir movimiento" nunca lo descarga.
//
// Si no se monta, queda el degradado CSS `.aurora-mesh` que ya estaba debajo:
// el hero nunca se ve vacío.

/** ¿Tiene sentido gastar una GPU acá? */
function shouldRender() {
  if (typeof window === 'undefined') return false

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  // Ahorro de datos activado: el usuario pidió explícitamente menos peso.
  if (navigator.connection?.saveData) return false

  // Menos de 4 núcleos suele ser gama baja; el shader se les nota.
  if ((navigator.hardwareConcurrency ?? 8) < 4) return false

  // Comprobación real de contexto: hay equipos donde WebGL existe pero falla.
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    return false
  }

  return true
}

export function AuroraCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!shouldRender()) return

    let cancelled = false
    let cleanupFns = []

    // En pantallas chicas se baja la densidad de la nube en vez de apagarla:
    // la mitad de puntos, misma sensación de profundidad.
    const density = window.innerWidth < 768 ? 0.45 : 1

    import('./auroraScene.js')
      .then(({ createAuroraScene }) => {
        if (cancelled || !canvasRef.current) return

        const isDark = () => document.documentElement.classList.contains('dark')

        const scene = createAuroraScene(canvasRef.current, {
          theme: isDark() ? 'dark' : 'light',
          density,
        })
        sceneRef.current = scene
        setReady(true)

        // El tema se cambia con una clase en <html>; se observa en vez de
        // pasarlo por props para no acoplar la escena al árbol de React.
        const mo = new MutationObserver(() => scene.setTheme(isDark() ? 'dark' : 'light'))
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        cleanupFns.push(() => mo.disconnect())

        // Progreso del scroll dentro del hero (0 arriba → 1 cuando salió).
        // Se lee en el propio rAF de la escena vía setScroll, así que acá solo
        // se publica el valor; no hay layout thrashing por frame.
        let ticking = false
        const onScroll = () => {
          if (ticking) return
          ticking = true
          requestAnimationFrame(() => {
            ticking = false
            const h = window.innerHeight || 1
            scene.setScroll(Math.min(1, Math.max(0, window.scrollY / h)))
          })
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        cleanupFns.push(() => window.removeEventListener('scroll', onScroll))

        // Fuera de vista no se dibuja nada: al leer el resto de la página la
        // GPU queda libre.
        const io = new IntersectionObserver(
          ([e]) => scene.setPaused(!e.isIntersecting),
          { threshold: 0 },
        )
        io.observe(canvasRef.current)
        cleanupFns.push(() => io.disconnect())
      })
      .catch(() => {
        // Si el chunk no carga, el degradado CSS de abajo sigue ahí.
      })

    return () => {
      cancelled = true
      cleanupFns.forEach((fn) => fn())
      cleanupFns = []
      sceneRef.current?.destroy()
      sceneRef.current = null
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full transition-opacity duration-1000 ${
        ready ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  )
}
