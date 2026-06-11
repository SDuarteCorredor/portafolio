import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { profile } from '../data'
import { Magnetic } from './Magnetic'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { href: '#trabajo', label: 'Trabajo' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#sobre', label: 'Sobre mí' },
  { href: '#contacto', label: 'Contacto' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-bg/70 border-b border-line' : ''
      }`}
    >
      {/* Barra de progreso de scroll — firma azul */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-santi via-santi-glow to-santi-soft"
      />
      <nav className="container-x flex items-center justify-between py-5">
        <a href="#top" className="group flex items-center gap-2.5 font-grotesk text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-santi text-white transition-transform group-hover:rotate-12">S</span>
          <span className="hidden sm:inline">santiago<span className="text-santi">.</span></span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline font-grotesk text-sm text-muted hover:text-fg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Magnetic strength={0.4}>
            <a href={profile.whatsappLink} target="_blank" rel="noreferrer" className="btn-blue !py-2.5 !px-5">
              Hablemos
            </a>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-fg"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-fg transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-fg transition ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-fg transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
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
