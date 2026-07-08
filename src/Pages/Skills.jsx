import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Code2, Server, Database, Settings, Shield, Cpu, ChevronLeft, ChevronRight, Pin } from "lucide-react";

const PencilGraphic = () => (
  <svg width="24" height="120" viewBox="0 0 30 150" fill="none" className="transition-opacity duration-300 opacity-40 hover:opacity-90">
    <path d="M15 150 L10 135 L20 135 Z" fill="#64748b" />
    <path d="M10 135 L20 135 L22 120 L8 120 Z" fill="#d97706" opacity="0.6" />
    <rect x="8" y="25" width="14" height="95" fill="#f59e0b" rx="2" opacity="0.8" />
    <rect x="8" y="12" width="14" height="13" fill="#94a3b8" />
    <path d="M8 12 L22 12 C22 5, 8 5, 8 12 Z" fill="#fda4af" />
  </svg>
);

const PenGraphic = () => (
  <svg width="24" height="120" viewBox="0 0 30 150" fill="none" className="transition-opacity duration-300 opacity-40 hover:opacity-90">
    <rect x="9" y="30" width="12" height="95" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
    <rect x="18" y="45" width="2.5" height="35" rx="1" fill="#f59e0b" />
    <rect x="9" y="75" width="12" height="4" fill="#f59e0b" />
    <path d="M15 150 L9 130 L12 120 L18 120 L21 130 Z" fill="#f59e0b" />
    <line x1="15" y1="120" x2="15" y2="142" stroke="#0f172a" strokeWidth="1" />
  </svg>
);

const Skills = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/skills";

  const carouselRef = useRef(null);
  const autoTweenRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const skillCategories = [
    {
      title: "Frontend Essentials",
      icon: <Code2 className="text-amber-500" size={24} />,
      skills: [
        { name: "React", level: "90%", icon: "⚛️" },
        // { name: "Next.js", level: "85%", icon: "▲" },
        // { name: "TypeScript", level: "80%", icon: "🔷" },
        { name: "JavaScript", level: "90%", icon: "🟨" },
      ],
    },
    {
      title: "Styling & Layouts",
      icon: <Cpu className="text-amber-500" size={24} />,
      skills: [
        { name: "Tailwind CSS", level: "95%", icon: "🌊" },
        { name: "Vanilla CSS", level: "90%", icon: "🎨" },
        { name: "Responsive Layouts", level: "95%", icon: "📱" },
        { name: "HTML5 Semantics", level: "90%", icon: "🌐" },
      ],
    },
    {
      title: "Backend Systems",
      icon: <Server className="text-amber-500" size={24} />,
      skills: [
        { name: "Node.js", level: "85%", icon: "🟢" },
        { name: "Express.js", level: "80%", icon: "🚂" },
        { name: "REST APIs", level: "90%", icon: "🔗" },
        { name: "JWT Auth", level: "85%", icon: "🔑" },
      ],
    },
    {
      title: "Database Engineering",
      icon: <Database className="text-amber-500" size={24} />,
      skills: [
        { name: "MongoDB", level: "80%", icon: "🍃" },
        // { name: "PostgreSQL", level: "75%", icon: "🐘" },
        { name: "SQL Queries", level: "80%", icon: "📊" },
        { name: "Mongoose ODM", level: "85%", icon: "📁" },
      ],
    },
    // {
    //   title: "DevOps & Automation",
    //   icon: <Shield className="text-amber-500" size={24} />,
    //   skills: [
    //     { name: "Docker Containers", level: "70%", icon: "🐳" },
    //     { name: "GitHub Actions", level: "80%", icon: "⚙️" },
    //     { name: "CI/CD Pipelines", level: "75%", icon: "🔄" },
    //     { name: "Cloud Deploy", level: "70%", icon: "☁️" },
    //   ],
    // },
    {
      title: "Development Tools",
      icon: <Settings className="text-amber-500" size={24} />,
      skills: [
        { name: "Git & GitHub", level: "88%", icon: "🐙" },
        { name: "Vite Bundler", level: "90%", icon: "⚡" },
        { name: "Postman testing", level: "85%", icon: "🚀" },
        { name: "NPM scripts", level: "90%", icon: "📦" },
      ],
    },
  ];

  // Desktop Left Column Pinned Sticky Notes
  const leftSkills = [
    { name: "React", level: "90%", icon: "⚛️", rot: "-6deg", anim: "floating-item-1" },
    { name: "Next.js", level: "85%", icon: "▲", rot: "4deg", anim: "floating-item-2" },
    { name: "TypeScript", level: "80%", icon: "🔷", rot: "-3deg", anim: "floating-item-1" },
    { name: "JavaScript", level: "90%", icon: "🟨", rot: "5deg", anim: "floating-item-2" },
    { name: "Tailwind", level: "95%", icon: "🌊", rot: "-5deg", anim: "floating-item-1" },
  ];

  // Desktop Right Column Pinned Sticky Notes
  const rightSkills = [
    { name: "Node.js", level: "85%", icon: "🟢", rot: "6deg", anim: "floating-item-2" },
    { name: "Express", level: "80%", icon: "🚂", rot: "-4deg", anim: "floating-item-1" },
    { name: "MongoDB", level: "80%", icon: "🍃", rot: "5deg", anim: "floating-item-2" },
    { name: "PostgreSQL", level: "75%", icon: "🐘", rot: "-3deg", anim: "floating-item-1" },
    { name: "Docker", level: "70%", icon: "🐳", rot: "4deg", anim: "floating-item-2" },
    { name: "Git & GitHub", level: "88%", icon: "🐙", rot: "-5deg", anim: "floating-item-1" },
  ];

  // Combined List for Mobile Grid Fallback
  const allSkillsList = [...leftSkills, ...rightSkills];

  const startAutoRotation = () => {
    if (autoTweenRef.current) autoTweenRef.current.kill();

    // Rotate the carousel very slowly continuously (360 degrees in 45 seconds)
    autoTweenRef.current = gsap.to(carouselRef.current, {
      rotateY: "-=360",
      duration: 45,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        const currentAngle = gsap.getProperty(carouselRef.current, "rotateY");
        const normalized = ((currentAngle % 360) + 360) % 360;
        const idx = Math.round((360 - normalized) / 60) % 6;
        setActiveIndex(idx);
      }
    });
  };

  useEffect(() => {
    startAutoRotation();

    return () => {
      if (autoTweenRef.current) autoTweenRef.current.kill();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handlePrev = (e) => {
    e.stopPropagation();
    if (autoTweenRef.current) autoTweenRef.current.kill();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    const currentAngle = gsap.getProperty(carouselRef.current, "rotateY");
    const targetAngle = Math.round(currentAngle / 60) * 60 + 60;

    gsap.to(carouselRef.current, {
      rotateY: targetAngle,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        const normalized = ((targetAngle % 360) + 360) % 360;
        const idx = Math.round((360 - normalized) / 60) % 6;
        setActiveIndex(idx);
      },
      onComplete: () => {
        resumeTimerRef.current = setTimeout(() => {
          startAutoRotation();
        }, 3000);
      }
    });
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (autoTweenRef.current) autoTweenRef.current.kill();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    const currentAngle = gsap.getProperty(carouselRef.current, "rotateY");
    const targetAngle = Math.round(currentAngle / 60) * 60 - 60;

    gsap.to(carouselRef.current, {
      rotateY: targetAngle,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        const normalized = ((targetAngle % 360) + 360) % 360;
        const idx = Math.round((360 - normalized) / 60) % 6;
        setActiveIndex(idx);
      },
      onComplete: () => {
        resumeTimerRef.current = setTimeout(() => {
          startAutoRotation();
        }, 3000);
      }
    });
  };

  const radius = 260; // Distance of cards from center of cylinder (in pixels)

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-24">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* DESKTOP SPATIAL WORKSPACE - LEFT SIDEBAR ITEMS */}
      <div className="absolute z-10 flex-col items-center hidden gap-8 lg:flex left-8 xl:left-20 top-24 w-28">
        <div className="mb-4 floating-pencil">
          <PencilGraphic />
        </div>
        {leftSkills.map((skill, idx) => (
          <div
            key={idx}
            style={{ "--rot": skill.rot }}
            className={`w-24 h-24 p-2 flex flex-col justify-between hover:scale-110 hover:rotate-0 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-all duration-300 relative group cursor-pointer sticky-note ${skill.anim}`}
          >
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_5px_#f59e0b] group-hover:scale-125 transition-transform" />
            <div className="mt-2 text-lg text-center">{skill.icon}</div>
            <div className="text-center mb-0.5">
              <h4 className="text-[9px] font-mono font-bold tracking-wider uppercase card-title">{skill.name}</h4>
              <span className="text-[8px] font-bold font-mono text-amber-500">{skill.level}</span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-6 mx-auto">
        
        {/* Header Block */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-extrabold text-white md:text-6xl">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Skills</span>
            {!isStandalone && (
              <Link to="/skills" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
          <p className="max-w-xl mx-auto text-xs font-light text-gray-405 md:text-sm">
            Watch the 3D cylinder spin slowly, or use the side arrow controls to manually rotate and explore categories.
          </p>
        </div>

        {/* 3D Skills Carousel Scene Container */}
        <div 
          className="relative w-full max-w-md h-[400px] flex items-center justify-center"
          style={{ perspective: "1500px" }}
        >
          {/* Left Sidebar Manual Control */}
          <button
            onClick={handlePrev}
            className="absolute left-[-40px] md:left-[-100px] p-3 rounded-full bg-gray-950/80 border border-gray-800 text-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.05)] z-20 cursor-pointer"
            aria-label="Previous Category"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Rotating Carousel Container */}
          <div
            ref={carouselRef}
            className="relative flex items-center justify-center w-full h-full transition-all duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            {skillCategories.map((category, idx) => {
              const cardAngle = idx * 60; // 360 / 6 = 60 degrees per card
              
              // Shortest distance to active card in the circle
              const diff = Math.abs(idx - activeIndex);
              const dist = Math.min(diff, 6 - diff);
              
              const isActive = dist === 0;
              const isPeeking = dist === 1;
              const isHidden = dist >= 2;

              return (
                <div
                  key={idx}
                  className="absolute w-full h-full max-w-[320px] rounded-3xl p-6 backdrop-blur-sm flex flex-col justify-between transition-all duration-750 select-none border skills-card"
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    opacity: isHidden ? 0 : isPeeking ? 0.35 : 1,
                    filter: isHidden ? "blur(6px)" : isPeeking ? "blur(2.5px)" : "blur(0px)",
                    scale: isHidden ? "0.8" : isPeeking ? "0.9" : "1.0",
                    pointerEvents: isActive ? "auto" : "none",
                    boxShadow: isActive ? "0 0 50px rgba(245,158,11,0.08)" : "none",
                  }}
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center pb-4 mb-6 space-x-3 border-b border-gray-800/40">
                      {category.icon}
                      <h3 className="text-xl font-bold card-title">{category.title}</h3>
                    </div>

                    {/* Skill items */}
                    <div className="space-y-4">
                      {category.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-2">
                          <div className="flex items-center justify-between font-mono text-xs font-medium md:text-sm">
                            <span className="flex items-center gap-2 card-text">
                              <span>{skill.icon}</span> {skill.name}
                            </span>
                            <span className="font-bold text-amber-500">{skill.level}</span>
                          </div>
                          
                          {/* Skill level progress bar */}
                          <div className="w-full h-1.5 bg-gray-950 border border-gray-900 rounded-full overflow-hidden">
                            <div
                              className="h-full transition-all rounded-full bg-gradient-to-r from-amber-500 to-orange-600 duration-750"
                              style={{ width: isActive ? skill.level : "0%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between text-[10px] font-mono pt-4 border-t border-gray-800/40 card-subtle">
                    <span>Index: {idx + 1}/6</span>
                    <span>Verified Specs</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sidebar Manual Control */}
          <button
            onClick={handleNext}
            className="absolute right-[-40px] md:right-[-100px] p-3 rounded-full bg-gray-950/80 border border-gray-800 text-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.05)] z-20 cursor-pointer"
            aria-label="Next Category"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* MOBILE GRID FALLBACK - Shows only on small viewports */}
        <div className="relative z-10 w-full pt-12 mt-16 border-t lg:hidden border-gray-800/20">
          <h2 className="flex items-center justify-center gap-2 mb-10 text-2xl font-bold text-center text-white">
            <Pin className="rotate-45 text-amber-500" size={22} /> Pinned Skills Board
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 px-4">
            {allSkillsList.map((skill, index) => {
              const rotations = ["-4deg", "3deg", "-2deg", "5deg", "-5deg", "2deg", "-3deg", "4deg"];
              const rotation = rotations[index % rotations.length];

              return (
                <div
                  key={index}
                  style={{ transform: `rotate(${rotation})` }}
                  className="w-24 h-24 p-2.5 flex flex-col justify-between hover:scale-110 hover:rotate-0 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-all duration-300 relative group cursor-pointer sticky-note"
                >
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_5px_#f59e0b] group-hover:scale-125 transition-transform" />
                  <div className="mt-2 text-lg text-center">{skill.icon}</div>
                  <div className="text-center mb-0.5">
                    <h4 className="text-[9px] font-mono font-bold tracking-wider uppercase card-title">{skill.name}</h4>
                    <span className="text-[8px] font-bold font-mono text-amber-500">{skill.level}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* DESKTOP SPATIAL WORKSPACE - RIGHT SIDEBAR ITEMS */}
      <div className="absolute z-10 flex-col items-center hidden gap-8 lg:flex right-8 xl:right-20 top-24 w-28">
        <div className="mb-4 floating-pen">
          <PenGraphic />
        </div>
        {rightSkills.map((skill, idx) => (
          <div
            key={idx}
            style={{ "--rot": skill.rot }}
            className={`w-24 h-24 p-2 flex flex-col justify-between hover:scale-110 hover:rotate-0 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-all duration-300 relative group cursor-pointer sticky-note ${skill.anim}`}
          >
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_5px_#f59e0b] group-hover:scale-125 transition-transform" />
            <div className="mt-2 text-lg text-center">{skill.icon}</div>
            <div className="text-center mb-0.5">
              <h4 className="text-[9px] font-mono font-bold tracking-wider uppercase card-title">{skill.name}</h4>
              <span className="text-[8px] font-bold font-mono text-amber-500">{skill.level}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Light/Dark responsiveness, 3D variables, and float keyframes */}
      <style>{`
        :root {
          --card-bg: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(3, 7, 18, 0.9) 100%);
          --card-border: rgba(245, 158, 11, 0.15);
          --card-title: #ffffff;
          --card-text: #cbd5e1;
          --card-subtle: #9ca3af;
          --note-bg: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.04) 100%);
          --note-border: rgba(245, 158, 11, 0.22);
        }

        html.light {
          --card-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%);
          --card-border: rgba(245, 158, 11, 0.35);
          --card-title: #0f172a;
          --card-text: #334155;
          --card-subtle: #64748b;
          --note-bg: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%);
          --note-border: rgba(245, 158, 11, 0.3);
        }

        .skills-card {
          background: var(--card-bg) !important;
          border-color: var(--card-border) !important;
          color: var(--card-text) !important;
        }

        .sticky-note {
          background: var(--note-bg) !important;
          border: 1px solid var(--note-border) !important;
          border-radius: 12px;
          box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.15);
        }

        .card-title {
          color: var(--card-title) !important;
        }

        .card-text {
          color: var(--card-text) !important;
        }

        .card-subtle {
          color: var(--card-subtle) !important;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50% { transform: translateY(-12px) rotate(var(--rot)); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50% { transform: translateY(-16px) rotate(var(--rot)); }
        }

        .floating-item-1 {
          animation: float-slow 7s ease-in-out infinite;
        }

        .floating-item-2 {
          animation: float-medium 8s ease-in-out infinite;
        }

        .floating-pencil {
          --rot: -22deg;
          animation: float-slow 9s ease-in-out infinite;
        }

        .floating-pen {
          --rot: 32deg;
          animation: float-medium 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Skills;
