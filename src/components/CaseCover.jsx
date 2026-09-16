import { useState } from 'react'
import { CaseArt } from './CaseArt'

// Portada visual de cada caso.
//
// Tres niveles, en orden de preferencia:
//   1. `video` + `poster` → bucle mudo
//   2. `cover`            → imagen real (render, captura o mockup)
//   3. `CaseArt`          → escena SVG dibujada para ese caso concreto
//
// El tercer nivel no es un relleno: cada caso tiene su propia escena, que
// muestra el tipo de entregable (tienda, brand book, app, embudo). Ver
// CaseArt.jsx. Por eso una tarjeta sin foto no desentona con una que sí la
// tiene, y por eso la grilla se entiende antes de leer los títulos.

/**
 * @param {{ w: object, className?: string, ratio?: string }} props
 *   `w` es un item de `work` en src/data.js. Campos opcionales que activan los
 *   niveles altos: `cover` (ruta de imagen), `video` + `poster`.
 *
 * `coverRatio` fija la proporción del slot y `coverFit: 'contain'` evita el
 * recorte cuando el arte no coincide con ella.
 */
export function CaseCover({ w, className = '', ratio = 'aspect-[16/10]' }) {
  // El arte viene en formatos distintos (los teléfonos de Lumi son verticales,
  // el mockup de BLU es apaisado), así que el slot se adapta al arte en vez de
  // recortarlo. `contain` deja el original completo sobre el fondo oscuro de la
  // tarjeta, que es el mismo negro sobre el que se compuso la pieza.
  // Si el archivo no existe todavía o la ruta cambia, la tarjeta cae a la
  // escena generativa en lugar de mostrar el ícono de imagen rota. Permite
  // referenciar el arte en data.js antes de que los archivos estén subidos.
  const [failed, setFailed] = useState(false)

  const slot = w.coverRatio || ratio
  const fit = w.coverFit === 'contain' ? 'object-contain' : 'object-cover'

  // El arte está compuesto sobre negro. En oscuro se funde con la página; en
  // claro, en vez de disimularlo, se trata como una foto enmarcada: fondo
  // oscuro deliberado, anillo y sombra para que se lea como una pieza sobre
  // papel y no como un agujero.
  const base =
    `relative overflow-hidden rounded-xl bg-ink ${slot} ${className} ` +
    'border border-line ring-1 ring-black/10 shadow-[0_10px_30px_-12px_rgba(6,7,13,0.35)] ' +
    'dark:ring-0 dark:shadow-none'

  // El degradado inferior solo tiene sentido cuando la imagen llena el marco:
  // sobre una pieza contenida oscurecería el propio arte.
  const scrim =
    w.coverFit === 'contain'
      ? null
      : <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />

  if (w.video && !failed) {
    return (
      <div className={base}>
        <video
          className={`h-full w-full ${fit} transition-transform duration-700 group-hover:scale-[1.03]`}
          src={w.video}
          poster={w.poster || w.cover}
          autoPlay
          muted
          loop
          playsInline
          // El video es decorativo: el caso ya se describe en el texto de al lado.
          aria-hidden
          preload="none"
          onError={() => setFailed(true)}
        />
        {scrim}
      </div>
    )
  }

  if (w.cover && !failed) {
    // `npm run images` ya genera el .webp y el .avif junto al .png, pero acá
    // se servía siempre el PNG: un <img src> plano no elige formato. Para
    // Lumi eso es bajar 467 kB en vez de 43 kB. `coverBase` reconstruye el
    // nombre sin extensión para armar el trío, igual que en PageArt.jsx.
    const coverBase = w.cover.replace(/\.(png|jpe?g|webp)$/i, '')
    return (
      <div className={base}>
        <picture>
          <source srcSet={`${coverBase}.avif`} type="image/avif" />
          <source srcSet={`${coverBase}.webp`} type="image/webp" />
          <img
            src={w.cover}
            alt={w.coverAlt || `${w.title} — ${w.kind}`}
            loading="lazy"
            decoding="async"
            className={`h-full w-full ${fit} transition-transform duration-700 group-hover:scale-[1.03]`}
            onError={() => setFailed(true)}
          />
        </picture>
        {scrim}
      </div>
    )
  }

  return (
    <div className={base}>
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
        <CaseArt
          slug={w.slug || w.title}
          accent={w.accent}
          label={w.title}
          alt={w.coverAlt}
        />
      </div>
    </div>
  )
}
