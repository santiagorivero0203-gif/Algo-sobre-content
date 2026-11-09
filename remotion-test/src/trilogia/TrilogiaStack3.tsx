/**
 * =====================================================================
 * TRILOGÍA · PARTE 3: EL ARTE DEL PROMPT (PLANIFICACIÓN INTELIGENTE)
 * =====================================================================
 * Duración: 25.0 segundos exactos (1500 frames @ 60 FPS).
 * Paleta: Deep Architectural Violet (#0D071A / #A855F7 / #10B981).
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
  WindowBar,
  clampInterp,
} from "./kit";
import { PyQuestSfx } from "../pyquest/sfx";

export const STACK3_PALETTE: TrilogyPalette = {
  base: "#0D071A",
  baseDeep: "#05020B",
  accent: "#A855F7",
  secondary: "#10B981",
};

// =====================================================================
// ESCENA 1: EL GANCHO · COLAPSO DE CONTEXTO (0 - 240f / 4.0s)
// =====================================================================
const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const overflow = frame >= 85;
  const tokenWidth = clampInterp(frame, [20, 85], [30, 100]);

  return (
    <TrilogyStage durationInFrames={240}>
      <Badge
        text="ERROR FATAL DE NOVATO"
        color="#EF4444"
        icon={<span>⚠️</span>}
      />

      <KineticTitle
        text="Por qué tu código IA *colapsa*"
        accent="#EF4444"
      />

      <SubLine text="El error novato: pedir la app completa en un solo mensaje gigante." />

      <GlassCard glow="#EF4444" delay={15}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#94A3B8" }}>
              VENTANA DE CONTEXTO
            </span>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 18,
                fontWeight: 800,
                color: overflow ? "#EF4444" : "#FACC15",
              }}
            >
              {overflow ? "OVERFLOW CRITICAL: 200,000 TOKENS" : "LLENANDO TOKENS..."}
            </span>
          </div>

          {/* Barra de tokens que colapsa en rojo */}
          <div
            style={{
              height: 24,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 999,
              overflow: "hidden",
              border: overflow ? "1.5px solid #EF4444" : "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <div
              style={{
                width: `${tokenWidth}%`,
                height: "100%",
                background: overflow
                  ? "linear-gradient(90deg, #F59E0B, #EF4444)"
                  : "linear-gradient(90deg, #38BDF8, #818CF8)",
                borderRadius: 999,
                boxShadow: overflow ? "0 0 24px #EF4444" : "none",
              }}
            />
          </div>

          <div
            style={{
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: 14,
              padding: "12px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#FCA5A5",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            <span>❌ La IA pierde el hilo</span>
            <span>❌ Funciones inventadas</span>
            <span>❌ Bucle de errores</span>
          </div>
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 2: DIAGNÓSTICO · EL ERROR DE NO PLANIFICAR (240 - 540f / 5.0s / 300f)
// =====================================================================
const Scene2Diagnostic: React.FC = () => {
  return (
    <TrilogyStage durationInFrames={300}>
      <Badge
        text="A/B TESTING DE PROMPTS"
        color={STACK3_PALETTE.accent}
        icon={<span>⚔️</span>}
      />

      <KineticTitle
        text="El error de *no planificar*"
        accent={STACK3_PALETTE.accent}
      />

      <SubLine text="Sin contratos previos, la IA inventa variables que rompen el motor." />

      <GlassCard glow={STACK3_PALETTE.accent} delay={10}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* Prompt Monolítico (Mal) */}
          <div
            style={{
              padding: "20px",
              borderRadius: 18,
              background: "rgba(239, 68, 68, 0.08)",
              border: "1.5px solid rgba(239, 68, 68, 0.4)",
            }}
          >
            <div style={{ color: "#EF4444", fontWeight: 800, fontSize: 17, marginBottom: 8 }}>
              ✕ EL PROMPT MONOLÍTICO
            </div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontStyle: "italic", fontSize: 18, lineHeight: 1.4 }}>
              “Hazme el clon completo de un juego RPG con 5 niveles, inventario y base de datos ya.”
            </div>
            <div style={{ marginTop: 12, color: "#FCA5A5", fontSize: 15, fontFamily: FONT_MONO }}>
              Resultado: 42 errores de sintaxis y código sucio
            </div>
          </div>

          {/* Enfoque Arquitectónico (Bien) */}
          <div
            style={{
              padding: "20px",
              borderRadius: 18,
              background: "rgba(16, 185, 129, 0.1)",
              border: `2px solid ${STACK3_PALETTE.secondary}`,
              boxShadow: `0 0 24px ${STACK3_PALETTE.secondary}33`,
            }}
          >
            <div style={{ color: STACK3_PALETTE.secondary, fontWeight: 800, fontSize: 17, marginBottom: 8 }}>
              ✓ ARQUITECTURA PREVIA
            </div>
            <div style={{ color: "rgba(255,255,255,0.9)", fontStyle: "italic", fontSize: 18, lineHeight: 1.4 }}>
              “Primero definamos las reglas, el contrato de tipos y la estructura modular paso a paso.”
            </div>
            <div style={{ marginTop: 12, color: "#6EE7B7", fontSize: 15, fontFamily: FONT_MONO }}>
              Resultado: Cero alucinaciones y ejecución fluida
            </div>
          </div>
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 3: SOLUCIÓN · GEMINI ARQUITECTO MAESTRO (540 - 900f / 6.0s / 360f)
// =====================================================================
const Scene3GeminiArchitect: React.FC = () => {
  return (
    <TrilogyStage durationInFrames={360}>
      <Badge
        text="PLANIFICACIÓN > EJECUCIÓN"
        color="#38BDF8"
        icon={<span>📐</span>}
      />

      <KineticTitle
        text="Gemini como *Arquitecto Maestro*"
        accent="#38BDF8"
      />

      <SubLine text="Define reglas, contratos y modelos antes de programar nada." />

      <GlassCard glow="#38BDF8" delay={10}>
        <WindowBar
          title="blueprint ~ system-architecture.md"
          status={<StatusPill text="DOCUMENTO DE ARQUITECTURA" color="#38BDF8" solid />}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 18 }}>
          <BrandLogo file="gemini.svg" size={50} glow="#38BDF8" label="Google Gemini" />
          <div style={{ flex: 1, fontSize: 19, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
            Yo uso Gemini como <strong style={{ color: "#38BDF8" }}>Arquitecto</strong>: genera el plano técnico completo antes de que Antigravity toque el código.
          </div>
        </div>

        {/* 3 pilares del blueprint */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { n: "01", t: "Reglas de Negocio", sub: "Límites y bucles" },
            { n: "02", t: "Tipos TypeScript", sub: "Contratos de datos" },
            { n: "03", t: "Esquema SQL", sub: "Tablas y relaciones" },
          ].map((item) => (
            <div
              key={item.n}
              style={{
                padding: "14px",
                borderRadius: 14,
                background: "rgba(56, 189, 248, 0.08)",
                border: "1px solid rgba(56, 189, 248, 0.35)",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#38BDF8", fontWeight: 800 }}>
                FASE {item.n}
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#FFFFFF", marginTop: 2 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Telemetría de arquitectura */}
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
                background: "#38BDF8",
                boxShadow: "0 0 10px #38BDF8",
              }}
            />
            <span style={{ fontFamily: FONT_MONO, fontSize: 16, color: "#94A3B8" }}>
              ARQUITECTURA DE CONTRATOS MODULARES
            </span>
          </div>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 16,
              color: "#38BDF8",
              fontWeight: 800,
            }}
          >
            0 ALUCINACIONES · 100% ESCALABLE
          </span>
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 4: EJECUCIÓN · DIVIDE Y VENCERÁS (900 - 1260f / 6.0s / 360f)
// =====================================================================
const Scene4DivideAndConquer: React.FC = () => {
  const frame = useCurrentFrame();

  const blocks = [
    { n: "Bloque 1", title: "Diseño UI & Assets", desc: "Pantallas, colores y sprites con Nano Banana", delay: 20 },
    { n: "Bloque 2", title: "Lógica Central", desc: "Mecánicas, pruebas y estado con Antigravity", delay: 90 },
    { n: "Bloque 3", title: "Despliegue & Datos", desc: "Tablas Supabase y deploy a producción Vercel", delay: 160 },
  ];

  return (
    <TrilogyStage durationInFrames={360}>
      <Badge
        text="FÓRMULA MAESTRA"
        color={STACK3_PALETTE.secondary}
        icon={<span>🧩</span>}
      />

      <KineticTitle
        text="Fórmula maestra: *Divide y vencerás*"
        accent={STACK3_PALETTE.secondary}
      />

      <SubLine text="Pide módulo por módulo. Verifica, prueba y recién avanza al siguiente." />

      <GlassCard glow={STACK3_PALETTE.secondary} delay={10}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {blocks.map((b, i) => {
            const active = frame >= b.delay;
            const progress = clampInterp(frame, [b.delay, b.delay + 18], [0, 1]);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 22px",
                  borderRadius: 18,
                  background: active ? "rgba(16, 185, 129, 0.12)" : "rgba(255,255,255,0.04)",
                  border: active
                    ? `1.5px solid ${STACK3_PALETTE.secondary}`
                    : "1.5px solid rgba(255,255,255,0.1)",
                  opacity: progress,
                  transform: `translateX(${(1 - progress) * 20}px)`,
                }}
              >
                <div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: STACK3_PALETTE.secondary, fontWeight: 800 }}>
                    {b.n}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>{b.title}</div>
                  <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{b.desc}</div>
                </div>

                <StatusPill text={active ? "✓ VERIFICADO" : "EN ESPERA"} color={STACK3_PALETTE.secondary} solid={active} />
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 14, textAlign: "center", fontFamily: FONT_MONO, fontSize: 16, color: STACK3_PALETTE.secondary }}>
          Nunca pidas la siguiente función si la actual no está 100% probada
        </div>
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// ESCENA 5: CIERRE DE TRILOGÍA Y CTA (1260 - 1500f / 4.0s / 240f)
// =====================================================================
const Scene5Cta: React.FC = () => {
  return (
    <TrilogyStage durationInFrames={240}>
      <Badge
        text="TRILOGÍA COMPLETADA"
        color={STACK3_PALETTE.accent}
        icon={<span>👑</span>}
      />

      <KineticTitle
        text="¿Listo para crear *tu proyecto*?"
        accent={STACK3_PALETTE.accent}
      />

      <SubLine text="Guarda la serie completa y domina el desarrollo ágil de la idea al código." />

      <GlassCard glow={STACK3_PALETTE.accent} delay={10}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            { n: "Parte 1", t: "Stack Secreto", sub: "Lógica + Arte" },
            { n: "Parte 2", t: "Automatización", sub: "MCP + Cloud" },
            { n: "Parte 3", t: "El Arte del Prompt", sub: "Gemini Arquitecto" },
          ].map((item) => (
            <div
              key={item.n}
              style={{
                padding: "12px 14px",
                borderRadius: 14,
                background: "rgba(168, 85, 247, 0.12)",
                border: "1px solid rgba(168, 85, 247, 0.45)",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: STACK3_PALETTE.accent, fontWeight: 800 }}>
                ✓ {item.n}
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#FFFFFF" }}>{item.t}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <CtaButtons keyword="STACK" accent={STACK3_PALETTE.accent} />
      </GlassCard>
    </TrilogyStage>
  );
};

// =====================================================================
// COMPOSICIÓN PRINCIPAL: TRILOGÍA PARTE 3 (1500 FRAMES / 25.0s @ 60 FPS)
// =====================================================================
export const TrilogiaStack3Reel: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <TrilogyAtmosphere palette={STACK3_PALETTE} />
      <TrilogyBgm volume={0.12} />
      <SeriesHeader part={3} palette={STACK3_PALETTE} />

      {/* Efectos de sonido deterministas */}
      <PyQuestSfx name="whoosh-short" from={0} volume={0.35} />
      <PyQuestSfx name="impact-bass-1" from={25} volume={0.45} />
      <PyQuestSfx name="error" from={70} volume={0.42} />

      <PyQuestSfx name="whoosh-short" from={240} volume={0.32} />
      <PyQuestSfx name="click-soft" from={270} volume={0.3} />
      <PyQuestSfx name="pop" from={340} volume={0.35} />
      <PyQuestSfx name="sparkle" from={440} volume={0.38} />

      <PyQuestSfx name="whoosh-short" from={540} volume={0.32} />
      <PyQuestSfx name="sparkle" from={570} volume={0.35} />
      <PyQuestSfx name="impact-bass-2" from={660} volume={0.42} />
      <PyQuestSfx name="chime" from={780} volume={0.4} />

      <PyQuestSfx name="whoosh-short" from={900} volume={0.32} />
      <PyQuestSfx name="pop" from={940} volume={0.35} />
      <PyQuestSfx name="pop" from={1010} volume={0.35} />
      <PyQuestSfx name="pop" from={1080} volume={0.35} />
      <PyQuestSfx name="chime" from={1180} volume={0.4} />

      <PyQuestSfx name="whoosh-short" from={1260} volume={0.32} />
      <PyQuestSfx name="sparkle" from={1300} volume={0.38} />
      <PyQuestSfx name="chime" from={1340} volume={0.42} />

      {/* Secuencias sin solapamiento */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1Hook />
      </Sequence>

      <Sequence from={240} durationInFrames={300}>
        <Scene2Diagnostic />
      </Sequence>

      <Sequence from={540} durationInFrames={360}>
        <Scene3GeminiArchitect />
      </Sequence>

      <Sequence from={900} durationInFrames={360}>
        <Scene4DivideAndConquer />
      </Sequence>

      <Sequence from={1260} durationInFrames={240}>
        <Scene5Cta />
      </Sequence>
    </AbsoluteFill>
  );
};
