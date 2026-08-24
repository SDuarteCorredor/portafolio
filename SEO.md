# SEO — cómo está montado y qué hacer para mantenerlo

Este documento explica dónde vive cada decisión de posicionamiento, qué hay que
configurar a mano una sola vez, y cómo agregar contenido sin romper nada.

---

## 1. Arquitectura

El sitio era una sola página con anclas (`#trabajo`, `#servicios`). Ahora son
**19 URLs reales**, cada una con su propio título, descripción, H1 y datos
estructurados. El HTML se genera **en tiempo de build**, no en el navegador:

```
npm run build
  ├─ build:client   vite build            → dist/ (JS, CSS, plantilla HTML)
  ├─ build:ssr      vite build --ssr      → .ssg/entry-server.js
  ├─ prerender      scripts/prerender.mjs → un index.html por ruta
  │                                         + sitemap.xml, robots.txt, llms.txt
  └─ audit          scripts/audit-seo.mjs → valida el HTML publicado
```

Por qué prerender y no una SPA normal: en una SPA los metadatos se inyectan con
JavaScript, y Google los indexa tarde y mal — las redes sociales directamente no
los leen. Acá el crawler recibe el `<title>`, el canonical y el JSON-LD en el
primer byte de la respuesta. Al navegar dentro del sitio, `src/seo/useHead.js`
mantiene el `<head>` sincronizado sin recargar.

### Mapa de URLs

| Cluster | URLs |
|---|---|
| Raíz | `/` |
| Servicios | `/servicios/` + `google-ads`, `meta-ads`, `seo-sem`, `ecommerce`, `branding`, `producto-ia` |
| Trabajo | `/trabajo/` + `lumi`, `bio-laboratorios`, `blu-smartphones`, `nona-gastro-bar`, `limonada-pink`, `aiiso-consulting`, `growthbro`, `asignar` |
| Sueltas | `/perfil/`, `/contacto/` |

Ninguna ruta tiene números ni conectores (`de`, `y`, `con`, `para`…). El
auditor lo verifica en cada build, así que no se puede publicar una URL que
incumpla la regla.

---

## 2. Configuración manual — lo único que falta

Dos variables de entorno. Sin ellas el sitio funciona igual, pero no mide nada.

### GA4

1. Google Analytics → **Administrar → Flujos de datos → Web** → copiar el
   *Measurement ID* (`G-XXXXXXXXXX`).
2. Vercel → tu proyecto → **Settings → Environment Variables**:
   - Nombre: `VITE_GA4_ID`
   - Valor: el `G-…`
   - Entorno: **Production** (dejarla fuera de Preview evita que las pruebas
     ensucien los datos reales).
3. Redesplegar. La variable se lee en tiempo de build, así que un cambio no
   toma efecto hasta el siguiente deploy.

Ya quedan implementados y listos para marcar como conversión en GA4:

| Evento | Cuándo se dispara |
|---|---|
| `page_view` | En cada cambio de ruta (manual, porque en una SPA el automático solo cuenta la primera carga) |
| `contact_whatsapp` | Cualquier clic a WhatsApp, con `cta_location` para saber desde qué bloque |
| `contact_email` | Clic al correo |
| `cta_click` | Botones y tarjetas internas |
| `share` | Compartir, con `method`: `web_share_api`, `copy_link`, `whatsapp`, `linkedin`, `x`, `facebook`, `email` |
| `outbound_click` | Salidas a Behance, LinkedIn o sitios de cliente |
| `faq_open` | Apertura de una pregunta frecuente — revela qué duda pesa más |
| `scroll_depth` | Hitos de 25 / 50 / 75 / 90 % |

Consent Mode v2 arranca con publicidad denegada y analítica permitida. Si algún
día se agrega un banner de cookies, se conecta llamando a `updateConsent(true)`
desde `src/seo/analytics.js`.

### Search Console

1. Search Console → **Añadir propiedad → Prefijo de URL** →
   `https://ivansantiagoduarte.com` → método **Etiqueta HTML**.
2. Copiar **solo el valor del atributo `content`**, no la etiqueta entera.
3. Vercel → `VITE_GSC_VERIFICATION` = ese valor → redesplegar.
4. Volver a Search Console y pulsar **Verificar**.
5. **Sitemaps → Añadir sitemap** → escribir `sitemap.xml` → Enviar.

El sitemap está en `https://ivansantiagoduarte.com/sitemap.xml` y también
declarado en `robots.txt`, que es como Google lo descubre sin que nadie lo envíe.

> Alternativa más robusta: verificar por **dominio** (registro TXT en el DNS).
> Cubre `http`, `https`, `www` y subdominios de una sola vez, y no depende de
> que la etiqueta siga en el HTML.

---

## 3. Dónde está implementado cada punto

| # | Punto | Dónde |
|---|---|---|
| 1 | Metatítulos distintos | `metaTitle` en `src/content/*.js` → `src/seo/head.js` |
| 2 | LLMS.txt | `scripts/prerender.mjs` → `/llms.txt` y `/llms-full.txt` |
| 3 | Metadescripciones distintas | `metaDescription` en `src/content/*.js` |
| 4 | CTA fijo en móvil | `src/components/MobileCta.jsx` |
| 5 | Un solo H1 por página | `ContentPage.jsx` y `Hero.jsx`; verificado en el auditor |
| 6 | Botón para compartir | `src/components/ShareButton.jsx` |
| 7 | GA4 | `src/seo/analytics.js` |
| 8 | H1 distinto del metatítulo | Campo `h1` separado de `metaTitle`; el auditor los compara |
| 9 | GSC | `VITE_GSC_VERIFICATION` en `src/seo/head.js` |
| 10 | Intención de búsqueda | `intent` en el contenido → `src/components/page/SearchIntent.jsx` |
| 11 | Sitemap | `scripts/prerender.mjs` |
| 12 | TL;DR / Key takeaways | `tldr` → `src/components/page/Tldr.jsx` |
| 13 | Sitemap en GSC | Declarado en `robots.txt`; el envío es el paso 5 de arriba |
| 14 | TL;DR después de intención | Orden fijado en `ContentPage.jsx`; el auditor compara posiciones en el DOM |
| 15 | CTA tras el primer párrafo | `src/components/page/InlineCta.jsx` |
| 16 | Estructura H1/H2/H3 | `ContentPage.jsx`; el auditor detecta saltos de nivel |
| 17 | Interlinkeado y clusters | `Breadcrumbs`, `Related`, `ClusterHub`, `SiteFooter`, `Linkify` |
| 18 | Tablas y listas | `src/components/page/Prose.jsx` |
| 19 | Schema de FAQ | `faqSchema()` en `src/seo/schema.js` + `Faq.jsx` |
| 20 | Nombres a imágenes | `public/img/`, `public/og/`; el auditor rechaza espacios y mayúsculas |
| 21 | Alt text | Campo `image.alt`; el auditor exige `alt` en toda `<img>` |
| 22 | Schema de negocio local | `localBusinessSchema()` en `src/seo/schema.js` |
| 23 | Robots.txt | `scripts/prerender.mjs` |
| 24 | URLs sin números ni conectores | Regla validada por el auditor |
| 25 | Desindexar `/page/` | `isPaginated()` + meta `noindex,follow` + `X-Robots-Tag` en `vercel.json` + exclusión del sitemap |

---

## 4. Agregar una página nueva

1. Abrir el archivo de contenido que corresponda (`core.js`, `servicios.js` o
   `trabajo.js`) y añadir un objeto siguiendo `src/content/SCHEMA.md`.
2. `npm run og` para generar su imagen social.
3. `npm run build`.

El auditor falla el build si el título está duplicado, si hay más de un H1, si
la URL lleva un conector, si falta un `alt` o si el TL;DR quedó antes de la
intención. No hace falta acordarse de las reglas: el build las recuerda.

Para enlazar a otra página desde el cuerpo, basta escribir la ruta en el texto
(`… lo explico en /servicios/seo-sem/`): `Linkify` la convierte en enlace real
con la etiqueta correcta, y solo si esa ruta existe.

---

## 5. Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo en `localhost:5173` |
| `npm run build` | Build completo + prerender + auditoría |
| `npm run audit` | Solo la auditoría sobre el `dist/` actual |
| `npm run og` | Regenera las imágenes Open Graph |
| `npm run images` | Recomprime las fotos de `public/img/` a AVIF y WebP |
| `npm run preview` | Sirve el `dist/` para revisarlo antes de desplegar |

---

## 6. Qué queda fuera del código

- **Enviar el sitemap** en Search Console (paso 5 de la sección 2).
- **Google Business Profile**: el schema de negocio local ya está, pero para
  búsquedas del tipo «marketing digital cerca de mí» hace falta la ficha real.
- **Backlinks**: ninguna optimización on-page reemplaza que otros sitios te
  enlacen.
- **Revisar Search Console a las 2–4 semanas**: ahí se ve qué consultas están
  entrando de verdad, y con eso se ajustan los `intent` de cada página.
