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

## 1. Bloque base — pegalo SIEMPRE al principio

Esto es lo que hace que las 8 portadas parezcan de la misma marca y no ocho
imágenes sueltas. No lo edites entre una y otra.

```
Cinematic 3D render, abstract sculptural form, isolated on a near-black
background (#06070D). The object is lit from within and from its edges in
[COLOR], glowing intensely against the darkness. Materials: frosted glass,
brushed dark metal, liquid chrome. Subtle volumetric haze, deep shadows,
very high contrast, generous empty space around the subject.
85mm lens, shallow depth of field, studio product photography, photorealistic,
octane render, 8k, sharp detail.

Negative: no text, no letters, no logos, no watermarks, no people, no faces,
no clutter, no busy background, no stock-3D look, no floating cubes,
background must stay near-black.
```

> `[COLOR]` se reemplaza por el color que trae cada pieza más abajo. Es lo
> único que cambia del bloque base entre una imagen y otra.
>
> En **nanobanana** va todo junto en el campo de prompt; el bloque `Negative:`
> se pasa aparte si el modelo tiene campo de negativos.
> En **ChatGPT / DALL·E** no hay campo de negativos: dejá el `Negative:` dentro
> del prompt tal cual, funciona igual.

---

## 2. Hero — la pieza principal

**Archivo:** `public/img/hero/objeto-3d.png` · **Formato:** 1:1, mínimo 2000×2000

**Color:** azul de marca `#1B3CFF` — el hero es lo único que se queda en el azul
del sitio, porque es el marco de todo lo demás.

```
[BLOQUE BASE con COLOR = electric blue #1B3CFF] +

Subject: a single large sculptural ribbon twisting through space like a
Möbius strip, made of thick frosted glass with a core of liquid chrome.
An intense blue light travels along the inside of the ribbon, glowing
through the frosted surface from within. The form floats, weightless,
centered with wide empty space around it. Nothing else in frame.
```

**Importante:** pedila sobre **fondo negro puro**, no transparente. El sitio la
compone con `mix-blend-mode: screen`, que hace desaparecer el negro
automáticamente — queda flotando sobre la escena WebGL sin necesidad de PNG con
alfa (que estos modelos suelen hacer mal).

---

## 3. Las 8 portadas de casos

Todas: **16:10, mínimo 2400×1500.** Cada una lleva el bloque base + su sujeto.

### Lumi — `public/img/casos/lumi.png`
**Color: ámbar `#FF6B35`** — el naranja oficial de la marca.
```
[BLOQUE BASE con COLOR = warm amber #FF6B35] +

Subject: a soft glowing orb of warm amber light suspended inside a shell of
frosted glass, pulsing gently from within like a slow heartbeat. Concentric
faint rings of light radiate outward and fade into the darkness.
```

### Bio Laboratorios — `public/img/casos/bio-laboratorios.png`
**Color: verde esmeralda `#00E08A`** — laboratorio y crecimiento.
Crecimiento, sin caer en el gráfico de barras literal.
```
[BLOQUE BASE con COLOR = emerald green #00E08A] +

Subject: seven thin laminae of frosted glass stacked in an ascending
staircase formation, each plate slightly higher and noticeably brighter than
the one before, the topmost glowing intensely blue from its edge.
```

### BLU Smartphones — `public/img/casos/blu-smartphones.png`
**Color: cian eléctrico `#00C2FF`** — el nombre de la marca manda.
```
[BLOQUE BASE con COLOR = electric cyan #00C2FF] +

Subject: three obsidian glass slabs with rounded corners floating in a
staggered diagonal formation, edges catching sharp blue rim light, faint
reflections of each other on their polished dark surfaces.
```

### Nona Gastro Bar — `public/img/casos/nona-gastro-bar.png`
**Color: rojo vino `#FF2D55`** — gastronomía, sin fotos de comida.
La mesa, abstraída. Nada de comida literal.
```
[BLOQUE BASE con COLOR = deep wine red #FF2D55] +

Subject: a perfect circular disc of polished dark metal seen at a low angle,
with liquid chrome rippling outward from its center in slow concentric waves,
catching blue light on the crests of each ripple.
```

### Limonada Pink — `public/img/casos/limonada-pink.png`
**Color: magenta `#FF3D8B`** — está en el nombre.
```
[BLOQUE BASE con COLOR = vivid magenta #FF3D8B] +

Subject: a long ribbon of frosted glass twisting like a spiral, with a vivid
magenta-pink light running through its core and bleeding softly through the
frosted surface.
```

### AIISO Consulting — `public/img/casos/aiiso-consulting.png`
**Color: índigo `#6B4CFF`**.
```
[BLOQUE BASE con COLOR = deep indigo #6B4CFF] +

Subject: three angular monoliths of brushed dark metal interlocking to form a
freestanding arch, blue light spilling through the narrow gaps between them,
architectural and solid.
```

### GrowthBro — `public/img/casos/growthbro.png`
**Color: verde lima `#A3FF3D`** — growth, literal pero efectivo.
```
[BLOQUE BASE con COLOR = lime green #A3FF3D] +

Subject: a constellation of small glowing nodes connected by impossibly thin
metal rods forming an irregular three-dimensional network, one central node
burning far brighter than the rest.
```

### Asignar — `public/img/casos/asignar.png`
**Color: cian frío `#00D4FF`**.
Caso abierto: la forma queda deliberadamente incompleta.
```
[BLOQUE BASE con COLOR = cool cyan #00D4FF] +

Subject: a funnel formed by concentric rings of frosted glass narrowing
downward, blue light descending through them. The lowest rings dissolve into
fine particles, unfinished, trailing off into darkness.
```

---

## 4. Retrato del perfil — `public/img/perfil/retrato-cinematografico.png`

Este **no** se genera: es tu foto real. Lo que se genera es el tratamiento.
Subí tu retrato actual (`public/img/ivan-santiago-duarte-retrato-profesional.png`)
y pedí edición, no creación:

```
Edit this portrait: keep the face and the person exactly as they are, do not
alter the features. Relight the scene as dramatic studio photography — a
single hard rim light in electric blue (#1B3CFF) from behind the left
shoulder, deep shadow filling the right side, near-black background (#06070D).
Cinematic color grade, high contrast, subtle film grain.

Negative: do not change the face, no beautification, no new features.
```

> Ojo con esto: si el modelo te cambia la cara, descartala. Una foto tuya que
> no sos vos hace más daño que una foto plana.

---

## 5. Servicios (opcional, para después)

Seis piezas cuadradas 1:1, 1200×1200. **Estas sí van todas en azul `#1B3CFF`**:
van chicas y en fila, y ahí la unidad pesa más que la distinción. El color por
pieza es para los casos, donde cada proyecto tiene que separarse del de al lado.

| Servicio | Sujeto (todos con COLOR = electric blue #1B3CFF) |
|---|---|
| Estrategia | `a compass rose carved from frosted glass, one arm glowing blue` |
| Google & Meta Ads | `two concentric glass rings orbiting a bright blue core, locked in alignment` |
| SEO / SEM | `a glass magnifier lens focusing a beam of blue light into a single sharp point` |
| E-commerce | `a cube of frosted glass opening along one edge, blue light escaping from inside` |
| Branding | `an irregular polished metal seal or medallion, blue light raking across its relief` |
| Producto con IA | `a dense cluster of tiny glowing nodes condensing into a single solid glass form` |

---

## 6. Cómo me las pasás

1. Guardá cada archivo con **exactamente** el nombre y la ruta de arriba.
2. Corré `npm run images` — genera `.webp` y `.avif` automáticamente, que es lo
   que hace que pesen poco sin verse mal.
3. Yo las conecto en `src/data.js` (campos `cover`, `video`, `poster`, ya
   documentados ahí).

Si alguna no te convence, mandámela igual y la ajusto: casi siempre se arregla
cambiando una sola línea del sujeto, no el bloque base.

---

## 7. Video (Veo) — solo si querés, después

El sitio ya acepta video en las tarjetas (campo `video`, tiene prioridad sobre
`cover`). Sirve para Lumi, que es el caso destacado:

```
Slow cinematic orbit around a glowing amber orb suspended inside frosted
glass, pulsing gently. Near-black background, volumetric haze, shallow depth
of field. Extremely slow camera movement, seamless loop, no cuts, no text.
```

Duración 4–6 segundos, mudo, y pasámelo en `.mp4`. Generá además un fotograma
suelto como `poster` para que se vea algo mientras el video carga.
