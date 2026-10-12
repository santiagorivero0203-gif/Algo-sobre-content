Arquitectura Técnica de Motion Design Cinético y Especificación de Agent Skills en Remotion para AntigravityLa convergencia entre la programación reactiva y la dirección de arte cinematográfica ha transformado la creación de vídeo digital, sustituyendo los flujos tradicionales basados en líneas de tiempo fijas en suites de postproducción por arquitecturas de renderizado programático cuadro por cuadro. La estética visual contemporánea, popularizada por divisiones de diseño como Apple Design Studio, Stripe Press y los lanzamientos de producto de Anthropic, exige una precisión geométrica rigurosa, físicas de movimiento elásticas calibradas de forma analítica y una cadencia audiovisual dinámica que responda de manera orgánica a la información visualizada.Implementar este estándar mediante el motor de Remotion (React y TypeScript) dentro del entorno de agentes de Google Antigravity (agy) requiere formular un marco técnico estricto. Este reporte documenta la infraestructura matemática, arquitectónica y operativa para construir una habilidad de agente (Agent Skill) en Antigravity orientada a la producción determinista de vídeo vertical cinematográfico (1080×1920 a 60 fotogramas por segundo).Fundamentos Matemáticos y Físicas de Movimiento CinéticoEl movimiento cinético refinado se fundamenta en modelos dinámicos que simulan la elasticidad de los cuerpos reales en lugar de aplicar curvas cúbicas de Bézier rígidas o interpolaciones lineales mecánicas. Remotion aborda esta necesidad computando dinámicas de resortes amortiguados mediante la función matemática spring(), calculada deterministamente como una función pura del fotograma de entrada.Dinámica de Resortes y Regímenes de AmortiguamientoLa física de amortiguación en Remotion está gobernada por la ecuación diferencial ordinaria de segundo orden que describe el oscilador armónico clásico con resistencia viscosa al movimiento:$$m \frac{d^2 x}{dt^2} + c \frac{dx}{dt} + k x = 0$$En este sistema, $m$ representa la masa del objeto (mass), $c$ constituye el coeficiente de amortiguación viscosa (damping), y $k$ define la constante de rigidez elástica (stiffness). La respuesta transitoria de la curva cinemática se caracteriza por la relación de amortiguamiento adimensional $\zeta$, definida como:$$\zeta = \frac{c}{2 \sqrt{k \cdot m}}$$El valor de $\zeta$ establece el comportamiento dinámico del elemento en pantalla: un régimen sobreamortiguado ($\zeta > 1.0$) elimina cualquier rebote pero introduce una pesadez visual excesiva; un régimen subamortiguado pronunciado ($\zeta < 0.65$) provoca oscilaciones exageradas que desvirtúan la sobriedad técnica; y el amortiguamiento crítico ($\zeta = 1.0$) proporciona la desaceleración más veloz posible sin sobreimpulso.Para alcanzar la delicadeza visual característica de las interfaces técnicas de alta gama, el motor cinético opera deliberadamente en la frontera del régimen subamortiguado controlado ($\zeta \in [0.72, 0.98]$). Esto genera una desaceleración precisa, acompañada de una micro-inercia casi imperceptible que evita la sensación de detención mecánica artificial.Propósito CinéticoMasa (m)Rigidez (k)Amortiguación (c)Ratio (ζ)Comportamiento DinámicoEntrada Rápida / Acertada (Apple-style)0.80160.022.00.97Deceleración asintótica inmediata sin rebote perceptible.Flotación Contemplativa (Stripe-style)1.1085.018.50.96Desplazamiento elástico extendido con frenado suave continuo.Micro-HUD Snap (Visión Artificial)0.40240.019.50.99Fijación instantánea para componentes analíticos y retículas.Rebote Elástico Suave (Énfasis Orgánico)1.00115.015.50.72Asentamiento con sobreimpulso acotado al 3.5% de amplitud.Técnicas de Revelado Cinético y Desfase ProporcionalEl revelado por máscara (Mask Reveal) desacopla visualmente el límite geométrico del contenedor respecto al movimiento de su tipografía subordinada. La técnica confina el texto dentro de un elemento contenedor estructurado con overflow: hidden, actuando como una ventana de recorte planar. La traslación espacial interna desplaza los caracteres o bloques léxicos desde una coordenada $Y$ oculta hacia el origen relativo del contenedor.Para conseguir una animación tipográfica refinada, se prescinde de los desfases lineales idénticos entre elementos. El retraso acumulativo de aparición para el término ordinal $i$ se parametriza de forma proporcional al peso morfológico de las palabras precedentes, adaptando la cadencia del revelado a la complejidad del texto:$$\Delta t_i = \text{offset}_0 + \sum_{j=0}^{i-1} \text{clamp}\left( \lambda \cdot L(W_j), \, \delta_{\min}, \, \delta_{\max} \right)$$En esta relación, $L(W_j)$ mide la longitud en caracteres de la palabra precedente, $\lambda$ representa el factor de ponderación temporal (típicamente entre 0.35 y 0.50 fotogramas por glifo a 60 FPS), y $[\delta_{\min}, \delta_{\max}]$ impone límites cinemáticos estrictos (entre 2 y 6 cuadros a 60 FPS) para preservar la fluidez visual continua.Micro-movimientos Continuos (Continuous Drift)Uno de los principales defectos en el motion design programático es el estancamiento visual: cuando un resorte alcanza su posición de reposo, la escena se congela por completo, rompiendo la ilusión de fluidez cinematográfica. Para neutralizar esta desconexión, cada escena debe integrar una función de deriva continua o Continuous Drift que opere a lo largo de toda la ventana temporal de lectura.Esta deriva aplica una escala progresiva lenta $\Delta S \in [0.015, 0.030]$ (del 1.5% al 3.0%) o un desplazamiento sutil a lo largo del eje óptico tridimensional ($Z$), calculada analíticamente sobre el fotograma actual normalizado $u = \frac{\text{frame}}{\text{durationInFrames}}$:$$S(u) = S_0 \cdot \left(1 + \Delta S \cdot u^\gamma\right)$$$$S(u) = S_0 \cdot \left(1 + \Delta S \cdot u^\gamma\right)$$Con un exponente $\gamma \approx 1.0$ y una amplitud axial $A_z$ controlada, la composición se mantiene activa a nivel subconsciente sin interferir en la legibilidad ni inducir fatiga visual en pantallas de alta densidad de píxeles.Cinemática de Cámara Espacial y Desenfoque por ObturaciónLas transiciones espaciales unificadas tratan múltiples elementos como coordenadas pertenecientes a un espacio tridimensional continuo. En lugar de ejecutar cortes duros o transiciones estándar de deslizamiento planar, la cámara virtual realiza un desplazamiento coordenado inverso $(X_c, Y_c, Z_c)$ aplicando interpolaciones parabólicas o resortes elásticos.Para eliminar la fragmentación estroboscópica inherente a los paneos rápidos en entornos de 60 FPS, se incorpora el módulo @remotion/motion-blur mediante el componente <CameraMotionBlur>. Este componente modela el comportamiento del obturador mecánico de una cámara de cine mediante el promediado multicapa ponderado de subcuadros temporales:$$\theta_{\text{shutter}} = 180^\circ \quad \left(\text{fracción de exposición} = \frac{\theta}{360^\circ} = 0.5\right)$$Configurando un ángulo de obturación de $180^\circ$ junto con un muestreo balanceado de subfotogramas (samples={8}), se obtiene una dispersión cinemática realista sin alterar destructivamente la luminancia ni degradar la precisión vectorial de los textos e interfaces proyectadas.Cadencia Adaptativa y Sincronización AudiovisualModelado Algorítmico del Tiempo de PermanenciaEl ritmo audiovisual de alta gama evita rigideces cronológicas arbitrarias. Asignar duraciones estáticas a secuencias explicativas genera desajustes de compresión: los enunciados sintácticamente densos resultan ilegibles, mientras que los términos concisos retienen la atención en pantalla más tiempo del necesario. La cadencia visual debe determinarse algorítmicamente mediante el procesamiento de la carga cognitiva del texto.En producciones de vídeo vertical cinético, la velocidad media de absorción lectora oscila entre 190 y 230 palabras por minuto (WPM). Para modelar esta absorción con mayor fidelidad, la duración analítica de un segmento $D$ (expresada en fotogramas a una tasa $\text{FPS}$) se computa considerando el volumen léxico ($W$), la complejidad morfológica derivada de los núcleos vocálicos aproximados o sílabas ($S$), un factor de densidad conceptual ($C$) y los márgenes de animación de resorte ($t_{\text{in}}$, $t_{\text{out}}$):$$D = \text{FPS} \cdot \max\left(t_{\min}, \, \left( t_{\text{in}} + \frac{60 \cdot W}{\text{WPM}} + \beta \cdot S \cdot C + t_{\text{pause}} + t_{\text{out}} \right) \right)$$Donde $\beta \approx 0.045$ segundos por sílaba aporta una compensación biomecánica para palabras extensas, $t_{\text{pause}} \in [0.6, 0.9]$ segundos asegura un tiempo de contemplación visual tras el revelado de la última palabra, y $t_{\min}$ impone un suelo cronológico de estabilidad (habitualmente 1.8 segundos).TypeScriptexport interface ReadingCadenceOptions {
  text: string;
  fps: number;
  wordsPerMinute?: number;
  complexityModifier?: number; // 1.0 por defecto; 1.25 para terminología científica o código
}

export function computeReadingCadence({
  text,
  fps,
  wordsPerMinute = 210,
  complexityModifier = 1.0,
}: ReadingCadenceOptions): number {
  const sanitized = text.trim();
  if (!sanitized) return Math.round(1.8 * fps);

  const tokens = sanitized.split(/\s+/);
  const wordCount = tokens.length;

  // Extracción heurística de núcleos silábicos
  const syllableCount = tokens.reduce((acc, word) => {
    const cleanWord = word.toLowerCase().replace(/[^a-záéíóúüñ]/g, '');
    const vowelGroups = cleanWord.match(/[aeiouyáéíóúü]+/g);
    return acc + (vowelGroups ? vowelGroups.length : 1);
  }, 0);

  const secondsPerWord = 60 / wordsPerMinute;
  const syllableTimeCompensation = 0.045 * complexityModifier;
  const transitionOverhead = 0.55; // Ventana de resorte para entrada y salida
  const contemplationHold = 0.75; // Pausa de fijación cognitiva tras la lectura

  const calculatedSeconds =
    transitionOverhead +
    wordCount * secondsPerWord +
    syllableCount * syllableTimeCompensation +
    contemplationHold;

  const minFloorSeconds = 1.8;
  return Math.max(Math.round(minFloorSeconds * fps), Math.round(calculatedSeconds * fps));
}
Sincronización Dinámica por Transientes SonorosLa alineación entre acontecimientos gráficos y señales acústicas no puede restringirse a desplazamientos empíricos fijos. La suite @remotion/media-utils expone el método getAudioData() para acceder a los datos directos de la forma de onda decodificada en memoria (channelWaveforms: Float32Array[]).Para detectar los ataques transitorios producidos por instrumentos rítmicos o el inicio de locuciones vocales, la señal se divide en ventanas de tiempo que coinciden con los límites de cada fotograma visual de la composición. El número de muestras de audio por fotograma ($N$) depende directamente de la tasa de muestreo de audio y la frecuencia de fotogramas del vídeo:$$N = \left\lfloor \frac{\text{sampleRate}}{\text{fps}} \right\rfloor$$Para un flujo estándar a 48,000 Hz de audio y 60 FPS de vídeo, cada fotograma visual contiene exactamente $N = 800$ muestras. La potencia energética eficaz (RMS) para el fotograma ordinal $f$ se calcula como:$$RMS(f) = \sqrt{\frac{1}{N} \sum_{n=0}^{N-1} x\left[f \cdot N + n\right]^2}$$El algoritmo evalúa la derivada temporal positiva de la energía acústica ($\Delta E(f) = \max\left(0, RMS(f) - RMS(f-1)\right)$) frente a una media móvil local modulada por la varianza del pasaje sonoro. Aquellos fotogramas que superan el umbral adaptativo se registran como puntos de impacto rítmico, guiando la activación de los resortes visuales, cortes de cámara o pulsos de iluminación de la interfaz.Sistemas Gráficos ModularesLa composición programática en Remotion se estructura en componentes desacoplados pero integrados bajo dos líneas estéticas principales, concebidas para comunicar rigor técnico e ingeniería visual.Eje GráficoLínea Técnica y Minimalista (Código / Gaming)Línea Tecnológica / HUD (Visión Artificial / AI)Gama Cromática BaseCarbón absoluto (#07080A), gris pizarra (#12141A)Abisal profundo (#02040A), marino espectral (#07101E)Acentos de InterfazÁmbar técnico (#F59E0B), esmeralda fósforo (#10B981)Cian reactivo (#06B6D4), cobalto eléctrico (#2563EB)Estructura TipográficaMonoespaciada geométrica (JetBrains Mono, Berkeley Mono)Neo-grotesca neutra de precisión (Inter Display, SF Pro Display)Generación de FondoRetículas procedurales ortogonales con atenuación radial por nodoCampos de niebla atmosférica mediante Canvas y dispersión en eje ZComponentes CentralesVentanas de código interactivas, buffers de terminal, pixel art SVGBounding boxes de segmentación, vectores de rastreo ocular, píldoras HUDFirma AcústicaClicks de obturador seco, impulsos mecánicos micro-sincronizadosTransitorios piezoeléctricos de baja resonancia, senoides de subgravesArquitectura de la Agent Skill en Google AntigravityEl entorno de ejecución de agentes en Google Antigravity (agy) gestiona las capacidades mediante carpetas estructuradas que implementan la especificación estándar de habilidades (Agent Skills). Cada habilidad se ubica en el directorio del proyecto bajo .agents/skills/<nombre-skill>/ (con compatibilidad retroactiva hacia .agent/skills/) y contiene obligatoriamente un manifiesto SKILL.md.El ciclo de ejecución del agente en Antigravity se rige por un principio de divulgación progresiva (progressive disclosure) que optimiza el consumo de contexto del modelo:El descubrimiento se produce al iniciar la interacción en el entorno interactivo o CLI; el motor indexa únicamente los campos declarados en el bloque YAML frontmatter (name y description). La activación ocurre cuando el usuario introduce un requerimiento vinculado con desarrollo en Remotion, diseño cinético o renderizado programático; Antigravity inyecta entonces el contenido completo del manifiesto SKILL.md en el contexto operativo del agente. Por último, la ejecución procedimental guía al asistente para generar código TypeScript, estructurar la línea de tiempo y verificar las propiedades antes de la exportación final.Para garantizar que el código producido por el agente no genere artefactos visuales, desincronización o fallos de renderizado en compilaciones por lotes, la especificación de la habilidad impone tres directrices técnicas:El determinismo absoluto exige que toda animación se compute exclusivamente como una función pura dependiente de useCurrentFrame() y useVideoConfig(). Quedan expresamente prohibidos Math.random(), Date.now(), temporizadores en bucle (setTimeout, setInterval) o transiciones gobernadas por CSS. Las variaciones no estáticas deben derivarse de random(seed) de Remotion.La validación estricta de datos se estructura mediante esquemas de Zod expuestos como PropsSchema en cada composición. Esto garantiza que las propiedades inyectadas desde la línea de comandos o servicios externos coincidan de forma unívoca con las expectativas de tipo del componente.Por último, la modularidad de la línea de tiempo requiere que cada escena esté encapsulada dentro de contenedores <Sequence>, calculando sus fotogramas de forma relativa para permitir la edición y previsualización aislada dentro de Remotion Studio.Documento Maestro de la Skill (SKILL.md)El siguiente bloque documenta el archivo completo que debe instalarse en la ruta .agents/skills/remotion-motion-design/SKILL.md dentro de la estructura de Antigravity:name: remotion-motion-design
description: Generates high-end vertical kinetic motion graphic videos (1080x1920 at 60 FPS) in Remotion (React + TypeScript). Implements Apple Design Studio and Stripe-level art direction, physically calculated spring kinematics, content-adaptive reading cadence, HUD systems, and frame-deterministic rendering.Kinetic Video Motion Design Agent SkillYou are the Lead Programmatic Motion Graphics Engineer and Technical Art Director for vertical video generation (1080x1920 at 60 FPS) using Remotion, React, and TypeScript. Your visual standards reflect the precision of Apple Design Studio, Stripe Press, and Anthropic product announcements.1. Fundamental Determinism RulesPure Clock Dependency:Every transform, opacity, scale, color interpolation, and coordinate calculation MUST be a pure function of frame = useCurrentFrame() and videoConfig = useVideoConfig().STRICTLY FORBIDDEN: Math.random(), Date.now(), performance.now(), setTimeout(), setInterval(), requestAnimationFrame(), CSS @keyframes, and CSS transition.Use random(seed) from remotion for repeatable pseudo-random values.Durations MUST always be computed from fps (for example, Math.round(2.5 * fps)). Never use hardcoded frame numbers assuming an implicit frame rate.Spatial and Physical Modeling:Use spring() over linear interpolation for functional entrances and mechanical movements.Maintain damping ratios near critical bounds ($\zeta \in [0.72, 0.98]$). Excessive bouncing is unacceptable.Continuous visual drift is mandatory: static frames must exhibit slow, monotonic spatial evolution ($\Delta S \in [1.5\%, 3.0\%]$ or subtle Z-axis shifts) to prevent perceptual freezing.Text elements must utilize container mask reveals (overflow: hidden) with staggered per-token entrance delays proportional to word length.Schema Contracts with Zod:Every composition root must declare and export a Zod schema (PropsSchema).Validate and type all input properties, assigning coherent default values.2. Adaptive Reading Cadence AlgorithmDurations must be dynamically derived based on cognitive reading load. Apply this formula for every scene:$$\text{durationFrames} = \text{fps} \cdot \max\left(1.8, \, 0.55 + \frac{60 \cdot W}{210} + 0.045 \cdot S \cdot C + 0.75\right)$$Where $W$ is the word count, $S$ is the estimated syllable count, and $C$ is the conceptual complexity factor (1.0 for general text, 1.25 for code/technical terminology).3. Modular Visual ProfilesImplement either of the following visual directions based on user intent:Profile A: Technical Minimalist (Code / Infrastructure / Gaming)Background: Solid #08090C with procedural SVG dot matrix grid.Typography: Crisp monospace (JetBrains Mono, SF Mono) with bold geometric headlines.Accents: Warm technical amber (#F59E0B), subtle emerald (#10B981), cool slate (#94A3B8).Beats: Deterministic character-by-character code typing, terminal frame headers, crisp mechanical click SFX.Profile B: Vision AI / HUD (Cybernetics / Deep Tech / Systems)Background: Deep oceanic radial gradient (#02040A to #0A1424).Typography: Precision neo-grotesque sans-serif (Inter, SF Pro Display).Accents: Reactive cyan (#06B6D4), cobalt blue (#2563EB), high-contrast white.Beats: Thin 1px vector HUD reticles, landmark tracking corners, bounding boxes, low-resonance piezoelectric cues.4. Internal Workflow & Prompt Translation PatternWhen receiving an input prompt to generate a kinetic video:Analyze and Segment: Break down the input brief into discrete, logically continuous scenes.Compute Timeline: Apply computeReadingCadence() to determine individual scene frame lengths and total composition duration.Draft Schema: Define a comprehensive Zod contract for scenes, assets, and color overrides.Implement Components: Write modular TypeScript components under src/components/ ensuring overflow: hidden mask reveals and spring mechanics.Assemble Composition: Structure src/Composition.tsx using <Sequence> blocks with proper from and durationInFrames parameters.Verify Determinism: Ensure no side-effect clocks or unseeded random values exist.Biblioteca de Componentes Core (React / TypeScript)A continuación se presentan las implementaciones de los tres componentes esenciales de la arquitectura, diseñados con tipado estricto y optimizados para el ciclo de renderizado de Remotion.1. Componente de Texto Cinético con Revelado por Máscara y Deriva Continua (KineticText.tsx)Este componente recibe una cadena de texto, la divide en unidades léxicas individuales y anima su entrada aplicando una ventana de recorte planar (overflow: hidden). La física de entrada se gobierna mediante un resorte amortiguado de deceleración suave, incorporando además un micro-movimiento analítico de escala continua durante el resto de la exposición.TypeScriptimport React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface KineticTextProps {
  text: string;
  startFrame?: number;
  color?: string;
  fontSize?: number;
  fontWeight?: number | string;
  fontFamily?: string;
  staggerBaseDelay?: number;
  enableDrift?: boolean;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  startFrame = 0,
  color = '#FFFFFF',
  fontSize = 68,
  fontWeight = 600,
  fontFamily = 'Inter, -apple-system, sans-serif',
  staggerBaseDelay = 2.5,
  enableDrift = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const words = text.trim().split(/\s+/).filter(Boolean);
  const relativeFrame = frame - startFrame;

  // Cálculo de micro-deriva continua a lo largo de la escena
  const driftScale = enableDrift
    ? interpolate(relativeFrame, [0, durationInFrames], [1.0, 1.025], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1.0;

  // Cálculo acumulativo de retraso dependiente de la longitud léxica
  let accumulatedDelay = 0;
  const wordDelays = words.map((word) => {
    const currentDelay = accumulatedDelay;
    const proportionalOffset = Math.min(5, Math.max(2, word.length * 0.4));
    accumulatedDelay += staggerBaseDelay + proportionalOffset;
    return currentDelay;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: `${fontSize * 0.2}px`,
        columnGap: `${fontSize * 0.28}px`,
        maxWidth: '920px',
        margin: '0 auto',
        transform: `scale(${driftScale})`,
        transformOrigin: 'center center',
      }}
    >
      {words.map((word, index) => {
        const wordDelay = wordDelays[index];
        const wordFrame = Math.max(0, relativeFrame - wordDelay);

        // Resorte calibrado para entrada asintótica con amortiguamiento casi crítico (Apple-style)
        const entranceSpring = spring({
          frame: wordFrame,
          fps,
          config: {
            damping: 22,
            stiffness: 160,
            mass: 0.8,
          },
        });

        // Traslación vertical contenida dentro de la máscara de recorte
        const translateY = interpolate(entranceSpring, [0, 1], [115, 0]);
        const opacity = interpolate(entranceSpring, [0, 0.4, 1], [0, 1, 1]);
        const letterSpacing = interpolate(entranceSpring, [0, 1], [0.06, -0.015]);

        return (
          <span
            key={`word-${index}-${word}`}
            style={{
              overflow: 'hidden',
              display: 'inline-block',
              lineHeight: 1.18,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${translateY}%)`,
                opacity,
                color,
                fontSize: `${fontSize}px`,
                fontWeight,
                fontFamily,
                letterSpacing: `${letterSpacing}em`,
                willChange: 'transform, opacity',
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
};
2. Contenedor de Cámara con Inercia y Desenfoque Físico (CameraRig.tsx)El contenedor gestiona el desplazamiento de los elementos a través de un sistema de coordenadas espaciales tridimensionales. Utiliza el componente <CameraMotionBlur> de @remotion/motion-blur para promediar el desplazamiento rápido y atenuar saltos entre fotogramas a 60 FPS.TypeScriptimport React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CameraMotionBlur } from '@remotion/motion-blur';

export interface CameraKeyframe {
  frame: number;
  x: number;
  y: number;
  z: number;
  rotation?: number;
}

export interface CameraRigProps {
  children: React.ReactNode;
  keyframes: CameraKeyframe[];
  enableMotionBlur?: boolean;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  keyframes,
  enableMotionBlur = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Asegura orden ascendente de fotogramas clave
  const sortedKeys = [...keyframes].sort((a, b) => a.frame - b.frame);
  const frames = sortedKeys.map((k) => k.frame);
  const xCoords = sortedKeys.map((k) => k.x);
  const yCoords = sortedKeys.map((k) => k.y);
  const zCoords = sortedKeys.map((k) => k.z);
  const rotations = sortedKeys.map((k) => k.rotation ?? 0);

  // Interpolación de coordenadas cartesianas con contención clamped
  const currentX = interpolate(frame, frames, xCoords, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentY = interpolate(frame, frames, yCoords, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentZ = interpolate(frame, frames, zCoords, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentRot = interpolate(frame, frames, rotations, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Micro-oscilación continua en el plano Z para sostener la presencia espacial
  const driftZ = interpolate(
    Math.sin((frame / fps) * (Math.PI / 3)),
    [-1, 1],
    [-6, 6]
  );

  const perspectiveDistance = 1200;
  const totalZ = currentZ + driftZ;
  const scale = (perspectiveDistance + totalZ) / perspectiveDistance;

  const sceneContent = (
    <AbsoluteFill
      style={{
        transformOrigin: '540px 960px',
        transform: `
          perspective(${perspectiveDistance}px)
          translate3d(${-currentX}px, ${-currentY}px, 0px)
          scale(${Math.max(0.05, scale)})
          rotate(${currentRot}deg)
        `,
        willChange: 'transform',
      }}
    >
      {children}
    </AbsoluteFill>
  );

  if (!enableMotionBlur) {
    return <AbsoluteFill>{sceneContent}</AbsoluteFill>;
  }

  return (
    <AbsoluteFill>
      <CameraMotionBlur samples={8} shutterAngle={180}>
        <AbsoluteFill>{sceneContent}</AbsoluteFill>
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};
3. Capa de Audio para Efectos Sincronizados (AudioTriggerLayer.tsx)Este módulo administra la ejecución de micro-efectos sonoros en marcas de tiempo específicas utilizando el elemento <Audio> de @remotion/media. La inclusión de la propiedad premountFor previene fallos o micro-retrasos en la decodificación durante el renderizado concurrente multiproceso.TypeScriptimport React from 'react';
import { Audio } from '@remotion/media';
import { staticFile } from 'remotion';

export interface SoundCue {
  frame: number;
  file: string;
  volume?: number;
  playbackRate?: number;
}

export interface AudioTriggerLayerProps {
  cues: SoundCue[];
}

export const AudioTriggerLayer: React.FC<AudioTriggerLayerProps> = ({ cues }) => {
  return (
    <>
      {cues.map((cue, index) => (
        <Audio
          key={`cue-${cue.file}-${cue.frame}-${index}`}
          src={staticFile(cue.file)}
          from={cue.frame}
          volume={cue.volume ?? 0.8}
          playbackRate={cue.playbackRate ?? 1.0}
          premountFor={15} // Precarga de buffer en cuadros para evitar desalineación acústica
        />
      ))}
    </>
  );
};
Flujo de Trabajo Operativo y Parámetros de RenderizadoConfiguración del Entorno de DesarrolloPara establecer la arquitectura de compilación dentro del espacio de trabajo donde opera Antigravity, se ejecutan las siguientes instrucciones en terminal:Bash# 1. Creación del proyecto base sin dependencias superfluas
npm create video@latest -- --template blank-typescript antigravity-remotion
cd antigravity-remotion

# 2. Instalación de paquetes oficiales de Remotion y utilidades matemáticas
npm install @remotion/media @remotion/media-utils @remotion/motion-blur @remotion/noise zod

# 3. Instalación de paquetes de estilo y soporte estructural
npm install clsx tailwind-merge

# 4. Creación de la estructura para la Agent Skill en el espacio de trabajo
mkdir -p .agents/skills/remotion-motion-design
# El contenido del archivo SKILL.md documentado previamente se ubica en este directorio

# 5. Inicialización de Remotion Studio interactivo a 60 FPS
npm start
Parámetros de Renderizado Optimizado para Vídeo VerticalLa generación de piezas verticales en resolución 1080×1920 a 60 FPS impone una carga de renderizado que exige parámetros específicos de codificación. Para evitar desbordamientos de memoria (OOM exceptions) y optimizar el rendimiento de la GPU en entornos con aceleración por hardware o instancias de cómputo en la nube, la compilación de producción debe ejecutarse mediante la siguiente configuración:Bashnpx remotion render src/index.ts MainComposition out/kinetic-render.mp4 \
  --gl=angle \
  --chrome-mode=headless-shell \
  --concurrency=75% \
  --codec=h264 \
  --audio-codec=aac \
  --crf=16 \
  --pixel-format=yuv420p \
  --scale=1 \
  --enable-multiprocess-on-linux \
  --log=info
A continuación se analizan los fundamentos técnicos que sustentan la selección de cada bandera de la interfaz de línea de comandos (CLI):Parámetro CLIValor AsignadoFundamento Técnico--glangle (o swangle en entornos headless puros sin GPU dedicada)Habilita la traducción directa de WebGL a DirectX/Metal/Vulkan, eliminando fugas de memoria en matrices CSS 3D extensas.--chrome-modeheadless-shell[cite: 21]Utiliza el binario ultraligero de Chromium, reduciendo significativamente la huella de memoria RAM por pestaña de renderizado.--concurrency75%[cite: 22]Maximiza el paralelismo de extracción de fotogramas sin saturar los subprocesos del procesador asignados a FFmpeg.--crf16[cite: 21, 23]Modo de tasa constante que garantiza la conservación de tipografías nítidas y líneas HUD sin artefactos de compresión.--pixel-formatyuv420p[cite: 21]Proporciona compatibilidad estricta con motores de decodificación móvil acelerada en iOS y Android.--enable-multiprocess-on-linuxtrue[cite: 21, 22]Desactiva el proceso único forzado en entornos Linux de integración continua, acelerando la exportación multihilo.ConclusionesLa integración de una Agent Skill en Google Antigravity para la autoría programática de vídeo en Remotion traslada los principios del desarrollo de software formal al motion design. Al sustituir los flujos tradicionales por un marco fundamentado en el determinismo temporal estricto, la física de osciladores armónicos amortiguados ($\zeta \approx 0.72 - 0.98$) y la asignación paramétrica del tiempo de lectura basada en modelos léxicos, el sistema produce piezas cinéticas verticales a 60 FPS con un nivel de coherencia y dinamismo equivalente a los estándares visuales de Apple y Stripe.La modularización de componentes atómicos (KineticText, CameraRig y AudioTriggerLayer) junto con la validación de esquemas Zod proporciona a los agentes autónomos de Antigravity un marco de ejecución fiable. Esta arquitectura elimina la latencia de ajuste manual y previene fallos de desincronización, estableciendo un estándar escalable para la producción automatizada de vídeo vertical de alta gama.