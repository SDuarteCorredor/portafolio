// ─────────────────────────────────────────────────────────────────────────────
// GA4 (punto 7).
//
// El ID se lee de VITE_GA4_ID. Si no está definido, nada se carga y `track()`
// queda en no-op: el sitio funciona igual en local y en previews sin ensuciar
// la propiedad de producción con datos de prueba.
//
// Se envía page_view manual en cada cambio de ruta porque en una SPA el
// page_view automático de GA4 solo dispara en la carga inicial.
// ─────────────────────────────────────────────────────────────────────────────

export const GA4_ID = import.meta.env?.VITE_GA4_ID || ''
export const isAnalyticsEnabled = Boolean(GA4_ID)

let loaded = false

function gtag(...args) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

/** Inyecta gtag.js una sola vez y fija el consent mode por defecto. */
export function initAnalytics() {
  if (loaded || !isAnalyticsEnabled || typeof window === 'undefined') return
  loaded = true

  // Consent Mode v2 — por defecto se deniega publicidad y se permite analítica
  // sin cookies identificativas. Ajustable después con updateConsent().
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  })

  gtag('js', new Date())
  gtag('config', GA4_ID, {
    send_page_view: false, // lo enviamos nosotros en cada cambio de ruta
    anonymize_ip: true,
  })

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(s)
}

/** Actualiza el consentimiento (para conectar un banner de cookies después). */
export function updateConsent(granted) {
  if (!isAnalyticsEnabled) return
  gtag('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: 'granted',
  })
}

/** page_view manual — necesario en navegación SPA. */
export function trackPageView(path, title) {
  if (!isAnalyticsEnabled || typeof window === 'undefined') return
  gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  })
}

/** Evento genérico. `params` va tal cual a GA4. */
export function track(event, params = {}) {
  if (!isAnalyticsEnabled) return
  gtag('event', event, params)
}

// ── Eventos de conversión del sitio ─────────────────────────────────────────
// Nombres estables para poder marcarlos como conversión en la interfaz de GA4.

export const trackCta = (label, location) =>
  track('cta_click', { cta_label: label, cta_location: location })

export const trackWhatsapp = (location) =>
  track('contact_whatsapp', { method: 'whatsapp', cta_location: location })

export const trackEmail = (location) =>
  track('contact_email', { method: 'email', cta_location: location })

export const trackShare = (method, path) =>
  track('share', { method, content_type: 'page', item_id: path })

export const trackOutbound = (url, label) =>
  track('outbound_click', { link_url: url, link_label: label })

export const trackFaqOpen = (question, path) =>
  track('faq_open', { faq_question: question, page_path: path })

/**
 * Profundidad de scroll por hitos (25/50/75/90). GA4 trae scroll automático,
 * pero solo al 90% y solo con enhanced measurement activo; estos hitos dan
 * una lectura de consumo de contenido más útil en páginas largas.
 */
export function initScrollDepth(path) {
  if (!isAnalyticsEnabled || typeof window === 'undefined') return () => {}

  const milestones = [25, 50, 75, 90]
  const fired = new Set()

  const onScroll = () => {
    const doc = document.documentElement
    const scrollable = doc.scrollHeight - window.innerHeight
    if (scrollable <= 0) return
    const pct = (window.scrollY / scrollable) * 100
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m)
        track('scroll_depth', { percent_scrolled: m, page_path: path })
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
