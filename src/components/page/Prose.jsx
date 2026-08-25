import { Linkify } from './Linkify'

// Punto 18 — tablas y listas.
// Formatos que Google extrae bien para fragmentos destacados y que los modelos
// de lenguaje citan con precisión. La tabla scrollea dentro de su contenedor
// para que el cuerpo de la página nunca desborde en horizontal.

export function ProseTable({ table }) {
  if (!table?.rows?.length) return null

  return (
    <figure className="mt-8">
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          {table.caption && <caption className="sr-only">{table.caption}</caption>}
          <thead>
            <tr className="border-b border-line bg-fg/[0.03]">
              {table.head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="whitespace-nowrap px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-santi"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className="border-b border-line last:border-0 transition-colors hover:bg-fg/[0.02]">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-5 py-4 align-top text-pretty leading-relaxed ${
                      j === 0 ? 'font-medium text-fg' : 'text-muted'
                    }`}
                  >
                    <Linkify>{cell}</Linkify>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.caption && (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {table.caption}
        </figcaption>
      )}
    </figure>
  )
}

export function ProseList({ list }) {
  if (!list?.items?.length) return null

  const { variant = 'ul', title, items } = list

  const Body = () => {
    if (variant === 'ol') {
      return (
        <ol className="mt-4 space-y-3.5">
          {items.map((it, i) => (
            <li key={i} className="flex gap-4 text-pretty leading-relaxed text-muted">
              <span
                aria-hidden
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-santi/40 font-mono text-[11px] text-santi"
              >
                {i + 1}
              </span>
              <span><Linkify>{it}</Linkify></span>
            </li>
          ))}
        </ol>
      )
    }

    if (variant === 'check') {
      return (
        <ul className="mt-4 space-y-3.5">
          {items.map((it, i) => (
            <li key={i} className="flex gap-3.5 text-pretty leading-relaxed text-muted">
              <svg
                aria-hidden width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                className="mt-1 shrink-0 text-santi"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span><Linkify>{it}</Linkify></span>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <ul className="mt-4 space-y-3.5">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3.5 text-pretty leading-relaxed text-muted">
            <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-santi/70" />
            <span><Linkify>{it}</Linkify></span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="mt-7">
      {title && (
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{title}</p>
      )}
      <Body />
    </div>
  )
}

/** Párrafo de cuerpo — un solo lugar donde vive la medida de línea. */
export function ProseP({ children }) {
  return (
    <p className="mt-5 max-w-[68ch] text-pretty leading-relaxed text-muted">
      <Linkify>{children}</Linkify>
    </p>
  )
}
