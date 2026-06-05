import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data'
import { Magnetic } from './Magnetic'

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const yGhost = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  // Glow azul interactivo que sigue el cursor dentro del hero.
  const mx = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 })
  const my = useSpring(useMotionValue(40), { stiffness: 80, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(560px circle at ${mx}% ${my}%, rgba(27,60,255,0.20), transparent 65%)`

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  const line = {
    hidden: { y: '115%', opacity: 0 },
    show: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 1, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24"
    >
      {/* Capa 1 — malla de aurora azul */}
      <div className="pointer-events-none absolute inset-0 -z-30 aurora-mesh" />

      {/* Capa 2 — glow que sigue el cursor */}
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 -z-20" />

      {/* Capa 3 — blobs azul firma */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -right-32 top-10 -z-20 h-[60vh] w-[60vh] rounded-full bg-santi/40 blur-[120px] animate-blob"
      />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-20 h-[40vh] w-[40vh] rounded-full bg-santi-deep/40 blur-[120px] animate-blob" style={{ animationDelay: '-6s' }} />

      {/* Capa 4 — grid de fondo */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 40%, #000 30%, transparent 80%)',
        }}
      />

      {/* Capa 5 — palabra fantasma gigante con parallax */}
      <motion.span
        style={{ y: yGhost }}
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-6 -z-10 select-none font-grotesk text-[28vw] font-bold leading-none tracking-tightest text-outline opacity-[0.06] md:text-[20vw]"
      >
        2016→IA
      </motion.span>

      {/* Rieles verticales editoriales */}
      <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="vertical-rl font-mono text-[10px] uppercase tracking-[0.4em] text-mist">
          Bogotá — Colombia · 4°N 74°W
        </span>
      </div>
      <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="vertical-rl font-mono text-[10px] uppercase tracking-[0.4em] text-mist">
          Portafolio · Edición 2026
        </span>
      </div>

      <motion.div style={{ opacity }} className="container-x">
        {/* Pill de disponibilidad */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-santi/30 bg-santi/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-santi opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-santi" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80">
            Disponible para proyectos · {profile.location}
          </span>
        </motion.div>

        {/* Titular editorial mixto */}
        <h1 className="group font-grotesk text-mega font-bold leading-[0.84] tracking-tightest">
          <span className="block overflow-hidden">
            <motion.span variants={line} initial="hidden" animate="show" custom={0} className="block">
              Estrategia,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={line} initial="hidden" animate="show" custom={1} className="block">
              <span className="text-outline-fill">diseño</span> <span className="text-santi">&amp;</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={line} initial="hidden" animate="show" custom={2} className="block">
              <span className="font-serif italic text-glow">producto</span> con IA.
            </motion.span>
          </span>
        </h1>

        {/* Línea azul que se dibuja bajo el titular */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="rule-draw mt-8 h-px w-full max-w-2xl bg-gradient-to-r from-santi via-santi-soft to-transparent"
        />

        <div className="mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="max-w-xl text-balance text-lg text-mist md:text-xl"
          >
            Especialista en marketing digital con <span className="text-paper">+6 años</span> ayudando a marcas a crecer.
            Google &amp; Meta Ads, SEO, e-commerce y ahora <span className="text-santi-soft">productos con IA</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex shrink-0 items-center gap-4"
          >
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
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="container-x absolute bottom-8 left-0 right-0 flex items-center justify-between"
      >
        <span className="eyebrow flex items-center gap-2">
          <span className="inline-block h-8 w-px animate-pulse bg-gradient-to-b from-santi to-transparent" />
          scroll
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-mist md:inline">
          (01) — Intro
        </span>
      </motion.div>
    </section>
  )
}
