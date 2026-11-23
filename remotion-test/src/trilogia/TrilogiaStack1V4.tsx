/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · PARTE 1: STACK SECRETO (V4 CINE HD)
 * =====================================================================
 * Duración: 1440 frames (24.0s @ 60 FPS) · 1080×1920 · Sincronizado al VO.
 *  - Beat 1 (0–240f · 0–4s):     Hook gigante → dock + ventana 2.5D viva + logos orbitando.
 *  - Beat 2 (240–480f · 4–8s):   Extractor de tokens hacia Figma + 3 tarjetas con rack-focus secuencial.
 *  - Beat 3 (480–840f · 8–14s):  Empuje elástico: Terminal Antigravity (0→85%) empujada a DOF por Opencode (-1200 TKN).
 *  - Beat 4 (840–1140f · 14–19s):Cortina láser Antes/Después de Remove BG sobre cuadrícula alpha + flujo visual.
 *  - Beat 5 (1140–1440f · 19–24s):CTA interactivo "STACK" letra a letra + comentario y DM instantáneo.
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
  SPRING_SOFT,
  STACK1_V4_PALETTE,
  SoundEffectV4,
  SvgArrowRight,
  SvgBolt,
  SvgCheck,
  SvgScissors,
  SvgSparkle,
  TrilogyBgmV4,
  clampInterp,
  useSpringV4,
} from "./kitV4";

const TOTAL_FRAMES = 1440;

export const TrilogiaStack1V4: React.FC = () => {
  const { fps } = useVideoConfig();
  const palette = STACK1_V4_PALETTE;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.baseDeep }}>
      {/* Atmósfera reactiva que cambia de temperatura por beat + logos en paralaje DOF */}
      <ReactiveAtmosphereV4
        moods={[
          { frame: 0, base: "#103125", deep: "#040E0A", orbA: "#34D399", orbB: "#38BDF8" },
          { frame: 240, base: "#14273D", deep: "#050B14", orbA: "#38BDF8", orbB: "#A78BFA" },
          { frame: 480, base: "#0D2D28", deep: "#040D0B", orbA: "#10B981", orbB: "#38BDF8" },
          { frame: 840, base: "#1C243D", deep: "#060914", orbA: "#A78BFA", orbB: "#34D399" },
          { frame: 1140, base: "#0E3527", deep: "#030D09", orbA: "#34D399", orbB: "#2DD4BF" },
        ]}
        ambientLogos={[
          { file: "antigravity.svg", x: 760, y: 210, size: 170, blur: 4.5, speed: 0.85, opacity: 0.08 },
          { file: "figma.svg", x: 60, y: 840, size: 150, blur: 5.5, speed: 0.7, opacity: 0.07 },
          { file: "opencode.svg", x: 790, y: 1320, size: 160, blur: 5, speed: 0.9, opacity: 0.07 },
          { file: "nanobanana.svg", x: 110, y: 1540, size: 140, blur: 6, speed: 0.75, opacity: 0.065 },
        ]}
        cutFrames={[240, 480, 840, 1140]}
        flashColor={palette.accent}
      />

      {/* Risers sutiles previos a cada corte para fluidez audiovisual */}
      <SoundEffectV4 file="riser.mp3" from={208} volume={0.22} />
      <SoundEffectV4 file="riser.mp3" from={448} volume={0.22} />
      <SoundEffectV4 file="riser.mp3" from={808} volume={0.22} />
      <SoundEffectV4 file="riser.mp3" from={1108} volume={0.26} />

      <Sequence from={0} durationInFrames={240} premountFor={fps} name="1·Hook">
        <Beat1Hero />
      </Sequence>

      <Sequence from={240} durationInFrames={240} premountFor={fps} name="2·Inspiracion">
        <Beat2Inspiracion />
      </Sequence>

      <Sequence from={480} durationInFrames={360} premountFor={fps} name="3·Logica">
        <Beat3Logica />
      </Sequence>

      <Sequence from={840} durationInFrames={300} premountFor={fps} name="4·Arte">
        <Beat4Arte />
      </Sequence>

      <Sequence from={1140} durationInFrames={300} premountFor={fps} name="5·CTA">
        <Beat5Cta />
      </Sequence>

      <TrilogyBgmV4 totalFrames={TOTAL_FRAMES} volume={0.18} />
    </AbsoluteFill>
  );
};

export const TrilogiaStack1V4Reel = TrilogiaStack1V4;

// =====================================================================
// BEAT 1: HOOK · RESULTADO PRIMERO + LOGOS ORBITALES (0–240f / 4.0s)
// =====================================================================
const Beat1Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const palette = STACK1_V4_PALETTE;
  const stageEnter = useSpringV4(34, SPRING_CARD);
  const badgeEnter = useSpringV4(88, SPRING_PUNCH);

  const tiltX = interpolateTilt(frame, 34, 240, 9, 2.5);
  const tiltY = interpolateTilt(frame, 34, 240, -7, 3.5);

  const stackTools = [
    { file: "antigravity.svg", name: "Antigravity", delay: 44 },
    { file: "figma.svg", name: "Figma", delay: 54 },
    { file: "opencode.svg", name: "Opencode", delay: 64 },
    { file: "nanobanana.svg", name: "Nano Banana", delay: 74 },
  ];

  return (
    <BeatCameraV4
      durationInFrames={240}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 0, y: 24, scale: 1.05, rotate: -0.5 },
        { frame: 36, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 130, x: -10, y: -12, scale: 1.025, rotate: 0.3 },
        { frame: 240, x: 6, y: -20, scale: 1.045, rotate: -0.2 },
      ]}
    >
      <SoundEffectV4 file="whoosh-cinematic.mp3" from={0} volume={0.5} />
      <SoundEffectV4 file="impact-bass-1.mp3" from={10} volume={0.48} />
      <SoundEffectV4 file="pop.mp3" from={46} volume={0.34} />
      <SoundEffectV4 file="click-soft.mp3" from={94} volume={0.38} />
      <SoundEffectV4 file="ping.mp3" from={120} volume={0.36} />

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
          badge="TRILOGÍA · PARTE 1 DE 3"
          accent={palette.accent}
          secondary={palette.secondary}
          logoFile="antigravity.svg"
          title="¿Juegos y webs *sin programar*?"
          sub="El stack exacto con IA para pasar de una idea a un proyecto vivo."
          heroTitleSize={106}
          dockFrame={34}
          dockScale={0.85}
          startYOffset={260}
        />

        {/* Escenario central 2.5D con captura viva a gran escala */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
            opacity: stageEnter,
            translate: `0px ${(1 - stageEnter) * 90}px`,
          }}
        >
          <div
            style={{
              transform: `perspective(1400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <LiveMockupWindowV4
              title="the-last-endo.vercel.app ~ live"
              image="assets/the_last_endo_live.png"
              accent={palette.accent}
              height={690}
              delay={32}
              durationInFrames={240}
              zoomFrom={1.03}
              zoomTo={1.15}
              panX={[0, -24]}
              panY={[0, -16]}
              cursorFrom={[22, 68]}
              cursorTo={[64, 46]}
              clickFrame={112}
              overlay={
                <div
                  style={{
                    position: "absolute",
                    bottom: 26,
                    left: 26,
                    right: 26,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 24px",
                      borderRadius: 999,
                      background: "rgba(6, 18, 13, 0.92)",
                      border: `2px solid ${palette.accent}`,
                      boxShadow: `0 0 32px ${palette.accent}66`,
                      fontFamily: FONT_MONO,
                      fontSize: 24,
                      fontWeight: 800,
                      color: palette.accent,
                      opacity: badgeEnter,
                      scale: `${0.82 + badgeEnter * 0.18}`,
                    }}
                  >
                    <SvgBolt size={26} color={palette.accent} />
                    0 LÍNEAS MANUALES
                  </div>

                  <div
                    style={{
                      padding: "12px 22px",
                      borderRadius: 999,
                      background: "rgba(9, 15, 26, 0.88)",
                      border: "1.5px solid rgba(255,255,255,0.2)",
                      fontFamily: FONT_MONO,
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      opacity: badgeEnter,
                    }}
                  >
                    60 FPS · EN PRODUCCIÓN
                  </div>
                </div>
              }
            />
          </div>

          {/* Fila de herramientas del stack */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {stackTools.map((tool) => (
              <BrandChipV4
                key={tool.name}
                file={tool.file}
                size={32}
                glow={palette.accent}
                delay={tool.delay}
                label={tool.name}
              />
            ))}
          </div>
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 2: INSPIRACIÓN · EXTRACTOR DE TOKENS + RACK-FOCUS 01→02→03 (240f)
// =====================================================================
const Beat2Inspiracion: React.FC = () => {
  const frame = useCurrentFrame();
  const palette = STACK1_V4_PALETTE;
  const barEnter = useSpringV4(14, SPRING_CARD);

  // Spotlight dinámico que barre paso 1 -> paso 2 -> paso 3 (cada ~70f)
  const activeStep = frame < 95 ? 0 : frame < 168 ? 1 : 2;

  const steps = [
    {
      num: "01",
      title: "Desglosa mecánicas top",
      desc: "Identifica el bucle central que engancha en los juegos que amas.",
      color: palette.accent,
    },
    {
      num: "02",
      title: "Prototipa en Figma",
      desc: "Extrae paleta, tipografía y pantallas antes de escribir código.",
      color: palette.secondary,
    },
    {
      num: "03",
      title: "Añade tu giro único",
      desc: "Fusiona dos ideas probadas para crear un producto original.",
      color: "#A78BFA",
    },
  ];

  // Animación de tokens viajando de captura → Figma
  const travel = clampInterp(frame, [26, 98], [0, 1], EASE_CINEMATIC);

  return (
    <BeatCameraV4
      durationInFrames={240}
      accent={palette.secondary}
      poses={[
        { frame: 0, x: -34, y: 0, scale: 1.03, rotate: -0.4 },
        { frame: 32, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 120, x: 10, y: -10, scale: 1.02, rotate: 0.25 },
        { frame: 240, x: 18, y: -18, scale: 1.038, rotate: 0.35 },
      ]}
    >
      <SoundEffectV4 file="whoosh-short.mp3" from={0} volume={0.48} />
      <SoundEffectV4 file="pop.mp3" from={22} volume={0.38} />
      <SoundEffectV4 file="click-soft.mp3" from={95} volume={0.4} />
      <SoundEffectV4 file="ping.mp3" from={168} volume={0.42} />

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
          badge="PASO 1 · INSPIRACIÓN"
          accent={palette.secondary}
          secondary={palette.accent}
          logoFile="figma.svg"
          title="Roba como un *artista*"
          sub="Analiza referencias reales y extrae tus tokens visuales en Figma."
          heroTitleSize={98}
          dockFrame={18}
          dockScale={0.88}
          startYOffset={120}
        />

        {/* Franja interactiva: Captura real -> extracción de tokens -> Figma */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 26px",
            borderRadius: 26,
            background: "rgba(12, 22, 38, 0.86)",
            border: `1.5px solid ${palette.secondary}66`,
            opacity: barEnter,
            translate: `0px ${(1 - barEnter) * 28}px`,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 118,
                height: 76,
                borderRadius: 14,
                overflow: "hidden",
                border: "1.5px solid rgba(255,255,255,0.22)",
              }}
            >
              <Img
                src={staticFile("assets/the_last_endo_live.png")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 21, color: "#94A3B8" }}>
                REFERENCIA
              </div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>Design Tokens</div>
            </div>
          </div>

          {/* Swatches viajando hacia Figma */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {["#34D399", "#38BDF8", "#A78BFA"].map((c, idx) => (
              <div
                key={c}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: c,
                  border: "2px solid rgba(255,255,255,0.5)",
                  boxShadow: `0 0 22px ${c}99`,
                  translate: `${(travel - 0.5) * 28}px ${Math.sin((frame + idx * 14) / 10) * 4}px`,
                }}
              />
            ))}
            <SvgArrowRight size={34} color={palette.secondary} />
          </div>

          <BrandChipV4 file="figma.svg" size={44} glow={palette.secondary} delay={18} label="Figma" />
        </div>

        {/* 3 tarjetas grandes de ancho completo con Rack-Focus secuencial */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {steps.map((item, idx) => {
            const isFocus = activeStep === idx;
            return (
              <RackFocusCardV4
                key={item.num}
                accent={item.color}
                focusAmount={isFocus ? 1 : 0}
                maxBlur={2.4}
                delay={14 + idx * 8}
                padding="30px 32px"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 26,
                }}
              >
                <div
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: 22,
                    background: `${item.color}20`,
                    border: `2px solid ${item.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_MONO,
                    fontSize: 36,
                    fontWeight: 900,
                    color: item.color,
                    flexShrink: 0,
                  }}
                >
                  {item.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.12, color: "#FFFFFF" }}>
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: 29,
                      lineHeight: 1.3,
                      color: "#CBD5E1",
                      marginTop: 8,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
                {isFocus && <SvgCheck size={38} color={item.color} />}
              </RackFocusCardV4>
            );
          })}
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 3: LÓGICA · EMPUJE ELÁSTICO ANTIGRAVITY → OPENCODE (360f / 6.0s)
// =====================================================================
const Beat3Logica: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palette = STACK1_V4_PALETTE;

  // Fase 1 (0–155f): Antigravity construye el 85%
  const buildPct = clampInterp(frame, [52, 138], [0, 85], EASE_CINEMATIC);

  // Fase 2 (155f+): Opencode sube empujando la terminal hacia arriba + rack-focus
  const pushProgress = spring({
    frame: frame - 155,
    fps,
    config: SPRING_CARD,
  });

  const tokenCount = Math.floor(clampInterp(frame, [175, 295], [0, 1200], EASE_CINEMATIC));
  const terminalFocus = 1 - pushProgress * 0.82;

  return (
    <BeatCameraV4
      durationInFrames={360}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 0, y: 20, scale: 1.03, rotate: 0 },
        { frame: 35, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 155, x: 0, y: 6, scale: 1.015, rotate: -0.2 },
        { frame: 235, x: -8, y: -18, scale: 1.045, rotate: 0.25 },
        { frame: 360, x: 0, y: -26, scale: 1.06, rotate: 0 },
      ]}
    >
      <SoundEffectV4 file="whoosh.mp3" from={0} volume={0.48} />
      <SoundEffectV4 file="typing.mp3" from={20} volume={0.34} />
      <SoundEffectV4 file="key-press.mp3" from={52} volume={0.32} />
      <SoundEffectV4 file="chime.mp3" from={136} volume={0.48} />
      <SoundEffectV4 file="whoosh-short.mp3" from={155} volume={0.45} />
      <SoundEffectV4 file="pop.mp3" from={176} volume={0.42} />
      <SoundEffectV4 file="sparkle.mp3" from={290} volume={0.42} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 22,
        }}
      >
        <DockingHeaderV4
          badge="PASO 2 · MOTOR DE LÓGICA"
          accent={palette.accent}
          secondary={palette.secondary}
          logoFile="opencode.svg"
          title="Antigravity + *Opencode*"
          sub="Antigravity levanta el 85% base y Opencode pule detalles ahorrando tokens."
          heroTitleSize={94}
          dockFrame={16}
          dockScale={0.86}
          startYOffset={90}
        />

        {/* Escenario de Empuje Elástico */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 22,
            position: "relative",
          }}
        >
          {/* Tarjeta 1: Terminal Antigravity (sube y entra en DOF suave cuando llega Opencode) */}
          <div
            style={{
              translate: `0px ${-pushProgress * 18}px`,
              scale: `${1 - pushProgress * 0.045}`,
              rotate: `${-pushProgress * 0.8}deg`,
              transformOrigin: "center top",
            }}
          >
            <LiveTerminalV4
              title="antigravity-cli ~ build"
              accent={palette.accent}
              statusLabel="85% BASE"
              fontSize={34}
              focusAmount={terminalFocus}
              delay={12}
              progressPercent={buildPct}
              lines={[
                {
                  text: 'agy build --mechanics="stealth"',
                  startFrame: 18,
                  durationFrames: 42,
                  isPrompt: true,
                },
                {
                  text: "Arquitectura y lógica base listas",
                  startFrame: 78,
                  durationFrames: 34,
                  isSuccess: true,
                },
              ]}
            />
          </div>

          {/* Tarjeta 2: Opencode entra empujando desde abajo y se vuelve el foco cristalino */}
          <div
            style={{
              opacity: pushProgress,
              translate: `0px ${(1 - pushProgress) * 160}px`,
              scale: `${0.9 + pushProgress * 0.1}`,
            }}
          >
            <RackFocusCardV4
              accent={palette.secondary}
              focusAmount={pushProgress}
              padding="34px 34px"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <BrandChipV4 file="opencode.svg" size={44} glow={palette.secondary} delay={160} />
                  <div>
                    <div style={{ fontSize: 40, fontWeight: 800, color: "#FFFFFF" }}>
                      Opencode · Poda Fina
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 24,
                        color: "#94A3B8",
                        marginTop: 4,
                      }}
                    >
                      Graphify AST · 0 errores de sintaxis
                    </div>
                  </div>
                </div>
              </div>

              {/* Contador masivo de tokens ahorrados */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "26px 30px",
                  borderRadius: 22,
                  background: `${palette.secondary}16`,
                  border: `2px solid ${palette.secondary}88`,
                  boxShadow: `0 0 40px -10px ${palette.secondary}66`,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 23,
                      fontWeight: 700,
                      color: palette.secondary,
                      letterSpacing: "0.08em",
                    }}
                  >
                    AHORRO REAL DE CONTEXTO
                  </div>
                  <div style={{ fontSize: 28, color: "#E2E8F0", marginTop: 6 }}>
                    Solo envía nodos clave del código
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 82,
                    fontWeight: 900,
                    color: palette.secondary,
                    lineHeight: 1,
                    textShadow: `0 0 36px ${palette.secondary}66`,
                  }}
                >
                  -{tokenCount}
                  <span style={{ fontSize: 32, marginLeft: 8 }}>TKN</span>
                </div>
              </div>
            </RackFocusCardV4>
          </div>
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 4: ARTE · CORTINA LÁSER ANTES/DESPUÉS REMOVE BG (300f / 5.0s)
// =====================================================================
const Beat4Arte: React.FC = () => {
  const frame = useCurrentFrame();
  const palette = STACK1_V4_PALETTE;
  const cardEnter = useSpringV4(14, SPRING_CARD);
  const flowEnter = useSpringV4(95, SPRING_SOFT);

  // Barrido suave ida y vuelta sutil para mostrar el antes y después vivo
  const wipePct = clampInterp(frame, [44, 178], [8, 92], EASE_CINEMATIC);
  const spriteZoom = clampInterp(frame, [14, 300], [1.02, 1.11]);

  return (
    <BeatCameraV4
      durationInFrames={300}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 24, y: 10, scale: 1.04, rotate: 0.4 },
        { frame: 32, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 165, x: -8, y: -10, scale: 1.03, rotate: -0.2 },
        { frame: 300, x: 4, y: -16, scale: 1.045, rotate: 0.15 },
      ]}
    >
      <SoundEffectV4 file="whoosh-short.mp3" from={0} volume={0.48} />
      <SoundEffectV4 file="sparkle.mp3" from={46} volume={0.48} />
      <SoundEffectV4 file="notification.mp3" from={176} volume={0.44} />

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
          badge="PASO 3 · ARTE & SPRITES"
          accent={palette.accent}
          secondary="#A78BFA"
          logoFile="nanobanana.svg"
          title="Nano Banana + *Remove BG*"
          sub="Genera sprites con IA y deja el fondo transparente en un solo clic."
          heroTitleSize={92}
          dockFrame={16}
          dockScale={0.86}
          startYOffset={100}
        />

        {/* Escenario vertical grande con cortina láser Antes / Después */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            opacity: cardEnter,
            translate: `0px ${(1 - cardEnter) * 56}px`,
          }}
        >
          <div
            style={{
              flex: 1,
              minHeight: 620,
              borderRadius: 30,
              overflow: "hidden",
              position: "relative",
              border: `2px solid ${palette.accent}88`,
              boxShadow: `0 38px 90px -15px rgba(0,0,0,0.75), 0 0 46px -10px ${palette.accent}55`,
              background: "#0B1120",
            }}
          >
            {/* CAPA DERECHA (REVELADA): Cuadrícula Alpha PNG + Sprite limpio brillante */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(45deg, #1E293B 25%, transparent 25%), linear-gradient(-45deg, #1E293B 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1E293B 75%), linear-gradient(-45deg, transparent 75%, #1E293B 75%)",
                backgroundSize: "48px 48px",
                backgroundPosition: "0 0, 0 24px, 24px -24px, -24px 0px",
                backgroundColor: "#0F172A",
              }}
            >
              <Img
                src={staticFile("assets/endo_sprite.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  scale: `${spriteZoom}`,
                  filter: "contrast(1.12) saturate(1.22) drop-shadow(0 0 24px rgba(52,211,153,0.45))",
                }}
              />
              {/* Badge PNG Alpha */}
              <div
                style={{
                  position: "absolute",
                  top: 26,
                  right: 26,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 22px",
                  borderRadius: 999,
                  background: "rgba(6, 20, 15, 0.92)",
                  border: `2px solid ${palette.accent}`,
                  fontFamily: FONT_MONO,
                  fontSize: 23,
                  fontWeight: 800,
                  color: palette.accent,
                }}
              >
                <SvgScissors size={24} color={palette.accent} />
                PNG TRANSPARENTE
              </div>
            </div>

            {/* CAPA IZQUIERDA (ANTES): Sprite original sin recortar (clip-path dinámico) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: `inset(0 ${wipePct}% 0 0)`,
              }}
            >
              <Img
                src={staticFile("assets/endo_sprite.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  scale: `${spriteZoom}`,
                  filter: "saturate(0.75) brightness(0.76) blur(1.2px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 26,
                  left: 26,
                  padding: "12px 22px",
                  borderRadius: 999,
                  background: "rgba(15, 23, 42, 0.92)",
                  border: "1.5px solid rgba(255,255,255,0.28)",
                  fontFamily: FONT_MONO,
                  fontSize: 23,
                  fontWeight: 800,
                  color: "#CBD5E1",
                }}
              >
                AI RAW · CON FONDO
              </div>
            </div>

            {/* Haz láser divisor */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${100 - wipePct}%`,
                width: 6,
                marginLeft: -3,
                background: palette.accent,
                boxShadow: `0 0 32px 10px ${palette.accent}`,
              }}
            />

            {/* Destello de icono en el borde del láser */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${100 - wipePct}%`,
                translate: "-50% -50%",
                width: 62,
                height: 62,
                borderRadius: "50%",
                background: "rgba(6, 18, 13, 0.96)",
                border: `2.5px solid ${palette.accent}`,
                boxShadow: `0 0 30px ${palette.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SvgSparkle size={30} color={palette.accent} />
            </div>
          </div>

          {/* Cadena visual inferior: Nano Banana -> Remove BG -> Canvas 60 FPS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 26px",
              borderRadius: 24,
              background: "rgba(12, 22, 36, 0.88)",
              border: `1.5px solid ${palette.accent}55`,
              opacity: flowEnter,
              translate: `0px ${(1 - flowEnter) * 24}px`,
            }}
          >
            <BrandChipV4 file="nanobanana.svg" size={38} glow={palette.accent} delay={96} label="Nano Banana" />
            <SvgArrowRight size={32} color={palette.accent} />
            <PillBadgeV4
              text="Remove BG"
              color={palette.secondary}
              delay={106}
              icon={<SvgScissors size={24} color={palette.secondary} />}
            />
            <SvgArrowRight size={32} color={palette.accent} />
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 25,
                fontWeight: 800,
                color: palette.accent,
              }}
            >
              LISTO 60 FPS
            </div>
          </div>
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 5: CTA COMUNIDAD · COMENTARIO + DM EN VIVO (300f / 5.0s)
// =====================================================================
const Beat5Cta: React.FC = () => {
  const palette = STACK1_V4_PALETTE;

  return (
    <BeatCameraV4
      durationInFrames={300}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 0, y: 18, scale: 1.05, rotate: 0 },
        { frame: 28, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 180, x: 0, y: -10, scale: 1.022, rotate: 0.2 },
        { frame: 300, x: 0, y: -16, scale: 1.038, rotate: 0 },
      ]}
    >
      <SoundEffectV4 file="impact-bass-2.mp3" from={0} volume={0.52} />
      <SoundEffectV4 file="sparkle.mp3" from={24} volume={0.44} />
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
          badge="PARTE 2 DISPONIBLE · MCP"
          accent={palette.accent}
          secondary={palette.secondary}
          logoFile="antigravity.svg"
          title="Guarda *este video*"
          sub="En la Parte 2: cómo automatizo bases de datos y GitHub con MCP."
          heroTitleSize={98}
          dockFrame={14}
          dockScale={0.86}
          startYOffset={60}
        />

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <InteractiveCtaV4
            keyword="STACK"
            headline="¿Quieres la plantilla completa y mis prompts maestros?"
            dmTitle="DM de @santi.dev"
            dmSubtitle="Plantilla + Stack Secreto enviado"
            accent={palette.accent}
            darkTextColor="#040D0A"
            logos={["antigravity.svg", "figma.svg", "opencode.svg"]}
            delay={10}
          />
        </div>
      </div>
    </BeatCameraV4>
  );
};

function interpolateTilt(
  frame: number,
  start: number,
  end: number,
  from: number,
  to: number
): number {
  return clampInterp(frame, [start, end], [from, to], EASE_CINEMATIC);
}
