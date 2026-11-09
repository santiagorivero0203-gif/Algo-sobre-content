/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · PARTE 3: EL ARTE DEL PROMPT (V2)
 * =====================================================================
 * Refactorización completa:
 *  - Estilo visual Gemini: Hero de alto impacto, breathing line, badges flotantes.
 *  - Distribución "a lo largo" (1080x1920) sin huecos vacíos.
 *  - Paleta pastel sky/indigo slate (STACK3_PALETTE) suave y limpia a la vista.
 *  - Cero cuadrículas de fondo.
 *  - Objetos 3D en perspectiva con imágenes reales (gemini_workspace_sidepanel.png).
 *  - Cero barra superior fija.
 * =====================================================================
 */
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
} from "remotion";
import {
  Card3D,
  FONT_MONO,
  FONT_SANS,
  MockupWindow,
  STACK3_PALETTE,
  TelemetryBar,
  TrilogyAtmosphere,
  TrilogyBgm,
  TrilogyCanvas,
} from "./kit";

export const TrilogiaStack3: React.FC = () => {
  const palette = STACK3_PALETTE;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.baseDeep }}>
      {/* 1. Fondo de estudio limpio sin cuadrícula */}
      <TrilogyAtmosphere palette={palette} />

      {/* 2. Secuencias cinematográficas a 60 FPS */}
      {/* BEAT 1: HERO GEMINI-STYLE (0 - 4s = 240 frames) */}
      <Sequence from={0} durationInFrames={240}>
        <Beat1Hero palette={palette} />
      </Sequence>

      {/* BEAT 2: EL ANTIPATRÓN (4s - 9s = 300 frames) */}
      <Sequence from={240} durationInFrames={300}>
        <Beat2Antipatron palette={palette} />
      </Sequence>

      {/* BEAT 3: GOOGLE AI STUDIO + CONTEXT CACHE (9s - 14.5s = 330 frames) */}
      <Sequence from={540} durationInFrames={330}>
        <Beat3AIStudio palette={palette} />
      </Sequence>

      {/* BEAT 4: ARQUITECTURA POR CONTRATOS (14.5s - 20s = 330 frames) */}
      <Sequence from={870} durationInFrames={330}>
        <Beat4Contratos palette={palette} />
      </Sequence>

      {/* BEAT 5: CTA COMUNIDAD (20s - 25s = 300 frames) */}
      <Sequence from={1200} durationInFrames={300}>
        <Beat5Cta palette={palette} />
      </Sequence>

      {/* Audio ambiental */}
      <TrilogyBgm volume={0.24} />
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
      <Card3D rotateX={9} rotateY={-7} glow={palette.accent} delay={10}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Comparativa 3D visual */}
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
      </Card3D>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 2: EL ANTIPATRÓN (300 frames / 5.0s)
// =====================================================================
const Beat2Antipatron: React.FC<{ palette: typeof STACK3_PALETTE }> = ({
  palette,
}) => {
  const frame = useCurrentFrame();
  const shake = Math.sin(frame * 1.5) * 2;

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
      <Card3D rotateX={8} rotateY={-6} glow="#F87171" delay={10}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            transform: `translateX(${shake}px)`,
          }}
        >
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
          ].map((item, idx) => (
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
      </Card3D>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 3: GOOGLE AI STUDIO + CONTEXT CACHE (330 frames / 5.5s)
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
      <Card3D rotateX={8} rotateY={-6} glow={palette.accent} delay={10}>
        <MockupWindow
          title="aistudio.google.com ~ system-prompt-lock"
          image="assets/gemini_workspace_sidepanel.png"
          accent={palette.accent}
          height={430}
          delay={12}
        />
        {/* Badge flotante de System Prompt Lock */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 28,
            padding: "8px 18px",
            borderRadius: 999,
            background: "rgba(10, 16, 28, 0.94)",
            border: `1.5px solid ${palette.accent}`,
            fontFamily: FONT_MONO,
            fontSize: 17,
            fontWeight: 800,
            color: palette.accent,
          }}
        >
          🔒 REGLAS INMUTABLES: CONTRATO ANTES DE IMPLEMENTAR
        </div>
      </Card3D>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 4: ARQUITECTURA POR CONTRATOS (330 frames / 5.5s)
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
      <Card3D rotateX={9} rotateY={-6} glow={palette.accent} delay={10}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Bloque TypeScript Interface */}
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
      </Card3D>
    </TrilogyCanvas>
  );
};

// =====================================================================
// BEAT 5: CTA COMUNIDAD (300 frames / 5.0s)
// =====================================================================
const Beat5Cta: React.FC<{ palette: typeof STACK3_PALETTE }> = ({ palette }) => {
  const frame = useCurrentFrame();

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
      <Card3D rotateX={7} rotateY={-5} glow={palette.accent} delay={10}>
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
              transform: `scale(${1 + Math.sin(frame / 12) * 0.04})`,
            }}
          >
            COMENTA "PROMPT"
          </div>

          <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#94A3B8" }}>
            Te mando las plantillas de contratos modulares completas @santi.dev
          </div>
        </div>
      </Card3D>
    </TrilogyCanvas>
  );
};
