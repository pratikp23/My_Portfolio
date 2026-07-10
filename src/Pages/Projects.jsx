import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ExternalLink, Layers, Terminal, ChevronLeft, ChevronRight, Upload } from "lucide-react";

const GithubIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Projects = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/projects";

  const [activeDetailProject, setActiveDetailProject] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Admin Mode detection
  const [isAdminMode, setIsAdminMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "true") {
      localStorage.setItem("prtx_admin_mode", "true");
      return true;
    }
    return localStorage.getItem("prtx_admin_mode") === "true";
  });

  // Dynamic projects list loaded/saved from/to localStorage
  const [projectsList, setProjectsList] = useState(() => {
    const saved = localStorage.getItem("prtx_projects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved projects", e);
      }
    }
    return [
      {
        title: "AI-Learning Management System",
        description: "An AI-powered Learning Management System that provides personalized learning experiences through AI recommendations, intelligent doubt resolution, course management, progress tracking, and interactive learning analytics. The platform combines modern web technologies with AI to make education smarter, faster, and more accessible.",
        fullDetails: "Developed a full-stack AI Learning Management System using React, Tailwind CSS, Node.js, and MongoDB. Integrated AI recommendation algorithms to personalize learning paths for users. Implemented real-time resume checker and doubt resolution features using AI models. Designed a responsive UI with Tailwind CSS and ensured secure authentication and data management with MongoDB.",
        tags: ["React", "Tailwind CSS", "MongoDB", "Node.js"],
        github: "https://github.com/pratikp23/Learning-Management-System",
        demo: "https://learning-management-system-nine-bay.vercel.app",
        complexity: "High",
        category: "Fullstack",
        image: "/project1.png",
      },
      {
        title: "HealthAI Guardian",
        description: "HealthAI Guardian is a next-generation healthcare application designed to leverage artificial intelligence for enhanced patient monitoring and health data management. This platform serves as a secure and intelligent bridge between personal health metrics and actionable medical insights.",
        fullDetails: "HealthAI Guardian is a next-generation healthcare application designed to leverage artificial intelligence for enhanced patient monitoring and health data management. This platform serves as a secure and intelligent bridge between personal health metrics and actionable medical insights  HealthAI Guardian is built to address the growing need for accessible and intelligent health oversight. By integrating intuitive UI design with robust data processing, the application allows users to track vital statistics, receive AI-driven health insights, and manage medical records securely and efficiently. The system employs advanced machine learning algorithms to analyze health data, providing predictive analytics and personalized recommendations for users. With a focus on privacy and security, HealthAI Guardian ensures that sensitive health information is protected while still being easily accessible to authorized users.",
        tags: ["React", "TypeScript", "OpenAI API", "MongoDB"],
        github: "https://github.com/krrish-cypto/HealthAI-Guardian",
        demo: "https://healthai-guardian.netlify.app",
        complexity: "High",
        category: "AI Integration",
        image: "/Project2.png",
      }
    ];
  });

  // Edit project states
  const [editingProjectIdx, setEditingProjectIdx] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editGithub, setEditGithub] = useState("");
  const [editDemo, setEditDemo] = useState("");
  const [editComplexity, setEditComplexity] = useState("High");
  const [editImage, setEditImage] = useState("");

  const startEditingProject = (idx) => {
    const project = projectsList[idx];
    setEditingProjectIdx(idx);
    setEditTitle(project?.title || "");
    setEditCategory(project?.category || "");
    setEditDesc(project?.description || "");
    setEditDetails(project?.fullDetails || "");
    setEditTags(project?.tags ? project.tags.join(", ") : "");
    setEditGithub(project?.github || "");
    setEditDemo(project?.demo || "");
    setEditComplexity(project?.complexity || "High");
    setEditImage(project?.image || "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = () => {
    if (editingProjectIdx !== null) {
      const updatedList = [...projectsList];
      updatedList[editingProjectIdx] = {
        title: editTitle,
        description: editDesc,
        fullDetails: editDetails,
        tags: editTags.split(",").map(t => t.trim()).filter(Boolean),
        github: editGithub,
        demo: editDemo,
        complexity: editComplexity,
        category: editCategory,
        image: editImage,
      };
      setProjectsList(updatedList);
      localStorage.setItem("prtx_projects", JSON.stringify(updatedList));
      setEditingProjectIdx(null);
    }
  };

  const handleExitAdmin = () => {
    localStorage.removeItem("prtx_admin_mode");
    setIsAdminMode(false);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIndex = (activeCardIndex - 1 + projectsList.length) % projectsList.length;
    setActiveCardIndex(prevIndex);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIndex = (activeCardIndex + 1) % projectsList.length;
    setActiveCardIndex(nextIndex);
  };

  // Autoplay: automatically advances index every 6 seconds unless hovered
  useEffect(() => {
    if (isHovered || projectsList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % projectsList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, projectsList.length]);

  return (
    <div className="relative w-full bg-[#070708] py-16 md:py-24 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header Block */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.35em] text-amber-500 uppercase block mb-2">Portfolio</span>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Projects</span>
            {!isStandalone && (
              <Link to="/projects" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
        </div>
        
        <div className="flex flex-col md:items-end gap-2">
          <p className="text-xs font-light text-slate-400 max-w-xs md:text-right">
            Interactive Slider. Click on the indicators or card to browse projects.
          </p>
          {isAdminMode && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[9px] uppercase tracking-wider w-max">
              <span>🔧 Admin Mode Active</span>
              <button
                onClick={handleExitAdmin}
                className="font-bold text-red-400 cursor-pointer hover:text-red-300 hover:underline"
              >
                [Exit]
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slider Viewport Layout */}
      <div className="relative w-full z-10">
        
        {/* Slider Viewport Container */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-[90vw] sm:w-[440px] md:w-[720px] lg:w-[800px] mx-auto overflow-hidden py-6"
        >
          {/* Sliding Cards Track */}
          <div 
            className="flex select-none w-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${activeCardIndex * 100}%)`
            }}
          >
            {projectsList.map((project, idx) => {
              return (
                <div key={idx} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div
                    className="h-auto rounded-[24px] p-5 pt-14 pb-6 md:pb-5 md:pt-10 flex flex-col md:flex-row gap-6 items-center justify-between relative overflow-visible project-card group whitespace-normal cursor-pointer"
                    onClick={(e) => {
                      if (e.target.closest("a, button, input, textarea, select")) return;
                      handleNext(e);
                    }}
                  >
                    {/* Card border decor */}
                    <div className="absolute inset-0 rounded-[24px] border border-white/[0.04] group-hover:border-amber-500/25 transition-colors duration-500 pointer-events-none z-10" />

                    {/* Left Side: Browser Mockup Frame */}
                    <div className="relative w-full md:w-[48%] h-[150px] md:h-[220px] -mt-[40px] md:-mt-0 md:-ml-[35px] rounded-xl overflow-hidden shadow-2xl flex-shrink-0 transition-all duration-500 group-hover:-translate-y-3 md:group-hover:-translate-y-1.5 md:group-hover:-translate-x-2 group-hover:scale-[1.02] group-hover:rotate-1 group-hover:shadow-[0_15px_30px_rgba(245,158,11,0.2)] border border-white/[0.05] flex flex-col bg-slate-950">
                      
                      {/* Browser header */}
                      <div className="w-full h-5 bg-slate-900 border-b border-white/[0.05] flex items-center px-2.5 gap-1.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                        <div className="w-20 h-3 bg-slate-950/60 border border-white/[0.03] rounded mx-auto flex items-center justify-center">
                          <span className="text-[5px] text-slate-500 font-mono scale-90">pratik.os/project</span>
                        </div>
                      </div>

                      {/* Sliding Screenshot */}
                      <div className="w-full h-[calc(100%-20px)] overflow-hidden relative bg-slate-900">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto min-h-full object-cover object-top transition-transform duration-[3s] ease-in-out group-hover:translate-y-[-24%]"
                        />
                        
                        {/* Floating label badges */}
                        <span className="absolute top-2 left-2 bg-black/85 backdrop-blur-md border border-white/[0.08] text-amber-500 font-mono text-[8px] tracking-wider uppercase px-2 py-0.5 rounded font-bold shadow-md z-20">
                          {project.category}
                        </span>
                        <span className={`absolute top-2 right-2 backdrop-blur-md border font-mono text-[8px] tracking-wider uppercase px-2 py-0.5 rounded font-bold shadow-md flex items-center gap-1 z-20 ${
                          project.complexity === "Expert"
                            ? "bg-red-950/80 border-red-500/30 text-red-400"
                            : project.complexity === "High"
                            ? "bg-amber-950/80 border-amber-500/30 text-amber-400"
                            : "bg-emerald-950/80 border-emerald-500/30 text-emerald-400"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            project.complexity === "Expert" ? "bg-red-400" : project.complexity === "High" ? "bg-amber-400" : "bg-emerald-400"
                          } animate-pulse`} />
                          {project.complexity}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="w-full md:w-[48%] flex flex-col justify-between text-left md:pr-2 py-1">
                      <div>
                        <h3 className="mb-1 text-lg font-bold tracking-tight sm:text-xl text-slate-100 group-hover:text-amber-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="font-light text-[10px] sm:text-xs text-slate-400 leading-relaxed line-clamp-4 group-hover:text-slate-300 transition-colors">
                          {project.description}
                        </p>
                        
                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-[8px] font-mono border border-white/[0.04] bg-white/[0.01] text-slate-400 uppercase tracking-wider transition-all duration-300 group-hover:border-amber-500/20 group-hover:text-amber-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Buttons row */}
                      <div className="flex items-center justify-between pt-3 mt-4 border-t border-white/[0.04] z-20">
                        <span className="text-[9px] font-mono text-slate-500">
                          {idx + 1} / {projectsList.length}
                        </span>
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-end">
                          <button
                            onClick={() => setActiveDetailProject(project)}
                            className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg text-[9px] sm:text-xs transition-all font-mono cursor-pointer shadow-md shadow-amber-500/10 hover:-translate-y-0.5"
                          >
                            <span>Specs</span>
                          </button>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 border border-white/[0.08] bg-slate-950/40 rounded-lg text-[9px] sm:text-xs text-slate-300 hover:text-white hover:border-slate-500 transition-all font-mono hover:-translate-y-0.5"
                          >
                            <GithubIcon size={10} />
                            <span>Code</span>
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 border border-white/[0.08] bg-slate-950/40 rounded-lg text-[9px] sm:text-xs text-slate-300 hover:text-white hover:border-slate-500 transition-all font-mono hover:-translate-y-0.5"
                          >
                            <ExternalLink size={10} className="text-slate-400" />
                            <span>Demo</span>
                          </a>
                          
                          {isAdminMode && (
                            <button
                              onClick={() => startEditingProject(idx)}
                              className="flex items-center gap-1 px-2 py-1 border rounded-lg text-[9px] sm:text-xs transition-all font-mono cursor-pointer text-amber-500 hover:text-amber-400 border-amber-500/20 hover:-translate-y-0.5"
                            >
                              <span>Edit</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Combined Manual Control Bars Row - Placed directly below the cards */}
        <div className="relative z-20 flex justify-center items-center gap-6 mt-6">
          {/* Left Manual Control Bar */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-gray-950/90 border border-gray-800 text-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer hover:scale-105"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Pagination Indicators */}
          <div className="flex gap-2">
            {projectsList.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setActiveCardIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeCardIndex === index ? "w-6 bg-amber-500" : "w-1.5 bg-slate-800 hover:bg-slate-600"
                }`}
                aria-label={`Scroll to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Manual Control Bar */}
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-gray-950/90 border border-gray-800 text-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer hover:scale-105"
            aria-label="Scroll Right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>

      {/* DETAILED SPECS MODAL OVERLAY */}
      {activeDetailProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg p-6 sm:p-8 border shadow-2xl modal-bg rounded-3xl border-amber-500/15">
            <button
              onClick={() => setActiveDetailProject(null)}
              className="absolute text-lg font-bold text-gray-400 transition-colors cursor-pointer top-4 right-4 hover:text-amber-500"
              aria-label="Close details"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-2 mb-2 text-amber-500">
              <Layers size={18} />
              <span className="font-mono text-xs font-bold tracking-wider uppercase">Architecture Specs</span>
            </div>

            <h3 className="mb-1 text-2xl font-bold modal-title">{activeDetailProject.title}</h3>
            
            <span className="inline-block px-2.5 py-1 rounded-full text-[9px] font-mono border card-tag mb-4">
              {activeDetailProject.category}
            </span>

            <p className="mb-6 text-xs leading-relaxed modal-text md:text-sm">
              {activeDetailProject.fullDetails}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {activeDetailProject.tags.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full text-[9px] font-mono border card-tag">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-800/40">
              <span className="text-[9px] font-mono card-subtle flex items-center gap-1.5">
                <Terminal size={12} className="text-amber-500" /> Complexity: {activeDetailProject.complexity}
              </span>
              <button
                onClick={() => setActiveDetailProject(null)}
                className="px-4 py-2 font-mono text-xs font-bold border cursor-pointer rounded-xl card-action-btn"
              >
                Close Specs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC PROJECT EDIT CUSTOMIZER MODAL */}
      {editingProjectIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
          <div className="modal-bg p-6 md:p-8 rounded-3xl max-w-xl w-full relative shadow-2xl border border-amber-500/25 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProjectIdx(null)}
              className="absolute text-lg font-bold text-gray-400 transition-colors cursor-pointer top-4 right-4 hover:text-amber-500"
              aria-label="Close editor"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-2 mb-4 text-amber-500">
              <Terminal size={18} />
              <span className="font-mono text-xs font-bold tracking-wider uppercase">Configure Project #{editingProjectIdx + 1}</span>
            </div>

            <div className="space-y-4 font-sans text-xs text-left md:text-sm">
              {/* Project Title */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono mb-1 modal-label">Project Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none modal-input"
                />
              </div>

              {/* Category & Complexity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono mb-1 modal-label">Category</label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none modal-input"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono mb-1 modal-label">Complexity</label>
                  <select
                    value={editComplexity}
                    onChange={(e) => setEditComplexity(e.target.value)}
                    className="w-full px-3 py-2 border cursor-pointer rounded-xl focus:outline-none modal-input"
                  >
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono mb-1 modal-label">Short Description</label>
                <textarea
                  value={editDesc}
                  rows={2}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none modal-input"
                />
              </div>

              {/* Full Specs Details */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono mb-1 modal-label">Architecture & Implementation Specs</label>
                <textarea
                  value={editDetails}
                  rows={3}
                  onChange={(e) => setEditDetails(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none modal-input"
                />
              </div>

              {/* Tech Tags */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono mb-1 modal-label">Tech Tags (Comma separated)</label>
                <input
                  type="text"
                  value={editTags}
                  placeholder="React, Next.js, Node.js"
                  onChange={(e) => setEditTags(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none modal-input"
                />
              </div>

              {/* Code & Live Demo links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono mb-1 modal-label">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={editGithub}
                    onChange={(e) => setEditGithub(e.target.value)}
                    className="w-full px-3 py-2 font-mono text-xs border rounded-xl focus:outline-none modal-input"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono mb-1 modal-label">Live Demo URL</label>
                  <input
                    type="text"
                    value={editDemo}
                    onChange={(e) => setEditDemo(e.target.value)}
                    className="w-full px-3 py-2 font-mono text-xs border rounded-xl focus:outline-none modal-input"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono mb-1 modal-label">Upload Project Showcase Image</label>
                <div className="flex items-center gap-4">
                  {editImage && (
                    <div className="flex-shrink-0 w-16 h-12 overflow-hidden border border-gray-800 rounded">
                      <img src={editImage} className="object-cover w-full h-full" alt="preview" />
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-gray-700 cursor-pointer font-mono text-[10px] font-bold uppercase transition-colors">
                    <Upload size={12} />
                    <span>Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-800/40">
              <button
                onClick={() => setEditingProjectIdx(null)}
                className="px-4 py-2 font-mono text-xs font-semibold text-gray-400 transition-colors border border-gray-800 cursor-pointer rounded-xl hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="px-5 py-2 font-mono text-xs font-bold text-black transition-colors cursor-pointer bg-amber-500 hover:bg-amber-400 rounded-xl"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Light/Dark responsiveness and card styling */}
      <style>{`
        :root {
          --card-bg: linear-gradient(135deg, rgba(16, 15, 14, 0.8) 0%, rgba(10, 10, 11, 0.95) 100%);
          --card-border: rgba(255, 255, 255, 0.04);
          --card-title: #ffffff;
          --card-text: #94a3b8;
          --card-tag-bg: rgba(255, 255, 255, 0.02);
          --card-tag-border: rgba(255, 255, 255, 0.04);
          --card-tag-text: #94a3b8;
          --card-subtle: #4b5563;
          --card-btn-bg: rgba(255, 255, 255, 0.02);
          --card-btn-border: rgba(255, 255, 255, 0.08);
          --card-btn-text: #e2e8f0;
        }

        html.light {
          --card-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 1) 100%);
          --card-border: rgba(15, 23, 42, 0.06);
          --card-title: #0f172a;
          --card-text: #475569;
          --card-tag-bg: #f8fafc;
          --card-tag-border: #cbd5e1;
          --card-tag-text: #475569;
          --card-subtle: #94a3b8;
          --card-btn-bg: #ffffff;
          --card-btn-border: #cbd5e1;
          --card-btn-text: #0f172a;
        }

        .project-card {
          background: var(--card-bg) !important;
          border: 1px solid var(--card-border) !important;
          color: var(--card-text) !important;
          backdrop-filter: blur(24px);
          position: relative;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(245, 158, 11, 0.02) !important;
        }

        .modal-bg {
          background: var(--card-bg) !important;
          border-color: var(--card-border) !important;
          backdrop-filter: blur(20px);
        }

        .modal-title {
          color: var(--card-title) !important;
        }

        .modal-text {
          color: var(--card-text) !important;
        }

        .card-title {
          color: var(--card-title) !important;
        }

        .card-text {
          color: var(--card-text) !important;
        }

        .card-tag {
          background-color: var(--card-tag-bg) !important;
          border-color: var(--card-tag-border) !important;
          color: var(--card-tag-text) !important;
        }

        .card-subtle {
          color: var(--card-subtle) !important;
        }

        /* Slider styling overrides */
        .project-card {
          cursor: pointer;
        }

        .mask-linear {
          mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
        }

        /* Hide scrollbars */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Modal inputs */
        .modal-input {
          background-color: rgba(15, 23, 42, 0.8) !important;
          border-color: rgba(245, 158, 11, 0.2) !important;
          color: #ffffff !important;
        }
        .modal-input:focus {
          border-color: #f59e0b !important;
        }
        .modal-input option {
          background-color: #0c0a09 !important;
          color: #ffffff !important;
        }
        .modal-label {
          color: #94a3b8 !important;
        }

        /* Light Mode inputs */
        html.light .modal-input {
          background-color: #ffffff !important;
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
        }
        html.light .modal-input:focus {
          border-color: #f59e0b !important;
        }
        html.light .modal-input option {
          background-color: #ffffff !important;
          color: #0f172a !important;
        }
        html.light .modal-label {
          color: #475569 !important;
        }
      `}</style>
    </div>
  );
};

export default Projects;
