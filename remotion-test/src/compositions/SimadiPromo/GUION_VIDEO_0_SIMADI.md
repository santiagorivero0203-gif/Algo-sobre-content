# Guion · Video 0 (Apertura Educativa): Cómo funciona el SIMADI UCV

> **Composiciones Remotion:** `SimadiApertura` (`1080×1920`, TikTok/Reels/Shorts) y `SimadiAperturaIG` (`1080×1350`, Instagram Feed) @ **60 FPS**  
> **Duración total:** `65 segundos` (`3900 frames`) · **Ritmo de locución:** ~`155 palabras/minuto` (`168 palabras` totales)  
> **Fuente única de hechos:** [`simadi-data.json`](./simadi-data.json) · **Sincronización exacta:** [`voiceover-cues.json`](./voiceover-cues.json)

---

## 1. Guion Cronometrado (Voz en Off vs. Pantalla)

| Tiempo | Frames (60 FPS) | Voz en off (qué dices) | Qué brilla en pantalla (Editorial Daylight) | Audio / SFX |
| :--- | :--- | :--- | :--- | :--- |
| **0:00 – 0:04.5** | `0 – 270` | *"Si vas a presentar el **SIMADI** de la UCV, así se calcula tu índice: **sesenta por ciento** tus notas de primero a cuarto año y **cuarenta por ciento** el Test Diagnóstico Integral."* | Escudo oficial UCV + titular protagonista (`Plus Jakarta Sans` + `Instrument Serif Italic`): **Así funciona el *SIMADI UCV.*** Barra animada `SplitMetricBar`: `60% Notas` / `40% T.D.I.`. | `paper_air_whoosh` + `wood_tap` + cama `bgm_daylight_minimal` suave |
| **0:04.5 – 0:10** | `270 – 600` | *"Son **noventa preguntas** en dos horas y media, en línea, y con una regla clave: una vez respondes, **no puedes volver atrás**."* | Contador rápido `0 → 90 preguntas` · `2 h 30 min · En línea`. Alerta limpia minimalista: cursor intenta tocar **`← Atrás`** y candado SVG lo bloquea (`Sin retroceso`). | `clock_tick_soft` (x3) + `ui_lock` suave |
| **0:10 – 0:18** | `600 – 1080` | *"Se divide en **tres bloques consecutivos** de treinta preguntas. Primero, **Lógico-Matemático**: series, patrones, porcentajes, regla de tres, ecuaciones, lógica y lectura de gráficos."* | `ExamModuleCard` enfocando `01 · Lógico-Matemático (30)` + etiquetas escalonadas + **ejemplo microscópico resuelto**: `2, 6, 12, 20, ?` → saltos `+4, +6, +8, +10` → **`30`**. | `paper_air_whoosh` + `wood_tap` + `warm_bell` al revelar `30` |
| **0:18 – 0:25.5** | `1080 – 1530` | *"Después pasas a **Razonamiento Verbal**: comprensión lectora, inferencias, sinónimos, antónimos, analogías y conectores."* | Enfoque cambia a `02 · Razonamiento Verbal (30)` + subtemas en `stagger` + mini-oración donde se ilumina **`sin embargo,`** como pivote lógico de lectura. | `paper_air_whoosh` + `wood_tap` |
| **0:25.5 – 0:32** | `1530 – 1920` | *"Y el tercer bloque es el **área específica** según tu facultad: Ciencia y Tecnología, Salud, Agro y Mar o Ciencias Sociales."* | Enfoque cambia a `03 · Área Específica (30)` mostrando las 3 ramas universitarias con iconos vectoriales limpios (`Ciencia y Tecnología`, `Salud · Agro y Mar`, `Ciencias Sociales`). | `paper_air_whoosh` + `wood_tap` |
| **0:32 – 0:37.5** | `1920 – 2250` | *"Para no quemarte, maneja un presupuesto de **cuarenta y cinco minutos por bloque**: unos **noventa segundos por pregunta** y quince minutos de margen."* | `SplitMetricBar` temporal (`45m` · `45m` · `45m` + `15m margen`) + reloj minimalista marcando **`01:30`** por pregunta. | `clock_tick_soft` rítmico |
| **0:37.5 – 0:43** | `2250 – 2580` | *"Como no hay retroceso ni conviene dejar respuestas vacías porque cuentan mal, **descarta dos opciones rápido** cuando dudes."* | `EliminationDemo`: pregunta tipo real de 4 opciones (`A–D`). En `< 2.5s`, `A` y `C` se atenúan y tachan al vuelo en rojo suave (`Vacías = incorrectas`). | `trackpad_click` (x2 al tachar A y C) |
| **0:43 – 0:48** | `2580 – 2880` | *"Ten **papel y lápiz en mano** para matemáticas, y en verbal ubica la **idea principal y los conectores** antes de caer en distractores."* | Comparativa visual limpia (sin cajas pesadas): `Papel y lápiz` (trazo SVG de cálculo) vs. `Idea principal + conectores` (subrayado azul `#0F52BA`). | `wood_tap` (x2) |
| **0:48 – 0:58.5** | `2880 – 3510` | *"Saber las reglas no sirve si el día del examen **el reloj te paraliza**. En Simulación Simadi practicas con módulos reales, **cronómetro en vivo** y diagnóstico al instante para detectar exactamente qué temas reforzar."* | **Transición por zoom** desde el reloj `01:30` directo a la **grabación vertical HD (`OffthreadVideo`)** de Simulación Simadi a pantalla dominante (pregunta cronometrada + selección con cursor + pantalla real de resultados). | `paper_air_whoosh` en zoom + `trackpad_click` real del manifest + `warm_bell` en resultados |
| **0:58.5 – 1:05** | `3510 – 3900` | *"Es una herramienta complementaria en fase Beta que no reemplaza un centro preuniversitario. Pruébala en el **link de la bio** y cualquier duda te leo al **DM**."* | Escudo oficial UCV + `Simulación Simadi · FASE BETA`. Titular gigante: **`¿Tienes dudas? Escríbeme al DM.`** + `Link en la bio →` + pie discreto (`Herramienta complementaria en fase Beta · No reemplaza un centro preuniversitario`). | `dm_bubble` + fade-out suave de BGM |

---

## 2. Guía rápida para grabar tu voz en off (opcional / paso siguiente)

1. Graba el texto de la columna **Voz en off** leyendo con tono claro, calmado y seguro (estilo tutorial serio, sin gritar).
2. Si lo grabas en un solo audio (`vo_apertura.mp3`) y varían tus pausas por 1–2 segundos, actualiza `startSec`/`endSec` en [`voiceover-cues.json`](./voiceover-cues.json) y recompila: las animaciones se re-sincronizarán automáticamente con tu voz real.

---

## 3. Kit de Publicación (Instagram `4:5` y TikTok / Shorts `9:16`)

### Hook visual / Portada sugerida
- **Texto de portada:** `Así funciona el SIMADI UCV (60% / 40%)`

### Caption para Instagram & TikTok
> ¿Vas a presentar la prueba diagnóstica **SIMADI** de la **UCV**? Antes de ponerte a estudiar a ciegas, entiende las reglas reales del juego:
>
> • **Índice real:** 60% tus notas de 1.º a 4.º año + 40% Test Diagnóstico Integral (T.D.I.).
> • **Formato:** 90 preguntas en 2 h 30 min (3 bloques de 30), en línea y **sin poder retroceder** entre preguntas.
> • **Táctica clave:** maneja ~45 min por bloque (~90 seg por pregunta), no dejes respuestas en blanco (cuentan como incorrectas) y descarta 2 distractores rápido cuando dudes.
>
> Para entrenar bajo ese reloj real armé **Simulación Simadi**: prácticas cronometradas por área (`Lógico-Numérico`, `Verbal` y `Ciencia y Tecnología`), guías organizadas y diagnóstico inmediato para detectar qué reforzar.
>
> *(Nota: es una herramienta de apoyo **complementaria en fase Beta**; no reemplaza un centro de estudio preuniversitario).*
>
> 🔗 **Pruébala en el link de la bio.**  
> 💬 **¿Tienes dudas sobre el simulacro o la Beta? Escríbeme directo al DM.**

### Hashtags segmentados
`#UCV #SIMADI #AdmisionUCV #TDIUCV #Preuniversitario #EstudiantesVenezuela #ExamenDeAdmision #TecnicasDeEstudio #IngenieriaUCV #SantiDev`

