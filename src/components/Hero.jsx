import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data'
import { Magnetic } from './Magnetic'

// Badges flotantes con prueba real (idea estilo SLOT).
const badges = [
  { v: '+278%', k: 'ventas', icon: '📈', pos: 'left-[3%] top-[26%]',    d: '0s' },
  { v: '24+',   k: 'marcas', icon: '✦',  pos: 'right-[5%] top-[20%]',   d: '-2.4s' },
  { v: '+6',    k: 'años',   icon: '⚡', pos: 'left-[7%] bottom-[28%]', d: '-4s' },
  { v: 'Bogotá', k: 'Colombia', icon: '📍', pos: 'right-[4%] bottom-[24%]', d: '-1.2s' },
]

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const line = {
    hidden: { y: '120%' },
    show: (i) => ({
      y: 0,
      transition: { duration: 1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  }
  const fade = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    // `dark` fuerza tokens oscuros dentro del hero sin importar el tema de la página.
    <section
      id="top"
      ref={ref}
      className="dark relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-bg px-6 pt-24 text-center"
    >
      {/* Atmósfera: glow azul suave, sin grilla */}
      <div className="pointer-events-none absolute inset-0 -z-30 aurora-mesh" />
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-santi/18 blur-[100px]"
      />

      {/* Badges flotantes (solo desktop, para no recargar el móvil) */}
      {badges.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-none absolute z-10 hidden lg:block ${b.pos}`}
        >
          <div
            className="flex items-center gap-2.5 rounded-full border border-line bg-fg/[0.06] px-4 py-2.5 backdrop-blur-md animate-floaty"
            style={{ animationDelay: b.d }}
          >
            <span className="text-sm">{b.icon}</span>
            <span className="font-grotesk text-sm font-semibold text-fg">{b.v}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{b.k}</span>
          </div>
        </motion.div>
      ))}

      <motion.div style={{ opacity }} className="relative z-0 flex max-w-6xl flex-col items-center">
        <motion.p {...fade(0.1)} className="eyebrow mb-7">
          Marketing Digital · Diseño UI/UX
        </motion.p>

        <h1 className="text-balance font-grotesk text-[clamp(1.75rem,6.5vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-fg">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={line} initial="hidden" animate="show" custom={0} className="block">
              Estrategia, diseño
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={line} initial="hidden" animate="show" custom={1} className="block">
              y <span className="font-serif font-normal italic text-santi">producto</span> con&nbsp;IA
            </motion.span>
          </span>
        </h1>

        <motion.p
          {...fade(0.8)}
          className="mt-8 max-w-xl text-balance text-lg text-muted md:text-xl"
        >
          Especialista en marketing digital con <span className="text-fg">+6 años</span> ayudando a
          marcas a crecer. Google &amp; Meta Ads, SEO, e-commerce — y ahora{' '}
          <span className="text-santi-soft">productos con IA</span>.
        </motion.p>

        <motion.div {...fade(0.95)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={0.4}>
            <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-blue">
              Hablemos →
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href="#trabajo" className="btn-ghost">Ver trabajo</a>
          </Magnetic>
        </motion.div>

        {/* Badges en móvil/tablet — fila bajo los CTAs (en desktop flotan arriba) */}
        <motion.div
          {...fade(1.1)}
          className="mt-9 flex flex-wrap items-center justify-center gap-2.5 lg:hidden"
        >
          {badges.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full border border-line bg-fg/[0.06] px-3.5 py-2 backdrop-blur-md animate-floaty"
              style={{ animationDelay: b.d }}
            >
              <span className="text-sm">{b.icon}</span>
              <span className="font-grotesk text-sm font-semibold text-fg">{b.v}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{b.k}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
