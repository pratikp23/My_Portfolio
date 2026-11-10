import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { projects, PROJECT_FILTERS } from "../../data/projects";
import { GithubIcon } from "../Icons";
import ProjectArt from "./ProjectArt";
import { Reveal } from "./Reveal";
import { EASE } from "./constants";
import "./projects.css";

export default function ProjectShowcase({ onOpen }) {
  const [filter, setFilter] = useState("All projects");
  const [hovered, setHovered] = useState(null);

  const [finePointer, setFinePointer] = useState(() => {
    return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const listRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 22 });
  const sy = useSpring(my, { stiffness: 160, damping: 22 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onHoverChange = (e) => setFinePointer(e.matches);
    hoverMq.addEventListener("change", onHoverChange);

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (e) => setReducedMotion(e.matches);
    motionMq.addEventListener("change", onMotionChange);

    return () => {
      hoverMq.removeEventListener("change", onHoverChange);
      motionMq.removeEventListener("change", onMotionChange);
    };
  }, []);

  const onMove = (e) => {
    if (!listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const visible = projects.filter((p) => {
    if (filter === "All projects" || filter === "All Projects") return true;
    return p.filters && p.filters.includes(filter);
  });

  return (
    <div className="w-full">
      {/* 1) Filters */}
      <Reveal>
        <div className="flex flex-wrap gap-2.5 -mt-6 mb-14">
          {PROJECT_FILTERS.map((f) => {
            const isActive = filter === f || (f.toLowerCase() === "all projects" && filter.toLowerCase() === "all projects");
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                data-cursor=""
                className={`text-[13px] rounded-full px-5 py-2 border transition-all duration-300 ${
                  isActive
                    ? "proj-filter-pill-active bg-[#f8fafc] text-ink border-[#f8fafc] font-medium"
                    : "proj-filter-pill border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* 2) List container with 3) Floating preview */}
      <div
        ref={listRef}
        onMouseMove={onMove}
        onMouseLeave={() => setHovered(null)}
        className="relative w-full"
      >
        {finePointer && hovered && !reducedMotion && (
          <motion.div
            className="absolute z-30 pointer-events-none hidden lg:block"
            style={{ x: sx, y: sy, top: 0, left: 0 }}
          >
            <div style={{ transform: "translate(-50%, -55%)" }}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={hovered.slug}
                  initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="w-[24rem] h-[15rem] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  <ProjectArt project={hovered} id={hovered.slug} hue={hovered.accent} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        <div>
          <AnimatePresence mode="popLayout">
            {visible.map((p) => {
              const originalIndex = projects.findIndex((item) => item.slug === p.slug);
              const formattedIndex = `/${String(originalIndex + 1).padStart(2, "0")}`;
              const categoryLabel = p.categoryLabel || (p.filters ? p.filters.join(" · ") : "");

              return (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  onClick={() => onOpen(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOpen(p);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setHovered(p)}
                  data-cursor="VIEW"
                  style={{ "--row-accent": p.accent }}
                  className="proj-row w-full text-left grid grid-cols-12 items-center gap-4 md:gap-6 py-8 md:py-10 group px-2 md:px-4 cursor-pointer focus-visible:outline-none"
                  aria-label={`Open ${p.title} details`}
                >
                  {/* Index column */}
                  <span className="row-idx col-span-2 md:col-span-1 font-mono text-sm text-white/30 group-hover:text-[var(--row-accent)] transition-colors">
                    {formattedIndex}
                  </span>

                  {/* Title + Tagline + Quick Action Links + Mobile Inline Preview */}
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="row-title font-grotesk font-semibold text-2xl sm:text-3xl md:text-5xl tracking-tight text-white/90 group-hover:text-white break-words">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/40 max-w-md">{p.tagline}</p>

                    {/* Direct Quick Links on Row */}
                    <div
                      className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-3 pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="CODE"
                          className="proj-quick-link inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-white/15 hover:border-white/40 text-white/70 hover:text-white bg-white/[0.04] transition-all"
                          title="Open GitHub Repository"
                        >
                          <GithubIcon size={12} />
                          <span>Code</span>
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="LIVE"
                          className="proj-quick-link inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border transition-all"
                          style={{
                            borderColor: `${p.accent}55`,
                            color: p.accent,
                            backgroundColor: `${p.accent}14`,
                          }}
                          title="Open Live Deployment"
                        >
                          <span>Live Demo</span>
                          <span className="text-[10px]">↗</span>
                        </a>
                      )}
                    </div>

                    <div className="lg:hidden mt-4 h-36 rounded-xl overflow-hidden">
                      <ProjectArt project={p} id={p.slug} hue={p.accent} />
                    </div>
                  </div>

                  {/* Category label (hidden on mobile) */}
                  <div className="hidden md:block col-span-3 font-mono text-[11px] tracking-wider text-white/35 uppercase">
                    {categoryLabel}
                  </div>

                  {/* Year column (hidden on mobile, hide content if missing) */}
                  {p.year ? (
                    <div className="hidden md:flex col-span-1 font-mono text-sm text-white/30 justify-end">
                      {p.year}
                    </div>
                  ) : (
                    <div className="hidden md:block col-span-1" />
                  )}

                  {/* Arrow circle (hidden on mobile) */}
                  <div className="hidden md:flex col-span-1 justify-end">
                    <span className="row-arrow w-11 h-11 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:border-[var(--row-accent)] group-hover:bg-[var(--row-accent)] group-hover:text-ink">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <path d="M7 17L17 7M17 7H8M17 7v9" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
