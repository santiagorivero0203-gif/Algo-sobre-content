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

## 🎬 Contenido: 9 Carruseles en 3 Series Temáticas

> [!TIP]
> **Regla de Oro Editorial:** Todo el contenido de este repositorio sigue la directriz de ser **100% coherente y autoconclusivo** (cualquier espectador entiende el video completo sin haber visto los anteriores) pero **sin sobrecontextualizar**, manteniendo un ritmo ágil y escaneable en 3 segundos por slide para no destruir el enganche en TikTok/Instagram. Consulta las reglas activas en [AGENTS.md](file:///c:/Users/user/Desktop/video%20proyectos/algo/AGENTS.md) y [.agents/rules/content_rules.md](file:///c:/Users/user/Desktop/video%20proyectos/algo/.agents/rules/content_rules.md).

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
9. **Tokens Infinitos: Flujo Pro** (`token_mastery`):
   - Hook: *¿Te quedas sin tokens a mitad de proyecto? Así los multiplico x10*
   - Contenido: Flujo táctico de rendimiento extremo. Planificación externa en Gemini (2M contexto, 0 tokens gastados en IDE), orquestación Antigravity + Opencode, grafos de Graphify, Stitch MCP para diseño desacoplado, checkpoints con micro-commits en Git, ventaja multi-cuenta sin bloqueos de hardware ID (vs Cursor) y análisis de rentabilidad de Gemini AI Pro.

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

### v3.6 (2026-10-03)
- **Kit de Publicación para Redes Sociales (Post Kit)**:
  - **Captions y Ganchos Completos para los 8 Carruseles**: Cada carrusel cuenta con su gancho de marketing conversacional (Hook), descripción estructurada paso a paso con viñetas limpias (Caption), llamada a la acción hacia la comunidad y hashtags estratégicos.
  - **Hashtags Estratégicos Segmentados**: Entre 10 y 12 etiquetas por carrusel combinando nicho específico (`#antigravity`, `#opencode`, `#mediapipe`, `#stitchmcp`) y categorías de alto alcance (`#programacion`, `#desarrolloweb`, `#gamedev`).
  - **Recomendaciones de Publicación**: Horarios pico de engagement recomendados según la temática (e.g., `18:00 - 21:00` o `12:00 - 15:00`) y pistas de audio/sonido sugeridas (e.g., *Synthwave instrumental*, *Chillhop cyber lo-fi*, etc.) para potenciar el algoritmo de TikTok e Instagram.
  - **Modal Interactivo "Kit de Publicación" en la App**:
    - Acceso rápido en 1 toque desde la barra móvil (`Kit Post`), barra lateral de escritorio (`Kit de Publicación`), cabecera del lienzo y directamente tras guardar en el modal de exportación.
    - Botones de copiado al portapapeles con confirmación visual instantánea (`✓ ¡Copiado!`): **Copiar Caption Completo + Hashtags**, **Copiar sólo Hashtags**, **Copiar Hook** y píldoras interactivas individuales por cada hashtag.
    - Selector horizontal de los 8 carruseles para copiar textos de cualquiera sin cerrar el modal.
  - **Documento Maestro de Referencia**: Creación de [`posts_kit.md`](file:///c:/Users/user/Desktop/video%20proyectos/algo/posts_kit.md) con los 8 kits de publicación organizados en Markdown listos para consulta o copiado rápido offline.

### v3.5 (2026-10-03)
- **Soporte Nativo de Exportación y Guardado en iPhone (iOS Safari & Chrome)**:
  - **Superación de Restricciones de Apple WebKit**: iOS Safari bloquea silenciosamente las descargas automáticas `<a download>` cuando se usan `data:image/png;base64` pesadas o cuando expira el contexto de gesto táctil.
  - **Integración con Web Share API (`navigator.share`)**: Exporta el PNG como un objeto `File` nativo mediante Blobs binarios, activando directamente la hoja de compartir nativa de iOS para tocar **"Guardar imagen"** directo a la app **Fotos (Carrete)**.
  - **Modal Táctil de Guardado Directo**: Si el navegador no abre el menú nativo automáticamente, despliega un modal con la imagen generada en alta resolución habilitada para mantener presionada la pantalla (`.ios-save-image` con `-webkit-touch-callout: default`) y seleccionar *"Guardar en Fotos"*.
  - **Exportación de Carrusel Completo en Móvil**: Al presionar *"Todo"*, genera la galería completa de diapositivas con miniaturas y botones individuales de guardado instantáneo para el carrete.

### v3.9 (2026-10-07)
- **Investigación e Integración de Todas las Ventajas de Gemini AI Pro (`token_mastery`)**:
  - **Superpoderes Dev y Ventana Multimodal**: Incorporación de 2M tokens de contexto, Gems personalizados con memoria persistente, Deep Research técnico autónomo en la web y Python Sandbox en vivo dentro de la conversación.
  - **Ecosistema, Nube y API**: Integración nativa con Google Workspace (Docs, Sheets, Gmail, Meet, Drive), almacenamiento masivo de 2 TB a 5 TB en Google One, créditos mensuales ($10 USD) de Google Cloud para despliegues, y mayor tasa de peticiones (RPM/TPM) sin esperas en Google AI Studio para agentes agénticos (Antigravity y Opencode).
  - **Actualización de Diapositivas y Posts Kit**: Slides 7 y 8 estructuradas con máxima coherencia y síntesis escaneable en 3 segundos, y kit de publicación en [`posts_kit.md`](file:///c:/Users/user/Desktop/video%20proyectos/algo/posts_kit.md) actualizado con todas las ventajas itemizadas.
- **Rediseño de Pantallas Finales (CTA / Outro) Limpias y de Alto Impacto (Cero Enredos)**:
  - **Enfoque Humano y Visual**: Eliminación de nombres de archivos técnicos inventados (`.zip`, `.sh`, `.json`) y listas complejas. Ahora la tarjeta central muestra un badge destacado (`PLANTILLA GRATIS`, `GUÍA RÁPIDA`, `CHECKLIST EXCLUSIVO`), un icono protagonista en pastilla con halo temático (`gift`, `sparkle`, `zap`), una sola frase clara de beneficio directo y dos badges sencillos (`Listo para usar`, `Ahorra cuota`).
  - **Caja de Acción Directa sin Repeticiones**: Barra de comentario con icono, llamada visual clara (*"Comenta [KEYWORD] en este post 👇"*) y promesa concisa de envío por mensaje directo sin textos redundantes.
  - **Contenido Simplificado por Guía**:
    - **Guía Antigravity (`agy`)**: *"¿Quieres mi setup listo?"* + *"Te paso el archivo de configuración para que solo copies y pegues en tu editor."* + `"AGY"`.
    - **Ventajas Antigravity (`agy_power`)**: *"¿Listo para probarlo?"* + *"Los atajos y trucos que uso a diario para programar el doble de rápido."* + `"VSCODE"`.
    - **Tokens Infinitos (`token_mastery`)**: *"¿Quieres la guía de tokens?"* + *"El paso a paso para exprimir tu cuota y no quedarte nunca sin tokens."* + `"TOKENS"`.
- **Eliminación Total del Badge / Avatar "SR"**:
  - Sustitución de todos los círculos de iniciales "SR" en `window.Header`, `window.QuoteSlide` y `window.BottomBand` por el branding oficial `Santi.Dev` con punto de acento temático y microiconos vectoriales SVG (`sparkle`, `terminal`), logrando un acabado editorial mucho más limpio.
- **Nueva Arquitectura Estética para Próximos Videos (Gaming Pixel Art & Dev Flat Blue)**:
  - **Fondos Planos Sin Cuadrícula Repetitiva (`bgStyle: 'flat'`, `bgCanvas`)**: Soporte en canvas y en motores de exportación (`modern-screenshot` y `html2canvas`) para fondos sólidos puros.
  - **Tipografías Especializadas por Género**:
    - `Space Grotesk` (`font-tech`): Tipografía técnica alargada y moderna para temas de código y arquitectura.
    - `Silkscreen` (`font-pixel`) y `Press Start 2P` (`font-arcade`): Tipografías extravagantes retro arcade para temas de videojuegos y game dev.
  - **Librería de Sprites Pixel Art (`window.PixelSprite`)**:
    - Sprites vectoriales con escalado nítido (banana arcade inspirada en Nano Banana, espada 8-bit, fantasma retro, moneda de oro, consola portátil, trofeo y corazón).
    - Soporte directo para sprites en portadas (`HeroSlide`, propiedad `d.sprite`) y filas de listas (`ListSlide`, propiedad `r.sprite`).
  - **Nuevos Presets de Tema en `window.THEMES`**:
    - `dev_blue`: Azul medianoche plano (`#080E1A`), acento cyan neón (`#38BDF8`), tipografía técnica y tarjetas con borde blueprint.
    - `pixel_arcade`: Púrpura synthwave (`#140827`), acento magenta neón (`#FF007F`), tipografía pixel y tarjetas con relieve 8-bit.
    - `pixel_cyber`: Fondo oscuro (`#081711`), acento verde arcade (`#00FF66`), tipografía pixelada y estética cyberpunk.

### v3.8 (2026-10-07)
- **Nuevo Carrusel: Tokens Infinitos & Flujo Multi-Cuentas (`token_mastery`)**:
  - **Estrategia Integral de Rendimiento de Tokens**: Incorporación de un carrusel completo de 8 diapositivas con el flujo táctico para multiplicar tokens y no agotar la cuota de los agentes.
  - **Planificación Externa con Gemini**: Técnica para diseñar arquitectura y planes maestros en Gemini Web/Canvas (ventana de contexto de 2M tokens) sin consumir tokens del IDE.
  - **El Dúo Antigravity + Opencode**: Asignación de roles óptima (Antigravity para arquitectura multi-archivo pesada y Opencode para refactorizaciones, pruebas y funciones ligeras en terminal).
  - **Compresión de Contexto con Grafos (Graphify) y Stitch MCP**: Estructuración del proyecto en grafos de dependencias para no reinyectar archivos enteros y generación de interfaces desacopladas vía MCP sin inflar el contexto con CSS manual.
  - **Git Checkpoints & Micro-commits**: Filosofía de commits tras cada hito validado para resetear la memoria residual del agente, mantener diffs limpios y posibilitar rollbacks instantáneos.
  - **Ventaja Multi-Cuenta Oficial vs Cursor**: Análisis comparativo demostrando cómo Antigravity permite alternar cuentas de Google oficiales sin penalizaciones ni bloqueos por hardware ID (a diferencia de Cursor que detecta y bloquea dispositivos).
  - **Rentabilidad de Gemini AI Pro**: Análisis del tier Google One AI Premium (2M tokens de contexto masivo, modelos de razonamiento prioritarios y API dedicada).
  - **Nuevo Tema Ciber-Neón (`tokens_pro`)**: Paleta verde menta tecnológico (`#00DF8F`), nuevos iconos vectoriales SVG (`zap`, `users`) y directivas de código en terminal.
  - **Kit de Publicación Completo**: Hook, caption estructurada, hashtags e instrucciones integradas en [`posts_kit.md`](file:///c:/Users/user/Desktop/video%20proyectos/algo/posts_kit.md) y en el modal interactivo de la app.

### v3.9 (2026-10-07)
- **Solución Definitiva de Descarga Completa y Responsividad en Carruseles de Instagram (4:5)**:
  - **Empaquetado Automático en ZIP Libre de Bloqueos (`JSZip`)**:
    - Integración de biblioteca local [js/vendor/jszip.min.js](file:///c:/Users/user/Desktop/video%20proyectos/algo/js/vendor/jszip.min.js) sin dependencias externas.
    - La función `downloadAll` ahora empaqueta todas las diapositivas HD del carrusel en un único archivo comprimido `${video.slug}_${format}_carrusel_completo.zip`.
    - Resuelve al 100% el bloqueo silencioso de descargas múltiples automáticas que Chrome, Edge y navegadores modernos activan al intentar disparar más de dos descargas secuenciales con `<a>.click()`.
    - Nuevo botón destacado en el modal de exportación para descargar el carrusel completo en ZIP con un solo clic, manteniendo opciones de guardado individual.
  - **Eliminación Total de Desbordamientos y Recortes Visuales en Instagram (4:5 · 1080×1350)**:
    - El formato Instagram Feed (4:5) cuenta con un 30% menos de altura vertical (506.25px en editor vs 720px en TikTok 9:16).
    - Calibración reactiva proporcional (`meta.format === 'instagram'`) en todos los componentes:
      - `CardFrame`: Padding interno reducido (`14px 18px 12px 18px`), bordes adaptativos y reajuste en layout `split` (`TOP_H = 86px`, titular a `1.35rem`) eliminando desbordamiento de cabecera.
      - `TopBand` y `BottomBand`: Alturas compactas (`68px` y `54px`) evitando colisiones con tarjetas en layouts de banda.
      - `ChecklistSlide`: Padding de filas reducido a `6px 10px` y tipografía a `12px` (eliminando hasta 72px de desbordamiento en diapositivas con 4+ elementos).
      - `StatSlide`: Reescalado del número de métrica (`4.8rem` vs `8.8rem`) y visualizadores (`68-72px` vs `118-135px`) para coexistir holgadamente con titulares y citas.
      - `CompareSlide`, `FlowSlide`, `CtaSlide`, `StepsSlide` y `ListSlide`: Alturas de conectores, paddings e iconografía calibrados para encajar con holgura y respiración.
    - Validación y auditoría integral con Edge Headless CDP confirmando **0 problemas de desbordamiento** (`issues: []`) en los 9 videos y todas sus diapositivas.

### v3.8 (2026-10-07)
- **Integración de Captura Real Oficial para la Tercera App (Caso 03 · Invoficlib / GiraStock)**:
  - **Sustitución de Imagen de Producción**: Reemplazo de la maqueta temporal por la captura real del sistema de gestión en producción desplegado en Vercel ([`assets/invoficlib_live.png`](file:///c:/Users/user/Desktop/video%20proyectos/algo/assets/invoficlib_live.png)).
  - **Limpieza de Datos Personales y Enmarcado Web Profesional**: Eliminación de la barra de tareas de Windows 11 (notificaciones de WhatsApp, reloj y aplicaciones personales) y de las pestañas privadas del navegador, sustituyéndolas por una cabecera minimalista oscura con controles Mac (`● ● ●`) y píldora de URL segura `🔒 invoficlib-beta.vercel.app`.
  - **Preservación de Autoría y Marca Personal**: Conservación intacta del saludo del desarrollador (*"Hola, Santiago Rivero 👋"*) y perfil de usuario (*Santiago Rivero / Developer*), reforzando la credibilidad técnica y el portafolio real.
  - **Validación Visual Dual**: Verificación y pruebas de render en resoluciones nativas de TikTok (1080×1920) e Instagram (1080×1350) garantizando ausencia de solapamientos o recortes en tarjetas de contenido.

### v3.7 (2026-10-05)
- **Fidelidad Total de Exportación HD (Fondo y Elementos sin Recortes)**:
  - **Cuadrícula Técnica Vectorial SVG (`window.GridPattern`)**: Implementación de un patrón SVG nativo `<pattern id="blueprint-grid">` a `27px × 27px` y trazo de alta definición (`rgba(255, 255, 255, 0.15)`). Elimina por completo la pérdida de líneas horizontales provocada por el subpixel sampling de gradientes CSS en canvas/foreignObject de Safari y Chrome.
  - **Distribución Inteligente de Fondos por Layout (`SLOTS_BY_LAYOUT`)**: Mapeo de coordenadas seguro y balanceado para todos los layouts (`low`, `high`, `float`, `tilt`, `full`, `split`) con 6 elementos visuales HUD (comandos terminal, etiquetas dev, barras HP, glifos PlayStation y códigos).
  - **Margen Inferior Limpio Anti-recortes**: Elevación del margen inferior en layouts `low`, `full` y `split` (24–26px) para que las etiquetas inferiores (`IDEA -> PROYECTO`, `$ npx create-app`, glifos) respiren con holgura y nunca queden seccionadas o tapadas por el borde de la tarjeta.
  - **Badges y Etiquetas sin Saltos de Línea**: Aplicación de `whitespace-nowrap` y tamaños métricos calibrados en kickers superiores, esquinas de arte (`CONSOLE · 3D`) y pills interiores (`DEV · GAMING STACK`).
  - **Motor `modern-screenshot` v4.7.0 Local**: Alojado en [js/vendor/modern-screenshot.min.js](file:///c:/Users/user/Desktop/video%20proyectos/algo/js/vendor/modern-screenshot.min.js) con clonación directa de DOM para máxima fidelidad visual, manteniendo `html2canvas` como respaldo automático.

### v3.4 (2026-10-03)
- **Optimización Integral para Teléfonos Móviles (Mobile-First)**:
  - **Lienzo Adaptativo y Auto-escalado**: Implementación de contenedor elástico (`slide-scaler-outer` y `slide-scaler-inner`) que calcula dinámicamente el factor de escala según el ancho exacto del smartphone (iPhone SE, iPhone 14/15/16, Galaxy S22-S24, Pixel), manteniendo 24px de margen seguro sin desbordamiento horizontal.
  - **Navegación Táctil por Gestos (Swipe)**: Soporte nativo para deslizar el pulgar a la izquierda (siguiente slide) o derecha (slide anterior) directamente sobre la tarjeta con validación de dominante horizontal.
  - **Cabecera Móvil Sticky Inteligente**: Barra superior fijada con logotipo `Santi.Dev`, selector rápido de formato (`9:16` vs `4:5`) y disparador de catálogo de videos (`1/8 ▾`).
  - **Sub-barra con Píldoras Horizontales**: Título del carrusel activo (con chevron para cambio rápido) y carrusel de números de diapositiva (`1, 2, 3...`) con indicador de progreso `Slide X de Y`.
  - **Bottom Sheet / Drawer Desplegable**: Panel modal inferior para explorar los 8 carruseles agrupados por sus 3 series temáticas, con badges de cantidad de slides, acento temático y selección táctil instantánea.
  - **Botonera Inferior Fija para Pulgares**: Acceso rápido con botón principal `Descargar Slide (HD)` y secundario `Todo`, visualización de estado en vivo (`Exportando...`) y margen de reserva (`h-24`) para evitar solapamientos con el contenido.
  - **Exportación HD Libre de Recortes**: Desactivación temporal del escalado y del `overflow: hidden` durante la captura con `html2canvas` para garantizar PNGs puros a 1080×1920 (TikTok) y 1080×1350 (Instagram) sin artefactos visuales ni recortes de contenedor.
  - **Preservación Total del Modo Escritorio**: La barra lateral completa de 325px y los atajos de teclado (`←` `→`) se mantienen activos en pantallas medianas y grandes (`md:flex`).

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
