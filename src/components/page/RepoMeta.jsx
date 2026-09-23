import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { fecha } from '../../content/recursos.js'
import { track } from '../../seo/analytics'

/**
 * Cabecera propia de la ficha de un recurso (repo de GitHub), en el mismo
 * lugar que CaseMeta ocupa en un caso de estudio: los datos que alguien mira
 * antes de decidir si lo clona, y el comando para hacerlo sin salir de acá.
 */
export function RepoMeta({ meta }) {
  const [copied, setCopied] = useState(false)
  if (!meta) return null

  const rows = [
    { k: 'Lenguaje', v: meta.language || 'Varios' },
    { k: 'Licencia', v: meta.license || 'Sin declarar' },
    { k: 'Actualizado', v: fecha(meta.updatedAt) },
    { k: 'Estrellas', v: String(meta.stars ?? 0) },
  ].filter((r) => r.v)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(meta.clone)
      setCopied(true)
      track('copy_clone', { repo: meta.name })
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Sin permiso de portapapeles el comando sigue a la vista para copiarlo a mano.
    }
  }

  return (
    <div className="mt-10">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {rows.map((r) => (
          <div key={r.k} className="bg-surface p-5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{r.k}</dt>
            <dd className="mt-2 text-pretty font-grotesk font-semibold leading-snug text-fg">{r.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-line bg-[#0B0D17] py-2 pl-5 pr-2 text-white">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs text-white/85 md:text-sm">
          <span className="select-none text-santi">$ </span>
          {meta.clone}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Comando copiado' : 'Copiar el comando de clonado'}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          {copied ? <Check aria-hidden className="h-3.5 w-3.5" /> : <Copy aria-hidden className="h-3.5 w-3.5" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      {meta.tags?.length > 0 && (
        <ul className="mt-5 flex flex-wrap items-center gap-3" aria-label="Tecnologías y temas">
          {meta.tags.map((t) => (
            <li key={t} className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
