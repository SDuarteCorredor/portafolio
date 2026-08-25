// Registro central de páginas. Une los tres módulos de contenido y expone
// helpers que consumen el router, el prerender, el sitemap y los breadcrumbs.

import { core } from './core.js'
import { servicios } from './servicios.js'
import { trabajo } from './trabajo.js'

/** Todas las páginas del sitio, en orden de importancia. */
export const pages = [...core, ...servicios, ...trabajo]

/** Índice por ruta, para lookup O(1). */
export const pagesByPath = new Map(pages.map((p) => [p.path, p]))

/** Rutas que el prerender debe emitir como HTML estático. */
export const routes = pages.map((p) => p.path)

export function getPage(path) {
  if (!path) return undefined
  // Tolera ausencia de trailing slash y query/hash.
  const clean = path.split('?')[0].split('#')[0]
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`
  return pagesByPath.get(withSlash) || pagesByPath.get(clean)
}

/** Hijos directos de un hub — alimenta los clusters (punto 17). */
export function childrenOf(path) {
  return pages.filter((p) => p.parent === path)
}

/**
 * Cadena de breadcrumbs desde la home hasta la página dada.
 * Devuelve [{ path, label }] incluyendo la página actual.
 */
export function breadcrumbFor(path) {
  const chain = []
  let current = getPage(path)
  let guard = 0
  while (current && guard++ < 10) {
    chain.unshift({ path: current.path, label: current.navLabel })
    current = current.parent ? getPage(current.parent) : null
  }
  if (chain[0]?.path !== '/') chain.unshift({ path: '/', label: 'Inicio' })
  return chain
}

/** Páginas hermanas dentro del mismo cluster, excluyendo la actual. */
export function siblingsOf(path) {
  const page = getPage(path)
  if (!page) return []
  return pages.filter((p) => p.cluster === page.cluster && p.path !== page.path && p.parent === page.parent)
}
