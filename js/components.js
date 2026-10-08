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

/** Slide vertical completa: Grid + Fondo dinámico + Bandas + Tarjeta + Capas Personalizadas */
window.Slide = ({ video, d, index, format = 'tiktok' }) => {
    const theme = window.THEMES[video.theme];
    const meta = { index, total: video.slides.length, format, video };
    const seed = video.caseNo * 1000 + index * 37 + 11;
    const isFlat = theme?.bgStyle === 'flat';
    const canvasBg = theme?.bgCanvas || '#0c0c0c';
    return (
        <div id="capture-slide"
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
