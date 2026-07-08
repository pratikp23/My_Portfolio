import  { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Layers, Terminal, ChevronLeft, ChevronRight, Upload } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

  const triggerRef = useRef(null);
  const cardsRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeDetailProject, setActiveDetailProject] = useState(null);

  // Admin Mode detection: Checks '?edit=true' query parameter or localStorage flag
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
      },
      // {
      //   title: "Real-time Collaboration Platform",
      //   description: "Collab tool featuring rich text editing, simultaneous user tracking, instant commenting, and WebRTC audio calling capabilities.",
      //   fullDetails: "Created a real-time editor using Socket.io to synchronize document actions between users. Powered by a Node.js Express backend and a PostgreSQL relational schema for storing persistent document trees.",
      //   tags: ["React", "Express", "Socket.io", "PostgreSQL"],
      //   github: "https://github.com",
      //   demo: "https://google.com",
      //   complexity: "Expert",
      //   category: "WebSockets",
      //   image: "/project_collab.png",
      // },
      // {
      //   title: "DevQuest Developer Platform",
      //   description: "Interactive gamified roadmap platform for developers learning programming languages, with challenges, quizzes, and progression tracking.",
      //   fullDetails: "Designed a gamified progression map using React and Vite. Leveraged Firebase Authentication for quick user signup and Firestore documents for tracking scores, achievement badges, and level metrics.",
      //   tags: ["React", "Vite", "Tailwind CSS", "Firebase"],
      //   github: "https://github.com",
      //   demo: "https://google.com",
      //   complexity: "Medium",
      //   category: "Gamification",
      //   image: "/project_quest.png",
      // },
      // {
      //   title: "Cloud Native DevOps Pipeline",
      //   description: "Automated CI/CD deployment pipeline for Kubernetes microservices using Docker configurations and GitHub Actions workflows.",
      //   fullDetails: "Designed a multi-stage automated build and release system. Leveraged Docker container caching, Kubernetes cluster manifests, Helm charts, and AWS deployment integration to orchestrate live load balancing.",
      //   tags: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
      //   github: "https://github.com",
      //   demo: "https://google.com",
      //   complexity: "Expert",
      //   category: "Cloud/DevOps",
      //   image: "/project_saas.png",
      // },
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

  useEffect(() => {
    const cards = cardsRef.current.querySelectorAll(".project-card");

    // Set initial layout values
    gsap.set(cards[0], { y: 0, scale: 1.0, opacity: 1.0, zIndex: 10 });
    gsap.set(cards[1], { y: "100vh", scale: 0.95, opacity: 0, zIndex: 11 });
    gsap.set(cards[2], { y: "100vh", scale: 0.95, opacity: 0, zIndex: 12 });
    gsap.set(cards[3], { y: "100vh", scale: 0.95, opacity: 0, zIndex: 13 });
    gsap.set(cards[4], { y: "100vh", scale: 0.95, opacity: 0, zIndex: 14 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.0,
          onUpdate: (self) => {
            scrollTriggerRef.current = self;
            const p = self.progress;
            if (p < 0.20) setActiveCardIndex(0);
            else if (p < 0.45) setActiveCardIndex(1);
            else if (p < 0.70) setActiveCardIndex(2);
            else if (p < 0.92) setActiveCardIndex(3);
            else setActiveCardIndex(4);
          }
        }
      });

      // --- Stage 1: Card 1 slides over Card 0 ---
      tl.to(cards[0], { scale: 0.94, y: -16, opacity: 0.65, ease: "none" }, "step1")
        .to(cards[1], { y: 0, opacity: 1, ease: "none" }, "step1");

      // --- Stage 2: Card 2 slides over Card 1 ---
      tl.to(cards[0], { scale: 0.88, y: -32, opacity: 0.35, ease: "none" }, "step2")
        .to(cards[1], { scale: 0.94, y: -16, opacity: 0.65, ease: "none" }, "step2")
        .to(cards[2], { y: 0, opacity: 1, ease: "none" }, "step2");

      // --- Stage 3: Card 3 slides over Card 2 ---
      tl.to(cards[0], { scale: 0.82, y: -48, opacity: 0.15, ease: "none" }, "step3")
        .to(cards[1], { scale: 0.88, y: -32, opacity: 0.35, ease: "none" }, "step3")
        .to(cards[2], { scale: 0.94, y: -16, opacity: 0.65, ease: "none" }, "step3")
        .to(cards[3], { y: 0, opacity: 1, ease: "none" }, "step3");

      // --- Stage 4: Card 4 slides over Card 3 ---
      tl.to(cards[1], { scale: 0.82, y: -48, opacity: 0.15, ease: "none" }, "step4")
        .to(cards[2], { scale: 0.88, y: -32, opacity: 0.35, ease: "none" }, "step4")
        .to(cards[3], { scale: 0.94, y: -16, opacity: 0.65, ease: "none" }, "step4")
        .to(cards[4], { y: 0, opacity: 1, ease: "none" }, "step4");

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const scrollToProject = (index) => {
    const self = scrollTriggerRef.current;
    if (self) {
      const start = self.start;
      const end = self.end;
      const scrollRange = end - start;
      const progressValues = [0.05, 0.32, 0.57, 0.81, 0.96];
      const targetProgress = progressValues[index];
      const targetScroll = start + targetProgress * scrollRange;
      
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (activeCardIndex > 0) {
      scrollToProject(activeCardIndex - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (activeCardIndex < 4) {
      scrollToProject(activeCardIndex + 1);
    }
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

  return (
    <div ref={triggerRef} className="relative w-full h-[500vh] bg-black">
      
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 flex flex-col items-center justify-center w-full h-screen overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6 mx-auto">
          
          {/* Header Block */}
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-extrabold text-white md:text-6xl">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Projects</span>
              {!isStandalone && (
                <Link to="/projects" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                  [Full View ↗]
                </Link>
              )}
            </h1>
            <p className="max-w-xl mx-auto text-xs font-light text-gray-400 md:text-sm">
              Scroll down or use the side manual control bars to browse through my projects.
            </p>

            {/* Admin mode active badge */}
            {isAdminMode && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] uppercase tracking-wider">
                <span>🔧 Admin Edit Mode Active</span>
                <button
                  onClick={handleExitAdmin}
                  className="ml-1 font-bold text-red-400 cursor-pointer hover:text-red-300 hover:underline"
                >
                  [Exit]
                </button>
              </div>
            )}
          </div>

          {/* Cards Stack Wrapper */}
          <div
            ref={cardsRef}
            className="relative w-full max-w-[680px] h-[550px] flex items-center justify-center"
            style={{ perspective: "1500px" }}
          >
            {/* Left Manual Control Bar */}
            <button
              onClick={handlePrev}
              disabled={activeCardIndex === 0}
              className="hidden md:flex absolute left-4 p-3 rounded-full bg-gray-950/80 border border-gray-800 text-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.05)] z-30 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-gray-800 disabled:hover:text-amber-500"
              aria-label="Previous Project"
            >
              <ChevronLeft size={20} />
            </button>

            {projectsList.map((project, idx) => {
              const isActive = activeCardIndex === idx;

              return (
                <div
                  key={idx}
                  className={`absolute w-full h-full max-w-[480px] rounded-[32px] transition-shadow duration-500 ${
                    isActive
                      ? "pointer-events-auto shadow-[0_25px_60px_rgba(245, 158, 11, 0.22)]"
                      : "pointer-events-none"
                  } project-card p-6`}
                  style={{
                    zIndex: 10 + idx
                  }}
                >
                  <div className="flex flex-col items-center justify-between w-full h-full gap-4">
                    
                    {/* Top Side: Showcase Image with Floating Badges */}
                    <div className="w-full h-[220px] rounded-2xl overflow-hidden relative border border-gray-800/10 flex-shrink-0 group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-gray-800 text-amber-500 font-mono text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-lg font-bold shadow-md">
                        {project.category}
                      </span>
                      <span className={`absolute top-3 right-3 backdrop-blur-md border font-mono text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-lg font-bold shadow-md flex items-center gap-1.5 ${
                        project.complexity === "Expert"
                          ? "bg-red-950/80 border-red-500/30 text-red-400"
                          : project.complexity === "High"
                          ? "bg-amber-950/80 border-amber-500/30 text-amber-400"
                          : "bg-emerald-950/80 border-emerald-500/30 text-emerald-400"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          project.complexity === "Expert"
                            ? "bg-red-400"
                            : project.complexity === "High"
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        }`} />
                        {project.complexity}
                      </span>
                    </div>

                    {/* Bottom Side: Text & Actions */}
                    <div className="flex flex-col justify-between flex-1 w-full px-1 text-left">
                      <div>
                        <h3 className="mb-1.5 text-xl font-bold tracking-tight md:text-2xl card-title hover:text-amber-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="font-light text-[12px] leading-relaxed card-text line-clamp-3">
                          {project.description}
                        </p>
                        
                        {/* Tech tags with ambient layout */}
                        <div className="flex flex-wrap gap-1.5 mt-3.5">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md text-[9px] font-mono border uppercase tracking-wider card-tag transition-colors hover:border-amber-500/30 hover:text-amber-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons row */}
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-800/40">
                        <span className="flex items-center gap-1 text-[10px] font-mono card-subtle">
                          {idx + 1} / 5
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveDetailProject(project)}
                            className="flex items-center gap-1 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs transition-all font-mono cursor-pointer shadow-md shadow-amber-500/5 hover:-translate-y-0.5"
                          >
                            <span>Specs</span>
                          </button>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-800 bg-gray-950/40 rounded-xl text-xs text-gray-300 hover:text-white hover:border-gray-600 transition-all font-mono hover:-translate-y-0.5"
                            aria-label="GitHub Repository"
                          >
                            <GithubIcon size={13} />
                            <span>Code</span>
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-800 bg-gray-950/40 rounded-xl text-xs text-gray-300 hover:text-white hover:border-gray-600 transition-all font-mono hover:-translate-y-0.5"
                            aria-label="Live Demo"
                          >
                            <ExternalLink size={13} />
                            <span>Demo</span>
                          </a>
                          
                          {/* Edit button only visible to the owner in Admin Mode */}
                          {isAdminMode && (
                            <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  startEditingProject(idx);
                              }}
                              className="flex items-center gap-1 px-3 py-2 border rounded-xl text-xs transition-all font-mono cursor-pointer text-amber-500 hover:text-amber-400 border-amber-500/20 hover:-translate-y-0.5"
                              aria-label="Edit Project Details"
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

            {/* Right Manual Control Bar */}
            <button
              onClick={handleNext}
              disabled={activeCardIndex === 4}
              className="hidden md:flex absolute right-4 p-3 rounded-full bg-gray-950/80 border border-gray-800 text-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.05)] z-30 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-gray-800 disabled:hover:text-amber-500"
              aria-label="Next Project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED SPECS MODAL OVERLAY */}
      {activeDetailProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg p-8 border shadow-2xl modal-bg rounded-3xl border-amber-500/15">
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
              <div className="grid grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 gap-4">
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
          --card-bg: linear-gradient(135deg, rgba(30, 41, 59, 0.35) 0%, rgba(15, 23, 42, 0.85) 100%);
          --card-border: rgba(245, 158, 11, 0.28);
          --card-title: #ffffff;
          --card-text: #e2e8f0;
          --card-tag-bg: rgba(245, 158, 11, 0.08);
          --card-tag-border: rgba(245, 158, 11, 0.25);
          --card-tag-text: #fbbf24;
          --card-subtle: #94a3b8;
          --card-btn-bg: rgba(30, 41, 59, 0.45);
          --card-btn-border: rgba(245, 158, 11, 0.3);
          --card-btn-text: #f1f5f9;
        }

        html.light {
          --card-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 1) 100%);
          --card-border: rgba(15, 23, 42, 0.06);
          --card-title: #0f172a;
          --card-text: #334155;
          --card-tag-bg: #f1f5f9;
          --card-tag-border: #e2e8f0;
          --card-tag-text: #475569;
          --card-subtle: #94a3b8;
          --card-btn-bg: #f8fafc;
          --card-btn-border: #cbd5e1;
          --card-btn-text: #0f172a;
        }

        .project-card {
          background: var(--card-bg) !important;
          border: 1px solid var(--card-border) !important;
          color: var(--card-text) !important;
          backdrop-filter: blur(24px);
          position: relative;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(245, 158, 11, 0.04) !important;
        }

        /* Ambient gradient border effect for dark mode cards */
        html:not(.light) .project-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 32px;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.45) 0%, transparent 55%, rgba(59, 130, 246, 0.22) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
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

        .card-action-btn {
          background-color: var(--card-btn-bg) !important;
          border-color: var(--card-btn-border) !important;
          color: var(--card-btn-text) !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03) !important;
        }

        .card-action-btn:hover {
          border-color: #f59e0b !important;
          color: #f59e0b !important;
          background-color: var(--card-btn-bg) !important;
        }

        /* Hide scrollbars for chrome/safari */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbars for IE/Edge/Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Modal input elements and label styles */
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

        /* Light Mode input overrides */
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
