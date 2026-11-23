/**
 * =====================================================================
 * ICONOGRAFÍA VECTORIAL SVG, SELLO UCV Y ESQUEMAS ANIMADOS · SIMADI V2
 * =====================================================================
 * Cumple estrictamente `GEMINI.md` y los requerimientos editoriales:
 *  - Escudo oficial UCV (`ucv_logo.svg`) en emblema de alto contraste.
 *  - Iconografía 100% SVG (incluyendo `message-dm` y `shield-info`).
 *  - Esquemas claros y escaneables para ambos videos (Simulacro & Guías).
 *  - Aclaratoria discreta y honesta de herramienta complementaria en Beta
 *    que no reemplaza centros preuniversitarios + CTA directo al DM.
 * =====================================================================
 */
import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_MONO, FONT_SANS } from "../../lib/theme";
import type { FormatMetrics, SimadiIconName, SimadiThemeJson } from "./types";

export const SimadiIcon: React.FC<{
  name: SimadiIconName;
  size?: number;
  color?: string;
}> = ({ name, size = 26, color = "#FFFFFF" }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "clock-alert":
      return (
        <svg {...common}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 2.5" />
          <path d="M5 3 2 6" />
          <path d="m22 6-3-3" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 2 9 4.5-9 4.5-9-4.5L12 2Z" />
          <path d="m3 12 9 4.5 9-4.5" />
          <path d="m3 17.5 9 4.5 9-4.5" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <line x1="4" x2="20" y1="7" y2="7" />
          <circle cx="9" cy="7" r="2.5" fill={color} />
          <line x1="4" x2="20" y1="17" y2="17" />
          <circle cx="15" cy="17" r="2.5" fill={color} />
        </svg>
      );
    case "timer":
      return (
        <svg {...common}>
          <line x1="10" x2="14" y1="2" y2="2" />
          <line x1="12" x2="15" y1="14" y2="11" />
          <circle cx="12" cy="14" r="8" />
        </svg>
      );
    case "book-open":
      return (
        <svg {...common}>
          <path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2Z" />
          <path d="M22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8Z" />
        </svg>
      );
    case "chart-bar":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <rect x="7" y="11" width="3" height="7" rx="1" fill={color} />
          <rect x="12" y="7" width="3" height="11" rx="1" fill={color} />
          <rect x="17" y="4" width="3" height="14" rx="1" fill={color} />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </svg>
      );
    case "message-dm":
      return (
        <svg {...common}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8" />
          <path d="M8 13h5" />
        </svg>
      );
    case "shield-info":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
  }
};

/**
 * Emblema institucional reutilizable con el escudo oficial de la UCV (`ucv_logo.svg`)
 * + indicación limpia de fase Beta.
 */
export const UcvSealBadge: React.FC<{
  metrics: FormatMetrics;
  subtitle?: string;
}> = ({ metrics, subtitle = "Prueba T.D.I. · Universidad Central de Venezuela" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame + 4, fps, config: { damping: 18, stiffness: 170, mass: 0.7 } });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        width: "100%",
        padding: metrics.isIg ? "14px 20px" : "18px 24px",
        borderRadius: 20,
        background: "rgba(15, 23, 42, 0.78)",
        border: "1.5px solid rgba(56, 189, 248, 0.40)",
        boxShadow: "0 16px 36px rgba(2, 6, 23, 0.40)",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 14}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: metrics.isIg ? 52 : 60,
            height: metrics.isIg ? 52 : 60,
            borderRadius: "50%",
            background: "#FFFFFF",
            padding: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #38BDF8",
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile("captures/simadi/ucv_logo.svg")}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div>
          <div style={{ fontFamily: FONT_SANS, fontSize: metrics.isIg ? 22 : 25, fontWeight: 800, color: "#FFFFFF" }}>
            Enfoque SIMADI · UCV
          </div>
          <div style={{ fontFamily: FONT_SANS, fontSize: metrics.isIg ? 17 : 19, color: "#BAE6FD", fontWeight: 500 }}>
            {subtitle}
          </div>
        </div>
      </div>

      <span
        style={{
          padding: "5px 12px",
          borderRadius: 999,
          background: "rgba(245, 158, 11, 0.16)",
          border: "1px solid rgba(245, 158, 11, 0.55)",
          fontFamily: FONT_MONO,
          fontSize: 15,
          fontWeight: 800,
          color: "#FDE68A",
          letterSpacing: "0.06em",
          flexShrink: 0,
        }}
      >
        FASE BETA
      </span>
    </div>
  );
};

/**
 * Nota discreta y transparente: Simadi acompaña tu estudio y no reemplaza un preuniversitario.
 */
export const CompanionDisclaimerNote: React.FC<{
  metrics: FormatMetrics;
  text?: string;
}> = ({
  metrics,
  text = "Herramienta complementaria en fase Beta · No reemplaza un centro preuniversitario",
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: metrics.isIg ? "9px 16px" : "11px 20px",
        borderRadius: 14,
        background: "rgba(15, 23, 42, 0.72)",
        border: "1px solid rgba(148, 163, 184, 0.35)",
        fontFamily: FONT_SANS,
        fontSize: metrics.isIg ? 17 : 19,
        fontWeight: 600,
        color: "#CBD5E1",
        textAlign: "center",
      }}
    >
      <SimadiIcon name="shield-info" size={18} color="#94A3B8" />
      <span>{text}</span>
    </div>
  );
};

/**
 * Video 1 · Hook: Presión del reloj vs práctica cronometrada + Sello UCV.
 */
export const PressureVsControlDiagram: React.FC<{
  theme: SimadiThemeJson;
  metrics: FormatMetrics;
}> = ({ theme, metrics }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEnter = spring({
    frame: frame + 6,
    fps,
    config: { damping: 16, stiffness: 150, mass: 0.75 },
  });
  const timerPulse = 1 + Math.sin(frame / 10) * 0.03;
  const remainingSec = Math.max(0, 59 - Math.floor(frame / 16));
  const formattedClock = `00:${remainingSec < 10 ? "0" : ""}${remainingSec}`;
  const arcProgress = spring({
    frame: frame - 8,
    fps,
    config: { damping: 22, stiffness: 90, mass: 0.9 },
  });
  const dashOffset = interpolate(arcProgress, [0, 1], [283, 68], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pad = metrics.isIg ? "24px 28px" : "34px 36px";
  const ringSize = metrics.isIg ? 156 : 196;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: metrics.diagramGap,
        width: "100%",
        transform: `translateY(${(1 - cardEnter) * 24}px) scale(${0.96 + cardEnter * 0.04})`,
        opacity: Math.min(1, 0.4 + cardEnter * 0.6),
      }}
    >
      <UcvSealBadge metrics={metrics} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 26,
          background: "rgba(255, 255, 255, 0.97)",
          borderRadius: 24,
          padding: pad,
          border: `2px solid ${theme.colors.border}`,
          boxShadow: "0 26px 60px rgba(2, 6, 23, 0.42)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              alignSelf: "flex-start",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(239, 68, 68, 0.12)",
              color: theme.colors.danger,
              fontFamily: FONT_MONO,
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: "0.06em",
            }}
          >
            <SimadiIcon name="clock-alert" size={17} color={theme.colors.danger} />
            PRESIÓN REAL DE EXAMEN
          </span>

          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: metrics.isIg ? 30 : 36,
              fontWeight: 800,
              color: theme.colors.textPrimary,
              lineHeight: 1.15,
            }}
          >
            Sin práctica cronometrada
          </div>

          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: metrics.isIg ? 21 : 24,
              fontWeight: 500,
              color: theme.colors.textSecondary,
              lineHeight: 1.35,
            }}
          >
            Dudas 40s por pregunta y el reloj se agota antes de entregar.
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: ringSize,
            height: ringSize,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${timerPulse})`,
          }}
        >
          <svg width={ringSize} height={ringSize} viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="45" fill="none" stroke="#E2E8F0" strokeWidth="10" />
            <circle
              cx="55"
              cy="55"
              r="45"
              fill="none"
              stroke={theme.colors.danger}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={dashOffset}
              transform="rotate(-90 55 55)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              fontFamily: FONT_MONO,
              fontSize: metrics.isIg ? 26 : 32,
              fontWeight: 800,
              color: theme.colors.danger,
            }}
          >
            {formattedClock}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(15, 82, 186, 0.24)",
          borderRadius: 22,
          padding: metrics.isIg ? "18px 24px" : "24px 30px",
          border: "1.5px solid rgba(56, 189, 248, 0.45)",
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: theme.colors.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <SimadiIcon name="timer" size={26} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ fontFamily: FONT_SANS, fontSize: metrics.isIg ? 23 : 26, fontWeight: 800, color: "#FFFFFF" }}>
            Entrena tu ritmo antes del examen UCV
          </div>
          <div style={{ fontFamily: FONT_SANS, fontSize: metrics.isIg ? 19 : 21, color: "rgba(255,255,255,0.82)" }}>
            Acompaña tu preparación practicando con cronómetro real.
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Video 2 · Hook: Apuntes dispersos vs Temario estructurado UCV.
 */
export const ChaosVsOrderDiagram: React.FC<{
  theme: SimadiThemeJson;
  metrics: FormatMetrics;
}> = ({ theme, metrics }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEnter = spring({
    frame: frame + 6,
    fps,
    config: { damping: 16, stiffness: 155, mass: 0.75 },
  });

  const tags = ["PDFs sueltos", "Fotos sin orden", "Temas incompletos"];
  const organized = ["Razonamiento Verbal", "Lógico Numérico", "Ciencia y Tecnología"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: metrics.diagramGap,
        width: "100%",
        opacity: Math.min(1, 0.4 + cardEnter * 0.6),
        transform: `translateY(${(1 - cardEnter) * 22}px)`,
      }}
    >
      <UcvSealBadge metrics={metrics} subtitle="Temario organizado para el T.D.I. · UCV" />

      <div
        style={{
          background: "rgba(255, 255, 255, 0.97)",
          borderRadius: 24,
          padding: metrics.isIg ? "22px 26px" : "30px 34px",
          border: `2px solid ${theme.colors.border}`,
          boxShadow: "0 24px 55px rgba(2, 6, 23, 0.42)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 17,
            fontWeight: 800,
            color: theme.colors.danger,
            letterSpacing: "0.06em",
          }}
        >
          ANTES · MATERIAL DISPERSO
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {tags.map((t, i) => (
            <span
              key={t}
              style={{
                padding: "9px 16px",
                borderRadius: 12,
                background: "rgba(239, 68, 68, 0.10)",
                border: "1px solid rgba(239, 68, 68, 0.35)",
                fontFamily: FONT_SANS,
                fontSize: metrics.isIg ? 20 : 22,
                fontWeight: 700,
                color: "#B91C1C",
                transform: `rotate(${(i - 1) * 1.6}deg)`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "rgba(15, 82, 186, 0.24)",
          borderRadius: 24,
          padding: metrics.isIg ? "22px 26px" : "28px 34px",
          border: "1.5px solid rgba(56, 189, 248, 0.48)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 17,
            fontWeight: 800,
            color: "#38BDF8",
            letterSpacing: "0.06em",
          }}
        >
          CON SIMADI · GUÍAS POR ÁREA
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {organized.map((item) => (
            <span
              key={item}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 16px",
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.95)",
                fontFamily: FONT_SANS,
                fontSize: metrics.isIg ? 19 : 21,
                fontWeight: 800,
                color: theme.colors.primary,
              }}
            >
              <SimadiIcon name="check" size={18} color={theme.colors.success} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Video 1 · Estrategia: 3 pilares + aclaratoria discreta de complemento Beta.
 */
export const ThreePillarsDiagram: React.FC<{
  theme: SimadiThemeJson;
  metrics: FormatMetrics;
}> = ({ theme, metrics }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillars: Array<{
    num: string;
    icon: SimadiIconName;
    title: string;
    desc: string;
    accent: string;
    delay: number;
  }> = [
    {
      num: "01",
      icon: "timer",
      title: "Simulacros en Tiempo Real",
      desc: "Cronómetro activo para aprender a distribuir tus minutos.",
      accent: theme.colors.primary,
      delay: 12,
    },
    {
      num: "02",
      icon: "book-open",
      title: "Guías y Repaso por Tema",
      desc: "Ejercicios organizados para estudiar sin material disperso.",
      accent: "#0284C7",
      delay: 42,
    },
    {
      num: "03",
      icon: "chart-bar",
      title: "Diagnóstico al Instante",
      desc: "Aciertos, errores y seguimiento personal según tu ritmo.",
      accent: theme.colors.success,
      delay: 72,
    },
  ];

  const dashFlow = -(frame * 2.2) % 24;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: metrics.isIg ? 16 : 24,
        width: "100%",
      }}
    >
      <svg
        width="6"
        height={metrics.isIg ? 250 : 320}
        style={{ position: "absolute", left: 56, top: 52, zIndex: 0 }}
      >
        <line
          x1="3"
          y1="0"
          x2="3"
          y2="320"
          stroke="#38BDF8"
          strokeWidth="4"
          strokeDasharray="12 12"
          strokeDashoffset={dashFlow}
          strokeLinecap="round"
        />
      </svg>

      {pillars.map((p) => {
        const enter = spring({
          frame: frame - p.delay,
          fps,
          config: { damping: 16, stiffness: 170, mass: 0.72 },
        });
        const floatY = Math.sin((frame + p.delay * 2) / 24) * 3;
        return (
          <div
            key={p.num}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 20,
              background: "rgba(255, 255, 255, 0.97)",
              borderRadius: 22,
              padding: metrics.isIg ? "18px 24px" : "24px 30px",
              border: `2px solid ${theme.colors.border}`,
              boxShadow: "0 20px 48px rgba(2, 6, 23, 0.34)",
              opacity: enter,
              transform: `translateX(${(1 - enter) * -42}px) translateY(${floatY}px)`,
            }}
          >
            <div
              style={{
                width: metrics.isIg ? 58 : 68,
                height: metrics.isIg ? 58 : 68,
                borderRadius: 18,
                background: p.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <SimadiIcon name={p.icon} size={30} color="#FFFFFF" />
            </div>

            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 15,
                  fontWeight: 800,
                  color: p.accent,
                  letterSpacing: "0.08em",
                }}
              >
                PILAR {p.num}
              </span>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: metrics.isIg ? 26 : 30,
                  fontWeight: 800,
                  color: theme.colors.textPrimary,
                  lineHeight: 1.15,
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: metrics.isIg ? 20 : 22,
                  color: theme.colors.textSecondary,
                  lineHeight: 1.3,
                  marginTop: 4,
                }}
              >
                {p.desc}
              </div>
            </div>
          </div>
        );
      })}

      <CompanionDisclaimerNote metrics={metrics} />
    </div>
  );
};

/**
 * Video 2 · Estrategia: Enfoque acompañante al estudio preuniversitario + fase Beta.
 */
export const CompanionPillarsDiagram: React.FC<{
  theme: SimadiThemeJson;
  metrics: FormatMetrics;
}> = ({ theme, metrics }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items: Array<{ icon: SimadiIconName; title: string; desc: string; delay: number }> = [
    {
      icon: "layers",
      title: "Complemento de tu Preuniversitario",
      desc: "Refuerza en casa lo que ves en clase; no sustituye a tu academia.",
      delay: 12,
    },
    {
      icon: "sliders",
      title: "Adaptado a tu Ritmo y Metas",
      desc: "Elige los temas que necesitas practicar y mide tu avance.",
      delay: 42,
    },
    {
      icon: "shield-info",
      title: "Plataforma en Fase Beta Activa",
      desc: "Seguimos calibrando ejercicios y mejoras junto a los estudiantes.",
      delay: 72,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: metrics.isIg ? 16 : 24, width: "100%" }}>
      {items.map((item) => {
        const enter = spring({
          frame: frame - item.delay,
          fps,
          config: { damping: 16, stiffness: 170, mass: 0.72 },
        });
        return (
          <div
            key={item.title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              background: "rgba(255, 255, 255, 0.97)",
              borderRadius: 22,
              padding: metrics.isIg ? "20px 24px" : "26px 30px",
              border: `2px solid ${theme.colors.border}`,
              boxShadow: "0 20px 48px rgba(2, 6, 23, 0.34)",
              opacity: enter,
              transform: `translateY(${(1 - enter) * 28}px)`,
            }}
          >
            <div
              style={{
                width: metrics.isIg ? 58 : 66,
                height: metrics.isIg ? 58 : 66,
                borderRadius: 18,
                background: theme.colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <SimadiIcon name={item.icon} size={30} color="#FFFFFF" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: metrics.isIg ? 25 : 29,
                  fontWeight: 800,
                  color: theme.colors.textPrimary,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: metrics.isIg ? 19 : 22,
                  color: theme.colors.textSecondary,
                  marginTop: 4,
                  lineHeight: 1.32,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Tarjeta final DM-First compartida por ambos videos:
 * Muestra KPIs reales, sello UCV, botón directo al DM para dudas y nota Beta/acompañante.
 */
export const DmCtaShowcase: React.FC<{
  theme: SimadiThemeJson;
  metrics: FormatMetrics;
  dmText?: string;
}> = ({ theme, metrics, dmText = "¿Tienes dudas? Escríbeme al DM" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kpis = [
    { val: "+700", label: "Ejercicios Reales", icon: "book-open" as SimadiIconName, delay: 8 },
    { val: "BETA", label: "Mejora Continua", icon: "shield-info" as SimadiIconName, delay: 22 },
    { val: "UCV", label: "Guía y Práctica", icon: "chart-bar" as SimadiIconName, delay: 36 },
  ];

  const dmSpring = spring({
    frame: frame - 48,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.7 },
  });
  const dmPulse = 1 + Math.sin(frame / 12) * 0.025;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: metrics.isIg ? 18 : 26,
        width: "100%",
      }}
    >
      <UcvSealBadge metrics={metrics} subtitle="Apoyo complementario para aspirantes UCV" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          width: "100%",
        }}
      >
        {kpis.map((k) => {
          const p = spring({
            frame: frame - k.delay,
            fps,
            config: { damping: 15, stiffness: 170, mass: 0.7 },
          });
          return (
            <div
              key={k.label}
              style={{
                background: "rgba(255, 255, 255, 0.96)",
                borderRadius: 20,
                padding: metrics.isIg ? "18px 12px" : "24px 14px",
                textAlign: "center",
                border: `2px solid ${theme.colors.border}`,
                boxShadow: "0 18px 40px rgba(2, 6, 23, 0.35)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity: p,
                transform: `translateY(${(1 - p) * 24}px) scale(${0.92 + p * 0.08})`,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "rgba(15, 82, 186, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SimadiIcon name={k.icon} size={22} color={theme.colors.primary} />
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: metrics.isIg ? 28 : 32,
                  fontWeight: 800,
                  color: theme.colors.primary,
                }}
              >
                {k.val}
              </div>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 17,
                  fontWeight: 700,
                  color: theme.colors.textSecondary,
                }}
              >
                {k.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón CTA directo al DM */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: theme.colors.primary,
          color: theme.colors.primaryText,
          borderRadius: 20,
          padding: metrics.isIg ? "22px 28px" : "26px 34px",
          fontFamily: FONT_SANS,
          fontSize: metrics.isIg ? 28 : 32,
          fontWeight: 800,
          boxShadow: "0 20px 50px rgba(15, 82, 186, 0.55)",
          border: "2px solid rgba(255, 255, 255, 0.30)",
          opacity: dmSpring,
          transform: `scale(${dmSpring * dmPulse})`,
        }}
      >
        <SimadiIcon name="message-dm" size={32} color="#FFFFFF" />
        <span>{dmText}</span>
        <SimadiIcon name="arrow-right" size={26} color="#FFFFFF" />
      </div>

      <CompanionDisclaimerNote metrics={metrics} />
    </div>
  );
};
