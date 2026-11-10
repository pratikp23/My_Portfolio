import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GithubIcon } from "../Icons";
import ProjectArt from "./ProjectArt";
import { projects } from "../../data/projects";
import { EASE } from "./constants";
import "./projects.css";

export default function ProjectDetail({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Find index for "/01" numbering
  const projectIndex = Math.max(0, projects.findIndex((p) => p.slug === project?.slug));
  const formattedIndex = `/${String(projectIndex + 1).padStart(2, "0")}`;
  const categoryLabel = project?.categoryLabel || (project?.filters ? project.filters.join(" · ") : "");

  // Trap focus, close on Escape, stop Lenis while open, restore focus without scrolling
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    window.__lenis?.stop();
    closeButtonRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.__lenis?.start();
      if (previouslyFocused && typeof previouslyFocused.focus === "function" && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[95] bg-ink/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.55, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-0 bottom-0 top-[4vh] md:top-[6vh] mx-auto w-[min(96vw,1100px)] glass rounded-t-3xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm" style={{ color: project.accent }}>
              {formattedIndex}
            </span>
            <h3 className="font-grotesk font-semibold text-xl md:text-2xl text-white">
              {project.title}
            </h3>
            {categoryLabel && (
              <span className="hidden sm:inline font-mono text-[10px] tracking-widest text-white/35 uppercase border border-white/12 rounded-full px-3 py-1">
                {categoryLabel}
              </span>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            data-cursor="ESC"
            aria-label="Close project details"
            className="project-close-btn w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-lime hover:text-lime transition-colors cursor-pointer"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1" data-lenis-prevent>
          <div className="px-6 md:px-10 py-8 md:py-10 grid lg:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="h-64 md:h-80 rounded-2xl overflow-hidden">
                <ProjectArt project={project} id={project.slug} hue={project.accent} />
              </div>

              {project.note && (
                <p className="font-serifit italic text-lg text-white/55">“{project.note}”</p>
              )}

              {project.stack && project.stack.length > 0 && (
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.3em] text-white/40 mb-3">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="text-xs border rounded-full px-3 py-1.5"
                        style={{ borderColor: `${project.accent}44`, color: project.accent }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="CODE"
                    className="project-github-btn inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 text-sm font-semibold rounded-full px-5 py-2.5 transition-colors shadow-sm"
                  >
                    <GithubIcon size={14} />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="LIVE"
                    className="project-demo-btn inline-flex items-center gap-2 border text-sm font-semibold rounded-full px-5 py-2.5 transition-colors"
                    style={{
                      borderColor: project.accent,
                      color: project.accent,
                      backgroundColor: `${project.accent}18`,
                    }}
                  >
                    <span>Live Demo</span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {project.problem && (
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.3em] mb-3" style={{ color: project.accent }}>
                    THE PROBLEM
                  </h4>
                  <p className="text-white/65 leading-relaxed text-[15px]">{project.problem}</p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.3em] mb-3" style={{ color: project.accent }}>
                    MY SOLUTION
                  </h4>
                  <p className="text-white/65 leading-relaxed text-[15px]">{project.solution}</p>
                </div>
              )}

              {project.intro && !project.problem && !project.solution && (
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.3em] mb-3" style={{ color: project.accent }}>
                    OVERVIEW
                  </h4>
                  <p className="text-white/65 leading-relaxed text-[15px]">{project.intro}</p>
                </div>
              )}

              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.3em] mb-4" style={{ color: project.accent }}>
                    KEY FEATURES
                  </h4>
                  <ul className="space-y-3">
                    {project.features.map((f, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE }}
                        className="flex gap-3 text-[15px] text-white/70"
                      >
                        <span className="mt-2 w-4 h-px shrink-0" style={{ background: project.accent }}></span>
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
