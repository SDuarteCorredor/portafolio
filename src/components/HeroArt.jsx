import { motion } from 'framer-motion'

// Arte generado del hero.
//
// El hero no tiene panel: a diferencia de PageArt, que enmarca su pieza en una
// caja con borde y fondo propio, acá la imagen tiene que fundirse con la
// atmósfera que ya existe — el degradado CSS y, encima, la escena WebGL. Dos
// recursos resuelven eso sin depender de que el archivo generado traiga canal
// alfa real, que nunca es fiable (ya pasó: la primera tanda de /servicios/
// volvió con fondo sólido pese a pedir transparencia):
//
//   · `mask-image` con un degradado radial desvanece los cuatro bordes a cero
//     opacidad. El recorte lo hace CSS, no el archivo — funciona aunque el PNG
//     sea un rectángulo opaco de punta a punta.
//   · `mix-blend-mode: screen` la funde con lo que hay debajo: el negro del
//     archivo desaparece contra el fondo oscuro del hero, y el azul se suma al
//     brillo que ya pone la escena WebGL en vez de taparlo.
//
// Mientras no haya archivo, `HERO_ART` es `null` y el hero conserva el
// resplandor liso que tenía — nunca queda un hueco.
const HERO_ART = null
// Para activarla: HERO_ART = { dark: '/img/arte/hero-dark', light: '/img/arte/hero-light' }

function HeroPicture({ base, hidden = false }) {
  return (
    <picture className={hidden ? 'hidden dark:block' : 'dark:hidden'}>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={`${base}.png`}
        alt=""
        aria-hidden
        decoding="async"
        className="h-full w-full object-cover"
      />
    </picture>
  )
}

/**
 * @param {{ y: import('framer-motion').MotionValue<number> }} props
 *   `y` es el mismo valor de scroll que ya mueve el resto de la capa
 *   atmosférica del hero, para que la pieza se desplace junto con ella. Tiene
 *   que pasarse a un `motion.div` — un `div` normal no sabe leer un
 *   MotionValue en su `style`.
 */
export function HeroArt({ y }) {
  if (!HERO_ART) {
    // Respaldo: el resplandor liso que había antes de generar la pieza.
    return (
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-santi/12 blur-[100px]"
      />
    )
  }

  return (
    <motion.div
      style={{
        y,
        maskImage: 'radial-gradient(closest-side, black 58%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(closest-side, black 58%, transparent 100%)',
      }}
      className="pointer-events-none absolute left-1/2 top-1/2 -z-20 aspect-square h-[92vmin] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
    >
      <HeroPicture base={HERO_ART.light} />
      <HeroPicture base={HERO_ART.dark} hidden />
    </motion.div>
  )
}
