import { useEffect, useState } from 'react'
import { profile } from '../data'

const links = [
  { href: '#trabajo', label: 'Trabajo' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#sobre', label: 'Sobre mí' },
  { href: '#contacto', label: 'Contacto' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-ink/70 border-b border-white/5' : ''
      }`}
    >
      <nav className="container-x flex items-center justify-between py-5">
        <a href="#top" className="group flex items-center gap-2.5 font-grotesk text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-santi text-white transition-transform group-hover:rotate-12">S</span>
          <span className="hidden sm:inline">santiago<span className="text-santi">.</span></span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline font-grotesk text-sm text-mist hover:text-paper">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-blue hidden md:inline-flex !py-2.5 !px-5">
          Hablemos
        </a>

        <button
          className="md:hidden text-paper"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-paper transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-paper transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-paper transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Menú móvil */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-80' : 'max-h-0'}`}>
        <ul className="container-x flex flex-col gap-5 pb-8 pt-2">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="font-grotesk text-2xl">
                {l.label}
              </a>
            </li>
          ))}
          <a href={profile.whatsappLink} className="btn-blue mt-2 w-fit">Hablemos</a>
        </ul>
      </div>
    </header>
  )
}
