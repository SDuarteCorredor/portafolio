// ─────────────────────────────────────────────────────────────────────────────
// Prerender estático.
//
// Toma el bundle de SSR y escribe un index.html por ruta, con el contenido ya
// renderizado y el <head> propio de esa página. El crawler recibe el título, la
// descripción, el canonical, el H1 y el JSON-LD sin ejecutar una línea de JS.
//
// Genera además sitemap.xml (puntos 11 y 13), robots.txt (punto 23) y
// llms.txt (punto 2), todos derivados del mismo registro de contenido para que
// no puedan desincronizarse.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(root, 'dist')
const SSG = join(root, '.ssg')

const {
  render, buildHead, renderHeadToHtml, pages, SITE_URL, SITE_NAME, BUSINESS, absUrl, isPaginated,
} = await import(join(SSG, 'entry-server.js'))

const template = readFileSync(join(DIST, 'index.html'), 'utf8')

if (!template.includes('<!--seo-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('La plantilla dist/index.html perdió los marcadores <!--seo-head--> o <!--app-html-->')
}

// ── HTML por ruta ───────────────────────────────────────────────────────────

function writeRoute(page) {
  const appHtml = render(page.path)
  const headHtml = renderHeadToHtml(buildHead(page, pages))

  const html = template
    .replace('<!--seo-head-->', headHtml.trimStart())
    .replace('<!--app-html-->', appHtml)

  // La home vive en dist/index.html; el resto en dist/<ruta>/index.html, que es
  // lo que sirve URLs limpias con barra final sin necesitar reglas de rewrite.
  const outDir = page.path === '/' ? DIST : join(DIST, page.path)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)

  return { path: page.path, bytes: Buffer.byteLength(html) }
}

const written = []
for (const page of pages) written.push(writeRoute(page))

// La 404 se prerenderiza aparte: no está en el registro pero Vercel la sirve
// para cualquier ruta que no exista.
{
  const notFound = {
    path: '/404/',
    cluster: 'home',
    parent: '/',
    navLabel: 'Página no encontrada',
    metaTitle: 'Página no encontrada | Iván Santiago Duarte',
    metaDescription:
      'La página que buscas no existe o cambió de dirección. Desde acá puedes volver al inicio, ver el trabajo o escribirme directamente para hablar de tu proyecto.',
    h1: 'Esta página no existe',
    intent: null, tldr: [], faq: [], related: [], sections: [],
    updated: new Date().toISOString().slice(0, 10),
  }
  const head = buildHead(notFound, pages)
  head.metas = head.metas.map((m) =>
    m.name === 'robots' || m.name === 'googlebot' ? { ...m, content: 'noindex, follow' } : m,
  )
  head.jsonLd = null

  const html = template
    .replace('<!--seo-head-->', renderHeadToHtml(head).trimStart())
    .replace('<!--app-html-->', render('/ruta-que-no-existe'))
  writeFileSync(join(DIST, '404.html'), html)
}

// ── Punto 11 y 13: sitemap.xml ──────────────────────────────────────────────

function buildSitemap() {
  // Punto 25: las rutas paginadas quedan fuera del sitemap. Un sitemap solo
  // debe contener URLs indexables; incluir una noindex manda señales cruzadas.
  const indexable = pages.filter((p) => !isPaginated(p.path))

  const urls = indexable
    .map((p) => {
      const img = p.image?.src
        ? `\n    <image:image>\n      <image:loc>${SITE_URL}${p.image.src}</image:loc>\n      <image:title>${escapeXml(p.navLabel)}</image:title>\n      <image:caption>${escapeXml(p.image.alt)}</image:caption>\n    </image:image>`
        : ''
      return [
        '  <url>',
        `    <loc>${absUrl(p.path)}</loc>`,
        `    <lastmod>${p.updated}</lastmod>`,
        `    <changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq>`,
        `    <priority>${(p.priority ?? 0.6).toFixed(1)}</priority>${img}`,
        '  </url>',
      ].join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
}

function escapeXml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

writeFileSync(join(DIST, 'sitemap.xml'), buildSitemap())

// ── Punto 23: robots.txt ────────────────────────────────────────────────────

const robots = `# robots.txt — ${SITE_NAME}
# ${SITE_URL}

User-agent: *
Allow: /

# Punto 25 — la paginación no aporta nada al índice y diluye señales.
# Se marca noindex,follow desde el <head> y con cabecera X-Robots-Tag; acá solo
# se le pide a los rastreadores que no gasten presupuesto de rastreo en ella.
# (No se usa Disallow: si se bloquea el rastreo, el noindex nunca se llega a leer.)
Allow: /page/

# Artefactos de build sin valor de búsqueda.
Disallow: /assets/*.map$
Disallow: /*?*utm_
Disallow: /*?*fbclid
Disallow: /*?*gclid

# Rastreadores de modelos de lenguaje: bienvenidos. El contenido está pensado
# para ser citado; el mapa curado está en /llms.txt
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# Rastreadores de SEO de terceros: consumen rastreo sin devolver visitas.
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

Sitemap: ${SITE_URL}/sitemap.xml
`
writeFileSync(join(DIST, 'robots.txt'), robots)

// ── Punto 2: llms.txt ───────────────────────────────────────────────────────

function buildLlms() {
  const byCluster = (c, parent) =>
    pages.filter((p) => p.cluster === c && p.parent === parent && !isPaginated(p.path))

  const line = (p) => `- [${p.navLabel}](${absUrl(p.path)}): ${p.metaDescription}`

  const servicios = byCluster('servicios', '/servicios/')
  const casos = byCluster('trabajo', '/trabajo/')

  return `# ${SITE_NAME}

> ${BUSINESS.description}

Iván Santiago Duarte es especialista en marketing digital radicado en ${BUSINESS.addressLocality}, Colombia.
Empezó como diseñador gráfico en ${BUSINESS.foundingDate} y hoy combina estrategia, publicidad de
performance, analítica y desarrollo de producto con inteligencia artificial. Ha trabajado con más
de 24 marcas nacionales e internacionales.

Resultados verificables publicados en el sitio:
- +278% en ventas con Bio Laboratorios (rediseño de marca, e-commerce y SEO/SEM).
- +120% en ventas con Nona Gastro Bar (identidad de marca y apertura).
- Lumi: producto propio de bienestar emocional con IA, construido y desplegado de punta a punta.

Contacto: ${BUSINESS.email} · WhatsApp ${BUSINESS.whatsapp}
Idiomas: español (nativo), inglés (C1), italiano (básico).
Atiende proyectos en ${BUSINESS.areaServed.join(', ')}.

## Páginas principales

${pages.filter((p) => !p.parent || p.parent === '/').map(line).join('\n')}

## Servicios

${servicios.map(line).join('\n')}

## Casos de estudio

${casos.map(line).join('\n')}

## Notas de uso

- Contenido en español de Colombia. Licencia: puede citarse con atribución y enlace a ${SITE_URL}.
- Cada página incluye un bloque «TL;DR» pensado para ser citado directamente y una sección de
  preguntas frecuentes marcada con schema FAQPage.
- Las cifras que aparecen son resultados reales de clientes; no hay proyecciones ni estimados.
- Mapa completo y legible por máquina: ${SITE_URL}/sitemap.xml
- Última actualización: ${new Date().toISOString().slice(0, 10)}
`
}

writeFileSync(join(DIST, 'llms.txt'), buildLlms())

// llms-full.txt: el contenido completo en texto plano, para modelos que
// prefieren un único documento sobre rastrear 19 URLs.
function buildLlmsFull() {
  const chunks = pages.map((p) => {
    const secs = (p.sections || []).map((s) => {
      const subs = (s.subsections || [])
        .map((sub) => `### ${sub.h3}\n\n${(sub.body || []).join('\n\n')}`)
        .join('\n\n')
      const list = s.list?.items?.length ? `\n\n${s.list.items.map((i) => `- ${i}`).join('\n')}` : ''
      const table = s.table?.rows?.length
        ? `\n\n| ${s.table.head.join(' | ')} |\n| ${s.table.head.map(() => '---').join(' | ')} |\n${s.table.rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`
        : ''
      return `## ${s.h2}\n\n${(s.body || []).join('\n\n')}${list}${table}${subs ? `\n\n${subs}` : ''}`
    }).join('\n\n')

    const faq = (p.faq || []).map((f) => `**${f.q}**\n\n${f.a}`).join('\n\n')

    return [
      `# ${p.h1}`,
      `URL: ${absUrl(p.path)}`,
      p.intent ? `Intención de búsqueda (${p.intent.type}): «${p.intent.query}». ${p.intent.audience}` : '',
      p.tldr?.length ? `## En resumen\n\n${p.tldr.map((t) => `- ${t}`).join('\n')}` : '',
      p.lead,
      secs,
      faq ? `## Preguntas frecuentes\n\n${faq}` : '',
    ].filter(Boolean).join('\n\n')
  })

  return `# ${SITE_NAME} — contenido completo\n\n${chunks.join('\n\n---\n\n')}\n`
}

writeFileSync(join(DIST, 'llms-full.txt'), buildLlmsFull())

// ── Reporte ─────────────────────────────────────────────────────────────────

const kb = (b) => `${(b / 1024).toFixed(0)} kB`
console.log(`\n  Prerender: ${written.length} rutas + 404\n`)
for (const w of written) {
  console.log(`  ${w.path.padEnd(30)} ${kb(w.bytes).padStart(8)}`)
}
console.log(`\n  sitemap.xml · robots.txt · llms.txt · llms-full.txt\n`)

if (!existsSync(join(DIST, 'sitemap.xml'))) throw new Error('No se generó el sitemap')
