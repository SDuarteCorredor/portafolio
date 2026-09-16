import { ExternalLink } from 'lucide-react'
import { GithubMark } from '../icons/GithubMark'
import { developer, profile } from '../../data'
import { trackOutbound } from '../../seo/analytics'

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

function RepoCard({ repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackOutbound(repo.url, repo.name)}
      className="group block rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-santi/40 md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-fg/[0.04] text-fg">
            <GithubMark className="h-5 w-5" />
          </span>
          <div>
            <p className="font-grotesk text-lg font-bold text-fg">{repo.name}</p>
            {repo.meta && (
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{repo.meta}</p>
            )}
          </div>
        </div>
        <ExternalLink
          aria-hidden
          className="h-4 w-4 shrink-0 text-muted transition-colors duration-300 group-hover:text-santi"
          strokeWidth={1.75}
        />
      </div>

      <p className="mt-5 text-pretty text-muted">{repo.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {repo.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
          >
            {t}
          </span>
        ))}
        {repo.license && (
          <span className="rounded-full border border-santi/30 bg-santi/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-santi">
            {repo.license}
          </span>
        )}
      </div>
    </a>
  )
}

/** Vitrina de desarrollador dentro de /perfil/ — se inyecta vía `section.custom`. */
export function DeveloperShowcase() {
  return (
    <div className="mt-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <StackGroup title="Ya en uso" items={developer.stackNow} />
        <StackGroup title="Aprendiendo" items={developer.stackLearning} dashed />
      </div>

      <div className="mt-8 space-y-5">
        {developer.repos.map((r) => (
          <RepoCard key={r.name} repo={r} />
        ))}
      </div>

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackOutbound(profile.github, 'GitHub perfil')}
        className="btn-ghost mt-6 inline-flex items-center gap-2"
      >
        <GithubMark className="h-4 w-4" />
        Ver el perfil completo en GitHub ↗
      </a>
    </div>
  )
}
