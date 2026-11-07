---
name: santidev-carousel-builder
description: Genera carruseles técnicos modulares (1080x1920 para TikTok/Shorts y 1080x1350 para Instagram Feed) estructurados en código JavaScript para Santi.Dev (js/videos.js). Aplica reglas de escaneo en 3 segundos, títulos con énfasis, componentes nativos (hero, text, code, compare, points, polaroid, hud, cta) y las 4 identidades de marca (Santi.Dev, Mova, The Last Endo, GiraStock).
---

# Santi.Dev Carousel Builder · Generador Modular de Carruseles

Esta skill guía la concepción, redacción y estructuración técnica de carruseles de alto impacto para la plataforma **Santi.Dev Creator** (`js/videos.js` y `index.html`).

---

## 🎯 1. Reglas Editoriales Obligatorias (AGENTS.md & GEMINI.md)

1. **Contenido Autoconclusivo (Self-Contained):**
   - El carrusel debe entenderse de principio a fin sin necesidad de contexto previo.
   - Todo término técnico o herramienta (`Antigravity`, `Opencode`, `Stitch MCP`, `Graphify`, `MediaPipe`) debe justificarse en una sola frase con su beneficio directo.

2. **Coherencia Narrativa Estricta (Arco de 5 a 6 Diapositivas):**
   - **Slide 1 (Hook):** Detiene el scroll. Plantea un dolor concreto o pregunta intrigante.
   - **Slide 2 (Estrategia):** La lógica detrás de la solución (el "qué" y "por qué").
   - **Slide 3 (Táctica / Código / Demostración):** Ejemplo práctico, terminal, comparativa o polaroid.
   - **Slide 4 (Resultado / Síntesis):** El beneficio cuantitativo o cualitativo medible.
   - **Slide 5 / 6 (CTA Comunitario):** Llamado a la acción honesto ("Guarda este post", "Comenta X", "Sígueme en @cuenta").

3. **Cero Sobrecontextualización (Escaneable en 3 Segundos):**
   - Máximo 2 a 3 líneas de texto por diapositiva.
   - Titulares cortos con palabras clave destacadas entre asteriscos: `*resaltado*`.
   - Uso obligatorio de iconografía SVG (`icons.js`), badges y esquemas visuales.

---

## 🎨 2. Marcas y Cuentas Disponibles (`js/accounts.js`)

| Account ID | Nombre de Marca | Handle | Color Insignia | Tipografías | Tema Predeterminado | Enfoque |
|---|---|---|---|---|---|---|
| `santidev` | Santi.Dev | `@santi.dev` | `#2E9D63` | Space Grotesk + JetBrains Mono | `tokens_pro` / `stack1` | Arquitectura, Agentes IA, Indie Hacking |
| `mova` | Mova | `@mova.app` | `#3B82F6` / `#FFA500` | Inter + Space Grotesk | `mova` | Accesibilidad, Lengua de Señas, HUD 21D |
| `endo` | The Last Endo | `@thelastendo` | `#EE6A3E` | Silkscreen + Press Start 2P | `pixel_arcade` | Gamedev 2D, Canvas 60 FPS, Sigilo |
| `girastock` | GiraStock | `@girastock` | `#EDB828` | Inter + JetBrains Mono | `gira` | B2B, Punto de Venta, Offline-First |

---

## 🧩 3. Tipos de Diapositivas y Esquemas Admitidos (`js/components.js`)

Cada objeto slide dentro de `slides[]` debe utilizar uno de los siguientes tipos:

### Tipo `hero` (Portada / Gancho)
```javascript
{
    type: 'hero',
    layout: 'low', // o 'high' / 'center'
    header: 'none', // o 'full'
    kicker: 'Trilogía Creadores · Parte 1',
    title: '¿Juegos y webs *sin saber programar*?',
    art: 'gamepad', // nombre del icono en icons.js
    sub: 'Te enseño mi stack técnico secreto para empezar hoy mismo.',
    prod: 'Fondo negro mate, texto blanco, acento verde y control de consola.'
}
```

### Tipo `text` (Concepto / Estrategia con Iconos)
```javascript
{
    type: 'text',
    layout: 'full',
    header: 'full',
    title: 'Inspiración: *Roba como un artista*',
    body: 'Analiza juegos y webs que amas para *fusionar mecánicas* y crear tu idea única.',
    icons: [
        { name: 'gamepad', label: 'Juegos Top' },
        { name: 'eye', label: 'Analiza' },
        { name: 'code', label: 'Tu Toque' }
    ],
    foot: 'No empieces de cero: combina lo mejor de la industria con tu visión propia.'
}
```

### Tipo `code` (Terminal / Código Sintáctico)
```javascript
{
    type: 'code',
    layout: 'high',
    header: 'full',
    title: 'Lógica: *Antigravity + Opencode*',
    file: 'terminal ~ logic-engine',
    lang: 'bash',
    code: [
        '# 1. Antigravity hace el código pesado',
        '$ agy build --mechanics="stealth" --mcp',
        '✓ Arquitectura base generada (85% del trabajo)',
        '',
        '# 2. Opencode pule detalles finos',
        '$ opencode optimize --save-tokens',
        '✓ 0 errores de sintaxis · 1,200 tokens ahorrados'
    ],
    foot: 'Antigravity hace el código pesado. Opencode corrige los detalles mínimos ahorrando tokens.'
}
```

### Tipo `compare` (Antes vs. Después)
```javascript
{
    type: 'compare',
    header: 'full',
    title: 'Optimización: *Antes vs. Después*',
    before: {
        badge: 'Sin Optimizar',
        val: '60,000 Tokens',
        desc: 'Prompt gigante, alucinaciones y colapso de contexto.'
    },
    after: {
        badge: 'Con Graphify AST',
        val: '4,000 Tokens',
        desc: 'Poda de dependencias, foco atómico y cero errores.'
    },
    foot: 'Reducción del 93% en consumo de tokens manteniendo precisión quirúrgica.'
}
```

### Tipo `polaroid` (Mova / Fotoperiodismo Real)
```javascript
{
    type: 'polaroid',
    header: 'full',
    title: 'Impacto Real en *Aulas de Clase*',
    image: 'assets/colegio_consolacion.jpg',
    caption: 'Colegio La Consolación · Caracas, Venezuela',
    badgeText: 'Caso Verificado',
    foot: 'Pruebas directas de validación con estudiantes sordos y docentes.'
}
```

### Tipo `hud` (Mova / Visión Artificial 21D)
```javascript
{
    type: 'hud',
    header: 'full',
    title: 'Detección Gestual a *60 FPS*',
    fps: '60 FPS',
    landmarks: 21,
    translation: 'Hola, ¿cómo estás?',
    confidence: '99.4%',
    foot: 'Procesamiento 100% en el dispositivo sin enviar datos a servidores externos.'
}
```

### Tipo `cta` (Cierre y Llamada a la Acción)
```javascript
{
    type: 'cta',
    header: 'full',
    kicker: '¿Listo para empezar?',
    title: 'Guarda este post y *empieza hoy*',
    body: 'Sígueme en *@santi.dev* para más arquitectura, agentes autónomos y trucos de desarrollo.',
    actionLabel: 'Guardar Post',
    foot: 'Comenta "PARTE 2" para enviarte los prompts y scripts por mensaje directo.'
}
```

---

## 📋 4. Estructura de Salida para Inyectar en `js/videos.js`

Al crear un nuevo carrusel, debe entregarse en este formato exacto:

```javascript
{
    id: 'id_unico',
    accountId: 'santidev', // 'santidev' | 'mova' | 'endo' | 'girastock'
    slug: 'slug_descriptivo',
    theme: 'tokens_pro',
    caseNo: 1,
    group: 'Nombre de la Serie',
    title: 'Título del Carrusel',
    subtitle: 'Subtítulo explicativo en 1 línea',
    post: {
        hook: '¿Gancho inicial que detiene el scroll? 👇',
        caption: `Texto completo de descripción para redes sociales...`,
        hashtags: ['#hashtag1', '#hashtag2', '#hashtag3'],
        bestTime: '18:00 - 21:00',
        sound: 'Estilo de audio sugerido (ej. Synthwave / Lo-Fi Beats)'
    },
    slides: [
        // 5 a 6 diapositivas con los esquemas descritos arriba
    ]
}
```
