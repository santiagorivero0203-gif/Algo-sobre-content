/**
 * =====================================================================
 * PYQUEST · EPISODIO 2: "VARIABLES Y TIPOS DE DATOS: EL ADN DE TU HÉROE"
 * =====================================================================
 * Nivel de producción: Studio-grade interactivo (Pedagogía visual paso a paso).
 * Resolución: 1080x1920 (Vertical 9:16) @ 60 FPS.
 * Duración Total: 53.0 segundos exactos (3180 frames).
 *
 * 5 Reglas de Hierro Aplicadas:
 * 1. Centrado Vertical Dinámico (`justifyContent: 'center'`): Cero medio lienzo vacío.
 * 2. Transiciones con `<Sequence>` estrictos y animación de salida explícita (`exit`):
 *    Cero textos encimados entre escenas.
 * 3. Prohibido más de 90 frames (1.5s) sin cambios en el DOM: Sub-eventos continuos.
 * 4. Duración compacta de alta retención: 53 segundos (3180 frames).
 * 5. Paleta de Fondo Neutra (`#F8FAFC` / `#F1F5F9`) con orbes difuminados (`blur(130px)`,
 *    opacidad <= 0.22).
 * =====================================================================
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  interpolateColors,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_MONO, FONT_SANS } from "../../theme";
import { PyQuestSfx } from "../../sfx";
import {
  IconBolt,
  IconBox,
  IconCheck,
  IconComment,
  IconCrash,
  IconDna,
  IconHeart,
  IconPlus,
  IconSparkles,
  IconSwords,
  IconTag,
  IconWarning,
} from "../../components/PyQuestIcons";

// =====================================================================
// AVATAR VECTORIAL REACTIVO DE ARIA (REUTILIZADO DE EP. 1)
// =====================================================================
const HeroAvatar: React.FC<{
  frame: number;
  size?: number;
  frozen?: boolean;
  powered?: boolean;
}> = ({ frame, size = 80, frozen = false, powered = false }) => {
  const breathY = frozen ? 0 : Math.sin(frame / 16) * 2.5;
  const hairTilt = frozen ? 0 : Math.sin(frame / 22) * 3;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 22,
        background: frozen
          ? "linear-gradient(135deg, #E0F2FE 0%, #7DD3FC 100%)"
          : powered
          ? "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)"
          : "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
        border: `2px solid ${frozen ? "#0284C7" : powered ? "#7C3AED" : "#38BDF8"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        width={size * 0.78}
        height={size * 0.78}
        viewBox="0 0 48 48"
        fill="none"
        style={{
          transform: `translateY(${breathY}px) rotate(${hairTilt}deg)`,
          filter: frozen ? "hue-rotate(165deg) saturate(1.4)" : "none",
        }}
      >
        <circle cx="24" cy="22" r="14" fill="#FBBF24" />
        <path
          d="M10 24 C10 16 38 16 38 24 C38 34 32 38 24 38 C16 38 10 34 10 24 Z"
          fill="#F59E0B"
        />
        <circle cx="24" cy="24" r="12" fill="#FED7AA" />
        <circle cx="20" cy="23" r="2.2" fill="#0F172A" />
        <circle cx="28" cy="23" r="2.2" fill="#0F172A" />
        <circle cx="21" cy="22.2" r="0.8" fill="#FFFFFF" />
        <circle cx="29" cy="22.2" r="0.8" fill="#FFFFFF" />
        <path
          d="M20 28 Q24 33 28 28"
          stroke="#0F172A"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M14 17 L24 10 L34 17 L30 20 L24 16 L18 20 Z" fill="#3B82F6" />
        <circle cx="24" cy="13" r="2.5" fill="#FBBF24" />
      </svg>
    </div>
  );
};

// =====================================================================
// UTILIDAD: ENVOLTORIO DE ESCENA CENTRADA CON ENTRADA Y SALIDA LIMPIA
// =====================================================================
const CenteredSceneStage: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.8 },
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = enter * exit;
  const translateY =
    interpolate(enter, [0, 1], [32, 0]) + interpolate(exit, [0, 1], [-28, 0]);
  const scale =
    interpolate(enter, [0, 1], [0.96, 1]) *
    interpolate(exit, [0, 1], [0.97, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "110px 64px 140px",
        boxSizing: "border-box",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 940,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 28,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// COMPONENTE 1: FONDO NEUTRO (`#F8FAFC` / `#F1F5F9`) CON ORBES SUTILÍSIMOS
// =====================================================================
const NeutralAtmosphereBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const accentColor = interpolateColors(
    frame,
    [0, 540, 1200, 2160, 2760, 3180],
    [
      "#EF4444", // Escena 1: Error de tipos (Rojo alerta)
      "#0284C7", // Escena 2: Asignación en RAM (Cyan hardware)
      "#8B5CF6", // Escena 3: 4 Tipos de datos en vivo (Violeta ADN)
      "#10B981", // Escena 4: Pinzas y solución (Esmeralda éxito)
      "#3B82F6", // Escena 5: Cliffhanger y CTA (Azul PyQuest)
      "#3B82F6",
    ]
  );

  const secondColor = interpolateColors(
    frame,
    [0, 540, 1200, 2160, 2760, 3180],
    [
      "#F97316",
      "#38BDF8",
      "#EC4899",
      "#059669",
      "#6366F1",
      "#6366F1",
    ]
  );

  const orb1X = Math.sin(frame / 42) * 110;
  const orb1Y = Math.cos(frame / 50) * 90;
  const orb2X = Math.cos(frame / 38) * -120;
  const orb2Y = Math.sin(frame / 46) * 100;
  const gridOffset = (frame * 0.9) % 56;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Malla geométrica sutil */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          backgroundImage:
            "radial-gradient(rgba(15, 23, 42, 0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "56px 56px",
          transform: `translateY(${gridOffset}px)`,
        }}
      />

      {/* Orbe difuminado superior (opacidad máxima 0.20, blur 130px) */}
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: accentColor,
          opacity: 0.2,
          filter: "blur(130px)",
          top: 120 + orb1Y,
          left: -120 + orb1X,
        }}
      />

      {/* Orbe difuminado inferior (opacidad máxima 0.18, blur 130px) */}
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background: secondColor,
          opacity: 0.18,
          filter: "blur(130px)",
          bottom: 140 + orb2Y,
          right: -120 + orb2X,
        }}
      />
    </AbsoluteFill>
  );
};

// =====================================================================
// ESCENA 1 (`0 - 540f` / 9.0s): CHOQUE FÍSICO `"100"` VS `- 20`
// =====================================================================
const Scene1PhysicalTypeCollision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const floatY = Math.sin(frame / 18) * 6;

  // Sub-eventos cada ~90 frames:
  // 0-90f: Entra código y arena con Aria (100 HP) vs Goblin
  // 90-170f: Goblin lanza ataque -20 y los bloques "100" y -20 viajan uno hacia el otro
  // 170f: IMPACTO FÍSICO -> rebotan con chispas y Aria queda CONGELADA
  // 270-540f: Rayos X de diagnóstico: "100" (str) no puede restarse con 20 (int)
  const approachProgress = interpolate(frame, [85, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hasCollided = frame >= 170;
  const bounceBack = hasCollided
    ? spring({
        frame: frame - 170,
        fps,
        config: { damping: 9, stiffness: 180, mass: 0.7 },
      })
    : 0;

  const shakeX =
    frame >= 170 && frame <= 215
      ? Math.sin(frame * 2.6) * 14 * interpolate(frame, [170, 215], [1, 0])
      : 0;

  // Posición X del bloque "100" (izquierda) y del bloque - 20 (derecha)
  const leftBlockX = !hasCollided
    ? interpolate(approachProgress, [0, 1], [-180, -35])
    : interpolate(bounceBack, [0, 1], [-35, -145]);
  const rightBlockX = !hasCollided
    ? interpolate(approachProgress, [0, 1], [180, 35])
    : interpolate(bounceBack, [0, 1], [35, 145]);

  const leftTilt = hasCollided
    ? interpolate(bounceBack, [0, 1], [0, -14]) + Math.sin(frame / 8) * 2
    : 0;
  const rightTilt = hasCollided
    ? interpolate(bounceBack, [0, 1], [0, 14]) - Math.sin(frame / 8) * 2
    : 0;

  const diagnosticEnter = spring({
    frame: frame - 260,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  return (
    <CenteredSceneStage durationInFrames={540}>
      {/* CABECERA DEL GANCHO */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#FEF2F2",
            border: "2px solid #FECACA",
            padding: "8px 24px",
            borderRadius: 999,
            marginBottom: 14,
          }}
        >
          <IconWarning size={24} color="#DC2626" />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              fontWeight: 900,
              color: "#DC2626",
              letterSpacing: "0.06em",
            }}
          >
            EPISODIO 2 · EL ERROR #1 EN PYTHON
          </span>
        </div>

        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 48,
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.18,
            letterSpacing: "-0.025em",
          }}
        >
          Por qué las comillas{" "}
          <span
            style={{
              color: "#DC2626",
              background: "#FEE2E2",
              padding: "2px 16px",
              borderRadius: 14,
              border: "2px solid #FCA5A5",
            }}
          >
            congelan a tu héroe
          </span>
        </div>
      </div>

      {/* VENTANA DE CÓDIGO CON EL BUG */}
      <div
        style={{
          background: "#0F172A",
          borderRadius: 24,
          padding: "24px 32px",
          border: hasCollided
            ? "3px solid #EF4444"
            : "2px solid rgba(148, 163, 184, 0.25)",
          boxShadow: hasCollided
            ? "0 24px 50px rgba(239, 68, 68, 0.22)"
            : "0 20px 45px rgba(15, 23, 42, 0.14)",
          transform: `translate(${shakeX}px, ${floatY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#EF4444" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#F59E0B" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#10B981" }} />
          </div>
          <span style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#94A3B8", fontWeight: 700 }}>
            combate_bug.py
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 18,
              fontWeight: 800,
              color: hasCollided ? "#FCA5A5" : "#38BDF8",
              background: hasCollided ? "rgba(239,68,68,0.2)" : "rgba(56,189,248,0.15)",
              padding: "4px 14px",
              borderRadius: 999,
            }}
          >
            {hasCollided ? "CRASH LÍNEA 2" : "EJECUTANDO..."}
          </span>
        </div>

        <div style={{ fontFamily: FONT_MONO, fontSize: 32, lineHeight: 1.65, fontWeight: 700 }}>
          <div style={{ color: "#E2E8F0" }}>
            vida ={" "}
            <span
              style={{
                color: "#FDE047",
                background: "rgba(250, 204, 21, 0.18)",
                padding: "2px 10px",
                borderRadius: 10,
                border: "2px dashed #FACC15",
              }}
            >
              "100"
            </span>{" "}
            <span style={{ color: "#94A3B8", fontSize: 22 }}># ← Texto entre comillas</span>
          </div>
          <div
            style={{
              color: "#E2E8F0",
              opacity: interpolate(frame, [45, 80], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              background: hasCollided ? "rgba(239, 68, 68, 0.22)" : "transparent",
              padding: "2px 10px",
              borderRadius: 10,
              marginTop: 4,
            }}
          >
            vida = vida <span style={{ color: "#F87171", fontWeight: 900 }}>- 20</span>{" "}
            <span style={{ color: "#FCA5A5", fontSize: 22 }}># Goblin ataca (-20)</span>
          </div>
        </div>
      </div>

      {/* ARENA DE COLISIÓN FÍSICA: "100" CHOCA CONTRA -20 Y CONGELA A ARIA */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 28,
          padding: "28px 32px",
          border: hasCollided ? "3px solid #FCA5A5" : "2px solid #E2E8F0",
          boxShadow: "0 24px 55px rgba(15, 23, 42, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          transform: `translateX(${shakeX}px)`,
        }}
      >
        {/* Fila superior: Aria (congelada tras el choque) vs Goblin */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 86,
                height: 86,
                borderRadius: 22,
                background: hasCollided ? "#E0F2FE" : "#F1F5F9",
                border: hasCollided ? "3px solid #38BDF8" : "2px solid #CBD5E1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <HeroAvatar frame={frame} size={74} frozen={hasCollided} />
              {hasCollided && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(56, 189, 248, 0.28)",
                    display: "flex",
                    alignItems: " flex-end",
                    justifyContent: "center",
                    paddingBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 13,
                      fontWeight: 900,
                      color: "#0369A1",
                      background: "rgba(255,255,255,0.92)",
                      padding: "1px 6px",
                      borderRadius: 4,
                    }}
                  >
                    FROZEN
                  </span>
                </div>
              )}
            </div>
            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 900, color: "#0F172A" }}>
                Aria · Nivel 1
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 20,
                  fontWeight: 800,
                  color: hasCollided ? "#DC2626" : "#10B981",
                }}
              >
                {hasCollided ? 'HP TRAVADO EN "100"' : 'HP: "100" (Texto)'}
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#FEF2F2",
              border: "2px solid #FECACA",
              borderRadius: 16,
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <IconSwords size={26} color="#DC2626" />
            <span style={{ fontFamily: FONT_MONO, fontSize: 22, fontWeight: 900, color: "#DC2626" }}>
              GOBLIN ATK -20
            </span>
          </div>
        </div>

        {/* PISTA DE COLISIÓN FÍSICA ENTRE EL BLOQUE "100" Y EL BLOQUE - 20 */}
        <div
          style={{
            height: 155,
            borderRadius: 22,
            background: "#0F172A",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            border: "2px solid #1E293B",
          }}
        >
          {/* Chispas SVG en el centro cuando chocan */}
          {hasCollided && (
            <svg
              width={260}
              height={155}
              viewBox="0 0 260 155"
              style={{ position: "absolute", zIndex: 4 }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const dist = 22 + ((frame * 3 + i * 12) % 48);
                const x1 = 130 + Math.cos(rad) * 12;
                const y1 = 77 + Math.sin(rad) * 12;
                const x2 = 130 + Math.cos(rad) * dist;
                const y2 = 77 + Math.sin(rad) * dist;
                return (
                  <line
                    key={angle}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 2 === 0 ? "#FACC15" : "#EF4444"}
                    strokeWidth={4}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          )}

          {/* Bloque Izquierdo: "100" (Texto con comillas blindadas) */}
          <div
            style={{
              transform: `translateX(${leftBlockX}px) rotate(${leftTilt}deg)`,
              background: "linear-gradient(135deg, #FEF08A 0%, #FACC15 100%)",
              color: "#0F172A",
              padding: "16px 28px",
              borderRadius: 18,
              fontFamily: FONT_MONO,
              fontSize: 36,
              fontWeight: 900,
              boxShadow: "0 12px 30px rgba(250, 204, 21, 0.35)",
              border: "3px solid #FFFFFF",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>"100"</span>
            <span
              style={{
                fontSize: 16,
                background: "#0F172A",
                color: "#FDE047",
                padding: "3px 8px",
                borderRadius: 6,
              }}
            >
              TEXTO
            </span>
          </div>

          {/* Bloque Derecho: - 20 (Número entero de daño) */}
          <div
            style={{
              transform: `translateX(${rightBlockX}px) rotate(${rightTilt}deg)`,
              background: "linear-gradient(135deg, #F87171 0%, #DC2626 100%)",
              color: "#FFFFFF",
              padding: "16px 28px",
              borderRadius: 18,
              fontFamily: FONT_MONO,
              fontSize: 36,
              fontWeight: 900,
              boxShadow: "0 12px 30px rgba(220, 38, 38, 0.35)",
              border: "3px solid #FFFFFF",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>- 20</span>
            <span
              style={{
                fontSize: 16,
                background: "#FFFFFF",
                color: "#DC2626",
                padding: "3px 8px",
                borderRadius: 6,
              }}
            >
              NÚMERO
            </span>
          </div>
        </div>

        {/* DIAGNÓSTICO PEDAGÓGICO (Sub-evento f260+) */}
        <div
          style={{
            opacity: diagnosticEnter,
            transform: `translateY(${(1 - diagnosticEnter) * 18}px)`,
            background: "#FEF2F2",
            borderRadius: 18,
            padding: "18px 24px",
            border: "2px solid #FCA5A5",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <IconCrash size={36} color="#DC2626" />
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 22, fontWeight: 900, color: "#991B1B" }}>
              TypeError: unsupported operand type(s) for -: 'str' and 'int'
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 23, fontWeight: 700, color: "#7F1D1D", marginTop: 4 }}>
              Para Python, <span style={{ fontWeight: 900 }}>"100"</span> son 3 letras dibujadas: ¡no puedes restarle 20 a una palabra!
            </div>
          </div>
        </div>
      </div>
    </CenteredSceneStage>
  );
};

// =====================================================================
// ESCENA 2 (`540 - 1200f` / 11.0s): EL SIGNO `=` COMO BRAZO MECÁNICO EN RAM
// =====================================================================
const Scene2MechanicalRamAssignment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-eventos continuos (660 frames totales):
  // 0 - 110f: Aparece `nombre = "Aria"` y la ranura 0x7F01 se abre
  // 110 - 270f: El brazo mecánico `=` agarra `"Aria"` de la derecha y lo mete en la caja 0x7F01
  // 270 - 420f: El estampador frontal pega la etiqueta física `nombre` sobre la caja
  // 420 - 660f: Segunda asignación en vivo en 0x7F02 (`vida = 100`)
  const grabProgress1 = interpolate(frame, [95, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelStamp1 = spring({
    frame: frame - 245,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const secondPhaseActive = frame >= 380;
  const grabProgress2 = interpolate(frame, [410, 535], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelStamp2 = spring({
    frame: frame - 540,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Coordenada X del brazo mecánico `=`
  const armX = !secondPhaseActive
    ? interpolate(grabProgress1, [0, 0.35, 1], [620, 680, 210])
    : interpolate(grabProgress2, [0, 0.35, 1], [620, 680, 210]);

  return (
    <CenteredSceneStage durationInFrames={660}>
      {/* TITULAR */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#E0F2FE",
            border: "2px solid #7DD3FC",
            padding: "8px 24px",
            borderRadius: 999,
            marginBottom: 14,
          }}
        >
          <IconBox size={24} color="#0284C7" />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              fontWeight: 900,
              color: "#0369A1",
              letterSpacing: "0.06em",
            }}
          >
            FÍSICA INTERNA DEL COMPUTADOR
          </span>
        </div>

        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 46,
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.18,
          }}
        >
          El signo{" "}
          <span
            style={{
              fontFamily: FONT_MONO,
              color: "#0284C7",
              background: "#E0F2FE",
              padding: "2px 16px",
              borderRadius: 12,
              border: "2px solid #38BDF8",
            }}
          >
            =
          </span>{" "}
          es un brazo que guarda datos en RAM
        </div>
      </div>

      {/* CONSOLA DE INSTRUCCIÓN ACTIVA */}
      <div
        style={{
          background: "#0F172A",
          borderRadius: 24,
          padding: "22px 30px",
          border: "2px solid #38BDF8",
          boxShadow: "0 18px 40px rgba(2, 132, 199, 0.14)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 34, fontWeight: 800, color: "#F8FAFC" }}>
          {!secondPhaseActive ? (
            <>
              <span style={{ color: "#38BDF8" }}>nombre</span>{" "}
              <span style={{ color: "#FACC15" }}>=</span>{" "}
              <span style={{ color: "#FDE047" }}>"Aria"</span>
            </>
          ) : (
            <>
              <span style={{ color: "#34D399" }}>vida</span>{" "}
              <span style={{ color: "#FACC15" }}>=</span>{" "}
              <span style={{ color: "#6EE7B7" }}>100</span>
            </>
          )}
        </div>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 20,
            fontWeight: 800,
            color: "#0F172A",
            background: "#FACC15",
            padding: "8px 18px",
            borderRadius: 12,
          }}
        >
          {!secondPhaseActive ? "CICLO 1 · GUARDANDO TEXTO" : "CICLO 2 · GUARDANDO ENTERO"}
        </div>
      </div>

      {/* FÁBRICA / CHASIS DE MEMORIA RAM CON BRAZO MECÁNICO '=' */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 28,
          padding: "30px 32px",
          border: "2px solid #CBD5E1",
          boxShadow: "0 25px 55px rgba(15, 23, 42, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 26,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Riel superior del brazo mecánico `=` */}
        <div
          style={{
            height: 110,
            background: "#0F172A",
            borderRadius: 20,
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            border: "2px solid #1E293B",
          }}
        >
          {/* Riel metálico */}
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 30,
              right: 30,
              height: 8,
              borderRadius: 999,
              background: "#334155",
            }}
          />

          {/* Cabezal magnético con el operador `=` */}
          <div
            style={{
              position: "absolute",
              left: armX,
              top: 10,
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 5,
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)",
                color: "#0F172A",
                fontFamily: FONT_MONO,
                fontSize: 26,
                fontWeight: 900,
                padding: "6px 20px",
                borderRadius: 12,
                border: "3px solid #FFFFFF",
                boxShadow: "0 8px 24px rgba(245, 158, 11, 0.45)",
              }}
            >
              IMÁN =
            </div>
            {/* Pinza magnética y bloque transportado */}
            <div
              style={{
                marginTop: 6,
                padding: "6px 16px",
                borderRadius: 10,
                background: !secondPhaseActive ? "#FEF08A" : "#A7F3D0",
                color: "#0F172A",
                fontFamily: FONT_MONO,
                fontSize: 22,
                fontWeight: 900,
                opacity:
                  (!secondPhaseActive && grabProgress1 > 0.1 && grabProgress1 < 0.95) ||
                  (secondPhaseActive && grabProgress2 > 0.1 && grabProgress2 < 0.95)
                    ? 1
                    : 0.25,
              }}
            >
              {!secondPhaseActive ? '"Aria"' : "100"}
            </div>
          </div>
        </div>

        {/* RANURAS FÍSICAS DE LA MEMORIA RAM (IZQUIERDA = RANURA, DERECHA = ENTRADA) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {/* RANURA 1: 0x7F01 (nombre = "Aria") */}
          <div
            style={{
              background: grabProgress1 >= 0.95 ? "#F0F9FF" : "#F8FAFC",
              borderRadius: 22,
              padding: "24px",
              border:
                grabProgress1 >= 0.95
                  ? "3px solid #0284C7"
                  : "2px dashed #94A3B8",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 800, color: "#64748B" }}>
                RANURA RAM · 0x7F01
              </span>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  fontWeight: 900,
                  color: grabProgress1 >= 0.95 ? "#0284C7" : "#64748B",
                  background: grabProgress1 >= 0.95 ? "#E0F2FE" : "#E2E8F0",
                  padding: "3px 10px",
                  borderRadius: 999,
                }}
              >
                {grabProgress1 >= 0.95 ? "OCUPADA" : "VACÍA"}
              </span>
            </div>

            {/* Interior de la caja con el valor depositado */}
            <div
              style={{
                height: 86,
                borderRadius: 16,
                background: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #1E293B",
              }}
            >
              {grabProgress1 >= 0.85 ? (
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 34,
                    fontWeight: 900,
                    color: "#FDE047",
                    transform: `scale(${spring({
                      frame: frame - 210,
                      fps,
                      config: { damping: 11, stiffness: 160 },
                    })})`,
                  }}
                >
                  "Aria"
                </span>
              ) : (
                <span style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#475569" }}>
                  [ Esperando dato... ]
                </span>
              )}
            </div>

            {/* Etiqueta frontal estampada */}
            <div
              style={{
                opacity: labelStamp1,
                transform: `scale(${0.8 + labelStamp1 * 0.2})`,
                background: "#0284C7",
                color: "#FFFFFF",
                padding: "10px 16px",
                borderRadius: 12,
                fontFamily: FONT_MONO,
                fontSize: 22,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>ETIQUETA: nombre</span>
              <IconCheck size={22} color="#FFFFFF" />
            </div>
          </div>

          {/* RANURA 2: 0x7F02 (vida = 100) */}
          <div
            style={{
              background: grabProgress2 >= 0.95 ? "#ECFDF5" : "#F8FAFC",
              borderRadius: 22,
              padding: "24px",
              border:
                grabProgress2 >= 0.95
                  ? "3px solid #10B981"
                  : "2px dashed #94A3B8",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 800, color: "#64748B" }}>
                RANURA RAM · 0x7F02
              </span>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  fontWeight: 900,
                  color: grabProgress2 >= 0.95 ? "#059669" : "#64748B",
                  background: grabProgress2 >= 0.95 ? "#D1FAE5" : "#E2E8F0",
                  padding: "3px 10px",
                  borderRadius: 999,
                }}
              >
                {grabProgress2 >= 0.95 ? "OCUPADA" : "VACÍA"}
              </span>
            </div>

            <div
              style={{
                height: 86,
                borderRadius: 16,
                background: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #1E293B",
              }}
            >
              {grabProgress2 >= 0.85 ? (
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 34,
                    fontWeight: 900,
                    color: "#34D399",
                    transform: `scale(${spring({
                      frame: frame - 510,
                      fps,
                      config: { damping: 11, stiffness: 160 },
                    })})`,
                  }}
                >
                  100
                </span>
              ) : (
                <span style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#475569" }}>
                  [ Esperando dato... ]
                </span>
              )}
            </div>

            <div
              style={{
                opacity: labelStamp2,
                transform: `scale(${0.8 + labelStamp2 * 0.2})`,
                background: "#059669",
                color: "#FFFFFF",
                padding: "10px 16px",
                borderRadius: 12,
                fontFamily: FONT_MONO,
                fontSize: 22,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>ETIQUETA: vida</span>
              <IconCheck size={22} color="#FFFFFF" />
            </div>
          </div>
        </div>

        {/* REGLA CLAVE */}
        <div
          style={{
            background: "#F8FAFC",
            borderRadius: 16,
            padding: "16px 22px",
            border: "1px solid #CBD5E1",
            fontFamily: FONT_SANS,
            fontSize: 24,
            fontWeight: 700,
            color: "#1E293B",
            textAlign: "center",
          }}
        >
          El dato de la <span style={{ color: "#0284C7", fontWeight: 900 }}>derecha</span> entra en la caja y recibe la etiqueta de la{" "}
          <span style={{ color: "#059669", fontWeight: 900 }}>izquierda</span>.
        </div>
      </div>
    </CenteredSceneStage>
  );
};

// =====================================================================
// ESCENA 3 (`1200 - 2160f` / 16.0s): LOS 4 TIPOS EN VIVO SOBRE ARIA
// =====================================================================
const Scene3InteractiveHeroDataTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 4 Sub-fases de 240 frames (4.0s cada una = 960 frames totales):
  // 0 - 240f: 1. `heroe = "Aria"` (str) -> Placa de nombre arriba del avatar
  // 240 - 480f: 2. `vida = 100` (int) -> Barra verde de salud sube de 0 a 100 HP
  // 480 - 720f: 3. `critico = 1.75` (float) -> Espada brilla con multiplicador decimal x1.75
  // 720 - 960f: 4. `esta_viva = True` (bool) -> Interruptor físico pasa de OFF a ON e ilumina a Aria
  const stepIndex = Math.min(3, Math.floor(frame / 240));
  const subFrame = frame - stepIndex * 240;

  const stepEnter = spring({
    frame: subFrame,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const hpValue =
    frame < 240
      ? 0
      : Math.round(
          interpolate(frame, [255, 360], [0, 100], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        );

  const critScale =
    frame >= 480
      ? spring({
          frame: frame - 495,
          fps,
          config: { damping: 10, stiffness: 160 },
        })
      : 0;

  const boolSwitchProgress = interpolate(frame, [735, 795], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isHeroPoweredOn = frame >= 760;

  const stepInfo = [
    {
      badge: "TIPO 1 DE 4 · str (STRING / TEXTO)",
      color: "#D97706",
      bg: "#FEF3C7",
      desc: 'Usa comillas solo para nombres o diálogos: heroe = "Aria" coloca su placa de identidad.',
    },
    {
      badge: "TIPO 2 DE 4 · int (INTEGER / ENTERO)",
      color: "#059669",
      bg: "#D1FAE5",
      desc: "Números exactos SIN comillas: vida = 100 llena su barra de salud lista para restar o sumar.",
    },
    {
      badge: "TIPO 3 DE 4 · float (DECIMAL)",
      color: "#2563EB",
      bg: "#DBEAFE",
      desc: "Usa punto decimal para precisión: critico = 1.75 potencia su espada por x1.75.",
    },
    {
      badge: "TIPO 4 DE 4 · bool (INTERRUPTOR LÓGICO)",
      color: "#7C3AED",
      bg: "#EDE9FE",
      desc: "Solo acepta True o False: esta_viva = True enciende el interruptor maestro del héroe.",
    },
  ][stepIndex];

  return (
    <CenteredSceneStage durationInFrames={960}>
      {/* CABECERA */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: stepInfo.bg,
            border: `2px solid ${stepInfo.color}`,
            padding: "8px 24px",
            borderRadius: 999,
            marginBottom: 12,
          }}
        >
          <IconDna size={24} color={stepInfo.color} />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 21,
              fontWeight: 900,
              color: stepInfo.color,
            }}
          >
            {stepInfo.badge}
          </span>
        </div>

        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 44,
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.18,
          }}
        >
          Construyendo a Aria{" "}
          <span style={{ color: stepInfo.color }}>variable por variable</span>
        </div>
      </div>

      {/* VENTANA DE CÓDIGO QUE AGREGA 1 VARIABLE CADA 4 SEGUNDOS */}
      <div
        style={{
          background: "#0F172A",
          borderRadius: 24,
          padding: "22px 30px",
          border: `2px solid ${stepInfo.color}`,
          boxShadow: "0 18px 40px rgba(15, 23, 42, 0.14)",
          fontFamily: FONT_MONO,
          fontSize: 28,
          lineHeight: 1.65,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            padding: "4px 12px",
            borderRadius: 10,
            background: stepIndex === 0 ? "rgba(245, 158, 11, 0.22)" : "transparent",
            color: "#F8FAFC",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            heroe = <span style={{ color: "#FDE047" }}>"Aria"</span>
          </span>
          <span style={{ color: "#FBBF24", fontSize: 22 }}># 1. str (Texto)</span>
        </div>

        {frame >= 240 && (
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 10,
              background: stepIndex === 1 ? "rgba(16, 185, 129, 0.22)" : "transparent",
              color: "#F8FAFC",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              vida = <span style={{ color: "#34D399" }}>100</span>
            </span>
            <span style={{ color: "#34D399", fontSize: 22 }}># 2. int (Entero)</span>
          </div>
        )}

        {frame >= 480 && (
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 10,
              background: stepIndex === 2 ? "rgba(59, 130, 246, 0.22)" : "transparent",
              color: "#F8FAFC",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              critico = <span style={{ color: "#60A5FA" }}>1.75</span>
            </span>
            <span style={{ color: "#60A5FA", fontSize: 22 }}># 3. float (Decimal)</span>
          </div>
        )}

        {frame >= 720 && (
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 10,
              background: stepIndex === 3 ? "rgba(139, 92, 246, 0.25)" : "transparent",
              color: "#F8FAFC",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              esta_viva = <span style={{ color: "#C4B5FD" }}>True</span>
            </span>
            <span style={{ color: "#C4B5FD", fontSize: 22 }}># 4. bool (Interruptor)</span>
          </div>
        )}
      </div>

      {/* TARJETA CENTRAL INTERACTIVA DEL PERSONAJE (CAMBIA EN VIVO) */}
      <div
        style={{
          background: isHeroPoweredOn
            ? "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)"
            : "#FFFFFF",
          borderRadius: 28,
          padding: "28px 32px",
          border: `3px solid ${stepInfo.color}`,
          boxShadow: isHeroPoweredOn
            ? "0 28px 65px rgba(124, 58, 237, 0.22)"
            : "0 24px 55px rgba(15, 23, 42, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {/* AVATAR GRANDE DE ARIA CON PLACA Y ESPADA REACTIVA */}
          <div
            style={{
              width: 210,
              height: 220,
              borderRadius: 24,
              background: isHeroPoweredOn ? "#EDE9FE" : "#F8FAFC",
              border: `3px solid ${isHeroPoweredOn ? "#8B5CF6" : "#CBD5E1"}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: isHeroPoweredOn ? "0 0 35px rgba(139, 92, 246, 0.35)" : "none",
            }}
          >
            {/* 1. PLACA DE NOMBRE (`str`) ARRIBA DEL AVATAR */}
            <div
              style={{
                transform: `scale(${spring({
                  frame,
                  fps,
                  config: { damping: 11, stiffness: 150 },
                })})`,
                background: "#FEF3C7",
                border: "2px solid #F59E0B",
                padding: "4px 16px",
                borderRadius: 999,
                fontFamily: FONT_MONO,
                fontSize: 20,
                fontWeight: 900,
                color: "#B45309",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <IconTag size={18} color="#D97706" />
              <span>"Aria"</span>
            </div>

            <HeroAvatar frame={frame} size={126} powered={isHeroPoweredOn} />

            {/* 3. MULTIPLICADOR DE ESPADA (`float` x1.75) */}
            {frame >= 480 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: -14,
                  transform: `scale(${critScale})`,
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: "#FFFFFF",
                  padding: "6px 14px",
                  borderRadius: 12,
                  border: "2px solid #FFFFFF",
                  boxShadow: "0 10px 24px rgba(37, 99, 235, 0.4)",
                  fontFamily: FONT_MONO,
                  fontSize: 20,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <IconBolt size={20} color="#FDE047" />
                <span>x1.75</span>
              </div>
            )}
          </div>

          {/* PANEL DE ESTADÍSTICAS EN VIVO */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
            {/* 2. BARRA DE SALUD (`int`: 0 -> 100 HP) */}
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 18,
                padding: "14px 18px",
                border: frame >= 240 ? "2px solid #10B981" : "2px dashed #CBD5E1",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#0F172A",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <IconHeart size={20} color="#10B981" />
                  SALUD (int)
                </span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 24, fontWeight: 900, color: "#059669" }}>
                  {hpValue} / 100 HP
                </span>
              </div>
              <div
                style={{
                  height: 22,
                  borderRadius: 999,
                  background: "#E2E8F0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${hpValue}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #10B981 0%, #34D399 100%)",
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>

            {/* 4. INTERRUPTOR FÍSICO (`bool`: OFF -> ON) */}
            <div
              style={{
                background: isHeroPoweredOn ? "#EDE9FE" : "#F8FAFC",
                borderRadius: 18,
                padding: "14px 18px",
                border: isHeroPoweredOn ? "2px solid #8B5CF6" : "2px dashed #CBD5E1",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 800, color: "#475569" }}>
                  INTERRUPTOR (bool)
                </div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 24,
                    fontWeight: 900,
                    color: isHeroPoweredOn ? "#6D28D9" : "#64748B",
                  }}
                >
                  esta_viva = {isHeroPoweredOn ? "True" : "False"}
                </div>
              </div>

              {/* Toggle Switch Físico */}
              <div
                style={{
                  width: 96,
                  height: 48,
                  borderRadius: 999,
                  background: isHeroPoweredOn ? "#7C3AED" : "#CBD5E1",
                  padding: 5,
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    transform: `translateX(${boolSwitchProgress * 48}px)`,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* EXPLICACIÓN ACTIVA DEL TIPO */}
        <div
          style={{
            background: stepInfo.bg,
            borderRadius: 16,
            padding: "16px 22px",
            fontFamily: FONT_SANS,
            fontSize: 23,
            fontWeight: 700,
            color: "#0F172A",
            transform: `scale(${0.97 + stepEnter * 0.03})`,
          }}
        >
          {stepInfo.desc}
        </div>
      </div>
    </CenteredSceneStage>
  );
};

// =====================================================================
// ESCENA 4 (`2160 - 2760f` / 10.0s): PINZAS BORRAN COMILLAS Y CABLE CURA EL BUG
// =====================================================================
const Scene4TweezersQuoteRemoval: React.FC = () => {
  const frame = useCurrentFrame();

  // Sub-eventos (600 frames):
  // 0 - 130f: Aparece `vida = "100"` con las dos comillas resaltadas
  // 130 - 260f: Pinzas láser sujetan las comillas `"` `"` y las arrancan hacia arriba
  // 260 - 410f: Queda `vida = 100` limpio; el cálculo `100 - 20 = 80` viaja por el cable de energía
  // 410 - 600f: La barra de salud de Aria baja suavemente de 100 a 80 HP
  const pullProgress = interpolate(frame, [120, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quotesRemoved = frame >= 240;

  const cablePulse = interpolate(frame, [250, 390], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ariaHp = Math.round(
    interpolate(frame, [360, 460], [100, 80], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const quoteLiftY = interpolate(pullProgress, [0, 1], [0, -95]);
  const quoteOpacity = interpolate(pullProgress, [0, 0.85, 1], [1, 0.8, 0]);

  return (
    <CenteredSceneStage durationInFrames={600}>
      {/* CABECERA */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#ECFDF5",
            border: "2px solid #6EE7B7",
            padding: "8px 24px",
            borderRadius: 999,
            marginBottom: 12,
          }}
        >
          <IconSparkles size={24} color="#059669" />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              fontWeight: 900,
              color: "#059669",
            }}
          >
            CIRUGÍA DE CÓDIGO EN VIVO
          </span>
        </div>

        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 46,
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.18,
          }}
        >
          Quitamos las comillas y{" "}
          <span style={{ color: "#059669" }}>el motor cobra vida</span>
        </div>
      </div>

      {/* TARJETA DE EXTRACCIÓN DE COMILLAS */}
      <div
        style={{
          background: "#0F172A",
          borderRadius: 26,
          padding: "32px 36px",
          border: quotesRemoved ? "3px solid #10B981" : "3px solid #F59E0B",
          boxShadow: "0 22px 50px rgba(15, 23, 42, 0.16)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#94A3B8", fontWeight: 700 }}>
            hero_fix.py
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 18,
              fontWeight: 900,
              color: quotesRemoved ? "#34D399" : "#FDE047",
              background: quotesRemoved ? "rgba(16,185,129,0.2)" : "rgba(250,204,21,0.2)",
              padding: "5px 14px",
              borderRadius: 999,
            }}
          >
            {quotesRemoved ? "TIPO: int (ENTERO PURO)" : "PINZAS EXTRAYENDO COMILLAS..."}
          </span>
        </div>

        {/* Línea 1 con pinzas arrancando las comillas */}
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 40,
            fontWeight: 900,
            color: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            gap: 6,
            position: "relative",
            padding: "12px 0",
          }}
        >
          <span>vida = </span>

          {/* Comilla Izquierda arrancada por pinza */}
          {!quotesRemoved && (
            <span
              style={{
                display: "inline-block",
                color: "#EF4444",
                background: "rgba(239, 68, 68, 0.25)",
                padding: "2px 10px",
                borderRadius: 10,
                border: "2px solid #EF4444",
                transform: `translateY(${quoteLiftY}px) rotate(${-pullProgress * 25}deg)`,
                opacity: quoteOpacity,
              }}
            >
              "
            </span>
          )}

          <span
            style={{
              color: quotesRemoved ? "#34D399" : "#FDE047",
              background: quotesRemoved ? "rgba(16, 185, 129, 0.2)" : "transparent",
              padding: "4px 16px",
              borderRadius: 14,
              border: quotesRemoved ? "2px solid #10B981" : "none",
            }}
          >
            100
          </span>

          {/* Comilla Derecha arrancada por pinza */}
          {!quotesRemoved && (
            <span
              style={{
                display: "inline-block",
                color: "#EF4444",
                background: "rgba(239, 68, 68, 0.25)",
                padding: "2px 10px",
                borderRadius: 10,
                border: "2px solid #EF4444",
                transform: `translateY(${quoteLiftY}px) rotate(${pullProgress * 25}deg)`,
                opacity: quoteOpacity,
              }}
            >
              "
            </span>
          )}
        </div>

        {/* Línea 2: Cálculo limpio 100 - 20 = 80 */}
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 32,
            fontWeight: 800,
            color: quotesRemoved ? "#E2E8F0" : "#64748B",
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>vida = 100 - 20</span>
          {quotesRemoved && (
            <span
              style={{
                color: "#0F172A",
                background: "#34D399",
                padding: "4px 16px",
                borderRadius: 12,
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              RESULTADO: 80 HP
            </span>
          )}
        </div>
      </div>

      {/* CABLE DE ENERGÍA CONECTADO A ARIA */}
      <div style={{ display: "flex", justifyContent: "center", margin: "-12px 0" }}>
        <svg width={240} height={85} viewBox="0 0 240 85">
          <path
            d="M 120 0 L 120 85"
            stroke="#CBD5E1"
            strokeWidth={8}
            strokeLinecap="round"
          />
          {quotesRemoved && (
            <path
              d="M 120 0 L 120 85"
              stroke="#10B981"
              strokeWidth={8}
              strokeDasharray="24 36"
              strokeDashoffset={-frame * 6}
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>

      {/* TARJETA DE ARIA RECIBIENDO EL CÁLCULO LIMPIO (80 / 100 HP) */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 28,
          padding: "26px 32px",
          border: quotesRemoved ? "3px solid #10B981" : "2px solid #CBD5E1",
          boxShadow: "0 24px 55px rgba(16, 185, 129, 0.12)",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 22,
            background: "#ECFDF5",
            border: "2px solid #10B981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HeroAvatar frame={frame} size={92} powered={quotesRemoved} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 900, color: "#0F172A" }}>
              Aria absorbe el golpe (-20)
            </span>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 30,
                fontWeight: 900,
                color: "#059669",
              }}
            >
              {ariaHp} / 100 HP
            </span>
          </div>

          <div
            style={{
              height: 28,
              borderRadius: 999,
              background: "#E2E8F0",
              overflow: "hidden",
              padding: 3,
            }}
          >
            <div
              style={{
                width: `${ariaHp}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #059669 0%, #34D399 100%)",
              }}
            />
          </div>

          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 20,
              fontWeight: 800,
              color: "#059669",
              marginTop: 10,
              opacity: cablePulse,
            }}
          >
            ✓ Matemáticas enteras verificadas · Cero errores de ejecución
          </div>
        </div>
      </div>
    </CenteredSceneStage>
  );
};

// =====================================================================
// ESCENA 5 (`2760 - 3180f` / 7.0s): CLIFFHANGER (-20 HP) Y CTA
// =====================================================================
const Scene5CliffhangerAndCta: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <CenteredSceneStage durationInFrames={420}>
      {/* PREGUNTA CLIFFHANGER */}
      <div
        style={{
          background: "#FEF2F2",
          borderRadius: 26,
          padding: "26px 32px",
          border: "3px solid #FCA5A5",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              fontWeight: 900,
              color: "#DC2626",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <IconWarning size={26} color="#DC2626" />
            MISTERIO DEL EPISODIO 3
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 24,
              fontWeight: 900,
              color: "#FFFFFF",
              background: "#DC2626",
              padding: "4px 16px",
              borderRadius: 999,
            }}
          >
            80 - 100 = -20 HP?!
          </span>
        </div>

        <div style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 900, color: "#0F172A", lineHeight: 1.25 }}>
          ¿Qué pasa si el jefe nos quita 100 y la vida queda en{" "}
          <span style={{ color: "#DC2626" }}>-20 HP</span>?
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 23, fontWeight: 700, color: "#475569" }}>
          En el Episodio 3 usaremos <span style={{ color: "#2563EB", fontWeight: 900 }}>Condicionales (if / elif / else)</span> para programar las reglas de vida o muerte.
        </div>
      </div>

      {/* CHECKLIST RÁPIDO */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: "18px 22px",
            border: "2px solid #10B981",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <IconCheck size={28} color="#10B981" />
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 900, color: "#059669" }}>
              EPISODIO 2 LISTO
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 900, color: "#0F172A" }}>
              Variables y Tipos
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: "18px 22px",
            border: "2px solid #2563EB",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <IconSwords size={28} color="#2563EB" />
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 900, color: "#2563EB" }}>
              SIGUIENTE: EP. 3
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 900, color: "#0F172A" }}>
              Condicionales if/else
            </div>
          </div>
        </div>
      </div>

      {/* CTA COMUNITARIO */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 28,
          padding: "28px 34px",
          border: "2px solid #CBD5E1",
          boxShadow: "0 24px 55px rgba(15, 23, 42, 0.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 34,
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.28,
            marginBottom: 18,
          }}
        >
          Comenta <span style={{ color: "#2563EB" }}>"PYQUEST"</span> por el código
          <br />y sígueme para el Episodio 3
        </div>

        <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
          <div
            style={{
              background: "#EFF6FF",
              border: "2px solid #3B82F6",
              borderRadius: 16,
              padding: "14px 30px",
              fontFamily: FONT_SANS,
              fontSize: 26,
              fontWeight: 800,
              color: "#1D4ED8",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transform: `scale(${1 + Math.sin(frame / 10) * 0.03})`,
            }}
          >
            <IconComment size={24} color="#1D4ED8" />
            <span>Comentar</span>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              borderRadius: 16,
              padding: "14px 36px",
              fontFamily: FONT_SANS,
              fontSize: 26,
              fontWeight: 800,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transform: `scale(${1 + Math.cos(frame / 10) * 0.03})`,
            }}
          >
            <IconPlus size={24} color="#FFFFFF" />
            <span>Seguir @santi.dev</span>
          </div>
        </div>
      </div>
    </CenteredSceneStage>
  );
};

// =====================================================================
// COMPOSICIÓN PRINCIPAL: EPISODIO 2 (3180 FRAMES / 53.0s @ 60 FPS)
// =====================================================================
export const PyQuestEp02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily: FONT_SANS, overflow: "hidden" }}>
      {/* 1. Fondo neutro #F8FAFC / #F1F5F9 con orbes suaves <= 0.20 */}
      <NeutralAtmosphereBackground frame={frame} />

      {/* 2. Cama musical */}
      <Audio
        src={staticFile("bgm/tech_ambient_bed.mp3")}
        volume={(f) => {
          const fadeIn = Math.min(1, f / (fps * 0.8));
          const fadeOut = Math.min(1, (durationInFrames - f) / (fps * 0.8));
          return 0.09 * Math.max(0, fadeIn) * Math.max(0, fadeOut);
        }}
        loop
      />

      {/* 3. Efectos de sonido sincronizados con cada acción visual */}
      <PyQuestSfx name="whoosh-short" from={0} volume={0.34} />
      <PyQuestSfx name="typing" from={45} volume={0.24} />
      <PyQuestSfx name="error" from={170} volume={0.46} />
      <PyQuestSfx name="impact-bass-1" from={172} volume={0.42} />

      <PyQuestSfx name="whoosh-short" from={540} volume={0.32} />
      <PyQuestSfx name="click-soft" from={635} volume={0.32} />
      <PyQuestSfx name="pop" from={785} volume={0.34} />
      <PyQuestSfx name="click-soft" from={950} volume={0.32} />
      <PyQuestSfx name="chime" from={1080} volume={0.36} />

      <PyQuestSfx name="whoosh-short" from={1200} volume={0.32} />
      <PyQuestSfx name="sparkle" from={1230} volume={0.34} />
      <PyQuestSfx name="sparkle" from={1460} volume={0.34} />
      <PyQuestSfx name="sparkle" from={1700} volume={0.34} />
      <PyQuestSfx name="sparkle" from={1940} volume={0.36} />

      <PyQuestSfx name="whoosh-short" from={2160} volume={0.32} />
      <PyQuestSfx name="pop" from={2400} volume={0.36} />
      <PyQuestSfx name="chime" from={2520} volume={0.4} />

      <PyQuestSfx name="error" from={2780} volume={0.36} />
      <PyQuestSfx name="chime" from={2960} volume={0.38} />

      {/* 4. Secuencias estrictas sin solapamiento */}
      <Sequence from={0} durationInFrames={540}>
        <Scene1PhysicalTypeCollision />
      </Sequence>

      <Sequence from={540} durationInFrames={660}>
        <Scene2MechanicalRamAssignment />
      </Sequence>

      <Sequence from={1200} durationInFrames={960}>
        <Scene3InteractiveHeroDataTypes />
      </Sequence>

      <Sequence from={2160} durationInFrames={600}>
        <Scene4TweezersQuoteRemoval />
      </Sequence>

      <Sequence from={2760} durationInFrames={420}>
        <Scene5CliffhangerAndCta />
      </Sequence>
    </AbsoluteFill>
  );
};
