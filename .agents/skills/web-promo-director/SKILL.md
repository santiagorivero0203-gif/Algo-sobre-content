---
name: web-promo-director
description: Orquesta de punta a punta la producción de videos promocionales de páginas web mediante inspección DOM, captura automatizada con Playwright (cursor interpolado y bounding boxes), preoptimización FFmpeg y motion graphics en Remotion a 60 FPS (1080×1920 y 1080×1350), cumpliendo estrictamente GEMINI.md y aislamiento modular.
---

# Web Promo Director · Producción de Videos Promocionales Web (60 FPS)

Skill reutilizable para convertir cualquier aplicación o página web en un video promocional de alto impacto y retención en **Remotion (`1080×1920` TikTok/Shorts y `1080×1350` Instagram Feed @ 60 FPS)**, conectando captura automatizada determinista con motion graphics basados en las reglas de [`GEMINI.md`](../../../GEMINI.md).

---

## 🎯 1. Reglas Editoriales Obligatorias (`GEMINI.md`)

1. **Contenido Autoconclusivo (Self-Contained):**
   - Cualquier espectador que descubra el video en su feed sin contexto previo debe entender en segundos: qué problema resuelve la web, cómo funciona su solución y cuál es el siguiente paso.
   - Si se menciona cualquier término técnico o funcionalidad, debe justificarse con su beneficio práctico directo en una sola frase clara.
2. **Progresión Narrativa Estricta (4 Bloques) y Un Solo Foco Temático:**
   1. **Hook:** Dolor real o pregunta que detiene el scroll desde el frame 1 (prohibido abrir con un logo estático o introducciones académicas).
   2. **Estrategia:** La lógica detrás de cómo la plataforma resuelve ese problema.
   3. **Táctica / Demo:** Demostración práctica real de la web capturada automáticamente (interacciones reales, estados poblados, cursor guiado y zoom inteligente).
   4. **CTA:** Llamado a la acción claro y comunitario.
3. **Cero Sobrecontextualización (Escaneo en 3 Segundos):**
   - Titulares cortos con énfasis mediante `*resaltado*` (compatible con `KineticText`).
   - Textos de máximo **2 a 3 líneas** por escena/slide (prohibido muros de texto).
   - Uso obligatorio de **iconografía SVG nítida, badges y esquemas visuales** acompañando las capturas reales.
4. **Fidelidad Dual y Código Documentado:**
   - Todo código nuevo (scripts de captura, helpers, tipos, escenas) debe documentar su propósito y contratos.
   - Fidelidad verificada en **`1080×1920` (9:16 TikTok/Reels/Shorts)** y **`1080×1350` (4:5 Instagram Feed)** respetando zonas seguras de ambas plataformas.

---

## 🛡️ 2. Aislamiento, Privacidad y Reutilización de Componentes

### Rutas Aisladas Obligatorias
Todo desarrollo nuevo para una web promocionada (`<slug>` / `<Name>Promo`) debe mantenerse aislado en:
- Skill reutilizable: `.agents/skills/web-promo-director/SKILL.md`
- Scripts de captura: `scripts/promo-capture/`
- Activos capturados: `remotion-test/public/captures/<slug>/`
- Composición Remotion: `remotion-test/src/compositions/<Name>Promo/`
- Registro mínimo: únicamente añadir `<Composition>` en `remotion-test/src/Root.tsx` sin modificar, renombrar ni eliminar composiciones existentes, `js/`, `index.html`, assets previos ni `remotion-test/package.json`.

### Reutilización Inteligente de Componentes Base
- **Directo desde `remotion-test/src/`:**
  - `Backdrop` (`remotion-test/src/components/Backdrop.tsx`)
  - `CameraRig` (`remotion-test/src/components/CameraRig.tsx`)
  - `KineticText` y `parseAccent` (`remotion-test/src/components/KineticText.tsx`)
  - `SceneShell` (`remotion-test/src/components/Scenes.tsx`)
  - `useSmoothSpring`, `useSnapSpring`, `useContinuousFloat`, `useContinuousDrift`, `useShake` (`remotion-test/src/pyquest/motion.ts`)
  - `PyQuestSfx` (`remotion-test/src/pyquest/sfx.tsx`) y `SoundEffect` (`remotion-test/src/trilogia/kit.tsx`)
  - `FONT_SANS`, `FONT_MONO`, `SAFE` (`remotion-test/src/lib/theme.ts`)
  - SFX reales en `remotion-test/public/sfx/` y BGM en `remotion-test/public/bgm/tech_ambient_bed.mp3`.
- **Wrappers TSX tipados para la gramática del generador web (`js/components.js` y `js/themes.js`):**
  - `CardFrame`, `TopBand`, `BottomBand`, `Slide` y `GridPattern` se adaptan mediante wrappers TSX dentro de `remotion-test/src/compositions/<Name>Promo/` sin alterar los archivos UMD originales en `js/`.

### Privacidad y Seguridad de Credenciales
- Las credenciales de prueba se leen exclusivamente desde `.env.capture` en la raíz del proyecto (verificado en `.gitignore`).
- **Nunca** escribir correos, contraseñas ni tokens en scripts, JSON (`theme.json`, `manifest.json`, `promo-spec.json`), logs, comentarios o historial.
- **Nunca** iniciar grabación durante pantallas de login o con datos personales visibles: inyectar CSS/DOM de sanitización para ocultar emails, avatares o nombres reales antes de capturar.

---

## 🔄 3. Pipeline Spec-Driven en 5 Fases

### FASE 0 · Auditoría del Repositorio
1. Leer `GEMINI.md` y verificar firmas de `CardFrame`, `Backdrop`, `TopBand`, `BottomBand`, `Slide`, `GridPattern`, utilidades en `remotion-test/src/` y SFX disponibles.
2. Confirmar disponibilidad de `playwright` (como `devDependency` en raíz), Chromium y FFmpeg (`node_modules/.bin/ffmpeg.exe`).

### FASE 1 · Contrato de la Skill
- Mantener esta guía como fuente de verdad del flujo reproducible para cualquier web futura.

### FASE 2 · Inspección Web y Contrato (`promo-spec.json`) — ⏸️ PAUSA DE APROBACIÓN
1. Ejecutar un script de inspección en `scripts/promo-capture/` con Playwright contra la URL objetivo:
   - Verificar primero sin credenciales qué sitio carga realmente (evitar enviar credenciales a un dominio incorrecto).
   - Comprobar que la app carga con datos reales y poblados (sin pantallas vacías ni errores; abortar limpiamente si hay CAPTCHA/2FA).
   - Extraer tokens computados reales (`background`, `surface`, `primary`, `accent`, `textPrimary`, `textSecondary`, `border`, `fontSans`, `fontMono`, `borderRadius`, `boxShadow`) y guardarlos en `remotion-test/public/captures/<slug>/theme.json`.
   - Identificar selectores CSS de datos personales a enmascarar antes de grabar.
2. Redactar `remotion-test/src/compositions/<Name>Promo/promo-spec.json` con el desglose escena por escena:
   - `phase` (`Hook` | `Estrategia` | `Táctica/Demo` | `CTA`)
   - `durationFrames` (`60 FPS`, total objetivo `30–40s`)
   - `title` (corto con `*resaltado*`), `copy` (máximo 2–3 líneas), `badge`, `icon`, `diagram`
   - `captureId`, `focusTarget`, `transition`, `sfx`.
3. **Pausa obligatoria:** Presentar `theme.json`, `promo-spec.json` y el plan de capturas para aprobación del usuario antes de grabar o programar escenas.

### FASE 3 · Captura Automática Determinista
Crear `scripts/promo-capture/capture-<slug>.ts`:
- `deviceScaleFactor: 2` para nitidez Retina.
- Ocultar scrollbars y elementos personales sensibles vía CSS inyectado.
- Cursor SVG personalizado con movimiento interpolado suave (curva ease-in-out, sin teletransportes).
- Capturar flujo real y screenshots clave en viewports coherentes con `1080×1920` y `1080×1350`.
- Exportar `remotion-test/public/captures/<slug>/manifest.json` con:
  - `boundingBox()` normalizados (`0` a `1`) de cada elemento foco (`x`, `y`, `width`, `height`, `centerX`, `centerY`).
  - `timestampMs` y `frame` exacto (`Math.round(ms * 0.06)`) de cada clic e interacción para sincronizar SFX.
- Preoptimizar con FFmpeg (`node_modules/.bin/ffmpeg.exe`) recortando tiempos muertos de carga y convirtiendo a `.webm` y `.webp` dentro de `remotion-test/public/captures/<slug>/`.

### FASE 4 · Composición en Remotion (60 FPS)
Construir en `remotion-test/src/compositions/<Name>Promo/`:
- Consumir dinámicamente `promo-spec.json`, `theme.json` y `manifest.json` (cero colores o coordenadas hardcodeadas a ojo).
- Reutilizar `Backdrop`, `CameraRig`, `KineticText`, `SceneShell`, `PyQuestSfx` / `SoundEffect` y wrappers de `CardFrame` / `TopBand` / `BottomBand` / `Slide` / `GridPattern`.
- Encuadrar capturas reales con perspectiva 2.5D y zoom inteligente guiado por los `boundingBox` de `manifest.json`.
- **Prohibido** diapositivas estáticas o `interpolate()` lineal para movimiento: usar `spring()` y curvas suaves continuas.
- Respetar zonas seguras de TikTok (`1080×1920`) e Instagram (`1080×1350`) mediante layout parametrizado (`<Name>Promo` + `<Name>PromoIG`).
- Sincronizar micro-SFX (`click`, `pop`, `whoosh-short`, `impact-bass-1`, `chime`, `sparkle`) con los timestamps del manifest.

### FASE 5 · QA Técnico, Editorial y Visual Obligatorio
1. Ejecutar `npx tsc --noEmit` en `remotion-test/` verificando cero errores en la nueva composición y en todo el repositorio previo.
2. Renderizar ≥6 fotogramas clave con `npx remotion still` (Hook, Estrategia, entrada de UI, pico de zoom en interacción, analíticas/resultados y CTA) en `1080×1920` y validar encuadre en `1080×1350`.
3. Inspeccionar visualmente cada PNG generado verificando:
   - Legibilidad en 3 segundos, máximo 2–3 líneas por bloque, presencia de iconos SVG/badges.
   - Cero solapamientos, cero pantallas en blanco, cero datos personales filtrados y nitidez Retina en capturas.
4. Corregir cualquier defecto y revalidar antes de entregar.

