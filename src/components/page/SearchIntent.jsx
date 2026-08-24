// Punto 10 — intención de búsqueda declarada arriba de la página.
// Le dice al lector en tres segundos si está en el lugar correcto, y le da al
// motor de búsqueda un bloque semántico explícito sobre a qué consulta responde.

const TYPE_LABEL = {
  informacional: 'Intención informacional',
  navegacional: 'Intención navegacional',
  comercial: 'Intención comercial',
  transaccional: 'Intención transaccional',
}

export function SearchIntent({ intent }) {
  if (!intent) return null

  const rows = [
    { k: 'Para quién', v: intent.audience },
    { k: 'Qué resuelve', v: intent.problem },
    { k: 'Qué te llevas', v: intent.outcome },
  ].filter((r) => r.v)

  return (
    <section aria-label="Intención de búsqueda" className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-6 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-santi">
          {TYPE_LABEL[intent.type] || 'Intención de búsqueda'}
        </span>
        {intent.query && (
          <span className="font-mono text-[11px] text-muted">
            Responde a: <span className="text-fg">«{intent.query}»</span>
          </span>
        )}
      </div>

      <dl className="grid gap-px bg-line sm:grid-cols-3">
        {rows.map((r) => (
          <div key={r.k} className="bg-surface p-6">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{r.k}</dt>
            <dd className="mt-2 text-pretty text-sm leading-relaxed text-fg">{r.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
