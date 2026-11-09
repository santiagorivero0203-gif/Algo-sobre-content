/**
 * =====================================================================
 * TRILOGÍA · PARTE 1: STACK SECRETO (JUEGOS Y WEBS SIN PROGRAMAR)
 * =====================================================================
 * Duración: 24.0 segundos exactos (1440 frames @ 60 FPS).
 * Paleta: Matrix Cyber Emerald (#061A14 / #00DF8F / #38BDF8).
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
  clampInterp,
} from "./kit";
import { PyQuestSfx } from "../pyquest/sfx";

export const STACK1_PALETTE: TrilogyPalette = {
  base: "#061A14",
  baseDeep: "#020B08",
  accent: "#00DF8F",
  secondary: "#38BDF8",
};

// =====================================================================
// ESCENA 1: EL GANCHO · DE LA FRUSTRACIÓN AL PROTOTIPO (0 - 240f / 4.0s)
// =====================================================================
const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const shock = frame >= 85;
  const shockProgress = clampInterp(frame, [85, 120], [0, 1]);

  return (
    <TrilogyStage durationInFrames={240}>
      <Badge
        text="STACK SECRETO · 2026"
        color={STACK1_PALETTE.accent}
        icon={<span>⚡</span>}
      />

      <KineticTitle
        text="¿Juegos y webs *sin programar*?"
        accent={STACK1_PALETTE.accent}
      />

      <SubLine text="El flujo exacto para pasar de la idea al prototipo hoy mismo." />

      {/* Visual interactivo: Choque de complejidad vs aceleración */}
      <GlassCard glow={STACK1_PALETTE.accent} delay={18}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Lado izquierdo: El método tradicional obsoleto */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: 18,
              background: "rgba(239, 68, 68, 0.08)",
              border: "1.5px solid rgba(239, 68, 68, 0.35)",
              opacity: shock ? 0.35 : 1,
              filter: shock ? "grayscale(0.7)" : "none",
              transition: "opacity 0.2s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#EF4444", fontWeight: 800, fontSize: 17 }}>
                ✕ MÉTODO ANTIGUO
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>Meses</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 19, lineHeight: 1.4 }}>
              Memorizar sintaxis, bugs de compilación y tutoriales infinitos sin terminar nada.
            </div>
          </div>

          {/* Lado derecho: El Stack Agéntico Moderno */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: 18,
              background: shock ? "rgba(0, 223, 143, 0.14)" : "rgba(255,255,255,0.04)",
              border: shock
                ? `2px solid ${STACK1_PALETTE.accent}`
                : "1.5px solid rgba(255,255,255,0.12)",
              boxShadow: shock ? `0 0 32px ${STACK1_PALETTE.accent}44` : "none",
              transform: `scale(${0.96 + shockProgress * 0.06})`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: STACK1_PALETTE.accent, fontWeight: 800, fontSize: 17 }}>
                ✓ STACK AGÉNTICO
              </span>
              <StatusPill text="HOY MISMO" color={STACK1_PALETTE.accent} solid={shock} />
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 19, lineHeight: 1.4, fontWeight: 600 }}>
              Antigravity + Opencode + Nano Banana: tú diriges la visión, la IA construye.
            </div>
          </div>
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 2: PASO 1 · ROBA COMO UN ARTISTA (240 - 540f / 5.0s / 300f)
// =====================================================================
const Scene2Inspiration: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    {
      icon: "🎯",
      title: "Desglosa mecánicas top",
      desc: "Identifica el bucle central que hace adictivo y divertido el producto.",
      delay: 15,
    },
    {
      icon: "✂️",
      title: "Elimina lo innecesario",
      desc: "Quédate con la regla esencial sin reinventar la rueda desde cero.",
      delay: 55,
    },
    {
      icon: "✨",
      title: "Añade tu toque propio",
      desc: "Fusiona dos géneros distintos para crear una propuesta 100% fresca.",
      delay: 95,
    },
  ];

  return (
    <TrilogyStage durationInFrames={300}>
      <Badge
        text="PASO 1 · INSPIRACIÓN TÁCTICA"
        color={STACK1_PALETTE.secondary}
        icon={<span>💡</span>}
      />

      <KineticTitle
        text="Roba como un *artista*"
        accent={STACK1_PALETTE.secondary}
      />

      <SubLine text="No inventes desde la nada: recombina patrones exitosos." />

      <GlassCard glow={STACK1_PALETTE.secondary} delay={10}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {steps.map((st, i) => {
            const entered = frame >= st.delay;
            const p = clampInterp(frame, [st.delay, st.delay + 18], [0, 1]);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "16px 20px",
                  borderRadius: 18,
                  background: entered ? "rgba(255,255,255,0.06)" : "transparent",
                  border: entered
                    ? `1.5px solid ${i === 2 ? STACK1_PALETTE.accent : STACK1_PALETTE.secondary}88`
                    : "1.5px solid transparent",
                  opacity: p,
                  transform: `translateX(${(1 - p) * 24}px)`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${STACK1_PALETTE.secondary}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {st.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF" }}>
                    {st.title}
                  </div>
                  <div style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", marginTop: 2 }}>
                    {st.desc}
                  </div>
                </div>
                {entered && (
                  <StatusPill
                    text={`0${i + 1}`}
                    color={i === 2 ? STACK1_PALETTE.accent : STACK1_PALETTE.secondary}
                  />
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 3: PASO 2 · MOTOR DE LÓGICA (540 - 900f / 6.0s / 360f)
// =====================================================================
const Scene3LogicEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const phase = frame < 180 ? 1 : 2;

  return (
    <TrilogyStage durationInFrames={360}>
      <Badge
        text="PASO 2 · MOTOR DE LÓGICA"
        color={STACK1_PALETTE.accent}
        icon={<span>🧠</span>}
      />

      <KineticTitle
        text="Antigravity + *OpenCode*"
        accent={STACK1_PALETTE.accent}
      />

      <SubLine text="Genera la arquitectura pesada y poda tokens sin errores." />

      {/* Terminal dual interactiva */}
      <GlassCard glow={STACK1_PALETTE.accent} delay={10}>
        <WindowBar
          title="terminal ~ logic-engine.sh"
          status={
            <StatusPill
              text={phase === 1 ? "FASE 1: ARQUITECTURA" : "FASE 2: OPTIMIZACIÓN"}
              color={phase === 1 ? STACK1_PALETTE.secondary : STACK1_PALETTE.accent}
              solid
            />
          }
        />

        {/* Logos interactivos en cabecera */}
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
          <BrandLogo
            file="antigravity.svg"
            size={48}
            glow={STACK1_PALETTE.secondary}
            label="Google Antigravity"
            active={phase === 1}
          />
          <BrandLogo
            file="opencode.svg"
            size={48}
            glow={STACK1_PALETTE.accent}
            label="OpenCode Engine"
            active={phase === 2}
          />
        </div>

        {/* Líneas de ejecución tipo terminal */}
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 20,
            lineHeight: 1.7,
            background: "rgba(0,0,0,0.45)",
            padding: "18px 22px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ color: "#38BDF8" }}>
            $ <Typed text="agy build --mechanics='stealth-runner' --mcp" start={15} cps={1.4} />
          </div>

          {frame >= 60 && (
            <div style={{ color: "#94A3B8", marginTop: 4 }}>
              ✓ Creando bucle de juego, físicas y contratos modulares
            </div>
          )}

          {frame >= 110 && (
            <div
              style={{
                color: STACK1_PALETTE.accent,
                fontWeight: 800,
                background: "rgba(0, 223, 143, 0.12)",
                padding: "2px 8px",
                borderRadius: 6,
                display: "inline-block",
                marginTop: 6,
              }}
            >
              ✓ Arquitectura base generada (85% del trabajo resuelto)
            </div>
          )}

          {frame >= 180 && (
            <div style={{ color: "#FDE047", marginTop: 12 }}>
              $ <Typed text="opencode optimize --prune-context --save-tokens" start={185} cps={1.5} />
            </div>
          )}

          {frame >= 250 && (
            <div
              style={{
                color: "#6EE7B7",
                fontWeight: 800,
                background: "rgba(16, 185, 129, 0.16)",
                padding: "4px 10px",
                borderRadius: 8,
                marginTop: 6,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>✓ 0 errores sintácticos</span>
              <span>1,200 tokens ahorrados</span>
            </div>
          )}
        </div>

        {/* Telemetría agéntica inferior */}
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
                background: STACK1_PALETTE.accent,
                boxShadow: `0 0 10px ${STACK1_PALETTE.accent}`,
              }}
            />
            <span style={{ fontFamily: FONT_MONO, fontSize: 16, color: "#94A3B8" }}>
              MOTOR AGÉNTICO ACTIVO
            </span>
          </div>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 16,
              color: STACK1_PALETTE.accent,
              fontWeight: 800,
            }}
          >
            85% CÓDIGO AUTÓNOMO
          </span>
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 4: PASO 3 · ASSETS VISUALES (900 - 1200f / 5.0s / 300f)
// =====================================================================
const Scene4VisualAssets: React.FC = () => {
  const frame = useCurrentFrame();
  const bgCut = frame >= 140;

  return (
    <TrilogyStage durationInFrames={300}>
      <Badge
        text="PASO 3 · ASSETS EN 1 CLIC"
        color="#FDE047"
        icon={<span>🎨</span>}
      />

      <KineticTitle
        text="Nano Banana + *Remove BG*"
        accent="#FDE047"
      />

      <SubLine text="Sprites con IA y fondo transparente listos para el código." />

      <GlassCard glow="#FDE047" delay={10}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Lado izquierdo: Generación con Nano Banana */}
          <div
            style={{
              padding: "20px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(255,255,255,0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <BrandLogo file="nanobanana.svg" size={54} glow="#FDE047" label="Nano Banana" />
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 16,
                color: "rgba(255,255,255,0.75)",
                textAlign: "center",
              }}
            >
              Prompt: "pixel art cyberpunk runner character idle"
            </div>
            <StatusPill text="SPRITE IA GENERADO" color="#FDE047" solid />
          </div>

          {/* Lado derecho: Recorte en 1 clic transparente */}
          <div
            style={{
              padding: "20px",
              borderRadius: 20,
              background: bgCut
                ? "repeating-conic-gradient(rgba(255,255,255,0.1) 0% 25%, transparent 0% 50%) 50% / 20px 20px"
                : "rgba(0,0,0,0.6)",
              border: bgCut ? `2px solid ${STACK1_PALETTE.accent}` : "1.5px dashed rgba(255,255,255,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "background 0.3s",
            }}
          >
            <div style={{ fontSize: 44 }}>{bgCut ? "🤺" : "📦"}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: bgCut ? STACK1_PALETTE.accent : "#FFFFFF" }}>
              {bgCut ? "✓ FONDO TRANSPARENTE" : "ELIMINANDO FONDO..."}
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 15, color: "rgba(255,255,255,0.7)" }}>
              {bgCut ? "Listo para Canvas / CSS" : "Procesando en 1 clic..."}
            </div>
          </div>
        </div>

        {/* Cable de energía hacia el juego */}
        <EnergyBus color={STACK1_PALETTE.accent} height={46} active={bgCut} />

        <div
          style={{
            textAlign: "center",
            fontFamily: FONT_MONO,
            fontSize: 18,
            fontWeight: 700,
            color: STACK1_PALETTE.accent,
          }}
        >
          Cero diseño manual: importación directa a tu proyecto
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
        text="PARTE 1 COMPLETADA"
        color={STACK1_PALETTE.accent}
        icon={<span>🚀</span>}
      />

      <KineticTitle
        text="Pasa de la idea *al código hoy*"
        accent={STACK1_PALETTE.accent}
      />

      <SubLine text="En la Parte 2: Cómo automatizar bases de datos en la nube y GitHub." />

      <GlassCard glow={STACK1_PALETTE.accent} delay={10}>
        {/* Checklist de los 3 pasos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            { n: "01", t: "Inspiración", sub: "Mecánicas" },
            { n: "02", t: "Lógica", sub: "Antigravity" },
            { n: "03", t: "Assets", sub: "Nano Banana" },
          ].map((item) => (
            <div
              key={item.n}
              style={{
                padding: "12px 14px",
                borderRadius: 14,
                background: "rgba(0, 223, 143, 0.1)",
                border: "1px solid rgba(0, 223, 143, 0.4)",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: STACK1_PALETTE.accent }}>
                ✓ PASO {item.n}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF" }}>{item.t}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <CtaButtons keyword="PARTE 2" accent={STACK1_PALETTE.accent} />
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// COMPOSICIÓN PRINCIPAL: TRILOGÍA PARTE 1 (1440 FRAMES / 24.0s @ 60 FPS)
// =====================================================================
export const TrilogiaStack1Reel: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* 1. Fondo atmosférico con halos neón */}
      <TrilogyAtmosphere palette={STACK1_PALETTE} />

      {/* 2. Cama de música ambiental sincronizada */}
      <TrilogyBgm volume={0.12} />

      {/* 3. Cabecera persistente de serie */}
      <SeriesHeader part={1} palette={STACK1_PALETTE} />

      {/* 4. Efectos de sonido deterministas */}
      <PyQuestSfx name="whoosh-short" from={0} volume={0.35} />
      <PyQuestSfx name="impact-bass-1" from={25} volume={0.45} />
      <PyQuestSfx name="sparkle" from={85} volume={0.4} />

      <PyQuestSfx name="whoosh-short" from={240} volume={0.32} />
      <PyQuestSfx name="click-soft" from={275} volume={0.3} />
      <PyQuestSfx name="pop" from={335} volume={0.35} />
      <PyQuestSfx name="pop" from={395} volume={0.35} />
      <PyQuestSfx name="sparkle" from={455} volume={0.38} />

      <PyQuestSfx name="whoosh-short" from={540} volume={0.32} />
      <PyQuestSfx name="typing" from={560} volume={0.25} />
      <PyQuestSfx name="impact-bass-2" from={650} volume={0.42} />
      <PyQuestSfx name="chime" from={790} volume={0.4} />

      <PyQuestSfx name="whoosh-short" from={900} volume={0.32} />
      <PyQuestSfx name="sparkle" from={940} volume={0.35} />
      <PyQuestSfx name="pop" from={1040} volume={0.4} />
      <PyQuestSfx name="chime" from={1100} volume={0.38} />

      <PyQuestSfx name="whoosh-short" from={1200} volume={0.32} />
      <PyQuestSfx name="chime" from={1250} volume={0.42} />

      {/* 5. Secuencias sin solapamiento */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1Hook />
      </Sequence>

      <Sequence from={240} durationInFrames={300}>
        <Scene2Inspiration />
      </Sequence>

      <Sequence from={540} durationInFrames={360}>
        <Scene3LogicEngine />
      </Sequence>

      <Sequence from={900} durationInFrames={300}>
        <Scene4VisualAssets />
      </Sequence>

      <Sequence from={1200} durationInFrames={240}>
        <Scene5Cta />
      </Sequence>
    </AbsoluteFill>
  );
};
