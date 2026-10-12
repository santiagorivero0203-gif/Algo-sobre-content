---
name: remotion-motion-design
description: Crea reels/videos de motion graphics con Remotion para Santi.Dev (1080x1920, 60fps): tipografía cinética, cámara virtual, cadencia de lectura adaptativa, escenas dirigidas por datos (Zod) y guion de locución. Úsala cuando el usuario pida un video, reel o animación con Remotion, o quiera un nuevo reel a partir de contenido existente.
---

# Remotion Motion Design · Santi.Dev

Complementa (no sustituye) las skills oficiales `remotion-best-practices` y `remotion-markup`. Léelas para la API; esta define **cómo diseñamos y estructuramos** los reels.

Implementación de referencia: `remotion-test/` (reel `TokensProReel`). **Reutilízala: un reel nuevo = un archivo de datos, no código nuevo.**

## 1. Flujo para un reel nuevo
1. Partir del contenido (ej. un `reel_*` de `js/reels.js`). Escribir `src/data/<nombre>.ts` tipado como `ReelProps` (ver `src/data/tokensPro.ts`).
2. Registrar en `src/Root.tsx` una `<Composition>` con `component={Reel}`, `schema={ReelPropsSchema}`, `defaultProps`, 1080×1920, 60 fps y `calculateMetadata` (duración = `totalDuration(buildTimeline(...))`).
3. `npx tsc --noEmit` → `npx remotion still src/index.ts <Id> out/x.png --frame=N` en una escena de cada tipo → render.
4. Registrar lo hecho en `docs/registro_historico_remotion.md`.

## 2. Contrato de datos (`src/lib/schema.ts`)
Escenas: `hero` (gancho) · `points` (1–4 pasos numerados) · `code` (terminal) · `compare` (contador antes/después + 2 franjas) · `cta` (palabra clave).
Todas llevan `badge`, `title` (con `*acento*`), `sub?` y **`vo`** (guion que el creador narra encima).
Marcas: `santidev | mova | endo | girastock` en `src/lib/theme.ts` (cambiar de marca = cambiar `brand`).

## 3. Reglas de movimiento
- **Determinismo**: solo `useCurrentFrame()`. Prohibido `Math.random`, `Date.now`, CSS `transition`/`animation`.
- **Resortes** subamortiguados, ζ = damping / (2·√(stiffness·mass)) ∈ [0.72, 0.98]:

| Uso | damping | stiffness | mass |
|---|---|---|---|
| Titular / texto (por defecto) | 22 | 160 | 0.8 |
| Filas, tarjetas | 20 | 140 | 0.8 |
| Subtítulos suaves | 26 | 110 | 0.8 |
| Remates con rebote (badge %, pill) | 12–14 | 150–180 | 0.8 |

- **Revelado por máscara**: cada palabra en `overflow:hidden`, `translate: 0 115%→0`; retardo por palabra = `3 + min(len,10)·0.7` fotogramas (`KineticText`).
- **Nada estático**: deriva de escala 1→1.025 en titulares, orbes con `sin(frame)`, glow pulsante, caret parpadeante por fotograma.
- Usar propiedades CSS `translate`/`scale`/`rotate` (no strings `transform`).
- **Cámara** (`CameraRig`): keyframes {x,y,z,rotation}, perspectiva 1200. **Motion blur condicionado a velocidad**: `CameraMotionBlur` multiplica el coste por `samples`; solo envolver los fotogramas donde la cámara se mueve (umbral 0.6). Entrada ~20 f, salida ~10 f.
- `<Sequence premountFor={fps}>` en cada escena.

## 4. Cadencia adaptativa (`src/lib/cadence.ts`)
`D = FPS · max(1.8 s, 0.55 + 60·W/210 + 0.045·S·C + 0.75)` (W palabras, S sílabas, C=1.25 en código/jerga).
**Ampliación**: la escena dura `max(lectura en pantalla, locución del vo a 165 WPM)`. Nunca acortar una escena por debajo de lo que tarda en decirse su `vo`.

## 5. Reglas editoriales (AGENTS.md)
- Autoconclusivo: cada término técnico se justifica con su beneficio en una frase.
- Orden: **hook → estrategia → código/demo → CTA**; un solo foco por video.
- Escaneable en 3 s: titulares cortos con `*énfasis*`, máx. 2–3 líneas por texto. Información útil en pantalla + detalle en el `vo`.
- **Prohibido**: una caja genérica por escena, barras de audio falsas, canvas 2D plano, texto fuera de márgenes seguros (`SAFE`: top 170, bottom 260, side 80).
- Identidad: degradados luminosos de marca (esmeralda/cobalto/coral/ámbar), Space Grotesk + JetBrains Mono, acento brillante.

## 6. Audio (cuando se añada)
Pistas con `<Audio>` de `@remotion/media`, archivos en `public/` + `staticFile()`. Sincronizar picos con `getAudioData`/`visualizeAudio` (`@remotion/media-utils`): a 48 kHz y 60 fps ≈ 800 muestras por fotograma. El `vo` NO se sintetiza: lo narra el creador.

## 7. Comandos (verificados en Windows)
```bash
npx create-video@latest --yes --blank <dir>     # NO existe `npm create video -- --template blank-typescript`
npx remotion skills add                          # NO existe `npx @remotion/skills` (404)
npx remotion still src/index.ts <Id> out/a.png --frame=300
npx remotion render src/index.ts <Id> out/a.mp4 --concurrency=75% --crf=16
```
`--gl=angle` es opcional y no está probado en Windows. Si `npm install` deja `node_modules` corrupto: borrar `node_modules` + `package-lock.json` y reinstalar. Lanzar renders/installs largos en segundo plano.
