import { Link } from 'react-router-dom'
import { GithubMark } from '../icons/GithubMark'
import { developer, profile } from '../../data'
import { trackOutbound, trackCta } from '../../seo/analytics'
import { resources } from '../../content/recursos.js'
import { ResourceGrid } from '../ResourceCard'

function StackGroup({ title, items, dashed = false }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((s) => (
          <span
            key={s}
            className={
              dashed
                ? 'rounded-full border border-dashed border-line px-3.5 py-1.5 text-xs text-muted'
                : 'rounded-full border border-line bg-fg/[0.04] px-3.5 py-1.5 text-xs text-fg'
            }
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Vitrina de desarrollador dentro de /perfil/ — se inyecta vía `section.custom`.
 *
 * Los repos ya no se escriben a mano en data.js: salen del mismo catálogo
 * sincronizado con GitHub que alimenta /recursos/ y la home.
 */
export function DeveloperShowcase() {
  return (
    <div className="mt-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <StackGroup title="Ya en uso" items={developer.stackNow} />
        <StackGroup title="Aprendiendo" items={developer.stackLearning} dashed />
      </div>

      {resources.length > 0 && (
        <div className="mt-8">
          <ResourceGrid items={resources} source="perfil_developer" />
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          to="/recursos/"
          onClick={() => trackCta('Ver todos los recursos', 'perfil_developer')}
          className="btn-blue inline-flex items-center gap-2"
        >
          Ver todos los recursos →
        </Link>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackOutbound(profile.github, 'GitHub perfil')}
          className="btn-ghost inline-flex items-center gap-2"
        >
          <GithubMark className="h-4 w-4" />
          Perfil en GitHub ↗
        </a>
      </div>
    </div>
  )
}
