import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Code2, Server, Database, Settings, Cpu } from "lucide-react";

// CUSTOM HIGH-QUALITY DEVELOPER SVG ICONS
const ReactIcon = ({ size = 16, className }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const JsIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0V0zm22.034 18.268c-.156-.843-.728-1.502-1.745-1.905-.626-.26-1.12-.416-1.716-.626-.507-.183-.755-.377-.755-.729 0-.365.313-.61.886-.61.547 0 .926.222 1.25.612l1.628-1.041c-.586-.926-1.42-1.394-2.825-1.394-1.928 0-3.218 1.12-3.218 2.76 0 1.704 1.094 2.37 2.657 2.92.703.247 1.34.48 1.758.74.455.285.663.585.663.974 0 .495-.417.82-1.133.82-.924 0-1.407-.468-1.81-1.107l-1.693 1.053c.69 1.182 1.732 1.833 3.49 1.833 2.188 0 3.518-1.105 3.518-2.928zm-11.666-.35c-.17-.585-.625-.975-1.314-.975-.715 0-1.157.442-1.157 1.365 0 1.027.403 1.43 1.144 1.43.61 0 1.04-.286 1.274-.832l1.742 1.014c-.663 1.196-1.833 1.638-3.094 1.638-2.82 0-4.043-1.69-4.043-3.835 0-2.457 1.456-3.86 4.108-3.86 1.547 0 2.665.65 3.146 1.86l-1.807 1.19z" fill="#f7df1e"/>
  </svg>
);

const TsIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0V0zm22.034 18.268c-.156-.843-.728-1.502-1.745-1.905-.626-.26-1.12-.416-1.716-.626-.507-.183-.755-.377-.755-.729 0-.365.313-.61.886-.61.547 0 .926.222 1.25.612l1.628-1.041c-.586-.926-1.42-1.394-2.825-1.394-1.928 0-3.218 1.12-3.218 2.76 0 1.704 1.094 2.37 2.657 2.92.703.247 1.34.48 1.758.74.455.285.663.585.663.974 0 .495-.417.82-1.133.82-.924 0-1.407-.468-1.81-1.107l-1.693 1.053c.69 1.182 1.732 1.833 3.49 1.833 2.188 0 3.518-1.105 3.518-2.928zM10.96 11.23h1.86v7.71h-1.86v-7.71zm-2.88 0h7.62v1.54H9.94v6.17H8.08v-7.71z" fill="#3178c6"/>
  </svg>
);

const NextIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 180 180" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="nextMask" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#nextMask)">
      <circle cx="90" cy="90" r="90" fill="black" />
      <path d="M149.508 157.52L69.142 54H54V126H67.97V72.281L138.837 163.662C142.593 161.802 146.166 159.743 149.508 157.52Z" fill="url(#nextGrad)" />
      <rect x="115" y="54" width="14" height="72" fill="url(#nextGrad2)" />
    </g>
    <defs>
      <linearGradient id="nextGrad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="nextGrad2" x1="122" y1="54" x2="122" y2="122" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const TailwindIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38bdf8"/>
  </svg>
);

const NodeIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4.5 6.3v8.7L12 19.3l7.5-4.3V6.3L12 2zm6 12.1l-6 3.4-6-3.4V7.2l6-3.4 6 3.4v6.9z" fill="#6cc24a" stroke="#6cc24a" strokeWidth="1" />
    <path d="M12 5.5l5 2.9v5.8l-5 2.9-5-2.9v-5.8l5-2.9z" fill="#6cc24a" opacity="0.35" />
  </svg>
);

const MongoIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C11.5 2 7 6.5 7 11.5c0 4 2.5 6.5 5 8.5 2.5-2 5-4.5 5-8.5C17 6.5 12.5 2 12 2zm0 17c-1.5-1.2-3.5-3.2-3.5-6.5C8.5 9 11.2 5.2 12 4.2c.8 1 3.5 4.8 3.5 8.3 0 3.3-2 5.3-3.5 6.5z" fill="#47a248" />
    <path d="M12 22v-3.5M12 2v2.2" stroke="#47a248" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GitIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.2 11.8l9.6-9.6c.4-.4 1.1-.4 1.5 0l8.5 8.5c.4.4.4 1.1 0 1.5L12.2 21.8c-.4.4-1.1.4-1.5 0L2.2 13.3c-.4-.4-.4-1.1 0-1.5z" stroke="#f05032" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill="#f05032" />
    <circle cx="8" cy="12" r="2" fill="#f05032" />
    <circle cx="12" cy="8" r="2" fill="#f05032" />
    <path d="M12 10v4M8 12h4" stroke="#f05032" strokeWidth="1.5" />
  </svg>
);

// Map of Custom SVG icons
const TechIcons = {
  react: <ReactIcon size={14} />,
  js: <JsIcon size={14} />,
  ts: <TsIcon size={14} />,
  next: <NextIcon size={14} className="bg-black rounded-full" />,
  tailwind: <TailwindIcon size={14} />,
  node: <NodeIcon size={14} />,
  mongodb: <MongoIcon size={14} />,
  git: <GitIcon size={14} />,
  css: <Cpu size={14} className="text-amber-500" />,
  express: <Server size={14} className="text-emerald-500" />,
  sql: <Database size={14} className="text-purple-500" />,
  docker: <Settings size={14} className="text-blue-500" />,
  postman: <Settings size={14} className="text-orange-500" />,
  vite: <Settings size={14} className="text-yellow-500" />,
  npm: <Settings size={14} className="text-red-500" />,
  html: <Code2 size={14} className="text-cyan-500" />,
};

const Skills = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/skills";

  // Load interactive display and body fonts dynamically on mount
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Space+Grotesk:wght@500;700&family=Outfit:wght@300;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Skill categories with tailored neon color definitions
  const skillCategories = [
    {
      title: "Frontend Essentials",
      icon: <Code2 size={20} />,
      color: "cyan",
      textClass: "text-cyan-400",
      borderClass: "group-hover:border-cyan-500/30",
      shadowGlow: "group-hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.22)]",
      barGradient: "from-cyan-500 to-blue-500",
      skills: [
        { name: "React", iconKey: "react" },
        { name: "JavaScript", iconKey: "js" },
      ],
    },
    {
      title: "Styling & Layouts",
      icon: <Cpu size={20} />,
      color: "amber",
      textClass: "text-amber-400",
      borderClass: "group-hover:border-amber-500/30",
      shadowGlow: "group-hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.22)]",
      barGradient: "from-amber-500 to-orange-500",
      skills: [
        { name: "Tailwind CSS", iconKey: "tailwind" },
        { name: "Vanilla CSS", iconKey: "css" },
        { name: "Responsive Layouts", iconKey: "html" },
        { name: "HTML5 Semantics", iconKey: "html" },
      ],
    },
    {
      title: "Backend Systems",
      icon: <Server size={20} />,
      color: "emerald",
      textClass: "text-emerald-400",
      borderClass: "group-hover:border-emerald-500/30",
      shadowGlow: "group-hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.22)]",
      barGradient: "from-emerald-500 to-teal-500",
      skills: [
        { name: "Node.js", iconKey: "node" },
        { name: "Express.js", iconKey: "express" },
        { name: "REST APIs", iconKey: "node" },
        { name: "JWT Auth", iconKey: "express" },
      ],
    },
    {
      title: "Database Engineering",
      icon: <Database size={20} />,
      color: "purple",
      textClass: "text-purple-400",
      borderClass: "group-hover:border-purple-500/30",
      shadowGlow: "group-hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.22)]",
      barGradient: "from-purple-500 to-indigo-500",
      skills: [
        { name: "MongoDB", iconKey: "mongodb" },
        { name: "SQL Queries", iconKey: "sql" },
        { name: "Mongoose ODM", iconKey: "mongodb" },
      ],
    },
    {
      title: "Development Tools",
      icon: <Settings size={20} />,
      color: "rose",
      textClass: "text-rose-400",
      borderClass: "group-hover:border-rose-500/30",
      shadowGlow: "group-hover:shadow-[0_15px_30px_-10px_rgba(244,63,94,0.22)]",
      barGradient: "from-rose-500 to-red-500",
      skills: [
        { name: "Git & GitHub", iconKey: "git" },
        { name: "Vite Bundler", iconKey: "vite" },
        { name: "Postman testing", iconKey: "postman" },
        { name: "NPM scripts", iconKey: "npm" },
      ],
    },
  ];

  // Top Row Pinned Sticky Notes (Upside)
  const upsideSkills = [
    { name: "React", iconKey: "react", rot: "-4deg", anim: "floating-up-1" },
    { name: "Next.js", iconKey: "next", rot: "3deg", anim: "floating-up-2" },
    { name: "TypeScript", iconKey: "ts", rot: "-2deg", anim: "floating-up-1" },
    { name: "JavaScript", iconKey: "js", rot: "4deg", anim: "floating-up-2" },
    { name: "Tailwind", iconKey: "tailwind", rot: "-3deg", anim: "floating-up-1" },
  ];

  // Bottom Row Pinned Sticky Notes (Downside)
  const downsideSkills = [
    { name: "Node.js", iconKey: "node", rot: "4deg", anim: "floating-down-1" },
    { name: "Express.js", iconKey: "express", rot: "-3deg", anim: "floating-down-2" },
    { name: "MongoDB", iconKey: "mongodb", rot: "3deg", anim: "floating-down-1" },
    { name: "PostgreSQL", iconKey: "sql", rot: "-2deg", anim: "floating-down-2" },
    { name: "Docker", iconKey: "docker", rot: "4deg", anim: "floating-down-1" },
    { name: "Git & GitHub", iconKey: "git", rot: "-4deg", anim: "floating-down-2" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden py-20 px-4">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Header */}
      <div className="relative z-10 mb-14 text-center">
        <span className="text-[10px] font-bold tracking-[0.35em] text-amber-500 uppercase block mb-3">Skills Board</span>
        <h1 className="mb-3 text-4xl font-extrabold text-white md:text-6xl">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Skills</span>
          {!isStandalone && (
            <Link to="/skills" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
              [Full View ↗]
            </Link>
          )}
        </h1>
        <p className="max-w-xl mx-auto text-xs font-light text-slate-400 md:text-sm font-body">
          Interactive developer workspace. Pinned notes float around the main category cards.
        </p>
      </div>

      {/* Stacked Workspace Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-14 items-center">
        
        {/* ROW 1: Upside Pinned Sticky Notes */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 w-full px-4">
          {upsideSkills.map((skill, idx) => (
            <div
              key={idx}
              style={{ "--rot": skill.rot }}
              className={`w-24 h-24 p-2 flex flex-col justify-between hover:scale-110 hover:rotate-0 hover:shadow-[0_10px_20px_rgba(245,158,11,0.12)] transition-all duration-300 relative group cursor-pointer sticky-note ${skill.anim}`}
            >
              {/* Push Pin */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rose-500 shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform" />
              <div className="mt-2 text-center flex justify-center items-center h-10">{TechIcons[skill.iconKey]}</div>
              <div className="text-center mb-1">
                <h4 className="text-[11px] font-bold tracking-wider uppercase font-display card-title">{skill.name}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: Vertical Skill Category Cards (In-Between) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full px-4 my-2">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 backdrop-blur-sm flex flex-col justify-start border skills-card transition-all duration-300 hover:-translate-y-1.5 ${category.borderClass} ${category.shadowGlow} group shadow-lg gap-4`}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 w-full pb-3 border-b border-white/[0.04]">
                {/* Glowing Icon Frame */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-slate-950/80 border border-white/[0.08] relative overflow-hidden transition-all duration-300 shadow-inner ${category.textClass}`}>
                  <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none" />
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {category.icon}
                  </span>
                </div>
                <h3 className="text-xs font-bold tracking-tight text-white card-title font-display">{category.title}</h3>
              </div>

              {/* Skills List (Stacked Vertically) */}
              <div className="flex flex-col gap-2.5 w-full font-body">
                {category.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/[0.04] bg-slate-950/40 text-slate-350 hover:text-amber-500 hover:border-amber-500/20 transition-all duration-300 group/skill cursor-default w-full"
                  >
                    <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/skill:scale-110">
                      {TechIcons[skill.iconKey]}
                    </span>
                    <span className="text-[11px] font-medium tracking-wide">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ROW 3: Downside Pinned Sticky Notes */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 w-full px-4">
          {downsideSkills.map((skill, idx) => (
            <div
              key={idx}
              style={{ "--rot": skill.rot }}
              className={`w-24 h-24 p-2 flex flex-col justify-between hover:scale-110 hover:rotate-0 hover:shadow-[0_10px_20px_rgba(245,158,11,0.12)] transition-all duration-300 relative group cursor-pointer sticky-note ${skill.anim}`}
            >
              {/* Push Pin */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform" />
              <div className="mt-2 text-center flex justify-center items-center h-10">{TechIcons[skill.iconKey]}</div>
              <div className="text-center mb-1">
                <h4 className="text-[10px] font-bold tracking-wider uppercase font-display card-title">{skill.name}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Styling Overrides */}
      <style>{`
        :root {
          --card-bg: linear-gradient(135deg, rgba(16, 15, 14, 0.8) 0%, rgba(10, 10, 11, 0.95) 100%);
          --card-border: rgba(255, 255, 255, 0.04);
          --card-title: #ffffff;
          --card-text: #94a3b8;
          --card-subtle: #4b5563;
          --note-bg: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.02) 100%);
          --note-border: rgba(245, 158, 11, 0.2);
        }

        html.light {
          --card-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 1) 100%);
          --card-border: rgba(15, 23, 42, 0.06);
          --card-title: #0f172a;
          --card-text: #475569;
          --card-subtle: #94a3b8;
          --note-bg: linear-gradient(135deg, #fefce8 0%, #fef08a 100%);
          --note-border: #fde047;
        }

        /* Set imported fonts */
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.015em;
        }
        
        .font-body {
          font-family: 'Outfit', sans-serif;
        }

        .skills-card {
          background: var(--card-bg) !important;
          border-color: var(--card-border) !important;
          color: var(--card-text) !important;
          box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.6) !important;
        }

        .sticky-note {
          background: var(--note-bg) !important;
          border: 1px solid var(--note-border) !important;
          border-radius: 12px;
          box-shadow: 2px 5px 12px rgba(0, 0, 0, 0.15) !important;
          font-family: 'Caveat', cursive;
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

        /* Floating keyframes for Top row notes (rise and fall) */
        @keyframes floatUpSlow {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50% { transform: translateY(-8px) rotate(var(--rot)); }
        }
        @keyframes floatUpMedium {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50% { transform: translateY(-12px) rotate(var(--rot)); }
        }

        /* Floating keyframes for Bottom row notes (fall and rise) */
        @keyframes floatDownSlow {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50% { transform: translateY(8px) rotate(var(--rot)); }
        }
        @keyframes floatDownMedium {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50% { transform: translateY(12px) rotate(var(--rot)); }
        }

        .floating-up-1 {
          animation: floatUpSlow 6s ease-in-out infinite;
        }
        .floating-up-2 {
          animation: floatUpMedium 7s ease-in-out infinite;
        }

        .floating-down-1 {
          animation: floatDownSlow 6.5s ease-in-out infinite;
        }
        .floating-down-2 {
          animation: floatDownMedium 7.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Skills;
