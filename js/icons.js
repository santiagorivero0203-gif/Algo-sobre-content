/**
 * =====================================================================
 * SANTI.DEV · ICONOS Y GRÁFICOS VECTORIALES (SVG PROPIOS)
 * =====================================================================
 * Iconografía propia dibujada con trazo de 2px y puntas redondeadas.
 * No depende de librerías externas para renderizar dentro de las slides,
 * garantizando que html2canvas las exporte nítidas a cualquier resolución.
 * =====================================================================
 */

window.ICONS = {
    heart:    (c) => <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
    bookmark: (c) => <path d="M6 3h12v18l-6-4-6 4z" />,
    check:    (c) => <path d="M5 12.5l4.5 4.5L19 7.5" />,
    x:        (c) => <path d="M6 6l12 12M18 6L6 18" />,
    arrow:    (c) => <path d="M4 12h15M13 6l6 6-6 6" />,
    gamepad:  (c) => <>
        <path d="M6 8h12a4 4 0 0 1 4 4v1a4 4 0 0 1-7 2.6L14 14h-4l-1 1.6A4 4 0 0 1 2 13v-1a4 4 0 0 1 4-4z" />
        <path d="M7 10.5v3M5.5 12h3" />
        <circle cx="16" cy="11" r="0.9" fill={c} /><circle cx="18" cy="13" r="0.9" fill={c} />
    </>,
    eye:      (c) => <><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    cursor:   (c) => <path d="M5 3l14 7-6 2-2 6z" />,
    hand:     (c) => <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4a1.5 1.5 0 0 1 3 0v7M14 10.5V5.5a1.5 1.5 0 0 1 3 0V13M17 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L4.3 15a1.5 1.5 0 0 1 2.4-1.8L8 15" />,
    camera:   (c) => <><path d="M4 7h3l2-3h6l2 3h3v12H4z" /><circle cx="12" cy="13" r="3.5" /></>,
    chip:     (c) => <><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /></>,
    database: (c) => <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
    branch:   (c) => <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="7" r="2" /><path d="M6 7v10M18 9c0 5-6 4-11 8" /></>,
    triangle: (c) => <path d="M12 4l9 16H3z" />,
    box:      (c) => <path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />,
    book:     (c) => <path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2zM22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z" />,
    trophy:   (c) => <path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9 18h6" />,
    pencil:   (c) => <path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3" />,
    code:     (c) => <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
    phone:    (c) => <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
    comment:  (c) => <path d="M4 5h16v11H9l-5 4z" />,
    userPlus: (c) => <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6" /></>,
    gear:     (c) => <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    sparkle:  (c) => <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />,
    layers:   (c) => <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
    terminal: (c) => <><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>,
    zap:      (c) => <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    users:    (c) => <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
};

/** Componente Icon: Renderiza el icono con trazo uniforme. */
window.Icon = ({ name, size = 24, color = '#111', stroke = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        {window.ICONS[name] ? window.ICONS[name](color) : null}
    </svg>
);

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
