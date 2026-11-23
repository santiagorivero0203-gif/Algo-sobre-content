/**
 * =====================================================================
 * ESCENAS MODULARES DE SIMADI PROMO V2 (VIDEO 1 Y VIDEO 2)
 * =====================================================================
 * Despacha todas las escenas de `promo-spec.json` (Simulacro Cronometrado)
 * y `promo-spec-guias.json` (Guías Estructuradas y Estudio Adaptado),
 * garantizando escaneo en 3 segundos, iconos SVG y aclaratoria Beta.
 * =====================================================================
 */
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_SANS } from "../../lib/theme";
import { Slide } from "./BaseWrappers";
import {
  ChaosVsOrderDiagram,
  CompanionPillarsDiagram,
  DmCtaShowcase,
  PressureVsControlDiagram,
  SimadiIcon,
  ThreePillarsDiagram,
} from "./SimadiIcons";
import { SmartBrowserStage } from "./SmartBrowserStage";
import type { CaptureManifest, FormatMetrics, SceneSpec, SimadiIconName, SimadiThemeJson } from "./types";

interface SceneRendererProps {
  scene: SceneSpec;
  theme: SimadiThemeJson;
  manifest: CaptureManifest;
  metrics: FormatMetrics;
}

const FeaturePillsRow: React.FC<{
  items: Array<{ icon: SimadiIconName; text: string }>;
  metrics: FormatMetrics;
}> = ({ items, metrics }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: metrics.isIg ? 12 : 16,
        marginTop: metrics.isIg ? 12 : 18,
      }}
    >
      {items.map((item, idx) => {
        const p = spring({
          frame: frame - (14 + idx * 10),
          fps,
          config: { damping: 16, stiffness: 180, mass: 0.65 },
        });
        return (
          <div
            key={item.text}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: metrics.isIg ? "8px 16px" : "10px 20px",
              borderRadius: 999,
              background: "rgba(15, 23, 42, 0.78)",
              border: "1.5px solid rgba(56, 189, 248, 0.44)",
              boxShadow: "0 10px 24px rgba(2, 6, 23, 0.35)",
              opacity: p,
              transform: `translateY(${(1 - p) * 14}px) scale(${0.92 + p * 0.08})`,
            }}
          >
            <SimadiIcon name={item.icon} size={18} color="#38BDF8" />
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: metrics.isIg ? 19 : 22,
                fontWeight: 700,
                color: "#F8FAFC",
              }}
            >
              {item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const SimadiSceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  theme,
  manifest,
  metrics,
}) => {
  switch (scene.id) {
    // -----------------------------------------------------------------
    // VIDEO 1 · SIMULACRO CRONOMETRADO Y DIAGNÓSTICO
    // -----------------------------------------------------------------
    case "s1_hook":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics} immediate>
          <PressureVsControlDiagram theme={theme} metrics={metrics} />
          <FeaturePillsRow
            metrics={metrics}
            items={[
              { icon: "timer", text: "Cronómetro oficial" },
              { icon: "book-open", text: "+700 ejercicios" },
            ]}
          />
        </Slide>
      );

    case "s2_estrategia":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <ThreePillarsDiagram theme={theme} metrics={metrics} />
        </Slide>
      );

    case "s3_demo_config":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <SmartBrowserStage
            scene={scene}
            theme={theme}
            manifest={manifest}
            metrics={metrics}
            focusLabel="Preguntas y tiempo"
            secondaryLabel="Iniciar Prueba"
          />
          <FeaturePillsRow
            metrics={metrics}
            items={[
              { icon: "sliders", text: "A tu propio ritmo" },
              { icon: "layers", text: "4 áreas del T.D.I." },
            ]}
          />
        </Slide>
      );

    case "s4_demo_simulacro":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <SmartBrowserStage
            scene={scene}
            theme={theme}
            manifest={manifest}
            metrics={metrics}
            focusLabel="Cronómetro en vivo"
            secondaryLabel="Respuesta en práctica"
          />
          <FeaturePillsRow
            metrics={metrics}
            items={[
              { icon: "timer", text: "Control de minutos" },
              { icon: "check", text: "Condiciones reales" },
            ]}
          />
        </Slide>
      );

    case "s5_demo_diagnostico":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <SmartBrowserStage
            scene={scene}
            theme={theme}
            manifest={manifest}
            metrics={metrics}
            focusLabel="Aciertos y puntaje"
            secondaryLabel="Justificación lógica"
          />
          <FeaturePillsRow
            metrics={metrics}
            items={[
              { icon: "chart-bar", text: "Progreso por área" },
              { icon: "check", text: "Explicación clara" },
            ]}
          />
        </Slide>
      );

    case "s6_cta":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <DmCtaShowcase
            theme={theme}
            metrics={metrics}
            dmText="¿Tienes dudas? Escríbeme al DM"
          />
        </Slide>
      );

    // -----------------------------------------------------------------
    // VIDEO 2 · GUÍAS ESTRUCTURADAS Y APOYO AL PREUNIVERSITARIO
    // -----------------------------------------------------------------
    case "g1_hook":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics} immediate>
          <ChaosVsOrderDiagram theme={theme} metrics={metrics} />
          <FeaturePillsRow
            metrics={metrics}
            items={[
              { icon: "book-open", text: "Temario unificado" },
              { icon: "shield-info", text: "En fase Beta" },
            ]}
          />
        </Slide>
      );

    case "g2_estrategia":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <CompanionPillarsDiagram theme={theme} metrics={metrics} />
        </Slide>
      );

    case "g3_demo_guias":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <SmartBrowserStage
            scene={scene}
            theme={theme}
            manifest={manifest}
            metrics={metrics}
            focusLabel="Guías por materia"
            secondaryLabel="Temas clave"
          />
          <FeaturePillsRow
            metrics={metrics}
            items={[
              { icon: "book-open", text: "Verbal y Numérico" },
              { icon: "layers", text: "Ciencia y Tecnología" },
            ]}
          />
        </Slide>
      );

    case "g4_demo_temas":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <SmartBrowserStage
            scene={scene}
            theme={theme}
            manifest={manifest}
            metrics={metrics}
            focusLabel="Filtra por tema"
            secondaryLabel="Comienza a repasar"
          />
          <FeaturePillsRow
            metrics={metrics}
            items={[
              { icon: "sliders", text: "Sesiones personalizadas" },
              { icon: "check", text: "Sin material disperso" },
            ]}
          />
        </Slide>
      );

    case "g5_demo_justificacion":
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <SmartBrowserStage
            scene={scene}
            theme={theme}
            manifest={manifest}
            metrics={metrics}
            focusLabel="Desglose por pregunta"
            secondaryLabel="Tu avance real"
          />
          <FeaturePillsRow
            metrics={metrics}
            items={[
              { icon: "chart-bar", text: "Aciertos y errores" },
              { icon: "book-open", text: "Repaso dirigido" },
            ]}
          />
        </Slide>
      );

    case "g6_cta":
    default:
      return (
        <Slide scene={scene} theme={theme} metrics={metrics}>
          <DmCtaShowcase
            theme={theme}
            metrics={metrics}
            dmText="¿Dudas de la Beta? Escríbeme al DM"
          />
        </Slide>
      );
  }
};
