'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import './AccordionGallery.css';

const DEFAULT_ITEMS = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  activeIndex: controlledActive,
  onActiveChange,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = ''
}) => {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const detailRefs = useRef([]);
  const collapsedTagRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [internalActive, setInternalActive] = useState(() =>
    Math.min(Math.max(defaultIndex, 0), Math.max(0, count - 1))
  );

  const active =
    typeof controlledActive === 'number'
      ? Math.min(Math.max(controlledActive, 0), Math.max(0, count - 1))
      : internalActive;

  const setActive = useCallback(
    (next) => {
      setInternalActive((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        onActiveChange?.(resolved);
        return resolved;
      });
    },
    [onActiveChange]
  );

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const overlayBg = `linear-gradient(180deg, color-mix(in srgb, ${overlayColor} 38%, transparent) 0%, color-mix(in srgb, ${overlayColor} 84%, transparent) 100%), color-mix(in srgb, ${overlayColor} calc(var(--ag-dim, 0.35) * 100%), transparent)`;

  const applyLayout = useCallback(
    (animate) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];
        const detail = detailRefs.current[i];
        const collapsedTag = collapsedTagRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0.16 : 0.48,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }

        if (detail) {
          if (isActive) {
            tl.to(detail, { opacity: 1, y: 0, duration: dur * 0.85, delay: dur * 0.12, ease }, 0);
          } else {
            tl.to(detail, { opacity: 0, y: 12, duration: dur * 0.45, ease }, 0);
          }
        }

        if (collapsedTag) {
          tl.to(collapsedTag, { opacity: isActive ? 0 : 1, duration: dur * 0.5, ease }, 0);
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i) => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i, item, e) => {
    if (i !== active || !item.link) {
      if (item.link) e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`flex ${vertical ? 'flex-col' : 'flex-row'} w-full max-w-full [perspective:1400px] max-lg:!flex-col max-lg:!h-auto max-lg:[perspective:none] ${className}`}
      style={{ gap: `${gap}px`, height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px` }}
      role="list"
      aria-label="About section accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag = item.link ? 'a' : 'div';
        return (
          <Tag
            key={item.id || i}
            id={item.anchorId || undefined}
            ref={(el) => (panelRefs.current[i] = el)}
            className={`accordion-gallery-panel ${
              item.image
                ? item.isPortrait
                  ? 'accordion-gallery-panel--photo accordion-gallery-panel--portrait'
                  : 'accordion-gallery-panel--photo'
                : 'accordion-gallery-panel--plain'
            } group relative block min-w-0 min-h-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-[#0a0a0e] border border-white/[0.1] no-underline outline-none [transform-style:preserve-3d] [transform-origin:center] [box-shadow:0_14px_34px_-16px_rgba(0,0,0,0.8)] focus-visible:[box-shadow:0_0_0_2px_var(--ag-accent),0_10px_30px_-18px_rgba(0,0,0,0.8)] max-lg:!flex-none max-lg:!transform-none transition-[min-height] duration-300 ${
              isActive ? 'max-lg:min-h-[380px] sm:max-lg:min-h-[420px] border-white/25' : 'max-lg:min-h-[64px]'
            }`}
            style={{
              borderRadius: `${radius}px`,
              '--ag-accent': accentColor,
              willChange: 'flex-grow, transform'
            }}
            href={item.link || undefined}
            onClick={(e) => handleClick(i, item, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            {/* Background Media + Parallax + Grayscale + Overlay */}
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              {item.image ? (
                <>
                  <span
                    ref={(el) => (mediaRefs.current[i] = el)}
                    className="absolute top-1/2 left-1/2 [filter:grayscale(var(--ag-gray,1))] max-lg:!w-full max-lg:!h-full max-lg:!inset-0 max-lg:!left-0 max-lg:!top-0 max-lg:!transform-none"
                    style={{
                      width: vertical ? '100%' : 'var(--ag-media-size, 320px)',
                      height: vertical ? 'var(--ag-media-size, 320px)' : '100%',
                      willChange: 'transform, filter'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt || item.label || ''}
                      draggable="false"
                      style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                      className="block h-full w-full select-none object-cover [-webkit-user-drag:none]"
                    />
                  </span>
                  <span
                    className="ag-photo-overlay pointer-events-none absolute inset-0"
                    style={{ background: overlayBg }}
                    aria-hidden="true"
                  />
                </>
              ) : (
                <span
                  className="ag-plain-bg pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 85% 15%, rgba(248, 250, 252, 0.06), transparent 50%), linear-gradient(160deg, #13141c 0%, #0b0c10 55%, #08080c 100%)'
                  }}
                  aria-hidden="true"
                />
              )}
            </span>

            {/* Collapsed Strip Indicator (visible only on inactive panels) */}
            <span
              ref={(el) => (collapsedTagRefs.current[i] = el)}
              className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-between p-4 max-lg:flex-row max-lg:items-center max-lg:py-4"
              aria-hidden="true"
            >
              <span className="ag-collapsed-num font-mono text-xs tracking-widest text-white/75 uppercase">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="hidden lg:flex items-center justify-center flex-1">
                <span className="ag-collapsed-text font-mono text-[11px] font-semibold tracking-[0.22em] uppercase text-white/80 whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                  {item.shortLabel || item.label}
                </span>
              </span>
              <span className="ag-collapsed-text lg:hidden font-semibold text-sm text-white/90 truncate px-3">
                {item.label}
              </span>
              <span className="ag-collapsed-num font-mono text-[10px] text-white/50">↗</span>
            </span>

            {/* Expanded Active Content + Bar & Label */}
            <div className="relative z-[3] flex h-full w-full flex-col justify-between p-4 sm:p-6">
              {/* Top: Accent Bar + Heading Label (Exact React Bits stagger animation) */}
              {showLabels && !item.hideTopLabel && (
                <div className="pointer-events-none flex items-center gap-3 shrink-0">
                  <span
                    ref={(el) => (barRefs.current[i] = el)}
                    className="ag-accent-bar h-[26px] w-[3px] flex-none rounded-[3px] opacity-0"
                    style={{
                      background: accentColor,
                      boxShadow: `0 0 12px color-mix(in srgb, ${accentColor} 60%, transparent)`
                    }}
                  />
                  <div ref={(el) => (textRefs.current[i] = el)} className="opacity-0 min-w-0">
                    {item.eyebrow && (
                      <span className="block font-mono text-[10px] tracking-[0.22em] uppercase ag-muted text-slate-300">
                        {item.eyebrow}
                      </span>
                    )}
                    <span
                      className="ag-heading-label block overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(1.05rem,1.45vw,1.4rem)] font-bold tracking-[0.01em] [text-shadow:0_2px_14px_rgba(0,0,0,0.65)]"
                      style={{ color: textColor }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom / Body: Rich Original Portfolio Details */}
              {item.content && (
                <div
                  ref={(el) => (detailRefs.current[i] = el)}
                  data-lenis-prevent
                  className={`${showLabels && !item.hideTopLabel ? 'mt-4' : ''} flex-1 overflow-y-auto no-scrollbar opacity-0 ${
                    isActive ? 'pointer-events-auto' : 'pointer-events-none max-lg:hidden'
                  }`}
                >
                  {item.content}
                </div>
              )}
            </div>
          </Tag>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
