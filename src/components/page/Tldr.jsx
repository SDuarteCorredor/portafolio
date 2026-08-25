import { Linkify } from './Linkify'

// Puntos 12 y 14 — TL;DR / Key takeaways, ubicado JUSTO DESPUÉS del bloque de
// intención de búsqueda. Es el bloque que más se cita en respuestas generadas
// por IA, así que cada bullet tiene que sostenerse solo, fuera de contexto.

export function Tldr({ items = [], title = 'En resumen' }) {
  if (!items.length) return null

  return (
    <section
      aria-label="Resumen de la página"
      className="mt-4 rounded-2xl border border-santi/25 bg-santi/[0.04] p-6 md:p-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-full bg-santi px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white">
          TL;DR
        </span>
        <h2 className="font-grotesk text-lg font-bold tracking-[-0.01em] text-fg">{title}</h2>
      </div>

      <ul className="space-y-3.5">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3.5 text-pretty leading-relaxed text-fg">
            <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-santi" />
            <span><Linkify>{it}</Linkify></span>
          </li>
        ))}
      </ul>
    </section>
  )
}
