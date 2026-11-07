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
| `pyquest/episodes/ep02/Ep02.tsx` | Episodio 2 de PyQuest: Variables y Tipos de Datos (75s @ 60 FPS) |
| `pyquest/episodes/ep03/Ep03.tsx` | Episodio 3 de PyQuest: Condicionales `if / elif / else` (75s @ 60 FPS) |
| `pyquest/episodes/ep04/Ep04.tsx` | Episodio 4 de PyQuest: Operadores Lógicos `and / or / not` (75s @ 60 FPS) |

## 3. Decisiones de Diseño y Rendimiento
- **Eliminación de barras y corchetes**: Se retiraron las barras de progreso segmentadas del fondo y los corchetes de las esquinas. El diseño ahora es limpio, editorial y de alto contraste.
- **Ritmo de Alto Impacto (17.6s)**: Cada beat dura entre 3.2s y 4.0s (195 a 240 frames). La terminal teclea rápido, los puntos aparecen en cascada rápida y los números se mueven con aceleración dinámica.
- **Reproducción a 60 FPS Estable en la Web**: Para evitar caídas de fotogramas al evaluar código en vivo en el navegador, el reproductor de la app web (`MotionReelPlayer` en `js/motion_player.js`) ahora detecta videos `.mp4` en `videos/` y los reproduce con aceleración de hardware en un elemento `<video>` nativo, con interruptor a lienzo interactivo.
- **Arquitectura Rayos X 2.5D (`Ep01V2.tsx`)**: En la versión duplicada del Episodio 1 de PyQuest (`PyQuestEp01V2Reel`), la Escena 4 reemplaza las 4 tarjetas estáticas verticales por una escena de 600 frames (10s) dividida en 4 sub-fases de 150 frames (`IA #8B5CF6`, `Backend #10B981`, `Datos #3B82F6`, `Automatización #F59E0B`), conectando `<DynamicImportCard />` (`Y: 220px`) mediante `<EnergyCablesSVG />` (`Y: 370px - 620px`) hacia `<XRayInteractiveStage />` (`Y: 620px`) con doble capa en perspectiva 3D (`perspective: 1400px`, `rotateX(8deg)`, `rotateZ(-1.5deg)`).

## 4. Videos Disponibles en la Aplicación Web (`http://localhost:3333`)
1. **PyQuest Ep. 1: ¿Por qué Python?** (`videos/pyquest_ep01_por_que_python.mp4`) — Versión original de respaldo (72s).
2. **PyQuest Ep. 1 (V2 Rayos X): ¿Por qué Python?** (`videos/pyquest_ep01_v2_xray.mp4`) — Versión duplicada con Escena 4 interactiva Rayos X 2.5D (66s).
3. **PyQuest Ep. 2: Variables y Tipos de Datos** (`videos/pyquest_ep02_variables_y_tipos.mp4`).
4. **PyQuest Ep. 3: Condicionales `if / elif / else`** (`videos/pyquest_ep03_condicionales.mp4`).
5. **PyQuest Ep. 4: Operadores Lógicos `and / or / not`** (`videos/pyquest_ep04_operadores_logicos.mp4`).
6. **Parte 1: Stack Secreto** (`videos/stack_secreto.mp4`):
   - Hook: ¿Juegos y webs sin programar?
   - Paso 1: Inspiración (Roba como un artista)
   - Paso 2: Lógica (Antigravity + Opencode)
   - Paso 3: Arte (Nano Banana + Remove BG)
   - CTA: Guarda este video · Comenta PARTE 2
7. **Tokens Pro & Antigravity** (`videos/tokens_pro.mp4`):
   - Hook: Tu IA colapsa por esto
   - Regla 1: Foco atómico (1 tarea · 1 archivo)
   - Regla 2: Poda de contexto con Graphify AST
   - Resultado: 80% menos tokens y cero bugs
   - CTA: Domina el contexto · Comenta CONTEXTO

## 5. Cómo Renderizar Nuevos Videos
```bash
cd remotion-test
# Renderizar PyQuest Ep. 1 V2 Rayos X (3960 frames @ 60 FPS = 66.0s)
node_modules\.bin\remotion.cmd render src/index.ts PyQuestEp01V2Reel out/pyquest_ep01_v2_xray.mp4 --concurrency=75% --crf=16
Copy-Item "out\pyquest_ep01_v2_xray.mp4" "..\videos\pyquest_ep01_v2_xray.mp4" -Force

# Renderizar Stack Secreto (1060 frames @ 60 FPS = 17.6s)
npx remotion render src/index.ts StackSecretoReel out/stack_secreto.mp4 --concurrency=75% --crf=16
Copy-Item "out\stack_secreto.mp4" "..\videos\stack_secreto.mp4" -Force

# Renderizar Tokens Pro (1060 frames @ 60 FPS = 17.6s)
npx remotion render src/index.ts TokensProReel out/tokens_pro.mp4 --concurrency=75% --crf=16
Copy-Item "out\tokens_pro.mp4" "..\videos\tokens_pro.mp4" -Force
```
