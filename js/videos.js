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
];
