/**
 * =====================================================================
 * VIDEO 0 · APERTURA EDUCATIVA: CÓMO FUNCIONA EL SIMADI UCV (V3)
 * =====================================================================
 * Composiciones:
 *  - `SimadiApertura`   (1080×1920 @ 60 FPS · 65s / 3900 frames)
 *  - `SimadiAperturaIG` (1080×1350 @ 60 FPS · 65s / 3900 frames)
 *
 * Estética Editorial Daylight:
 *  - Fondo claro sobrio (#F7F8FA) estilo PyQuest + acento #0F52BA real.
 *  - Tipografía mixta (`Plus Jakarta Sans` + `Instrument Serif Italic` +
 *    `JetBrains Mono`), composición libre con líneas `1px` y pocos focos.
 *  - Datos gobernados 100% por `simadi-data.json` y tiempos por
 *    `voiceover-cues.json`.
 *  - Audio editorial/táctil (`public/captures/simadi/audio/*.mp3`).
 * =====================================================================
 */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import simadiDataRaw from "./simadi-data.json";
import cuesRaw from "./voiceover-cues.json";
import {
  DAYLIGHT,
  DaylightBackdrop,
  EditorialTitle,
  FONT_EDITORIAL_MONO,
  FONT_EDITORIAL_SANS,
  FONT_EDITORIAL_SERIF,
  getDaylightMetrics,
  useSceneFade,
  type DaylightMetrics,
} from "./DaylightTheme";
import { FluidWebStage, getVerticalBridgeClickLocalFrames } from "./FluidWebStage";
import { EliminationDemo, ExamModuleCard, SplitMetricBar } from "./Infographics";
import type { PromoFormat } from "./types";

interface CueSpec {
  id: string;
  startFrame: number;
  endFrame: number;
  vo: string;
}

interface BlockSpec {
  id: string;
  label: string;
  startFrame: number;
  endFrame: number;
  cues: CueSpec[];
}

interface VoiceoverCuesFile {
  fps: number;
  totalSeconds: number;
  totalFrames: number;
  bgm: string;
  blocks: BlockSpec[];
}

const simadiData = simadiDataRaw;
const cuesSpec = cuesRaw as VoiceoverCuesFile;

export const SIMADI_APERTURA_FPS = cuesSpec.fps;
export const SIMADI_APERTURA_DURATION_FRAMES = cuesSpec.totalFrames;

/** Helper mínimo para disparar SFX táctiles/editoriales acotados desde `captures/simadi/audio/`. */
const EditorialSfx: React.FC<{
  file: string;
  from: number;
  volume?: number;
  durationInFrames?: number;
}> = ({ file, from, volume = 0.4, durationInFrames = 100 }) => (
  <Sequence from={from} durationInFrames={durationInFrames}>
    <Audio src={staticFile(`captures/simadi/audio/${file}`)} volume={volume} />
  </Sequence>
);

/** Contenedor de escena con centrado limpio respetando zonas seguras 9:16 y 4:5. */
const EditorialStage: React.FC<{
  metrics: DaylightMetrics;
  opacity: number;
  children: React.ReactNode;
}> = ({ metrics, opacity, children }) => (
  <AbsoluteFill
    style={{
      paddingTop: metrics.safeTop,
      paddingBottom: metrics.safeBottom,
      paddingLeft: metrics.safeSide,
      paddingRight: metrics.safeSide,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      opacity,
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: metrics.contentWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: metrics.isIg ? 26 : 38,
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

// =====================================================================
// ACTO 1 (0s – 10s · frames 0–600): GANCHO + PESO REAL (60/40) + 90 PREG.
// =====================================================================

const Cue1Peso6040: React.FC<{ metrics: DaylightMetrics; duration: number }> = ({ metrics, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useSceneFade(duration, 0, 14);
  const logoEnter = spring({ frame, fps, config: { damping: 18, stiffness: 180, mass: 0.7 } });

  return (
    <EditorialStage metrics={metrics} opacity={opacity}>
      {/* Sello oficial UCV + contexto en 1 línea limpia */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          opacity: 0.55 + logoEnter * 0.45,
          transform: `translateY(${(1 - logoEnter) * 10}px)`,
        }}
      >
        <Img
          src={staticFile("captures/simadi/ucv_logo.svg")}
          style={{ width: metrics.isIg ? 42 : 48, height: metrics.isIg ? 42 : 48, objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: FONT_EDITORIAL_MONO,
            fontWeight: 700,
            fontSize: metrics.isIg ? 19 : 22,
            letterSpacing: "0.08em",
            color: DAYLIGHT.inkMuted,
          }}
        >
          UCV · PESO REAL DEL ÍNDICE
        </span>
      </div>

      <EditorialTitle text="Así funciona el *SIMADI UCV.*" fontSize={metrics.heroTitleSize} immediate />

      <div style={{ width: "100%", paddingTop: metrics.isIg ? 10 : 20, borderTop: `1px solid ${DAYLIGHT.hairline}` }}>
        <SplitMetricBar
          metrics={metrics}
          delay={16}
          segments={[
            {
              label: simadiData.indexWeights.gradesLabel,
              valueLabel: `${simadiData.indexWeights.gradesPercent}%`,
              weight: simadiData.indexWeights.gradesPercent,
              color: DAYLIGHT.ink,
            },
            {
              label: simadiData.indexWeights.examLabel,
              valueLabel: `${simadiData.indexWeights.examPercent}%`,
              weight: simadiData.indexWeights.examPercent,
              color: DAYLIGHT.cobalt,
            },
          ]}
        />
      </div>
    </EditorialStage>
  );
};

const Cue2Reglas90Atras: React.FC<{ metrics: DaylightMetrics; duration: number }> = ({ metrics, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useSceneFade(duration, 12, 14);

  const count = Math.round(
    interpolate(frame, [6, 52], [0, simadiData.format.totalQuestions], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Candado bloqueando el botón "← Atrás" alrededor del frame 115
  const lockSpring = spring({ frame: frame - 110, fps, config: { damping: 14, stiffness: 210, mass: 0.7 } });
  const isLocked = frame >= 110;
  const shakeX = isLocked ? Math.sin((frame - 110) * 1.4) * Math.max(0, 1 - (frame - 110) / 28) * 10 : 0;

  return (
    <EditorialStage metrics={metrics} opacity={opacity}>
      {/* Cifra gigante + tiempo */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
        <span
          style={{
            fontFamily: FONT_EDITORIAL_SERIF,
            fontStyle: "italic",
            fontSize: metrics.isIg ? 130 : 162,
            lineHeight: 0.85,
            color: DAYLIGHT.cobalt,
          }}
        >
          {count}
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: FONT_EDITORIAL_SANS,
              fontWeight: 800,
              fontSize: metrics.isIg ? 38 : 46,
              color: DAYLIGHT.ink,
            }}
          >
            preguntas
          </span>
          <span
            style={{
              fontFamily: FONT_EDITORIAL_MONO,
              fontWeight: 700,
              fontSize: metrics.isIg ? 20 : 24,
              color: DAYLIGHT.inkMuted,
            }}
          >
            {simadiData.format.durationLabel} · {simadiData.format.modality}
          </span>
        </div>
      </div>

      <EditorialTitle text="Una vez respondes, *no vuelves atrás.*" fontSize={metrics.sectionTitleSize} delay={14} />

      {/* Micro-interacción limpia sin caja pesada: Botón Atrás bloqueado */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 18,
          paddingTop: 20,
          borderTop: `1px solid ${DAYLIGHT.hairline}`,
          transform: `translateX(${shakeX}px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 26px",
            borderRadius: 10,
            background: isLocked ? DAYLIGHT.dangerSoft : "#FFFFFF",
            border: `1.5px solid ${isLocked ? DAYLIGHT.danger : DAYLIGHT.hairline}`,
            fontFamily: FONT_EDITORIAL_SANS,
            fontWeight: 700,
            fontSize: metrics.isIg ? 24 : 28,
            color: isLocked ? DAYLIGHT.danger : DAYLIGHT.inkMuted,
          }}
        >
          <span>← Atrás</span>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            opacity: lockSpring,
            transform: `scale(${0.85 + lockSpring * 0.15})`,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={DAYLIGHT.danger} strokeWidth="2.4" strokeLinecap="round">
            <rect width="18" height="11" x="3" y="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span
            style={{
              fontFamily: FONT_EDITORIAL_MONO,
              fontWeight: 800,
              fontSize: metrics.isIg ? 20 : 23,
              color: DAYLIGHT.danger,
            }}
          >
            BLOQUEADO
          </span>
        </div>
      </div>
    </EditorialStage>
  );
};

// =====================================================================
// ACTO 2 (10s – 32s · frames 600–1920): 3 BLOQUES DE 30 PREGUNTAS
// =====================================================================

const BlockPillarScene: React.FC<{
  metrics: DaylightMetrics;
  duration: number;
  activeIdx: 0 | 1 | 2;
}> = ({ metrics, duration, activeIdx }) => {
  const opacity = useSceneFade(duration, 12, 14);
  const sec = simadiData.sections[activeIdx];

  return (
    <EditorialStage metrics={metrics} opacity={opacity}>
      {/* Indicador minimalista de progresión 01 / 02 / 03 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 14,
          borderBottom: `1px solid ${DAYLIGHT.hairline}`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_EDITORIAL_MONO,
            fontWeight: 700,
            fontSize: metrics.isIg ? 18 : 20,
            color: DAYLIGHT.inkMuted,
          }}
        >
          3 BLOQUES CONSECUTIVOS · 30 C/U
        </span>
        <div style={{ display: "flex", gap: 14 }}>
          {["01", "02", "03"].map((n, idx) => (
            <span
              key={n}
              style={{
                fontFamily: FONT_EDITORIAL_MONO,
                fontWeight: 800,
                fontSize: metrics.isIg ? 20 : 22,
                color: idx === activeIdx ? DAYLIGHT.cobalt : "rgba(15, 23, 42, 0.25)",
                borderBottom: idx === activeIdx ? `2px solid ${DAYLIGHT.cobalt}` : "2px solid transparent",
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      <ExamModuleCard
        index={sec.index}
        title={sec.title}
        questions={sec.questions}
        topics={sec.topics}
        note={sec.note}
        faculties={sec.faculties}
        microExample={
          sec.microExample
            ? (sec.microExample as React.ComponentProps<typeof ExamModuleCard>["microExample"])
            : undefined
        }
        metrics={metrics}
      />
    </EditorialStage>
  );
};

// =====================================================================
// ACTO 3 (32s – 48s · frames 1920–2880): TÉCNICAS CLAVE
// =====================================================================

const Cue3Tiempo45: React.FC<{ metrics: DaylightMetrics; duration: number }> = ({ metrics, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useSceneFade(duration, 12, 14);
  const pulse = 1 + Math.sin(frame / 14) * 0.025;
  const enterClock = spring({ frame: frame - 8, fps, config: { damping: 16, stiffness: 180, mass: 0.7 } });

  return (
    <EditorialStage metrics={metrics} opacity={opacity}>
      {/* Reloj protagonista sin tarjeta */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: enterClock,
          transform: `scale(${pulse * (0.9 + enterClock * 0.1)})`,
        }}
      >
        <svg width={metrics.isIg ? 52 : 62} height={metrics.isIg ? 52 : 62} viewBox="0 0 24 24" fill="none" stroke={DAYLIGHT.cobalt} strokeWidth="2.2">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l3 2" />
          <path d="M9 3h6" />
        </svg>
        <span
          style={{
            fontFamily: FONT_EDITORIAL_SERIF,
            fontStyle: "italic",
            fontSize: metrics.isIg ? 88 : 108,
            color: DAYLIGHT.cobalt,
            lineHeight: 0.9,
          }}
        >
          {simadiData.techniques.clockLabel}
        </span>
        <span
          style={{
            fontFamily: FONT_EDITORIAL_SANS,
            fontWeight: 700,
            fontSize: metrics.isIg ? 26 : 30,
            color: DAYLIGHT.inkMuted,
          }}
        >
          / pregunta
        </span>
      </div>

      <EditorialTitle text="Presupuesto de *tiempo real*" fontSize={metrics.sectionTitleSize} delay={10} />

      <div style={{ width: "100%", paddingTop: 18, borderTop: `1px solid ${DAYLIGHT.hairline}` }}>
        <SplitMetricBar
          metrics={metrics}
          delay={20}
          segments={[
            { label: "Lógico", valueLabel: "45m", weight: 45, color: DAYLIGHT.ink },
            { label: "Verbal", valueLabel: "45m", weight: 45, color: DAYLIGHT.cobalt },
            { label: "Área", valueLabel: "45m", weight: 45, color: "#2563EB" },
            { label: "Margen", valueLabel: "15m", weight: 15, color: DAYLIGHT.success },
          ]}
        />
      </div>
    </EditorialStage>
  );
};

const Cue3Descarte: React.FC<{ metrics: DaylightMetrics; duration: number }> = ({ metrics, duration }) => {
  const opacity = useSceneFade(duration, 12, 14);
  return (
    <EditorialStage metrics={metrics} opacity={opacity}>
      <EditorialTitle text="Descarta dos *al vuelo*" fontSize={metrics.sectionTitleSize} immediate />
      <EliminationDemo
        prompt={simadiData.techniques.eliminationExample.prompt}
        options={simadiData.techniques.eliminationExample.options}
        metrics={metrics}
      />
    </EditorialStage>
  );
};

const Cue3PapelYVerbal: React.FC<{ metrics: DaylightMetrics; duration: number }> = ({ metrics, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useSceneFade(duration, 12, 14);
  const s1 = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 180 } });
  const s2 = spring({ frame: frame - 68, fps, config: { damping: 18, stiffness: 180 } });

  return (
    <EditorialStage metrics={metrics} opacity={opacity}>
      <EditorialTitle text="Dos hábitos *que suman*" fontSize={metrics.sectionTitleSize} immediate />

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: metrics.isIg ? 20 : 28 }}>
        {/* Hábito 1: Papel y lápiz */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            paddingBottom: metrics.isIg ? 18 : 24,
            borderBottom: `1px solid ${DAYLIGHT.hairline}`,
            opacity: s1,
            transform: `translateX(${(1 - s1) * 28}px)`,
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={DAYLIGHT.cobalt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          <div>
            <div style={{ fontFamily: FONT_EDITORIAL_SANS, fontWeight: 800, fontSize: metrics.isIg ? 32 : 38, color: DAYLIGHT.ink }}>
              {simadiData.techniques.tips[0].title}
            </div>
            <div style={{ fontFamily: FONT_EDITORIAL_SANS, fontWeight: 500, fontSize: metrics.isIg ? 23 : 27, color: DAYLIGHT.inkMuted, marginTop: 4 }}>
              {simadiData.techniques.tips[0].detail}
            </div>
          </div>
        </div>

        {/* Hábito 2: Idea principal y conectores */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            opacity: s2,
            transform: `translateX(${(1 - s2) * 28}px)`,
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={DAYLIGHT.cobalt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M4 12h10M4 17h7" />
            <path d="m15 16 2 2 4-4" />
          </svg>
          <div>
            <div style={{ fontFamily: FONT_EDITORIAL_SANS, fontWeight: 800, fontSize: metrics.isIg ? 32 : 38, color: DAYLIGHT.ink }}>
              {simadiData.techniques.tips[1].title}
            </div>
            <div style={{ fontFamily: FONT_EDITORIAL_SANS, fontWeight: 500, fontSize: metrics.isIg ? 23 : 27, color: DAYLIGHT.inkMuted, marginTop: 4 }}>
              {simadiData.techniques.tips[1].detail}
            </div>
          </div>
        </div>
      </div>
    </EditorialStage>
  );
};

// =====================================================================
// ACTO 4 (48s – 65s · frames 2880–3900): PUENTE A SIMADI + CTA DM
// =====================================================================

const Cue4PuenteWeb: React.FC<{ metrics: DaylightMetrics; duration: number }> = ({ metrics, duration }) => {
  const opacity = useSceneFade(duration, 10, 14);
  return (
    <EditorialStage metrics={metrics} opacity={opacity}>
      <EditorialTitle text="No dejes que el reloj *te paralice.*" fontSize={metrics.demoTitleSize} immediate />
      <FluidWebStage metrics={metrics} totalSceneFrames={duration} clipDelayFrames={26} />
    </EditorialStage>
  );
};

const Cue4CtaDm: React.FC<{ metrics: DaylightMetrics; duration: number }> = ({ metrics, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useSceneFade(duration, 14, 16);
  const logoSpring = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 170 } });
  const arrowSpring = spring({ frame: frame - 24, fps, config: { damping: 16, stiffness: 180 } });

  return (
    <EditorialStage metrics={metrics} opacity={opacity}>
      {/* Escudo oficial UCV + identidad limpia sin pill pesada */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          opacity: logoSpring,
          transform: `scale(${0.92 + logoSpring * 0.08})`,
        }}
      >
        <Img
          src={staticFile("captures/simadi/ucv_logo.svg")}
          style={{ width: metrics.isIg ? 62 : 76, height: metrics.isIg ? 62 : 76, objectFit: "contain" }}
        />
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: FONT_EDITORIAL_SANS, fontWeight: 800, fontSize: metrics.isIg ? 28 : 34, color: DAYLIGHT.ink }}>
            {simadiData.bridgeApp.name}
          </div>
          <div style={{ fontFamily: FONT_EDITORIAL_MONO, fontWeight: 700, fontSize: metrics.isIg ? 17 : 19, color: DAYLIGHT.cobalt }}>
            PREPARACIÓN UCV · {simadiData.bridgeApp.badge}
          </div>
        </div>
      </div>

      <EditorialTitle text={simadiData.bridgeApp.ctaTitle} fontSize={metrics.heroTitleSize} delay={8} />

      {/* Acción limpia sin botón enorme */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          paddingBottom: 8,
          borderBottom: `2.5px solid ${DAYLIGHT.cobalt}`,
          fontFamily: FONT_EDITORIAL_SANS,
          fontWeight: 700,
          fontSize: metrics.isIg ? 28 : 34,
          color: DAYLIGHT.cobalt,
          opacity: arrowSpring,
          transform: `translateY(${(1 - arrowSpring) * 14}px)`,
        }}
      >
        <span>{simadiData.bridgeApp.ctaAction}</span>
        <span>→</span>
      </div>

      {/* Nota obligatoria discreta y sobria */}
      <div
        style={{
          fontFamily: FONT_EDITORIAL_SANS,
          fontWeight: 500,
          fontSize: metrics.isIg ? 19 : 22,
          color: DAYLIGHT.inkSoft,
          textAlign: "center",
          maxWidth: metrics.isIg ? 760 : 820,
          lineHeight: 1.35,
          opacity: 0.85,
        }}
      >
        {simadiData.bridgeApp.disclaimer}
      </div>
    </EditorialStage>
  );
};

// =====================================================================
// COMPOSICIÓN PRINCIPAL GUIADA POR TIMESTAMPS (`voiceover-cues.json`)
// =====================================================================

const SimadiAperturaEngine: React.FC<{ format: PromoFormat }> = ({ format }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const metrics = getDaylightMetrics(format);

  // Extrae tiempos reales desde voiceover-cues.json (sin números mágicos)
  const b1c1 = cuesSpec.blocks[0].cues[0];
  const b1c2 = cuesSpec.blocks[0].cues[1];
  const b2c1 = cuesSpec.blocks[1].cues[0];
  const b2c2 = cuesSpec.blocks[1].cues[1];
  const b2c3 = cuesSpec.blocks[1].cues[2];
  const b3c1 = cuesSpec.blocks[2].cues[0];
  const b3c2 = cuesSpec.blocks[2].cues[1];
  const b3c3 = cuesSpec.blocks[2].cues[2];
  const b4c1 = cuesSpec.blocks[3].cues[0];
  const b4c2 = cuesSpec.blocks[3].cues[1];

  const bridgeClickLocalFrames = getVerticalBridgeClickLocalFrames(26);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: DAYLIGHT.bg }}>
      <DaylightBackdrop metrics={metrics} totalFrames={durationInFrames} />

      {/* Cama musical minimalista luminosa con fade-in/fade-out suaves */}
      <Audio
        src={staticFile(cuesSpec.bgm)}
        volume={(f) => {
          const fadeIn = Math.min(1, f / (fps * 0.7));
          const fadeOut = Math.min(1, (durationInFrames - f) / (fps * 1.1));
          return 0.085 * Math.max(0, fadeIn) * Math.max(0, fadeOut);
        }}
        loop
      />

      {/* Acto 1: Gancho 60/40 + Regla 90 preguntas sin retroceso */}
      <Sequence from={b1c1.startFrame} durationInFrames={b1c1.endFrame - b1c1.startFrame}>
        <Cue1Peso6040 metrics={metrics} duration={b1c1.endFrame - b1c1.startFrame} />
      </Sequence>
      <Sequence from={b1c2.startFrame} durationInFrames={b1c2.endFrame - b1c2.startFrame} premountFor={60}>
        <Cue2Reglas90Atras metrics={metrics} duration={b1c2.endFrame - b1c2.startFrame} />
      </Sequence>

      {/* Acto 2: 3 Bloques de 30 preguntas */}
      <Sequence from={b2c1.startFrame} durationInFrames={b2c1.endFrame - b2c1.startFrame} premountFor={60}>
        <BlockPillarScene metrics={metrics} duration={b2c1.endFrame - b2c1.startFrame} activeIdx={0} />
      </Sequence>
      <Sequence from={b2c2.startFrame} durationInFrames={b2c2.endFrame - b2c2.startFrame} premountFor={60}>
        <BlockPillarScene metrics={metrics} duration={b2c2.endFrame - b2c2.startFrame} activeIdx={1} />
      </Sequence>
      <Sequence from={b2c3.startFrame} durationInFrames={b2c3.endFrame - b2c3.startFrame} premountFor={60}>
        <BlockPillarScene metrics={metrics} duration={b2c3.endFrame - b2c3.startFrame} activeIdx={2} />
      </Sequence>

      {/* Acto 3: Técnicas clave */}
      <Sequence from={b3c1.startFrame} durationInFrames={b3c1.endFrame - b3c1.startFrame} premountFor={60}>
        <Cue3Tiempo45 metrics={metrics} duration={b3c1.endFrame - b3c1.startFrame} />
      </Sequence>
      <Sequence from={b3c2.startFrame} durationInFrames={b3c2.endFrame - b3c2.startFrame} premountFor={60}>
        <Cue3Descarte metrics={metrics} duration={b3c2.endFrame - b3c2.startFrame} />
      </Sequence>
      <Sequence from={b3c3.startFrame} durationInFrames={b3c3.endFrame - b3c3.startFrame} premountFor={60}>
        <Cue3PapelYVerbal metrics={metrics} duration={b3c3.endFrame - b3c3.startFrame} />
      </Sequence>

      {/* Acto 4: Puente invisible a Simulación Simadi (Vertical HD) + CTA al DM */}
      <Sequence from={b4c1.startFrame} durationInFrames={b4c1.endFrame - b4c1.startFrame} premountFor={60}>
        <Cue4PuenteWeb metrics={metrics} duration={b4c1.endFrame - b4c1.startFrame} />
      </Sequence>
      <Sequence from={b4c2.startFrame} durationInFrames={b4c2.endFrame - b4c2.startFrame} premountFor={60}>
        <Cue4CtaDm metrics={metrics} duration={b4c2.endFrame - b4c2.startFrame} />
      </Sequence>

      {/* Paleta SFX editorial/táctil sincronizada al frame exacto */}
      <EditorialSfx file="paper_air_whoosh.mp3" from={0} volume={0.34} />
      <EditorialSfx file="wood_tap.mp3" from={24} volume={0.30} />

      <EditorialSfx file="paper_air_whoosh.mp3" from={b1c2.startFrame} volume={0.34} />
      <EditorialSfx file="clock_tick_soft.mp3" from={b1c2.startFrame + 30} volume={0.32} />
      <EditorialSfx file="clock_tick_soft.mp3" from={b1c2.startFrame + 65} volume={0.32} />
      <EditorialSfx file="ui_lock.mp3" from={b1c2.startFrame + 110} volume={0.44} />

      {/* Acto 2: Cambios de módulo, micro-ejemplo 30 y ramas */}
      <EditorialSfx file="paper_air_whoosh.mp3" from={b2c1.startFrame} volume={0.34} />
      <EditorialSfx file="wood_tap.mp3" from={b2c1.startFrame + 20} volume={0.28} />
      <EditorialSfx file="warm_bell.mp3" from={b2c1.startFrame + 220} volume={0.32} />

      <EditorialSfx file="paper_air_whoosh.mp3" from={b2c2.startFrame} volume={0.34} />
      <EditorialSfx file="wood_tap.mp3" from={b2c2.startFrame + 20} volume={0.28} />

      <EditorialSfx file="paper_air_whoosh.mp3" from={b2c3.startFrame} volume={0.34} />
      <EditorialSfx file="wood_tap.mp3" from={b2c3.startFrame + 22} volume={0.28} />

      {/* Acto 3: Reloj, tachado en descarte y dos hábitos */}
      <EditorialSfx file="paper_air_whoosh.mp3" from={b3c1.startFrame} volume={0.34} />
      <EditorialSfx file="clock_tick_soft.mp3" from={b3c1.startFrame + 30} volume={0.30} />
      <EditorialSfx file="clock_tick_soft.mp3" from={b3c1.startFrame + 90} volume={0.30} />

      <EditorialSfx file="paper_air_whoosh.mp3" from={b3c2.startFrame} volume={0.34} />
      <EditorialSfx file="trackpad_click.mp3" from={b3c2.startFrame + 62} volume={0.42} />
      <EditorialSfx file="trackpad_click.mp3" from={b3c2.startFrame + 104} volume={0.42} />

      <EditorialSfx file="paper_air_whoosh.mp3" from={b3c3.startFrame} volume={0.34} />
      <EditorialSfx file="wood_tap.mp3" from={b3c3.startFrame + 12} volume={0.28} />
      <EditorialSfx file="wood_tap.mp3" from={b3c3.startFrame + 68} volume={0.28} />

      {/* Acto 4: Puente web (clics reales del manifest + resultado) y burbuja al DM */}
      <EditorialSfx file="paper_air_whoosh.mp3" from={b4c1.startFrame} volume={0.38} />
      {bridgeClickLocalFrames.map((lf, idx) => (
        <EditorialSfx key={`vclick-${idx}`} file="trackpad_click.mp3" from={b4c1.startFrame + lf} volume={0.44} />
      ))}
      <EditorialSfx file="warm_bell.mp3" from={b4c1.startFrame + 392} volume={0.36} />

      <EditorialSfx file="paper_air_whoosh.mp3" from={b4c2.startFrame} volume={0.34} />
      <EditorialSfx file="dm_bubble.mp3" from={b4c2.startFrame + 28} volume={0.42} />
    </AbsoluteFill>
  );
};

/** Video 0 (Apertura Educativa) · TikTok / Reels / Shorts (1080×1920 @ 60 FPS). */
export const SimadiApertura: React.FC = () => <SimadiAperturaEngine format="tiktok" />;

/** Video 0 (Apertura Educativa) · Instagram Feed (1080×1350 @ 60 FPS). */
export const SimadiAperturaIG: React.FC = () => <SimadiAperturaEngine format="instagram" />;

