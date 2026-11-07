# 📜 Historial Completo de Prompts y Requerimientos · Santi.Dev / Algo

Este documento recopila de manera cronológica y exhaustiva todos y cada uno de los prompts e instrucciones proporcionados por el usuario a lo largo del desarrollo de la serie **PyQuest** y los proyectos de video en este espacio de trabajo.

---

## 🔹 Prompt #1

- **Paso / Step Index:** `0`
- **Fecha y Hora Local:** `2026-11-01T15:48:09-04:00.`

### 📝 Instrucción del Usuario:

Quiero que hagas un documento con todo lo que hemos hecho para crear videos con ia para poder hacer que otro de mis proyecto los tenga tambien.Especificamente las tecnicas skills y herramientas que hemos usado en los ultimos videos de gemini.

---

## 🔹 Prompt #2

- **Paso / Step Index:** `77`
- **Fecha y Hora Local:** `2026-11-01T16:45:09-04:00.`

### 📝 Instrucción del Usuario:

Por cierto el ulltimo video de gemini tiene errores ortograficos corrigelos.Y ahora las automatizaciones se hacen con gemini spark no hay gems.

---

## 🔹 Prompt #3

- **Paso / Step Index:** `178`
- **Fecha y Hora Local:** `2026-11-04T22:15:00-04:00.`

### 📝 Instrucción del Usuario:

Quiero hacer una nueva saga de videos.Quisiera que estos videos no sigan la linea exacta de los videos pasados, quisiera que fueran mas limpios enseñando de manera practica a como programar en python, quisiera que huibiera pocos elementos en pantalla al momento pero que los elementos tengan movimientos fluidos efectos de sonido y aparte que usara colores mas claros o planos en vez de degradado pero ya lo dejo a tu eleccion.Para que esta serie funcione en TikTok con **videos de más de 60 segundos** (idealmente entre **65 y 85 segundos** para aprovechar el empuje del algoritmo a videos largos y la monetización/retención profunda) y sea fácil de programar en **Remotion**, necesitamos un **sistema de componentes reutilizables** y un **hilo conductor único**.

El hilo conductor de toda la serie será: **Construir el motor lógico de un RPG llamado "PyQuest"**. Desde el Episodio 1 hasta el 8, el espectador verá cómo ese mismo proyecto evoluciona desde una línea de texto hasta un sistema con personajes, inventario, combate y librerías externas.

---

## 1. Arquitectura Base en Remotion (Specs Técnicas)

Para no programar cada video desde cero, tu proyecto de Remotion (`1080x1920`, `60fps`) usará 4 componentes maestros que irás reutilizando:

| Componente Remotion | Función Visual | Animación / Props Clave |
| --- | --- | --- |
| `<SeriesHeader/>` | Badge superior fijo (`PYTHON DESDE CERO • EP. X/8`) + barra de progreso superior vinculada al `useCurrentFrame()`. | Siempre visible en la zona segura superior (`top: 120px`). |
| `<CodeCard/>` | Ventana de código estilo macOS oscura con resaltado de sintaxis y resaltador de línea activa (`activeLine`). | Entrada con `spring({ damping: 14, stiffness: 120 })`. Efecto máquina de escribir por caracteres o aparición por bloques. |
| `<MemoryVisualizer/>` | El panel inferior donde ocurre la "magia": muestra qué pasa en la memoria RAM o en el juego cuando se ejecuta una línea de `<CodeCard/>`. | Transiciones de escala y color sincronizadas con el cursor del código. |
| `<TerminalOutput/>` | Consola minimalista que muestra el resultado real o el error en rojo cuando explicas qué NO hacer. | Shake horizontal (`Math.sin(frame)`) cuando hay un `SyntaxError` o `TypeError`. |

---

## 2. Guiones Técnicos y Coreografía en Remotion (Episodios 1 y 2 Completos)

### Episodio 1: ¿Por qué Python es tu mejor punto de partida?

* **Duración objetivo:** 70 segundos (`4200 frames` a 60fps).
* **Objetivo:** Desmitificar el miedo a programar, explicar carga cognitiva vs. lógica real y presentar el proyecto "PyQuest".

| Tiempo / Frames | Escena en Remotion (`<Sequence>`) | Coreografía Visual y Animación | Guion de Voz (Locución con ritmo dinámico) |
| --- | --- | --- | --- |
| **0:00 - 0:06**<br>

<br>*(0 - 360f)* | **Gancho Visual: El choque de sintaxis** | Se abren dos `<CodeCard/>` en pantalla dividida vertical. Arriba C++ (10 líneas llenas de `#include`, `std::`, llaves). Abajo está vacío. Al segundo 3, la tarjeta de arriba tiembla en rojo (`SyntaxError: missing ';'`). | *"La mayoría de la gente que intenta aprender a programar abandona en las primeras dos semanas. Y casi nunca es porque sean malos para la lógica... es porque eligieron el lenguaje equivocado para empezar."* |
| **0:06 - 0:22**<br>

<br>*(360 - 1320f)* | **El concepto: Carga Cognitiva vs. Lógica** | La tarjeta de C++ se encoge con `interpolate` y desaparece. Entra el `<CodeCard/>` de Python con un `spring`. Se escribe `print("Bienvenido a PyQuest")` en 1 segundo. Las palabras `public`, `static`, `void` caen al vacío con gravedad simulada. | *"Cuando estás empezando, tu cerebro tiene que aprender dos cosas a la vez: cómo resolver problemas paso a paso y cómo escribir símbolos raros sin equivocarte. Si eliges un lenguaje lleno de reglas estrictas de memoria y puntos y comas obligatorios, te frustras antes de crear algo real. Python elimina ese ruido."* |
| **0:22 - 0:40**<br>

<br>*(1320 - 2400f)* | **Demostración Real: Pseudocódigo ejecutable** | En `<CodeCard/>` aparece código de nuestro juego RPG:<br>

<br>`if vida_jugador == 0:`<br>

<br>`    terminar_juego()`<br>

<br>Al lado, una tarjeta de texto en español traduce palabra por palabra con flechas animadas en SVG (`strokeDashoffset`). | *"Mira estas dos líneas. Aunque nunca hayas escrito código en tu vida, entiendes exactamente qué hacen: si la vida del jugador es igual a cero, termina el juego. Python está diseñado para leerse casi como inglés humano, lo que te permite entrenar lo que de verdad importa: tu lógica de programador."* |
| **0:40 - 0:58**<br>

<br>*(2400 - 3480f)* | **Escalabilidad: No es un lenguaje de juguete** | Del logo central de Python salen 4 conectores tipo circuito hacia 4 tarjetas con iconos: **IA (PyTorch/OpenAI)**, **Backend (Instagram/Spotify)**, **Ciencia de Datos** y **Automatización**. Cada tarjeta se ilumina en secuencia cada 90 frames. | *"Y aquí viene lo mejor: que sea fácil de leer no significa que sea básico. La misma sintaxis que vas a aprender aquí es la que mueve hoy la Inteligencia Artificial moderna, el backend de aplicaciones gigantes y la ciencia de datos. Aprendes una sola base y desbloqueas toda la industria."* |
| **0:58 - 1:10**<br>

<br>*(3480 - 4200f)* | **Presentación de la Serie + CTA** | Aparece el roadmap vertical de 8 episodios. El Ep. 1 cambia su estado de `Pendiente` a `Completado ✓` en verde esmeralda. El Ep. 2 (`Variables y Tipos de Datos`) hace un pulso suave de escala (`1.0` a `1.04`). | *"Por eso hoy empezamos una serie desde cero absoluto donde vamos a programar juntos la lógica de un videojuego mientras dominas todos los fundamentos reales. Guarda este video y sígueme, porque en el Episodio 2 vamos a darle vida a nuestro personaje con Variables y Tipos de Datos."* |

---

### Episodio 2: Variables y Tipos de Datos (El ADN de tu programa)

* **Duración objetivo:** 75 segundos (`4500 frames` a 60fps).
* **Objetivo:** Enseñar qué es una variable en memoria, los 4 tipos primitivos (`str`, `int`, `float`, `bool`) y por qué mezclar tipos sin cuidado rompe el código.

| Tiempo / Frames | Escena en Remotion (`<Sequence>`) | Coreografía Visual y Animación | Guion de Voz |
| --- | --- | --- | --- |
| **0:00 - 0:07**<br>

<br>*(0 - 420f)* | **Gancho: El error clásico** | En `<CodeCard/>` se ve:<br>

<br>`vida = "100"`<br>

<br>`vida = vida - 20`<br>

<br>Al ejecutarse, la pantalla parpadea en rojo y sale `<TerminalOutput/>`: `TypeError`. | *"Para ti, este 100 entre comillas y este 100 sin comillas son exactamente lo mismo. Pero para tu computadora son dos mundos distintos, y confundirlos va a romper tu código al instante."* |
| **0:07 - 0:22**<br>

<br>*(420 - 1320f)* | **¿Qué es una Variable realmente?** | En `<MemoryVisualizer/>` aparece una cuadrícula de memoria RAM. Se ilumina una celda, le sale una etiqueta con el nombre `heroe` y entra el valor `"Arthas"`. | *"Bienvenido al Episodio 2 de Fundamentos con Python. Para crear nuestro juego necesitamos guardar información. Ahí entran las variables: imagínalas como cajas con una etiqueta en la memoria de tu computadora donde guardas un dato para usarlo después."* |
| **0:22 - 0:50**<br>

<br>*(1320 - 3000f)* | **Los 4 Tipos de Datos Fundamentales (El Bento Grid)** | La pantalla se divide en un Bento Grid de 4 tarjetas que se activan una por una con zoom suave:<br>

<br>1. `str` (Texto entre comillas, color amarillo)<br>

<br>2. `int` (Número entero, barra de vida verde `100`)<br>

<br>3. `float` (Decimal, crítico `1.5x` en azul)<br>

<br>4. `bool` (Switch interactivo `True` / `False` que cambia de estado). | "Pero no todas las cajas guardan lo mismo. En Python existen cuatro tipos de datos básicos que vas a usar todos los días:<br>

<br>Primero, los **Strings o cadenas de texto**, que siempre van entre comillas, como el nombre de tu personaje: `'Arthas'`.<br>

<br>Segundo, los **Integers o enteros**, números exactos sin decimales para contar cosas como tu vida: `100` o tu nivel: `5`.<br>

<br>Tercero, los **Floats o flotantes**, que llevan punto decimal para cálculos precisos, como un multiplicador de daño crítico de `1.75`.<br>

<br>Y cuarto, los **Booleanos**, el interruptor más importante de la programación: solo pueden ser `True` (verdadero) o `False` (falso), como saber si tu personaje sigue vivo." |
| **0:50 - 1:05**<br>

<br>*(3000 - 3900f)* | **Resolviendo el Gancho + Tipado Dinámico** | Volvemos al código del inicio. Las comillas de `"100"` se borran con una animación de recorte. Ahora `100 - 20` fluye hacia la barra de vida del personaje, que baja suavemente de `100` a `80` usando `interpolate()`. | *"¿Recuerdas el error del principio? Cuando pones `'100'` entre comillas, Python cree que es texto, como una palabra, y no puedes restarle 20 a una palabra. Al quitarle las comillas, Python detecta automáticamente que es un número entero y la resta funciona perfecto, bajando la vida a 80."* |
| **1:05 - 1:15**<br>

<br>*(3900 - 4500f)* | **Puente al Episodio 3** | La barra de vida del personaje baja rápido hasta `0`. Pero en pantalla aparece `-20` y el personaje sigue caminando. Sale un signo de interrogación encima. | *"Ahora tenemos un problema: si reciben más daño, la vida baja a menos veinte y el juego no se entera de que perdimos. ¿Cómo hacemos que el código tome decisiones? Sígueme para el Episodio 3: Condicionales."* |

---

## 3. Estructura Detallada del Resto de la Temporada (Episodios 3 al 8)

Para mantener la coherencia, cada episodio empieza resolviendo el problema que dejó abierto el episodio anterior (esto genera un efecto *cliffhanger* brutal para una serie educativa):

### Episodio 3: Condicionales (`if`, `elif`, `else`) — ~70 seg

* **Gancho:** *"Nuestro personaje tiene -20 de vida y sigue vivo porque nuestro código todavía es ciego: ejecuta líneas de arriba hacia abajo sin pensar."*
* **Coreografía en Remotion:** Un sistema de nodos conectados por tuberías luminosas. El dato `vida = 25` viaja como una esfera brillante. Llega al primer nodo (`if vida <= 0:`), el nodo parpadea en rojo (`False`) y desvía la esfera hacia el segundo nodo (`elif vida < 30:`), que se ilumina en verde (`True`) y activa la tarjeta `activar_alerta_roja()`.
* **Cliffhanger final:** ¿Qué pasa cuando nuestro héroe recoge 15 objetos distintos? ¿Creamos `objeto1`, `objeto2`, `objeto3`?

### Episodio 4: Listas y Diccionarios (Estructuras de Datos) — ~80 seg

* **Gancho:** *"Si en tu código tienes variables llamadas `item1`, `item2` y `item3`, estás cometiendo el pecado capital de los principiantes."*
* **Coreografía en Remotion:**
* **Mitad 1 (Listas):** Tres variables sueltas se fusionan en un contenedor horizontal numerado por índices (`0, 1, 2`). Se anima el método `.append("Poción")` empujando un nuevo bloque al final con física de resorte.
* **Mitad 2 (Diccionarios):** Para las estadísticas del héroe, una lista no sirve porque no sabes qué significa `[100, 50, 12]`. Se transforma en una tarjeta de perfil JSON/Dict con llaves claras: `{"vida": 100, "mana": 50, "nivel": 12}`.


* **Cliffhanger final:** Ya tenemos un inventario con 50 objetos en una lista... ¿cómo los mostramos o aplicamos un descuento a todos sin escribir 50 líneas de código?

### Episodio 5: Bucles (`for` y `while`) — ~75 seg

* **Gancho:** *"Los mejores programadores son flojos por naturaleza: si una tarea se repite más de dos veces, la automatizan con un bucle."*
* **Coreografía en Remotion:**
* Para el bucle `for item in inventario:`: Un escáner láser recorre la lista del Episodio 4 elemento por elemento, sincronizado con cada iteración del código.
* Para el bucle `while veneno_activo:`: Un anillo circular que gira restando `-5 HP` en cada vuelta hasta que la condición cambia a `False` y el anillo se rompe.


* **Cliffhanger final:** Nuestro archivo ya tiene 100 líneas desordenadas y cada vez que el jugador ataca tenemos que copiar y pegar el mismo cálculo matemático.

### Episodio 6: Funciones (`def`, parámetros y `return`) — ~75 seg

* **Gancho:** *"Copiar y pegar tu propio código funciona... hasta que descubres un error y tienes que corregirlo en veinte lugares distintos."*
* **Coreografía en Remotion:** Se dibuja una "cápsula industrial" en el centro de la pantalla llamada `calcular_dano(ataque, defensa)`. Por los tubos superiores caen dos cápsulas con valores (`50` y `15`), la máquina vibra brevemente, ejecuta la fórmula interna y expulsa por abajo una tarjeta dorada con `return 35`. Demuestras cómo reutilizar esa misma máquina 3 veces con distintos valores en 3 líneas.
* **Cliffhanger final:** Tenemos funciones y variables sueltas, pero ahora queremos meter 10 enemigos distintos en pantalla al mismo tiempo.

### Episodio 7: Programación Orientada a Objetos (Clases y Objetos) — ~85 seg

* **Gancho:** *"Clases y Objetos: el concepto que hace llorar a los estudiantes en la universidad, explicado en un minuto con un videojuego."*
* **Coreografía en Remotion:**
* **La Clase (`class Enemigo:`):** Se diseña como un plano holográfico azul (Blueprint) con huecos vacíos para `nombre`, `vida` y el método `atacar()`.
* **La Instanciación (`__init__`):** El plano baja como una prensa y estampa 3 tarjetas físicas distintas en pantalla: `goblin = Enemigo("Goblin", 40)`, `dragon = Enemigo("Dragón", 500)`. Se ve claramente cómo comparten la misma estructura pero tienen estados independientes.


* **Cliffhanger final:** Nuestro juego funciona, pero el daño siempre es exacto y predecible. ¿Cómo metemos probabilidad, tiempos de espera o gráficos sin programar miles de líneas matemáticas desde cero?

### Episodio 8: Librerías y Módulos (`import` y `pip`) — ~75 seg

* **Gancho:** *"El secreto del desarrollo moderno es que no tienes que escribir todo el código tú mismo: puedes usar superpoderes que otros ya crearon."*
* **Coreografía en Remotion:** Tu `<CodeCard/>` principal aparece con ranuras de expansión laterales. Cuando se escribe `import random`, un módulo externo se enchufa en la ranura superior y habilita `random.randint(1, 20)` (aparece un dado de 20 caras girando para el golpe crítico). Luego explicas la diferencia entre la librería estándar (viene gratis con Python) y `pip install` (conectarse a una tienda gigante de módulos como `pygame`, `fastapi` o `openai`).

---

## 4. Trucos de Retención en Remotion para que el espectador no deslice

1. **La Regla de los 180 Frames (3 segundos):** En Remotion, ningún frame debe quedarse estático más de 3 segundos. Si estás explicando algo largo en voz, usa un `interpolate(frame, [start, end], [1, 1.03])` para hacer un *slow zoom* constante en la tarjeta activa o mueve un cursor luminoso señalando la palabra clave del código.
2. **Sincronización Audio-Visual por Marcas de Tiempo:** Graba primero tu voz con naturalidad y energía. Luego importa el `.mp3` en Remotion, mira en qué segundo exacto dices cada palabra clave (ej. segundo `14.5` dices *"Enteros"*) y multiplica por 60 (`14.5 * 60 = frame 870`) para disparar el `<Sequence from="{870}">` exacto. Esa sincronía milimétrica entre tu voz y la aparición de la tarjeta con sonido *pop/whoosh* sutil es lo que da la sensación de canal "top tier".
3. **Código legible en móvil:** Nunca pongas más de **6 a 8 líneas de código** por tarjeta ni más de **32 caracteres por línea**. Usa una fuente `JetBrains Mono` o `Fira Code` a mínimo `42px` para que se lea perfecto en pantallas pequeñas sin hacer zoom.Haz un analisis y adapta el guion y planea lo que vas a hacer por video.

---

## 🔹 Prompt #4

- **Paso / Step Index:** `187`
- **Fecha y Hora Local:** `2026-11-04T22:31:22-04:00.`

### 📝 Instrucción del Usuario:

Bueno antes de iniciar a hacer los videos,quisiera acotar que no quiero que salga la barra superios ya que lo hace parecer otra cosa, quiero que haya movimiento y animacones en todo momento, aparte de actuar de manera fluida, cuando digo colores planos de fondo quiero eso colores planos. o degradados muy suaves no una pizarra tecnica,en lo demas pues quiero que cada video tenga coherencia entre si . No cometas errores de escritura ni nada por el estilo.

---

## 🔹 Prompt #5

- **Paso / Step Index:** `193`
- **Fecha y Hora Local:** `2026-11-04T22:34:19-04:00.`

### 📝 Instrucción del Usuario:

*(Aprobación explícita del documento/plan por parte del usuario)*

---

## 🔹 Prompt #6

- **Paso / Step Index:** `283`
- **Fecha y Hora Local:** `2026-11-04T22:44:37-04:00.`

### 📝 Instrucción del Usuario:

hazlo

---

## 🔹 Prompt #7

- **Paso / Step Index:** `289`
- **Fecha y Hora Local:** `2026-11-04T22:47:34-04:00.`

### 📝 Instrucción del Usuario:

Cual es la herramienta que utilizamos para animar los ultmos videos de gemini?

---

## 🔹 Prompt #8

- **Paso / Step Index:** `289`
- **Fecha y Hora Local:** `2026-11-04T22:48:26-04:00.`

### 📝 Instrucción del Usuario:

Ponlo en la pagina y sube los cambios

---

## 🔹 Prompt #9

- **Paso / Step Index:** `358`
- **Fecha y Hora Local:** `2026-11-04T23:11:19-04:00.`

### 📝 Instrucción del Usuario:

# ROL Y OBJETIVO
Actúa como un Creative Technologist y Senior Motion Designer experto en Remotion (React + TypeScript) de nivel estudio (estilo Apple, Linear y Vercel).
Tu objetivo es programar el **Episodio 1 ("¿Por qué elegir Python para empezar?")** de una serie educativa para TikTok donde enseñamos fundamentos de programación creando el motor lógico de un juego RPG llamado **PyQuest**.

El video anterior falló porque parecía una presentación de diapositivas estática: tenía un fondo plano sin vida, dejaba el 70% de la pantalla vacía, usaba una estructura fija aburrida y se quedaba congelado durante 12 a 15 segundos seguidos después de cada entrada. **Está terminantemente prohibido repetir esos errores.**

---

# 1. ESPECIFICACIONES TÉCNICAS GLOBALES
- **Resolución:** `1080x1920` (Vertical 9:16).
- **Framerate:** `60 fps`.
- **Duración Total:** `72 segundos` (`4320 frames`).
- **Tipografías:** `'Inter', system-ui, sans-serif` para títulos/UI y `'JetBrains Mono', monospace` para código.
- **PROHIBIDO:**
  - NO pongas barras de progreso.
  - NO uses una plantilla fija de "título arriba + tarjeta en el centro + subtítulo clavado abajo".
  - NO dejes ningún elemento 100% estático ni un solo frame. Todo debe tener vida continua.
  - NO hagas cortes secos donde desaparece una ventana y aparece otra distinta; usa **Morphing** (transforma el ancho, alto, posición y rotación del mismo contenedor).
  - NO uses emojis básicos sueltos en cajas blancas vacías; diseña iconos SVG limpios o badges con gradientes, bordes translúcidos y sombras profundas.

---

# 2. SISTEMA DE ATMÓSFERA, FONDO REACTIVO Y PROFUNDIDAD (2.5D)
El fondo NUNCA es un color plano estático. Debe reaccionar al estado emocional y lógico del código en cada escena:

1. **Interpolación de Color Ambiental (`interpolateColors`):**
   - **Fase Gancho (f0 - f210):** Gris perla profundo (`#F3F4F8`) con acentos índigo.
   - **Fase Error en Java (f210 - f540):** Transición suave a carmesí pálido (`#FFF1F2`) con destello rojo (`rgba(239, 68, 68, 0.35)`).
   - **Fase Alivio en Python (f540 - f1380):** Transición a verde menta/esmeralda suave (`#ECFDF5`) con destello (`rgba(16, 185, 129, 0.30)`).
   - **Fase Lógica Viva RPG (f1380 - f2520):** Transición de azul eléctrico (`#EEF2FF`) a ámbar de alerta (`#FFFBEB`) y rojo crítico cuando el HP llega a 0.
   - **Fase Industria y Cierre (f2520 - f4320):** Lavanda/Violeta suave (`#F5F3FF`) a blanco cálido luminoso.

2. **Textura y Paralaje Continuo:**
   - Agrega un patrón de puntos (`radial-gradient(#0f172a 1.5px, transparent 1.5px)`, `backgroundSize: '38px 38px'`, `opacity: 0.06`) cuya posición se mueva diagonalmente en cada frame (`backgroundPosition: ${-frame * 0.6}px ${-frame * 0.4}px`).
   - Agrega 2 ó 3 **Orbes Volumétricos de Luz** (`width: 850px`, `height: 850px`, `filter: blur(130px)`) que floten por detrás de las tarjetas usando ondas senoidales (`Math.sin(frame / 30) * 110`).

3. **Sombras Multicapa y Perspectiva 2.5D:**
   - Envuelve el escenario en `perspective: 1400px`.
   - Aplica rotaciones sutiles en 3D (`rotateX(4deg a 8deg)`, `rotateZ(-1.5deg a 2deg)`) y flotación perpetua (`Math.sin(frame / 20) * 8px`).
   - Todas las tarjetas deben tener sombras de 3 capas: sombra de contacto, sombra difusa profunda (`0 30px 60px -15px rgba(15, 23, 42, 0.25)`) y un **glow coloreado reactivo** sincronizado con el color de la escena.

---

# 3. REGLA DE DISTRIBUCIÓN ESPACIAL ELÁSTICA (CERO ESTRUCTURA FIJA)
- **Física de Empuje (`Spring Offset`):** Cuando un elemento nuevo entra en escena, NO aparece simplemente abajo en el vacío. Debe **empujar físicamente** a los elementos existentes, cambiando su posición `Y`, su escala (`scale`) y su ángulo de rotación (`rotateZ`) usando `spring({ damping: 13, stiffness: 115 })`.
- **Tipografía Cinética Integrada:** No pongas subtítulos estáticos abajo. El texto narrativo debe integrarse en el espacio libre de cada composición (a veces arriba en gigante, a veces entre dos tarjetas conectadas, a veces escalando palabra por palabra con efecto *highlight* de color y rotación leve).
- **Regla de los 90 Frames (1.5 seg):** Ningún periodo de 90 frames puede ocurrir sin un cambio visual activo (escritura caracter por caracter, cursor moviéndose, línea de código iluminándose, barra de progreso de HP bajando, pulso viajando por un cable SVG o cámara haciendo zoom).

---

# 4. COREOGRAFÍA FRAME POR FRAME (4320 FRAMES / 72 SEGUNDOS)

## ESCENA 1: EL GANCHO Y EL CHOQUE DE SINTAXIS (Frames 0 - 540 | 0:00 - 0:09)
- **f0 - f110 (Gancho de Alto Impacto):**
  - El video NO empieza con una tarjeta quieta. Empieza con tipografía gigante ocupando el centro (`fontSize: 82px`, `fontWeight: 900`): *"¿Por qué el 90% ABANDONA la programación en 2 semanas?"*.
  - La palabra **"ABANDONA"** entra con un `spring` agresivo, se tiñe de rojo (`#EF4444`), subraya su trazo dinámicamente y hace vibrar la cámara. Detrás flotan fragmentos de símbolos (`{ } ; static void`) desenfocados (`blur(6px)`).
- **f110 - f230 (Empuje y Entrada de Java):**
  - La ventana oscura `App.java` (`width: 940px`) entra desde abajo con inercia y **empuja el título del gancho hacia la zona superior** (`Y: 180px`, escalándolo a `0.58`).
  - Dentro de `App.java`, el código se escribe a alta velocidad (asegúrate de que NINGUNA línea se corte en el borde derecho; usa `fontSize: 28px` y saltos de línea limpios):
    ```java
    public class App {
      public static void main(String[] args) {
        System.out.println("Hola mundo")
      }
    }
    ```
- **f230 - f540 (Explosión del Error y Diagnóstico Visual):**
  - En `f230`, la línea 3 se ilumina en rojo intenso, toda la tarjeta `App.java` sufre un *shake* horizontal (`Math.sin((frame - 230) * 1.8) * 14`) y desde abajo **irrumpe la consola de error roja** (`error: ';' expected`), empujando e inclinando `App.java` a `rotateZ(-1.5deg)`.
  - En `f320`, aparece un **badge flotante con una flecha curva SVG animada** apuntando exactamente al final de `"Hola mundo"` con el texto: *"¿10 líneas de símbolos raros y todo explota por un punto y coma?"*.

## ESCENA 2: MORPHING A PYTHON — LÓGICA PURA (Frames 540 - 1380 | 0:09 - 0:23)
- **f540 - f660 (Transformación / Morphing en Vivo):**
  - NO borres la pantalla. La consola de error roja se encoge y cae por gravedad.
  - La MISMA tarjeta oscura `App.java` anima su altura con `spring` de `440px` a `220px`, endereza su rotación y cambia su nombre en la barra superior de `App.java` a `main.py`. El fondo cambia a verde esmeralda suave.
- **f660 - f960 (Escritura y Ejecución Fluida):**
  - Las palabras sobrantes de Java (`public`, `class`, `static`, `void`) se desprenden y se desvanecen.
  - Se escribe caracter por caracter con cursor parpadeante: `print("Bienvenido a PyQuest")` con resaltado de sintaxis vibrante.
  - En `f780`, un cable corto luminoso baja desde `main.py` y despliega la terminal limpia en verde esmeralda: `✓ Bienvenido a PyQuest`.
- **f960 - f1380 (Comparativa Visual de Carga Cognitiva):**
  - Para que no haya tiempo muerto entre el segundo 16 y el 23, la cámara hace un ligero *zoom out* y entran dos medidores dinámicos flotantes debajo de la terminal:
    1. **Ruido de Sintaxis:** Barra que cae de `95%` a `10%` en verde.
    2. **Enfoque en Lógica Real:** Barra que sube de `15%` a `100%` con brillo índigo.
  - Tipografía cinética integrada arriba: *"Python elimina las reglas absurdas para que entrenes tu lógica real"*.

## ESCENA 3: EL MOTOR DE PYQUEST EN VIVO (Frames 1380 - 2520 | 0:23 - 0:42)
- **f1380 - f1560 (Despliegue del Circuito Lógico):**
  - La tarjeta de código se reubica arriba a la izquierda (`Y: 280px`, `rotateZ(-1.2deg)`) cambiando a `pyquest.py` y escribe:
    ```python
    if vida <= 0:
        fin_del_juego()
    ```
  - Debajo a la derecha (`Y: 960px`, `rotateZ(1.4deg)`) entra la tarjeta de UI del juego: **Aria LVL. 1** con un avatar SVG estilizado, estado activo y barra de salud en `HP 100 / 100` (color verde `#10B981`).
  - Entre la tarjeta de código y la tarjeta de Aria se dibuja un **conector curvo SVG punteado** (`strokeDashoffset` animado).
- **f1560 - f1980 (Traducción Humana + Simulación de Daño en Tiempo Real):**
  - Primero, etiquetas flotantes traducen el código en vivo uniendo cada palabra: `if` -> *"Si"*, `vida <= 0` -> *"la salud llega a cero"*, `fin_del_juego()` -> *"termina la partida"*.
  - **ACCIÓN CRÍTICA (Prohibido dejar la barra quieta en 100):**
    - En `f1750`, Aria recibe un primer impacto: la tarjeta tiembla, sale un indicador flotante `-45 HP` y la barra baja suavemente de `100` a `55` (cambiando a color ámbar `#F59E0B`). El código arriba evalúa `55 <= 0` -> badge `False` (sigue jugando).
    - En `f1980`, Aria recibe el golpe crítico final: `-55 HP`. La barra cae de `55` a `0` (cambiando a rojo `#EF4444`).
- **f1980 - f2520 (Disparo del Condicional):**
  - Apenas `HP` toca `0`, un pulso de luz roja viaja a toda velocidad por el cable SVG desde la tarjeta de Aria hacia la línea `if vida <= 0:`.
  - La línea `fin_del_juego()` se ilumina con borde rojo e impulsa en la parte inferior un banner impactante con física elástica: **⚡ GAME OVER • Ejecutado automáticamente**.

## ESCENA 4: CASCADA 2.5D DE LA INDUSTRIA (Frames 2520 - 3480 | 0:42 - 0:58)
- **Prohibido usar una cuadrícula plana 2x2 estática.**
- **Coreografía en Cascada con Enfoque de Cámara (Profundidad Z):**
  - El título *"Una sola base. Toda la industria."* se posiciona de forma asimétrica arriba a la izquierda.
  - Las 4 tarjetas de poder (**1. Inteligencia Artificial - PyTorch & OpenAI**, **2. Servidores Backend - Instagram & Spotify**, **3. Ciencia de Datos - Pandas & Analytics**, **4. Automatización - Bots & Scripts**) se distribuyen en una **escalera diagonal vertical** desde `Y: 380px` hasta `Y: 1480px`.
  - Cada tarjeta entra con 120 frames de diferencia:
    - Cuando una tarjeta es la protagonista (durante sus 120 frames), su escala sube a `1.08`, su rotación se endereza a `0deg`, su borde brilla intensamente y muestra una micro-animación interna (ej. nodos neuronales latiendo en IA, barras subiendo en Datos, ondas de servidor en Backend), mientras las otras tarjetas pasan a `scale(0.94)` con `opacity: 0.65`.
  - En los últimos 180 frames de la escena (`f3300 - f3480`), las 4 tarjetas se iluminan al unísono conectadas por una línea de energía central con el logo de Python.

## ESCENA 5: ROADMAP INTERACTIVO Y HOOK AL EPISODIO 2 (Frames 3480 - 4320 | 0:58 - 1:12)
- **f3480 - f3720 (Transición al Mapa de Progreso):**
  - Las tarjetas de la industria se pliegan hacia atrás y entra en primer plano el panel maestro de **PyQuest — Serie Desde Cero**.
  - Arriba muestra la ficha de **Aria LVL. 1** subiendo su barra de experiencia (`XP 0 -> 100%`) y cambiando con un destello dorado a **LVL. 2 DESBLOQUEADO**.
- **f3720 - f4320 (Checklist Vivo y Call to Action):**
  - Aparece la lista vertical de episodios con desplazamiento elástico:
    1. `Episodio 1: ¿Por qué Python?` -> El checkbox se marca dinámicamente con un trazo SVG verde y el badge cambia a `COMPLETADO`.
    2. `Episodio 2: Variables y Tipos de Datos` -> Hace un pulso continuo (`scale: 1 + Math.sin(frame / 8) * 0.03`), con un borde brillante azul/índigo y una vista previa flotante que muestra `vida = 100`, `heroe = "Aria"`, `vivo = True`.
  - En la parte inferior, un Call to Action dinámico con botón animado de "Guardar" y "Seguir": *"Guarda este video y sígueme: mañana le damos vida al personaje en el Episodio 2"*.

---

# 5. REQUISITOS DEL CÓDIGO A ENTREGAR
1. Escribe el código completo, limpio, modular y listo para ejecutarse en Remotion dentro de un archivo principal (o componentes bien tipados en el mismo archivo para fácil importación).
2. Usa únicamente `useCurrentFrame()`, `useVideoConfig()`, `spring()`, `interpolate()` e `interpolateColors()` de `'remotion'`.
3. Asegúrate de que todos los `interpolate` tengan `extrapolateLeft: 'clamp'` y `extrapolateRight: 'clamp'` para evitar desbordamientos fuera de tiempo.
4. Verifica que ningún texto o línea de código se desborde de su contenedor (`boxSizing: 'border-box'`).

---

## 🔹 Prompt #10

- **Paso / Step Index:** `487`
- **Fecha y Hora Local:** `2026-11-05T00:19:41-04:00.`

### 📝 Instrucción del Usuario:

Aparte recuerda que puedes buscar imagenes en linea como lo pueden ser logos de los lenguajes mencionados etc.

---

## 🔹 Prompt #11

- **Paso / Step Index:** `540`
- **Fecha y Hora Local:** `2026-11-05T00:49:46-04:00.`

### 📝 Instrucción del Usuario:

Sube el video a la pagina

---

## 🔹 Prompt #12

- **Paso / Step Index:** `688`
- **Fecha y Hora Local:** `2026-11-05T01:13:36-04:00.`

### 📝 Instrucción del Usuario:

Aplica estas correciones a los guiones y estructuras de los siguientes videos.

---

## 🔹 Prompt #13

- **Paso / Step Index:** `719`
- **Fecha y Hora Local:** `2026-11-05T01:24:11-04:00.`

### 📝 Instrucción del Usuario:

sube los cambios a la pagina,aun aparece ell video viejo

---

## 🔹 Prompt #14

- **Paso / Step Index:** `789`
- **Fecha y Hora Local:** `2026-11-05T00:51:12-04:00.`

### 📝 Instrucción del Usuario:

Haz todos los videos que faktan

---

## 🔹 Prompt #15

- **Paso / Step Index:** `789`
- **Fecha y Hora Local:** `2026-11-05T01:51:15-04:00.`

### 📝 Instrucción del Usuario:

corrige errores sobre el tamaño de letra en ek video, y que los fondos no cambian como die que debian ser un poco mas dinamicos.En lo demas haz los siguientes videos.

---

## 🔹 Prompt #16

- **Paso / Step Index:** `1107`
- **Fecha y Hora Local:** `2026-11-05T02:24:25-04:00.`

### 📝 Instrucción del Usuario:

Aparte de esto quisiera que el codigo que alga se escriba en vez de solamente aparecer.Aparte de eso usa iconos svg en vez de emojis

---

## 🔹 Prompt #17

- **Paso / Step Index:** `1385`
- **Fecha y Hora Local:** `2026-11-05T11:27:00-04:00.`

### 📝 Instrucción del Usuario:

No salen el video dos y tres.

---

## 🔹 Prompt #18

- **Paso / Step Index:** `1595`
- **Fecha y Hora Local:** `2026-11-06T13:14:50-04:00.`

### 📝 Instrucción del Usuario:

En la parte donde se muestra los distintos programas con base en python quisiera que salieran desde un logo central de python a las esquinas haciendo zoom in y zoom out paa que se explique cada caso en vez de un formato de lista, cambia solo eso.Y haz y monta los siguientes videos tomando en base el primero

---

## 🔹 Prompt #19

- **Paso / Step Index:** `1705`
- **Fecha y Hora Local:** `2026-11-06T23:36:39-04:00.`

### 📝 Instrucción del Usuario:

Todos los episodios deben seguir las reglas del primero y aparte de no usar nisiquiera remotion,nisiquiera tienen efectos de sonido , arreglalo ya

---

## 🔹 Prompt #20

- **Paso / Step Index:** `1705`
- **Fecha y Hora Local:** `2026-11-06T23:40:05-04:00.`

### 📝 Instrucción del Usuario:

Todos los episodios deben seguir las reglas y esteticas del primero y aparte de no usar nisiquiera remotion,nisiquiera tienen efectos de sonido , arreglalo ya

---

## 🔹 Prompt #21

- **Paso / Step Index:** `1934`
- **Fecha y Hora Local:** `2026-11-07T00:09:59-04:00`

### 📝 Instrucción del Usuario:

Haz un archivo en el que esten todos y cada uno de los prompts

---

## 🔹 Prompt #22

- **Paso / Step Index:** `1965`
- **Fecha y Hora Local:** `2026-11-07T00:15:50-04:00`

### 📝 Instrucción del Usuario:

.

---

*Total de prompts registrados:* **22**

