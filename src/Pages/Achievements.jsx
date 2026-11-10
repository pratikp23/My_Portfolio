import { Trophy, Award, Calendar, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Reveal } from "../Components/ScrollReveal";
import ScrollStack from "../Components/ScrollStack";
import SectionParticleHeading from "../Components/SectionParticleHeading";
import ScrollStatement from "../Components/ScrollStatement";

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
    <div className="relative w-full px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 font-mono text-xs tracking-wider text-amber-400 uppercase border rounded-full bg-amber-500/10 border-amber-500/25">
              <span>Hackathons & Honors</span>
            </div>
          </Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#f8fafc" />
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
                <SectionParticleHeading text="KEY ACHIEVEMENTS" maxWidth="max-w-md sm:max-w-lg" />
              </div>
              <svg className="w-48 h-3 mx-auto mt-2 pointer-events-none select-none sm:w-56 sm:mx-0" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brush-grad-achievements" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="60%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                </defs>
                <path d="M 10 14 C 70 4, 170 3, 290 8 C 210 13, 110 13, 15 17 Z" fill="url(#brush-grad-achievements)" />
                <path d="M 25 18 C 90 12, 190 12, 275 16 C 190 19, 100 19, 30 18 Z" fill="url(#brush-grad-achievements)" opacity="0.8" />
              </svg>
              <Reveal delay={0.1}>
                <p className="max-w-xl mt-2 text-sm font-normal sm:text-base text-slate-400">
                  Competitive hackathon rankings and engineering milestones.
                </p>
              </Reveal>
            </div>
            {!isStandalone && (
              <Link
                to="/achievements"
                className="inline-flex items-center gap-1 font-mono text-xs transition-colors text-amber-400 hover:text-amber-300"
              >
                <span>Full View</span>
                <span>↗</span>
              </Link>
            )}
          </div>
        </div>

        {/* Introduction Statement with Scroll-Linked Word Illumination (matching About section) */}
        <div className="mb-10 sm:mb-14">
          <ScrollStatement
            text="High-stakes hackathon podiums and engineering milestones built under pressure."
            description="Proven execution across competitive arenas — architecting full-stack AI and Web applications with measurable impact and team leadership."
            headingClassName="text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl"
            descriptionClassName="max-w-2xl mt-4 text-base font-normal leading-relaxed text-slate-400"
          />
        </div>

        {/* Key Achievements Trophy Deck — ScrollStack Pinning & Layering */}
        <ScrollStack
          topOffset={95}
          itemStackDistance={28}
          scaleStep={0.035}
          blurStep={1.5}
          dimStep={0.12}
          itemGap="mb-14 sm:mb-20"
        >
          {achievementsList.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-[#111115]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 border rounded-2xl bg-amber-500/10 border-amber-500/25">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-400">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="mb-4 font-mono text-xs sm:text-sm text-amber-400/90 font-medium">
                  {item.organization}
                </p>

                <p className="mb-5 text-sm font-normal leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="font-mono font-semibold text-amber-400">Key Competency:</strong> {item.takeaway}
                </span>
              </div>
            </div>
          ))}
        </ScrollStack>

      </div>
    </div>
  );
};

export default Achievements;
