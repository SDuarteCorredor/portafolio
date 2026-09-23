// ─────────────────────────────────────────────────────────────────────────────
// Sincroniza los repositorios públicos de GitHub con el sitio.
//
// Lee los repos públicos de la cuenta, les saca lo que el sitio necesita
// (descripción, lenguaje, temas, licencia, estrellas, resumen e imagen del
// README) y lo deja en src/content/repos.json. De ese archivo salen /recursos/,
// una página por repo, la sección de la home y la vitrina de /perfil/.
//
// Lo corre la GitHub Action `.github/workflows/sync-repos.yml` cada pocas horas:
// si el JSON cambió, compila el sitio (auditoría incluida) y lo commitea, y ese
// commit es el que dispara el deploy en Vercel. También se puede correr a mano:
//
//   node scripts/sync-repos.mjs            (GITHUB_TOKEN opcional, sube el límite)
//
// Un repo queda FUERA del sitio si es fork, está archivado, es el propio
// portafolio o el repo de perfil, o si en GitHub tiene el tema `no-portafolio`.
// Para esconder uno sin tocar GitHub está `hidden` en src/content/recursos-curado.js.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(root, 'src', 'content', 'repos.json')

const OWNER = process.env.GITHUB_OWNER || 'SDuarteCorredor'
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ''
const API = 'https://api.github.com'

// Repos que nunca son un recurso: el sitio mismo y el README de perfil.
const ALWAYS_SKIP = new Set(['portafolio', OWNER.toLowerCase()])
const OPT_OUT_TOPICS = new Set(['no-portafolio', 'ocultar-portafolio'])

async function gh(path, { raw = false } = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Accept: raw ? 'application/vnd.github.raw' : 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': `${OWNER}-portafolio-sync`,
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  })
  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`GitHub respondió ${res.status} en ${path}: ${(await res.text()).slice(0, 200)}`)
  }
  return raw ? res.text() : res.json()
}

// ── README ──────────────────────────────────────────────────────────────────

/** Quita el marcado de una línea de Markdown y deja el texto legible. */
function plain(md) {
  return md
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]{1,3}([^*_`]+)[*_`]{1,3}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Corta en la última frase completa que entra en `max` caracteres. */
function clip(text, max = 420) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('. '))
  return end > max * 0.5 ? cut.slice(0, end + 1) : `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

/**
 * Lo que el sitio usa del README:
 *   summary   el primer párrafo de prosa después del título
 *   headings  los H2, como índice de "qué trae"
 *   image     la primera imagen que no sea un badge, con URL absoluta
 */
export function parseReadme(md, { owner, repo, branch, file = 'README.md' }) {
  if (!md) return null
  const lines = md.replace(/\r/g, '').split('\n')

  let inFence = false
  let paragraph = []
  let summary = null
  const headings = []

  const flush = () => {
    if (!summary && paragraph.length) {
      const text = plain(paragraph.join(' '))
      if (text.length >= 40) summary = clip(text)
    }
    paragraph = []
  }

  for (const line of lines) {
    const t = line.trim()
    if (t.startsWith('```') || t.startsWith('~~~')) { inFence = !inFence; flush(); continue }
    if (inFence) continue

    const h2 = t.match(/^##\s+(.+?)\s*#*$/)
    if (h2) { flush(); headings.push(plain(h2[1])); continue }

    const skip =
      !t || t.startsWith('#') || t.startsWith('<') || t.startsWith('>') || t.startsWith('|') ||
      t.startsWith('![') || t.startsWith('[![') || /^[-*+]\s|^\d+\.\s/.test(t) || /^[-=_*]{3,}$/.test(t)
    if (skip) { flush(); continue }
    paragraph.push(t)
  }
  flush()

  // Imágenes: sintaxis Markdown y <img src>. Los badges no cuentan.
  const dir = file.includes('/') ? file.slice(0, file.lastIndexOf('/') + 1) : ''
  const candidates = [
    ...[...md.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)>?[^)]*\)/g)].map((m) => m[1]),
    ...[...md.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]),
  ]
  const isBadge = (u) => /shields\.io|badge|badgen|travis-ci|github\.com\/.+\/workflows|codecov/i.test(u)
  const isPicture = (u) => /\.(png|jpe?g|webp|gif)(\?|#|$)/i.test(u)
  const first = candidates.find((u) => !isBadge(u) && isPicture(u))

  let image = null
  if (first) {
    if (/^https?:\/\//.test(first)) image = first
    else {
      const rel = first.replace(/^\.\//, '').replace(/^\//, '')
      const path = first.startsWith('/') ? rel : `${dir}${rel}`
      image = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
    }
  }

  const junk = /^(licen[cs]ia?|license|contribu|contributing|créditos|credits|autor|author|tabla de contenido|table of contents|índice)/i
  return {
    summary,
    headings: headings.filter((h) => h && !junk.test(h)).slice(0, 8),
    image,
  }
}

async function readmeFor(r) {
  const ctx = { owner: OWNER, repo: r.name, branch: r.default_branch }
  // El sitio está en español: si el repo trae README.es.md, manda ese.
  for (const file of ['README.es.md', 'README_ES.md']) {
    const md = await gh(`/repos/${OWNER}/${r.name}/contents/${file}`, { raw: true })
    if (md) return parseReadme(md, { ...ctx, file })
  }
  const md = await gh(`/repos/${OWNER}/${r.name}/readme`, { raw: true })
  return parseReadme(md, ctx)
}

// ── Repos ───────────────────────────────────────────────────────────────────

const day = (iso) => (iso ? iso.slice(0, 10) : null)

async function main() {
  const list = await gh(`/users/${OWNER}/repos?type=owner&sort=created&direction=desc&per_page=100`)
  if (!Array.isArray(list)) throw new Error('La respuesta de GitHub no es una lista de repos')

  const eligible = list.filter(
    (r) =>
      !r.private && !r.fork && !r.archived && !r.disabled &&
      !ALWAYS_SKIP.has(r.name.toLowerCase()) &&
      !(r.topics || []).some((t) => OPT_OUT_TOPICS.has(t)),
  )

  const repos = []
  for (const r of eligible) {
    let readme = null
    try {
      readme = await readmeFor(r)
    } catch (err) {
      console.warn(`  ! README de ${r.name} no disponible: ${err.message}`)
    }

    repos.push({
      name: r.name,
      description: r.description || null,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language || null,
      topics: r.topics || [],
      license: r.license && r.license.spdx_id !== 'NOASSERTION' ? r.license.spdx_id : null,
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      createdAt: day(r.created_at),
      updatedAt: day(r.pushed_at || r.updated_at),
      defaultBranch: r.default_branch,
      readme,
    })
  }

  // Si GitHub devuelve cero repos y antes había, casi seguro es un error de la
  // API o del token, no que se hayan borrado todos. No se pisa el catálogo.
  const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : null
  if (!repos.length && previous?.repos?.length && !process.argv.includes('--allow-empty')) {
    throw new Error('GitHub devolvió 0 repos públicos; se conserva el catálogo anterior (usa --allow-empty para forzar)')
  }

  const next = { owner: OWNER, repos }
  const serialized = `${JSON.stringify(next, null, 2)}\n`
  const changed = !existsSync(OUT) || readFileSync(OUT, 'utf8') !== serialized

  if (changed) writeFileSync(OUT, serialized)

  console.log(`\n  ${repos.length} repos públicos de ${OWNER}${changed ? ' — catálogo actualizado' : ' — sin cambios'}`)
  for (const r of repos) console.log(`   · ${r.name} (${r.language || 'sin lenguaje'}, ${r.updatedAt})`)
  console.log('')

  // Para la Action: deja saber si hay algo que compilar y commitear.
  if (process.env.GITHUB_OUTPUT) {
    writeFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`, { flag: 'a' })
  }
}

// Solo corre al invocarlo directamente; los tests importan parseReadme.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(`\n  ✗ ${err.message}\n`)
    process.exit(1)
  })
}
