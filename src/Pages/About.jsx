import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  School,
  Briefcase,
  Layers,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useInView,
  animate,
} from "framer-motion";
import { Reveal } from "../Components/ScrollReveal";
import SectionParticleHeading from "../Components/SectionParticleHeading";
import ScrollStack from "../Components/ScrollStack";

const EASE = [0.22, 1, 0.36, 1];

// ---------------------------------------------------------------------------
// Sub-component: Scroll-linked word for the Hero Statement
// ---------------------------------------------------------------------------
function StatementWord({ word, index, total, scrollProgress, reducedMotion }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollProgress, [start, end], [0.18, 1]);

  if (reducedMotion) {
    return <span className="inline-block mr-2 text-white">{word}</span>;
  }

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-2 text-white transition-colors duration-200"
    >
      {word}
    </motion.span>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Full-Width Interactive Bento Tile for ScrollStack with Cursor Spotlight
// ---------------------------------------------------------------------------
function BentoTile({ children, className = "", id }) {
  const tileRef = useRef(null);
  const [coords, setCoords] = useState({ x: -999, y: -999 });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e) => {
      if (reducedMotion) return;
      const rect = tileRef.current?.getBoundingClientRect();
      if (!rect) return;
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [reducedMotion]
  );

  return (
    <div
      id={id}
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full rounded-3xl border border-white/[0.08] hover:border-amber-500/40 bg-[#111115]/95 backdrop-blur-xl transition-all relative overflow-hidden p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.55)] group/tile scroll-mt-24 ${className}`.trim()}
    >
      {!reducedMotion && isHovered && (
        <div
          className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Animated Number Count-Up for Stats Strip
// ---------------------------------------------------------------------------
function AnimatedCounter({ value, label, reducedMotion }) {
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-30px" });

  useEffect(() => {
    if (reducedMotion || !isInView) return;

    const numericMatch = value.match(/\d+/);
    if (!numericMatch) return;

    const target = parseInt(numericMatch[0], 10);
    const suffix = value.replace(String(target), "");

    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(`${Math.floor(latest)}${suffix}`);
      },
      onComplete: () => {
        setDisplayValue(value);
      },
    });

    return () => controls.stop();
  }, [isInView, value, reducedMotion]);

  const outputNumber = reducedMotion ? value : displayValue;

  return (
    <div
      ref={nodeRef}
      className="py-4 px-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col items-center shadow-sm"
    >
      <p className="text-2xl font-extrabold text-transparent about-stat-number sm:text-3xl bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
        {outputNumber}
      </p>
      <p className="mt-1 text-xs font-normal text-center sm:text-sm text-slate-400">
        {label}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component: About
// ---------------------------------------------------------------------------
const About = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/about";
  const reducedMotion = useReducedMotion();

  const [hoveredExpIdx, setHoveredExpIdx] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isTouch, setIsTouch] = useState(() => {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    );
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: coarse)");
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Preserved Data: stats
  const stats = [
    { label: "Projects Completed", value: "10+" },
    { label: "Certifications", value: "15" },
    { label: "Hackathons", value: "2+" },
  ];

  // Preserved Data: educationList (with CGPA 8.47 added to B.Tech)
  const educationList = [
    {
      year: "2023 – 2027",
      title: "B.Tech in Computer Science & Engineering",
      institution: "Shri Ram Institute of Technology, Jabalpur (RGPV)",
      cgpa: "CGPA 8.47",
      icon: <GraduationCap size={15} />,
    },
    {
      year: "2021 – 2023",
      title: "Class XII (PCM)",
      institution: "L.S. College, Muzaffarpur, Bihar",
      icon: <BookOpen size={15} />,
    },
    {
      year: "2010 – 2021",
      title: "Class X",
      institution: "St. Joseph Sr. Sec. School, Muzaffarpur, Bihar",
      icon: <School size={15} />,
    },
  ];

  // Work Experiences (Merged from standalone section)
  const experiences = [
    {
      role: "Software Development Engineer (SDE) Intern",
      company: "Bluestock Fintech",
      location: "Pune, India",
      duration: "Aug 2025 – Sep 2025",
      type: "Internship",
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
      type: "Student Leadership",
      highlights: [
        "Coordinated student outreach for national technical initiatives, hackathons, and programming events.",
        "Organized coding workshops and facilitated peer participation in inter-college competitive programming.",
        "Acted as the liaison between student developer communities and IIT Bombay event organizers.",
      ],
      skills: ["Community Leadership", "Event Coordination", "Technical Outreach"],
    },
  ];

  // -------------------------------------------------------------------------
  // 3D Photo Card Cursor Tilt & Glare State
  // -------------------------------------------------------------------------
  const photoCardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXRaw = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateYRaw = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 150, damping: 15 });

  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePhotoMouseMove = useCallback(
    (e) => {
      if (reducedMotion || isTouch) return;
      const rect = photoCardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setGlarePos({
        x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
        y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
        opacity: 0.18,
      });
    },
    [reducedMotion, isTouch, mouseX, mouseY]
  );

  const handlePhotoMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, [mouseX, mouseY]);

  // -------------------------------------------------------------------------
  // Scroll-linked highlight on Statement
  // -------------------------------------------------------------------------
  const statementRef = useRef(null);
  const { scrollYProgress: statementScroll } = useScroll({
    target: statementRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const statementText =
    "I'm a final-year Computer Science student who learns by building real products.";
  const statementWords = useMemo(
    () => statementText.split(" "),
    [statementText]
  );

  // -------------------------------------------------------------------------
  // Scroll-drawn connector line & Travelling Laser Bead for Education Timeline
  // -------------------------------------------------------------------------
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.3"],
  });
  const connectorScale = useSpring(timelineScroll, {
    stiffness: 100,
    damping: 20,
  });
  const laserTop = useTransform(
    connectorScale,
    [0, 1],
    ["16px", "calc(100% - 24px)"]
  );
  const laserOpacity = useTransform(
    connectorScale,
    [0, 0.05, 0.98, 1],
    [0, 1, 1, 0.8]
  );

  return (
    <div className="relative w-full px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center sm:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 font-mono text-xs tracking-wider text-amber-400 uppercase border rounded-full bg-amber-500/10 border-amber-500/25">
              <span>Profile &amp; Background</span>
            </div>
          </Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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
            </div>
            {!isStandalone && (
              <Link
                to="/about"
                className="inline-flex items-center gap-1 font-mono text-xs transition-colors rounded text-amber-400 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* -------------------------------------------------------------------
            12-Column Modern Sticky-Photo + Full-Width Stacked Stream
            - lg+: Left col-span-5 sticky photo, Right col-span-7 full-width stacked tiles
            - Below lg: Single column, photo on top (~420px), content stacked
           ------------------------------------------------------------------- */}
        <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ===============================================================
              LEFT COLUMN: 3D Cursor-Tilt Sticky Photo Card (col-span-5)
             =============================================================== */}
          <div className="z-20 lg:col-span-5 lg:sticky lg:top-24">
            <Reveal delay={0}>
              <div
                ref={photoCardRef}
                onMouseMove={handlePhotoMouseMove}
                onMouseLeave={handlePhotoMouseLeave}
                style={{ perspective: 1000 }}
                className="w-full"
              >
                <motion.div
                  style={{
                    rotateX: reducedMotion || isTouch ? 0 : rotateX,
                    rotateY: reducedMotion || isTouch ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  className="rounded-3xl bg-[#111115]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 transition-colors shadow-2xl relative overflow-hidden group h-[420px] sm:h-[460px] lg:h-[580px] flex flex-col justify-end"
                >
                  

                  {/* Photo with subtle hover scale */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    {!imageError ? (
                      <motion.img
                        src="/profile_pic.png"
                        alt="Pratik Pathak"
                        onError={() => setImageError(true)}
                        whileHover={
                          reducedMotion || isTouch
                            ? {}
                            : {
                                scale: 1.03,
                                transition: { duration: 0.6, ease: EASE },
                              }
                        }
                        className="w-full h-full object-cover object-[center_12%]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-slate-900">
                        <span className="font-mono text-4xl font-extrabold text-amber-500">
                          PP
                        </span>
                      </div>
                    )}

                    {/* Preserved profile-gradient class for dark fade & light-mode override */}
                    <div className="profile-gradient absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#111115] via-[#111115]/90 to-transparent pointer-events-none" />

                    {/* Dynamic Moving Glare Overlay on cursor tilt */}
                    {!reducedMotion && !isTouch && (
                      <div
                        className="absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none"
                        style={{
                          opacity: glarePos.opacity,
                          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`,
                        }}
                      />
                    )}
                  </div>

                  {/* Identification Text Overlay */}
                  <div className="relative z-20 flex flex-col px-6 pt-4 pb-7">
                    <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl drop-shadow-md">
                      Pratik Pathak
                    </h3>
                    <p className="mt-1 text-sm font-medium sm:text-base text-amber-400 drop-shadow-sm">
                      Software Developer · Full-Stack · AI
                    </p>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* ===============================================================
              RIGHT COLUMN: Full-Width Stacked Content Stream (col-span-7)
              - No cramped left/right 2-column splitting
              - Every tile takes 100% of the right column width
             =============================================================== */}
          <div className="lg:col-span-7">
            <ScrollStack
              topOffset={95}
              itemStackDistance={24}
              scaleStep={0.035}
              blurStep={1.5}
              dimStep={0.12}
              itemGap="mb-12 sm:mb-16"
            >
              {/* 1. Hero Statement & Bio Card (Full Width) */}
              <BentoTile className="w-full">
              <div ref={statementRef}>
                <h3 className="text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {statementWords.map((word, i) => (
                    <StatementWord
                      key={i}
                      word={word}
                      index={i}
                      total={statementWords.length}
                      scrollProgress={statementScroll}
                      reducedMotion={reducedMotion}
                    />
                  ))}
                </h3>
                <p className="mt-4 text-base font-normal leading-relaxed text-slate-400">
                  From{" "}
                  <strong className="font-semibold text-slate-200">
                    HAQ-DWAAR AI
                  </strong>
                  , a platform that helps rural citizens in Madhya Pradesh
                  discover government schemes, to MERN and multi-agent AI
                  applications, I focus on software that solves concrete
                  problems. I enjoy full-stack and backend work, and I&apos;m
                  exploring AI-powered applications.
                </p>
              </div>
            </BentoTile>

            {/* 2. Work Experience Card (Full Width — Merged with all details) */}
            <BentoTile id="experience" className="w-full">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 text-green-400 border rounded-lg bg-green-500/10 border-green-500/25">
                      <Briefcase size={17} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        Work Experience
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
                        Engineering internships &amp; technical leadership
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                    2 Roles
                  </span>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredExpIdx(idx)}
                      onMouseLeave={() => setHoveredExpIdx(null)}
                      className={`p-5 rounded-2xl transition-all duration-300 relative border ${
                        hoveredExpIdx === idx
                          ? "bg-green-500/[0.04] border-green-500/30 border-l-4 border-l-purple-400 shadow-[inset_4px_0_16px_rgba(255,255,255,0.08)]"
                          : hoveredExpIdx !== null
                          ? "opacity-60 bg-white/[0.02] border-white/[0.05] border-l-4 border-l-transparent"
                          : "opacity-100 bg-white/[0.02] border-white/[0.06] border-l-4 border-l-transparent hover:border-white/[0.12]"
                      }`}
                    >
                      {/* Role Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                        <div>
                          <h4 className="text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                            {exp.role}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-medium sm:text-sm text-slate-300">
                            <span className="font-semibold tracking-tight text-pink-400">
                              {exp.company}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="inline-flex items-center gap-1 font-normal text-slate-400">
                              <MapPin size={12} />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center self-start gap-2 sm:self-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-300/10 text-green-400 border border-green-500/20 text-xs font-mono font-semibold">
                            <Calendar size={12} />
                            <span>{exp.duration}</span>
                          </span>
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-300">
                        {exp.highlights.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2.5 leading-relaxed font-normal"
                          >
                            <CheckCircle2
                              size={15}
                              className="text-emerald-400 flex-shrink-0 mt-0.5"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tactile Skills Chips with Magnetic Scale */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {exp.skills.map((skill, sIdx) => (
                          <motion.span
                            key={sIdx}
                            whileHover={
                              reducedMotion ? {} : { scale: 1.08, y: -2 }
                            }
                            whileTap={reducedMotion ? {} : { scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                            }}
                            className="inline-block px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:border-amber-400/60 hover:bg-amber-500/10 hover:text-amber-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-colors cursor-pointer select-none"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoTile>

            {/* 3. Academic Journey Card (Full Width Timeline) */}
            <BentoTile className="w-full">
              <div ref={timelineRef}>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 text-orange-400 border rounded-lg bg-orange-500/10 border-orange-500/25">
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        Academic Journey
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
                        Education history &amp; degree credentials
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-white/[0.06] text-slate-200 border border-white/10">
                    B.Tech (2023–2027)
                  </span>
                </div>

                {/* Stepper with Scroll-Drawn Connector & Travelling Laser Bead */}
                <div className="relative pl-2">
                  <div className="w-[1.5px] bg-white/[0.08] absolute left-[19px] top-4 bottom-5" />

                  {/* Progress Drawn Line */}
                  <motion.div
                    style={{
                      scaleY: reducedMotion ? 1 : connectorScale,
                      transformOrigin: "top",
                    }}
                    className="edu-connector w-[1.5px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 absolute left-[19px] top-4 bottom-5"
                  />

                  {/* Travelling Laser Bead */}
                  {!reducedMotion && (
                    <motion.div
                      style={{
                        top: laserTop,
                        opacity: laserOpacity,
                      }}
                      className="absolute left-[19px] -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_14px_#ffffff,0_0_24px_#cbd5e1] border-2 border-slate-200 z-20 pointer-events-none"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-0 bg-white rounded-full animate-ping opacity-60" />
                    </motion.div>
                  )}

                  <div className="space-y-6">
                    {educationList.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: reducedMotion ? 0 : -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: idx * 0.1,
                          ease: EASE,
                        }}
                        className="relative flex items-start gap-4 group/item"
                      >
                        {/* Left Node */}
                        <div className="w-8 h-8 rounded-full border border-orange-500/40 bg-orange-500/15 text-orange-400 flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.2)] group-hover/item:border-orange-400 group-hover/item:shadow-[0_0_16px_rgba(255,255,255,0.4)] group-hover/item:scale-110 transition-all duration-300 z-10 flex-shrink-0 mt-0.5">
                          {item.icon}
                        </div>

                        {/* Details */}
                        <div className="flex-grow text-left">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                              {item.year}
                            </span>
                            {item.cgpa && (
                              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-white/[0.06] text-slate-200 border border-white/10">
                                {item.cgpa}
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5 leading-normal">
                            {item.institution}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </BentoTile>

            {/* 4. Core Engineering Focus Card (Full Width) */}
            <BentoTile className="w-full">
              <div>
                <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-white/[0.08]">
                  <div className="flex items-center justify-center w-8 h-8 border rounded-lg bg-amber-500/10 border-amber-500/25 text-amber-400">
                    <Layers size={17} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      Core Engineering Focus
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
                      Specializations, architectures, and technical domains
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <motion.div
                    whileHover={
                      reducedMotion
                        ? {}
                        : { y: -6, transition: { duration: 0.3, ease: EASE } }
                    }
                    className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-400/50 hover:shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 relative group/focus overflow-hidden"
                  >
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 group-hover/focus:opacity-100 transition-opacity duration-300" />
                   
                    <h4 className="text-base font-semibold tracking-tight text-white">
                      MERN Architecture
                    </h4>
                    <p className="mt-1 text-xs font-normal leading-relaxed transition-colors sm:text-sm text-slate-400 group-hover/focus:text-slate-300">
                      React, Node.js, Express, MongoDB with TypeScript and responsive interfaces.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={
                      reducedMotion
                        ? {}
                        : { y: -6, transition: { duration: 0.3, ease: EASE } }
                    }
                    className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-400/50 hover:shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 relative group/focus overflow-hidden"
                  >
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 group-hover/focus:opacity-100 transition-opacity duration-300" />
                   
                    <h4 className="text-base font-semibold tracking-tight text-white">
                      Scalable Services
                    </h4>
                    <p className="mt-1 text-xs font-normal leading-relaxed transition-colors sm:text-sm text-slate-400 group-hover/focus:text-slate-300">
                      RESTful API design, schema modeling, clean error handling, and cloud pipelines.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={
                      reducedMotion
                        ? {}
                        : { y: -6, transition: { duration: 0.3, ease: EASE } }
                    }
                    className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-400/50 hover:shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 relative group/focus overflow-hidden"
                  >
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 group-hover/focus:opacity-100 transition-opacity duration-300" />
                    
                    <h4 className="text-base font-semibold tracking-tight text-white">
                      LLM Integration
                    </h4>
                    <p className="mt-1 text-xs font-normal leading-relaxed transition-colors sm:text-sm text-slate-400 group-hover/focus:text-slate-300">
                      Google Gemini API, multi-agent workflows, and intelligent user assistance.
                    </p>
                  </motion.div>
                </div>
              </div>
            </BentoTile>

            {/* 5. Stats Strip (Full Width) */}
            <BentoTile className="w-full">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {stats.map((s, idx) => (
                  <AnimatedCounter
                    key={idx}
                    value={s.value}
                    label={s.label}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </BentoTile>
          </ScrollStack>
        </div>
        </div>
      </div>
    </div>
  );
};

export default About;
