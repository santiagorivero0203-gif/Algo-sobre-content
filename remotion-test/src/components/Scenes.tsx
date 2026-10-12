/**
 * =====================================================================
 * Escenas del reel (hero · points · code · compare · cta)
 * =====================================================================
 * Cada escena es un componente puro de (scene, theme). Sin cajas
 * contenedoras genéricas: la información se organiza con numeración,
 * líneas, terminal y contadores. Todas viven dentro de <SceneShell>,
 * que aporta cámara de entrada/salida y márgenes seguros.
 * Reglas: solo useCurrentFrame/spring/interpolate (cero CSS transition).
 * =====================================================================
 */
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGeminiLogo } from "./AnimatedGeminiLogo";
import { KineticText } from "./KineticText";
import type { Scene } from "../lib/schema";
import type { BrandTheme } from "../lib/theme";
import { COLORS, FONT_MONO, FONT_SANS, SAFE } from "../lib/theme";

type Of<T extends Scene["type"]> = Extract<Scene, { type: T }>;
interface P<T extends Scene["type"]> {
  scene: Of<T>;
  theme: BrandTheme;
}

/** Entrada con resorte 0→1 reutilizable (retardo en fotogramas, más ágil y suave). */
const useSpring = (delay: number, damping = 22, stiffness = 210) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness, mass: 0.7 } });
};

/* ------------------------------------------------------------------ */
/* Shell: transición de entrada limpia + márgenes seguros              */
/* ------------------------------------------------------------------ */
export const SceneShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 22, stiffness: 200, mass: 0.7 } });
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(enter * 1.5, exit),
        translate: `0 ${(1 - enter) * 20}px`,
        padding: `${SAFE.top + 50}px ${SAFE.side}px ${SAFE.bottom - 40}px`,
        justifyContent: "center",
        fontFamily: FONT_SANS,
        color: COLORS.text,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Píldora de etiqueta (badge) de escena. */
const Badge: React.FC<{ text: string; theme: BrandTheme }> = ({ text, theme }) => {
  const p = useSpring(0);
  return (
    <div
      style={{
        alignSelf: "flex-start",
        fontFamily: FONT_MONO,
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: "0.1em",
        color: theme.bg[2],
        background: theme.accent,
        padding: "10px 22px",
        borderRadius: 999,
        marginBottom: 36,
        opacity: p,
        translate: `${(1 - p) * -60}px 0`,
        boxShadow: `0 0 36px ${theme.accent}77`,
      }}
    >
      {text}
    </div>
  );
};

/** Subtítulo que aparece con fundido tras el titular. */
const Sub: React.FC<{ text?: string; delay: number; size?: number }> = ({
  text,
  delay,
  size = 40,
}) => {
  const p = useSpring(delay, 26, 110);
  if (!text) return null;
  return (
    <div
      style={{
        marginTop: 36,
        fontSize: size,
        lineHeight: 1.3,
        fontWeight: 500,
        color: COLORS.muted,
        opacity: p,
        translate: `0 ${(1 - p) * 30}px`,
      }}
    >
      {text}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* HERO: gancho                                                        */
/* ------------------------------------------------------------------ */
export const HeroScene: React.FC<P<"hero">> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  const line = useSpring(30, 30, 90);
  const kickerP = useSpring(8); // hook fuera del condicional (regla de hooks)
  return (
    <SceneShell>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <Badge text={scene.badge} theme={theme} />
        {scene.showLogo !== false && (
          <AnimatedGeminiLogo
            theme={theme}
            size={scene.logoMode === "full" ? 220 : 90}
            delay={4}
            mode={scene.logoMode ?? "icon"}
          />
        )}
      </div>
      {scene.kicker ? (
        <div
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 800,
            fontSize: 34,
            color: theme.secondary,
            letterSpacing: "0.14em",
            marginBottom: 20,
            opacity: kickerP,
          }}
        >
          {scene.kicker}
        </div>
      ) : null}
      <KineticText text={scene.title} fontSize={160} accent={theme.accent} delay={10} />
      {/* Línea de acento que se dibuja y respira */}
      <div
        style={{
          marginTop: 40,
          height: 10,
          width: 520 * line,
          borderRadius: 5,
          background: `linear-gradient(90deg, ${theme.accent}, ${theme.secondary})`,
          boxShadow: `0 0 ${24 + 12 * Math.sin(frame / 12)}px ${theme.accent}`,
        }}
      />
      <Sub text={scene.sub} delay={36} size={42} />
    </SceneShell>
  );
};

/* ------------------------------------------------------------------ */
/* POINTS: filas numeradas 01 / 02 / 03                                */
/* ------------------------------------------------------------------ */
const PointRow: React.FC<{
  n: number;
  label: string;
  desc: string;
  theme: BrandTheme;
  delay: number;
}> = ({ n, label, desc, theme, delay }) => {
  const p = useSpring(delay);
  return (
    <div
      style={{
        display: "flex",
        gap: 36,
        alignItems: "flex-start",
        paddingTop: 28,
        borderTop: `2px solid ${COLORS.hairline}`,
        opacity: p,
        translate: `${(1 - p) * 120}px 0`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_MONO,
          fontWeight: 800,
          fontSize: 100,
          lineHeight: 0.9,
          color: theme.accent,
          textShadow: `0 0 40px ${theme.accent}66`,
          minWidth: 140,
        }}
      >
        {String(n).padStart(2, "0")}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          {label}
        </div>
        <div style={{ fontSize: 34, fontWeight: 500, lineHeight: 1.3, marginTop: 10, color: COLORS.muted }}>
          {desc}
        </div>
      </div>
    </div>
  );
};

export const PointsScene: React.FC<P<"points">> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Badge text={scene.badge} theme={theme} />
        {scene.showLogo && (
          <AnimatedGeminiLogo theme={theme} size={70} delay={6} mode="icon" />
        )}
      </div>
      <KineticText text={scene.title} fontSize={90} accent={theme.accent} delay={6} />

      {/* Fila de iconos de aplicaciones si existen */}
      {scene.icons && scene.icons.length > 0 ? (
        <div style={{ display: "flex", gap: 18, marginTop: 24, marginBottom: 8, alignItems: "center" }}>
          {scene.icons.map((iconPath, idx) => (
            <div
              key={iconPath}
              style={{
                width: 68,
                height: 68,
                borderRadius: 18,
                background: "rgba(255, 255, 255, 0.08)",
                border: `1.5px solid ${theme.accent}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
                boxShadow: `0 0 20px ${theme.accent}25`,
                transform: `translateY(${Math.sin((frame + idx * 8) / 14) * 6}px)`,
              }}
            >
              <Img src={staticFile(iconPath)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          ))}
        </div>
      ) : null}

      <div style={{ height: scene.icons ? 20 : 40 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {scene.points.map((pt, i) => (
          <PointRow key={i} n={i + 1} label={pt.label} desc={pt.desc} theme={theme} delay={12 + i * 8} />
        ))}
      </div>
      <Sub text={scene.sub} delay={12 + scene.points.length * 8} size={32} />
    </SceneShell>
  );
};

/* ------------------------------------------------------------------ */
/* SHOWCASE: imagen real + mockup 3D + iconos de apps                */
/* ------------------------------------------------------------------ */
export const ShowcaseScene: React.FC<P<"showcase">> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  const imgSpring = useSpring(14, 20, 190);
  const floatY = Math.sin(frame / 18) * 10;

  return (
    <SceneShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Badge text={scene.badge} theme={theme} />
        {scene.showLogo && (
          <AnimatedGeminiLogo theme={theme} size={70} delay={6} mode="icon" />
        )}
      </div>
      <KineticText text={scene.title} fontSize={86} accent={theme.accent} delay={6} />

      {/* Contenedor Mockup con imagen real */}
      <div
        style={{
          marginTop: 36,
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          border: `2px solid ${theme.accent}66`,
          boxShadow: `0 30px 90px rgba(0,0,0,0.8), 0 0 70px ${theme.accent}33`,
          opacity: imgSpring,
          transform: `translateY(${floatY + (1 - imgSpring) * 60}px) scale(${0.92 + imgSpring * 0.08})`,
          background: "rgba(6, 12, 24, 0.9)",
          maxHeight: 560,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(scene.image)}
          style={{
            width: "100%",
            maxHeight: 560,
            objectFit: "contain",
            borderRadius: 22,
          }}
        />
        {scene.imageCaption ? (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "16px 24px",
              background: "linear-gradient(transparent, rgba(2, 6, 18, 0.95))",
              fontFamily: FONT_MONO,
              fontWeight: 700,
              fontSize: 24,
              color: "#FFFFFF",
              letterSpacing: "0.08em",
            }}
          >
            {scene.imageCaption}
          </div>
        ) : null}
      </div>

      {/* Fila de iconos de apps si existen */}
      {scene.icons && scene.icons.length > 0 ? (
        <div style={{ display: "flex", gap: 18, marginTop: 28, alignItems: "center" }}>
          {scene.icons.map((iconPath, idx) => (
            <div
              key={iconPath}
              style={{
                width: 68,
                height: 68,
                borderRadius: 18,
                background: "rgba(255, 255, 255, 0.08)",
                border: `1.5px solid ${theme.accent}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
                boxShadow: `0 0 20px ${theme.accent}25`,
                transform: `translateY(${Math.sin((frame + idx * 8) / 14) * 6}px)`,
              }}
            >
              <Img src={staticFile(iconPath)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          ))}
        </div>
      ) : null}

      <Sub text={scene.sub} delay={34} size={32} />
    </SceneShell>
  );
};

/* ------------------------------------------------------------------ */
/* CODE: terminal con escritura rápida carácter a carácter             */
/* ------------------------------------------------------------------ */
/** Color de línea según su prefijo (comentario / comando / éxito). */
const lineColor = (l: string, theme: BrandTheme): string =>
  l.startsWith("#") ? COLORS.codeComment : l.startsWith("$") ? theme.accent : l.startsWith("✓") ? theme.secondary : "#E2E8F0";

export const CodeScene: React.FC<P<"code">> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  const CPF = 2.4; // escritura ágil (~144 cps a 60 fps)
  const START = 16; // entra rápido tras el titular
  const typed = Math.max(0, (frame - START) * CPF);
  const win = useSpring(12, 22, 180);

  // Reparte los caracteres tecleados entre líneas, en orden.
  let remaining = typed;
  const rendered = scene.lines.map((l) => {
    const n = Math.max(0, Math.min(l.length, Math.floor(remaining)));
    remaining -= l.length + 3; // pausa breve entre líneas
    return { text: l.slice(0, n), full: l, done: n >= l.length, started: n > 0 };
  });
  const lastActive = rendered.reduce((acc, r, i) => (r.started ? i : acc), 0);
  const caretOn = Math.floor(frame / 12) % 2 === 0;

  return (
    <SceneShell>
      <Badge text={scene.badge} theme={theme} />
      <KineticText text={scene.title} fontSize={92} accent={theme.accent} delay={4} />
      <div
        style={{
          marginTop: 48,
          borderRadius: 28,
          overflow: "hidden",
          background: COLORS.codeBg,
          border: `2px solid ${theme.accent}55`,
          boxShadow: `0 40px 120px #000a, 0 0 80px ${theme.accent}33`,
          opacity: win,
          translate: `0 ${(1 - win) * 50}px`,
        }}
      >
        {/* Barra de ventana estilo macOS */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 28px", background: "rgba(255,255,255,0.06)" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 20, height: 20, borderRadius: 10, background: c }} />
          ))}
          <div style={{ marginLeft: 16, fontFamily: FONT_MONO, fontWeight: 500, fontSize: 26, color: COLORS.codeComment }}>
            {scene.file}
          </div>
        </div>
        <div style={{ padding: "34px 36px 40px", fontFamily: FONT_MONO, fontWeight: 500, fontSize: 31, lineHeight: 1.65, minHeight: 360 }}>
          {rendered.map((r, i) =>
            r.started ? (
              <div key={i} style={{ color: lineColor(r.full, theme), whiteSpace: "pre-wrap" }}>
                {r.text}
                {i === lastActive && caretOn ? (
                  <span style={{ background: theme.accent, color: "transparent" }}>▌</span>
                ) : null}
              </div>
            ) : null,
          )}
        </div>
      </div>
      <Sub text={scene.sub} delay={36} size={34} />
    </SceneShell>
  );
};

/* ------------------------------------------------------------------ */
/* COMPARE: contador animado + franjas antes/después                   */
/* ------------------------------------------------------------------ */
/** Icono X / rayo en SVG (sin depender de glifos de fuente). */
const Icon: React.FC<{ kind: "bad" | "good"; color: string }> = ({ kind, color }) => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    {kind === "bad" ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M13 2L4 14h7l-1 8 9-12h-7z" />}
  </svg>
);

const Strip: React.FC<{
  side: Of<"compare">["bad"];
  kind: "bad" | "good";
  color: string;
  delay: number;
}> = ({ side, kind, color, delay }) => {
  const p = useSpring(delay);
  return (
    <div
      style={{
        borderLeft: `8px solid ${color}`,
        padding: "8px 0 8px 30px",
        opacity: p,
        translate: `${(kind === "bad" ? -1 : 1) * (1 - p) * 100}px 0`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: FONT_MONO, fontWeight: 800, fontSize: 26, letterSpacing: "0.1em", color }}>
        <Icon kind={kind} color={color} />
        {side.tag}
      </div>
      <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 8 }}>{side.title}</div>
      <div style={{ fontSize: 34, fontWeight: 500, lineHeight: 1.3, color: COLORS.muted, marginTop: 6 }}>{side.desc}</div>
    </div>
  );
};

export const CompareScene: React.FC<P<"compare">> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  const { from, to, unit } = scene.metric;
  const t = interpolate(frame, [14, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const value = Math.round(from + (to - from) * t);
  const saved = Math.round((1 - to / from) * 100);
  const pop = useSpring(50, 14, 200);

  return (
    <SceneShell>
      <Badge text={scene.badge} theme={theme} />
      <KineticText text={scene.title} fontSize={84} accent={theme.accent} delay={4} />
      {/* Contador: baja de `from` a `to` mientras el color pasa de rojo a acento */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 22, marginTop: 36 }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 800,
            fontSize: 190,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: t < 0.98 ? COLORS.danger : theme.accent,
            textShadow: `0 0 60px ${(t < 0.98 ? COLORS.danger : theme.accent)}66`,
          }}
        >
          {value.toLocaleString("en-US")}
        </div>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 800, fontSize: 40, color: COLORS.muted }}>{unit}</div>
        <div
          style={{
            marginLeft: "auto",
            fontFamily: FONT_MONO,
            fontWeight: 800,
            fontSize: 56,
            color: theme.bg[2],
            background: theme.accent,
            padding: "8px 22px",
            borderRadius: 18,
            scale: String(pop),
            opacity: Math.min(1, pop),
          }}
        >
          -{saved}%
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 44 }}>
        <Strip side={scene.bad} kind="bad" color={COLORS.danger} delay={16} />
        <Strip side={scene.good} kind="good" color={theme.accent} delay={28} />
      </div>
      <Sub text={scene.sub} delay={40} size={32} />
    </SceneShell>
  );
};

/* ------------------------------------------------------------------ */
/* CTA: palabra clave de comunidad                                     */
/* ------------------------------------------------------------------ */
export const CtaScene: React.FC<P<"cta">> = ({ scene, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pill = useSpring(14, 14, 200);
  const glow = 40 + 20 * Math.sin(frame / 9);
  const chips = ["SEGUIR", "GUARDAR", "COMPARTIR"];
  return (
    <SceneShell>
      <Badge text={scene.badge} theme={theme} />
      <KineticText text={scene.title} fontSize={120} accent={theme.accent} delay={4} />
      <div
        style={{
          alignSelf: "flex-start",
          marginTop: 56,
          fontFamily: FONT_MONO,
          fontWeight: 800,
          fontSize: 118,
          letterSpacing: "0.04em",
          color: theme.bg[2],
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})`,
          padding: "22px 54px",
          borderRadius: 34,
          scale: String(pill),
          transformOrigin: "left center",
          boxShadow: `0 0 ${glow}px ${theme.accent}`,
        }}
      >
        {scene.keyword}
      </div>
      <Sub text={scene.line} delay={26} size={42} />
      <div style={{ display: "flex", gap: 18, marginTop: 46 }}>
        {chips.map((c, i) => {
          const p = spring({ frame: frame - (36 + i * 6), fps, config: { damping: 18, stiffness: 200 } });
          return (
            <div
              key={c}
              style={{
                fontFamily: FONT_MONO,
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: "0.1em",
                padding: "12px 26px",
                borderRadius: 999,
                border: `2px solid ${theme.accent}`,
                color: theme.accent,
                opacity: p,
                translate: `0 ${(1 - p) * 30}px`,
              }}
            >
              {c}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 40, fontFamily: FONT_MONO, fontWeight: 800, fontSize: 40, color: COLORS.muted }}>
        {theme.handle}
      </div>
    </SceneShell>
  );
};
