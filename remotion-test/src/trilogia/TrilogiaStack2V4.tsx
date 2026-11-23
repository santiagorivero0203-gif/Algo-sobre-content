/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · PARTE 2: AUTOMATIZACIÓN MCP (V4 CINE HD)
 * =====================================================================
 * Duración: 1440 frames (24.0s @ 60 FPS) · 1080×1920 · Sincronizado al VO.
 *  - Beat 1 (0–240f · 0–4s):     Hook + constelación SVG animada conectando MCP a Figma, Supabase y GitHub.
 *  - Beat 2 (240–540f · 4–9s):   Stitch MCP: captura viva de app + cursor + tarjeta de código JSX emergiendo.
 *  - Beat 3 (540–840f · 9–14s):  Supabase MCP: empuje elástico terminal SQL → tabla PostgreSQL con RLS activo.
 *  - Beat 4 (840–1140f · 14–19s):Git MCP: grafo animado de ramas + despliegue Vercel barrido por láser.
 *  - Beat 5 (1140–1440f · 19–24s):CTA interactivo "MCP" + comentario y DM con mcp_config.json.
 * =====================================================================
 */
import React from "react";
import { AbsoluteFill, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BeatCameraV4,
  BrandChipV4,
  DockingHeaderV4,
  EASE_CINEMATIC,
  FONT_MONO,
  InteractiveCtaV4,
  LiveMockupWindowV4,
  LiveTerminalV4,
  PillBadgeV4,
  RackFocusCardV4,
  ReactiveAtmosphereV4,
  SAFE_V4,
  SPRING_CARD,
  SPRING_PUNCH,
  STACK2_V4_PALETTE,
  SoundEffectV4,
  SvgBolt,
  SvgCheck,
  SvgGitBranch,
  SvgShield,
  SvgSparkle,
  TrilogyBgmV4,
  clampInterp,
  useSpringV4,
} from "./kitV4";

const TOTAL_FRAMES = 1440;

export const TrilogiaStack2V4: React.FC = () => {
  const { fps } = useVideoConfig();
  const palette = STACK2_V4_PALETTE;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.baseDeep }}>
      <ReactiveAtmosphereV4
        moods={[
          { frame: 0, base: "#2C1E0E", deep: "#0C0704", orbA: "#FBBF24", orbB: "#FB923C" },
          { frame: 240, base: "#15253E", deep: "#060B15", orbA: "#38BDF8", orbB: "#FBBF24" },
          { frame: 540, base: "#0D2B22", deep: "#040E0A", orbA: "#34D399", orbB: "#FBBF24" },
          { frame: 840, base: "#261B12", deep: "#0B0704", orbA: "#FB923C", orbB: "#FBBF24" },
          { frame: 1140, base: "#2D1F0D", deep: "#0B0703", orbA: "#FBBF24", orbB: "#F59E0B" },
        ]}
        ambientLogos={[
          { file: "mcp.svg", x: 760, y: 200, size: 175, blur: 4.5, speed: 0.85, opacity: 0.085 },
          { file: "supabase.svg", x: 55, y: 830, size: 155, blur: 5.5, speed: 0.72, opacity: 0.075 },
          { file: "github.svg", x: 780, y: 1320, size: 160, blur: 5, speed: 0.88, opacity: 0.07 },
          { file: "vercel.svg", x: 95, y: 1520, size: 145, blur: 6, speed: 0.76, opacity: 0.065 },
        ]}
        cutFrames={[240, 540, 840, 1140]}
        flashColor={palette.accent}
      />

      <SoundEffectV4 file="riser.mp3" from={208} volume={0.22} />
      <SoundEffectV4 file="riser.mp3" from={508} volume={0.22} />
      <SoundEffectV4 file="riser.mp3" from={808} volume={0.22} />
      <SoundEffectV4 file="riser.mp3" from={1108} volume={0.26} />

      <Sequence from={0} durationInFrames={240} premountFor={fps} name="1·HookMCP">
        <Beat1Hero />
      </Sequence>

      <Sequence from={240} durationInFrames={300} premountFor={fps} name="2·StitchMCP">
        <Beat2Stitch />
      </Sequence>

      <Sequence from={540} durationInFrames={300} premountFor={fps} name="3·SupabaseMCP">
        <Beat3Supabase />
      </Sequence>

      <Sequence from={840} durationInFrames={300} premountFor={fps} name="4·GitMCP">
        <Beat4Git />
      </Sequence>

      <Sequence from={1140} durationInFrames={300} premountFor={fps} name="5·CTA">
        <Beat5Cta />
      </Sequence>

      <TrilogyBgmV4 totalFrames={TOTAL_FRAMES} volume={0.18} />
    </AbsoluteFill>
  );
};

export const TrilogiaStack2V4Reel = TrilogiaStack2V4;

// =====================================================================
// BEAT 1: HOOK · CONSTELACIÓN SVG MCP EN VIVO (0–240f / 4.0s)
// =====================================================================
const Beat1Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const palette = STACK2_V4_PALETTE;
  const hubEnter = useSpringV4(34, SPRING_PUNCH);

  // Alterna foco visual por cada nodo MCP para que nunca quede estático
  const activeNode = frame < 110 ? 0 : frame < 175 ? 1 : 2;
  const packetProgress = ((frame - 36) % 54) / 54;

  const nodes = [
    { name: "Stitch MCP", role: "Figma → React", file: "figma.svg", color: "#38BDF8" },
    { name: "Supabase MCP", role: "SQL + Auth Live", file: "supabase.svg", color: "#34D399" },
    { name: "Git MCP", role: "GitHub → Vercel", file: "github.svg", color: palette.accent },
  ];

  return (
    <BeatCameraV4
      durationInFrames={240}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 0, y: 22, scale: 1.05, rotate: -0.4 },
        { frame: 36, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 135, x: 10, y: -10, scale: 1.028, rotate: 0.3 },
        { frame: 240, x: -6, y: -18, scale: 1.045, rotate: -0.2 },
      ]}
    >
      <SoundEffectV4 file="whoosh-cinematic.mp3" from={0} volume={0.5} />
      <SoundEffectV4 file="impact-bass-1.mp3" from={12} volume={0.48} />
      <SoundEffectV4 file="pop.mp3" from={46} volume={0.36} />
      <SoundEffectV4 file="ping.mp3" from={110} volume={0.38} />
      <SoundEffectV4 file="ping.mp3" from={175} volume={0.38} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <DockingHeaderV4
          badge="TRILOGÍA · PARTE 2 DE 3"
          accent={palette.accent}
          secondary={palette.secondary}
          logoFile="mcp.svg"
          title="Automatiza tu código *con MCP*"
          sub="Deja de hacer tareas repetitivas a mano. Conecta tus apps directo a la IA."
          heroTitleSize={100}
          dockFrame={32}
          dockScale={0.85}
          startYOffset={230}
        />

        {/* Hub central MCP + Cables de datos SVG + 3 nodos con Rack-Focus */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 22,
            opacity: hubEnter,
            translate: `0px ${(1 - hubEnter) * 70}px`,
          }}
        >
          {/* Nodo Maestro MCP */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 30px",
              borderRadius: 28,
              background: "rgba(22, 16, 10, 0.92)",
              border: `2px solid ${palette.accent}99`,
              boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 42px -10px ${palette.accent}66`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 22,
                  background: `${palette.accent}22`,
                  border: `2px solid ${palette.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  scale: `${1 + Math.sin(frame / 10) * 0.05}`,
                }}
              >
                <Img
                  src={staticFile("assets/trilogia/mcp.svg")}
                  style={{ width: 48, height: 48, objectFit: "contain" }}
                />
              </div>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: palette.accent, fontWeight: 800 }}>
                  MODEL CONTEXT PROTOCOL
                </div>
                <div style={{ fontSize: 38, fontWeight: 800 }}>Agente IA Conectado</div>
              </div>
            </div>
            <PillBadgeV4
              text="3 ACTIVOS"
              color={palette.accent}
              delay={40}
              icon={<SvgBolt size={22} color={palette.accent} />}
            />
          </div>

          {/* Conector SVG animado (pulsos viajando del Hub a los 3 servidores) */}
          <svg width="100%" height="68" viewBox="0 0 960 68" fill="none">
            {[160, 480, 800].map((targetX, idx) => {
              const color = nodes[idx].color;
              const isActive = activeNode === idx;
              const py = 4 + packetProgress * 60;
              const px = 480 + (targetX - 480) * packetProgress;
              return (
                <g key={targetX}>
                  <path
                    d={`M 480 4 C 480 34, ${targetX} 34, ${targetX} 64`}
                    stroke={color}
                    strokeWidth={isActive ? 5 : 2.5}
                    strokeOpacity={isActive ? 0.9 : 0.35}
                    strokeDasharray="10 8"
                    strokeDashoffset={-frame * 1.4}
                  />
                  {frame > 36 && (
                    <circle
                      cx={px}
                      cy={py}
                      r={isActive ? 9 : 6}
                      fill={color}
                      opacity={isActive ? 1 : 0.5}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* 3 Tarjetas de servidores con enfoque selectivo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {nodes.map((node, idx) => {
              const isFocus = activeNode === idx;
              return (
                <RackFocusCardV4
                  key={node.name}
                  accent={node.color}
                  focusAmount={isFocus ? 1 : 0}
                  maxBlur={2.3}
                  delay={44 + idx * 8}
                  padding="24px 28px"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                    <div
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: 20,
                        background: `${node.color}1C`,
                        border: `1.5px solid ${node.color}88`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Img
                        src={staticFile(`assets/trilogia/${node.file}`)}
                        style={{ width: 42, height: 42, objectFit: "contain" }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 36, fontWeight: 800, color: "#FFFFFF" }}>
                        {node.name}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 25,
                          color: "#CBD5E1",
                          marginTop: 2,
                        }}
                      >
                        {node.role}
                      </div>
                    </div>
                  </div>
                  <SvgCheck size={34} color={node.color} />
                </RackFocusCardV4>
              );
            })}
          </div>
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 2: STITCH MCP · CAPTURA VIVA + CÓDIGO REACT EMERGIENDO (300f)
// =====================================================================
const Beat2Stitch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palette = STACK2_V4_PALETTE;

  // Tras hacer clic en la captura (f96), emerge la tarjeta de código JSX empujando arriba
  const codeRise = spring({
    frame: frame - 102,
    fps,
    config: SPRING_CARD,
  });

  return (
    <BeatCameraV4
      durationInFrames={300}
      accent="#38BDF8"
      poses={[
        { frame: 0, x: -32, y: 0, scale: 1.03, rotate: -0.35 },
        { frame: 32, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 112, x: 0, y: -14, scale: 1.03, rotate: 0.2 },
        { frame: 300, x: 10, y: -22, scale: 1.048, rotate: 0.3 },
      ]}
    >
      <SoundEffectV4 file="whoosh-short.mp3" from={0} volume={0.48} />
      <SoundEffectV4 file="click.mp3" from={94} volume={0.46} />
      <SoundEffectV4 file="typing.mp3" from={116} volume={0.32} />
      <SoundEffectV4 file="chime.mp3" from={215} volume={0.45} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <DockingHeaderV4
          badge="HERRAMIENTA 1 · DISEÑO A CÓDIGO"
          accent="#38BDF8"
          secondary={palette.accent}
          logoFile="figma.svg"
          title="Stitch MCP: *Figma directo*"
          sub="Extrae pantallas y tokens directo a componentes limpios sin copiar y pegar."
          heroTitleSize={92}
          dockFrame={16}
          dockScale={0.86}
          startYOffset={90}
        />

        {/* Captura viva (se desenfoca levemente cuando sube el código generado) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              scale: `${1 - codeRise * 0.05}`,
              translate: `0px ${-codeRise * 12}px`,
              filter: codeRise > 0.1 ? `blur(${(codeRise * 2.2).toFixed(2)}px)` : undefined,
              opacity: 1 - codeRise * 0.28,
            }}
          >
            <LiveMockupWindowV4
              title="stitch-mcp ~ figma-live-sync"
              image="assets/mova_app_live.png"
              accent="#38BDF8"
              height={540}
              delay={12}
              durationInFrames={300}
              zoomFrom={1.03}
              zoomTo={1.14}
              panX={[0, -20]}
              panY={[0, -14]}
              cursorFrom={[20, 74]}
              cursorTo={[56, 44]}
              clickFrame={94}
              overlay={
                <div
                  style={{
                    position: "absolute",
                    bottom: 22,
                    left: 24,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 22px",
                    borderRadius: 999,
                    background: "rgba(7, 16, 30, 0.92)",
                    border: "2px solid #38BDF8",
                    fontFamily: FONT_MONO,
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#38BDF8",
                  }}
                >
                  <SvgSparkle size={22} color="#38BDF8" />
                  TOKENS EXTRAÍDOS EN VIVO
                </div>
              }
            />
          </div>

          {/* Tarjeta de código JSX generada al instante */}
          <div
            style={{
              opacity: codeRise,
              translate: `0px ${(1 - codeRise) * 140}px`,
              scale: `${0.92 + codeRise * 0.08}`,
            }}
          >
            <LiveTerminalV4
              title="components/HeroCard.tsx"
              accent={palette.accent}
              statusLabel="0 COPY-PASTE"
              fontSize={32}
              focusAmount={codeRise}
              delay={102}
              lines={[
                {
                  text: "stitch.pull('figma://hero-v2')",
                  startFrame: 112,
                  durationFrames: 40,
                  isPrompt: true,
                },
                {
                  text: "JSX + Tokens sincronizados",
                  startFrame: 168,
                  durationFrames: 36,
                  isSuccess: true,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 3: SUPABASE MCP · EMPUJE ELÁSTICO SQL → POSTGRESQL RLS (300f)
// =====================================================================
const Beat3Supabase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const green = "#34D399";
  const palette = STACK2_V4_PALETTE;

  const schemaPush = spring({
    frame: frame - 122,
    fps,
    config: SPRING_CARD,
  });

  const rows = [
    { table: "public.users", cols: "id, email, role", badge: "RLS ACTIVO", delay: 138 },
    { table: "public.orders", cols: "id, user_id, total", badge: "MIGRADO OK", delay: 162 },
  ];

  return (
    <BeatCameraV4
      durationInFrames={300}
      accent={green}
      poses={[
        { frame: 0, x: 0, y: 20, scale: 1.03, rotate: 0 },
        { frame: 32, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 130, x: -6, y: -12, scale: 1.028, rotate: -0.2 },
        { frame: 300, x: 6, y: -22, scale: 1.048, rotate: 0.15 },
      ]}
    >
      <SoundEffectV4 file="whoosh.mp3" from={0} volume={0.48} />
      <SoundEffectV4 file="typing.mp3" from={18} volume={0.34} />
      <SoundEffectV4 file="whoosh-short.mp3" from={122} volume={0.44} />
      <SoundEffectV4 file="pop.mp3" from={142} volume={0.42} />
      <SoundEffectV4 file="chime.mp3" from={172} volume={0.48} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <DockingHeaderV4
          badge="HERRAMIENTA 2 · BACKEND SQL"
          accent={green}
          secondary={palette.accent}
          logoFile="supabase.svg"
          title="Supabase MCP: *SQL en vivo*"
          sub="Pide tus tablas en español y levanta tu backend en la nube al instante."
          heroTitleSize={92}
          dockFrame={16}
          dockScale={0.86}
          startYOffset={90}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 22,
          }}
        >
          {/* Terminal Supabase (pasa a segundo plano desenfocado al subir las tablas) */}
          <div
            style={{
              translate: `0px ${-schemaPush * 14}px`,
              scale: `${1 - schemaPush * 0.045}`,
            }}
          >
            <LiveTerminalV4
              title="supabase-mcp ~ cloud"
              accent={green}
              statusLabel="CONECTADO"
              fontSize={33}
              focusAmount={1 - schemaPush * 0.8}
              delay={10}
              lines={[
                {
                  text: 'prompt: "Tabla users + orders"',
                  startFrame: 16,
                  durationFrames: 48,
                  isPrompt: true,
                },
                {
                  text: "Migración SQL aplicada (0 err)",
                  startFrame: 76,
                  durationFrames: 34,
                  isSuccess: true,
                },
              ]}
            />
          </div>

          {/* Esquema PostgreSQL en vivo empujando desde abajo */}
          <div
            style={{
              opacity: schemaPush,
              translate: `0px ${(1 - schemaPush) * 145}px`,
              scale: `${0.9 + schemaPush * 0.1}`,
            }}
          >
            <RackFocusCardV4 accent={green} focusAmount={schemaPush} padding="32px 32px">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 22,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <BrandChipV4 file="postgresql.svg" size={40} glow={green} delay={126} />
                  <div>
                    <div style={{ fontSize: 36, fontWeight: 800 }}>PostgreSQL Cloud</div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: "#94A3B8" }}>
                      Tipos TypeScript autogenerados
                    </div>
                  </div>
                </div>
                <PillBadgeV4
                  text="RLS ON"
                  color={green}
                  delay={134}
                  icon={<SvgShield size={22} color={green} />}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {rows.map((r) => {
                  const rowEnter = spring({
                    frame: frame - r.delay,
                    fps,
                    config: SPRING_PUNCH,
                  });
                  return (
                    <div
                      key={r.table}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "22px 24px",
                        borderRadius: 20,
                        background: "rgba(255,255,255,0.045)",
                        border: `1.5px solid ${green}55`,
                        opacity: rowEnter,
                        translate: `${(1 - rowEnter) * -40}px 0px`,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 30,
                            fontWeight: 800,
                            color: green,
                          }}
                        >
                          {r.table}
                        </div>
                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 23,
                            color: "#CBD5E1",
                            marginTop: 4,
                          }}
                        >
                          {r.cols}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 18px",
                          borderRadius: 14,
                          background: `${green}20`,
                          fontFamily: FONT_MONO,
                          fontSize: 22,
                          fontWeight: 800,
                          color: green,
                        }}
                      >
                        <SvgCheck size={24} color={green} />
                        {r.badge}
                      </div>
                    </div>
                  );
                })}
              </div>
            </RackFocusCardV4>
          </div>
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 4: GIT MCP · GRAFO DE RAMAS + VERCEL DEPLOY LÁSER (300f / 5.0s)
// =====================================================================
const Beat4Git: React.FC = () => {
  const frame = useCurrentFrame();
  const palette = STACK2_V4_PALETTE;
  const mergeP = clampInterp(frame, [26, 118], [0, 1], EASE_CINEMATIC);
  const scanX = clampInterp(frame, [74, 210], [0, 100], EASE_CINEMATIC);
  const readyEnter = useSpringV4(192, SPRING_PUNCH);

  return (
    <BeatCameraV4
      durationInFrames={300}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 24, y: 12, scale: 1.04, rotate: 0.35 },
        { frame: 32, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 185, x: -8, y: -12, scale: 1.032, rotate: -0.2 },
        { frame: 300, x: 4, y: -18, scale: 1.045, rotate: 0.1 },
      ]}
    >
      <SoundEffectV4 file="whoosh-short.mp3" from={0} volume={0.48} />
      <SoundEffectV4 file="click-soft.mp3" from={52} volume={0.4} />
      <SoundEffectV4 file="sparkle.mp3" from={98} volume={0.44} />
      <SoundEffectV4 file="notification.mp3" from={194} volume={0.48} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <DockingHeaderV4
          badge="HERRAMIENTA 3 · VERSIONADO"
          accent={palette.accent}
          secondary={palette.secondary}
          logoFile="github.svg"
          title="Git MCP: *Cero conflictos*"
          sub="Checkpoints automáticos en GitHub y despliegue instantáneo en Vercel."
          heroTitleSize={92}
          dockFrame={16}
          dockScale={0.86}
          startYOffset={90}
        />

        {/* Tarjeta superior: Grafo animado Git -> Main */}
        <RackFocusCardV4 accent={palette.accent} focusAmount={1} delay={12} padding="24px 28px">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <SvgGitBranch size={30} color={palette.accent} />
              <span style={{ fontFamily: FONT_MONO, fontSize: 25, fontWeight: 800 }}>
                feat/checkpoint → main
              </span>
            </div>
            <BrandChipV4 file="vercel.svg" size={30} glow="#FFFFFF" delay={18} label="Vercel" />
          </div>

          <svg width="100%" height="84" viewBox="0 0 880 84" fill="none">
            {/* Línea main */}
            <line x1="36" y1="24" x2="844" y2="24" stroke="rgba(255,255,255,0.22)" strokeWidth="6" strokeLinecap="round" />
            <line
              x1="36"
              y1="24"
              x2={36 + 808 * mergeP}
              y2="24"
              stroke={palette.accent}
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Rama checkpoint que converge */}
            <path
              d="M 160 24 C 220 24, 240 66, 320 66 L 540 66 C 620 66, 640 24, 700 24"
              stroke="#34D399"
              strokeWidth="5"
              strokeDasharray="660"
              strokeDashoffset={660 * (1 - mergeP)}
              strokeLinecap="round"
            />
            <circle cx="160" cy="24" r="11" fill={palette.accent} />
            <circle cx="430" cy="66" r="11" fill="#34D399" opacity={mergeP > 0.4 ? 1 : 0.2} />
            <circle cx="700" cy="24" r="13" fill="#34D399" opacity={mergeP > 0.85 ? 1 : 0.2} />
            <circle cx="844" cy="24" r="13" fill={palette.accent} opacity={mergeP > 0.96 ? 1 : 0.25} />
          </svg>
        </RackFocusCardV4>

        {/* Despliegue en vivo con barrido láser */}
        <div style={{ flex: 1, position: "relative" }}>
          <LiveMockupWindowV4
            title="vercel.com/deployments ~ prod"
            image="assets/the_last_endo_live.png"
            accent={palette.accent}
            height={580}
            delay={20}
            durationInFrames={300}
            zoomFrom={1.03}
            zoomTo={1.13}
            panX={[0, -20]}
            panY={[0, -14]}
            overlay={
              <>
                {scanX > 1 && scanX < 99 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: `${scanX}%`,
                      width: 6,
                      background: palette.accent,
                      boxShadow: `0 0 30px 10px ${palette.accent}`,
                    }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    right: 24,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    opacity: readyEnter,
                    scale: `${0.85 + readyEnter * 0.15}`,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "14px 24px",
                      borderRadius: 999,
                      background: "rgba(6, 20, 15, 0.94)",
                      border: "2px solid #34D399",
                      fontFamily: FONT_MONO,
                      fontSize: 23,
                      fontWeight: 800,
                      color: "#34D399",
                    }}
                  >
                    <SvgCheck size={24} color="#34D399" />
                    DEPLOY PRODUCTION OK
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 20px",
                      borderRadius: 999,
                      background: "rgba(22, 16, 10, 0.92)",
                      border: `1.5px solid ${palette.accent}`,
                      fontFamily: FONT_MONO,
                      fontSize: 22,
                      fontWeight: 800,
                      color: palette.accent,
                    }}
                  >
                    <SvgShield size={22} color={palette.accent} />
                    ROLLBACK 1 CLIC
                  </div>
                </div>
              </>
            }
          />
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 5: CTA COMUNIDAD · COMENTA "MCP" + DM CONFIG (300f / 5.0s)
// =====================================================================
const Beat5Cta: React.FC = () => {
  const palette = STACK2_V4_PALETTE;

  return (
    <BeatCameraV4
      durationInFrames={300}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 0, y: 18, scale: 1.05, rotate: 0 },
        { frame: 28, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 185, x: 0, y: -10, scale: 1.024, rotate: -0.2 },
        { frame: 300, x: 0, y: -16, scale: 1.038, rotate: 0 },
      ]}
    >
      <SoundEffectV4 file="impact-bass-2.mp3" from={0} volume={0.52} />
      <SoundEffectV4 file="sparkle.mp3" from={22} volume={0.44} />
      <SoundEffectV4 file="pop.mp3" from={60} volume={0.42} />
      <SoundEffectV4 file="notification.mp3" from={102} volume={0.5} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 28,
        }}
      >
        <DockingHeaderV4
          badge="PARTE 3 DISPONIBLE · PROMPTS"
          accent={palette.accent}
          secondary={palette.secondary}
          logoFile="mcp.svg"
          title="Automatiza *tu stack*"
          sub="Te paso la configuración exacta de mis 3 servidores MCP listos para usar."
          heroTitleSize={98}
          dockFrame={14}
          dockScale={0.86}
          startYOffset={60}
        />

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <InteractiveCtaV4
            keyword="MCP"
            headline="¿Quieres mi archivo mcp_config.json listo para conectar?"
            dmTitle="DM de @santi.dev"
            dmSubtitle="mcp_config.json (3 servidores) enviado"
            accent={palette.accent}
            darkTextColor="#0B0704"
            logos={["figma.svg", "supabase.svg", "github.svg"]}
            delay={10}
          />
        </div>
      </div>
    </BeatCameraV4>
  );
};
