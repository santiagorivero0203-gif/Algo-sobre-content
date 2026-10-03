# Santi.Dev · Generador de Carruseles TikTok (Dev + Gaming)

Generador modular de diapositivas en formato vertical **1080 × 1920** para TikTok, Instagram Reels y YouTube Shorts con el sistema de diseño limpio de Santi.Dev:
tarjetas de alto contraste sobre grid oscuro mate, acentos de color personalizados, iconografía SVG propia, capturas reales de despliegues en vivo y fondos dinámicos con código y elementos gaming.

---

## 🚀 Cómo abrir y ejecutar el proyecto

> [!IMPORTANT]
> Ejecuta siempre el proyecto a través de un **servidor local**. Si abres el archivo directamente con doble clic (`file://`), el navegador activará la política CORS y bloqueará las imágenes al exportar al canvas.

```powershell
# Iniciar servidor local en el puerto 8787 (para no interferir con otros proyectos)
npx -y serve -l 8787 --no-port-switching .
```

Abre en tu navegador:
- [http://localhost:8787/algo.html](http://localhost:8787/algo.html) o [http://localhost:8787/](http://localhost:8787/)

---

## 📁 Arquitectura Modular del Proyecto

El código ha sido desacoplado para garantizar escalabilidad, claridad y mantenimiento profesional:

```
algo/
├── algo.html                  # Punto de entrada HTML5 limpio y semántico
├── index.html                 # Punto de entrada alternativo para raíz
├── css/
│   └── styles.css             # Tokens CSS, grid técnico, reset y contenedor 9:16
├── js/
│   ├── icons.js               # Iconografía SVG propia, pixel art y landmarks MediaPipe
│   ├── themes.js              # Paletas temáticas, PRNG de fondo determinista y HUD
│   ├── videos.js              # Dataset de los 6 carruseles (Trilogías 1 y 2)
│   ├── components.js          # Tipos de slide (Hero, Code, Flow, Stat, etc.) y layouts
│   └── app.js                 # App React, selector agrupado por series y exportador PNG
├── assets/                    # Capturas reales de proyectos en vivo + assets gráficos
│   ├── the_last_endo_live.png # Captura en vivo de https://the-last-endo.vercel.app/
│   ├── mova_app_live.png      # Captura en vivo de https://mova-app-lemon.vercel.app/
│   ├── simulacion_simadi_live.png # Captura en vivo de https://simulacion-simadi.vercel.app/
│   └── endo_sprite.jpg        # Sprite pixel art para demostración antes/después
└── README.md                  # Documentación completa y registro de cambios
```

---

## 🎬 Contenido: 8 Carruseles en 3 Series Temáticas

### Serie 1: Trilogía "De la Idea al Código"
1. **Parte 1: Stack Secreto** (`stack1`):
   - Hook: *¿Juegos y webs sin saber programar?*
   - Contenido: Inspiración (Roba como un artista), Lógica (Antigravity + Opencode en terminal), Arte (Nano Banana + Remove BG con comparativa Antes/Después), CTA guardar para Parte 2.
2. **Parte 2: Automatización y MCP** (`stack2`):
   - Hook: *Automatiza tu código como un pro*
   - Contenido: Stitch MCP como puente al mundo exterior, Supabase MCP (base de datos sin servidores), Sincronización con Git MCP, CTA hacia Parte 3.
3. **Parte 3: El Arte del Prompting** (`stack3`):
   - Hook: *Por qué tu código IA colapsa*
   - Contenido: El error novato de pedir todo en un solo mensaje, El error de no planificar (vs Error de compilación), Gemini como arquitecto del sistema, Fórmula "Divide y Vencerás" (3 bloques modulares), CTA hacia el perfil.

### Serie 2: Trilogía "Casos Reales & Pitch"
4. **The Last Endo · Gaming** (`endo`):
   - Hook: *¿Sabes cómo destacar entre los demás?*
   - Logro: Campeón nacional Kurios Competition 2026.
   - Captura: Pantalla real del juego en vivo en Vercel.
5. **Mova App · Accesibilidad & IA** (`mova`):
   - Hook: *¿Quieres saber cómo formar una idea innovadora?*
   - Reto: Inspira 2026.
   - Captura: Pantalla oficial de Mova (BETA V2.0) con soporte para LSV, ASL y LSE.
6. **GiraStock / Soluciones Reales** (`gira`):
   - Hook: *Inspírate en las apps top, crea a medida*
   - Enfoque: Freelancers y desarrollo ágil para clientes.
   - Captura: Pantalla real del sistema de simulación en vivo en Vercel.

### Serie 3: Guías de Herramientas
7. **Guía: Antigravity** (`agy`):
   - Hook: *¿Qué es Antigravity y cómo sacarle el jugo?*
   - Contenido: Qué es, instalación en 3 pasos, planes y precios de Google AI, reparto de roles (Gemini planea, Antigravity construye, Opencode pule), conexión de Opencode con API key oficial, diseño con Stitch MCP, qué gasta más cuota y 5 funciones poco conocidas (Tab, Ctrl+I, Plan, Browser, .agents/).
8. **Ventajas: Antigravity** (`agy_power`):
   - Hook: *¿Por qué Antigravity no es otro editor más?*
   - Contenido: Base sobre el núcleo de Visual Studio Code (Code OSS: atajos, temas y plugins sin reaprender nada), de autocompletado pasivo a agente autónomo, ciclo completo (Plan ➔ Multi-archivo ➔ Terminal ➔ Navegador), 3 superpoderes clave (Browser Subagent, subagentes en segundo plano y MCP nativo) y CTA honesto.

## 📱 Formatos Soportados (TikTok vs Instagram)

El generador incluye un selector de formato en tiempo real para adaptar el diseño según la plataforma destino:

| Plataforma | Proporción | Dimensiones (Preview) | Resolución Exportada (PNG HD) | Características de Diseño |
|---|---|---|---|---|
| **TikTok / Reels / Shorts** | `9:16` | `405 × 720 px` | **1080 × 1920 px** | Lienzo ultra-vertical con fondo extendido, HUD gaming y directivas de código en zonas seguras (arriba y abajo). |
| **Instagram Carrusel Feed** | `4:5` | `405 × 506.25 px` | **1080 × 1350 px** | Proporción estándar de máximo impacto en el feed. Bandas compactas, slots reescalados y márgenes optimizados para swipe continuo. |

---

## ⌨️ Atajos y Enlaces Directos

| Acción | Método |
|---|---|
| Cambiar de slide | Flechas del teclado `←` `→` |
| Alternar formato en UI | Pestañas superiores **TikTok 9:16** / **Instagram 4:5** en la barra lateral |
| Abrir video y slide específica | `algo.html?v=agy_power&s=1` (acepta id `stack1`, `stack2`, `stack3`, `endo`, `mova`, `gira`, `agy`, `agy_power`) |
| Forzar formato por URL | `algo.html?v=agy_power&s=1&fmt=instagram` o `&fmt=tiktok` |
| Modo Slide Pura (sin interfaz) | `algo.html?solo=1&v=agy_power&s=1&fmt=instagram` (ideal para grabaciones de pantalla) |
| Descargar PNG actual en HD | Botón **Descargar slide** (1080×1920 en TikTok o 1080×1350 en Instagram) |
| Descargar carrusel completo | Botón **Descargar todo el carrusel** (secuencia automatizada en alta definición) |

---

## 📝 Registro de Cambios

### v3.3 (2026-10-03)
- **Motor Dual: TikTok (9:16) + Instagram Feed (4:5)**: Selector interactivo que redimensiona el canvas en vivo, reescala las coordenadas de slots de fondo y adapta las bandas superior e inferior (`TopBand` e `BottomBand`) a la altura de cada formato.
- **Exportación en Alta Calidad HD**: Generación de PNG cristalinos a **1080 × 1920** (TikTok) y **1080 × 1350** (Instagram) con nombres descriptivos automáticos (`slug_formato_slide.png`) y barra de progreso.
- **Corrección integral de espaciados inferiores ("líneas de abajo")**:
  - `window.Foot`: Rediseño del contenedor inferior con padding compacto (`9px 13px`), borde refinado de 1.5px y margen inferior seguro (`pb-0.5` / `pb-1`) para evitar colisiones con el radio curvo de 28-30px de la tarjeta.
  - `StepsSlide`, `StatSlide` y `ChecklistSlide`: Rebalanceo simétrico de la línea discontinua inferior (`border-t border-dashed`, `pt-3 pb-1`) garantizando respiración visual.
  - `CompareSlide` y `FlowSlide`: Reducción de conectores y cajas para permitir que el footer inferior respire holgadamente incluso en el formato 4:5 de Instagram.
  - `CodeSlide`: Sustitución del relleno artificial de 24 líneas por cálculo adaptativo dinámico (`Math.max(0, 4/8 - lines)`).
  - `CtaSlide`: Compactación proporcionada del titular, caja de comentarios y botones de acción ("Seguir" / "Guardar") evitando doble llamada en layouts con banda inferior.

### v3.2 (2026-10-03)
- **Nuevo carrusel: Ventajas de Antigravity (`agy_power`)**: Análisis táctico y visual enfocado en su núcleo sobre Visual Studio Code (0 curva de aprendizaje, atajos y extensiones nativas) y sus capacidades agénticas de nueva generación (subagentes en background, browser subagent para pruebas visuales y protocolo MCP).
- **Tema `agy_power`**: Paleta azul eléctrico / cielo mate (`#0EA5E9`), fondo personalizado con directivas de código de VS Code y badges de agentes.

### v3.1 (2026-10-03)
- **Nuevo carrusel: Guía de Antigravity (`agy`)**: Instalación, planes y precios oficiales de Google AI, optimización de cuota con Opencode y Gemini, y herramientas MCP (Stitch).
- **Nueva captura oficial para Mova App**: Actualización de la imagen oficial con la app en funcionamiento y nuevo gancho conversacional: *¿Quieres saber cómo formar una idea innovadora?*.

### v3.0 (2026-10-03)
- **Modularización total**: Separación completa de HTML, CSS (`css/styles.css`) y JavaScript modular (`js/icons.js`, `js/themes.js`, `js/videos.js`, `js/components.js`, `js/app.js`).
- **Incorporación de la Trilogía 1**: 3 videos completos basados en el guión técnico ("El Stack Visual y Lógico", "Automatización y MCP", "El Secreto del Prompting").
- **Capturas reales de Vercel**: Integración de capturas de alta resolución de `the-last-endo.vercel.app`, `mova-app-lemon.vercel.app` y `simulacion-simadi.vercel.app`.
- **Nuevo componente Antes/Después**: Comparación visual de sprites (fondo sólido vs transparencia recortada con Remove BG sobre patrón ajedrezado).
- **Consola Stitch MCP interactiva**: Simulación limpia de terminal dev ejecutando comandos y conexiones MCP.
- **CTAs honestos y comunitarios**: Sustitución de ofertas no existentes (como checklists privadas) por llamadas directas al perfil para aprender más sobre desarrollo y gaming.
- **Barra lateral agrupada**: División visual entre la Serie 1 (De la Idea al Código), la Serie 2 (Casos Reales & Pitch) y la Serie 3 (Guías de Herramientas) con contadores automáticos.
