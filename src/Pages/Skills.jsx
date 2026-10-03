import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Cpu, 
  Server, 
  Database, 
  Settings, 
  Folder, 
  Trophy, 
  Compass, 
  Rocket, 
  LineChart, 
  Quote,
  Network,
  Cloud,
  CheckCircle2,
  Sparkles,
  Layers,
  Terminal,
  Zap
} from "lucide-react";

// Customized authentic SVG Brand Icons with vibrant styling
const HTMLIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#e34f26">
    <path d="M1.5 22L0 0h24L22.5 22L12 25z M12 18.5l6-1.5 0.5-5.5H8.5l-0.5-4h11.5l0.5-4H4.5l1.5 15z" />
  </svg>
);

const CSSIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#1572b6">
    <path d="M1.5 22L0 0h24L22.5 22L12 25z M12 18.5l6-1.5 0.5-5.5H8.5l-0.5-4h11.5l0.5-4H4.5l1.5 15z" />
  </svg>
);

const JSIcon = () => (
  <div className="w-5 h-5 flex-shrink-0 bg-[#f7df1e] text-black font-extrabold text-[10px] flex items-center justify-center rounded-[3px] font-sans select-none shadow-sm">JS</div>
);

const ReactIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#61dafb" strokeWidth="3" transform="rotate(30, 50, 50)" />
    <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#61dafb" strokeWidth="3" transform="rotate(90, 50, 50)" />
    <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#61dafb" strokeWidth="3" transform="rotate(150, 50, 50)" />
    <circle cx="50" cy="50" r="4" fill="#61dafb" />
  </svg>
);

const NextIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 bg-black rounded-full p-[1.5px] border border-gray-700" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
    <path d="M149.5 157.5L69.1 54H54v72h14v-53.7l70.8 91.4c3.8-1.8 7.4-3.9 10.7-6.2z" fill="white" />
    <rect x="115" y="54" width="14" height="72" fill="white" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#38bdf8">
    <path d="M12 4.8C8.8 4.8 6.8 6.4 6 9.6c1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.7 10.6 15 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 15 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C10.3 13.4 9 12 6 12z" />
  </svg>
);

const NodeIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#339933">
    <path d="M12 2L4.5 6.3v8.7L12 19.3l7.5-4.3V6.3L12 2zm6 12.1l-6 3.4-6-3.4V7.2l6-3.4 6 3.4v6.9z" />
  </svg>
);

const ExpressIcon = () => (
  <div className="w-5 h-5 flex-shrink-0 bg-slate-800 text-amber-400 border border-slate-700 font-bold text-[9px] flex items-center justify-center rounded-[3px] font-mono select-none">ex</div>
);

const RestIcon = () => (
  <span className="text-[12px] font-bold text-amber-400 font-mono leading-none tracking-tight">&#123;api&#125;</span>
);

const JwtIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#fb7185">
    <path d="M12 2L2 22h20z M12 6l7 12H5z" />
  </svg>
);

const MulterIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
  </svg>
);

const MongoIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#47a248">
    <path d="M12 2C11.5 2 7 6.5 7 11.5c0 4 2.5 6.5 5 8.5 2.5-2 5-4.5 5-8.5C17 6.5 12.5 2 12 2z" />
  </svg>
);

const MongooseIcon = () => (
  <span className="w-5 h-5 rounded-[3px] bg-red-950/80 border border-red-800/60 text-[10px] font-extrabold text-red-400 font-mono flex items-center justify-center">M</span>
);

const SqlIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const RedisIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#d82c20">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const GitIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#f05032">
    <path d="M2.2 11.8l9.6-9.6c.4-.4 1.1-.4 1.5 0l8.5 8.5c.4.4.4 1.1 0 1.5L12.2 21.8c-.4.4-1.1.4-1.5 0L2.2 13.3c-.4-.4-.4-1.1 0-1.5z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 fill-current text-white" viewBox="0 0 24 24">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const VsCodeIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#007acc">
    <path d="M23.9 6.5l-2.7-2.7c-.2-.2-.6-.2-.8 0L12 12 3.6 3.8c-.2-.2-.6-.2-.8 0L.1 6.5c-.2.2-.2.6 0 .8L8 14l-7.9 6.7c-.2.2-.2.6 0 .8l2.7 2.7c.2.2.6.2.8 0L12 16l8.4 8.2c.2.2.6.2.8 0l2.7-2.7c.2-.2.2-.6 0-.8L16 14l7.9-6.7c.2-.2.2-.6 0-.8z" />
  </svg>
);

const PostmanIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#ef5b25">
    <path d="M24 11.233c0-4.004-3.238-7.234-7.234-7.234-2.81 0-5.244 1.6-6.446 3.935C9.117 5.6 6.684 4 3.874 4 1.734 4 0 5.734 0 7.874c0 1.258.601 2.373 1.523 3.082-.922.71-1.523 1.825-1.523 3.082C0 16.177 1.734 17.91 3.874 17.91c2.81 0 5.243-1.6 6.446-3.934 1.202 2.334 3.636 3.934 6.446 3.934 4.004 0 7.234-3.237 7.234-7.234 0-.147-.014-.29-.028-.435z" />
  </svg>
);

const FirebaseIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#ffca28">
    <path d="M3.9 19.3L12 2.1l8.1 17.2z" />
  </svg>
);

const PythonIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#3776ab">
    <path d="M12.001 2c-5.5 0-5 2.4-5 2.4l.1 2.5h5v.7H5.2c0 0-3.2.3-3.2 4.8 0 4.1 2.7 4.2 2.7 4.2h1.6v-2.3c0 0-.1-2.8 2.7-2.8h4.9s2.7-.1 2.7-2.7V4.4s.2-2.4-4.8-2.4zm5.2 6.8v2.3c0 0 .1 2.8-2.7 2.8H9.5s-2.7.1-2.7 2.7v4.1s-.2 2.4 4.8 2.4c5.5 0 5-2.4 5-2.4l-.1-2.5h-5v-.7h6.8c0 0 3.2-.3 3.2-4.8 0-4.1-2.7-4.2-2.7-4.2h-1.8z" />
  </svg>
);

const PandasIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
  </svg>
);

const NumpyIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ExcelIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#107c41">
    <path d="M16.2 2H7.8L2 12l5.8 10h8.4l5.8-10z M9.5 16l-1.5-2.5-1.5 2.5H5l2.5-4L5 8h1.5l1.5 2.5L9.5 8H11l-2.5 4l2.5 4z" />
  </svg>
);

const PowerBiIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#f2c811">
    <rect x="4" y="14" width="4" height="8" rx="1" />
    <rect x="10" y="8" width="4" height="14" rx="1" />
    <rect x="16" y="2" width="4" height="20" rx="1" />
  </svg>
);

const DockerIcon = () => (
  <svg className="w-6 h-6 text-sky-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185h-2.119c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zM11.261 11.078h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185h-2.119c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm-2.722 0h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185H8.539c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm-2.722 0h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185H5.816c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm2.722-2.722h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm2.722 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-5.444 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186H5.816c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm8.166 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-5.444-2.722h2.119c.102 0 .186-.083.186-.185V3.33c0-.102-.084-.185-.186-.185H8.539c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185z M23.99 12.528c-.015-.098-.03-.198-.052-.295c-.218-1.127-1.127-1.921-2.196-1.921c-.08 0-.16.006-.239.018c-.89.136-1.637.755-1.932 1.573c-.097.266-.145.548-.145.83v2.898c0 1.83-1.488 3.32-3.32 3.32H6.969c-1.398 0-2.531-1.134-2.531-2.532v-.125c.01-.225.105-.436.27-.585c.162-.147.379-.222.597-.206h12.981c.218-.016.435.059.597.206c.165.149.26.36.27.585v.125c0 2.274 1.848 4.122 4.122 4.122h.001c.224 0 .445-.02.662-.058c1.332-.234 2.37-1.272 2.604-2.604c.038-.217.058-.438.058-.662l-.029-4.819z" />
  </svg>
);

const CloudIcon = () => (
  <svg className="w-6 h-6 text-amber-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
  </svg>
);

const Skills = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/skills";
  const [activeFilter, setActiveFilter] = useState("all");

  const skillCategories = [
    {
      id: "frontend",
      title: "Frontend Engineering",
      subtitle: "UI Architecture & Reactive Design",
      icon: <Cpu size={20} className="text-amber-400" />,
      skills: [
        { name: "React.js", icon: <ReactIcon />, level: "Primary" },
        { name: "JavaScript", icon: <JSIcon />, level: "Primary" },
        { name: "Next.js", icon: <NextIcon />, level: "Working" },
        { name: "Tailwind CSS", icon: <TailwindIcon />, level: "Primary" },
        { name: "HTML5", icon: <HTMLIcon />, level: "Primary" },
        { name: "CSS3", icon: <CSSIcon />, level: "Primary" },
      ],
    },
    {
      id: "backend",
      title: "Backend & Systems",
      subtitle: "APIs, Authentication & Logic",
      icon: <Server size={20} className="text-amber-400" />,
      skills: [
        { name: "Node.js", icon: <NodeIcon />, level: "Primary" },
        { name: "Express.js", icon: <ExpressIcon />, level: "Primary" },
        { name: "REST APIs", icon: <RestIcon />, level: "Primary" },
        { name: "JWT Auth", icon: <JwtIcon />, level: "Working" },
        { name: "Multer", icon: <MulterIcon />, level: "Working" },
      ],
    },
    {
      id: "database",
      title: "Databases & Storage",
      subtitle: "Persistence, Modeling & Caching",
      icon: <Database size={20} className="text-amber-400" />,
      skills: [
        { name: "MongoDB", icon: <MongoIcon />, level: "Primary" },
        { name: "Mongoose", icon: <MongooseIcon />, level: "Primary" },
        { name: "SQL", icon: <SqlIcon />, level: "Working" },
        { name: "Redis", icon: <RedisIcon />, level: "Foundational" },
      ],
    },
    {
      id: "tools",
      title: "Developer Toolchain",
      subtitle: "Version Control & Workflow",
      icon: <Settings size={20} className="text-amber-400" />,
      skills: [
        { name: "Git", icon: <GitIcon />, level: "Primary" },
        { name: "GitHub", icon: <GithubIcon />, level: "Primary" },
        { name: "VS Code", icon: <VsCodeIcon />, level: "Primary" },
        { name: "Postman", icon: <PostmanIcon />, level: "Primary" },
        { name: "Firebase", icon: <FirebaseIcon />, level: "Working" },
      ],
    },
    {
      id: "data",
      title: "Data & Languages",
      subtitle: "Analytics & Problem Solving",
      icon: <LineChart size={20} className="text-amber-400" />,
      skills: [
        { name: "Python", icon: <PythonIcon />, level: "Primary" },
        { name: "Pandas", icon: <PandasIcon />, level: "Working" },
        { name: "NumPy", icon: <NumpyIcon />, level: "Working" },
        { name: "Excel", icon: <ExcelIcon />, level: "Working" },
        { name: "Power BI", icon: <PowerBiIcon />, level: "Working" },
      ],
    },
  ];

  const exploringSkills = [
    { name: "Docker", icon: <DockerIcon />, desc: "Containerization & Multi-stage builds" },
    { name: "AWS Cloud", icon: <CloudIcon />, desc: "S3, EC2 & Serverless Deployments" },
    { name: "System Design", icon: <Network size={22} className="text-amber-400" />, desc: "Microservices & Distributed Scaling" },
    { name: "Advanced DSA", icon: <Code2 size={22} className="text-amber-400" />, desc: "Optimization & Graph Algorithms" },
  ];

  const filteredCategories = activeFilter === "all" 
    ? skillCategories 
    : skillCategories.filter(c => c.id === activeFilter);

  return (
    <div className="relative w-full py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Restored Original Heading Font & Curly Arrow */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-amber-400" />
            <span>Interactive Tech Arsenal</span>
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
                    <linearGradient id="arrow-grad-skills" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4e2a14" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99"
                    stroke="url(#arrow-grad-skills)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2 className="section-heading-font text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wider">
                  Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Skills</span>
                </h2>
              </div>
              <svg className="w-48 sm:w-56 h-3 mt-2 mx-auto sm:mx-0 select-none pointer-events-none" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brush-grad-skills" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="60%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#4e2a14" />
                  </linearGradient>
                </defs>
                <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-skills)" />
                <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-skills)" opacity="0.8" />
              </svg>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-normal">
                Core technologies, architectures, and libraries I use to engineer robust, scalable software.
              </p>
            </div>
            {!isStandalone && (
              <Link
                to="/skills"
                className="font-mono text-xs text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* Decorative & Simple Filter Capsule Dock with Framer Motion Layout Animation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/[0.08]">
          
          {/* Decorative Section Tag */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.9)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300 font-bold">
              Filter Domain
            </span>
            <span className="text-slate-600 font-mono text-xs">/</span>
            <span className="font-mono text-[11px] text-amber-400/80">
              {activeFilter === "all" ? "Full Tech Stack (25+ Tools)" : `${filteredCategories[0]?.title}`}
            </span>
          </div>

          {/* Simple Decorative Floating Pill Dock */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#0e1117]/90 border border-white/[0.1] backdrop-blur-xl shadow-2xl">
            {[
              { id: "all", label: "All Arsenal", icon: <Layers size={13} /> },
              { id: "frontend", label: "Frontend", icon: <Cpu size={13} /> },
              { id: "backend", label: "Backend", icon: <Server size={13} /> },
              { id: "database", label: "Databases", icon: <Database size={13} /> },
              { id: "tools", label: "Toolchain", icon: <Settings size={13} /> },
              { id: "data", label: "Data & Python", icon: <LineChart size={13} /> },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer select-none flex items-center gap-1.5 z-10 ${
                    isActive
                      ? "text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl z-[-1] shadow-[0_0_16px_rgba(245,158,11,0.45)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className={isActive ? "text-slate-950" : "text-amber-400/80"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Dynamic & Animated Skills Presentation */}
        <AnimatePresence mode="wait">
          {activeFilter === "all" ? (
            /* ALL SELECTED: Expansive 5-Column Responsive Bento Layout with Gorgeous Pacing */
            <motion.div
              key="all-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col gap-6 mb-10"
            >
              {/* Top Banner Bar: Crafting Identity & Micro Stats */}
              <div className="w-full p-6 sm:p-7 rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/30 transition-all flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-14 h-14 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Code2 size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Crafting Scalable Systems with Modern Tech
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                      Production engineering experience in MERN stack, REST architecture, and data pipelines.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto flex-shrink-0">
                  <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center">
                    <span className="text-xl font-black text-amber-400">10+</span>
                    <span className="text-[9px] font-mono uppercase text-slate-400">Projects</span>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center">
                    <span className="text-xl font-black text-amber-400">25+</span>
                    <span className="text-[9px] font-mono uppercase text-slate-400">Technologies</span>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center">
                    <span className="text-xl font-black text-amber-400">2+</span>
                    <span className="text-[9px] font-mono uppercase text-slate-400">Hackathons</span>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center">
                    <span className="text-xl font-black text-emerald-400">100%</span>
                    <span className="text-[9px] font-mono uppercase text-slate-400">Passion</span>
                  </div>
                </div>
              </div>

              {/* 5-Column Clean Grid — Each Domain Gets its Own Dedicated Card with Proper Breathing Room */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
                {skillCategories.map((cat, cIdx) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: cIdx * 0.08 }}
                    className="p-5 rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-2xl hover:shadow-[0_15px_30px_rgba(245,158,11,0.08)] group hover:-translate-y-1"
                  >
                    <div>
                      {/* Card Category Header */}
                      <div className="flex items-center gap-3 pb-3.5 mb-4 border-b border-white/[0.08]">
                        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                          {cat.icon}
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                            {cat.title}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">
                            {cat.skills.length} skills
                          </span>
                        </div>
                      </div>

                      {/* Skill Items */}
                      <div className="flex flex-col gap-2">
                        {cat.skills.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-amber-500/35 transition-all duration-200 group/skill cursor-default"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="filter drop-shadow-sm group-hover/skill:scale-110 transition-transform flex-shrink-0">
                                {skill.icon}
                              </span>
                              <span className="text-xs font-semibold text-slate-200 group-hover/skill:text-amber-400 transition-colors">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">
                              {skill.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3.5 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Verified
                      </span>
                      <span>Primary Stack</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* SINGLE CATEGORY FOCUSED VIEW: Beautiful Deep-Dive Layout */
            <motion.div
              key="single-domain"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch mb-10"
            >
              {/* Left Details Card */}
              <div className="lg:col-span-4 p-7 sm:p-8 rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    {filteredCategories[0]?.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                    {filteredCategories[0]?.title}
                  </h3>
                  <p className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-4">
                    {filteredCategories[0]?.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6">
                    Hands-on production proficiency applied across full-stack applications, API architectures, and competitive hackathon systems.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 relative z-10">
                  <span>Domain Competencies:</span>
                  <span className="text-amber-400 font-bold text-sm">
                    {filteredCategories[0]?.skills.length} Tools
                  </span>
                </div>
              </div>

              {/* Right Expanded Grid for Focused Domain */}
              <div className="lg:col-span-8 p-7 sm:p-8 rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 transition-all shadow-2xl flex flex-col justify-between">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredCategories[0]?.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: sIdx * 0.05 }}
                      className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-amber-500/40 transition-all hover:scale-[1.03] flex items-center justify-between group/single cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <span className="filter drop-shadow-md group-hover/single:scale-110 transition-transform">
                          {skill.icon}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-bold text-white group-hover/single:text-amber-400 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {skill.level} Proficiency
                          </span>
                        </div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>Tested &amp; Deployed in Full-Stack Projects</span>
                  </span>
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-4"
                  >
                    View All 25+ Technologies &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ROW 2: Currently Exploring (Horizontal Innovation Dock) */}
        <div className="w-full rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 p-6 sm:p-7 flex flex-col md:flex-row gap-6 items-center shadow-2xl transition-all mb-8 relative overflow-hidden group">
          
          {/* Left Title Block */}
          <div className="flex items-center gap-4 flex-shrink-0 md:w-[32%]">
            <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Rocket size={24} className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-amber-400 tracking-tight">
                Currently Exploring
              </span>
              <span className="text-xs text-slate-400 font-light mt-0.5 leading-snug">
                Deepening knowledge in cloud, systems &amp; optimization.
              </span>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-white/[0.08]" />

          {/* Right 4 Horizontal Innovation Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 w-full flex-1">
            {exploringSkills.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-amber-500/40 transition-all hover:scale-[1.02] group/item"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover/item:border-amber-500/40 transition-colors">
                  {item.icon}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover/item:text-amber-400 transition-colors leading-tight">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight mt-0.5 font-light">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ROW 3: Inspiring Engineering Quote with Mountain Vector Wireframe */}
        <div className="relative w-full rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 p-6 md:p-8 flex items-center gap-6 shadow-2xl overflow-hidden transition-all group">
          
          {/* Faint Mountain Silhouette Outline Background Vector */}
          <svg className="absolute bottom-0 right-0 h-24 md:h-28 opacity-[0.12] pointer-events-none text-amber-500 group-hover:text-amber-400 transition-colors" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 50 100 L 150 40 L 220 70 L 320 20 L 380 80 L 400 100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <path d="M 120 100 L 180 60 L 240 100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" fill="none" />
            <circle cx="320" cy="20" r="3" fill="currentColor" />
            <line x1="320" y1="20" x2="320" y2="10" stroke="currentColor" strokeWidth="1" />
            <polygon points="320,10 325,12 320,14" fill="currentColor" />
          </svg>

          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 flex-shrink-0 z-10 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Quote size={22} className="transform rotate-180" />
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-medium z-10 leading-relaxed italic">
            &ldquo;The best way to predict the future is to build it &mdash; through resilient architectures, clean algorithms, and thoughtful user experiences.&rdquo;
          </p>

        </div>

      </div>
    </div>
  );
};

export default Skills;
