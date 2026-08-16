
import { Briefcase, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Experience = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/experience";

  const experiences = [
    {
      role: "Frontend Developer Intern",
      company: "Bluestock Fintech",
      duration: "Aug 2025 - Sept 2025",
      description: "Building scalable web solutions using React and Node.js. Optimized load speeds by 25% and implemented modular component libraries.",
    },
    {
      role: "Campuss Ambassador",
      company: "IIT Bombay",
      duration: "Aug 2025 - Dec 2025",
      description: "Promoted IIT Bombay's tech initiatives and events, organized workshops, and facilitated student engagement in coding competitions and hackathons.",
    },
    // {
    //   role: "Freelance Web Developer",
    //   company: "Self-Employed",
    //   duration: "Sep 2024 - May 2025",
    //   description: "Designed and built custom portfolios, landing pages, and business presentation sites for clients using modern styling libraries.",
    // },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-4xl px-6 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl relative inline-block">
            <svg className="section-curly-arrow hidden absolute -left-10 -top-8 w-9 h-9 md:-left-16 md:-top-10 md:w-14 md:h-14 scale-x-[-1] select-none pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="arrow-grad-exp" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4e2a14" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <path d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99" stroke="url(#arrow-grad-exp)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Experience</span>
            {!isStandalone && (
              <Link to="/experience" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
          <svg className="w-56 h-4 mt-3 mx-auto" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brush-grad-exp" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="60%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#4e2a14" />
              </linearGradient>
            </defs>
            <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-exp)" />
            <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-exp)" opacity="0.8" />
          </svg>
          <p className="max-w-xl mx-auto font-light text-gray-400">
            A chronological timeline of my professional journey and software development career.
          </p>
        </div>

        <div className="relative pl-6 ml-2 space-y-12 md:ml-8 md:pl-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Vertical timeline connector line segments */}
              {index !== experiences.length - 1 && (
                <span className="absolute -left-[24px] md:-left-[48px] top-1.5 bottom-[-48px] border-l border-gray-800 pointer-events-none" />
              )}
              {/* Timeline marker */}
              <span className="absolute -left-[33px] md:-left-[57px] top-1.5 bg-[#070708] border-2 border-gray-800 rounded-full p-2.5 text-gray-500 group-hover:border-amber-500 group-hover:text-amber-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-300">
                <Briefcase size={16} />
              </span>

              {/* Card content */}
              <div className="p-6 sm:p-8 transition-all duration-300 border shadow-2xl bg-gradient-to-br from-gray-900/40 to-black/60 rounded-3xl border-gray-800/60 backdrop-blur-sm hover:border-amber-500/20">
                <div className="flex flex-col gap-2 mb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-500">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-gray-400 text-amber-550/90">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm font-medium gap-1.5">
                    <Calendar size={14} />
                    <span>{exp.duration}</span>
                  </div>
                </div>
                <p className="font-light leading-relaxed text-gray-400">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
