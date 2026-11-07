---
name: santidev-reel-scripter
description: Estructura y escribe guiones y secuencias cinéticas de 60 FPS (1080x1920) para Santi.Dev (js/reels.js y remotion-test/src/data/). Calcula matemáticamente la duración por beat, define textos cinéticos con énfasis (*acento*), integra locución en off (vo a 165 WPM) y diseña eventos de audio y SFX deterministas.
---

# Santi.Dev Reel Scripter · Guionista Técnico y Diseñador de Beats (60 FPS)

Esta skill guía la redacción, temporización matemática y ensamblado de guiones audiovisuales para videos verticales de alto impacto en formato **TikTok / Reels / Shorts (1080×1920 a 60 FPS)**.

---

## 🎯 1. Principios de Retención Audiovisual

1. **Ritmo de Alto Impacto (16.5s a 20s para Reels Cortos · 70s a 75s para Sagas Educativas):**
   - Para reels cortos de concepto (Gemini, Stack Secreto, Tokens Pro): **5 beats estructurados** (~1040 a 1080 fotogramas @ 60 FPS).
   - Para sagas como **PyQuest**: Episodios de 4300 a 4500 fotogramas (~72 a 75 segundos), divididos en capítulos concisos.
2. **Cero Sobrecontextualización:**
   - La pantalla muestra información visual clave (código, diagramas, comparativas, números).
   - La locución (`vo`) aporta la explicación fluida sin recargar el texto visual.
3. **Escritura para el Oído (`vo` a 165 Palabras por Minuto):**
   - Frases cortas y contundentes. Cero muletillas académicas.
   - Duración calculada: Nunca acortar un beat por debajo del tiempo necesario para narrar su `vo`.

---

## ⏱️ 2. Algoritmo de Cadencia Lectora y Duración (`src/lib/cadence.ts`)

Para cada beat, la duración mínima en fotogramas a 60 FPS se calcula con:

$$\text{durationFrames} = 60 \cdot \max\left(1.8, \, 0.55 + \frac{60 \cdot W}{210} + 0.045 \cdot S \cdot C + 0.75\right)$$

* $W$: Número de palabras en pantalla.
* $S$: Número estimado de sílabas.
* $C$: Modificador de complejidad conceptual (1.0 para texto general; 1.25 para código o términos técnicos).
* **Regla de oro de locución:** Si la locución (`vo`) requiere más tiempo que la lectura en pantalla ($t_{\text{vo}} = \frac{W_{\text{vo}}}{165 / 60}$), la escena adopta la duración de la locución más un margen de holgura de 0.4s.

---

## 🎬 3. La Estructura Clásica de 5 Beats (Reels Cortos de 17.5s)

| Beat | Tipo de Escena | Duración Típica (60 FPS) | Elementos Visuales | SFX Sincronizados |
|---|---|---|---|---|
| **1. Hook** | `hero` | 195 frames (~3.25 s) | Badge brillante, titular con acento (`*resaltado*`), logo animado. | `whoosh-short`, `impact-bass-1`, `error` (si plantea un fallo) |
| **2. Estrategia** | `points` o `code` | 215 frames (~3.60 s) | Puntos secuenciales o ventana de terminal con tipeo dinámico. | `click-soft`, `typing`, `pop` |
| **3. Táctica / Prueba** | `compare` o `showcase` | 220 frames (~3.65 s) | Comparativa numérica antes/después o captura de interfaz enmarcada. | `impact-bass-1` (problema), `chime` (solución) |
| **4. Síntesis** | `points` o `code` | 215 frames (~3.60 s) | Demostración de escalabilidad, integración o métrica de impacto. | `pop`, `chime` |
| **5. CTA** | `cta` | 195 frames (~3.25 s) | Palabra clave central destacada en tamaño gigante, avatar/marca. | `sparkle`, `chime` |

---

## 📝 4. Esquema de Datos para TypeScript / Remotion (`src/lib/schema.ts`)

Al generar un nuevo reel para `remotion-test/src/data/<nombre>.ts`:

```typescript
import type { ReelProps } from "../lib/schema";

export const miNuevoReelData: ReelProps = {
  brand: "santidev", // "santidev" | "mova" | "endo" | "girastock"
  kicker: "SERIE TÉCNICA · PARTE X",
  title: "Título Principal del Reel",
  accentColor: "#2E9D63",
  scenes: [
    {
      id: "s1_hook",
      type: "hero",
      badge: "EL PROBLEMA",
      title: "¿Tu código con IA *colapsa por esto*?",
      sub: "No es el modelo: es cómo saturas su ventana de contexto.",
      vo: "¿Tu código con IA se rompe a mitad del camino? No es el modelo, es cómo saturas su atención.",
      durationFrames: 195,
    },
    {
      id: "s2_regla1",
      type: "points",
      badge: "REGLA 1",
      title: "Foco atómico: *1 tarea, 1 archivo*",
      points: [
        { label: "1 Contexto", desc: "Nunca pases carpetas completas" },
        { label: "1 Objetivo", desc: "Define una función a la vez" },
        { label: "0 Ruido", desc: "Elimina logs y comentarios obsoletos" },
      ],
      vo: "Regla de oro: foco atómico. Una sola tarea, un solo archivo y cero ruido en el prompt.",
      durationFrames: 215,
    },
    {
      id: "s3_code",
      type: "code",
      badge: "TERMINAL MCP",
      title: "Poda de dependencias con *Graphify*",
      file: "terminal ~ ast-prune",
      lang: "bash",
      code: [
        "$ graphify analyze ./src --entrypoint=auth",
        "✓ 18 archivos mapeados a AST",
        "$ opencode prune --keep-callers-only",
        "✓ 80% menos tokens enviados al modelo",
      ],
      vo: "Con Graphify analizas el AST y podas dependencias para enviar solo lo que la IA necesita ver.",
      durationFrames: 220,
    },
    {
      id: "s4_compare",
      type: "compare",
      badge: "RESULTADO REAL",
      title: "Consumo de Tokens: *Antes vs. Después*",
      before: {
        badge: "Contexto Completo",
        val: "60,000",
        desc: "Alucinaciones y bugs",
      },
      after: {
        badge: "Foco Podado",
        val: "4,000",
        desc: "Precisión y 0 errores",
      },
      vo: "Pasas de quemar sesenta mil tokens con bugs a cuatro mil con precisión absoluta.",
      durationFrames: 220,
    },
    {
      id: "s5_cta",
      type: "cta",
      badge: "DOMINA EL CONTEXTO",
      title: "Comenta *CONTEXTO*",
      sub: "Te envío la plantilla de poda AST y las reglas de Antigravity.",
      vo: "Guarda este video y comenta CONTEXTO para enviarte la plantilla exacta.",
      durationFrames: 195,
    },
  ],
};
```

---

## 🎧 5. Capa de Sonido y SFX

* **BGM:** Pista continua ambiental (`bgm/tech_ambient_bed.mp3`) con volumen calibrado a ~24% para que no compita con la voz.
* **SFX Deterministas:**
  - `whoosh-short`: En la transición inicial de cada beat.
  - `impact-bass-1`: En momentos de tensión o problemas técnicos.
  - `chime` / `pop`: En revelado de ventajas, puntos o soluciones.
  - `typing`: Durante la animación de terminal o código.
  - `sparkle`: En la llamada a la acción final (`cta`).
