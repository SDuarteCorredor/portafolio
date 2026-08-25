import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { profile } from '../data'
import { trackWhatsapp, trackCta } from '../seo/analytics'
import { Reveal } from './Reveal'

const WORD = 'Hablemos'

const methods = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'WhatsApp', value: profile.whatsapp, href: profile.whatsappLink },
  { label: 'LinkedIn', value: '/in/santiagoduartec', href: profile.linkedin },
  { label: 'Behance', value: '/santiagoduartec', href: profile.behance },
]

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden py-20 md:py-28">
      {/* Glow firma que respira */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-santi/20 blur-[100px]"
      />

      <div className="container-x text-center">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(06)</span>
            <p className="eyebrow">¿Tienes una marca que hacer crecer?</p>
          </div>
        </Reveal>

        {/* Titular cinético — entrada confiable (fade del bloque) + lift por letra al hover */}
        <Reveal>
          <a
            href={profile.whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWhatsapp('contact_kinetic')}
            className="group inline-block font-grotesk text-[clamp(3rem,13vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-fg"
          >
            {WORD.split('').map((ch, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-300 hover:-translate-y-2 hover:text-santi"
              >
                {ch}
              </span>
            ))}
            <span className="text-santi">.</span>
          </a>
        </Reveal>

        {/* Métodos de contacto — el correo largo va en su propia fila */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-xl divide-y divide-line border-y border-line text-left">
            {methods.map((m) => (
              <a
                key={m.label}
                href={m.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-1 py-4 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{m.label}</span>
                <span className="inline-flex min-w-0 items-center gap-1.5 break-all font-grotesk text-fg transition-colors duration-300 group-hover:text-santi">
                  {m.value}
                  <span className="shrink-0 text-santi transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

    </section>
  )
}
