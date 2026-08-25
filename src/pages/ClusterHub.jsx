import { Link } from 'react-router-dom'
import { ContentPage } from '../components/page/ContentPage'
import { childrenOf } from '../content/index.js'
import { Reveal } from '../components/Reveal'
import { trackCta } from '../seo/analytics'

// Punto 17 — los hubs son la cabeza del cluster: enlazan a TODOS sus hijos con
// un enlace descriptivo cada uno. Es lo que convierte un montón de páginas
// sueltas en una estructura que Google puede recorrer entera.

export default function ClusterHub({ page }) {
  const children = childrenOf(page.path)

  return (
    <ContentPage page={page}>
      {children.length > 0 && (
        <Reveal>
          <section aria-labelledby="cluster-title" className="mt-16 border-t border-line pt-12">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-santi">Índice</span>
              <span className="h-px w-10 bg-line" />
            </div>

            <h2 id="cluster-title" className="font-grotesk text-big font-bold leading-[1.06] tracking-[-0.02em]">
              {page.cluster === 'servicios' ? 'Todos los servicios' : 'Todos los casos'}
            </h2>

            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {children.map((c, i) => (
                <Link
                  key={c.path}
                  to={c.path}
                  onClick={() => trackCta(c.navLabel, 'cluster_hub')}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-santi/40 md:p-8"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-5 select-none font-grotesk text-[5.5rem] font-extrabold leading-none text-outline opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.1]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-santi">
                    {c.caseMeta?.headline || c.intent?.type || 'Página'}
                  </span>

                  <h3 className="mt-3.5 font-grotesk text-2xl font-bold tracking-[-0.02em] text-fg">
                    {c.navLabel}
                  </h3>

                  <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted">
                    {c.metaDescription}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-santi">
                    Ver detalle
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </ContentPage>
  )
}
