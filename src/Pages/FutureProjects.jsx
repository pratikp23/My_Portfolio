
import { Hammer, Loader2, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const FutureProjects = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/future-projects";

  const upcomingProjects = [
    {
      title: "AI Code Reviewer CLI",
      description: "A local-first terminal tool that automatically audits your codebase using LLMs, highlighting performance bottlenecks, security concerns, and style improvements before you commit.",
      status: "In Development",
      phase: "60%",
      tech: ["Node.js", "Gemini API", "TypeScript", "Commander.js"],
    },
    {
      title: "Decentralized File Share",
      description: "A peer-to-peer secure file sharing system utilizing Web3 technologies for encrypted storage and metadata-free transfers directly between browsers.",
      status: "Design Phase",
      phase: "25%",
      tech: ["React", "WebRTC", "IPFS", "Solidity"],
    },
    {
      title: "Smart Home Automation Hub",
      description: "A local-first, privacy-focused dashboard to monitor and automate IoT devices across your network, operating fully offline without cloud dependencies.",
      status: "Planning",
      phase: "10%",
      tech: ["Next.js", "Express", "MQTT", "SQLite"],
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[125px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[125px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl">
            Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Projects</span>
            {!isStandalone && (
              <Link to="/future-projects" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
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
