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

window.LAYOUTS = {
    full:  { top: 20,  right: 20, bottom: 20,  left: 20 },          // tarjeta casi completa
    low:   { top: 138, right: 18, bottom: 18,  left: 18 },          // banda superior con serie
    high:  { top: 18,  right: 18, bottom: 122, left: 18 },          // banda inferior con handle
    float: { top: 86,  right: 34, bottom: 86,  left: 34 },          // tarjeta flotante, mucho fondo
    tilt:  { top: 44,  right: 30, bottom: 44,  left: 30, rotate: -1.6, back: true }, // tarjeta inclinada
    split: { top: 18,  right: 18, bottom: 18,  left: 18, split: true }, // título en tarjeta de acento aparte
};

/* ---------- PIEZAS INTERNAS DE TARJETA ---------- */

/** Encabezado simulado de la tarjeta (variant: full | mini | none). */
window.Header = ({ variant = 'mini', theme, meta, tone }) => {
    if (variant === 'none') return null;
    const ink = tone.text;
    if (variant === 'mini') {
        return (
            <div className="flex items-center justify-between mb-4">
                <span className="rounded-full font-bold text-[12px]" style={{ padding: '4px 14px', border: `2px solid ${tone.line}`, color: ink }}>Santi.Dev</span>
                <span className="font-mono font-bold text-[12px]" style={{ color: ink, opacity: 0.55 }}>{window.pad(meta.index + 1)} / {window.pad(meta.total)}</span>
            </div>
        );
    }
    return (
        <div className="flex justify-between items-center mb-5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[15px]" style={{ background: '#111', color: '#fff' }}>SR</div>
            <div className="rounded-full font-bold text-[13px]" style={{ padding: '5px 18px', border: `2px solid ${tone.line}`, background: tone.bg, color: ink }}>Santi.Dev</div>
            <div className="flex gap-2.5">
                <window.Icon name="heart" size={22} color={ink} />
                <window.Icon name="bookmark" size={22} color={ink} />
            </div>
        </div>
    );
};

/** Título principal de la tarjeta. */
window.Title = ({ text, theme, tone, size = '2.3rem' }) => !text ? null : (
    <h2 className="font-black tracking-tight m-0" style={{ fontSize: size, lineHeight: 1.04, color: tone.text }}>
        {window.rich(text, theme.mark)}
    </h2>
);

/** Pie de tarjeta con nota o conclusión. */
window.Foot = ({ text, tone }) => (
    <div className="mt-auto rounded-2xl font-semibold leading-snug" style={{ padding: '12px 16px', fontSize: 12.5, border: `2px solid ${tone.line}`, color: tone.text, background: 'transparent' }}>
        {text}
    </div>
);

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
    const art = d.artIcon
        ? { icon: d.artIcon, corner: d.artCorner || '', label: d.artLabel || '' }
        : window.HERO_ART[d.art];
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            <span className="self-start rounded-full font-bold text-[12px] mb-3" style={{ padding: '5px 12px', background: theme.accent, color: theme.ink }}>{d.kicker}</span>
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} size={d.titleSize || '2.55rem'} />}
            {d.image ? (
                <window.Photo src={d.image} theme={theme} style={d.imageStyle} className="flex-1 mt-4" />
            ) : (
                <div className="flex-1 mt-4 rounded-[1.6rem] relative flex items-center justify-center" style={{ background: theme.accent }}>
                    {art ? (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <window.Icon name={art.icon} size={105} color={theme.ink} stroke={1.6} />
                            {art.label && <span className="font-mono font-bold text-[11px] uppercase tracking-[.2em] px-3 py-1 rounded-full bg-black/15" style={{ color: theme.ink }}>{art.label}</span>}
                        </div>
                    ) : (
                        <window.PixelArt map={window.PIXEL_TROPHY} size={170} palette={{ '#': '#111', 'o': '#F5F2EB' }} />
                    )}
                    <span className="absolute top-4 left-4 font-mono font-bold text-[11px] tracking-[.2em]" style={{ color: theme.ink }}>
                        {art ? art.corner : '1ST · PLACE'}
                    </span>
                    <span className="absolute bottom-4 right-4"><window.PixelArt map={window.PIXEL_HEART} size={28} palette={{ '#': theme.ink === '#FFFFFF' ? '#fff' : '#111' }} /></span>
                </div>
            )}
            <p className="mt-3 mb-0 text-[13px] font-semibold" style={{ color: tone.sub }}>{d.sub}</p>
        </div>
    );
};

/** Texto protagonista */
window.TextSlide = ({ d, theme, tone, meta, showTitle }) => (
    <div className="flex flex-col h-full">
        <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
        {showTitle && <window.Title text={d.title} theme={theme} tone={tone} />}
        <p className="font-extrabold mt-5 mb-0" style={{ fontSize: '1.55rem', lineHeight: 1.26, color: '#222' }}>{window.rich(d.body, theme.mark)}</p>
        {d.icons && (
            <div className="flex-1 flex items-center">
                <div className="grid grid-cols-3 gap-2.5 w-full">
                    {d.icons.map((ic, i) => {
                        const it = typeof ic === 'string' ? { name: ic } : ic;
                        const on = i === 0;
                        return (
                            <div key={it.name} className="rounded-2xl flex flex-col items-center justify-center gap-2" style={{ height: 96, border: '2px solid #111', background: on ? theme.accent : 'transparent' }}>
                                <window.Icon name={it.name} size={28} color={on ? theme.ink : '#111'} />
                                {it.label && <span className="font-mono font-bold text-[11px] uppercase tracking-[.12em]" style={{ color: on ? theme.ink : '#111' }}>{it.label}</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
        {d.foot && <div className="mt-auto pt-4"><window.Foot text={d.foot} tone={tone} /></div>}
    </div>
);

const EDITOR_FILL = 24;

/** Ventana de código / consola */
window.CodeSlide = ({ d, theme, tone, meta, showTitle }) => (
    <div className="flex flex-col h-full">
        <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
        {showTitle && <window.Title text={d.title} theme={theme} tone={tone} />}
        <div className="rounded-[1.3rem] overflow-hidden mt-5 flex-1 flex flex-col" style={{ background: '#141414', minHeight: 0 }}>
            <div className="flex items-center gap-1.5" style={{ padding: '9px 14px', borderBottom: '1px solid #262626' }}>
                {[0, 1, 2].map((i) => <span key={i} style={{ width: 8, height: 8, borderRadius: 9, background: '#3a3a3a', display: 'inline-block' }} />)}
                <span className="font-mono text-[10.5px] ml-2" style={{ color: '#8a8a8a' }}>{d.file}</span>
                <span className="font-mono text-[9.5px] font-bold ml-auto" style={{ color: theme.codeKw }}>{d.lang}</span>
            </div>
            <pre className="font-mono m-0 flex-1" style={{ fontSize: 10.5, lineHeight: 1.7, padding: '12px 12px 14px', color: '#C9C9C9', whiteSpace: 'pre', overflow: 'hidden', minHeight: 0 }}>
                {[...d.code, ...Array(EDITOR_FILL).fill('')].map((line, i) => (
                    <div key={i} className="flex">
                        <span style={{ color: i < d.code.length ? '#4d4d4d' : '#2c2c2c', width: 18, flexShrink: 0 }}>{i + 1}</span>
                        <span>{line ? window.highlight(line, theme.codeKw) : ' '}</span>
                    </div>
                ))}
            </pre>
        </div>
        {d.foot && <div className="pt-4"><window.Foot text={d.foot} tone={tone} /></div>}
    </div>
);

/** Imagen con chips o comparación Antes / Después */
window.ImageSlide = ({ d, theme, tone, meta, showTitle }) => (
    <div className="flex flex-col h-full">
        <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
        {showTitle && <window.Title text={d.title} theme={theme} tone={tone} size="2.1rem" />}
        {d.beforeAfter ? (
            <div className="flex-1 mt-3 flex flex-col justify-center gap-3 min-h-0">
                <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
                    <div className="rounded-2xl flex flex-col overflow-hidden border-2 border-neutral-300 relative bg-[#181818]">
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-900/90 text-neutral-200 z-10">1. Con fondo</span>
                        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${d.image})` }} />
                    </div>
                    <div className="rounded-2xl flex flex-col overflow-hidden border-2 border-neutral-300 relative" style={{
                        background: 'repeating-conic-gradient(#262626 0% 25%, #181818 0% 50%) 50% / 16px 16px'
                    }}>
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold z-10" style={{ background: theme.accent, color: theme.ink }}>2. Transparente</span>
                        <div className="flex-1 flex items-center justify-center p-3">
                            <window.PixelArt map={window.PIXEL_TROPHY} size={90} palette={{ '#': theme.accent, 'o': '#fff' }} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {d.chips && d.chips.map((c, i) => (
                        <span key={c} className="rounded-full font-bold text-[11.5px]" style={{ padding: '5px 11px', border: '2px solid #111', background: i === 0 ? '#111' : 'transparent', color: i === 0 ? '#fff' : '#111' }}>{c}</span>
                    ))}
                </div>
            </div>
        ) : (
            <>
                <window.Photo src={d.image} theme={theme} className="flex-1 mt-4" />
                <div className="flex flex-wrap gap-2 mt-4">
                    {d.chips && d.chips.map((c, i) => (
                        <span key={c} className="rounded-full font-bold text-[11.5px]" style={{ padding: '5px 11px', border: '2px solid #111', background: i === 0 ? '#111' : 'transparent', color: i === 0 ? '#fff' : '#111' }}>{c}</span>
                    ))}
                </div>
            </>
        )}
        {d.foot && <div className="pt-3 mt-auto"><window.Foot text={d.foot} tone={tone} /></div>}
    </div>
);

/** Lista de pasos */
window.StepsSlide = ({ d, theme, tone, meta, showTitle }) => (
    <div className="flex flex-col h-full">
        <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
        {showTitle && <window.Title text={d.title} theme={theme} tone={tone} />}
        <div className="flex flex-col gap-6 flex-1 justify-center">
            {d.steps.map((s, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                    <span className="font-mono font-bold text-[14px] flex items-center justify-center shrink-0 rounded-xl" style={{ width: 38, height: 38, background: i === 0 ? theme.accent : '#111', color: i === 0 ? theme.ink : '#fff' }}>{window.pad(i + 1)}</span>
                    <div>
                        <div className="font-extrabold text-[16.5px] leading-tight" style={{ color: tone.text }}>{s.t}</div>
                        <div className="text-[12.5px] font-medium leading-snug mt-1" style={{ color: tone.sub }}>{s.d}</div>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-4" style={{ borderTop: `2px dashed ${tone.line}` }}>
            <window.Icon name="trophy" size={18} color={tone.sub} />
            <span className="font-mono text-[10.5px]" style={{ color: tone.sub }}>aplicado en la práctica</span>
        </div>
    </div>
);

/** Comparación directa */
window.CompareSlide = ({ d, theme, tone, meta, showTitle }) => (
    <div className="flex flex-col h-full">
        <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
        {showTitle && <window.Title text={d.title} theme={theme} tone={tone} />}
        <div className="flex flex-col gap-3 flex-1 justify-center py-4">
            {[{ ok: false, text: d.bad, label: 'Así no' }, { ok: true, text: d.good, label: 'Así sí' }].map((r) => (
                <div key={r.label} className="rounded-[1.4rem] flex gap-3 items-start" style={{ padding: 18, background: tone.box, border: `1px solid ${tone.line}` }}>
                    <span className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: r.ok ? window.OK_GREEN : window.BAD_RED }}>
                        <window.Icon name={r.ok ? 'check' : 'x'} size={18} color="#fff" stroke={2.8} />
                    </span>
                    <div>
                        <div className="font-mono uppercase text-[10px] tracking-[.15em]" style={{ color: tone.sub }}>{r.label}</div>
                        <div className="font-bold text-[18px] leading-snug mt-0.5" style={{ color: tone.text, opacity: r.ok ? 1 : 0.7 }}>{r.text}</div>
                    </div>
                </div>
            ))}
        </div>
        {d.foot && <div className="mt-auto pt-4"><window.Foot text={d.foot} tone={tone} /></div>}
    </div>
);

/** Métrica destacada */
window.StatSlide = ({ d, theme, tone, meta, showTitle }) => (
    <div className="flex flex-col h-full">
        <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
        {showTitle && <window.Title text={d.title} theme={theme} tone={tone} size="1.9rem" />}
        <div className="flex items-center justify-between mt-2">
            <div className="relative">
                <div className="absolute rounded-xl" style={{ left: -6, right: -10, bottom: 22, height: '42%', background: theme.accent }} />
                <div className="relative font-black tracking-tighter" style={{ fontSize: '9.5rem', lineHeight: 1, color: tone.text }}>{d.number}</div>
            </div>
            {d.visual === 'hand' && <window.HandLandmarks accent={theme.accent} size={140} />}
            {d.visual === 'servers' && <window.NoServers accent={theme.accent} size={118} />}
        </div>
        <span className="self-start rounded-full font-bold text-[14px] mt-1" style={{ padding: '6px 14px', background: '#111', color: '#fff' }}>{d.label}</span>
        <div className="flex-1 flex items-center py-4">
            <p className="font-extrabold m-0" style={{ fontSize: '1.38rem', lineHeight: 1.28, color: tone.text }}>{window.rich(d.body, theme.mark)}</p>
        </div>
        <div className="mt-auto flex items-center gap-3 pt-4" style={{ borderTop: `2px dashed ${tone.line}` }}>
            <window.Icon name={d.icon} size={26} color={tone.text} />
            <span className="font-mono text-[10.5px]" style={{ color: tone.sub }}>{d.src}</span>
        </div>
    </div>
);

/** Diagrama de flujo */
window.FlowSlide = ({ d, theme, tone, meta, showTitle }) => (
    <div className="flex flex-col h-full">
        <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
        {showTitle && <div className="mb-5"><window.Title text={d.title} theme={theme} tone={tone} /></div>}
        <div className="flex flex-col flex-1 justify-center">
            {d.nodes.map((n, i) => {
                const last = i === d.nodes.length - 1;
                return (
                    <div key={i}>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ border: '2px solid #111', background: last ? theme.accent : tone.box }}>
                                <window.Icon name={n.icon} size={22} color={last ? theme.ink : '#111'} />
                            </div>
                            <div>
                                <div className="font-extrabold text-[16px] leading-tight" style={{ color: tone.text }}>{n.t}</div>
                                <div className="font-mono text-[10.5px] mt-0.5" style={{ color: tone.sub }}>{n.s}</div>
                            </div>
                        </div>
                        {!last && <div style={{ marginLeft: 23, height: 26, borderLeft: '2px dashed #BDBDBD' }} />}
                    </div>
                );
            })}
        </div>
        {d.foot && <div className="mt-auto pt-4"><window.Foot text={d.foot} tone={tone} /></div>}
    </div>
);

/** Cita o lema de impacto */
window.QuoteSlide = ({ d, theme, tone, meta }) => (
    <div className="flex flex-col h-full">
        <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
        <div className="flex-1 flex flex-col justify-center">
            <window.QuoteMark color={theme.accent} size={60} />
            <p className="font-black mt-4 mb-0 tracking-tight" style={{ fontSize: '2.3rem', lineHeight: 1.1, color: tone.text }}>{window.rich(d.quote, theme.mark)}</p>
        </div>
        <div className="mt-auto flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[14px]" style={{ background: '#111', color: '#fff' }}>SR</div>
            <div>
                <div className="font-bold text-[13px]" style={{ color: tone.text }}>Santi.Dev</div>
                <div className="font-mono text-[10.5px]" style={{ color: tone.sub }}>{d.by}</div>
            </div>
        </div>
    </div>
);

/** Checklist de inspiración vs adaptación */
window.ChecklistSlide = ({ d, theme, tone, meta, showTitle }) => {
    const Section = ({ label, icon, color, items }) => (
        <div className="mt-5">
            <div className="flex items-center gap-2 mb-2.5">
                <span className="flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: color }}>
                    <window.Icon name={icon} size={13} color={color === theme.accent ? theme.ink : '#fff'} stroke={2.6} />
                </span>
                <span className="font-mono uppercase text-[10.5px] tracking-[.15em] font-bold" style={{ color: tone.text }}>{label}</span>
            </div>
            <div className="flex flex-col gap-2">
                {items.map((t) => (
                    <div key={t} className="rounded-xl font-bold text-[15.5px]" style={{ padding: '13px 15px', background: tone.box, color: tone.text }}>{t}</div>
                ))}
            </div>
        </div>
    );
    return (
        <div className="flex flex-col h-full">
            <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
            {showTitle && <window.Title text={d.title} theme={theme} tone={tone} />}
            <div className="flex-1 flex flex-col justify-center">
                <Section label="Lo que tomé" icon="check" color={window.OK_GREEN} items={d.take} />
                <Section label="Lo que adapté" icon="pencil" color={theme.accent} items={d.adapt} />
            </div>
            {d.foot ? (
                <div className="mt-auto pt-4"><window.Foot text={d.foot} tone={tone} /></div>
            ) : (
                <div className="mt-auto flex items-center gap-2 pt-4">
                    <window.Icon name="box" size={18} color={tone.sub} />
                    <span className="font-mono text-[10.5px]" style={{ color: tone.sub }}>referencia ≠ copia</span>
                </div>
            )}
        </div>
    );
};

/** Cierre y llamada a la acción hacia el perfil */
window.CtaSlide = ({ d, theme, tone, meta }) => (
    <div className="flex flex-col h-full relative">
        <window.Header variant="mini" theme={theme} meta={meta} tone={tone} />
        <h2 className="font-black tracking-tight m-0" style={{ fontSize: '2.9rem', lineHeight: 0.98, color: tone.text }}>
            {window.rich(d.title, theme.ink === '#FFFFFF' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.18)')}
        </h2>
        <div className="absolute" style={{ right: 0, top: '44%', opacity: 0.9 }}>
            <window.Icon name={theme.ctaIcon} size={96} color={tone.text} stroke={1.4} />
        </div>
        <div className="mt-auto">
            <div className="rounded-2xl flex items-center gap-3" style={{ padding: 14, background: '#fff', boxShadow: '0 8px 20px rgba(0,0,0,.12)' }}>
                <span className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0" style={{ background: '#E9E9E9', color: '#555' }}>tú</span>
                <span className="font-bold text-[15px]" style={{ color: '#111' }}>Comenta</span>
                <span className="font-mono font-bold text-[14px] rounded-lg" style={{ padding: '4px 10px', background: '#111', color: '#fff' }}>{d.keyword}</span>
            </div>
            <p className="font-bold text-[15px] mt-3 mb-4" style={{ color: tone.text }}>{d.line}</p>
            <div className="flex gap-2">
                <span className="flex items-center gap-2 rounded-full font-bold text-[13px]" style={{ padding: '9px 16px', background: '#111', color: '#fff' }}>
                    <window.Icon name="userPlus" size={15} color="#fff" /> Seguir
                </span>
                <span className="flex items-center gap-2 rounded-full font-bold text-[13px]" style={{ padding: '9px 16px', border: `2px solid ${tone.text}`, color: tone.text }}>
                    <window.Icon name="bookmark" size={15} color={tone.text} /> Guardar
                </span>
            </div>
        </div>
    </div>
);

/**
 * Lista de filas: icono + título + descripción + etiqueta a la derecha.
 * Sirve para planes (tag = precio), herramientas (tag = atajo), etc.
 * highlight: índice de la fila destacada en acento (opcional).
 */
window.ListSlide = ({ d, theme, tone, meta, showTitle }) => (
    <div className="flex flex-col h-full">
        <window.Header variant={d.header} theme={theme} meta={meta} tone={tone} />
        {showTitle && <window.Title text={d.title} theme={theme} tone={tone} size={d.titleSize || '2.1rem'} />}
        <div className="flex flex-col gap-2.5 flex-1 justify-center py-3">
            {d.rows.map((r, i) => {
                const on = i === d.highlight;
                return (
                    <div key={i} className="rounded-2xl flex items-center gap-3" style={{ padding: '11px 13px', border: `2px solid ${on ? '#111' : tone.line}`, background: on ? tone.box : 'transparent' }}>
                        {r.icon && (
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: on ? theme.accent : '#111' }}>
                                <window.Icon name={r.icon} size={19} color={on ? theme.ink : '#fff'} />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="font-extrabold text-[15px] leading-tight" style={{ color: tone.text }}>{r.t}</div>
                            {r.d && <div className="text-[11.5px] font-medium leading-snug mt-0.5" style={{ color: tone.sub }}>{r.d}</div>}
                        </div>
                        {r.tag && (
                            <span className="font-mono font-bold text-[11px] rounded-lg shrink-0 whitespace-nowrap" style={{ padding: '4px 8px', background: on ? theme.accent : tone.box, color: on ? theme.ink : tone.text }}>{r.tag}</span>
                        )}
                    </div>
                );
            })}
        </div>
        {d.foot && <div className="mt-auto pt-3"><window.Foot text={d.foot} tone={tone} /></div>}
    </div>
);

/** Diccionario de tipos de slide */
window.SLIDE_TYPES = {
    hero: window.HeroSlide, text: window.TextSlide, code: window.CodeSlide, image: window.ImageSlide,
    steps: window.StepsSlide, compare: window.CompareSlide, stat: window.StatSlide, flow: window.FlowSlide,
    quote: window.QuoteSlide, checklist: window.ChecklistSlide, cta: window.CtaSlide, list: window.ListSlide,
};

/** Marco exterior de la tarjeta según layout y tono */
window.CardFrame = ({ d, theme, meta }) => {
    const L = window.LAYOUTS[d.layout] || window.LAYOUTS.full;
    const tone = window.toneOf(theme, d.tone);
    const Body = window.SLIDE_TYPES[d.type] || window.TextSlide;
    const base = {
        position: 'absolute', top: L.top, left: L.left, right: L.right, bottom: L.bottom,
        borderRadius: 30, background: tone.bg, boxShadow: '0 18px 40px rgba(0,0,0,.45)',
        zIndex: 10, overflow: 'hidden', padding: 24, display: 'flex', flexDirection: 'column',
    };

    if (L.split) {
        const TOP_H = 150;
        return (
            <>
                <div style={{ ...base, bottom: 'auto', height: TOP_H, background: theme.accent, padding: '18px 22px', justifyContent: 'space-between' }}>
                    <div className="flex items-center justify-between">
                        <span className="rounded-full font-bold text-[12px]" style={{ padding: '4px 14px', border: `2px solid ${theme.ink}`, color: theme.ink }}>Santi.Dev</span>
                        <span className="font-mono font-bold text-[12px]" style={{ color: theme.ink, opacity: 0.7 }}>{window.pad(meta.index + 1)} / {window.pad(meta.total)}</span>
                    </div>
                    <h2 className="font-black tracking-tight m-0" style={{ fontSize: '2rem', lineHeight: 1.02, color: theme.ink }}>
                        {window.rich(d.title, 'rgba(255,255,255,.35)')}
                    </h2>
                </div>
                <div style={{ ...base, top: L.top + TOP_H + 10 }}>
                    <Body d={{ ...d, header: 'none' }} theme={theme} tone={tone} meta={meta} showTitle={false} />
                </div>
            </>
        );
    }

    return (
        <>
            {L.back && (
                <div style={{ ...base, zIndex: 9, boxShadow: 'none', transform: 'rotate(3deg)', background: d.tone === 'accent' ? '#F5F2EB' : theme.accent }} />
            )}
            <div style={{ ...base, transform: L.rotate ? `rotate(${L.rotate}deg)` : undefined }}>
                <Body d={d} theme={theme} tone={tone} meta={meta} showTitle={true} />
            </div>
        </>
    );
};

/** Slide vertical completa: Grid + Fondo dinámico + Bandas + Tarjeta */
window.Slide = ({ video, d, index }) => {
    const theme = window.THEMES[video.theme];
    const meta = { index, total: video.slides.length };
    const seed = video.caseNo * 1000 + index * 37 + 11;
    return (
        <div id="capture-slide" className="bg-grid slide-container">
            <window.Backdrop theme={theme} seed={seed} layout={d.layout} />
            {d.layout === 'low' && <window.TopBand video={video} theme={theme} meta={meta} />}
            {d.layout === 'high' && <window.BottomBand theme={theme} meta={meta} />}
            <window.CardFrame d={d} theme={theme} meta={meta} />
        </div>
    );
};
