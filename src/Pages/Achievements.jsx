import { Trophy, Award, Calendar, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const achievementsList = [
  {
    title: "1st Place Winner — Techno Genesis 2025",
    organization: "College Hackathon Competition",
    date: "Jan 2025",
    icon: <Trophy size={22} className="text-amber-400" />,
    badge: "Champion",
    description:
      "Secured 1st place in the Techno Genesis 2025 hackathon among 100+ participating developer teams by building an end-to-end full-stack software prototype under time constraints.",
    takeaway: "Team collaboration, rapid API development, and product presentation under deadline.",
  },
  {
    title: "Top 10 Finalist — Void Hacks 7.0 (2025)",
    organization: "Void Hacks National Hackathon",
    date: "Jan 2025",
    icon: <Award size={22} className="text-amber-400" />,
    badge: "Finalist",
    description:
      "Reached Top 10 Finalist standing with 'HealthAI Guardian' — an AI-driven predictive health monitoring application designed to bridge patient data with early anomaly insights.",
    takeaway: "Predictive model integration, health dataset structuring, and intuitive dashboard UX.",
  },
];

const Achievements = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/achievements";

  return (
    <div className="relative w-full py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
            <span>Hackathons & Honors</span>
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
                    <linearGradient id="arrow-grad-achievements" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4e2a14" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 90 10 C 105 35, 80 60, 60 60 C 40 60, 40 40, 60 40 C 80 40, 75 80, 50 90 C 35 95, 20 95, 10 87 M 10 87 L 22 81 M 10 87 L 18 99"
                    stroke="url(#arrow-grad-achievements)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2 className="section-heading-font text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wider">
                  Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Achievements</span>
                </h2>
              </div>
              <svg className="w-48 sm:w-56 h-3 mt-2 mx-auto sm:mx-0 select-none pointer-events-none" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brush-grad-achievements" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="60%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#4e2a14" />
                  </linearGradient>
                </defs>
                <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-achievements)" />
                <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-achievements)" opacity="0.8" />
              </svg>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-normal">
                Competitive hackathon rankings and engineering milestones.
              </p>
            </div>
            {!isStandalone && (
              <Link
                to="/achievements"
                className="font-mono text-xs text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {achievementsList.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#0e1117]/80 backdrop-blur-md border border-white/[0.08] hover:border-amber-500/30 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-amber-400/90 mb-4">
                  {item.organization}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-start gap-2 text-xs text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300 font-semibold">Key competency:</strong> {item.takeaway}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Achievements;
