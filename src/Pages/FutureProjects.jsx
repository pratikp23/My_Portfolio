
import { Hammer, Loader2, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const FutureProjects = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/future-projects";

  const upcomingProjects = [
    {
      title: "PathFinder AI - Career Discovery & Deterministic Matcher",
      description: "An AI-powered career-navigation system featuring explainable profile matching based on weighted skills (35%), interests (20%), projects (15%), education, experience, and preferences.",
      status: "In Development",
      phase: "65%",
      tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    },
    {
      title: "PathFinder AI - RAG-Based AI Mentor",
      description: "A contextual chatbot assistant utilizing MongoDB Atlas Vector Search and LLM integration to mentor students on skills, career timelines, and curated learning roadmaps.",
      status: "Design Phase",
      phase: "30%",
      tech: ["Express", "MongoDB Atlas", "Vector Search", "Gemini API"],
    },
    {
      title: "PathFinder AI - AI Mock Interview & Test Engine",
      description: "A text-based simulation hub featuring MCQ, conceptual, and scenario-based tests with real-time AI evaluation of communication and technical accuracy to score job readiness.",
      status: "Planning",
      phase: "15%",
      tech: ["React", "Express", "AI Evaluation", "Mongoose"],
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[125px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[125px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl relative inline-block">
            <svg className="section-curly-arrow hidden absolute -left-10 -top-8 w-9 h-9 md:-left-16 md:-top-10 md:w-14 md:h-14 scale-x-[-1] select-none pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="arrow-grad-future" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4e2a14" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <path d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99" stroke="url(#arrow-grad-future)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Projects</span>
            {!isStandalone && (
              <Link to="/future-projects" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
          <svg className="w-56 h-4 mt-3 mx-auto" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brush-grad-future" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="60%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#4e2a14" />
              </linearGradient>
            </defs>
            <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-future)" />
            <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-future)" opacity="0.8" />
          </svg>
          <p className="max-w-xl mx-auto font-light text-gray-400">
            A sneak peek at the applications and tools I am currently designing, prototyping, or actively building.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {upcomingProjects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-6 transition-all duration-300 border shadow-2xl bg-gradient-to-br from-gray-900/40 to-black/60 rounded-3xl border-gray-800/60 backdrop-blur-sm hover:border-amber-500/20 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 transition-transform border border-gray-800 bg-gray-950 rounded-2xl text-amber-500 group-hover:scale-105">
                    {project.status === "In Development" ? (
                      <Loader2 className="animate-spin text-amber-500" size={24} />
                    ) : project.status === "Design Phase" ? (
                      <Hammer size={24} />
                    ) : (
                      <Sparkles size={24} />
                    )}
                  </div>
                  <span className="px-3.5 py-1 text-xs font-mono font-medium rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    {project.status}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-amber-500">
                  {project.title}
                </h3>
                <p className="mb-6 text-sm font-light leading-relaxed text-gray-400">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4">
                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs font-medium text-gray-500 font-body">
                    <span>Progress</span>
                    <span className="text-amber-500 font-bold">{project.phase}</span>
                  </div>
                  <div className="w-full h-1 overflow-hidden bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                      style={{ width: project.phase }}
                    />
                  </div>
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-gray-900 border border-gray-800 text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureProjects;
