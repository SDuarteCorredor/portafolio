// ─────────────────────────────────────────────────────────────────────────────
// RECURSOS — el hub /recursos/ y una página por repositorio público.
//
// Nada de lo que hay acá se edita para sumar un recurso. La lista sale de
// repos.json, que la GitHub Action `sync-repos` refresca desde GitHub; cada repo
// público nuevo aparece en /recursos/, en la home y en /perfil/ con su propia
// página en /recursos/<slug>/, sin tocar código.
//
// La página de cada repo se arma en dos capas:
//   1. automática — descripción, temas, licencia, fechas y README del repo.
//      Cumple sola el contrato de SCHEMA.md (TL;DR, FAQ, tabla, intención),
//      así que un repo recién publicado no puede romper la auditoría SEO.
//   2. curada — lo que esté en recursos-curado.js pisa a lo automático campo por
//      campo. Sirve para escribir el texto en español, poner portada o gancho.
//
// Lo que depende de datos que cambian (licencia, fecha, estrellas) siempre sale
// de la capa automática, para que un texto escrito a mano no quede desfasado.
// ─────────────────────────────────────────────────────────────────────────────

import catalog from './repos.json'
import { curated, hidden } from './recursos-curado.js'

const HUB = '/recursos/'

// Mismos conectores que rechaza scripts/audit-seo.mjs (punto 24).
const CONNECTORS = new Set([
  'de', 'del', 'y', 'e', 'o', 'u', 'con', 'sin', 'para', 'por', 'en',
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'al', 'a',
])

/**
 * Nombre de repo → segmento de URL válido para la auditoría: minúsculas, sin
 * tildes, sin dígitos y sin conectores. "mi-kit-de-video-2" → "mi-kit-video".
 */
export function slugify(name = '') {
  const words = String(name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((w) => !/\d/.test(w) && !CONNECTORS.has(w))
  return words.join('-') || 'recurso'
}

/** "vertical-video-kit" → "Vertical video kit". */
function prettify(name) {
  const text = String(name).replace(/[-_.]+/g, ' ').trim()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** Fecha ISO → "23 de septiembre de 2026". */
export function fecha(iso) {
  if (!iso) return null
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
}

/** Corta en el último espacio antes de `max` y cierra con puntos suspensivos. */
function clipWords(text, max) {
  const t = String(text).trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s—–-]+$/, '')}…`
}

const endWithPeriod = (s) => (/[.!?…]$/.test(s) ? s : `${s}.`)

/** Metadescripción de 120–158 caracteres a partir de la descripción del repo. */
function fitDescription(desc, title) {
  const tail = ' Gratis y de código abierto en GitHub.'
  const base = endWithPeriod(desc || `${title}, recurso publicado por Iván Santiago Duarte`)
  let out = `${base}${tail}`
  if (out.length > 158) out = `${clipWords(base.replace(/\.$/, ''), 158 - tail.length)}${tail}`
  if (out.length < 120) out = `${out} Con guía para instalarlo y empezar a usarlo.`
  return out.length > 158 ? clipWords(out, 158) : out
}

const LICENSE_NOTE = {
  MIT: 'puedes usarlo, modificarlo y usarlo en proyectos comerciales, siempre que conserves el aviso de autoría',
  'Apache-2.0': 'puedes usarlo, modificarlo y usarlo en proyectos comerciales, conservando los avisos de autoría y de cambios',
  'GPL-3.0': 'puedes usarlo y modificarlo, pero lo que distribuyas a partir de él tiene que publicarse con la misma licencia',
  'CC-BY-4.0': 'puedes usarlo y adaptarlo, también con fines comerciales, citando la autoría',
}

function licenseText(license) {
  if (!license) {
    return 'El código es público en GitHub, pero todavía no declara una licencia de uso. Puedes leerlo y probarlo; si lo quieres reutilizar en un proyecto propio, escríbeme primero.'
  }
  const note = LICENSE_NOTE[license]
  return note
    ? `Sí. Está publicado con licencia ${license}: ${note}.`
    : `Está publicado con licencia ${license}. Las condiciones exactas están en el archivo de licencia del repositorio.`
}

// ── Normalización ───────────────────────────────────────────────────────────

const hiddenSet = new Set(hidden.map((h) => h.toLowerCase()))

function normalize(repo) {
  const cur = curated[repo.name] || {}
  const title = cur.title || prettify(repo.name)
  const description =
    cur.description || repo.description || repo.readme?.summary ||
    `${title}, recurso de código abierto publicado en GitHub.`
  const tags = cur.tags || [...(repo.language ? [repo.language] : []), ...repo.topics].slice(0, 5)

  return {
    ...repo,
    cur,
    slug: cur.slug || slugify(repo.name),
    title,
    kind: cur.kind || (repo.language ? `Código abierto · ${repo.language}` : 'Código abierto'),
    hook: cur.hook || clipWords(description, 120),
    description,
    tags,
    accent: cur.accent || '#1B3CFF',
    cover: cur.cover || null,
    coverAlt: cur.coverAlt || null,
    // Imagen del README como portada de respaldo: un repo nuevo con capturas en
    // su README trae portada sin tocar nada.
    remoteCover: cur.cover ? null : repo.readme?.image || null,
    featured: Boolean(cur.featured),
    clone: `git clone ${repo.url}.git`,
  }
}

/**
 * Recursos visibles, en el orden en que se muestran: los destacados primero y
 * después del más nuevo al más viejo, para que lo último publicado quede arriba.
 */
export const resources = (() => {
  const list = (catalog.repos || [])
    .filter((r) => !hiddenSet.has(r.name.toLowerCase()))
    .map(normalize)
    .sort((a, b) =>
      Number(b.featured) - Number(a.featured) ||
      String(b.createdAt).localeCompare(String(a.createdAt)) ||
      a.name.localeCompare(b.name),
    )

  // Dos nombres pueden dar el mismo slug ("kit-2024" y "kit-2025" → "kit").
  const seen = new Set()
  for (const r of list) {
    let slug = r.slug
    for (const extra of ['bis', 'otro', 'nuevo']) {
      if (!seen.has(slug)) break
      slug = `${r.slug}-${extra}`
    }
    seen.add(slug)
    r.slug = slug
    r.path = `${HUB}${slug}/`
  }
  return list
})()

export const resourcesByPath = new Map(resources.map((r) => [r.path, r]))

// ── Página de cada repo ─────────────────────────────────────────────────────

function techTable(r) {
  const rows = [
    ['Repositorio', `${catalog.owner}/${r.name}`],
    ['Lenguaje', r.language || 'Sin lenguaje principal'],
    ['Licencia', r.license || 'Sin licencia declarada'],
    r.topics.length ? ['Temas', r.topics.join(' · ')] : null,
    ['Publicado', fecha(r.createdAt)],
    ['Última actualización', fecha(r.updatedAt)],
    ['Estrellas en GitHub', String(r.stars)],
  ].filter(Boolean)

  return {
    h2: 'Ficha técnica',
    body: [
      'Estos datos se leen de GitHub en cada sincronización, así que están tan al día como el propio repositorio.',
    ],
    table: {
      caption: `Datos del repositorio ${r.name} en GitHub`,
      head: ['Campo', 'Detalle'],
      rows,
    },
  }
}

function autoSections(r) {
  const intro = {
    h2: 'Qué es y para qué sirve',
    body: [endWithPeriod(r.readme?.summary || r.description)],
  }
  if (r.readme?.headings?.length >= 2) {
    intro.list = {
      variant: 'ul',
      title: 'Lo que cubre la documentación',
      items: r.readme.headings,
    }
  }

  const start = {
    h2: 'Cómo empezar a usarlo',
    list: {
      variant: 'ol',
      items: [
        `Clona el repositorio: ${r.clone}`,
        'Abre el README: ahí están los requisitos y los pasos de instalación.',
        'Si algo no funciona o quieres proponer una mejora, abre un issue en GitHub o escríbeme.',
      ],
    },
  }

  return [intro, start]
}

function autoFaq(r) {
  return [
    { q: `¿${r.title} es gratis? ¿Lo puedo usar en mis proyectos?`, a: licenseText(r.license) },
    {
      q: `¿Cómo instalo ${r.title}?`,
      a: `Clónalo desde GitHub con ${r.clone} y sigue el README, que tiene los requisitos y los comandos de instalación. Si prefieres no usar la terminal, en la página del repositorio el botón Code → Download ZIP descarga lo mismo.`,
    },
    {
      q: '¿Puedes adaptarlo a mi marca o a mi equipo?',
      a: 'Sí. Lo que publico como código abierto sale de trabajo real, y adaptarlo a una marca, a un equipo o a un flujo concreto es parte de lo que hago en producto con IA. Cuéntame qué necesitas desde /contacto/ y te digo si tiene sentido y cuánto tomaría.',
    },
  ]
}

function pageFor(r, others) {
  const c = r.cur
  const auto = {
    metaTitle: `${r.title}: recurso gratis de código abierto`.length <= 60
      ? `${r.title}: recurso gratis de código abierto`
      : `${clipWords(r.title, 44)} · código abierto`,
    metaDescription: fitDescription(r.description, r.title),
    h1: `${r.title}, explicado: qué hace y cómo empezar a usarlo`,
    lead: `${endWithPeriod(r.description)} Lo publiqué como código abierto en GitHub${
      r.license ? ` con licencia ${r.license}` : ''
    }: acá está qué hace, con qué está hecho y cómo ponerlo a andar.`,
    intent: {
      type: 'informacional',
      query: `${r.name.replace(/[-_]+/g, ' ')} github`,
      audience: 'Quien busca una herramienta abierta para resolver este problema sin empezar desde cero.',
      problem: 'Las herramientas de IA para contenido suelen ser cerradas, de pago o demos que no llegan a producción.',
      outcome: 'Saber qué hace el recurso, qué necesita y cómo clonarlo y ponerlo a funcionar.',
    },
    keywords: [r.name, `${r.name} github`, ...r.topics].slice(0, 5),
  }

  const tldrAuto = [
    endWithPeriod(r.description),
    r.language
      ? `Hecho en ${r.language}${r.topics.length ? `, con foco en ${r.topics.slice(0, 3).join(', ')}` : ''}.`
      : null,
    r.license ? `Licencia ${r.license}: ${LICENSE_NOTE[r.license] || 'condiciones en el repositorio'}.` : 'Código público en GitHub, todavía sin licencia de uso declarada.',
    `Última actualización: ${fecha(r.updatedAt)}.`,
  ].filter(Boolean)

  const related = [
    { path: HUB, label: 'Todos los recursos', note: 'El catálogo completo de lo que publico en abierto, con qué hace cada herramienta.' },
    ...others.slice(0, 1).map((o) => ({ path: o.path, label: o.title, note: o.hook })),
    { path: '/servicios/producto-ia/', label: 'Producto con IA', note: 'Cuando la herramienta abierta no alcanza y hace falta algo construido a la medida.' },
    { path: '/contacto/', label: 'Contacto', note: 'Si quieres adaptarlo a tu marca o a tu equipo, el camino corto está acá.' },
  ]

  return {
    path: r.path,
    cluster: 'recursos',
    parent: HUB,
    navLabel: r.title,

    metaTitle: c.metaTitle || auto.metaTitle,
    metaDescription: c.metaDescription || auto.metaDescription,
    h1: c.h1 || auto.h1,
    keywords: c.keywords || auto.keywords,
    intent: c.intent || auto.intent,
    tldr: c.tldr || tldrAuto,
    lead: c.lead || auto.lead,
    ctaInline: { label: 'Cuéntame cómo lo usarías', href: 'whatsapp' },

    sections: [...(c.sections || autoSections(r)), techTable(r)],
    faq: [...(c.faq || []), ...autoFaq(r)],
    related,

    // Lo consume ContentPage: la ficha con el comando de clonado y el botón a
    // GitHub, igual que los casos de estudio llevan su enlace al proyecto.
    repoMeta: {
      name: r.name,
      title: r.title,
      kind: r.kind,
      url: r.url,
      homepage: r.homepage,
      language: r.language,
      license: r.license,
      stars: r.stars,
      updatedAt: r.updatedAt,
      tags: r.tags,
      clone: r.clone,
      accent: r.accent,
      cover: r.cover,
      coverAlt: r.coverAlt,
      remoteCover: r.remoteCover,
      externalUrl: r.url,
      externalLabel: 'Ver el código en GitHub',
      outroTitle: 'El código completo, el README y las actualizaciones viven en GitHub.',
    },

    image: {
      src: `/og/${r.slug}-codigo-abierto-ivan-santiago-duarte.png`,
      alt: `Tarjeta de ${r.title}, recurso de código abierto publicado por Iván Santiago Duarte en GitHub`,
      width: 1200,
      height: 630,
    },

    schemaType: 'SoftwareSourceCode',
    updated: r.updatedAt || r.createdAt,
    priority: r.featured ? 0.7 : 0.6,
  }
}

// ── Hub ─────────────────────────────────────────────────────────────────────

function hubPage() {
  const n = resources.length
  const newest = [...resources].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))[0]
  const lastUpdate = resources.map((r) => r.updatedAt).filter(Boolean).sort().pop() || '2026-09-23'
  const plural = n === 1 ? 'recurso publicado' : 'recursos publicados'

  return {
    path: HUB,
    cluster: 'recursos',
    parent: '/',
    navLabel: 'Recursos',

    metaTitle: 'Recursos gratis de marketing con IA y código abierto',
    metaDescription:
      'Herramientas gratis y de código abierto para hacer contenido y marketing con IA: carruseles, video vertical y más. Se actualiza con cada repositorio nuevo.',
    h1: 'Herramientas abiertas para hacer marketing con código e IA',
    keywords: [
      'recursos gratis marketing digital',
      'herramientas ia para contenido gratis',
      'código abierto marketing',
      'plantillas claude code marketing',
    ],

    intent: {
      type: 'informacional',
      query: 'herramientas gratis de ia para marketing y contenido',
      audience:
        'Creadores, equipos de marketing y marcas pequeñas que prefieren una herramienta lista antes que empezar de cero.',
      problem:
        'Las herramientas de IA para contenido suelen ser de pago, cerradas o demos que nunca llegan a producción.',
      outcome:
        'Un catálogo de recursos abiertos, con qué resuelve cada uno, qué necesita y cómo empezar a usarlo.',
    },

    tldr: [
      `${n} ${plural} hasta hoy, todos con el código abierto en GitHub.`,
      newest ? `El más reciente es ${newest.title}: ${newest.hook.charAt(0).toLowerCase()}${newest.hook.slice(1)}` : null,
      'La página se actualiza sola: cuando publico un repositorio nuevo en GitHub, aparece acá con su propia ficha.',
      'Salen de mi propio trabajo con marcas: primero los uso en producción, después los publico.',
    ].filter(Boolean).map(endWithPeriod),

    lead:
      'Acá publico lo que construyo para mi propio trabajo y le puede servir al de otros: herramientas de código abierto para producir contenido y hacer marketing con inteligencia artificial. Todo está en GitHub, se puede clonar y adaptar, y esta página se actualiza sola cada vez que publico un repositorio nuevo.',
    ctaInline: { label: 'Ver todo en GitHub', href: 'github' },

    sections: [
      {
        h2: 'El catálogo completo',
        body: [
          'Cada recurso tiene su ficha con qué hace, qué necesita, la licencia y cómo empezar. La tabla es el índice: la última columna lleva a la ficha.',
        ],
        table: {
          caption: 'Recursos publicados, qué resuelve cada uno, su licencia y su ficha',
          head: ['Recurso', 'Qué resuelve', 'Licencia', 'Ficha'],
          rows: resources.map((r) => [r.title, r.hook, r.license || 'Sin declarar', r.path]),
        },
      },
      {
        h2: 'Por qué publico esto en abierto',
        body: [
          'Porque es la forma más honesta de mostrar cómo trabajo. Un caso de estudio cuenta lo que hice; un repositorio deja ver cómo lo hice, y cualquiera puede comprobarlo, usarlo o mejorarlo.',
          'Casi todo nace igual: una tarea que repito con varias marcas, como armar carruseles o producir video corto, y que termino convirtiendo en un flujo que se puede correr una y otra vez. Cuando ese flujo ya aguantó trabajo real, lo limpio, lo documento y lo publico.',
        ],
      },
      {
        h2: 'Cómo se mantiene al día esta página',
        body: [
          'No la actualizo a mano. Un proceso automático revisa mi cuenta de GitHub varias veces al día y, si aparece un repositorio público nuevo o cambia uno existente, reconstruye el sitio con los datos frescos.',
        ],
        list: {
          variant: 'ul',
          title: 'De dónde sale cada dato',
          items: [
            'La descripción y los temas, del propio repositorio en GitHub.',
            'El resumen y el índice de cada ficha, del README.',
            'La licencia, las estrellas y la fecha de actualización, de cada sincronización.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Los recursos son gratis?',
        a: 'Sí, todos se pueden descargar y probar sin pagar. Lo que cambia entre uno y otro es la licencia: la ficha de cada recurso dice si puedes usarlo en proyectos comerciales y con qué condiciones.',
      },
      {
        q: '¿Necesito saber programar para usarlos?',
        a: 'Ayuda, pero no siempre es necesario. Varios están pensados para correr con un agente de IA como Claude Code, que se encarga de la terminal, y algunos traen un asistente que hace unas pocas preguntas y entrega el resultado. Cada ficha dice qué requisitos tiene.',
      },
      {
        q: '¿Cada cuánto se suman recursos nuevos?',
        a: 'Cuando un flujo de trabajo ya aguantó uso real con marcas. No hay un calendario fijo; lo que sí es fijo es que apenas lo publico en GitHub aparece en esta página, sin esperar a que yo la edite.',
      },
      {
        q: '¿Puedes construir una herramienta así para mi equipo?',
        a: 'Sí, es parte del servicio de producto con IA: /servicios/producto-ia/. Si lo que necesitas se parece a alguno de estos recursos, suele ser más rápido partir de él y adaptarlo que empezar de cero.',
      },
    ],

    related: [
      { path: '/servicios/producto-ia/', label: 'Producto con IA', note: 'Cuando hace falta una herramienta construida a la medida del equipo, no una genérica.' },
      { path: '/trabajo/lumi/', label: 'Lumi', note: 'El producto propio con IA que está en producción, de la idea al deploy.' },
      { path: '/perfil/', label: 'Sobre mí', note: 'De diseñador gráfico a producto con IA: de dónde salen estas herramientas.' },
      { path: '/contacto/', label: 'Contacto', note: 'Si quieres adaptar alguno de estos recursos a tu marca, empecemos por acá.' },
    ],

    image: {
      src: '/og/recursos-codigo-abierto-ivan-santiago-duarte.png',
      alt: 'Tarjeta de los recursos de código abierto de Iván Santiago Duarte: herramientas gratis para contenido y marketing con IA',
      width: 1200,
      height: 630,
    },

    schemaType: 'CollectionPage',
    updated: lastUpdate,
    priority: 0.8,
  }
}

export const recursos = [
  hubPage(),
  ...resources.map((r) => pageFor(r, resources.filter((o) => o !== r))),
]
