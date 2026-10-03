import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, BookOpen, School, Target, Terminal, CheckCircle2 } from "lucide-react";

const About = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/about";

  const [imageError, setImageError] = useState(false);

  const stats = [
    { label: "Projects Completed", value: "10+" },
    { label: "Certifications", value: "15" },
    { label: "Hackathons", value: "2+" },
  ];

  const educationList = [
    {
      year: "2023 – 2027",
      title: "B.Tech in Computer Science & Engineering",
      institution: "Shri Ram Institute of Technology, Jabalpur (RGPV)",
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

  return (
    <div className="relative w-full py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
            <span>Profile & Background</span>
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
                    <linearGradient id="arrow-grad-about" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4e2a14" />
                      <stop offset="100%" stopColor="#fb923c" />
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
                <h2 className="section-heading-font text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wider">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Me</span>
                </h2>
              </div>
              <svg className="w-48 sm:w-56 h-3 mt-2 mx-auto sm:mx-0 select-none pointer-events-none" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brush-grad-about" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="60%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#4e2a14" />
                  </linearGradient>
                </defs>
                <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-about)" />
                <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-about)" opacity="0.8" />
              </svg>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-normal">
                Engineering student, former SDE Intern, and problem solver focused on robust web applications.
              </p>
            </div>
            {!isStandalone && (
              <Link
                to="/about"
                className="font-mono text-xs text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* 3-Column Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Visual Identity & Interactive Developer Badge (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
            
            {/* Ambient Background Aura */}
            <div className="absolute -top-16 -left-16 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
            
            {/* Status Pill Header */}
            <div className="w-full flex items-center justify-between mb-4 z-10">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                ID // PRATIK.DEV
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-medium shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </span>
            </div>

            {/* Profile Avatar Frame with Interactive Amber Ring */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl p-1 bg-gradient-to-tr from-amber-500/50 via-white/[0.1] to-amber-500/20 border border-white/[0.12] shadow-2xl mb-4 group-hover:scale-[1.02] transition-transform">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-900 flex items-center justify-center relative">
                {!imageError ? (
                  <img
                    src="/profile_pic.png"
                    alt="Pratik Pathak"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="font-mono text-4xl font-extrabold text-amber-500">PP</span>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight z-10">Pratik Kumar Pathak</h3>
            <p className="text-xs font-mono font-bold text-amber-400 mt-1 uppercase tracking-wider z-10">
              Full Stack Developer &bull; CSE Student
            </p>

            <div className="flex flex-wrap justify-center gap-1.5 mt-3 z-10">
              <span className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300">
                B.Tech (2023–27)
              </span>
              <span className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
                Ex-SDE Intern
              </span>
            </div>

            {/* Micro Stats Grid with Glass Tiles */}
            <div className="w-full grid grid-cols-3 gap-2 pt-5 mt-5 border-t border-white/[0.08] z-10">
              {stats.map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col items-center">
                  <p className="text-base sm:text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
                    {s.value}
                  </p>
                  <p className="text-[9px] font-mono uppercase text-slate-400 mt-0.5 tracking-wider text-center leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Card 2: Developer Terminal & Architecture Focus (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div>
              {/* macOS / Terminal Titlebar */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Terminal size={14} className="text-amber-400" />
                  <span className="font-mono text-xs font-semibold text-slate-300">overview.tsx</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">UTF-8</span>
              </div>

              {/* Bio Content with Architecture Tags */}
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                <p>
                  I am a Computer Science & Engineering undergraduate with practical industry experience as an <strong className="text-white font-semibold underline decoration-amber-500/50 underline-offset-4">SDE Intern at Bluestock Fintech</strong>, where I developed modular client views and connected REST services.
                </p>
                <p>
                  My engineering workflow centers around the <strong className="text-slate-200 font-semibold">MERN stack</strong> (MongoDB, Express, React, Node.js), TypeScript, Python, and integrating real-world AI capabilities.
                </p>
                <p>
                  I prioritize <strong className="text-slate-200 font-semibold">clean architecture</strong>, defensive API error handling, and high-performance, accessible user interfaces.
                </p>
              </div>

              {/* Technical Pillars Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-2">
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  #RESTfulAPIs
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  #ReactPatterns
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  #ModularUI
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  #AIIntegration
                </span>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/[0.08] flex items-center gap-2 text-xs font-mono text-slate-400">
              <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
              <span className="truncate">Ready for Full-Stack &amp; SDE Roles</span>
            </div>
          </div>

          {/* Card 3: Educational Stepper Timeline with Connected Track (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-amber-400" />
                <span className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Education
                </span>
              </div>
              <span className="font-mono text-[10px] text-amber-400/90 font-semibold uppercase tracking-wider">
                Academic Journey
              </span>
            </div>

            {/* Stepper with Connected Vertical Line */}
            <div className="flex flex-col flex-grow">
              {educationList.map((item, idx) => (
                <div key={idx} className="flex gap-3.5 items-start relative group/item">
                  
                  {/* Left Column: Icon Node + Connector Line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.2)] z-10 group-hover/item:border-amber-400 transition-colors">
                      {item.icon}
                    </div>
                    {/* Vertical Connector Line */}
                    {idx < educationList.length - 1 && (
                      <div className="w-[1.5px] h-12 sm:h-14 bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-white/[0.06] my-1" />
                    )}
                  </div>

                  {/* Right Column: Educational Content */}
                  <div className="text-left flex-grow pb-4 pt-0.5">
                    <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
                      {item.year}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover/item:text-amber-400 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal font-light">
                      {item.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Vision Statement Banner with Restored Vector Mountain Art */}
        <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-[#0e1117]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          
          {/* Left Block: Target Icon & Title */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="relative w-12 h-12 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Target size={22} className="text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400">
                My Vision
              </h4>
              <p className="text-xs text-slate-400 font-light">Guiding Engineering Philosophy</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-14 bg-white/[0.08] self-center" />

          {/* Center Quote & Commitment */}
          <div className="flex-grow space-y-2 text-center md:text-left">
            <blockquote className="font-light text-sm sm:text-base leading-relaxed text-amber-300/95 italic">
              &ldquo;My vision is to become an exceptional software engineer who builds dependable, scalable, and user-centric digital products.&rdquo;
            </blockquote>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              I seek to continuously learn, take on ambitious engineering challenges, and ship solutions that create genuine value for users.
            </p>
          </div>

          {/* Far-Right: Restored Hand-Drawn Mountain & Summit Flag Vector Artwork */}
          <svg
            className="w-32 h-20 text-amber-500/70 hidden lg:block flex-shrink-0 self-end ml-4 select-none pointer-events-none group-hover:text-amber-400 transition-colors"
            viewBox="0 0 120 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <path d="M10 80 L50 35 L70 60 L90 20 L110 80 Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45 42 L50 35 L55 42 Z" fill="currentColor" opacity="0.25" />
            <path d="M85 27 L90 20 L95 27 Z" fill="currentColor" opacity="0.25" />
            <line x1="90" y1="20" x2="90" y2="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M90 5 L102 9 L90 13 Z" fill="currentColor" />
            <circle cx="30" cy="25" r="1.2" fill="currentColor" />
            <circle cx="70" cy="15" r="0.9" fill="currentColor" />
            <circle cx="105" cy="12" r="1.3" fill="currentColor" />
          </svg>

        </div>
      </div>
    </div>
  );
};

export default About;
