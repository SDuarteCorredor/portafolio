import { Link } from 'react-router-dom'
import { breadcrumbFor } from '../../content/index.js'

// Punto 17 — migas de pan. Refuerzan el cluster y le dan a Google la jerarquía
// explícita (el JSON-LD equivalente sale en el <head>).
export function Breadcrumbs({ path }) {
  const chain = breadcrumbFor(path)
  if (chain.length < 2) return null

  return (
    <nav aria-label="Ruta de navegación" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {chain.map((c, i) => {
          const last = i === chain.length - 1
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-fg">{c.label}</span>
              ) : (
                <>
                  <Link to={c.path} className="transition-colors hover:text-santi">{c.label}</Link>
                  <span aria-hidden className="text-line">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
