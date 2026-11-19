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
        subtitle: 'Qué es una variable, los 4 tipos de datos y por qué las comillas rompen tus cálculos',
        duration_ms: 53000,
        duration: 53.0,
        fps: 60,
        kicker: 'PYQUEST · EPISODIO 2 (PEDAGOGÍA VISUAL)',
        brandIcon: 'fa-cube',
        accentColor: '#0284C7',
        secondaryColor: '#10B981',
        videoUrl: 'videos/pyquest_ep02_variables_y_tipos.mp4?v=2',
        soundUrl: 'bgm/tech_ambient_bed.mp3',
        post: {
            hook: '¿Por qué poner comillas a un número rompe tu juego por completo? 💥👇',
            caption: `Para ti, 100 entre comillas y 100 sin comillas parecen lo mismo. Pero para Python son dos cosas completamente distintas.

En este Episodio 2 de PyQuest (nuestra serie donde programamos un juego RPG desde cero) aprendes cómo guarda y entiende los datos tu computadora:

1️⃣ Texto vs. Número (str y int): Por qué "100" entre comillas es una palabra y arroja TypeError si intentas restarle 20.
2️⃣ Asignación en RAM: El signo = no compara valores; toma el dato de la derecha y lo guarda bajo una etiqueta en la memoria.
3️⃣ Los 4 Tipos Básicos en vivo sobre Aria:
   • str: Texto entre comillas ("Aria")
   • int: Números enteros para vida y niveles (100)
   • float: Decimales para multiplicadores de daño (1.75)
   • bool: Interruptor lógico de verdadero o falso (True / False)
4️⃣ La solución: Quitamos las comillas para que Python reconozca el número y calcule 100 - 20 = 80 HP.

💾 Guarda este video para repasar los fundamentos de Python.
👉 Sígueme para el Episodio 3: Condicionales y Lógica de Combate.`,
            hashtags: ['#python', '#programacion', '#pyquest', '#variables', '#tiposdedatos', '#aprenderaprogramar', '#desarrollodesoftware', '#gamedev'],
            bestTime: '18:00 - 21:00',
            sound: 'Tech Cyber Ambient'
        },
        beats: [
            {
                id: 1,
                name: 'Choque Físico: "100" vs -20 (TypeError)',
                start_ms: 0,
                end_ms: 9000,
                type: 'hero',
                badge: 'ERROR DE TIPO (TypeError)',
                title: 'Las comillas *congelan tu juego*',
                sub: 'Para Python, "100" entre comillas es texto. No puedes restarle 20 a una palabra.',
                kicker: 'EPISODIO 2 · PYQUEST',
                vo: 'Para ti, cien entre comillas y cien sin comillas parecen lo mismo. Pero en Python, las comillas convierten un número en texto. Y como no puedes restarle veinte a una palabra, el juego se congela con un error de tipo.'
            },
            {
                id: 2,
                name: 'Asignación en Memoria RAM',
                start_ms: 9000,
                end_ms: 20000,
                type: 'points',
                badge: 'ASIGNACIÓN EN MEMORIA RAM',
                title: 'Una variable *apunta a un valor*',
                sub: 'El signo = asigna: toma el dato de la derecha y lo guarda bajo la etiqueta de la izquierda.',
                points: [
                    { num: '01', label: 'Identificador', title: 'nombre = "Aria"', desc: 'Es la etiqueta en tu código que apunta al espacio en memoria donde está el dato.' },
                    { num: '02', label: 'Valor en RAM', title: 'vida = 100', desc: 'Espacio en la memoria RAM (0x7F02) que guarda el número 100 listo para calcular.' }
                ],
                vo: 'Para que nuestro juego recuerde datos, usamos variables. Una variable es una etiqueta en la memoria RAM que guarda un valor. El signo igual no compara: asigna. Toma el dato de la derecha y lo guarda bajo el nombre de la izquierda.'
            },
            {
                id: 3,
                name: 'Los 4 Tipos Básicos en Vivo',
                start_ms: 20000,
                end_ms: 36000,
                type: 'code',
                badge: 'LOS 4 TIPOS DE DATOS BÁSICOS',
                title: 'El ADN de tu héroe: *4 tipos de datos*',
                sub: 'Cada tipo de dato le indica a Python qué puede hacer con esa información sobre Aria.',
                codeSnippet: {
                    file: 'adn_heroe.py ~ tipos_basicos',
                    lines: [
                        'heroe = "Aria"      # 1. str: Texto entre comillas',
                        'vida = 100          # 2. int: Número entero sin decimales',
                        'critico = 1.75      # 3. float: Decimal con punto',
                        'esta_viva = True    # 4. bool: Interruptor (True o False)'
                    ]
                },
                vo: 'Python usa cuatro tipos básicos para darle vida a tu héroe: String entre comillas para textos y nombres; Integer para números enteros como cien de vida; Float con punto decimal para multiplicadores de daño; y Booleano, un interruptor lógico que solo puede ser True o False.'
            },
            {
                id: 4,
                name: 'Resolviendo el Bug sin Comillas',
                start_ms: 36000,
                end_ms: 46000,
                type: 'compare',
                badge: 'SOLUCIÓN EN VIVO',
                title: 'De texto a entero: *operación válida*',
                sub: 'Al quitar las comillas, Python reconoce que 100 es un número entero y ejecuta 100 - 20 = 80 HP.',
                compareData: {
                    bad: {
                        title: 'vida = "100" (Texto)',
                        desc: 'No se puede hacer una resta matemática entre una palabra y un número.'
                    },
                    good: {
                        title: 'vida = 100 (Entero)',
                        desc: 'Ahora sí es un número entero: la resta funciona y la barra de Aria baja a 80 HP.'
                    }
                },
                vo: 'Al quitar las comillas, Python detecta automáticamente que es un número entero. Ahora la resta cien menos veinte sí es válida, y la vida de Aria baja correctamente a ochenta puntos.'
            },
            {
                id: 5,
                name: 'Cliffhanger: ¿Por qué -20 HP? y CTA',
                start_ms: 46000,
                end_ms: 53000,
                type: 'cta',
                badge: 'EL LÍMITE DE LOS NÚMEROS',
                title: '¿Vida en *-20 HP*? Falta lógica',
                sub: 'Los números no tienen sentido común. Necesitamos condicionales para tomar decisiones.',
                ctaData: {
                    keyword: 'CONDICIONALES',
                    line: 'Comenta CONDICIONALES para la guía y sígueme para el Episodio 3.',
                    handle: '@santi.dev'
                },
                vo: 'Pero si recibe cien de daño, su vida baja a menos veinte y sigue de pie. ¿Cómo enseñamos al código a tomar decisiones? Sígueme para el Episodio tres.'
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
        subtitle: 'Cómo hacer que tu código tome decisiones con if, elif, else y la regla de los 4 espacios',
        duration_ms: 54000,
        duration: 54.0,
        fps: 60,
        kicker: 'PYQUEST · EPISODIO 3 (PEDAGOGÍA VISUAL)',
        brandIcon: 'fa-shield-halved',
        accentColor: '#10B981',
        secondaryColor: '#4F46E5',
        videoUrl: 'videos/pyquest_ep03_condicionales_y_combate.mp4?v=2',
        soundUrl: 'bgm/tech_ambient_bed.mp3',
        post: {
            hook: '¿Por qué tu personaje sigue peleando con -20 de vida? 🧟‍♂️⚔️👇',
            caption: `Sin condicionales, tu programa ejecuta las líneas de arriba hacia abajo sin comprobar si tu héroe sigue vivo o ya perdió.

En este Episodio 3 de PyQuest (nuestra serie donde programamos un juego RPG desde cero) enseñamos al código a tomar decisiones reales:

1️⃣ El código sin reglas: Por qué Aria seguía atacando como un zombi al llegar a -20 HP.
2️⃣ La regla de oro de Python: Los dos puntos (:) abren el bloque de decisión y los 4 espacios de sangría indican qué instrucciones pertenecen a ese bloque.
3️⃣ El embudo if / elif / else:
   • if vida <= 0: Comprueba primero si la partida terminó.
   • elif vida < 30: Activa la alerta crítica si sigue con vida pero en peligro.
   • else: Ejecuta el turno normal si nada de lo anterior se cumplió.
4️⃣ Combate en tiempo real: Cómo hp_goblin <= 0 cambia de False a True en el golpe final para detener al enemigo y soltar el cofre.

💾 Guarda este video para dominar la lógica condicional en Python.
👉 Sígueme para el Episodio 4: Listas y Diccionarios (El Inventario RPG).`,
            hashtags: ['#python', '#condicionales', '#pyquest', '#programacion', '#logica', '#aprenderaprogramar', '#gamedev', '#rpg'],
            bestTime: '18:00 - 21:00',
            sound: 'Ambient Tech Bed · PyQuest S3'
        },
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
                badge: 'EL CÓDIGO SIN DECISIONES',
                title: '¿Por qué pelea con *-20 de vida*?',
                sub: 'Sin condicionales, el programa ejecuta líneas de arriba hacia abajo sin comprobar si Aria perdió.',
                kicker: 'EPISODIO 3 · PYQUEST',
                vo: 'Aria recibió treinta de daño y su vida cayó a menos veinte, pero sigue atacando como un zombi. ¿Por qué? Porque sin condicionales, tu código ejecuta las líneas de arriba hacia abajo sin evaluar ninguna regla.'
            },
            {
                id: 2,
                name: 'Sintaxis en Python: Dos Puntos y 4 Espacios',
                start_ms: 9000,
                end_ms: 21000,
                type: 'code',
                badge: 'LA REGLA DE ORO EN PYTHON',
                title: 'Los dos puntos y los *4 espacios*',
                sub: 'if evalúa si algo es verdadero. Los dos puntos : abren el bloque y 4 espacios indican qué va adentro.',
                codeSnippet: {
                    file: 'combate.py ~ bloques_if',
                    lines: [
                        'if vida <= 0:                 # Condición + dos puntos :',
                        '    print("GAME OVER")        # [·][·][·][·] 4 espacios',
                        '    heroe_activo = False      # Solo corre si es True'
                    ]
                },
                vo: 'Para que el programa tome decisiones usamos if seguido de una condición. La regla clave en Python es esta: los dos puntos abren el bloque y los cuatro espacios de sangría indican qué instrucciones pertenecen a esa decisión.'
            },
            {
                id: 3,
                name: 'El Embudo Lógico (if / elif / else)',
                start_ms: 21000,
                end_ms: 39000,
                type: 'code',
                badge: 'EL EMBUDO IF · ELIF · ELSE',
                title: 'Decisiones en orden: *if, elif, else*',
                sub: 'Python evalúa las condiciones en orden de arriba a abajo y se detiene en la primera que sea verdadera.',
                codeSnippet: {
                    file: 'combate.py ~ embudo_decision',
                    lines: [
                        'if vida <= 0:         # 1. ¿Se quedó sin vida?',
                        '    fin_del_juego()   # Termina la partida',
                        'elif vida < 30:       # 2. Si no, ¿está en peligro?',
                        '    alerta_roja()     # Activa alerta crítica',
                        'else:                 # 3. Si nada anterior se cumplió',
                        '    atacar_normal()   # Sigue peleando con normalidad'
                    ]
                },
                vo: 'Con if, elif y else creamos un embudo de decisiones. Primero, if comprueba si la vida llegó a cero. Si no, elif revisa si está en peligro por debajo de treinta. Y si nada se cumple, else ejecuta el turno normal. Python solo ejecuta la primera opción verdadera.'
            },
            {
                id: 4,
                name: 'Combate en Tiempo Real',
                start_ms: 39000,
                end_ms: 47000,
                type: 'compare',
                badge: 'COMBATE EN TIEMPO REAL',
                title: 'Golpe final y *condición cumplida*',
                sub: 'Mientras hp_goblin sea mayor a 0 la condición es falsa; al llegar a 0 cambia a True y ganas.',
                compareData: {
                    bad: {
                        title: 'hp_goblin > 0 (False)',
                        desc: 'if hp_goblin <= 0 es falso: el combate continúa sin activar la victoria antes de tiempo.'
                    },
                    good: {
                        title: 'hp_goblin <= 0 (True)',
                        desc: 'El golpe final hace verdadera la condición: detiene al Goblin y abre el cofre.'
                    }
                },
                vo: 'Ahora el combate tiene reglas reales: mientras la vida del Goblin sea mayor a cero, la condición de victoria es falsa. Pero con el golpe final cambia a True, detiene al enemigo y suelta el cofre.'
            },
            {
                id: 5,
                name: 'El Reto de los 50 Ítems y CTA',
                start_ms: 47000,
                end_ms: 54000,
                type: 'cta',
                badge: 'EL RETO DEL INVENTARIO',
                title: '¿50 tesoros = *50 variables*?',
                sub: 'Al ganar la batalla el cofre suelta 50 objetos. Crear variables sueltas arruinaría el código.',
                ctaData: {
                    keyword: 'INVENTARIO',
                    line: 'Comenta INVENTARIO para el código fuente y sígueme para el Episodio 4.',
                    handle: '@santi.dev'
                },
                vo: 'El cofre suelta cincuenta tesoros. ¿Vas a crear cincuenta variables sueltas en tu código? Guarda este video y sígueme para el Episodio cuatro: Listas y Diccionarios.'
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
        subtitle: 'Cómo organizar el inventario y las estadísticas de tu personaje sin crear 100 variables',
        duration_ms: 74000,
        duration: 74.0,
        fps: 60,
        kicker: 'PYQUEST · EPISODIO 4 (PEDAGOGÍA VISUAL)',
        brandIcon: 'fa-boxes-stacked',
        accentColor: '#8B5CF6',
        secondaryColor: '#10B981',
        videoUrl: 'videos/pyquest_ep04_listas_y_diccionarios.mp4',
        soundUrl: 'bgm/tech_ambient_bed.mp3',
        post: {
            hook: 'El error que comete el 90% de los principiantes al programar su inventario 🎒👇',
            caption: `Crear item1, item2 e item3 hace tu código imposible de mantener o recorrer. Para agrupar datos relacionados existen las colecciones.

En este Episodio 4 de PyQuest (nuestra serie donde programamos un juego RPG desde cero) organizamos el inventario y las estadísticas de Aria:

1️⃣ Listas []: Agrupan múltiples objetos en una sola variable ordenada entre corchetes.
2️⃣ Por qué contamos desde cero: El índice [0] representa el inicio de la lista sin ningún salto.
3️⃣ Listas dinámicas: Agrega nuevos tesoros al final con .append() y consulta el último objeto guardado con el índice [-1].
4️⃣ Diccionarios {}: Usan llaves y pares de clave y valor para acceder a los atributos de Aria por su nombre real (heroe["vida"]) en vez de memorizar posiciones.

💾 Guarda este video para organizar tus datos como un profesional.
👉 Sígueme para el Episodio 5: Bucles For y While.`,
            hashtags: ['#python', '#listas', '#diccionarios', '#estructurasdedatos', '#pyquest', '#aprenderaprogramar', '#gamedev'],
            bestTime: '18:00 - 21:00',
            sound: 'Ambient Tech Bed · PyQuest S4'
        },
        tags: ['Python', 'Listas', 'Diccionarios', 'PyQuest', 'EstructurasDeDatos', 'GameDev'],
        sound: {
            title: 'Ambient Tech Bed · PyQuest S4',
            author: 'Santi.Dev Sound Lab',
            badge: 'AUDIO ORIGINAL'
        },
        beats: [
            {
                id: 1,
                name: 'El Caos de las Variables Sueltas',
                start_ms: 0,
                end_ms: 8000,
                type: 'hero',
                badge: 'ERROR DE ORGANIZACIÓN',
                title: '¿Crear variables para *cada objeto*?',
                sub: 'Crear item1, item2, item3 hace tu código imposible de mantener o recorrer.',
                kicker: 'EPISODIO 4 · PYQUEST',
                vo: 'Si en tu juego tienes variables llamadas item uno, item dos e item tres, estás complicando tu código sin necesidad. Para agrupar datos relacionados existen las colecciones.'
            },
            {
                id: 2,
                name: 'Listas e Índices desde Cero',
                start_ms: 8000,
                end_ms: 26000,
                type: 'code',
                badge: 'LISTAS E ÍNDICES DESDE CERO',
                title: 'Colecciones ordenadas: *entre corchetes []*',
                sub: 'inventario = ["Poción", "Espada", "Escudo"]. El índice [0] indica el primer espacio desde el inicio.',
                codeSnippet: {
                    file: 'inventario.py ~ lista_ordenada',
                    lines: [
                        '# Agrupa elementos ordenados entre corchetes []',
                        'inventario = ["Poción", "Espada", "Escudo"]',
                        'print(inventario[0])     # -> "Poción" (Posición 0)',
                        'print(len(inventario))   # -> 3 objetos en total'
                    ]
                },
                vo: 'Una lista agrupa varios elementos en una sola variable usando corchetes. Y un detalle clave que debes recordar: en programación contamos desde cero. El índice cero representa el inicio de la lista, sin ningún salto. Por eso inventario cero es siempre tu primer objeto.'
            },
            {
                id: 3,
                name: 'Listas Dinámicas con .append()',
                start_ms: 26000,
                end_ms: 46000,
                type: 'code',
                badge: 'LISTAS DINÁMICAS CON .APPEND()',
                title: 'Modificando en vivo: *método .append()*',
                sub: 'Puedes agregar objetos nuevos al final con .append() y consultar el último con [-1].',
                codeSnippet: {
                    file: 'inventario.py ~ nuevo_botin',
                    lines: [
                        '# Aria encuentra un cofre y suma un objeto al final',
                        'inventario.append("Amuleto Mágico")',
                        'print(inventario[-1])    # -> "Amuleto Mágico" (Último)',
                        'pocion = inventario.pop(0)  # Usa y retira el primero'
                    ]
                },
                vo: 'Las listas en Python pueden crecer en cualquier momento. Cuando Aria abre un cofre, usamos el método append para añadir el nuevo tesoro al final de la lista. Además, puedes usar el índice menos uno para obtener directamente el último objeto guardado sin contar cuántos hay.'
            },
            {
                id: 4,
                name: 'Diccionarios con Clave y Valor',
                start_ms: 46000,
                end_ms: 64000,
                type: 'compare',
                badge: 'DICCIONARIOS CON CLAVE Y VALOR',
                title: 'Atributos con nombre: *diccionarios {}*',
                sub: 'heroe = {"nombre": "Aria", "vida": 80, "clase": "Mago"}. Accedes a cada dato por su nombre.',
                compareData: {
                    bad: {
                        title: 'Lista sin etiquetas',
                        desc: 'stats = [80, "Aria", "Mago"] te obliga a memorizar qué significa cada posición.'
                    },
                    good: {
                        title: 'Diccionario con nombre',
                        desc: 'heroe["vida"] es claro y directo: sabes exactamente qué dato estás leyendo.'
                    }
                },
                vo: 'Pero una lista no es ideal para los atributos de un personaje, porque te obliga a recordar qué significa cada posición. Ahí entran los diccionarios: usan llaves y pares de clave y valor para que accedas a cada dato por su nombre real, como héroe vida o héroe clase.'
            },
            {
                id: 5,
                name: 'Cliffhanger a Bucles y CTA',
                start_ms: 64000,
                end_ms: 74000,
                type: 'cta',
                badge: 'AUTOMATIZACIÓN CON BUCLES',
                title: '¿100 objetos en el morral? *Episodio 5*',
                sub: 'No vas a escribir 100 líneas para revisar el inventario. Necesitamos bucles for y while.',
                ctaData: {
                    keyword: 'BUCLES',
                    line: 'Comenta BUCLES para el resumen y sígueme para el Episodio 5: Bucles For y While.',
                    handle: '@santi.dev'
                },
                vo: 'Ya tenemos inventario y estadísticas. Pero si tienes cien objetos en la mochila y quieres revisarlos todos, ¿vas a escribir cien líneas? Sígueme para el Episodio cinco: Bucles For y While.'
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
        videoUrl: 'videos/stack_secreto.mp4?v=4',
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
        videoUrl: 'videos/automatizacion_y_mcp.mp4?v=4',
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
        videoUrl: 'videos/el_arte_del_prompt.mp4?v=3',
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
