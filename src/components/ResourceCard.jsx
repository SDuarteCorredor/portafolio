import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { trackCta } from '../seo/analytics'
import { accentVars } from './CaseCard'
import { Tilt } from './motion/Tilt'
import { GithubMark } from './icons/GithubMark'

// Tarjeta de un recurso de código abierto (un repo público de GitHub).
//
// Hermana de CaseCard: misma superficie, mismo color propio por tarjeta y la
// misma regla de que la tarjeta lleva a la ficha interna, no afuera. El enlace a
// GitHub vive dentro de la ficha, como el enlace al proyecto en los casos.

/**
 * Portada del recurso. Tres niveles, como CaseCover:
 *   1. `cover`        imagen propia en public/img/recursos/ (avif/webp/png)
 *   2. `remoteCover`  la primera imagen del README, servida desde GitHub
 *   3. terminal       el comando de clonado sobre el color del recurso
 * El tercero no es un relleno: un repo recién publicado sin capturas se ve
 * igual de intencional que uno con portada.
 */
export function ResourceCover({ r, ratio = 'aspect-[16/10]', className = '' }) {
  const [failed, setFailed] = useState(false)
  const base =
    `relative overflow-hidden rounded-xl bg-black ${ratio} ${className} ` +
    'border border-line ring-1 ring-black/10 shadow-[0_10px_30px_-12px_rgba(6,7,13,0.35)] dark:ring-0 dark:shadow-none'

  const alt = r.coverAlt || `Vista previa de ${r.title}, recurso de código abierto`

  if (r.cover && !failed) {
    const stem = r.cover.replace(/\.(png|jpe?g|webp)$/i, '')
    return (
      <div className={base}>
        <picture>
          <source srcSet={`${stem}.avif`} type="image/avif" />
          <source srcSet={`${stem}.webp`} type="image/webp" />
          <img
            src={r.cover}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            onError={() => setFailed(true)}
          />
        </picture>
      </div>
    )
  }

  if (r.remoteCover && !failed) {
    return (
      <div className={base}>
        <img
          src={r.remoteCover}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      </div>
    )
  }

  return (
    <div className={base} style={accentVars(r)} role="img" aria-label={alt}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(90% 80% at 80% 10%, var(--a-40), transparent 62%)' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 text-white opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div aria-hidden className="absolute inset-x-5 top-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-[#0B0D17]/85 p-4 backdrop-blur-md transition-transform duration-700 group-hover:-translate-y-[55%]">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full" style={{ background: 'var(--a)' }} />
        </div>
        <p className="truncate font-mono text-[11px] text-white/85">
          <span style={{ color: 'var(--a)' }}>$</span> git clone {r.name}
        </p>
        <p className="mt-1.5 truncate font-mono text-[11px] text-white/50">→ {r.language || 'README.md'}</p>
      </div>
    </div>
  )
}

/**
 * @param {{ r: object, source?: string, wide?: boolean }} props
 *   `wide` pone portada y texto lado a lado desde md: lo usa la grilla para la
 *   tarjeta que ocupa una fila entera.
 */
export function ResourceCard({ r, source = 'resource_card', wide = false }) {
  return (
    <Tilt max={5} className="h-full rounded-2xl" color={r.accent}>
      <Link
        to={r.path}
        onClick={() => trackCta(r.title, source)}
        style={accentVars(r)}
        className={
          'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-[color:var(--a-40)] ' +
          (wide ? 'md:flex-row md:items-stretch md:gap-6' : '')
        }
      >
        <div className={wide ? 'md:w-1/2 md:shrink-0' : ''} style={{ transform: 'translateZ(30px)' }}>
          <ResourceCover r={r} />
        </div>

        <div className={`flex flex-1 flex-col px-3 pb-2 pt-5 ${wide ? 'md:justify-center md:py-4' : ''}`}>
          <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest">
            <span className="truncate" style={{ color: 'var(--a)' }}>{r.kind}</span>
            {r.updatedAt && (
              <time dateTime={r.updatedAt} className="shrink-0 text-muted">
                {r.updatedAt.slice(0, 4)}
              </time>
            )}
          </div>

          <h3 className="mt-3 text-left font-grotesk text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            {r.title}
          </h3>

          <p className={`mt-2 text-pretty text-sm text-muted ${wide ? '' : 'flex-1'}`}>
            {wide ? r.description : r.hook}
          </p>

          {r.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologías">
              {r.tags.slice(0, 4).map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
            <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              <GithubMark className="h-3.5 w-3.5" />
              {r.license || 'Código abierto'}
              {r.stars > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star aria-hidden className="h-3 w-3" strokeWidth={2} />
                  {r.stars}
                </span>
              )}
            </span>
            <span
              className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em]"
              style={{ color: 'var(--a)' }}
            >
              Ver la ficha
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  )
}

/**
 * Grilla de recursos. A dos columnas; si el total es impar, el primero —que es
 * el destacado o el más nuevo— ocupa la fila entera en formato horizontal, así
 * ninguna fila queda coja.
 */
export function ResourceGrid({ items, source }) {
  const oddLead = items.length % 2 === 1
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((r, i) => {
        const wide = oddLead && i === 0
        return (
          <div key={r.path} className={wide ? 'md:col-span-2' : ''}>
            <ResourceCard r={r} source={source} wide={wide} />
          </div>
        )
      })}
    </div>
  )
}
