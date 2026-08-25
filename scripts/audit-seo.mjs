// ─────────────────────────────────────────────────────────────────────────────
// Auditoría SEO sobre el HTML realmente publicado.
//
// No valida los archivos de contenido: abre cada dist/**/index.html y verifica
// lo que un rastreador va a encontrar. Corre como último paso de `npm run build`
// y devuelve código de salida 1 si algo falla, así un despliegue no puede
// romper en silencio lo que se arregló acá.
//
// Cada comprobación cita el punto de la lista que cubre.
// ─────────────────────────────────────────────────────────────────────────────

import { parse } from 'node-html-parser'
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(root, 'dist')

const errors = []
const warnings = []
const passed = []

const fail = (point, msg) => errors.push(`[${point}] ${msg}`)
const warn = (point, msg) => warnings.push(`[${point}] ${msg}`)
const ok = (point, msg) => passed.push(`[${point}] ${msg}`)

// Conectores que no deben aparecer como segmento de URL (punto 24).
const CONNECTORS = new Set([
  'de', 'del', 'y', 'e', 'o', 'u', 'con', 'sin', 'para', 'por', 'en',
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'al', 'a',
])

// ── Recolección de páginas ──────────────────────────────────────────────────

function findHtml(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) findHtml(full, acc)
    else if (entry === 'index.html') acc.push(full)
  }
  return acc
}

if (!existsSync(DIST)) {
  console.error('No existe dist/. Corré el build antes de auditar.')
  process.exit(1)
}

// findHtml solo recoge index.html; el 404 se sirve desde dist/404.html y también
// tiene que pasar las mismas comprobaciones de estructura.
const files = findHtml(DIST)
if (existsSync(join(DIST, '404.html'))) files.push(join(DIST, '404.html'))

const docs = files.map((file) => {
  const rel = relative(DIST, file).replace(/index\.html$/, '').replace(/404\.html$/, '404/')
  const url = `/${rel}`.replace(/\/+/g, '/')
  return { file, url, dom: parse(readFileSync(file, 'utf8')) }
})

console.log(`\n  Auditoría SEO — ${docs.length} páginas en dist/\n`)

// ── Puntos 1, 3, 5, 8, 16, 18, 21 · por página ──────────────────────────────

const titles = new Map()
const descriptions = new Map()
const h1s = new Map()

for (const { url, dom } of docs) {
  const title = dom.querySelector('title')?.text?.trim() || ''
  const desc = dom.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || ''
  const h1Nodes = dom.querySelectorAll('h1')
  const h1 = h1Nodes[0]?.text?.replace(/\s+/g, ' ').trim() || ''

  // Punto 1 — metatítulo presente, con longitud útil y único.
  if (!title) fail(1, `${url} no tiene <title>`)
  else {
    if (title.length < 30) warn(1, `${url} título muy corto (${title.length}): "${title}"`)
    if (title.length > 65) warn(1, `${url} título de ${title.length} caracteres, se truncará en resultados`)
    if (titles.has(title)) fail(1, `Metatítulo duplicado entre ${titles.get(title)} y ${url}: "${title}"`)
    titles.set(title, url)
  }

  // Punto 3 — metadescripción presente, con longitud útil y única.
  if (!desc) fail(3, `${url} no tiene meta description`)
  else {
    if (desc.length < 120) warn(3, `${url} descripción corta (${desc.length})`)
    if (desc.length > 165) warn(3, `${url} descripción de ${desc.length} caracteres, se truncará`)
    if (descriptions.has(desc)) fail(3, `Metadescripción duplicada entre ${descriptions.get(desc)} y ${url}`)
    descriptions.set(desc, url)
  }

  // Punto 5 — exactamente un H1.
  if (h1Nodes.length === 0) fail(5, `${url} no tiene H1`)
  else if (h1Nodes.length > 1) fail(5, `${url} tiene ${h1Nodes.length} H1 (debe haber exactamente uno)`)

  // Punto 8 — el H1 dice algo distinto del metatítulo.
  if (h1 && title) {
    const norm = (s) => s.toLowerCase().replace(/[^a-záéíóúñü0-9 ]/gi, '').replace(/\s+/g, ' ').trim()
    if (norm(h1) === norm(title)) fail(8, `${url} el H1 es idéntico al metatítulo`)
    if (h1s.has(norm(h1))) fail(8, `H1 duplicado entre ${h1s.get(norm(h1))} y ${url}`)
    h1s.set(norm(h1), url)
  }

  // Punto 16 — jerarquía de encabezados sin saltos.
  const headings = dom.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let prev = 0
  for (const h of headings) {
    const level = Number(h.rawTagName.slice(1))
    if (prev && level > prev + 1) {
      fail(16, `${url} salta de H${prev} a H${level}: "${h.text.trim().slice(0, 55)}"`)
      break
    }
    prev = level
  }
  if (headings.length && Number(headings[0].rawTagName.slice(1)) !== 1) {
    fail(16, `${url} el primer encabezado es ${headings[0].rawTagName.toUpperCase()}, debería ser H1`)
  }

  // Punto 18 — tablas y listas.
  const tables = dom.querySelectorAll('table').length
  const lists = dom.querySelectorAll('ul, ol').length
  if (tables === 0 && url !== '/404/') warn(18, `${url} no tiene ninguna tabla`)
  if (lists < 2) fail(18, `${url} tiene ${lists} listas (mínimo 2)`)

  // Punto 21 — alt en todas las imágenes.
  for (const img of dom.querySelectorAll('img')) {
    const alt = img.getAttribute('alt')
    if (alt === null) fail(21, `${url} imagen sin atributo alt: ${img.getAttribute('src')}`)
    else if (alt.trim().length > 0 && alt.trim().length < 15) {
      warn(21, `${url} alt muy corto ("${alt}") en ${img.getAttribute('src')}`)
    }
  }

  // Punto 24 — reglas de URL. /404/ queda fuera: es una convención de la
  // plataforma, no una URL de contenido, y además va en noindex.
  for (const segment of url === '/404/' ? [] : url.split('/').filter(Boolean)) {
    if (/\d/.test(segment)) fail(24, `${url} el segmento "${segment}" contiene números`)
    if (segment !== segment.toLowerCase()) fail(24, `${url} el segmento "${segment}" tiene mayúsculas`)
    for (const word of segment.split('-')) {
      if (CONNECTORS.has(word)) fail(24, `${url} el segmento "${segment}" usa el conector "${word}"`)
    }
  }

  // Canonical, robots y Open Graph.
  const canonical = dom.querySelector('link[rel="canonical"]')?.getAttribute('href')
  if (!canonical) fail('canonical', `${url} no tiene canonical`)
  else if (!canonical.startsWith('https://')) fail('canonical', `${url} canonical no absoluto: ${canonical}`)

  const robots = dom.querySelector('meta[name="robots"]')?.getAttribute('content') || ''
  if (!robots) fail(25, `${url} no declara meta robots`)

  // Punto 25 — la paginación no se indexa.
  const paginated = /(^|\/)page\/\d+\/$/.test(url)
  if (paginated && !robots.includes('noindex')) {
    fail(25, `${url} es una ruta paginada y no está en noindex`)
  }
  if (!paginated && url !== '/404/' && robots.includes('noindex')) {
    fail(25, `${url} está en noindex sin ser paginada`)
  }

  for (const prop of ['og:title', 'og:description', 'og:image', 'og:url']) {
    if (!dom.querySelector(`meta[property="${prop}"]`)) fail('og', `${url} le falta ${prop}`)
  }

  // Punto 19 y 22 — structured data.
  const blocks = dom
    .querySelectorAll('script[type="application/ld+json"]')
    .map((s) => {
      try { return JSON.parse(s.text) } catch { fail('schema', `${url} JSON-LD inválido`); return null }
    })
    .filter(Boolean)

  if (!blocks.length && url !== '/404/') fail('schema', `${url} no tiene JSON-LD`)

  const types = blocks
    .flatMap((b) => b['@graph'] || [b])
    .flatMap((n) => (Array.isArray(n['@type']) ? n['@type'] : [n['@type']]))

  if (url !== '/404/') {
    if (!types.includes('FAQPage')) fail(19, `${url} no emite schema de FAQPage`)
    if (!types.includes('LocalBusiness')) fail(22, `${url} no emite schema de negocio local`)
    if (!types.includes('BreadcrumbList') && url !== '/') warn('schema', `${url} sin BreadcrumbList`)
  }

  // Punto 10 y puntos 12/14 — intención y TL;DR, en ese orden.
  const html = dom.toString()
  if (url !== '/404/') {
    const intentAt = html.indexOf('Intención')
    const tldrAt = html.indexOf('TL;DR')
    if (intentAt === -1) fail(10, `${url} no declara la intención de búsqueda`)
    if (tldrAt === -1) fail(12, `${url} no tiene bloque TL;DR`)
    if (intentAt > -1 && tldrAt > -1 && tldrAt < intentAt) {
      fail(14, `${url} el TL;DR aparece antes que el bloque de intención`)
    }
  }

  // Punto 17 — enlaces internos que resuelven a páginas reales.
  const internal = dom
    .querySelectorAll('a[href^="/"]')
    .map((a) => a.getAttribute('href'))
    .filter((h) => h && !h.startsWith('//') && !/\.(png|jpg|svg|xml|txt|webmanifest)$/.test(h))

  const known = new Set(docs.map((d) => d.url))
  for (const href of new Set(internal)) {
    const clean = href.split('#')[0].split('?')[0]
    if (clean && clean !== '/' && !known.has(clean)) {
      fail(17, `${url} enlaza a una ruta inexistente: ${clean}`)
    }
  }
  if (new Set(internal).size < 5 && url !== '/404/') {
    warn(17, `${url} solo tiene ${new Set(internal).size} enlaces internos únicos`)
  }

  // Un solo landmark principal por documento. <main> anidados son HTML inválido
  // y hacen que un lector de pantalla anuncie dos regiones principales.
  const mains = dom.querySelectorAll('main').length
  if (mains !== 1) fail('a11y', `${url} tiene ${mains} elementos <main> (debe haber exactamente uno)`)

  // Punto 4 y punto 6 — CTA móvil y compartir presentes en el HTML servido.
  if (url !== '/404/' && url !== '/contacto/' && !html.includes('data-share-root')) {
    fail(6, `${url} no tiene botón de compartir`)
  }
}

ok(1, `${titles.size} metatítulos únicos`)
ok(3, `${descriptions.size} metadescripciones únicas`)
ok(5, 'Un solo H1 por página')
ok(8, 'H1 distinto del metatítulo en todas las páginas')
ok('a11y', 'Un solo landmark <main> por página')

// ── Archivos de raíz: puntos 2, 11, 13, 23 ──────────────────────────────────

const requiredFiles = [
  { file: 'sitemap.xml', point: 11 },
  { file: 'robots.txt', point: 23 },
  { file: 'llms.txt', point: 2 },
  { file: 'llms-full.txt', point: 2 },
  { file: '404.html', point: 'ux' },
]

for (const { file, point } of requiredFiles) {
  if (!existsSync(join(DIST, file))) fail(point, `Falta dist/${file}`)
  else ok(point, `dist/${file} generado`)
}

if (existsSync(join(DIST, 'sitemap.xml'))) {
  const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

  // Punto 11 — el sitemap cubre todas las páginas indexables.
  const indexable = docs.filter((d) => d.url !== '/404/')
  for (const d of indexable) {
    const expected = `https://ivansantiagoduarte.com${d.url}`
    if (!locs.includes(expected)) fail(11, `El sitemap no incluye ${d.url}`)
  }
  // Punto 25 — y no cuela ninguna paginada.
  for (const loc of locs) {
    if (/\/page\/\d+\//.test(loc)) fail(25, `El sitemap incluye una ruta paginada: ${loc}`)
  }
  ok(11, `Sitemap con ${locs.length} URLs`)

  // Punto 13 — el sitemap tiene que ser alcanzable desde robots.txt para poder
  // enviarlo a Search Console.
  const robotsTxt = readFileSync(join(DIST, 'robots.txt'), 'utf8')
  if (!robotsTxt.includes('Sitemap: https://ivansantiagoduarte.com/sitemap.xml')) {
    fail(13, 'robots.txt no declara la ruta del sitemap')
  } else ok(13, 'robots.txt declara el sitemap')

  if (!/^User-agent:/m.test(robotsTxt)) fail(23, 'robots.txt sin directiva User-agent')
}

// ── Punto 7 y 9 — analítica y verificación ──────────────────────────────────

const homeHtml = readFileSync(join(DIST, 'index.html'), 'utf8')
// El build parte el código en varios chunks, así que se leen todos: buscar solo
// el primero daría falsos negativos según en qué chunk cayó cada módulo.
const bundleSrc = readdirSync(join(DIST, 'assets'))
  .filter((f) => f.endsWith('.js'))
  .map((f) => readFileSync(join(DIST, 'assets', f), 'utf8'))
  .join('\n')

if (!bundleSrc.includes('googletagmanager.com/gtag/js')) {
  fail(7, 'El bundle no incluye el cargador de GA4')
} else ok(7, 'GA4 integrado en el bundle')

if (!/G-[A-Z0-9]{6,}/.test(bundleSrc)) {
  warn(7, 'VITE_GA4_ID no estaba definido en el build: GA4 queda inactivo hasta configurarlo en Vercel')
} else ok(7, 'Measurement ID de GA4 presente en el build')

if (!homeHtml.includes('google-site-verification')) {
  warn(9, 'VITE_GSC_VERIFICATION no estaba definido: la verificación de Search Console queda pendiente')
} else ok(9, 'Meta de verificación de Search Console presente')

// ── Punto 20 — nombres de archivo descriptivos ──────────────────────────────

const ogDir = join(root, 'public', 'og')
if (existsSync(ogDir)) {
  for (const f of readdirSync(ogDir)) {
    if (!/^[a-z0-9-]+\.png$/.test(f)) fail(20, `Nombre de imagen no descriptivo o mal formado: ${f}`)
    if (f.replace('.png', '').split('-').length < 3) {
      warn(20, `Nombre de imagen poco descriptivo: ${f}`)
    }
  }
  ok(20, `${readdirSync(ogDir).length} imágenes con nombre descriptivo`)
}

const imgDir = join(root, 'public', 'img')
if (existsSync(imgDir)) {
  for (const f of readdirSync(imgDir)) {
    if (/\s/.test(f)) fail(20, `Nombre de imagen con espacios: ${f}`)
    if (f !== f.toLowerCase()) fail(20, `Nombre de imagen con mayúsculas: ${f}`)
  }
}

// ── Punto 4 — CTA fijo en móvil ─────────────────────────────────────────────

if (!bundleSrc.includes('¿Hacemos crecer tu marca?')) {
  fail(4, 'El CTA fijo de móvil no está en el bundle')
} else ok(4, 'CTA fijo de móvil presente')



// ── vercel.json contra su esquema ───────────────────────────────────────────
//
// Vercel valida vercel.json con additionalProperties prohibido y rechaza el
// despliegue entero si sobra una clave — incluido un "//" usado como comentario,
// que es exactamente como se rompió el primer deploy de esta rama. Se comprueba
// acá para que el fallo salga en el build local y no veinte minutos después.

const vercelConfig = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'))

{
  const TOP = new Set([
    '$schema', 'cleanUrls', 'trailingSlash', 'headers', 'redirects', 'rewrites',
    'regions', 'framework', 'buildCommand', 'outputDirectory', 'installCommand',
    'devCommand', 'functions', 'crons', 'images', 'public', 'git', 'ignoreCommand',
  ])
  const RULE = {
    headers: new Set(['source', 'headers', 'has', 'missing']),
    redirects: new Set(['source', 'destination', 'permanent', 'statusCode', 'has', 'missing']),
    rewrites: new Set(['source', 'destination', 'has', 'missing']),
  }

  let bad = 0
  for (const key of Object.keys(vercelConfig)) {
    if (!TOP.has(key)) { fail('vercel', `vercel.json: propiedad desconocida en la raíz "${key}"`); bad++ }
  }
  for (const [section, allowed] of Object.entries(RULE)) {
    ;(vercelConfig[section] || []).forEach((r, i) => {
      for (const key of Object.keys(r)) {
        if (!allowed.has(key)) { fail('vercel', `vercel.json: ${section}[${i}] tiene la propiedad no permitida "${key}"`); bad++ }
      }
    })
  }
  for (const h of vercelConfig.headers || []) {
    for (const entry of h.headers || []) {
      for (const key of Object.keys(entry)) {
        if (key !== 'key' && key !== 'value') { fail('vercel', `vercel.json: cabecera con propiedad "${key}"`); bad++ }
      }
    }
  }
  if (!bad) ok('vercel', 'vercel.json válido contra el esquema de Vercel')
}

// ── Punto 25 — prueba del mecanismo de desindexación de /page/ ──────────────
//
// Hoy el sitio no tiene paginación, así que las comprobaciones sobre HTML de
// arriba no tienen nada que mirar. Esto ejercita directamente la lógica que se
// aplicaría el día que exista un /blog/page/2/, para que no se rompa sin que
// nadie se entere.

{
  const { buildHead, isPaginated, pages: allPages } = await import(join(root, '.ssg', 'entry-server.js'))

  const cases = [
    { path: '/blog/page/2/', paginated: true },
    { path: '/trabajo/page/3/', paginated: true },
    { path: '/page/10/', paginated: true },
    { path: '/servicios/', paginated: false },
    { path: '/trabajo/lumi/', paginated: false },
  ]

  for (const c of cases) {
    if (isPaginated(c.path) !== c.paginated) {
      fail(25, `isPaginated("${c.path}") devolvió ${!c.paginated}, se esperaba ${c.paginated}`)
    }
  }

  const fake = {
    path: '/blog/page/2/', cluster: 'home', parent: '/', navLabel: 'Página 2',
    metaTitle: 'Prueba', metaDescription: 'Prueba', h1: 'Prueba',
    intent: null, tldr: [], faq: [], related: [], sections: [], updated: '2026-08-24',
  }
  const head = buildHead(fake, allPages)
  const robotsMeta = head.metas.find((m) => m.name === 'robots')?.content || ''

  if (!robotsMeta.includes('noindex')) fail(25, 'Una ruta /page/ no recibe noindex desde buildHead')
  if (!robotsMeta.includes('follow')) fail(25, 'Una ruta /page/ debería seguir siendo follow')
  if (head.jsonLd !== null) fail(25, 'Una ruta /page/ no debería emitir JSON-LD')

  // Y la cabecera de servidor que cubre lo que la meta no alcanza.
  const rule = vercelConfig.headers.find((h) => h.source.includes('page/'))
  const xrobots = rule?.headers.find((h) => h.key === 'X-Robots-Tag')?.value || ''
  if (!xrobots.includes('noindex')) fail(25, 'vercel.json no manda X-Robots-Tag noindex para /page/')

  if (!errors.some((e) => e.startsWith('[25]'))) {
    ok(25, 'Paginación /page/: noindex+follow por meta y por cabecera, y fuera del sitemap')
  }
}

// ── Reporte ─────────────────────────────────────────────────────────────────

const line = '─'.repeat(72)

if (passed.length) {
  console.log(`  ${line}\n  CORRECTO\n`)
  for (const p of passed) console.log(`   ✓ ${p}`)
}
if (warnings.length) {
  console.log(`\n  ${line}\n  AVISOS (${warnings.length})\n`)
  for (const w of warnings) console.log(`   ! ${w}`)
}
if (errors.length) {
  console.log(`\n  ${line}\n  ERRORES (${errors.length})\n`)
  for (const e of errors) console.log(`   ✗ ${e}`)
  console.log(`\n  ${line}\n`)
  process.exit(1)
}

console.log(`\n  ${line}\n  Auditoría superada: ${docs.length} páginas, 0 errores, ${warnings.length} avisos.\n`)
