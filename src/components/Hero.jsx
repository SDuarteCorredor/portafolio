import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data'
import { Magnetic } from './Magnetic'
import { Counter } from './Counter'

// Prueba dura que ancla el hero — números reales, no promesas.
const proof = [
  { v: '+278%', k: 'ventas · Bio Lab' },
  { v: '24+', k: 'marcas posicionadas' },
  { v: '+6', k: 'años en el oficio' },
]

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yBlob = useTransform(scrollYProgress, [0, 1], [0, 140])
  const yGhost = useTransform(scrollYProgress, [0, 1], [0, -90])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  // Reveal por línea (máscara que sube) — el momento de carga orquestado.
  const line = {
    hidden: { y: '120%' },
    show: (i) => ({
      y: 0,
      transition: { duration: 1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  }
  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32"
    >
      {/* Atmósfera mínima — aurora + un blob + rejilla sutil */}
      <div className="pointer-events-none absolute inset-0 -z-30 aurora-mesh" />
      <motion.div
        style={{ y: yBlob }}
        className="pointer-events-none absolute -right-24 top-4 -z-20 h-[55vh] w-[55vh] rounded-full bg-santi/25 blur-[90px] animate-blob"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            'linear-gradient(var(--c-grid) 1px, transparent 1px), linear-gradient(90deg, var(--c-grid) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 60% 35%, #000 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 60% 35%, #000 25%, transparent 75%)',
        }}
      />

      {/* Número índice gigante de contorno — un solo gesto editorial */}
      <motion.span
        style={{ y: yGhost }}
        aria-hidden
        className="pointer-events-none absolute -right-6 bottom-24 -z-10 select-none font-grotesk text-[40vw] font-bold leading-none tracking-tightest text-outline opacity-[0.05] md:text-[24vw]"
      >
        01
      </motion.span>

      <motion.div style={{ opacity }} className="container-x flex flex-1 flex-col">
        {/* Barra-ticket superior */}
        <motion.div
          {...fade(0.05)}
          className="flex items-center justify-between gap-4 border-b border-line pb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
        >
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-santi opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-santi" />
            </span>
            Disponible — 2026
          </span>
          <span className="hidden sm:inline">Bogotá, CO · 4°N 74°W</span>
          <span className="text-fg">{profile.short}</span>
        </motion.div>

        {/* Bloque del titular */}
        <div className="flex flex-1 flex-col justify-center py-12">
          <motion.p {...fade(0.15)} className="eyebrow mb-7">
            Marketing · Diseño · Producto con IA
          </motion.p>

          <h1 className="group font-grotesk text-mega font-bold leading-[0.82] tracking-tightest">
            <span className="block overflow-hidden">
              <motion.span variants={line} initial="hidden" animate="show" custom={0} className="block">
                Estrategia,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} initial="hidden" animate="show" custom={1} className="block">
                diseño <span className="text-santi">&amp;</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} initial="hidden" animate="show" custom={2} className="block">
                <span className="font-serif italic text-glow">producto</span> con IA.
              </motion.span>
            </span>
          </h1>

          {/* Regla azul que se dibuja */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="rule-draw mt-10 h-px w-full bg-gradient-to-r from-santi via-santi-soft to-transparent"
          />

          <div className="mt-9 grid gap-8 md:grid-cols-12 md:items-end">
            <motion.p {...fade(0.85)} className="max-w-xl text-balance text-lg text-muted md:col-span-7 md:text-xl">
              Especialista en marketing digital con <span className="text-fg">+6 años</span> ayudando a
              marcas a crecer. Google &amp; Meta Ads, SEO, e-commerce — y ahora{' '}
              <span className="text-santi">productos con IA</span>.
            </motion.p>

            <motion.div {...fade(1)} className="flex items-center gap-4 md:col-span-5 md:justify-end">
              <Magnetic strength={0.4}>
                <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-blue">
                  Hablemos →
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href="#trabajo" className="btn-ghost">Ver trabajo</a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* Franja de prueba dura — métricas reales animadas */}
        <motion.div
          {...fade(1.1)}
          className="grid grid-cols-3 gap-4 border-t border-line py-6"
        >
          {proof.map((p, i) => (
            <div key={i} className="flex flex-col gap-1">
              <Counter
                value={p.v}
                className="font-grotesk text-2xl font-bold leading-none tracking-tightest md:text-4xl"
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted md:text-[10px]">
                {p.k}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
