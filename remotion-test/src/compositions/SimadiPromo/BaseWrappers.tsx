/**
 * =====================================================================
 * WRAPPERS REUTILIZABLES TSX · SIMADI PROMO V2
 * =====================================================================
 * Extiende mediante wrappers tipados en TSX la gramática visual del repo
 * (`GridPattern`, `TopBand`, `BottomBand`, `CardFrame`, `Slide`) sin
 * alterar `js/components.js` ni `js/themes.js`.
 * Mejora V2:
 *  - `CardFrame` integra la píldora de enfoque (`calloutLabel`) dentro de
 *    la barra oscura del navegador para eliminar cualquier superposición
 *    sobre etiquetas o textos reales de Simadi.
 *  - `TopBand` incorpora insignia discreta de `BETA` y sello UCV.
 *  - `BottomBand` muestra progreso por escenas y nota complementaria.
 *  - `Slide` distribuye el espacio vertical con equilibrio profesional.
 * =====================================================================
 */
import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticText } from "../../components/KineticText";
import { FONT_MONO, FONT_SANS } from "../../lib/theme";
import { useContinuousFloat, useSmoothSpring } from "../../pyquest/motion";
import { SimadiIcon } from "./SimadiIcons";
import type { FormatMetrics, SceneSpec, SimadiThemeJson } from "./types";

export const GridPattern: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const frame = useCurrentFrame();
  const shiftX = (frame * 0.35) % 44;
  const shiftY = (frame * 0.25) % 44;

  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, opacity: 0.09, pointerEvents: "none" }}
    >
      <defs>
        <pattern
          id="simadi-blueprint-grid"
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(${shiftX}, ${shiftY})`}
        >
          <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#38BDF8" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill="url(#simadi-blueprint-grid)" />
    </svg>
  );
};

export const TopBand: React.FC<{
  scene: SceneSpec;
  theme: SimadiThemeJson;
  metrics: FormatMetrics;
  immediate?: boolean;
}> = ({ scene, metrics, immediate = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: immediate ? frame + 8 : frame,
    fps,
    config: { damping: 18, stiffness: 190, mass: 0.65 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 12}px)`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: metrics.isIg ? "8px 18px" : "10px 22px",
          borderRadius: 999,
          background: "rgba(56, 189, 248, 0.16)",
          border: "1.5px solid rgba(56, 189, 248, 0.48)",
          boxShadow: "0 8px 24px rgba(15, 82, 186, 0.25)",
        }}
      >
        <SimadiIcon name={scene.icon} size={metrics.isIg ? 19 : 22} color="#38BDF8" />
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: metrics.badgeFontSize,
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "#E0F2FE",
          }}
        >
          {scene.badge}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            padding: "5px 11px",
            borderRadius: 999,
            background: "rgba(245, 158, 11, 0.16)",
            border: "1px solid rgba(245, 158, 11, 0.45)",
            fontFamily: FONT_MONO,
            fontSize: 15,
            fontWeight: 800,
            color: "#FDE68A",
            letterSpacing: "0.06em",
          }}
        >
          BETA
        </span>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 17,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.56)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {scene.phase === "Táctica/Demo" ? "DEMO" : scene.phase}
        </span>
      </div>
    </div>
  );
};

export const BottomBand: React.FC<{
  scenes: SceneSpec[];
  metrics: FormatMetrics;
}> = ({ scenes, metrics }) => {
  const frame = useCurrentFrame();
  const activeIdx = Math.max(
    0,
    scenes.findIndex((s) => frame >= s.fromFrame && frame < s.fromFrame + s.durationFrames)
  );

  return (
    <div
      style={{
        position: "absolute",
        left: metrics.safeSide,
        right: metrics.safeSide,
        bottom: metrics.isIg ? 34 : 104,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 18,
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {scenes.map((s, idx) => {
          const isCurrent = idx === activeIdx;
          const isDone = idx < activeIdx;
          return (
            <div
              key={s.id}
              style={{
                height: 6,
                width: isCurrent ? 38 : 16,
                borderRadius: 999,
                background: isCurrent
                  ? "#38BDF8"
                  : isDone
                  ? "rgba(16, 185, 129, 0.85)"
                  : "rgba(255, 255, 255, 0.22)",
              }}
            />
          );
        })}
      </div>

      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: 17,
          fontWeight: 700,
          color: "rgba(226, 232, 240, 0.72)",
          letterSpacing: "0.03em",
        }}
      >
        Complemento UCV · Dudas al DM
      </span>
    </div>
  );
};

/**
 * Contenedor 2.5D con píldora HUD integrada en la barra superior para evitar
 * tapar formularios, títulos o temporizadores dentro de la captura.
 */
export const CardFrame: React.FC<{
  theme: SimadiThemeJson;
  metrics: FormatMetrics;
  urlLabel?: string;
  calloutLabel?: string;
  children: React.ReactNode;
}> = ({ theme, metrics, urlLabel = "simulacion-simadi.vercel.app", calloutLabel, children }) => {
  const enter = useSmoothSpring(4);
  const { floatY, floatScale } = useContinuousFloat(0, 5, 26);

  return (
    <div
      style={{
        width: metrics.browserWidth,
        borderRadius: 24,
        background: theme.colors.surface,
        border: "2px solid rgba(56, 189, 248, 0.40)",
        boxShadow:
          "0 36px 80px -12px rgba(2, 6, 23, 0.65), 0 0 42px rgba(15, 82, 186, 0.35)",
        overflow: "hidden",
        transform: `perspective(1400px) rotateX(${(1 - enter) * 6 + 1.2}deg) translateY(${(1 - enter) * 32 + floatY}px) scale(${(0.94 + enter * 0.06) * floatScale})`,
        opacity: enter,
      }}
    >
      <div
        style={{
          height: 46,
          background: "#0F172A",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#EF4444" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#F59E0B" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#10B981" }} />
        </div>

        <div
          style={{
            padding: "4px 14px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.08)",
            fontFamily: FONT_MONO,
            fontSize: 15,
            fontWeight: 600,
            color: "#CBD5E1",
          }}
        >
          {urlLabel}
        </div>

        {calloutLabel ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "4px 12px",
              borderRadius: 999,
              background: "rgba(56, 189, 248, 0.18)",
              border: "1px solid rgba(56, 189, 248, 0.65)",
              fontFamily: FONT_MONO,
              fontSize: 14,
              fontWeight: 800,
              color: "#7DD3FC",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#38BDF8" }} />
            {calloutLabel}
          </div>
        ) : (
          <div style={{ width: 44 }} />
        )}
      </div>

      <div
        style={{
          position: "relative",
          width: metrics.browserWidth,
          height: metrics.browserHeight,
          overflow: "hidden",
          background: theme.colors.background,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Slide: React.FC<{
  scene: SceneSpec;
  theme: SimadiThemeJson;
  metrics: FormatMetrics;
  immediate?: boolean;
  children: React.ReactNode;
}> = ({ scene, theme, metrics, immediate = false, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: immediate ? frame + 10 : frame,
    fps,
    config: { damping: 18, stiffness: 170, mass: 0.72 },
  });

  const exit = interpolate(
    frame,
    [scene.durationFrames - 12, scene.durationFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const copyEnter = useSmoothSpring(immediate ? 4 : 10);

  return (
    <AbsoluteFill
      style={{
        paddingTop: metrics.stageTopPadding,
        paddingLeft: metrics.safeSide,
        paddingRight: metrics.safeSide,
        paddingBottom: metrics.safeBottom,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: metrics.isIg ? 18 : 26,
        opacity: Math.min(1, enter * 1.4) * exit,
        transform: `translateY(${(1 - enter) * 18 - (1 - exit) * 16}px)`,
      }}
    >
      <TopBand scene={scene} theme={theme} metrics={metrics} immediate={immediate} />

      <div style={{ display: "flex", flexDirection: "column", gap: metrics.isIg ? 10 : 14 }}>
        <KineticText
          text={scene.title}
          fontSize={metrics.headlineSize}
          accent="#38BDF8"
          color="#FFFFFF"
          delay={immediate ? -6 : 2}
          lineHeight={1.06}
          weight={800}
        />

        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: metrics.copySize,
            fontWeight: 500,
            color: "rgba(226, 232, 240, 0.92)",
            lineHeight: 1.32,
            maxWidth: "96%",
            opacity: copyEnter,
            transform: `translateY(${(1 - copyEnter) * 12}px)`,
          }}
        >
          {scene.copy}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
