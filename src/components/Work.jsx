import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion'
import { work } from '../data'
import { Reveal } from './Reveal'

function WorkCard({ w, i }) {
  // Glow + tilt que reaccionan al cursor dentro de la card.
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(27,60,255,0.18), transparent 60%)`

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px * 100)
    my.set(py * 100)
    ry.set((px - 0.5) * 8)
    rx.set((0.5 - py) * 8)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <a
      href={w.link || undefined}
      data-hot
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`group relative block h-full overflow-hidden rounded-3xl border border-white/10 p-8 transition-colors duration-500 hover:border-santi/50 md:p-10 ${
        w.featured ? 'bg-gradient-to-br from-santi/15 via-ink2 to-ink2' : 'bg-ink2'
      }`}
    >
      {/* glow que sigue el cursor */}
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* número índice fantasma */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-6 select-none font-grotesk text-[7rem] font-bold leading-none text-outline opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
      >
        0{i + 1}
      </span>

      <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }} className="relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-santi-soft">{w.kind}</span>
          <span className="font-mono text-xs text-mist">{w.year}</span>
        </div>

        {w.featured && (
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-santi/40 bg-santi/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-santi-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-santi animate-pulse" /> Producto destacado
          </span>
        )}

        <h3 className={`mt-6 font-grotesk font-bold tracking-tightest ${w.featured ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'}`}>
          {w.title}
        </h3>

        <p className="mt-4 max-w-xl text-mist">{w.desc}</p>

        <div className="mt-8 flex items-center justify-between">
          <span className="font-grotesk text-lg text-paper">{w.metric}</span>
          {w.link && (
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:rotate-45 group-hover:border-santi group-hover:bg-santi group-hover:text-white">
              ↗
            </span>
          )}
        </div>
      </motion.div>
    </a>
  )
}

export function Work() {
  return (
    <section id="trabajo" className="container-x py-24 md:py-36">
      <Reveal>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <p className="eyebrow">Trabajo seleccionado</p>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">(03)</span>
            </div>
            <h2 className="font-grotesk text-huge font-bold leading-[0.95] tracking-tightest">
              Casos <span className="text-outline-blue">reales</span>.
            </h2>
          </div>
          <p className="max-w-sm text-mist">
            De campañas que multiplicaron ventas a un producto digital construido con IA.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {work.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06} className={w.featured ? 'md:col-span-2' : ''}>
            <WorkCard w={w} i={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
