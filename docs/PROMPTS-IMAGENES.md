# Prompts para generar el arte del portafolio

Dirección elegida: **oscuro cinematográfico** — la línea de flyhyer, melius y el
concepto 3D de Webflow. Fondo casi negro, formas 3D abstractas, luz dramática
azul, mucho vacío.

Dos reglas que sostienen todo:

1. **Ninguna imagen lleva texto ni logos.** El texto lo pone el sitio con
   tipografía real — es lo que Google lee y lo que se ve nítido en cualquier
   pantalla. Una imagen con letras dentro se ve borrosa y no posiciona.
2. **El fondo es oscuro; el color lo pone el objeto.** Esto sale de tus
   referencias (Voyager2, Glow In The Dark, ChainGPT): el lienzo es negro, pero
   cada pieza 3D tiene su propio color saturado. Es lo que hace que la grilla de
   casos se lea como ocho proyectos distintos y no como ocho variantes de lo
   mismo. Cada caso de abajo trae su color asignado.

---

## Enfoque: objeto conceptual, no mockup literal

Se probaron dos caminos y los dos fallaron por razones distintas.

El primero pedía esculturas abstractas de vidrio sin relación con el proyecto:
no decían nada de lo que se hizo, y las ocho quedaban intercambiables entre sí
con solo cambiarles el color.

El segundo — capturas reales bloqueadas dentro de un prompt ("usá este
screenshot exacto, no lo redibujes") — falla en la práctica: el modelo
deforma la interfaz igual, inventa texto donde no lo pedís o directamente
alucina la pantalla. Con una UI real de por medio el resultado nunca es fiel,
y una captura deformada es peor que no tener imagen.

**El punto medio es el que queda: un objeto o escena que representa lo que
hace el proyecto, sin ser una maqueta de su pantalla.** Para Lumi eso es un
pulso, una racha, una presencia que escucha — no el teléfono con el chat
adentro. Para un caso de e-commerce puede ser el objeto que se vende, no la
ficha de producto. La regla de fondo es la misma que ya regía para Asignar
(el único caso que siempre fue abstracto, por no tener capturas que mostrar):
ninguna imagen inventa una pantalla, un producto o un dato que no existe, pero
tampoco intenta reproducir uno real al pixel.

## El resto del prompt

Después del bloqueo van, en este orden: **escena** (cómo se disponen las piezas
en el espacio), **iluminación** (posición, dureza y proporción key/fill, con el
color del caso), **fondo** (negro `#06070D`, vacío, sin piso ni escritorio),
**cámara** (lente, altura, qué fracción del cuadro ocupa y qué zona queda vacía
para el texto), y **estilo** (grado cinematográfico, negros hundidos, grano fino).

Los prompts completos de los cuatro primeros casos están en el chat de la sesión.

## Colores por caso

El color va en la iluminación de cada escena, y es el mismo que usa el código en
`src/data.js` (campo `accent`), para que el arte y la escena de respaldo no se
peleen:

| Caso | Color |
|---|---|
| Lumi | ámbar `#FF6B35` |
| Bio Laboratorios | verde esmeralda `#00E08A` |
| BLU Smartphones | cian eléctrico `#00C2FF` |
| Nona Gastro Bar | rojo vino `#FF2D55` |
| Limonada Pink | magenta `#FF3D8B` |
| AIISO Consulting | índigo `#6B4CFF` |
| GrowthBro | verde lima `#A3FF3D` |
| Asignar | cian frío `#00D4FF` |

**Asignar sigue siendo el más abstracto de los ocho**, porque además de no
mostrar UI es un caso abierto sin cifras — vos mismo lo contás así. Los demás
sí pueden apoyarse en un objeto reconocible del rubro (una prenda, un plato,
un frasco), aunque ninguno reproduzca una pantalla real.

## El piso: arte dibujado por caso

Mientras no haya arte generado, cada caso **ya tiene** su propia escena dibujada
en `src/components/CaseArt.jsx`: Bio Laboratorios es una tienda con su curva de
ventas, Limonada Pink es un brand book abierto, Asignar es un embudo. No son
manchas de relleno — dicen qué tipo de entregable fue el proyecto, que es lo que
un visitante necesita saber en la grilla antes de leer un título.

Eso cambia el rol de las imágenes generadas: dejan de ser urgentes. La grilla ya
se entiende sin ellas. Cuando llegue el arte real, reemplaza al dibujado caso por
caso, sin tener que subirlos todos a la vez.

## Formatos y rutas

Los archivos van en `public/img/casos/` con el nombre del slug. No hace falta que
coincidan con una proporción concreta: el componente se adapta.

| Campo en `src/data.js` | Para qué |
|---|---|
| `cover` | ruta de la imagen |
| `coverRatio` | proporción del slot, si el arte no es 16/10 (ej. `aspect-[3/4]`) |
| `coverFit: 'contain'` | no recortar; el arte se centra sobre el fondo oscuro |
| `coverAlt` | texto alternativo |
| `video` + `poster` | bucle mudo; tiene prioridad sobre `cover` |

Si la imagen no carga, la tarjeta cae sola a la escena generativa: se puede
referenciar el arte antes de que el archivo exista.

## Modo claro

Todo el arte está compuesto sobre negro. En modo claro no se disimula: la
portada se trata como una foto enmarcada — fondo oscuro deliberado, anillo y
sombra, para que se lea como una pieza sobre papel y no como un agujero.

## Cómo subir los archivos

1. Guardá cada imagen como `public/img/casos/<slug>.png`.
2. Corré `npm run images` para generar `.webp` y `.avif`.
3. Agregá `cover: '/img/casos/<slug>.png'` al caso en `src/data.js` — con eso
   la imagen pisa al arte dibujado.

Si una ruta apunta a un archivo que todavía no existe, la tarjeta cae sola al
arte de `CaseArt`, así que no se rompe nada; pero conviene no dejar rutas
muertas, porque cada una cuesta un request fallido por tarjeta.
