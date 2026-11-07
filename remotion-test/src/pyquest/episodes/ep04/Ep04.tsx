/**
 * =====================================================================
 * PYQUEST · EPISODIO 4: "LISTAS Y DICCIONARIOS: EL INVENTARIO DEL HÉROE"
 * =====================================================================
 * Nivel de producción: Studio-grade (Apple, Linear & Vercel design system).
 * Resolución: 1080x1920 (Vertical 9:16) @ 60 FPS.
 * Duración Total: 74 segundos exactos (4440 frames).
 * 
 * Reglas de diseño maestras (tomadas en base al Ep. 1):
 * 1. Fondo reactivo con interpolateColors + orbes volumétricos 2.5D.
 * 2. Patrón de puntos con paralaje continuo en diagonal.
 * 3. Cero emojis: 100% iconografía SVG vectorial personalizada (PyQuestIcons).
 * 4. Animación de escritura progresiva en vivo (TypewriterText) con cursor.
 * 5. Tipografías mobile-first legibles (títulos 46-52px, código 30-34px).
 * 6. Simulación RPG de Aria con su morral de inventario y slots interactivos.
 * =====================================================================
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolateColors,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_MONO, FONT_SANS, PYQUEST_THEME } from "../../theme";
import { PyQuestSfx } from "../../sfx";
import {
  IconBackpack,
  IconBookmark,
  IconBox,
  IconCheck,
  IconLoop,
  IconShield,
  IconSparkles,
  IconSwords,
  IconTag,
  IconWarning,
} from "../../components/PyQuestIcons";
import { TypewriterText } from "../../components/TypewriterText";

// =====================================================================
// COMPONENTE 1: ATMÓSFERA Y FONDO REACTIVO DINÁMICO (2.5D)
// =====================================================================
const AtmosphereBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const bgBase = interpolateColors(
    frame,
    [0, 240, 480, 1560, 1620, 2760, 2820, 3840, 3900, 4440],
    [
      "#FECDD3", // f0 - f480: Rosa alerta (Caos de variables sueltas)
      "#FECDD3",
      "#BAE6FD", // f480 - f1560: Cyan tecnológico (Listas e indexación base 0)
      "#BAE6FD",
      "#DDD6FE", // f1560 - f2760: Púrpura épico (.append() y cofre del tesoro)
      "#DDD6FE",
      "#A7F3D0", // f2760 - f3840: Esmeralda ordenado (Diccionarios y stats de Aria)
      "#A7F3D0",
      "#FEF3C7", // f3840 - f4440: Dorado celebración (Cliffhanger a Bucles For y CTA)
      "#FDE68A",
    ]
  );

  const bgSecond = interpolateColors(
    frame,
    [0, 480, 1560, 2760, 3840],
    [
      "#FDA4AF", // Carmesí suave
      "#93C5FD", // Azul suave
      "#C4B5FD", // Violeta suave
      "#6EE7B7", // Esmeralda suave
      "#FDE68A", // Amarillo suave
    ]
  );

  const orb1Color = interpolateColors(
    frame,
    [0, 480, 1560, 2760, 3840],
    [
      "rgba(225, 29, 72, 0.45)",  // Rojo alerta
      "rgba(14, 165, 233, 0.50)", // Cyan orden
      "rgba(124, 58, 237, 0.50)", // Púrpura magia
      "rgba(5, 150, 105, 0.50)",  // Esmeralda salud
      "rgba(217, 119, 6, 0.50)",  // Ámbar oro
    ]
  );

  const orb2Color = interpolateColors(
    frame,
    [0, 480, 1560, 2760, 3840],
    [
      "rgba(244, 63, 94, 0.35)",
      "rgba(59, 130, 246, 0.40)",
      "rgba(147, 51, 234, 0.40)",
      "rgba(16, 185, 129, 0.40)",
      "rgba(245, 158, 11, 0.40)",
    ]
  );

  const orb1X = Math.sin(frame / 32) * 140;
  const orb1Y = Math.cos(frame / 40) * 120;
  const orb2X = Math.cos(frame / 28) * -150;
  const orb2Y = Math.sin(frame / 36) * 130;

  const lightCenterX = 50 + Math.sin(frame / 45) * 20;
  const lightCenterY = 40 + Math.cos(frame / 38) * 18;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${lightCenterX}% ${lightCenterY}%, ${bgBase} 0%, ${bgSecond} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Textura de puntos con paralaje continuo en diagonal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#0f172a 2px, transparent 2px)",
          backgroundSize: "38px 38px",
          backgroundPosition: `${-frame * 0.7}px ${-frame * 0.5}px`,
          opacity: 0.10,
          pointerEvents: "none",
        }}
      />

      {/* Orbe 1 */}
      <div
        style={{
          position: "absolute",
          top: -150 + orb1Y,
          left: 100 + orb1X,
          width: 950,
          height: 950,
          borderRadius: "50%",
          background: orb1Color,
          filter: "blur(110px)",
          pointerEvents: "none",
          transform: `scale(${1 + Math.sin(frame / 45) * 0.12})`,
        }}
      />

      {/* Orbe 2 */}
      <div
        style={{
          position: "absolute",
          bottom: -180 + orb2Y,
          right: 50 + orb2X,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: orb2Color,
          filter: "blur(120px)",
          pointerEvents: "none",
          transform: `scale(${1 + Math.cos(frame / 38) * 0.10})`,
        }}
      />
    </AbsoluteFill>
  );
};

// =====================================================================
// COMPONENTE 2: FICHA DE ARIA CON HUD DE INVENTARIO
// =====================================================================
const AriaInventoryHUD: React.FC<{
  frame: number;
  items: Array<{ name: string; slot: number; icon: "potion" | "sword" | "shield" | "amulet" }>;
  hp: number;
}> = ({ frame, items, hp }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
        border: "2px solid rgba(15, 23, 42, 0.08)",
        borderRadius: 24,
        padding: "24px 28px",
        boxShadow: "0 20px 45px -10px rgba(0,0,0,0.08)",
        transform: `translateY(${Math.sin(frame / 18) * 4}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              background: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
              border: "2px solid #38BDF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconBackpack size={30} color="#0284C7" />
          </div>
          <div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 900, color: "#0F172A" }}>
              Morral de Aventuras
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#64748B", fontWeight: 700 }}>
              Aria · Nivel 4 · {items.length} Objetos
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 22, fontWeight: 800, color: "#10B981" }}>
            HP {hp} / 100
          </div>
        </div>
      </div>

      {/* Casillas de inventario tipo slots */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {items.map((it, idx) => (
          <div
            key={idx}
            style={{
              background: "#F1F5F9",
              border: "1.5px solid #CBD5E1",
              borderRadius: 16,
              padding: "14px 10px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
            }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: 16, color: "#64748B", fontWeight: 800 }}>
              [{it.slot}]
            </span>
            {it.icon === "potion" && <IconSparkles size={24} color="#10B981" />}
            {it.icon === "sword" && <IconSwords size={24} color="#3B82F6" />}
            {it.icon === "shield" && <IconShield size={24} color="#8B5CF6" />}
            {it.icon === "amulet" && <IconBookmark size={24} color="#F59E0B" />}
            <span style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 800, color: "#1E293B", lineHeight: 1.1 }}>
              {it.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// =====================================================================
// COMPONENTE PRINCIPAL DEL EPISODIO 4
// =====================================================================
export const PyQuestEp04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const perpetualFloatY = Math.sin(frame / 20) * 8;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* 1. Fondo Atmosférico 2.5D */}
      <AtmosphereBackground frame={frame} />

      {/* 2. Cama de música ambiental continua (BGM) */}
      <Audio
        src={staticFile("bgm/tech_ambient_bed.mp3")}
        volume={(f) => {
          const fadeIn = Math.min(1, f / (fps * 0.8));
          const fadeOut = Math.min(1, (durationInFrames - f) / (fps * 0.8));
          return 0.09 * Math.max(0, fadeIn) * Math.max(0, fadeOut);
        }}
        loop
      />

      {/* 3. Disparadores de audio SFX sincronizados */}
      <PyQuestSfx name="whoosh-short" from={0} volume={0.32} />
      <PyQuestSfx name="error" from={120} volume={0.45} />
      <PyQuestSfx name="pop" from={220} volume={0.30} />

      <PyQuestSfx name="whoosh-short" from={480} volume={0.32} />
      <PyQuestSfx name="typing" from={500} volume={0.25} />
      <PyQuestSfx name="pop" from={720} volume={0.30} />
      <PyQuestSfx name="pop" from={880} volume={0.30} />
      <PyQuestSfx name="chime" from={1200} volume={0.36} />

      <PyQuestSfx name="whoosh-short" from={1560} volume={0.32} />
      <PyQuestSfx name="sparkle" from={1600} volume={0.38} />
      <PyQuestSfx name="click-soft" from={1800} volume={0.30} />
      <PyQuestSfx name="chime" from={2400} volume={0.36} />

      <PyQuestSfx name="whoosh-short" from={2760} volume={0.32} />
      <PyQuestSfx name="click-soft" from={2900} volume={0.30} />
      <PyQuestSfx name="sparkle" from={3400} volume={0.36} />

      <PyQuestSfx name="whoosh-short" from={3840} volume={0.32} />
      <PyQuestSfx name="pop" from={3860} volume={0.32} />
      <PyQuestSfx name="sparkle" from={4100} volume={0.38} />
      <PyQuestSfx name="chime" from={4300} volume={0.36} />

      {/* 2. Badge Superior Unificado */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: PYQUEST_THEME.safe.side,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 24px",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.9)",
          border: "2px solid #38BDF8",
          boxShadow: "0 8px 24px rgba(56, 189, 248, 0.25)",
          zIndex: 50,
        }}
      >
        <Img
          src={staticFile("assets/logos/python.svg")}
          style={{ width: 22, height: 22 }}
        />
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 20,
            fontWeight: 800,
            color: "#0284C7",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          PyQuest · Episodio 4
        </span>
      </div>

      {/* ================================================================ */}
      {/* ESCENA 1: EL CAOS DE LAS VARIABLES SUELTAS (f0 - f480 / 0:00 - 0:08) */}
      {/* ================================================================ */}
      {frame < 500 && (
        <AbsoluteFill style={{ padding: `0 ${PYQUEST_THEME.safe.side}px`, boxSizing: "border-box" }}>
          {(() => {
            const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div
                style={{
                  position: "absolute",
                  top: 200 + perpetualFloatY * 0.4,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 40}px)`,
                }}
              >
                {/* Tag de Alerta */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 18px",
                    borderRadius: 12,
                    background: "rgba(239, 68, 68, 0.15)",
                    border: "1.5px solid #EF4444",
                    color: "#EF4444",
                    fontFamily: FONT_MONO,
                    fontSize: 20,
                    fontWeight: 800,
                    marginBottom: 16,
                  }}
                >
                  <IconWarning size={20} color="#EF4444" />
                  <span>ERROR DE ARQUITECTURA</span>
                </div>

                <h1
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 54,
                    fontWeight: 900,
                    color: "#0F172A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    margin: "0 0 16px 0",
                  }}
                >
                  ¿Crear 10 variables
                  <br />
                  <span style={{ color: "#EF4444" }}>para 10 objetos?</span>
                </h1>

                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 26,
                    color: "#475569",
                    lineHeight: 1.35,
                    fontWeight: 600,
                    margin: "0 0 32px 0",
                  }}
                >
                  El error #1 que hace tu código completamente inmantenible.
                </p>

                {/* Editor con código redundante */}
                <div
                  style={{
                    background: "#0F172A",
                    border: "2px solid #EF4444",
                    borderRadius: 22,
                    padding: "28px 32px",
                    boxShadow: "0 20px 50px rgba(239, 68, 68, 0.25)",
                  }}
                >
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} />
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
                    <span style={{ fontFamily: FONT_MONO, fontSize: 16, color: "#64748B", marginLeft: 12 }}>
                      inventario_caotico.py
                    </span>
                  </div>

                  <div style={{ fontFamily: FONT_MONO, fontSize: 28, color: "#F8FAFC", lineHeight: 1.6 }}>
                    <div>item1 = "Poción de Vida"</div>
                    <div>item2 = "Espada de Hierro"</div>
                    <div>item3 = "Escudo de Madera"</div>
                    <div style={{ color: "#EF4444", marginTop: 8 }}>
                      # ¡Si tienes 100 objetos, son 100 variables sueltas!
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 2: LA LISTA Y LA INDEXACIÓN EN BASE CERO (f480 - f1560) */}
      {/* ================================================================ */}
      {frame >= 480 && frame < 1600 && (
        <AbsoluteFill style={{ padding: `0 ${PYQUEST_THEME.safe.side}px`, boxSizing: "border-box" }}>
          {(() => {
            const enter = spring({ frame: frame - 480, fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div
                style={{
                  position: "absolute",
                  top: 200,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 40}px)`,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 18px",
                    borderRadius: 12,
                    background: "rgba(14, 165, 233, 0.15)",
                    border: "1.5px solid #0284C7",
                    color: "#0284C7",
                    fontFamily: FONT_MONO,
                    fontSize: 20,
                    fontWeight: 800,
                    marginBottom: 16,
                  }}
                >
                  <IconBox size={20} color="#0284C7" />
                  <span>ESTRUCTURA: LIST</span>
                </div>

                <h2
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 52,
                    fontWeight: 900,
                    color: "#0F172A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    margin: "0 0 16px 0",
                  }}
                >
                  Una sola variable.
                  <br />
                  <span style={{ color: "#0284C7" }}>Todo el inventario agrupado.</span>
                </h2>

                {/* Editor con código de lista */}
                <div
                  style={{
                    background: "#0F172A",
                    border: "2px solid #38BDF8",
                    borderRadius: 22,
                    padding: "26px 30px",
                    boxShadow: "0 25px 60px rgba(56, 189, 248, 0.3)",
                    marginBottom: 28,
                  }}
                >
                  <div style={{ fontFamily: FONT_MONO, fontSize: 28, color: "#38BDF8", marginBottom: 12 }}>
                    # Colección ordenada entre corchetes []
                  </div>
                  <TypewriterText
                    text='inventario = ["Poción", "Espada", "Escudo"]'
                    frame={frame}
                    startFrame={500}
                    durationFrames={50}
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 32,
                      fontWeight: 800,
                      color: "#F8FAFC",
                    }}
                  />
                </div>

                {/* HUD Interactivo de Aria */}
                <AriaInventoryHUD
                  frame={frame}
                  hp={80}
                  items={[
                    { name: "Poción", slot: 0, icon: "potion" },
                    { name: "Espada", slot: 1, icon: "sword" },
                    { name: "Escudo", slot: 2, icon: "shield" },
                  ]}
                />
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 3: MÉTODO .APPEND() Y RECOMPENSA DE COFRE (f1560 - f2760) */}
      {/* ================================================================ */}
      {frame >= 1560 && frame < 2800 && (
        <AbsoluteFill style={{ padding: `0 ${PYQUEST_THEME.safe.side}px`, boxSizing: "border-box" }}>
          {(() => {
            const enter = spring({ frame: frame - 1560, fps, config: { damping: 14, stiffness: 120 } });
            const itemDropped = frame >= 1800;

            return (
              <div
                style={{
                  position: "absolute",
                  top: 200,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 40}px)`,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 18px",
                    borderRadius: 12,
                    background: "rgba(139, 92, 246, 0.15)",
                    border: "1.5px solid #8B5CF6",
                    color: "#8B5CF6",
                    fontFamily: FONT_MONO,
                    fontSize: 20,
                    fontWeight: 800,
                    marginBottom: 16,
                  }}
                >
                  <IconSparkles size={20} color="#8B5CF6" />
                  <span>MÉTODO DINÁMICO: .APPEND()</span>
                </div>

                <h2
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 52,
                    fontWeight: 900,
                    color: "#0F172A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    margin: "0 0 16px 0",
                  }}
                >
                  Añade objetos
                  <br />
                  <span style={{ color: "#8B5CF6" }}>al final de la lista.</span>
                </h2>

                <div
                  style={{
                    background: "#0F172A",
                    border: "2px solid #8B5CF6",
                    borderRadius: 22,
                    padding: "26px 30px",
                    boxShadow: "0 25px 60px rgba(139, 92, 246, 0.3)",
                    marginBottom: 28,
                  }}
                >
                  <TypewriterText
                    text='inventario.append("Amuleto Mágico")'
                    frame={frame}
                    startFrame={1600}
                    durationFrames={50}
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 32,
                      fontWeight: 800,
                      color: "#A7F3D0",
                    }}
                  />
                </div>

                {/* HUD con el objeto 4 añadido dinámicamente */}
                <AriaInventoryHUD
                  frame={frame}
                  hp={80}
                  items={[
                    { name: "Poción", slot: 0, icon: "potion" },
                    { name: "Espada", slot: 1, icon: "sword" },
                    { name: "Escudo", slot: 2, icon: "shield" },
                    ...(itemDropped ? [{ name: "Amuleto", slot: 3, icon: "amulet" as const }] : []),
                  ]}
                />
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 4: DICCIONARIOS: PAREJAS CLAVE-VALOR (f2760 - f3840) */}
      {/* ================================================================ */}
      {frame >= 2760 && frame < 3900 && (
        <AbsoluteFill style={{ padding: `0 ${PYQUEST_THEME.safe.side}px`, boxSizing: "border-box" }}>
          {(() => {
            const enter = spring({ frame: frame - 2760, fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div
                style={{
                  position: "absolute",
                  top: 200,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 40}px)`,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 18px",
                    borderRadius: 12,
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1.5px solid #10B981",
                    color: "#10B981",
                    fontFamily: FONT_MONO,
                    fontSize: 20,
                    fontWeight: 800,
                    marginBottom: 16,
                  }}
                >
                  <IconTag size={20} color="#10B981" />
                  <span>DICCIONARIOS: CLAVE Y VALOR</span>
                </div>

                <h2
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 52,
                    fontWeight: 900,
                    color: "#0F172A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    margin: "0 0 16px 0",
                  }}
                >
                  Accede a los datos
                  <br />
                  <span style={{ color: "#10B981" }}>por su nombre real.</span>
                </h2>

                <div
                  style={{
                    background: "#0F172A",
                    border: "2px solid #10B981",
                    borderRadius: 22,
                    padding: "26px 30px",
                    boxShadow: "0 25px 60px rgba(16, 185, 129, 0.3)",
                    marginBottom: 28,
                  }}
                >
                  <div style={{ fontFamily: FONT_MONO, fontSize: 26, color: "#10B981", marginBottom: 8 }}>
                    # Diccionario con llaves {"{}"}
                  </div>
                  <pre
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#F8FAFC",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
{`heroe = {
    "nombre": "Aria",
    "vida": 80,
    "clase": "Guerrera"
}
print(heroe["vida"])  # Imprime: 80`}
                  </pre>
                </div>

                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 20,
                    padding: "20px 24px",
                    border: "2px solid rgba(16, 185, 129, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <IconCheck size={28} color="#10B981" />
                  <span style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 700, color: "#1E293B" }}>
                    Cero índices confusos: accedes directamente por etiquetas legibles.
                  </span>
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 5: CLIFFHANGER A BUCLES FOR & CTA (f3840 - f4440) */}
      {/* ================================================================ */}
      {frame >= 3840 && (
        <AbsoluteFill style={{ padding: `0 ${PYQUEST_THEME.safe.side}px`, boxSizing: "border-box" }}>
          {(() => {
            const enter = spring({ frame: frame - 3840, fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div
                style={{
                  position: "absolute",
                  top: 260,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 40}px)`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 28,
                    background: "rgba(245, 158, 11, 0.2)",
                    border: "3px solid #F59E0B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px auto",
                    boxShadow: "0 0 40px rgba(245, 158, 11, 0.4)",
                  }}
                >
                  <IconLoop size={44} color="#F59E0B" />
                </div>

                <h2
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 54,
                    fontWeight: 900,
                    color: "#0F172A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    margin: "0 0 20px 0",
                  }}
                >
                  ¿Y si tienes 100 objetos?
                  <br />
                  <span style={{ color: "#F59E0B" }}>Episodio 5: Bucles For.</span>
                </h2>

                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 26,
                    color: "#475569",
                    lineHeight: 1.4,
                    fontWeight: 600,
                    maxWidth: 760,
                    margin: "0 auto 36px auto",
                  }}
                >
                  Aprenderemos a recorrer colecciones enteras automáticamente sin repetir una sola línea.
                </p>

                {/* Badge CTA */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "18px 36px",
                    borderRadius: 22,
                    background: "#0F172A",
                    border: "2px solid #F59E0B",
                    boxShadow: "0 20px 50px rgba(245, 158, 11, 0.35)",
                  }}
                >
                  <span style={{ fontFamily: FONT_SANS, fontSize: 26, fontWeight: 700, color: "#FFFFFF" }}>
                    Comenta
                  </span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 32, fontWeight: 900, color: "#F59E0B" }}>
                    "BUCLES"
                  </span>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 700, color: "#94A3B8" }}>
                    para el código
                  </span>
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
