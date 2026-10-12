import { Composition } from "remotion";
import { FastKineticReel } from "./Composition";
import { Reel } from "./Reel";
import { geminiNivel1Data } from "./data/geminiNivel1";
import { geminiNivel2Data } from "./data/geminiNivel2";
import { geminiNivel3Data } from "./data/geminiNivel3";
import { stackSecretoData } from "./data/stackSecreto";
import { tokensProData } from "./data/tokensPro";
import { ReelPropsSchema, type ReelProps } from "./lib/schema";
import { buildTimeline, totalDuration } from "./lib/timeline";

/**
 * Raíz de composiciones de Remotion para Santi.Dev (1080×1920 @ 60 FPS).
 *  - GeminiNivel1Reel → Nivel 1 Básico (Sin configuración previa, multimodal, Live).
 *  - GeminiNivel2Reel → Nivel 2 Intermedio (Integración Workspace, Deep Research, Canvas).
 *  - GeminiNivel3Reel → Nivel 3 Avanzado (Gems, Acciones programadas, Workspace Studio).
 *  - StackSecretoReel → Contenido del primer video (Trilogía Parte 1: Stack Secreto).
 *  - TokensProReel    → Contenido de ingeniería agéntica y optimización de contexto.
 *  - KineticReel      → Prueba cinética inicial.
 */
export const RemotionRoot = () => {
  return (
    <>
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
    </>
  );
};
