import { motion } from 'framer-motion'
import { profile } from '../data'
import { Reveal } from './Reveal'
import { Magnetic } from './Magnetic'

const WORD = 'Hablemos'

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden py-20 md:py-28">
      {/* glow firma que respira */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-santi/20 blur-[100px]"
      />

      <div className="container-x text-center">
        <Reveal>
          <div className="mb-10 flex items-center justify-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(06)</span>
            <p className="eyebrow">¿Tienes una marca que hacer crecer?</p>
          </div>
        </Reveal>

        <Magnetic strength={0.18}>
          <a
            href={profile.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="group inline-block font-grotesk text-mega font-bold leading-none tracking-tightest"
          >
            {WORD.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block transition-all duration-300 hover:-translate-y-3 group-hover:text-santi"
              >
                {ch}
              </motion.span>
            ))}
            <span className="text-santi">.</span>
          </a>
        </Magnetic>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4 font-grotesk text-lg">
            <a href={`mailto:${profile.email}`} className="link-underline text-muted hover:text-fg">{profile.email}</a>
            <span className="text-fg/20">·</span>
            <a href={profile.whatsappLink} className="link-underline text-muted hover:text-fg">{profile.whatsapp}</a>
            <span className="text-fg/20">·</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline text-muted hover:text-fg">LinkedIn</a>
            <span className="text-fg/20">·</span>
            <a href={profile.behance} target="_blank" rel="noreferrer" className="link-underline text-muted hover:text-fg">Behance</a>
          </div>
        </Reveal>
      </div>

      <footer className="container-x mt-28 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted md:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="font-mono text-xs">Hecho en Bogotá · con Claude Code</span>
        <a href="#top" className="link-underline">Volver arriba ↑</a>
      </footer>
    </section>
  )
}
