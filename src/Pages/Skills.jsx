import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  CheckCircle2,
  BrainCircuit,
  BarChart3,
  ArrowUpRight
} from "lucide-react";
import FlowingMenu from "../Components/FlowingMenu/FlowingMenu";
import SectionParticleHeading from "../Components/SectionParticleHeading";

// Authentic Brand SVGs & Styled Badges
const HTMLIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#e34f26">
    <path d="M1.5 22L0 0h24L22.5 22L12 25z M12 18.5l6-1.5 0.5-5.5H8.5l-0.5-4h11.5l0.5-4H4.5l1.5 15z" />
  </svg>
);

const CSSIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#1572b6">
    <path d="M1.5 22L0 0h24L22.5 22L12 25z M12 18.5l6-1.5 0.5-5.5H8.5l-0.5-4h11.5l0.5-4H4.5l1.5 15z" />
  </svg>
);

const JSIcon = () => (
  <div className="w-5 h-5 flex-shrink-0 bg-[#f7df1e] text-black font-extrabold text-[10px] flex items-center justify-center rounded-[3px] font-sans select-none shadow-sm">
    JS
  </div>
);

const ReactIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#0284c7" strokeWidth="4" transform="rotate(30, 50, 50)" />
    <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#0284c7" strokeWidth="4" transform="rotate(90, 50, 50)" />
    <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#0284c7" strokeWidth="4" transform="rotate(150, 50, 50)" />
    <circle cx="50" cy="50" r="5" fill="#0284c7" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#0ea5e9">
    <path d="M12 4.8C8.8 4.8 6.8 6.4 6 9.6c1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.7 10.6 15 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 15 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C10.3 13.4 9 12 6 12z" />
  </svg>
);

const NodeIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#22c55e">
    <path d="M12 2L4.5 6.3v8.7L12 19.3l7.5-4.3V6.3L12 2zm6 12.1l-6 3.4-6-3.4V7.2l6-3.4 6 3.4v6.9z" />
  </svg>
);

const ExpressIcon = () => (
  <div className="w-5 h-5 flex-shrink-0 bg-slate-900 text-amber-400 border border-slate-700 font-bold text-[9px] flex items-center justify-center rounded-[3px] font-mono select-none shadow-sm">
    ex
  </div>
);

const RestIcon = () => (
  <span className="text-[12px] font-bold text-amber-500 font-mono leading-none tracking-tight">&#123;api&#125;</span>
);

const MongoIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#16a34a">
    <path d="M12 2C11.5 2 7 6.5 7 11.5c0 4 2.5 6.5 5 8.5 2.5-2 5-4.5 5-8.5C17 6.5 12.5 2 12 2z" />
  </svg>
);

const SqlIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const JavaIcon = () => (
  <div className="w-5 h-5 flex-shrink-0 bg-[#ea2d2e] text-white font-extrabold text-[8px] flex items-center justify-center rounded-[3px] font-mono select-none shadow-sm">
    JAVA
  </div>
);

const CppIcon = () => (
  <div className="w-5 h-5 flex-shrink-0 bg-[#00599c] text-white font-extrabold text-[9px] flex items-center justify-center rounded-[3px] font-mono select-none shadow-sm">
    C++
  </div>
);

const PythonIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#3776ab">
    <path d="M12.001 2c-5.5 0-5 2.4-5 2.4l.1 2.5h5v.7H5.2c0 0-3.2.3-3.2 4.8 0 4.1 2.7 4.2 2.7 4.2h1.6v-2.3c0 0-.1-2.8 2.7-2.8h4.9s2.7-.1 2.7-2.7V4.4s.2-2.4-4.8-2.4zm5.2 6.8v2.3c0 0 .1 2.8-2.7 2.8H9.5s-2.7.1-2.7 2.7v4.1s-.2 2.4 4.8 2.4c5.5 0 5-2.4 5-2.4l-.1-2.5h-5v-.7h6.8c0 0 3.2-.3 3.2-4.8 0-4.1-2.7-4.2-2.7-4.2h-1.8z" />
  </svg>
);

const ExcelIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#107c41">
    <path d="M16.2 2H7.8L2 12l5.8 10h8.4l5.8-10z M9.5 16l-1.5-2.5-1.5 2.5H5l2.5-4L5 8h1.5l1.5 2.5L9.5 8H11l-2.5 4l2.5 4z" />
  </svg>
);

const PowerBiIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#eab308">
    <rect x="4" y="14" width="4" height="8" rx="1" />
    <rect x="10" y="8" width="4" height="14" rx="1" />
    <rect x="16" y="2" width="4" height="20" rx="1" />
  </svg>
);

const GitIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#f05032">
    <path d="M2.2 11.8l9.6-9.6c.4-.4 1.1-.4 1.5 0l8.5 8.5c.4.4.4 1.1 0 1.5L12.2 21.8c-.4.4-1.1.4-1.5 0L2.2 13.3c-.4-.4-.4-1.1 0-1.5z" />
  </svg>
);

const GithubIcon = ({ className = "text-slate-900" }) => (
  <svg className={`w-5 h-5 flex-shrink-0 fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const VsCodeIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#007acc">
    <path d="M23.9 6.5l-2.7-2.7c-.2-.2-.6-.2-.8 0L12 12 3.6 3.8c-.2-.2-.6-.2-.8 0L.1 6.5c-.2.2-.2.6 0 .8L8 14l-7.9 6.7c-.2.2-.2.6 0 .8l2.7 2.7c.2.2.6.2.8 0L12 16l8.4 8.2c.2.2.6.2.8 0l2.7-2.7c.2-.2.2-.6 0-.8L16 14l7.9-6.7c.2-.2.2-.6 0-.8z" />
  </svg>
);

const PostmanIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="#ef5b25">
    <path d="M24 11.233c0-4.004-3.238-7.234-7.234-7.234-2.81 0-5.244 1.6-6.446 3.935C9.117 5.6 6.684 4 3.874 4 1.734 4 0 5.734 0 7.874c0 1.258.601 2.373 1.523 3.082-.922.71-1.523 1.825-1.523 3.082C0 16.177 1.734 17.91 3.874 17.91c2.81 0 5.243-1.6 6.446-3.934 1.202 2.334 3.636 3.934 6.446 3.934 4.004 0 7.234-3.237 7.234-7.234 0-.147-.014-.29-.028-.435z" />
  </svg>
);

const DockerIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185h-2.119c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zM11.261 11.078h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185h-2.119c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm-2.722 0h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185H8.539c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm-2.722 0h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.185-.186-.185H5.816c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185zm2.722-2.722h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm2.722 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-5.444 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186H5.816c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm8.166 0h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-5.444-2.722h2.119c.102 0 .186-.083.186-.185V3.33c0-.102-.084-.185-.186-.185H8.539c-.102 0-.186.083-.186.185v2.119c0 .102.084.185.186.185z M23.99 12.528c-.015-.098-.03-.198-.052-.295c-.218-1.127-1.127-1.921-2.196-1.921c-.08 0-.16.006-.239.018c-.89.136-1.637.755-1.932 1.573c-.097.266-.145.548-.145.83v2.898c0 1.83-1.488 3.32-3.32 3.32H6.969c-1.398 0-2.531-1.134-2.531-2.532v-.125c.01-.225.105-.436.27-.585c.162-.147.379-.222.597-.206h12.981c.218-.016.435.059.597.206c.165.149.26.36.27.585v.125c0 2.274 1.848 4.122 4.122 4.122h.001c.224 0 .445-.02.662-.058c1.332-.234 2.37-1.272 2.604-2.604c.038-.217.058-.438.058-.662l-.029-4.819z" />
  </svg>
);

// Exploring Tech Icons
const NextIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 bg-black rounded-full p-[1.5px] border border-gray-700" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
    <path d="M149.5 157.5L69.1 54H54v72h14v-53.7l70.8 91.4c3.8-1.8 7.4-3.9 10.7-6.2z" fill="white" />
    <rect x="115" y="54" width="14" height="72" fill="white" />
  </svg>
);

const TypeScriptIcon = () => (
  <div className="w-5 h-5 flex-shrink-0 bg-[#3178c6] text-white font-extrabold text-[9px] flex items-center justify-center rounded-[3px] font-mono select-none shadow-sm">
    TS
  </div>
);

const SystemDesignIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="6" height="6" rx="1" />
    <rect x="16" y="2" width="6" height="6" rx="1" />
    <rect x="9" y="16" width="6" height="6" rx="1" />
    <path d="M5 8v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
    <path d="M12 12v4" />
  </svg>
);

const DsaIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3" />
    <circle cx="5" cy="19" r="3" />
    <circle cx="19" cy="19" r="3" />
    <line x1="7" y1="17" x2="10.5" y2="7.5" />
    <line x1="17" y1="17" x2="13.5" y2="7.5" />
  </svg>
);

const TurbopackIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CacheIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const QueueIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const GraphIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CodeIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// Comprehensive Skill Domain Database mapping to the 5 requested categories
// Each skill is paired with its official brand logo icon in the flowing marquee
const SKILL_DOMAINS = [
  {
    id: "frontend",
    title: "Frontend Development",
    meta: "5 Core Technologies",
    tagline: "Engineering high-performance, responsive interfaces with modular React architecture & fluid interactions.",
    flowItems: [
      { text: "HTML5", icon: <HTMLIcon /> },
      { text: "CSS3", icon: <CSSIcon /> },
      { text: "JavaScript", icon: <JSIcon /> },
      { text: "React.js", icon: <ReactIcon /> },
      { text: "Tailwind CSS", icon: <TailwindIcon /> }
    ],
    skills: [
      {
        name: "HTML5",
        icon: <HTMLIcon />,
        tag: "Semantic Web",
        experience: "Semantic page architecture, accessible landmark regions, Canvas API rendering, and strict cross-browser compliance."
      },
      {
        name: "CSS3",
        icon: <CSSIcon />,
        tag: "Modern Styling",
        experience: "Advanced Flexbox & Grid layouts, keyframe transitions, responsive fluid typography, and CSS custom properties."
      },
      {
        name: "JavaScript",
        icon: <JSIcon />,
        tag: "ES6+ Modern Engine",
        experience: "Asynchronous programming (Promises, async/await), DOM manipulation, closures, prototype patterns, and high-performance algorithms."
      },
      {
        name: "React.js",
        icon: <ReactIcon />,
        tag: "Core UI Framework",
        experience: "Custom hooks, Virtual DOM optimization, scalable component architecture, memoization, and state orchestration."
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindIcon />,
        tag: "Utility-First Design",
        experience: "Rapid UI prototyping, theme configuration, dark/light mode switching, responsive breakpoints, and custom layout utilities."
      }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    meta: "5 Core Technologies",
    tagline: "Architecting resilient server-side microservices, secure RESTful endpoints, and scalable database schemas.",
    flowItems: [
      { text: "Node.js", icon: <NodeIcon /> },
      { text: "Express.js", icon: <ExpressIcon /> },
      { text: "REST APIs", icon: <RestIcon /> },
      { text: "MongoDB", icon: <MongoIcon /> },
      { text: "MySQL", icon: <SqlIcon /> }
    ],
    skills: [
      {
        name: "Node.js",
        icon: <NodeIcon />,
        tag: "Runtime Engine",
        experience: "Event-driven non-blocking I/O, file streaming, backend process management, and scalable service integration."
      },
      {
        name: "Express.js",
        icon: <ExpressIcon />,
        tag: "Server Framework",
        experience: "Custom middleware pipelines, request validation, robust error handling handlers, and CORS / rate-limiting protection."
      },
      {
        name: "REST APIs",
        icon: <RestIcon />,
        tag: "API Architecture",
        experience: "Clean resource modeling, idempotent HTTP methods, standardized JSON payloads, status codes, and input sanitization."
      },
      {
        name: "MongoDB",
        icon: <MongoIcon />,
        tag: "NoSQL Database",
        experience: "Document-oriented schema modeling, Mongoose ODM schemas, complex aggregation pipelines, and indexing optimization."
      },
      {
        name: "MySQL",
        icon: <SqlIcon />,
        tag: "Relational DB",
        experience: "Relational schema normalization, complex SQL joins, index strategies, foreign keys, and ACID transactional integrity."
      }
    ]
  },
  {
    id: "languages",
    title: "Programming Languages",
    meta: "3 Core Languages",
    tagline: "Strong computational foundation in core algorithms, object-oriented paradigms, and efficient data structures.",
    flowItems: [
      { text: "Java", icon: <JavaIcon /> },
      { text: "C++", icon: <CppIcon /> },
      { text: "Python", icon: <PythonIcon /> }
    ],
    skills: [
      {
        name: "Java",
        icon: <JavaIcon />,
        tag: "OOP & Systems",
        experience: "Object-oriented programming, inheritance, polymorphism, Collections framework, exception handling, and memory lifecycle."
      },
      {
        name: "C++",
        icon: <CppIcon />,
        tag: "DSA & Performance",
        experience: "Pointers, low-level memory layout, STL data structures (vectors, maps, heaps), and competitive algorithm design."
      },
      {
        name: "Python",
        icon: <PythonIcon />,
        tag: "Scripting & Scripting",
        experience: "Data parsing, system automation scripts, algorithmic problem solving, clean functional syntax, and rapid prototyping."
      }
    ]
  },
  {
    id: "ai-data",
    title: "AI & Data Analytics",
    meta: "5 Core Technologies",
    tagline: "Harnessing predictive models, generative AI integrations, and actionable business intelligence dashboards.",
    flowItems: [
      { text: "Generative AI", icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
      { text: "Machine Learning", icon: <BrainCircuit className="w-5 h-5 text-indigo-500" /> },
      { text: "Data Analysis", icon: <BarChart3 className="w-5 h-5 text-emerald-500" /> },
      { text: "Power BI", icon: <PowerBiIcon /> },
      { text: "Excel", icon: <ExcelIcon /> }
    ],
    skills: [
      {
        name: "Generative AI",
        icon: <Sparkles className="w-5 h-5 text-amber-400" />,
        tag: "LLM & Prompts",
        experience: "Prompt engineering, LLM API integration into full-stack web applications, AI-assisted workflows, and structured outputs."
      },
      {
        name: "Machine Learning",
        icon: <BrainCircuit className="w-5 h-5 text-indigo-400" />,
        tag: "Predictive Models",
        experience: "Supervised and unsupervised learning fundamentals, model evaluation, regression, classification, and data preprocessing."
      },
      {
        name: "Data Analysis",
        icon: <BarChart3 className="w-5 h-5 text-emerald-400" />,
        tag: "Analytical Insights",
        experience: "Exploratory Data Analysis (EDA), identifying statistical trends, data cleansing, and quantitative synthesis."
      },
      {
        name: "Power BI",
        icon: <PowerBiIcon />,
        tag: "BI Dashboards",
        experience: "Interactive data visualization, DAX calculated measures, KPI dashboards, report modeling, and automated executive summaries."
      },
      {
        name: "Excel",
        icon: <ExcelIcon />,
        tag: "Spreadsheet Modeling",
        experience: "Advanced formulas (XLOOKUP, INDEX/MATCH), pivot table analysis, financial/data modeling, and cleanup automation."
      }
    ]
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    meta: "5 Core Tools",
    tagline: "Modern developer toolchain ensuring reproducible environments, version safety, and rapid API verification.",
    flowItems: [
      { text: "Git", icon: <GitIcon /> },
      { text: "GitHub", icon: <GithubIcon className="text-slate-900" /> },
      { text: "Docker", icon: <DockerIcon /> },
      { text: "Postman", icon: <PostmanIcon /> },
      { text: "VS Code", icon: <VsCodeIcon /> }
    ],
    skills: [
      {
        name: "Git",
        icon: <GitIcon />,
        tag: "Version Control",
        experience: "Branching workflows, merge conflicts, interactive rebasing, clean commit history hygiene, and semantic versioning."
      },
      {
        name: "GitHub",
        icon: <GithubIcon className="text-white" />,
        tag: "Collaboration & CI/CD",
        experience: "Pull requests, code review etiquette, GitHub Actions workflows, issue tracking, and open-source project management."
      },
      {
        name: "Docker",
        icon: <DockerIcon />,
        tag: "Containerization",
        experience: "Dockerfile configuration, multi-stage builds, container isolation, environment consistency, and microservice orchestration."
      },
      {
        name: "Postman",
        icon: <PostmanIcon />,
        tag: "API Testing Suite",
        experience: "Automated test collections, environment variables, authentication flow mocking, and backend endpoint verification."
      },
      {
        name: "VS Code",
        icon: <VsCodeIcon />,
        tag: "Primary IDE",
        experience: "Custom launch configurations, debugger attachments, ESLint/Prettier automation, and efficient keyboard shortcuts."
      }
    ]
  }
];

// Currently Exploring (FlowingMenu Domain Architecture)
const EXPLORING_DOMAINS = [
  {
    id: "nextjs",
    title: "Next.js 15 & SSR",
    meta: "Frontier 01",
    tagline: "Mastering React Server Components, Turbopack incremental builds, streaming hydration, and dynamic App Router architectures.",
    flowItems: [
      { text: "Next.js 15", icon: <NextIcon /> },
      { text: "Server Components", icon: <ReactIcon /> },
      { text: "Turbopack Bundler", icon: <TurbopackIcon /> },
      { text: "Streaming SSR", icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
      { text: "App Router", icon: <NextIcon /> }
    ],
    skills: [
      {
        name: "Server Components",
        icon: <ReactIcon />,
        tag: "RSC Paradigm",
        experience: "Rendering data-heavy trees exclusively on the server, zero client bundle weight, and parallel server actions."
      },
      {
        name: "Turbopack Engine",
        icon: <TurbopackIcon />,
        tag: "Build Performance",
        experience: "Next-generation Rust-based bundler delivering sub-second HMR updates and rapid cold compilation."
      },
      {
        name: "Streaming Hydration",
        icon: <Sparkles className="w-5 h-5 text-amber-400" />,
        tag: "Performance & UX",
        experience: "Progressive content streaming via React Suspense boundaries for instantaneous Largest Contentful Paint."
      },
      {
        name: "App Router Patterns",
        icon: <NextIcon />,
        tag: "Routing Engine",
        experience: "Nested layouts, intercepted dynamic routes, route handlers, and advanced server cache invalidation."
      }
    ]
  },
  {
    id: "typescript",
    title: "TypeScript & Type Systems",
    meta: "Frontier 02",
    tagline: "Engineering strict type safety, generic constraint programming, conditional types, and resilient compile-time contracts.",
    flowItems: [
      { text: "TypeScript", icon: <TypeScriptIcon /> },
      { text: "Generic Constraints", icon: <CodeIcon /> },
      { text: "Strict Compiler", icon: <TypeScriptIcon /> },
      { text: "Utility Types", icon: <CodeIcon /> },
      { text: "Interface Contracts", icon: <TypeScriptIcon /> }
    ],
    skills: [
      {
        name: "Advanced Generics",
        icon: <CodeIcon />,
        tag: "Generic Programming",
        experience: "Const type arguments, distributive conditional types, template literal inferences, and branded nominal types."
      },
      {
        name: "Strict Compiler Rules",
        icon: <TypeScriptIcon />,
        tag: "Static Analysis",
        experience: "Strict null checks, noImplicitOverride, exactOptionalPropertyTypes, and zero-any runtime guarantees."
      },
      {
        name: "Custom Utility Types",
        icon: <CodeIcon />,
        tag: "Meta-Typing",
        experience: "Building recursive deep-partial mappers, tuple manipulation types, and complex key-remapping functions."
      },
      {
        name: "Full-Stack Contracts",
        icon: <TypeScriptIcon />,
        tag: "API Verification",
        experience: "Sharing end-to-end type definitions across frontend and backend boundaries with zero schema duplication."
      }
    ]
  },
  {
    id: "system-design",
    title: "System Design & Scaling",
    meta: "Frontier 03",
    tagline: "Architecting high-availability microservices, distributed caching layers, rate limiters, and horizontal scaling patterns.",
    flowItems: [
      { text: "System Design", icon: <SystemDesignIcon /> },
      { text: "Distributed Caching", icon: <CacheIcon /> },
      { text: "Load Balancing", icon: <SystemDesignIcon /> },
      { text: "Message Queues", icon: <QueueIcon /> },
      { text: "Horizontal Scaling", icon: <SystemDesignIcon /> }
    ],
    skills: [
      {
        name: "Distributed Caching",
        icon: <CacheIcon />,
        tag: "Cache Architecture",
        experience: "Write-through and cache-aside patterns, Redis cluster topologies, and deterministic TTL expiration policies."
      },
      {
        name: "Load Balancing",
        icon: <SystemDesignIcon />,
        tag: "Traffic Distribution",
        experience: "Layer 4 and Layer 7 reverse proxy routing, health check probes, and least-latency connection distribution."
      },
      {
        name: "Message Queues",
        icon: <QueueIcon />,
        tag: "Asynchronous Work",
        experience: "Decoupling long-running worker tasks with publish-subscribe queues and dead-letter queue recovery."
      },
      {
        name: "Database Scaling",
        icon: <SystemDesignIcon />,
        tag: "Data Scalability",
        experience: "Read-replica replication, vertical connection pooling, consistent hashing, and horizontal table partitioning."
      }
    ]
  },
  {
    id: "dsa",
    title: "Advanced DSA & Optimization",
    meta: "Frontier 04",
    tagline: "Deepening mastery in dynamic programming, graph algorithms, tree data structures, and algorithmic optimization.",
    flowItems: [
      { text: "Advanced DSA", icon: <DsaIcon /> },
      { text: "Dynamic Programming", icon: <CodeIcon /> },
      { text: "Graph Algorithms", icon: <GraphIcon /> },
      { text: "Tree Structures", icon: <DsaIcon /> },
      { text: "Complexity Analysis", icon: <Sparkles className="w-5 h-5 text-emerald-500" /> }
    ],
    skills: [
      {
        name: "Dynamic Programming",
        icon: <CodeIcon />,
        tag: "DP Techniques",
        experience: "State transition modeling, memoization with bitmasks, space-optimized 1D rolling arrays, and interval DP."
      },
      {
        name: "Graph Algorithms",
        icon: <GraphIcon />,
        tag: "Network Theory",
        experience: "Shortest-path Dijkstra, topological ordering, strongly connected components, and Disjoint Set Union (DSU)."
      },
      {
        name: "Tree Structures",
        icon: <DsaIcon />,
        tag: "Tree Architecture",
        experience: "Lowest common ancestors, binary indexed Fenwick trees, and Trie search prefix dictionaries."
      },
      {
        name: "Amortized Optimization",
        icon: <Sparkles className="w-5 h-5 text-amber-400" />,
        tag: "Algorithmic Speed",
        experience: "Monotonic queues, sliding window optimizations, bit manipulation hacks, and O(log N) divide-and-conquer."
      }
    ]
  }
];

const Skills = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [isLight, setIsLight] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const updateTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Pause Lenis smooth scroll and prevent body scroll when modal is open
  useEffect(() => {
    if (selectedDomain) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [selectedDomain]);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedDomain(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Format FlowingMenu items for Technical Skills (5 rows)
  const skillsMenuItems = useMemo(
    () =>
      SKILL_DOMAINS.map((domain) => ({
        text: domain.title,
        meta: domain.meta,
        flowItems: domain.flowItems,
        rawDomain: domain
      })),
    []
  );

  // Format FlowingMenu items for Currently Exploring (4 rows)
  const exploringMenuItems = useMemo(
    () =>
      EXPLORING_DOMAINS.map((domain) => ({
        text: domain.title,
        meta: domain.meta,
        flowItems: domain.flowItems,
        rawDomain: domain
      })),
    []
  );

  const handleRowClick = (item) => {
    const matched =
      SKILL_DOMAINS.find((d) => d.title === item.text) ||
      EXPLORING_DOMAINS.find((d) => d.title === item.text) ||
      item.rawDomain;
    if (matched) {
      setSelectedDomain(matched);
    }
  };

  return (
    <div className="relative w-full px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* SECTION 1 HEADER: TECHNICAL SKILLS */}
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 font-mono text-xs tracking-wider text-amber-400 uppercase border rounded-full bg-amber-500/10 border-amber-500/25">
            <span>Interactive Tech Arsenal</span>
          </div>
          
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
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
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#f8fafc" />
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
                <SectionParticleHeading text="TECHNICAL SKILLS" maxWidth="max-w-md sm:max-w-lg" />
              </div>
              
              <svg className="w-48 h-3 mx-auto mt-2 pointer-events-none select-none sm:w-56 sm:mx-0" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brush-grad-skills" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="60%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                </defs>
                <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-skills)" />
                <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-skills)" opacity="0.8" />
              </svg>
              
              <p className="max-w-xl mt-2 text-sm font-normal sm:text-base text-slate-400">
                Core technologies, architectures, and libraries I use to engineer robust, scalable software.
              </p>
            </div>

           
          </div>
        </div>

        {/* FLOWING MENU 1: TECHNICAL SKILLS (5 ROWS) — UNBOXED EDITORIAL DIRECTORY */}
        <div className="relative w-full h-[520px] sm:h-[580px] mb-16 overflow-hidden border-y border-white/[0.08] light:border-slate-200">
          <FlowingMenu
            ariaLabel="Technical Skills"
            items={skillsMenuItems}
            speed={60}
            stretch={0.6}
            magnet={0.25}
            followCursor={0.4}
            textColor={isLight ? "#0f172a" : "#ffffff"}
            bgColor="transparent"
            marqueeBgColor={isLight ? "#0f172a" : "#ffffff"}
            marqueeTextColor={isLight ? "#ffffff" : "#120F17"}
            borderColor={isLight ? "rgba(15, 23, 42, 0.12)" : "rgba(255, 255, 255, 0.08)"}
            direction="left"
            duration={0.5}
            bandInset={0}
            bandRadius={0}
            carryContent={false}
            dividers
            dimInactive={false}
            align="center"
            showIndex
            showArrow
            imageShape="pill"
            intro
            onItemClick={handleRowClick}
          />
        </div>

        {/* SECTION 2: CURRENTLY EXPLORING (FLOWING MENU 4 ROWS) — UNBOXED */}
        <div className="mb-14">
          <div className="mb-6 text-center sm:text-left">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <SectionParticleHeading text="CURRENTLY EXPLORING" />
                <p className="max-w-xl mt-1 text-sm font-normal sm:text-base text-slate-400">
                  Next-generation architectural roadmap: full-stack systems, type safety, and algorithmic efficiency.
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[420px] sm:h-[460px] overflow-hidden border-y border-white/[0.08] light:border-slate-200">
            <FlowingMenu
              ariaLabel="Currently Exploring"
              items={exploringMenuItems}
              speed={60}
              stretch={0.6}
              magnet={0.25}
              followCursor={0.4}
              textColor={isLight ? "#0f172a" : "#ffffff"}
              bgColor="transparent"
              marqueeBgColor={isLight ? "#0f172a" : "#ffffff"}
              marqueeTextColor={isLight ? "#ffffff" : "#120F17"}
              borderColor={isLight ? "rgba(15, 23, 42, 0.12)" : "rgba(255, 255, 255, 0.08)"}
              direction="right"
              duration={0.5}
              bandInset={0}
              bandRadius={0}
              carryContent={false}
              dividers
              dimInactive={false}
              align="center"
              showIndex
              showArrow
              imageShape="pill"
              intro
              onItemClick={handleRowClick}
            />
          </div>
        </div>

        {/* ROW 3: Engineering Quote Banner */}
        

      </div>

      {/* DOMAIN DETAILS MODAL (COHESIVE MODAL FOR BOTH SKILLS & EXPLORING) */}
      <AnimatePresence>
        {selectedDomain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedDomain(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d1117] border border-amber-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedDomain(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="pr-10 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 font-mono text-xs tracking-wider uppercase border rounded-full bg-amber-500/10 border-amber-500/25 text-amber-400">
                  <CheckCircle2 size={13} className="text-amber-400" />
                  <span>{selectedDomain.meta}</span>
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {selectedDomain.title}
                </h3>
                <p className="text-sm font-light leading-relaxed sm:text-base text-slate-300">
                  {selectedDomain.tagline}
                </p>
              </div>

              {/* Grid of Topic Cards */}
              <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
                {selectedDomain.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-amber-500/40 transition-colors">
                            {skill.icon}
                          </div>
                          <h4 className="text-base font-semibold text-white transition-colors group-hover:text-amber-400">
                            {skill.name}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
                          {skill.tag}
                        </span>
                      </div>
                      <p className="text-xs font-light leading-relaxed text-slate-400">
                        {skill.experience}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Tested &amp; Deployed in Scalable Production Architectures</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDomain(null)}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-semibold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <span>Close View</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;
