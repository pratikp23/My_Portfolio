
import { Trophy, Award, Stars, Code } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Achievements = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/achievements";

  const achievementsList = [
    {
      title: "1st Place Techno Genesis 2025 Winner",
      description: "Won the College level Techno Genesis hackathon out of 100+ participating developer teams.",
      icon: <Trophy className="text-amber-500" size={32} />,
      date: "Jan 2025",
    },
    {
      title: "Top 10 Finalist in Void Hacks() 7.O 2025",
      description: "HealthAI Guardian: My team and I developed an AI-driven Predictive Health Monitoring System designed to bridge the gap between patient data and actionable medical insights.",
      icon: <Trophy className="text-amber-500" size={32} />,
      date: "Jan 2025",
    },
    // {
    //   title: "Google Cloud Certification",
    //   description: "Earned Cloud Digital Leader badge validating cloud foundation skills.",
    //   icon: <Award className="text-amber-500" size={32} />,
    //   date: "Jun 2025",
    // },
    // {
    //   title: "LeetCode 500+ Solved",
    //   description: "Solved over 500 algorithmic and data structure problems with top-tier rankings.",
    //   icon: <Code className="text-amber-500" size={32} />,
    //   date: "Ongoing",
    // },
    // {
    //   title: "Global Open Source Contributor",
    //   description: "Accepted contributions into mainstream React developer ecosystem tools.",
    //   icon: <Stars className="text-amber-500" size={32} />,
    //   date: "Dec 2024",
    // },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Achievements</span>
            {!isStandalone && (
              <Link to="/achievements" className="inline-flex items-center ml-4 font-mono text-xs font-medium tracking-wider uppercase transition-colors text-amber-500 hover:text-amber-400">
                [Full View ↗]
              </Link>
            )}
          </h1>
          <p className="max-w-xl mx-auto font-light text-gray-400">
            A celebration of milestones, accolades, and key completions in my software development track.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {achievementsList.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-8 transition-all duration-300 border shadow-2xl bg-gradient-to-br from-gray-900/40 to-black/60 rounded-3xl border-gray-800/60 backdrop-blur-sm hover:border-amber-500/20 group"
            >
              <div className="flex-shrink-0 p-4 transition-all duration-300 border border-gray-800 bg-gray-950 rounded-2xl group-hover:scale-105 group-hover:border-amber-500/30">
                {item.icon}
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-500">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs text-gray-500 whitespace-nowrap">{item.date}</span>
                </div>
                <p className="font-light leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
