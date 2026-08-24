import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data'
import { trackWhatsapp, trackCta } from '../seo/analytics'

// Punto 4 — CTA fijo en móvil.
// Barra inferior persistente que aparece cuando el usuario pasó el primer
// pliegue (donde ya está el CTA del hero, así no se duplican) y se esconde al
// llegar al pie, para no tapar los datos de contacto reales.

export function MobileCta({ page }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const doc = document.documentElement
      const nearBottom = y + window.innerHeight > doc.scrollHeight - 260
      setVisible(y > 520 && !nearBottom)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // En /contacto/ sobra: la página entera ya es el CTA.
  if (page?.path === '/contacto/') return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/92 backdrop-blur-xl md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-grotesk text-sm font-semibold leading-tight text-fg">
                ¿Hacemos crecer tu marca?
              </p>
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                Respondo el mismo día
              </p>
            </div>

            <Link
              to="/contacto/"
              onClick={() => trackCta('Contacto', 'mobile_sticky')}
              className="shrink-0 rounded-full border border-line px-4 py-2.5 font-grotesk text-sm font-medium text-fg"
            >
              Contacto
            </Link>

            <a
              href={profile.whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsapp('mobile_sticky')}
              className="shrink-0 rounded-full bg-santi px-5 py-2.5 font-grotesk text-sm font-semibold text-white"
            >
              Hablemos
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
