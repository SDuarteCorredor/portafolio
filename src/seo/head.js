// ─────────────────────────────────────────────────────────────────────────────
// Fuente única del <head> de cada página.
//
// `buildHead(page)` devuelve descriptores de etiquetas. El prerender los
// serializa a HTML (para que el crawler los vea sin ejecutar JS) y el cliente
// los aplica al DOM al navegar entre rutas. Así el título y la descripción
// nunca se desincronizan entre servidor y cliente.
//
// Puntos 1 (metatítulos), 3 (metadescripciones), 9 (verificación GSC),
// 25 (noindex de /page/).
// ─────────────────────────────────────────────────────────────────────────────

import { SITE_URL, SITE_NAME, LOCALE, DEFAULT_OG, absUrl, isPaginated } from './site.js'
import { graphFor } from './schema.js'

// Vite sustituye este valor en tiempo de build, tanto en el bundle de cliente
// como en el de SSR que usa el prerender.
const GSC_TOKEN = import.meta.env?.VITE_GSC_VERIFICATION || ''

/** URL absoluta de imagen, sin el trailing slash que aplica `absUrl` a rutas. */
function imageUrl(src) {
  if (!src) return `${SITE_URL}${DEFAULT_OG}`
  if (/^https?:\/\//.test(src)) return src
  return `${SITE_URL}${src.startsWith('/') ? src : `/${src}`}`
}

/**
 * @param {object} page  Página del registro de contenido.
 * @param {object[]} allPages  Registro completo (para el @graph de JSON-LD).
 * @returns {{title:string, metas:object[], links:object[], jsonLd:object}}
 */
export function buildHead(page, allPages = []) {
  const url = absUrl(page.path)
  const img = imageUrl(page.image?.src)
  const imgAlt = page.image?.alt || page.h1

  // Punto 25: cualquier subcarpeta /page/N queda fuera del índice pero deja
  // fluir el PageRank hacia los elementos paginados.
  const paginated = isPaginated(page.path)
  const robots = paginated
    ? 'noindex, follow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'

  const metas = [
    { name: 'description', content: page.metaDescription },
    { name: 'robots', content: robots },
    { name: 'googlebot', content: robots },
    { name: 'author', content: SITE_NAME },

    // Open Graph
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: page.cluster === 'trabajo' && page.parent ? 'article' : 'website' },
    { property: 'og:locale', content: LOCALE },
    { property: 'og:url', content: url },
    { property: 'og:title', content: page.metaTitle },
    { property: 'og:description', content: page.metaDescription },
    { property: 'og:image', content: img },
    { property: 'og:image:width', content: String(page.image?.width || 1200) },
    { property: 'og:image:height', content: String(page.image?.height || 630) },
    { property: 'og:image:alt', content: imgAlt },

    // Twitter / X
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: page.metaTitle },
    { name: 'twitter:description', content: page.metaDescription },
    { name: 'twitter:image', content: img },
    { name: 'twitter:image:alt', content: imgAlt },
  ]

  // Punto 9: verificación de Google Search Console por meta tag.
  if (GSC_TOKEN) metas.push({ name: 'google-site-verification', content: GSC_TOKEN })

  const links = [
    { rel: 'canonical', href: url },
    { rel: 'alternate', hreflang: 'es', href: url },
    { rel: 'alternate', hreflang: 'x-default', href: url },
  ]

  return {
    title: page.metaTitle,
    metas,
    links,
    jsonLd: paginated ? null : graphFor(page, allPages),
  }
}

/** Escapa texto para insertarlo como valor de atributo HTML. */
export function escapeAttr(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Serializa el head a HTML — lo usa el prerender. */
export function renderHeadToHtml(head) {
  const out = [`<title>${escapeAttr(head.title)}</title>`]

  for (const m of head.metas) {
    const key = m.name ? 'name' : 'property'
    const val = m.name || m.property
    out.push(`<meta ${key}="${escapeAttr(val)}" content="${escapeAttr(m.content)}" />`)
  }
  for (const l of head.links) {
    const attrs = Object.entries(l)
      .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
      .join(' ')
    out.push(`<link ${attrs} />`)
  }
  if (head.jsonLd) {
    // `</script>` dentro del JSON rompería el bloque; se neutraliza el cierre.
    const json = JSON.stringify(head.jsonLd).replace(/</g, '\\u003c')
    out.push(`<script type="application/ld+json">${json}</script>`)
  }
  return out.map((l) => `    ${l}`).join('\n')
}
