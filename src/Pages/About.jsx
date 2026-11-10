import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  School,
  Briefcase,
  Layers,
  MapPin,
  Calendar,
  CheckCircle2,
  Trophy,
  Sparkles,
} from "lucide-react";
import { Reveal } from "../Components/ScrollReveal";
import SectionParticleHeading from "../Components/SectionParticleHeading";
import AccordionGallery from "../Components/AccordionGallery/AccordionGallery";

const STATEMENT_TEXT =
  "I'm a final-year Computer Science student who learns by building real products.";
const STATEMENT_WORDS = STATEMENT_TEXT.split(" ");

function BioPanelContent({ isActive, reducedMotion }) {
  return (
    <div className="flex flex-col justify-end h-full">
      <div className="ag-surface p-5 sm:p-6 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md space-y-4">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl">
          {STATEMENT_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: reducedMotion ? 1 : 0.18 }}
              animate={{ opacity: reducedMotion || isActive ? 1 : 0.18 }}
              transition={{
                duration: reducedMotion ? 0 : 0.35,
                delay: reducedMotion || !isActive ? 0 : 0.08 + i * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-2 text-white"
            >
              {word}
            </motion.span>
          ))}
        </h3>
        <motion.p
          initial={{ opacity: reducedMotion ? 1 : 0.35 }}
          animate={{ opacity: reducedMotion || isActive ? 1 : 0.35 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: isActive ? 0.35 : 0 }}
          className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-300"
        >
          From{" "}
          <strong className="font-semibold text-white">HAQ-DWAAR AI</strong>, a platform
          that helps rural citizens in Madhya Pradesh discover government schemes, to MERN
          and multi-agent AI applications, I focus on software that solves concrete
          problems. I enjoy full-stack and backend work, and I&apos;m exploring AI-powered
          applications.
        </motion.p>
      </div>
    </div>
  );
}

const About = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/about";
  const reducedMotion = useReducedMotion();
  const [isLight, setIsLight] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("light")
  );
  const [activePanel, setActivePanel] = useState(() =>
    location.hash === "#experience" || (typeof window !== "undefined" && window.location.hash === "#experience") ? 2 : 0
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Sync Work Experience panel (index 2) when user navigates to /#experience via Navbar or Dock
  useEffect(() => {
    const onHashOrAnchor = () => {
      if (window.location.hash === "#experience") {
        setActivePanel(2);
      }
    };
    const onDocumentClick = (e) => {
      const link = e.target?.closest?.('a[href*="#experience"], button[aria-label="Navigate to Work"]');
      if (link) {
        setActivePanel(2);
      }
    };
    window.addEventListener("hashchange", onHashOrAnchor);
    window.addEventListener("popstate", onHashOrAnchor);
    document.addEventListener("click", onDocumentClick);
    return () => {
      window.removeEventListener("hashchange", onHashOrAnchor);
      window.removeEventListener("popstate", onHashOrAnchor);
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  const stats = useMemo(
    () => [
      { label: "Projects Completed", value: "10+" },
      { label: "Certifications", value: "15" },
      { label: "Hackathons", value: "2+" },
    ],
    []
  );

  const educationList = useMemo(
    () => [
      {
        year: "2023 – 2027",
        title: "B.Tech in Computer Science & Engineering",
        institution: "Shri Ram Institute of Technology, Jabalpur (RGPV)",
        cgpa: "CGPA 8.47",
        icon: <GraduationCap size={14} />,
      },
      {
        year: "2021 – 2023",
        title: "Class XII (PCM)",
        institution: "L.S. College, Muzaffarpur, Bihar",
        icon: <BookOpen size={14} />,
      },
      {
        year: "2021",
        title: "Class X",
        institution: "St. Joseph Sr. Sec. School, Muzaffarpur, Bihar",
        icon: <School size={14} />,
      },
    ],
    []
  );

  const experiences = useMemo(
    () => [
      {
        role: "Software Development Engineer (SDE) Intern",
        company: "Bluestock Fintech",
        location: "Pune, India",
        duration: "Aug 2025 – Sep 2025",
        highlights: [
          "Engineered and maintained responsive client interfaces using React.js and modern component patterns.",
          "Collaborated on full-stack application modules integrating Node.js backend services and REST APIs.",
          "Implemented modular, reusable UI components and assisted with client-side performance and rendering optimization.",
        ],
        skills: ["React.js", "Node.js", "JavaScript", "REST APIs", "Tailwind CSS"],
      },
      {
        role: "Campus Ambassador",
        company: "IIT Bombay",
        location: "Remote / Campus",
        duration: "Aug 2025 – Dec 2025",
        highlights: [
          "Coordinated student outreach for national technical initiatives, hackathons, and programming events.",
          "Organized coding workshops and facilitated peer participation in inter-college competitive programming.",
          "Acted as the liaison between student developer communities and IIT Bombay event organizers.",
        ],
        skills: ["Community Leadership", "Event Coordination", "Technical Outreach"],
      },
    ],
    []
  );

  const galleryItems = useMemo(
    () => [
      {
        id: "profile",
        image: "/profile_pic.png",
        isPortrait: true,
        objectPosition: "center 12%",
        label: "Pratik Pathak",
        shortLabel: "Profile",
        hideTopLabel: true,
        content: (
          <div className="flex flex-col justify-end h-full pointer-events-none">
            <div className="pt-16 pb-1 flex items-end gap-3">
              <span className="ag-portrait-bar h-11 w-[3px] rounded-full bg-white shrink-0 shadow-[0_0_12px_rgba(255,255,255,0.65)]" />
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
                  Pratik Pathak
                </h3>
                <p className="ag-amber-text mt-0.5 text-sm sm:text-base font-medium text-amber-400 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
                  Software Developer · B.Tech CSE Student
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "bio",
        image: "/hero_bg.jpg",
        eyebrow: "02 · Introduction",
        label: "About & Story",
        shortLabel: "Bio",
        content: <BioPanelContent isActive={activePanel === 1} reducedMotion={reducedMotion} />,
      },
      {
        id: "experience",
        anchorId: "experience",
        image: null,
        eyebrow: "03 · Career History",
        label: "Work Experience",
        shortLabel: "Experience",
        content: (
          <div className="space-y-3">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="ag-surface p-3.5 sm:p-4 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-semibold leading-snug tracking-tight text-white">
                      {exp.role}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium tracking-tight text-slate-300 mt-1">
                      <span className="ag-amber-text font-semibold text-amber-400">{exp.company}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-slate-300">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <span className="ag-chip inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-tight bg-white/10 text-white border border-white/20">
                    <Calendar size={12} />
                    <span>{exp.duration}</span>
                  </span>
                </div>

                <ul className="space-y-1.5 mt-2.5 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed text-slate-200">
                  {exp.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 size={14} className="ag-emerald-text text-emerald-400 shrink-0 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="ag-chip px-2.5 py-0.5 rounded text-[11px] sm:text-xs font-medium tracking-tight bg-white/10 text-slate-100 border border-white/15"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "education",
        image: "/hero_widescreen.jpg",
        objectPosition: "center 14%",
        eyebrow: "04 · Credentials",
        label: "Academic Journey",
        shortLabel: "Education",
        content: (
          <div className="flex flex-col justify-end h-full space-y-2.5">
            {educationList.map((item, idx) => (
              <div
                key={idx}
                className="ag-surface p-3.5 sm:p-4 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md flex items-start gap-3"
              >
                <div className="ag-icon-circle w-9 h-9 rounded-full border border-white/25 bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="ag-amber-text px-2.5 py-0.5 rounded text-xs sm:text-[13px] font-semibold tracking-tight bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      {item.year}
                    </span>
                    {item.cgpa && (
                      <span className="ag-chip px-2.5 py-0.5 rounded text-xs sm:text-[13px] font-semibold tracking-tight bg-white/10 text-white border border-white/20">
                        {item.cgpa}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base sm:text-lg lg:text-xl font-semibold leading-snug tracking-tight text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-300 mt-0.5">{item.institution}</p>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "focus",
        image: "/project_ai.png",
        eyebrow: "05 · Engineering Focus",
        label: "Core Architecture",
        shortLabel: "Core Focus",
        content: (
          <div className="flex flex-col justify-end h-full space-y-2.5">
            <div className="ag-surface p-3.5 sm:p-4 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1.5">
                <Layers size={16} className="ag-amber-text text-amber-400" />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold leading-snug tracking-tight text-white">MERN Architecture</h4>
              </div>
              <p className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-200">
                React, Node.js, Express, MongoDB with TypeScript and responsive interfaces.
              </p>
            </div>
            <div className="ag-surface p-3.5 sm:p-4 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1.5">
                <Briefcase size={16} className="ag-emerald-text text-emerald-400" />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold leading-snug tracking-tight text-white">Scalable Services</h4>
              </div>
              <p className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-200">
                RESTful API design, schema modeling, clean error handling, and cloud pipelines.
              </p>
            </div>
            <div className="ag-surface p-3.5 sm:p-4 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={16} className="ag-amber-text text-amber-400" />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold leading-snug tracking-tight text-white">LLM Integration</h4>
              </div>
              <p className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-200">
                Google Gemini API, multi-agent workflows, and intelligent user assistance.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "impact",
        image: "/project_saas.png",
        eyebrow: "06 · Track Record",
        label: "Metrics & Honors",
        shortLabel: "Metrics",
        content: (
          <div className="flex flex-col justify-end h-full space-y-3">
            <div className="grid grid-cols-3 gap-2.5">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="ag-surface py-4 px-2.5 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md flex flex-col items-center text-center"
                >
                  <p className="ag-accent-text text-2xl sm:text-3xl lg:text-4xl font-semibold leading-none tracking-tight text-white">
                    {s.value}
                  </p>
                  <p className="ag-muted mt-1.5 text-xs sm:text-sm font-normal leading-snug text-slate-300">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="ag-surface p-4 sm:p-5 rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md space-y-2.5">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="ag-amber-text text-amber-400" />
                <span className="text-base sm:text-lg font-semibold leading-snug tracking-tight text-white">
                  Competitive Highlights
                </span>
              </div>
              <p className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-200">
                <strong className="font-semibold text-white">1st Place Winner</strong> — Techno Genesis Hackathon (2025) &amp; <strong className="font-semibold text-white">Top 10 Finalist</strong> — Void Hacks 7.0 with HealthAI Guardian.
              </p>
            </div>
          </div>
        ),
      },
    ],
    [experiences, educationList, stats, activePanel, reducedMotion]
  );

  return (
    <div className="about-section relative w-full px-4 py-16 sm:py-20 text-white sm:px-6 md:pl-20 md:pr-8 xl:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 font-mono text-xs tracking-wider text-amber-400 uppercase border rounded-full bg-amber-500/10 border-amber-500/25">
              <span>Profile &amp; Background</span>
            </div>
          </Reveal>
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
                    <linearGradient
                      id="arrow-grad-about"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#f8fafc" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99"
                    stroke="url(#arrow-grad-about)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <SectionParticleHeading text="ABOUT ME" />
              </div>
              <svg
                className="w-48 h-3 mx-auto mt-2 pointer-events-none select-none sm:w-56 sm:mx-0"
                viewBox="0 0 300 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="brush-grad-about"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="60%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z"
                  fill="url(#brush-grad-about)"
                />
                <path
                  d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z"
                  fill="url(#brush-grad-about)"
                  opacity="0.8"
                />
              </svg>
              <p className="max-w-xl mt-2 text-xs sm:text-sm font-mono text-slate-400">
                Hover or tap any panel to explore Profile, Bio, Experience, Education, Architecture &amp; Metrics.
              </p>
            </div>
            {!isStandalone && (
              <Link
                to="/about"
                className="about-fullview-link inline-flex items-center gap-1 font-mono text-xs transition-colors rounded text-amber-400 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* Interactive 3D Accordion Gallery with Exact React Bits GSAP Animation */}
        <AccordionGallery
          items={galleryItems}
          defaultIndex={0}
          activeIndex={activePanel}
          onActiveChange={setActivePanel}
          expandRatio={0.5}
          trigger="hover"
          accentColor={isLight ? "#d97706" : "#ffffff"}
          overlayColor={isLight ? "#f8fafc" : "#060010"}
          textColor={isLight ? "#0f172a" : "#ffffff"}
          grayscale
          showLabels
          duration={0.6}
          ease="power3.out"
          parallax={0.5}
          tilt={8}
          stagger={0.06}
          height={540}
          gap={10}
          radius={18}
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

export default About;
