import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data'
import { trackWhatsapp, trackCta } from '../seo/analytics'
import { Magnetic } from './Magnetic'
import { HoverButton } from './HoverButton'
import { AuroraCanvas } from './webgl/AuroraCanvas'
import { SplitText } from './motion/SplitText'

// Badges flotantes con prueba real. `depth` controla cuánto se mueven al hacer
// scroll: los de "adelante" recorren más distancia que los del fondo, que es
// como se lee la profundidad en un paralaje.
const badges = [
  { v: '+278%',  k: 'ventas',   icon: '📈', pos: 'left-[3%] top-[26%]',      d: '0s',    depth: 1.0 },
  { v: '24+',    k: 'marcas',   icon: '✦',  pos: 'right-[5%] top-[20%]',     d: '-2.4s', depth: 0.55 },
  { v: '+6',     k: 'años',     icon: '⚡', pos: 'left-[7%] bottom-[28%]',   d: '-4s',   depth: 0.75 },
  { v: 'Bogotá', k: 'Colombia', icon: '📍', pos: 'right-[4%] bottom-[24%]',  d: '-1.2s', depth: 1.25 },
]

function Badge({ b, floating = false }) {
  return (
    <div
      className={`flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-fg/[0.06] px-4 py-2.5 backdrop-blur-md ${
        floating ? 'animate-floaty shadow-[0_8px_32px_-12px_rgba(27,60,255,0.45)]' : ''
      }`}
      style={floating ? { animationDelay: b.d } : undefined}
    >
      <span className="text-sm">{b.icon}</span>
      <span className="font-grotesk text-sm font-semibold text-fg">{b.v}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{b.k}</span>
    </div>
  )
}

/** Un badge con su propio desplazamiento por scroll. */
function FloatingBadge({ b, i, progress }) {
  // Cada badge tiene su propio useTransform, por eso vive en un componente
  // aparte: llamarlos dentro de un .map() en el padre rompería el orden de
  // hooks si algún día la lista cambia de largo.
  const y = useTransform(progress, [0, 1], [0, -160 * b.depth])
  const opacity = useTransform(progress, [0, 0.55], [1, 0])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.9 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute z-10 hidden lg:block ${b.pos}`}
    >
      <motion.div style={{ y, opacity }}>
        <Badge b={b} floating />
      </motion.div>
    </motion.div>
  )
}

export function Hero({ h1, lead, eyebrow }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // El bloque central se aleja ligeramente al bajar: refuerza que la capa
  // WebGL de atrás está a otra distancia.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  const fade = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-bg px-6 pb-32 pt-24 text-center"
    >
      {/* `isolate` en la sección no es decorativo: sin él la sección no crea
          contexto de apilamiento, y las capas con z negativo se pintan DETRÁS
          de su propio fondo opaco (`bg-bg`). Es decir, quedaban invisibles —
          por eso el fondo atmosférico no se veía ni antes de sumar WebGL. */}

      {/* Capa 1 — respaldo CSS. Es lo que se ve si no hay WebGL, si el usuario
          pidió reducir movimiento o mientras el chunk de three.js viaja. */}
      <div className="pointer-events-none absolute inset-0 -z-40 aurora-mesh" />

      {/* Capa 2 — la escena real: campo de ruido animado + nube de partículas
          con paralaje de mouse y scroll. Se carga en diferido. */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        <AuroraCanvas />
      </div>

      {/* Capa 3 — el glow que ya estaba, ahora por encima del canvas para que
          el texto conserve contraste sobre el ruido. */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-santi/12 blur-[100px]"
      />

      {badges.map((b, i) => (
        <FloatingBadge key={b.k} b={b} i={i} progress={scrollYProgress} />
      ))}

      <motion.div
        style={{ opacity, scale }}
        className="relative z-0 flex max-w-6xl flex-col items-center"
      >
        <motion.p {...fade(0.1)} className="eyebrow mb-7">
          {eyebrow || 'Marketing Digital · Diseño UI/UX'}
        </motion.p>

        {/* Punto 5: el único H1 del sitio en esta ruta. El texto viene del
            archivo de contenido para que titular y metatítulo se editen juntos.
            SplitText lo revela letra por letra y entiende la sintaxis *acento*,
            así que el contenido sigue editándose igual que antes. */}
        <SplitText
          as="h1"
          text={h1 || 'Estrategia, diseño y *producto* con IA'}
          inView={false}
          delay={0.2}
          stagger={0.022}
          className="max-w-[16ch] text-balance font-grotesk text-[clamp(1.75rem,6.5vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-fg"
        />

        <motion.p
          {...fade(0.8)}
          className="mt-8 max-w-xl text-balance text-lg text-muted md:text-xl"
        >
          {lead || (
            <>
              Especialista en marketing digital con <span className="text-fg">+6 años</span> ayudando a
              marcas a crecer. Google &amp; Meta Ads, SEO, e-commerce — y ahora{' '}
              <span className="text-santi">productos con IA</span>.
            </>
          )}
        </motion.p>

        <motion.div {...fade(0.95)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <HoverButton
            href={profile.whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWhatsapp('hero')}
          >
            Hablemos →
          </HoverButton>
          <Magnetic strength={0.3}>
            <Link to="/trabajo/" className="btn-ghost" onClick={() => trackCta('Ver trabajo', 'hero')}>
              Ver trabajo
            </Link>
          </Magnetic>
        </motion.div>

        {/* Badges en móvil/tablet — fila bajo los CTAs (en desktop flotan arriba) */}
        <motion.div
          {...fade(1.1)}
          className="mt-9 flex flex-wrap items-center justify-center gap-2.5 lg:hidden"
        >
          {badges.map((b) => (
            <Badge key={b.k} b={b} />
          ))}
        </motion.div>
      </motion.div>

      {/* Señal de scroll: la línea se recarga en bucle hacia abajo. Le dice al
          visitante que la página sigue — en un hero a pantalla completa no es
          obvio. */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:[@media(min-height:760px)]:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-santi" />
        </span>
      </motion.div>
    </section>
  )
}
