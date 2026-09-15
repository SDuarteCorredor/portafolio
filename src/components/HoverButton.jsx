import { useRef, useState, useEffect, useCallback, forwardRef } from 'react'

// Botón primario con estela de luz que sigue el cursor.
// Adaptado del HoverButton (shadcn/TS) a este stack: JSX + Tailwind, sin `cn`.
// Se usa solo en CTAs destacados.
//
// Era de vidrio: fondo del azul firma al 7% y texto del color del tema. Sobre
// el hero oscuro se leía como un botón apagado al lado del "Ver trabajo", que
// es el secundario — el CTA principal no puede pesar menos que el secundario.
// Va en azul #1B3CFF sólido y texto blanco, como el resto de los CTA primarios
// del sitio (.btn-blue). La estela se conserva y se ve mejor sobre el sólido.
// Renderiza <a> si recibe href, si no <button>.
export const HoverButton = forwardRef(function HoverButton(
  { className = '', children, ...props },
  ref
) {
  const innerRef = useRef(null)
  const [isListening, setIsListening] = useState(false)
  const [circles, setCircles] = useState([])
  const lastAddedRef = useRef(0)

  const setRefs = (node) => {
    innerRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  const createCircle = useCallback((x, y) => {
    const w = innerRef.current?.offsetWidth || 1
    const xPos = x / w
    const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${xPos * 100}%)`
    setCircles((prev) => [...prev, { id: Date.now() + Math.random(), x, y, color, fadeState: null }])
  }, [])

  const handlePointerMove = useCallback(
    (e) => {
      if (!isListening) return
      const now = Date.now()
      if (now - lastAddedRef.current > 100) {
        lastAddedRef.current = now
        const rect = e.currentTarget.getBoundingClientRect()
        createCircle(e.clientX - rect.left, e.clientY - rect.top)
      }
    },
    [isListening, createCircle]
  )

  useEffect(() => {
    circles.forEach((circle) => {
      if (!circle.fadeState) {
        setTimeout(() => setCircles((p) => p.map((c) => (c.id === circle.id ? { ...c, fadeState: 'in' } : c))), 0)
        setTimeout(() => setCircles((p) => p.map((c) => (c.id === circle.id ? { ...c, fadeState: 'out' } : c))), 1000)
        setTimeout(() => setCircles((p) => p.filter((c) => c.id !== circle.id)), 2200)
      }
    })
  }, [circles])

  const Comp = props.href ? 'a' : 'button'

  return (
    <Comp
      ref={setRefs}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsListening(true)}
      onPointerLeave={() => setIsListening(false)}
      style={{ '--circle-start': 'rgba(255,255,255,0.95)', '--circle-end': '#9FB0FF' }}
      className={
        'relative isolate inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 ' +
        'font-grotesk text-sm font-semibold text-white bg-santi transition-all duration-300 hover:-translate-y-0.5 ' +
        "before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-[inherit] before:content-[''] " +
        'before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_2px_6px_0_rgba(6,7,13,0.35),0_16px_44px_-12px_rgba(27,60,255,0.75)] ' +
        'before:transition-transform before:duration-300 active:before:scale-[0.975] ' +
        className
      }
      {...props}
    >
      {circles.map(({ id, x, y, color, fadeState }) => (
        <span
          key={id}
          aria-hidden
          className={
            'absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-lg pointer-events-none z-[-1] transition-opacity duration-300 ' +
            (fadeState === 'in' ? 'opacity-75 ' : '') +
            (fadeState === 'out' ? 'opacity-0 duration-[1.2s] ' : '') +
            (!fadeState ? 'opacity-0 ' : '')
          }
          style={{ left: x, top: y, background: color }}
        />
      ))}
      {children}
    </Comp>
  )
})
