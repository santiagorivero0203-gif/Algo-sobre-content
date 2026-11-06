import { Composition } from "remotion";
import { FastKineticReel } from "./Composition";
import { Reel } from "./Reel";
import { geminiNivel1Data } from "./data/geminiNivel1";
import { geminiNivel2Data } from "./data/geminiNivel2";
import { geminiNivel3Data } from "./data/geminiNivel3";
import { stackSecretoData } from "./data/stackSecreto";
import { tokensProData } from "./data/tokensPro";
import { mafeTeoriaDisenoData } from "./data/mafeTeoriaDiseno";
import { PyQuestEp01 } from "./pyquest/episodes/ep01/Ep01";
import { PyQuestEp02 } from "./pyquest/episodes/ep02/Ep02";
import { PyQuestEp03 } from "./pyquest/episodes/ep03/Ep03";
import { PyQuestEp04 } from "./pyquest/episodes/ep04/Ep04";
import { ReelPropsSchema, type ReelProps } from "./lib/schema";
import { buildTimeline, totalDuration } from "./lib/timeline";

/**
 * Raíz de composiciones de Remotion para Santi.Dev (1080×1920 @ 60 FPS).
 *  - MafeTeoriaDisenoReel → Teoría del Diseño, Semiótica y Usabilidad (UCAB).
 *  - GeminiNivel1Reel → Nivel 1 Básico (Sin configuración previa, multimodal, Live).
 *  - GeminiNivel2Reel → Nivel 2 Intermedio (Integración Workspace, Deep Research, Canvas).
 *  - GeminiNivel3Reel → Nivel 3 Avanzado (Gemini Spark, Acciones programadas, Workspace Studio).
 *  - StackSecretoReel → Contenido del primer video (Trilogía Parte 1: Stack Secreto).
 *  - TokensProReel    → Contenido de ingeniería agéntica y optimización de contexto.
 *  - KineticReel      → Prueba cinética inicial.
 */
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MafeTeoriaDisenoReel"
        component={Reel}
        schema={ReelPropsSchema}
        defaultProps={mafeTeoriaDisenoData}
        durationInFrames={1060}
        fps={60}
        width={1080}
        height={1920}
        calculateMetadata={({ props }: { props: ReelProps }) => ({
          durationInFrames: totalDuration(buildTimeline(props.scenes, 60)),
        })}
      />
      <Composition
        id="GeminiNivel1Reel"
        component={Reel}
        schema={ReelPropsSchema}
        defaultProps={geminiNivel1Data}
        durationInFrames={1035}
        fps={60}
        width={1080}
        height={1920}
        calculateMetadata={({ props }: { props: ReelProps }) => ({
          durationInFrames: totalDuration(buildTimeline(props.scenes, 60)),
        })}
      />
      <Composition
        id="GeminiNivel2Reel"
        component={Reel}
        schema={ReelPropsSchema}
        defaultProps={geminiNivel2Data}
        durationInFrames={1045}
        fps={60}
        width={1080}
        height={1920}
        calculateMetadata={({ props }: { props: ReelProps }) => ({
          durationInFrames: totalDuration(buildTimeline(props.scenes, 60)),
        })}
      />
      <Composition
        id="GeminiNivel3Reel"
        component={Reel}
        schema={ReelPropsSchema}
        defaultProps={geminiNivel3Data}
        durationInFrames={1045}
        fps={60}
        width={1080}
        height={1920}
        calculateMetadata={({ props }: { props: ReelProps }) => ({
          durationInFrames: totalDuration(buildTimeline(props.scenes, 60)),
        })}
      />
      <Composition
        id="StackSecretoReel"
        component={Reel}
        schema={ReelPropsSchema}
        defaultProps={stackSecretoData}
        durationInFrames={1060}
        fps={60}
        width={1080}
        height={1920}
        calculateMetadata={({ props }: { props: ReelProps }) => ({
          durationInFrames: totalDuration(buildTimeline(props.scenes, 60)),
        })}
      />
      <Composition
        id="TokensProReel"
        component={Reel}
        schema={ReelPropsSchema}
        defaultProps={tokensProData}
        durationInFrames={1060}
        fps={60}
        width={1080}
        height={1920}
        calculateMetadata={({ props }: { props: ReelProps }) => ({
          durationInFrames: totalDuration(buildTimeline(props.scenes, 60)),
        })}
      />
      <Composition
        id="KineticReel"
        component={FastKineticReel}
        durationInFrames={180}
        fps={60}
        width={1080}
        height={1920}
      />
      {/* Nueva saga educativa: Python desde Cero · PyQuest (72s @ 60 FPS) */}
      <Composition
        id="PyQuestEp01Reel"
        component={PyQuestEp01}
        durationInFrames={4320}
        fps={60}
        width={1080}
        height={1920}
      />
      {/* Episodio 2: Variables y Tipos de Datos: El ADN de tu Héroe (75s @ 60 FPS = 4500 frames) */}
      <Composition
        id="PyQuestEp02Reel"
        component={PyQuestEp02}
        durationInFrames={4500}
        fps={60}
        width={1080}
        height={1920}
      />
      {/* Episodio 3: Condicionales y Combate: Las Reglas de la Vida (74s @ 60 FPS = 4440 frames) */}
      <Composition
        id="PyQuestEp03Reel"
        component={PyQuestEp03}
        durationInFrames={4440}
        fps={60}
        width={1080}
        height={1920}
      />
      {/* Episodio 4: Listas y Diccionarios: El Inventario del Héroe (74s @ 60 FPS = 4440 frames) */}
      <Composition
        id="PyQuestEp04Reel"
        component={PyQuestEp04}
        durationInFrames={4440}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
