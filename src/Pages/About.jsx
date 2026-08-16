import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, BookOpen, School, Target, Terminal } from "lucide-react";

const About = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/about";

  const fileInputRef = useRef(null);
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem("prtx_profile_pic") || "/profile_pic.png";
  });
  const [imageError, setImageError] = useState(false);

  const isAdminMode = localStorage.getItem("prtx_admin_mode") === "true";

  const handlePhotoClick = () => {
    if (isAdminMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (uploadEvent) => {
        const base64Data = uploadEvent.target?.result;
        if (typeof base64Data === "string") {
          setProfilePic(base64Data);
          setImageError(false);
          localStorage.setItem("prtx_profile_pic", base64Data);

          try {
            const response = await fetch("/api/upload-profile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: base64Data }),
            });
            if (response.ok) {
              console.log("Profile picture saved locally to repository!");
            }
          } catch (err) {
            console.error("Local file write not available in production builds:", err);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
      icon: <GraduationCap size={14} />,
    },
    {
      year: "2021 – 2023",
      title: "Class XII (PCM)",
      institution: "L.S. College, Muzaffarpur, Bihar",
      icon: <BookOpen size={14} />,
    },
    {
      year: "2010 – 2021",
      title: "Class X",
      institution: "St. Joseph Sr. Sec. School, Muzaffarpur, Bihar",
      icon: <School size={14} />,
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto flex flex-col gap-10">
        
        {/* Header (Restored exactly to original format) */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-white md:text-6xl relative inline-block">
            <svg className="section-curly-arrow hidden absolute -left-10 -top-8 w-9 h-9 md:-left-16 md:-top-10 md:w-14 md:h-14 scale-x-[-1] select-none pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="arrow-grad-about" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4e2a14" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <path d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99" stroke="url(#arrow-grad-about)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Me</span>
            {!isStandalone && (
              <Link to="/about" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
          <svg className="w-56 h-4 mt-3 mx-auto lg:mx-0" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>

        {/* Row 1: Left Tech Profile Card, Middle Bio Card, and Right Educational Timeline Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Previous Tech Profile Card (Kept exactly as requested with square picture) */}
          <div className="relative flex flex-col justify-start gap-5 p-6 transition-all duration-500 border shadow-2xl sm:p-8 lg:col-span-4 bg-gradient-to-br from-gray-900/40 to-black/60 rounded-3xl border-gray-800/60 backdrop-blur-sm group hover:border-amber-500/25 hover:shadow-[0_20px_40px_rgba(245,158,11,0.05)]">
            {/* Status Pulse */}
            <div className="absolute flex items-center px-3 py-1 space-x-2 border rounded-full top-6 right-6 bg-emerald-500/10 border-emerald-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">Available</span>
            </div>

            {/* Profile Graphic */}
            <div className="flex flex-col items-center mt-6 text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div 
                onClick={handlePhotoClick}
                className={`w-52 h-52 sm:w-56 sm:h-56 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.2)] mb-6 relative overflow-hidden group/photo transition-transform duration-500 group-hover:scale-[1.02] ${isAdminMode ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="w-full h-full bg-[#070708] rounded-[22px] flex items-center justify-center overflow-hidden relative">
                  {!imageError && profilePic ? (
                    <img 
                      src={profilePic} 
                      onError={() => setImageError(true)}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-[22px] transition-transform duration-500 group-hover/photo:scale-105" 
                      alt="Pratik Pathak" 
                    />
                  ) : (
                    <span className="font-mono text-5xl font-bold text-amber-500">PP</span>
                  )}
                  
                  {/* Upload Overlay */}
                  {isAdminMode && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-[22px]">
                      <span className="px-2 font-mono text-xs font-semibold tracking-wider text-center uppercase text-amber-400">
                        {profilePic && !imageError ? "Change 📷" : "Upload 📷"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-extrabold leading-none text-white tracking-tight">Pratik Kumar Pathak</h2>
              <p className="mt-2 text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">Full-Stack Developer</p>
              
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                <span className="px-2.5 py-1 text-[9px] font-mono rounded bg-gray-950 border border-gray-800 text-gray-400 uppercase tracking-wider font-semibold">CSE Student</span>
                <span className="px-2.5 py-1 text-[9px] font-mono rounded bg-gray-950 border border-gray-800 text-gray-400 uppercase tracking-wider font-semibold">SDE Intern</span>
              </div>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-2 pt-6 mt-4 border-t border-gray-800/80">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center p-2.5 bg-gray-950/60 border border-gray-900 rounded-xl transition-all duration-300 hover:border-amber-500/20 hover:scale-105 group/stat">
                  <h4 className="text-base font-black leading-none text-amber-500 transition-colors duration-300 group-hover/stat:text-white">{stat.value}</h4>
                  <p className="text-[7.5px] text-gray-450 mt-1.5 uppercase tracking-wider font-mono font-bold leading-normal break-words">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Bio Card (positioned in between Profile card and Education timeline) */}
          <div className="lg:col-span-4 flex flex-col bg-[#0f0f12]/90 border border-white/[0.06] rounded-3xl p-6 sm:p-8 shadow-2xl bio-panel justify-start gap-5 hover:border-amber-500/20 transition-all duration-300 text-left">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white font-mono border-b border-gray-800/80 pb-3 mb-4">
                <Terminal size={16} className="text-amber-500" /> const profile = &#123; name: "Pratik" &#125;;
              </h3>
              <p className="font-light text-sm sm:text-base leading-relaxed text-slate-100">
                I am a Computer Science & Engineering student and an SDE Intern at **Bluestock Fintech** specializing in full-stack software development. I specialize in bridging the gap between robust, high-performance server logic and beautiful, accessible client interfaces.
              </p>
              <p className="font-light text-sm sm:text-base leading-relaxed text-slate-100">
                With hands-on experience spanning the MERN stack, TypeScript, Python, and AI/RAG integrations, I focus on engineering codebases that are highly performant, clean, and built to scale.
              </p>
            </div>
          </div>

          {/* Right: Educational Timeline Card (styled according to the mockup) */}
          <div className="lg:col-span-4 flex flex-col bg-[#0f0f12]/90 border border-white/[0.06] rounded-3xl p-6 sm:p-8 shadow-2xl bio-panel justify-start gap-5 hover:border-amber-500/20 transition-all duration-300 text-left">
            <div>
              {/* Header with dot line */}
              <div className="flex items-center justify-between w-full mb-8">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="text-amber-500" size={18} />
                  <span className="font-mono text-sm sm:text-base font-bold text-amber-500 tracking-wider">Education</span>
                </div>
                <div className="flex-grow h-[1px] bg-gradient-to-r from-amber-500/40 to-amber-500/10 ml-3 relative">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                </div>
              </div>

              {/* Timeline Nodes */}
              <div className="flex flex-col gap-0">
                {educationList.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    {/* Timeline Track with Circle Icon */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.15)] z-10">
                        {item.icon}
                      </div>
                      {/* Connector line */}
                      {idx < educationList.length - 1 && (
                        <div className="w-[1.5px] h-14 bg-gradient-to-b from-amber-500/40 to-amber-500/10 my-1" />
                      )}
                    </div>
                    
                    {/* Content Column */}
                    <div className="pt-0.5 text-left flex-grow pb-6">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-mono text-[10px] font-bold text-amber-500/90 tracking-wider uppercase bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 font-light mt-1">{item.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: Full-Width My Vision Card (styled according to the mockup) */}
        <div className="w-full flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-[#0f0f12]/90 border border-white/[0.06] rounded-3xl p-6 sm:p-8 shadow-2xl bio-panel hover:border-amber-500/20 transition-all duration-300">
          
          {/* Left block with target icon */}
          <div className="flex flex-row items-center gap-4 sm:w-1/4 flex-shrink-0 justify-center md:justify-start">
            <div className="relative w-14 h-14 rounded-full border border-amber-500/20 bg-amber-500/5 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center">
                <Target className="text-amber-500" size={20} />
              </div>
            </div>
            <div>
              <h4 className="font-mono text-base font-bold text-amber-500 tracking-wider">My Vision</h4>
              <div className="w-12 h-[2px] bg-amber-500 mt-1 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            </div>
          </div>

          {/* Vertical Separator Line */}
          <div className="hidden md:block w-[1px] bg-white/[0.08] self-stretch my-2" />

          {/* Right Quote & Details block */}
          <div className="flex-grow space-y-3 text-left">
            <blockquote className="font-light text-base sm:text-lg leading-relaxed text-amber-500/90 italic">
              &ldquo; My vision is to become a skilled software engineer who builds meaningful, scalable and user-focused digital products. &rdquo;
            </blockquote>
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              I aspire to keep learning, take on challenging problems, and work on innovative projects that create value for users and make a positive difference in the world.
            </p>
          </div>

          {/* Far-Right: Vector mountain drawing */}
          <svg className="w-36 h-24 text-amber-500/70 hidden lg:block flex-shrink-0 self-end ml-4 vision-mountain-svg" viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M10 80 L50 35 L70 60 L90 20 L110 80 Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45 42 L50 35 L55 42 Z" fill="currentColor" opacity="0.2" />
            <path d="M85 27 L90 20 L95 27 Z" fill="currentColor" opacity="0.2" />
            <line x1="90" y1="20" x2="90" y2="5" stroke="currentColor" strokeWidth="1" />
            <path d="M90 5 L102 9 L90 13 Z" fill="currentColor" />
            <circle cx="30" cy="25" r="1" fill="currentColor" />
            <circle cx="70" cy="15" r="0.7" fill="currentColor" />
            <circle cx="105" cy="12" r="1.2" fill="currentColor" />
          </svg>

        </div>

      </div>

      {/* Styles for light theme theme-switching overrides */}
      <style>{`
        html.light .bio-panel,
        html.light .tech-profile-card {
          background: #ffffff !important;
          border-color: rgba(15, 23, 42, 0.08) !important;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04) !important;
        }
        
        html.light .bio-panel h2,
        html.light .bio-panel h3,
        html.light .bio-panel h4,
        html.light .bio-panel h5,
        html.light .tech-profile-card h2,
        html.light .tech-profile-card h3,
        html.light .tech-profile-card h4 {
          color: #0f172a !important; /* slate-900 */
        }

        html.light .bio-panel p,
        html.light .tech-profile-card p,
        html.light .bio-panel span:not(.text-amber-500),
        html.light .tech-profile-card span:not(.text-amber-500):not(.text-emerald-400) {
          color: #334155 !important; /* slate-700 */
        }

        html.light .bio-panel blockquote {
          color: #d97706 !important; /* amber-600 for high-contrast on white */
        }
        
        html.light .tech-profile-card .bg-gray-950/60,
        html.light .bio-panel .bg-gray-950/60 {
          background-color: #f8fafc !important; /* slate-50 */
          border-color: #e2e8f0 !important; /* slate-200 */
        }

        html.light .bio-panel .border-white/[0.04],
        html.light .bio-panel .border-white/[0.08] {
          border-color: rgba(15, 23, 42, 0.06) !important;
        }

        html.light .tech-profile-card .bg-gray-950 {
          background-color: #f1f5f9 !important; /* slate-100 */
          border-color: #e2e8f0 !important; /* slate-200 */
        }

        html.light .tech-profile-card .text-gray-455 {
          color: #64748b !important; /* slate-500 */
        }

        html.light .tech-profile-card .bg-\[\#070708\] {
          background-color: #f1f5f9 !important;
        }

        html.light .bio-panel .text-slate-100 {
          color: #1e293b !important; /* slate-800 */
        }

        html.light .bio-panel .text-slate-400 {
          color: #475569 !important; /* slate-600 */
        }

        html.light .bio-panel .bg-gray-950 {
          background-color: #f8fafc !important;
          border-color: #e2e8f0 !important;
        }

        html.light .vision-mountain-svg {
          color: #d97706 !important;
          opacity: 0.85 !important;
        }
      `}</style>
    </div>
  );
};

export default About;
