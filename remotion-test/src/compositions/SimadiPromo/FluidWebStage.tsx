/**
 * =====================================================================
 * ESCENARIO WEB FLUIDO PROTAGONISTA · SIMADI V3
 * =====================================================================
 * Muestra la captura vertical responsive HD (`1080×1620`) de Simulación
 * Simadi directamente sobre el lienzo claro sin encerrarla en una ventana
 * oscura de navegador. Ocupa protagonismo real en pantalla y enlaza el
 * zoom desde el reloj hasta el diagnóstico con `OffthreadVideo`.
 * =====================================================================
 */
import React from "react";
import { Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import verticalManifestRaw from "../../../public/captures/simadi/vertical/manifest-vertical.json";
import type { DaylightMetrics } from "./DaylightTheme";

interface VerticalManifest {
  outputSize: { width: number; height: number };
  clip: { file: string; durationFrames60: number };
  stills: { exam: { file: string }; results: { file: string } };
  interactions: Array<{ id: string; clipFrame60: number }>;
}

const verticalManifest = verticalManifestRaw as VerticalManifest;

export const VERTICAL_CLIP_START_FROM = 60; // Salta 1.0s inicial para ir directo al flujo activo
export const VERTICAL_CLIP_PLAY_FRAMES = 390; // 6.5s de demo viva antes de pasar a resultados

/**
 * Calcula los frames locales del puente donde ocurren los clics reales del clip vertical.
 */
export function getVerticalBridgeClickLocalFrames(clipDelayFrames: number): number[] {
  return verticalManifest.interactions
    .map((ev) => clipDelayFrames + (ev.clipFrame60 - VERTICAL_CLIP_START_FROM))
    .filter((f) => f > clipDelayFrames && f < clipDelayFrames + VERTICAL_CLIP_PLAY_FRAMES - 6);
}

/**
 * Renderiza el simulador vertical vivo seguido de la pantalla de resultados real,
 * fundido con sombra suave de papel sobre `#F7F8FA`.
 */
export const FluidWebStage: React.FC<{
  metrics: DaylightMetrics;
  totalSceneFrames: number;
  clipDelayFrames?: number;
}> = ({ metrics, totalSceneFrames, clipDelayFrames = 26 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrada con transición tipo zoom desde el ícono del cronómetro directo a la app
  const zoomEnter = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.95 },
  });
  const enterScale = 1.24 - zoomEnter * 0.24;
  const enterY = (1 - zoomEnter) * 44;

  // Paso a la pantalla de resultados en el tramo final del puente
  const resultsStartFrame = clipDelayFrames + VERTICAL_CLIP_PLAY_FRAMES - 24;
  const resultsReveal = interpolate(frame, [resultsStartFrame, resultsStartFrame + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const clipFadeOut = 1 - resultsReveal;

  // Dimensiones ajustadas exactamente al ratio 2:3 (1080×1620) dentro del espacio útil
  const targetH = metrics.webStageMaxHeight;
  const targetW = Math.min(metrics.webStageMaxWidth, Math.round((targetH * 2) / 3));
  const stageH = Math.round((targetW * 3) / 2);

  // Micro-zoom sutil hacia el porcentaje real cuando aparece Reporte de Evaluación
  const resultsScale = 1 + interpolate(frame, [resultsStartFrame + 24, totalSceneFrames], [0, 0.035], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: targetW,
        height: stageH,
        borderRadius: 20,
        overflow: "hidden",
        background: "#FFFFFF",
        border: `1px solid rgba(15, 23, 42, 0.08)`,
        boxShadow: "0 30px 90px rgba(15, 23, 42, 0.13), 0 8px 24px rgba(15, 82, 186, 0.08)",
        opacity: zoomEnter,
        transform: `translateY(${enterY}px) scale(${enterScale})`,
        transformOrigin: "50% 42%",
      }}
    >
      {/* Capa base estática mientras entra el video */}
      <Img
        src={staticFile(`captures/simadi/vertical/${verticalManifest.stills.exam.file}`)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* Video vertical vivo de Simulación Simadi */}
      {frame >= clipDelayFrames && frame < resultsStartFrame + 26 && (
        <Sequence from={clipDelayFrames} durationInFrames={VERTICAL_CLIP_PLAY_FRAMES + 4}>
          <div style={{ position: "absolute", inset: 0, opacity: clipFadeOut }}>
            <OffthreadVideo
              src={staticFile(`captures/simadi/vertical/${verticalManifest.clip.file}`)}
              startFrom={VERTICAL_CLIP_START_FROM}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </Sequence>
      )}

      {/* Transición fluida hacia la pantalla real de resultados y diagnóstico (100% limpia sin barras superpuestas) */}
      {resultsReveal > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: resultsReveal,
            transform: `scale(${resultsScale})`,
            transformOrigin: "50% 42%",
          }}
        >
          <Img
            src={staticFile(`captures/simadi/vertical/${verticalManifest.stills.results.file}`)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      )}
    </div>
  );
};

