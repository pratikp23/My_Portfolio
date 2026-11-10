import { useCallback } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProjectShowcase from "../Components/projects/ProjectShowcase";
import ProjectDetail from "../Components/projects/ProjectDetail";
import { Reveal } from "../Components/projects/Reveal";
import { projects } from "../data/projects";
import SectionParticleHeading from "../Components/SectionParticleHeading";

const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const isStandalone = location.pathname.startsWith("/projects");

  const selectedProject = projects.find((p) => p.slug === slug) || null;

  const openProject = useCallback(
    (project) => {
      const currentY = Math.round(window.scrollY);
      if (!isStandalone) {
        try {
          sessionStorage.setItem("portfolio_home_scroll_y", String(currentY));
          sessionStorage.setItem("portfolio_active_section", "projects");
          sessionStorage.setItem("portfolio_modal_from_home", "1");
        } catch {
          // ignore storage errors
        }
        navigate(`/projects/${project.slug}`, {
          state: {
            backgroundLocation: {
              pathname: location.pathname || "/",
              search: location.search || "",
              hash: "#projects",
            },
            fromHome: true,
            keepScroll: true,
            savedScrollY: currentY,
          },
        });
      } else {
        try {
          sessionStorage.setItem("portfolio_standalone_projects_y", String(currentY));
          sessionStorage.removeItem("portfolio_modal_from_home");
        } catch {
          // ignore storage errors
        }
        navigate(`/projects/${project.slug}`, {
          state: { fromHome: false, keepScroll: true, savedScrollY: currentY },
        });
      }
    },
    [navigate, location.pathname, location.search, isStandalone]
  );

  const closeProject = useCallback(() => {
    let wasFromHome = Boolean(location.state?.fromHome);
    let savedHomeY = location.state?.savedScrollY;
    try {
      if (!wasFromHome && sessionStorage.getItem("portfolio_modal_from_home") === "1") {
        wasFromHome = true;
      }
      if (savedHomeY == null) {
        const storedY = parseInt(sessionStorage.getItem("portfolio_home_scroll_y") || "", 10);
        if (!Number.isNaN(storedY)) savedHomeY = storedY;
      }
      sessionStorage.removeItem("portfolio_modal_from_home");
    } catch {
      // ignore storage errors
    }

    if (wasFromHome) {
      navigate("/#projects", {
        replace: true,
        state: {
          keepScroll: true,
          restoreScrollY: typeof savedHomeY === "number" ? savedHomeY : undefined,
        },
      });
    } else {
      navigate("/projects", {
        replace: true,
        state: {
          keepScroll: true,
          restoreScrollY: typeof savedHomeY === "number" ? savedHomeY : undefined,
        },
      });
    }
  }, [navigate, location.state]);

  return (
    <div className="relative w-full px-4 py-16 sm:py-20 text-white sm:px-6 md:pl-20 md:pr-8 xl:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header matching portfolio styling */}
        <Reveal>
          <div className="text-center mb-14 sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 font-mono text-xs tracking-wider text-amber-400 uppercase border rounded-full bg-amber-500/10 border-amber-500/25">
              <span>Featured Projects</span>
            </div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="relative inline-block">
                  <svg
                    className="section-curly-arrow absolute -left-4 -top-6 w-7 h-7 sm:-left-10 sm:-top-8 sm:w-11 sm:h-11 md:-left-12 md:-top-9 md:w-12 md:h-12 scale-x-[-1] pointer-events-none select-none"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="arrow-grad-projects" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#334155" />
                        <stop offset="100%" stopColor="#f8fafc" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99"
                      stroke="url(#arrow-grad-projects)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <SectionParticleHeading text="FEATURED PROJECTS" maxWidth="max-w-md sm:max-w-lg" />
                </div>
                <svg
                  className="w-48 h-3 mx-auto mt-2 pointer-events-none select-none sm:w-56 sm:mx-0"
                  viewBox="0 0 300 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="brush-grad-projects" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="60%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                  </defs>
                  <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-projects)" />
                  <path
                    d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z"
                    fill="url(#brush-grad-projects)"
                    opacity="0.8"
                  />
                </svg>
                <p className="max-w-xl mt-2 text-sm font-normal sm:text-base text-slate-400">
                  Production-deployed full-stack web applications and AI-integrated platforms.
                </p>
              </div>
              {!isStandalone && (
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1 font-mono text-xs transition-colors text-amber-400 hover:text-amber-300"
                >
                  <span>Full View</span>
                  <span>↗</span>
                </Link>
              )}
            </div>
          </div>
        </Reveal>

        {/* Filters, Rows, Floating Image Preview */}
        <ProjectShowcase onOpen={openProject} />
      </div>

      {/* Detail Overlay (Bottom Sheet) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            key={selectedProject.slug}
            project={selectedProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
