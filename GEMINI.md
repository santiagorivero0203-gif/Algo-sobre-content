# GEMINI.md · Reglas Editoriales y Técnicas para Santi.Dev

## 🎯 Reglas Globales de Contenido para Videos y Carruseles

### 1. Contenido Autoconclusivo (Self-Contained)
- Cada video o carrusel debe funcionar como una pieza completa e independiente.
- Cualquier usuario que descubra el contenido en su feed (sin contexto previo) debe entender el problema, la solución técnica y la conclusión sin vacíos.
- Todo término técnico o herramienta mencionada (Opencode, Graphify, Stitch MCP, HWID) debe justificarse con su beneficio práctico directo en una frase clara.

### 2. Coherencia Narrativa
- Mantener una progresión lógica estricta:
  1. **Hook:** Dolor o pregunta que detiene el scroll.
  2. **Estrategia:** La lógica detrás de la solución.
  3. **Táctica / Código:** Demostración práctica (comparativas, pasos o terminal).
  4. **CTA:** Llamado a la acción claro y comunitario.
- Un solo foco temático por carrusel.

### 3. Cero Sobrecontextualización (Preservación del Gancho)
- No sobreexplicar ni escribir muros de texto. La sobrecontextualización destruye la retención del video.
- Cada slide debe ser escaneable en 3 segundos:
  - Titulares cortos con énfasis (`*resaltado*`).
  - Textos de máximo 2 a 3 líneas.
  - Uso obligatorio de iconografía SVG, badges y esquemas visuales.
- Ir directo al grano: eliminar introducciones académicas y pasar directamente a la solución accionable.

### 4. Estándares Técnicos de Código
- Todo código nuevo debe estar documentado.
- Reutilizar inteligentemente los componentes ya creados (`CardFrame`, `Backdrop`, `TopBand`, `BottomBand`, `Slide`, `GridPattern`).
- Mantener la fidelidad visual de exportación a 1080×1920 (TikTok) y 1080×1350 (Instagram).
