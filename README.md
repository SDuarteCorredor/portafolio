# Portafolio — Iván Santiago Duarte

Sitio personal de **Iván Santiago Duarte** — Especialista en Marketing Digital, diseño y producto con IA.

Marketing que se vuelve resultado: estrategia, Google & Meta Ads, SEO, e-commerce, branding y desarrollo de productos digitales con IA.

## Stack

- **React 18 + Vite** — frontend
- **React Router + prerender estático** — 19 URLs, cada una servida como HTML completo
- **Tailwind CSS** — estilos
- **Framer Motion** — animaciones
- **Lenis** — scroll suave
- Tipografía: Bricolage Grotesque · Instrument Serif · Instrument Sans
- Color firma: **Santiago Blue** `#1B3CFF`

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build + prerender de las 19 rutas + auditoría SEO
npm run audit    # solo la auditoría sobre el dist/ actual
npm run preview  # sirve el dist/ para revisarlo
```

## SEO

El sitio se genera como HTML estático por ruta, con título, descripción,
canonical y datos estructurados propios de cada página. `npm run build` corre
una auditoría que falla si algo se rompe (títulos duplicados, más de un H1,
URLs con conectores, imágenes sin alt…).

Falta configurar dos variables de entorno en Vercel — `VITE_GA4_ID` y
`VITE_GSC_VERIFICATION`. El paso a paso, junto con el mapa de dónde vive cada
decisión de posicionamiento, está en **[SEO.md](./SEO.md)**.

## Deploy

Pensado para desplegarse en **Vercel** (framework detectado: Vite). El dominio final es [ivansantiagoduarte.com](https://ivansantiagoduarte.com).

---

Hecho con Claude Code.
