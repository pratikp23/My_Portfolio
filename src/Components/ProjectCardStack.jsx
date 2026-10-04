import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "./Icons";

function getSafeHostname(urlStr) {
  if (!urlStr) return "production-deployment";
  try {
    return new URL(urlStr).hostname;
  } catch {
    return "live-preview";
  }
}

function SingleStackedCard({ project, index, total, onSelect, containerScrollProgress, isLight }) {
  const cardRef = useRef(null);

  // Progressive scale as subsequent cards stack on top
  const targetScale = 1 - (total - index - 1) * 0.04;
  
  // Calculate scroll range where this card scales down
  const step = 1 / total;
  const start = index * step;
  const end = Math.min(1, start + step);

  // useTransform safely on containerScrollProgress
  const scale = useTransform(containerScrollProgress, [start, end], [1, targetScale]);
  const opacity = useTransform(containerScrollProgress, [start, end], [1, 0.94]);

  return (
    <div
      ref={cardRef}
      className="sticky mb-10 sm:mb-14 will-change-transform"
      style={{
        top: `calc(88px + ${index * 26}px)`,
        zIndex: index + 10
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        className={`project-stack-card w-full rounded-3xl overflow-hidden transition-all duration-300 border group ${
          isLight
            ? "bg-white border-slate-200/90 shadow-[0_-10px_35px_rgba(15,23,42,0.08)]"
            : "bg-[#0d1017]/95 border-white/[0.1] shadow-[0_-12px_45px_rgba(0,0,0,0.65)]"
        }`}
      >
        {/* Ambient Glow */}
        <div
          className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-[80px] pointer-events-none transition-opacity ${
            isLight ? "bg-amber-500/[0.08] opacity-60" : "bg-amber-500/[0.04]"
          }`}
        />

        {/* Card Header Strip */}
        <div
          className={`px-6 sm:px-8 py-3.5 border-b flex items-center justify-between transition-colors ${
            isLight
              ? "bg-slate-50/90 border-slate-200"
              : "bg-black/25 border-white/[0.06]"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`font-mono text-xs font-bold ${
                isLight ? "text-amber-700" : "text-amber-400"
              }`}
            >
              0{index + 1} &mdash; 0{total}
            </span>
            <span className={`w-1 h-1 rounded-full ${isLight ? "bg-slate-400" : "bg-slate-600"}`} />
            <span
              className={`text-xs font-mono font-medium ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {project.category}
            </span>
          </div>

          {project.badge && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                isLight
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : "bg-amber-500/15 text-amber-300 border-amber-500/30"
              }`}
            >
              {project.badge}
            </span>
          )}
        </div>

        {/* Card Body (2 Columns on Desktop) */}
        <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Storytelling & Meta (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 text-left">
            <div>
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`text-xs sm:text-sm md:text-base leading-relaxed font-normal ${
                  isLight ? "text-slate-700" : "text-slate-300"
                }`}
              >
                {project.whatIBuilt}
              </p>
            </div>

            {/* Problem & Solution Callout Pill */}
            <div
              className={`p-3.5 rounded-2xl border transition-colors ${
                isLight
                  ? "bg-slate-50 border-slate-200"
                  : "bg-white/[0.02] border-white/[0.06]"
              }`}
            >
              <span
                className={`text-[10px] font-mono uppercase tracking-wider font-bold block mb-1 ${
                  isLight ? "text-amber-700" : "text-amber-400"
                }`}
              >
                Core Problem Addressed:
              </span>
              <p
                className={`text-xs leading-relaxed font-normal ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {project.problem}
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider block mb-2 font-medium ${
                  isLight ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Technologies Used:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono border shadow-sm ${
                      isLight
                        ? "bg-slate-100 text-slate-800 border-slate-200"
                        : "bg-white/[0.04] text-slate-200 border-white/[0.08]"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div
              className={`pt-4 border-t flex flex-wrap items-center gap-3 ${
                isLight ? "border-slate-200" : "border-white/[0.08]"
              }`}
            >
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Open Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-xs sm:text-sm transition-all ${
                    isLight
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                      : "bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border-white/[0.1]"
                  }`}
                >
                  <GithubIcon size={15} />
                  <span>Repository</span>
                </a>
              )}

              <button
                onClick={() => onSelect(project)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ml-auto hover:underline ${
                  isLight
                    ? "text-amber-700 hover:text-amber-800"
                    : "text-amber-400 hover:text-amber-300"
                }`}
              >
                <span>Full System Architecture</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Right Column: Browser Frame Mockup Preview (5 cols) */}
          <div className="lg:col-span-5">
            <div
              className={`relative rounded-2xl overflow-hidden border shadow-xl group/preview ${
                isLight
                  ? "border-slate-300 bg-slate-100"
                  : "border-white/[0.12] bg-slate-950"
              }`}
            >
              {/* Browser Window Header with Traffic Lights */}
              <div
                className={`px-3.5 py-2.5 border-b flex items-center justify-between ${
                  isLight
                    ? "bg-slate-200/90 border-slate-300"
                    : "bg-[#141722] border-white/[0.08]"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div
                  className={`px-3 py-0.5 rounded-md text-[10px] font-mono truncate max-w-[180px] ${
                    isLight
                      ? "bg-white text-slate-600 border border-slate-200"
                      : "bg-black/40 text-slate-400"
                  }`}
                >
                  {getSafeHostname(project.demo)}
                </div>
                <div className="w-8" />
              </div>

              {/* Mockup Screenshot */}
              <div className={`relative aspect-[16/10] overflow-hidden ${isLight ? "bg-slate-100" : "bg-slate-900"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/preview:scale-105"
                />
                
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-medium text-white flex items-center gap-1.5">
                    <span>Click Demo to preview live</span>
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}

export default function ProjectCardStack({ projects, onSelectProject }) {
  const containerRef = useRef(null);

  // Live theme tracking
  const [theme, setTheme] = useState(() => {
    return typeof document !== "undefined" && document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
  });

  useEffect(() => {
    const checkTheme = () => {
      const isLightMode = document.documentElement.classList.contains("light");
      setTheme(isLightMode ? "light" : "dark");
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isLight = theme === "light";

  return (
    <div ref={containerRef} className="relative w-full pb-16">
      {projects.map((project, idx) => (
        <SingleStackedCard
          key={project.id}
          project={project}
          index={idx}
          total={projects.length}
          onSelect={onSelectProject}
          containerScrollProgress={scrollYProgress}
          isLight={isLight}
        />
      ))}
    </div>
  );
}
