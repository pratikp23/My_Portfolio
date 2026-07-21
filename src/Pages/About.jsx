import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, GraduationCap, Heart, Terminal, Sparkles, Code2 } from "lucide-react";

const About = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/about";
  const [activeTab, setActiveTab] = useState("profile");

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
    { label: "LeetCode Solved", value: "5" },
    { label: "Projects Completed", value: "3" },
    { label: "Coding Years", value: "2+" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-white md:text-6xl">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Me</span>
            {!isStandalone && (
              <Link to="/about" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
        </div>

        <div className="grid items-stretch grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column - Tech Profile Card */}
          <div className="relative flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 border shadow-2xl lg:col-span-5 bg-gradient-to-br from-gray-900/40 to-black/60 rounded-3xl border-gray-800/60 backdrop-blur-sm group hover:border-amber-500/20">
            {/* Status Pulse */}
            <div className="absolute flex items-center px-3 py-1 space-x-2 border rounded-full top-6 right-6 bg-emerald-500/10 border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Online</span>
            </div>

            {/* Profile Graphic */}
            <div className="flex flex-col items-center mt-4 text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div 
                onClick={handlePhotoClick}
                className={`w-48 h-48 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.25)] mb-6 relative overflow-hidden group/photo ${isAdminMode ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="w-full h-full bg-[#070708] rounded-[22px] flex items-center justify-center overflow-hidden relative">
                  {!imageError && profilePic ? (
                    <img 
                      src={profilePic} 
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover rounded-[22px]" 
                      alt="Pratik Pathak" 
                    />
                  ) : (
                    <span className="font-mono text-5xl font-bold text-amber-500">PP</span>
                  )}
                  
                  {/* Upload Overlay */}
                  {isAdminMode && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-[22px]">
                      <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider text-center px-2">
                        {profilePic && !imageError ? "Change 📷" : "Upload 📷"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-bold leading-none text-white">Pratik Pathak</h2>
              <p className="mt-1 text-sm text-gray-400 text-amber-550/90">Full Stack Developer</p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-gray-950 border border-gray-800 text-gray-400">Student</span>
                <span className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-gray-950 border border-gray-800 text-gray-400">AI Enthusiast</span>
                <span className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-gray-950 border border-gray-800 text-gray-400">MERN Stack Developer</span>
              </div>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-2 pt-6 mt-8 border-t border-gray-800/80">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center p-2 bg-[#050507] border border-gray-850 rounded-xl">
                  <h4 className="text-lg font-bold leading-none text-amber-500">{stat.value}</h4>
                  <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-wider font-semibold leading-none">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Tabs & Bio Panel */}
          <div className="lg:col-span-7 flex flex-col bg-[#0b0b0d] border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            {/* Interactive Tab Headers */}
            <div className="flex pb-3 mb-6 space-x-4 sm:space-x-6 text-sm font-medium border-b border-gray-800/80 overflow-x-auto no-scrollbar whitespace-nowrap">
              <button
                onClick={() => setActiveTab("profile")}
                className={`pb-3 relative transition-colors duration-300 font-medium flex-shrink-0 ${
                  activeTab === "profile" ? "text-amber-500" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="flex items-center gap-1.5"><User size={16} /> My Bio</span>
                {activeTab === "profile" && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`pb-3 relative transition-colors duration-300 font-medium flex-shrink-0 ${
                  activeTab === "education" ? "text-amber-500" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="flex items-center gap-1.5"><GraduationCap size={16} /> Education</span>
                {activeTab === "education" && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("vision")}
                className={`pb-3 relative transition-colors duration-300 font-medium flex-shrink-0 ${
                  activeTab === "vision" ? "text-amber-500" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="flex items-center gap-1.5"><Sparkles size={16} /> My Vision</span>
                {activeTab === "vision" && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                )}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-grow flex flex-col justify-between min-h-[220px]">
              {activeTab === "profile" && (
                <div className="space-y-4 animate-[fadeIn_0.3s_ease-in-out]">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                    <Terminal size={18} className="text-amber-500" /> const profile = &#123; ... &#125;;
                  </h3>
                  <p className="font-light leading-relaxed text-gray-300">
                    I am a computer science student and full-stack developer committed to creating premium, clean-coded, and highly performant applications. I specialize in breaking down complex backend logic and styling beautiful, interactive user interfaces.
                  </p>
                  <p className="font-light leading-relaxed text-gray-300">
                    With expertise in React, Next.js, and Node.js, I approach every project with the goal of writing maintainable code and providing pixel-perfect visual details.
                  </p>
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
                  <div className="relative pl-4 space-y-4 border-l border-gray-800">
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-amber-500" />
                      <h4 className="text-base font-bold text-white">B.Tech in Computer Science and Engineering</h4>
                      <p className="font-mono text-xs font-medium text-gray-500">2023 - Present</p>
                      <p className="mt-1 text-xs text-gray-400">Focusing on algorithms, Data structures, Web Development, Data Science, and Data Analysis.</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-gray-700" />
                      <h4 className="text-base font-bold text-white">Intermediate Education (Science)</h4>
                      <p className="font-mono text-xs font-medium text-gray-500">Completed 2023</p>
                      <p className="mt-1 text-xs text-gray-400">Strong foundations in physics, chemistry, and higher mathematics.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "vision" && (
                <div className="space-y-4 animate-[fadeIn_0.3s_ease-in-out]">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                    <Code2 size={18} className="text-amber-500" /> Building the Future
                  </h3>
                  <p className="font-light leading-relaxed text-gray-300">
                    My vision is to make technology more accessible and user-friendly, and also to create solutions that are sustainable and beneficial for society.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 border border-gray-900 bg-gray-950/60 rounded-xl">
                      <h5 className="font-mono text-xs font-bold tracking-wider text-white uppercase">Focus</h5>
                      <p className="mt-1 text-xs font-light text-gray-400">Robust system architectures and AI application integration.</p>
                    </div>
                    <div className="p-3 border border-gray-900 bg-gray-950/60 rounded-xl">
                      <h5 className="font-mono text-xs font-bold tracking-wider text-white uppercase">Approach</h5>
                      <p className="mt-1 text-xs font-light text-gray-400">Local-first architectures, premium UI details, and optimization.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default About;
