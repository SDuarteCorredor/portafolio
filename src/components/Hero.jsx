import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data'

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const line = {
    hidden: { y: '110%' },
    show: (i) => ({
      y: 0,
      transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24">
      {/* Blob azul firma */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -right-32 top-10 -z-10 h-[60vh] w-[60vh] rounded-full bg-santi/40 blur-[120px] animate-blob"
      />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[40vh] w-[40vh] rounded-full bg-santi-deep/40 blur-[120px] animate-blob" style={{ animationDelay: '-6s' }} />

      {/* Grid de fondo */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div style={{ opacity }} className="container-x">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="eyebrow mb-8 flex items-center gap-3"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-santi animate-pulse" />
          {profile.role} — {profile.location}
        </motion.p>

        <h1 className="font-grotesk text-mega font-bold leading-[0.86] tracking-tightest">
          {['Estrategia,', 'diseño y'].map((t, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span variants={line} initial="hidden" animate="show" custom={i} className="block">
                {t}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span variants={line} initial="hidden" animate="show" custom={2} className="block">
              <span className="font-serif italic text-glow">producto</span> con IA.
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-xl text-balance text-lg text-mist md:text-xl"
          >
            Especialista en marketing digital con <span className="text-paper">+6 años</span> ayudando a marcas a crecer.
            Google &amp; Meta Ads, SEO, e-commerce y ahora <span className="text-santi-soft">productos con IA</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex shrink-0 items-center gap-4"
          >
            <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-blue">
              Hablemos →
            </a>
            <a href="#trabajo" className="btn-ghost">Ver trabajo</a>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="container-x absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <span className="eyebrow flex items-center gap-2">
          <span className="inline-block h-8 w-px animate-pulse bg-gradient-to-b from-santi to-transparent" />
          scroll
        </span>
      </motion.div>
    </section>
  )
}
