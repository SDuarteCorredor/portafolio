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

## Movimiento y capa 3D

El sitio dejó de apoyarse solo en fundidos al hacer scroll. Piezas nuevas:

| Pieza | Archivo | Qué hace |
|---|---|---|
| Escena WebGL del hero | `src/components/webgl/auroraScene.js` | Campo de ruido simplex con *domain warping* + nube de partículas en three.js. Reacciona al mouse y al scroll. |
| Puente React | `src/components/webgl/AuroraCanvas.jsx` | Decide si vale la pena dibujar y recién ahí carga three.js con `import()`. |
| Titulares cinéticos | `src/components/motion/SplitText.jsx` | Revela letra por letra tras una máscara. Entiende la sintaxis `*acento*`. |
| Inclinación 3D | `src/components/motion/Tilt.jsx` | Perspectiva + foco de luz que sigue al cursor en tarjetas. |
| Marquee por velocidad | `src/components/motion/VelocityMarquee.jsx` | Acelera con el scroll e invierte el sentido al subir. |
| Paralaje | `src/components/motion/Parallax.jsx` | Desplaza contenido a distinta velocidad que la página. |
| Progreso de lectura | `src/components/motion/ScrollProgress.jsx` | Hilo azul superior. |
| Portadas de casos | `src/components/CaseCover.jsx` | Imagen, video o escena generativa determinista. |

### Rendimiento

`three` vive en su propio chunk (`assets/three-*.js`, ~504 KB) y **no** se precarga:
solo se descarga cuando `AuroraCanvas` decide dibujar. El bundle inicial no cambió.

No se dibuja —ni se descarga three.js— si el visitante pidió `prefers-reduced-motion`,
tiene el ahorro de datos activado, reporta menos de 4 núcleos o no consigue contexto
WebGL. En todos esos casos queda el degradado CSS `.aurora-mesh`, que ya existía.
Además la escena se pausa fuera de viewport y con la pestaña en segundo plano.

### Arte de los casos

Las tarjetas de trabajo aceptan arte propio sin tocar componentes: agregá `cover`,
`video` y `poster` al item correspondiente en `src/data.js` (los campos están
documentados ahí mismo). Mientras no haya archivo, `CaseCover` genera una escena
SVG determinista a partir del slug, así que ninguna tarjeta queda vacía y las que
todavía no tienen foto no desentonan con las que sí.
