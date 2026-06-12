import { useRef, useState, useEffect, useCallback, forwardRef } from 'react'

// Botón "glass" con estela de luz azul firma que sigue el cursor.
// Adaptado del HoverButton (shadcn/TS) a este stack: JSX + Tailwind, sin `cn`,
// theme-aware y con el azul #1B3CFF. Se usa solo en CTAs destacados.
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
      style={{ '--circle-start': '#6B82FF', '--circle-end': '#1B3CFF' }}
      className={
        'relative isolate inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 ' +
        'font-grotesk text-sm font-medium text-fg backdrop-blur-lg bg-santi/[0.07] transition-transform ' +
        "before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-[inherit] before:content-[''] " +
        'before:shadow-[inset_0_0_0_1px_rgba(27,60,255,0.30),inset_0_0_16px_0_rgba(107,130,255,0.15),inset_0_-3px_12px_0_rgba(27,60,255,0.20),0_1px_3px_0_rgba(0,0,0,0.40),0_8px_24px_-8px_rgba(27,60,255,0.45)] ' +
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
