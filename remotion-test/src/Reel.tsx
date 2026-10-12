/**
 * =====================================================================
 * Reel · compositor genérico dirigido por datos
 * =====================================================================
 * Recibe `ReelProps` (validadas por Zod) y ensambla Backdrop + una
 * <Sequence> por escena con `premountFor` (precarga 1 s antes).
 * Reutilizable para cualquier marca/tema: solo cambian los datos.
 * =====================================================================
 */
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Backdrop } from "./components/Backdrop";
import {
  CodeScene,
  CompareScene,
  CtaScene,
  HeroScene,
  PointsScene,
  ShowcaseScene,
} from "./components/Scenes";
import type { ReelProps, Scene } from "./lib/schema";
import { getTheme } from "./lib/theme";
import { buildTimeline, totalDuration } from "./lib/timeline";

/** Elige el componente según el `type` de la escena. */
const renderScene = (s: Scene, theme: ReturnType<typeof getTheme>) => {
  switch (s.type) {
    case "hero":
      return <HeroScene scene={s} theme={theme} />;
    case "points":
      return <PointsScene scene={s} theme={theme} />;
    case "code":
      return <CodeScene scene={s} theme={theme} />;
    case "compare":
      return <CompareScene scene={s} theme={theme} />;
    case "showcase":
      return <ShowcaseScene scene={s} theme={theme} />;
    case "cta":
      return <CtaScene scene={s} theme={theme} />;
  }
};

export const Reel: React.FC<ReelProps> = ({ brand, kicker, scenes, showVoiceover }) => {
  const { fps } = useVideoConfig();
  const theme = getTheme(brand);
  const timeline = buildTimeline(scenes, fps);
  const total = totalDuration(timeline);

  return (
    <AbsoluteFill style={{ background: theme.bg[2] }}>
      <Backdrop
        theme={theme}
        kicker={kicker}
        timeline={timeline}
        total={total}
        showVoiceover={showVoiceover}
      />
      {/* Música de fondo (BGM) continua como cama auditiva para complementar los SFX */}
      <Audio
        src={staticFile("bgm/tech_ambient_bed.mp3")}
        volume={(f) => {
          const fadeIn = Math.min(1, f / (fps * 0.5));
          const fadeOut = Math.min(1, (total - f) / (fps * 0.5));
          return 0.13 * Math.max(0, fadeIn) * Math.max(0, fadeOut);
        }}
        loop
      />
      {scenes.map((s, i) => (
        <Sequence
          key={i}
          from={timeline[i].from}
          durationInFrames={timeline[i].duration}
          premountFor={fps}
          name={`${i + 1}·${s.type}`}
        >
          {/* Efectos de sonido (SFX) cinéticos en transiciones y momentos clave */}
          <Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.35} />
          {s.type === "hero" && (
            <>
              <Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.55} />
              <Sequence from={14}>
                <Audio src={staticFile("sfx/sparkle.mp3")} volume={0.4} />
              </Sequence>
            </>
          )}
          {s.type === "points" && (
            <Sequence from={12}>
              <Audio src={staticFile("sfx/pop.mp3")} volume={0.35} />
            </Sequence>
          )}
          {s.type === "code" && (
            <Sequence from={14}>
              <Audio src={staticFile("sfx/click.mp3")} volume={0.4} />
            </Sequence>
          )}
          {s.type === "showcase" && (
            <Sequence from={14}>
              <Audio src={staticFile("sfx/impact-bass-2.mp3")} volume={0.45} />
            </Sequence>
          )}
          {s.type === "cta" && (
            <Sequence from={16}>
              <Audio src={staticFile("sfx/notification.mp3")} volume={0.5} />
            </Sequence>
          )}
          {renderScene(s, theme)}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
