import { Link } from 'react-router-dom'
import { getPage } from '../../content/index.js'
import { trackCta } from '../../seo/analytics'

// Punto 17 — interlinkeado contextual.
// Cada enlace lleva una razón escrita de por qué ir ahí: eso mejora el CTR
// interno y le da a Google contexto sobre la relación entre las dos páginas,
// mucho más que un "ver también" pelado.

export function Related({ items = [], title = 'Sigue por acá' }) {
  const links = items
    .map((it) => ({ ...it, page: getPage(it.path) }))
    .filter((it) => it.page) // nunca enlazamos a una ruta que no existe

  if (!links.length) return null

  return (
    <section aria-labelledby="related-title" className="mt-20">
      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Relacionado</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <h2 id="related-title" className="font-grotesk text-big font-bold leading-[1.05] tracking-[-0.02em]">
        {title}
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {links.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            onClick={() => trackCta(l.label || l.page.navLabel, 'related')}
            className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-santi/40"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-santi">
              {l.page.cluster}
            </span>
            <h3 className="mt-3 font-grotesk text-xl font-bold tracking-[-0.01em] text-fg">
              {l.label || l.page.navLabel}
            </h3>
            {l.note && <p className="mt-2.5 flex-1 text-pretty text-sm leading-relaxed text-muted">{l.note}</p>}
            <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-santi">
              Ver página
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
