import { useEffect } from 'react'
import { buildHead } from './head.js'
import { pages } from '../content/index.js'

/**
 * Mantiene el <head> sincronizado al navegar entre rutas en cliente.
 * El HTML inicial ya viene con el head correcto desde el prerender; esto solo
 * cubre la navegación posterior sin recarga.
 *
 * Marca cada etiqueta que gestiona con data-seo para poder reemplazarla sin
 * tocar lo que puso el build (fuentes, favicon, script de tema).
 */
export function useHead(page) {
  useEffect(() => {
    if (!page || typeof document === 'undefined') return

    const head = buildHead(page, pages)
    document.title = head.title

    document.querySelectorAll('[data-seo]').forEach((el) => el.remove())

    const frag = document.createDocumentFragment()

    for (const m of head.metas) {
      const el = document.createElement('meta')
      if (m.name) el.setAttribute('name', m.name)
      else el.setAttribute('property', m.property)
      el.setAttribute('content', m.content)
      el.setAttribute('data-seo', '')
      frag.appendChild(el)
    }

    for (const l of head.links) {
      const el = document.createElement('link')
      for (const [k, v] of Object.entries(l)) el.setAttribute(k, v)
      el.setAttribute('data-seo', '')
      frag.appendChild(el)
    }

    if (head.jsonLd) {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.textContent = JSON.stringify(head.jsonLd)
      el.setAttribute('data-seo', '')
      frag.appendChild(el)
    }

    // Las etiquetas que vinieron del prerender ya no aplican a esta ruta.
    document
      .querySelectorAll(
        'meta[name="description"], meta[name="robots"], meta[name="googlebot"], ' +
          'meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], ' +
          'link[rel="alternate"], script[type="application/ld+json"]',
      )
      .forEach((el) => el.remove())

    document.head.appendChild(frag)
  }, [page])
}
