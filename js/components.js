/**
 * =====================================================================
 * SANTI.DEV · COMPONENTES DE SLIDES Y DISPOSICIONES DE TARJETA
 * =====================================================================
 * Renderizado modular de tarjetas:
 *   - LAYOUTS: define la geometría y el espacio visible de fondo.
 *   - SLIDE_TYPES: Hero, Text, Code, Image, Steps, Compare, Stat, Flow,
 *                  Quote, Checklist, CTA.
 *   - CardFrame: contenedor con rotación, split card y sombras.
 *   - Slide: composición integral (Backdrop + Bandas + Tarjeta).
 * =====================================================================
 */

/**
 * Geometría y disposiciones de tarjeta adaptables a:
 *   - TikTok / Reels / Shorts (9:16 · 1080x1920)
 *   - Instagram Feed (4:5 · 1080x1350)
 */
window.LAYOUT_SETS = {
    tiktok: {
        full:  { top: 26,  right: 18, bottom: 26,  left: 18 },
        low:   { top: 138, right: 18, bottom: 26,  left: 18 },
        high:  { top: 26,  right: 18, bottom: 126, left: 18 },
        float: { top: 76,  right: 28, bottom: 76,  left: 28 },
        tilt:  { top: 36,  right: 24, bottom: 36,  left: 24, rotate: -1.6, back: true },
        split: { top: 22,  right: 18, bottom: 24,  left: 18, split: true },
    },
    instagram: {
        full:  { top: 14,  right: 14, bottom: 14,  left: 14 },
        low:   { top: 68,  right: 14, bottom: 14,  left: 14 },
        high:  { top: 14,  right: 14, bottom: 58,  left: 14 },
        float: { top: 20,  right: 16, bottom: 20,  left: 16 },
        tilt:  { top: 16,  right: 15, bottom: 16,  left: 15, rotate: -1.2, back: true },
        split: { top: 12,  right: 14, bottom: 12,  left: 14, split: true },
    },
};

window.getLayout = (layoutKey, format = 'tiktok') => {
    const set = window.LAYOUT_SETS[format] || window.LAYOUT_SETS.tiktok;
    return set[layoutKey] || set.full;
};

// Retrocompatibilidad con window.LAYOUTS
window.LAYOUTS = window.LAYOUT_SETS.tiktok;

/* ---------- PIEZAS INTERNAS DE TARJETA ---------- */

/** Encabezado simulado de la tarjeta (variant: full | mini | none). */
window.Header = ({ variant = 'mini', theme, meta, tone }) => {
    if (variant === 'none') return null;
    const isIg = meta?.format === 'instagram';
    const ink = tone.text;
    const account = window.getAccountForVideo ? window.getAccountForVideo(meta?.video) : window.ACCOUNTS?.santidev;
    const brandName = account?.name || 'Santi.Dev';
    if (variant === 'mini') {
        return (
            <div className={`flex items-center justify-between ${isIg ? 'mb-2' : 'mb-3.5'}`}>
                <span className="rounded-full font-bold text-[11px]" style={{ padding: isIg ? '2.5px 10px' : '3.5px 12px', border: `1.5px solid ${tone.line}`, color: ink }}>{brandName}</span>
                <span className="font-mono font-bold text-[11px]" style={{ color: ink, opacity: 0.55 }}>{window.pad(meta.index + 1)} / {window.pad(meta.total)}</span>
            </div>
        );
    }
    return (
        <div className={`flex justify-between items-center ${isIg ? 'mb-2.5' : 'mb-4'}`}>
            <div className="rounded-full font-bold text-[11.5px] flex items-center gap-1.5" style={{ padding: isIg ? '3px 11px' : '4px 14px', border: `1.5px solid ${tone.line}`, background: tone.bg, color: ink }}>
                <span className="w-2 h-2 rounded-full" style={{ background: theme.accent }} />
                <span>{brandName}</span>
            </div>
            <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-[11px]" style={{ color: ink, opacity: 0.55 }}>{window.pad(meta.index + 1)} / {window.pad(meta.total)}</span>
                <div className="flex gap-1.5 opacity-80">
                    <window.Icon name="heart" size={isIg ? 15 : 17} color={ink} />
                    <window.Icon name="bookmark" size={isIg ? 15 : 17} color={ink} />
                </div>
            </div>
        </div>
    );
};

/** Título principal de la tarjeta con soporte para géneros (pixel gaming, arcade y tech dev). */
window.Title = ({ text, theme, tone, size = '2.3rem', meta }) => {
    if (!text) return null;
    const isIg = meta?.format === 'instagram';
    let fontCls = 'font-black tracking-tight';
    let computedSize = size;
    if (theme?.fontTitle === 'pixel') {
        fontCls = 'font-pixel tracking-wider uppercase';
    } else if (theme?.fontTitle === 'arcade') {
        fontCls = 'font-arcade tracking-wide uppercase';
        computedSize = size.startsWith('2.') ? '1.5rem' : '1.25rem';
    } else if (theme?.fontTitle === 'tech') {
        fontCls = 'font-tech font-bold tracking-normal';
    }
    if (isIg && computedSize && typeof computedSize === 'string' && computedSize.includes('rem')) {
        const val = parseFloat(computedSize);
        if (val > 1.7) computedSize = `${(val * 0.80).toFixed(2)}rem`;
    }
    return (
        <h2 className={`${fontCls} m-0`} style={{ fontSize: computedSize, lineHeight: 1.05, color: tone.text }}>
            {window.rich(text, theme.mark)}
        </h2>
    );
};

/** Pie de tarjeta con nota o conclusión con espaciado seguro y contenido limpio. */
window.Foot = ({ text, tone, className = '', meta }) => {
    const isIg = meta?.format === 'instagram';
    return (
        <div className={`rounded-xl font-semibold leading-snug ${className}`} style={{
            padding: isIg ? '6.5px 10px' : '9px 13px',
            fontSize: isIg ? '10.5px' : '11.5px',
            border: `1.5px solid ${tone.line}`,
            color: tone.text,
            background: 'transparent',
        }}>
            {window.rich ? window.rich(text, tone.box) : text}
        </div>
    );
};

/** Foto de apoyo como fondo (background-size: cover). */
window.Photo = ({ src, theme, style, className = '' }) => (
    <div className={`rounded-[1.6rem] ${className}`} style={{
        backgroundColor: theme.accent, backgroundImage: `url(${src})`,
        backgroundSize: 'cover', backgroundPosition: 'center', ...style,
    }} />
);

/* ---------- TIPOS DE SLIDES ---------- */

/**
 * Arte del Hero cuando no hay imagen. Agregar una variante = una línea aquí.
 * También puede definirse desde los datos: artIcon, artCorner, artLabel.
 */
window.HERO_ART = {
    gamepad: { icon: 'gamepad',  corner: 'CONSOLE · 3D', label: 'DEV · GAMING STACK' },
    gear:    { icon: 'gear',     corner: 'DEV · OPS',    label: 'MCP · AUTOMATION' },
    warning: { icon: 'triangle', corner: 'CRITICAL',     label: 'SYSTEM · ERROR 404' },
};

/** Portada / Hero */
window.HeroSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    const art = d.artIcon
        ? { icon: d.artIcon, corner: d.artCorner || '', label: d.artLabel || '' }
        : window.HERO_ART[d.art];
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            <span className={`self-start rounded-full font-bold ${isIg ? 'text-[11px] mb-2' : 'text-[12px] mb-3'} whitespace-nowrap`} style={{ padding: isIg ? '3.5px 10px' : '5px 12px', background: theme.accent, color: theme.ink }}>{d.kicker}</span>
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} size={d.titleSize || (isIg ? '1.85rem' : '2.55rem')} meta={meta} />}
            {d.image ? (
                <window.Photo src={d.image} theme={theme} style={d.imageStyle} className={`flex-1 ${isIg ? 'mt-2' : 'mt-4'}`} />
            ) : d.sprite ? (
                <div className={`flex-1 ${isIg ? 'mt-2' : 'mt-4'} rounded-[1.6rem] relative flex items-center justify-center overflow-hidden`} style={{ background: theme.accent }}>
                    <window.PixelSprite name={d.sprite} size={isIg ? 110 : 145} color={theme.ink} />
                    <span className="absolute top-3 left-3 font-mono font-bold text-[10px] tracking-[.18em] whitespace-nowrap select-none" style={{ color: theme.ink }}>
                        {d.spriteLabel || 'RETRO · SPRITE'}
                    </span>
                    <span className="absolute bottom-3 right-3"><window.PixelSprite name="heart" size={22} color={theme.ink} /></span>
                </div>
            ) : (
                <div className={`flex-1 ${isIg ? 'mt-2' : 'mt-4'} rounded-[1.6rem] relative flex items-center justify-center overflow-hidden`} style={{ background: theme.accent }}>
                    {art ? (
                        <div className="flex flex-col items-center justify-center gap-1.5">
                            <window.Icon name={art.icon} size={isIg ? 80 : 105} color={theme.ink} stroke={1.6} />
                            {art.label && <span className="font-mono font-bold text-[10px] uppercase tracking-[.18em] px-2.5 py-0.5 rounded-full bg-black/15 whitespace-nowrap select-none" style={{ color: theme.ink }}>{art.label}</span>}
                        </div>
                    ) : (
                        <window.PixelArt map={window.PIXEL_TROPHY} size={isIg ? 130 : 170} palette={{ '#': '#111', 'o': '#F5F2EB' }} />
                    )}
                    <span className="absolute top-3 left-3 font-mono font-bold text-[10px] tracking-[.18em] whitespace-nowrap select-none" style={{ color: theme.ink }}>
                        {art ? art.corner : '1ST · PLACE'}
                    </span>
                    <span className="absolute bottom-3 right-3"><window.PixelArt map={window.PIXEL_HEART} size={22} palette={{ '#': theme.ink === '#FFFFFF' ? '#fff' : '#111' }} /></span>
                </div>
            )}
            <p className={`${isIg ? 'mt-2 text-[12px]' : 'mt-3 text-[13px]'} mb-0 font-semibold leading-snug`} style={{ color: tone.sub }}>{d.sub}</p>
        </div>
    );
};

/** Texto protagonista */
window.TextSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} meta={meta} />}
            <p className={`font-extrabold ${isIg ? 'mt-2.5' : 'mt-4'} mb-0`} style={{ fontSize: isIg ? '1.25rem' : '1.5rem', lineHeight: 1.25, color: '#222' }}>{window.rich(d.body, theme.mark)}</p>
            {d.icons && (
                <div className={`flex-1 flex items-center ${isIg ? 'py-1' : 'py-2'}`}>
                    <div className={`grid grid-cols-3 ${isIg ? 'gap-2' : 'gap-2.5'} w-full`}>
                        {d.icons.map((ic, i) => {
                            const it = typeof ic === 'string' ? { name: ic } : ic;
                            const on = i === 0;
                            return (
                                <div key={it.name} className={`${isIg ? 'rounded-xl gap-1' : 'rounded-2xl gap-1.5'} flex flex-col items-center justify-center`} style={{ height: isIg ? 66 : 86, border: '2px solid #111', background: on ? theme.accent : 'transparent' }}>
                                    <window.Icon name={it.name} size={isIg ? 20 : 26} color={on ? theme.ink : '#111'} />
                                    {it.label && <span className={`font-mono font-bold ${isIg ? 'text-[9px]' : 'text-[10.5px]'} uppercase tracking-[.12em]`} style={{ color: on ? theme.ink : '#111' }}>{it.label}</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {d.foot && <div className={`mt-auto ${isIg ? 'pt-1.5' : 'pt-2.5'} pb-0.5`}><window.Foot text={d.foot} tone={tone} meta={meta} /></div>}
        </div>
    );
};

/** Ventana de código / consola */
window.CodeSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    const fillCount = Math.max(0, (isIg ? 3 : 8) - (d.code?.length || 0));
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} meta={meta} />}
            <div className={`rounded-[1.3rem] overflow-hidden ${isIg ? 'mt-2' : 'mt-3.5'} flex-1 flex flex-col`} style={{ background: '#141414', minHeight: 0 }}>
                <div className="flex items-center gap-1.5" style={{ padding: isIg ? '6px 10px' : '8px 12px', borderBottom: '1px solid #262626' }}>
                    {[0, 1, 2].map((i) => <span key={i} style={{ width: 6, height: 6, borderRadius: 8, background: '#3a3a3a', display: 'inline-block' }} />)}
                    <span className="font-mono text-[9.5px] ml-2" style={{ color: '#8a8a8a' }}>{d.file}</span>
                    <span className="font-mono text-[8.5px] font-bold ml-auto" style={{ color: theme.codeKw }}>{d.lang}</span>
                </div>
                <pre className="font-mono m-0 flex-1" style={{ fontSize: isIg ? 9.5 : 10, lineHeight: isIg ? 1.45 : 1.6, padding: isIg ? '8px 10px' : '10px 12px', color: '#C9C9C9', whiteSpace: 'pre', overflow: 'hidden', minHeight: 0 }}>
                    {[...d.code, ...Array(fillCount).fill('')].map((line, i) => (
                        <div key={i} className="flex">
                            <span style={{ color: i < d.code.length ? '#4d4d4d' : '#262626', width: 15, flexShrink: 0 }}>{i + 1}</span>
                            <span>{line ? window.highlight(line, theme.codeKw) : ' '}</span>
                        </div>
                    ))}
                </pre>
            </div>
            {d.foot && <div className={`mt-auto ${isIg ? 'pt-1.5' : 'pt-2.5'} pb-0.5`}><window.Foot text={d.foot} tone={tone} meta={meta} /></div>}
        </div>
    );
};

/** Imagen con chips o comparación Antes / Después */
window.ImageSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} size={isIg ? "1.75rem" : "2rem"} meta={meta} />}
            {d.beforeAfter ? (
                <div className={`flex-1 ${isIg ? 'mt-1.5 gap-2' : 'mt-2.5 gap-2.5'} flex flex-col justify-center min-h-0`}>
                    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
                        <div className="rounded-2xl flex flex-col overflow-hidden border-2 border-neutral-300 relative bg-[#181818]">
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-neutral-900/90 text-neutral-200 z-10">1. Con fondo</span>
                            <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${d.image})` }} />
                        </div>
                        <div className="rounded-2xl flex flex-col overflow-hidden border-2 border-neutral-300 relative" style={{
                            background: 'repeating-conic-gradient(#262626 0% 25%, #181818 0% 50%) 50% / 16px 16px'
                        }}>
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold z-10" style={{ background: theme.accent, color: theme.ink }}>2. Transparente</span>
                            <div className="flex-1 flex items-center justify-center p-2">
                                <window.PixelArt map={window.PIXEL_TROPHY} size={isIg ? 68 : 84} palette={{ '#': theme.accent, 'o': '#fff' }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {d.chips && d.chips.map((c, i) => (
                            <span key={c} className="rounded-full font-bold text-[10.5px]" style={{ padding: isIg ? '3px 8px' : '4px 10px', border: '1.5px solid #111', background: i === 0 ? '#111' : 'transparent', color: i === 0 ? '#fff' : '#111' }}>{c}</span>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <window.Photo src={d.image} theme={theme} className={`flex-1 ${isIg ? 'mt-2' : 'mt-3'}`} />
                    <div className={`flex flex-wrap gap-1.5 ${isIg ? 'mt-2' : 'mt-3'}`}>
                        {d.chips && d.chips.map((c, i) => (
                            <span key={c} className="rounded-full font-bold text-[10.5px]" style={{ padding: isIg ? '3px 8px' : '4px 10px', border: '1.5px solid #111', background: i === 0 ? '#111' : 'transparent', color: i === 0 ? '#fff' : '#111' }}>{c}</span>
                        ))}
                    </div>
                </>
            )}
            {d.foot && <div className={`mt-auto ${isIg ? 'pt-1.5' : 'pt-2.5'} pb-0.5`}><window.Foot text={d.foot} tone={tone} meta={meta} /></div>}
        </div>
    );
};

/** Lista de pasos */
window.StepsSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} meta={meta} />}
            <div className={`flex flex-col ${isIg ? 'gap-2 py-1' : 'gap-4 py-2'} flex-1 justify-center`}>
                {d.steps.map((s, i) => (
                    <div key={i} className={`flex ${isIg ? 'gap-2.5' : 'gap-3'} items-start`}>
                        <span className={`font-mono font-bold ${isIg ? 'text-[11px] rounded-lg' : 'text-[13px] rounded-xl'} flex items-center justify-center shrink-0`} style={{ width: isIg ? 26 : 34, height: isIg ? 26 : 34, background: i === 0 ? theme.accent : '#111', color: i === 0 ? theme.ink : '#fff' }}>{window.pad(i + 1)}</span>
                        <div>
                            <div className={`font-extrabold ${isIg ? 'text-[13px]' : 'text-[15px]'} leading-tight`} style={{ color: tone.text }}>{s.t}</div>
                            <div className={`${isIg ? 'text-[11px]' : 'text-[12px]'} font-medium leading-snug mt-0.5`} style={{ color: tone.sub }}>{s.d}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`mt-auto flex items-center gap-2 ${isIg ? 'pt-1.5' : 'pt-3'} pb-1 border-t border-dashed`} style={{ borderColor: tone.line }}>
                <window.Icon name="trophy" size={isIg ? 13 : 16} color={tone.sub} />
                <span className={`font-mono ${isIg ? 'text-[9.5px]' : 'text-[10.5px]'}`} style={{ color: tone.sub }}>aplicado en la práctica</span>
            </div>
        </div>
    );
};

/** Comparación directa */
window.CompareSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} meta={meta} />}
            <div className={`flex flex-col ${isIg ? 'gap-1.5 py-1' : 'gap-2.5 py-2'} flex-1 justify-center`}>
                {[{ ok: false, text: d.bad, label: 'Así no' }, { ok: true, text: d.good, label: 'Así sí' }].map((r) => (
                    <div key={r.label} className="rounded-2xl flex gap-2.5 items-start" style={{ padding: isIg ? '8px 11px' : '13px 15px', background: tone.box, border: `1px solid ${tone.line}` }}>
                        <span className="shrink-0 flex items-center justify-center rounded-full" style={{ width: isIg ? 24 : 32, height: isIg ? 24 : 32, background: r.ok ? window.OK_GREEN : window.BAD_RED }}>
                            <window.Icon name={r.ok ? 'check' : 'x'} size={isIg ? 12 : 16} color="#fff" stroke={2.8} />
                        </span>
                        <div>
                            <div className={`font-mono uppercase ${isIg ? 'text-[8.5px]' : 'text-[9.5px]'} tracking-[.15em] font-bold`} style={{ color: tone.sub }}>{r.label}</div>
                            <div className={`font-bold ${isIg ? 'text-[12px] leading-snug' : 'text-[14.5px] leading-snug'} mt-0.5`} style={{ color: tone.text, opacity: r.ok ? 1 : 0.75 }}>{r.text}</div>
                        </div>
                    </div>
                ))}
            </div>
            {d.foot && <div className={`mt-auto ${isIg ? 'pt-1.5' : 'pt-2.5'} pb-0.5`}><window.Foot text={d.foot} tone={tone} meta={meta} /></div>}
        </div>
    );
};

/** Métrica destacada */
window.StatSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} size={isIg ? "1.55rem" : "1.85rem"} meta={meta} />}
            <div className="flex items-center justify-between mt-1">
                <div className="relative">
                    <div className="absolute rounded-xl" style={{ left: -6, right: -10, bottom: isIg ? 10 : 18, height: '40%', background: theme.accent }} />
                    <div className="relative font-black tracking-tighter" style={{ fontSize: isIg ? '4.8rem' : '8.8rem', lineHeight: 1, color: tone.text }}>{d.number}</div>
                </div>
                {d.visual === 'hand' && <window.HandLandmarks accent={theme.accent} size={isIg ? 72 : 135} />}
                {d.visual === 'servers' && <window.NoServers accent={theme.accent} size={isIg ? 68 : 118} />}
                {d.visual === 'languages' && <window.LanguagesVisual accent={theme.accent} size={isIg ? 72 : 120} />}
            </div>
            <span className={`self-start rounded-full font-bold ${isIg ? 'text-[11px] mt-0.5' : 'text-[13px] mt-1'}`} style={{ padding: isIg ? '3px 9px' : '5px 12px', background: '#111', color: '#fff' }}>{d.label}</span>
            <div className={`flex-1 flex items-center ${isIg ? 'py-1' : 'py-2.5'}`}>
                <p className="font-extrabold m-0" style={{ fontSize: isIg ? '1.05rem' : '1.3rem', lineHeight: 1.25, color: tone.text }}>{window.rich(d.body, theme.mark)}</p>
            </div>
            <div className={`mt-auto flex items-center gap-2 ${isIg ? 'pt-1.5' : 'pt-3'} pb-1 border-t border-dashed`} style={{ borderColor: tone.line }}>
                <window.Icon name={d.icon} size={isIg ? 16 : 22} color={tone.text} />
                <span className={`font-mono ${isIg ? 'text-[9.5px]' : 'text-[10.5px]'}`} style={{ color: tone.sub }}>{d.src}</span>
            </div>
        </div>
    );
};

/** Diagrama de flujo */
window.FlowSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <div className={isIg ? "mb-1.5" : "mb-3.5"}><window.Title text={d.title} theme={theme} tone={tone} meta={meta} /></div>}
            <div className="flex flex-col flex-1 justify-center py-1">
                {d.nodes.map((n, i) => {
                    const last = i === d.nodes.length - 1;
                    return (
                        <div key={i}>
                            <div className={`flex items-center ${isIg ? 'gap-2' : 'gap-2.5'}`}>
                                <div className={`${isIg ? 'w-7 h-7 rounded-lg' : 'w-10 h-10 rounded-xl'} flex items-center justify-center shrink-0`} style={{ border: '1.5px solid #111', background: last ? theme.accent : tone.box }}>
                                    <window.Icon name={n.icon} size={isIg ? 14 : 18} color={last ? theme.ink : '#111'} />
                                </div>
                                <div className="min-w-0">
                                    <div className={`font-extrabold ${isIg ? 'text-[12px]' : 'text-[14px]'} leading-tight`} style={{ color: tone.text }}>{n.t}</div>
                                    <div className={`font-mono ${isIg ? 'text-[9px]' : 'text-[10px]'} mt-0.5 truncate`} style={{ color: tone.sub }}>{n.s}</div>
                                </div>
                            </div>
                            {!last && <div style={{ marginLeft: isIg ? 13 : 19, height: isIg ? 6 : 16, borderLeft: '2px dashed #BDBDBD' }} />}
                        </div>
                    );
                })}
            </div>
            {d.foot && <div className={`mt-auto ${isIg ? 'pt-1' : 'pt-2'} pb-0.5`}><window.Foot text={d.foot} tone={tone} meta={meta} /></div>}
        </div>
    );
};

/** Cita o lema de impacto */
window.QuoteSlide = ({ d, theme, tone, meta }) => {
    const isIg = meta?.format === 'instagram';
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            <div className={`flex-1 flex flex-col justify-center ${isIg ? 'py-1' : 'py-2'}`}>
                <window.QuoteMark color={theme.accent} size={isIg ? 36 : 50} />
                <p className={`font-black ${isIg ? 'mt-2' : 'mt-3'} mb-0 tracking-tight`} style={{ fontSize: isIg ? '1.65rem' : '2.2rem', lineHeight: 1.15, color: tone.text }}>{window.rich(d.quote, theme.mark)}</p>
            </div>
            <div className={`mt-auto ${isIg ? 'pt-1' : 'pt-2'} pb-0.5 flex items-center gap-3`}>
                <div className={`${isIg ? 'w-7 h-7' : 'w-8 h-8'} rounded-full flex items-center justify-center`} style={{ background: theme.accent, color: theme.ink }}>
                    <window.Icon name="sparkle" size={isIg ? 14 : 16} stroke={2.5} />
                </div>
                <div>
                    <div className={`font-bold ${isIg ? 'text-[11.5px]' : 'text-[12.5px]'}`} style={{ color: tone.text }}>{meta?.video ? (window.getAccountForVideo(meta.video)?.name || 'Santi.Dev') : 'Santi.Dev'}</div>
                    <div className={`font-mono ${isIg ? 'text-[9.5px]' : 'text-[10px]'}`} style={{ color: tone.sub }}>{d.by}</div>
                </div>
            </div>
        </div>
    );
};

/** Checklist de inspiración vs adaptación */
window.ChecklistSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    const Section = ({ label, icon, color, items }) => (
        <div className={isIg ? "mt-2" : "mt-3.5"}>
            <div className={`flex items-center gap-1.5 ${isIg ? 'mb-1' : 'mb-2'}`}>
                <span className="flex items-center justify-center rounded-full" style={{ width: isIg ? 18 : 22, height: isIg ? 18 : 22, background: color }}>
                    <window.Icon name={icon} size={isIg ? 10 : 12} color={color === theme.accent ? theme.ink : '#fff'} stroke={2.6} />
                </span>
                <span className={`font-mono uppercase ${isIg ? 'text-[9px]' : 'text-[10px]'} tracking-[.15em] font-bold`} style={{ color: tone.text }}>{label}</span>
            </div>
            <div className={`flex flex-col ${isIg ? 'gap-1' : 'gap-1.5'}`}>
                {items.map((t) => (
                    <div key={t} className={`rounded-xl font-bold ${isIg ? 'text-[12px]' : 'text-[14px]'}`} style={{ padding: isIg ? '6px 10px' : '10px 13px', background: tone.box, color: tone.text }}>{t}</div>
                ))}
            </div>
        </div>
    );
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} meta={meta} />}
            <div className="flex-1 flex flex-col justify-center">
                <Section label="Lo que tomé" icon="check" color={window.OK_GREEN} items={d.take} />
                <Section label="Lo que adapté" icon="pencil" color={theme.accent} items={d.adapt} />
            </div>
            {d.foot ? (
                <div className={`mt-auto ${isIg ? 'pt-1.5' : 'pt-2.5'} pb-0.5`}><window.Foot text={d.foot} tone={tone} meta={meta} /></div>
            ) : (
                <div className={`mt-auto flex items-center gap-2 ${isIg ? 'pt-2' : 'pt-3'} pb-1 border-t border-dashed`} style={{ borderColor: tone.line }}>
                    <window.Icon name="box" size={isIg ? 14 : 16} color={tone.sub} />
                    <span className={`font-mono ${isIg ? 'text-[9.5px]' : 'text-[10.5px]'}`} style={{ color: tone.sub }}>referencia ≠ copia</span>
                </div>
            )}
        </div>
    );
};

/** Cierre y llamada a la acción hacia el perfil: limpio, visual y sin enredos */
window.CtaSlide = ({ d, theme, tone, meta }) => {
    const isIg = meta?.format === 'instagram';
    const isDark = tone.bg === '#111' || tone.bg === '#0c0c0c' || (typeof tone.bg === 'string' && tone.bg.startsWith('#0'));

    return (
        <div className="flex flex-col h-full relative">
            <window.Header variant="mini" theme={theme} meta={meta} tone={tone} />

            {/* Titular directo */}
            <window.Title text={d.title} theme={theme} tone={tone} size={isIg ? '1.6rem' : '2.15rem'} meta={meta} />

            {/* Centro Visual Limpio: Enfocado en el beneficio real sin tecnicismos pesados */}
            <div className="rounded-2xl flex flex-col items-center justify-center text-center my-auto overflow-hidden" style={{
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                border: `1.5px solid ${tone.line}`,
                padding: isIg ? '10px 12px' : '18px 20px',
            }}>
                {/* Badge superior */}
                {d.kicker && (
                    <span className={`font-mono font-bold ${isIg ? 'text-[8.5px] px-2.5 py-0.5 mb-1.5' : 'text-[9.5px] px-3 py-1 mb-2.5'} uppercase tracking-widest rounded-full`} style={{ background: theme.accent, color: theme.ink }}>
                        {d.kicker}
                    </span>
                )}

                {/* Icono central de regalo o valor */}
                <div className={`${isIg ? 'w-8 h-8 rounded-xl mb-1' : 'w-11 h-11 rounded-2xl mb-2'} flex items-center justify-center shadow-sm`} style={{ background: theme.accent, color: theme.ink }}>
                    <window.Icon name={d.icon || theme.ctaIcon || 'gift'} size={isIg ? 17 : 23} stroke={2.4} />
                </div>

                {/* Frase simple y humana de beneficio */}
                <p className={`font-bold ${isIg ? 'text-[11.5px] max-w-[240px]' : 'text-[13px] max-w-[280px]'} leading-snug m-0 px-2`} style={{ color: tone.text }}>
                    {d.desc || d.sub || 'Todo configurado para que solo tengas que copiar y pegar.'}
                </p>

                {/* Pastillas limpias de apoyo */}
                {d.badges && d.badges.length > 0 && (
                    <div className={`flex flex-wrap justify-center ${isIg ? 'gap-1 mt-1.5' : 'gap-1.5 mt-2.5'}`}>
                        {d.badges.map((b, idx) => (
                            <span key={idx} className={`font-mono font-bold ${isIg ? 'text-[8.5px] px-2 py-0.5' : 'text-[10px] px-2.5 py-0.5'} rounded-lg`} style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: tone.text }}>
                                {b}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Caja de Comentario y Llamada a la Acción */}
            <div className={`mt-auto ${isIg ? 'pt-0.5' : 'pt-1'}`}>
                <div className="rounded-2xl flex items-center justify-between" style={{
                    padding: isIg ? '6.5px 10px' : '9px 14px',
                    background: '#fff',
                    boxShadow: '0 8px 24px rgba(0,0,0,.15)',
                    border: '1.5px solid rgba(0,0,0,0.06)'
                }}>
                    <div className="flex items-center gap-2 min-w-0">
                        <div className={`${isIg ? 'w-6 h-6' : 'w-7 h-7'} rounded-full flex items-center justify-center shrink-0`} style={{ background: '#111', color: '#fff' }}>
                            <window.Icon name="comment" size={isIg ? 11 : 13} color="#fff" />
                        </div>
                        <span className={`font-bold ${isIg ? 'text-[11px]' : 'text-[12px]'} text-[#111] truncate`}>
                            Comenta <span className="font-black text-[#111]">"{d.keyword}"</span>
                        </span>
                    </div>
                    <span className={`font-mono font-bold ${isIg ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-1'} rounded-lg shrink-0`} style={{ background: theme.accent, color: theme.ink }}>
                        en este post 👇
                    </span>
                </div>

                <p className={`font-semibold ${isIg ? 'text-[10px] my-1' : 'text-[11px] my-2'} leading-snug text-center`} style={{ color: tone.text }}>
                    {d.line || `Comenta "${d.keyword}" y te lo mando por mensaje directo.`}
                </p>

                <div className={`flex ${isIg ? 'gap-1.5' : 'gap-2'}`}>
                    <span className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl font-bold ${isIg ? 'text-[10px] py-1.5 px-2' : 'text-[11px] py-[7px] px-[10px]'}`} style={{ background: '#111', color: '#fff' }}>
                        <window.Icon name="userPlus" size={isIg ? 11 : 13} color="#fff" /> Seguir {meta?.video ? (window.getAccountForVideo(meta.video)?.handle || '@santi.dev') : '@santi.dev'}
                    </span>
                    <span className={`flex items-center gap-1.5 rounded-xl font-bold ${isIg ? 'text-[10px] py-1.5 px-2.5' : 'text-[11px] py-[7px] px-[12px]'}`} style={{ border: `1.5px solid ${tone.text}`, color: tone.text }}>
                        <window.Icon name="bookmark" size={isIg ? 11 : 13} color={tone.text} /> Guardar
                    </span>
                </div>
            </div>
        </div>
    );
};

/**
 * Lista de filas: icono + título + descripción + etiqueta a la derecha.
 * Sirve para planes (tag = precio), herramientas (tag = atajo), etc.
 * highlight: índice de la fila destacada en acento (opcional).
 */
window.ListSlide = ({ d, theme, tone, meta, showTitle }) => {
    const isIg = meta?.format === 'instagram';
    const compact = d.rows.length >= 4 || isIg;
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} size={isIg ? '1.55rem' : (compact ? '1.85rem' : '2.1rem')} meta={meta} />}
            <div className={`flex flex-col ${isIg ? 'gap-1' : 'gap-1.5'} flex-1 justify-center py-1`}>
                {d.rows.map((r, i) => {
                    const on = i === d.highlight;
                    return (
                        <div key={i} className={`rounded-xl flex items-center ${isIg ? 'gap-2' : 'gap-2.5'}`} style={{ padding: isIg ? '5.5px 8px' : (compact ? '7px 10px' : '9px 12px'), border: `1.5px solid ${on ? '#111' : tone.line}`, background: on ? tone.box : 'transparent' }}>
                            {(r.sprite || r.icon) && (
                                <div className={`${isIg ? 'w-6 h-6' : 'w-7 h-7'} rounded-lg flex items-center justify-center shrink-0`} style={{ background: on ? theme.accent : '#111' }}>
                                    {r.sprite ? (
                                        <window.PixelSprite name={r.sprite} size={isIg ? 15 : 18} color={on ? theme.ink : '#fff'} />
                                    ) : (
                                        <window.Icon name={r.icon} size={isIg ? 13 : 15} color={on ? theme.ink : '#fff'} />
                                    )}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className={`font-extrabold ${isIg ? 'text-[11.5px]' : 'text-[13px]'} leading-tight truncate`} style={{ color: tone.text }}>{r.t}</div>
                                {r.d && <div className={`${isIg ? 'text-[9.5px]' : 'text-[10.5px]'} font-medium leading-snug mt-0.5 truncate`} style={{ color: tone.sub }}>{r.d}</div>}
                            </div>
                            {r.tag && (
                                <span className={`font-mono font-bold ${isIg ? 'text-[8.5px]' : 'text-[9.5px]'} rounded-md shrink-0 whitespace-nowrap`} style={{ padding: isIg ? '2px 5px' : '2.5px 6px', background: on ? theme.accent : tone.box, color: on ? theme.ink : tone.text }}>{r.tag}</span>
                            )}
                        </div>
                    );
                })}
            </div>
            {d.foot && <div className={`mt-auto ${isIg ? 'pt-1' : 'pt-2'} pb-0.5`}><window.Foot text={d.foot} tone={tone} meta={meta} /></div>}
        </div>
    );
};

/** Diccionario de tipos de slide */
window.SLIDE_TYPES = {
    hero: window.HeroSlide, text: window.TextSlide, code: window.CodeSlide, image: window.ImageSlide,
    steps: window.StepsSlide, compare: window.CompareSlide, stat: window.StatSlide, flow: window.FlowSlide,
    quote: window.QuoteSlide, checklist: window.ChecklistSlide, cta: window.CtaSlide, list: window.ListSlide,
};

/** Marco exterior de la tarjeta según layout, tono y formato */
window.CardFrame = ({ d, theme, meta }) => {
    const format = meta?.format || 'tiktok';
    const isIg = format === 'instagram';
    const L = window.getLayout(d.layout, format);
    const tone = window.toneOf(theme, d.tone);
    const Body = window.SLIDE_TYPES[d.type] || window.TextSlide;

    const isPixel = theme?.cardStyle === 'pixel';
    const isTech = theme?.cardStyle === 'tech';

    let cardBorderRadius = isIg ? 20 : 28;
    let cardBoxShadow = '0 18px 40px rgba(0,0,0,.45)';
    let cardBorder = undefined;

    if (isPixel) {
        cardBorderRadius = 4;
        cardBoxShadow = `4px 4px 0 #000, 8px 8px 0 rgba(0,0,0,0.6), 0 0 0 2px ${theme.accent}`;
        cardBorder = '2px solid #000';
    } else if (isTech) {
        cardBorderRadius = isIg ? 16 : 20;
        cardBoxShadow = '0 20px 45px -10px rgba(0,0,0,0.7), 0 0 25px rgba(56, 189, 248, 0.08)';
        cardBorder = `1.5px solid ${theme.mark || 'rgba(56,189,248,0.3)'}`;
    }

    const base = {
        position: 'absolute', top: L.top, left: L.left, right: L.right, bottom: L.bottom,
        borderRadius: cardBorderRadius, background: tone.bg, boxShadow: cardBoxShadow,
        border: cardBorder,
        zIndex: 10, overflow: 'hidden', padding: isIg ? '14px 18px 12px 18px' : '22px 22px 16px 22px',
        display: 'flex', flexDirection: 'column',
    };

    if (L.split) {
        const TOP_H = isIg ? 86 : 140;
        return (
            <>
                <div style={{ ...base, bottom: 'auto', height: TOP_H, background: theme.accent, padding: isIg ? '7px 14px' : '16px 20px', justifyContent: 'space-between' }}>
                    <div className="flex items-center justify-between">
                        <span className={`rounded-full font-bold ${isIg ? 'text-[9px]' : 'text-[11px]'}`} style={{ padding: isIg ? '1.5px 7px' : '3px 10px', border: `1.5px solid ${theme.ink}`, color: theme.ink }}>{meta?.video ? (window.getAccountForVideo(meta.video)?.name || 'Santi.Dev') : 'Santi.Dev'}</span>
                        <span className={`font-mono font-bold ${isIg ? 'text-[9px]' : 'text-[11px]'}`} style={{ color: theme.ink, opacity: 0.7 }}>{window.pad(meta.index + 1)} / {window.pad(meta.total)}</span>
                    </div>
                    <window.Title text={d.title} theme={theme} tone={{ text: theme.ink }} size={isIg ? '1.35rem' : '1.95rem'} meta={meta} />
                </div>
                <div style={{ ...base, top: L.top + TOP_H + (isIg ? 6 : 10) }}>
                    <Body d={{ ...d, header: 'none' }} theme={theme} tone={tone} meta={meta} showTitle={false} />
                </div>
            </>
        );
    }

    return (
        <>
            {L.back && (
                <div style={{ ...base, zIndex: 9, boxShadow: 'none', transform: 'rotate(2.6deg)', background: d.tone === 'accent' ? '#F5F2EB' : theme.accent }} />
            )}
            <div style={{ ...base, transform: L.rotate ? `rotate(${L.rotate}deg)` : undefined }}>
                <Body d={d} theme={theme} tone={tone} meta={meta} showTitle={true} />
            </div>
        </>
    );
};

/** Patrón de cuadrícula técnica vectorial SVG: nítido y consistente en todos los motores de render */
window.GridPattern = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 0 }}>
        <defs>
            <pattern id="blueprint-grid" width="27" height="27" patternUnits="userSpaceOnUse">
                <path d="M 27 0 L 0 0 0 27" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
    </svg>
);

/**
 * Capa de Elementos Personalizados y Flotantes (Iconos Locales + Lucide 1400+, Badges y Textos)
 * Renderiza dinámicamente elementos adicionales creados desde la pestaña "+ Elementos" del Studio Inspector.
 * Garantiza fidelidad visual tanto en previsualización como en la exportación PNG a 1080x1920 y 1080x1350.
 */
window.CustomElementsOverlay = ({ elements = [], theme, format = 'tiktok', meta, d }) => {
    if (!elements || !Array.isArray(elements) || elements.length === 0) return null;
    const isIg = format === 'instagram';
    const L = window.getLayout ? window.getLayout(d?.layout, format) : null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 25 }}>
            {elements.map((el) => {
                if (!el || !el.id) return null;

                // Cálculo adaptativo de posición en el lienzo
                let posStyle = {};
                const padX = isIg ? 18 : 26;
                const padY = isIg ? 18 : 28;

                switch (el.position) {
                    case 'top-left':
                        posStyle = { top: padY, left: padX };
                        break;
                    case 'top-right':
                        posStyle = { top: padY, right: padX };
                        break;
                    case 'bottom-left':
                        posStyle = { bottom: padY, left: padX };
                        break;
                    case 'bottom-right':
                        posStyle = { bottom: padY, right: padX };
                        break;
                    case 'center':
                        posStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
                        break;
                    case 'card-top-right':
                        // Esquina superior derecha de la tarjeta editorial
                        posStyle = {
                            top: L ? L.top + (isIg ? 14 : 20) : (isIg ? 110 : 160),
                            right: L ? L.right + (isIg ? 14 : 20) : (isIg ? 26 : 34)
                        };
                        break;
                    case 'card-bottom-right':
                        // Esquina inferior derecha de la tarjeta editorial
                        posStyle = {
                            bottom: L ? L.bottom + (isIg ? 14 : 20) : (isIg ? 50 : 80),
                            right: L ? L.right + (isIg ? 14 : 20) : (isIg ? 26 : 34)
                        };
                        break;
                    case 'custom':
                        posStyle = {
                            top: el.top !== undefined ? el.top : '20%',
                            left: el.left !== undefined ? el.left : '50%',
                            transform: 'translate(-50%, -50%)'
                        };
                        break;
                    default:
                        posStyle = { top: padY, right: padX };
                }

                if (el.rotate) {
                    posStyle.transform = `${posStyle.transform || ''} rotate(${el.rotate}deg)`.trim();
                }

                // 1. Elemento tipo Icono (Biblioteca Local + Lucide 1400+)
                if (el.type === 'icon') {
                    const iconColor = el.color || theme?.accent || '#ffffff';
                    const iconSize = isIg ? Math.max(16, Math.round((el.size || 28) * 0.85)) : (el.size || 28);
                    const strokeWidth = el.strokeWidth || 2.4;

                    return (
                        <div
                            key={el.id}
                            style={{ position: 'absolute', ...posStyle, zIndex: el.zIndex || 25 }}
                            className="flex items-center justify-center animate-fadeIn"
                        >
                            {el.box ? (
                                <div
                                    className="flex items-center justify-center shadow-xl backdrop-blur-sm"
                                    style={{
                                        background: el.bg || '#111111',
                                        borderRadius: isIg ? 10 : 14,
                                        padding: isIg ? '6px 8px' : '8px 12px',
                                        border: `1.5px solid ${el.borderColor || theme?.accent || 'rgba(255,255,255,0.2)'}`
                                    }}
                                >
                                    <window.Icon
                                        name={el.name}
                                        size={iconSize}
                                        color={iconColor}
                                        strokeWidth={strokeWidth}
                                        fill={el.fill || 'none'}
                                    />
                                    {el.label && (
                                        <span
                                            className="font-mono font-bold uppercase tracking-wider ml-1.5"
                                            style={{ color: iconColor, fontSize: isIg ? '9.5px' : '11px' }}
                                        >
                                            {el.label}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <div className="p-1 drop-shadow-md">
                                    <window.Icon
                                        name={el.name}
                                        size={iconSize}
                                        color={iconColor}
                                        strokeWidth={strokeWidth}
                                        fill={el.fill || 'none'}
                                    />
                                </div>
                            )}
                        </div>
                    );
                }

                // 2. Elemento tipo Badge / Chip destacado
                if (el.type === 'badge') {
                    const bg = el.bg || '#111111';
                    const color = el.color || '#ffffff';
                    const border = el.border || `1.5px solid ${theme?.accent || 'rgba(255,255,255,0.25)'}`;
                    const fontSize = isIg ? '9.5px' : '11px';

                    return (
                        <div
                            key={el.id}
                            style={{
                                position: 'absolute',
                                ...posStyle,
                                zIndex: el.zIndex || 25,
                                background: bg,
                                color: color,
                                border: border,
                                fontSize: fontSize,
                            }}
                            className="px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl backdrop-blur-sm animate-fadeIn"
                        >
                            {el.icon && (
                                <window.Icon
                                    name={el.icon}
                                    size={isIg ? 11 : 13}
                                    color={color}
                                    strokeWidth={2.4}
                                />
                            )}
                            <span>{el.text}</span>
                        </div>
                    );
                }

                // 3. Elemento tipo Texto / Sticker adicional
                if (el.type === 'text') {
                    const fontSize = isIg ? (el.size ? el.size * 0.85 : 12) : (el.size || 14);
                    return (
                        <div
                            key={el.id}
                            style={{
                                position: 'absolute',
                                ...posStyle,
                                zIndex: el.zIndex || 25,
                                color: el.color || '#ffffff',
                                fontSize: `${fontSize}px`,
                                maxWidth: isIg ? '280px' : '340px',
                                background: el.bg || 'transparent',
                                padding: el.bg ? '5px 10px' : '0',
                                borderRadius: el.bg ? '8px' : '0',
                                border: el.border || 'none',
                            }}
                            className={`font-sans font-extrabold leading-snug drop-shadow-md select-none animate-fadeIn ${el.fontMono ? 'font-mono' : ''}`}
                        >
                            {el.text}
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
};

/**
 * =====================================================================
 * MOVA APP · SISTEMA DE COMPONENTES MODULARES (FULL-BLEED 4:5 Y 9:16)
 * =====================================================================
 * Arquitectura atómica y escalable:
 *   - Primitivos: MovaHeader, MovaTitle, MovaFooter, MovaCard, MovaFootNote
 *   - Vistas por pantalla: Hero, Scenarios, Flow, Pillars, Timeline,
 *     QuoteHero, Comparison, Stat, School, Camera, Community, Cta
 *   - Cero código duplicado (DRY) y adaptación automática TikTok / Instagram
 * =====================================================================
 */

/** Cabecera oficial: Kicker contextual a la izquierda y logotipo nítido oficial a la derecha */
window.MovaHeader = ({ kicker, isTiktok }) => (
    <div className="flex items-center justify-between w-full shrink-0 z-20">
        <div className="flex items-center min-w-0 pr-2">
            {kicker ? (
                <span className={`inline-block bg-orange-500/15 text-orange-400 ${isTiktok ? 'text-[10px]' : 'text-[8.5px]'} font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-orange-500/25 shadow-sm truncate`}>
                    {kicker}
                </span>
            ) : (
                <span className={`inline-block bg-white/10 text-white/70 ${isTiktok ? 'text-[9.5px]' : 'text-[8px]'} font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10`}>
                    @mova.app
                </span>
            )}
        </div>
        <div
            className={`flex items-center ${isTiktok ? 'px-2.5 py-1' : 'px-2 py-0.5'} rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-sm shrink-0 select-none overflow-hidden`}
            style={{ maxHeight: isTiktok ? '28px' : '20px', maxWidth: isTiktok ? '120px' : '85px' }}
        >
            <img
                src="assets/mova_logo_clean.png"
                alt="Mova · Rompiendo el silencio"
                style={{
                    height: isTiktok ? '20px' : '14px',
                    maxHeight: isTiktok ? '20px' : '14px',
                    width: 'auto',
                    maxWidth: isTiktok ? '100px' : '75px',
                    objectFit: 'contain',
                    display: 'block'
                }}
                className="drop-shadow shrink-0"
            />
        </div>
    </div>
);

/** Titular y subtítulo de la diapositiva con rotulador dinámico */
window.MovaTitle = ({ title, sub, isTiktok }) => (
    <div className="flex flex-col shrink-0">
        {title && (
            <h2 className={`${isTiktok ? 'text-[1.95rem] leading-[1.15]' : 'text-[1.28rem] leading-[1.14]'} font-black tracking-tight text-white m-0`}>
                {window.rich(title, '#ff9f43')}
            </h2>
        )}
        {sub && (
            <p className={`${isTiktok ? 'text-[14px] mt-2' : 'text-[10px] mt-1'} text-white/85 font-medium leading-relaxed mb-0`}>
                {sub}
            </p>
        )}
    </div>
);

/** Pie de página oficial de la diapositiva de Mova */
window.MovaFooter = ({ isTiktok }) => (
    <div className={`flex items-center justify-between w-full ${isTiktok ? 'pt-2 text-[9.5px]' : 'pt-1 text-[8.5px]'} shrink-0 border-t border-white/10 text-white/60 z-20`}>
        <div className="flex items-center gap-1.5 font-bold text-white/80">
            <window.Icon name="movaWave" size={isTiktok ? 12 : 10} color="#f97316" />
            <span>@mova.app</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-orange-400 font-medium">Rompiendo el silencio</span>
            <span className="text-white/30">·</span>
            <span className="text-white/50">Caracas 2026</span>
        </div>
    </div>
);

/** Tarjeta base de contenido Mova */
window.MovaCard = ({ icon, title, tag, badge, desc, isTiktok, titleColor = 'text-white', borderColor = 'border-white/12', bg = 'bg-white/8', children }) => (
    <div className={`${isTiktok ? 'p-3' : 'p-2'} rounded-xl ${bg} backdrop-blur-md border ${borderColor} flex items-start gap-2.5 shadow-sm`}>
        {icon && (
            typeof icon === 'string' && icon.length <= 4 ? (
                <span className="text-base shrink-0 select-none mt-0.5">{icon}</span>
            ) : (
                <div className="shrink-0 mt-0.5">{icon}</div>
            )
        )}
        <div className="flex flex-col min-w-0 flex-1">
            {(title || tag || badge) && (
                <div className="flex items-center gap-1.5 flex-wrap">
                    {title && (
                        <span className={`${isTiktok ? 'text-[12px]' : 'text-[10px]'} font-extrabold ${titleColor} tracking-tight leading-tight`}>
                            {title}
                        </span>
                    )}
                    {tag && (
                        <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                            {tag}
                        </span>
                    )}
                    {badge && (
                        <span className="text-[7.5px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30">
                            {badge}
                        </span>
                    )}
                </div>
            )}
            {desc && (
                <p className={`${isTiktok ? 'text-[11.5px] mt-1' : 'text-[9.5px] mt-0.5'} text-white/80 leading-snug m-0`}>
                    {desc}
                </p>
            )}
            {children}
        </div>
    </div>
);

/** Nota al pie con tono semántico */
window.MovaFootNote = ({ text, isTiktok, tone = 'orange' }) => {
    if (!text) return null;
    const toneClasses = tone === 'blue'
        ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
        : tone === 'rose'
        ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
        : 'bg-orange-500/10 border border-orange-500/20 text-orange-300';

    return (
        <div className={`${isTiktok ? 'p-3 text-[12px]' : 'p-1.5 text-[9px]'} rounded-xl ${toneClasses} leading-relaxed shrink-0`}>
            {window.rich(text, '#ff9f43')}
        </div>
    );
};

// ==================== VISTAS ESPECÍFICAS DE PANTALLA (MOVA) ====================

/** Atmósfera visual oficial de Mova: azul marino profundo (#05163F) con iluminación naranja y azul */
window.getMovaThemeAtmosphere = (_videoId) => {
    return {
        bg: '#05163F',
        gradient: 'radial-gradient(ellipse at 50% 12%, rgba(255, 165, 0, 0.22) 0%, rgba(59, 130, 246, 0.16) 45%, #05163F 85%)',
        glow: 'radial-gradient(circle at 85% 85%, rgba(59, 130, 246, 0.12) 0%, transparent 50%), radial-gradient(circle at 15% 90%, rgba(255, 165, 0, 0.08) 0%, transparent 40%)',
        accent: '#f97316',
        badgeBg: 'bg-orange-500/15 border-orange-500/25 text-orange-400'
    };
};

/** 1. VIDEO 1 - SLIDE 1: Hero Tipográfico Monumental de Manifiesto */
window.MovaManifestoTypoHero = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-between py-2 select-none text-left">
        <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span className={`${isTiktok ? 'text-[11px]' : 'text-[9px]'} font-mono uppercase tracking-widest text-orange-400 font-extrabold`}>
                MANIFIESTO FUNDACIONAL · 2026
            </span>
        </div>

        <div className="my-auto flex flex-col gap-3">
            <h1 className={`${isTiktok ? 'text-[2.35rem] leading-[1.08]' : 'text-[1.5rem] leading-[1.12]'} font-black text-white tracking-tight m-0`}>
                {window.rich(d.title || '70 millones de personas hablan con sus manos. *El mundo decidió no escuchar.*', '#ff9f43')}
            </h1>
            <p className={`${isTiktok ? 'text-[14px]' : 'text-[10.5px]'} text-white/80 leading-relaxed font-medium m-0`}>
                {d.sub || 'Mova no nació como una app más: nació para derribar la muralla invisible que aísla a la comunidad sorda en su propio país.'}
            </p>
        </div>

        <div className={`p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between ${isTiktok ? 'text-[10.5px]' : 'text-[9px]'}`}>
            <div className="flex items-center gap-1.5 text-white/60 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>NIVEL DE SILENCIO: 100%</span>
            </div>
            <span className="font-bold text-orange-400">LA BARRERA ES SOCIAL, NO BIOLÓGICA</span>
        </div>
    </div>
);

/** 2. VIDEO 1 - SLIDE 2: Métrica de Impacto con Barra Visual de Proporción */
window.MovaStatRatioView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-center ${isTiktok ? 'gap-3.5 py-2' : 'gap-1.5 py-0.5'}`}>
        <div className={`flex items-center gap-4 ${isTiktok ? 'p-4 rounded-2xl' : 'p-2.5 rounded-xl'} bg-white/8 backdrop-blur-md border border-white/15 shadow-lg shrink-0`}>
            <div className={`${isTiktok ? 'text-[3.6rem]' : 'text-[2.3rem]'} font-black leading-none text-orange-400 font-mono tracking-tighter shrink-0`}>
                {d.number || '70M'}
            </div>
            <div className={`${isTiktok ? 'text-[13px] leading-snug' : 'text-[10px] leading-tight'} font-bold text-white/90`}>
                {d.label || 'de personas en el mundo se comunican con sus manos'}
            </div>
        </div>

        <div className={`flex flex-col gap-2 ${isTiktok ? 'p-3.5 rounded-2xl' : 'p-2 rounded-xl'} bg-black/40 border border-white/10 shrink-0`}>
            <div className={`flex items-center justify-between ${isTiktok ? 'text-[10px]' : 'text-[9px]'} font-mono text-white/80`}>
                <span className="text-orange-400 font-bold">0.8% Sabe Señas</span>
                <span className="text-white/50">99.2% Población Oyente Indiferente</span>
            </div>
            <div className={`w-full ${isTiktok ? 'h-2.5' : 'h-2'} rounded-full bg-white/10 overflow-hidden flex`}>
                <div className="h-full bg-orange-500" style={{ width: '8%' }} />
                <div className="h-full bg-white/20 flex-1" />
            </div>
            <p className={`${isTiktok ? 'text-[11.5px] leading-relaxed' : 'text-[9px] leading-snug'} text-white/75 m-0 mt-0.5`}>
                {d.ratioDesc || 'La barrera no es médica ni biológica: es la indiferencia de una sociedad que nunca se detuvo a aprender.'}
            </p>
        </div>

        <window.MovaFootNote text={d.foot} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 3. VIDEO 1 - SLIDE 3: Viñeta Cinematográfica de Urgencia Hospitalaria */
window.MovaMedicalEmergencyView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-2 gap-3' : 'py-1 gap-1.5'} select-none text-left`}>
        <div className="relative rounded-2xl overflow-hidden border border-rose-500/40 bg-gradient-to-b from-rose-950/40 via-black/80 to-black/90 p-4 shadow-2xl flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span>SALA DE EMERGENCIAS · 02:40 AM</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[8.5px] font-bold">CRÍTICO</span>
            </div>

            <div className="my-auto flex flex-col gap-2">
                <span className={`${isTiktok ? 'text-[15px]' : 'text-[11.5px]'} font-black text-white leading-snug`}>
                    "Llegas con dolor agudo en el pecho. El doctor pregunta qué sientes. Respondes con tus manos."
                </span>
                <div className={`p-3 rounded-xl bg-black/60 border-l-2 border-rose-500 text-rose-200/90 italic ${isTiktok ? 'text-[12.5px]' : 'text-[9.5px]'}`}>
                    «El médico no entiende señas. Tú no puedes hablar. Nadie en el hospital sabe cómo comunicarse contigo. El tiempo corre.»
                </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-white/50">
                <span>ESTA ESCENA OCURRE TODOS LOS DÍAS</span>
                <span className="text-rose-400 font-bold">MOVA EXISTE PARA QUE NO VUELVA A PASAR</span>
            </div>
        </div>
        <window.MovaFootNote text={d.foot} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 4. VIDEO 1 - SLIDE 4: Cita Editorial Tipográfica de Revista */
window.MovaQuoteEditorialView = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-center py-2 select-none">
        <div className={`relative ${isTiktok ? 'pl-4 border-l-4' : 'pl-3.5 border-l-2'} border-amber-400 my-auto flex flex-col ${isTiktok ? 'gap-3' : 'gap-2'}`}>
            <span className={`text-amber-400 font-serif ${isTiktok ? 'text-4xl' : 'text-3xl'} leading-none`}>“</span>
            <p className={`${isTiktok ? 'text-[16px] leading-relaxed' : 'text-[11.5px] leading-snug'} font-bold text-white/95 m-0 tracking-tight`}>
                {d.quote}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-1">
                <div className="flex flex-col text-left">
                    <span className={`${isTiktok ? 'text-[12px]' : 'text-[10px]'} font-black text-amber-300`}>{d.quoteAuthor}</span>
                    {d.quoteRole && <span className="text-[8.5px] text-white/60 font-mono">{d.quoteRole}</span>}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[8px] font-mono text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>CARACAS · 2026</span>
                </div>
            </div>
        </div>
        <window.MovaFootNote text={d.foot} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 5. VIDEO 1 - SLIDE 5: CTA de Firma del Manifiesto Ético */
window.MovaManifestoCitizenCta = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-between py-2 select-none text-center">
        <div className={`my-auto p-5 rounded-2xl bg-gradient-to-b from-white/12 to-white/5 border border-white/20 shadow-2xl flex flex-col ${isTiktok ? 'gap-3.5' : 'gap-2'}`}>
            <img
                src="assets/mova_logo_clean.png"
                alt="Mova"
                style={{
                    height: isTiktok ? '36px' : '24px',
                    maxHeight: isTiktok ? '36px' : '24px',
                    width: 'auto',
                    maxWidth: '120px',
                    objectFit: 'contain',
                    display: 'block'
                }}
                className="mx-auto drop-shadow-md shrink-0"
            />
            <h3 className={`${isTiktok ? 'text-[1.4rem]' : 'text-[1.05rem]'} font-black text-white m-0 tracking-tight`}>
                ¿Te sumas a este Manifiesto?
            </h3>
            <p className={`${isTiktok ? 'text-[12px]' : 'text-[9.5px]'} text-white/80 leading-relaxed m-0`}>
                No permitas que el silencio siga siendo la norma para 70 millones de personas en el mundo.
            </p>

            <div className="flex flex-col gap-1.5 text-left my-1">
                {[
                    '✓ La comunicación es un derecho humano innegociable',
                    '✓ La tecnología de inclusión debe ser 100% gratuita',
                    '✓ Ninguna persona sorda debe quedar aislada en una emergencia'
                ].map((item, idx) => (
                    <div key={idx} className={`p-2 rounded-lg bg-black/30 border border-white/10 ${isTiktok ? 'text-[11px]' : 'text-[8.5px]'} font-semibold text-orange-300`}>
                        {item}
                    </div>
                ))}
            </div>

            <div className={`w-full ${isTiktok ? 'py-3 text-xs' : 'py-2 text-[10px]'} bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl font-black text-white shadow-lg cursor-pointer flex items-center justify-center gap-2`}>
                <span>FIRMA Y COMPARTE ESTE MANIFIESTO</span>
            </div>
        </div>
        <div className={`${isTiktok ? 'text-[11px]' : 'text-[9px]'} font-mono text-white/50`}>
            Sigue a @mova.app · Caracas · 2026
        </div>
    </div>
);

/** 6. VIDEO 2 - SLIDE 1: Hero Fotoperiodístico Polaroid (Colegio La Consolación) */
window.MovaSchoolPolaroidHero = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-between py-1 select-none text-left">
        <div className={`relative rounded-2xl overflow-hidden border-2 border-amber-300/30 bg-black/60 shadow-2xl ${isTiktok ? 'p-3' : 'p-2.5'} flex flex-col gap-2`}>
            <div className={`relative w-full ${isTiktok ? 'h-40' : 'h-24'} rounded-xl overflow-hidden bg-neutral-900 border border-white/15`}>
                <img
                    src="assets/mova_estudiantes_aula.jpg"
                    alt="Aula La Consolación"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[8.5px] font-mono text-amber-300 border border-amber-400/30">
                    FOTO REAL · PATIO DEL RECREO
                </div>
            </div>
            <div className="flex items-center justify-between px-1 text-[8.5px] font-mono text-white/60">
                <span>COLEGIO LA CONSOLACIÓN · CARACAS</span>
                <span className="text-amber-400 font-bold">HISTORIA VERÍDICA</span>
            </div>
        </div>

        <div className="my-auto flex flex-col gap-1.5 mt-2">
            <h2 className={`${isTiktok ? 'text-[1.85rem] leading-[1.12]' : 'text-[1.24rem] leading-[1.14]'} font-black text-white m-0`}>
                {window.rich(d.title || 'Nos negamos a que este proyecto fuera *otra cartulina de adorno.*', '#f59e0b')}
            </h2>
            <p className={`${isTiktok ? 'text-[13px]' : 'text-[9.5px]'} text-white/80 leading-relaxed m-0`}>
                {d.sub || 'Mova nació en los pasillos de nuestro colegio al ver que dos compañeros querían ser amigos, pero el silencio se interponía.'}
            </p>
        </div>
        <window.MovaFootNote text={d.foot || 'Inspiración real nacida en las aulas venezolanas'} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 7. VIDEO 2 - SLIDE 2: Storyboard de Recreo en 3 Tiempos */
window.MovaRecreoStoryboardView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-2 gap-3' : 'py-1 gap-1.5'} select-none text-left`}>
        <div className="flex flex-col gap-2 my-auto">
            {[
                { time: '10:00 AM', title: 'Suena el timbre', desc: 'Los estudiantes corren al patio a jugar fútbol y reírse.', tag: 'Recreo', color: 'border-white/20' },
                { time: '10:05 AM', title: 'El cruce de miradas', desc: 'Carlos quiere invitar a Daniel a jugar. Daniel es sordo. Carlos no sabe señas.', tag: 'Dilema', color: 'border-amber-400/40 bg-amber-950/20' },
                { time: '10:10 AM', title: 'La muralla invisible', desc: 'El partido sigue, pero Daniel queda solo en la orilla del patio. El silencio ganó.', tag: 'El Dolor', color: 'border-rose-500/40 bg-rose-950/20' }
            ].map((step, idx) => (
                <div key={idx} className={`p-3 rounded-xl border ${step.color} bg-black/40 flex items-start gap-3 shadow-md`}>
                    <div className="px-2 py-1 rounded bg-white/10 text-amber-300 font-mono text-[9px] font-bold shrink-0">
                        {step.time}
                    </div>
                    <div className="flex flex-col">
                        <span className={`${isTiktok ? 'text-[12px]' : 'text-[10.5px]'} font-black text-white`}>{step.title}</span>
                        <span className={`${isTiktok ? 'text-[10.5px]' : 'text-[9px]'} text-white/75 mt-0.5 leading-snug`}>{step.desc}</span>
                    </div>
                </div>
            ))}
        </div>
        <window.MovaFootNote text={d.foot || 'Ese día decidimos que la tecnología tenía que resolver esto'} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 8. VIDEO 2 - SLIDE 3: Boleta de Calificaciones (20/20 vs Realidad) */
window.MovaReportCardDilemmaView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-2 gap-3' : 'py-1 gap-1.5'} select-none text-left`}>
        <div className="p-4 rounded-2xl bg-black/60 border border-amber-400/30 flex flex-col gap-3 my-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                    EVALUACIÓN DE IMPACTO ESCOLAR
                </span>
                <span className="text-[8.5px] font-mono text-white/50">Caracas · 5to Año</span>
            </div>

            <div className="flex flex-col gap-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                        <div className={`${isTiktok ? 'text-[12px]' : 'text-[10.5px]'} font-bold text-white`}>Feria de Ciencias & Proyecto</div>
                        <div className="text-[8.5px] text-white/60">Maqueta bonita, diapositivas y teoría</div>
                    </div>
                    <div className={`${isTiktok ? 'text-2xl' : 'text-lg'} font-black text-emerald-400 font-mono`}>
                        20 / 20
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
                    <div>
                        <div className={`${isTiktok ? 'text-[12px]' : 'text-[10.5px]'} font-bold text-rose-300`}>Impacto Real si se queda en papel</div>
                        <div className="text-[8.5px] text-white/60">Archivado en una gaveta escolar sin cambiar nada</div>
                    </div>
                    <div className={`${isTiktok ? 'text-2xl' : 'text-lg'} font-black text-rose-400 font-mono`}>
                        00 / 20
                    </div>
                </div>
            </div>

            <p className={`${isTiktok ? 'text-[11.5px]' : 'text-[9.5px]'} text-amber-200/90 font-medium italic m-0 pt-1 border-t border-white/10`}>
                "Nos negamos a sacar 20 y dejar a nuestros compañeros en el mismo silencio."
            </p>
        </div>
        <window.MovaFootNote text={d.foot || 'Por eso llevamos Mova de la teoría al software funcional'} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 9. VIDEO 2 - SLIDE 4: Reproductor de Nota de Voz de los Estudiantes */
window.MovaStudentVoiceNoteView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-2 gap-3' : 'py-1 gap-1.5'} select-none text-left`}>
        <div className="p-4 rounded-2xl bg-black/60 border border-amber-400/30 flex flex-col gap-3 my-auto shadow-2xl">
            <div className="flex items-center gap-2 text-amber-300 font-mono text-[9.5px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>NOTA DE VOZ · EQUIPO ESTUDIANTIL MOVA</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs shrink-0">
                    ▶
                </div>
                <div className="flex-1 flex items-center gap-1 h-6">
                    {[40, 70, 30, 90, 60, 100, 45, 80, 65, 30, 85, 95, 40, 75, 55, 35, 90, 60].map((h, i) => (
                        <span key={i} className="flex-1 bg-amber-400/70 rounded-full" style={{ height: `${h}%` }} />
                    ))}
                </div>
                <span className="text-[10px] font-mono text-white/70 shrink-0">0:24</span>
            </div>

            <blockquote className={`${isTiktok ? 'text-[13px] leading-relaxed' : 'text-[10px] leading-snug'} text-white/95 font-medium italic m-0 pl-3 border-l-2 border-amber-400`}>
                «Los adultos nos dijeron que esperáramos a graduarnos de ingenieros. Les respondimos que Daniel necesita comunicarse hoy en su recreo, no dentro de cinco años.»
            </blockquote>
        </div>
        <window.MovaFootNote text={d.foot || 'Determinación juvenil convertida en solución real'} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 10. VIDEO 2 - SLIDE 5: CTA Pasaporte Escolar */
window.MovaSchoolAmbassadorCta = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-between py-2 select-none text-center">
        <div className={`my-auto p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 via-neutral-900/90 to-black/80 border border-amber-400/40 shadow-2xl flex flex-col ${isTiktok ? 'gap-3.5' : 'gap-2'}`}>
            <span className="px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 font-mono text-[9px] font-bold mx-auto">
                RED DE COLEGIOS & DOCENTES
            </span>

            <h3 className={`${isTiktok ? 'text-[1.4rem]' : 'text-[1.05rem]'} font-black text-white m-0 tracking-tight`}>
                Lleva Mova a tu Aula
            </h3>

            <p className={`${isTiktok ? 'text-[12px]' : 'text-[9.5px]'} text-white/80 leading-relaxed m-0`}>
                ¿Estudias o enseñas en una escuela o universidad? La verdadera inclusión no empieza en una ley: empieza en el pupitre.
            </p>

            <div className={`w-full ${isTiktok ? 'py-3 text-xs' : 'py-2 text-[10px]'} bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-black text-white shadow-lg cursor-pointer flex items-center justify-center gap-2`}>
                <span>SELLO DE EMBAJADOR ESCOLAR · @MOVA.APP</span>
            </div>
        </div>
        <div className={`${isTiktok ? 'text-[11px]' : 'text-[9px]'} font-mono text-white/50`}>
            Colegio La Consolación · Caracas · Venezuela
        </div>
    </div>
);

/** 11. VIDEO 3 - SLIDE 1: Hero Holográfico Scanner Hand (Nuestra Idea) */
window.MovaAiScannerHero = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-between py-1 select-none text-left">
        <div className={`relative rounded-2xl overflow-hidden border border-sky-400/40 bg-black/70 shadow-2xl ${isTiktok ? 'p-3' : 'p-2.5'} flex flex-col gap-2`}>
            <div className={`relative w-full ${isTiktok ? 'h-40' : 'h-24'} rounded-xl overflow-hidden bg-neutral-950 border border-sky-500/20`}>
                <img
                    src="assets/mova_ai_vision_hand.jpg"
                    alt="AI Vision Scanner"
                    className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[8.5px] font-mono text-sky-300 border border-sky-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>21 LANDMARKS ON-DEVICE</span>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-sky-950/80 text-[8px] font-mono text-sky-200">
                    TFLITE · 60 FPS
                </div>
            </div>
            <div className="flex items-center justify-between px-1 text-[8.5px] font-mono text-sky-300/80">
                <span>VISIÓN POR COMPUTADORA EN EL CHIP</span>
                <span className="text-emerald-400 font-bold">0 MB NUBE</span>
            </div>
        </div>

        <div className="my-auto flex flex-col gap-1.5 mt-2">
            <h2 className={`${isTiktok ? 'text-[1.85rem] leading-[1.12]' : 'text-[1.24rem] leading-[1.14]'} font-black text-white m-0`}>
                {window.rich(d.title || 'La cámara de tu teléfono *ahora se convierte en tu voz.*', '#38bdf8')}
            </h2>
            <p className={`${isTiktok ? 'text-[13px]' : 'text-[9.5px]'} text-white/80 leading-relaxed m-0`}>
                {d.sub || 'Sin enviar tus gestos a servidores en el extranjero: inferencia instantánea que respeta tu privacidad.'}
            </p>
        </div>
        <window.MovaFootNote text={d.foot || 'Arquitectura móvil optimizada para cualquier dispositivo'} isTiktok={isTiktok} tone="blue" />
    </div>
);

/** 12. VIDEO 3 - SLIDE 2: Mockup HUD de la Cámara en Vivo a 60 FPS */
window.MovaCameraHudView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-center ${isTiktok ? 'gap-2 py-1' : 'gap-1 py-0.5'} select-none`}>
        <div className={`relative w-full ${isTiktok ? 'h-[250px]' : 'h-[165px]'} rounded-2xl bg-black/90 border border-sky-400/30 overflow-hidden flex flex-col justify-between p-2.5 shadow-2xl shrink-0`}>
            <div className="flex items-center justify-between z-10">
                <span className="px-2 py-0.5 rounded-full bg-white/15 text-[8.5px] font-semibold text-white">‹ Menú</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/70 border border-sky-400/30 text-[8.5px] font-mono font-bold text-sky-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE · 60 FPS</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/70 border border-white/20 text-[8px] font-mono text-white">LSV 🇻🇪</span>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-0.5">
                <img
                    src="assets/mova_ai_vision_hand.jpg"
                    alt="Visión Artificial"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-xl"
                />
                <div className="relative z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-white text-neutral-950 shadow-xl">
                    <span className="text-base">🤝</span>
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] font-black tracking-tight leading-none">"HOLA, BUENOS DÍAS"</span>
                        <span className="text-[7.5px] font-semibold text-sky-600 mt-0.5">Vocalizado en 32ms · 99.4% confianza</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1 overflow-hidden z-10 justify-center">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[8px] font-semibold text-white">👋 Saludo</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[8px] font-semibold text-white">❤️ Gracias</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[8px] font-semibold text-white">💧 Agua</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[8px] font-semibold text-white">❓ Ayuda</span>
            </div>
        </div>
        <div className={`${isTiktok ? 'text-[10.5px]' : 'text-[9px]'} text-white/70 font-medium text-center shrink-0`}>
            {d.foot || '100% en el procesador local · Cero megas gastados · Privacidad total'}
        </div>
    </div>
);

/** 13. VIDEO 3 - SLIDE 3: Pipeline Horizontal de Chip (3 Nodos) */
window.MovaHorizontalChipFlowView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-2 gap-3' : 'py-1 gap-1.5'} select-none text-left`}>
        <div className="flex flex-col gap-2 my-auto">
            {[
                { node: '01', title: 'Sensor de Cámara a 60 FPS', tech: 'Frame Capture', desc: 'Captura el movimiento continuo de las manos y la posición de los dedos sin saltos.', color: 'border-sky-500/30 text-sky-300' },
                { node: '02', title: 'Inferencia Neural On-Device', tech: 'TFLite + MediaPipe', desc: '21 puntos biométricos procesados directamente en el procesador local en 18 milisegundos.', color: 'border-emerald-500/30 text-emerald-300' },
                { node: '03', title: 'Síntesis Vocal Inmediata', tech: 'Audio Pipeline', desc: 'Convierte el gesto en voz audible o texto para que cualquier persona oyente entienda.', color: 'border-amber-500/30 text-amber-300' }
            ].map((st, i) => (
                <div key={i} className={`p-3 rounded-xl border ${st.color} bg-black/50 flex items-start gap-3 shadow-md`}>
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-mono font-black text-xs shrink-0">
                        {st.node}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <span className={`${isTiktok ? 'text-[12px]' : 'text-[10px]'} font-black text-white`}>{st.title}</span>
                            <span className="text-[7.5px] font-mono text-white/50">{st.tech}</span>
                        </div>
                        <span className={`${isTiktok ? 'text-[10.5px]' : 'text-[8.5px]'} text-white/70 mt-0.5 leading-snug`}>{st.desc}</span>
                    </div>
                </div>
            ))}
        </div>
        <window.MovaFootNote text={d.foot || 'Pipeline de baja latencia: más rápido que un parpadeo'} isTiktok={isTiktok} tone="blue" />
    </div>
);

/** 14. VIDEO 3 - SLIDE 4: Bóveda de Privacidad (Cloud vs On-Device) */
window.MovaPrivacyVaultView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-2 gap-3' : 'py-1 gap-1.5'} select-none text-left`}>
        <div className="grid grid-cols-1 gap-2 my-auto">
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex flex-col gap-1">
                <div className="flex items-center justify-between text-rose-400 font-bold text-[10.5px]">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs">🚫</span>
                        <span>Sin Subir Gestos a la Nube</span>
                    </div>
                    <span className="text-[7.5px] font-mono uppercase bg-rose-500/20 px-1 rounded">Rechazado</span>
                </div>
                <p className={`${isTiktok ? 'text-[11px]' : 'text-[9px]'} text-white/80 leading-snug m-0`}>
                    Tus expresiones y conversaciones íntimas jamás se almacenarán ni venderán a servidores de Big Tech.
                </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex flex-col gap-1">
                <div className="flex items-center justify-between text-emerald-300 font-bold text-[10.5px]">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs">🔒</span>
                        <span>Bóveda Local On-Device</span>
                    </div>
                    <span className="text-[7.5px] font-mono uppercase bg-emerald-500/20 px-1 rounded">100% Seguro</span>
                </div>
                <p className={`${isTiktok ? 'text-[11px]' : 'text-[9px]'} text-white/95 leading-snug m-0`}>
                    Lo que dices con tus manos nace en tu cámara y muere en tu memoria RAM al instante. Privacidad absoluta.
                </p>
            </div>
        </div>
        <window.MovaFootNote text={d.foot || 'Tu intimidad es un derecho, no una moneda de cambio'} isTiktok={isTiktok} tone="blue" />
    </div>
);

/** 15. VIDEO 3 - SLIDE 5: CTA Terminal de Beta Testers */
window.MovaBetaTesterTerminalCta = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-between py-2 select-none text-center">
        <div className={`my-auto p-5 rounded-2xl bg-black/80 border border-sky-400/40 shadow-2xl flex flex-col ${isTiktok ? 'gap-3.5' : 'gap-2'}`}>
            <div className="flex items-center justify-between font-mono text-[8.5px] text-sky-300 border-b border-white/10 pb-2">
                <span>TERMINAL DE ACCESO A LA BETA</span>
                <span className="text-emerald-400 font-bold">STATUS: ACTIVA</span>
            </div>

            <div className="flex flex-col text-left font-mono text-[9.5px] text-white/80 bg-black/60 p-2.5 rounded-lg border border-white/10 gap-1">
                <div>&gt; build: v2.0-beta-android-ios</div>
                <div>&gt; target: LSV (Venezuela) / ASL / LSE</div>
                <div>&gt; connection_required: false</div>
                <div>&gt; privacy_shield: active</div>
            </div>

            <div className={`w-full ${isTiktok ? 'py-3 text-xs' : 'py-2 text-[10px]'} bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl font-black text-white shadow-lg cursor-pointer flex items-center justify-center gap-2`}>
                <span>PRUEBA LA BETA GRATUITA · @MOVA.APP</span>
            </div>
        </div>
        <div className={`${isTiktok ? 'text-[11px]' : 'text-[9px]'} font-mono text-white/50`}>
            Descarga disponible en iOS y Android
        </div>
    </div>
);

/** 16. VIDEO 4 - SLIDE 1: Hero Retrato Afectivo (Nuestra Misión) */
window.MovaMotherChildHero = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-between py-1 select-none text-left">
        <div className={`relative rounded-2xl overflow-hidden border border-emerald-400/40 bg-black/70 shadow-2xl ${isTiktok ? 'p-3' : 'p-2.5'} flex flex-col gap-2`}>
            <div className={`relative w-full ${isTiktok ? 'h-40' : 'h-24'} rounded-xl overflow-hidden bg-neutral-950 border border-emerald-500/20`}>
                <img
                    src="assets/mova_madre_hijo_inclusion.jpg"
                    alt="Madre e Hijo Inclusión"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[8.5px] font-mono text-emerald-300 border border-emerald-400/30">
                    DERECHO HUMANO VITAL
                </div>
            </div>
            <div className="flex items-center justify-between px-1 text-[8.5px] font-mono text-emerald-300/80">
                <span>AFECTO Y FAMILIA SIN BARRERAS</span>
                <span className="text-white/60">CARACAS</span>
            </div>
        </div>

        <div className="my-auto flex flex-col gap-1.5 mt-2">
            <h2 className={`${isTiktok ? 'text-[1.85rem] leading-[1.12]' : 'text-[1.24rem] leading-[1.14]'} font-black text-white m-0`}>
                {window.rich(d.title || 'El derecho a decir "te quiero" *no puede necesitar un intérprete pagado.*', '#10b981')}
            </h2>
            <p className={`${isTiktok ? 'text-[13px]' : 'text-[9.5px]'} text-white/80 leading-relaxed m-0`}>
                {d.sub || 'La inclusión no es una función de marketing: es la promesa de que ninguna madre ni ningún hijo queden incomunicados.'}
            </p>
        </div>
        <window.MovaFootNote text={d.foot || 'Tecnología puesta al servicio del amor familiar'} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 17. VIDEO 4 - SLIDE 2: Tríptico de 3 Columnas Verticales Dialectales */
window.MovaDialectTriptychView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-2 gap-3' : 'py-1 gap-1.5'} select-none text-left`}>
        <div className="grid grid-cols-3 gap-2 my-auto">
            <div className="p-3 rounded-xl bg-white/5 border border-emerald-400/30 flex flex-col items-center text-center justify-between min-h-[140px]">
                <window.MovaFlagVE className={`${isTiktok ? 'w-8 h-5' : 'w-6 h-4'} rounded shadow`} />
                <div>
                    <span className="font-black text-white text-xs block">LSV</span>
                    <span className="text-[7.5px] font-mono text-emerald-300">Venezuela</span>
                </div>
                <span className="text-[7.5px] text-white/60 leading-tight">Gramática visual nativa</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-sky-400/30 flex flex-col items-center text-center justify-between min-h-[140px]">
                <window.MovaFlagUS className={`${isTiktok ? 'w-8 h-5' : 'w-6 h-4'} rounded shadow`} />
                <div>
                    <span className="font-black text-white text-xs block">ASL</span>
                    <span className="text-[7.5px] font-mono text-sky-300">Internacional</span>
                </div>
                <span className="text-[7.5px] text-white/60 leading-tight">Estándar global</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-amber-400/30 flex flex-col items-center text-center justify-between min-h-[140px]">
                <window.MovaFlagES className={`${isTiktok ? 'w-8 h-5' : 'w-6 h-4'} rounded shadow`} />
                <div>
                    <span className="font-black text-white text-xs block">LSE</span>
                    <span className="text-[7.5px] font-mono text-amber-300">España</span>
                </div>
                <span className="text-[7.5px] text-white/60 leading-tight">Comunidad europea</span>
            </div>
        </div>
        <p className={`${isTiktok ? 'text-[11.5px]' : 'text-[9.5px]'} text-white/80 text-center m-0`}>
            Mova respeta la riqueza de cada dialecto sin imponer una norma homogénea.
        </p>
        <window.MovaFootNote text={d.foot || 'Diversidad lingüística viva'} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 18. VIDEO 4 - SLIDE 3: Círculos Concéntricos de Impacto */
window.MovaConstellationView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-2 gap-3' : 'py-1 gap-1.5'} select-none text-left`}>
        <div className="flex flex-col gap-2 my-auto">
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center gap-3">
                <span className="text-xl">👤</span>
                <div>
                    <span className={`${isTiktok ? 'text-[12px]' : 'text-[10px]'} font-black text-white block`}>Núcleo: Autonomía Individual</span>
                    <span className="text-[8.5px] text-white/70">La persona sorda no necesita un tercero para comunicarse.</span>
                </div>
            </div>

            <div className="p-3 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center gap-3 ml-2">
                <span className="text-xl">🏡</span>
                <div>
                    <span className={`${isTiktok ? 'text-[12px]' : 'text-[10px]'} font-black text-white block`}>Hogar: Diálogo Familiar en la Mesa</span>
                    <span className="text-[8.5px] text-white/70">Padres e hijos conversando de manera fluida y amorosa.</span>
                </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center gap-3 ml-4">
                <span className="text-xl">🏥</span>
                <div>
                    <span className={`${isTiktok ? 'text-[12px]' : 'text-[10px]'} font-black text-white block`}>Sociedad: Escuelas, Médicos y Comercios</span>
                    <span className="text-[8.5px] text-white/70">Cero discriminación en trámites y consultas de salud.</span>
                </div>
            </div>
        </div>
        <window.MovaFootNote text={d.foot || 'Inclusión concéntrica que transforma todo el entorno'} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 19. VIDEO 4 - SLIDE 4: Podio Escalonado de 3 Pilares Morales */
window.MovaSteppedPodiumPillarsView = ({ d, isTiktok }) => (
    <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-2 gap-3' : 'py-1 gap-1.5'} select-none text-left`}>
        <div className="grid grid-cols-3 gap-2 my-auto items-end">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-center flex flex-col justify-between h-[130px]">
                <span className="font-mono text-emerald-400 font-black text-base">01</span>
                <div>
                    <span className="font-black text-white text-[10px] block">100% Gratis</span>
                    <span className="text-[7.5px] text-white/70">Sin barreras de pago</span>
                </div>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-400/30 text-center flex flex-col justify-between h-[160px]">
                <span className="font-mono text-sky-400 font-black text-lg">02</span>
                <div>
                    <span className="font-black text-white text-[11px] block">100% Offline</span>
                    <span className="text-[7.5px] text-white/70">Funciona sin internet</span>
                </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-center flex flex-col justify-between h-[110px]">
                <span className="font-mono text-amber-400 font-black text-sm">03</span>
                <div>
                    <span className="font-black text-white text-[9.5px] block">Co-Creado</span>
                    <span className="text-[7.5px] text-white/70">Validado por sordos</span>
                </div>
            </div>
        </div>
        <window.MovaFootNote text={d.foot || 'Principios éticos innegociables'} isTiktok={isTiktok} tone="orange" />
    </div>
);

/** 20. VIDEO 4 - SLIDE 5: CTA Movimiento Comunitario */
window.MovaCommunityMovementCta = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-between py-2 select-none text-center">
        <div className={`my-auto p-5 rounded-2xl bg-gradient-to-b from-emerald-950/40 via-neutral-900/90 to-black/80 border border-emerald-400/40 shadow-2xl flex flex-col ${isTiktok ? 'gap-3.5' : 'gap-2'}`}>
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-mono text-[9px] font-bold mx-auto">
                MOVIMIENTO DE INCLUSIÓN VIVA
            </span>

            <h3 className={`${isTiktok ? 'text-[1.4rem]' : 'text-[1.05rem]'} font-black text-white m-0 tracking-tight`}>
                El Silencio se Rompe Juntos
            </h3>

            <p className={`${isTiktok ? 'text-[12px]' : 'text-[9.5px]'} text-white/80 leading-relaxed m-0`}>
                Sigue a @mova.app y acompáñanos a construir un mundo donde nadie vuelva a ser invisible por comunicarse con sus manos.
            </p>

            <div className={`w-full ${isTiktok ? 'py-3 text-xs' : 'py-2 text-[10px]'} bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-black text-white shadow-lg cursor-pointer flex items-center justify-center gap-2`}>
                <span>SÚMATE AL MOVIMIENTO · @MOVA.APP</span>
            </div>
        </div>
        <div className={`${isTiktok ? 'text-[11px]' : 'text-[9px]'} font-mono text-white/50`}>
            Rompiendo el silencio · Caracas · Venezuela
        </div>
    </div>
);

/** Vista Default / Fallback */
window.MovaDefaultView = ({ d, isTiktok }) => (
    <div className="flex-1 flex flex-col justify-center gap-2 py-1">
        {d.body && (
            <div className="p-3 rounded-xl bg-white/8 backdrop-blur-md border border-white/15 text-[10.5px] text-white/90 leading-relaxed shadow-lg">
                {window.rich(d.body, '#ff9f43')}
            </div>
        )}
        <window.MovaFootNote text={d.foot} isTiktok={isTiktok} tone="orange" />
    </div>
);

/**
 * Orquestador principal de diapositivas de Mova con atmósfera y fondos diferenciados
 */
window.MovaSlide = ({ video, d, index, format = 'instagram' }) => {
    const total = video.slides.length;
    const theme = window.THEMES?.mova || { accent: '#3b82f6', mark: '#f97316' };
    const meta = { index, total, format, video };
    const isTiktok = format === 'tiktok';
    const type = d.movaVariant || d.type;
    const vId = video.id;

    // Atmósfera visual y paleta cromática propia de la publicación
    const atmosphere = window.getMovaThemeAtmosphere(vId);

    const renderContent = () => {
        switch (type) {
            case 'hero':
            case 'manifesto-hero':
                if (vId === 'mova_inspiracion') return <window.MovaSchoolPolaroidHero d={d} isTiktok={isTiktok} />;
                if (vId === 'mova_idea') return <window.MovaAiScannerHero d={d} isTiktok={isTiktok} />;
                if (vId === 'mova_mision') return <window.MovaMotherChildHero d={d} isTiktok={isTiktok} />;
                return <window.MovaManifestoTypoHero d={d} isTiktok={isTiktok} />;

            case 'school-polaroid-hero':
            case 'photo-hero':
                return <window.MovaSchoolPolaroidHero d={d} isTiktok={isTiktok} />;

            case 'ai-scanner-hero':
            case 'tech-hero':
                return <window.MovaAiScannerHero d={d} isTiktok={isTiktok} />;

            case 'mother-child-hero':
            case 'family-hero':
                return <window.MovaMotherChildHero d={d} isTiktok={isTiktok} />;

            case 'stat':
                return <window.MovaStatRatioView d={d} isTiktok={isTiktok} />;

            case 'medical-emergency':
            case 'scenarios':
                return <window.MovaMedicalEmergencyView d={d} isTiktok={isTiktok} />;

            case 'quote-hero':
            case 'quote':
                return <window.MovaQuoteEditorialView d={d} isTiktok={isTiktok} />;

            case 'recreo-storyboard':
            case 'school':
                return <window.MovaRecreoStoryboardView d={d} isTiktok={isTiktok} />;

            case 'report-card':
            case 'comparison':
                return <window.MovaReportCardDilemmaView d={d} isTiktok={isTiktok} />;

            case 'voicenote':
                return <window.MovaStudentVoiceNoteView d={d} isTiktok={isTiktok} />;

            case 'camera':
                return <window.MovaCameraHudView d={d} isTiktok={isTiktok} />;

            case 'chip-flow':
            case 'flow':
                return <window.MovaHorizontalChipFlowView d={d} isTiktok={isTiktok} />;

            case 'privacy':
                return <window.MovaPrivacyVaultView d={d} isTiktok={isTiktok} />;

            case 'triptych':
            case 'community':
                return <window.MovaDialectTriptychView d={d} isTiktok={isTiktok} />;

            case 'constellation':
            case 'aulas':
                return <window.MovaConstellationView d={d} isTiktok={isTiktok} />;

            case 'podium':
            case 'pillars':
                return <window.MovaSteppedPodiumPillarsView d={d} isTiktok={isTiktok} />;

            case 'cta':
                if (vId === 'mova_inspiracion') return <window.MovaSchoolAmbassadorCta d={d} isTiktok={isTiktok} />;
                if (vId === 'mova_idea') return <window.MovaBetaTesterTerminalCta d={d} isTiktok={isTiktok} />;
                if (vId === 'mova_mision') return <window.MovaCommunityMovementCta d={d} isTiktok={isTiktok} />;
                return <window.MovaManifestoCitizenCta d={d} isTiktok={isTiktok} />;

            default:
                return <window.MovaDefaultView d={d} isTiktok={isTiktok} />;
        }
    };

    // Las nuevas vistas manejan sus propios titulares integrados para mayor libertad compositiva
    const hasIntegratedTitle = [
        'hero', 'manifesto-hero', 'photo-hero', 'school-polaroid-hero',
        'tech-hero', 'ai-scanner-hero', 'family-hero', 'mother-child-hero',
        'quote-hero', 'quote', 'medical-emergency', 'scenarios',
        'recreo-storyboard', 'school', 'report-card', 'comparison', 'voicenote',
        'camera', 'chip-flow', 'flow', 'privacy',
        'triptych', 'community', 'constellation', 'aulas', 'podium', 'pillars', 'cta'
    ].includes(type);

    return (
        <div
            id="capture-slide"
            data-slide-index={index}
            data-slide-format={format}
            className={`slide-container format-${format} relative overflow-hidden flex flex-col justify-between text-white select-none`}
            style={{
                backgroundColor: atmosphere.bg,
                backgroundImage: atmosphere.gradient,
                padding: isTiktok ? '38px 24px 28px 24px' : '18px 20px 14px 20px',
            }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: atmosphere.glow }}
            />

            {/* 1. Cabecera limpia y oficial sin numeración con logo nítido */}
            <window.MovaHeader kicker={d.kicker} isTiktok={isTiktok} />

            {/* 2. Cuerpo inmersivo con espacio y jerarquía dinámica */}
            <div className={`flex-1 flex flex-col justify-between ${isTiktok ? 'py-4 gap-4' : 'py-1 gap-1'} z-10 min-h-0 overflow-hidden`}>
                {!hasIntegratedTitle && (
                    <window.MovaTitle title={d.title} sub={d.sub} isTiktok={isTiktok} />
                )}
                {renderContent()}
            </div>

            {/* 3. Pie de página comunitario */}
            <window.MovaFooter isTiktok={isTiktok} />

            {d.customElements && d.customElements.length > 0 && (
                <window.CustomElementsOverlay elements={d.customElements} theme={theme} format={format} meta={meta} d={d} />
            )}
        </div>
    );
};

/** Slide vertical completa: Grid + Fondo dinámico + Bandas + Tarjeta + Capas Personalizadas */
window.Slide = ({ video, d, index, format = 'tiktok' }) => {
    // Si el video pertenece a Mova, renderizamos la experiencia inmersiva de Mova
    // compatible con formato TikTok (9:16) e Instagram Feed (4:5)
    if (video.accountId === 'mova' || video.id?.startsWith('mova')) {
        return <window.MovaSlide video={video} d={d} index={index} format={format} />;
    }

    const theme = window.THEMES[video.theme];
    const meta = { index, total: video.slides.length, format, video };
    const seed = video.caseNo * 1000 + index * 37 + 11;
    const isFlat = theme?.bgStyle === 'flat';
    const canvasBg = theme?.bgCanvas || '#0c0c0c';
    return (
        <div id="capture-slide"
             data-slide-index={index}
             data-slide-format={format}
             className={`slide-container format-${format} relative overflow-hidden ${isFlat ? 'bg-flat' : 'bg-[#0c0c0c] bg-grid'}`}
             style={{ backgroundColor: canvasBg }}>
            {!isFlat && <window.GridPattern />}
            <window.Backdrop theme={theme} seed={seed} layout={d.layout} format={format} />
            {d.layout === 'low' && <window.TopBand video={video} theme={theme} meta={meta} format={format} />}
            {d.layout === 'high' && <window.BottomBand video={video} theme={theme} meta={meta} format={format} />}
            <window.CardFrame d={d} theme={theme} meta={meta} />
            {/* Renderizado automático de elementos añadidos desde el Studio Inspector */}
            {d.customElements && d.customElements.length > 0 && (
                <window.CustomElementsOverlay elements={d.customElements} theme={theme} format={format} meta={meta} d={d} />
            )}
        </div>
    );
};

