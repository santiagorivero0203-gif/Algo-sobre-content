/**
 * =====================================================================
 * SANTI.DEV · CONTENIDO DE LOS VIDEOS (6 CARRUSELES COMPLETOS)
 * =====================================================================
 * Serie 1: Trilogía "De la Idea al Código" (Stack Secreto, MCP, Prompting)
 * Serie 2: Trilogía "Casos Reales & Pitch" (The Last Endo, Mova, GiraStock)
 *
 * Lineamientos aplicados:
 *   - Hooks de marketing conversacionales y directos.
 *   - Capturas reales de despliegues en vivo (Vercel).
 *   - Llamadas a la acción (CTA) honestas enfocadas en la comunidad
 *     (sin promesas de lead-magnets inexistentes como checklists privadas).
 * =====================================================================
 */

window.VIDEOS = [
    // ==================== TRILOGÍA 1: DE LA IDEA AL CÓDIGO ====================
    {
        id: 'stack1', slug: 'stack_visual_y_logico', theme: 'stack1', caseNo: 1, group: 'Trilogía: De la Idea al Código',
        title: 'Parte 1: Stack Secreto', subtitle: 'Juegos y webs sin saber programar',
        post: {
            hook: '¿Juegos y webs sin saber programar? Te enseño mi stack secreto 👇',
            caption: `¿Te imaginas crear tus propios videojuegos y aplicaciones web sin pasar meses atascado en la sintaxis?

En este carrusel te revelo el stack técnico exacto que uso para pasar de una idea en la cabeza a un prototipo funcionando:

1️⃣ Inspiración: Roba como un artista. Analiza las mecánicas de juegos y webs que amas y combínalas con tu toque personal.
2️⃣ Lógica: Google Antigravity para levantar el 85% de la arquitectura base + Opencode para pulir detalles finos y ahorrar miles de tokens.
3️⃣ Arte: Nano Banana para generar sprites increíbles con IA y Remove BG para dejarlos transparentes en 1 clic.

💾 Guarda este post para tu próximo proyecto.
👉 Sígueme para la Parte 2: Automatización de bases de datos y GitHub.`,
            hashtags: ['#programacion', '#desarrolloweb', '#gamedev', '#antigravity', '#opencode', '#ia', '#tecnologia', '#indiedev', '#codingtips', '#devlife', '#creadores'],
            bestTime: '18:00 - 21:00',
            sound: 'Synthwave / Lo-Fi Beats instrumental',
        },
        slides: [
            {
                type: 'hero', layout: 'low', header: 'none',
                kicker: 'Trilogía Creadores · Parte 1',
                title: '¿Juegos y webs *sin saber programar*?',
                art: 'gamepad',
                sub: 'Te enseño mi stack técnico secreto para empezar hoy mismo.',
                prod: 'Fondo negro mate, texto blanco, acento verde y control de consola.',
            },
            {
                type: 'text', layout: 'full', header: 'full',
                title: 'Inspiración: *Roba como un artista*',
                body: 'Analiza juegos y webs que amas para *fusionar mecánicas* y crear tu idea única.',
                icons: [{ name: 'gamepad', label: 'Juegos Top' }, { name: 'eye', label: 'Analiza' }, { name: 'code', label: 'Tu Toque' }],
                foot: 'No empieces de cero: combina lo mejor de la industria con tu visión propia.',
            },
            {
                type: 'code', layout: 'high', header: 'full',
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
                    '✓ 0 errores de sintaxis · 1,200 tokens ahorrados',
                ],
                foot: 'Antigravity hace el código pesado. Opencode corrige los detalles mínimos ahorrando tokens.',
                prod: 'Interfaz estilo terminal. Muestra la potencia del motor y el ahorro de tokens.',
            },
            {
                type: 'image', layout: 'float', header: 'none', tone: 'paper',
                title: 'Arte: *Nano Banana + Remove BG*',
                image: 'assets/endo_sprite.jpg',
                beforeAfter: true,
                chips: ['Nano Banana: Sprites IA', 'Remove BG: 1 Clic', 'Transparencia lista'],
                foot: 'Genera sprites increíbles con Nano Banana y quítales el fondo en un clic.',
                prod: 'Comparación Antes (con fondo) vs Después (transparente listo para tu juego).',
            },
            {
                type: 'cta', layout: 'tilt', tone: 'accent',
                title: 'Guarda *este post*',
                keyword: 'PARTE 2',
                line: 'En la parte 2: Cómo automatizo mis bases de datos y subo todo a GitHub.',
            },
        ],
    },
    {
        id: 'stack2', slug: 'automatizacion_y_mcp', theme: 'stack2', caseNo: 2, group: 'Trilogía: De la Idea al Código',
        title: 'Parte 2: Automatización', subtitle: 'El trabajo sucio resuelto con MCP',
        post: {
            hook: 'Deja de subir archivos a mano. Así automatizo todo con MCP 👇',
            caption: `Programar en 2026 no se trata de hacer tareas repetitivas a mano. Se trata de conectar herramientas inteligentes.

En la parte 2 de este stack técnico te muestro el poder de las herramientas MCP (Model Context Protocol):

⚙️ Stitch MCP: Conecta tu editor de código con servicios en la nube, APIs y diseño en Figma sin cambiar de ventana.
🗄️ Supabase MCP: Pide tus tablas de base de datos en lenguaje natural y ten un backend SQL funcionando en vivo en segundos.
🐙 Git MCP: Sincronización automática con GitHub para respaldar tus avances sin miedo a romper ramas ni lidiar con comandos oscuros.

💾 Guarda este post y compártelo con tu compa dev.
👉 Sígueme para la Parte 3: Por qué tu código con IA colapsa y cómo evitarlo.`,
            hashtags: ['#mcp', '#antigravity', '#automatizacion', '#supabase', '#stitchmcp', '#developer', '#programacion', '#ia', '#backend', '#frontend', '#github', '#techtrends'],
            bestTime: '12:00 - 15:00 o 19:00 - 22:00',
            sound: 'Rhythm coding beat / Electronic minimal',
        },
        slides: [
            {
                type: 'hero', layout: 'high', header: 'mini',
                kicker: 'Trilogía Creadores · Parte 2',
                title: 'Automatiza tu código *como un pro*',
                art: 'gear',
                sub: 'Olvida subir archivos a mano. Te presento el poder de las herramientas MCP.',
                prod: 'Fondo gris oscuro, acento naranja brillante e icono de engranajes técnicos.',
            },
            {
                type: 'code', layout: 'split',
                title: 'Antigravity MCP: *Tu puente al mundo*',
                file: 'agy-console ~ stitch-mcp',
                lang: 'bash',
                code: [
                    '$ agy mcp connect stitch',
                    '[StitchMCP] Conectando servicios externos...',
                    '✓ Stitch enlazó el editor con la nube',
                    '✓ Figma, Supabase y APIs sincronizadas',
                    '# Todo en una pantalla, sin salir del editor',
                ],
                foot: 'Usa Stitch para conectar tu entorno de desarrollo con servicios externos sin salir del editor.',
                prod: 'Captura limpia de la consola de Antigravity ejecutando comando de Stitch.',
            },
            {
                type: 'flow', layout: 'low', header: 'mini',
                title: 'Backend ágil con *Supabase MCP*',
                nodes: [
                    { icon: 'pencil', t: 'Pide las tablas en texto', s: 'Define usuarios, inventario o partidas en segundos' },
                    { icon: 'database', t: 'Supabase MCP las crea al instante', s: 'Tablas SQL seguras y listas sin configurar servidores' },
                    { icon: 'check', t: 'Conexión inmediata en vivo', s: 'Tu app ya guarda y consulta datos en tiempo real' },
                ],
                foot: 'Conecta y gestiona tu base de datos al instante sin perderte en configuraciones.',
                prod: 'Logo de Supabase y flujo visual de base de datos instantánea.',
            },
            {
                type: 'steps', layout: 'split',
                title: 'Sincronización *mágica con Git*',
                steps: [
                    { t: 'Conexión Git MCP directa', d: 'Enlaza tu carpeta local con tu repositorio en GitHub automáticamente.' },
                    { t: 'Subida automática sin estrés', d: 'Tu proyecto se respalda solo con cada avance importante.' },
                    { t: 'Cero terminales complejas', d: 'Olvídate de comandos oscuros o miedo a dañar ramas.' },
                ],
                foot: 'Usa Git MCP para que tu proyecto se suba solo a GitHub. Cero estrés.',
                prod: 'Logos de Git y GitHub conectados por sincronización automática.',
            },
            {
                type: 'cta', layout: 'high', tone: 'accent',
                title: 'Sígueme para *la parte final*',
                keyword: 'PROMPT',
                line: 'Te enseñaré el error fatal que todos cometen al usar IA para programar.',
            },
        ],
    },
    {
        id: 'stack3', slug: 'el_secreto_del_prompting', theme: 'stack3', caseNo: 3, group: 'Trilogía: De la Idea al Código',
        title: 'Parte 3: El Arte del Prompt', subtitle: 'Planificación inteligente > Ejecución',
        post: {
            hook: 'La razón real por la que tus proyectos con IA colapsan a mitad de camino 👇',
            caption: `El error de novato #1 al programar con Inteligencia Artificial es pedirle la aplicación o el juego completo en un solo prompt.

Cuando no planificas la arquitectura antes de escribir código:
❌ La IA pierde el contexto del proyecto.
❌ Se generan bucles de errores difíciles de corregir.
❌ Desperdicias miles de tokens innecesariamente.

Mi fórmula probada para proyectos que sí terminan:
1️⃣ Gemini como Arquitecto Maestro: definimos reglas del sistema, límites y modelo de datos antes de programar nada.
2️⃣ Divide y Vencerás: pide bloque por bloque (Diseño UI ➔ Lógica central ➔ Base de datos y despliegue).
3️⃣ Verifica y avanza: prueba cada función antes de pedir la siguiente.

💾 Guarda este carrusel para tu próxima sesión de desarrollo.
👉 ¿Quieres seguir aprendiendo? Entra a mi perfil para más contenido sobre desarrollo y gaming.`,
            hashtags: ['#promptengineering', '#gemini', '#ia', '#programacion', '#softwarearchitecture', '#cleancode', '#devcommunity', '#antigravity', '#techtips', '#coding'],
            bestTime: '17:00 - 21:00',
            sound: 'Chillhop / Cyber Lo-Fi atmosférico',
        },
        slides: [
            {
                type: 'hero', layout: 'low', header: 'none',
                kicker: 'Trilogía Creadores · Parte 3',
                title: 'Por qué tu código IA *colapsa*',
                art: 'warning',
                sub: 'El error novato: Pedirle el juego o la web completa en un solo mensaje.',
                prod: 'Fondo negro, advertencia en rojo neón e icono de error de sistema.',
            },
            {
                type: 'compare', layout: 'high', header: 'full',
                title: 'El error de *no planificar*',
                bad: '“Hazme el clon completo de un juego con 5 niveles y base de datos ya.” (Error de compilación)',
                good: '“Primero definamos las reglas, la arquitectura y los contratos paso a paso.”',
                foot: 'Si no diseñas la arquitectura antes, la IA se pierde y genera código sucio.',
                prod: 'Comparación visual directa entre pedir todo de golpe vs estructurar primero.',
            },
            {
                type: 'checklist', layout: 'low', header: 'mini',
                title: 'La solución: *Planea con Gemini*',
                take: [
                    'Reglas del sistema y límites de la app',
                    'Modelo de datos y arquitectura modular',
                ],
                adapt: [
                    'Gemini como tu arquitecto maestro',
                    'Documento estructurado antes de programar nada',
                ],
                foot: 'Yo uso Gemini como arquitecto. Definimos reglas, escalabilidad y estructura antes de programar nada.',
                prod: 'Captura limpia de un documento estructurado estilo Notion/Docs.',
            },
            {
                type: 'flow', layout: 'split',
                title: 'Fórmula maestra: *Divide y vencerás*',
                nodes: [
                    { icon: 'pencil', t: 'Bloque 1 · Diseño UI & Assets', s: 'Define pantallas, colores y personajes primero' },
                    { icon: 'code', t: 'Bloque 2 · Lógica central', s: 'Pide la mecánica base, prueba y verifica' },
                    { icon: 'branch', t: 'Bloque 3 · Despliegue & Datos', s: 'Conecta la base de datos y lanza a producción' },
                ],
                foot: 'Pide módulo por módulo. Verifica, prueba y luego avanza a la siguiente función.',
                prod: 'Tres bloques visuales (Diseño -> Lógica -> Despliegue) iluminándose uno a uno.',
            },
            {
                type: 'cta', layout: 'tilt', tone: 'accent',
                title: '¿Listo para crear *tu proyecto*?',
                keyword: 'STACK',
                line: '¿Quieres seguir aprendiendo? Entra a mi perfil para ver más contenido sobre desarrollo y gaming.',
            },
        ],
    },

    // ==================== TRILOGÍA 2: CASOS DE ÉXITO REALES ====================
    {
        id: 'endo', slug: 'the_last_endo', theme: 'endo', caseNo: 4, group: 'Casos Reales & Pitch',
        title: 'The Last Endo', subtitle: '¿Cómo destacar y ganar un torneo?',
        post: {
            hook: '¿Sabes cómo destacar y ganar un torneo de videojuegos o desarrollo? 👇',
            caption: `Al jurado y al público no les importa cuántas líneas de código escribiste: quieren sentir tensión, misterio y adrenalina.

Siguiendo estos 4 principios gané el torneo nacional con "The Last Endo":

1️⃣ Menos botones, más impacto: Mecánica adictiva de sigilo + point-and-click. Se entiende en 3 segundos sin tutoriales pesados.
2️⃣ Identidad visual propia: Pixel art distintivo. Cero plantillas genéricas vistas mil veces.
3️⃣ Pitch inolvidable: Engancha en 10 segundos, pon el juego en sus manos de inmediato y vende la sensación, no las librerías técnicas.
4️⃣ Visión clara: Los jueces no premian código, premian creadores que saben hacia dónde va a crecer su proyecto.

💾 Guarda este post si estás preparando tu primer juego o pitch.
👉 ¿Quieres seguir aprendiendo? Entra a mi perfil para ver más contenido sobre desarrollo y gaming.`,
            hashtags: ['#gamedev', '#indiedev', '#videojuegos', '#pixelart', '#thelastendo', '#pitchdeck', '#gaming', '#desarrolloweb', '#programacion', '#indiegame', '#creadores'],
            bestTime: '19:00 - 22:00',
            sound: 'Suspense gamer / Retro dark synth instrumental',
        },
        slides: [
            {
                type: 'hero', layout: 'low', header: 'none',
                kicker: 'Kurios Competition 2026',
                title: '¿Sabes cómo *destacar* entre los demás?',
                art: 'trophy',
                image: 'assets/the_last_endo_live.png',
                sub: 'Siguiendo estos simples tips gané el torneo nacional con "The Last Endo"... y tú podrías ser el próximo.',
                prod: 'Captura real del juego en vivo en Vercel. Gancho conversacional con autoridad.',
            },
            {
                type: 'text', layout: 'full', header: 'full',
                title: 'Enamora con *la experiencia*',
                body: 'Al jurado y al público no les importa cuántas líneas escribiste: *quieren sentir tensión*, misterio y adrenalina.',
                icons: [{ name: 'eye', label: 'Tensión' }, { name: 'cursor', label: 'Control' }, { name: 'trophy', label: 'Victoria' }],
                foot: 'El código hace que tu juego funcione, pero la emoción hace que ganes.',
            },
            {
                type: 'steps', layout: 'split',
                title: 'El secreto de una *mecánica adictiva*',
                steps: [
                    { t: 'Menos botones, más impacto', d: 'Sigilo y point-and-click. Se entiende en 3 segundos sin tutoriales largos.' },
                    { t: 'Premia la astucia del jugador', d: 'Cada clic acertado debe sentirse como un logro personal.' },
                    { t: 'Identidad visual propia', d: 'Pixel art distintivo. Cero plantillas genéricas vistas mil veces.' },
                ],
                foot: 'Una mecánica pulida y directa vale diez veces más que un juego sobrecargado.',
            },
            {
                type: 'image', layout: 'float', header: 'none', tone: 'paper',
                title: 'Arte propio con *personalidad*',
                image: 'assets/endo_sprite.jpg',
                chips: ['Paleta corta y limpia', 'Siluetas reconocibles', 'Estilo retro distintivo'],
                foot: 'Un estilo visual consistente hace que tu proyecto sea inolvidable para jurados y jugadores.',
                prod: 'Enfatiza el valor de crear tu propio estilo gráfico para que la gente recuerde tu juego.',
            },
            {
                type: 'steps', layout: 'low', header: 'mini',
                title: 'Cómo hacer un *pitch inolvidable*',
                steps: [
                    { t: 'Engancha en 10 segundos', d: 'Explica qué va a sentir el jugador, no qué motor usaste.' },
                    { t: 'Pon el juego en sus manos', d: 'Una prueba en vivo convence más que 50 diapositivas teóricas.' },
                    { t: 'Muestra tu visión', d: 'Explica por qué tu propuesta es diferente y hacia dónde va a crecer.' },
                ],
                foot: 'Los jueces no premian código, premian creadores con visión clara.',
            },
            {
                type: 'compare', layout: 'high', header: 'full',
                title: 'Vende la *sensación*',
                bad: '“Mi juego usa mecánicas point-and-click con varios scripts.”',
                good: '“Vas a contener la respiración en cada clic para no ser descubierto.”',
                foot: 'Las características técnicas se olvidan. Las emociones se recomiendan.',
            },
            {
                type: 'cta', layout: 'tilt', tone: 'accent',
                title: '¿Quieres crear tu primer juego?',
                keyword: 'ENDO',
                line: '¿Quieres seguir aprendiendo? Entra a mi perfil para ver más contenido sobre desarrollo y gaming.',
            },
        ],
    },
    {
        id: 'mova', slug: 'mova', theme: 'mova', caseNo: 5, group: 'Casos Reales & Pitch',
        title: 'Mova App', subtitle: 'Lógica compleja, experiencia pacífica',
        post: {
            hook: '¿Quieres saber cómo formar una idea verdaderamente innovadora? 👇',
            caption: `La verdadera innovación tecnológica no nace de usar la herramienta más compleja, sino de resolver un problema humano real de forma pacífica.

Así construí Mova (traducción de lenguaje de señas en tiempo real):

1️⃣ La regla del iceberg: El 90% de la matemática pesada (MediaPipe rastreando 21 puntos por mano en cada frame) se queda invisible.
2️⃣ Paz visual: El usuario solo ve palabras grandes, gestos fluidos y máxima claridad.
3️⃣ Valida un solo gesto primero: No intentes traducir todo el diccionario el día uno.
4️⃣ Prueba en teléfonos reales: React + CapacitorJS optimizado para cuidar batería, temperatura y fluidez en cualquier móvil.

💾 Guarda este carrusel para inspirar tu próximo proyecto de impacto.
👉 ¿Quieres seguir aprendiendo? Entra a mi perfil para ver más contenido sobre desarrollo y gaming.`,
            hashtags: ['#innovacion', '#lenguajedeseñas', '#inclusión', '#mediapipe', '#reactjs', '#capacitorjs', '#ia', '#mobiledev', '#programacion', '#tecnologia', '#creadores'],
            bestTime: '13:00 - 15:00 o 20:00 - 22:00',
            sound: 'Piano emotivo ambiental / Lo-fi suave inspirador',
        },
        slides: [
            {
                type: 'hero', layout: 'high', header: 'mini',
                kicker: 'Reto Inspira 2026',
                title: '¿Quieres saber cómo formar una *idea innovadora*?',
                titleSize: '2.05rem',
                image: 'assets/mova_hero.png',
                imageStyle: { backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#071330' },
                sub: 'Así construí Mova: traducción de lenguaje de señas en tiempo real que rompe barreras de comunicación.',
                prod: 'Pantalla oficial de Mova (BETA V2.0). Gancho de innovación con propósito social.',
            },
            {
                type: 'stat', layout: 'low', header: 'none',
                number: '21', label: 'puntos que cambian vidas',
                body: 'MediaPipe rastrea *21 puntos por mano en cada frame*, pero el verdadero arte fue convertir esa matemática en palabras instantáneas.',
                icon: 'hand', visual: 'hand', src: 'tecnología con propósito humano',
            },
            {
                type: 'text', layout: 'float', header: 'full', tone: 'paper',
                title: 'La regla del *iceberg*',
                body: 'El 90% de la lógica pesada se queda *invisible*. El usuario solo ve una palabra grande, gestos fluidos y paz visual.',
                icons: [{ name: 'chip', label: 'IA Oculta' }, { name: 'hand', label: 'Inclusión' }, { name: 'phone', label: 'Claridad' }],
                foot: 'La verdadera maestría no es mostrar cuánta tecnología usas, sino hacer que se sienta fácil.',
            },
            {
                type: 'flow', layout: 'split',
                title: 'De la cámara a *la emoción*',
                nodes: [
                    { icon: 'camera', t: 'Captura natural', s: 'La persona solo hace el gesto frente al lente' },
                    { icon: 'hand', t: 'Visión espacial', s: 'MediaPipe lee las coordenadas en milisegundos' },
                    { icon: 'chip', t: 'Traducción inteligente', s: 'Convierte el movimiento en significado humano' },
                    { icon: 'phone', t: 'Comunicación sin barreras', s: 'Texto grande y legible en cualquier móvil' },
                ],
                foot: 'React + CapacitorJS para que corra fluido en iOS y Android.',
            },
            {
                type: 'steps', layout: 'low', header: 'mini',
                title: 'Tips para *no fundirte al programar*',
                steps: [
                    { t: 'Valida un solo gesto primero', d: 'No intentes traducir todo el diccionario el día uno.' },
                    { t: 'Optimiza para teléfonos reales', d: 'Prueba en dispositivos móviles para cuidar la batería y la temperatura.' },
                    { t: 'Diseña para personas, no para pantallas', d: 'Iconos SVG limpios y alto contraste para máxima accesibilidad.' },
                ],
                foot: 'La escalabilidad se piensa con calma antes de escribir la primera función.',
            },
            {
                type: 'compare', layout: 'tilt', header: 'mini',
                title: 'Prueba donde *cuenta*',
                bad: 'Creer que porque funciona en tu PC potente ya está listo.',
                good: 'Probar en un móvil real sintiendo los FPS y la respuesta térmica.',
                foot: 'La experiencia real de tu usuario es tu único juez.',
            },
            {
                type: 'cta', layout: 'low', tone: 'accent',
                title: '¿Creas apps con impacto?',
                keyword: 'MOVA',
                line: '¿Quieres seguir aprendiendo? Entra a mi perfil para ver más contenido sobre desarrollo y gaming.',
            },
        ],
    },
    {
        id: 'gira', slug: 'girastock', theme: 'gira', caseNo: 6, group: 'Casos Reales & Pitch',
        title: 'GiraStock', subtitle: 'Clona el éxito, adáptalo a tu cliente',
        post: {
            hook: 'Inspírate en las mejores apps del mundo y crea sistemas a medida para clientes 👇',
            caption: `El error de muchos programadores al trabajar con clientes es intentar reinventar la rueda desde cero.

El secreto para cerrar proyectos y cobrar bien:

1️⃣ Familiaridad: Dale a tu cliente la fluidez de interacción que ya conoce y ama (pantallas limpias, directas y sin botones raros).
2️⃣ Resuelve su dolor específico: Diseña reglas de negocio y reportes rápidos que le ahorren horas de trabajo cada semana.
3️⃣ No vendas código, vende tiempo: El cliente no compra sintaxis ni frameworks, compra horas de vida y control de su negocio.
4️⃣ Flujo express: Antigravity + Supabase MCP + GitHub + Vercel = Prototipos funcionales en días con cero servidores que mantener.

💾 Guarda este post si haces freelance o desarrollo web para clientes.
👉 ¿Quieres seguir aprendiendo? Entra a mi perfil para ver más contenido sobre desarrollo y gaming.`,
            hashtags: ['#freelance', '#desarrolloweb', '#clientes', '#vercel', '#supabase', '#antigravity', '#saas', '#programacion', '#fullstack', '#negociosdigitales', '#coding'],
            bestTime: '11:00 - 14:00 o 18:00 - 21:00',
            sound: 'Corporate tech modern / Upbeat motivation beat',
        },
        slides: [
            {
                type: 'hero', layout: 'float', header: 'full',
                kicker: 'Desarrollo para Clientes',
                title: 'Inspírate en las apps top, *crea a medida*',
                titleSize: '2.05rem',
                image: 'assets/simulacion_simadi_live.png',
                sub: 'Cómo construí soluciones reales tomando la fluidez de sistemas modernos adaptadas a necesidades de negocio.',
                prod: 'Captura real de despliegue en Vercel. Excelente para enseñar a resolver dolores reales de clientes.',
            },
            {
                type: 'quote', layout: 'low', header: 'none', tone: 'paper',
                quote: 'No reinventes la rueda: dale a tu cliente la *familiaridad* que ya ama, pero resolviendo su dolor específico.',
                by: 'Estrategia de Producto para Freelancers'
            },
            {
                type: 'checklist', layout: 'full', header: 'mini',
                title: 'Inspiración *vs* Copia vacía',
                take: ['La fluidez de interacción que el usuario ya conoce', 'Pantallas limpias, directas y sin botones raros'],
                adapt: ['Reglas de negocio especializadas para el cliente', 'Reportes directos que le ahorran horas cada semana'],
                prod: 'Demuestra criterio comercial: inspirarse en los grandes para servir a un cliente real.',
            },
            {
                type: 'steps', layout: 'split',
                title: 'Cómo cobrar bien por *tu trabajo*',
                steps: [
                    { t: 'Habla de tiempo y dinero', d: 'El cliente no compra código, compra horas de vida y control de su negocio.' },
                    { t: 'Entregas ultra veloces', d: 'Usa herramientas modernas para tener prototipos funcionales en días.' },
                    { t: 'Despliegue automático', d: 'Conecta GitHub con Vercel para que vean los avances en su móvil al instante.' },
                ],
                foot: 'La velocidad y la claridad generan una confianza que ningún competidor puede igualar.',
            },
            {
                type: 'flow', layout: 'tilt', header: 'none',
                title: 'Tu flujo de *entrega express*',
                nodes: [
                    { icon: 'pencil', t: 'Entiende su necesidad', s: 'Escucha qué le hace perder tiempo cada día' },
                    { icon: 'code', t: 'Construye ágil', s: 'Antigravity + Supabase MCP directo en tu editor' },
                    { icon: 'triangle', t: 'Publica en la nube', s: 'GitHub + Vercel sincronizados en un clic' },
                    { icon: 'phone', t: 'Cliente impresionado', s: 'Revisando su sistema en vivo desde su teléfono' },
                ],
                foot: 'Cada push a main es una nueva versión en producción sin tocar servidores.',
            },
            {
                type: 'stat', layout: 'split',
                title: 'Lo que *te ahorras*',
                number: '0', label: 'servidores que mantener',
                body: 'Vercel + Supabase: tu cliente paga por *resultados reales*, no por infraestructura compleja.',
                icon: 'database', visual: 'servers', src: 'fórmula: agilidad + valor de negocio',
            },
            {
                type: 'cta', layout: 'high', tone: 'accent',
                title: '¿Creas webs para clientes?',
                keyword: 'STOCK',
                line: '¿Quieres seguir aprendiendo? Entra a mi perfil para ver más contenido sobre desarrollo y gaming.',
            },
        ],
    },

    // ==================== GUÍAS DE HERRAMIENTAS ====================
    // Datos verificados en antigravity.google (oct 2026). Precios en USD:
    // revísalos antes de publicar, Google puede cambiarlos.
    {
        id: 'agy', slug: 'guia_antigravity', theme: 'agy', caseNo: 7, group: 'Guías de Herramientas',
        title: 'Guía: Antigravity', subtitle: 'Qué es, instalación, planes y ahorro de tokens',
        post: {
            hook: '¿Qué es Google Antigravity y cómo sacarle el 100% sin gastar tu cuota? 👇',
            caption: `Guía rápida para entender y dominar la plataforma de agentes de IA de Google:

1️⃣ No es un autocompletado: Es un equipo completo donde agentes autónomos planean, programan en múltiples archivos y prueban tu app en el navegador.
2️⃣ Instálalo en 3 pasos: Descárgalo gratis en antigravity.google, inicia con tu cuenta de Google y abre tu carpeta de trabajo.
3️⃣ Precios y planes: Modo Gratis para probar, Google AI Pro ($19.99/mes con cuota renovada cada 5h) y Ultra para máxima prioridad.
4️⃣ El truco del ahorro de tokens: Cada IA en su rol. Gemini planea la arquitectura, Antigravity hace el trabajo pesado y Opencode pule detalles finos con tu API key oficial.
5️⃣ MCP nativo: Conecta Stitch para diseñar interfaces con palabras, Supabase para bases de datos SQL y GitHub para sincronizar sin fricción.

💾 Guarda esta guía para no perderla cuando configures tu entorno.
👉 ¿Quieres seguir aprendiendo? Entra a mi perfil para más contenido sobre dev y gaming.`,
            hashtags: ['#antigravity', '#googleai', '#gemini', '#opencode', '#stitchmcp', '#programacion', '#ia', '#desarrolloweb', '#softwareengineer', '#tutorial', '#aiagents'],
            bestTime: '17:00 - 21:00',
            sound: 'Cyberpunk chill / Synth ambient tech',
        },
        slides: [
            {
                type: 'hero', layout: 'low', header: 'none',
                kicker: 'Guía completa · Guárdala',
                title: '¿Qué es *Antigravity* y cómo sacarle el jugo?',
                titleSize: '2.3rem',
                artIcon: 'terminal', artCorner: 'GOOGLE · AGY', artLabel: 'AGENTES DE IA',
                sub: 'Qué es, cómo se instala, cuánto cuesta y cómo hacer que tu cuota rinda mucho más.',
                prod: 'Portada de guía: promete valor concreto para que la guarden.',
            },
            {
                type: 'text', layout: 'full', header: 'full',
                title: 'No es un autocompletado: *es un equipo*',
                body: 'Es la plataforma de Google donde *agentes de IA planean, programan y prueban* tu proyecto por ti.',
                icons: [{ name: 'code', label: 'Editor' }, { name: 'terminal', label: 'Terminal' }, { name: 'eye', label: 'Navegador' }],
                foot: 'Tú das la dirección. El agente trabaja y te muestra qué hizo para que lo revises.',
            },
            {
                type: 'steps', layout: 'split',
                title: 'Instálalo *en 3 pasos*',
                steps: [
                    { t: 'Descárgalo gratis', d: 'antigravity.google/download · Windows 10+, macOS y Linux.' },
                    { t: 'Entra con tu cuenta de Google', d: 'La misma de Gmail. Sin tarjetas para empezar.' },
                    { t: 'Abre tu carpeta y pide algo', d: 'Escribe en el chat lo que quieres construir. Así de simple.' },
                ],
                prod: 'Si quieres, graba la pantalla de descarga y úsala de fondo en el video.',
            },
            {
                type: 'list', layout: 'high', header: 'mini',
                title: '¿Cuánto *cuesta*?',
                highlight: 1,
                rows: [
                    { icon: 'heart', t: 'Gratis', d: 'Ideal para probar. Límite semanal.', tag: '$0' },
                    { icon: 'sparkle', t: 'Google AI Pro', d: 'Tu cuota se renueva cada 5 horas.', tag: '$19.99/mes' },
                    { icon: 'trophy', t: 'Google AI Ultra', d: 'La cuota más alta y prioridad.', tag: 'desde $99.99' },
                ],
                foot: 'No se paga aparte: va incluido en tu plan de Google AI. Precios en USD, pueden cambiar.',
                prod: 'Verifica precios en antigravity.google antes de publicar.',
            },
            {
                type: 'flow', layout: 'low', header: 'mini',
                title: 'El truco: *cada IA en su rol*',
                nodes: [
                    { icon: 'pencil', t: 'Gemini planea', s: 'Ideas y estructura en un chat, sin gastar al agente' },
                    { icon: 'code', t: 'Antigravity construye', s: 'Lo pesado: lógica, archivos y pruebas' },
                    { icon: 'terminal', t: 'Opencode pule', s: 'Cambios pequeños sin releer todo el proyecto' },
                    { icon: 'check', t: 'Tú apruebas', s: 'Revisas y decides qué se queda' },
                ],
                foot: 'Usa la herramienta potente solo donde de verdad hace la diferencia.',
            },
            {
                type: 'code', layout: 'split',
                title: 'Conecta *Opencode* a Gemini',
                file: 'terminal ~ opencode-setup',
                lang: 'bash',
                code: [
                    '# 1. Instala Opencode',
                    '$ npm i -g opencode-ai',
                    '',
                    '# 2. Crea tu API key en aistudio.google.com',
                    '$ opencode auth login',
                    '→ Elige Google y pega tu key',
                    '',
                    '# 3. Úsalo en tu proyecto',
                    '$ cd mi-juego && opencode',
                ],
                foot: 'Usa siempre una API key oficial. Los atajos no oficiales pueden bloquear tu cuenta.',
                prod: 'Graba tu terminal haciendo estos 3 pasos para que se vea real.',
            },
            {
                type: 'text', layout: 'float', header: 'full', tone: 'paper',
                title: 'Diseña con *Stitch*',
                body: 'Describe tu pantalla con palabras, Stitch crea el diseño y el agente *lo convierte en código*.',
                icons: [{ name: 'pencil', label: 'Describe' }, { name: 'layers', label: 'Diseña' }, { name: 'code', label: 'Programa' }],
                foot: 'Es un MCP: un “enchufe” que conecta al agente con otras apps como Supabase, GitHub o Notion.',
            },
            {
                type: 'compare', layout: 'tilt', header: 'mini',
                title: 'Lo que *más cuota* te gasta',
                bad: 'Abrir un chat nuevo cada vez y volver a explicarle todo tu proyecto.',
                good: 'Dejar tus reglas guardadas para que el agente ya sepa cómo trabajas.',
                foot: 'Menos idas y vueltas = menos tokens gastados.',
            },
            {
                type: 'list', layout: 'full', header: 'full',
                title: 'Funciones que *casi nadie usa*',
                rows: [
                    { icon: 'arrow', t: 'Autocompletado', d: 'Te adelanta el siguiente cambio.', tag: 'Tab' },
                    { icon: 'pencil', t: 'Edición rápida', d: 'Seleccionas código y pides un cambio puntual.', tag: 'Ctrl+I' },
                    { icon: 'layers', t: 'Modo planificación', d: 'Revisas el plan antes de que toque nada.', tag: 'Plan' },
                    { icon: 'eye', t: 'Navegador del agente', d: 'Abre tu web y la prueba solo.', tag: 'Browser' },
                    { icon: 'book', t: 'Skills y reglas', d: 'Tus instrucciones guardadas por proyecto.', tag: '.agents/' },
                ],
                foot: 'Bien usadas, estas funciones hacen el trabajo más rápido y con menos cuota.',
            },
            {
                type: 'cta', layout: 'high', tone: 'accent',
                title: '¿Te quedó *alguna duda*?',
                keyword: 'AGY',
                line: 'y dime qué explico en la próxima. ¿Quieres seguir aprendiendo? Entra a mi perfil para más dev y gaming.',
            },
        ],
    },

    // =========================================================================
    // GUÍA DE HERRAMIENTAS · PARTE 2: SUPERPODERES Y VENTAJAS DE ANTIGRAVITY
    // =========================================================================
    // Destaca por qué Antigravity cambia las reglas del juego:
    // 1. Núcleo sobre Visual Studio Code (Code OSS): compatibilidad total, 0 fricción.
    // 2. De autocompletado pasivo a agente autónomo completo.
    // 3. Ciclo completo: Planificación -> Edición multiarchivo -> Terminal -> Test en navegador.
    // 4. Subagentes en segundo plano y protocolo MCP nativo.
    // =========================================================================
    {
        id: 'agy_power', slug: 'ventajas_antigravity_vs_code', theme: 'agy_power', caseNo: 8, group: 'Guías de Herramientas',
        title: 'Ventajas: Antigravity', subtitle: 'Base VS Code, navegador y agentes autónomos',
        post: {
            hook: '¿Por qué Antigravity NO es otro editor más? Te muestro sus superpoderes 👇',
            caption: `Muchos piensan que es otro Copilot, pero la diferencia entre sugerir y resolver es total:

1️⃣ Base Visual Studio Code: Núcleo Code OSS. Tus atajos de teclado, temas y extensiones de siempre funcionan al instante. Cero curva de adaptación.
2️⃣ Copilot sugiere, Antigravity resuelve: No te da pedazos de código sueltos. Entiende toda tu arquitectura y edita múltiples archivos de forma coordinada.
3️⃣ Ciclo autónomo completo: Diseña el plan ➔ Escribe código ➔ Corre scripts en terminal ➔ Abre su navegador integrado y valida que la interfaz responda.
4️⃣ Subagentes en segundo plano y MCP: Ejecuta tareas pesadas de fondo mientras sigues programando, y conecta APIs o diseño con Stitch nativamente.

💾 Guarda este post para tu próxima comparativa técnica.
👉 ¿Quieres seguir aprendiendo? Entra a mi perfil para ver más contenido sobre desarrollo y gaming.`,
            hashtags: ['#antigravity', '#vscode', '#developer', '#programacion', '#aiagents', '#githubcopilot', '#softwaredevelopment', '#productivity', '#codinglife', '#tecnologia'],
            bestTime: '12:00 - 14:00 o 19:00 - 22:00',
            sound: 'Futuristic electronic / Bass groove tech',
        },
        slides: [
            {
                type: 'hero', layout: 'low', header: 'none',
                kicker: 'Superpoderes · Guárdalo',
                title: '¿Por qué Antigravity *no es otro editor más*?',
                titleSize: '2.25rem',
                artIcon: 'layers', artCorner: 'VS CODE CORE', artLabel: 'DEV SUPERPOWERS',
                sub: 'Tiene como base a Visual Studio Code, pero con agentes autónomos que hacen el trabajo pesado por ti.',
                prod: 'Portada con acento azul cielo / eléctrico y badge de VS Code Core.',
            },
            {
                type: 'text', layout: 'full', header: 'full',
                title: 'Base VS Code: *Cero fricción*',
                body: 'Tus *atajos, temas y extensiones* de siempre siguen aquí. Te sientes como en casa desde el primer minuto.',
                icons: [
                    { name: 'terminal', label: 'Tus Atajos' },
                    { name: 'layers', label: 'Tus Plugins' },
                    { name: 'sparkle', label: '0 Fricción' },
                ],
                foot: 'No tienes que cambiar de hábitos ni aprender una herramienta extraña: es el editor que ya dominas.',
            },
            {
                type: 'compare', layout: 'tilt', header: 'mini',
                title: 'Copilot sugiere, *Antigravity resuelve*',
                bad: 'Un chat flotante que te da fragmentos sueltos y te toca a ti copiar, pegar y arreglar los errores.',
                good: 'Un agente que entiende toda tu arquitectura, coordina múltiples archivos a la vez y prueba los cambios.',
                foot: 'Pasas de autocompletar líneas a dirigir a un colega de equipo autónomo.',
            },
            {
                type: 'flow', layout: 'low', header: 'mini',
                title: 'El ciclo autónomo: *De la idea al test*',
                nodes: [
                    { icon: 'pencil', t: '1. Planifica', s: 'Diseña la ruta técnica y te pide aprobación antes de tocar código' },
                    { icon: 'code', t: '2. Multi-archivo', s: 'Aplica cambios coordinados en backend, frontend y estilos' },
                    { icon: 'terminal', t: '3. Ejecuta comandos', s: 'Corre scripts, instala librerías y soluciona fallos' },
                    { icon: 'eye', t: '4. Test visual', s: 'Abre el navegador integrado y valida que la interfaz funcione' },
                ],
                foot: 'No es solo escribir código: es llevar una tarea desde el concepto hasta su verificación final.',
            },
            {
                type: 'list', layout: 'full', header: 'full',
                title: '3 ventajas *que marcan la diferencia*',
                highlight: 0,
                rows: [
                    { icon: 'eye', t: 'Navegador Autónomo', d: 'El agente interactúa con tu web, hace clics y detecta errores visuales.', tag: 'Browser' },
                    { icon: 'layers', t: 'Subagentes Background', d: 'Lanza tareas pesadas de fondo mientras sigues programando sin pausa.', tag: 'Async' },
                    { icon: 'sparkle', t: 'Ecosistema MCP Nativo', d: 'Conéctalo con Stitch para diseño, bases de datos o Notion en un clic.', tag: 'Plugins' },
                ],
                foot: 'Todo integrado nativamente en el núcleo del editor, sin extensiones inestables de terceros.',
            },
            {
                type: 'quote', layout: 'split', header: 'mini',
                title: 'La verdadera ventaja:',
                quote: 'No necesitas saltar entre 5 aplicaciones separadas. *Todo tu ciclo de desarrollo vive dentro de tu editor de siempre*.',
                by: 'Desarrollador & Creador',
            },
            {
                type: 'cta', layout: 'high', tone: 'accent',
                title: '¿Ya lo probaste *en tu proyecto*?',
                keyword: 'VSCODE',
                line: 'y cuéntame qué extensión no puede faltar en tu setup. ¿Quieres seguir aprendiendo? Entra a mi perfil para ver más contenido sobre desarrollo y gaming.',
            },
        ],
    },

    // =========================================================================
    // GUÍA DE HERRAMIENTAS · PARTE 3: TOKENS INFINITOS & WORKFLOW MULTI-CUENTA
    // =========================================================================
    // Flujo táctico de ahorro extremo de cuota y rendimiento:
    // 1. Planificación externa en Gemini (2M de contexto, 0 tokens gastados en IDE).
    // 2. Dúo Antigravity (arquitectura/orquestación) + Opencode (refactor/terminal).
    // 3. Compresión de contexto: Grafos de Graphify y pantallas desacopladas con Stitch MCP.
    // 4. Git checkpoints: Micro-commits para limpiar contexto y rollback instantáneo.
    // 5. Multi-cuentas gratis: Antigravity (sin bloqueos de máquina) vs Cursor (bloqueo por HWID).
    // 6. Gemini AI Pro: Ventajas reales de la suscripción (2M tokens, cuotas ultra-altas).
    // =========================================================================
    {
        id: 'token_mastery', slug: 'tokens_infinitos_antigravity_opencode', theme: 'tokens_pro', caseNo: 9, group: 'Guías de Herramientas',
        title: 'Tokens Infinitos: Flujo Pro', subtitle: 'Opencode + Antigravity, Gemini y Multi-Cuentas',
        post: {
            hook: '¿Te quedas sin tokens a mitad de proyecto? Así los multiplico x10 👇',
            caption: `Programar con agentes de IA no se trata de quemar cuota a lo loco, sino de orquestar el flujo inteligente:

1️⃣ Planifica con Gemini fuera del IDE: No quemes tokens caros del editor en pensar. Usa la ventana de 2M de tokens de Gemini para estructurar la arquitectura y los pasos antes de tocar código.
2️⃣ El dúo Antigravity + Opencode: Antigravity levanta la arquitectura pesada multi-archivo; Opencode pule detalles finos y scripts desde la terminal sin inflar el contexto.
3️⃣ Grafos con Graphify & Stitch MCP: Comprime tu base de código en grafos de relaciones para no re-enviar archivos enteros, y diseña interfaces modulares con Stitch vía MCP.
4️⃣ Micro-commits de Git: Haz commit tras cada cambio validado. Mantienes el contexto del agente limpio y tienes rollback instantáneo si algo falla.
5️⃣ Multi-cuentas gratis sin bloqueos: A diferencia de Cursor (que te rastrea el hardware y te bloquea al cambiar de cuenta), Antigravity te permite alternar cuentas de Google oficiales legalmente con cuota diaria regenerativa.
6️⃣ Todas las ventajas de Gemini AI Pro:
   • 2M Tokens de contexto (repositorios y libros enteros en 1 prompt).
   • Gems personalizados (asistentes y mentores de código a medida).
   • Python Sandbox interactivo en vivo.
   • Integración nativa en Google Workspace (Docs, Gmail, Sheets, Meet).
   • 2 TB de almacenamiento en Google One para proyectos y backups.
   • Mayores cuotas de tasa (RPM/TPM) y API tier en Google AI Studio para tus agentes.

💾 Guarda este post para tu próxima sesión de código.
👉 Comenta "TOKENS" y te comparto mi setup de reglas y prompts. ¡Sígueme para más dev y gaming!`,
            hashtags: ['#antigravity', '#opencode', '#geminiai', '#geminipro', '#programacion', '#desarrolloweb', '#aiagents', '#tokens', '#cursorai', '#vscode', '#softwaredevelopment'],
            bestTime: '13:00 - 15:00 o 19:00 - 22:00',
            sound: 'Synthwave / Cyberpunk Lo-Fi Chill',
        },
        slides: [
            // Slide 1: Portada
            {
                type: 'hero', layout: 'low', header: 'none',
                kicker: 'Tokens & Cuota · Guárdalo',
                title: '¿Cómo tener *tokens infinitos*?',
                titleSize: '2.45rem',
                artIcon: 'zap', artCorner: 'TOKEN HACK', artLabel: 'ANTIGRAVITY + OPENCODE',
                sub: 'El flujo secreto: Opencode + Antigravity, Gemini para planear y el truco multi-cuenta que Cursor te bloquea.',
                prod: 'Portada estilo ciber-neón verde menta con icono de rayo y badge de hack de tokens.',
            },
            // Slide 2: Planear con Gemini
            {
                type: 'text', layout: 'full', header: 'full',
                title: 'Paso 1: *Planifica fuera del IDE*',
                body: 'Nunca uses el agente del editor para pensar desde cero. Usa *Gemini con 2M de contexto* para estructurar la arquitectura primero.',
                icons: [
                    { name: 'sparkle', label: 'Gemini 2M' },
                    { name: 'book', label: 'Plan Maestro' },
                    { name: 'terminal', label: '0 Tokens IDE' },
                ],
                foot: 'Al editor solo le pasas prompts con tareas quirúrgicas. Ahorras hasta un 70% de tokens del agente.',
            },
            // Slide 3: El Dúo Antigravity + Opencode
            {
                type: 'flow', layout: 'low', header: 'mini',
                title: 'El combo: *Antigravity + Opencode*',
                nodes: [
                    { icon: 'layers', t: '1. Antigravity orquesta', s: 'Genera el 85% de la arquitectura base y edita múltiples archivos a la vez.' },
                    { icon: 'terminal', t: '2. Opencode pule', s: 'Ajustes finos, pruebas y funciones puntuales desde terminal con bajo consumo.' },
                    { icon: 'zap', t: '3. Ahorro inteligente', s: 'Evitas reinyectar todo el historial del proyecto en cada modificación menor.' },
                    { icon: 'check', t: '4. Velocidad pura', s: 'La potencia visual de VS Code combinada con la agilidad ligera de consola.' },
                ],
                foot: 'Usa el agente grande para levantar el sistema y la herramienta ligera para los retoques.',
            },
            // Slide 4: Graphify & Stitch MCP
            {
                type: 'list', layout: 'full', header: 'full',
                title: 'Contexto inteligente: *Graphify & Stitch*',
                highlight: 0,
                rows: [
                    { icon: 'branch', t: 'Grafos con Graphify', d: 'Convierte tu código en un mapa de relaciones: el agente lee solo los nodos relevantes.', tag: 'Knowledge' },
                    { icon: 'layers', t: 'Stitch MCP', d: 'Prototipa pantallas modulares vía MCP sin quemar contexto describiendo CSS paso a paso.', tag: 'Design MCP' },
                    { icon: 'database', t: 'Reglas en .agents/', d: 'Deja tus guías y stacks fijados para que el agente nunca olvide el estándar del proyecto.', tag: 'Skills' },
                ],
                foot: 'Menos archivos crudos en el prompt = miles de tokens ahorrados en cada consulta.',
            },
            // Slide 5: Guardar cada cambio (Git Checkpoints)
            {
                type: 'compare', layout: 'tilt', header: 'mini',
                title: 'Guarda cada cambio: *Micro-commits*',
                bad: 'Dejar que el agente haga 15 cambios seguidos sin guardar: si algo se rompe, gastas el triple de tokens depurando.',
                good: 'Git commit tras cada hito validado: contexto limpio, diffs claros y rollback instantáneo sin perder el hilo.',
                foot: 'Un commit a tiempo resetea la memoria residual del agente y evita alucinaciones.',
            },
            // Slide 6: Multi-cuentas gratis: Antigravity vs Cursor
            {
                type: 'compare', layout: 'tilt', header: 'mini',
                title: 'Multi-cuentas: *Antigravity vs Cursor*',
                bad: 'Cursor: Rastrea tu máquina por hardware ID. Si intentas alternar cuentas gratis, te bloquea o limita drásticamente.',
                good: 'Antigravity: Soporta cambiar entre múltiples cuentas de Google oficiales sin penalizaciones ni bloqueos de dispositivo.',
                foot: 'Puedes alternar tus cuentas gratuitas con cuota regenerativa diaria de forma 100% legal.',
            },
            // Slide 7: Superpoderes Dev de Gemini AI Pro
            {
                type: 'list', layout: 'full', header: 'full',
                title: 'Superpoderes Dev: *Gemini AI Pro*',
                highlight: 0,
                rows: [
                    { icon: 'zap', t: '2M Tokens & Multimodal', d: 'Sube repos enteros, PDFs técnicos o 1 hora de video en un solo prompt.', tag: '2M Context' },
                    { icon: 'sparkle', t: 'Gems & Deep Research', d: 'Crea agentes de código a medida con investigación técnica profunda en la web.', tag: 'Custom AI' },
                    { icon: 'terminal', t: 'Python Sandbox en Vivo', d: 'Ejecuta, depura y visualiza código en tiempo real directamente en la interfaz.', tag: 'Code Runner' },
                ],
                foot: 'La ventana de 2 millones de tokens permite que el modelo entienda tu arquitectura completa de un solo golpe.',
            },
            // Slide 8: Ecosistema & Cloud de Google AI Pro
            {
                type: 'list', layout: 'full', header: 'full',
                title: 'Ecosistema & Cloud: *Google AI Pro*',
                highlight: 2,
                rows: [
                    { icon: 'layers', t: 'Workspace & Drive Nativo', d: 'Gemini en Docs, Sheets, Gmail y Drive leyendo tus archivos de proyecto.', tag: 'Workspace' },
                    { icon: 'database', t: '2 TB a 5 TB + Cloud Credits', d: 'Espacio masivo en la nube y créditos mensuales ($10 USD) de Google Cloud.', tag: 'Cloud Tier' },
                    { icon: 'chip', t: 'AI Studio & Alta Cuota', d: 'Mayor tasa (RPM/TPM) sin esperas para alimentar Antigravity y tus agentes CLI.', tag: 'High Quota' },
                ],
                foot: 'No es solo un chat: incluye créditos en la nube, almacenamiento masivo y alta tasa para desarrollo.',
            },
            // Slide 9: CTA Final
            {
                type: 'cta', layout: 'high', tone: 'accent',
                title: '¿Quieres exprimir *tus tokens*?',
                keyword: 'TOKENS',
                line: 'y te paso mi plantilla de reglas .agents/ y comandos de Opencode. ¿Quieres seguir aprendiendo? Entra a mi perfil para más dev y gaming.',
            },
        ],
    },
];
