/**
 * =====================================================================
 * SIMADI PROMO ENGINE V2 · MOTOR MODULAR MULTI-VIDEO (60 FPS)
 * =====================================================================
 * Optimizado para fluidez y eficiencia de render:
 *  - Elimina `CameraMotionBlur` multi-muestra sobre `<OffthreadVideo>` para
 *    lograr render ~4× más rápido y transiciones suaves con `spring()`.
 *  - Orquesta ambos videos de Simadi desde el mismo motor reutilizable:
 *      1) `SimadiPromo` / `SimadiPromoIG`: Simulacro Cronometrado (34s).
 *      2) `SimadiGuiasPromo` / `SimadiGuiasPromoIG`: Guías y Repaso (30s).
 *  - Sincroniza BGM ambiental (`tech_ambient_bed.mp3`) + SFX del manifest.
 * =====================================================================
 */
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Backdrop } from "../../components/Backdrop";
import type { TimelineEntry } from "../../lib/timeline";
import { PyQuestSfx, type SfxName } from "../../pyquest/sfx";
import promoSpecRaw from "./promo-spec.json";
import promoGuiasRaw from "./promo-spec-guias.json";
import themeRaw from "../../../public/captures/simadi/theme.json";
import manifestRaw from "../../../public/captures/simadi/manifest.json";
import { BottomBand, GridPattern } from "./BaseWrappers";
import { SimadiSceneRenderer } from "./Scenes";
import {
  buildSimadiBrandTheme,
  getFormatMetrics,
  type CaptureManifest,
  type PromoFormat,
  type PromoSpec,
  type SimadiThemeJson,
} from "./types";

const simadiSimulacroSpec = promoSpecRaw as PromoSpec;
const simadiGuiasSpec = promoGuiasRaw as PromoSpec;
const simadiTheme = themeRaw as SimadiThemeJson;
const captureManifest = manifestRaw as CaptureManifest;

export const SIMADI_FPS = simadiSimulacroSpec.fps;
export const SIMADI_DURATION_FRAMES = simadiSimulacroSpec.totalDurationFrames;
export const SIMADI_GUIAS_DURATION_FRAMES = simadiGuiasSpec.totalDurationFrames;

const VALID_SFX: SfxName[] = [
  "chime",
  "click-soft",
  "click",
  "error",
  "impact-bass-1",
  "impact-bass-2",
  "key-press",
  "pop",
  "sparkle",
  "typing",
  "whoosh-short",
];

/**
 * Mapa local de SFX adicionales existentes en `public/sfx/` no expuestos en `PyQuestSfx`,
 * evitando modificar `src/pyquest/sfx.tsx` y manteniendo aislamiento total del proyecto.
 */
const EXTRA_SFX_FILES: Record<string, string> = {
  "whoosh-cinematic": "sfx/whoosh-cinematic.mp3",
  ping: "sfx/ping.mp3",
  notification: "sfx/notification.mp3",
  riser: "sfx/riser.mp3",
  whoosh: "sfx/whoosh.mp3",
};

/**
 * Motor modular parametrizable por `spec` y `format` (`tiktok` 9:16 o `instagram` 4:5).
 */
const SimadiPromoEngine: React.FC<{ spec: PromoSpec; format: PromoFormat }> = ({
  spec,
  format,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  const metrics = getFormatMetrics(format);
  const brandTheme = buildSimadiBrandTheme(simadiTheme);

  const timeline: TimelineEntry[] = spec.scenes.map((s) => ({
    from: s.fromFrame,
    duration: s.durationFrames,
    vo: s.copy,
    badge: s.badge,
  }));

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#040A18" }}>
      {/* 1. Atmósfera viva reutilizada del proyecto */}
      <Backdrop
        theme={brandTheme}
        kicker="SIMADI · T.D.I."
        timeline={timeline}
        total={durationInFrames}
        showVoiceover={false}
      />

      {/* 2. Patrón técnico blueprint con deriva suave */}
      <GridPattern width={metrics.width} height={metrics.height} />

      {/* 3. Secuencias de escenas con físicas nativas spring (cero CameraMotionBlur pesado) */}
      {spec.scenes.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.fromFrame}
          durationInFrames={scene.durationFrames}
          premountFor={fps}
        >
          <SimadiSceneRenderer
            scene={scene}
            theme={simadiTheme}
            manifest={captureManifest}
            metrics={metrics}
          />
        </Sequence>
      ))}

      {/* 4. Banda inferior persistente respetando zonas seguras */}
      <BottomBand scenes={spec.scenes} metrics={metrics} />

      {/* 5. Cama musical ambiental con fade-in y fade-out */}
      <Audio
        src={staticFile(spec.assets.bgm)}
        volume={(f) => {
          const fadeIn = Math.min(1, f / (fps * 0.7));
          const fadeOut = Math.min(1, (durationInFrames - f) / (fps * 0.9));
          return 0.08 * Math.max(0, fadeIn) * Math.max(0, fadeOut);
        }}
        loop
      />

      {/* 6. Capa de audio SFX determinista (base + catálogo extendido) + clics reales del manifest */}
      {spec.scenes.map((scene) =>
        scene.sfx.map((fx, i) => {
          const absFrame = Math.min(durationInFrames - 5, scene.fromFrame + fx.localFrame);
          const extraFile = EXTRA_SFX_FILES[fx.name];
          if (extraFile) {
            return (
              <Sequence key={`${scene.id}-sfx-${i}`} from={absFrame}>
                <Audio src={staticFile(extraFile)} volume={fx.volume ?? 0.34} />
              </Sequence>
            );
          }
          if (VALID_SFX.indexOf(fx.name as SfxName) === -1) return null;
          return (
            <PyQuestSfx
              key={`${scene.id}-sfx-${i}`}
              name={fx.name as SfxName}
              from={absFrame}
              volume={fx.volume ?? 0.34}
            />
          );
        })
      )}

      {captureManifest.interactions.map((ev) => {
        const scene = spec.scenes.filter((s) => s.videoClip === ev.clipId)[0];
        if (!scene || ev.clipFrame60 >= scene.durationFrames) return null;
        return (
          <PyQuestSfx
            key={`manifest-click-${spec.slug}-${ev.id}`}
            name="click"
            from={scene.fromFrame + ev.clipFrame60}
            volume={0.42}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Video 1 (Simulacro Cronometrado) · TikTok / Reels / Shorts (1080×1920 @ 60 FPS). */
export const SimadiPromo: React.FC = () => (
  <SimadiPromoEngine spec={simadiSimulacroSpec} format="tiktok" />
);

/** Video 1 (Simulacro Cronometrado) · Instagram Feed (1080×1350 @ 60 FPS). */
export const SimadiPromoIG: React.FC = () => (
  <SimadiPromoEngine spec={simadiSimulacroSpec} format="instagram" />
);

/** Video 2 (Guías y Apoyo Preuniversitario) · TikTok / Reels / Shorts (1080×1920 @ 60 FPS). */
export const SimadiGuiasPromo: React.FC = () => (
  <SimadiPromoEngine spec={simadiGuiasSpec} format="tiktok" />
);

/** Video 2 (Guías y Apoyo Preuniversitario) · Instagram Feed (1080×1350 @ 60 FPS). */
export const SimadiGuiasPromoIG: React.FC = () => (
  <SimadiPromoEngine spec={simadiGuiasSpec} format="instagram" />
);

export {
  SIMADI_APERTURA_DURATION_FRAMES,
  SIMADI_APERTURA_FPS,
  SimadiApertura,
  SimadiAperturaIG,
} from "./SimadiApertura";
