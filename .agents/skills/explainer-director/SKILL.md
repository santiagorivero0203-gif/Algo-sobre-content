---
name: explainer-director
description: Orquesta videos explicativos educativos densos pero dinámicos en Remotion (55–70s @ 60 FPS) bajo estética Editorial Daylight, sincronizados por archivo único de hechos (`*-data.json`) y timestamps (`voiceover-cues.json`), con infografías minimalistas, ejemplos microscópicos animados y transición orgánica a grabación web real (`OffthreadVideo`). Usar al crear videos de apertura o cápsulas educativas de producto sin saturar la pantalla.
---

# Explainer Director · Narrativa Educativa + Editorial Daylight

Skill complementaria a [`web-promo-director`](file:///c:/Users/user/Desktop/video%20proyectos/algo/.agents/skills/web-promo-director/SKILL.md) y regida estrictamente por [`GEMINI.md`](file:///c:/Users/user/Desktop/video%20proyectos/algo/GEMINI.md). Diseñada para videos educativos de apertura (`55–70 s`) que combinan reglas reales verificables, técnicas prácticas, ejemplos microscópicos y puente natural hacia la demostración en vivo de una web.

---

## 1. Contratos Obligatorios Antes de Animar

1. **Archivo fuente único de hechos (`*-data.json`):**
   - Antes de crear componentes, guarda todas las cifras, porcentajes, tiempos, módulos, subtemas y reglas reales en un JSON verificado (ej. `simadi-data.json`).
   - Prohibido inventar estadísticas o escribir cifras distintas manualmente dentro de las escenas TSX: toda escena lee exclusivamente del JSON maestro.
2. **Archivo de timestamps y guion (`voiceover-cues.json`):**
   - Define bloques y sub-beats con `startSec`, `endSec`, `startFrame`, `endFrame` y texto exacto de locución (`vo`), calibrado primero al ritmo real de voz (`~150–160 WPM`) o alineado a transcripción JSON.
   - Todas las transiciones, revelados y cambios de foco leen sus frames desde `voiceover-cues.json`.
3. **Aislamiento estricto del repositorio:**
   - Todo recurso nuevo (audio, capturas, tipografías locales, infografías, specs) vive dentro de la carpeta dedicada del proyecto en `remotion-test/src/compositions/<Proyecto>/` y `remotion-test/public/captures/<slug>/`.
   - Prohibido alterar composiciones previas, estilos compartidos de otros videos o `remotion-test/package.json`.

---

## 2. Reglas Editoriales y de Carga Cognitiva

1. **Ritmo visual constante (`≤ 2.5 – 3.0 s` por evento):**
   - Ninguna pantalla puede permanecer congelada más de `150–180 frames` (`2.5–3.0 s` a `60 FPS`) sin un cambio de foco, avance de contador, tachado interactivo, aparición escalonada o entrada de clip real.
2. **Regla de carga cognitiva (`≤ 6–8 palabras` ancla por tarjeta/punto):**
   - La voz en off entrega la explicación completa; la pantalla muestra solo **el ancla visual**: titular grande, cifra protagonista, etiqueta breve de subtema o icono SVG de trazo limpio.
   - Máximo `2–3` bloques visuales simultáneos por escena y abundante espacio negativo.
3. **Ejemplos reales microscópicos:**
   - En lugar de listar conceptos abstractos, resuelve un caso concreto en pantalla en `2–3 s` (ej. serie numérica `2, 6, 12, 20, ? → 30` revelando diferencias `+4, +6, +8, +10`, o descarte rápido tachando opciones `A` y `C`).
4. **Progresión narrativa en 4 actos (`55–70 s`):**
   - **Acto 1 (`0–10 s`) · Gancho y peso real:** Por qué importa + cifras reales (índice, volumen, regla crítica).
   - **Acto 2 (`10–32 s`) · Estructura y temas:** Recorrido progresivo enfocando **1 módulo a la vez** mientras los demás se atenúan.
   - **Acto 3 (`32–48 s`) · Técnicas clave:** Presupuesto de tiempo y tácticas prácticas con micro-animaciones.
   - **Acto 4 (`48–65 s`) · Puente invisible a producto + CTA:** Transición por zoom desde un concepto doloroso (ej. reloj corriendo) directo a la grabación vertical viva de la web (`OffthreadVideo`) + cierre honesto y CTA al DM.

---

## 3. Estética V3 · "Editorial Daylight"

- **Lienzo sobrio y claro:** Fondo blanco papel / gris muy tenue (`#F7F8FA` / `#EFF3F8`) con gradiente suave y halo institucional tenue (`#0F52BA` al 6–8%) para que las interfaces claras brillen de forma natural sin contraste artificial oscuro.
- **Composición libre sin cajas redondeadas pesadas:**
  - Evita envolver cada idea en tarjetas con bordes gruesos o simular ventanas pesadas de navegador.
  - Usa líneas finas (`1px` hairline), espacio negativo, números grandes y el diseño real de la app fundido sobre el lienzo con sombra suave (`box-shadow` difusa).
- **Tipografía complementaria:**
  - **Titulares principales:** Sans geométrica pesada (`Plus Jakarta Sans` `700/800`, `80–110 px` en `9:16`).
  - **Palabras clave (`*resaltado*`):** Serif editorial en itálica (`Instrument Serif` italic en azul institucional `#0F52BA`) para contraste editorial inmediato sin necesidad de badges brillantes.
  - **Datos, cronómetros y etiquetas:** `JetBrains Mono` (`500/700`).
- **Protagonismo web vertical responsive:**
  - Captura las apps responsivas en viewport vertical Retina (`540×810` a `deviceScaleFactor: 2` → `1080×1620`) para que ocupen `75–85%` de la composición vertical sin desperdiciar márgenes ni comprimir textos.

---

## 4. Componentes Infográficos Maestros y Audio Editorial

1. **`SplitMetricBar`:** Proporciones animadas con `spring()` (`60% / 40%`, `45m / 45m / 45m + 15m`) con tipografía numérica protagonista.
2. **`ExamModuleCard`:** Sección única iluminada (`stagger` de subtemas cortos + slot para ejemplo microscópico vivo).
3. **`EliminationDemo`:** Simulación de pregunta real de 4 opciones (`A–D`) donde 2 distractores se atenúan y tachan al vuelo en `< 3 s`.
4. **Paleta de audio editorial/táctil (cero SFX sci-fi/RPG):**
   - Cama minimalista luminosa (`~0.08` de volumen con fade-in/out).
   - Tic-tac suave de cronómetro, paso de aire/papel ligero, clic real de trackpad en sincronía exacta con el `manifest`, toques suaves tipo madera, confirmación cálida y burbuja sutil al DM.

---

## 5. Perfil de Renderizado Master Quality (60 FPS)

Para evitar artefactos de compresión, gradientes con banding o textos borrosos en pantallas móviles:

```powershell
npx remotion render <bundle> <CompositionId> <output.mp4> `
  --image-format png `
  --codec h264 `
  --crf 15 `
  --x264-preset slow `
  --pixel-format yuv420p `
  --color-space bt709 `
  --audio-bitrate 256k `
  --concurrency 2
```

- Validar siempre `9:16` (`1080×1920`) y `4:5` (`1080×1350`) mediante `npx remotion still` previo al render completo y revisión visual de tiras multicaptura del MP4 exportado.

