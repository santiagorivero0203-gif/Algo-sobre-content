/**
 * =====================================================================
 * PYQUEST · EPISODIO 3: "CONDICIONALES Y COMBATE: LAS REGLAS DE LA VIDA"
 * =====================================================================
 * Nivel de producción: Studio-grade interactivo (Pedagogía visual paso a paso).
 * Resolución: 1080x1920 (Vertical 9:16) @ 60 FPS.
 * Duración Total: 54.0 segundos exactos (3240 frames).
 *
 * 5 Reglas de Hierro Aplicadas:
 * 1. Centrado Vertical Dinámico (`justifyContent: 'center'`): Cero medio lienzo vacío.
 * 2. Transiciones con `<Sequence>` estrictos y animación de salida explícita (`exit`):
 *    Cero textos encimados entre escenas.
 * 3. Prohibido más de 90 frames (1.5s) sin cambios en el DOM: Escáner línea por línea,
 *    pistones de indentación y ataques reales.
 * 4. Duración compacta de alta retención: 54 segundos (3240 frames).
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
  IconBackpack,
  IconBookmark,
  IconCheck,
  IconCrash,
  IconPlus,
  IconSparkles,
  IconSwords,
  IconWarning,
} from "../../components/PyQuestIcons";

// =====================================================================
// AVATAR VECTORIAL REACTIVO DE ARIA (REUTILIZADO DE EP. 1)
// =====================================================================
const HeroAvatar: React.FC<{
  frame: number;
  size?: number;
  zombie?: boolean;
  dead?: boolean;
}> = ({ frame, size = 80, zombie = false, dead = false }) => {
  const breathY = dead ? 0 : Math.sin(frame / 16) * 2.5;
  const hairTilt = dead ? -4 : Math.sin(frame / 22) * 3;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 20,
        background: dead
          ? "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)"
          : zombie
          ? "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)"
          : "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
        border: `2px solid ${dead ? "#EF4444" : zombie ? "#8B5CF6" : "#38BDF8"}`,
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
          filter: zombie ? "hue-rotate(95deg) saturate(2)" : dead ? "grayscale(1)" : "none",
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
          gap: 26,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// COMPONENTE 1: FONDO NEUTRO (`#F8FAFC` / `#F1F5F9`) CON ORBES DIFUMINADOS
// =====================================================================
const NeutralAtmosphereBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const accentColor = interpolateColors(
    frame,
    [0, 540, 1260, 2340, 2820, 3240],
    [
      "#EF4444", // Escena 1: Bug lógico del héroe zombi (-20 HP)
      "#4F46E5", // Escena 2: El `if` y los 4 bloques de indentación
      "#F59E0B", // Escena 3: Escáner del embudo if / elif / else
      "#10B981", // Escena 4: Combate final coherente contra el Boss Goblin
      "#7C3AED", // Escena 5: Cofre de botín y paso a Listas (Ep. 4)
      "#7C3AED",
    ]
  );

  const secondColor = interpolateColors(
    frame,
    [0, 540, 1260, 2340, 2820, 3240],
    [
      "#DC2626",
      "#0284C7",
      "#10B981",
      "#3B82F6",
      "#6366F1",
      "#6366F1",
    ]
  );

  const orb1X = Math.sin(frame / 44) * 110;
  const orb1Y = Math.cos(frame / 52) * 90;
  const orb2X = Math.cos(frame / 40) * -115;
  const orb2Y = Math.sin(frame / 48) * 95;
  const gridOffset = (frame * 0.9) % 56;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
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
// ESCENA 1 (`0 - 540f` / 9.0s): EL BUG LÓGICO (-20 HP Y HÉROE ZOMBI)
// =====================================================================
const Scene1ZombieHeroLogicalBug: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-eventos cada ~90 frames:
  // 0 - 110f: Aria empieza con 10 / 100 HP frente al Goblin
  // 110 - 210f: Goblin lanza ataque -30 DMG -> La barra se rompe hacia la izquierda hasta -20 HP
  // 210 - 360f: Aria NO muere: se pone en MODO ZOMBI y sigue lanzando espadazos con -20 HP
  // 360 - 540f: Diagnóstico: Bug Lógico (el código no crashea, pero las reglas están rotas)
  const hitTaken = frame >= 110;
  const currentHp = Math.round(
    interpolate(frame, [110, 195], [10, -20], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const negativeOverflowWidth = interpolate(frame, [135, 205], [0, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isZombieAttacking = frame >= 220;
  const zombieLungeX = isZombieAttacking ? Math.sin(frame / 5) * 18 : 0;

  const shakeX =
    frame >= 110 && frame <= 165
      ? Math.sin(frame * 2.5) * 12 * interpolate(frame, [110, 165], [1, 0])
      : 0;

  const diagnosisEnter = spring({
    frame: frame - 310,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  return (
    <CenteredSceneStage durationInFrames={540}>
      {/* CABECERA */}
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
            marginBottom: 12,
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
            EPISODIO 3 · EL BUG DEL HÉROE ZOMBI
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
          ¿Por qué Aria sigue peleando con{" "}
          <span
            style={{
              color: "#DC2626",
              background: "#FEE2E2",
              padding: "2px 16px",
              borderRadius: 14,
              border: "2px solid #FCA5A5",
            }}
          >
            -20 de Vida
          </span>
          ?
        </div>
      </div>

      {/* CÓDIGO SIN CONDICIONALES */}
      <div
        style={{
          background: "#0F172A",
          borderRadius: 24,
          padding: "22px 30px",
          border: "2px solid #334155",
          boxShadow: "0 18px 40px rgba(15, 23, 42, 0.14)",
          fontFamily: FONT_MONO,
          fontSize: 30,
          lineHeight: 1.6,
          fontWeight: 700,
          color: "#F8FAFC",
        }}
      >
        <div>
          vida = <span style={{ color: "#34D399" }}>10</span>{" "}
          <span style={{ color: "#94A3B8", fontSize: 22 }}># Aria casi sin salud</span>
        </div>
        <div
          style={{
            background: hitTaken ? "rgba(239, 68, 68, 0.22)" : "transparent",
            padding: "2px 10px",
            borderRadius: 10,
          }}
        >
          vida = vida - <span style={{ color: "#F87171" }}>30</span>{" "}
          <span style={{ color: "#FCA5A5", fontSize: 22 }}>
            {hitTaken ? "# Resultado: -20 HP!" : "# Golpe del Goblin"}
          </span>
        </div>
      </div>

      {/* ARENA DE BATALLA: LA BARRA SE ROMPE HACIA LA IZQUIERDA Y ARIA ATACA COMO ZOMBI */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 28,
          padding: "28px 32px",
          border: currentHp < 0 ? "3px solid #EF4444" : "2px solid #CBD5E1",
          boxShadow: "0 24px 55px rgba(15, 23, 42, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          transform: `translateX(${shakeX}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 22,
                background: isZombieAttacking ? "#EDE9FE" : "#F8FAFC",
                border: isZombieAttacking ? "3px solid #8B5CF6" : "2px solid #CBD5E1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateX(${zombieLungeX}px)`,
              }}
            >
              <HeroAvatar frame={frame} size={80} zombie={isZombieAttacking} />
            </div>

            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 900, color: "#0F172A" }}>
                Aria · Nivel 1
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 19,
                  fontWeight: 900,
                  color: isZombieAttacking ? "#7C3AED" : "#10B981",
                  background: isZombieAttacking ? "#EDE9FE" : "#ECFDF5",
                  padding: "4px 12px",
                  borderRadius: 8,
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                {isZombieAttacking ? "⚡ MODO ZOMBI: ¡SIGUE ATACANDO!" : "ESTADO: ACTIVA"}
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 34,
              fontWeight: 900,
              color: currentHp < 0 ? "#DC2626" : "#059669",
              background: currentHp < 0 ? "#FEF2F2" : "#ECFDF5",
              padding: "10px 20px",
              borderRadius: 16,
              border: `2px solid ${currentHp < 0 ? "#FCA5A5" : "#6EE7B7"}`,
            }}
          >
            {currentHp} / 100 HP
          </div>
        </div>

        {/* CAJA DE LA BARRA DE VIDA QUE SE ROMPE HACIA LA IZQUIERDA */}
        <div style={{ paddingLeft: 140, position: "relative" }}>
          <div
            style={{
              height: 34,
              background: "#E2E8F0",
              borderRadius: 12,
              border: "2px solid #94A3B8",
              position: "relative",
              overflow: "visible",
            }}
          >
            {/* Marca de 0 HP */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: -26,
                fontFamily: FONT_MONO,
                fontSize: 16,
                fontWeight: 900,
                color: "#64748B",
              }}
            >
              LÍMITE 0 HP
            </div>

            {/* Vida positiva (10%) antes del golpe */}
            {currentHp > 0 && (
              <div
                style={{
                  width: `${currentHp}%`,
                  height: "100%",
                  background: "#10B981",
                  borderRadius: 10,
                }}
              />
            )}

            {/* Barra rota que sale hacia la izquierda cuando HP < 0 */}
            {currentHp < 0 && (
              <div
                style={{
                  position: "absolute",
                  right: "100%",
                  top: -2,
                  width: negativeOverflowWidth,
                  height: 34,
                  background: "repeating-linear-gradient(45deg, #EF4444, #EF4444 12px, #B91C1C 12px, #B91C1C 24px)",
                  borderRadius: "12px 0 0 12px",
                  border: "3px solid #991B1B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontFamily: FONT_MONO,
                  fontSize: 18,
                  fontWeight: 900,
                  boxShadow: "0 8px 25px rgba(220, 38, 38, 0.45)",
                }}
              >
                -20 HP
              </div>
            )}
          </div>
        </div>

        {/* DIAGNÓSTICO DE BUG LÓGICO */}
        <div
          style={{
            opacity: diagnosisEnter,
            transform: `translateY(${(1 - diagnosisEnter) * 16}px)`,
            background: "#FFFBEB",
            borderRadius: 18,
            padding: "16px 22px",
            border: "2px solid #FCD34D",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <IconCrash size={34} color="#D97706" />
          <div style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 700, color: "#78350F" }}>
            <span style={{ fontWeight: 900, color: "#B45309" }}>Bug Lógico:</span> Python sabe restar{" "}
            <span style={{ fontFamily: FONT_MONO }}>10 - 30 = -20</span>, pero nadie le enseñó que{" "}
            <span style={{ fontWeight: 900 }}>en 0 HP el juego termina</span>.
          </div>
        </div>
      </div>
    </CenteredSceneStage>
  );
};

// =====================================================================
// ESCENA 2 (`540 - 1260f` / 12.0s): VISUALIZADOR DE INDENTACIÓN (`[·][·][·][·]`)
// =====================================================================
const Scene2IndentationVisualizer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-eventos cada ~120f (720 frames totales):
  // 0 - 140f: Se escribe `if vida <= 0:`
  // 140 - 300f: Los dos puntos `:` brillan y empujan la línea siguiente 4 bloques `[·][·][·][·]`
  // 300 - 500f: Un brazo conector en L une el `if` con `print("GAME OVER")` dentro de su jurisdicción
  // 500 - 720f: Entra la segunda instrucción indentada `fin_del_juego()` dentro del mismo bloque
  const colonGlow = interpolate(frame, [110, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pushBlocksProgress = spring({
    frame: frame - 155,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const connectorProgress = interpolate(frame, [290, 410], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const secondLineEnter = spring({
    frame: frame - 460,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  return (
    <CenteredSceneStage durationInFrames={720}>
      {/* CABECERA */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#EEF2FF",
            border: "2px solid #A5B4FC",
            padding: "8px 24px",
            borderRadius: 999,
            marginBottom: 12,
          }}
        >
          <IconSparkles size={24} color="#4F46E5" />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              fontWeight: 900,
              color: "#4338CA",
            }}
          >
            ANATOMÍA DE UN CONDICIONAL
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
          Los dos puntos{" "}
          <span
            style={{
              fontFamily: FONT_MONO,
              color: "#D97706",
              background: "#FEF3C7",
              padding: "2px 14px",
              borderRadius: 12,
              border: "2px solid #F59E0B",
            }}
          >
            :
          </span>{" "}
          crean un bloque de 4 espacios
        </div>
      </div>

      {/* VISUALIZADOR INTERACTIVO DE INDENTACIÓN */}
      <div
        style={{
          background: "#0F172A",
          borderRadius: 28,
          padding: "32px 36px",
          border: "3px solid #6366F1",
          boxShadow: "0 24px 55px rgba(79, 70, 229, 0.18)",
          position: "relative",
        }}
      >
        {/* Línea 1: if vida <= 0: */}
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 36,
            fontWeight: 900,
            color: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ color: "#C084FC" }}>if</span>
          <span>vida &lt;= 0</span>
          <span
            style={{
              color: "#0F172A",
              background: colonGlow > 0.2 ? "#FACC15" : "#475569",
              padding: "2px 14px",
              borderRadius: 10,
              boxShadow: colonGlow > 0.2 ? "0 0 25px rgba(250, 204, 21, 0.7)" : "none",
              transform: `scale(${1 + colonGlow * 0.12})`,
            }}
          >
            :
          </span>
          {colonGlow > 0.5 && (
            <span
              style={{
                fontSize: 18,
                color: "#FDE047",
                background: "rgba(250, 204, 21, 0.16)",
                padding: "4px 12px",
                borderRadius: 999,
                marginLeft: "auto",
              }}
            >
              ABRE JURISDICCIÓN ↓
            </span>
          )}
        </div>

        {/* Línea 2: Empujada físicamente por 4 bloques `[·][·][·][·]` */}
        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Los 4 bloques físicos de espacio */}
          <div
            style={{
              display: "flex",
              gap: 6,
              width: interpolate(pushBlocksProgress, [0, 1], [0, 164]),
              overflow: "hidden",
            }}
          >
            {[1, 2, 3, 4].map((spaceNum) => (
              <div
                key={spaceNum}
                style={{
                  minWidth: 36,
                  height: 44,
                  borderRadius: 8,
                  background: "rgba(99, 102, 241, 0.25)",
                  border: "2px solid #818CF8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_MONO,
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#A5B4FC",
                }}
              >
                ·
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 32,
              fontWeight: 800,
              color: "#34D399",
              background: "rgba(16, 185, 129, 0.14)",
              padding: "8px 18px",
              borderRadius: 12,
              border: "2px solid rgba(52, 211, 153, 0.4)",
            }}
          >
            print("GAME OVER")
          </div>
        </div>

        {/* Línea 3: Segunda instrucción dentro del mismo bloque */}
        {frame >= 460 && (
          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: secondLineEnter,
              transform: `translateY(${(1 - secondLineEnter) * 16}px)`,
            }}
          >
            <div style={{ display: "flex", gap: 6, width: 164 }}>
              {[1, 2, 3, 4].map((spaceNum) => (
                <div
                  key={spaceNum}
                  style={{
                    minWidth: 36,
                    height: 44,
                    borderRadius: 8,
                    background: "rgba(99, 102, 241, 0.25)",
                    border: "2px solid #818CF8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_MONO,
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#A5B4FC",
                  }}
                >
                  ·
                </div>
              ))}
            </div>

            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 32,
                fontWeight: 800,
                color: "#38BDF8",
                background: "rgba(56, 189, 248, 0.14)",
                padding: "8px 18px",
                borderRadius: 12,
                border: "2px solid rgba(56, 189, 248, 0.4)",
              }}
            >
              fin_del_juego()
            </div>
          </div>
        )}

        {/* BRAZO CONECTOR VISUAL DE JURISDICCIÓN */}
        {connectorProgress > 0 && (
          <div
            style={{
              marginTop: 24,
              padding: "14px 20px",
              borderRadius: 16,
              background: "rgba(99, 102, 241, 0.18)",
              border: "2px solid #818CF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: connectorProgress,
            }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: 21, fontWeight: 900, color: "#E0E7FF" }}>
              ↳ JURISDICCIÓN DEL IF (4 ESPACIOS)
            </span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 19, fontWeight: 800, color: "#FDE047" }}>
              Solo se ejecutan si vida &lt;= 0 es True
            </span>
          </div>
        )}
      </div>

      {/* NOTA VISUAL DIRECTA */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 22,
          padding: "20px 26px",
          border: "2px solid #CBD5E1",
          fontFamily: FONT_SANS,
          fontSize: 24,
          fontWeight: 700,
          color: "#1E293B",
          textAlign: "center",
        }}
      >
        Los <span style={{ color: "#4F46E5", fontWeight: 900 }}>4 espacios [·][·][·][·]</span> conectan las órdenes al{" "}
        <span style={{ fontFamily: FONT_MONO, fontWeight: 900 }}>if</span>: sin ellos, Python no sabe qué código depende de la pregunta.
      </div>
    </CenteredSceneStage>
  );
};

// =====================================================================
// ESCENA 3 (`1260 - 2340f` / 18.0s): ESCÁNER LÍNEA POR LÍNEA (3 PRUEBAS)
// =====================================================================
const Scene3LineByLineFunnelScanner: React.FC = () => {
  const frame = useCurrentFrame();

  // 3 Pruebas de 360 frames (6.0s cada una = 1080 frames totales):
  // Prueba 0 (0 - 360f): `vida = 85` -> if (False) -> elif (False) -> else (True: "Listo para luchar")
  // Prueba 1 (360 - 720f): `vida = 25` -> if (False) -> elif (True: "¡Peligro Crítico!") -> TACHA else
  // Prueba 2 (720 - 1080f): `vida = 0` -> if (True: "Derrotado") -> TACHA elif y else
  const testIndex = Math.min(2, Math.floor(frame / 360));
  const subFrame = frame - testIndex * 360;

  const testCases = [
    {
      hp: 85,
      label: "PRUEBA 1 DE 3 · VIDA ALTA (85 HP)",
      color: "#10B981",
      bg: "#ECFDF5",
      statusText: "Listo para luchar",
    },
    {
      hp: 25,
      label: "PRUEBA 2 DE 3 · VIDA CRÍTICA (25 HP)",
      color: "#F59E0B",
      bg: "#FFFBEB",
      statusText: "¡Peligro Crítico!",
    },
    {
      hp: 0,
      label: "PRUEBA 3 DE 3 · SIN VIDA (0 HP)",
      color: "#EF4444",
      bg: "#FEF2F2",
      statusText: "Derrotado · GAME OVER",
    },
  ];
  const currentTest = testCases[testIndex];

  // Determinar qué rama está escaneando el láser en subFrame (0..360):
  // 0 - 95f: Escaneando Rama 1 (`if vida <= 0:`)
  // 95 - 190f: Si Prueba 0 o 1, baja a Rama 2 (`elif vida < 30:`); si Prueba 2, se queda en Rama 1 (True!)
  // 190 - 360f: Si Prueba 0, baja a Rama 3 (`else:`); si Prueba 1, se queda en Rama 2 y tacha Rama 3
  const activeBranch =
    testIndex === 2
      ? 0
      : testIndex === 1
      ? subFrame < 95
        ? 0
        : 1
      : subFrame < 95
      ? 0
      : subFrame < 190
      ? 1
      : 2;

  const branch1Status =
    testIndex === 2
      ? subFrame >= 45
        ? "TRUE"
        : "SCAN"
      : subFrame >= 45
      ? "FALSE"
      : "SCAN";

  const branch2Status =
    testIndex === 2
      ? subFrame >= 110
        ? "SKIPPED"
        : "IDLE"
      : testIndex === 1
      ? subFrame < 95
        ? "IDLE"
        : subFrame >= 140
        ? "TRUE"
        : "SCAN"
      : subFrame < 95
      ? "IDLE"
      : subFrame >= 140
      ? "FALSE"
      : "SCAN";

  const branch3Status =
    testIndex === 2
      ? subFrame >= 110
        ? "SKIPPED"
        : "IDLE"
      : testIndex === 1
      ? subFrame >= 190
        ? "SKIPPED"
        : "IDLE"
      : subFrame < 190
      ? "IDLE"
      : subFrame >= 225
      ? "TRUE"
      : "SCAN";

  return (
    <CenteredSceneStage durationInFrames={1080}>
      {/* CABECERA Y DESLIZADOR DE VIDA EN VIVO */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 24,
          padding: "20px 28px",
          border: `3px solid ${currentTest.color}`,
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.07)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 20,
              fontWeight: 900,
              color: currentTest.color,
              background: currentTest.bg,
              padding: "5px 16px",
              borderRadius: 999,
            }}
          >
            {currentTest.label}
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 28, fontWeight: 900, color: "#0F172A" }}>
            vida = <span style={{ color: currentTest.color }}>{currentTest.hp}</span>
          </span>
        </div>

        {/* Barra deslizadora con marcas en 0 y 30 */}
        <div
          style={{
            height: 24,
            background: "#E2E8F0",
            borderRadius: 999,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${currentTest.hp}%`,
              height: "100%",
              background: currentTest.color,
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      {/* ESCÁNER LÍNEA POR LÍNEA DEL EMBUDO IF / ELIF / ELSE */}
      <div
        style={{
          background: "#0F172A",
          borderRadius: 28,
          padding: "26px 30px",
          border: "2px solid #334155",
          boxShadow: "0 24px 55px rgba(15, 23, 42, 0.16)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontFamily: FONT_MONO,
        }}
      >
        {/* RAMA 1: if vida <= 0: */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 18,
            background:
              branch1Status === "TRUE"
                ? "rgba(239, 68, 68, 0.24)"
                : activeBranch === 0
                ? "rgba(56, 189, 248, 0.16)"
                : "rgba(30, 41, 59, 0.7)",
            border:
              branch1Status === "TRUE"
                ? "3px solid #EF4444"
                : activeBranch === 0
                ? "2px solid #38BDF8"
                : "2px solid transparent",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#F8FAFC" }}>
              <span style={{ color: "#C084FC" }}>if</span> vida &lt;= 0:
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                padding: "4px 14px",
                borderRadius: 999,
                background:
                  branch1Status === "TRUE"
                    ? "#EF4444"
                    : branch1Status === "FALSE"
                    ? "rgba(239, 68, 68, 0.2)"
                    : "#0284C7",
                color: branch1Status === "FALSE" ? "#FCA5A5" : "#FFFFFF",
              }}
            >
              {branch1Status === "TRUE"
                ? `✓ True (${currentTest.hp} <= 0)`
                : branch1Status === "FALSE"
                ? `✗ False (${currentTest.hp} <= 0)`
                : "ESCANEANDO..."}
            </span>
          </div>
          <div style={{ fontSize: 24, color: "#94A3B8", marginTop: 6, paddingLeft: 32 }}>
            estado = <span style={{ color: "#FCA5A5" }}>"Derrotado"</span>
          </div>
        </div>

        {/* RAMA 2: elif vida < 30: */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 18,
            background:
              branch2Status === "TRUE"
                ? "rgba(245, 158, 11, 0.24)"
                : activeBranch === 1
                ? "rgba(56, 189, 248, 0.16)"
                : "rgba(30, 41, 59, 0.7)",
            border:
              branch2Status === "TRUE"
                ? "3px solid #F59E0B"
                : activeBranch === 1
                ? "2px solid #38BDF8"
                : "2px solid transparent",
            opacity: branch2Status === "SKIPPED" ? 0.42 : 1,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#F8FAFC",
                textDecoration: branch2Status === "SKIPPED" ? "line-through" : "none",
              }}
            >
              <span style={{ color: "#C084FC" }}>elif</span> vida &lt; 30:
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                padding: "4px 14px",
                borderRadius: 999,
                background:
                  branch2Status === "TRUE"
                    ? "#F59E0B"
                    : branch2Status === "FALSE"
                    ? "rgba(239, 68, 68, 0.2)"
                    : branch2Status === "SKIPPED"
                    ? "#334155"
                    : "#1E293B",
                color:
                  branch2Status === "TRUE"
                    ? "#0F172A"
                    : branch2Status === "FALSE"
                    ? "#FCA5A5"
                    : "#94A3B8",
              }}
            >
              {branch2Status === "TRUE"
                ? `✓ True (${currentTest.hp} < 30)`
                : branch2Status === "FALSE"
                ? `✗ False (${currentTest.hp} < 30)`
                : branch2Status === "SKIPPED"
                ? "IGNORADO (YA ENTRÓ ARRIBA)"
                : "EN ESPERA"}
            </span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94A3B8",
              marginTop: 6,
              paddingLeft: 32,
              textDecoration: branch2Status === "SKIPPED" ? "line-through" : "none",
            }}
          >
            estado = <span style={{ color: "#FDE047" }}>"¡Peligro Crítico!"</span>
          </div>
        </div>

        {/* RAMA 3: else: */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 18,
            background:
              branch3Status === "TRUE"
                ? "rgba(16, 185, 129, 0.24)"
                : activeBranch === 2
                ? "rgba(56, 189, 248, 0.16)"
                : "rgba(30, 41, 59, 0.7)",
            border:
              branch3Status === "TRUE"
                ? "3px solid #10B981"
                : activeBranch === 2
                ? "2px solid #38BDF8"
                : "2px solid transparent",
            opacity: branch3Status === "SKIPPED" ? 0.42 : 1,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#F8FAFC",
                textDecoration: branch3Status === "SKIPPED" ? "line-through" : "none",
              }}
            >
              <span style={{ color: "#C084FC" }}>else</span>:
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                padding: "4px 14px",
                borderRadius: 999,
                background:
                  branch3Status === "TRUE"
                    ? "#10B981"
                    : branch3Status === "SKIPPED"
                    ? "#334155"
                    : "#1E293B",
                color: branch3Status === "TRUE" ? "#0F172A" : "#94A3B8",
              }}
            >
              {branch3Status === "TRUE"
                ? "✓ True (Por defecto)"
                : branch3Status === "SKIPPED"
                ? "TACHADO · NO SE EJECUTA"
                : "EN ESPERA"}
            </span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94A3B8",
              marginTop: 6,
              paddingLeft: 32,
              textDecoration: branch3Status === "SKIPPED" ? "line-through" : "none",
            }}
          >
            estado = <span style={{ color: "#34D399" }}>"Listo para luchar"</span>
          </div>
        </div>
      </div>

      {/* SALIDA EN VIVO EN LA TARJETA DE ARIA */}
      <div
        style={{
          background: currentTest.bg,
          borderRadius: 24,
          padding: "20px 28px",
          border: `3px solid ${currentTest.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <HeroAvatar frame={frame} size={68} dead={testIndex === 2} />
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 800, color: "#475569" }}>
              SALIDA DEL EMBUDO PYTHON:
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 900, color: "#0F172A" }}>
              {currentTest.statusText}
            </div>
          </div>
        </div>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 20,
            fontWeight: 900,
            color: "#FFFFFF",
            background: currentTest.color,
            padding: "8px 18px",
            borderRadius: 12,
          }}
        >
          1 SOLA RAMA GANADORA
        </div>
      </div>
    </CenteredSceneStage>
  );
};

// =====================================================================
// ESCENA 4 (`2340 - 2820f` / 8.0s): COMBATE REAL COHERENTE (SIN VICTORIA PREMATURA)
// =====================================================================
const Scene4CoherentBossCombat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-eventos coherentes (480 frames):
  // 0 - 130f: En combate: Aria 85 HP vs Boss Goblin 35 HP (Estado: EN COMBATE)
  // 130 - 240f: Goblin ataca (-15 HP) -> Aria baja suavemente de 85 a 70 HP
  // 240 - 350f: Aria lanza golpe crítico (-35 DMG) -> Goblin baja de 35 a 0 HP
  // 350 - 480f: Se evalúa `if hp_goblin <= 0:` -> True! RECIÉN AHORA sale `✓ VICTORIA`
  const ariaHp = Math.round(
    interpolate(frame, [130, 195], [85, 70], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const goblinHp = Math.round(
    interpolate(frame, [245, 325], [35, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const isGoblinDefeated = goblinHp === 0 && frame >= 325;
  const victoryScale = isGoblinDefeated
    ? spring({
        frame: frame - 325,
        fps,
        config: { damping: 11, stiffness: 160 },
      })
    : 0;

  // Proyectil de ataque de Aria entre f230 y f280
  const slashProgress = interpolate(frame, [225, 275], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CenteredSceneStage durationInFrames={480}>
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
          <IconSwords size={24} color="#059669" />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              fontWeight: 900,
              color: "#059669",
            }}
          >
            REGLA EN ACCIÓN · TURNO FINAL
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
          El condicional vigila{" "}
          <span style={{ color: "#059669" }}>cada golpe en tiempo real</span>
        </div>
      </div>

      {/* ARENA DE COMBATE SINCRONIZADA */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 28,
          padding: "28px 32px",
          border: isGoblinDefeated ? "3px solid #10B981" : "2px solid #CBD5E1",
          boxShadow: "0 24px 55px rgba(15, 23, 42, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          position: "relative",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {/* TARJETA DE ARIA */}
          <div
            style={{
              background: "#F8FAFC",
              borderRadius: 22,
              padding: "20px",
              border: "2px solid #3B82F6",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: FONT_SANS, fontSize: 26, fontWeight: 900, color: "#0F172A" }}>
                Aria
              </span>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  fontWeight: 900,
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: isGoblinDefeated ? "#D1FAE5" : "#DBEAFE",
                  color: isGoblinDefeated ? "#059669" : "#1D4ED8",
                }}
              >
                {isGoblinDefeated ? "✓ VICTORIA" : "EN COMBATE"}
              </span>
            </div>

            <div style={{ fontFamily: FONT_MONO, fontSize: 28, fontWeight: 900, color: "#2563EB" }}>
              {ariaHp} / 100 HP
            </div>

            <div style={{ height: 18, background: "#E2E8F0", borderRadius: 999, overflow: "hidden" }}>
              <div
                style={{
                  width: `${ariaHp}%`,
                  height: "100%",
                  background: "#3B82F6",
                }}
              />
            </div>

            <div style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#64748B", fontWeight: 700 }}>
              {frame >= 130 && frame < 230
                ? "⚡ Recibe -15 DMG del Goblin"
                : frame >= 230
                ? "⚔️ Lanza Crítico -35 DMG"
                : "🛡️ Lista para atacar"}
            </div>
          </div>

          {/* TARJETA DEL BOSS GOBLIN */}
          <div
            style={{
              background: isGoblinDefeated ? "#FEF2F2" : "#F8FAFC",
              borderRadius: 22,
              padding: "20px",
              border: `2px solid ${isGoblinDefeated ? "#EF4444" : "#F59E0B"}`,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: FONT_SANS, fontSize: 26, fontWeight: 900, color: "#0F172A" }}>
                Boss Goblin
              </span>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  fontWeight: 900,
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: isGoblinDefeated ? "#FEE2E2" : "#FEF3C7",
                  color: isGoblinDefeated ? "#DC2626" : "#B45309",
                }}
              >
                {isGoblinDefeated ? "DERROTADO (0 HP)" : "ACTIVO (35 HP)"}
              </span>
            </div>

            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 28,
                fontWeight: 900,
                color: isGoblinDefeated ? "#DC2626" : "#D97706",
              }}
            >
              {goblinHp} / 120 HP
            </div>

            <div style={{ height: 18, background: "#E2E8F0", borderRadius: 999, overflow: "hidden" }}>
              <div
                style={{
                  width: `${(goblinHp / 120) * 100}%`,
                  height: "100%",
                  background: "#F59E0B",
                }}
              />
            </div>

            <div style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#64748B", fontWeight: 700 }}>
              {isGoblinDefeated
                ? "💀 hp_goblin <= 0 es True"
                : slashProgress > 0 && slashProgress < 1
                ? "💥 ¡Impacto directo -35!"
                : "🗡️ Atacando a Aria (-15)"}
            </div>
          </div>
        </div>

        {/* REGLA EVALUADA EN TIEMPO REAL */}
        <div
          style={{
            background: "#0F172A",
            borderRadius: 20,
            padding: "20px 26px",
            fontFamily: FONT_MONO,
            fontSize: 26,
            fontWeight: 800,
            color: "#F8FAFC",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            <span style={{ color: "#C084FC" }}>if</span> hp_goblin &lt;= 0: dropear_cofre()
          </span>
          <span
            style={{
              fontSize: 20,
              padding: "6px 16px",
              borderRadius: 999,
              background: isGoblinDefeated ? "#10B981" : "#334155",
              color: isGoblinDefeated ? "#0F172A" : "#94A3B8",
              transform: isGoblinDefeated ? `scale(${0.9 + victoryScale * 0.1})` : "none",
            }}
          >
            {isGoblinDefeated ? "✓ TRUE · COFRE DROPEADO" : `FALSE (${goblinHp} > 0)`}
          </span>
        </div>
      </div>
    </CenteredSceneStage>
  );
};

// =====================================================================
// ESCENA 5 (`2820 - 3240f` / 7.0s): CLIFFHANGER A LISTAS (EP. 4) Y CTA
// =====================================================================
const Scene5LootCliffhangerAndCta: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <CenteredSceneStage durationInFrames={420}>
      {/* CLIFFHANGER: EL COFRE SUELTA MUCHOS ÍTEMS */}
      <div
        style={{
          background: "#F5F3FF",
          borderRadius: 26,
          padding: "26px 32px",
          border: "3px solid #C4B5FD",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 21,
              fontWeight: 900,
              color: "#6D28D9",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <IconBackpack size={26} color="#6D28D9" />
            EL PROBLEMA DEL INVENTARIO
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 20,
              fontWeight: 900,
              color: "#FFFFFF",
              background: "#7C3AED",
              padding: "4px 14px",
              borderRadius: 999,
            }}
          >
            item_1, item_2... item_50?!
          </span>
        </div>

        <div style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 900, color: "#0F172A", lineHeight: 1.25 }}>
          El Boss soltó Espada, Poción, Llave y Oro...{" "}
          <span style={{ color: "#6D28D9" }}>¿crearás 50 variables sueltas?</span>
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 23, fontWeight: 700, color: "#475569" }}>
          ¡Jamás! En el Episodio 4 usaremos <span style={{ color: "#7C3AED", fontWeight: 900 }}>Listas y Diccionarios</span> para programar la mochila de Aria.
        </div>
      </div>

      {/* CHECKLIST DE PROGRESO */}
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
              EPISODIO 3 LISTO
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 900, color: "#0F172A" }}>
              Condicionales if/else
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: "18px 22px",
            border: "2px solid #7C3AED",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <IconBackpack size={28} color="#7C3AED" />
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 900, color: "#7C3AED" }}>
              SIGUIENTE: EP. 4
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 900, color: "#0F172A" }}>
              Listas e Inventario
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
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
          Guarda este video y sígueme
          <br />
          <span style={{ color: "#7C3AED" }}>para el Episodio 4: Inventario RPG</span>
        </div>

        <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
          <div
            style={{
              background: "#F5F3FF",
              border: "2px solid #7C3AED",
              borderRadius: 16,
              padding: "14px 30px",
              fontFamily: FONT_SANS,
              fontSize: 26,
              fontWeight: 800,
              color: "#6D28D9",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transform: `scale(${1 + Math.sin(frame / 10) * 0.03})`,
            }}
          >
            <IconBookmark size={24} color="#6D28D9" />
            <span>Guardar</span>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
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
// COMPOSICIÓN PRINCIPAL: EPISODIO 3 (3240 FRAMES / 54.0s @ 60 FPS)
// =====================================================================
export const PyQuestEp03: React.FC = () => {
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

      {/* 3. Efectos de sonido sincronizados con cada acción en pantalla */}
      <PyQuestSfx name="whoosh-short" from={0} volume={0.34} />
      <PyQuestSfx name="error" from={110} volume={0.45} />
      <PyQuestSfx name="impact-bass-1" from={135} volume={0.42} />
      <PyQuestSfx name="pop" from={220} volume={0.35} />

      <PyQuestSfx name="whoosh-short" from={540} volume={0.32} />
      <PyQuestSfx name="sparkle" from={655} volume={0.35} />
      <PyQuestSfx name="click-soft" from={700} volume={0.32} />
      <PyQuestSfx name="chime" from={840} volume={0.36} />
      <PyQuestSfx name="pop" from={1000} volume={0.32} />

      <PyQuestSfx name="whoosh-short" from={1260} volume={0.32} />
      <PyQuestSfx name="click-soft" from={1305} volume={0.3} />
      <PyQuestSfx name="click-soft" from={1400} volume={0.3} />
      <PyQuestSfx name="chime" from={1485} volume={0.36} />

      <PyQuestSfx name="click-soft" from={1665} volume={0.3} />
      <PyQuestSfx name="sparkle" from={1760} volume={0.36} />

      <PyQuestSfx name="error" from={2025} volume={0.38} />

      <PyQuestSfx name="whoosh-short" from={2340} volume={0.32} />
      <PyQuestSfx name="impact-bass-1" from={2470} volume={0.38} />
      <PyQuestSfx name="impact-bass-2" from={2585} volume={0.44} />
      <PyQuestSfx name="chime" from={2665} volume={0.42} />

      <PyQuestSfx name="whoosh-short" from={2820} volume={0.32} />
      <PyQuestSfx name="sparkle" from={3000} volume={0.36} />

      {/* 4. Secuencias estrictas sin solapamiento */}
      <Sequence from={0} durationInFrames={540}>
        <Scene1ZombieHeroLogicalBug />
      </Sequence>

      <Sequence from={540} durationInFrames={720}>
        <Scene2IndentationVisualizer />
      </Sequence>

      <Sequence from={1260} durationInFrames={1080}>
        <Scene3LineByLineFunnelScanner />
      </Sequence>

      <Sequence from={2340} durationInFrames={480}>
        <Scene4CoherentBossCombat />
      </Sequence>

      <Sequence from={2820} durationInFrames={420}>
        <Scene5LootCliffhangerAndCta />
      </Sequence>
    </AbsoluteFill>
  );
};
