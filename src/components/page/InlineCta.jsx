import { Link } from 'react-router-dom'
import { profile } from '../../data'
import { trackCta, trackWhatsapp, trackEmail } from '../../seo/analytics'

// Punto 15 — CTA justo después del primer párrafo.
// El lector que ya se convenció con la apertura no debería tener que bajar
// hasta el pie para actuar.

const DESTINATIONS = {
  whatsapp: { href: profile.whatsappLink, external: true, track: () => trackWhatsapp('inline_cta') },
  email: { href: `mailto:${profile.email}`, external: true, track: () => trackEmail('inline_cta') },
  linkedin: { href: profile.linkedin, external: true, track: () => trackCta('LinkedIn', 'inline_cta') },
  behance: { href: profile.behance, external: true, track: () => trackCta('Behance', 'inline_cta') },
}

export function InlineCta({ cta, note = 'Respondo el mismo día hábil.' }) {
  if (!cta) return null

  const dest = DESTINATIONS[cta.href]
  const label = cta.label

  const shell =
    'group inline-flex items-center gap-2.5 rounded-full bg-santi px-7 py-3.5 font-grotesk text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5'

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-l-2 border-santi pl-6">
      {dest ? (
        <a href={dest.href} target="_blank" rel="noreferrer" onClick={dest.track} className={shell}>
          {label}
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>
      ) : (
        <Link to={cta.href} onClick={() => trackCta(label, 'inline_cta')} className={shell}>
          {label}
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </Link>
      )}
      {note && <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{note}</span>}
    </div>
  )
}
