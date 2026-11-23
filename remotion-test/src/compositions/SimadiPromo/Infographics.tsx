/**
 * =====================================================================
 * 3 COMPONENTES MAESTROS DE INFOGRAFÍA EDITORIAL · SIMADI V3
 * =====================================================================
 * Diseñados sin cajas redondeadas pesadas (estructura abierta con líneas
 * `1px`, acentos finos y tipografía protagonista de alta legibilidad):
 *  1. `SplitMetricBar`: Proporciones animadas con `spring()` (`60% / 40%`
 *     o `45 / 45 / 45 + 15 min`) con cifras grandes.
 *  2. `ExamModuleCard`: Tarjeta editorial abierta para cada módulo (`30`
 *     preguntas), subtemas en `stagger` y micro-ejemplo animado en vivo.
 *  3. `EliminationDemo`: Simulación de pregunta de 4 opciones (`A–D`) con
 *     reloj `01:30` corriendo y tachado animado en `< 2.5s`.
 * =====================================================================
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  DAYLIGHT,
  FONT_EDITORIAL_MONO,
  FONT_EDITORIAL_SANS,
  FONT_EDITORIAL_SERIF,
  type DaylightMetrics,
} from "./DaylightTheme";

export interface MetricSegment {
  label: string;
  valueLabel: string;
  weight: number;
  color: string;
}

/**
 * 1. SplitMetricBar · Barra segmentada con cifras protagonistas y `spring()`.
 */
export const SplitMetricBar: React.FC<{
  segments: MetricSegment[];
  metrics: DaylightMetrics;
  delay?: number;
}> = ({ segments, metrics, delay = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalWeight = segments.reduce((acc, s) => acc + s.weight, 0) || 1;
  const grow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 130, mass: 0.9 },
  });

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: metrics.isIg ? 16 : 22 }}>
      {/* Cifras grandes encima de cada tramo */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
        {segments.map((seg, i) => {
          const itemSpring = spring({
            frame: frame - (delay + i * 8),
            fps,
            config: { damping: 18, stiffness: 170, mass: 0.7 },
          });
          return (
            <div
              key={`${seg.label}-${i}`}
              style={{
                flex: seg.weight,
                opacity: itemSpring,
                transform: `translateY(${(1 - itemSpring) * 18}px)`,
                textAlign: i === 0 ? "left" : i === segments.length - 1 ? "right" : "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_EDITORIAL_SERIF,
                  fontStyle: "italic",
                  fontSize: segments.length > 2 ? (metrics.isIg ? 44 : 54) : metrics.isIg ? 62 : 76,
                  lineHeight: 0.95,
                  color: seg.color,
                }}
              >
                {seg.valueLabel}
              </div>
              <div
                style={{
                  fontFamily: FONT_EDITORIAL_SANS,
                  fontWeight: 700,
                  fontSize: segments.length > 2 ? (metrics.isIg ? 18 : 21) : metrics.isIg ? 22 : 25,
                  color: DAYLIGHT.inkMuted,
                  marginTop: 6,
                }}
              >
                {seg.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra fina segmentada sin bordes pesados */}
      <div
        style={{
          width: "100%",
          height: metrics.isIg ? 18 : 22,
          borderRadius: 999,
          background: "rgba(15, 23, 42, 0.06)",
          display: "flex",
          gap: 5,
          padding: 3,
          boxSizing: "border-box",
        }}
      >
        {segments.map((seg, i) => {
          const pct = (seg.weight / totalWeight) * 100 * grow;
          return (
            <div
              key={`${seg.label}-bar-${i}`}
              style={{
                width: `${pct}%`,
                height: "100%",
                borderRadius: 999,
                background: seg.color,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

/** Iconos vectoriales limpios para áreas académicas (cero emojis). */
const FacultyIcon: React.FC<{ id: string; color: string }> = ({ id, color }) => {
  if (id === "ciencia") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6" />
        <path d="M10 3v6l-5 8.5A2 2 0 0 0 6.7 20.5h10.6a2 2 0 0 0 1.7-3L14 9V3" />
      </svg>
    );
  }
  if (id === "salud") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.5-9-9.5C1.2 7.2 4.5 3.5 8.3 4.2c2 .4 3.2 1.7 3.7 2.8.5-1.1 1.7-2.4 3.7-2.8 3.8-.7 7.1 3 5.3 7.3-2 5-9 9.5-9 9.5z" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 0 0 18M12 3a14 14 0 0 1 0 18" />
    </svg>
  );
};

export interface ExamModuleCardProps {
  index: string;
  title: string;
  questions: number;
  topics?: string[];
  note?: string;
  faculties?: Array<{ id: string; label: string }>;
  microExample?:
    | {
        kind: "number-series";
        sequence: number[];
        diffs: string[];
        answer: number;
      }
    | {
        kind: "connector-highlight";
        sentenceBefore: string;
        connector: string;
        sentenceAfter: string;
        tag: string;
      };
  metrics: DaylightMetrics;
}

/**
 * 2. ExamModuleCard · Módulo editorial abierto (sin caja cerrada) que revela
 * subtemas en entrada escalonada + un micro-ejemplo educativo animado en vivo.
 */
export const ExamModuleCard: React.FC<ExamModuleCardProps> = ({
  index,
  title,
  questions,
  topics,
  note,
  faculties,
  microExample,
  metrics,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 170, mass: 0.72 },
  });

  // Cambio de foco interno para ejemplo microscópico ~1.8s después de entrar
  const exampleReveal = spring({
    frame: frame - 108,
    fps,
    config: { damping: 17, stiffness: 165, mass: 0.75 },
  });

  return (
    <div
      style={{
        width: "100%",
        borderLeft: `4px solid ${DAYLIGHT.cobalt}`,
        paddingLeft: metrics.isIg ? 28 : 34,
        display: "flex",
        flexDirection: "column",
        gap: metrics.isIg ? 18 : 26,
      }}
    >
      {/* Cabecera abierta: número grande + título + conteo */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          opacity: headerSpring,
          transform: `translateX(${(1 - headerSpring) * 28}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span
            style={{
              fontFamily: FONT_EDITORIAL_SERIF,
              fontStyle: "italic",
              fontSize: metrics.isIg ? 52 : 64,
              color: DAYLIGHT.cobalt,
              lineHeight: 1,
            }}
          >
            {index}
          </span>
          <span
            style={{
              fontFamily: FONT_EDITORIAL_SANS,
              fontWeight: 800,
              fontSize: metrics.isIg ? 38 : 48,
              letterSpacing: "-0.025em",
              color: DAYLIGHT.ink,
              lineHeight: 1.08,
            }}
          >
            {title}
          </span>
        </div>

        <span
          style={{
            fontFamily: FONT_EDITORIAL_MONO,
            fontWeight: 700,
            fontSize: metrics.isIg ? 22 : 26,
            color: DAYLIGHT.cobalt,
            whiteSpace: "nowrap",
          }}
        >
          {questions} preg.
        </span>
      </div>

      {/* Subtemas en flujo abierto (stagger mínimo sin bordes pesados) */}
      {topics && topics.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: metrics.isIg ? 10 : 12,
          }}
        >
          {topics.map((topic, i) => {
            const p = spring({
              frame: frame - (16 + i * 7),
              fps,
              config: { damping: 18, stiffness: 200, mass: 0.6 },
            });
            return (
              <span
                key={topic}
                style={{
                  fontFamily: FONT_EDITORIAL_SANS,
                  fontWeight: 600,
                  fontSize: metrics.isIg ? 23 : 27,
                  color: DAYLIGHT.ink,
                  padding: "7px 16px",
                  borderBottom: `2px solid ${DAYLIGHT.cobaltBorder}`,
                  background: "rgba(255, 255, 255, 0.72)",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 14}px)`,
                }}
              >
                {topic}
              </span>
            );
          })}
        </div>
      )}

      {/* Nota breve cuando aplica a Área Específica */}
      {note && (
        <div
          style={{
            fontFamily: FONT_EDITORIAL_SANS,
            fontWeight: 600,
            fontSize: metrics.isIg ? 24 : 28,
            color: DAYLIGHT.inkMuted,
            opacity: headerSpring,
          }}
        >
          {note}
        </div>
      )}

      {/*Selector abierto de facultades (Bloque 03)*/}
      {faculties && faculties.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: metrics.isIg ? 14 : 18 }}>
          {faculties.map((fac, i) => {
            const fp = spring({
              frame: frame - (22 + i * 24),
              fps,
              config: { damping: 18, stiffness: 180, mass: 0.68 },
            });
            const isHighlighted = Math.floor(frame / 95) % faculties.length === i;
            return (
              <div
                key={fac.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 4px",
                  borderBottom: `1px solid ${isHighlighted ? DAYLIGHT.cobalt : DAYLIGHT.hairline}`,
                  opacity: fp,
                  transform: `translateX(${(1 - fp) * 24}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <FacultyIcon id={fac.id} color={isHighlighted ? DAYLIGHT.cobalt : DAYLIGHT.inkMuted} />
                  <span
                    style={{
                      fontFamily: FONT_EDITORIAL_SANS,
                      fontWeight: isHighlighted ? 800 : 600,
                      fontSize: metrics.isIg ? 28 : 34,
                      color: isHighlighted ? DAYLIGHT.cobalt : DAYLIGHT.ink,
                    }}
                  >
                    {fac.label}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: FONT_EDITORIAL_MONO,
                    fontSize: 20,
                    fontWeight: 700,
                    color: isHighlighted ? DAYLIGHT.cobalt : DAYLIGHT.inkSoft,
                  }}
                >
                  {isHighlighted ? "ACTIVO" : "30 PREG."}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Micro-ejemplo animado real 1: Serie numérica 2, 6, 12, 20, ? -> 30 */}
      {microExample && microExample.kind === "number-series" && (
        <div
          style={{
            marginTop: metrics.isIg ? 6 : 12,
            paddingTop: metrics.isIg ? 16 : 22,
            borderTop: `1px solid ${DAYLIGHT.hairline}`,
            opacity: exampleReveal,
            transform: `translateY(${(1 - exampleReveal) * 16}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_EDITORIAL_MONO,
              fontSize: metrics.isIg ? 17 : 19,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: DAYLIGHT.inkSoft,
              marginBottom: metrics.isIg ? 12 : 16,
            }}
          >
            EJEMPLO EN VIVO · PATRÓN DE SERIE
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            {microExample.sequence.map((num, idx) => {
              const diffSpring = spring({
                frame: frame - (135 + idx * 18),
                fps,
                config: { damping: 16, stiffness: 180, mass: 0.65 },
              });
              return (
                <React.Fragment key={`${num}-${idx}`}>
                  <span
                    style={{
                      fontFamily: FONT_EDITORIAL_MONO,
                      fontWeight: 800,
                      fontSize: metrics.isIg ? 40 : 48,
                      color: DAYLIGHT.ink,
                    }}
                  >
                    {num}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      opacity: diffSpring,
                      transform: `translateY(${(1 - diffSpring) * 10}px)`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_EDITORIAL_MONO,
                        fontSize: metrics.isIg ? 22 : 26,
                        fontWeight: 800,
                        color: DAYLIGHT.cobalt,
                      }}
                    >
                      {microExample.diffs[idx]}
                    </span>
                    <span style={{ fontFamily: FONT_EDITORIAL_MONO, fontSize: 20, fontWeight: 700, color: DAYLIGHT.cobalt }}>
                      →
                    </span>
                  </div>
                </React.Fragment>
              );
            })}

            {(() => {
              const answerSpring = spring({
                frame: frame - 220,
                fps,
                config: { damping: 14, stiffness: 185, mass: 0.65 },
              });
              const resolved = frame >= 220;
              return (
                <span
                  style={{
                    fontFamily: FONT_EDITORIAL_SERIF,
                    fontStyle: "italic",
                    fontSize: metrics.isIg ? 58 : 70,
                    color: resolved ? DAYLIGHT.cobalt : DAYLIGHT.inkSoft,
                    transform: `scale(${resolved ? 0.85 + answerSpring * 0.25 : 1})`,
                  }}
                >
                  {resolved ? microExample.answer : "?"}
                </span>
              );
            })()}
          </div>
        </div>
      )}

      {/* Micro-ejemplo animado real 2: Resaltado de conector verbal */}
      {microExample && microExample.kind === "connector-highlight" && (
        <div
          style={{
            marginTop: metrics.isIg ? 6 : 12,
            paddingTop: metrics.isIg ? 16 : 22,
            borderTop: `1px solid ${DAYLIGHT.hairline}`,
            opacity: exampleReveal,
            transform: `translateY(${(1 - exampleReveal) * 16}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_EDITORIAL_MONO,
              fontSize: metrics.isIg ? 17 : 19,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: DAYLIGHT.inkSoft,
              marginBottom: 10,
            }}
          >
            LECTURA ACTIVA · CONECTOR CLAVE
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: FONT_EDITORIAL_SANS,
              fontWeight: 600,
              fontSize: metrics.isIg ? 28 : 34,
              lineHeight: 1.35,
              color: DAYLIGHT.ink,
            }}
          >
            {microExample.sentenceBefore}
            <span
              style={{
                fontFamily: FONT_EDITORIAL_SERIF,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: metrics.isIg ? 34 : 42,
                color: DAYLIGHT.cobalt,
                borderBottom: `3px solid ${DAYLIGHT.cobalt}`,
                paddingBottom: 2,
              }}
            >
              {microExample.connector}
            </span>
            {microExample.sentenceAfter}
          </p>
          <div
            style={{
              marginTop: 10,
              fontFamily: FONT_EDITORIAL_MONO,
              fontSize: metrics.isIg ? 18 : 21,
              fontWeight: 700,
              color: DAYLIGHT.cobalt,
            }}
          >
            {microExample.tag}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * 3. EliminationDemo · Simulación limpia de descarte rápido (A y C tachadas)
 * junto a un reloj minimalista `01:30`.
 */
export const EliminationDemo: React.FC<{
  prompt: string;
  options: Array<{ key: string; text: string; eliminate: boolean }>;
  metrics: DaylightMetrics;
}> = ({ prompt, options, metrics }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 18, stiffness: 180, mass: 0.7 } });
  const strikeProgressA = interpolate(frame, [62, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const strikeProgressC = interpolate(frame, [104, 124], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const remainingSeconds = Math.max(84, 90 - Math.floor(frame / 45));
  const mm = `0${Math.floor(remainingSeconds / 60)}`;
  const ss = remainingSeconds % 60 < 10 ? `0${remainingSeconds % 60}` : `${remainingSeconds % 60}`;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: metrics.isIg ? 14 : 20,
        opacity: intro,
        transform: `translateY(${(1 - intro) * 18}px)`,
      }}
    >
      {/* Cabecera con reloj corriendo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 12,
          borderBottom: `1px solid ${DAYLIGHT.hairline}`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_EDITORIAL_MONO,
            fontWeight: 700,
            fontSize: metrics.isIg ? 18 : 21,
            color: DAYLIGHT.cobalt,
            letterSpacing: "0.06em",
          }}
        >
          DESCARTE EN &lt; 3s · VACÍAS CUENTAN MAL
        </span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DAYLIGHT.danger} strokeWidth="2.2">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2.5 1.5" />
            <path d="M9 3h6" />
          </svg>
          <span
            style={{
              fontFamily: FONT_EDITORIAL_MONO,
              fontWeight: 800,
              fontSize: metrics.isIg ? 24 : 28,
              color: DAYLIGHT.danger,
            }}
          >
            {mm}:{ss}
          </span>
        </div>
      </div>

      {/* Enunciado limpio sin caja */}
      <p
        style={{
          margin: 0,
          fontFamily: FONT_EDITORIAL_SANS,
          fontWeight: 700,
          fontSize: metrics.isIg ? 25 : 30,
          lineHeight: 1.32,
          color: DAYLIGHT.ink,
        }}
      >
        {prompt}
      </p>

      {/* Opciones abiertas en filas limpias con trazo tachado dinámico */}
      <div style={{ display: "flex", flexDirection: "column", gap: metrics.isIg ? 8 : 12 }}>
        {options.map((opt) => {
          const strike = opt.key === "A" ? strikeProgressA : opt.key === "C" ? strikeProgressC : 0;
          const isCut = opt.eliminate && strike > 0.05;
          const fadeOpacity = opt.eliminate ? 1 - strike * 0.64 : 1;

          return (
            <div
              key={opt.key}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: metrics.isIg ? "10px 6px" : "12px 8px",
                borderBottom: `1px solid ${DAYLIGHT.hairline}`,
                opacity: fadeOpacity,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span
                  style={{
                    fontFamily: FONT_EDITORIAL_MONO,
                    fontWeight: 800,
                    fontSize: metrics.isIg ? 22 : 26,
                    color: isCut ? DAYLIGHT.danger : DAYLIGHT.cobalt,
                  }}
                >
                  {opt.key}.
                </span>
                <span
                  style={{
                    fontFamily: FONT_EDITORIAL_SANS,
                    fontWeight: 600,
                    fontSize: metrics.isIg ? 24 : 28,
                    color: DAYLIGHT.ink,
                  }}
                >
                  {opt.text}
                </span>
              </div>

              <span
                style={{
                  fontFamily: FONT_EDITORIAL_MONO,
                  fontSize: 18,
                  fontWeight: 700,
                  color: isCut ? DAYLIGHT.danger : DAYLIGHT.cobalt,
                }}
              >
                {isCut ? "DESCARTADA" : !opt.eliminate && strikeProgressC > 0.8 ? "CANDIDATA" : ""}
              </span>

              {/* Línea roja limpia animada */}
              {opt.eliminate && strike > 0 && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "52%",
                    width: `${strike * 100}%`,
                    height: 2.5,
                    background: DAYLIGHT.danger,
                    borderRadius: 99,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

