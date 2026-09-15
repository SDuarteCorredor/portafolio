// Marcas de los servicios.
//
// La lista de servicios eran seis filas de texto separadas por una línea: el
// número, el título, el párrafo y las etiquetas. Se lee como un índice, y en
// una lista así el ojo no tiene dónde apoyarse — hay que leer las seis para
// saber cuál interesa.
//
// Cada servicio tiene ahora una marca que dice de qué se trata antes del
// título: una ruta con nodos para estrategia, una diana para pauta, una lupa
// sobre resultados para SEO. Son de trazo, en el color del tema, y escalan
// sin perder nitidez.
//
// Se dibujan con `currentColor`, así que heredan el color del contenedor: gris
// en reposo, azul firma en hover, sin duplicar una versión por estado.

const V = 48

/** Estrategia — el camino completo, con sus etapas. */
function Estrategia() {
  return (
    <>
      <path
        d="M8 36c6 0 6-10 12-10s6-14 12-14 8 6 8 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[
        [8, 36],
        [20, 26],
        [32, 12],
      ].map(([cx, cy]) => (
        <circle key={`${cx}`} cx={cx} cy={cy} r="3" fill="none" stroke="currentColor" strokeWidth="2" />
      ))}
      <circle cx="40" cy="18" r="3.5" fill="currentColor" />
    </>
  )
}

/** Pauta — la diana y el impacto. */
function Pauta() {
  return (
    <>
      <circle cx="22" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="22" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.75" />
      <circle cx="22" cy="24" r="2.5" fill="currentColor" />
      <path
        d="M34 12 L24.5 21.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M40 8l-2.5 7.5L30 18l7.5 2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </>
  )
}

/** SEO / SEM — la lupa sobre las posiciones. */
function Seo() {
  return (
    <>
      {[
        [10, 34, 8],
        [17, 30, 12],
        [24, 26, 16],
      ].map(([x, y, h]) => (
        <rect key={x} x={x} y={40 - h} width="5" height={h} rx="1.5" fill="currentColor" opacity="0.4" />
      ))}
      <circle cx="30" cy="18" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M37.5 25.5L43 31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </>
  )
}

/** E-commerce — la bolsa, y dentro la compra confirmada. */
function Ecommerce() {
  return (
    <>
      <path
        d="M11 16h26l-2.5 24a3 3 0 0 1-3 2.7H16.5a3 3 0 0 1-3-2.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M18 18v-4a6 6 0 0 1 12 0v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18.5 29.5l4 4 7.5-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}

/** Branding — dos formas que solo funcionan juntas. */
function Branding() {
  return (
    <>
      <rect x="8" y="12" width="21" height="21" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="30" cy="30" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M29 21.5a11 11 0 0 0-8 8.5h8Z"
        fill="currentColor"
        opacity="0.55"
      />
    </>
  )
}

/** Producto con IA — el grafo y la chispa. */
function ProductoIa() {
  return (
    <>
      <path
        d="M14 18l10-6 10 6M14 18v12l10 6 10-6V18M14 18l10 6 10-6M24 24v12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <path d="M38 6l1.6 4.4L44 12l-4.4 1.6L38 18l-1.6-4.4L32 12l4.4-1.6Z" fill="currentColor" />
    </>
  )
}

// La clave es el `slug` del servicio en data.js; la estrategia general no tiene
// página propia, así que va por su número.
const GLYPHS = {
  '01': Estrategia,
  'google-ads': Pauta,
  'seo-sem': Seo,
  ecommerce: Ecommerce,
  branding: Branding,
  'producto-ia': ProductoIa,
}

/**
 * @param {{ service: object, className?: string }} props
 *
 * Decorativa: el servicio ya se nombra en el `h3` de al lado, así que repetirlo
 * para un lector de pantalla sería ruido.
 */
export function ServiceGlyph({ service, className = '' }) {
  const Glyph = GLYPHS[service.slug] || GLYPHS[service.n] || Estrategia

  return (
    <svg
      viewBox={`0 0 ${V} ${V}`}
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <Glyph />
    </svg>
  )
}
