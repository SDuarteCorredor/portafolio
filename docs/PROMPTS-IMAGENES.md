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

## Enfoque: escenificar tu trabajo, no inventarlo

La primera versión de este documento pedía esculturas abstractas de vidrio. Era
un error: esas imágenes no decían nada de lo que hiciste, y peor, generar "una
app de bienestar" desde cero significa mostrar pantallas que no son tuyas.
Alguien abre el link de Lumi o tu Behance y no coincide nada.

**El modelo no genera el trabajo: solo arma la escena alrededor del tuyo.** Vos
subís capturas reales y el prompt las bloquea explícitamente.

La primera línea de cada prompt es la que importa:

```
Use the attached screenshots EXACTLY as they are. Do not redraw, regenerate,
restyle, translate or alter anything inside them — no changing text, no inventing
UI elements, no re-rendering icons. Treat each screenshot as a flat,
unmodifiable texture to be placed in the scene.
```

Sin eso, nanobanana te "mejora" las capturas: reescribe el texto de la interfaz,
inventa productos, cambia la tipografía. Termina siendo trabajo que no existe.

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

**Asignar es la excepción y sí va abstracto.** Es un caso abierto, sin enlace
público ni cifras — vos mismo lo contás así. No hay assets que mostrar, y una
escena abstracta ahí es honesta.

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
3. Commit al branch `claude/portfolio-dynamic-animations-two1t8`.
