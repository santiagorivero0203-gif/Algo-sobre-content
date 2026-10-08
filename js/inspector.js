/**
 * =====================================================================
 * SANTI.DEV · STUDIO INSPECTOR (PANEL DE EDICIÓN EN TIEMPO REAL)
 * =====================================================================
 * Módulo independiente y desacoplado para personalización en vivo:
 *   - Edición de contenidos de la diapositiva (títulos, citas, códigos, stats).
 *   - Biblioteca de Iconos dual: Locales + 1400+ iconos vectoriales de Lucide.
 *   - Inserción y control de capas: Badges/chips destacados y textos flotantes.
 *   - Ajustes de diseño: Temas, estilos de tarjeta (pixel/tech), fondo y formato.
 *   - Edición de Post Kit: Ganchos (hooks), captions, hashtags y horarios.
 *   - GitOps: Disparador de sincronización directa hacia GitHub y Vercel.
 * =====================================================================
 */

window.StudioInspector = ({
    video,
    slide,
    sIdx,
    theme,
    account,
    updateActiveSlide,
    updateActiveVideoMeta,
    onSyncGitHub,
    hasCustomEdits,
    onReset,
    onCloseMobile,
}) => {
    const [tab, setTab] = React.useState('slide'); // 'slide' | 'elements' | 'meta' | 'post'

    // Estados para la pestaña "+ Elementos" (Iconos locales + Lucide 1400+, Badges y Textos)
    const [elementSubTab, setElementSubTab] = React.useState('icons'); // 'icons' | 'badges' | 'texts' | 'list'
    const [iconSearch, setIconSearch] = React.useState('');
    const [selectedIconName, setSelectedIconName] = React.useState('check');
    const [iconColor, setIconColor] = React.useState('#FFFFFF');
    const [iconSize, setIconSize] = React.useState(28);
    const [iconStroke, setIconStroke] = React.useState(2.4);
    const [iconPosition, setIconPosition] = React.useState('top-right');
    const [iconWithBox, setIconWithBox] = React.useState(false);

    // Estados para Badges / Chips destacados
    const [badgeText, setBadgeText] = React.useState('100% OFFLINE');
    const [badgeIcon, setBadgeIcon] = React.useState('sparkle');
    const [badgeColor, setBadgeColor] = React.useState('#FFFFFF');
    const [badgeBg, setBadgeBg] = React.useState('#05163F');
    const [badgePosition, setBadgePosition] = React.useState('top-right');

    // Estados para Texto libre adicional
    const [customText, setCustomText] = React.useState('');
    const [customTextColor, setCustomTextColor] = React.useState('#FFFFFF');
    const [customTextSize, setCustomTextSize] = React.useState(14);
    const [customTextPosition, setCustomTextPosition] = React.useState('bottom-right');

    const activeCustomElements = Array.isArray(slide.customElements) ? slide.customElements : [];

    // Iconos esenciales locales
    const essentialLocalIcons = [
        'check', 'cross', 'heart', 'bookmark', 'code', 'terminal',
        'database', 'gamepad', 'smartphone', 'user', 'sparkle', 'zap',
        'arrow', 'eye', 'camera', 'chip', 'trophy', 'git', 'download', 'gift'
    ];

    // Búsqueda combinada de iconos (Locales + 1400+ Lucide)
    const filteredIcons = React.useMemo(() => {
        const query = iconSearch.trim().toLowerCase();
        if (!query) return essentialLocalIcons;

        const results = [];
        // 1. Filtrar locales
        Object.keys(window.localIcons || {}).forEach((k) => {
            if (k.toLowerCase().includes(query)) results.push(k);
        });

        // 2. Filtrar Lucide si está cargado
        if (window.lucide && window.lucide.icons) {
            Object.keys(window.lucide.icons).forEach((k) => {
                const kLower = k.toLowerCase();
                if (kLower.includes(query) && !results.includes(k) && !results.includes(k.toLowerCase())) {
                    results.push(k);
                }
            });
        }
        return results.slice(0, 36);
    }, [iconSearch]);

    // Presets rápidos de badges
    const badgePresets = [
        { text: 'BETA v2.0', icon: 'zap', bg: 'rgba(245, 158, 11, 0.25)', border: '1.5px solid #f59e0b', color: '#fbbf24', position: 'top-right' },
        { text: '100% OFFLINE', icon: 'database', bg: 'rgba(59, 130, 246, 0.25)', border: '1.5px solid #3b82f6', color: '#93c5fd', position: 'top-right' },
        { text: 'OPEN SOURCE', icon: 'git', bg: 'rgba(34, 197, 94, 0.25)', border: '1.5px solid #22c55e', color: '#86efac', position: 'top-right' },
        { text: 'IA EN VIVO', icon: 'sparkle', bg: 'rgba(168, 85, 247, 0.25)', border: '1.5px solid #a855f7', color: '#d8b4fe', position: 'top-right' },
        { text: 'PRO TIP', icon: 'trophy', bg: 'rgba(234, 179, 8, 0.25)', border: '1.5px solid #eab308', color: '#fef08a', position: 'top-right' },
        { text: 'PASO CLAVE', icon: 'check', bg: 'rgba(6, 182, 212, 0.25)', border: '1.5px solid #06b6d4', color: '#67e8f9', position: 'top-right' },
    ];

    const handleAddIcon = () => {
        const newEl = {
            id: 'icon_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            type: 'icon',
            name: selectedIconName,
            color: iconColor,
            size: Number(iconSize),
            strokeWidth: Number(iconStroke),
            position: iconPosition,
            box: iconWithBox,
            bg: iconWithBox ? '#111111' : undefined,
        };
        updateActiveSlide({ customElements: [...activeCustomElements, newEl] });
    };

    const handleAddPresetBadge = (preset) => {
        const newEl = {
            id: 'badge_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            type: 'badge',
            text: preset.text,
            icon: preset.icon,
            color: preset.color || '#FFFFFF',
            bg: preset.bg || '#111111',
            border: preset.border,
            position: preset.position || 'top-right',
        };
        updateActiveSlide({ customElements: [...activeCustomElements, newEl] });
    };

    const handleAddCustomBadge = () => {
        if (!badgeText.trim()) return;
        const newEl = {
            id: 'badge_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            type: 'badge',
            text: badgeText.trim(),
            icon: badgeIcon || undefined,
            color: badgeColor,
            bg: badgeBg,
            position: badgePosition,
        };
        updateActiveSlide({ customElements: [...activeCustomElements, newEl] });
    };

    const handleAddText = () => {
        if (!customText.trim()) return;
        const newEl = {
            id: 'text_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            type: 'text',
            text: customText.trim(),
            color: customTextColor,
            size: Number(customTextSize),
            position: customTextPosition,
        };
        updateActiveSlide({ customElements: [...activeCustomElements, newEl] });
        setCustomText('');
    };

    const handleRemoveElement = (id) => {
        updateActiveSlide({
            customElements: activeCustomElements.filter((el) => el.id !== id)
        });
    };

    const handleClearAllElements = () => {
        if (window.confirm('¿Eliminar todos los elementos adicionales de esta diapositiva?')) {
            updateActiveSlide({ customElements: [] });
        }
    };

    return (
        <aside className="w-full md:w-[350px] bg-neutral-900 border-l border-neutral-800 flex flex-col h-full shrink-0 shadow-2xl z-30 select-none">
            {/* Cabecera del Inspector */}
            <div className="p-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/90">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse-glow"></span>
                    <div>
                        <h2 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                            <span>Studio Inspector</span>
                            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded font-mono">LIVE</span>
                        </h2>
                        <p className="text-[10px] text-neutral-400 font-mono">Slide {sIdx + 1} de {video.slides.length} · {slide.type}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={onSyncGitHub}
                        title="Guardar en GitHub para despliegue en Vercel"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-[11px] flex items-center gap-1 shadow transition-all">
                        <i className="fa-brands fa-github text-xs"></i>
                        <span>Vercel</span>
                    </button>
                    {onCloseMobile && (
                        <button
                            onClick={onCloseMobile}
                            className="md:hidden w-7 h-7 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}
                </div>
            </div>

            {/* Pestañas del Inspector */}
            <div className="flex border-b border-neutral-800 bg-neutral-950 text-[11px] font-bold">
                <button
                    onClick={() => setTab('slide')}
                    className={`flex-1 py-2 text-center border-b-2 transition-all ${tab === 'slide' ? 'border-amber-400 text-amber-300 bg-neutral-900/60' : 'border-transparent text-neutral-400 hover:text-white'}`}>
                    Contenido
                </button>
                <button
                    onClick={() => setTab('elements')}
                    className={`flex-1 py-2 text-center border-b-2 transition-all flex items-center justify-center gap-1 ${tab === 'elements' ? 'border-amber-400 text-amber-300 bg-neutral-900/60' : 'border-transparent text-neutral-400 hover:text-white'}`}>
                    <i className="fa-solid fa-icons text-[10px]"></i>
                    <span>+ Elementos</span>
                    {activeCustomElements.length > 0 && (
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-black font-mono text-[9px] flex items-center justify-center font-black">
                            {activeCustomElements.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setTab('meta')}
                    className={`flex-1 py-2 text-center border-b-2 transition-all ${tab === 'meta' ? 'border-amber-400 text-amber-300 bg-neutral-900/60' : 'border-transparent text-neutral-400 hover:text-white'}`}>
                    Diseño
                </button>
                <button
                    onClick={() => setTab('post')}
                    className={`flex-1 py-2 text-center border-b-2 transition-all ${tab === 'post' ? 'border-amber-400 text-amber-300 bg-neutral-900/60' : 'border-transparent text-neutral-400 hover:text-white'}`}>
                    Post
                </button>
            </div>

            {/* Cuerpo del Inspector */}
            <div className="flex-1 p-3.5 overflow-y-auto hide-scrollbar flex flex-col gap-3.5 text-xs select-text">
                {tab === 'slide' && (
                    <>
                        {/* Título de la Slide */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                                <span>Título</span>
                                <span className="text-amber-400 font-mono text-[9px]">*marca con rotulador*</span>
                            </label>
                            <input
                                type="text"
                                value={slide.title || ''}
                                onChange={(e) => updateActiveSlide({ title: e.target.value })}
                                className="studio-input p-2 rounded-lg text-xs font-semibold"
                                placeholder="Ej: Traductor de señas *en tiempo real*"
                            />
                        </div>

                        {/* Kicker */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Kicker / Epígrafe superior</label>
                            <input
                                type="text"
                                value={slide.kicker || ''}
                                onChange={(e) => updateActiveSlide({ kicker: e.target.value })}
                                className="studio-input p-2 rounded-lg text-xs"
                                placeholder="Ej: ANÁLISIS DE MERCADO o @mova.app"
                            />
                        </div>

                        {/* Subtítulo / Bajada */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Subtítulo / Bajada</label>
                            <textarea
                                rows="2"
                                value={slide.sub || ''}
                                onChange={(e) => updateActiveSlide({ sub: e.target.value })}
                                className="studio-input p-2 rounded-lg text-xs leading-relaxed"
                                placeholder="Descripción concisa de la diapositiva..."
                            />
                        </div>

                        {/* Cuerpo de texto */}
                        {(slide.body !== undefined || slide.type === 'text') && (
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Cuerpo de Texto</label>
                                <textarea
                                    rows="3"
                                    value={slide.body || ''}
                                    onChange={(e) => updateActiveSlide({ body: e.target.value })}
                                    className="studio-input p-2 rounded-lg text-xs leading-relaxed"
                                    placeholder="Usa *rotulador* para destacar..."
                                />
                            </div>
                        )}

                        {/* Cita */}
                        {(slide.quote !== undefined || slide.type === 'quote-hero') && (
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Frase / Cita de Impacto</label>
                                <textarea
                                    rows="3"
                                    value={slide.quote || ''}
                                    onChange={(e) => updateActiveSlide({ quote: e.target.value })}
                                    className="studio-input p-2 rounded-lg text-xs leading-relaxed"
                                    placeholder="Cita representativa..."
                                />
                            </div>
                        )}

                        {/* Líneas de Código */}
                        {(slide.code !== undefined && Array.isArray(slide.code)) && (
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                                    <span>Líneas de Código / Consola</span>
                                    <span className="font-mono text-[9px] text-neutral-500">1 línea por renglón</span>
                                </label>
                                <textarea
                                    rows="6"
                                    value={slide.code.join('\n')}
                                    onChange={(e) => updateActiveSlide({ code: e.target.value.split('\n') })}
                                    className="studio-input p-2 rounded-lg text-[11px] font-mono leading-snug whitespace-pre"
                                />
                            </div>
                        )}

                        {/* Stat / Métrica */}
                        {(slide.number !== undefined || slide.stat !== undefined || slide.type === 'stat') && (
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Dato / Número</label>
                                    <input
                                        type="text"
                                        value={slide.number || slide.stat || ''}
                                        onChange={(e) => updateActiveSlide({ number: e.target.value, stat: e.target.value })}
                                        className="studio-input p-2 rounded-lg text-xs font-mono font-bold"
                                        placeholder="Ej: 70M o 99%"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Etiqueta del Dato</label>
                                    <input
                                        type="text"
                                        value={slide.label || slide.statLabel || ''}
                                        onChange={(e) => updateActiveSlide({ label: e.target.value, statLabel: e.target.value })}
                                        className="studio-input p-2 rounded-lg text-xs"
                                        placeholder="Ej: personas sordas"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Pie de slide */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Nota al Pie / Conclusión</label>
                            <input
                                type="text"
                                value={slide.foot || ''}
                                onChange={(e) => updateActiveSlide({ foot: e.target.value })}
                                className="studio-input p-2 rounded-lg text-xs"
                                placeholder="Conclusión o reflexión rápida..."
                            />
                        </div>
                    </>
                )}

                {/* ============================================================== */}
                {/* PESTAÑA: + ELEMENTOS (ICONOS LOCALES + LUCIDE 1400+, BADGES)  */}
                {/* ============================================================== */}
                {tab === 'elements' && (
                    <div className="flex flex-col gap-3.5">
                        {/* Selector de sub-categoría de elementos */}
                        <div className="flex p-0.5 bg-neutral-950 rounded-xl border border-neutral-800 text-[10.5px] font-bold">
                            <button
                                onClick={() => setElementSubTab('icons')}
                                className={`flex-1 py-1 px-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${elementSubTab === 'icons' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                                <i className="fa-solid fa-icons text-[9px]"></i>
                                <span>Iconos</span>
                            </button>
                            <button
                                onClick={() => setElementSubTab('badges')}
                                className={`flex-1 py-1 px-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${elementSubTab === 'badges' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                                <i className="fa-solid fa-tag text-[9px]"></i>
                                <span>Badges</span>
                            </button>
                            <button
                                onClick={() => setElementSubTab('texts')}
                                className={`flex-1 py-1 px-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${elementSubTab === 'texts' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                                <i className="fa-solid fa-font text-[9px]"></i>
                                <span>Texto</span>
                            </button>
                            <button
                                onClick={() => setElementSubTab('list')}
                                className={`flex-1 py-1 px-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${elementSubTab === 'list' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-neutral-400 hover:text-white'}`}>
                                <i className="fa-solid fa-layer-group text-[9px]"></i>
                                <span>Capas ({activeCustomElements.length})</span>
                            </button>
                        </div>

                        {/* ---------------- SUB-TAB 1: ICONOS (LOCALES + LUCIDE 1400+) ---------------- */}
                        {elementSubTab === 'icons' && (
                            <div className="flex flex-col gap-3">
                                {/* Buscador de Iconos */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                                        <span>Buscar Icono</span>
                                        <span className="text-amber-400 font-mono text-[9px]">1400+ Lucide & Locales</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={iconSearch}
                                            onChange={(e) => setIconSearch(e.target.value)}
                                            placeholder="Ej: check, heart, camera, terminal, rocket..."
                                            className="studio-input w-full p-2 pl-7 rounded-lg text-xs"
                                        />
                                        <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-neutral-500 text-[10px]"></i>
                                        {iconSearch && (
                                            <button
                                                onClick={() => setIconSearch('')}
                                                className="absolute right-2.5 top-2 text-neutral-400 hover:text-white text-xs">
                                                ×
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Cuadrícula de iconos con previsualización */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9.5px] font-mono text-neutral-500">Selecciona un icono:</span>
                                    <div className="grid grid-cols-6 gap-1.5 p-2 bg-neutral-950 rounded-xl border border-neutral-800 max-h-36 overflow-y-auto hide-scrollbar">
                                        {filteredIcons.map((icName) => {
                                             const isSelected = selectedIconName.toLowerCase() === icName.toLowerCase();
                                            return (
                                                <button
                                                    key={icName}
                                                    onClick={() => setSelectedIconName(icName)}
                                                    title={icName}
                                                    className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all ${isSelected ? 'bg-amber-400 text-black shadow-lg scale-105 ring-2 ring-amber-300' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'}`}>
                                                    <window.Icon
                                                        name={icName}
                                                        size={18}
                                                        color={isSelected ? '#000000' : '#ffffff'}
                                                        strokeWidth={2.4}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tarjeta de Previsualización del Icono Seleccionado */}
                                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconWithBox ? 'bg-neutral-900 border border-neutral-700' : 'bg-neutral-900/40'}`}
                                            style={{ background: iconWithBox ? '#181818' : 'transparent' }}>
                                            <window.Icon
                                                name={selectedIconName}
                                                size={Math.min(32, iconSize)}
                                                color={iconColor}
                                                strokeWidth={iconStroke}
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-xs font-mono">{selectedIconName}</div>
                                            <div className="text-[10px] text-neutral-400 font-mono">
                                                {iconSize}px · {iconPosition} · {iconColor}
                                            </div>
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-neutral-300 select-none">
                                        <input
                                            type="checkbox"
                                            checked={iconWithBox}
                                            onChange={(e) => setIconWithBox(e.target.checked)}
                                            className="rounded accent-amber-400"
                                        />
                                        <span>Caja/Botón</span>
                                    </label>
                                </div>

                                {/* Paleta de Color */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Color del Trazo</label>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        {['#FFFFFF', '#000000', '#22C55E', '#EF4444', '#3B82F6', '#F59E0B', '#A855F7', theme.accent].map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setIconColor(c)}
                                                style={{ backgroundColor: c }}
                                                className={`w-6 h-6 rounded-full border transition-all ${iconColor === c ? 'ring-2 ring-amber-400 scale-110 border-white' : 'border-neutral-700'}`}
                                            />
                                        ))}
                                        <input
                                            type="color"
                                            value={iconColor.startsWith('#') && iconColor.length === 7 ? iconColor : '#ffffff'}
                                            onChange={(e) => setIconColor(e.target.value)}
                                            className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                                            title="Color personalizado"
                                        />
                                    </div>
                                </div>

                                {/* Selector de Tamaño y Grosor */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Tamaño: {iconSize}px</label>
                                        <div className="flex gap-1">
                                            {[20, 28, 36, 48].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => setIconSize(s)}
                                                    className={`flex-1 py-1 rounded text-[10px] font-mono font-bold ${iconSize === s ? 'bg-amber-400 text-black' : 'bg-neutral-800 text-neutral-300'}`}>
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Grosor: {iconStroke}</label>
                                        <div className="flex gap-1">
                                            {[1.5, 2.2, 3.0].map((w) => (
                                                <button
                                                    key={w}
                                                    onClick={() => setIconStroke(w)}
                                                    className={`flex-1 py-1 rounded text-[10px] font-mono font-bold ${iconStroke === w ? 'bg-amber-400 text-black' : 'bg-neutral-800 text-neutral-300'}`}>
                                                    {w}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Selector de Posición */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Ubicación en Diapositiva</label>
                                    <div className="grid grid-cols-3 gap-1">
                                        {[
                                            { id: 'top-left', label: 'Arr. Izq' },
                                            { id: 'top-right', label: 'Arr. Der' },
                                            { id: 'center', label: 'Centro' },
                                            { id: 'bottom-left', label: 'Abj. Izq' },
                                            { id: 'bottom-right', label: 'Abj. Der' },
                                            { id: 'card-top-right', label: 'Tarjeta Der' }
                                        ].map((pos) => (
                                            <button
                                                key={pos.id}
                                                onClick={() => setIconPosition(pos.id)}
                                                className={`py-1 px-1 rounded text-[10px] font-mono font-bold truncate ${iconPosition === pos.id ? 'bg-amber-400 text-black' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}>
                                                {pos.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Botón Insertar Icono */}
                                <button
                                    onClick={handleAddIcon}
                                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all">
                                    <i className="fa-solid fa-plus text-xs"></i>
                                    <span>Añadir Icono "{selectedIconName}" a Slide</span>
                                </button>
                            </div>
                        )}

                        {/* ---------------- SUB-TAB 2: BADGES / CHIPS DESTACADOS ---------------- */}
                        {elementSubTab === 'badges' && (
                            <div className="flex flex-col gap-3">
                                {/* Presets Rápidos */}
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Badges Recomendados (1-Clic)</span>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {badgePresets.map((bp, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleAddPresetBadge(bp)}
                                                style={{ background: bp.bg, color: bp.color, border: bp.border }}
                                                className="p-2 rounded-xl text-[10.5px] font-extrabold uppercase tracking-wider flex items-center justify-between hover:scale-[1.02] active:scale-95 transition-all text-left shadow-sm">
                                                <div className="flex items-center gap-1.5 truncate">
                                                    <window.Icon name={bp.icon} size={12} color={bp.color} strokeWidth={2.4} />
                                                    <span className="truncate">{bp.text}</span>
                                                </div>
                                                <i className="fa-solid fa-plus text-[9px] opacity-70"></i>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Creador de Badge Personalizado */}
                                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col gap-2.5 mt-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1">
                                        <i className="fa-solid fa-sliders text-amber-400 text-[10px]"></i>
                                        <span>Badge Personalizado</span>
                                    </span>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[9.5px] font-mono text-neutral-400">Texto del Badge:</label>
                                        <input
                                            type="text"
                                            value={badgeText}
                                            onChange={(e) => setBadgeText(e.target.value)}
                                            placeholder="Ej: GRATIS / OFFLINE / NUEVO"
                                            className="studio-input p-2 rounded-lg text-xs uppercase font-extrabold tracking-wider"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[9.5px] font-mono text-neutral-400">Icono:</label>
                                            <select
                                                value={badgeIcon}
                                                onChange={(e) => setBadgeIcon(e.target.value)}
                                                className="studio-input p-1.5 rounded-lg text-xs font-mono">
                                                {essentialLocalIcons.map((ic) => (
                                                    <option key={ic} value={ic}>{ic}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[9.5px] font-mono text-neutral-400">Posición:</label>
                                            <select
                                                value={badgePosition}
                                                onChange={(e) => setBadgePosition(e.target.value)}
                                                className="studio-input p-1.5 rounded-lg text-xs font-mono">
                                                <option value="top-right">Arriba Derecha</option>
                                                <option value="top-left">Arriba Izquierda</option>
                                                <option value="card-top-right">Esquina Tarjeta</option>
                                                <option value="bottom-right">Abajo Derecha</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleAddCustomBadge}
                                        className="w-full py-2 rounded-lg font-bold text-xs bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-neutral-700">
                                        <i className="fa-solid fa-plus text-xs text-amber-400"></i>
                                        <span>Añadir Badge Personalizado</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ---------------- SUB-TAB 3: TEXTO LIBRE FLOTANTE ---------------- */}
                        {elementSubTab === 'texts' && (
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Texto a Insertar</label>
                                    <textarea
                                        rows="2"
                                        value={customText}
                                        onChange={(e) => setCustomText(e.target.value)}
                                        placeholder="Ej: 🔥 Desliza para aprender más..."
                                        className="studio-input p-2 rounded-lg text-xs"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Tamaño: {customTextSize}px</label>
                                        <div className="flex gap-1">
                                            {[12, 14, 18, 24].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => setCustomTextSize(s)}
                                                    className={`flex-1 py-1 rounded text-[10px] font-mono font-bold ${customTextSize === s ? 'bg-amber-400 text-black' : 'bg-neutral-800 text-neutral-300'}`}>
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Posición</label>
                                        <select
                                            value={customTextPosition}
                                            onChange={(e) => setCustomTextPosition(e.target.value)}
                                            className="studio-input p-1.5 rounded-lg text-xs font-mono">
                                            <option value="bottom-right">Abajo Derecha</option>
                                            <option value="bottom-left">Abajo Izquierda</option>
                                            <option value="top-right">Arriba Derecha</option>
                                            <option value="center">Centro</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddText}
                                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all">
                                    <i className="fa-solid fa-plus text-xs"></i>
                                    <span>Añadir Texto Flotante</span>
                                </button>
                            </div>
                        )}

                        {/* ---------------- SUB-TAB 4: LISTA DE CAPAS ACTIVAS ---------------- */}
                        {elementSubTab === 'list' && (
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Capas en esta Slide</span>
                                    {activeCustomElements.length > 0 && (
                                        <button
                                            onClick={handleClearAllElements}
                                            className="text-[10px] font-mono text-rose-400 hover:underline">
                                            Borrar todas
                                        </button>
                                    )}
                                </div>

                                {activeCustomElements.length === 0 ? (
                                    <div className="p-6 bg-neutral-950 rounded-xl border border-neutral-800 text-center flex flex-col items-center gap-2">
                                        <i className="fa-solid fa-layer-group text-neutral-600 text-xl"></i>
                                        <p className="text-neutral-400 text-xs font-medium m-0">No hay elementos adicionales en esta diapositiva.</p>
                                        <p className="text-neutral-500 text-[10.5px] m-0">Usa las pestañas de arriba para insertar iconos Lucide, badges o stickers.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1.5">
                                        {activeCustomElements.map((el, idx) => (
                                            <div
                                                key={el.id}
                                                className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between gap-2 shadow-sm">
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                                                        {el.type === 'icon' && <window.Icon name={el.name} size={15} color={el.color || '#fff'} />}
                                                        {el.type === 'badge' && <i className="fa-solid fa-tag text-xs text-amber-400"></i>}
                                                        {el.type === 'text' && <i className="fa-solid fa-font text-xs text-blue-400"></i>}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-bold text-white text-[11px] truncate">
                                                            {el.type === 'icon' && `Icono: ${el.name}`}
                                                            {el.type === 'badge' && `Badge: ${el.text}`}
                                                            {el.type === 'text' && `Texto: ${el.text}`}
                                                        </span>
                                                        <span className="text-[9.5px] font-mono text-neutral-500">
                                                            Pos: {el.position}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveElement(el.id)}
                                                    className="w-6 h-6 rounded-lg bg-neutral-800 hover:bg-rose-950 hover:text-rose-400 text-neutral-400 flex items-center justify-center text-xs transition-colors shrink-0"
                                                    title="Eliminar capa">
                                                    <i className="fa-solid fa-trash-can text-[10px]"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* ============================================================== */}
                {/* PESTAÑA: DISEÑO / METADATA                                      */}
                {/* ============================================================== */}
                {tab === 'meta' && (
                    <div className="flex flex-col gap-3.5">
                        {/* Selector de Tema */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Tema Visual de la Serie</label>
                            <div className="grid grid-cols-2 gap-1.5">
                                {Object.keys(window.THEMES || {}).map((thKey) => {
                                    const th = window.THEMES[thKey];
                                    const isSel = video.theme === thKey;
                                    return (
                                        <button
                                            key={thKey}
                                            onClick={() => updateActiveVideoMeta({ theme: thKey })}
                                            className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-all ${isSel ? 'border-amber-400 bg-neutral-800 shadow' : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900'}`}>
                                            <span style={{ width: 12, height: 12, borderRadius: 3, background: th.accent, flexShrink: 0 }} />
                                            <div className="truncate">
                                                <div className="font-bold text-white text-[11px] truncate">{th.name || thKey}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Layout de la Tarjeta */}
                        {slide.layout && (
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Layout de la Tarjeta</label>
                                <div className="grid grid-cols-3 gap-1">
                                    {['high', 'low', 'float', 'split', 'tilt', 'full'].map((ly) => (
                                        <button
                                            key={ly}
                                            onClick={() => updateActiveSlide({ layout: ly })}
                                            className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold capitalize transition-all ${slide.layout === ly ? 'bg-amber-400 text-black' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}>
                                            {ly}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tono / Contraste */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Tono de la Diapositiva</label>
                            <div className="grid grid-cols-3 gap-1">
                                {[
                                    { id: undefined, label: 'Por Defecto' },
                                    { id: 'light', label: 'Tarjeta Clara' },
                                    { id: 'dark', label: 'Tarjeta Oscura' },
                                    { id: 'accent', label: 'Acento Fuerte' },
                                    { id: 'white', label: 'Blanco Puro' },
                                ].map((tn) => (
                                    <button
                                        key={String(tn.id)}
                                        onClick={() => updateActiveSlide({ tone: tn.id })}
                                        className={`py-1.5 px-1 rounded-lg text-[10.5px] font-semibold truncate transition-all ${slide.tone === tn.id ? 'bg-amber-400 text-black font-bold' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}>
                                        {tn.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reset a valores originales */}
                        <div className="pt-2 border-t border-neutral-800">
                            <button
                                onClick={onReset}
                                disabled={!hasCustomEdits}
                                className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${hasCustomEdits ? 'bg-rose-950/70 border border-rose-700/60 text-rose-300 hover:bg-rose-900 active:scale-95' : 'bg-neutral-800/40 text-neutral-600 border border-neutral-800 cursor-not-allowed'}`}>
                                <i className="fa-solid fa-rotate-left"></i>
                                <span>Restablecer Diapositiva Original</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* PESTAÑA: POST KIT (CAPTION, HASHTAGS Y COPY)                    */}
                {/* ============================================================== */}
                {tab === 'post' && (
                    <div className="flex flex-col gap-3.5">
                        {video.post ? (
                            <>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Gancho / Hook (Primera línea)</label>
                                    <textarea
                                        rows="2"
                                        value={video.post.hook || ''}
                                        onChange={(e) => updateActiveVideoMeta({ post: { ...video.post, hook: e.target.value } })}
                                        className="studio-input p-2 rounded-lg text-xs font-semibold"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Descripción / Caption Completo</label>
                                    <textarea
                                        rows="6"
                                        value={video.post.caption || ''}
                                        onChange={(e) => updateActiveVideoMeta({ post: { ...video.post, caption: e.target.value } })}
                                        className="studio-input p-2 rounded-lg text-xs leading-relaxed font-mono"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Hashtags (separados por espacio)</label>
                                    <input
                                        type="text"
                                        value={(video.post.hashtags || []).join(' ')}
                                        onChange={(e) => updateActiveVideoMeta({ post: { ...video.post, hashtags: e.target.value.split(/\s+/).filter(Boolean) } })}
                                        className="studio-input p-2 rounded-lg text-xs font-mono text-cyan-300"
                                    />
                                </div>
                            </>
                        ) : (
                            <p className="text-neutral-500 text-xs">Este carrusel no tiene kit de publicación configurado.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Pie del Inspector */}
            <div className="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-[11px]">
                {hasCustomEdits ? (
                    <span className="text-amber-400 font-mono text-[10px] flex items-center gap-1">
                        <i className="fa-solid fa-pen-nib text-[9px]"></i>
                        <span>Cambios locales activos</span>
                    </span>
                ) : (
                    <span className="text-neutral-500 font-mono text-[10px]">✓ Sin cambios pendientes</span>
                )}
                <span className="text-amber-400 font-mono text-[10px]">Guardado en vivo</span>
            </div>
        </aside>
    );
};
