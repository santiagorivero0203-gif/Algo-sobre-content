/**
 * =====================================================================
 * SANTI.DEV · TEMAS, FONDOS DINÁMICOS Y UTILIDADES VISUALES
 * =====================================================================
 * Controla la identidad gráfica de cada video:
 *   - Paleta de color (acento, tinta de contraste, marcador translúcido).
 *   - Elementos técnicos y gaming del fondo generados con semilla.
 *   - Bandas contextuales (superior e inferior).
 *   - Funciones matemáticas reproducibles (PRNG mulberry32).
 * =====================================================================
 */

// Definición oficial de formatos: TikTok (9:16) e Instagram Feed (4:5)
window.FORMATS = {
    tiktok: {
        id: 'tiktok',
        name: 'TikTok / Reels',
        ratioLabel: '9:16',
        w: 405,
        h: 720,
        outW: 1080,
        outH: 1920,
        scale: 2.6666666667,
        icon: 'fa-brands fa-tiktok',
        tag: 'Vertical 9:16 · 1080×1920',
        desc: 'Optimizado para video vertical, carruseles de fotos en TikTok y reels con HUD gaming extendido.',
    },
    instagram: {
        id: 'instagram',
        name: 'Instagram Feed',
        ratioLabel: '4:5',
        w: 405,
        h: 506.25, // 405 * (5/4) = 506.25 -> 506.25 * (1080/405) = 1350 px exactos
        outW: 1080,
        outH: 1350,
        scale: 2.6666666667,
        icon: 'fa-brands fa-instagram',
        tag: 'Feed Retrato 4:5 · 1080×1350',
        desc: 'Proporción estándar de máximo impacto para el feed de Instagram, márgenes limpios y estética editorial.',
    },
};

// Retrocompatibilidad con window.EXPORT
window.EXPORT = window.FORMATS.tiktok;

window.BG_INK = '#6e6e6e';
window.OK_GREEN = '#2E9D63';
window.BAD_RED = '#E0473C';

window.pad = (n) => String(n).padStart(2, '0');
window.sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Generador de números pseudoaleatorios con semilla (mulberry32). */
window.rng = (seed) => () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Baraja un arreglo de forma determinista para la slide. */
window.shuffle = (arr, rand) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

/** Elementos visuales gaming compartidos. */
const GAME_BITS = [
    { k: 'tag', text: 'PRESS START' },
    { k: 'tag', text: 'GG' },
    { k: 'hp' },
    { k: 'keys' },
    { k: 'glyphs' },
    { k: 'pixel' },
    { k: 'icon', name: 'gamepad' },
    { k: 'icon', name: 'cursor' },
];

/** Elementos de código de apoyo para los fondos. */
const CODE_BITS = [
    { k: 'tag', text: '</>' },
    { k: 'code', text: '// TODO: dormir' },
    { k: 'tag', text: '200 OK' },
];

window.THEMES = {
    stack1: {
        tag: 'TRILOGÍA · PARTE 1',
        accent: '#2E9D63', ink: '#FFFFFF',
        mark: 'rgba(46,157,99,.38)', codeKw: '#57c78d',
        ctaIcon: 'gamepad',
        backdrop: [
            { k: 'code', text: '// De la idea al código' },
            { k: 'tag', text: 'IDEA -> PROYECTO' },
            { k: 'code', text: '$ npx create-app' },
            { k: 'tag', text: 'SIN PROGRAMAR' },
            ...GAME_BITS, ...CODE_BITS,
        ],
    },
    stack2: {
        tag: 'TRILOGÍA · PARTE 2',
        accent: '#F08A35', ink: '#111111',
        mark: 'rgba(240,138,53,.38)', codeKw: '#f39e56',
        ctaIcon: 'gear',
        backdrop: [
            { k: 'code', text: 'mcp.connect("supabase")' },
            { k: 'tag', text: 'MCP AUTO' },
            { k: 'code', text: '$ git push origin main' },
            { k: 'tag', text: 'CI/CD ACTIVO' },
            ...GAME_BITS, ...CODE_BITS,
        ],
    },
    stack3: {
        tag: 'TRILOGÍA · PARTE 3',
        accent: '#E0473C', ink: '#FFFFFF',
        mark: 'rgba(224,71,60,.38)', codeKw: '#ea6f66',
        ctaIcon: 'sparkle',
        backdrop: [
            { k: 'code', text: '// Planifica antes de pedir' },
            { k: 'tag', text: 'ARQUITECTO IA' },
            { k: 'code', text: 'prompt.plan({ modules: 4 })' },
            { k: 'tag', text: 'MODULAR PRO' },
            ...GAME_BITS, ...CODE_BITS,
        ],
    },
    endo: {
        tag: 'CASO 01 · GAMING',
        accent: '#EE6A3E', ink: '#111111',
        mark: 'rgba(238,106,62,.42)', codeKw: '#F0875F',
        ctaIcon: 'gamepad',
        backdrop: [
            { k: 'code', text: 'experiencia.generaTension()' },
            { k: 'code', text: 'jugador.inmersion = 100;' },
            { k: 'code', text: '$ aseprite -b endo.ase' },
            { k: 'tag', text: 'PITCH GANADOR' },
            { k: 'tag', text: '1ST PLACE' },
            ...GAME_BITS, ...CODE_BITS,
        ],
    },
    mova: {
        tag: 'CASO 02 · PRODUCTO & IA',
        accent: '#4262DC', ink: '#FFFFFF',
        mark: 'rgba(66,98,220,.28)', codeKw: '#8EA2F5',
        ctaIcon: 'hand',
        backdrop: [
            { k: 'code', text: 'tecnologia.alServicioHumano()' },
            { k: 'code', text: 'ui.hazlaSimple();' },
            { k: 'code', text: '$ npx cap sync ios' },
            { k: 'tag', text: 'IMPACTO SOCIAL' },
            { k: 'icon', name: 'hand' },
            ...GAME_BITS, ...CODE_BITS,
        ],
    },
    gira: {
        tag: 'CASO 03 · CLIENTES & NEGOCIOS',
        accent: '#EDB828', ink: '#111111',
        mark: 'rgba(237,184,40,.55)', codeKw: '#F2C94C',
        ctaIcon: 'book',
        backdrop: [
            { k: 'code', text: 'cliente.tiempoAhorrado += 40;' },
            { k: 'code', text: '$ vercel --prod' },
            { k: 'icon', name: 'database' },
            { k: 'tag', text: 'ENTREGA EXPRESS' },
            { k: 'tag', text: 'CLIENTE FELIZ' },
            ...GAME_BITS, ...CODE_BITS,
        ],
    },
    // Guía de herramientas: violeta mate (no se repite con ningún otro video)
    agy: {
        tag: 'GUÍA · ANTIGRAVITY',
        band: 'GUÍA COMPLETA · ANTIGRAVITY', // reemplaza "CASO 0X" en la banda superior
        accent: '#6C4FE0', ink: '#FFFFFF',
        mark: 'rgba(108,79,224,.30)', codeKw: '#A18CF5',
        ctaIcon: 'terminal',
        backdrop: [
            { k: 'code', text: '$ agy' },
            { k: 'code', text: '/help' },
            { k: 'tag', text: 'PLANNING MODE' },
            { k: 'code', text: 'mcp: stitch' },
            { k: 'tag', text: 'AGENT MODE' },
            { k: 'icon', name: 'terminal' },
            ...GAME_BITS, ...CODE_BITS,
        ],
    },
    // Ventajas y superpoderes: azul eléctrico / cielo (estilo VS Code + IA futurista)
    agy_power: {
        tag: 'HERRAMIENTAS · SUPERPODERES',
        band: 'VENTAJAS · ANTIGRAVITY',
        accent: '#0EA5E9', ink: '#FFFFFF',
        mark: 'rgba(14,165,233,.32)', codeKw: '#38BDF8',
        ctaIcon: 'layers',
        backdrop: [
            { k: 'code', text: '// Based on VS Code core' },
            { k: 'tag', text: 'VS CODE NATIVE' },
            { k: 'code', text: '$ agy --autonomous' },
            { k: 'tag', text: 'BROWSER AGENT' },
            { k: 'code', text: 'mcp.connect("figma")' },
            { k: 'tag', text: 'SUBAGENTS 2.0' },
            ...GAME_BITS, ...CODE_BITS,
        ],
    },
};

/**
 * Coordenadas estratégicas de los elementos de fondo adaptadas al layout activo.
 * Garantiza que NINGÚN elemento quede tapado por una tarjeta o cortado a la mitad.
 */
window.SLOTS_BY_LAYOUT = {
    low: [
        // TopBand ocupa y=0..138 (header en y=12..28, título en y=75..128)
        // La tarjeta ocupa y=138..694. Margen inferior limpio y=695..720 (26px)
        { x: 215, y: 15 },
        { x: 24,  y: 44 },
        { x: 240, y: 44 },
        { x: 24,  y: 701 },
        { x: 240, y: 701 },
        { x: 8,   y: 420, r: -90 },
        { x: 397, y: 420, r: 90 },
    ],
    high: [
        // Tarjeta ocupa y=26..594. Margen superior limpio y=0..26.
        // BottomBand ocupa y=594..720.
        { x: 24,  y: 8 },
        { x: 240, y: 8 },
        { x: 24,  y: 604 },
        { x: 240, y: 604 },
        { x: 8,   y: 320, r: -90 },
        { x: 397, y: 320, r: 90 },
    ],
    float: [
        // Tarjeta flotante con amplios márgenes arriba (76px), abajo (76px) y lados (28px)
        { x: 28,  y: 22 },
        { x: 230, y: 22 },
        { x: 130, y: 46 },
        { x: 28,  y: 660 },
        { x: 230, y: 660 },
        { x: 130, y: 686 },
        { x: 12,  y: 360, r: -90 },
        { x: 393, y: 360, r: 90 },
    ],
    tilt: [
        // Tarjeta rotada con margen de 36px arriba y abajo
        { x: 24,  y: 12 },
        { x: 230, y: 12 },
        { x: 24,  y: 692 },
        { x: 230, y: 692 },
        { x: 10,  y: 460, r: -90 },
        { x: 395, y: 260, r: 90 },
    ],
    full: [
        // Tarjeta ocupa y=26..694. Margen superior limpio y=0..26, inferior y=694..720
        { x: 24,  y: 8 },
        { x: 230, y: 8 },
        { x: 24,  y: 701 },
        { x: 230, y: 701 },
        { x: 8,   y: 360, r: -90 },
        { x: 397, y: 360, r: 90 },
    ],
    split: [
        // Tarjeta partida: top card (y=22..158), bottom card (y=168..696)
        { x: 24,  y: 6 },
        { x: 230, y: 6 },
        { x: 24,  y: 702 },
        { x: 230, y: 702 },
        { x: 8,   y: 440, r: -90 },
        { x: 397, y: 440, r: 90 },
    ],
};

// Retrocompatibilidad
window.SLOTS = window.SLOTS_BY_LAYOUT.float;

/** Retorna estilos de tono para la tarjeta. */
window.toneOf = (theme, tone) => ({
    white:  { bg: '#FFFFFF', text: '#111111', sub: '#5f5f5f', box: '#F3F3F3', line: '#E6E6E6' },
    paper:  { bg: '#F5F2EB', text: '#111111', sub: '#5f5f5f', box: '#ECE8DE', line: '#DDD8CC' },
    accent: { bg: theme.accent, text: theme.ink, sub: theme.ink, box: 'rgba(255,255,255,.9)', line: theme.ink === '#FFFFFF' ? 'rgba(255,255,255,.45)' : 'rgba(0,0,0,.28)' },
}[tone || 'white']);

/** Convierte *palabras* en resaltado de rotulador. */
window.rich = (text, mark) => String(text).split(/(\*[^*]+\*)/g).map((part, i) =>
    part.length > 2 && part.startsWith('*') && part.endsWith('*')
        ? <span key={i} style={{ background: `linear-gradient(transparent 58%, ${mark} 58%)`, padding: '0 2px' }}>{part.slice(1, -1)}</span>
        : <React.Fragment key={i}>{part}</React.Fragment>
);

/** Resaltado sintáctico de código para CodeSlide. */
const TOKEN_RE = /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|\b(const|let|var|if|else|return|await|async|new|function|true|false|null)\b|\b(\d+(?:\.\d+)?)\b|([A-Za-z_$][\w$]*)(?=\s*\()/g;
window.highlight = (line, kw) => {
    const out = [];
    let last = 0;
    line.replace(TOKEN_RE, (match, com, str, kword, num, fn, offset) => {
        if (offset > last) out.push(line.slice(last, offset));
        let color = '#E6E6E6';
        if (com) color = '#737373';
        else if (str) color = '#A8C99C';
        else if (kword) color = kw;
        else if (num) color = '#E0A868';
        else if (fn) color = '#8BB2D9';
        out.push(<span key={offset} style={{ color }}>{match}</span>);
        last = offset + match.length;
        return match;
    });
    if (last < line.length) out.push(line.slice(last));
    return out;
};

/** Renderiza un elemento individual en el fondo. */
window.BgItem = ({ item, color }) => {
    switch (item.k) {
        case 'code':
            return <span className="font-mono text-[10px] tracking-tight whitespace-nowrap select-none" style={{ color }}>{item.text}</span>;
        case 'tag':
            return <span className="font-mono font-bold text-[9px] tracking-[.18em] px-2 py-0.5 rounded border select-none whitespace-nowrap" style={{ color, borderColor: color }}>{item.text}</span>;
        case 'hp':
            return (
                <div className="flex items-center gap-1 select-none">
                    <span className="font-mono text-[9px] font-bold" style={{ color }}>HP</span>
                    <div className="flex gap-0.5">
                        {[0, 1, 2, 3].map((i) => (
                            <span key={i} style={{ width: 10, height: 7, borderRadius: 1.5, background: i < 3 ? color : 'transparent', border: `1px solid ${color}` }} />
                        ))}
                    </div>
                </div>
            );
        case 'keys':
            return (
                <div className="flex gap-1 select-none">
                    {['W', 'A', 'S', 'D'].map((k) => (
                        <span key={k} className="w-4 h-4 rounded flex items-center justify-center font-mono text-[8px] font-bold" style={{ border: `1px solid ${color}`, color }}>{k}</span>
                    ))}
                </div>
            );
        case 'glyphs':
            return (
                <svg width="56" height="12" viewBox="0 0 70 14" fill="none" stroke={color} strokeWidth="1.5" style={{ display: 'block' }}>
                    <path d="M7 2l5.5 10h-11z" /><circle cx="25" cy="7" r="5" />
                    <path d="M38 2l10 10M48 2L38 12" /><rect x="57" y="2" width="10" height="10" />
                </svg>
            );
        case 'pixel':
            return <window.PixelArt map={window.PIXEL_HEART} size={24} palette={{ '#': color }} />;
        case 'icon':
            return <window.Icon name={item.name} size={22} color={color} stroke={1.6} />;
        default:
            return null;
    }
};

/** Fondo completo con semilla reproducible por slide (adaptable a TikTok 9:16 e Instagram 4:5). */
window.Backdrop = ({ theme, seed, layout, format = 'tiktok' }) => {
    const rand = window.rng(seed);
    const isIg = format === 'instagram';
    const scaleY = isIg ? (506.25 / 720) : 1;
    const baseSlots = window.SLOTS_BY_LAYOUT[layout] || window.SLOTS_BY_LAYOUT.float;
    if (!baseSlots.length) return null;
    const pool = window.shuffle(theme.backdrop, rand);
    const slots = window.shuffle(baseSlots, rand).slice(0, isIg ? 5 : 6);
    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            {slots.map((s, i) => {
                const targetY = isIg ? Math.round(s.y * scaleY) : s.y;
                return (
                    <div key={i} style={{
                        position: 'absolute', left: s.x, top: targetY,
                        transform: s.r ? `rotate(${s.r}deg)` : undefined,
                        transformOrigin: 'center center',
                    }}>
                        <window.BgItem item={pool[i % pool.length]} color={i === 0 ? theme.accent : window.BG_INK} />
                    </div>
                );
            })}
        </div>
    );
};

/** Indicador de progreso de slide. */
window.Progress = ({ meta, theme }) => (
    <div className="flex gap-1 shrink-0">
        {Array.from({ length: meta.total }).map((_, i) => (
            <span key={i} style={{ width: 14, height: 3, borderRadius: 2, background: i === meta.index ? theme.accent : '#333' }} />
        ))}
    </div>
);

/** Banda superior con número de caso y título (ajustada a TikTok o Instagram). */
window.TopBand = ({ video, theme, meta, format = 'tiktok' }) => {
    const isIg = format === 'instagram';
    return (
        <div className="absolute left-0 right-0 top-0 flex flex-col justify-end" style={{
            height: isIg ? 76 : 138,
            padding: isIg ? '0 18px 10px' : '0 24px 16px',
            zIndex: 5,
        }}>
            <div className="flex items-center justify-between mb-1 gap-2">
                <span className="font-mono text-[10px] tracking-[.18em] whitespace-nowrap truncate" style={{ color: '#8a8a8a' }}>{theme.band || `CASO ${window.pad(video.caseNo)} · ${theme.tag}`}</span>
                <window.Progress meta={meta} theme={theme} />
            </div>
            <div className={`font-black text-white leading-none tracking-tight truncate ${isIg ? 'text-[20px]' : 'text-[26px]'}`}>{video.title}</div>
        </div>
    );
};

/** Banda inferior con handle @santi.dev y llamada a deslizar/guardar (ajustada a TikTok o Instagram). */
window.BottomBand = ({ theme, meta, format = 'tiktok' }) => {
    const isIg = format === 'instagram';
    const isLast = meta.index === meta.total - 1;
    return (
        <div className="absolute left-0 right-0 bottom-0 flex items-center justify-between" style={{
            height: isIg ? 64 : 122,
            padding: isIg ? '0 18px 6px' : '0 24px',
            zIndex: 5,
        }}>
            <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full flex items-center justify-center font-black text-[11px]" style={{ background: '#fff', color: '#111' }}>SR</span>
                <span className="font-bold text-white text-[13px]">@santi.dev</span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full font-mono text-[10.5px]" style={{ padding: '5px 11px', border: '1px solid #3a3a3a', color: '#cfcfcf' }}>
                {isLast ? 'guárdalo' : isIg ? 'desliza' : 'desliza'}
                <window.Icon name={isLast ? 'bookmark' : 'arrow'} size={12} color={theme.accent} stroke={2.4} />
            </span>
        </div>
    );
};
