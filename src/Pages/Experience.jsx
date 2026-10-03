import { Calendar, CheckCircle2, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Experience = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/experience";

  const experiences = [
    {
      role: "Software Development Engineer (SDE) Intern",
      company: "Bluestock Fintech",
      location: "Pune, India",
      duration: "Aug 2025 – Sep 2025",
      type: "Internship",
      highlights: [
        "Engineered and maintained responsive client interfaces using React.js and modern component patterns.",
        "Collaborated on full-stack application modules integrating Node.js backend services and REST APIs.",
        "Implemented modular, reusable UI components and assisted with client-side performance and rendering optimization.",
      ],
      skills: ["React.js", "Node.js", "JavaScript", "REST APIs", "Tailwind CSS"],
    },
    {
      role: "Campus Ambassador",
      company: "IIT Bombay",
      location: "Remote / Campus",
      duration: "Aug 2025 – Dec 2025",
      type: "Student Leadership",
      highlights: [
        "Coordinated student outreach for national technical initiatives, hackathons, and programming events.",
        "Organized coding workshops and facilitated peer participation in inter-college competitive programming.",
        "Acted as the liaison between student developer communities and IIT Bombay event organizers.",
      ],
      skills: ["Community Leadership", "Event Coordination", "Technical Outreach"],
    },
  ];

  return (
    <div className="relative w-full py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
            <span>Career History</span>
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
                    <linearGradient id="arrow-grad-experience" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4e2a14" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99"
                    stroke="url(#arrow-grad-experience)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2 className="section-heading-font text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wider">
                  Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Experience</span>
                </h2>
              </div>
              <svg className="w-48 sm:w-56 h-3 mt-2 mx-auto sm:mx-0 select-none pointer-events-none" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brush-grad-experience" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="60%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#4e2a14" />
                  </linearGradient>
                </defs>
                <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-experience)" />
                <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-experience)" opacity="0.8" />
              </svg>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-normal">
                Hands-on professional software engineering internship and technical leadership roles.
              </p>
            </div>
            {!isStandalone && (
              <Link
                to="/experience"
                className="font-mono text-xs text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.12 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#0e1117]/80 backdrop-blur-md border border-white/[0.08] hover:border-amber-500/30 transition-all shadow-xl"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                      {exp.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1.5 text-xs sm:text-sm text-slate-300 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
                      <Building2 size={15} />
                      {exp.company}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{exp.location}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300 self-start sm:self-center">
                  <Calendar size={13} className="text-amber-400" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Responsibilities / Bullet points */}
              <div className="space-y-2.5 mb-6">
                {exp.highlights.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Technologies / Competencies tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/[0.06]">
                <span className="text-xs font-mono text-slate-500 mr-2">Key Skills:</span>
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Experience;
