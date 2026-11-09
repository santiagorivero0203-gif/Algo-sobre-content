/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · PARTE 1: STACK SECRETO (V3 SFX + DYNAMIC MOTION)
 * =====================================================================
 * Coreografía diferenciada por beat:
 *  - Beat 1: CardHero3D en perspectiva con the_last_endo_live.png + whoosh-cinematic & bass.
 *  - Beat 2: CardSlideLateral (aparición de izquierda a derecha) con tokens de Figma + click & ping.
 *  - Beat 3: CardDualSnap (terminal cae de arriba, Opencode sube de abajo) + typing & chime.
 *  - Beat 4: CardScanReveal (escáner láser con endo_sprite.jpg) + sparkle.
 *  - Beat 5: CardStampCTA (impacto stamp con rebote y botón magnético) + impact-bass-2.
 * =====================================================================
 */
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import {
  CardDualSnap,
  CardHero3D,
  CardScanReveal,
  CardSlideLateral,
  CardStampCTA,
  FONT_MONO,
  FONT_SANS,
  MockupWindow,
  STACK1_PALETTE,
  SoundEffect,
  TelemetryBar,
  TrilogyAtmosphere,
  TrilogyBgm,
  TrilogyCanvas,
  clampInterp,
  useEnter,
} from "./kit";

export const TrilogiaStack1: React.FC = () => {
  const palette = STACK1_PALETTE;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.baseDeep }}>
      {/* Fondo de estudio limpio sin cuadrícula */}
      <TrilogyAtmosphere palette={palette} />

      {/* BEAT 1: HERO GEMINI-STYLE (0 - 4s = 240 frames) */}
      <Sequence from={0} durationInFrames={240}>
        <Beat1Hero palette={palette} />
      </Sequence>

      {/* BEAT 2: FASE 1 · INSPIRACIÓN (APARICIÓN IZQUIERDA A DERECHA) (4s - 8s = 240 frames) */}
      <Sequence from={240} durationInFrames={240}>
        <Beat2Inspiracion palette={palette} />
      </Sequence>

      {/* BEAT 3: FASE 2 · LÓGICA (DUAL SNAP VERTICAL TOP/BOTTOM) (8s - 14s = 360 frames) */}
      <Sequence from={480} durationInFrames={360}>
        <Beat3Logica palette={palette} />
      </Sequence>

      {/* BEAT 4: FASE 3 · ARTE (ESCÁNER LÁSER & REVELADO) (14s - 19s = 300 frames) */}
      <Sequence from={840} durationInFrames={300}>
        <Beat4Arte palette={palette} />
      </Sequence>

      {/* BEAT 5: CTA COMUNIDAD (IMPACTO STAMP OVERSHOOT) (19s - 24s = 300 frames) */}
      <Sequence from={1140} durationInFrames={300}>
        <Beat5Cta palette={palette} />
      </Sequence>

      {/* BGM de fondo suave */}
      <TrilogyBgm volume={0.22} />
    </AbsoluteFill>
  );
};

export const TrilogiaStack1Reel = TrilogiaStack1;

// =====================================================================
// BEAT 1: HERO ESTILO GEMINI (240 frames / 4.0s)
// =====================================================================
const Beat1Hero: React.FC<{ palette: typeof STACK1_PALETTE }> = ({ palette }) => {
  const frame = useCurrentFrame();

  return (
    <TrilogyCanvas
      durationInFrames={240}
      badge="TRILOGÍA · PARTE 1 DE 3"
      badgeColor={palette.accent}
      logoFile="antigravity.svg"
      kicker="DE LA IDEA AL CÓDIGO · WORKFLOW 2026"
      kickerColor={palette.secondary}
      title="¿Juegos y webs *sin programar*?"
      titleSize={90}
      sub="Te enseño el stack técnico con IA para pasar de una idea a un proyecto funcionando."
      footerTelemetry={
        <TelemetryBar
          label="FLUJO COMPLETO EN PRODUCCIÓN"
          metric="PROYECTO FUNCIONANDO HOY"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados */}
      <SoundEffect file="whoosh-cinematic.mp3" from={0} volume={0.55} />
      <SoundEffect file="impact-bass-1.mp3" from={12} volume={0.45} />
      <SoundEffect file="pop.mp3" from={24} volume={0.4} />

      {/* Hero 3D en perspectiva flotante (aprobado por usuario) */}
      <CardHero3D rotateX={9} rotateY={-7} glow={palette.accent} delay={8}>
        <MockupWindow
          title="the-last-endo.vercel.app ~ live game"
          image="assets/the_last_endo_live.png"
          accent={palette.accent}
          height={460}
          delay={10}
        />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 28,
            padding: "10px 20px",
            borderRadius: 999,
            background: "rgba(10, 24, 18, 0.94)",
            border: `1.5px solid ${palette.accent}`,
            boxShadow: `0 0 25px ${palette.accent}55`,
            fontFamily: FONT_MONO,
            fontSize: 18,
            fontWeight: 800,
            color: palette.accent,
            display: "flex",
            alignItems: "center",
            gap: 10,
            transform: `translateY(${Math.sin(frame / 14) * 4}px)`,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: palette.accent,
              boxShadow: `0 0 10px ${palette.accent}`,
            }}
          />
          0 LÍNEAS DE SINTAXIS MANUAL
        </div>
      </CardHero3D>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 2: FASE 1 · APARICIÓN LATERAL DE IZQUIERDA A DERECHA (240f / 4.0s)
// =====================================================================
const Beat2Inspiracion: React.FC<{ palette: typeof STACK1_PALETTE }> = ({
  palette,
}) => {
  return (
    <TrilogyCanvas
      durationInFrames={240}
      badge="PASO 1 · INSPIRACIÓN & DISEÑO"
      badgeColor={palette.accent}
      logoFile="figma.svg"
      kicker="NO REINVENTES LA RUEDA"
      kickerColor={palette.secondary}
      title="Roba como un *artista*"
      titleSize={86}
      sub="Analiza mecánicas probadas y extrae tokens visuales directamente en Figma."
      footerTelemetry={
        <TelemetryBar
          label="FIGMA DESIGN TOKENS"
          metric="3 MECÁNICAS EXTRAÍDAS"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados de barrido lateral y locks */}
      <SoundEffect file="whoosh-short.mp3" from={0} volume={0.5} />
      <SoundEffect file="click-soft.mp3" from={12} volume={0.4} />
      <SoundEffect file="click-soft.mp3" from={20} volume={0.4} />
      <SoundEffect file="ping.mp3" from={28} volume={0.45} />

      {/* Tarjeta con revelado y traslación de izquierda a derecha */}
      <CardSlideLateral glow={palette.accent} delay={6}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 14,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#94A3B8" }}>
              figma.com/design-tokens ~ core-loop
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              {["#34D399", "#38BDF8", "#A78BFA"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: c,
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>

          {[
            {
              n: "01",
              title: "Desglosa mecánicas top",
              desc: "Identifica el bucle central de juegos exitosos.",
              color: palette.accent,
            },
            {
              n: "02",
              title: "Prototipa en Figma",
              desc: "Define paleta, botones y grilla antes de picar código.",
              color: palette.secondary,
            },
            {
              n: "03",
              title: "Añade tu giro único",
              desc: "Fusiona dos mecánicas para lograr una propuesta fresca.",
              color: "#A78BFA",
            },
          ].map((item, idx) => {
            const enter = useEnter(10 + idx * 8, 18, 170);
            return (
              <div
                key={item.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "16px 20px",
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${item.color}44`,
                  opacity: enter,
                  transform: `translateX(${(1 - enter) * -50}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontWeight: 800,
                    fontSize: 28,
                    color: item.color,
                    minWidth: 44,
                  }}
                >
                  {item.n}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 19,
                      color: "#94A3B8",
                      marginTop: 3,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardSlideLateral>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 3: FASE 2 · DUAL SNAP VERTICAL (360 frames / 6.0s)
// =====================================================================
const Beat3Logica: React.FC<{ palette: typeof STACK1_PALETTE }> = ({ palette }) => {
  const frame = useCurrentFrame();
  const tokenCount = Math.floor(clampInterp(frame, [45, 200], [0, 1200]));

  return (
    <TrilogyCanvas
      durationInFrames={360}
      badge="PASO 2 · MOTOR DE LÓGICA"
      badgeColor={palette.accent}
      logoFile="opencode.svg"
      kicker="ARQUITECTURA PESADA + OPTIMIZACIÓN"
      kickerColor={palette.secondary}
      title="Antigravity + *Opencode*"
      titleSize={86}
      sub="Google Antigravity genera el 85% y Opencode pule detalles finos ahorrando tokens."
      footerTelemetry={
        <TelemetryBar
          label="EFICIENCIA DE CONTEXTO"
          metric={`${tokenCount} TOKENS AHORRADOS`}
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados de tecleo y éxito de compilación */}
      <SoundEffect file="whoosh.mp3" from={0} volume={0.5} />
      <SoundEffect file="typing.mp3" from={14} volume={0.35} />
      <SoundEffect file="chime.mp3" from={65} volume={0.5} />
      <SoundEffect file="click.mp3" from={90} volume={0.4} />

      {/* Dual Snap Vertical: Terminal cae de arriba, Opencode sube de abajo */}
      <CardDualSnap
        glow={palette.accent}
        delay={6}
        topChild={
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#64748B",
                fontSize: 16,
                marginBottom: 8,
                fontFamily: FONT_MONO,
              }}
            >
              <span>terminal ~ antigravity-cli</span>
              <span style={{ color: palette.accent }}>● BUILD ACTIVO</span>
            </div>
            <div style={{ color: "#E2E8F0", fontSize: 20, fontFamily: FONT_MONO }}>
              <span style={{ color: palette.accent }}>$</span> agy build --mechanics="stealth" --mcp
            </div>
            <div
              style={{
                color: palette.accent,
                fontSize: 19,
                fontWeight: 700,
                marginTop: 6,
                fontFamily: FONT_MONO,
              }}
            >
              ✓ Arquitectura base generada (85% del trabajo resuelto)
            </div>
          </div>
        }
        bottomChild={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#FFFFFF",
                }}
              >
                Opencode · Poda de Tokens
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 17,
                  color: "#94A3B8",
                  marginTop: 2,
                }}
              >
                0 errores sintaxis · Graphify AST activo
              </div>
            </div>
            <div
              style={{
                padding: "8px 16px",
                borderRadius: 12,
                background: `${palette.secondary}1F`,
                border: `1.5px solid ${palette.secondary}`,
                color: palette.secondary,
                fontFamily: FONT_MONO,
                fontWeight: 800,
                fontSize: 22,
              }}
            >
              -{tokenCount} TKN
            </div>
          </div>
        }
      />
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 4: FASE 3 · ESCÁNER LÁSER & REVELADO (300 frames / 5.0s)
// =====================================================================
const Beat4Arte: React.FC<{ palette: typeof STACK1_PALETTE }> = ({ palette }) => {
  return (
    <TrilogyCanvas
      durationInFrames={300}
      badge="PASO 3 · ASSETS VISUALES"
      badgeColor={palette.accent}
      logoFile="nanobanana.svg"
      kicker="CERO PHOTOSHOP MANUAL"
      kickerColor={palette.secondary}
      title="Nano Banana + *Remove BG*"
      titleSize={86}
      sub="Genera sprites y texturas con IA y déjalos transparentes en un solo clic."
      footerTelemetry={
        <TelemetryBar
          label="FORMATO DE EXPORTACIÓN"
          metric="PNG TRANSPARENTE 60 FPS"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados de escáner y finalización */}
      <SoundEffect file="whoosh-short.mp3" from={0} volume={0.5} />
      <SoundEffect file="sparkle.mp3" from={22} volume={0.45} />
      <SoundEffect file="notification.mp3" from={70} volume={0.4} />

      {/* Tarjeta con escáner láser continuo que barre la imagen */}
      <CardScanReveal glow={palette.accent} delay={8}>
        <MockupWindow
          title="nanobanana.ai ~ sprite-generator"
          image="assets/endo_sprite.jpg"
          accent={palette.accent}
          height={430}
          delay={10}
        />
      </CardScanReveal>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 5: CTA COMUNIDAD · IMPACT STAMP (300 frames / 5.0s)
// =====================================================================
const Beat5Cta: React.FC<{ palette: typeof STACK1_PALETTE }> = ({ palette }) => {
  return (
    <TrilogyCanvas
      durationInFrames={300}
      badge="TRILOGÍA · PARTE 2 DISPONIBLE"
      badgeColor={palette.accent}
      logoFile="antigravity.svg"
      kicker="COMUNIDAD SANTI.DEV"
      kickerColor={palette.secondary}
      title="Guarda *este video*"
      titleSize={90}
      sub="En la parte 2: Cómo automatizo bases de datos en la nube y subo todo a GitHub con MCP."
      footerTelemetry={
        <TelemetryBar
          label="PALABRA CLAVE"
          metric="COMENTA 'STACK'"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados de impacto y brillo */}
      <SoundEffect file="impact-bass-2.mp3" from={0} volume={0.55} />
      <SoundEffect file="sparkle.mp3" from={18} volume={0.45} />

      {/* Tarjeta Stamp con resorte de rebote y botón magnético */}
      <CardStampCTA glow={palette.accent} delay={6}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "20px 10px",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: FONT_SANS,
            }}
          >
            ¿Quieres la plantilla completa y los prompts maestros?
          </div>

          <div
            style={{
              padding: "16px 42px",
              borderRadius: 999,
              background: palette.accent,
              color: "#050F0C",
              fontFamily: FONT_MONO,
              fontWeight: 800,
              fontSize: 32,
              letterSpacing: "0.1em",
              boxShadow: `0 0 40px ${palette.accent}88`,
            }}
          >
            COMENTA "STACK"
          </div>

          <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#94A3B8" }}>
            Te envío el repositorio completo por mensaje directo @santi.dev
          </div>
        </div>
      </CardStampCTA>
    </TrilogyCanvas>
  );
};
