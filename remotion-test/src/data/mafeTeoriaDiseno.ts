/**
 * =====================================================================
 * MAFE.DISENO · TEORÍA DEL DISEÑO Y SEMIÓTICA VISUAL (UCAB)
 * =====================================================================
 * Video Cinético Vertical 1080x1920 @ 60 FPS
 * Arquitectura de Retención 5 Beats:
 *  - Hook: Los objetos cotidianos hablan (Vehículos de comunicación)
 *  - Beat 2: Significante vs Significado (Saussure) & Roland Barthes
 *  - Beat 3: Leyes de Gestalt y Regla de los 3 Segundos
 *  - Beat 4: Affordance vs Signifier & Mapping de Donald Norman
 *  - Beat 5: CTA Modelo Oficial de Examen UCAB
 * =====================================================================
 */
import type { ReelProps } from "../lib/schema";

export const mafeTeoriaDisenoData: ReelProps = {
  brand: "mafe_diseno",
  kicker: "MAFE VALDERRAMA · DISEÑO INTEGRAL UCAB",
  showVoiceover: false,
  scenes: [
    {
      type: "hero",
      badge: "SEMIÓTICA VISUAL UCAB",
      kicker: "TEORÍA DEL DISEÑO",
      title: "¿Por qué los objetos cotidianos *nos hablan*?",
      sub: "No solo cumplen una función: transmiten estatus, valores y normas culturales.",
      vo: "Los objetos no solo funcionan: comunican cultura.",
      showLogo: true,
      logoMode: "full",
      durationFrames: 200, // 3.33s
    },
    {
      type: "points",
      badge: "SAUSSURE & BARTHES",
      title: "Anatomía del *signo y códigos*",
      sub: "Todo artefacto opera en dos planos inseparables según la semiótica:",
      points: [
        { label: "Significante (Plano Material)", desc: "Lo físico tangible: plástico PET, tapa azul, forma y textura." },
        { label: "Significado (Plano Mental)", desc: "El concepto cultural activado: frescura, salud y pureza." },
        { label: "Denotación vs Connotación", desc: "Lo literal observable frente a la carga simbólica e ideológica." },
      ],
      icons: ["assets/drive_icon.svg", "assets/docs_icon.svg"],
      vo: "Significante material y significado conceptual en cada diseño.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "showcase",
      badge: "PSICOLOGÍA DE LA PERCEPCIÓN",
      title: "Leyes de la *Gestalt*",
      sub: "El cerebro organiza estímulos antes de pensar: regla de los 3 segundos.",
      image: "assets/whiteboard_notes.jpg",
      imageCaption: "Proximidad, Semejanza, Cierre, Pregnancia y Figura-Fondo",
      icons: ["assets/slides_icon.svg"],
      showLogo: true,
      vo: "Tu cerebro organiza formas antes de que puedas leer.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "points",
      badge: "DONALD NORMAN & USABILIDAD",
      title: "Affordance, *Signifiers* & Mapeo",
      sub: "Cómo orientan los objetos sin necesidad de instrucciones escritas:",
      points: [
        { label: "Affordance (Prestación)", desc: "Propiedad física real: una placa invita a empujar, un pomo a jalar." },
        { label: "Signifier (Señalizador)", desc: "Pista añadida por el diseñador: el rótulo explícito 'Empuje'." },
        { label: "Mapping Natural", desc: "La geometría de los controles replica su efecto en el mundo real." },
      ],
      icons: ["assets/meet_icon.svg", "assets/sheets_icon.svg"],
      vo: "El buen diseño no necesita manual de instrucciones.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "cta",
      badge: "REPASO INTEGRAL",
      title: "Domina el modelo de examen de *DISEÑO*",
      keyword: "DISEÑO UCAB",
      line: "30 preguntas calibradas, flashcards y audio-guías en tu Centro de Productividad.",
      vo: "Prepárate con el simulador de examen en tu Centro de Productividad.",
      durationFrames: 200, // 3.33s
    },
  ],
};
