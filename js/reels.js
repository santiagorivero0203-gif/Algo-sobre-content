/**
 * =====================================================================
 * SANTI.DEV · COLECCIÓN OFICIAL DE REELS CINÉTICOS EDUCATIVOS (60 FPS)
 * =====================================================================
 * Estructurados con la misma riqueza, rigor técnico y modalidad de las slides:
 *   - Información densa y útil para superponer con voz en off (Voice-Over).
 *   - 6 Videos correspondientes a las series clave (Stack Secreto, MCP,
 *     Mova Accesibilidad, The Last Endo 60 FPS, GiraStock y Tokens Pro).
 *   - Beats estructurados con titulares, puntos técnicos, bloques de código
 *     y comparativas accionables.
 *   - Guión de locución (vo) exacto por beat para narración en vivo.
 * =====================================================================
 */

window.REELS = [
    // =====================================================================
    // REEL 1: SANTI.DEV · PARTE 1: STACK SECRETO (JUEGOS Y WEBS SIN PROGRAMAR)
    // =====================================================================
    {
        id: 'reel_stack1',
        accountId: 'santidev',
        slug: 'stack_visual_y_logico',
        theme: 'stack1',
        title: 'Parte 1: Stack Secreto',
        subtitle: 'Juegos y webs sin saber programar paso a paso',
        duration_ms: 12500,
        duration: 12.5,
        fps: 60,
        kicker: 'SANTI.DEV · TRILOGÍA CREADORES',
        brandIcon: 'fa-gamepad',
        accentColor: '#2E9D63',
        secondaryColor: '#57c78d',
        videoUrl: 'videos/stack_secreto.mp4',
        post: {
            hook: '¿Juegos y webs sin saber programar? Te enseño mi stack secreto 👇',
            caption: `¿Te imaginas crear tus propios videojuegos y aplicaciones web sin pasar meses atascado en la sintaxis?
En este video te revelo el stack técnico exacto que uso para pasar de una idea en la cabeza a un prototipo funcionando:

1️⃣ Inspiración: Roba como un artista. Analiza las mecánicas de juegos y webs que amas y combínalas con tu toque personal.
2️⃣ Lógica: Google Antigravity para levantar el 85% de la arquitectura base + Opencode para pulir detalles finos y ahorrar miles de tokens.
3️⃣ Arte: Nano Banana para generar sprites increíbles con IA y Remove BG para dejarlos transparentes en 1 clic.

💾 Guarda este video para tu próximo proyecto.
👉 Comenta "PARTE 2" para la guía de bases de datos y GitHub.`,
            hashtags: ['#programacion', '#desarrolloweb', '#gamedev', '#antigravity', '#opencode', '#ia', '#indiedev'],
            bestTime: '18:00 - 21:00',
            sound: 'Synthwave / Lo-Fi Beats instrumental'
        },
        beats: [
            {
                id: 1,
                name: 'Hook Inicial',
                start_ms: 0,
                end_ms: 2500,
                type: 'hero',
                badge: 'TRILOGÍA CREADORES · PARTE 1',
                title: '¿Juegos y webs *sin saber programar*?',
                sub: 'Te enseño mi stack técnico secreto para pasar de la idea al código hoy mismo.',
                kicker: 'DE LA IDEA AL CÓDIGO',
                vo: 'Crea juegos y apps sin saber programar.'
            },
            {
                id: 2,
                name: 'Inspiración',
                start_ms: 2500,
                end_ms: 5000,
                type: 'points',
                badge: 'PASO 1 · INSPIRACIÓN',
                title: 'Roba como un *artista*',
                sub: 'Analiza juegos y webs que amas para fusionar mecánicas y crear tu idea única.',
                points: [
                    { icon: 'fa-gamepad', label: 'Desglosa mecánicas top', desc: 'Identifica el bucle central de interacción que hace divertido el producto.' },
                    { icon: 'fa-eye', label: 'Elimina lo innecesario', desc: 'Quédate solo con la regla esencial sin reinventar la rueda.' },
                    { icon: 'fa-wand-magic-sparkles', label: 'Añade tu toque propio', desc: 'Combina dos conceptos distintos para lograr una propuesta fresca.' }
                ],
                vo: 'Combina ideas que ya funcionan.'
            },
            {
                id: 3,
                name: 'Lógica & Código',
                start_ms: 5000,
                end_ms: 7500,
                type: 'code',
                badge: 'PASO 2 · MOTOR DE LÓGICA',
                title: 'Antigravity + *Opencode*',
                sub: 'Google Antigravity genera el 85% y Opencode pule detalles finos ahorrando tokens.',
                codeSnippet: {
                    file: 'terminal ~ logic-engine',
                    lines: [
                        '# 1. Antigravity genera la arquitectura pesada',
                        '$ agy build --mechanics="stealth" --mcp',
                        '✓ Arquitectura base generada (85% del trabajo)',
                        '# 2. Opencode optimiza y pule detalles finos',
                        '$ opencode optimize --save-tokens',
                        '✓ 0 errores sintaxis · 1,200 tokens ahorrados'
                    ]
                },
                vo: 'Deja el código a la IA.'
            },
            {
                id: 4,
                name: 'Arte & Sprites',
                start_ms: 7500,
                end_ms: 10000,
                type: 'points',
                badge: 'PASO 3 · ASSETS VISUALES',
                title: 'Nano Banana + *Remove BG*',
                sub: 'Genera sprites y texturas con IA y déjalos transparentes en 1 clic.',
                points: [
                    { icon: 'fa-image', label: 'Nano Banana (Sprites IA)', desc: 'Genera personajes, fondos y tilesets retro en alta definición.' },
                    { icon: 'fa-scissors', label: 'Remove BG en 1 Clic', desc: 'Fondo transparente instantáneo listo para Canvas o CSS.' },
                    { icon: 'fa-bolt', label: 'Listo para Producción', desc: 'Cero photoshop manual: importación directa a tu código.' }
                ],
                vo: 'Genera el arte en segundos.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 10000,
                end_ms: 12500,
                type: 'cta',
                badge: 'PARTE 2 DISPONIBLE',
                title: 'Guarda *este video*',
                sub: 'En la parte 2: Cómo automatizo bases de datos en la nube y subo todo a GitHub.',
                ctaData: {
                    keyword: 'PARTE 2',
                    line: 'Comenta "PARTE 2" y te paso la plantilla completa por mensaje directo.',
                    handle: '@santi.dev'
                },
                vo: 'Comenta STACK y te paso todo.'
            }
        ]
    },

    // =====================================================================
    // REEL 2: SANTI.DEV · PARTE 2: AUTOMATIZACIÓN CON MCP (MODEL CONTEXT PROTOCOL)
    // =====================================================================
    {
        id: 'reel_stack2',
        accountId: 'santidev',
        slug: 'automatizacion_y_mcp',
        theme: 'stack2',
        title: 'Parte 2: Automatización',
        subtitle: 'El trabajo sucio resuelto con herramientas MCP',
        duration_ms: 12500,
        duration: 12.5,
        fps: 60,
        kicker: 'SANTI.DEV · MCP AUTOMATION',
        brandIcon: 'fa-gear',
        accentColor: '#F08A35',
        secondaryColor: '#f39e56',
        post: {
            hook: 'Deja de subir archivos a mano. Así automatizo todo con MCP 👇',
            caption: `Programar en 2026 no se trata de hacer tareas repetitivas a mano. Se trata de conectar herramientas inteligentes:

⚙️ Stitch MCP: Conecta tu editor con Figma y APIs sin cambiar de ventana.
🗄️ Supabase MCP: Genera esquemas SQL en producción con lenguaje natural.
🐙 Git MCP: Sincronización automática con GitHub para respaldar avances sin errores.

💾 Guarda este video y compártelo con tu compa dev.
👉 Comenta "MCP" para la plantilla de configuración lista.`,
            hashtags: ['#mcp', '#antigravity', '#automatizacion', '#supabase', '#stitchmcp', '#developer', '#github'],
            bestTime: '12:00 - 15:00 o 19:00 - 22:00',
            sound: 'Rhythm coding beat / Electronic minimal'
        },
        beats: [
            {
                id: 1,
                name: 'Hook Inicial',
                start_ms: 0,
                end_ms: 2500,
                type: 'hero',
                badge: 'TRILOGÍA CREADORES · PARTE 2',
                title: 'Automatiza tu código *como un pro*',
                sub: 'Olvida subir archivos a mano. Te presento el poder de las herramientas MCP.',
                kicker: 'WORKFLOW MODERNO 2026',
                vo: 'Deja de programar tareas repetitivas.'
            },
            {
                id: 2,
                name: 'Stitch MCP',
                start_ms: 2500,
                end_ms: 5000,
                type: 'points',
                badge: 'HERRAMIENTA 1 · DISEÑO A CÓDIGO',
                title: 'Stitch MCP: *Figma directo*',
                sub: 'Conecta tu editor de código con Figma y APIs sin salir de la ventana.',
                points: [
                    { icon: 'fa-palette', label: 'Lectura de Pantallas', desc: 'Extrae tokens de color, márgenes y jerarquía de diseño.' },
                    { icon: 'fa-code', label: 'Componentes Limpios', desc: 'Convierte prototipos visuales en código modular sin desalinear.' },
                    { icon: 'fa-layer-group', label: '0 Copiar y Pegar', desc: 'Sincronización bidireccional entre la IA y tu interfaz.' }
                ],
                vo: 'Pasa tu diseño directo al editor.'
            },
            {
                id: 3,
                name: 'Supabase MCP',
                start_ms: 5000,
                end_ms: 7500,
                type: 'code',
                badge: 'HERRAMIENTA 2 · BACKEND SQL',
                title: 'Supabase MCP: *SQL en vivo*',
                sub: 'Pide tus tablas en lenguaje natural y levanta un backend en segundos.',
                codeSnippet: {
                    file: 'terminal ~ supabase-mcp',
                    lines: [
                        '$ mcp.connect("supabase")',
                        '✓ Conexión establecida con proyecto cloud',
                        '$ prompt: "Crea tabla usuarios con auth y compras"',
                        '✓ Migración SQL ejecutada en vivo (0 errores)',
                        '✓ RLS habilitado y tipos TypeScript generados'
                    ]
                },
                vo: 'Crea bases de datos al instante.'
            },
            {
                id: 4,
                name: 'Git MCP',
                start_ms: 7500,
                end_ms: 10000,
                type: 'points',
                badge: 'HERRAMIENTA 3 · CONTROL DE VERSIONES',
                title: 'Git MCP: *Cero conflictos*',
                sub: 'Sincronización automática con GitHub para respaldar tus avances sin miedo.',
                points: [
                    { icon: 'fa-code-branch', label: 'Checkpoints Inteligentes', desc: 'Guarda ramas de prueba antes de cada cambio complejo.' },
                    { icon: 'fa-cloud-arrow-up', label: 'Push Automático', desc: 'Despliegues en Vercel disparados con cada checkpoint.' },
                    { icon: 'fa-shield-halved', label: 'Seguridad Total', desc: 'Revierte cualquier error en un solo clic sin perder avances.' }
                ],
                vo: 'Y respalda tu código sin errores.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 10000,
                end_ms: 12500,
                type: 'cta',
                badge: 'COMUNIDAD DEV',
                title: 'Automatiza *tu stack*',
                sub: 'Te comparto la configuración exacta de mis 3 servidores MCP listos para usar.',
                ctaData: {
                    keyword: 'MCP',
                    line: 'Comenta "MCP" y te mando mi archivo de configuración completo.',
                    handle: '@santi.dev'
                },
                vo: 'Comenta MCP y te paso la plantilla.'
            }
        ]
    },

    // =====================================================================
    // REEL 3: MOVA · ROMPIENDO EL SILENCIO (ACCESIBILIDAD 21D EN TIEMPO REAL)
    // =====================================================================
    {
        id: 'reel_mova',
        accountId: 'mova',
        slug: 'mova_romper_silencio',
        theme: 'mova',
        title: 'Mova · Romper el Silencio',
        subtitle: 'IA gestual 21D traduciendo lengua de señas sin conexión',
        duration_ms: 12500,
        duration: 12.5,
        fps: 60,
        kicker: 'MOVA · ACCESIBILIDAD & IA',
        brandIcon: 'fa-hands',
        accentColor: '#3B82F6',
        secondaryColor: '#FFA500',
        post: {
            hook: '70 millones de personas sordas incomunicadas. Así usamos IA para romper el silencio 👇',
            caption: `En el mundo hay más de 70 millones de personas sordas que se enfrentan diariamente a barreras invisibles.
Creamos Mova para cambiar eso:
🤟 Captura de 21 articulaciones de la mano en vivo a 60 FPS.
⚡ Procesamiento 100% en el dispositivo (sin enviar video a servidores externos).
🔒 Privacidad absoluta y cero latencia.

Mova convierte gestos en voz y subtítulos al instante.
💬 Comenta "MOVA" si quieres probar la beta pública en Android y Web.`,
            hashtags: ['#mova', '#accesibilidad', '#ia', '#computervision', '#mediapipe', '#techforgood'],
            bestTime: '12:00 - 15:00 o 19:00 - 22:00',
            sound: 'Deep Navy Ambient / Electronic Future Pulse'
        },
        beats: [
            {
                id: 1,
                name: 'El Problema',
                start_ms: 0,
                end_ms: 2500,
                type: 'hero',
                badge: 'MOVA · ACCESIBILIDAD & IA',
                title: '70 Millones *sin comunicación*',
                sub: 'Cómo usamos visión artificial en el teléfono para romper barreras invisibles.',
                kicker: 'INCLUSIÓN REAL SIN NUBE',
                vo: 'Setenta millones de personas necesitan esto.'
            },
            {
                id: 2,
                name: 'Malla Ósea 21D',
                start_ms: 2500,
                end_ms: 5000,
                type: 'points',
                badge: 'TECNOLOGÍA 1 · VISIÓN 60 FPS',
                title: 'Malla ósea de *21 puntos*',
                sub: 'MediaPipe Hands rastrea cada articulación en tiempo real a 60 FPS.',
                points: [
                    { icon: 'fa-hand', label: '21 Articulaciones', desc: 'Rastreo tridimensional de falanges, palma y muñeca.' },
                    { icon: 'fa-gauge-high', label: '60 FPS Continuos', desc: 'Cálculo de vector espacial sin tirones en cualquier smartphone.' },
                    { icon: 'fa-microchip', label: 'Sin GPU Dedicada', desc: 'Optimizado en WebAssembly para correr en teléfonos modestos.' }
                ],
                vo: 'Leemos cada gesto de la mano.'
            },
            {
                id: 3,
                name: 'Voz en Vivo',
                start_ms: 5000,
                end_ms: 7500,
                type: 'code',
                badge: 'TECNOLOGÍA 2 · SÍNTESIS DE AUDIO',
                title: 'De señas a *voz en vivo*',
                sub: 'SpeechSynthesis convierte gestos en oraciones audibles al instante.',
                codeSnippet: {
                    file: 'mova-engine ~ speech-synthesis.js',
                    lines: [
                        'const gesture = model.predict(handLandmarks21D);',
                        '// Clasificación determinista de lengua de señas',
                        'if (gesture.confidence > 0.95) {',
                        '  window.speechSynthesis.speak(gesture.text);',
                        '  ui.renderSubtitles(gesture.text); // < 16ms',
                        '}'
                    ]
                },
                vo: 'Y lo convertimos en voz al instante.'
            },
            {
                id: 4,
                name: 'Privacidad Offline',
                start_ms: 7500,
                end_ms: 10000,
                type: 'compare',
                badge: 'PRIVACIDAD & LATENCIA',
                title: '100% Offline · *0ms Latencia*',
                sub: 'Cero llamadas a servidores externos: la cámara nunca transmite video fuera.',
                compareData: {
                    bad: { tag: 'MODELOS CLOUD', title: '800ms de Retraso', desc: 'Requiere internet, sube video a la nube y consume datos móviles.' },
                    good: { tag: 'MOVA OFFLINE', title: '0ms y Privacidad Total', desc: 'Corre en el procesador local, cero datos compartidos, siempre listo.' }
                },
                vo: 'Sin internet y con total privacidad.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 10000,
                end_ms: 12500,
                type: 'cta',
                badge: 'ÚNETE A LA BETA',
                title: 'Sé parte de *Mova*',
                sub: 'Estamos abriendo la beta gratuita para escuelas, familias y organizaciones.',
                ctaData: {
                    keyword: 'MOVA',
                    line: 'Comenta "MOVA" para probar la beta libre y ayudarnos a validar más señas.',
                    handle: '@mova.app'
                },
                vo: 'Comenta MOVA para probar la beta.'
            }
        ]
    },

    // =====================================================================
    // REEL 4: ENDO · THE LAST ENDO (FÍSICA Y 60 FPS PUROS EN CANVAS 2D)
    // =====================================================================
    {
        id: 'reel_endo',
        accountId: 'endo',
        slug: 'endo_fisica_60fps',
        theme: 'endo',
        title: 'The Last Endo · 60 FPS',
        subtitle: 'El secreto matemático para eliminar el lag en juegos Canvas',
        duration_ms: 12500,
        duration: 12.5,
        fps: 60,
        kicker: 'THE LAST ENDO · 60 FPS GAMING',
        brandIcon: 'fa-gamepad',
        accentColor: '#EE6A3E',
        secondaryColor: '#F59E0B',
        post: {
            hook: '¿Tus juegos web sufren lag o tirones? Este es el secreto matemático 👇',
            caption: `Optimizar un juego para que corra a 60 FPS sólidos en cualquier navegador sin frameworks pesados es pura física:
🕹️ Desacople de FPS mediante Delta Time fijo.
🧠 Destrucción inmediata de búferes gráficos en GPU (cero caídas en Safari y móviles).
🏆 Así ganamos el 1st Place en el festival de videojuegos indie.

💾 Guarda este video para tu próximo desarrollo web o juego.
👉 Comenta "ENDO" para clonar el repositorio de física limpia.`,
            hashtags: ['#gamedev', '#canvas2d', '#javascript', '#indiegame', '#webgl', '#performancetips'],
            bestTime: '18:00 - 21:00',
            sound: 'Chiptune Cyber Retro Arcade 140BPM'
        },
        beats: [
            {
                id: 1,
                name: 'El Problema',
                start_ms: 0,
                end_ms: 2500,
                type: 'hero',
                badge: 'GAMEDEV · THE LAST ENDO',
                title: 'Elimina el lag en *Canvas 2D*',
                sub: 'El secreto del ciclo de físicas determinista para juegos fluidos en la web.',
                kicker: 'PITCH GANADOR 1ST PLACE',
                vo: '¿Tu juego tiene lag? Soluciónalo así.'
            },
            {
                id: 2,
                name: 'Delta Time',
                start_ms: 2500,
                end_ms: 5000,
                type: 'points',
                badge: 'ARQUITECTURA 1 · GAME LOOP',
                title: 'Físicas con *Delta Time*',
                sub: 'Desacopla la tasa de refresco del cálculo de posiciones del jugador.',
                points: [
                    { icon: 'fa-clock', label: 'Paso de Tiempo Fijo', desc: 'Físicas calculadas a 16.6ms exactos sin importar la pantalla.' },
                    { icon: 'fa-shield-halved', label: 'Sin Saltos Fantasma', desc: 'Si el monitor corre a 144Hz o 60Hz, la velocidad es idéntica.' },
                    { icon: 'fa-crosshairs', label: 'Colisiones Perfectas', desc: 'Cero objetos atravesando paredes por microtirones de CPU.' }
                ],
                vo: 'Usa Delta Time para físicas suaves.'
            },
            {
                id: 3,
                name: 'Limpieza de Buffers',
                start_ms: 5000,
                end_ms: 7500,
                type: 'code',
                badge: 'ARQUITECTURA 2 · GPU CLEANUP',
                title: 'Limpieza de *GPU Buffers*',
                sub: 'Destrucción inmediata de buffers para evitar fugas de memoria en WebKit.',
                codeSnippet: {
                    file: 'engine ~ memory-manager.js',
                    lines: [
                        '// Prevención de techo de memoria en Safari/iOS',
                        'function releaseFrameBuffer(canvas) {',
                        '  canvas.width = 0; canvas.height = 0;',
                        '  ctx.clearRect(0, 0, width, height);',
                        '  // Memoria liberada inmediatamente en VRAM',
                        '}'
                    ]
                },
                vo: 'Limpia la memoria en cada cuadro.'
            },
            {
                id: 4,
                name: 'Primer Lugar',
                start_ms: 7500,
                end_ms: 10000,
                type: 'points',
                badge: 'RESULTADO · 1ST PLACE',
                title: 'De prototipo a *Primer Lugar*',
                sub: 'La estabilidad a 60 FPS fue el factor decisivo ante el jurado técnico.',
                points: [
                    { icon: 'fa-trophy', label: 'Ganador en Concurso Indie', desc: 'Elogiado por fluidez y respuesta instantánea al control.' },
                    { icon: 'fa-mobile-screen', label: 'Cero Batería Drenada', desc: 'Consumo de CPU un 60% menor que frameworks pesados.' },
                    { icon: 'fa-gamepad', label: '100% Web Nativo', desc: 'Sin descargas de 500MB: arranca en 1 segundo en el navegador.' }
                ],
                vo: 'Así ganamos el primer lugar.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 10000,
                end_ms: 12500,
                type: 'cta',
                badge: 'CÓDIGO ABIERTO',
                title: 'Clona el *Game Engine*',
                sub: 'Todo el ciclo de físicas desacoplado en un archivo listo para tus proyectos.',
                ctaData: {
                    keyword: 'ENDO',
                    line: 'Comenta "ENDO" y te comparto el repositorio con la plantilla limpia.',
                    handle: '@endo.dev'
                },
                vo: 'Comenta ENDO para clonar el motor.'
            }
        ]
    },

    // =====================================================================
    // REEL 5: GIRASTOCK · OFFLINE FIRST (PUNTO DE VENTA Y GESTIÓN REAL)
    // =====================================================================
    {
        id: 'reel_gira',
        accountId: 'girastock',
        slug: 'girastock_offline_first',
        theme: 'gira',
        title: 'GiraStock · Offline First',
        subtitle: 'Punto de venta y gestión que nunca frena ventas',
        duration_ms: 12500,
        duration: 12.5,
        fps: 60,
        kicker: 'GIRASTOCK · CLIENTES REALES',
        brandIcon: 'fa-store',
        accentColor: '#EDB828',
        secondaryColor: '#10B981',
        post: {
            hook: 'Tu cliente no puede frenar ventas si se cae internet. Así resolví su negocio 👇',
            caption: `En comercios reales cada segundo sin internet son ventas perdidas.
Diseñamos GiraStock con arquitectura 100% Offline-First:
⚡ Base de datos SQLite en disco local con respuesta en 0ms.
🔄 Sincronización automática en segundo plano al reconectar la red.
📱 Instalable como PWA en tablets y laptops en 15 minutos sin costes de servidor.

💾 Guarda este video para tus proyectos de clientes.
👉 Comenta "STOCK" para ver la arquitectura paso a paso.`,
            hashtags: ['#offlinefirst', '#sqlite', '#pwa', '#saas', '#javascript', '#softwaredevelopment'],
            bestTime: '13:00 - 16:00',
            sound: 'Lo-Fi Chill Hop / Productivity Groove'
        },
        beats: [
            {
                id: 1,
                name: 'El Problema',
                start_ms: 0,
                end_ms: 2500,
                type: 'hero',
                badge: 'GIRASTOCK · CLIENTES REALES',
                title: 'Tu cliente no puede *frenar ventas*',
                sub: 'Cómo construí un sistema comercial que sigue cobrando aunque se corte internet.',
                kicker: 'SOLUCIONES PARA NEGOCIOS',
                vo: 'No pierdas ventas si cae internet.'
            },
            {
                id: 2,
                name: 'SQLite Local',
                start_ms: 2500,
                end_ms: 5000,
                type: 'points',
                badge: 'ARQUITECTURA 1 · BASE LOCAL',
                title: 'SQLite local en *disco 0ms*',
                sub: 'Cada cobro, factura y producto se registra en milisegundos en el dispositivo.',
                points: [
                    { icon: 'fa-database', label: 'Lectura Ultrarrápida', desc: 'Consultas de inventario en menos de 1 milisegundo.' },
                    { icon: 'fa-receipt', label: 'Cobros Ininterrumpidos', desc: 'Genera tickets y recibos sin depender de la red.' },
                    { icon: 'fa-wifi', label: 'Tolerancia Total a Cortes', desc: 'El cajero ni siquiera se entera si se fue la señal.' }
                ],
                vo: 'Guarda cada cobro en el dispositivo.'
            },
            {
                id: 3,
                name: 'Sync Beacon',
                start_ms: 5000,
                end_ms: 7500,
                type: 'code',
                badge: 'ARQUITECTURA 2 · RECONEXIÓN SILENCIOSA',
                title: 'Sincronización con *Beacon*',
                sub: 'Al volver la conexión, una cola transaccional sube los datos sin duplicados.',
                codeSnippet: {
                    file: 'girastock ~ sync-worker.js',
                    lines: [
                        'window.addEventListener("online", async () => {',
                        '  const pending = await db.getPendingSales();',
                        '  await api.batchSync(pending); // Transacción segura',
                        '  ui.showToast("✓ 14 ventas sincronizadas");',
                        '});'
                    ]
                },
                vo: 'Al volver la red, sincroniza solo.'
            },
            {
                id: 4,
                name: 'Vercel + PWA',
                start_ms: 7500,
                end_ms: 10000,
                type: 'points',
                badge: 'DESPLIEGUE · 15 MINUTOS',
                title: 'Instalable como *PWA*',
                sub: 'Se instala en tablets, laptops o teléfonos sin tiendas de aplicaciones pesadas.',
                points: [
                    { icon: 'fa-tablet-screen-button', label: 'Instalación Inmediata', desc: 'Un botón de agregar a pantalla de inicio y listo.' },
                    { icon: 'fa-server', label: 'Cero Costes de Servidor', desc: 'Desplegado en Vercel con base de datos serverless.' },
                    { icon: 'fa-money-bill-wave', label: 'Cliente Feliz y Facturando', desc: 'Ahorro de 40 horas al mes en soporte técnico.' }
                ],
                vo: 'Instálalo en tablets sin pagar servidores.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 10000,
                end_ms: 12500,
                type: 'cta',
                badge: 'PLANTILLA COMERCIAL',
                title: 'Lanza tu *SaaS Offline*',
                sub: 'La arquitectura offline-first explicada paso a paso para tus propios clientes.',
                ctaData: {
                    keyword: 'STOCK',
                    line: 'Comenta "STOCK" y te paso la estructura de sincronización local.',
                    handle: '@girastock'
                },
                vo: 'Comenta STOCK y te paso el sistema.'
            }
        ]
    },

    // =====================================================================
    // REEL 6: SANTI.DEV · TOKENS PRO & INGENIERÍA AGÉNTICA (CERO COLAPSO DE IA)
    // =====================================================================
    {
        id: 'reel_tokens_pro',
        accountId: 'santidev',
        slug: 'ia_context_collapse',
        theme: 'tokens_pro',
        title: 'Tokens Pro & Antigravity',
        subtitle: 'Ingeniería agéntica sin saturar la ventana de atención',
        duration_ms: 12500,
        duration: 12.5,
        fps: 60,
        kicker: 'SANTI.DEV · WORKFLOW PRO',
        brandIcon: 'fa-terminal',
        accentColor: '#00DF8F',
        secondaryColor: '#38BDF8',
        videoUrl: 'videos/tokens_pro.mp4',
        post: {
            hook: '¿Tu IA empieza brillante y termina borrando código? Este es el motivo 👇',
            caption: `¿Te ha pasado que en Cursor o Claude todo va perfecto los primeros 10 minutos y de repente empieza a borrar funciones?
No es el modelo: es que saturaste su ventana de atención con 20 archivos irrelevantes.

La regla de oro de los ingenieros agénticos:
1️⃣ 1 Tarea atómica a la vez.
2️⃣ 1 Solo archivo activo en el contexto.
3️⃣ Poda de contexto con Graphify AST.

Resultado: 80% menos tokens quemados y cero alucinaciones en producción.
💬 Comenta "CONTEXTO" para enviarte la guía de arquitectura por DM.`,
            hashtags: ['#antigravity', '#ia', '#programacion', '#cursor', '#claude', '#softwareengineering'],
            bestTime: '18:00 - 21:00',
            sound: 'Synthwave Cyberpunk / Tech Lo-Fi 120BPM'
        },
        beats: [
            {
                id: 1,
                name: 'El Problema',
                start_ms: 0,
                end_ms: 2500,
                type: 'hero',
                badge: 'INGENIERÍA AGÉNTICA · SANTI.DEV',
                title: 'Tu IA colapsa *por esto*',
                sub: 'El error fatal de saturar la ventana de atención con 20 archivos irrelevantes.',
                kicker: 'OPTIMIZACIÓN DE TOKENS',
                vo: '¿Tu IA empieza bien y luego falla?'
            },
            {
                id: 2,
                name: 'Regla Atómica',
                start_ms: 2500,
                end_ms: 5000,
                type: 'points',
                badge: 'REGLA 1 · FOCO ATÓMICO',
                title: '1 Sola tarea · *1 Solo archivo*',
                sub: 'La regla de oro de los ingenieros agénticos para erradicar alucinaciones.',
                points: [
                    { icon: 'fa-bullseye', label: '1 Responsabilidad por Prompt', desc: 'Pide una sola función o corrección a la vez.' },
                    { icon: 'fa-file-code', label: 'Aísla el Archivo Activo', desc: 'Cierra los 19 archivos que no tocan esa función.' },
                    { icon: 'fa-check-double', label: '100% Precisión', desc: 'El modelo no tiene ruido que confunda el árbol sintáctico.' }
                ],
                vo: 'Abre solo un archivo por tarea.'
            },
            {
                id: 3,
                name: 'Graphify AST',
                start_ms: 5000,
                end_ms: 7500,
                type: 'code',
                badge: 'REGLA 2 · PODA DE CONTEXTO',
                title: 'Mapea con *Graphify AST*',
                sub: 'Envía solo las firmas de tipo y dependencias directas en lugar de librerías enteras.',
                codeSnippet: {
                    file: 'terminal ~ graphify-tokens.sh',
                    lines: [
                        '# Analiza el grafo de dependencias real',
                        '$ agy graphify --target="authService.ts"',
                        '✓ 3 dependencias identificadas (de 48)',
                        '✓ Poda de contexto: de 45,000 tokens a 1,200',
                        '✓ Respuesta 10x más rápida con 0 alucinaciones'
                    ]
                },
                vo: 'Filtra el código para no saturarla.'
            },
            {
                id: 4,
                name: 'Ahorro Masivo',
                start_ms: 7500,
                end_ms: 10000,
                type: 'compare',
                badge: 'RESULTADO DE PRODUCCIÓN',
                title: '80% Menos Tokens · *Cero Bugs*',
                sub: 'Mayor velocidad de respuesta y código listo para producción sin reintentos.',
                compareData: {
                    bad: { tag: 'SIN PLANIFICAR', title: '60,000 Tokens Quemados', desc: 'Alucinaciones, imports rotos y código que no compila.' },
                    good: { tag: 'WORKFLOW PRO', title: '4,000 Tokens y 0 Errores', desc: 'Ejecución atómica precisa y validada en el primer intento.' }
                },
                vo: 'Ahorras tokens y eliminas errores.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 10000,
                end_ms: 12500,
                type: 'cta',
                badge: 'GUÍA COMPLETA',
                title: 'Domina el *Contexto*',
                sub: 'Te paso mi guía paso a paso para configurar tu entorno agéntico.',
                ctaData: {
                    keyword: 'CONTEXTO',
                    line: 'Comenta "CONTEXTO" para enviarte la guía de ingeniería agéntica por DM.',
                    handle: '@santi.dev'
                },
                vo: 'Comenta CONTEXTO y te paso la guía.'
            }
        ]
    },

    // =====================================================================
    // REEL 7: SANTI.DEV · GOOGLE GEMINI · NIVEL 1: BÁSICO (CERO CONFIGURACIÓN)
    // =====================================================================
    {
        id: 'reel_gemini_lvl1',
        accountId: 'santidev',
        slug: 'gemini_secretos_ocultos',
        theme: 'stack1',
        title: 'Gemini: Secretos Ocultos',
        subtitle: 'Cruce de documentos, foto a roadmap y roleplay en vivo sin configurar nada',
        duration_ms: 16500,
        duration: 16.5,
        fps: 60,
        kicker: 'GOOGLE GEMINI · SECRETOS',
        brandIcon: 'fa-sparkles',
        accentColor: '#38BDF8',
        secondaryColor: '#0284C7',
        videoUrl: 'videos/gemini_nivel_1_basico.mp4',
        post: {
            hook: '¿Usas Gemini solo para preguntas simples? Te estás perdiendo el 90% de su poder real 👇',
            caption: `En este video te muestro cómo exprimir Google Gemini sin configurar nada:

1️⃣ Cruce de Documentos: Sube notas sueltas + especificaciones técnicas y obtén prioridades y próximos pasos en 1 clic.
2️⃣ Digitalización Física: Foto a una pizarra o boceto en servilleta transformado en un Roadmap por fases y tabla exportable.
3️⃣ Gemini Live: Modo de voz en tiempo real para practicar reuniones de venta o entrevistas con evaluación de fallos al final.
4️⃣ Auditoría de Video: Analiza el ritmo, claridad y lenguaje corporal de cualquier contenido con solo pegar el enlace.
5️⃣ NotebookLM: Cruza decenas de fuentes independientes sin alucinaciones.

💾 Guarda este video para sacarle el jugo a la herramienta.`,
            hashtags: ['#gemini', '#googleai', '#productividad', '#ia', '#techtips', '#notebooklm', '#tutorial'],
            bestTime: '18:00 - 21:00',
            sound: 'Future Ambient Tech'
        },
        beats: [
            {
                id: 1,
                name: 'Hook Inicial',
                start_ms: 0,
                end_ms: 3800,
                type: 'hero',
                badge: 'EL ERROR COMÚN',
                title: '¿Usas Gemini como *un buscador*?',
                sub: 'Estás desperdiciando el 90% de su capacidad en la interfaz gratuita.',
                kicker: 'CERO CONFIGURACIÓN',
                vo: '¿Usas Gemini solo como buscador? Mira esto.'
            },
            {
                id: 2,
                name: 'Cruce y Multimodal',
                start_ms: 3800,
                end_ms: 8200,
                type: 'points',
                badge: 'CRUCE DOCUMENTAL & MULTIMODAL',
                title: 'Cruza Documentos y *Digitaliza Papel*',
                sub: 'De notas y pizarras desordenadas a roadmaps accionables.',
                points: [
                    { num: '01', title: 'Cruce de Archivos', desc: 'Notas + Specs técnicas = Plan de acción sin leer manuales.' },
                    { num: '02', title: 'Foto a Pizarra', desc: 'Boceto a mano alzada → Sheet y Roadmap por fases.' }
                ],
                vo: 'Cruza documentos y pasa fotos a tareas.'
            },
            {
                id: 3,
                name: 'Live y Video',
                start_ms: 8200,
                end_ms: 12600,
                type: 'points',
                badge: 'ROLEPLAY & ANÁLISIS EN VIVO',
                title: '*Roleplay en Vivo* y Análisis de Video',
                sub: 'Practica llamadas difíciles y audita tu comunicación.',
                points: [
                    { num: '03', title: 'Gemini Live', desc: 'Simula reuniones de venta con evaluación crítica al terminar.' },
                    { num: '04', title: 'Auditoría Video', desc: 'Pega un enlace y examina ritmo, lenguaje y retención.' }
                ],
                vo: 'Practica reuniones por voz y analiza videos.'
            },
            {
                id: 4,
                name: 'NotebookLM & CTA',
                start_ms: 12600,
                end_ms: 16500,
                type: 'cta',
                badge: 'INVESTIGACIÓN COMPLEJA',
                title: 'Múltiples Fuentes con *NotebookLM*',
                sub: 'Cruza fuentes dispares sin perder rigor ni precisión.',
                ctaData: {
                    keyword: 'GEMINI',
                    line: 'Guarda este video para dominar todas las funciones de Gemini.',
                    handle: '@santi.dev'
                },
                vo: 'NotebookLM conecta todo sin inventar nada. Guarda el video.'
            }
        ]
    },

    // =====================================================================
    // REEL 8: SANTI.DEV · GOOGLE GEMINI · WORKSPACE INTEGRADO & MULTIMEDIA
    // =====================================================================
    {
        id: 'reel_gemini_lvl2',
        accountId: 'santidev',
        slug: 'gemini_en_tu_trabajo',
        theme: 'stack1',
        title: 'Gemini en tu Trabajo Real',
        subtitle: 'Gmail, Meet, Sheets y Deep Research integrados sin salir de tus herramientas',
        duration_ms: 17000,
        duration: 17.0,
        fps: 60,
        kicker: 'GOOGLE GEMINI · WORKSPACE',
        brandIcon: 'fa-cubes',
        accentColor: '#818CF8',
        secondaryColor: '#6366F1',
        videoUrl: 'videos/gemini_nivel_2_intermedio.mp4',
        post: {
            hook: 'Deja de abrir pestañas para chatear con la IA: el truco es usarla donde trabajas 👇',
            caption: `El verdadero poder de Gemini está en la integración con el trabajo diario:

1️⃣ Gmail & Meet: Panel lateral que extrae cronologías de meses de correos y asistente de llamadas que toma notas directo a Drive.
2️⃣ Sheets & Docs: Fórmulas en lenguaje natural y borradores de diapositivas en Google Slides.
3️⃣ Deep Research: Informes estratégicos exhaustivos de mercado con validación previa de fuentes.
4️⃣ Canvas & Tutor Socrático: Convierte reportes densos en esquemas interactivos con aprendizaje guiado.
5️⃣ Estudio Multimedia: Edita fotos sin apps externas, anima imágenes a video cinemático y genera música sincronizada.

💾 Guarda este video para integrarlo en tu día a día.`,
            hashtags: ['#gemini', '#workspace', '#googleworkspace', '#deepresearch', '#ia', '#productividad'],
            bestTime: '18:00 - 21:00',
            sound: 'Deep Space Synthwave'
        },
        beats: [
            {
                id: 1,
                name: 'Hook Inicial',
                start_ms: 0,
                end_ms: 3800,
                type: 'hero',
                badge: 'IA EN TUS PROGRAMAS',
                title: 'Gemini integrado en *tu flujo de trabajo*',
                sub: 'Integración nativa dentro de Gmail, Meet, Sheets y Docs + Creación multimedia.',
                kicker: 'WORKSPACE & MULTIMEDIA',
                vo: 'Usa la IA dentro de tus programas diarios.'
            },
            {
                id: 2,
                name: 'Workspace Nativo',
                start_ms: 3800,
                end_ms: 8400,
                type: 'points',
                badge: 'GMAIL, MEET & SHEETS',
                title: '*Gmail, Meet, Sheets y Docs* Conectados',
                sub: 'La IA embebida en tu bandeja de entrada y reuniones.',
                points: [
                    { num: '01', title: 'Gmail & Meet', desc: 'Sintetiza hilos de meses y toma notas en videollamadas directo a Drive.' },
                    { num: '02', title: 'Sheets & Slides', desc: 'Fórmulas y gráficos con lenguaje natural y diapositivas en 1 clic.' }
                ],
                vo: 'Resume correos y genera fórmulas sin memorizarlas.'
            },
            {
                id: 3,
                name: 'Deep Research & Canvas',
                start_ms: 8400,
                end_ms: 12800,
                type: 'points',
                badge: 'DEEP RESEARCH & CANVAS',
                title: '*Deep Research* y Canvas Visual',
                sub: 'De investigación exhaustiva a esquemas interactivos.',
                points: [
                    { num: '03', title: 'Deep Research', desc: 'Informes estratégicos multifuente validados antes de buscar.' },
                    { num: '04', title: 'Canvas & Tutor', desc: 'De informes densos a infografías interactivas y tutor socrático.' }
                ],
                vo: 'Investiga a fondo y crea esquemas interactivos.'
            },
            {
                id: 4,
                name: 'Multimedia & CTA',
                start_ms: 12800,
                end_ms: 17000,
                type: 'cta',
                badge: 'MULTIMEDIA & AUTOMATIZACIÓN',
                title: 'Edita Fotos, *Video y Música IA*',
                sub: 'Modifica estancias, anima imágenes a video y sincroniza audio.',
                ctaData: {
                    keyword: 'WORKSPACE',
                    line: 'Guarda este video para transformar tu forma de trabajar con Google Workspace.',
                    handle: '@santi.dev'
                },
                vo: 'Genera video y música integrada. Guarda este video.'
            }
        ]
    },

    // =====================================================================
    // REEL 9: SANTI.DEV · GOOGLE GEMINI · FLUJOS AUTÓNOMOS Y SISTEMAS
    // =====================================================================
    {
        id: 'reel_gemini_lvl3',
        accountId: 'santidev',
        slug: 'gemini_flujos_autonomos',
        theme: 'stack1',
        title: 'Flujos Autónomos con Gemini',
        subtitle: 'Gems personalizados, acciones programadas y Workspace Studio',
        duration_ms: 17000,
        duration: 17.0,
        fps: 60,
        kicker: 'GOOGLE GEMINI · AUTOMATIZACIÓN',
        brandIcon: 'fa-robot',
        accentColor: '#38BDF8',
        secondaryColor: '#2563EB',
        videoUrl: 'videos/gemini_nivel_3_avanzado.mp4',
        post: {
            hook: 'Deja de ejecutar tareas manuales: ¡Construye Sistemas Autónomos que operen por horario! 👇',
            caption: `El salto definitivo al nivel profesional con Google Gemini:

1️⃣ Gems Personalizados (El CÓMO): Almacena instrucciones y marcos metodológicos permanentes. Sube reuniones y genera diagnósticos y protocolos sin reprompting.
2️⃣ Acciones Programadas (El CUÁNDO): Monitoreo periódico por horario. Gemini investiga competidores y lanzamientos y te envía el informe al móvil automáticamente.
3️⃣ Workspace Studio (El ECOSISTEMA): Triggers y acciones sucesivas conectadas (Meet → tareas en Chat → Drive → Sheets).

🏗️ La Trilogía del Sistema:
• Gems = El Cómo
• Programadas = El Cuándo
• Studio = El Ecosistema

👉 Comenta "SISTEMAS" y te comparto la arquitectura lista para clonar.`,
            hashtags: ['#gemini', '#iaavanzada', '#automatizacion', '#gems', '#aiagents', '#workspacestudio'],
            bestTime: '18:00 - 21:00',
            sound: 'Cyberpunk Cyber Sapphire Beats'
        },
        beats: [
            {
                id: 1,
                name: 'Hook Inicial',
                start_ms: 0,
                end_ms: 3800,
                type: 'hero',
                badge: 'DE PROMPTS A SISTEMAS',
                title: 'Deja de escribir prompts: *¡Crea Sistemas!*',
                sub: 'De prompts manuales a agentes que estandarizan métodos y operan de forma autónoma.',
                kicker: 'SISTEMAS & AUTOMATIZACIÓN',
                vo: 'Deja de escribir prompts: crea sistemas automáticos.'
            },
            {
                id: 2,
                name: 'Gems Personalizados',
                start_ms: 3800,
                end_ms: 8400,
                type: 'points',
                badge: 'GEMS PERSONALIZADOS',
                title: '*Gems Personalizados:* Reglas Permanentes',
                sub: 'Estandariza el método para siempre sin reescribir prompts.',
                points: [
                    { num: '01', title: 'El CÓMO', desc: 'Instrucciones permanentes y marco metodológico reutilizable.' },
                    { num: '02', title: 'Diagnóstico Auto', desc: 'Sube reuniones y genera diagnósticos, fases y protocolos de seguridad.' }
                ],
                vo: 'Crea Gems con tus reglas fijas de trabajo.'
            },
            {
                id: 3,
                name: 'Acciones Programadas',
                start_ms: 8400,
                end_ms: 12800,
                type: 'points',
                badge: 'ACCIONES POR HORARIO',
                title: '*Acciones Programadas:* Monitoreo Autónomo',
                sub: 'Tareas recurrentes que se ejecutan sin que estés presente.',
                points: [
                    { num: '03', title: 'El CUÁNDO', desc: 'Configura día, hora y frecuencia para ejecutar tareas en segundo plano.' },
                    { num: '04', title: 'Reportes al Móvil', desc: 'Gemini escanea el sector semanalmente y te notifica.' }
                ],
                vo: 'Programa análisis que te avisen al móvil.'
            },
            {
                id: 4,
                name: 'Workspace Studio & CTA',
                start_ms: 12800,
                end_ms: 17000,
                type: 'cta',
                badge: 'PILOTO AUTOMÁTICO TOTAL',
                title: 'Workspace Studio: *Piloto Automático*',
                sub: 'Gems (El Cómo) · Programadas (El Cuándo) · Studio (El Ecosistema).',
                ctaData: {
                    keyword: 'SISTEMAS',
                    line: 'Comenta "SISTEMAS" para enviarte la plantilla de automatización.',
                    handle: '@santi.dev'
                },
                vo: 'Conecta tus herramientas. Comenta SISTEMAS y te paso la plantilla.'
            }
        ]
    }
];

/**
 * Validador estricto del esquema de reels
 */
window.validateReelSchema = function (reel) {
    if (!reel || typeof reel !== 'object') return false;
    if (!reel.id || !reel.title || !Array.isArray(reel.beats) || reel.beats.length === 0) return false;
    return true;
};

/**
 * Normalizador resiliente para garantizar retrocompatibilidad
 */
window.normalizeReel = function (r) {
    if (!r) return null;
    const durMs = r.duration_ms || (r.duration ? r.duration * 1000 : 12500);
    const beats = (r.beats || []).map((b, idx) => ({
        id: b.id || idx + 1,
        name: b.name || `Beat ${idx + 1}`,
        start_ms: typeof b.start_ms === 'number' ? b.start_ms : (typeof b.start === 'number' ? b.start * 1000 : idx * 2500),
        end_ms: typeof b.end_ms === 'number' ? b.end_ms : (typeof b.end === 'number' ? b.end * 1000 : (idx + 1) * 2500),
        type: b.type || (idx === 0 ? 'hero' : (idx === (r.beats?.length || 5) - 1 ? 'cta' : 'points')),
        badge: b.badge || b.badgeText || (r.kicker || 'SANTI.DEV'),
        title: b.title || b.text || '',
        sub: b.sub || '',
        points: b.points || [],
        codeSnippet: b.codeSnippet || null,
        compareData: b.compareData || null,
        ctaData: b.ctaData || null,
        vo: b.vo || ''
    }));

    return {
        ...r,
        duration_ms: durMs,
        duration: Math.round(durMs / 100) / 10,
        beats
    };
};

/**
 * Obtener todos los reels oficiales y personalizados
 */
window.getAllReels = function () {
    try {
        const custom = localStorage.getItem('algo_custom_reels');
        if (custom) {
            const parsed = JSON.parse(custom);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed.map(window.normalizeReel);
            }
        }
    } catch (e) {
        console.warn('Error leyendo algo_custom_reels:', e);
    }
    return (window.REELS || []).map(window.normalizeReel);
};

/**
 * Creador de plantillas limpias para nuevos reels
 */
window.createReelTemplate = function (title, accountId, keyword) {
    const kw = (keyword || 'PROYECTO').toUpperCase();
    const isMova = accountId === 'mova';
    const isEndo = accountId === 'endo';
    const isGira = accountId === 'girastock';

    const theme = isMova ? 'mova' : (isEndo ? 'endo' : (isGira ? 'gira' : 'dev_blue'));
    const accentColor = isMova ? '#3B82F6' : (isEndo ? '#EE6A3E' : (isGira ? '#EDB828' : '#00DF8F'));
    const secondaryColor = isMova ? '#FFA500' : (isEndo ? '#F59E0B' : (isGira ? '#10B981' : '#38BDF8'));
    const kicker = isMova ? 'MOVA · ACCESIBILIDAD & IA' : (isEndo ? 'THE LAST ENDO · GAMEDEV' : (isGira ? 'GIRASTOCK · OFFLINE FIRST' : 'SANTI.DEV · INGENIERÍA'));

    const reel = {
        id: `reel_${Date.now()}`,
        accountId: accountId || 'santidev',
        title: title || 'Nuevo Video Educativo',
        subtitle: `Arquitectura y desarrollo en 60 FPS`,
        duration_ms: 12500,
        duration: 12.5,
        fps: 60,
        theme,
        accentColor,
        secondaryColor,
        kicker,
        brandIcon: isMova ? 'fa-hands' : (isEndo ? 'fa-gamepad' : (isGira ? 'fa-store' : 'fa-terminal')),
        post: {
            hook: `${title || '¿Cómo construir software en 2026?'} Te enseño el paso a paso 👇`,
            caption: `En este video te muestro la arquitectura completa y los pasos accionables para llevarlo a producción:
1️⃣ Enfoque y dolor principal.
2️⃣ Estrategia y lógica modular.
3️⃣ Código y herramientas clave.

💬 Comenta "${kw}" para enviarte la plantilla por mensaje directo.`,
            hashtags: ['#programacion', '#desarrolloweb', '#ia', '#softwareengineering'],
            bestTime: '18:00 - 21:00',
            sound: 'Tech Cyber Ambient 120BPM'
        },
        beats: [
            {
                id: 1,
                name: 'Hook',
                start_ms: 0,
                end_ms: 2500,
                type: 'hero',
                badge: kicker,
                title: `${title || 'Construye software *sin límites*'}`,
                sub: 'La arquitectura y herramientas para crear prototipos reales en producción.',
                kicker: 'ENFOQUE 2026',
                vo: `¿Quieres construir ${title || 'software moderno'} sin pasar meses bloqueado? Te enseño el paso a paso.`
            },
            {
                id: 2,
                name: 'Estrategia',
                start_ms: 2500,
                end_ms: 5000,
                type: 'points',
                badge: 'PASO 1 · ESTRATEGIA',
                title: 'La lógica *modular*',
                sub: 'Descompón el problema en responsabilidades atómicas.',
                points: [
                    { icon: 'fa-bullseye', label: '1 Problema Clave', desc: 'Resuelve la fricción principal sin inflar funciones.' },
                    { icon: 'fa-layer-group', label: 'Arquitectura Limpia', desc: 'Componentes desacoplados que facilitan pruebas.' },
                    { icon: 'fa-bolt', label: '0 Latencia', desc: 'Optimizado para correr a 60 FPS sin tirones.' }
                ],
                vo: 'Primer paso: descompón la lógica en piezas atómicas para evitar saturar el código y reducir errores.'
            },
            {
                id: 3,
                name: 'Código & Táctica',
                start_ms: 5000,
                end_ms: 7500,
                type: 'code',
                badge: 'PASO 2 · CÓDIGO',
                title: 'Implementación *en vivo*',
                sub: 'Comandos y código probado para producción.',
                codeSnippet: {
                    file: 'engine ~ main.ts',
                    lines: [
                        '// Inicialización modular determinista',
                        'const app = await initEngine({ fps: 60 });',
                        'app.onReady(() => {',
                        '  console.log("✓ Sistema listo sin dependencias pesadas");',
                        '});'
                    ]
                },
                vo: 'En el código mantenemos una inicialización determinista sin librerías pesadas para garantizar máxima velocidad.'
            },
            {
                id: 4,
                name: 'Comparativa / Payoff',
                start_ms: 7500,
                end_ms: 10000,
                type: 'compare',
                badge: 'PASO 3 · RESULTADO',
                title: 'Cero Lag · *100% Producción*',
                sub: 'Rendimiento medido frente a metodologías tradicionales.',
                compareData: {
                    bad: { tag: 'MÉTODO TRADICIONAL', title: 'Lento y Complejo', desc: 'Frameworks pesados, caídas de frames y semanas de configuración.' },
                    good: { tag: 'MÉTODO MODERNO', title: '60 FPS y Despliegue Rápido', desc: 'Código modular, 0 bloqueos y listo para usuarios reales en 1 día.' }
                },
                vo: 'El resultado: cero caídas de frames, menor consumo de batería y despliegues listos en una fracción del tiempo.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 10000,
                end_ms: 12500,
                type: 'cta',
                badge: 'COMUNIDAD',
                title: 'Clona el *Proyecto*',
                sub: 'Te comparto el repositorio y la plantilla completa por mensaje directo.',
                ctaData: {
                    keyword: kw,
                    line: `Comenta "${kw}" y te envío la arquitectura completa.`,
                    handle: isMova ? '@mova.app' : (isEndo ? '@endo.dev' : '@santi.dev')
                },
                vo: `Comenta la palabra ${kw} y te paso la plantilla completa con el código listo para usar.`
            }
        ]
    };

    return window.normalizeReel(reel);
};
