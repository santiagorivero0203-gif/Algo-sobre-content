/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · PARTE 2: AUTOMATIZACIÓN CON MCP (V3 SFX + DYNAMIC MOTION)
 * =====================================================================
 * Coreografía diferenciada por beat:
 *  - Beat 1: CardHero3D en perspectiva con hub de 3 servidores MCP + whoosh-cinematic & bass.
 *  - Beat 2: CardSlideLateral (aparición de izquierda a derecha) con Stitch MCP + click & ping.
 *  - Beat 3: CardDualSnap (terminal SQL cae de arriba, tabla PostgreSQL sube de abajo) + typing & chime.
 *  - Beat 4: CardScanReveal (escáner láser con despliegue Vercel) + sparkle & notification.
 *  - Beat 5: CardStampCTA (impacto stamp con rebote y botón magnético MCP) + impact-bass-2.
 * =====================================================================
 */
import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import {
  CardDualSnap,
  CardHero3D,
  CardScanReveal,
  CardSlideLateral,
  CardStampCTA,
  FONT_MONO,
  FONT_SANS,
  MockupWindow,
  STACK2_PALETTE,
  SoundEffect,
  TelemetryBar,
  TrilogyAtmosphere,
  TrilogyBgm,
  TrilogyCanvas,
} from "./kit";

export const TrilogiaStack2: React.FC = () => {
  const palette = STACK2_PALETTE;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.baseDeep }}>
      {/* Fondo de estudio limpio sin cuadrícula */}
      <TrilogyAtmosphere palette={palette} />

      {/* BEAT 1: HERO GEMINI-STYLE (0 - 4s = 240 frames) */}
      <Sequence from={0} durationInFrames={240}>
        <Beat1Hero palette={palette} />
      </Sequence>

      {/* BEAT 2: STITCH MCP (APARICIÓN IZQUIERDA A DERECHA) (4s - 9s = 300 frames) */}
      <Sequence from={240} durationInFrames={300}>
        <Beat2Stitch palette={palette} />
      </Sequence>

      {/* BEAT 3: SUPABASE MCP (DUAL SNAP VERTICAL TOP/BOTTOM) (9s - 14s = 300 frames) */}
      <Sequence from={540} durationInFrames={300}>
        <Beat3Supabase palette={palette} />
      </Sequence>

      {/* BEAT 4: GIT MCP (ESCÁNER & REVELADO DEPLOYMENT) (14s - 19s = 300 frames) */}
      <Sequence from={840} durationInFrames={300}>
        <Beat4Git palette={palette} />
      </Sequence>

      {/* BEAT 5: CTA COMUNIDAD (IMPACT STAMP OVERSHOOT) (19s - 24s = 300 frames) */}
      <Sequence from={1140} durationInFrames={300}>
        <Beat5Cta palette={palette} />
      </Sequence>

      {/* BGM de fondo suave */}
      <TrilogyBgm volume={0.22} />
    </AbsoluteFill>
  );
};

export const TrilogiaStack2Reel = TrilogiaStack2;

// =====================================================================
// BEAT 1: HERO ESTILO GEMINI (240 frames / 4.0s)
// =====================================================================
const Beat1Hero: React.FC<{ palette: typeof STACK2_PALETTE }> = ({ palette }) => {
  const frame = useCurrentFrame();

  return (
    <TrilogyCanvas
      durationInFrames={240}
      badge="TRILOGÍA · PARTE 2 DE 3"
      badgeColor={palette.accent}
      logoFile="mcp.svg"
      kicker="MODEL CONTEXT PROTOCOL · 2026"
      kickerColor={palette.secondary}
      title="Automatiza tu código *con MCP*"
      titleSize={88}
      sub="Deja de hacer tareas repetitivas a mano. Conecta herramientas externas directo a tu IA."
      footerTelemetry={
        <TelemetryBar
          label="PROTOCOLOS ACTIVOS"
          metric="FIGMA · SUPABASE · GITHUB"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados */}
      <SoundEffect file="whoosh-cinematic.mp3" from={0} volume={0.55} />
      <SoundEffect file="impact-bass-1.mp3" from={12} volume={0.45} />
      <SoundEffect file="pop.mp3" from={24} volume={0.4} />

      {/* Hero 3D en perspectiva con el hub de servidores */}
      <CardHero3D rotateX={9} rotateY={-7} glow={palette.accent} delay={8}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
              mcp://localhost:8080 ~ protocol-hub
            </span>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 16,
                fontWeight: 800,
                color: palette.accent,
                background: `${palette.accent}1F`,
                padding: "4px 12px",
                borderRadius: 999,
              }}
            >
              3 SERVIDORES EN VIVO
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
              { name: "Stitch MCP", tool: "Figma UI", icon: "figma.svg", c: "#38BDF8" },
              { name: "Supabase", tool: "PostgreSQL", icon: "supabase.svg", c: "#34D399" },
              { name: "Git MCP", tool: "CI/CD Auto", icon: "github.svg", c: palette.accent },
            ].map((node, idx) => (
              <div
                key={node.name}
                style={{
                  padding: "16px 12px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${node.c}55`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  transform: `translateY(${Math.sin((frame + idx * 12) / 14) * 4}px)`,
                }}
              >
                <Img
                  src={staticFile(`assets/trilogia/${node.icon}`)}
                  style={{ width: 38, height: 38 }}
                />
                <div style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: 18 }}>
                  {node.name}
                </div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: "#94A3B8" }}>
                  {node.tool}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardHero3D>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 2: STITCH MCP · APARICIÓN LATERAL DE IZQUIERDA A DERECHA (300f / 5.0s)
// =====================================================================
const Beat2Stitch: React.FC<{ palette: typeof STACK2_PALETTE }> = ({ palette }) => {
  return (
    <TrilogyCanvas
      durationInFrames={300}
      badge="HERRAMIENTA 1 · DISEÑO A CÓDIGO"
      badgeColor={palette.accent}
      logoFile="figma.svg"
      kicker="STITCH MCP · SIN COPY-PASTE"
      kickerColor={palette.secondary}
      title="Stitch MCP: *Figma directo*"
      titleSize={86}
      sub="Conecta tu editor de código con Figma y APIs sin salir de la ventana."
      footerTelemetry={
        <TelemetryBar
          label="SINCRONIZACIÓN VISUAL"
          metric="COMPONENTES 100% ALINEADOS"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados de barrido lateral y locks */}
      <SoundEffect file="whoosh-short.mp3" from={0} volume={0.5} />
      <SoundEffect file="click-soft.mp3" from={14} volume={0.4} />
      <SoundEffect file="ping.mp3" from={26} volume={0.45} />

      {/* Tarjeta con revelado y traslación de izquierda a derecha */}
      <CardSlideLateral glow={palette.accent} delay={6}>
        <MockupWindow
          title="stitch-mcp ~ live-canvas-sync"
          image="assets/mova_app_live.png"
          accent={palette.accent}
          height={430}
          delay={10}
        />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 28,
            padding: "8px 18px",
            borderRadius: 999,
            background: "rgba(10, 16, 26, 0.94)",
            border: `1.5px solid ${palette.accent}`,
            fontFamily: FONT_MONO,
            fontSize: 17,
            fontWeight: 800,
            color: palette.accent,
          }}
        >
          ✓ COMPONENTES REACT GENERADOS EN VIVO
        </div>
      </CardSlideLateral>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 3: SUPABASE MCP · DUAL SNAP VERTICAL (300 frames / 5.0s)
// =====================================================================
const Beat3Supabase: React.FC<{ palette: typeof STACK2_PALETTE }> = ({
  palette,
}) => {
  return (
    <TrilogyCanvas
      durationInFrames={300}
      badge="HERRAMIENTA 2 · BACKEND SQL"
      badgeColor={palette.accent}
      logoFile="supabase.svg"
      kicker="ESQUEMAS SQL EN PRODUCCIÓN"
      kickerColor={palette.secondary}
      title="Supabase MCP: *SQL en vivo*"
      titleSize={86}
      sub="Pide tus tablas en lenguaje natural y levanta un backend en la nube en segundos."
      footerTelemetry={
        <TelemetryBar
          label="SEGURIDAD Y PERMISOS"
          metric="RLS ACTIVO · TYPESCRIPT GENERADO"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados de tecleo y verificación RLS */}
      <SoundEffect file="whoosh.mp3" from={0} volume={0.5} />
      <SoundEffect file="typing.mp3" from={12} volume={0.35} />
      <SoundEffect file="chime.mp3" from={55} volume={0.5} />
      <SoundEffect file="click.mp3" from={80} volume={0.4} />

      {/* Dual Snap Vertical */}
      <CardDualSnap
        glow={palette.accent}
        delay={6}
        topChild={
          <div>
            <div style={{ color: "#64748B", fontSize: 16, marginBottom: 8, fontFamily: FONT_MONO }}>
              terminal ~ supabase-mcp
            </div>
            <div style={{ color: "#E2E8F0", fontSize: 19, fontFamily: FONT_MONO }}>
              <span style={{ color: palette.accent }}>$</span> mcp.connect("supabase")
            </div>
            <div style={{ color: palette.accent, fontSize: 18, marginTop: 4, fontFamily: FONT_MONO }}>
              ✓ Conexión establecida con proyecto cloud
            </div>
          </div>
        }
        bottomChild={
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#94A3B8",
                fontSize: 16,
                paddingBottom: 8,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontFamily: FONT_MONO,
              }}
            >
              <span>TABLA</span>
              <span>COLUMNAS</span>
              <span>ESTADO</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                color: "#FFFFFF",
                fontSize: 17,
                fontFamily: FONT_MONO,
              }}
            >
              <span style={{ color: palette.accent }}>public.users</span>
              <span>id, email, role</span>
              <span style={{ color: "#34D399" }}>✓ RLS Habilitado</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                color: "#FFFFFF",
                fontSize: 17,
                fontFamily: FONT_MONO,
              }}
            >
              <span style={{ color: palette.accent }}>public.orders</span>
              <span>id, user_id, total</span>
              <span style={{ color: "#34D399" }}>✓ Migrado</span>
            </div>
          </div>
        }
      />
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 4: GIT MCP · ESCÁNER & REVELADO DEPLOYMENT (300 frames / 5.0s)
// =====================================================================
const Beat4Git: React.FC<{ palette: typeof STACK2_PALETTE }> = ({ palette }) => {
  return (
    <TrilogyCanvas
      durationInFrames={300}
      badge="HERRAMIENTA 3 · CONTROL DE VERSIONES"
      badgeColor={palette.accent}
      logoFile="github.svg"
      kicker="CHECKPOINTS Y DESPLIEGUES"
      kickerColor={palette.secondary}
      title="Git MCP: *Cero conflictos*"
      titleSize={86}
      sub="Sincronización automática con GitHub para respaldar tus avances sin miedo a romper nada."
      footerTelemetry={
        <TelemetryBar
          label="ESTADO DE INTEGRACIÓN"
          metric="DESPLIEGUE CONTINUO EN VERCEL"
          color={palette.accent}
        />
      }
    >
      {/* SFX Sincronizados de escáner y verificación de despliegue */}
      <SoundEffect file="whoosh-short.mp3" from={0} volume={0.5} />
      <SoundEffect file="sparkle.mp3" from={22} volume={0.45} />
      <SoundEffect file="notification.mp3" from={65} volume={0.4} />

      {/* Tarjeta Scan Reveal con preview real de producción */}
      <CardScanReveal glow={palette.accent} delay={8}>
        <MockupWindow
          title="vercel.com/deployments ~ production"
          image="assets/the_last_endo_live.png"
          accent={palette.accent}
          height={430}
          delay={10}
        />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 28,
            padding: "8px 18px",
            borderRadius: 999,
            background: "rgba(10, 16, 26, 0.94)",
            border: `1.5px solid ${palette.accent}`,
            fontFamily: FONT_MONO,
            fontSize: 17,
            fontWeight: 800,
            color: palette.accent,
          }}
        >
          ● PRODUCTION DEPLOYMENT OK (0s)
        </div>
      </CardScanReveal>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 5: CTA COMUNIDAD · IMPACT STAMP (300 frames / 5.0s)
// =====================================================================
const Beat5Cta: React.FC<{ palette: typeof STACK2_PALETTE }> = ({ palette }) => {
  return (
    <TrilogyCanvas
      durationInFrames={300}
      badge="TRILOGÍA · PARTE 3 DISPONIBLE"
      badgeColor={palette.accent}
      logoFile="mcp.svg"
      kicker="COMUNIDAD DEV"
      kickerColor={palette.secondary}
      title="Automatiza *tu stack*"
      titleSize={90}
      sub="Te comparto la configuración exacta de mis 3 servidores MCP listos para conectar."
      footerTelemetry={
        <TelemetryBar
          label="PALABRA CLAVE"
          metric="COMENTA 'MCP'"
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
            ¿Quieres mi archivo mcp_config.json listo para usar?
          </div>

          <div
            style={{
              padding: "16px 42px",
              borderRadius: 999,
              background: palette.accent,
              color: "#0D0906",
              fontFamily: FONT_MONO,
              fontWeight: 800,
              fontSize: 32,
              letterSpacing: "0.1em",
              boxShadow: `0 0 40px ${palette.accent}88`,
            }}
          >
            COMENTA "MCP"
          </div>

          <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#94A3B8" }}>
            Te mando la plantilla con los 3 servidores configurados @santi.dev
          </div>
        </div>
      </CardStampCTA>
    </TrilogyCanvas>
  );
};
