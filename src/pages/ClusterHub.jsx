import { Link } from 'react-router-dom'
import { ContentPage } from '../components/page/ContentPage'
import { childrenOf } from '../content/index.js'
import { Reveal } from '../components/Reveal'
import { trackCta } from '../seo/analytics'
import { work } from '../data'
import { CaseGrid } from '../components/CaseGrid'

// Punto 17 — los hubs son la cabeza del cluster: enlazan a TODOS sus hijos con
// un enlace descriptivo cada uno. Es lo que convierte un montón de páginas
// sueltas en una estructura que Google puede recorrer entera.
//
// Los dos hubs no se comportan igual, y no deberían:
//
//   /trabajo/   es la página a la que se manda a un reclutador o a un cliente.
//               Mostraba los ocho proyectos como filas de una tabla y fichas de
//               texto, así que había que leer para saber qué hay. Ahora abre con
//               la misma grilla de tarjetas de la home, con portada, arriba del
//               cuerpo editorial.
//
//   /servicios/ se explica mejor con texto: lo que se compara entre servicios
//               es el alcance, no una imagen. Conserva las fichas, al final.

/** Fichas de texto — el índice clásico del cluster. */
function CardIndex({ pages }) {
  return (
    <div className="mt-9 grid gap-4 md:grid-cols-2">
      {pages.map((c, i) => (
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
  )
}

/** Grilla de casos con portada — el índice del cluster de trabajo. */
function WorkGrid({ items }) {
  return (
    <section aria-labelledby="cluster-title" className="mt-14">
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-santi">Índice</span>
        <span className="h-px w-10 bg-line" />
      </div>

      <h2 id="cluster-title" className="font-grotesk text-big font-bold leading-[1.06] tracking-[-0.02em]">
        Los ocho casos
      </h2>

      <div className="mt-9">
        <CaseGrid items={items} source="cluster_hub" />
      </div>
    </section>
  )
}

export default function ClusterHub({ page }) {
  const children = childrenOf(page.path)
  const isWork = page.cluster === 'trabajo'

  // El orden lo manda `work` en data.js, que es donde está la prioridad con la
  // que se quiere que se lean los casos — la home usa ese mismo orden, así que
  // el hub no puede contradecirla. Solo se muestran los que además tienen
  // página propia en el registro de contenido.
  const cases = isWork
    ? work.filter((w) => children.some((c) => c.path === `/trabajo/${w.slug}/`))
    : []

  return (
    <ContentPage
      page={page}
      afterHeader={isWork && cases.length > 0 ? <Reveal><WorkGrid items={cases} /></Reveal> : null}
    >
      {!isWork && children.length > 0 && (
        <Reveal>
          <section aria-labelledby="cluster-title" className="mt-16 border-t border-line pt-12">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-santi">Índice</span>
              <span className="h-px w-10 bg-line" />
            </div>

            <h2 id="cluster-title" className="font-grotesk text-big font-bold leading-[1.06] tracking-[-0.02em]">
              Todos los servicios
            </h2>

            <CardIndex pages={children} />
          </section>
        </Reveal>
      )}
    </ContentPage>
  )
}
