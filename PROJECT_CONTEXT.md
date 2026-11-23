# 📌 Contexto del Proyecto · Santi.Dev Creator & Video Studio

> **Plataforma integral "Design & Video as Code"** para diseñar, previsualizar, editar y exportar contenido técnico y educativo en formato vertical (**1080×1920 · 9:16** para TikTok / Reels / Shorts y **1080×1350 · 4:5** para Instagram Feed).

---

## 🎯 1. Propósito del Proyecto

El repositorio centraliza un ecosistema completo de creación de contenido audiovisual y gráfico para redes sociales bajo una filosofía **Local-First**, combinando:
1. **Una aplicación web interactiva (`index.html`)** para gestionar carruseles, reproducir videos con su guion/locución (`vo`) y copiar kits de publicación (`PostKit`) en un clic.
2. **Un estudio de video programático en Remotion (`remotion-test/`)** que renderiza animaciones a **60 FPS** con física de resortes, tipografía cinética, código animado y efectos de sonido sincronizados.
3. **Un sistema de reglas editoriales y skills agénticas (`.agents/`)** que garantizan coherencia narrativa, rigor educativo y retención audiovisual.

---

## 🏷️ 2. Sistema Multi-Marca (`js/accounts.js`)

El sistema soporta 4 identidades visuales independientes:

| Marca | Handle | Enfoque Temático | Color Insignia |
|---|---|---|---|
| **Santi.Dev** | `@santi.dev` | Programación, IA, arquitectura de software y la serie **PyQuest**. | `#2E9D63` |
| **Mova** | `@mova.app` | Accesibilidad e IA en tiempo real para lengua de señas ("Rompiendo el silencio"). | `#3B82F6` |
| **The Last Endo** | `@thelastendo` | Devlog de videojuego indie pixel art, sigilo y terror psicológico. | `#EE6A3E` |
| **GiraStock** | `@girastock` | Automatización B2B, inventarios y facturación para pymes. | `#EDB828` |

---

## 🏗️ 3. Arquitectura del Repositorio

```text
algo/
├── index.html                  # Aplicación web principal (Studio + Reproductor + Exportador)
├── algo.html                   # Punto de entrada alternativo
├── server.js                   # Servidor HTTP local nativo con soporte Range 206 para MP4
├── package.json                # Dependencia de HyperFrames (^0.8.145)
│
├── js/                         # Núcleo frontend (React 18 UMD + Babel Standalone)
│   ├── accounts.js             # Registro de las 4 marcas y paletas
│   ├── themes.js               # Temas visuales y fondos dinámicos
│   ├── videos.js               # Dataset de carruseles modulares
│   ├── reels.js                # Dataset maestro de Reels (PyQuest Ep. 1–4, Trilogía, Gemini, etc.)
│   ├── reels_engine.js         # Reproductor de reels, selector de beats y panel de locución (VO)
│   ├── components.js           # Componentes visuales reutilizables para carruseles
│   ├── modals.js               # Modales de exportación, PostKit (copy/hashtags) y sincronización GitHub
│   ├── inspector.js            # Editor visual en vivo (?edit=1)
│   ├── app.js                  # Estado global y motor de exportación PNG/ZIP
│   └── vendor/                 # modern-screenshot, jszip
│
├── remotion-test/              # Estudio de Video Programático (Remotion 4.0.534 + TS + Zod)
│   └── src/
│       ├── Root.tsx            # Registro de todas las composiciones (1080×1920 @ 60 FPS)
│       ├── Reel.tsx            # Plantilla cinética basada en esquemas Zod
│       ├── data/               # Datos de reels cortos (geminiNivel1–3, stackSecreto, tokensPro, mafeTeoriaDiseno)
│       ├── trilogia/           # Trilogía "De la Idea al Código" (TrilogiaStack1–3)
│       └── pyquest/            # Serie educativa Python desde Cero (Ep01, Ep01V2, Ep02, Ep03, Ep04)
│
├── assets/                     # Logotipos SVG, capturas reales, sprites y recursos gráficos
├── bgm/ & sfx/                 # Pista ambiental (tech_ambient_bed.mp3) y efectos de sonido
├── videos/                     # MP4 renderizados finales servidos en la web
├── hyperframes-demo/           # Proyecto de demostración / pruebas con HyperFrames
│
├── .agents/                    # Reglas y skills especializadas para agentes IA
│   ├── rules/content_rules.md
│   └── skills/                 # santidev-reel-scripter, santidev-carousel-builder, viral-hook-writer, etc.
│
├── AGENTS.md & GEMINI.md       # Reglas editoriales globales (escaneo 3s, cero sobrecontextualización)
├── posts_kit.md                # Catálogo maestro de copies y hashtags para publicaciones
├── prompts_history.md          # Historial cronológico completo de requerimientos del usuario
└── README.md                   # Documentación técnica del generador de carruseles
```

---

## 🎬 4. Series y Producciones Principales

### A. Serie **PyQuest** ("Python desde Cero con un RPG")
Hilo conductor único: construir paso a paso el motor lógico de un RPG protagonizado por **Aria**.
- **Episodio 1 (`Ep01.tsx` / `Ep01V2.tsx`):** *¿Por qué elegir Python?* — Carga cognitiva vs. lógica real y ecosistema industrial (IA, Backend, Datos, Bots).
- **Episodio 2 (`Ep02.tsx`):** *Variables y Tipos de Datos* — Asignación en RAM, `str`, `int`, `float`, `bool` y solución al `TypeError` por comillas.
- **Episodio 3 (`Ep03.tsx`):** *Condicionales y Combate* — Flujo lógico, dos puntos `:`, indentación de 4 espacios y cascada `if` / `elif` / `else`.
- **Episodio 4 (`Ep04.tsx`):** *Listas y Diccionarios* — Colecciones ordenadas desde índice `[0]`, `.append()`, índice `[-1]` y mapeo clave-valor `{}`.

### B. Trilogía **"De la Idea al Código"** (`src/trilogia/`)
- `TrilogiaStack1`, `TrilogiaStack2` y `TrilogiaStack3`: Videos sobre arquitectura moderna con IA, herramientas MCP y flujo de desarrollo.

### C. Reels Cortos Cinéticos (`src/data/`)
- **Gemini Nivel 1, 2 y 3:** Uso práctico, integración con Workspace/Canvas y automatizaciones con Gemini Spark.
- **Tokens Pro & Stack Secreto:** Ingeniería de contexto y optimización de prompts.
- **Mafe · Teoría del Diseño:** Semiótica y usabilidad.

---

## 📐 5. Estándares Editoriales y Técnicos

1. **Contenido Autoconclusivo (Self-Contained):** Cada video o carrusel se entiende por sí solo sin requerir contexto previo del espectador.
2. **Progresión Narrativa Estricta:** `Hook (dolor o pregunta)` → `Estrategia (por qué funciona)` → `Táctica / Código (demostración práctica)` → `CTA (llamado a la acción)`.
3. **Educación Clara y Profesional:** Explicar los conceptos reales de programación con lenguaje simple, directo y sin jerga innecesaria ni tono informal.
4. **Escaneo en 3 Segundos:** Titulares cortos con énfasis (`*resaltado*`), máximo 2–3 líneas por bloque, iconografía SVG vectorial (cero emojis sueltos en el código de Remotion) y movimiento continuo sin frames estáticos prolongados.
5. **Documentación y Trazabilidad:** Todo código nuevo debe estar documentado y cada cambio o requerimiento se registra en [`prompts_history.md`](file:///c:/Users/user/Desktop/video%20proyectos/algo/prompts_history.md).

---

## ⚙️ 6. Comandos Frecuentes

- **Levantar web local (carruseles y reproductor de reels):**
  ```bash
  node server.js
  ```
- **Abrir estudio de Remotion:**
  ```bash
  cd remotion-test
  npm run start
  ```
- **Validar lint y TypeScript en Remotion:**
  ```bash
  cd remotion-test
  npm run lint
  ```
- **Validar sintaxis de datos web (`js/reels.js`):**
  ```bash
  node -e "global.window = {}; require('./js/reels.js'); console.log('Reels:', window.REELS.length);"
  ```

