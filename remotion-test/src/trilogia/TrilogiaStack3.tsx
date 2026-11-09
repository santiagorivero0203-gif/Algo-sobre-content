/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · PARTE 3: EL ARTE DEL PROMPT (V3 SFX + DYNAMIC MOTION)
 * =====================================================================
 * Coreografía diferenciada por beat:
 *  - Beat 1: CardHero3D en perspectiva comparativa contratos vs monolithic + whoosh-cinematic & bass.
 *  - Beat 2: CardSlideLateral (aparición de izquierda a derecha) con antipatrón y glitch/error.
 *  - Beat 3: CardDualSnap (Google AI Studio cae de arriba, context cache sube de abajo) + typing & chime.
 *  - Beat 4: CardScanReveal (escáner láser con interfaces TypeScript modulares) + sparkle & ping.
 *  - Beat 5: CardStampCTA (impacto stamp con rebote y botón magnético PROMPT) + impact-bass-2.
 * =====================================================================
 */
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  CardDualSnap,
  CardHero3D,
  CardScanReveal,
  CardSlideLateral,
  CardStampCTA,
  FONT_MONO,
  FONT_SANS,
  STACK3_PALETTE,
  SoundEffect,
  TelemetryBar,
  TrilogyAtmosphere,
  TrilogyBgm,
  TrilogyCanvas,
} from "./kit";

export const TrilogiaStack3: React.FC = () => {
  const palette = STACK3_PALETTE;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.baseDeep }}>
      {/* Fondo de estudio limpio sin cuadrícula */}
      <TrilogyAtmosphere palette={palette} />

      {/* BEAT 1: HERO GEMINI-STYLE (0 - 4s = 240 frames) */}
      <Sequence from={0} durationInFrames={240}>
        <Beat1Hero palette={palette} />
      </Sequence>

      {/* BEAT 2: EL ANTIPATRÓN (APARICIÓN IZQUIERDA A DERECHA) (4s - 9s = 300 frames) */}
      <Sequence from={240} durationInFrames={300}>
        <Beat2Antipatron palette={palette} />
      </Sequence>

      {/* BEAT 3: GOOGLE AI STUDIO (DUAL SNAP VERTICAL TOP/BOTTOM) (9s - 14.5s = 330 frames) */}
      <Sequence from={540} durationInFrames={330}>
        <Beat3AIStudio palette={palette} />
      </Sequence>

      {/* BEAT 4: ARQUITECTURA POR CONTRATOS (ESCÁNER & REVELADO) (14.5s - 20s = 330 frames) */}
      <Sequence from={870} durationInFrames={330}>
        <Beat4Contratos palette={palette} />
      </Sequence>

      {/* BEAT 5: CTA COMUNIDAD (IMPACT STAMP OVERSHOOT) (20s - 25s = 300 frames) */}
      <Sequence from={1200} durationInFrames={300}>
        <Beat5Cta palette={palette} />
      </Sequence>

      {/* BGM de fondo suave */}
      <TrilogyBgm volume={0.22} />
    </AbsoluteFill>
  );
};

export const TrilogiaStack3Reel = TrilogiaStack3;

// =====================================================================
// BEAT 1: HERO ESTILO GEMINI (240 frames / 4.0s)
// =====================================================================
const Beat1Hero: React.FC<{ palette: typeof STACK3_PALETTE }> = ({ palette }) => {
  return (
    <TrilogyCanvas
      durationInFrames={240}
      badge="TRILOGÍA · PARTE 3 DE 3"
      badgeColor={palette.accent}
      logoFile="googleaistudio.svg"
      kicker="INGENIERÍA DE PROMPTS · EDICIÓN 2026"
      kickerColor={palette.secondary}
      title="¿La IA te da *código roto*?"
      titleSize={88}
      sub="El secreto no es el modelo, es cómo estructuras tus prompts y contratos modulares."
      footerTelemetry={
        <TelemetryBar
          label="MÉTODO PROFESIONAL"
          metric="CONTRATOS TYPESCRIPT > PROMPTS VAGOS"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados */}
      <SoundEffect file="whoosh-cinematic.mp3" from={0} volume={0.55} />
      <SoundEffect file="impact-bass-1.mp3" from={12} volume={0.45} />
      <SoundEffect file="pop.mp3" from={24} volume={0.4} />

      {/* Hero 3D en perspectiva con comparativa visual */}
      <CardHero3D rotateX={9} rotateY={-7} glow={palette.accent} delay={8}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 16,
              background: "rgba(239, 68, 68, 0.08)",
              border: "1.5px solid rgba(239, 68, 68, 0.4)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontFamily: FONT_MONO, color: "#EF4444", fontWeight: 800, fontSize: 17 }}>
                ❌ EL ERROR MONOLÍTICO
              </div>
              <div style={{ fontFamily: FONT_SANS, color: "#CBD5E1", fontSize: 20, marginTop: 4 }}>
                "Hazme un clon de Uber con pagos y auth"
              </div>
            </div>
            <span style={{ fontFamily: FONT_MONO, color: "#EF4444", fontSize: 16, fontWeight: 700 }}>
              ALUCINACIONES
            </span>
          </div>

          <div
            style={{
              padding: "16px 20px",
              borderRadius: 16,
              background: "rgba(56, 189, 248, 0.08)",
              border: `1.5px solid ${palette.accent}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: `0 0 30px ${palette.accent}22`,
            }}
          >
            <div>
              <div style={{ fontFamily: FONT_MONO, color: palette.accent, fontWeight: 800, fontSize: 17 }}>
                ✓ EL ENFOQUE POR CONTRATOS
              </div>
              <div style={{ fontFamily: FONT_SANS, color: "#FFFFFF", fontSize: 20, marginTop: 4 }}>
                1. System Prompt + 2. Interfaces + 3. Módulos
              </div>
            </div>
            <span style={{ fontFamily: FONT_MONO, color: palette.accent, fontSize: 16, fontWeight: 800 }}>
              0 BUGS
            </span>
          </div>
        </div>
      </CardHero3D>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 2: EL ANTIPATRÓN · APARICIÓN LATERAL DE IZQUIERDA A DERECHA (300f / 5.0s)
// =====================================================================
const Beat2Antipatron: React.FC<{ palette: typeof STACK3_PALETTE }> = () => {
  return (
    <TrilogyCanvas
      durationInFrames={300}
      badge="EL ERROR COMÚN · ANTIPATRÓN"
      badgeColor="#F87171"
      logoFile="gemini.svg"
      kicker="POR QUÉ FALLA EL 90% DE LOS DEVS"
      kickerColor="#F87171"
      title="El prompt *monolítico*"
      titleSize={86}
      sub="Pedir una aplicación completa en un solo mensaje satura la atención y crea alucinaciones."
      footerTelemetry={
        <TelemetryBar
          label="DIAGNÓSTICO TÉCNICO"
          metric="COLAPSO DE CONTEXTO Y DEPENDENCIAS"
          color="#F87171"
        />
      }
    >
      {/* SFX Sincronizados de barrido y error/glitch */}
      <SoundEffect file="whoosh-short.mp3" from={0} volume={0.5} />
      <SoundEffect file="glitch-1.mp3" from={14} volume={0.4} />
      <SoundEffect file="error.mp3" from={32} volume={0.45} />

      {/* Tarjeta con revelado y traslación de izquierda a derecha */}
      <CardSlideLateral glow="#F87171" delay={6}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 16,
              background: "rgba(20, 10, 15, 0.94)",
              border: "1.5px solid #F8717177",
              fontFamily: FONT_MONO,
            }}
          >
            <div style={{ color: "#F87171", fontSize: 16, marginBottom: 8 }}>
              ⚠️ ATENCIÓN FRAGMENTADA · CONTEXT OVERFLOW
            </div>
            <div style={{ color: "#FCA5A5", fontSize: 19, textDecoration: "line-through" }}>
              Prompt: "Créame frontend, backend SQL, pasarela Stripe y websockets ya."
            </div>
          </div>

          {[
            { label: "Sobrecarga de contexto", desc: "La IA olvida reglas dictadas párrafos antes." },
            { label: "Librerías inventadas", desc: "Genera imports que no existen en npm." },
            { label: "Código espagueti", desc: "Tipos incompatibles entre frontend y backend." },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "12px 18px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{ color: "#F87171", fontFamily: FONT_MONO, fontWeight: 800 }}>✕</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>{item.label}</div>
                <div style={{ fontSize: 16, color: "#94A3B8" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </CardSlideLateral>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 3: GOOGLE AI STUDIO · DUAL SNAP VERTICAL (330 frames / 5.5s)
// =====================================================================
const Beat3AIStudio: React.FC<{ palette: typeof STACK3_PALETTE }> = ({
  palette,
}) => {
  return (
    <TrilogyCanvas
      durationInFrames={330}
      badge="ESTRATEGIA 1 · PROMPT SYSTEM"
      badgeColor={palette.accent}
      logoFile="googleaistudio.svg"
      kicker="GOOGLE AI STUDIO & CONTEXT CACHING"
      kickerColor={palette.secondary}
      title="Google AI Studio + *Context Cache*"
      titleSize={86}
      sub="Fija las reglas de arquitectura una sola vez con tokens cacheados y latencia reducida."
      footerTelemetry={
        <TelemetryBar
          label="CONTEXT CACHING ACTIVO"
          metric="1.2M TOKENS · 85% AHORRO DE LATENCIA"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados de tecleo y verificación de cache */}
      <SoundEffect file="whoosh.mp3" from={0} volume={0.5} />
      <SoundEffect file="typing.mp3" from={12} volume={0.35} />
      <SoundEffect file="chime.mp3" from={60} volume={0.5} />
      <SoundEffect file="click.mp3" from={85} volume={0.4} />

      {/* Dual Snap Vertical */}
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
                marginBottom: 6,
                fontFamily: FONT_MONO,
              }}
            >
              <span>aistudio.google.com ~ system-prompt</span>
              <span style={{ color: palette.accent }}>🔒 BLOQUEADO</span>
            </div>
            <div style={{ color: "#E2E8F0", fontSize: 18, fontFamily: FONT_MONO, lineHeight: 1.4 }}>
              rule: "Nunca escribas implementación sin contrato de tipos previo."
            </div>
            <div style={{ color: palette.accent, fontSize: 18, marginTop: 4, fontFamily: FONT_MONO }}>
              ✓ Directiva inmutable inyectada en todos los turnos
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
                Context Caching · Gemini 1.5 Pro
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 17,
                  color: "#94A3B8",
                  marginTop: 2,
                }}
              >
                1.2M tokens cargados · Cero re-evaluación
              </div>
            </div>
            <div
              style={{
                padding: "8px 16px",
                borderRadius: 12,
                background: `${palette.accent}1F`,
                border: `1.5px solid ${palette.accent}`,
                color: palette.accent,
                fontFamily: FONT_MONO,
                fontWeight: 800,
                fontSize: 20,
              }}
            >
              85% RÁPIDO
            </div>
          </div>
        }
      />
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 4: ARQUITECTURA POR CONTRATOS · ESCÁNER & REVELADO (330f / 5.5s)
// =====================================================================
const Beat4Contratos: React.FC<{ palette: typeof STACK3_PALETTE }> = ({
  palette,
}) => {
  return (
    <TrilogyCanvas
      durationInFrames={330}
      badge="ESTRATEGIA 2 · CONTRATOS MODULARES"
      badgeColor={palette.accent}
      logoFile="vercel.svg"
      kicker="DIVIDE Y VENCERÁS"
      kickerColor={palette.secondary}
      title="Contratos *modulares*"
      titleSize={86}
      sub="Divide tu aplicación en módulos independientes con interfaces TypeScript inmutables."
      footerTelemetry={
        <TelemetryBar
          label="INTEGRACIÓN DE COMPONENTES"
          metric="ZERO TYPE ERRORS EN PRODUCCIÓN"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados de escáner y verificación de tipos */}
      <SoundEffect file="whoosh-short.mp3" from={0} volume={0.5} />
      <SoundEffect file="sparkle.mp3" from={22} volume={0.45} />
      <SoundEffect file="ping.mp3" from={65} volume={0.4} />

      {/* Tarjeta Scan Reveal con contratos TypeScript */}
      <CardScanReveal glow={palette.accent} delay={8}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 16,
              background: "rgba(6, 12, 22, 0.94)",
              border: `1.5px solid ${palette.accent}66`,
              fontFamily: FONT_MONO,
            }}
          >
            <div style={{ color: "#64748B", fontSize: 16, marginBottom: 6 }}>
              types/contracts.ts ~ strict-mode
            </div>
            <div style={{ color: palette.secondary, fontSize: 19 }}>
              interface <span style={{ color: palette.accent }}>GameState</span> &#123;
            </div>
            <div style={{ color: "#E2E8F0", fontSize: 18, paddingLeft: 18 }}>
              hero: HeroConfig;
            </div>
            <div style={{ color: "#E2E8F0", fontSize: 18, paddingLeft: 18 }}>
              saveCheckpoint: () =&gt; Promise&lt;boolean&gt;;
            </div>
            <div style={{ color: palette.secondary, fontSize: 19 }}>&#125;</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              fontFamily: FONT_MONO,
              fontSize: 16,
            }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: palette.accent,
                textAlign: "center",
              }}
            >
              ✓ Módulo UI Aislado
            </div>
            <div
              style={{
                padding: "12px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: palette.secondary,
                textAlign: "center",
              }}
            >
              ✓ Módulo Backend Tipado
            </div>
          </div>
        </div>
      </CardScanReveal>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 5: CTA COMUNIDAD · IMPACT STAMP (300 frames / 5.0s)
// =====================================================================
const Beat5Cta: React.FC<{ palette: typeof STACK3_PALETTE }> = ({ palette }) => {
  return (
    <TrilogyCanvas
      durationInFrames={300}
      badge="TRILOGÍA COMPLETA"
      badgeColor={palette.accent}
      logoFile="googleaistudio.svg"
      kicker="COMUNIDAD SANTI.DEV"
      kickerColor={palette.secondary}
      title="Domina el *Prompting*"
      titleSize={90}
      sub="Te comparto el repositorio con las plantillas de contratos modulares listas para copiar."
      footerTelemetry={
        <TelemetryBar
          label="PALABRA CLAVE"
          metric="COMENTA 'PROMPT'"
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
            ¿Quieres la plantilla maestra de prompts y contratos?
          </div>

          <div
            style={{
              padding: "16px 42px",
              borderRadius: 999,
              background: palette.accent,
              color: "#070C18",
              fontFamily: FONT_MONO,
              fontWeight: 800,
              fontSize: 32,
              letterSpacing: "0.1em",
              boxShadow: `0 0 40px ${palette.accent}88`,
            }}
          >
            COMENTA "PROMPT"
          </div>

          <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#94A3B8" }}>
            Te mando las plantillas de contratos modulares completas @santi.dev
          </div>
        </div>
      </CardStampCTA>
    </TrilogyCanvas>
  );
};
