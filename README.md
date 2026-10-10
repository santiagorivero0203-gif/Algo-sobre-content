# Santi.Dev Creator · Generador Modular de Carruseles (Dev + Gaming + Mova Suite)

> **Generador y editor de carruseles de contenido técnico y social en formato vertical (1080×1920 y 1080×1350) para TikTok, Instagram Reels, Instagram Feed y YouTube Shorts.**
> Construido con arquitectura **Local-First / Web Native**: React 18, Vanilla CSS, motores de captura canvas en alta definición (`modern-screenshot` + `html2canvas`), empaquetado ZIP (`JSZip`) y soporte nativo para **iOS Safari Web Share API**.

---

## 📌 Visión General del Proyecto

**Santi.Dev Creator** es una plataforma web modular diseñada para crear, personalizar, previsualizar y exportar carruseles visuales de alto impacto para redes sociales con **fidelidad visual del 100%**. 

El sistema combina:
1. **Diseño "Design as Code"**: Renderizado determinista basado en estándares W3C (SVG, Flexbox, CSS Grid) desacoplado de dependencias pesadas.
2. **Doble Enfoque Visual & Editorial**:
   - **Línea Santi.Dev / Dev & Gaming**: Tarjetas oscuras mate sobre grid blueprint técnico, acentos neón, código sintáctico, iconografía SVG propia y sprites pixel art 8-bit.
   - **Línea Mova Suite (@mova.app)**: Experiencia inmersiva *full-bleed* en formato Instagram Feed (4:5), fotoperiodismo polaroid, simulación HUD de visión artificial a 60 FPS y contenido enfocado en tecnología inclusiva para la comunidad sorda en Venezuela y Latinoamérica.
3. **Motor de Exportación HD Blindado para Móviles y Escritorio**: Resuelve las restricciones de memoria GPU de WebKit en iOS Safari, bloqueos de descargas automáticas múltiples y discrepancias de renderizado entre dispositivos.

---

## 🛠️ Arquitectura del Sistema

El proyecto sigue una arquitectura **desacoplada, modular y local-first** sin necesidad de paso de compilación previo en Node.js (transpilación en vivo mediante Babel Standalone en el navegador):

```
algo/
├── index.html                 # Punto de entrada HTML5 principal con control de versiones (v11)
├── algo.html                  # Punto de entrada alternativo para compatibilidad
├── css/
│   └── styles.css             # Tokens de diseño, reset CSS, contenedor 9:16/4:5 y rejilla blueprint
├── js/
│   ├── icons.js               # Biblioteca de iconos SVG propios, pixel art 8-bit y landmarks MediaPipe
│   ├── accounts.js            # Registro central de marcas (Santi.Dev, Mova, Endo, GiraStock)
│   ├── themes.js              # Paletas cromáticas, generador de atmósferas y patrones de fondo
│   ├── videos.js              # Dataset con los 12 carruseles estructurados (3 series temáticas)
│   ├── components.js          # Orquestador de vistas (Slide, MovaSlide, CardFrame, MovaHeader, etc.)
│   ├── modals.js              # Modales desacoplados (ExportModal, MobileDrawer, PostKitModal, GitHubSyncModal)
│   ├── inspector.js           # Panel de edición StudioInspector (modo Studio Editor ?edit=1)
│   ├── app.js                 # Estado global React, motor de capturas canvas y controladores de exportación
│   └── vendor/
│       ├── modern-screenshot.min.js # Motor primario de captura DOM -> Canvas (v4.7.0)
│       └── jszip.min.js             # Empaquetador binario de archivos ZIP
├── assets/                    # Capturas reales de despliegues en vivo (Vercel) + activos gráficos
├── posts_kit.md               # Documento maestro con captions, hooks, hashtags y audios recomendados
├── AGENTS.md                  # Reglas editoriales y técnicas globales para desarrollo agéntico
├── GEMINI.md                  # Reglas editoriales y técnicas de retención y scan de 3 segundos
└── README.md                  # Documentación integral del proyecto
```

---

## ⚡ Tecnologías y Herramientas Utilizadas

| Categoría | Tecnología / Biblioteca | Propósito e Integración |
|---|---|---|
| **Núcleo Frontend** | React 18 (UMD) + Babel Standalone | Componentización reactiva en tiempo real sin Build Step en servidor. |
| **Estilos & Layout** | Vanilla CSS + Tailwind CSS (CDN) | Tokens cromáticos, rejilla blueprint SVG y utilidades de disposición rápida. |
| **Tipografía** | Google Fonts (`Inter`, `JetBrains Mono`, `Space Grotesk`, `Silkscreen`, `Press Start 2P`) | Jerarquía visual clara para dev, tech y pixel art gaming. |
| **Captura Gráfica** | `modern-screenshot` + `html2canvas` | Conversión determinista de nodos HTML/CSS a Canvas PNG de 1080px de ancho. |
| **Empaquetado** | `JSZip` | Compresión de carruseles completos en archivos `.zip` en 1 clic. |
| **Iconografía** | SVGs Nativos (`icons.js`) + Lucide Icons + FontAwesome 6 | Iconos vectoriales de alto contraste, marcas y landmarks de visón artificial. |
| **Persistencia & GitOps** | `localStorage` + GitHub REST API | Persistencia local de ediciones y sincronización con GitHub/Vercel sin backend. |
| **Integración Móvil** | Web Share API (`navigator.share`) | Guardado directo de imágenes en la app Fotos en iPhone / iOS Safari. |

---

## 🌟 Funciones Clave del Sistema

### 1. Selector de Formato en Tiempo Real (TikTok `9:16` vs Instagram `4:5`)
- **TikTok / Shorts (`9:16` · 1080×1920 px)**: Lienzo vertical extendido con zonas seguras superior e inferior para overlays de la plataforma.
- **Instagram Feed (`4:5` · 1080×1350 px)**: Proporción optimizada para el feed de Instagram. Reescalado automático de paddings, fuentes y contenedores sin recortes.

### 2. Suite Mova (@mova.app) · "Rompiendo el Silencio"
- **Experiencia Full-Bleed Exclusiva**: Renderizado al 100% del frame en 4:5 sin bordes blancos genéricos.
- **Componentes Fotoperiodísticos Polaroid**: Colegios reales (Colegio La Consolación Caracas) con estética polaroid y badges de verificación.
- **Mockup HUD de Cámara en Vivo**: Simulación de la interfaz de `CameraScreen.jsx` con 21 landmarks de mano, badge pulsante `LIVE · 60 FPS` y traducción en burbuja flotante.
- **Selector de Idiomas de Señas**: Réplica del selector deslizante con banderas vectoriales (🇻🇪 LSV, 🇺🇸 ASL, 🇪🇸 LSE).

### 3. Modo Studio Editor (`?edit=1`)
- Panel interactivo **StudioInspector** para modificar titulares, cuerpos de texto, layouts, tonos de tarjeta y elementos personalizados.
- Guardado reactivo en `localStorage` (`algo_custom_videos`) con opción de reseteo rápido.
- **GitHubSyncModal**: Conexión vía GitHub REST API para guardar cambios directamente en la rama `main` y desplegar a producción en Vercel.

### 4. Kit de Publicación Interactivo (PostKit)
- Modal con captions completas, hooks conversacionales, hashtags segmentados, horarios sugeridos de publicación y pistas de audio recomendadas para los 12 carruseles.
- Botones de copiado en 1 clic al portapapeles con confirmación visual instantánea (`✓ ¡Copiado!`).

### 5. Motor de Exportación Ultra-Robusto (Fix iOS WebKit Ceiling)
- **Cero Leaks de Memoria Canvas**: Destrucción activa de buffers GPU (`canvas.width = 0; height = 0`) para no agotar la memoria de WebKit (~224MB).
- **Fallback `toDataURL`**: Si `toBlob()` devuelve `null` en móviles bajo presión de RAM, convierte mediante base64 binario sin tirar error.
- **Guardado en Fotos (iPhone)**: Permite enviar todas las imágenes del carrusel directamente al carrete de Fotos de iOS usando `navigator.share({ files: allFiles })`.

---

## 📚 Catálogo de Contenido: 12 Carruseles en 3 Series

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎬 SERIE 1: TRILOGÍA "DE LA IDEA AL CÓDIGO" (Santi.Dev)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. stack1         │ Parte 1: Stack Secreto (Inspiración, Lógica & Arte)     │
│ 2. stack2         │ Parte 2: Automatización y MCP (Stitch, Supabase & Git) │
│ 3. stack3         │ Parte 3: El Arte del Prompting (Estructura vs Caos)     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🎬 SERIE 2: CASOS REALES, PITCH & SUITE MOVA                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. endo           │ The Last Endo · Indie Game (Campeón Kurios 2026)        │
│ 5. mova           │ Mova v2.0: Manifiesto Oficial (Experiencia 360°)         │
│ 6. mova_inspiracion│ Mova: En Qué Nos Inspiramos (Origen La Consolación)     │
│ 7. mova_idea      │ Mova: Nuestra Idea (Visión IA 60 FPS sin Internet)     │
│ 8. mova_mision    │ Mova: Nuestra Misión (3 Compromisos de Inclusión)      │
│ 9. gira           │ GiraStock / Soluciones Reales (B2B SaaS Dev)           │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🎬 SERIE 3: GUÍAS DE HERRAMIENTAS & RENDIMIENTO                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 10. agy           │ Guía: Antigravity (Qué es, instalación & setup)        │
│ 11. agy_power     │ Ventajas: Antigravity (Superpoderes agénticos)         │
│ 12. token_mastery │ Tokens Infinitos: Flujo Pro (Gemini 2M & Multi-Cuenta)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏆 Logros Técnicos Destacados

1. **Resolución del Techo de Memoria en WebKit (iOS Safari)**: Eliminación completa de caídas al exportar slides finales (4, 5, 7 o 10) mediante purga activa de texturas canvas y fallback binario.
2. **Soporte Nativo de Guardado Masivo en iPhone**: Implementación de Web Share API multi-archivo para guardar carruseles completos en la app Fotos en 1 solo paso.
3. **Empaquetado ZIP de 1 Clic**: Generación instantánea de archivos `.zip` en el navegador con `JSZip` evitando bloqueos de descargas múltiples automáticas.
4. **Experiencia Mova Full-Bleed en Instagram (4:5)**: Rediseño visual sin tarjetas genéricas, reproduciendo fielmente la interfaz real de la aplicación de accesibilidad.
5. **Flujo GitOps Sin Servidor**: Edición e integración continua directamente contra GitHub REST API y Vercel sin requerir Node.js ni bases de datos.

---

## 🎯 Reglas Editoriales & Directrices de Contenido (AGENTS.md / GEMINI.md)

Todo el contenido generado o editado en esta plataforma sigue estrictamente cuatro reglas globales:

1. **Contenido Autoconclusivo (Self-Contained)**: Cada carrusel funciona como una pieza independiente. Cualquier espectador entiende el problema, la solución técnica y la conclusión sin vacíos ni requerir videos previos.
2. **Coherencia Narrativa Estricta**:
   - **Hook:** Dolor o pregunta de alto enganche conversacional.
   - **Estrategia:** La lógica o arquitectura detrás de la solución.
   - **Táctica / Código:** Demostración práctica (terminal, comparativa o interfaz).
   - **CTA:** Llamado a la acción claro, honesto y enfocado en la comunidad.
3. **Regla de Escaneo en 3 Segundos (Cero Sobrecontextualización)**:
   - Titulares cortos con énfasis en palabras clave (`*resaltado*`).
   - Textos de máximo 2 a 3 líneas por bloque.
   - Uso obligatorio de iconografía SVG, badges y esquemas visuales escaneables.
4. **Fidelidad Técnica de Código**:
   - Todo código o directiva debe ser válido, comentado y probado.
   - Reutilización inteligente de componentes (`CardFrame`, `Backdrop`, `TopBand`, `BottomBand`, `Slide`, `GridPattern`).

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

> [!IMPORTANT]
> **Requisito:** Debe ejecutarse mediante un servidor HTTP local para evitar que las políticas CORS del navegador bloqueen la lectura de fuentes e imágenes en los canvas de exportación.

```powershell
# Opción 1: Con npx serve en el puerto 3333
npx -y serve -l 3333 --no-port-switching .

# Opción 2: Con Python
python -m http.server 3333
```

Abre en tu navegador:
- [http://localhost:3333/?account=mova](http://localhost:3333/?account=mova) (Suite Mova)
- [http://localhost:3333/?account=santidev](http://localhost:3333/?account=santidev) (Santi.Dev)
- [http://localhost:3333/?edit=1](http://localhost:3333/?edit=1) (Modo Studio Editor)

### ⌨️ Atajos de Teclado y Parámetros de URL
- **Navegación**: Teclas `←` y `→` para cambiar de diapositiva.
- **Selección de Video**: `?v=mova_idea` o `?v=agy_power`
- **Selección de Slide**: `&s=0` (Slide 1), `&s=4` (Slide 5)
- **Forzar Formato**: `&fmt=instagram` (4:5) o `&fmt=tiktok` (9:16)
- **Modo Solo (Slide Pura sin UI)**: `?solo=1&v=mova&s=0&fmt=instagram` (Ideal para grabaciones de pantalla)

---

## 📄 Registro de Versiones Recientes

- **v11.0 (2026-10-09)**: Solución definitiva al fallo de descarga en últimas slides (purga de memoria GPU canvas, fallback `toDataURL` binario, guardado masivo en Fotos para iPhone con `navigator.share`, navegación individual interactiva en modal y reintentos con backoff progresivo).
- **v10.0 (2026-10-08)**: Rediseño Mova Full-Bleed 4:5 en Instagram Feed, eliminación de tarjetas genéricas para Mova, incorporación de logos limpios en `assets/` y kit de publicación interactivo (PostKit).
- **v4.0 (2026-10-08)**: Hub Multi-Marca (`js/accounts.js`), Modo Studio Editor con inspector en vivo y GitOps GitHub REST API.
