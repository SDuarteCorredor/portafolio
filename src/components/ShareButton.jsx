import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { absUrl } from '../seo/site'
import { trackShare } from '../seo/analytics'

// Punto 6 — Botón para compartir.
// Usa la Web Share API nativa cuando existe (móvil y Safari), y si no,
// despliega un menú con las redes que importan aquí + copiar enlace.

function Icon({ d, ...rest }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...rest}>
      {d}
    </svg>
  )
}

const icons = {
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></>,
  copy: <><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>,
  check: <path d="M20 6L9 17l-5-5" />,
}

export function ShareButton({ page, className = '', variant = 'ghost' }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hasNative, setHasNative] = useState(false)

  const url = absUrl(page.path)
  const title = page.metaTitle
  const text = page.metaDescription

  useEffect(() => {
    setHasNative(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => !e.target.closest('[data-share-root]') && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [open])

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text, url })
      trackShare('web_share_api', page.path)
    } catch {
      // El usuario canceló el diálogo — no es un error que valga la pena mostrar.
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Fallback para navegadores sin permiso de portapapeles.
      const ta = document.createElement('textarea')
      ta.value = url
      ta.setAttribute('readonly', '')
      ta.style.position = 'absolute'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    trackShare('copy_link', page.path)
    setTimeout(() => setCopied(false), 2000)
  }

  const targets = [
    { id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { id: 'linkedin', label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { id: 'x', label: 'X', href: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { id: 'facebook', label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { id: 'email', label: 'Correo', href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}` },
  ]

  const base =
    variant === 'blue'
      ? 'btn-blue !py-2.5 !px-5 text-sm'
      : 'inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-grotesk text-sm text-fg transition-colors duration-300 hover:border-santi hover:text-santi'

  return (
    <div data-share-root className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => (hasNative ? nativeShare() : setOpen((o) => !o))}
        aria-label={`Compartir: ${title}`}
        aria-expanded={hasNative ? undefined : open}
        aria-haspopup={hasNative ? undefined : 'menu'}
        className={base}
      >
        <Icon d={icons.share} />
        Compartir
      </button>

      <AnimatePresence>
        {open && !hasNative && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-2xl shadow-black/10 backdrop-blur-xl"
          >
            {targets.map((t) => (
              <a
                key={t.id}
                role="menuitem"
                href={t.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => { trackShare(t.id, page.path); setOpen(false) }}
                className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-fg transition-colors hover:bg-fg/[0.06] hover:text-santi"
              >
                {t.label}
                <span className="text-xs text-muted">↗</span>
              </a>
            ))}

            <button
              type="button"
              role="menuitem"
              onClick={copy}
              className="mt-1 flex w-full items-center justify-between rounded-xl border-t border-line px-3.5 py-2.5 text-sm text-fg transition-colors hover:bg-fg/[0.06] hover:text-santi"
            >
              {copied ? 'Enlace copiado' : 'Copiar enlace'}
              <Icon d={copied ? icons.check : icons.copy} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
