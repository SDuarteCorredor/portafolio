import { profile } from '../data'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden py-28 md:py-40">
      {/* glow firma */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-santi/20 blur-[140px]" />

      <div className="container-x text-center">
        <Reveal>
          <p className="eyebrow mb-10">¿Tienes una marca que hacer crecer?</p>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={profile.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="group inline-block font-grotesk text-mega font-bold leading-none tracking-tightest"
          >
            <span className="transition-colors group-hover:text-glow">Hablemos</span>
            <span className="text-santi">.</span>
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4 font-grotesk text-lg">
            <a href={`mailto:${profile.email}`} className="link-underline text-mist hover:text-paper">{profile.email}</a>
            <span className="text-white/20">·</span>
            <a href={profile.whatsappLink} className="link-underline text-mist hover:text-paper">{profile.whatsapp}</a>
            <span className="text-white/20">·</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline text-mist hover:text-paper">LinkedIn</a>
            <span className="text-white/20">·</span>
            <a href={profile.behance} target="_blank" rel="noreferrer" className="link-underline text-mist hover:text-paper">Behance</a>
          </div>
        </Reveal>
      </div>

      <footer className="container-x mt-28 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-mist md:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="font-mono text-xs">Hecho en Bogotá · con Claude Code</span>
        <a href="#top" className="link-underline">Volver arriba ↑</a>
      </footer>
    </section>
  )
}
