/**
 * =====================================================================
 * SANTI.DEV · ICONOS VECTORIALES (LOCALES + LUCIDE ICONS 1400+)
 * =====================================================================
 * 1. Biblioteca Local Esencial: SVGs de trazo nítido y alto contraste
 *    (check, cross, heart, bookmark, code, terminal, gamepad, etc.).
 * 2. Integración Lucide: Resuelve dinámicamente más de 2000 iconos
 *    minimalistas desde window.lucide conservando trazo, color y tamaño.
 * =====================================================================
 */

// 1. Biblioteca Local (Tus SVGs esenciales y personalizados)
window.localIcons = {
    // Esenciales para comparativas (❌ vs ✅)
    check:      <path d="M20 6L9 17l-5-5" />,
    cross:      <path d="M18 6L6 18M6 6l12 12" />,
    x:          <path d="M18 6L6 18M6 6l12 12" />,
    
    // Interacciones de la tarjeta (Cabecera y guardado)
    heart:      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    bookmark:   <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    
    // Herramientas y Tech (Contenido técnico y arquitectura)
    code:       <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
    terminal:   <><path d="M4 17l6-6-6-6M12 19h8" /><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>,
    database:   <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
    gamepad:    <><rect x="2" y="6" width="20" height="12" rx="2" ry="2" /><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01" /></>,
    smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>,
    phone:      <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>,
    user:       <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    userPlus:   <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6" /></>,
    users:      <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    
    // Contenido general y de producto
    arrow:      <path d="M4 12h15M13 6l6 6-6 6" />,
    eye:        <><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    cursor:     <path d="M5 3l14 7-6 2-2 6z" />,
    hand:       <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4a1.5 1.5 0 0 1 3 0v7M14 10.5V5.5a1.5 1.5 0 0 1 3 0V13M17 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L4.3 15a1.5 1.5 0 0 1 2.4-1.8L8 15" />,
    camera:     <><path d="M4 7h3l2-3h6l2 3h3v12H4z" /><circle cx="12" cy="13" r="3.5" /></>,
    chip:       <><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /></>,
    triangle:   <path d="M12 4l9 16H3z" />,
    box:        <path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />,
    book:       <path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2zM22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z" />,
    trophy:     <path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9 18h6" />,
    pencil:     <path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3" />,
    comment:    <path d="M4 5h16v11H9l-5 4z" />,
    gear:       <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    sparkle:    <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />,
    layers:     <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
    zap:        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    folder:     <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />,
    download:   <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
    gift:       <><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></>,
    git:        <><circle cx="6" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="9" r="3" /><path d="M6 9v6" /><path d="M9 9l6-1.5" /><path d="M18 12v3a3 3 0 0 1-3 3H9" /></>,
    branch:     <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="7" r="2" /><path d="M6 7v10M18 9c0 5-6 4-11 8" /></>,
};

// Retrocompatibilidad con window.ICONS
window.ICONS = window.localIcons;

/**
 * Busca un icono en la biblioteca dinámica de Lucide (1400+ iconos).
 * Soporta kebab-case ('alert-circle'), camelCase ('alertCircle') y PascalCase ('AlertCircle').
 */
window.getLucideIconNode = (name) => {
    if (!name || typeof name !== 'string') return null;
    if (!window.lucide || !window.lucide.icons) return null;

    // 1. Coincidencia directa
    if (window.lucide.icons[name]) return window.lucide.icons[name];

    // 2. Coincidencia PascalCase (ej: 'sparkles' -> 'Sparkles', 'arrow-right' -> 'ArrowRight')
    const pascal = name
        .split(/[-_ ]+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join('');
    if (window.lucide.icons[pascal]) return window.lucide.icons[pascal];

    // 3. Coincidencia insensible a mayúsculas
    const lowerKey = name.toLowerCase().replace(/[-_ ]+/g, '');
    const foundKey = Object.keys(window.lucide.icons).find(k => k.toLowerCase() === lowerKey);
    if (foundKey) return window.lucide.icons[foundKey];

    return null;
};

/** Renderiza nodos AST de Lucide a elementos React nativos */
window.renderLucideAST = (nodes) => {
    if (!nodes || !Array.isArray(nodes)) return null;
    return nodes.map(([tag, attrs], idx) => React.createElement(tag, { key: idx, ...attrs }));
};

/**
 * Componente Icon Unificado (Local + Lucide Icons 1400+)
 * Satisface la firma solicitada por el usuario:
 * <Icon name="user" size={20} color="#000" strokeWidth={2.5} />
 */
window.Icon = ({ name, size = 24, color = '#111', stroke, strokeWidth, fill = 'none', className = '' }) => {
    const strokeW = strokeWidth !== undefined ? strokeWidth : (stroke !== undefined ? stroke : 2.2);

    // 1. Buscar en la biblioteca local
    const local = window.localIcons?.[name] || window.ICONS?.[name];
    if (local) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={fill}
                stroke={color}
                strokeWidth={strokeW}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`shrink-0 ${className}`}>
                {typeof local === 'function' ? local(color) : local}
            </svg>
        );
    }

    // 2. Buscar en la librería dinámica de Lucide Icons (+1400 iconos)
    const lucideNodes = window.getLucideIconNode(name);
    if (lucideNodes) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={fill}
                stroke={color}
                strokeWidth={strokeW}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`shrink-0 ${className}`}>
                {window.renderLucideAST(lucideNodes)}
            </svg>
        );
    }

    // 3. Fallback visual limpio
    return (
        <span style={{ color: color || '#888', fontSize: '10px' }} className="font-mono select-none" title={`Icono: ${name}`}>
            [?]
        </span>
    );
};

/* ---------- Pixel art en SVG estilo Aseprite (bordes duros) ---------- */

/** Corazón retro para HUD de juego. */
window.PIXEL_HEART = [
    '.##.##.',
    '#######',
    '#######',
    '.#####.',
    '..###..',
    '...#...',
];

/** Trofeo pixel (14x12) para caso ganador Kurios. */
window.PIXEL_TROPHY = [
    '...########...',
    '##.o#######.##',
    '#..o#######..#',
    '#..########..#',
    '.#.########.#.',
    '..##########..',
    '....######....',
    '......##......',
    '......##......',
    '.....####.....',
    '....######....',
    '....######....',
];

/** Banana pixel art inspirada en estética arcade / Nano Banana (12x12). */
window.PIXEL_BANANA = [
    '.......##...',
    '......#oo#..',
    '.....#oooo#.',
    '.....#oooo#.',
    '....#oooo#..',
    '...#oooo#...',
    '..#oooo#....',
    '.#oooo#.....',
    '#oooo#......',
    '#ooo#.......',
    '.###........',
    '..#.........',
];

/** Espada 8-bit retro (11x11). */
window.PIXEL_SWORD = [
    '.........##',
    '........#oo',
    '.......#oo#',
    '......#oo#.',
    '.....#oo#..',
    '..#.#oo#...',
    '..##oo#....',
    '..###o#....',
    '.#..##.....',
    '#..........',
    '...........',
];

/** Fantasma retro arcade 8-bit (10x10). */
window.PIXEL_GHOST = [
    '...####...',
    '..######..',
    '.##..##..#',
    '.#o..#o..#',
    '.########.',
    '.########.',
    '.########.',
    '.#.#.##.#.',
    '#..#....#.',
    '..........',
];

/** Moneda dorada retro (8x8). */
window.PIXEL_COIN = [
    '..####..',
    '.######.',
    '##.oo.##',
    '##.oo.##',
    '##.oo.##',
    '##.oo.##',
    '.######.',
    '..####..',
];

/** Consola portátil retro 8-bit (10x12). */
window.PIXEL_CONSOLE = [
    '.########.',
    '#........#',
    '#.######.#',
    '#.#....#.#',
    '#.######.#',
    '#........#',
    '#..#...o.#',
    '#.###...o#',
    '#..#.....#',
    '#...==...#',
    '.########.',
    '..........',
];

/** Componente de renderizado de sprites Pixel Art por nombre. */
window.PixelSprite = ({ name = 'banana', size = 32, color, accent }) => {
    const sprites = {
        banana:  { map: window.PIXEL_BANANA,  palette: { '#': '#5c3905', 'o': '#FFE600' } },
        heart:   { map: window.PIXEL_HEART,   palette: { '#': color || '#FF2E63' } },
        trophy:  { map: window.PIXEL_TROPHY,  palette: { '#': '#111', 'o': '#FFD700' } },
        sword:   { map: window.PIXEL_SWORD,   palette: { '#': '#111', 'o': color || '#00E5FF' } },
        ghost:   { map: window.PIXEL_GHOST,   palette: { '#': color || '#FF007F', 'o': '#FFF' } },
        coin:    { map: window.PIXEL_COIN,    palette: { '#': '#855800', 'o': '#FFD700', '.': '#FFF' } },
        console: { map: window.PIXEL_CONSOLE, palette: { '#': color || '#8A2BE2', 'o': '#FF007F', '=': '#FFF', '.': '#0F091A' } },
    };
    const s = sprites[name] || sprites.banana;
    return <window.PixelArt map={s.map} size={size} palette={s.palette} />;
};

/**
 * Topología real de MediaPipe Hands (21 puntos anatómicos).
 */
window.HAND_PTS = [
    [50, 112], [34, 100], [22, 86], [14, 72], [8, 60],
    [36, 64], [33, 44], [31, 31], [30, 20],
    [50, 62], [50, 40], [50, 26], [50, 14],
    [63, 64], [65, 45], [67, 32], [68, 22],
    [75, 70], [80, 56], [84, 46], [87, 37],
];
window.HAND_LINKS = [
    [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],
    [9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]
];

/** Visual esquelético de la mano para Mova App. */
window.HandLandmarks = ({ accent, size = 120 }) => (
    <svg width={size * 0.8} height={size} viewBox="0 0 96 120" fill="none">
        {window.HAND_LINKS.map(([a, b], i) => (
            <line key={i} x1={window.HAND_PTS[a][0]} y1={window.HAND_PTS[a][1]}
                  x2={window.HAND_PTS[b][0]} y2={window.HAND_PTS[b][1]}
                  stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
        ))}
        {window.HAND_PTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 8 ? 4.2 : 2.6}
                    fill={i === 8 ? accent : '#fff'} stroke="#111" strokeWidth="1.4" />
        ))}
    </svg>
);

/** Gráfico de servidores tachados para GiraStock / Soluciones en la nube. */
window.NoServers = ({ accent, size = 110 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#111" strokeWidth="2.4" strokeLinecap="round">
        {[14, 40, 66].map((y) => (
            <g key={y}>
                <rect x="16" y={y} width="68" height="20" rx="5" fill="#fff" />
                <circle cx="28" cy={y + 10} r="2.4" fill="#111" />
                <path d={`M40 ${y + 10}h30`} />
            </g>
        ))}
        <path d="M10 92L90 8" stroke={accent} strokeWidth="7" />
    </svg>
);

/** Gráfico de lenguas de señas soportadas para Mova (LSV, ASL, LSE). */
window.LanguagesVisual = ({ accent, size = 110 }) => (
    <svg width={size} height={size * 0.82} viewBox="0 0 100 82" fill="none">
        <rect x="6" y="8" width="40" height="26" rx="6" fill="#fff" stroke="#111" strokeWidth="1.8" />
        <text x="26" y="25" textAnchor="middle" fill="#111" fontSize="10.5" fontWeight="900" fontFamily="system-ui, sans-serif">LSV 🇻🇪</text>
        <rect x="54" y="8" width="40" height="26" rx="6" fill={accent} stroke="#111" strokeWidth="1.8" />
        <text x="74" y="25" textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="900" fontFamily="system-ui, sans-serif">ASL 🇺🇸</text>
        <rect x="30" y="46" width="40" height="26" rx="6" fill="#fff" stroke="#111" strokeWidth="1.8" />
        <text x="50" y="63" textAnchor="middle" fill="#111" fontSize="10.5" fontWeight="900" fontFamily="system-ui, sans-serif">LSE 🇪🇸</text>
        <path d="M46 21h8M44 34l-6 12M56 34l6 12" stroke="#111" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
);

/** Renderiza una matriz como píxeles nítidos sin interpolación borrosa. */
window.PixelArt = ({ map, size, palette }) => {
    const h = map.length, w = map[0].length;
    return (
        <svg width={size} height={(size / w) * h} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges">
            {map.flatMap((row, y) => [...row].map((ch, x) =>
                palette[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={palette[ch]} /> : null
            ))}
        </svg>
    );
};

/** Comillas tipográficas para citas o frases de oro. */
window.QuoteMark = ({ color, size = 52 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M3 21c3 0 7-1 7-8V5H3v8h4c0 4-2 5-4 5zM14 21c3 0 7-1 7-8V5h-7v8h4c0 4-2 5-4 5z" />
    </svg>
);
