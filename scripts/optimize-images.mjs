// Reduce el peso de las fotos del sitio y genera variantes AVIF/WebP.
// El retrato original pesaba 1,5 MB: en móvil eso castiga el LCP, que es una
// señal de posicionamiento directa. Se ejecuta una sola vez y deja los
// archivos ya optimizados en public/img/.

import sharp from 'sharp'
import { readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIR = join(root, 'public', 'img')

const kb = (b) => `${(b / 1024).toFixed(0)} kB`
const MAX_WIDTH = 1200

for (const file of readdirSync(DIR)) {
  if (extname(file).toLowerCase() !== '.png') continue

  const src = join(DIR, file)
  const before = statSync(src).size
  const name = basename(file, '.png')

  const image = sharp(src)
  const { width } = await image.metadata()
  const resize = width > MAX_WIDTH ? { width: MAX_WIDTH, withoutEnlargement: true } : null

  const base = () => {
    const p = sharp(src)
    return resize ? p.resize(resize) : p
  }

  await base().avif({ quality: 62, effort: 6 }).toFile(join(DIR, `${name}.avif`))
  await base().webp({ quality: 78, effort: 5 }).toFile(join(DIR, `${name}.webp`))

  // El PNG se conserva como respaldo, pero recomprimido y a tamaño razonable.
  const buf = await base().png({ compressionLevel: 9, palette: true, quality: 82 }).toBuffer()
  const { writeFileSync } = await import('node:fs')
  writeFileSync(src, buf)

  const after = statSync(src).size
  const avif = statSync(join(DIR, `${name}.avif`)).size
  const webp = statSync(join(DIR, `${name}.webp`)).size

  console.log(`  ${name}`)
  console.log(`    png  ${kb(before)} → ${kb(after)}`)
  console.log(`    webp ${kb(webp)}   avif ${kb(avif)}`)
}
