// ─────────────────────────────────────────────────────────────────────────────
// Genera las imágenes Open Graph (1200×630) que cada página declara en
// `image.src`. Se rasterizan desde SVG con resvg, usando la tipografía del
// sitio, así que la miniatura que sale en WhatsApp o LinkedIn es coherente con
// la marca y no una captura genérica.
//
// Punto 20 — el nombre de archivo lo define el contenido y es descriptivo.
// Punto 21 — el alt correspondiente viaja en el mismo objeto `image`.
// ─────────────────────────────────────────────────────────────────────────────

import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(root, 'public', 'og')
const FONTS = [
  join(root, 'scripts/fonts/inter-bold.ttf'),
  join(root, 'scripts/fonts/inter-regular.ttf'),
].filter(existsSync)

const { pages } = await import(join(root, '.ssg', 'entry-server.js'))

const BG = '#06070D'
const FG = '#F4F3EE'
const MUTED = '#A7AAB8'
const BLUE = '#1B3CFF'

function escapeXml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

/**
 * Reparte el título en líneas. Inter Bold promedia ~0,54 em por carácter, que
 * para títulos cortos es suficientemente preciso; se deja margen recortando el
 * ancho útil a 1000 px sobre un lienzo de 1200.
 */
function wrap(text, fontSize, maxWidth = 1000) {
  const perChar = fontSize * 0.54
  const maxChars = Math.floor(maxWidth / perChar)
  const words = String(text).replace(/\*/g, '').split(/\s+/)
  const lines = []
  let line = ''

  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w
    if (candidate.length > maxChars && line) {
      lines.push(line)
      line = w
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}

const CLUSTER_LABEL = {
  home: 'Marketing digital · Bogotá',
  servicios: 'Servicio',
  trabajo: 'Caso de estudio',
  perfil: 'Perfil',
  contacto: 'Contacto',
}

/** Rasteriza y comprime. resvg entrega PNG de 24 bits; la paleta basta para
 *  un gráfico plano como este y recorta más de la mitad del peso. */
async function toPng(svg) {
  const raw = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { fontFiles: FONTS, loadSystemFonts: false, defaultFontFamily: 'Inter' },
  })
    .render()
    .asPng()

  return sharp(raw).png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toBuffer()
}

function svgFor(page) {
  // El título largo baja de cuerpo para que nunca se salga del lienzo.
  const raw = page.h1.replace(/\*/g, '')
  const size = raw.length > 64 ? 60 : raw.length > 44 ? 70 : 82
  const lines = wrap(raw, size).slice(0, 4)
  const startY = 300 - ((lines.length - 1) * size * 1.1) / 2

  const title = lines
    .map((l, i) => `<text x="80" y="${startY + i * size * 1.1}" font-family="Inter" font-weight="700" font-size="${size}" fill="${FG}" letter-spacing="-2">${escapeXml(l)}</text>`)
    .join('\n    ')

  const eyebrow = CLUSTER_LABEL[page.cluster] || 'Marketing digital'

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="82%" cy="14%" r="62%">
      <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${BLUE}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="8%" cy="92%" r="55%">
      <stop offset="0%" stop-color="#0A1A8A" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0A1A8A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect x="0" y="0" width="1200" height="6" fill="${BLUE}"/>

  <text x="80" y="118" font-family="Inter" font-weight="400" font-size="21" fill="${BLUE}" letter-spacing="4">${escapeXml(eyebrow.toUpperCase())}</text>

  <g>
    ${title}
  </g>

  <line x1="80" y1="486" x2="1120" y2="486" stroke="${FG}" stroke-opacity="0.14" stroke-width="1"/>

  <rect x="80" y="524" width="46" height="46" rx="12" fill="${BLUE}"/>
  <text x="103" y="556" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26" fill="#FFFFFF">S</text>

  <text x="144" y="546" font-family="Inter" font-weight="700" font-size="25" fill="${FG}">Iván Santiago Duarte</text>
  <text x="144" y="574" font-family="Inter" font-weight="400" font-size="19" fill="${MUTED}">ivansantiagoduarte.com</text>

  <text x="1120" y="558" text-anchor="end" font-family="Inter" font-weight="400" font-size="19" fill="${MUTED}">Bogotá, Colombia</text>
</svg>`
}

mkdirSync(OUT, { recursive: true })

const seen = new Set()
let count = 0

for (const page of pages) {
  const src = page.image?.src
  if (!src || !src.startsWith('/og/')) continue
  if (seen.has(src)) continue
  seen.add(src)

  writeFileSync(join(OUT, basename(src)), await toPng(svgFor(page)))
  count++
}

// Imagen por defecto, la que usa cualquier página sin `image` propia y el
// schema de LocalBusiness.
const fallback = pages.find((p) => p.path === '/') || pages[0]
const defaultName = 'ivan-santiago-duarte-marketing-digital-bogota.png'
if (!seen.has(`/og/${defaultName}`)) {
  writeFileSync(join(OUT, defaultName), await toPng(svgFor(fallback)))
  count++
}

console.log(`\n  Imágenes OG generadas: ${count} en public/og/\n`)
