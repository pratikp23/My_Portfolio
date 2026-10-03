import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ExternalLink, X, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { GithubIcon } from "../Components/Icons";
import { motion, AnimatePresence } from "framer-motion";

const projectsData = [
  {
    id: "lms",
    title: "AI-Learning Management System",
    category: "Full Stack & AI",
    badge: "Core Project",
    image: "/lms.png",
    demo: "https://learning-management-system-five-azure.vercel.app/",
    github: "https://github.com/pratikp23/Learning-Management-System",
    problem:
      "Standard learning platforms offer static, one-way course delivery without tailored recommendations or automated doubt resolution for students.",
    whatIBuilt:
      "A complete full-stack web application combining course administration with AI-assisted learning paths and automated doubt clearing.",
    myContribution:
      "Architected the full MERN application, developed RESTful API endpoints with Express and Node.js, structured MongoDB collections for user and course records, built responsive frontend views in React and Tailwind CSS, and integrated AI evaluation models.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Personalized course recommendation engine powered by AI models",
      "Interactive doubt resolution and automated resume review assistant",
      "Comprehensive course catalog with student progress tracking",
      "Secure user authentication and MongoDB state persistence",
      "Fast, responsive user interface engineered with Tailwind CSS",
    ],
  },
  {
    id: "healthai",
    title: "HealthAI Guardian",
    category: "Healthcare & AI",
    badge: "Top 10 Finalist Void Hacks 7.0",
    image: "/Project2.png",
    demo: "https://healthai-guardian.netlify.app",
    github: "https://github.com/krrish-cypto/HealthAI-Guardian",
    problem:
      "Patients and care teams lack a centralized, intelligent bridge between fragmented personal health metrics and actionable early anomaly detection.",
    whatIBuilt:
      "A predictive healthcare monitoring platform that records vital statistics and leverages AI models to provide actionable health insights.",
    myContribution:
      "Built client-side views using React and TypeScript, connected machine learning and OpenAI API endpoints for data evaluation, implemented secure health metrics forms, and styled high-contrast data visualization dashboards.",
    technologies: ["React", "TypeScript", "Node.js", "OpenAI API", "MongoDB"],
    features: [
      "Real-time vital statistics tracking and health parameter logs",
      "Predictive analytics assessing trend deviations in patient data",
      "Structured health record repository with privacy safeguards",
      "Automated summary insights translating raw stats into clear guidance",
      "Developed as a Top 10 Finalist project at Void Hacks 7.0 2025",
    ],
  },
];

const Projects = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/projects";
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("featured"); // "featured" | "building"

  return (
    <div className="relative w-full py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
            <span>Engineering Portfolio</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="relative inline-block">
                <svg
                  className="section-curly-arrow absolute -left-7 -top-6 w-8 h-8 sm:-left-10 sm:-top-8 sm:w-11 sm:h-11 md:-left-12 md:-top-9 md:w-12 md:h-12 scale-x-[-1] pointer-events-none select-none"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="arrow-grad-projects" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4e2a14" />
                      <stop offset="100%" stopColor="#fb923c" />
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
                <h2 className="section-heading-font text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wider">
                  Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Projects</span>
                </h2>
              </div>
              <svg className="w-48 sm:w-56 h-3 mt-2 mx-auto sm:mx-0 select-none pointer-events-none" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brush-grad-projects" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="60%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#4e2a14" />
                  </linearGradient>
                </defs>
                <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-projects)" />
                <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-projects)" opacity="0.8" />
              </svg>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-normal">
                Production-deployed full-stack web applications and AI-integrated platforms.
              </p>
            </div>
            {!isStandalone && (
              <Link
                to="/projects"
                className="font-mono text-xs text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* Filter Navigation Toggle */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-8 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] w-fit mx-auto sm:mx-0 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab("featured")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "featured"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <span>Featured Deployments</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
              activeTab === "featured" ? "bg-slate-950/20 text-slate-900" : "bg-white/[0.06] text-slate-400"
            }`}>
              {projectsData.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("building")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "building"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Currently Building</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
              activeTab === "building" ? "bg-slate-950/20 text-slate-900" : "bg-white/[0.06] text-slate-400"
            }`}>
              1 Active
            </span>
          </button>
        </div>

        {/* Dynamic Display based on activeTab */}
        {activeTab === "building" ? (
          /* CURRENTLY BUILDING / THE LAB SPOTLIGHT CARD */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mb-6 relative group"
          >
            <div className="relative rounded-3xl bg-[#0c0e14] border border-amber-500/30 p-6 sm:p-8 md:p-9 shadow-[0_4px_30px_rgba(245,158,11,0.06)] hover:border-amber-500/50 transition-all duration-300">
              
              {/* Header Ribbon / Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                    Currently Building &bull; V1 In Active Development
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    GovTech &bull; Welfare Intelligence
                  </span>
                </div>
              </div>

              {/* Core Card Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
                
                {/* Left / Main Overview (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      HAQ-DWAAR-AI
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                      Civic Tech
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    An AI-augmented citizen welfare platform connecting Indian citizens to eligible government schemes with zero hallucination. Features a centralized <span className="text-amber-400 font-medium">Benefit Passport</span>, bilingual voice navigation via Bhashini, and DigiLocker credential simulation.
                  </p>

                  {/* Architecture Highlights Pill Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                      <ShieldCheck size={16} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Benefit Firewall</div>
                        <div className="text-[11px] text-slate-400">Deterministic mathematical rules prevent LLM hallucination in welfare eligibility.</div>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                      <Cpu size={16} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Multilingual Voice</div>
                        <div className="text-[11px] text-slate-400">Bhashini-compliant voice-to-text allowing citizens to speak in Hindi or English.</div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 font-medium">Engineering Stack:</span>
                    <div className="flex flex-wrap gap-2">
                      {["React 18", "Node.js", "Express", "MongoDB", "Google Gemini 1.5", "Bhashini Voice", "Tailwind CSS", "Zod"].map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right / Current Milestone & Progress (5 cols) */}
                <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                      <Sparkles size={13} />
                      Current Engineering Milestone
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">Active Sprint</span>
                  </div>

                  {/* Milestone Checklist */}
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>Deterministic rule engine & 0–100 Readiness Scorer</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>DigiLocker synthetic credential vault & PII masking</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-100 font-medium bg-amber-500/[0.08] p-2 rounded-lg border border-amber-500/20">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0 mt-1" />
                      <span>Hardening PDF circular parser & Bhashini Voice pipeline</span>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3">
                    <a
                      href="https://github.com/pratikp23/HAQ-DWAAR-AI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all inline-flex items-center justify-center gap-2"
                    >
                      <GithubIcon size={14} />
                      <span>View Repository</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        ) : (
          /* Projects Showcase Grid */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
          >
            {projectsData.map((project, pIdx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: pIdx * 0.15 }}
                className="flex flex-col rounded-3xl bg-[#0e1117]/80 backdrop-blur-md border border-white/[0.08] hover:border-amber-500/30 transition-all overflow-hidden shadow-2xl group"
              >
                {/* Project Visual / Browser Mockup */}
                <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden border-b border-white/[0.06]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-slate-950/90 backdrop-blur-md border border-white/[0.1] text-amber-400">
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-amber-500/90 text-slate-950 shadow-sm">
                        {project.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5 text-left">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed line-clamp-2">
                      {project.whatIBuilt}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.03] text-slate-300 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer py-1.5"
                    >
                      Architecture Details &rarr;
                    </button>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <GithubIcon size={14} className="text-slate-300" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e1117] border border-white/[0.12] p-6 sm:p-8 shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all cursor-pointer"
                aria-label="Close project modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/25">
                  {selectedProject.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {selectedProject.title}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 mb-6">
                <div>
                  <h4 className="font-mono text-xs uppercase text-amber-400 font-semibold mb-1">
                    Problem Solved
                  </h4>
                  <p className="leading-relaxed font-normal">{selectedProject.problem}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase text-amber-400 font-semibold mb-1">
                    System Architecture & Technical Contribution
                  </h4>
                  <p className="leading-relaxed font-normal">{selectedProject.myContribution}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase text-amber-400 font-semibold mb-2">
                    Implemented Features
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] transition-all"
                >
                  <GithubIcon size={14} />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all"
                >
                  <span>Open Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
