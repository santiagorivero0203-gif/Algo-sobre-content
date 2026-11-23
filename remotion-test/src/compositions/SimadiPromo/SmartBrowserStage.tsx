/**
 * =====================================================================
 * ESCENARIO INTELIGENTE DE NAVEGADOR GUIADO POR MANIFEST · SIMADI V2
 * =====================================================================
 * Mejoras V2 de legibilidad y fluidez:
 *  - Zoom sutil (`1.025×`) centrado horizontalmente para conservar al 100%
 *    incluso el logotipo superior izquierdo, enunciados y bordes de tarjetas.
 *  - Transfiere el rótulo de enfoque a la barra superior de `CardFrame`
 *    eliminando etiquetas flotantes que pudieran tapar textos de la app.
 *  - Soporta clips `.webm` vivos en Config, Simulacro y Guías de Estudio.
 * =====================================================================
 */
import React from "react";
import { Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CardFrame } from "./BaseWrappers";
import type { CaptureManifest, ClipMeta, FormatMetrics, NormalizedBox, SceneSpec, SimadiThemeJson } from "./types";

interface SmartBrowserStageProps {
  scene: SceneSpec;
  theme: SimadiThemeJson;
  manifest: CaptureManifest;
  metrics: FormatMetrics;
  focusLabel: string;
  secondaryLabel?: string;
}

const SCENE_TO_SCREEN: Record<string, string> = {
  s3_demo_config: "config",
  s4_demo_simulacro: "exam",
  s5_demo_diagnostico: "results",
  g3_demo_guias: "guides",
  g4_demo_temas: "config",
  g5_demo_justificacion: "results",
};

const SCENE_TO_CLIP_KEY: Record<string, string> = {
  s3_demo_config: "config",
  s4_demo_simulacro: "exam",
  g3_demo_guias: "guides",
};

const DEFAULT_BOX: NormalizedBox = {
  x: 0.15,
  y: 0.25,
  width: 0.7,
  height: 0.4,
  centerX: 0.5,
  centerY: 0.45,
};

/**
 * Calcula el desplazamiento vertical de cámara dentro de límites seguros para no mostrar
 * bordes vacíos, manteniendo `tx = 0` para preservar intacto todo el ancho de la app.
 */
function computeClampedCamera(
  box: NormalizedBox,
  scale: number,
  _width: number,
  height: number
): { tx: number; ty: number } {
  const maxTy = (height * (scale - 1)) / 2;
  const rawTy = (0.5 - box.centerY) * height * scale;
  return {
    tx: 0,
    ty: Math.max(-maxTy, Math.min(maxTy, rawTy)),
  };
}

export const SmartBrowserStage: React.FC<SmartBrowserStageProps> = ({
  scene,
  theme,
  manifest,
  metrics,
  focusLabel,
  secondaryLabel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const screenKey = SCENE_TO_SCREEN[scene.id] || "config";
  const screenElements = manifest.elements[screenKey] || {};
  const primaryBox: NormalizedBox =
    (scene.focusTarget && screenElements[scene.focusTarget]) || DEFAULT_BOX;
  const secondaryBox: NormalizedBox | null =
    (scene.secondaryTarget && screenElements[scene.secondaryTarget]) || null;

  const clipKey = scene.videoClip ? SCENE_TO_CLIP_KEY[scene.id] : undefined;
  const clipMeta: ClipMeta | undefined = clipKey ? manifest.clips[clipKey] : undefined;

  const zoomInPrimary = spring({
    frame: frame - 32,
    fps,
    config: { damping: 22, stiffness: 100, mass: 0.9 },
  });

  const panToSecondary = secondaryBox
    ? spring({
        frame: frame - Math.round(scene.durationFrames * 0.52),
        fps,
        config: { damping: 20, stiffness: 95, mass: 0.95 },
      })
    : 0;

  // Zoom sutil (1.025x) + highlight de foco para preservar el 100% del contexto y header sin recorte
  const targetScale = 1.025;
  const currentScale = 1 + zoomInPrimary * (targetScale - 1);

  const camPrimary = computeClampedCamera(primaryBox, currentScale, metrics.browserWidth, metrics.browserHeight);
  const camSecondary = secondaryBox
    ? computeClampedCamera(secondaryBox, currentScale, metrics.browserWidth, metrics.browserHeight)
    : camPrimary;

  const tx = camPrimary.tx + (camSecondary.tx - camPrimary.tx) * panToSecondary;
  const ty = camPrimary.ty + (camSecondary.ty - camPrimary.ty) * panToSecondary;

  const activeBoxRaw = panToSecondary > 0.5 && secondaryBox ? secondaryBox : primaryBox;
  const ringW = Math.max(activeBoxRaw.width, 0.145);
  const ringH = Math.max(activeBoxRaw.height, 0.068);
  const activeBox: NormalizedBox = {
    x: Math.max(0.01, Math.min(1 - ringW, activeBoxRaw.centerX - ringW / 2)),
    y: Math.max(0.01, Math.min(1 - ringH, activeBoxRaw.centerY - ringH / 2)),
    width: ringW,
    height: ringH,
    centerX: activeBoxRaw.centerX,
    centerY: activeBoxRaw.centerY,
  };

  const activeLabel = panToSecondary > 0.5 && secondaryLabel ? secondaryLabel : focusLabel;
  const ringOpacity = zoomInPrimary;
  const ringPulse = 1 + Math.sin(frame / 10) * 0.025;

  const clipSafeFrames = clipMeta ? Math.max(30, clipMeta.durationFrames60 - 6) : 0;
  const videoOpacity =
    clipMeta && clipSafeFrames > 24
      ? interpolate(frame, [clipSafeFrames - 18, clipSafeFrames], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <CardFrame theme={theme} metrics={metrics} calloutLabel={activeLabel}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformOrigin: "50% 50%",
          transform: `translate(${tx}px, ${ty}px) scale(${currentScale})`,
        }}
      >
        {scene.captureId ? (
          <Img
            src={staticFile(`captures/simadi/${scene.captureId}`)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : null}

        {scene.videoClip && clipMeta && clipSafeFrames > 15 && frame < clipSafeFrames ? (
          <Sequence durationInFrames={clipSafeFrames}>
            <div style={{ position: "absolute", inset: 0, opacity: videoOpacity }}>
              <OffthreadVideo
                src={staticFile(`captures/simadi/${scene.videoClip}`)}
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </Sequence>
        ) : null}

        {/* Anillo vector limpio sin etiquetas flotantes que tapen la interfaz */}
        <div
          style={{
            position: "absolute",
            left: `${activeBox.x * 100}%`,
            top: `${activeBox.y * 100}%`,
            width: `${activeBox.width * 100}%`,
            height: `${activeBox.height * 100}%`,
            borderRadius: 14,
            border: "3px solid #38BDF8",
            boxShadow: "0 0 0 5px rgba(56, 189, 248, 0.22), 0 12px 28px rgba(15, 82, 186, 0.30)",
            opacity: ringOpacity,
            transform: `scale(${ringPulse})`,
            pointerEvents: "none",
          }}
        />
      </div>
    </CardFrame>
  );
};
