import { Reveal } from '../Reveal'
import { Breadcrumbs } from './Breadcrumbs'
import { SearchIntent } from './SearchIntent'
import { Tldr } from './Tldr'
import { InlineCta } from './InlineCta'
import { Faq } from './Faq'
import { Related } from './Related'
import { ProseTable, ProseList, ProseP } from './Prose'
import { ShareButton } from '../ShareButton'
import { PageArt, hasPageArt } from './PageArt'
import { trackOutbound } from '../../seo/analytics'

// ─────────────────────────────────────────────────────────────────────────────
// Plantilla de página de contenido.
//
// El orden del documento no es decorativo, resuelve puntos concretos:
//   H1 único (5, 8) → primer párrafo → CTA (15) → intención (10) → TL;DR (12, 14)
//   → cuerpo H2/H3 con tablas y listas (16, 18) → FAQ (19) → relacionados (17)
// ─────────────────────────────────────────────────────────────────────────────

function Subsection({ sub }) {
  return (
    <div className="mt-10">
      <h3 className="font-grotesk text-xl font-bold tracking-[-0.01em] text-fg md:text-2xl">
        {sub.h3}
      </h3>
      {sub.body?.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
      <ProseList list={sub.list} />
      <ProseTable table={sub.table} />
    </div>
  )
}

function Section({ section, index }) {
  return (
    <Reveal>
      <section className="mt-16 border-t border-line pt-12 first:mt-14">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-santi">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-10 bg-line" />
        </div>

        <h2 className="max-w-[24ch] text-balance font-grotesk text-big font-bold leading-[1.06] tracking-[-0.02em] text-fg">
          {section.h2}
        </h2>

        {section.body?.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
        <ProseList list={section.list} />
        <ProseTable table={section.table} />

        {section.subsections?.map((sub) => <Subsection key={sub.h3} sub={sub} />)}
      </section>
    </Reveal>
  )
}

/** Cabecera específica de caso de estudio (cliente, año, alcance, enlace). */
function CaseMeta({ meta }) {
  if (!meta) return null

  const rows = [
    { k: 'Cliente', v: meta.client },
    { k: 'Año', v: meta.year },
    { k: 'Rol', v: meta.role },
    { k: 'Resultado', v: meta.headline },
  ].filter((r) => r.v)

  return (
    <div className="mt-10">
      <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((r) => (
          <div key={r.k} className="bg-surface p-5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{r.k}</dt>
            <dd className="mt-2 text-pretty font-grotesk font-semibold leading-snug text-fg">{r.v}</dd>
          </div>
        ))}
      </dl>

      {meta.scope?.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {meta.scope.map((s) => (
            <span key={s} className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Enlace al proyecto en vivo (Behance, el sitio del cliente, la app).
 *
 * Existía, pero iba como una píldora de texto mono al final de la fila de
 * etiquetas de alcance, con el mismo peso visual que "Branding" o "Funnels".
 * La tarjeta promete "Ver el caso", se entra, y lo único que lleva al trabajo
 * real queda indistinguible de una etiqueta. Ahora es un botón, y se repite al
 * cerrar el caso — que es el momento en que alguien que terminó de leer quiere
 * ir a verlo.
 */
function CaseLink({ meta, variant = 'inline' }) {
  if (!meta?.externalUrl) return null

  const label = meta.externalLabel || 'Ver el proyecto'
  const track = () => trackOutbound(meta.externalUrl, label)

  if (variant === 'inline') {
    return (
      <a
        href={meta.externalUrl}
        target="_blank"
        rel="noreferrer"
        onClick={track}
        className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-santi px-7 py-3.5 font-grotesk text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(27,60,255,0.7)]"
      >
        {label}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
      </a>
    )
  }

  return (
    <Reveal>
      <aside className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-2xl border border-santi/25 bg-santi/[0.06] p-7 md:p-9">
        <div className="min-w-0">
          <p className="eyebrow">El proyecto, fuera de esta página</p>
          <p className="mt-3 max-w-xl text-pretty font-grotesk text-xl font-bold tracking-[-0.01em] text-fg md:text-2xl">
            Ya leíste cómo se hizo. Acá está el resultado, sin intermediarios.
          </p>
        </div>
        <a
          href={meta.externalUrl}
          target="_blank"
          rel="noreferrer"
          onClick={track}
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-santi px-7 py-3.5 font-grotesk text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(27,60,255,0.7)]"
        >
          {label}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
        </a>
      </aside>
    </Reveal>
  )
}

/**
 * @param {{ page: object, children?: any, afterHeader?: any }} props
 *   `afterHeader` entra entre la cabecera y el cuerpo editorial. Existe para el
 *   hub de trabajo: la grilla de casos tiene que verse antes de pedirle a nadie
 *   que lea tres pantallas de texto. `children` sigue yendo después del cuerpo,
 *   que es donde tiene sentido un índice que se consulta al final.
 */
export function ContentPage({ page, children, afterHeader }) {
  // La cabecera se maqueta distinto según haya portada o no, y PageArt es quien
  // sabe si esta ruta tiene una.
  const hasArt = hasPageArt(page)

  return (
    <article className="container-x pb-24 pt-32 md:pt-36">
      <Breadcrumbs path={page.path} />

      {/* Cabecera a dos columnas cuando la página tiene portada.
          Puesta debajo del texto, la portada caía fuera de la primera pantalla:
          el H1 a tamaño display más el párrafo de entrada ya ocupan el alto
          completo, así que lo primero que se veía seguía siendo un muro de
          tipografía. Al lado del titular entra en el primer vistazo, que es
          para lo que existe. Sin portada, la columna de texto ocupa todo el
          ancho como antes. */}
      <header className={hasArt ? 'grid gap-x-12 gap-y-10 lg:grid-cols-12' : ''}>
        <div className={hasArt ? 'lg:col-span-7' : ''}>
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-5">
            <div className="min-w-0 flex-1">
              <p className="eyebrow">{page.navLabel}</p>

              {/* Punto 5: este es el único H1 de la página. Punto 8: dice algo
                  distinto del metaTitle, no lo repite. */}
              <h1
                className={
                  'mt-5 max-w-[20ch] text-balance font-grotesk font-extrabold leading-[0.98] tracking-[-0.035em] text-fg ' +
                  // A siete columnas, el tamaño display se come el ancho y parte
                  // el titular en demasiadas líneas.
                  (hasArt ? 'text-[clamp(2.1rem,5vw,4.2rem)]' : 'text-huge')
                }
              >
                {page.h1}
              </h1>
            </div>

            {/* Punto 6 */}
            <ShareButton page={page} className="mt-2 shrink-0" />
          </div>

          <ProseP>{page.lead}</ProseP>

          {/* Punto 15 */}
          <InlineCta cta={page.ctaInline} />

          {/* El enlace al trabajo real. Ver CaseLink. */}
          <CaseLink meta={page.caseMeta} />
        </div>

        {hasArt && (
          <div className="lg:col-span-5 lg:self-center">
            <PageArt page={page} />
          </div>
        )}
      </header>

      <div>
        <CaseMeta meta={page.caseMeta} />

        {/* Punto 10 */}
        <SearchIntent intent={page.intent} />

        {/* Puntos 12 y 14 — inmediatamente después de la intención */}
        <Tldr items={page.tldr} />
      </div>

      {afterHeader}

      {/* Punto 16 */}
      {page.sections?.map((s, i) => <Section key={s.h2} section={s} index={i} />)}

      {/* Bloques extra que inyecta una página concreta (p. ej. la grilla de
          servicios en el hub) — van después del cuerpo editorial. */}
      {children}

      {/* Quien terminó de leer el caso es justo quien quiere ir a verlo. */}
      <CaseLink meta={page.caseMeta} variant="outro" />

      {/* Punto 19 */}
      <Reveal><Faq items={page.faq} path={page.path} /></Reveal>

      {/* Punto 17 */}
      <Reveal><Related items={page.related} /></Reveal>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
          Actualizado el{' '}
          <time dateTime={page.updated}>
            {new Date(`${page.updated}T12:00:00Z`).toLocaleDateString('es-CO', {
              day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
            })}
          </time>
        </p>
        <ShareButton page={page} variant="blue" />
      </div>
    </article>
  )
}
