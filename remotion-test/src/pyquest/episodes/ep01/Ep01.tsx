/**
 * =====================================================================
 * PYQUEST · EPISODIO 1: ¿POR QUÉ PYTHON ES TU MEJOR INICIO?
 * =====================================================================
 * Duración: 72 segundos (4320 frames @ 60 FPS).
 * Fondo: Plano cálido marfil (#F7F6F2), sin barras superiores invasivas.
 * Movimiento: Fluido y continuo en todo momento (cero fotogramas quietos).
 * =====================================================================
 */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_MONO, FONT_SANS, PYQUEST_THEME } from "../../theme";
import { useContinuousDrift, useContinuousFloat, useShake } from "../../motion";
import { PyQuestSfx } from "../../sfx";
import { FloatingCodeCard } from "../../components/FloatingCodeCard";
import { MinimalTerminal } from "../../components/MinimalTerminal";
import { GameVisualizer } from "../../components/GameVisualizer";
import { CleanCaptions } from "../../components/CleanCaptions";

export const PyQuestEp01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Micro-deriva de cámara continua para toda la composición (regla de los 180 frames)
  const cameraScale = useContinuousDrift(0, durationInFrames, [1.0, 1.02]);

  // Sacudida de error en Beat 1 (frame 170 a 205)
  const beat1Shake = useShake(170, 30, 14);

  // Floating armónico para elementos globales
  const { floatY: globalFloat } = useContinuousFloat(0, 6, 26);

  return (
    <AbsoluteFill
      style={{
        background: PYQUEST_THEME.bg,
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
      }}
    >
      {/* Cama de música ambiental continua (BGM) suavemente atenuada */}
      <Audio
        src={staticFile("bgm/tech_ambient_bed.mp3")}
        volume={(f) => {
          const fadeIn = Math.min(1, f / (fps * 0.8));
          const fadeOut = Math.min(1, (durationInFrames - f) / (fps * 0.8));
          return 0.08 * Math.max(0, fadeIn) * Math.max(0, fadeOut);
        }}
        loop
      />

      {/* ================================================================ */}
      {/* BEAT 1: EL CHOQUE DE SINTAXIS (0s - 8s / 0 - 480 frames)          */}
      {/* ================================================================ */}
      <Sequence durationInFrames={480}>
        <PyQuestSfx name="whoosh-short" from={0} volume={0.3} />
        <PyQuestSfx name="typing" from={10} volume={0.25} />
        <PyQuestSfx name="error" from={170} volume={0.4} />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            gap: 36,
          }}
        >
          {/* Tarjeta con código Java verboso */}
          <FloatingCodeCard
            title="App.java"
            lines={[
              { text: "public class App {" },
              { text: "  public static void main(String[] args) {" },
              { text: "    System.out.println(\"Hola mundo\")" }, // Le falta el ';'
              { text: "  }" },
              { text: "}" },
            ]}
            activeLineIndex={frame >= 170 ? 2 : undefined}
            shakeX={beat1Shake}
            highlightColor={PYQUEST_THEME.code.danger}
          />

          {/* Consola con el error exacto tras el fallo */}
          {frame >= 180 && (
            <MinimalTerminal
              command="javac App.java"
              output={"error: ';' expected\nSystem.out.println(\"Hola mundo\")\n                           ^"}
              isError={true}
              enterDelay={0}
              shakeX={beat1Shake}
            />
          )}

          <CleanCaptions
            text="La mayoría que intenta aprender a programar abandona en dos semanas por el lenguaje equivocado."
            highlightWord="equivocado"
            accentColor="#EF4444"
          />
        </AbsoluteFill>
      </Sequence>

      {/* ================================================================ */}
      {/* BEAT 2: CARGA COGNITIVA VS LÓGICA (8s - 24s / 480 - 1440f)         */}
      {/* ================================================================ */}
      <Sequence from={480} durationInFrames={960}>
        <PyQuestSfx name="whoosh-short" from={0} volume={0.3} />
        <PyQuestSfx name="pop" from={40} volume={0.3} />
        <PyQuestSfx name="chime" from={120} volume={0.35} />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            gap: 36,
          }}
        >
          {/* Tarjeta de Python pura y limpia */}
          <FloatingCodeCard
            title="main.py"
            lines={[
              {
                text: "print(\"Bienvenido a PyQuest\")",
                tokens: [
                  { text: "print", color: PYQUEST_THEME.code.function, bold: true },
                  { text: "(", color: PYQUEST_THEME.code.base },
                  { text: "\"Bienvenido a PyQuest\"", color: PYQUEST_THEME.code.str },
                  { text: ")", color: PYQUEST_THEME.code.base },
                ],
              },
            ]}
            activeLineIndex={0}
          />

          {/* Terminal que muestra la salida limpia */}
          <MinimalTerminal
            command="python main.py"
            output="Bienvenido a PyQuest"
            isError={false}
            enterDelay={30}
          />

          <CleanCaptions
            text="Python elimina las reglas complicadas de sintaxis para que te enfoques en la lógica real."
            highlightWord="lógica"
            accentColor="#10B981"
          />
        </AbsoluteFill>
      </Sequence>

      {/* ================================================================ */}
      {/* BEAT 3: PSEUDOCÓDIGO EJECUTABLE EN PYQUEST (24s - 42s / 1440 - 2520f) */}
      {/* ================================================================ */}
      <Sequence from={1440} durationInFrames={1080}>
        <PyQuestSfx name="whoosh-short" from={0} volume={0.3} />
        <PyQuestSfx name="click-soft" from={30} volume={0.3} />
        <PyQuestSfx name="sparkle" from={90} volume={0.3} />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            gap: 32,
          }}
        >
          {/* Código de la primera regla del juego */}
          <FloatingCodeCard
            title="pyquest.py"
            lines={[
              {
                text: "if vida <= 0:",
                tokens: [
                  { text: "if", color: PYQUEST_THEME.code.keyword, bold: true },
                  { text: " vida <= ", color: PYQUEST_THEME.code.base },
                  { text: "0", color: PYQUEST_THEME.code.int, bold: true },
                  { text: ":", color: PYQUEST_THEME.code.base },
                ],
              },
              {
                text: "    fin_del_juego()",
                tokens: [
                  { text: "    ", color: PYQUEST_THEME.code.base },
                  { text: "fin_del_juego", color: PYQUEST_THEME.code.function, bold: true },
                  { text: "()", color: PYQUEST_THEME.code.base },
                ],
              },
            ]}
            activeLineIndex={0}
          />

          {/* Estado vivo del RPG con Aria */}
          <GameVisualizer currentHp={100} maxHp={100} heroName="Aria" statusText="¡Héroe listo para la aventura!" />

          {/* Píldora de traducción en lenguaje natural */}
          <div
            style={{
              background: "rgba(59, 130, 246, 0.08)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: 16,
              padding: "16px 28px",
              fontFamily: FONT_SANS,
              fontSize: 28,
              fontWeight: 700,
              color: "#2563EB",
              textAlign: "center",
            }}
          >
            Si la vida es menor o igual a cero ➔ termina la partida
          </div>

          <CleanCaptions
            text="Aunque nunca hayas programado, lo entiendes: se lee casi como hablar en español."
            highlightWord="entiendes"
            accentColor="#3B82F6"
          />
        </AbsoluteFill>
      </Sequence>

      {/* ================================================================ */}
      {/* BEAT 4: ESCALABILIDAD REAL DE LA INDUSTRIA (42s - 58s / 2520 - 3480f) */}
      {/* ================================================================ */}
      <Sequence from={2520} durationInFrames={960}>
        <PyQuestSfx name="whoosh-short" from={0} volume={0.3} />
        <PyQuestSfx name="pop" from={20} volume={0.25} />
        <PyQuestSfx name="pop" from={140} volume={0.25} />
        <PyQuestSfx name="pop" from={260} volume={0.25} />
        <PyQuestSfx name="pop" from={380} volume={0.25} />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 36,
              fontWeight: 800,
              color: PYQUEST_THEME.textPrimary,
              marginBottom: 12,
            }}
          >
            Una sola base · Toda la industria
          </div>

          {/* Bento de 4 tarjetas de escala que aparecen con fluidez */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              width: 920,
            }}
          >
            {[
              {
                title: "Inteligencia Artificial",
                desc: "PyTorch & OpenAI",
                color: "#8B5CF6",
                icon: "🧠",
                delay: 20,
              },
              {
                title: "Servidores Backend",
                desc: "Instagram & Spotify",
                color: "#3B82F6",
                icon: "⚡",
                delay: 140,
              },
              {
                title: "Ciencia de Datos",
                desc: "Pandas & Analytics",
                color: "#10B981",
                icon: "📊",
                delay: 260,
              },
              {
                title: "Automatización",
                desc: "Bots & Scripts",
                color: "#F59E0B",
                icon: "⚙️",
                delay: 380,
              },
            ].map((item, i) => {
              const relFrame = Math.max(0, frame - 2520 - item.delay);
              const enterP = interpolate(relFrame, [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    background: PYQUEST_THEME.cardLight,
                    borderRadius: 20,
                    padding: "28px 24px",
                    boxShadow: "0 10px 30px -8px rgba(0,0,0,0.06)",
                    border: `1px solid rgba(0,0,0,0.06)`,
                    borderTop: `4px solid ${item.color}`,
                    transform: `translateY(${(1 - enterP) * 30 + Math.sin((frame + i * 15) / 20) * 4}px) scale(${0.95 + enterP * 0.05})`,
                    opacity: enterP,
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 800, color: PYQUEST_THEME.textPrimary, marginBottom: 6 }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: PYQUEST_THEME.textMuted }}>
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>

          <CleanCaptions
            text="La misma sintaxis que aprendes aquí mueve la Inteligencia Artificial y las plataformas más grandes."
            highlightWord="Inteligencia"
            accentColor="#8B5CF6"
          />
        </AbsoluteFill>
      </Sequence>

      {/* ================================================================ */}
      {/* BEAT 5: PRESENTACIÓN DE LA SERIE Y CTA (58s - 72s / 3480 - 4320f) */}
      {/* ================================================================ */}
      <Sequence from={3480} durationInFrames={840}>
        <PyQuestSfx name="whoosh-short" from={0} volume={0.3} />
        <PyQuestSfx name="sparkle" from={30} volume={0.35} />
        <PyQuestSfx name="chime" from={90} volume={0.35} />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            gap: 28,
          }}
        >
          {/* Avatar principal de Aria con respiración senoidal fluida */}
          <div style={{ transform: `translateY(${globalFloat}px)` }}>
            <GameVisualizer currentHp={100} maxHp={100} heroName="Aria · PyQuest" statusText="Serie desde cero absoluto" />
          </div>

          {/* Tarjeta de estado de serie: Ep 1 Completado */}
          <div
            style={{
              width: 920,
              background: PYQUEST_THEME.cardLight,
              borderRadius: 22,
              padding: "24px 32px",
              boxShadow: "0 14px 40px -10px rgba(0, 0, 0, 0.08)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 28 }}>✅</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 800, color: PYQUEST_THEME.textPrimary }}>
                Episodio 1: Por qué Python
              </span>
            </div>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 20,
                fontWeight: 700,
                color: "#10B981",
                background: "#ECFDF5",
                padding: "6px 14px",
                borderRadius: 999,
              }}
            >
              COMPLETADO
            </span>
          </div>

          {/* Teaser interactivo del Episodio 2 */}
          <div
            style={{
              width: 920,
              background: "rgba(59, 130, 246, 0.08)",
              border: "2px solid #3B82F6",
              borderRadius: 22,
              padding: "26px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transform: `scale(${1 + Math.sin(frame / 16) * 0.02})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 28 }}>👉</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 800, color: "#1E3A8A" }}>
                Episodio 2: Variables y Tipos
              </span>
            </div>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 20,
                fontWeight: 800,
                color: "#FFFFFF",
                background: "#3B82F6",
                padding: "6px 16px",
                borderRadius: 999,
              }}
            >
              PRÓXIMO
            </span>
          </div>

          <CleanCaptions
            text="Guarda este video y sígueme: en el episodio dos le damos vida a nuestro personaje."
            highlightWord="sígueme"
            accentColor="#2563EB"
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
