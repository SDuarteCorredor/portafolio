import { courses, modes, aulaUrl, AULA_LEGAL } from '../../content/aula.js'
import { trackOutbound, trackWhatsapp } from '../../seo/analytics'

// Piezas compartidas de la puerta «Aprende conmigo»: la usan la sección de la
// home y la página /aprende/. Cada enlace al aula sale de aulaUrl() con la
// campaña de la sección que lo muestra, así el aula sabe desde dónde llegó
// cada visita.

const arrow = (
  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
)

/** Aviso legal obligatorio (Decreto 1075 de 2015). Nunca se oculta. */
export function AulaLegal({ className = '' }) {
  return (
    <p className={`max-w-[68ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-muted ${className}`}>
      {AULA_LEGAL}
    </p>
  )
}

/** Grilla de cursos. `limit` recorta para la home. */
export function AulaCourses({ campaign, limit }) {
  const items = limit ? courses.slice(0, limit) : courses

  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => {
        const href = aulaUrl(`/cursos/${c.slug}`, campaign)
        return (
          <li key={c.slug}>
            <a
              href={href}
              target="_blank"
              rel="noopener"
              onClick={() => trackOutbound(href, `Curso ${c.title}`)}
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-santi/50"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {c.area}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                    c.level === 'Avanzado' ? 'bg-santi text-white' : 'bg-santi/10 text-santi'
                  }`}
                >
                  {c.level}
                </span>
              </div>
              <span className="mt-5 block font-grotesk text-xl font-bold tracking-[-0.01em] text-fg">
                {c.title}
              </span>
              <span className="mt-3 block flex-1 text-pretty text-sm leading-relaxed text-muted">{c.summary}</span>
              <span className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
                <span className="text-muted">{c.modules} módulos</span>
                <span className="inline-flex items-center gap-1.5 text-santi">Ver curso {arrow}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

/** Las tres formas de aprender, con su llamada a la acción. */
export function AulaModes({ campaign }) {
  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-3">
      {modes.map((m) => {
        const external = Boolean(m.externalHref)
        const href = external ? m.externalHref : aulaUrl(m.aulaPath, campaign)
        const onClick = external
          ? () => trackWhatsapp(`aula_grupo_${campaign}`)
          : () => trackOutbound(href, `Aula ${m.title}`)

        return (
          <li key={m.id} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
            <span className="font-grotesk text-xl font-bold tracking-[-0.01em] text-fg">{m.title}</span>
            <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-santi">{m.price}</span>
            <span className="mt-4 block flex-1 text-pretty text-sm leading-relaxed text-muted">{m.body}</span>
            <a
              href={href}
              target="_blank"
              rel={external ? 'noreferrer' : 'noopener'}
              onClick={onClick}
              className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-santi/40 px-5 py-2.5 font-grotesk text-sm font-semibold text-santi transition-colors duration-300 hover:bg-santi hover:text-white"
            >
              {m.cta} {arrow}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
