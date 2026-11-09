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
    // REEL DESTACADO: PYQUEST EP. 1 · ¿POR QUÉ PYTHON ES TU MEJOR INICIO? (72s @ 60 FPS)
    // =====================================================================
    {
        id: 'reel_pyquest_ep01',
        accountId: 'santidev',
        slug: 'pyquest_ep01_por_que_python',
        theme: 'stack1',
        title: 'PyQuest Ep. 1: ¿Por qué Python?',
        subtitle: 'El mejor lenguaje para empezar a programar sin frustración',
        duration_ms: 72000,
        duration: 72.0,
        fps: 60,
        kicker: 'PYQUEST · PYTHON DESDE CERO',
        brandIcon: 'fa-gamepad',
        accentColor: '#3B82F6',
        secondaryColor: '#10B981',
        videoUrl: 'videos/pyquest_ep01_por_que_python.mp4',
        soundUrl: 'bgm/tech_ambient_bed.mp3',
        post: {
            hook: '¿Por qué la mayoría abandona la programación en dos semanas? 👇',
            caption: `La mayoría de personas que intentan aprender a programar abandonan en las primeras dos semanas. Y casi nunca es por falta de lógica: es porque eligieron el lenguaje equivocado para empezar.

En este primer episodio de PyQuest (nuestra serie donde construimos el motor lógico de un RPG en Python desde cero) te explico:

1️⃣ Carga cognitiva vs. Lógica: Cómo la sintaxis estricta te frustra antes de crear algo divertido.
2️⃣ Pseudocódigo ejecutable: Por qué Python se lee casi como hablar en español.
3️⃣ Escalabilidad real: La misma sintaxis que aprende un novato impulsa la IA, el backend de gigantes como Instagram y la ciencia de datos.

💾 Guarda este video para tu ruta de aprendizaje.
👉 Sígueme para el Episodio 2: Variables y Tipos de Datos (el ADN de nuestro héroe).`,
            hashtags: ['#python', '#programacion', '#aprenderaprogramar', '#pyquest', '#desarrolloweb', '#ia', '#gamedev'],
            bestTime: '18:00 - 21:00',
            sound: 'Tech Ambient Bed'
        },
        beats: [
            {
                id: 1,
                name: 'El Choque de Sintaxis',
                start_ms: 0,
                end_ms: 8000,
                type: 'hero',
                badge: 'EL ERROR INICIAL',
                title: '¿Por qué abandonas la *programación*?',
                sub: 'Casi nunca es por falta de lógica: es por elegir el lenguaje equivocado.',
                kicker: 'EPISODIO 1 · PYQUEST',
                vo: 'La mayoría que intenta aprender abandona por el lenguaje equivocado.'
            },
            {
                id: 2,
                name: 'Carga Cognitiva vs Lógica',
                start_ms: 8000,
                end_ms: 24000,
                type: 'points',
                badge: 'SINTAXIS LIMPIA',
                title: 'Python elimina *el ruido*',
                sub: 'Enfócate en resolver problemas en vez de memorizar símbolos raros.',
                points: [
                    { num: '01', title: 'Cero Boilerplate', desc: 'Sin clases obligatorias ni puntos y comas para un Hola Mundo.' },
                    { num: '02', title: 'Foco en Lógica', desc: 'Aprende a pensar paso a paso desde el primer minuto.' }
                ],
                vo: 'Python quita las reglas complejas para que te enfoques en la lógica.'
            },
            {
                id: 3,
                name: 'Pseudocódigo Ejecutable',
                start_ms: 24000,
                end_ms: 42000,
                type: 'showcase',
                badge: 'MOTOR RPG',
                title: 'Se lee casi como *español*',
                sub: 'if vida <= 0: fin_del_juego(). Lógica pura sin fricción técnica.',
                points: [
                    { num: '03', title: 'Regla 1 del RPG', desc: 'Si la vida llega a cero, el juego termina.' },
                    { num: '04', title: 'Aria en vivo', desc: 'Estado del héroe y barra de vida conectada.' }
                ],
                vo: 'Aunque nunca hayas programado, lo entiendes: es lógica pura.'
            },
            {
                id: 4,
                name: 'Escalabilidad Real',
                start_ms: 42000,
                end_ms: 58000,
                type: 'points',
                badge: 'TODA LA INDUSTRIA',
                title: 'Una sola base, *todo el mercado*',
                sub: 'La misma sintaxis mueve la Inteligencia Artificial, Backend y Ciencia de Datos.',
                points: [
                    { num: '05', title: 'IA y Modelos', desc: 'PyTorch, OpenAI y visión por computadora.' },
                    { num: '06', title: 'Grandes Plataformas', desc: 'El backend de Instagram, Spotify y miles de APIs.' }
                ],
                vo: 'Esta misma base mueve la IA y los servidores más grandes del mundo.'
            },
            {
                id: 5,
                name: 'Cierre y CTA',
                start_ms: 58000,
                end_ms: 72000,
                type: 'cta',
                badge: 'SERIE COMPLETA',
                title: 'Construyamos juntos *PyQuest*',
                sub: 'Episodio 1 Completado · Próximo: Variables y Tipos de Datos.',
                ctaData: {
                    keyword: 'PYTHON',
                    line: 'Guarda este video y sígueme para el Episodio 2.',
                    handle: '@santi.dev'
                },
                vo: 'Guarda este video y sígueme para el episodio dos.'
            }
        ]
    },
    // =====================================================================
    // REEL DESTACADO: PYQUEST EP. 1 (V2 RAYOS X 2.5D) · ¿POR QUÉ PYTHON? (66s @ 60 FPS)
    // =====================================================================
    {
        id: 'reel_pyquest_ep01_v2',
        accountId: 'santidev',
        slug: 'pyquest_ep01_v2_xray',
        theme: 'stack1',
        title: 'PyQuest Ep. 1 (V2 Rayos X): ¿Por qué Python?',
        subtitle: 'Edición Rayos X 2.5D con import rotativo de IA, Backend, Datos y Bots',
        duration_ms: 66000,
        duration: 66.0,
        fps: 60,
        kicker: 'PYQUEST · EDICIÓN V2 RAYOS X',
        brandIcon: 'fa-layer-group',
        accentColor: '#8B5CF6',
        secondaryColor: '#10B981',
        videoUrl: 'videos/pyquest_ep01_v2_xray.mp4?v=1',
        soundUrl: 'bgm/tech_ambient_bed.mp3',
        post: {
            hook: '¿Por qué la mayoría abandona la programación en dos semanas? (Edición V2 Rayos X) 👇',
            caption: `La mayoría de personas que intentan aprender a programar abandonan en las primeras dos semanas. Y casi nunca es por falta de lógica: es porque eligieron el lenguaje equivocado para empezar.

En esta versión V2 del Episodio 1 de PyQuest (con escenario interactivo Rayos X 2.5D) te muestro:

1️⃣ Carga cognitiva vs. Lógica: Cómo la sintaxis estricta te frustra antes de crear algo divertido.
2️⃣ Pseudocódigo ejecutable: Por qué Python se lee casi como hablar en español.
3️⃣ Rayos X 2.5D de la Industria: Cómo un simple import conecta la misma sintaxis con IA (OpenAI/PyTorch), Backend masivo (FastAPI), Big Data (Pandas) y Automatización 24/7 (Playwright).

💾 Guarda este video para tu ruta de aprendizaje.
👉 Sígueme para el Episodio 2: Variables y Tipos de Datos (el ADN de nuestro héroe).`,
            hashtags: ['#python', '#programacion', '#aprenderaprogramar', '#pyquest', '#ia', '#fastapi', '#gamedev'],
            bestTime: '18:00 - 21:00',
            sound: 'Tech Ambient Bed'
        },
        beats: [
            {
                id: 1,
                name: 'El Choque de Sintaxis',
                start_ms: 0,
                end_ms: 9000,
                type: 'hero',
                badge: 'EL ERROR INICIAL',
                title: '¿Por qué abandonas la *programación*?',
                sub: 'Casi nunca es por falta de lógica: es por elegir el lenguaje equivocado.',
                kicker: 'EPISODIO 1 (V2) · PYQUEST',
                vo: 'La mayoría que intenta aprender abandona por el lenguaje equivocado.'
            },
            {
                id: 2,
                name: 'Carga Cognitiva vs Lógica',
                start_ms: 9000,
                end_ms: 23000,
                type: 'points',
                badge: 'SINTAXIS LIMPIA',
                title: 'Python elimina *el ruido*',
                sub: 'Enfócate en resolver problemas en vez de memorizar símbolos raros.',
                points: [
                    { num: '01', title: 'Cero Boilerplate', desc: 'De 7 líneas en Java/C++ a 1 línea directa en Python.' },
                    { num: '02', title: 'Foco en Lógica', desc: 'Aprende a pensar paso a paso desde el primer minuto.' }
                ],
                vo: 'Python quita las reglas complejas para que te enfoques en la lógica.'
            },
            {
                id: 3,
                name: 'Pseudocódigo Ejecutable',
                start_ms: 23000,
                end_ms: 42000,
                type: 'showcase',
                badge: 'MOTOR RPG',
                title: 'Se lee casi como *español*',
                sub: 'if vida <= 0: fin_del_juego(). Lógica pura sin fricción técnica.',
                points: [
                    { num: '03', title: 'Regla 1 del RPG', desc: 'Si la vida llega a cero, el juego termina.' },
                    { num: '04', title: 'Aria vs Goblin', desc: 'Simulación de impacto en vivo con barra de HP reactiva.' }
                ],
                vo: 'Aunque nunca hayas programado, lo entiendes: es lógica pura.'
            },
            {
                id: 4,
                name: 'Rayos X 2.5D: Industria',
                start_ms: 42000,
                end_ms: 52000,
                type: 'code',
                badge: 'RAYOS X 2.5D · IMPORT ROTATIVO',
                title: 'Una sola sintaxis, *toda la industria*',
                sub: '4 sub-fases conectadas por cables de energía a una tarjeta maestra 2.5D.',
                codeSnippet: {
                    file: 'industry_engine.py ~ rayos_x_2_5d',
                    lines: [
                        'import openai, torch      # Fase 1: IA Activa',
                        'import fastapi            # Fase 2: Backend 2.8M req/s',
                        'import pandas as pd       # Fase 3: Big Data & Analytics',
                        'import playwright         # Fase 4: Automatización 24/7'
                    ]
                },
                vo: 'Con cambiar un import, la misma sintaxis impulsa IA, servidores masivos, datos y bots.'
            },
            {
                id: 5,
                name: 'Cierre y CTA',
                start_ms: 52000,
                end_ms: 66000,
                type: 'cta',
                badge: 'SERIE COMPLETA',
                title: 'Construyamos juntos *PyQuest*',
                sub: 'Episodio 1 Completado · Próximo: Variables y Tipos de Datos.',
                ctaData: {
                    keyword: 'PYTHON',
                    line: 'Guarda este video y sígueme para el Episodio 2.',
                    handle: '@santi.dev'
                },
                vo: 'Guarda este video y sígueme para el episodio dos.'
            }
        ]
    },
    // =====================================================================
    // REEL DESTACADO: PYQUEST EP. 2 · VARIABLES Y TIPOS DE DATOS: EL ADN DE TU HÉROE (53s @ 60 FPS)
    // =====================================================================
    {
        id: 'reel_pyquest_ep02',
        accountId: 'santidev',
        slug: 'pyquest_ep02_variables_y_tipos',
        theme: 'stack1',
        title: 'PyQuest Ep. 2: Variables y Tipos de Datos',
        subtitle: 'Choque físico de tipos, brazo mecánico en RAM y los 4 tipos en vivo sobre Aria',
        duration_ms: 53000,
        duration: 53.0,
        fps: 60,
        kicker: 'PYQUEST · EPISODIO 2 (INTERACTIVO)',
        brandIcon: 'fa-cube',
        accentColor: '#0284C7',
        secondaryColor: '#10B981',
        videoUrl: 'videos/pyquest_ep02_variables_y_tipos.mp4?v=2',
        soundUrl: 'bgm/tech_ambient_bed.mp3',
        post: {
            hook: 'El error que comete el 90% de los novatos al programar su primer juego 👇',
            caption: `Poner números entre comillas es el error #1 que congela los juegos de quienes están aprendiendo a programar.

En este Episodio 2 de PyQuest vemos qué hace la computadora por dentro paso a paso:

1️⃣ Choque físico de tipos: Por qué las letras "100" rebotan contra el número -20 y congelan a Aria.
2️⃣ El signo = como brazo mecánico: Cómo toma el dato de la derecha, lo mete en una ranura de RAM (0x7F01) y estampa la etiqueta en el frente.
3️⃣ Los 4 Tipos en vivo sobre Aria: str (placa de nombre), int (barra de salud 0→100), float (multiplicador de espada x1.75) y bool (interruptor maestro ON/OFF).
4️⃣ Cirugía de código: Arrancamos las comillas para que 100 - 20 fluya por el cable hasta dejar a Aria en 80 HP.

💾 Guarda este video para tu ruta de aprendizaje en Python.
👉 Sígueme para el Episodio 3: Condicionales y Lógica de Combate.`,
            hashtags: ['#python', '#programacion', '#pyquest', '#variables', '#aprenderaprogramar', '#desarrollodesoftware', '#gamedev'],
            bestTime: '18:00 - 21:00',
            sound: 'Tech Cyber Ambient'
        },
        beats: [
            {
                id: 1,
                name: 'Choque Físico: "100" vs -20',
                start_ms: 0,
                end_ms: 9000,
                type: 'hero',
                badge: 'ERROR CRÍTICO',
                title: 'Las comillas *congelan a tu héroe*',
                sub: 'El texto "100" choca físicamente contra el número -20 y lanza TypeError.',
                kicker: 'EPISODIO 2 · PYQUEST',
                vo: 'En vez de restar la barra de vida, las letras cien chocan contra el menos veinte y congelan a Aria.'
            },
            {
                id: 2,
                name: 'El Brazo Mecánico = en RAM',
                start_ms: 9000,
                end_ms: 20000,
                type: 'points',
                badge: 'MEMORIA RAM FÍSICA',
                title: 'El signo = *guarda en ranuras*',
                sub: 'Toma el bloque de la derecha, lo inserta en la RAM y estampa la etiqueta.',
                points: [
                    { num: '01', label: 'Ranura 0x7F01', title: 'nombre = "Aria"', desc: 'El imán = deposita "Aria" y estampa la etiqueta nombre.' },
                    { num: '02', label: 'Ranura 0x7F02', title: 'vida = 100', desc: 'Guarda el entero 100 listo para operaciones matemáticas.' }
                ],
                vo: 'El signo igual actúa como un brazo mecánico que mete el dato en una ranura de RAM.'
            },
            {
                id: 3,
                name: 'Los 4 Tipos en Vivo sobre Aria',
                start_ms: 20000,
                end_ms: 36000,
                type: 'code',
                badge: '1 VARIABLE CADA 4 SEGUNDOS',
                title: 'Construyendo a Aria *paso a paso*',
                sub: 'Cada variable transforma en vivo la tarjeta central del personaje.',
                codeSnippet: {
                    file: 'hero_live.py ~ 4_tipos',
                    lines: [
                        'heroe = "Aria"      # 1. str -> Placa de nombre',
                        'vida = 100          # 2. int -> Barra sube 0 a 100 HP',
                        'critico = 1.75      # 3. float -> Espada brilla x1.75',
                        'esta_viva = True    # 4. bool -> Interruptor OFF a ON'
                    ]
                },
                vo: 'Agregamos una variable cada cuatro segundos y vemos cómo transforma a Aria en vivo.'
            },
            {
                id: 4,
                name: 'Pinzas Borran las Comillas',
                start_ms: 36000,
                end_ms: 46000,
                type: 'compare',
                badge: 'CIRUGÍA DE CÓDIGO',
                title: 'De "100" a 100: *80 HP reales*',
                sub: 'Arrancamos las comillas y el cálculo 100 - 20 fluye por el cable hacia Aria.',
                compareData: {
                    bad: {
                        title: 'vida = "100" (Bloqueado)',
                        desc: 'Las comillas convierten el número en letras y congelan el combate.'
                    },
                    good: {
                        title: 'vida = 100 (Entero Limpio)',
                        desc: '100 - 20 fluye por el cable y baja la barra suavemente a 80 / 100 HP.'
                    }
                },
                vo: 'Quitamos las comillas y el cálculo cien menos veinte baja su barra a ochenta de vida.'
            },
            {
                id: 5,
                name: 'Cliffhanger (-20 HP) y CTA',
                start_ms: 46000,
                end_ms: 53000,
                type: 'cta',
                badge: 'PRÓXIMO CAPÍTULO',
                title: '¿Vida en *-20 HP*? Episodio 3',
                sub: 'Usaremos condicionales if / elif / else para impedir héroes zombis.',
                ctaData: {
                    keyword: 'PYQUEST',
                    line: 'Comenta PYQUEST para el código fuente y sígueme para el Episodio 3.',
                    handle: '@santi.dev'
                },
                vo: 'Comenta PYQUEST para el código y sígueme para el episodio tres.'
            }
        ]
    },
    // =====================================================================
    // REEL DESTACADO: PYQUEST EP. 3 · CONDICIONALES Y COMBATE: LAS REGLAS DE LA VIDA (54s @ 60 FPS)
    // =====================================================================
    {
        id: 'reel_pyquest_ep03',
        accountId: 'santidev',
        slug: 'pyquest_ep03_condicionales_y_combate',
        theme: 'stack1',
        title: 'PyQuest Ep. 3: Condicionales y Combate',
        subtitle: 'El bug del héroe zombi (-20 HP), indentación visual y escáner if/elif/else',
        duration_ms: 54000,
        duration: 54.0,
        fps: 60,
        kicker: 'PYQUEST · EPISODIO 3 (INTERACTIVO)',
        brandIcon: 'fa-shield-halved',
        accentColor: '#10B981',
        secondaryColor: '#4F46E5',
        videoUrl: 'videos/pyquest_ep03_condicionales_y_combate.mp4?v=2',
        soundUrl: 'bgm/tech_ambient_bed.mp3',
        tags: ['Python', 'Condicionales', 'PyQuest', 'RPG', 'GameDev', 'AprenderAProgramar'],
        sound: {
            title: 'Ambient Tech Bed · PyQuest S3',
            author: 'Santi.Dev Sound Lab',
            badge: 'AUDIO ORIGINAL'
        },
        beats: [
            {
                id: 1,
                name: 'El Bug del Héroe Zombi (-20 HP)',
                start_ms: 0,
                end_ms: 9000,
                type: 'hero',
                badge: 'BUG LÓGICO EN VIVO',
                title: '¿Por qué pelea con *-20 de vida*?',
                sub: 'Aria tiene 10 HP, recibe -30, la barra se rompe hacia la izquierda y sigue atacando como zombi.',
                kicker: 'EPISODIO 3 · PYQUEST',
                vo: 'Aria recibe treinta de daño, su barra se rompe hasta menos veinte, pero sigue atacando como un zombi.'
            },
            {
                id: 2,
                name: 'Visualizador de Indentación [·][·][·][·]',
                start_ms: 9000,
                end_ms: 21000,
                type: 'code',
                badge: 'LOS DOS PUNTOS Y 4 ESPACIOS',
                title: 'La jurisdicción *del bloque if*',
                sub: 'Los dos puntos : brillan y empujan print("GAME OVER") 4 bloques hacia la derecha.',
                codeSnippet: {
                    file: 'combate.py ~ indentacion_4_espacios',
                    lines: [
                        'if vida <= 0:                 # : abre jurisdicción',
                        '    print("GAME OVER")        # [·][·][·][·] 4 espacios',
                        '    fin_del_juego()           # Conectado al bloque if'
                    ]
                },
                vo: 'Los dos puntos empujan la línea cuatro espacios para meterla dentro de la jurisdicción del if.'
            },
            {
                id: 3,
                name: 'Escáner Línea por Línea (if / elif / else)',
                start_ms: 21000,
                end_ms: 39000,
                type: 'code',
                badge: '3 PRUEBAS EN VIVO (85, 25 Y 0 HP)',
                title: 'El embudo *de arriba hacia abajo*',
                sub: 'En cuanto una condición da True, Python ejecuta esa rama y tacha todas las demás.',
                codeSnippet: {
                    file: 'combate.py ~ escaner_embudo',
                    lines: [
                        '# Prueba 1 (85 HP) -> cae hasta else ("Listo para luchar")',
                        '# Prueba 2 (25 HP) -> entra en elif < 30 y TACHA el else',
                        '# Prueba 3 (0 HP)  -> entra en if <= 0 y detiene todo'
                    ]
                },
                vo: 'El escáner evalúa de arriba hacia abajo: en cuanto una condición se cumple, tacha e ignora las demás.'
            },
            {
                id: 4,
                name: 'Combate Final Coherente vs Boss Goblin',
                start_ms: 39000,
                end_ms: 47000,
                type: 'compare',
                badge: 'TURNO FINAL SINCRONIZADO',
                title: 'Golpe crítico y *victoria real*',
                sub: 'Aria baja a 70 HP, contraataca por -35 DMG, el Goblin cae a 0 HP y recién se activa VICTORIA.',
                compareData: {
                    bad: {
                        title: 'Mientras hp_goblin > 0 (35 HP)',
                        desc: 'if hp_goblin <= 0 da False: el combate continúa sin mostrar victoria prematura.'
                    },
                    good: {
                        title: 'Cuando hp_goblin llega a 0 HP',
                        desc: 'if hp_goblin <= 0 cambia a True en tiempo real y desbloquea el cofre de victoria.'
                    }
                },
                vo: 'Cuando el golpe crítico deja al Goblin en cero de vida, el condicional activa la victoria y suelta el cofre.'
            },
            {
                id: 5,
                name: 'Cliffhanger de Botín y CTA',
                start_ms: 47000,
                end_ms: 54000,
                type: 'cta',
                badge: 'PRÓXIMO CAPÍTULO',
                title: '¿50 ítems = *50 variables*?',
                sub: 'Episodio 4: Programaremos la mochila de Aria con Listas y Diccionarios.',
                ctaData: {
                    keyword: 'INVENTARIO',
                    line: 'Guarda este video y sígueme para el Episodio 4: Inventario RPG.',
                    handle: '@santi.dev'
                },
                vo: 'Guarda este video y sígueme para programar el inventario en el episodio cuatro.'
            }
        ]
    },
    // =====================================================================
    // REEL DESTACADO: PYQUEST EP. 4 · LISTAS Y DICCIONARIOS: EL INVENTARIO DEL HÉROE (74s @ 60 FPS)
    // =====================================================================
    {
        id: 'reel_pyquest_ep04',
        accountId: 'santidev',
        slug: 'pyquest_ep04_listas_y_diccionarios',
        theme: 'stack1',
        title: 'PyQuest Ep. 4: Listas y Diccionarios',
        subtitle: 'El inventario del héroe y cómo evitar 100 variables sueltas',
        duration_ms: 74000,
        duration: 74.0,
        fps: 60,
        kicker: 'PYQUEST · EPISODIO 4',
        brandIcon: 'fa-boxes-stacked',
        accentColor: '#8B5CF6',
        secondaryColor: '#10B981',
        videoUrl: 'videos/pyquest_ep04_listas_y_diccionarios.mp4',
        soundUrl: 'bgm/tech_ambient_bed.mp3',
        tags: ['Python', 'Listas', 'Diccionarios', 'PyQuest', 'EstructurasDeDatos', 'GameDev'],
        sound: {
            title: 'Ambient Tech Bed · PyQuest S4',
            author: 'Santi.Dev Sound Lab',
            badge: 'AUDIO ORIGINAL'
        },
        beats: [
            {
                id: 1,
                name: 'El Caos de Variables Sueltas',
                start_ms: 0,
                end_ms: 8000,
                type: 'hero',
                badge: 'ERROR DE ARQUITECTURA',
                title: '¿10 variables para *10 objetos*?',
                sub: 'Crear item1, item2, item3 hace tu juego totalmente inmantenible.',
                kicker: 'EPISODIO 4 · PYQUEST',
                vo: 'Crear una variable para cada objeto es la forma más rápida de arruinar tu proyecto.'
            },
            {
                id: 2,
                name: 'La Lista y los Corchetes',
                start_ms: 8000,
                end_ms: 26000,
                type: 'code',
                badge: 'ESTRUCTURA LIST',
                title: 'Una sola variable, *todo agrupado*',
                sub: 'inventario = ["Poción", "Espada", "Escudo"]. Indexación en base cero [0].',
                codeSnippet: {
                    file: 'inventario.py ~ lista_ordenada',
                    lines: [
                        '# Colección ordenada entre corchetes []',
                        'inventario = ["Poción", "Espada", "Escudo"]',
                        'print(inventario[0])  # Imprime: Poción (base cero)',
                        'print(len(inventario))  # Cantidad: 3 objetos'
                    ]
                },
                vo: 'Una lista agrupa múltiples elementos en una sola variable ordenada entre corchetes.'
            },
            {
                id: 3,
                name: 'Método .append() Dinámico',
                start_ms: 26000,
                end_ms: 46000,
                type: 'code',
                badge: 'MÉTODO .APPEND()',
                title: 'Nuevos tesoros *al final*',
                sub: 'inventario.append("Amuleto"). Crece dinámicamente cuando encuentras botín.',
                codeSnippet: {
                    file: 'inventario.py ~ nuevo_loot',
                    lines: [
                        '# Aria abre un cofre en la mazmorra',
                        'inventario.append("Amuleto Mágico")',
                        '# Ahora inventario tiene 4 elementos listos',
                        'print(inventario[-1])  # Imprime: Amuleto Mágico'
                    ]
                },
                vo: 'Con el método append agregas nuevos tesoros al final de la lista al instante.'
            },
            {
                id: 4,
                name: 'Diccionarios Clave-Valor',
                start_ms: 46000,
                end_ms: 64000,
                type: 'compare',
                badge: 'DICCIONARIOS {}',
                title: 'Datos con *nombre real*',
                sub: 'heroe = {"nombre": "Aria", "vida": 80}. Acceso directo por etiqueta.',
                compareData: {
                    bad: {
                        title: 'Por Número de Índice',
                        desc: 'inventario[3] no te dice qué representa el dato y te obliga a memorizar posiciones.'
                    },
                    good: {
                        title: 'Por Clave en Diccionario',
                        desc: 'heroe["vida"] es legible, seguro y claro para cualquier programador de tu equipo.'
                    }
                },
                vo: 'Con diccionarios accedes a los datos por su nombre en vez de su número de orden.'
            },
            {
                id: 5,
                name: 'Cliffhanger Bucles y CTA',
                start_ms: 64000,
                end_ms: 74000,
                type: 'cta',
                badge: 'PRÓXIMO CAPÍTULO',
                title: '¿Y si tienes 100 objetos? *Episodio 5*',
                sub: 'Aprenderemos a recorrer listas completas con Bucles For y While.',
                ctaData: {
                    keyword: 'BUCLES',
                    line: 'Comenta BUCLES y sígueme para aprender Bucles en el Episodio 5.',
                    handle: '@santi.dev'
                },
                vo: '¿Y si tienes cien objetos? No vas a escribir cien líneas. Sígueme para el episodio 5: Bucles.'
            }
        ]
    },
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
        duration_ms: 24000,
        duration: 24.0,
        fps: 60,
        kicker: 'SANTI.DEV · TRILOGÍA CREADORES',
        brandIcon: 'fa-gamepad',
        accentColor: '#2E9D63',
        secondaryColor: '#57c78d',
        videoUrl: 'videos/stack_secreto.mp4?v=3',
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
            sound: 'Cyberpunk Synthwave 120BPM'
        },
        beats: [
            {
                id: 1,
                name: 'Hook Inicial',
                start_ms: 0,
                end_ms: 4000,
                type: 'hero',
                badge: 'TRILOGÍA · PARTE 1 DE 3',
                title: '¿Juegos y webs *sin programar*?',
                sub: 'Te enseño el stack técnico que uso para pasar de la idea al código en minutos.',
                kicker: 'DE LA IDEA AL CÓDIGO',
                vo: '¿Juegos y webs sin saber programar? Te enseño mi stack secreto.'
            },
            {
                id: 2,
                name: 'Inspiración',
                start_ms: 4000,
                end_ms: 8000,
                type: 'points',
                badge: 'FASE 1 · INSPIRACIÓN',
                title: 'Roba como un *artista*',
                sub: 'Analiza mecánicas probadas y extrae tokens visuales directamente en Figma.',
                points: [
                    { icon: 'fa-gamepad', label: 'Desglosa mecánicas top', desc: 'Identifica el bucle central de interacción que hace divertido el producto.' },
                    { icon: 'fa-figma', label: 'Prototipo en Figma', desc: 'Define tokens de diseño, paleta y tipografía antes de tocar código.' },
                    { icon: 'fa-wand-magic-sparkles', label: 'Tu toque único', desc: 'Combina dos conceptos distintos para lograr una propuesta fresca.' }
                ],
                vo: 'Paso 1: Roba como un artista. Analiza juegos y webs que amas y diseña las bases en Figma.'
            },
            {
                id: 3,
                name: 'Lógica & Código',
                start_ms: 8000,
                end_ms: 14000,
                type: 'code',
                badge: 'FASE 2 · LÓGICA & MOTOR',
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
                vo: 'Paso 2: Antigravity construye el ochenta y cinco por ciento del código y Opencode pule los detalles.'
            },
            {
                id: 4,
                name: 'Arte & Sprites',
                start_ms: 14000,
                end_ms: 19000,
                type: 'points',
                badge: 'FASE 3 · ARTE & ASSETS',
                title: 'Nano Banana + *Remove BG*',
                sub: 'Genera sprites y texturas con IA y déjalos transparentes en 1 clic.',
                points: [
                    { icon: 'fa-image', label: 'Nano Banana (Sprites IA)', desc: 'Genera personajes, fondos y tilesets retro en alta definición.' },
                    { icon: 'fa-scissors', label: 'Remove BG en 1 Clic', desc: 'Fondo transparente instantáneo listo para Canvas o CSS.' },
                    { icon: 'fa-bolt', label: 'Listo para Producción', desc: 'Cero photoshop manual: importación directa a tu código.' }
                ],
                vo: 'Paso 3: Nano Banana genera sprites y arte con IA, y Remove BG los limpia en un clic.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 19000,
                end_ms: 24000,
                type: 'cta',
                badge: 'PARTE 2 DISPONIBLE',
                title: 'Guarda *este video*',
                sub: 'En la parte 2: Cómo automatizo bases de datos en la nube y subo todo a GitHub con MCP.',
                ctaData: {
                    keyword: 'STACK',
                    line: 'Comenta "STACK" y te paso la plantilla completa y el prompt maestro.',
                    handle: '@santi.dev'
                },
                vo: 'Guarda este video y comenta STACK para enviarte la plantilla completa.'
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
        duration_ms: 24000,
        duration: 24.0,
        fps: 60,
        kicker: 'SANTI.DEV · MCP AUTOMATION',
        brandIcon: 'fa-gear',
        accentColor: '#F08A35',
        secondaryColor: '#f39e56',
        videoUrl: 'videos/automatizacion_y_mcp.mp4?v=3',
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
            sound: 'Cyberpunk Synthwave 120BPM'
        },
        beats: [
            {
                id: 1,
                name: 'Hook Inicial',
                start_ms: 0,
                end_ms: 4000,
                type: 'hero',
                badge: 'TRILOGÍA · PARTE 2 DE 3',
                title: 'Automatiza tu código *con MCP*',
                sub: 'Olvida tareas repetitivas. Conecta herramientas externas directo a tu agente de IA.',
                kicker: 'WORKFLOW MODERNO 2026',
                vo: 'Deja de programar tareas repetitivas a mano. Te enseño a automatizar con MCP.'
            },
            {
                id: 2,
                name: 'Stitch MCP',
                start_ms: 4000,
                end_ms: 9000,
                type: 'points',
                badge: 'HERRAMIENTA 1 · DISEÑO A CÓDIGO',
                title: 'Stitch MCP: *Figma directo*',
                sub: 'Conecta tu editor de código con Figma y APIs sin salir de la ventana.',
                points: [
                    { icon: 'fa-palette', label: 'Lectura de Pantallas', desc: 'Extrae tokens de color, márgenes y jerarquía de diseño.' },
                    { icon: 'fa-code', label: 'Componentes Limpios', desc: 'Convierte prototipos visuales en código modular sin desalinear.' },
                    { icon: 'fa-layer-group', label: '0 Copiar y Pegar', desc: 'Sincronización bidireccional entre la IA y tu interfaz.' }
                ],
                vo: 'Stitch MCP conecta Figma con tu editor y convierte componentes en código limpio.'
            },
            {
                id: 3,
                name: 'Supabase MCP',
                start_ms: 9000,
                end_ms: 14000,
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
                vo: 'Supabase MCP crea tus tablas de base de datos y autenticación con solo pedírselo.'
            },
            {
                id: 4,
                name: 'Git MCP',
                start_ms: 14000,
                end_ms: 19000,
                type: 'points',
                badge: 'HERRAMIENTA 3 · CONTROL DE VERSIONES',
                title: 'Git MCP: *Cero conflictos*',
                sub: 'Sincronización automática con GitHub para respaldar tus avances sin miedo.',
                points: [
                    { icon: 'fa-code-branch', label: 'Checkpoints Inteligentes', desc: 'Guarda ramas de prueba antes de cada cambio complejo.' },
                    { icon: 'fa-cloud-arrow-up', label: 'Push Automático', desc: 'Despliegues en Vercel disparados con cada checkpoint.' },
                    { icon: 'fa-shield-halved', label: 'Seguridad Total', desc: 'Revierte cualquier error en un solo clic sin perder avances.' }
                ],
                vo: 'Y Git MCP sincroniza tus ramas con GitHub y despliega en Vercel automáticamente.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 19000,
                end_ms: 24000,
                type: 'cta',
                badge: 'PARTE 3 DISPONIBLE',
                title: 'Automatiza *tu stack*',
                sub: 'Te comparto la configuración exacta de mis servidores MCP listos para usar.',
                ctaData: {
                    keyword: 'MCP',
                    line: 'Comenta "MCP" y te mando mi archivo de configuración completo.',
                    handle: '@santi.dev'
                },
                vo: 'Comenta MCP para enviarte mi archivo de configuración listo para conectar.'
            }
        ]
    },

    // =====================================================================
    // REEL 3: SANTI.DEV · PARTE 3: EL ARTE DEL PROMPT (CONTRATOS Y ARQUITECTURA)
    // =====================================================================
    {
        id: 'reel_stack3',
        accountId: 'santidev',
        slug: 'el_arte_del_prompt',
        theme: 'stack3',
        title: 'Parte 3: El Arte del Prompt',
        subtitle: 'De ideas vagas a contratos de código modulares sin alucinaciones',
        duration_ms: 25000,
        duration: 25.0,
        fps: 60,
        kicker: 'SANTI.DEV · INGENIERÍA DE PROMPTS',
        brandIcon: 'fa-wand-magic-sparkles',
        accentColor: '#38BDF8',
        secondaryColor: '#818CF8',
        videoUrl: 'videos/el_arte_del_prompt.mp4?v=2',
        post: {
            hook: '¿La IA te genera código roto? Deja de pedir "hazme una app" y usa contratos 👇',
            caption: `El 90% de los desarrolladores fracasa usando IA porque pide todo de golpe en un solo prompt vago.
En la parte final de la trilogía "De la Idea al Código", te muestro la técnica de Ingeniería de Prompts que usan los seniors:

❌ El error: "Hazme un clon de Uber con login y pagos" (alucinaciones garantizadas).
🧠 Google AI Studio: Ventanas de contexto gigantes y Context Caching para que el modelo nunca olvide tus reglas.
📐 Contratos Modulares: Exige primero interfaces TypeScript y especificaciones antes de que escriba una sola línea de lógica.

💾 Guarda esta trilogía completa para tu próximo proyecto.
👉 Comenta "PROMPT" para mandarte mis plantillas de contratos modulares.`,
            hashtags: ['#promptengineering', '#ai', '#antigravity', '#googleaistudio', '#typescript', '#desarrolloweb', '#programacion'],
            bestTime: '18:00 - 21:00',
            sound: 'Cyberpunk Synthwave 120BPM'
        },
        beats: [
            {
                id: 1,
                name: 'Hook Inicial',
                start_ms: 0,
                end_ms: 4000,
                type: 'hero',
                badge: 'TRILOGÍA · PARTE 3 DE 3',
                title: '¿La IA te da *código roto*?',
                sub: 'El secreto no es el modelo, es cómo estructuras tus prompts y contratos.',
                kicker: 'INGENIERÍA DE PROMPTS',
                vo: '¿La IA te entrega código lleno de bugs? El problema no es el modelo, es tu prompt.'
            },
            {
                id: 2,
                name: 'El Antipatrón',
                start_ms: 4000,
                end_ms: 9000,
                type: 'points',
                badge: 'EL ERROR TÍPICO · ANTIPATRÓN',
                title: 'El prompt *monolítico*',
                sub: 'Pedir "hazme una app completa" satura la ventana de contexto y crea alucinaciones.',
                points: [
                    { icon: 'fa-triangle-exclamation', label: 'Sobrecarga de Contexto', desc: 'Pedir frontend, backend y base de datos en un solo mensaje rompe la atención.' },
                    { icon: 'fa-bug', label: 'Alucinaciones Graves', desc: 'La IA inventa librerías que no existen para intentar cumplirlo todo.' },
                    { icon: 'fa-shuffle', label: 'Código Espagueti', desc: 'Sin contratos previos, cada archivo asume tipos incompatibles.' }
                ],
                vo: 'Pedir una app completa en un solo mensaje satura la IA y genera alucinaciones.'
            },
            {
                id: 3,
                name: 'Google AI Studio',
                start_ms: 9000,
                end_ms: 14500,
                type: 'code',
                badge: 'ESTRATEGIA 1 · PROMPT SYSTEM',
                title: 'Google AI Studio + *Context Cache*',
                sub: 'Fija el contexto de arquitectura una sola vez con tokens cacheados.',
                codeSnippet: {
                    file: 'system-prompt.md ~ architecture-spec',
                    lines: [
                        '# SYSTEM DIRECTIVE · ARCHITECTURE LOCK',
                        'context: cache_active (1.2M tokens cargados)',
                        'rule: "Nunca escribas implementación sin contrato previo."',
                        'rule: "Tipos TypeScript estrictos antes de cualquier componente."',
                        '✓ Context Caching activo · 85% ahorro de latencia'
                    ]
                },
                vo: 'En Google AI Studio bloqueamos las reglas del sistema y cacheamos el contexto.'
            },
            {
                id: 4,
                name: 'Arquitectura por Contratos',
                start_ms: 14500,
                end_ms: 20000,
                type: 'points',
                badge: 'ESTRATEGIA 2 · CONTRATOS MODULARES',
                title: 'Contratos *modulares*',
                sub: 'Divide tu app en piezas independientes con tipos TypeScript inmutables.',
                points: [
                    { icon: 'fa-file-code', label: 'Contratos de Tipos', desc: 'Exige interfaces estrictas antes de escribir cualquier función.' },
                    { icon: 'fa-puzzle-piece', label: 'Módulos Aislados', desc: 'Cada prompt resuelve un solo componente respetando el contrato.' },
                    { icon: 'fa-circle-check', label: 'Zero Bugs de Integración', desc: 'Todas las piezas encajan a la primera sin errores de tipado.' }
                ],
                vo: 'Exige contratos modulares con interfaces TypeScript antes de generar el código.'
            },
            {
                id: 5,
                name: 'CTA Comunidad',
                start_ms: 20000,
                end_ms: 25000,
                type: 'cta',
                badge: 'TRILOGÍA COMPLETA',
                title: 'Domina el *Prompting*',
                sub: 'Te comparto el repositorio con las plantillas de contratos modulares.',
                ctaData: {
                    keyword: 'PROMPT',
                    line: 'Comenta "PROMPT" y te paso la plantilla maestra de prompts y contratos.',
                    handle: '@santi.dev'
                },
                vo: 'Comenta PROMPT y te envío la plantilla maestra para crear tus propias apps.'
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
        subtitle: 'Gemini Spark, acciones programadas y Workspace Studio',
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

1️⃣ Gemini Spark (El CÓMO): Almacena instrucciones y marcos metodológicos permanentes. Sube reuniones y genera diagnósticos y protocolos sin reprompting.
2️⃣ Acciones Programadas (El CUÁNDO): Monitoreo periódico por horario. Gemini investiga competidores y lanzamientos y te envía el informe al móvil automáticamente.
3️⃣ Workspace Studio (El ECOSISTEMA): Disparadores y acciones sucesivas conectadas (Meet → tareas en Chat → Drive → Sheets).

🏗️ La Trilogía del Sistema:
• Spark = El Cómo
• Programadas = El Cuándo
• Studio = El Ecosistema

👉 Comenta "SISTEMAS" y te comparto la arquitectura lista para clonar.`,
            hashtags: ['#gemini', '#iaavanzada', '#automatizacion', '#geminispark', '#aiagents', '#workspacestudio'],
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
                name: 'Gemini Spark',
                start_ms: 3800,
                end_ms: 8400,
                type: 'points',
                badge: 'GEMINI SPARK',
                title: '*Gemini Spark:* Reglas Permanentes',
                sub: 'Estandariza el método para siempre sin reescribir prompts.',
                points: [
                    { num: '01', title: 'El CÓMO', desc: 'Instrucciones permanentes y marco metodológico reutilizable.' },
                    { num: '02', title: 'Diagnóstico Automático', desc: 'Sube reuniones y genera diagnósticos, fases y protocolos de seguridad.' }
                ],
                vo: 'Usa Gemini Spark con tus reglas fijas de trabajo.'
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
                sub: 'Spark (El Cómo) · Programadas (El Cuándo) · Studio (El Ecosistema).',
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
    const officialReels = (window.REELS || []).map(window.normalizeReel);
    try {
        const custom = localStorage.getItem('algo_custom_reels');
        if (custom) {
            const parsed = JSON.parse(custom);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // Solo agregar custom reels cuyos IDs no coincidan con reels oficiales para no tapar los nuevos
                const officialIds = new Set(officialReels.map(r => r.id));
                const customOnly = parsed.filter(r => !officialIds.has(r.id)).map(window.normalizeReel);
                return [...officialReels, ...customOnly];
            }
        }
    } catch (e) {
        console.warn('Error leyendo algo_custom_reels:', e);
    }
    return officialReels;
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
