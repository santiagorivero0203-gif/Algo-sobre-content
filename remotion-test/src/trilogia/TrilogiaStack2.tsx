/**
 * =====================================================================
 * TRILOGÍA · PARTE 2: AUTOMATIZACIÓN CON MCP (SERVIDORES INTELIGENTES)
 * =====================================================================
 * Duración: 24.0 segundos exactos (1440 frames @ 60 FPS).
 * Paleta: Industrial Cyber Orange (#160A03 / #F08A35 / #38BDF8).
 * Estilo: Fusión Gemini (editorial, sobrio) + PyQuest (interactivo, centrado).
 * =====================================================================
 */
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
} from "remotion";
import {
  Badge,
  BrandLogo,
  CtaButtons,
  EnergyBus,
  FONT_MONO,
  GlassCard,
  KineticTitle,
  SeriesHeader,
  StatusPill,
  SubLine,
  TrilogyAtmosphere,
  TrilogyBgm,
  TrilogyPalette,
  TrilogyStage,
  Typed,
  WindowBar,
} from "./kit";
import { PyQuestSfx } from "../pyquest/sfx";

export const STACK2_PALETTE: TrilogyPalette = {
  base: "#160A03",
  baseDeep: "#0A0401",
  accent: "#F08A35",
  secondary: "#38BDF8",
};

// =====================================================================
// ESCENA 1: EL GANCHO · TRABAJO MANUAL VS MCP (0 - 240f / 4.0s)
// =====================================================================
const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const mcpActive = frame >= 80;

  return (
    <TrilogyStage durationInFrames={240}>
      <Badge
        text="WORKFLOW MODERNO · 2026"
        color={STACK2_PALETTE.accent}
        icon={<span>⚙️</span>}
      />

      <KineticTitle
        text="Automatiza tu código *como un pro*"
        accent={STACK2_PALETTE.accent}
      />

      <SubLine text="Olvida subir archivos a mano. Conecta herramientas MCP." />

      <GlassCard glow={STACK2_PALETTE.accent} delay={15}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Tareas manuales obsoletas */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: 18,
              background: "rgba(239, 68, 68, 0.08)",
              border: "1.5px solid rgba(239, 68, 68, 0.35)",
              opacity: mcpActive ? 0.35 : 1,
            }}
          >
            <div style={{ color: "#EF4444", fontWeight: 800, fontSize: 17, marginBottom: 8 }}>
              ✕ TAREAS REPETITIVAS
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, lineHeight: 1.4 }}>
              Copiar tokens de Figma, ejecutar SQL en dashboards web y batallar con la terminal de Git.
            </div>
          </div>

          {/* Servidores MCP conectados */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: 18,
              background: mcpActive ? "rgba(240, 138, 53, 0.15)" : "rgba(255,255,255,0.04)",
              border: mcpActive
                ? `2px solid ${STACK2_PALETTE.accent}`
                : "1.5px solid rgba(255,255,255,0.12)",
              boxShadow: mcpActive ? `0 0 32px ${STACK2_PALETTE.accent}44` : "none",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: STACK2_PALETTE.accent, fontWeight: 800, fontSize: 17 }}>
                ✓ NÚCLEO MCP ACTIVO
              </span>
              <StatusPill text="3 SERVIDORES" color={STACK2_PALETTE.accent} solid={mcpActive} />
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 18, lineHeight: 1.4, fontWeight: 600 }}>
              Stitch (UI) + Supabase (SQL) + Git (GitHub): la IA opera tus herramientas por ti.
            </div>
          </div>
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 2: NODO 1 · STITCH MCP (FIGMA A CÓDIGO) (240 - 540f / 5.0s / 300f)
// =====================================================================
const Scene2Stitch: React.FC = () => {
  const frame = useCurrentFrame();
  const synced = frame >= 120;

  return (
    <TrilogyStage durationInFrames={300}>
      <Badge
        text="NODO 1 · DISEÑO A CÓDIGO"
        color="#F24E1E"
        icon={<span>🎨</span>}
      />

      <KineticTitle
        text="Stitch MCP: *Figma directo*"
        accent="#F24E1E"
      />

      <SubLine text="Conecta tu editor de código con Figma sin salir de la ventana." />

      <GlassCard glow="#F24E1E" delay={10}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center" }}>
          {/* Origen: Figma Canvas */}
          <div
            style={{
              padding: "18px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(255,255,255,0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <BrandLogo file="figma.svg" size={48} glow="#F24E1E" label="Figma Canvas" />
            <div style={{ fontFamily: FONT_MONO, fontSize: 15, color: "#94A3B8", textAlign: "center" }}>
              Tokens, jerarquía visual y layout autolayout
            </div>
          </div>

          {/* Conducto MCP */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: STACK2_PALETTE.accent, fontWeight: 800 }}>
              STITCH MCP
            </span>
            <div style={{ width: 80, height: 6, borderRadius: 999, background: STACK2_PALETTE.accent, boxShadow: `0 0 16px ${STACK2_PALETTE.accent}` }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>0 Alt-Tab</span>
          </div>

          {/* Destino: Componente React/Tailwind */}
          <div
            style={{
              padding: "18px",
              borderRadius: 18,
              background: synced ? "rgba(240, 138, 53, 0.12)" : "rgba(0,0,0,0.45)",
              border: synced ? `2px solid ${STACK2_PALETTE.accent}` : "1.5px dashed rgba(255,255,255,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ fontFamily: FONT_MONO, fontSize: 16, fontWeight: 800, color: synced ? STACK2_PALETTE.accent : "#FFFFFF" }}>
              {synced ? "✓ Componente UI Limpio" : "Sincronizando..."}
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
              &lt;HeroCard variant="glass" /&gt;
            </div>
            <StatusPill text={synced ? "CERO COPY-PASTE" : "LEYENDO TOKENS"} color={STACK2_PALETTE.accent} />
          </div>
        </div>

        <div style={{ marginTop: 18, textAlign: "center", fontFamily: FONT_MONO, fontSize: 17, color: "rgba(255,255,255,0.8)" }}>
          Inspecciona pantallas y genera JSX sin tocar un solo botón del navegador
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 3: NODO 2 · SUPABASE MCP (SQL EN VIVO) (540 - 900f / 6.0s / 360f)
// =====================================================================
const Scene3Supabase: React.FC = () => {
  const frame = useCurrentFrame();
  const tableCreated = frame >= 130;

  return (
    <TrilogyStage durationInFrames={360}>
      <Badge
        text="NODO 2 · BACKEND EN SEGUNDOS"
        color="#3FCF8E"
        icon={<span>🗄️</span>}
      />

      <KineticTitle
        text="Supabase MCP: *SQL en vivo*"
        accent="#3FCF8E"
      />

      <SubLine text="Pide tus tablas en lenguaje natural y levanta un backend en segundos." />

      <GlassCard glow="#3FCF8E" delay={10}>
        <WindowBar
          title="terminal ~ supabase-mcp.sql"
          status={<StatusPill text={tableCreated ? "TABLA EN PRODUCCIÓN" : "EJECUTANDO"} color="#3FCF8E" solid />}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <BrandLogo file="supabase.svg" size={44} glow="#3FCF8E" />
          <div style={{ flex: 1, fontFamily: FONT_MONO, fontSize: 19, color: "#38BDF8" }}>
            &gt; <Typed text='prompt: "Crea tabla partidas con ranking, auth y RLS habilitado"' start={15} cps={1.6} />
          </div>
        </div>

        {/* Tabla simulada en tiempo real */}
        <div
          style={{
            background: "rgba(0,0,0,0.5)",
            borderRadius: 16,
            border: tableCreated ? "2px solid #3FCF8E" : "1px solid rgba(255,255,255,0.1)",
            padding: "16px 20px",
            fontFamily: FONT_MONO,
            fontSize: 18,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 8, color: "#94A3B8" }}>
            <span>COLUMNA</span>
            <span>TIPO</span>
            <span>SEGURIDAD</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", color: "#F8FAFC" }}>
            <span style={{ color: "#3FCF8E" }}>id</span>
            <span>UUID (PRIMARY KEY)</span>
            <span>AUTO GENERATED</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", color: "#F8FAFC" }}>
            <span style={{ color: "#3FCF8E" }}>user_id</span>
            <span>UUID REFERENCES auth.users</span>
            <span>RLS PROTECTED</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", color: "#F8FAFC" }}>
            <span style={{ color: "#3FCF8E" }}>score</span>
            <span>INTEGER NOT NULL</span>
            <span>CHECK (score &gt;= 0)</span>
          </div>
        </div>

        {tableCreated && (
          <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", color: "#3FCF8E", fontFamily: FONT_MONO, fontSize: 16, fontWeight: 700 }}>
            <span>✓ Migración SQL ejecutada</span>
            <span>Tipos TypeScript exportados</span>
          </div>
        )}

        {/* Telemetría MCP inferior */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 14,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#3FCF8E",
                boxShadow: "0 0 10px #3FCF8E",
              }}
            />
            <span style={{ fontFamily: FONT_MONO, fontSize: 16, color: "#94A3B8" }}>
              SUPABASE MCP SERVIDOR CONECTADO
            </span>
          </div>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 16,
              color: "#3FCF8E",
              fontWeight: 800,
            }}
          >
            LATENCIA &lt; 20ms · PRODUCCIÓN
          </span>
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 4: NODO 3 · GIT MCP (CHECKPOINTS AUTOMÁTICOS) (900 - 1200f / 5.0s / 300f)
// =====================================================================
const Scene4Git: React.FC = () => {
  const frame = useCurrentFrame();
  const deployed = frame >= 140;

  return (
    <TrilogyStage durationInFrames={300}>
      <Badge
        text="NODO 3 · CONTROL DE VERSIONES"
        color="#F03C2E"
        icon={<span>🐙</span>}
      />

      <KineticTitle
        text="Git MCP: *Cero conflictos*"
        accent="#F03C2E"
      />

      <SubLine text="Sincronización automática con GitHub y despliegue continuo." />

      <GlassCard glow="#F03C2E" delay={10}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
          <div style={{ textAlign: "center" }}>
            <BrandLogo file="git.svg" size={44} glow="#F03C2E" label="Git MCP" />
          </div>
          <div style={{ textAlign: "center" }}>
            <BrandLogo file="github.svg" size={44} glow="#FFFFFF" label="GitHub Cloud" />
          </div>
          <div style={{ textAlign: "center" }}>
            <BrandLogo file="vercel.svg" size={44} glow="#38BDF8" label="Vercel CI/CD" />
          </div>
        </div>

        <EnergyBus color="#F03C2E" height={44} active />

        <div
          style={{
            background: "rgba(0,0,0,0.5)",
            padding: "16px 20px",
            borderRadius: 16,
            border: deployed ? "2px solid #22C55E" : "1px solid rgba(255,255,255,0.1)",
            fontFamily: FONT_MONO,
            fontSize: 18,
          }}
        >
          <div style={{ color: "#94A3B8" }}>
            $ git-mcp checkpoint --safe-mode
          </div>
          <div style={{ color: "#FDE047", marginTop: 4 }}>
            ✓ Rama temporal creada antes de cambios en DB
          </div>
          {deployed && (
            <div style={{ color: "#4ADE80", marginTop: 6, fontWeight: 800 }}>
              ✓ Push a origin/main completado · Despliegue en vivo en Vercel
            </div>
          )}
        </div>

        <div style={{ marginTop: 14, textAlign: "center", fontFamily: FONT_MONO, fontSize: 16, color: "rgba(255,255,255,0.8)" }}>
          Revierte cualquier error en un solo clic sin perder avances
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 5: CIERRE Y CTA (1200 - 1440f / 4.0s / 240f)
// =====================================================================
const Scene5Cta: React.FC = () => {
  return (
    <TrilogyStage durationInFrames={240}>
      <Badge
        text="PARTE 2 COMPLETADA"
        color={STACK2_PALETTE.accent}
        icon={<span>🚀</span>}
      />

      <KineticTitle
        text="Automatiza *tu stack ahora*"
        accent={STACK2_PALETTE.accent}
      />

      <SubLine text="En la Parte 3: Por qué tu código con IA colapsa y cómo planificar con Gemini." />

      <GlassCard glow={STACK2_PALETTE.accent} delay={10}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            { n: "01", t: "Stitch MCP", sub: "Figma UI" },
            { n: "02", t: "Supabase", sub: "Backend SQL" },
            { n: "03", t: "Git MCP", sub: "GitHub Deploy" },
          ].map((item) => (
            <div
              key={item.n}
              style={{
                padding: "12px 14px",
                borderRadius: 14,
                background: "rgba(240, 138, 53, 0.12)",
                border: "1px solid rgba(240, 138, 53, 0.4)",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: STACK2_PALETTE.accent }}>
                ✓ SERVIDOR {item.n}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF" }}>{item.t}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <CtaButtons keyword="MCP" accent={STACK2_PALETTE.accent} />
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// COMPOSICIÓN PRINCIPAL: TRILOGÍA PARTE 2 (1440 FRAMES / 24.0s @ 60 FPS)
// =====================================================================
export const TrilogiaStack2Reel: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <TrilogyAtmosphere palette={STACK2_PALETTE} />
      <TrilogyBgm volume={0.12} />
      <SeriesHeader part={2} palette={STACK2_PALETTE} />

      {/* Efectos de sonido deterministas */}
      <PyQuestSfx name="whoosh-short" from={0} volume={0.35} />
      <PyQuestSfx name="impact-bass-1" from={25} volume={0.45} />
      <PyQuestSfx name="sparkle" from={80} volume={0.38} />

      <PyQuestSfx name="whoosh-short" from={240} volume={0.32} />
      <PyQuestSfx name="click-soft" from={270} volume={0.3} />
      <PyQuestSfx name="pop" from={340} volume={0.35} />
      <PyQuestSfx name="sparkle" from={440} volume={0.38} />

      <PyQuestSfx name="whoosh-short" from={540} volume={0.32} />
      <PyQuestSfx name="typing" from={560} volume={0.25} />
      <PyQuestSfx name="impact-bass-2" from={660} volume={0.42} />
      <PyQuestSfx name="chime" from={780} volume={0.4} />

      <PyQuestSfx name="whoosh-short" from={900} volume={0.32} />
      <PyQuestSfx name="pop" from={940} volume={0.35} />
      <PyQuestSfx name="click-soft" from={1020} volume={0.3} />
      <PyQuestSfx name="chime" from={1100} volume={0.38} />

      <PyQuestSfx name="whoosh-short" from={1200} volume={0.32} />
      <PyQuestSfx name="chime" from={1250} volume={0.42} />

      {/* Secuencias sin solapamiento */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1Hook />
      </Sequence>

      <Sequence from={240} durationInFrames={300}>
        <Scene2Stitch />
      </Sequence>

      <Sequence from={540} durationInFrames={360}>
        <Scene3Supabase />
      </Sequence>

      <Sequence from={900} durationInFrames={300}>
        <Scene4Git />
      </Sequence>

      <Sequence from={1200} durationInFrames={240}>
        <Scene5Cta />
      </Sequence>
    </AbsoluteFill>
  );
};
