import { useId, useState } from 'react'

// Portada visual de cada caso.
//
// El problema que resuelve: las tarjetas de trabajo eran 100% texto, y ocho
// bloques de texto seguidos se leen como un documento, no como un portafolio.
//
// Tres niveles, en orden de preferencia:
//   1. `cover`  → imagen real (la que generes en AI Studio, un mockup, etc.)
//   2. `poster` + `video` → video en bucle (Veo), con imagen de respaldo
//   3. escena generativa → SVG determinista derivado del slug
//
// El tercer nivel existe para que la tarjeta nunca quede vacía mientras no haya
// arte final, y para que las que no tengan foto no desentonen con las que sí.

/** Hash estable (FNV-1a). El mismo slug da siempre la misma escena. */
function hashSlug(slug) {
  let h = 0x811c9dc5
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

// Generador congruencial simple sembrado con el hash: reproducible entre el
// render de servidor y el del cliente (con Math.random habría desajuste de
// hidratación).
function seeded(seed) {
  let s = seed || 1
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

/**
 * Escena generativa: manchas de gradiente + órbitas + rejilla, en el tono del
 * proyecto. Todo SVG, sin canvas ni JS en el bucle de render.
 */
function GenerativeScene({ slug, accent, label, initials }) {
  const uid = useId().replace(/:/g, '')
  const rnd = seeded(hashSlug(slug || 'caso'))

  // Cada caso trae su color en data.js. Es lo que separa una tarjeta de la de al
  // lado; sin esto la grilla entera se lee como un solo bloque azul.
  const hue = accent || '#1B3CFF'
  const hue2 = accent || '#6B82FF'

  const blobs = Array.from({ length: 3 }, () => ({
    cx: 20 + rnd() * 60,
    cy: 20 + rnd() * 60,
    r: 26 + rnd() * 26,
    o: 0.20 + rnd() * 0.26,
    dur: 14 + rnd() * 12,
  }))

  const rings = Array.from({ length: 2 }, (_, i) => ({
    r: 26 + i * 15 + rnd() * 8,
    dur: 26 + rnd() * 20,
    dash: 2 + Math.round(rnd() * 5),
  }))

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`Portada decorativa del caso ${label}`}
    >
      <defs>
        {blobs.map((b, i) => (
          <radialGradient key={i} id={`${uid}-g${i}`}>
            <stop offset="0%" stopColor={i === 1 ? hue2 : hue} stopOpacity={b.o} />
            <stop offset="100%" stopColor={i === 1 ? hue2 : hue} stopOpacity="0" />
          </radialGradient>
        ))}

        <pattern id={`${uid}-grid`} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M8 0H0V8" fill="none" stroke={hue} strokeOpacity="0.13" strokeWidth="0.3" />
        </pattern>

        {/* Grano: rompe el banding de los degradados en pantallas de 8 bits. */}
        <filter id={`${uid}-noise`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="100" height="100" fill={`url(#${uid}-grid)`} />

      {blobs.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={`url(#${uid}-g${i})`}>
          {/* SMIL en vez de CSS: la animación acompaña al SVG aunque se reutilice
              el componente en otro contexto, y no depende de keyframes globales. */}
          <animate
            attributeName="cx"
            values={`${b.cx};${b.cx + 12};${b.cx - 8};${b.cx}`}
            dur={`${b.dur}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values={`${b.cy};${b.cy - 10};${b.cy + 9};${b.cy}`}
            dur={`${b.dur * 1.3}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {rings.map((r, i) => (
        <circle
          key={i}
          cx="50"
          cy="50"
          r={r.r}
          fill="none"
          stroke={hue}
          strokeOpacity="0.28"
          strokeWidth="0.35"
          strokeDasharray={`${r.dash} ${r.dash * 1.6}`}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 50 50`}
            to={`${i % 2 === 0 ? 360 : -360} 50 50`}
            dur={`${r.dur}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Iniciales en contorno, dentro del propio SVG: así el tamaño va en
          unidades del viewBox y escala con la tarjeta en cualquier ancho. */}
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="34"
        fontWeight="800"
        letterSpacing="-2"
        fill="none"
        stroke={hue}
        strokeOpacity="0.5"
        strokeWidth="0.6"
        className="font-grotesk uppercase"
      >
        {initials}
      </text>

      <rect width="100" height="100" filter={`url(#${uid}-noise)`} opacity="0.05" />
    </svg>
  )
}

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
    return (
      <div className={base}>
        <img
          src={w.cover}
          alt={w.coverAlt || `${w.title} — ${w.kind}`}
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${fit} transition-transform duration-700 group-hover:scale-[1.03]`}
          onError={() => setFailed(true)}
        />
        {scrim}
      </div>
    )
  }

  return (
    <div className={base}>
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]">
        <GenerativeScene
          slug={w.slug || w.title}
          accent={w.accent}
          label={w.title}
          initials={String(w.title).slice(0, 2)}
        />
      </div>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-transparent" />
    </div>
  )
}
