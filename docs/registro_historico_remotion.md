# Registro histórico · Remotion para Santi.Dev (para AGY)

Documento de trazabilidad: qué se hizo, por qué, y cómo corregirlo o mejorarlo.

## 1. Cronología
1. Se creó el entorno aislado `remotion-test/` (Remotion 4.0.534) sin tocar la app de carruseles (:3333).
2. Se instalaron las skills oficiales (12) en `remotion-test/.agents/skills/` y se copiaron a `.agents/skills/`.
3. Prueba corta `KineticReel` (3 s, 3 escenas) → aprobada.
4. Análisis exhaustivo de `remotion.md` → skill propia `.agents/skills/remotion-motion-design/SKILL.md`.
5. Reel inicial `TokensProReel` (versión inicial larga de 74s).
6. **Iteración de Limpieza y Pacing Rápido**:
   - Eliminación de corchetes de visor HUD (`Bracket`) y barras de tiempo segmentadas inferiores por feedback de usuario ("ai slop", sobrecarga visual).
   - Aceleración radical del ritmo: duración reducida de 74s a ~17.6s (1060 frames @ 60 FPS) usando `durationFrames` por escena y resortes ágiles (`damping: 22`, `stiffness: 210`, `mass: 0.7`).
   - Creación del reel oficial del primer video: `StackSecretoReel` (`src/data/stackSecreto.ts`), basado en la Trilogía Parte 1 (Juegos y webs sin programar).
   - Integración de reproductor de video pre-renderizado a 60 FPS nativo directamente en la página web de Santi.Dev (`http://localhost:3333/?account=santidev`), con alternador entre video MP4 y lienzo en vivo.

## 2. Archivos del Sistema (`remotion-test/src/`)
| Archivo | Propósito |
|---|---|
| `lib/cadence.ts` | Cadencia de lectura + locución (`computeSceneDuration`) |
| `lib/theme.ts` | Marcas, colores, fuentes, márgenes seguros |
| `lib/schema.ts` | Contrato Zod de escenas/reel (soporta `durationFrames`) |
| `lib/timeline.ts` | Línea de tiempo unificada |
| `components/KineticText.tsx` | Tipografía cinética fluida con entrada por resortes nítidos |
| `components/Backdrop.tsx` | Fondo minimalista y limpio (sin corchetes ni barras segmentadas) |
| `components/Scenes.tsx` | Escenas puras (hero, points, code, compare, cta) con transiciones rápidas |
| `Reel.tsx` | Compositor genérico modular |
| `data/stackSecreto.ts` | Contenido del Primer Video (Stack Secreto, 17.6s @ 60 FPS) |
| `data/tokensPro.ts` | Contenido de Tokens Pro & Context Collapse (17.6s @ 60 FPS) |
| `Root.tsx` | Registra `StackSecretoReel`, `TokensProReel`, `KineticReel`, `PyQuestEp01Reel`, `PyQuestEp01V2Reel`, `PyQuestEp02Reel`, `PyQuestEp03Reel` y `PyQuestEp04Reel` |
| `pyquest/episodes/ep01/Ep01.tsx` | Episodio 1 original de PyQuest (72s @ 60 FPS = 4320 frames) |
| `pyquest/episodes/ep01/Ep01V2.tsx` | Episodio 1 V2 de PyQuest con Escena 4 refactorizada a sistema interactivo **Rayos X 2.5D con `import` rotativo** (66s @ 60 FPS = 3960 frames) |
| `pyquest/episodes/ep02/Ep02.tsx` | Episodio 2 de PyQuest (Rehecho Interactivo): Variables y Tipos de Datos con choque físico `"100"` vs `-20`, brazo mecánico `=` en RAM, los 4 tipos en vivo sobre Aria y pinzas extractoras de comillas (53s @ 60 FPS = 3180 frames) |
| `pyquest/episodes/ep03/Ep03.tsx` | Episodio 3 de PyQuest (Rehecho Interactivo): Condicionales `if / elif / else` con bug de héroe zombi (`-20 HP` desbordado), visualizador de indentación `[·][·][·][·]` y escáner línea por línea de 3 pruebas con tachado de ramas descartadas (54s @ 60 FPS = 3240 frames) |
| `pyquest/episodes/ep04/Ep04.tsx` | Episodio 4 de PyQuest: Operadores Lógicos `and / or / not` (75s @ 60 FPS) |
| `trilogia/kit.tsx` | Kit compartido de la Trilogía: atmósfera neón ultra-rápida (radial gradients), SeriesHeader, TrilogyStage centrado, GlassCard 2.5D, EnergyBus SVG animado, telemetría y typed lines |
| `trilogia/TrilogiaStack1.tsx` | Parte 1: Stack Secreto (24s / 1440f @ 60 FPS): Figma tokens, Antigravity 85%, Opencode ahorro de tokens, Nano Banana sprites y pipeline sin fricción |
| `trilogia/TrilogiaStack2.tsx` | Parte 2: Automatización con MCP (24s / 1440f @ 60 FPS): Stitch MCP (Figma -> React), Supabase MCP (SQL en vivo con RLS) y Git MCP (checkpoints y CI/CD Vercel) |
| `trilogia/TrilogiaStack3.tsx` | Parte 3: El Arte del Prompt (25s / 1500f @ 60 FPS): Antipatrón del prompt monolítico, Google AI Studio + Context Caching y Arquitectura por Contratos TypeScript |

## 3. Decisiones de Diseño y Rendimiento
- **Refactorización V2 Trilogía (Gemini DNA + Objetos 3D + Sin Cuadrícula)**:
  - **Introducción Hero Gemini**: Estructura de gancho con Badge superior flotante, Kicker en JetBrains Mono, titular de gran escala cinético y línea de acento luminosa con respiración senoidal (`BreathingLine`).
  - **Repartición del espacio vertical "a lo largo"**: Eliminado el encajonamiento en tarjetas pequeñas. Se utiliza la totalidad del lienzo (1080x1920) distribuyendo metadatos arriba, titular en tercio superior, escenario 3D en el centro (600-750px) y telemetría abajo.
  - **Cero cuadrícula de fondo**: Eliminada la cuadrícula técnica de fondo por degradados de estudio más orgánicos y elegantes.
  - **Paleta pastel / slate más clara**: Se sustituyó el negro puro por fondos slate azulados (`#12261E`, `#241B13`, `#15203A`) y acentos pastel de alto contraste (`#34D399`, `#FBBF24`, `#38BDF8`) que descansan la vista.
  - **Eliminación de barra superior fija**: Retirado el encabezado fijo (`SeriesHeader`) para otorgarle total protagonismo a la escena.
  - **Animaciones 3D y mockups reales**: Integración de tarjetas en perspectiva (`Card3D`, `MockupWindow`) con imágenes de prueba reales (`the_last_endo_live.png`, `mova_app_live.png`, `gemini_workspace_sidepanel.png`, `endo_sprite.jpg`).
- **Fusión PyQuest + Gemini**:
  - Del estilo Gemini se heredan el fondo oscuro con halos de luz neón sutiles, la tipografía dual (`Space Grotesk` para titulares y `JetBrains Mono` para código/badges), el énfasis tipográfico (`*resaltado*` de alto contraste) y la iconografía vectorial SVG oficial.
  - Del estilo PyQuest se heredan el centrado vertical estricto (`TrilogyStage`), la eliminación total del síndrome del "medio lienzo vacío" mediante barras de telemetría inferiores dinámicas, el control determinista de transiciones con entrada y salida explícita (cero colisiones de texto entre escenas) y las micro-animaciones continuas (pulsos de cables de energía SVG, escáneres, contadores numéricos y derivas perpetuas).
- **Optimización de Rendimiento Remotion**:
  - Se eliminaron filtros Gaussianos pesados en CPU (`filter: blur(130px)`) sustituyéndolos por degradados radiales nativos (`radial-gradient`), permitiendo renderizar composiciones 4K/FullHD fluidamente en software rendering sin ralentizar Chromium.
- **Eliminación de barras y corchetes**: Se retiraron las barras de progreso segmentadas del fondo y los corchetes de las esquinas. El diseño ahora es limpio, editorial y de alto contraste.
- **Ritmo de Alto Impacto**: Cada beat dura entre 4.0s y 5.5s con locución calculada a 155-165 WPM.
- **Reproducción a 60 FPS Estable en la Web**: Para evitar caídas de fotogramas al evaluar código en vivo en el navegador, el reproductor de la app web (`MotionReelPlayer` en `js/motion_player.js`) ahora detecta videos `.mp4` en `videos/` y los reproduce con aceleración de hardware en un elemento `<video>` nativo, con interruptor a lienzo interactivo.

- **Refactorización V3 Trilogía (Coreografía Visual Diferenciada por Beat + Sincronización SFX Determinista)**:
  - **Coreografía visual con sentido por beat (eliminada la flotación idéntica)**:
    - **Beat 1 (Hook)**: `CardHero3D` — Entrada por resorte elástico con balanceo suave en perspectiva 3D (`rotateX`, `rotateY`) y flotación senoidal continua.
    - **Beat 2 (Fase 1 / Herramienta 1)**: `CardSlideLateral` — Entrada lateral de izquierda a derecha (`translateX: -80px -> 0`) combinada con máscara de recorte progresiva (`clipPath: inset(0 (100 - p)% 0 0 round 28px)`), dando sensación de barrido visual de lectura.
    - **Beat 3 (Fase 2 / Herramienta 2)**: `CardDualSnap` — Doble mordaza vertical con dos bloques que convergen desde extremos opuestos (superior e inferior) con enganche magnético en el centro.
    - **Beat 4 (Fase 3 / Regla 2)**: `CardScanReveal` — Revelación guiada por haz láser escáner que barre de arriba a abajo descubriendo los elementos técnicos y el código.
    - **Beat 5 (CTA Final)**: `CardStampCTA` — Estampado de gran impacto con resorte de sobreimpulso (`scale: 1.14 -> 1.0`), resplandor expansivo y botón interactivo pulsante (`BreathingButton`).
  - **Integración de Efectos de Sonido (SFX)**:
    - Implementación de `<SoundEffect />` nativo en Remotion con wrapping determinista de `<Sequence>` y volumen configurable.
    - Efectos sonoros integrados: impactos cinemáticos de graves (`impact-bass-1`, `impact-bass-2`), barridos de aire rápidos (`whoosh-cinematic`, `whoosh-short`), tecleo táctil (`typing`), clics mecánicos (`click-soft`) y campanas de confirmación/éxito (`chime`, `sparkle`, `ping`).
    - Pista de fondo (`tech_ambient_bed.mp3`) mezclada suavemente al 22% de ganancia para máxima claridad de audio.

## 4. Videos Disponibles en la Aplicación Web (`http://localhost:3333`)
1. **PyQuest Ep. 1: ¿Por qué Python?** (`videos/pyquest_ep01_por_que_python.mp4`) — Versión original de respaldo (72s).
2. **PyQuest Ep. 1 (V2 Rayos X): ¿Por qué Python?** (`videos/pyquest_ep01_v2_xray.mp4`) — Versión duplicada con Escena 4 interactiva Rayos X 2.5D (66s).
3. **PyQuest Ep. 2: Variables y Tipos de Datos** (`videos/pyquest_ep02_variables_y_tipos.mp4`).
4. **PyQuest Ep. 3: Condicionales `if / elif / else`** (`videos/pyquest_ep03_condicionales.mp4`).
5. **PyQuest Ep. 4: Operadores Lógicos `and / or / not`** (`videos/pyquest_ep04_operadores_logicos.mp4`).
6. **Trilogía Parte 1: Stack Secreto** (`videos/stack_secreto.mp4` · 24s @ 60 FPS):
   - Hook: ¿Juegos y webs sin saber programar?
   - Fase 1: Inspiración & Diseño (Roba como un artista + Figma)
   - Fase 2: Lógica & Motor (Google Antigravity 85% + Opencode fine-tune)
   - Fase 3: Arte & Sprites (Nano Banana IA + Remove BG en 1 clic)
   - CTA: Guarda el video · Comenta STACK
7. **Trilogía Parte 2: Automatización con MCP** (`videos/automatizacion_y_mcp.mp4` · 24s @ 60 FPS):
   - Hook: Automatiza tu código con MCP
   - Herramienta 1: Stitch MCP (Figma directo al editor sin copy-paste)
   - Herramienta 2: Supabase MCP (Tablas SQL en producción con lenguaje natural)
   - Herramienta 3: Git MCP (Checkpoints automáticos y despliegue a Vercel)
   - CTA: Automatiza tu stack · Comenta MCP
8. **Trilogía Parte 3: El Arte del Prompt** (`videos/el_arte_del_prompt.mp4` · 25s @ 60 FPS):
   - Hook: ¿La IA te entrega código roto?
   - El Error: Prompt monolítico ("hazme una app completa" -> alucinaciones)
   - Estrategia 1: Google AI Studio + Context Caching (fijar reglas de arquitectura)
   - Estrategia 2: Arquitectura por Contratos (interfaces TypeScript modulares)
   - CTA: Domina el prompting · Comenta PROMPT
9. **Tokens Pro & Antigravity** (`videos/tokens_pro.mp4`):
   - Hook: Tu IA colapsa por esto
   - Regla 1: Foco atómico (1 tarea · 1 archivo)
   - Regla 2: Poda de contexto con Graphify AST
   - Resultado: 80% menos tokens y cero bugs
   - CTA: Domina el contexto · Comenta CONTEXTO

## 5. Cómo Renderizar Nuevos Videos
```bash
cd remotion-test

# Renderizar Trilogía Completa "De la Idea al Código" (60 FPS)
node_modules\.bin\remotion.cmd render src/index.ts TrilogiaStack1Reel ..\videos\stack_secreto.mp4 --concurrency=75% --crf=20
node_modules\.bin\remotion.cmd render src/index.ts TrilogiaStack2Reel ..\videos\automatizacion_y_mcp.mp4 --concurrency=75% --crf=20
node_modules\.bin\remotion.cmd render src/index.ts TrilogiaStack3Reel ..\videos\el_arte_del_prompt.mp4 --concurrency=75% --crf=20
```
