import { Link } from 'react-router-dom'
import { profile } from '../data'
import { childrenOf } from '../content/index.js'
import { trackWhatsapp, trackEmail, trackOutbound } from '../seo/analytics'

// Punto 17 — el pie es el mapa del sitio en cada página: expone los dos
// clusters completos, así ninguna página queda a más de dos clics de otra.

export function SiteFooter() {
  const servicios = childrenOf('/servicios/')
  const casos = childrenOf('/trabajo/')
  const year = new Date().getFullYear()

  const Column = ({ title, hub, items }) => (
    <div>
      <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-santi">
        <Link to={hub} className="transition-colors hover:text-fg">{title}</Link>
      </h2>
      <ul className="mt-5 space-y-2.5">
        {items.map((p) => (
          <li key={p.path}>
            <Link to={p.path} className="text-sm text-muted transition-colors hover:text-fg">
              {p.navLabel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 font-grotesk text-lg font-bold tracking-tight text-fg">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-santi text-white">S</span>
              santiago<span className="-ml-2.5 text-santi">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted">
              Marketing digital, diseño y producto con IA. Estrategia que se traduce en ventas,
              desde Bogotá para toda Latinoamérica.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={profile.whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsapp('footer')}
                className="rounded-full bg-santi px-5 py-2.5 font-grotesk text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => trackEmail('footer')}
                className="rounded-full border border-line px-5 py-2.5 font-grotesk text-sm text-fg transition-colors duration-300 hover:border-santi hover:text-santi"
              >
                Escríbeme
              </a>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid gap-10 sm:grid-cols-3">
              <Column title="Servicios" hub="/servicios/" items={servicios} />
              <Column title="Trabajo" hub="/trabajo/" items={casos} />

              <div>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-santi">Sitio</h2>
                <ul className="mt-5 space-y-2.5">
                  <li><Link to="/" className="text-sm text-muted transition-colors hover:text-fg">Inicio</Link></li>
                  <li><Link to="/perfil/" className="text-sm text-muted transition-colors hover:text-fg">Perfil</Link></li>
                  <li><Link to="/contacto/" className="text-sm text-muted transition-colors hover:text-fg">Contacto</Link></li>
                  <li>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackOutbound(profile.linkedin, 'LinkedIn')}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      LinkedIn ↗
                    </a>
                  </li>
                  <li>
                    <a
                      href={profile.behance}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackOutbound(profile.behance, 'Behance')}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      Behance ↗
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center">
          <span>© {year} {profile.name} · Bogotá, Colombia</span>
          <span className="font-mono text-xs">Hecho en Bogotá · con Claude Code</span>
        </div>
      </div>
    </footer>
  )
}
