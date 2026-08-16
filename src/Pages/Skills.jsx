import { useState, useEffect } from "react";
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
  Cloud
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Customized brand logo SVG elements
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
  <div className="w-5 h-5 flex-shrink-0 bg-[#f7df1e] text-black font-extrabold text-[10px] flex items-center justify-center rounded-[2px] font-sans select-none">JS</div>
);

const ReactIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#61dafb" strokeWidth="3" transform="rotate(30, 50, 50)" />
    <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#61dafb" strokeWidth="3" transform="rotate(90, 50, 50)" />
    <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#61dafb" strokeWidth="3" transform="rotate(150, 50, 50)" />
    <circle cx="50" cy="50" r="4" fill="#61dafb" />
  </svg>
);

const NextIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 bg-black rounded-full p-[1.5px] border border-gray-800" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
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
  <div className="w-5 h-5 flex-shrink-0 bg-slate-800 text-white font-bold text-[8px] flex items-center justify-center rounded-[2px]">ex</div>
);

const RestIcon = () => (
  <span className="text-[12px] font-bold text-amber-500 font-mono leading-none">&#123;...&#125;</span>
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
  <span className="text-[11px] font-extrabold text-red-500 font-mono leading-none">M</span>
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
  <svg className="w-5 h-5 flex-shrink-0 fill-current text-white light-arrow-black" viewBox="0 0 24 24">
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

const AwsIcon = () => (
  <svg className="w-6 h-6 text-orange-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

const Skills = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/skills";



  const frontendSkills = [
    { name: "HTML5", icon: <HTMLIcon /> },
    { name: "CSS3", icon: <CSSIcon /> },
    { name: "JavaScript", icon: <JSIcon /> },
    { name: "React", icon: <ReactIcon /> },
    { name: "Next.js", icon: <NextIcon /> },
    { name: "Tailwind CSS", icon: <TailwindIcon /> },
  ];

  const backendSkills = [
    { name: "Node.js", icon: <NodeIcon /> },
    { name: "Express.js", icon: <ExpressIcon /> },
    { name: "REST APIs", icon: <RestIcon /> },
    { name: "JWT", icon: <JwtIcon /> },
    { name: "Multer", icon: <MulterIcon /> },
  ];

  const databaseSkills = [
    { name: "MongoDB", icon: <MongoIcon /> },
    { name: "Mongoose", icon: <MongooseIcon /> },
    { name: "SQL", icon: <SqlIcon /> },
    { name: "Redis", icon: <RedisIcon /> },
  ];

  const toolsSkills = [
    { name: "Git", icon: <GitIcon /> },
    { name: "GitHub", icon: <GithubIcon /> },
    { name: "VS Code", icon: <VsCodeIcon /> },
    { name: "Postman", icon: <PostmanIcon /> },
    { name: "Firebase", icon: <FirebaseIcon /> },
  ];

  const dataSkills = [
    { name: "Python", icon: <PythonIcon /> },
    { name: "Pandas", icon: <PandasIcon /> },
    { name: "NumPy", icon: <NumpyIcon /> },
    { name: "Excel", icon: <ExcelIcon /> },
    { name: "Power BI", icon: <PowerBiIcon /> },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden py-20 px-4">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header (Preserved Exactly) */}
      <div className="relative z-10 mb-14 text-center">
        <span className="text-[10px] font-bold tracking-[0.35em] text-amber-500 uppercase block mb-3">Skills Board</span>
        <h1 className="mb-3 text-4xl font-extrabold text-white md:text-6xl relative inline-block">
          <svg className="section-curly-arrow hidden absolute -left-10 -top-8 w-9 h-9 md:-left-16 md:-top-10 md:w-14 md:h-14 scale-x-[-1] select-none pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="arrow-grad-skills" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4e2a14" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
            <path d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99" stroke="url(#arrow-grad-skills)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Skills</span>
          {!isStandalone && (
            <Link to="/skills" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
              [Full View ↗]
            </Link>
          )}
        </h1>
        <svg className="w-56 h-4 mt-3 mx-auto" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <p className="max-w-xl mx-auto text-xs font-light text-slate-400 md:text-sm font-body mt-3">
          Technologies I use to turn ideas into impactful digital products.
        </p>
      </div>

      {/* Main Workspace Area (Mockup Redesign) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8 items-center px-4 font-body">
        
        {/* ROW 1: 3-Col Stats Card & 9-Col Arsenal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
          
          {/* Left Card: Crafting with Code (lg:col-span-3) */}
          <div className="lg:col-span-3 rounded-3xl bg-[#0f0f12]/90 border border-gray-800/60 p-6 flex flex-col justify-start hover:border-amber-500/25 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.05)] shadow-2xl skills-premium-card">
            
            {/* Coding Circle Icon */}
            <div className="w-24 h-24 rounded-full border border-amber-500/20 bg-amber-500/5 flex items-center justify-center mx-auto mb-6 text-amber-500">
              <Code2 size={44} />
            </div>

            <h3 className="text-2xl font-bold text-amber-500 mb-3 text-center font-display skills-accent-title">Crafting with Code.</h3>
            <p className="text-sm text-slate-350 text-center leading-relaxed mb-6 skills-text-desc">
              I love building clean, efficient and scalable web applications with modern technologies.
            </p>

            {/* Vertical Stats */}
            <div className="flex flex-col gap-5 pt-6 mt-auto border-t border-gray-800/40">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Folder size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white leading-none skills-text-title">10+</span>
                  <span className="text-xs md:text-sm text-slate-400 mt-1 skills-text-desc">Projects Built</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Code2 size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white leading-none skills-text-title">3+</span>
                  <span className="text-xs md:text-sm text-slate-400 mt-1 skills-text-desc">Tech Stacks</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Trophy size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white leading-none skills-text-title">2+</span>
                  <span className="text-xs md:text-sm text-slate-400 mt-1 skills-text-desc">Years of Learning</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Compass size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white leading-none skills-text-title">100%</span>
                  <span className="text-xs md:text-sm text-slate-400 mt-1 skills-text-desc">Passion</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Card: Skills Columns (lg:col-span-9) */}
          <div className="lg:col-span-9 rounded-3xl bg-[#0f0f12]/90 border border-gray-800/60 p-6 flex flex-col justify-between hover:border-amber-500/25 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.05)] shadow-2xl skills-premium-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              
              {/* Column 1: Frontend */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 border-b border-gray-800/40 pb-3">
                  <div className="flex items-center gap-2.5 text-amber-500">
                    <Cpu size={20} />
                    <span className="font-extrabold text-sm md:text-base text-white uppercase tracking-wider font-display skills-text-title">Frontend</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-400 leading-tight skills-text-desc">Building beautiful interfaces</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {frontendSkills.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-slate-950/40 border border-white/[0.04] text-xs hover:border-amber-500/20 hover:text-amber-500 transition-all duration-300 hover:scale-[1.03] cursor-default skills-badge-item">
                      {s.icon}
                      <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 font-display">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Backend */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 border-b border-gray-800/40 pb-3">
                  <div className="flex items-center gap-2.5 text-amber-500">
                    <Server size={20} />
                    <span className="font-extrabold text-sm md:text-base text-white uppercase tracking-wider font-display skills-text-title">Backend</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-400 leading-tight skills-text-desc">Logic, APIs & server magic</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {backendSkills.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-slate-950/40 border border-white/[0.04] text-xs hover:border-amber-500/20 hover:text-amber-500 transition-all duration-300 hover:scale-[1.03] cursor-default skills-badge-item">
                      {s.icon}
                      <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 font-display">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Database */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 border-b border-gray-800/40 pb-3">
                  <div className="flex items-center gap-2.5 text-amber-500">
                    <Database size={20} />
                    <span className="font-extrabold text-sm md:text-base text-white uppercase tracking-wider font-display skills-text-title">Database</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-400 leading-tight skills-text-desc">Managing data efficiently</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {databaseSkills.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-slate-950/40 border border-white/[0.04] text-xs hover:border-amber-500/20 hover:text-amber-500 transition-all duration-300 hover:scale-[1.03] cursor-default skills-badge-item">
                      {s.icon}
                      <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 font-display">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 4: Tools & Others */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 border-b border-gray-800/40 pb-3">
                  <div className="flex items-center gap-2.5 text-amber-500">
                    <Settings size={20} />
                    <span className="font-extrabold text-sm md:text-base text-white uppercase tracking-wider font-display skills-text-title">Tools</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-400 leading-tight skills-text-desc">Boosting work productivity</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {toolsSkills.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-slate-950/40 border border-white/[0.04] text-xs hover:border-amber-500/20 hover:text-amber-500 transition-all duration-300 hover:scale-[1.03] cursor-default skills-badge-item">
                      {s.icon}
                      <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 font-display">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 5: Data & Analytics */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 border-b border-gray-800/40 pb-3">
                  <div className="flex items-center gap-2.5 text-amber-500">
                    <LineChart size={20} />
                    <span className="font-extrabold text-sm md:text-base text-white uppercase tracking-wider font-display skills-text-title">Data & BI</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-400 leading-tight skills-text-desc">Extracting valuable insights</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {dataSkills.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-slate-950/40 border border-white/[0.04] text-xs hover:border-amber-500/20 hover:text-amber-500 transition-all duration-300 hover:scale-[1.03] cursor-default skills-badge-item">
                      {s.icon}
                      <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 font-display">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ROW 2: Currently Exploring (Horizontal Full Width Bar) */}
        <div className="w-full rounded-3xl bg-[#0f0f12]/90 border border-gray-800/60 p-6 flex flex-col md:flex-row gap-6 items-center hover:border-amber-500/25 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.05)] shadow-2xl skills-premium-card">
          
          {/* Left info box */}
          <div className="flex items-center gap-4 flex-shrink-0 md:w-[35%]">
            <div className="w-14 h-14 rounded-full bg-amber-500/5 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
              <Rocket size={28} className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-amber-500 font-display skills-accent-title">Currently Exploring</span>
              <span className="text-xs md:text-sm text-slate-400 leading-normal skills-text-desc">Exploring new technologies and concepts to stay ahead.</span>
            </div>
          </div>

          {/* Right horizontal tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full md:flex-1">
            
            {/* Card 1: Docker */}
            <div className="flex items-center gap-3.5 p-4 rounded-3xl bg-slate-950/40 border border-white/[0.04] hover:border-amber-500/20 transition-all duration-300 flex-1 min-w-[140px] hover:scale-[1.03] skills-badge-item">
              <div className="w-11 h-11 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                <DockerIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white font-display skills-text-title">Docker</span>
                <span className="text-[10px] sm:text-xs text-slate-400 leading-tight skills-text-desc">Containerization & Deployment</span>
              </div>
            </div>

            {/* Card 2: AWS */}
            <div className="flex items-center gap-3.5 p-4 rounded-3xl bg-slate-950/40 border border-white/[0.04] hover:border-amber-500/20 transition-all duration-300 flex-1 min-w-[140px] hover:scale-[1.03] skills-badge-item">
              <div className="w-11 h-11 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                <Cloud size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white font-display skills-text-title">AWS</span>
                <span className="text-[10px] sm:text-xs text-slate-400 leading-tight skills-text-desc">Cloud Computing Services</span>
              </div>
            </div>

            {/* Card 3: System Design */}
            <div className="flex items-center gap-3.5 p-4 rounded-3xl bg-slate-950/40 border border-white/[0.04] hover:border-amber-500/20 transition-all duration-300 flex-1 min-w-[140px] hover:scale-[1.03] skills-badge-item">
              <div className="w-11 h-11 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                <Network size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white font-display skills-text-title">System Design</span>
                <span className="text-[10px] sm:text-xs text-slate-400 leading-tight skills-text-desc">Designing scalable systems</span>
              </div>
            </div>

            {/* Card 4: Advanced DSA */}
            <div className="flex items-center gap-3.5 p-4 rounded-3xl bg-slate-950/40 border border-white/[0.04] hover:border-amber-500/20 transition-all duration-300 flex-1 min-w-[140px] hover:scale-[1.03] skills-badge-item">
              <div className="w-11 h-11 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                <Code2 size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white font-display skills-text-title">Advanced DSA</span>
                <span className="text-[10px] sm:text-xs text-slate-400 leading-tight skills-text-desc">Data Structures & Algorithms</span>
              </div>
            </div>

          </div>

        </div>

        {/* ROW 3: Quotes Footer */}
        <div className="relative w-full rounded-3xl bg-[#0f0f12]/90 border border-gray-800/60 p-6 md:p-8 flex items-center gap-6 hover:border-amber-500/25 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.05)] shadow-2xl overflow-hidden skills-premium-card">
          
          {/* Faint Mountain Silhouette Outline Background Vector */}
          <svg className="absolute bottom-0 right-0 h-20 md:h-24 opacity-[0.08] pointer-events-none text-amber-500 skills-mountain-path" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 100 L 150 40 L 220 70 L 320 20 L 380 80 L 400 100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <path d="M 120 100 L 180 60 L 240 100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" fill="none" />
            <circle cx="320" cy="20" r="3" fill="currentColor" />
            <line x1="320" y1="20" x2="320" y2="10" stroke="currentColor" strokeWidth="1" />
            <polygon points="320,10 325,12 320,14" fill="currentColor" />
          </svg>

          <div className="w-12 h-12 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0 z-10">
            <Quote size={24} className="transform rotate-180" />
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-100 font-semibold z-10 leading-relaxed font-body skills-text-title">
            The best way to predict the future is to build it.
          </p>

        </div>

      </div>

      {/* Premium Theme Styles Overrides */}
      <style>{`
        /* Global CSS selectors matching current theme configuration */
        /* Inherit default Plus Jakarta Sans font style */
        .font-display {
          font-family: inherit;
        }
        
        .font-body {
          font-family: inherit;
        }

        /* Light Mode overrides */
        html.light .skills-premium-card {
          background: #ffffff !important;
          border-color: rgba(15, 23, 42, 0.08) !important;
          box-shadow: 0 15px 30px rgba(15, 23, 42, 0.04) !important;
        }
        
        html.light .skills-premium-card:hover {
          border-color: rgba(139, 92, 246, 0.2) !important;
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.05) !important;
        }

        html.light .skills-text-title {
          color: #0f172a !important;
        }

        html.light .skills-accent-title {
          color: #b45309 !important; /* Rich amber/gold */
        }

        html.light .skills-text-desc {
          color: #475569 !important;
        }

        html.light .skills-badge-item {
          background: #f8fafc !important;
          border-color: rgba(15, 23, 42, 0.05) !important;
          color: #1e293b !important;
        }
        
        html.light .skills-badge-item:hover {
          border-color: rgba(139, 92, 246, 0.25) !important;
          color: #8b5cf6 !important;
        }
        
        html.light .skills-badge-item span {
          color: #334155 !important;
        }
        
        html.light .skills-badge-item:hover span {
          color: #8b5cf6 !important;
        }

        html.light .light-arrow-black {
          color: #0f172a !important;
        }
        
        html.light .skills-mountain-path {
          color: #b45309 !important;
          opacity: 0.12 !important;
        }
      `}</style>
    </div>
  );
};

export default Skills;
