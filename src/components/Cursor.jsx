import { useEffect, useState } from 'react'

// Glow azul que sigue el mouse — el detalle "firma".
export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hot, setHot] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return // sin cursor en touch

    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => {
      const t = e.target.closest('a, button, [data-hot]')
      setHot(!!t)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-[70] hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        transition: 'width .25s, height .25s, opacity .25s',
        width: hot ? 64 : 22,
        height: hot ? 64 : 22,
      }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: hot
            ? 'radial-gradient(circle, rgba(27,60,255,.25), transparent 70%)'
            : 'rgba(27,60,255,.9)',
          boxShadow: '0 0 24px rgba(27,60,255,.8)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
