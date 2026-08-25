import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { profile } from '../data'
import { Magnetic } from './Magnetic'
import { ThemeToggle } from './ThemeToggle'
import { childrenOf } from '../content/index.js'
import { trackWhatsapp, trackCta } from '../seo/analytics'

// Navegación por rutas reales (ya no por anclas). El desplegable de servicios
// expone el cluster completo desde cualquier página del sitio — punto 17.
const links = [
  { to: '/servicios/', label: 'Servicios', cluster: true },
  { to: '/trabajo/', label: 'Trabajo' },
  { to: '/perfil/', label: 'Perfil' },
  { to: '/contacto/', label: 'Contacto' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(null)
  const { scrollYProgress } = useScroll()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Al cambiar de ruta se cierra todo lo abierto.
  useEffect(() => { setOpen(false); setMenu(null) }, [pathname])

  const bar = scrolled || open || menu
  const servicios = childrenOf('/servicios/')

  const navLinkClass = ({ isActive }) =>
    `link-underline font-grotesk text-sm transition-colors ${isActive ? 'text-fg' : 'text-muted hover:text-fg'}`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        bar ? 'backdrop-blur-md bg-bg/85 border-b border-line' : ''
      }`}
    >
      {/* Barra de progreso de scroll — firma azul */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-santi"
      />

      <nav className="container-x flex items-center justify-between py-5" aria-label="Navegación principal">
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-grotesk text-lg font-bold tracking-tight text-fg transition-colors"
          aria-label="Iván Santiago Duarte — inicio"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-santi text-white transition-transform group-hover:rotate-12">S</span>
          <span className="hidden sm:inline">santiago<span className="text-santi">.</span></span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li
              key={l.to}
              className={l.cluster ? 'relative' : undefined}
              onMouseEnter={() => l.cluster && setMenu(l.to)}
              onMouseLeave={() => l.cluster && setMenu(null)}
            >
              <NavLink to={l.to} className={navLinkClass}>{l.label}</NavLink>

              {l.cluster && menu === l.to && servicios.length > 0 && (
                <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-5">
                  <div className="overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-2xl shadow-black/10">
                    {servicios.map((s) => (
                      <Link
                        key={s.path}
                        to={s.path}
                        className="block rounded-xl px-3.5 py-2.5 font-grotesk text-sm text-fg transition-colors hover:bg-fg/[0.06] hover:text-santi"
                      >
                        {s.navLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Magnetic strength={0.4}>
            <a
              href={profile.whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsapp('nav')}
              className="btn-blue !py-2.5 !px-5"
            >
              Hablemos
            </a>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-fg"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-movil"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Menú móvil — incluye el cluster de servicios desplegado */}
      <div
        id="menu-movil"
        className={`md:hidden overflow-y-auto overscroll-contain transition-all duration-500 ${
          open ? 'max-h-[75vh]' : 'max-h-0'
        }`}
      >
        <ul className="container-x flex flex-col gap-4 pb-8 pt-2">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className="font-grotesk text-2xl text-fg">{l.label}</NavLink>

              {l.cluster && servicios.length > 0 && (
                <ul className="mt-3 space-y-2 border-l border-line pl-4">
                  {servicios.map((s) => (
                    <li key={s.path}>
                      <Link to={s.path} className="font-grotesk text-base text-muted">{s.navLabel}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <a
              href={profile.whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsapp('nav_mobile')}
              className="btn-blue mt-2 w-fit"
            >
              Hablemos
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
